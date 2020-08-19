import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import './Login.scss';
import Api from 'Api/Api';

const Login = () => {
	const [users, updateUsers] = useState([]);
	const [loginExistsFlag, updateLoginExistsFlag] = useState(true);
	const [passwordMatchFlag, updatePasswordMatchFlag] = useState(true);
	const [registrationExistsFlag, updateRegistrationExistsFlag] =
		useState(false);
	const [login, updateLogin] = useState('test@test.com');
	const [password, updatePassword] = useState('1');
	const [isLoggedIn, updateLoginStatus] = useState(false);
	const [tokenError, updateTokenError] = useState('');

	useEffect(() => {
		const loadData = async () => {
			const storedToken = localStorage.getItem('token');
			const response = await Api.getUsers();
			updateUsers(response.data.users);

			if (storedToken) await sendAuthenticationRequest(storedToken);
		};

		loadData();
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

	const sendSignUpRequest = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		updateRegistrationExistsFlag(false);

		try {
			const payload = {login, password};
			const response = await Api.signUpUser(payload);
			updateUsers(response.data.users);
		} catch (e) {
			const userExists = e.response.status === 403;
			updateRegistrationExistsFlag(userExists);
		}
	};

	const sendSignInRequest = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		updateLoginExistsFlag(true);
		updatePasswordMatchFlag(true);

		try {
			const payload = {login, password};
			const response = await Api.loginUser(payload);

			Api.setAuthHeader(response.data.token);
			localStorage.setItem('token', response.data.token);
			updateLoginStatus(true);
		} catch (e) {
			const loginError = e.response.status === 404;
			const passwordError = e.response.status === 401;
			updateLoginExistsFlag(!loginError);
			updatePasswordMatchFlag(!passwordError);
		}
	};

	const logOutUser = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		localStorage.removeItem('token');
		updateLoginStatus(false);
	};

	const sendAuthenticationRequest = async (token: string) => {
		try {
			const response = await Api.authenticateUser(token);
			updateLoginStatus(true);
			updateLogin(response.data.login);
			localStorage.setItem('token', response.data.newToken);
		} catch (e) {
			console.log(`Authentication failed`);
		}
	};

	const getMenu = async () => {
		updateTokenError('');

		try {
			const response = await Api.getMenu();
			console.log(response);
		} catch (error) {
			if (error.response && error.response.data.message.indexOf('jwt') > -1) {
				updateTokenError(error.response.data.message);
			} else {
				console.error(error);
			}
		}
	};

	return (
		<div className="Login">
			<h2 className="title">Login (Json Web Token)</h2>
			<h3 className="info">
				Login status:
				<span className={isLoggedIn ? "status success" : "status warning"}>
					logged {isLoggedIn ? 'in' : 'out'}
				</span>
			</h3>
			<form className="form">
				{
					!isLoggedIn &&
					<div>
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
							<button className="btn btn-blue" onClick={sendSignUpRequest}>
								Sign Up (Add user)
							</button>
							<button className="btn btn-blue" onClick={sendSignInRequest}>
								Sign in
							</button>
						</div>
					</div>
				}
				{
					isLoggedIn &&
					<div>
						<h4 className="welcome-msg">Welcome, <strong>{login}</strong></h4>
						<div className="btn-container">
							<button className="btn btn-blue" onClick={logOutUser}>
								Log out
							</button>
						</div>
					</div>
				}
			</form>
			<div className="users-list">
				<h3 className="users-title">Registered users:</h3>
				{users.map((user, index) => (
					<span key={index} className="users-name">
						{user}{index !== users.length - 1 && ', '}
					</span>
				))}
			</div>
			{
				isLoggedIn &&
				<div className="btn-container">
					<button className="btn btn-blue" onClick={getMenu}>
						Get Menu
					</button>
					{
						tokenError.length !== 0 &&
						<span className="validation-msg">
							Error: {tokenError}. Try to refresh the page.
						</span>
					}
				</div>
			}
		</div>
	);
};

export default Login;
