const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task("default", ["styles","copy-html","copy-img"], function() {
  gulp.watch("sass/**/*.scss",["styles"]);
  gulp.watch("./index.html",["copy-html"]);
  browserSync.init({
    server: "./"
  });
});

gulp.task("styles", function() {
    gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
  });

gulp.task ("copy-html",function(){
  gulp.src('./index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task ("copy-img",function(){
  gulp.src('img/*')
    .pipe(gulp.dest('dist/img'));
});