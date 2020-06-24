'use strict';

let project_folder = require('path').basename(__dirname);
let sourse_folder = "app";
let fs = require('fs');

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
        copyCss: project_folder + '/css/liberis',
    },
    src: {
        html: [sourse_folder + '/*.html', '!' + sourse_folder + '/_*.html'],
        css: sourse_folder + '/scss/main.scss',
        js: sourse_folder + '/js/**/*.js',
        img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: sourse_folder + '/fonts/*.ttf',
        copyCss: sourse_folder + '/scss/**/*.{css,map}',
    },
    watch: {
        html: sourse_folder + '/**/*.html',
        css: sourse_folder + '/scss/**/*.scss',
        js: sourse_folder + '/js/**/*.js',
        img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        copyCss: sourse_folder + '/scss/**/*.css',
    },
    clean: './' + project_folder + '/',
}

let {
    src,
    dest
} = require('gulp'),
    gulp = require('gulp'),
    browsersunc = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webpHtml = require('gulp-webp-html'),
    webpCss = require('gulp-webpcss'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter')


function browSersunc(params) {
    browsersunc.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        // .pipe(webpHtml())
        .pipe(dest(path.build.html))
        .pipe(browsersunc.stream())
}
 
function css() {
    return src(path.src.css)
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(webpCss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersunc.stream())
}

function copyCss() {
    return src(path.src.copyCss)
        // .pipe(fileinclude())
        // .pipe(webpHtml())
        .pipe(clean_css())
        .pipe(dest(path.build.copyCss))
        .pipe(browsersunc.stream())
}

function js() {
    return src(path.src.js)
        // .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersunc.stream())
}

function images() {
    return src(path.src.img)
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersunc.stream())
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

gulp.task('otf2ttf', function () {
    return src([sourse_folder + '/fonts/*otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(sourse_folder + '/fonts/'))
})

function fontsStyle(params) {
    let file_content = fs.readFileSync(sourse_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(sourse_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(sourse_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.copyCss], copyCss);
}

function clean(params) {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts, copyCss), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browSersunc);


exports.copyCss = copyCss;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.css = css;
exports.js = js;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;











// const gulp = require('gulp');
// const imagemin = require('gulp-imagemin');
// const sass = require('gulp-sass');
// const cssnano = require('gulp-cssnano');
// const autoprefixer = require('gulp-autoprefixer');
// const rename = require("gulp-rename");
// const uglify = require('gulp-uglify');
// const brouserSync = require('browser-sync').create();


// const paths = {
//     styles: {
//         src: 'app/styles/**/*.scss',
//         dest: 'build/css'
//     },
//     scripts: {
//         src: 'app/js/*.js',
//         dest: 'build/js'
//     },
//     html: {
//         src: 'app/*.html',
//         dest: 'build'
//     },
//     images: {
//         src: 'app/images/*',
//         dest: 'build/images'
//     }
// };


// //  compile scss into cs s
// function styles() {
//     return gulp.src(paths.styles.src)
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer())
//         .pipe(cssnano())
//         // .pipe(uglify())
//         // .pipe(rename({
//         //     suffix: '.min'
//         // }))
//         .pipe(gulp.dest(paths.styles.dest))
//         .pipe(brouserSync.reload({
//             stream: true
//         }))
// };

// function scripts() {
//     return gulp.src(paths.scripts.src)
//         .pipe(uglify())
//         .pipe(gulp.dest(paths.scripts.dest))
//         .pipe(brouserSync.reload({
//             stream: true
//         }))
// };



// function imageMin() {
//     return gulp.src(paths.images.src)
//         .pipe(imagemin())
//         .pipe(gulp.dest(paths.images.dest))
// }

// function copyHtml() {
//     return gulp.src(paths.html.src)
//         .pipe(uglify())
//         .pipe(gulp.dest(paths.html.dest))
//         .pipe(brouserSync.reload({
//             stream: true
//         }))
// }

// function watch() {
//     gulp.watch(paths.html.src, copyHtml);
//     gulp.watch(paths.styles.src, styles);
//     gulp.watch(paths.scripts.src, scripts);
//     gulp.watch(paths.images.src, imageMin);
// };

// const build = gulp.parallel([styles, copyHtml, imageMin, scripts]);

// gulp.task('./build', build);

// exports.scripts = scripts;
// exports.style = styles;
// exports.watch = watch;
// exports.imageMin = imageMin;
// exports.copyHtml = copyHtml;