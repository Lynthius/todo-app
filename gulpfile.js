const gulp = require("gulp");
const browserSync = require("browser-sync").create();

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./css/**/*.css').on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
};

exports.watch = watch;
