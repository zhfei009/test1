var gulp = require('gulp');
var clean = require('gulp-clean-css');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var babel = require('gulp-babel');

// bianyisass
gulp.task('scss', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})

// 编译js
gulp.task('byjs', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./src/js/babel'))
})

// 监测scss
gulp.task('conscss', function() {
    gulp.watch(['./src/scss/**/*.scss', './src/js/**/*.js'], gulp.series('scss', 'byjs'))
})


// 启服务
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            host: '169.254.55.251',
            port: 9090,
            livereload: true,
            middleware: function(req, res, next) {
                var pname = url.parse(req.url).pathname;
                if (pname === '/favicon.ico') {
                    return res.end()
                }
                if (pname === '/asds') {
                    res.end(JSON.stringify({ code: 1 }))
                } else {
                    pname = pname === '/' ? 'index.html' : pname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pname)));
                }
            }
        }))
});

// 管理
gulp.task('default', gulp.series('scss', 'byjs', 'server', 'conscss'));