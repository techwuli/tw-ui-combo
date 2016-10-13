var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpLess = require('gulp-less');
var gulpUglify = require('gulp-uglify');
var gulpRename = require('gulp-rename');
var gulpUtil = require('gulp-util');
var gulpDirectiveReplace = require('gulp-directive-replace');
var lessPluginAutoPrefix = require('less-plugin-autoprefix');
var lessPluginCleanCss = require('less-plugin-clean-css');
var autoPrefix = new lessPluginAutoPrefix({
    browsers: ['last 2 versions']
});
var cleanCss = new lessPluginCleanCss();
var runSequence = require('run-sequence');

gulp.task('less', function() {
    return gulp
        .src('src/tw-ui-combo.less')
        .pipe(gulpLess({
            plugins: [autoPrefix, cleanCss]
        }).on('error', function(err) {
            gulpUtil.log(err);
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
    return gulp
        .src('src/tw-ui-combo.js')
        .pipe(gulpDirectiveReplace({
            root: 'src'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js_min', function() {
    return gulp
        .src('src/tw-ui-combo.js')
        .pipe(gulpDirectiveReplace({
            root: 'src'
        }))
        .pipe(gulpUglify())
        .pipe(gulpRename('tw-ui-combo.min.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', function() {
    gulp.watch('src/tw-ui-combo.html', ['js', 'js_min']);
    gulp.watch('src/tw-ui-combo.js', ['js', 'js_min']);
    gulp.watch('src/tw-ui-combo.less', ['less']);
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: '/example',
        files: [
            'dist/**/*',
            'example/**/*'
        ]
    });
});

gulp.task('serve-sync', ['less', 'js', 'js_min', 'serve']);
