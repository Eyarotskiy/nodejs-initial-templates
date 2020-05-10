## Technologies

  - **Node.js + Express**
  - **React**
  - **Heroku**
  - **MongoDB + Mongoose**

### NPM commands
  
  - **npm install** - Installs dependencies for server 
  - **npm run client-install** - Installs dependencies for client 
  - **npm run dev** - Starts the client & server with concurrently 
  - **npm run server** - Starts the Express server only 
  - **npm run client** - Starts the React client only 
  - **npm run deploy** - Deploys changes to Heroku app (see more details in the section below) 
   
**Server runs on http://localhost:5000 and client on http://localhost:3000**

### App Configuration

  - Run **heroku create** inside app root (in console) to connect our app to heroku.
  - Create new DB on **mongodb.com** and copy connection URL.
  - Create **.env** file inside **server** folder and add there variable:
  `MONGO_URI = <URL_TO_MONGO_DB>`. 
  - Open **dashboard.heroku.com** and add `MONGO_URI` variable in Settings with the link to the DB.

### Webstorm (Intellij) IDE settings

  - **Languages & Frameworks => Javascript => Libraries => Add Node** (or enable if it's already added)
  - **npm install --save-dev @types/express** - to make IDE see Express methods  
 
