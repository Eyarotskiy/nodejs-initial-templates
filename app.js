require('dotenv').config();
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8080;

app.use(express.json());

// Authenticate token for all the requests except login and route.
app.use('/', (req, res, next) => {
	if (req.url === '/' || req.url === '/login') {
		next();
	} else {
		authenticateToken(req, res, next);
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// Generate token. Add user/pass authentication here.
app.post('/login', async (req, res) => {
	const user = {name: req.body.user};
	const secret = process.env.JWT_SECRET;
	const expiration = {'expiresIn': '7d'};

	const token = await jwt.sign(user, secret, expiration);

	res.json({token});
});

app.get('/posts', (req, res) => {
	const posts = [{name: 'post1'}, {name: 'post2'}];

	res.json(posts);
});

// Verifies JWT.
function authenticateToken(req, res, next) {
	const token = req.headers['auth-token'];
	const secret = process.env.JWT_SECRET;

	if (!token) return res.sendStatus(401);

	jwt.verify(token, secret, (err, user) => {
		if (err) return res.sendStatus(401);

		console.log(user);
		next();
	});
}

app.listen(PORT, () => {
	console.log('Listening on port: ' + PORT);
});
