const gulp = require('gulp');
const path = require('path');
const stylus = require('gulp-stylus');
const gutil = require('gulp-util');
const argv = require('yargs').argv;
const fs = require('fs');

const webpack = require('webpack-stream');
const webpack_config = require('./bin/webpack.config.js')();

gulp.task('stylus', (done) => {
	let srcDir = path.join(__dirname, 'src');
	fs.readdir(path.join(srcDir), (err, dirs) => {
		if(err)
			return console.log("Error reading src:".red,err);
		let styles = [];
		for (let i = 0; i < dirs.length; i++) {
			let dir = dirs[i];
			styles.push(runStylusOnDirectory(dir));
		}
		Promise.all(styles)
		.then((results) => {
			return done();
		}).catch((rejected) => {
			console.log('Failed to compile styles:',rejected);
		})
	});
});

//helper function - runs the stylus task for a specific directory
function runStylusOnDirectory(dir){
	return new Promise((resolve, reject) => {
		let styles_dir = path.join(__dirname, 'src', dir);
		let dist_dir = path.join(__dirname, 'public/dist');
		let styles = path.join(styles_dir, dir + '.styl');
		gulp.src(styles)
		.pipe(stylus())
		.pipe(gulp.dest(dist_dir))
		.on('end', () => {
			console.log('Finished stylus for:', dir);
			resolve(true)
		})
		.on('error', (err) => {
			console.log('Failed to compile stylus for directory:', dir);
			reject(err)
		});
	});
}

gulp.task('webpack', () => {
	console.log('Starting webpack...');

	if(argv.nowatch)
		webpack_config.watch = false;

	return gulp.src('')
		.pipe(webpack(webpack_config))
		.pipe(gulp.dest('./public/dist'))
		.on('end', () => {
			gutil.log('Completed Webpack');
		});
});

gulp.task('watch', (done) => {
	let srcDir = path.join(__dirname, 'src');

	//watch each directory independently
	fs.readdir(srcDir,(err, dirs)=>{
		for (let i = 0; i < dirs.length; i++) {
			let dirName = dirs[i];
			let dirPath = path.join(srcDir, dirName);
			gulp.watch(path.join(dirPath,'*.styl'), runStylusOnDirectory.bind(this,dirName));//Stylus listener
		}
	});

	gulp.start('webpack');//webpack automatically watches relevant files

	done()
});


gulp.task('build',['stylus','webpack'], () => {
	console.log('Build Complete');
});