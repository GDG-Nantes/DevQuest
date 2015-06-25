"use strict";
// Include gulp
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps")
var path = require("path");
var browserSync = require("browser-sync").create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

gulp.task('serve',  ['sass'], function(){
  browserSync.init({
    proxy:'localhost:8080'
  });
  gulp.watch("sass/**/*.scss", ['sass']);
  gulp.watch("./**/*.html").on('change', reload);
  gulp.watch("./javascript/*.js").on('change', reload);  
});

gulp.task('sass',function(){
  return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', function logError(error) {
        console.error(error);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));
});

/* Default task */
gulp.task("default", ["serve"]);