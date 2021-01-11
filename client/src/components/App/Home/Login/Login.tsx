import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import 'components/App/Home/Login/Login.scss';
import Api from 'Api/Api';

const Login = () => {
	const [users, setUsers] = useState([]);
	const [loginExistsFlag, setLoginExistsFlag] = useState(true);
	const [confirmationFlag, setConfirmationFlag] = useState(true);
	const [passwordMatchFlag, setPasswordMatchFlag] = useState(true);
	const [registrationExistsFlag, setRegistrationExistsFlag] =
		useState(false);
	const [login, setLogin] = useState('test@test.com');
	const [password, setPassword] = useState('1');
	const [isLoggedIn, setLoginStatus] = useState(false);
	const [tokenError, setTokenError] = useState('');

	useEffect(() => {
		const loadData = async () => {
			const storedToken = localStorage.getItem('token');
			const response = await Api.getUsers();
			setUsers(response.data.users);

			if (storedToken) await sendAuthenticationRequest(storedToken);
		};

		loadData();
	}, []);


	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
		resetFlags();
	};

	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const sendSignUpRequest = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		resetFlags();

		try {
			const payload = {login, password};
			const response = await Api.signUpUser(payload);
			setUsers(response.data.users);
		} catch (e) {
			const userExists = e.response.status === 403;
			setRegistrationExistsFlag(userExists);
		}
	};

	const sendSignInRequest = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		resetFlags();

		try {
			const payload = {login, password};
			const response = await Api.loginUser(payload);

			Api.setAuthHeader(response.data.token);
			localStorage.setItem('token', response.data.token);
			setLoginStatus(true);
		} catch (e) {
			const loginError = e.response.status === 404;
			const confirmationError = e.response.status === 403;
			const passwordError = e.response.status === 401;
			setLoginExistsFlag(!loginError);
			setConfirmationFlag(!confirmationError);
			setPasswordMatchFlag(!passwordError);
		}
	};

	const logOutUser = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		localStorage.removeItem('token');
		setLoginStatus(false);
	};

	const sendAuthenticationRequest = async (token: string) => {
		try {
			const response = await Api.authenticateUser(token);
			setLoginStatus(true);
			setLogin(response.data.login);
			localStorage.setItem('token', response.data.newToken);
		} catch (e) {
			console.log(`Authentication failed`);
		}
	};

	const getMenu = async () => {
		setTokenError('');

		try {
			const response = await Api.getMenu();
			console.log(response);
		} catch (error) {
			if (error.response && error.response.data.message.indexOf('jwt') > -1) {
				setTokenError(error.response.data.message);
			} else {
				console.error(error);
			}
		}
	};

	const resetFlags = () => {
		setLoginExistsFlag(true);
		setPasswordMatchFlag(true);
		setRegistrationExistsFlag(false);
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
								{
									!confirmationFlag &&
									<span className="validation-msg">Email is not confirmed</span>
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
