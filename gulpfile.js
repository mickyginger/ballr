var gulp = require('gulp');
var del = require('del');
var bower = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var runSeq = require('run-sequence');
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');

gulp.task('clean', function(done) {
  return del(['public/dist/css', 'public/dist/js']);
});

gulp.task('bower', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src(bower({
    overrides: {
      bootstrap: {
        main: 'public/dist/css/bootstrap.css'
      },
      jquery: { ignore: true },
      'socket.io-client': {
        main: 'socket.io.js'
      }
    }
  }))
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/src/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/src/css'));
});

gulp.task('sass', function() {
  return gulp.src('public/src/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/src/css'))
});

gulp.task('concat', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src(['public/src/**/vendor.*', 'public/src/js/app.js', 'public/src/js/**/*.js', 'public/src/css/style.css'])
    .pipe(jsFilter)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/dist/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/dist/css'));
});

gulp.task('minify', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src('public/dist/**/app.*')
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('public/dist/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(cleancss())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/dist/css'));
});


gulp.task('replace:prod', function() {
  return gulp.src('./index.html')
    .pipe(replace(/app\.css/, 'app.min.css'))
    .pipe(replace(/app\.js/, 'app.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('replace:dev', function() {
  return gulp.src('./index.html')
    .pipe(replace(/app\.min\.css/, 'app.css'))
    .pipe(replace(/app\.min\.js/, 'app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('build', function(done) {
  runSeq('clean', 'bower', ['sass', 'concat'], ['minify', 'replace:prod'], done);
});

gulp.task('default', function() {
  livereload.listen();
  
  gulp.watch('bower.json', function() {
    runSeq('bower', 'sass', 'concat', function() {
      livereload.reload('public/index.html');
    });
  });

  gulp.watch(['public/src/js/**/*', 'public/src/scss/**/*', 'templates/**/*', 'index.html'], function() {
    runSeq('sass', 'concat', 'replace:dev', function() {
      livereload.reload('public/index.html');
    });
  });
});