var gulp = require('gulp');
var clean = require('gulp-clean-css');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');

// bianyisass
gulp.task('scss', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})

// 监测scss

// 启服务
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            host: '169.254.55.251',
            port: 9090,
            livereload: true,
            middleware: function(req, res, next) {
                var pname = url.parse(req.url).pathname;
                console.log(pname)
                next();
            }
        }))
})