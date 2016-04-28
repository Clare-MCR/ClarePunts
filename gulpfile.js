var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var iife = require("gulp-iife");
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');


gulp.task('compile', function () {
    return gulp.src(["app/**/*.js"])
        .pipe(iife())
        .pipe(concat("main.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("dist"));
});


gulp.task('useref', function () {
    return gulp.src('app/**/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', iife()))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function () {
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});


gulp.task('default', ['useref', 'images']);
