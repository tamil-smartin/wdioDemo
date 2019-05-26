const wdio = require("gulp-wdio");
const gulp = require("gulp");
const run = require("gulp-run");
const del = require("del");
const cucumber=require('gulp-cucumber');
const argv=require('yargs').argv;


gulp.task("e2e", ["compile-code","clean-allure"], () => gulp.src("./wdio.conf.js").pipe(wdio({})));

gulp.task("sqhe2e", ["compile-code","clean-allure"], () => { gulp.src("./wdio.conf.js").pipe(wdio({}));});

gulp.task("clean-allure", () => { del(["./target", "./allure-report"]).then(paths => {console.log("Deleted files and folders:\n", paths.join("\n")); });});

gulp.task("publish-allure", () => run("allure generate ./target/allure-report --clean && allure open").exec());

gulp.task("compile-code", () => run("npm run eslint").exec());

gulp.task("cucumTest",function(){return gulp.src('"./wdio.conf.js"').pipe(cucumber({}));});

