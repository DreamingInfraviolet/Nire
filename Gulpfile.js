gulp = require("gulp")
stylus = require("gulp-stylus")
coffee = require("gulp-coffee")

function error(mgs) {
    console.log("Error: " + msg)
}

gulp.task("coffeescript", function() {
    return gulp.src("src/coffeescript/**/*.coffee")
        .pipe(coffee({bare: true}).on("error", error))
        .pipe(gulp.dest("build/js"))
})

gulp.task("stylus", function() {
    return gulp.src('src/stylus/**/*')
        .pipe(stylus({
          compress: true
        }))
        .pipe(gulp.dest('build/css/'));
})

gulp.task("copy-files", function() {
    return gulp.src(["src/js/**/*", "src/html/**/*"])
        .pipe(gulp.dest("./build/"))
})

gulp.task("build", ["coffeescript", "stylus", "copy-files"])

gulp.task("watch", () => {
    gulp.watch("src/themes/**/*.styl", ["stylus"])
    gulp.watch("src/coffeescript/**/*.coffee", ["coffeescript"])
    gulp.watch(["src/js/**/*", "src/html/**/*"], ["copy-files"])
})

gulp.task("default", ["build", "watch"])