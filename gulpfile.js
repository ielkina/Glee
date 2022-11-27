const {
  src,
  dest,
  watch,
  parallel,
  series
} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const replace = require('gulp-replace');
const size = require('gulp-size');
const webp = require('gulp-webp');
// const webpHTML = require('gulp-webp-html');
const groupCssMediaQueries = require("gulp-group-css-media-queries");//для сжатого файла закоментировать

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
    notify: false
  })
}

function styles() {
  return src('src/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(groupCssMediaQueries())
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'src/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('src/img/**/*.*')
    .pipe(webp())
    .pipe(imagemin(
      [
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: true
          }, {
            cleanupIDs: false
          }]
        })
      ]
    ))
    .pipe(size({ title: 'IMG' }))
    .pipe(src('src/img'))
    .pipe(dest('public/img'))
}

function pugs() {
  return src('src/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('src'));
}

const htmlInclude = () => {
  return src(['src/html/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file',
    }))
    // .pipe(webpHTML())
    .pipe(dest('src'))
    .pipe(browserSync.stream());
}

function build() {
  return src([
    'src/*.html',
    'src/*.min.html',
    'src/img/**/*.*',
    'src/css/style.min.css',
    'src/font/*.woff',
    'src/font/*.woff2',
    'src/js/main.min.js'
  ], {
    base: 'src'
  })
    .pipe(dest('public'))
}

function cleanDist() {
  return del('public')
}

function watching() {
  watch(['src/**/*.pug'], pugs);
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/html/**/*.html'], htmlInclude);
  watch(['src/*.html']).on('change', browserSync.reload);
}


exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.htmlInclude = htmlInclude;
exports.pugs = pugs;

exports.build = series(cleanDist, images, build); //gulp build
exports.default = parallel(pugs, htmlInclude, styles, scripts, browsersync, watching) //gulp