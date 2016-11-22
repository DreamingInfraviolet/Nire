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
          compress: false
        })).on("error", error)
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream())
})

gulp.task("copy-files", function() {
    return gulp.src(["src/**/*", "!src/**/*.styl", "!src/**/*.coffee"])
    .pipe(gulp.dest("build/"))
})

gulp.task("build", ["coffeescript", "stylus", "copy-files"])

gulp.task("watch", ["browser-sync"], () => {
    gulp.watch("src/**/*.styl", ["stylus"])
    gulp.watch("src/**/*.coffee", ["coffeescript"]).on('change', browserSync.reload)
    gulp.watch(["src/**/*", "!src/**/*.styl", "!src/**/*.coffee"], ["copy-files"]).on('change', browserSync.reload)
})

gulp.task("default", ["build", "watch"])
