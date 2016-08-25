gulp = require("gulp")
stylus = require("gulp-stylus")
coffee = require("gulp-coffee")

function error(mgs) {
    console.log("Error: " + msg)
}

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
        .pipe(gulp.dest('build/'));
})

gulp.task("copy-windows", function() {
    return gulp.src(["src/windows/**/*"])
        .pipe(gulp.dest("./build/windows"))
})

gulp.task("copy-entrypoint", function() {
    return gulp.src(["src/main.js"])
      .pipe(gulp.dest("./build/"))
})

gulp.task("copy-third-party", function() {
    return gulp.src(["src/third_party/**/*"])
      .pipe(gulp.dest("./build/third_party"))
})

gulp.task("copy-files", ["copy-windows", "copy-entrypoint", "copy-third-party"])

gulp.task("build", ["coffeescript", "stylus", "copy-files"])

gulp.task("watch", () => {
    gulp.watch("src/**/*.styl", ["stylus"])
    gulp.watch("src/**/*.coffee", ["coffeescript"])
    gulp.watch(["src/windows/**/*", "src/main.js"], ["copy-files"])
})

gulp.task("default", ["build", "watch"])