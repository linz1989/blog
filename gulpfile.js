var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var raw_css = 'src/sass',
    com_css = 'src/styles';

//处理scss
gulp.task('sass', function() {
    ////编译scss
    sass(raw_css + '/**/*.scss')
      .pipe(gulp.dest(com_css))
});

//清理
gulp.task('clean', function () {
    return gulp.src(['dist/*', 'src/styles/*'], {read: false})
        .pipe(clean());
});

//启动server
gulp.task('connect', function () {
    connect.server({
        port: 8089
    });
});

//监控改变
gulp.task('watch', function (){
    gulp.watch(raw_css + '/**/*.scss', ['sass']);
});

gulp.task('default', function () {
  gulp.run(['clean','sass','watch', 'connect']);
});
