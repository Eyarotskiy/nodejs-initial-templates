import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import './Login.scss';
import Api from 'Api/Api';

const Login = () => {
	let token: string = '';

	const [users, updateUsers] = useState([]);
	const [loginExistsFlag, updateLoginExistsFlag] = useState(true);
	const [passwordMatchFlag, updatePasswordMatchFlag] = useState(true);
	const [registrationExistsFlag, updateRegistrationExistsFlag] =
		useState(false);
	const [login, updateLogin] = useState('');
	const [password, updatePassword] = useState('');
	const [isLoggedIn, updateLoginStatus] = useState(false);

	useEffect(() => {
		const initRequest = async () => {
			const response = await Api.getUsers();
			updateUsers(response.data.users);
		};

		initRequest();
	}, []);


	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateLogin(e.target.value);
		updateLoginExistsFlag(true);
		updatePasswordMatchFlag(true);
		updateRegistrationExistsFlag(false);
	};

	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		updatePassword(e.target.value);
	};

	const sendRegisterRequest = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const payload = {login, password};
			const response = await Api.registerUser(payload);
			updateRegistrationExistsFlag(response.data.userExists);
			updateUsers(response.data.users);
		} catch (e) {
			console.error(e);
		}
	};

	const sendLoginRequest = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const payload = {login, password};
			const response = await Api.loginUser(payload);
			const {userExists, isPasswordCorrect} = response.data;

			updateLoginExistsFlag(userExists);
			if (userExists) {
				updatePasswordMatchFlag(userExists && isPasswordCorrect);
			}
			/*if (response.data.token) {
				token = response.data.token;
			}*/
		} catch (e) {
			console.error(e);
		}
	};

	const sendAuthenticateRequest = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			console.log(token);
			const response = await Api.authenticateUser(token);

			console.log(response);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="Login">
			<h2 className="title">Login (Json Web Token)</h2>
			<h3 className="info">
				Login status:
				<span className={isLoggedIn ? "status success" : "status warning"}>
					logged {isLoggedIn ? 'on' : 'out'}
				</span>
			</h3>
			<form className="form">
				<div className="login-container">
					<div className="input-container">
						<input type="text" placeholder="Login"
									 value={login} onChange={onLoginChange}/>
						{
							registrationExistsFlag &&
							<span className="validation-msg">User already exists</span>
						}
						{
							!loginExistsFlag &&
							<span className="validation-msg">Such user doesn't exist</span>
						}
					</div>
					<div className="input-container">
						<input type="password" placeholder="Password"
									 value={password} onChange={onPasswordChange}/>
						{
							!passwordMatchFlag &&
							<span className="validation-msg">Password is not correct</span>
						}
					</div>
				</div>
				<div className="btn-container">
					<button className="btn btn-blue" onClick={sendRegisterRequest}>
						Register (Add user)
					</button>
					<button className="btn btn-blue" onClick={sendLoginRequest}>
						Log in
					</button>
					<button className="btn btn-blue" onClick={sendAuthenticateRequest}>
						Authenticate
					</button>
				</div>
			</form>
			<div className="users-list">
				<h3 className="users-title">Registered users:</h3>
				{users.map((user, index) => (
					<span key={index} className="users-name">
						{user}{index !== users.length - 1 && ', '}
					</span>
				))}
			</div>
		</div>
	);
};

export default Login;
