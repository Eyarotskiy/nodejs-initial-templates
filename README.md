## Technologies

  - Node.js
  - React

## Installation and start
  
  - **npm install** - Installs dependencies for server 
  - **npm run client-install** - Installs dependencies for client 
  - **npm run dev** - Starts the client & server with concurrently 
  - **npm run server** - Starts the Express server only 
  - **npm run client** - Starts the React client only 
  - **npm run deploy** - Deploys changes to Heroku app (see Deployment section below) 
   
**Server runs on http://localhost:5000 and client on http://localhost:3000**

## Deployment (Heroku)

  - Run **heroku create** inside app root to connect our app to heroku.
  - Run **npm run deploy** to deploy master branch to heroku changes.

## Webstorm (Intellij) IDE settings

  - **Languages & Frameworks => Javascript => Libraries => Add Node** (or enable if it's already added)
  - **npm install --save-dev @types/express** - to make IDE see Express methods 
