const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


function compilaSass() {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream())
}

gulp.task('sass', compilaSass);

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', compilaSass);
    gulp.watch(['*.html']).on('change', browserSync.reload);
    gulp.watch(['./src/js/**/*.js']).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'browserSync'));