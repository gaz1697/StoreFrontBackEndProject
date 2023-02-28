# Storefront Backend Project

## how to set up the database and local enviroment

the review should create a .env folder that includes the following information : 
- POSTGRES_HOST
- POSTGRES_PORT=3000
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
- POSTGRES_DB_TEST
- ENV=dev
- BCRYPT_PASSWORD
- SALT_ROUNDS
- TOKEN_SECRET

there is already a migration folder that contains the structure(tables) of the database
the reviewer should install db-migrate with all other dependencies of the project
