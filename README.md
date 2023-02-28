# Storefront Backend Project
## packages
-    "bcrypt": "^5.1.0",
-    "body-parser": "^1.19.0",
-    "cors": "^2.8.5",
-    "db-migrate": "^0.11.13",
-    "db-migrate-pg": "^1.2.2",
-    "dotenv": "^16.0.3",
-    "express": "^4.18.2",
-    "jsonwebtoken": "^9.0.0",
-    "pg": "^8.5.1",
-    "supertest": "^6.3.3",
-    "ts-node-dev": "^2.0.0",
-    "typescript": "^4.1.3"
-    "@types/bcrypt": "^5.0.0",
-    "@types/cors": "^2.8.13",
-    "@types/express": "^4.17.9",
-    "@types/jasmine": "^3.6.3",
-    "@types/jsonwebtoken": "^9.0.1",
-    "@types/pg": "^7.14.7",
-    "@types/supertest": "^2.0.12",
-    "jasmine": "^3.99.0",
-    "jasmine-spec-reporter": "^6.0.0",
-    "jasmine-ts": "^0.3.0",
-    "ts-node": "^10.9.1",
-    "tsc-watch": "^4.2.9"
  
## enviroment variables

the reviewer should create a .env folder that includes the following information : 
- POSTGRES_HOST=0.0.0.0
- POSTGRES_PORT=3000
- POSTGRES_USER=pgress
- POSTGRES_PASSWORD=pgress
- POSTGRES_DB=storefront
- POSTGRES_DB_TEST=storefronttest
- ENV=dev
- BCRYPT_PASSWORD=testing123
- SALT_ROUNDS=10
- TOKEN_SECRET=secret123

there is already a migration folder that contains the structure(tables) of the database
the reviewer should install db-migrate with all other dependencies of the project

## how to setup the project
- open the project
- in the terminal while inside the project folder write  "npm install"
- create the .env file and fill it with the mentioned information
- enter psql terminal using the command "psql -U pgress" then create a database with the name "storefront" using the command "create database storefront"
- in the project terminal write "db-migrate up" to structure the database and create all the required tables
- in the prject terminal write "npm test" to test all the models, services, handlers, endpoints in one command
