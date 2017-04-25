/* ==========================================================================
																	 GULP
	 ========================================================================== */


var gulp     	  =  require('gulp'),
		sass        =  require('gulp-sass'),
		notify      =  require('gulp-notify'),
		fontmin     =  require('gulp-fontmin'),
		browserSync =  require('browser-sync').create();

var pathSass = 'sass/*.scss',
		pathCss = 'css/';



/* ======================================================================================================
* 								Servidor
* ======================================================================================================*/



gulp.task('serve', function() {
		browserSync.init({
				injectChanges: true,
				files: ['index.html', 'css/*.css'],
				server: "./"
		});
});

/* ======================================================================================================
*								 Sass
* ======================================================================================================*/

gulp.task('sass', function(){
	gulp.src(pathSass)
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest(pathCss))
		.pipe(notify({ title: "SASS", message: "OK: Archivo compilado" }))
	.pipe(browserSync.stream());
})

/* ======================================================================================================
*								 Fonts
* ======================================================================================================*/

gulp.task('fonts', function () {
    return gulp.src('fonts/*.ttf')
        .pipe(fontmin({
            text: '',
        }))
        .pipe(gulp.dest('fonts/'));
});


/* ======================================================================================================
* 								Watch
* ======================================================================================================*/
gulp.task('watch', function() {
		gulp.watch('sass/*.scss', ['sass']); // Vigila cambios en los estilos
		gulp.watch('./src/js/*.js', ['scripts']);
});

/* ======================================================================================================
* 							Default Task
* ======================================================================================================*/
gulp.task('default', ['sass','serve', 'watch',]);
