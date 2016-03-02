var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  browserify = require('gulp-browserify'),
  minifyHTML = require('gulp-minify-html'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss'),
  cssnano = require('cssnano'),
  animation = require('postcss-animation'),

  source = 'process/css/',
  dest = 'builds/postcss/';

var env = 'production', outputDir;

if (env==='development') {
    outputDir = 'builds/development/';
} else {
    outputDir = 'builds/production/';
}

gulp.task('html', function() {
  gulp.src(dest + '*.html');
});

// gulp.task('js', function() {
//   gulp.src('process/' + 'script.js')
//   .pipe(browserify())
//   .on('error', gutil.log)
//   .pipe(gulp.dest(dest + 'js'));
// });

gulp.task('js', function() {
  // gulp.src(jsSources)
  gulp.src('process/' + 'script.js')
    // .pipe(concat('script.js'))
    .pipe(browserify())
    .on('error', gutil.log)
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(dest + 'js'));
    // .pipe(gulp.dest(outputDir + 'js'))
    // .pipe(connect.reload())
});

gulp.task('css', function() {
  gulp.src(source + 'style.css')
  .pipe(postcss([
    precss(),
    animation(),
    autoprefixer(),
    cssnano({discardComments: {removeAll: true}})
  ]))
  .on('error', gutil.log)
  .pipe(gulp.dest(dest + 'css'));
});

gulp.task('watch', function() {
  gulp.watch('process/' + '*.js', ['js']);
  gulp.watch(source + '**/*.css', ['css']);
  gulp.watch(dest + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['html', 'css', 'js', 'webserver','watch']);
