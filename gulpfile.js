const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/styles/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/styles/css"))
        .pipe(browserSync.stream())
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/styles/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/images/**/*").on('add', gulp.parallel('images'));
    gulp.watch("src/fonts/**/*").on('add', gulp.parallel('fonts'));
    gulp.watch("src/icons/**/*").on('add', gulp.parallel('icons'));
    gulp.watch("src/js/**/*").on('change', gulp.parallel('scripts'));
    gulp.watch("src/*.html").on('change', gulp.parallel('miniHtml'));
});

gulp.task('miniHtml', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest('dist/icons'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'images', 'fonts', 'icons', 'scripts', 'miniHtml'));