# Ear-Tickler: 

## FLUX React JS Boilerplate
This project's is structured after [`flux-react-boilerplate`](https://github.com/christianalfoni/flux-react-boilerplate)
by [Christian Alfoni](https://github.com/christianalfoni), and uses [Howler.js](https://github.com/goldfire/howler.js) 
in order to interact with the WebAudio API.

Also, much love to [humanhighway](https://github.com/humanhighway) for the inspiring work at 
[`react-audio-player`](https://github.com/humanhighway/react-audio-player), which gave me a huge edge in building the 
first versions and getting them working.

### More Info:
* [Facebook React](http://facebook.github.io/react/)
* [Facebook Flux](http://facebook.github.io/flux/)
* [Howler.js](https://github.com/goldfire/howler.js)

## Development
* Clone the repo to your working directory
* Run `npm install`
* Run `gulp` - this makes any change to `app` or `styles` automatically rebuild
* Run `dev-server.js` for testing. It defaults to port 80, so you can just use `http://localhost`
* Run `gulp test` to run all tests with phantomJS and produce XML reports

## Production Build (minified)
* Run `gulp deploy`

### Directory
* **build/**: Where your automatically builds to. This is where you launch your app in development
* **dist/**: Where the deployed code exists, ready for production
* **styles/**: Where you put your css files
* **specs/**: Where you put your test files
* **gulpfile**: Gulp configuration
