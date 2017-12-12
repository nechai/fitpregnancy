var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var config = {
  path: {
    scss: './src/scss/**/*.scss'
  },
  output: {
    cssName: 'fitpreg.style.css',
    path: './stylesheets'
  }
};

gulp.task('scss', function() {
  return gulp.src(config.path.scss)
          .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(concat(config.output.cssName))
          .pipe(autoprefixer())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(config.output.path));
});

gulp.task('watcher', function() {
  gulp.watch(config.path.scss, ['scss']);
});

gulp.task('default', ['watcher']);
