var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var iife = require("gulp-iife");
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var lazypipe = require('lazypipe');
var del = require('del');


gulp.task('compile', function () {
    return gulp.src(["client/**/*.js"])
        .pipe(iife())
        .pipe(concat("main.js"))
        //.pipe(uglify())
        .pipe(gulp.dest("dist"));
});


gulp.task('useref', function () {
    //noinspection JSUnresolvedFunction
    return gulp.src(['client/**/*.html', '!*/bower_components/**/*'])
        .pipe(useref({}, lazypipe().pipe(function () {
            return gulpIf(['**/*.js', '!*/**/*.min.js'], iife());
        })))
        .pipe(gulpIf(['**/*.min.js'], uglify()))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function () {
    return gulp.src('client/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist']);
});

gulp.task('default', ['useref', 'images']);
