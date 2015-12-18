var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var  minifyCss = require('gulp-minify-css');

var scss_dir = 'app/scss/**/*.scss';

gulp.task('sass',function(){
	return gulp.src(scss_dir)
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
});

gulp.task('watch',['browserSync','sass'],function() {
	gulp.watch(scss_dir,['sass']);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});

gulp.task('browserSync',function(){
	browserSync({
		server: {
			baseDir:'app'
		}
	})
});

gulp.task('useref',function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('dist'))
});
