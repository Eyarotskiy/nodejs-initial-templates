import {Request, Response} from 'express';
import Database from '../../database/Database';
import {UserSignInResponse, UserSignUpResponse} from '../../common/types';
import {JWT_SECRET} from '../../common/constants';
import Api from '../Api';
import Email from '../../Email/Email';
import {extractUserNames} from '../../common/utils';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class AuthorizationApi {
	static async handleSignInRequest(req: Request, res: Response): Promise<void> {
		try {
			const {login, password} = req.body;
			const user = await Database.findUser(login);
			const isPasswordCorrect =
				user ? await bcrypt.compare(password, user.password) : false;
			const token =
				user && isPasswordCorrect ?  await Api.generateToken(login) : null;
			const isEmailConfirmed = user && user.confirmed;

			if (!user) {
				Api.sendError(res, 404, {message: 'Such user does not exist'});
				return;
			}

			if (!isPasswordCorrect) {
				Api.sendError(res, 401, {message: 'Password is not correct'});
				return;
			}

			if (!isEmailConfirmed) {
				Api.sendError(res, 403, {message: 'Email is not confirmed'});
				return;
			}

			const response: UserSignInResponse = {
				token: token,
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	static async handleAuthenticateRequest(req: Request, res: Response): Promise<void> {
		try {
			const token = req.headers['auth-token'];
			const verification = await jwt.verify(token, JWT_SECRET);
			const user = await Database.findUser(verification.name);
			const newToken = await Api.generateToken(verification.name);
			await Database.confirmUser(user.login);

			const response = {
				login: user.login,
				newToken: newToken,
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}

	static async handleSignUpRequest(req: Request, res: Response): Promise<void> {
		try {
			const {login, password} = req.body;
			const saltRounds = 10;
			const hash = await bcrypt.hash(password, saltRounds);
			const user = await Database.findUser(login);

			if (user) {
				Api.sendError(res, 403, {message: 'User already exists'});
				return;
			}

			await Email.sendConfirmationEmail(login);
			await Database.saveUser(login, hash);

			const response: UserSignUpResponse = {
				users: extractUserNames(await Database.getUsers()),
			};

			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}
}
