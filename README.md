# Ear-Tickler: 

## FLUX React JS Boilerplate
This project's is structured after [`flux-react-boilerplate`](https://github.com/christianalfoni/flux-react-boilerplate)
by [Christian Alfoni](https://github.com/christianalfoni), and uses [Howler.js](https://github.com/goldfire/howler.js) 
in order to interact with the WebAudio API.

### More Info:
* [Facebook React](http://facebook.github.io/react/)
* [Facebook Flux](http://facebook.github.io/flux/)
* [Howler.js](https://github.com/goldfire/howler.js)

## Development
* Clone the repo to your working directory
* Run `npm install`
* Run `gulp`
* Start a webservice in the `build` folder, f.ex. `python -m SimpleHTTPServer 80`
* Go to `localhost` to display the app
* Go to `localhost/testrunner.html` to see your tests
* Any changes to `app` or `styles` folder will automatically rebuild to `build` folder
* Both tests and application changes will refresh automatically in the browser
* Run `gulp test` to run all tests with phantomJS and produce XML reports

## Production Build (minified)
* Run `gulp deploy`

### Directory
* **build/**: Where your automatically builds to. This is where you launch your app in development
* **dist/**: Where the deployed code exists, ready for production
* **styles/**: Where you put your css files
* **specs/**: Where you put your test files
* **gulpfile**: Gulp configuration
