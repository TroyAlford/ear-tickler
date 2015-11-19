# Ear-Tickler

## Development
* Clone the repo to your working directory
* Run `npm install`
* Run `gulp` - this builds, then starts a watcher to rebuild on any change
  * If you just want to build, use `gulp build`
  * If you just want to watch, use `gulp watch`
* Run `dev-server.js` for testing. It defaults to port 8080, so you can use `http://localhost:8080`

## Testing & Releasing
Grunt will output the following directories:
* **builds/develop/**: All assets, compiled - but not minified, for ease in testing.
* **builds/release/**: All assets, compiled and minified, ready for production.