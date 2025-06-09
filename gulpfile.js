// gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Caminhos
const paths = {
  scss: {
    src: "./scss/**/*.scss",
    dest: "./css",
  },
};

// Tarefa de compilação SASS
function compilarSass() {
  return gulp
    .src(paths.scss.src)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest(paths.scss.dest));
}

// Watch
function watchFiles() {
  gulp.watch(paths.scss.src, compilarSass);
}

// Tarefa padrão
exports.default = gulp.series(compilarSass, watchFiles);