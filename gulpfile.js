// destructing gulp api methods
const { src, dest, series, parallel, watch } = require('gulp'),
      uglifyJS    = require('gulp-uglify'),
      uglifyCSS   = require('gulp-clean-css'),
      sass        = require('gulp-sass'),
      concat      = require('gulp-concat'),
      imagemin    = require('gulp-imagemin'),
      rename      = require('gulp-rename'),
      browserSync = require('browser-sync').create(),
      iff         = require('gulp-if'),
      del         = require('del');

// dir for folder locations
const dir = {
    src    : './src',         // folder with development files
    dist   : './dist',        // folder for production
    js     : './src/js',      // folder with js files
    css    : './src/css',     // folder with css styles
    sass   : './src/sass',    // folder with sass files
    images : './src/images'   // folder with images
}

// compile sass
const compileSass = () => {
    return src(`${dir.sass}/global.scss`, { sourcemaps: true })
               .pipe(sass())
               .pipe(rename('all.min.css'))
               .pipe(dest(dir.css, { sourcemaps: '.' }))
               .pipe(browserSync.stream());
}

// minify css files
const minifyCss = () => {
    return src(`${dir.css}/*.css`)
               .pipe(uglifyCSS())
               .pipe(dest(`${dir.dist}/styles`));
}

// concat js scripts
const concatScripts = () => {
    return src(`${dir.js}/**/*.js`, { sourcemaps: true })
               .pipe(concat('all.min.js'))
               .pipe(dest(dir.js, { sourcemaps: '.' }));
}

// minify js scripts
const minifyJs = () => {
    return src(`${dir.js}/all.min.js`)
               .pipe(uglifyJS())
               .pipe(dest(`${dir.dist}/scripts`));
}

// optimize jpg and png files
const optimizeImages = () => {
    return src([`${dir.images}/*.jpg`, `${dir.images}/*.png`])
               .pipe(imagemin())
               .pipe(dest(`${dir.dist}/content`));
}

// move assets - all html files and icons
const assets = () => {
    return src([`${dir.src}/*.html`, `${dir.src}/icons/**`])
               .pipe(iff('*.html', dest(dir.dist)))
               .pipe(dest(`${dir.dist}/icons`));
}

// cleaning task
const clean = () => {
    return del([dir.dist, dir.css, `${dir.js}/all.min.js*`]);
}

// serving production files
const serve = () => {
    browserSync.init({
        server: {
            baseDir: dir.dist
        }
    });

    watch(`${dir.sass}/*.scss`, series(compileSass, minifyCss));
}

exports.default = series(clean, parallel(concatScripts, compileSass, optimizeImages, assets), parallel(minifyJs, minifyCss), serve);
exports.build   = series(clean, parallel(concatScripts, compileSass, optimizeImages, assets), parallel(minifyJs, minifyCss));
exports.scripts = series(concatScripts, minifyJs);
exports.styles  = series(compileSass, minifyCss);
exports.images  = optimizeImages;
exports.clean   = clean;