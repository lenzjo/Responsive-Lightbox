'use strict'

import gulp           from 'gulp';
import plugins        from 'gulp-load-plugins';
import browserSync    from 'browser-sync';
import rimraf         from 'rimraf';
import autoPrefixer   from 'autoprefixer';
import lost           from 'lost';
import colorFunction  from 'postcss-color-function';
import hexrgba        from 'postcss-hexrgba';
import cssImport      from 'postcss-import';
import mixins         from 'postcss-mixins';
import nested         from 'postcss-nested';
import cssVars        from 'postcss-simple-vars';

const $     = plugins();
const PORT  = 4000;

const PATH = {
  src: {
    css:      'src/_css/*.css',
    js:       [
                'src/_js/lightbox.js'
              ],
    html:     'src/*.html',
    img:      'src/_img/**/*.{png,jpeg,jpg,svg,gif}'
  },
  dest: {
    dir:      'dist',
    css:      'dist/css',
    js:       'dist/js',
    html:     'dist',
    img:      'dist/img',
    js:       'dist/js',
    dist:     'dist/**'
  },
  watch: {
    css:      'src/_css/**/*.css',
    html:     'src/*.html',
    img:      'src/_img/**/*.{png,jpeg,jpg,svg,gif}',
    js:       'src/_js/**/*.js'
  }
};

const BROWSERS = {
  browsers: [
    'last 2 version',
    'ie >=9'
  ]
};

const PROCESSORS = [
      cssImport,
      mixins,
      cssVars,
      nested,
      hexrgba,
      lost(),
      autoPrefixer(BROWSERS),
      colorFunction
    ];


/***************************************************************************
 *  TASKS
 */


gulp.task('dev', gulp.series(
    devCSS,
    devHTML,
    devIMAGES,
    devJS,
    server,
    watch
  )
);



/***************************************************************************
 *  Functions
 */

 // Start a server with BrowserSync to preview the site in
function server(done) {
  browserSync.init({
    // browser: 'chrome',
    notify: false,
    server: PATH.dest.dir,
    port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch(PATH.watch.css).on('all', gulp
    .series(devCSS, browserSync.reload));
  gulp.watch(PATH.watch.html).on('all', gulp
    .series(devHTML, browserSync.reload));
  gulp.watch(PATH.watch.img).on('all', gulp
    .series(devIMAGES, browserSync.reload));
  gulp.watch(PATH.watch.js).on('all', gulp
    .series(devJS, browserSync.reload));
};

function cleanDIST(done) {
  rimraf(PATH.dest.dir, done);
};


function devCSS() {
  return gulp
    .src(PATH.src.css)
    .pipe($.postcss(PROCESSORS))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe($.rename('styles.css'))
    .pipe(gulp.dest(PATH.dest.css))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', $.util.log);
};


function devHTML() {
  return gulp
    .src(PATH.src.html)
    .pipe(gulp.dest(PATH.dest.html))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', $.util.log);
};

function devIMAGES() {
  return gulp
    .src(PATH.src.img)
    .pipe(gulp.dest(PATH.dest.img))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', $.util.log);
};

function devJS() {
  return gulp
    .src(PATH.src.js)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.rename('app.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(PATH.dest.js))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', $.util.log);
}
