# Setup Project

[Top](./README.md)

<br>

# Table of Contents
1. [Project Info](#ProjectInfo)
2. [Project Setup](#ProjectSetup)

<br>

# 1. Project Info <a name="ProjectInfo"></a>
- Type: NEST JS
- Description: XSI Server

<br>

# 2. Project Setup <a name="ProjectSetup"></a>

## 2.1. Create Dev Docker Image
```console
$ cd ${PROJECT_PATH}

$ # Build dev docker image
$ docker compose build dev
```

## 2.2. Setup Environment
> Use DEV Docker Image to setup the project
```console
$ cd ${PROJECT_PATH}
$ mkdir -p workspace

$ # Ensure permission access is resolved between host and docker environment
$ sudo chmod -R o+w . 

$ # Run dev docker container
$ docker compose run --rm dev bash

dev-docker$ ## Develop within docker container..
```

## 2.3. Create Project

### 2.3.1. Create Nest JS Project
```console
dev-docker$ cd ${PROJECT_PATH}/workspace
dev-docker$ nest new $PROJECT_NAME --directory .  # Select npm
dev-docker$ rm -rf .git # Delete git folder inside workspace
dev-docker$ chmod -R 777 * # Optional: Set permission
```

### 2.3.2. Setup Project Environment
- REF: https://docs.nestjs.com/techniques/configuration
1. Install npm modules
    ```console
    dev-docker$ cd workspace
    dev-docker$ npm i --save @nestjs/config
    ```

2. Add to `src/app.modules.ts`
    ```
    imports: [ ...,
      ConfigModule.forRoot({  envFilePath: './env/.env' })
    ```
    - Env variables can be accessed by `process.env.XXX`

3. Add git submodules
    ```console
    $ mkdir -p ${PROJECT_PATH}/workspace/submodules
    $ cd ${PROJECT_PATH}
    $ git submodule add https://github.com/bayer-int/BRD_GXP_SilverLightCommon workspace/submodules/silverlight-common
    $ git submodule update --init --recursive
    ```
    - Make sure both of the submodules has been checked out to the right branch before using.


### 2.3.3. Install Swagger
- Ref: https://docs.nestjs.com/openapi/introduction
  ```console
  dev-docker$ cd workspace
  dev-docker$ npm install --save @nestjs/swagger swagger-ui-express
  dev-docker$ npm install class-validator class-transformer
  ```
- Update `main.ts` (Refer reference link)
- Install CLI plugin (this helps to maintain documentation without duplicate code). Ref: https://docs.nestjs.com/openapi/cli-plugin
  - Update nest-cli.json
    ```json
    {
        ...,
        "compilerOptions": {
          "plugins": [
            {
              "name": "@nestjs/swagger",
              "options": {
                "dtoFileNameSuffix": [".dto.ts", ".entyty.ts", ".def.ts"],
                "controllerFileNameSuffix": ".controller.ts"
              }
            }
          ]
        }
    }
    ```
- Check Swagger page (http://localhost:3000/api)

<br>

