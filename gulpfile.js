const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


function compilaSass() {
    return gulp.src('./scss/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream())
}

gulp.task('sass', compilaSass);

function browser() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
}

gulp.task('browserSync', browser);

function watch() {
    gulp.watch('./scss/**/*.scss', compilaSass);
    gulp.watch(['*.html']).on('change', browserSync.reload);
    gulp.watch(['./js/**/*.js']).on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch', 'browserSync'));