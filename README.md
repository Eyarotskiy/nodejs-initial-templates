## Technologies

  - **Node.js + Express**
  - **React**
  - **Heroku**
  - **MongoDB + Mongoose**
  - **WebSockets**
  - **Google Analytics**
  - **Json Web Token**
  - **Email**
  - **Cron Jobs**

### NPM commands
  
  - **npm install** - Installs dependencies for server 
  - **npm run client-install** - Installs dependencies for client 
  - **npm run app** - Starts the client & server with concurrently 
  - **npm run server** - Starts the Express server only 
  - **npm run server:build** - Builds server files (from Typescript to Javascript)  
  - **npm run client** - Starts the React client only 
  - **npm run deploy** - Deploys changes to Heroku app (run server:build and commit changes to master beforehand) 
   
**Server runs on http://localhost:5000 and client on http://localhost:3000**

### App Configuration

  - Run **heroku create** inside app root (in console) to connect our app to heroku.
  - Add mLab addon in Heroku dashboard and create DB. 
  - Create **.env** file inside **server** folder and add there variables: <br/>
  `MONGO_URI_LOCAL = <URL_TO_MONGO_DB>` (DB to work locally) <br/>
  `MONGO_URI = <URL_TO_MLAB_DB>` (DB in Heroku)<br/>
  `EMAIL_LOGIN = <GMAIL_LOGIN>` (used for sending emails during sign up)<br/>
  `EMAIL_PASSWORD = <GMAIL_PASSWORD>`.
  - Paste the correct openSocket link (for localhost / prod) inside client WebSocket.ts file.
  - Paste correct Google Analytics ID inside ReactGA.initialize().
  
### Heroku
  
  Heroku is a platform used for app hosting. List of available commands (via Terminal):
  - **heroku open** - opens heroku app URL in browser
  - **heroku local** - runs locally heroku app (to test locally how the app will work on prod)
  - **heroku config** - shows the list of env variables (declared on heroku side)
  - **heroku domains** - shows the list of heroku domains used for the app 

### Webstorm (Intellij) IDE settings

  - **Languages & Frameworks => Javascript => Libraries => Add Node** (or enable if it's already added)
  - **npm install --save-dev @types/express** - to make IDE see Express methods  
 
