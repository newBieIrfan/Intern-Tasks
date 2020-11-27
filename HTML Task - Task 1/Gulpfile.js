'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  });
  
  gulp.task('default', function () {
    gulp.watch('./scss/*.scss', ['sass']);
  });
  
//   gulp.task('default', function() {
//       gulp.task('sass:watch');
//   });