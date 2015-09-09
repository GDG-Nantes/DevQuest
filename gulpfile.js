"use strict";
// Include gulp
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps")
var path = require("path");
var browserSync = require("browser-sync").create();
var sass = require('gulp-sass');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var reload = browserSync.reload;
var credentials = require('./credentials.json');
if (!credentials){
  credentials['GOOGLE_CLIENT'] = "xxxxxxx.apps.googleusercontent.com";
  credentials['TWITTER_CLIENT'] = "xxxxxxx";
  credentials['TWITTER_CLIENT_SECRET'] = "xxxxxxx";
  credentials['GITHUB_CLIENT'] = "xxxxxxx";
  credentials['GITHUB_CLIENT_SECRET'] = "xxxxxxx";
}



gulp.task('serve',  ['browserify','sass'], function(){
  browserSync.init({
    server:'./',
    port : 8080
  });
  gulp.watch("./src/sass/**/*.scss", ['sass']);
  gulp.watch("./src/js/**/*.js", ['browserify']);  
  gulp.watch("./**/*.html").on('change', reload);
  gulp.watch("./bundle.js").on('change', reload);
});

gulp.task('sass',function(){
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', function logError(error) {
        console.error(error);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));
});


gulp.task('browserify',function(){
  return browserify(['./src/js/app.js'], {debug:true})
    .bundle()    
    .on('error', function(err){
      console.log(err.stack);
      this.emit('end');
    })    
    .pipe(source('bundle.js'))
    .pipe(replace('<GOOGLE_CLIENT>', credentials['GOOGLE_CLIENT']))
    .pipe(replace('<TWITTER_CLIENT>', credentials['TWITTER_CLIENT']))
    .pipe(replace('<TWITTER_CLIENT_SECRET>', credentials['TWITTER_CLIENT_SECRET']))
    .pipe(replace('<GITHUB_CLIENT>', credentials['GITHUB_CLIENT']))
    .pipe(replace('<GITHUB_CLIENT_SECRET>', credentials['GITHUB_CLIENT_SECRET']))
    .pipe(gulp.dest('./'));
});

/* Default task */
gulp.task("default", ["serve"]);
gulp.task('build', ['browserify', 'sass']);