# React-Jobly

Jobly is a mock job listing and app that allows users to view companies as well as apply to jobs posted by those companies. JSON web tokens and BCrypt was used for authorization and authentication for user signup and login. The frontend is built in React, and the backend is built in Node.js/Express. The database is written in PostgreSQL. Styling is done with Bootstrap. 

See the live deployed app here: https://react-jobly-frontend-katieg.herokuapp.com/

Or follow the set up instructions below to run locally. 

# Setup

To clone the repository, run: 

```
git clone https://github.com/KatieJessupMcd/react-jobly.git
```

Run the following command to install the necessary packages in the root folder: 

```
npm install
```

You will need to start the front end and the back end in seperate tabs in the terminal

To start the front end server: 

```
cd frontend
npm start
```

Open a new tab in the terminal with the shortcut, command T

To start the back end server:
```
cd backend
nodemon
```
The app should now be running in your browser