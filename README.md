# MERN Stack Blog article Backend
This is the backend server code for the https://mern-blog-app.netlify.app/. 


## You can test this app with just a few steps, clone this git repository and follow the following steps
                
1.  install NodeJS and MongoDB locally or use mongodb atlas.
2.  install dependencies  
`$ npm install`
3. After you have installed the dependencies, create `.env` file on the root of the project `/` with following variables
  
  ```javascript
PORT=5000
JWT_KEY="secret key<string>"
MONGO_URL="mongodb://127.0.0.1:27017/mernblog" // or use mongodb atlas
frontend="http://localhost:5173" // vite at frontend
  ```
4. run `$ npm run dev`
5. enjoy the backend server

----




## package.json
```json
"scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only ./src/index.ts",
    "start": "node ./dist/src/index.js",
    "buildd": "tsc -p .",
    "builddd": "tsc -p tsconfig.json && tsc-alias -p tsconfig.json",

    "ts.check": "tsc --project tsconfig.json",
    "build": "rimraf dist && tsc -p tsconfig.json && tsc-alias -p tsconfig.json",
    "add-build": "git add dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cookie-parser": "^1.4.3",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/multer": "^1.4.7",
    "@types/node": "^18.15.13",
    "@types/nodemailer": "^6.4.7",
    "nodemon": "^2.0.22",
    "pre-commit": "^1.2.2",
    "rimraf": "^5.0.1",
    "ts-node": "^10.9.1",
    "ts-node-dev": "^2.0.0",
    "tsc-alias": "^1.8.6",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.0.4",
    "typescript-transform-paths": "^3.4.6"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.2.1",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.1"
  },

  "pre-commit": [
    "ts.check",
    "build",
    "add-build"
  ]
```

