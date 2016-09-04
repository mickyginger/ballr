# Ballr: a Slack clone


This is an attempt at building a slack clone with a MEAN stack purely for educational purposes.

## The tech

### Server

- [Express 4.13.4](http://expressjs.com/)
- MongoDB and [Mongoose 4.6](http://mongoosejs.com)
- [Bluebird 3.4.6](https://github.com/petkaantonov/bluebird)
- [JWT 7.1.9](https://github.com/auth0/node-jsonwebtoken#readme)
- [Request Promise 4.1.1](https://github.com/request/request-promise#readme)
- [Socket.io 1.4.8](https://github.com/Automattic/socket.io#readme)
- [Socket.io-JWT 4.5.0](https://github.com/auth0/socketio-jwt#readme)
- [Underscore 1.8.3](http://underscorejs.org)

### Client

- [Angular 1.5.8](https://github.com/angular/bower-angular)
- [Angular Resource 1.5.8](https://github.com/angular/bower-angular-resource)
- [Angular UI Router 0.1.3](https://github.com/angular-ui/ui-router)
- [Satellizer 0.15.5](https://github.com/sahat/satellizer)
- [Angular JWT 0.1.3](https://github.com/auth0/angular-jwt)
- [Socket.io-client 1.4.8](https://github.com/LearnBoost/socket.io-client)
- [Bootstrap 4.0.0-alpha.3 (CSS only)](http://v4-alpha.getbootstrap.com/)
- [Gulp 3.9.1](http://gulpjs.com)

### Bugs/Issues

- Can't log out
- Desktop only
- <del>Inverted scroll on main page</del>

### To do

- Direct messaging
- Private channels
- Mobile UI
- <del>Emojis</del> 
- Markdown support
- File upload
- <del>Giphy</del>
- Parse messages for links and images
- Subscribe to users with sockets
- Cache user data
- Restrict the number of messages returned by the server, and lazy load older messages on scroll
- Limit total number of messages, and auto delete oldest ones


## Setup

Please feel free to fork the repo!

You'll need to have Gulp's CLI `npm i -g gulp-cli` to run the gulp tasks.

Once you've forked and cloned the repo, `npm i` and `node app` to start the server.
Run `gulp` in parallel to have gulp watch for changes in the `lib` folder.

`gulp build` will minify scripts and update the `index.html` to pull in the minified scripts.
