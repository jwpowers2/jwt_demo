# JSON Web Tokens Demo

### JSON Web Tokens (JWT) are signed tokens in order to provide integrity of data

### JWT can be used to encrypt data/claims (jwt.io)

### Authorization

1. JWT is great for authorization

2. scenario: a user logs into a website, each subsequent request includes the JWT, allowing the user to access certain resources

3. it is popular with Single Sign On

4. JWT verifies that the person using the token is the one who signed it, preventing client-token fraud

### Information Exchange

1. JWT can be used to securely transmit data between parties (jwt.io)

2. confidentiality of payload is provided by encryption

3. the signature is calculated using the header and the payload so integrity of data is assured

4. JWT's are signed, assuring real authentication of who the sender is


# the DEMO web application 

## demo design details

* Node.js/Express (port 21337) backend with two templates login and index rendered by EJS

* dynamic content by Vanilla JS

* web actions use axios module

## how to start the web app

1. clone the repo
    
    git clone https://github.com/MindPointGroup/jwpowers2_technical

2. dependencies and services you need to run the application

    * you'll need Node.js, npm (node package manager), and MongoDB

    * from project root (same dir as package.json file), install dependencies with node package manager (npm)

        npm install 

    * install nodemon globally if you want to use it to run server.js, you can also just use "node server.js"

        npm install -g nodemon

    * run project using nodemon

    nodemon server.js

    * need to start mongod if not started already (example below for ubuntu 16). Varies by Operating System and version of Linux

    systemctl start mongod

    * open local browser to localhost:21337
    * project should be running at localhost:21337

    

