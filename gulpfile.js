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
  return del(['public/css', 'public/js']);
});

gulp.task('bower', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src(bower({
    overrides: {
      bootstrap: {
        main: 'dist/css/bootstrap.css'
      },
      jquery: { ignore: true },
      'socket.io-client': {
        main: 'socket.io.js'
      }
    }
  }))
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('lib/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('lib/css'));
});

gulp.task('sass', function() {
  return gulp.src('lib/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('lib/css'))
});

gulp.task('concat', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src(['lib/**/vendor.*', 'lib/js/app.js', 'lib/js/**/*.js', 'lib/css/style.css'])
    .pipe(jsFilter)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('minify', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src('public/**/app.*')
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(cleancss())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/css'));
});


gulp.task('replace:prod', function() {
  return gulp.src('public/index.html')
    .pipe(replace(/app\.css/, 'app.min.css'))
    .pipe(replace(/app\.js/, 'app.min.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('replace:dev', function() {
  return gulp.src('public/index.html')
    .pipe(replace(/app\.min\.css/, 'app.css'))
    .pipe(replace(/app\.min\.js/, 'app.js'))
    .pipe(gulp.dest('public'));
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

  gulp.watch(['lib/js/**/*', 'lib/scss/**/*', 'public/templates/**/*', 'public/index.html'], function() {
    runSeq('sass', 'concat', 'replace:dev', function() {
      livereload.reload('public/index.html');
    });
  });
});