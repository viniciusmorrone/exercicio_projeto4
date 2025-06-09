const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const clean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");

// Caminhos
const paths = {
  html: "./index.html",
  scss: "./scss/style.scss",
  css: "./css",
  dist: "./dist",
};

// Compilar SASS
function compilarSass() {
  return gulp
    .src(paths.scss)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest(paths.css));
}

// Limpar dist/
function limparDist() {
  return gulp.src(paths.dist, { allowEmpty: true, read: false }).pipe(clean());
}

// Copiar HTML para dist/
function copiarHtml() {
  return gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist));
}

// Copiar CSS para dist/
function copiarCss() {
  return gulp
    .src("./css/style.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(`${paths.dist}/css`));
}

// Copiar imagens (opcional)
function copiarImgs() {
  return gulp.src("img/**/*").pipe(gulp.dest("dist/img"));
}

function copiarImgs() {
  return gulp.src("img/**/*", { allowEmpty: true }) // 👈 adiciona allowEmpty
    .pipe(gulp.dest("dist/img"));
}

// Tarefa de build
exports.build = gulp.series(
  compilarSass,
  limparDist,
  gulp.parallel(copiarHtml, copiarCss, copiarImgs)
);

// Watch (opcional durante dev)
exports.default = function () {
  gulp.watch("./scss/**/*.scss", compilarSass);
};