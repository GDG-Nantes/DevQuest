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
var reload = browserSync.reload;

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
    .pipe(gulp.dest('./'));  
});

/* Default task */
gulp.task("default", ["serve"]);