# EzNvoice

___Please be aware that the application is using AWS s3 that means you need AWS credentials, if you doesn't have have credentials you could not use some feature from the app___

How to start the app locally: 
```
    npm i
    docker-compose up -d  
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
```
