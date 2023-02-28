# Storefront Backend Project

## how to set up the database and local enviroment

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
