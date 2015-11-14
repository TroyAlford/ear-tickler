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
* Run `gulp` - this builds, then starts a watcher to rebuild on any change
  * If you just want to build, use `gulp build`
  * If you just want to watch, use `gulp watch`
* Run `dev-server.js` for testing. It defaults to port 80, so you can just use `http://localhost`

## Testing & Releasing
Grunt will output the following directories:
* **builds/develop/**: All assets, compiled - but not minified, for ease in testing.
* **builds/release/**: All assets, compiled and minified, ready for production.