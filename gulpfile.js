var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var express = require('gulp-express');
var less = require('gulp-less');
var livereload = require('gulp-livereload');

var paths = {
  develop: './builds/develop',
  release: './builds/release'
}

var bundlerForApplicationJS = browserify({
  entries: './app/main.js',   // Only need initial file, browserify finds the rest
  transform: [babelify],      // We want to convert JSX to normal javascript
  debug: true,                // Gives us sourcemapping

  cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
}).external([
  // Do not rebundle these into main.
  'react', 'react/addons', 'flux-react'
]);
var bundlerForVendorJS = browserify({
  debug: true,
  require: ['react', 'react/addons', 'flux-react']
});

function rebuildAppJs() {
  var startTime = Date.now();
  console.log(startTime + ': Repackaging Application JavaScript...');
  bundlerForApplicationJS.bundle()
    .on('error', gutil.log)
    .pipe(source('main.js'))
    .pipe(gulp.dest(paths.develop + '/js'))
    .pipe(livereload())
    .pipe(notify(function () {
      var finishTime = Date.now();
      console.log('DEVELOP: main.js produced in ' + (finishTime - startTime) + 'ms');
    }))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.release + '/js'))
    .pipe(notify(function() {
      var finishTime = Date.now();
      console.log('RELEASE: main.js produced in ' + (finishTime - startTime) + 'ms');
    }));
}
function rebuildVendorJs() {
  var startTime = Date.now();
  console.log(startTime + ': Repackaging Vendor JavaScript...');
  bundlerForVendorJS.bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest(paths.develop + '/js'))
    .pipe(livereload())
    .pipe(notify(function () {
      var finishTime = Date.now();
      console.log('DEVELOP: vendors.js produced in ' + (finishTime - startTime) + 'ms');
    }))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.release + '/js'))
    .pipe(notify(function() {
      var finishTime = Date.now();
      console.log('RELEASE: vendors.js produced in ' + (finishTime - startTime) + 'ms');
    }));
}
function rebuildCss() {
  var startTime = Date.now();
  console.log(startTime + ': Repackaging Application CSS...');
  gulp.src('./styles/**/*.{css,less}')
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.develop + '/css'))
    .pipe(notify(function() {
      var finishTime = Date.now();
      console.log('DEVELOP: main.css produced in ' + (finishTime - startTime) + 'ms');
    }))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.release + '/css'))
    .pipe(notify(function() {
        var finishTime = Date.now();
        console.log('RELEASE: main.css produced in ' + (finishTime - startTime) + 'ms');
    }));
}

var assetMap = [
  { name: 'HTML Pages',   src: './app/**/*.html',             dest: '' },
  { name: 'Font Assets',  src: './fontello/font/**/*',        dest: '/font' },
  { name: 'Image Assets', src: './images/**/*.{gif,jpg,png}', dest: '/images' }
];
function rebuildAssets() {
  assetMap.forEach(function(mapping) {
    var startTime = Date.now();
    console.log(startTime + ': Repackaging ' + mapping.name + '...')
    gulp.src(mapping.src)
      .pipe(gulp.dest('./builds/develop' + (mapping.dest || '')))
      .pipe(gulp.dest('./builds/release'  + (mapping.dest || '')))
      .pipe(notify({ onLast: true, message: function() {
        var finishTime = Date.now();
        console.log(mapping.name + ' repackaged in ' + (finishTime - startTime) + 'ms');
      }}));
  });
};

gulp.task('build', function() {
  rebuildAppJs();
  rebuildVendorJs();
  rebuildCss();
  rebuildAssets();
});
gulp.task('watch', function() {
  watchify(bundlerForApplicationJS).on('update', rebuildAppJs);
  watchify(bundlerForVendorJS).on('update', rebuildVendorJs);
  gulp.watch('./styles/**/*.{css,less}', rebuildCss);
  assetMap.forEach(function(mapping) {
    gulp.watch(mapping.src, rebuildAssets);
  });
});
gulp.task('default', ['build', 'watch']);
