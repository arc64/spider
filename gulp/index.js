// Gulp and plugins
var
  gulp = require('gulp'),
  umd    = require('gulp-umd'),
  rimraf = require('gulp-rimraf'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
//sass = require('gulp-sass'), // for building css from scss
//minifycss = require('gulp-minify-css'), // for minifiing css
  jshint = require('gulp-jshint'),
  testem = require('gulp-testem'),
  connect = require('gulp-connect'),
  es6ModuleTranspiler = require("gulp-es6-module-transpiler");

// paths
var
  src = './src/js/',
//scss = './scss/',
//scssFiles = [],
//scssDependencies = [],
  dist = './dist/',
  jsFiles = [
    src + 'simple-graph.js'
  ];


gulp.task('default', ['jshint', 'test', 'build:js']);

gulp.task('clean', function () {
  return gulp.src([dist + 'spider.js', dist + 'spider.min.js'], {read: false})
    .pipe(rimraf());
});

// build css files from scss
//gulp.task('build:css', ['clean'], function () {
//  return gulp.src(scssFiles)
//    .pipe(sass({includePaths: scssDependencies}))
//    .pipe(minifycss())
//    .pipe(gulp.dest(dist));
//});

gulp.task('build:js', ['clean'], function () {
  return gulp.src(jsFiles)
    .pipe(concat({path: 'spider.js'}))
    .pipe(umd(
        {
          dependencies:function() {
            return [{
              name: 'd3',
              amd: 'd3',
              cjs: 'd3',
              global: 'd3',
              param: 'd3'
            },
            {
              name: 'jquery',
              amd: 'jquery',
              cjs: 'jquery',
              global: 'jQuery',
              param: '$'
            }];
          },
          exports: function() {
            return "spider";
          },
          namespace: function() {
            return "spider";
          }
        }
    ))
    .pipe(gulp.dest(dist))
    .pipe(rename('spider.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist));
});

// Check source js files with jshint
gulp.task('jshint', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Run test suite server (testem')
gulp.task('test', function() {
  return gulp.src([''])
    .pipe(testem({
      configFile: 'testem.json'
    }));
});


// Development server tasks
// NOTE: these paths will need changing when the SCSS source is ready
var roots = ['dist', 'examples', 'src', 'bower_components'],
    watchables = roots.map(function(root) {
        return root + '/**/*';
    });

gulp.task('dev:watch', function() { return gulp.watch(watchables, ['jshint', 'dev:reload']); });
gulp.task('dev:reload', function() { return gulp.src(watchables).pipe(connect.reload()); });
gulp.task('serve', ['jshint', 'dev:serve', 'dev:watch']);

gulp.task('dev:serve', function() {
    connect.server({
        root: roots,
        port: 4300,
        livereload: true
    });
});
