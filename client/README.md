This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

Michael HermanBlog About Talks RSS
Dockerizing a React App
Last update: May 17, 2019 • docker, react

Docker is a containerization tool that helps speed up the development and deployment processes. If you’re working with microservices, Docker makes it much easier to link together small, independent services. It also helps to eliminate environment-specific bugs since you can replicate your production environment locally.

This tutorial demonstrates how to Dockerize a React app using the Create React App generator. We’ll specifically focus on-

Setting up a development environment with code hot-reloading
Configuring a production-ready image using multistage builds
docker

Updates:

May 2019:
Updated to the latest versions of Docker, Node, React, and Nginx.
Added explanations for various Docker commands and flags.
Added a number of notes based on reader comments and feedback.
Feb 2018:
Updated to the latest versions of Node, React, and Nginx.
Added an anonymous volume.
Detailed how to configure Nginx to work properly with React Router.
Added a production build section that uses multistage Docker builds.
We will be using:

Docker v18.09.2
Create React App v3.0.1
Node v12.2.0
Contents
Project Setup
Docker
Docker Machine
Production
React Router and Nginx
Next Steps
Project Setup
Install Create React App globally:

\$ npm install -g create-react-app@3.0.1
Generate a new app:

$ create-react-app client
$ cd client
Docker
Add a Dockerfile to the project root:

# base image

FROM node:12.2.0-alpine

# set working directory

WORKDIR /app

# add `/app/node_modules/.bin` to \$PATH

ENV PATH /app/node_modules/.bin:\$PATH

# install and cache app dependencies

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app

CMD ["npm", "start"]
Silencing the NPM output, via --silent, is a personal choice. It’s often frowned upon, though, since it can swallow errors. Keep this in mind so you don’t waste time debugging.

Add a .dockerignore:

node_modules
This will speed up the Docker build process as our local dependencies will not be sent to the Docker daemon.

Build and tag the Docker image:

\$ docker build -t client:dev .
Then, spin up the container once the build is done:

$ docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm client:dev
If you run into an "ENOENT: no such file or directory, open '/app/package.json". error, you may need to add an additional volume: -v /app/package.json.

What’s happening here?

The docker run command creates a new container instance, from the image we just created, and runs it.
-v \${PWD}:/app mounts the code into the container at “/app”.

{PWD} may not work on Windows. See this Stack Overflow question for more info.

Since we want to use the container version of the “node_modules” folder, we configured another volume: -v /app/node_modules. You should now be able to remove the local “node_modules” flavor.
-p 3001:3000 exposes port 3000 to other Docker containers on the same network (for inter-container communication) and port 3001 to the host.

For more, review this Stack Overflow question.

Finally, --rm removes the container and volumes after the container exits.
Open your browser to http://localhost:3001/ and you should see the app. Try making a change to the App component within your code editor. You should see the app hot-reload. Kill the server once done.

What happens when you add -it?

$ docker run -it -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm client:dev
Check your understanding and look this up on your own.

Want to use Docker Compose? Add a docker-compose.yml file to the project root:

version: '3.7'

services:

client:
container_name: client
build:
context: .
dockerfile: Dockerfile
volumes: - '.:/app' - '/app/node_modules'
ports: - '3001:3000'
environment: - NODE_ENV=development
Take note of the volumes. Without the anonymous volume ('/app/node_modules'), the node_modules directory would be overwritten by the mounting of the host directory at runtime. In other words, this would happen:

Build - The node_modules directory is created in the image.
Run - The current directory is mounted into the container, overwriting the node_modules that were installed during the build.
Build the image and fire up the container:

\$ docker-compose up -d --build
Ensure the app is running in the browser and test hot-reloading again. Bring down the container before moving on:

\$ docker-compose stop
Windows Users: Having problems getting the volumes to work properly? Review the following resources:

Docker on Windows–Mounting Host Directories
Configuring Docker for Windows Shared Drives
You also may need to add COMPOSE_CONVERT_WINDOWS_PATHS=1 to the environment portion of your Docker Compose file. Review the Declare default environment variables in file guide for more info.

Docker Machine
To get hot-reloading to work with Docker Machine and VirtualBox you’ll need to enable a polling mechanism via chokidar (which wraps fs.watch, fs.watchFile, and fsevents).

Create a new Machine:

$ docker-machine create -d virtualbox client
$ docker-machine env client
$ eval $(docker-machine env client)
Grab the IP address:

\$ docker-machine ip client
Then, build the images and run the container:

\$ docker build -t client:dev .

$ docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm client:dev
Test the app again in the browser at http://DOCKER_MACHINE_IP:3001/ (make sure to replace DOCKER_MACHINE_IP with the actual IP address of the Docker Machine). Also, confirm that hot reload is not working. You can try with Docker Compose as well, but the result will be the same.

To get hot-reload working, we need to add an environment variable: CHOKIDAR_USEPOLLING=true.

$ docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true --rm client:dev
Test it out again. Ensure that hot reload works again.

Updated docker-compose.yml file:

version: '3.7'

services:

client:
container_name: client
build:
context: .
dockerfile: Dockerfile
volumes: - '.:/app' - '/app/node_modules'
ports: - '3001:3000'
environment: - NODE_ENV=development - CHOKIDAR_USEPOLLING=true
Production
Let’s create a separate Dockerfile for use in production called Dockerfile-prod:

# build environment

FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:\$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
Here, we take advantage of the multistage build pattern to create a temporary image used for building the artifact – the production-ready React static files – that is then copied over to the production image. The temporary build image is discarded along with the original files and folders associated with the image. This produces a lean, production-ready image.

Check out the Builder pattern vs. Multi-stage builds in Docker blog post for more info on multistage builds.

Using the production Dockerfile, build and tag the Docker image:

\$ docker build -f Dockerfile-prod -t client:prod .
Spin up the container:

\$ docker run -it -p 80:80 --rm client:prod
Assuming you are still using the same Docker Machine, navigate to http://DOCKER_MACHINE_IP in your browser.

Test with a new Docker Compose file as well called docker-compose-prod.yml:

version: '3.7'

services:

client-prod:
container_name: client-prod
build:
context: .
dockerfile: Dockerfile-prod
ports: - '80:80'
Fire up the container:

\$ docker-compose -f docker-compose-prod.yml up -d --build
Test it out once more in your browser. Then, if you’re done, go ahead and destroy the Machine:

$ eval $(docker-machine env -u)
\$ docker-machine rm client
React Router and Nginx
If you’re using React Router, then you’ll need to change the default Nginx config at build time:

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
Add the changes to Dockerfile-prod:

# build environment

FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:\$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
Create the following folder along with a nginx.conf file:

└── nginx
└── nginx.conf
nginx.conf:

server {

listen 80;

location / {
root /usr/share/nginx/html;
index index.html index.htm;
try_files $uri $uri/ /index.html;
}

error_page 500 502 503 504 /50x.html;

location = /50x.html {
root /usr/share/nginx/html;
}

}
Next Steps
With that, you should now be able to add React to a larger Docker-powered project for both development and production environments. If you’d like to learn more about working with React and Docker along with building and testing microservices, check out the Microservices with Docker, Flask, and React course.

48

Copyright © 2019 - Michael Herman
Questions? michael at mherman dot org
Back to top

Check out the Microservices with Docker, Flask, and React course!

Download Now

x
Share to Facebook
, Number of shares34
Share to Twitter
Share to Hacker News
Share to Reddit
, Number of shares32
More AddThis Share options
, Number of shares48

docker build -t client:dev .

docker run -v \${PWD}:/app -v /app/node_modules -p 3001:3000 --rm client:dev

docker-compose up -d --build
