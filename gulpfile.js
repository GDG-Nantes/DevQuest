"use strict";
// Include gulp
var fs = require("fs");
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps")
var path = require("path");
var browserSync = require("browser-sync").create();
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

var rev = require("gulp-rev");
var uglify = require("gulp-uglify");
var usemin = require("gulp-usemin");
var minifyCss = require('gulp-minify-css');
var minifyHtml = require("gulp-minify-html");
var del = require("del");

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var reload = browserSync.reload;
var ENV = "dev";

console.log("Variable d'environement : "+process.env.SPREADSHEET_VAR);
fs.writeFile('app_env.yaml'
            , "env_variables:\n"
                +"  SPREADSHEET_VAR: '"+process.env.SPREADSHEET_VAR+"'"
            , function(err){
              if(err){
                return console.log(err);
              }
            });

gulp.task('clean', function(){
  return del.sync([
    ".tmp",
    "dist/**"
    ]);
});


gulp.task("copy", function () {
  return gulp.src(["app.yaml", "app_env.yaml", "devquest.go", "index.html", "redirect.html", "robots.txt", "sitemap.xml", "bundle.js", "assets/**", "css/**", "lib/**"], { "base" : "." })
    .pipe(gulp.dest("dist"));
});

gulp.task("set_prod", function(){
  ENV = "prod";
});

gulp.task("set_dev", function(){
  ENV = "dev";
});


gulp.task("rev_index", function () {
  process.chdir(path.join(__dirname, "dist"));
  return gulp.src("./index.html")
    .pipe(usemin({
      css: [
        minifyCss(),
        rev()
      ],
      html: [
        minifyHtml({empty: true})
      ],
      jsscripts: [
        uglify(),
        rev()
      ]
    }))
    .pipe(gulp.dest("."));
});

gulp.task('go_app', shell.task(['goapp serve']));

gulp.task('watch',['browserify', 'sass'], function(){
  browserSync.init({
    proxy : 'http://localhost:8080'
  });
  gulp.watch("./src/sass/**/*.scss", ['sass']);
  gulp.watch("./src/js/**/*.js", ['browserify']);  
  gulp.watch("./**/*.html").on('change', reload);  
  gulp.watch("./bundle.js").on('change', reload);
});

gulp.task('serve', function(){  
  runSequence(
    ['watch', 'go_app']
  );  
});

gulp.task('sass',function(){
  if (ENV === "prod"){
    return gulp.src('./src/sass/**/*.scss')    
    .pipe(sass()).on('error', function logError(error) {
        console.error(error);
    })
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));  
  }else{
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', function logError(error) {
        console.error(error);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));  
  }  
});

gulp.task('browserify',function(){
  return browserify(['./src/js/app.js'], {debug:ENV==='dev'})
    .bundle()    
    .on('error', function(err){
      console.log(err);
      this.emit('end');
    })    
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
});


/* Default task */
gulp.task("default", ["dev"]);
gulp.task('build', function(){
  runSequence(
    'set_prod'
    , ['clean', 'browserify', 'sass']
    , 'copy'
    , 'rev_index'
  );  
});
gulp.task('dev', ['set_dev','clean',  'serve']);