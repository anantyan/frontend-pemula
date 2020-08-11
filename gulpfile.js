const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefix = require('autoprefixer');
const sync = require('browser-sync').create();

const css = () => gulp.src('./source/assets/css/**/*.scss')
        .pipe(sass())
        .pipe(postcss([
            precss(),
            autoprefix()
        ]))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(sync.stream());

const js = () => gulp.src('./source/assets/js/**/*.js')
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./public/assets/js'))
        .pipe(sync.stream());

const browserSync = () => {
    sync.init({
        server: {
            baseDir: "./public"
        }
    })

    gulp.watch('./source/assets/css/**/*.scss', css);
    gulp.watch('./source/assets/js/**/*.js', js);

    gulp.watch('./public/assets/css/**/*.css').on('change', sync.reload);
    gulp.watch('./public/assets/js/**/*.js').on('change', sync.reload);
    gulp.watch('./public/*.html').on('change', sync.reload);
};

const defaultTask = () => {
    css;
    js;
    browserSync;
};

exports.css = css;
exports.js = js;
exports.sync = browserSync;
exports.default = defaultTask;