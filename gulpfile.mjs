import gulp from 'gulp'; //import the gulp module

import dartSass from 'sass'; 
import gulpSass from 'gulp-sass'; //import gulp-sass module to convert sass to ccs files
const sass = gulpSass(dartSass); 

import cssnano from 'gulp-cssnano'; //import gulp-cssnano module to minify the css file
import rev from 'gulp-rev'; //import the gulp-rev module to append hashed string to the minified css file
import {deleteSync} from 'del'; //import del module assets from previous build
import terser from "gulp-terser"; //import gulp-terser to minify js
import imagemin from 'gulp-imagemin'; //import gulp-imagemin module to minify the images

/* /** -> means choose any folder/subfolder inside
   /* -> means choose any file inside
*/

// gulp task to minify css
gulp.task('css', function(done){
    console.log('minifying css..');

    // minification of scss to css
    gulp.src('./assets/sass/**/*.scss') //use the scss file in the mentioned directory
    .pipe(sass())  //convert the sass files to css files
    .pipe(cssnano())  //compress the css files
    .pipe(gulp.dest('./assets/css'));  //place the compressed files in the destination

    // the hashed/revised file and place in public|assets|css directory
    gulp.src('./assets/**/*.css')  //use the css file in the mentioned directory
    .pipe(rev())  //revise or append hash to the name of the file
    .pipe(gulp.dest('./public/assets'))  //place the revised files in the destination
    .pipe(rev.manifest({  //create a manifest.json file to store mapping of css and it's hashed file
        cwd: 'public',  //selects the current working directory
        merge: true     //if file alreday exists, then changes are merged
    }))
    .pipe(gulp.dest('./public/assets'));

    done(); //return
});

// gulp task to minify js
gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(terser())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});

// gulp task to minify images
gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets/images'));
    done();
});


// empty the public/assets directory after each build
gulp.task('clean:assets', function(done){
    deleteSync('./public/assets');
    done();
});

// execute the other tasks together
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});