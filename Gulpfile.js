gulp = require("gulp")
stylus = require("gulp-stylus")
coffee = require("gulp-coffee")
browserSync = require('browser-sync').create()

function error(mgs) {
    console.log("Error: " + msg)
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })
})

gulp.task("coffeescript", function() {
    return gulp.src("src/**/*.coffee")
        .pipe(coffee({bare: true}).on("error", error))
        .pipe(gulp.dest("build/"))
})

gulp.task("stylus", function() {
    return gulp.src('src/**/*.styl')
        .pipe(stylus({
          compress: true
        })).on("error", error)
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream())
})

gulp.task("copy-files", function() {
    return gulp.src(["!src/**/*.styl", "!src/**/*.coffee", "src/**/*"])
    .pipe(gulp.dest("build/"))
})

gulp.task("build", ["coffeescript", "stylus", "copy-files"])

gulp.task("watch", ["browser-sync"], () => {
    gulp.watch("src/**/*.styl", ["stylus"])
    gulp.watch("src/**/*.coffee", ["coffeescript"]).on('change', browserSync.reload)
    gulp.watch(["!src/**/*.styl", "!src/**/*.coffee", "src/**/*"], ["copy-files"]).on('change', browserSync.reload)
})

gulp.task("default", ["build", "watch"])