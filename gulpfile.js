"use strict";
// Include gulp
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

var credentials = require('./credentials.json');
if (!credentials){
  credentials['GOOGLE_CLIENT'] = "xxxxxxx.apps.googleusercontent.com";
  credentials['TWITTER_CLIENT'] = "xxxxxxx";
  credentials['TWITTER_CLIENT_SECRET'] = "xxxxxxx";
  credentials['GITHUB_CLIENT'] = "xxxxxxx";
  credentials['GITHUB_CLIENT_SECRET'] = "xxxxxxx";
}

gulp.task('clean', function(){
  return del.sync([
    ".tmp",
    ENV === "prod" ? "dist/**" : "dev/**"
    ]);
});

gulp.task("copy-site", function(){
  return gulp.src(["index.html", "redirect.html", "robots.txt", "sitemap.xml", "bundle.js", "assets/**", "css/**", "lib/**"], { "base" : "." })
    .pipe(gulp.dest(ENV === "prod" ? "dist" : "dev"));
});

gulp.task("copy-go", function(){
  return gulp.src(["src/golang/devquest.go"], { "base" : "." })
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(ENV === "prod" ? "dist" : "dev"));
})

gulp.task("copy", ["copy-site", "copy-go"], function () {
  return gulp.src(["app.yaml", "devquest.go"], { "base" : "." })
    .pipe(gulp.dest(ENV === "prod" ? "dist" : "dev"));
});

gulp.task("set_prod", function(){
  ENV = "prod";
});

gulp.task("set_dev", function(){
  ENV = "dev";
});


gulp.task("rev_index", ["copy"], function () {
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

gulp.task('go_app', shell.task(['goapp serve dev']));

gulp.task('watch',  function(){
  browserSync.init({
    proxy : 'http://localhost:8080'
  });
  gulp.watch("./src/sass/**/*.scss", ['sass', 'copy-site']);
  gulp.watch("./src/js/**/*.js", ['browserify', 'copy-site']);  
  gulp.watch("./src/**/*.html", ['copy-site']);  
  gulp.watch("./src/golang/devquest.go", ['copy-go']);  
  gulp.watch("./bundle.js", ['copy-site']);
  gulp.watch("./dev/**/*.html").on('change', reload);
  gulp.watch("./dev/bundle.js").on('change', reload);  
});

gulp.task('serve', function(){
  runSequence(
    'copy', 
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
gulp.task('build', ['set_prod', 'clean', 'browserify', 'sass', 'rev_index']);
gulp.task('dev', ['set_dev', 'clean', 'browserify', 'sass', 'serve']);