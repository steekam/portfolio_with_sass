const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass
gulp.task('sass', done => {
    gulp.src('scss/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
    done();
});

// Watch & serve
gulp.task('serve', done => {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('scss/*.scss',gulp.series('sass'));
    gulp.watch(['dist/**/*.html','dist/**/*.js']).on('change',browserSync.reload);
    done();
});

// Default
gulp.task('default', gulp.series('sass','serve'));