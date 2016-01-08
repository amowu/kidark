import del from 'del'
import gulp from 'gulp'
import bg from 'gulp-bg'
import eslint from 'gulp-eslint'
import istanbul from 'gulp-istanbul'
import mocha from 'gulp-mocha'
import {Instrumenter} from 'isparta'
import path from 'path'
import runSequence from 'run-sequence'
import shell from 'gulp-shell'
import webpackBuild from './webpack/build'
import yargs from 'yargs'

const args = yargs
  .alias('p', 'production')
  .argv

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development'
})

gulp.task('clean', done => del('build/*', done))

gulp.task('build:webpack', ['env'], webpackBuild)

gulp.task('build', done => {
  runSequence('build:webpack', done)
})

gulp.task('eslint', () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.{js,jsx}',
    'test/**/*.js',
    'webpack/*.js'
  ]).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('mocha', () => {
  return gulp.src('test/**/*.js', {read: false})
    .pipe(mocha({
      require: ['./test/setup.js'],
      reporter: 'spec'
    }))
})

gulp.task('coverage:instrument', () => {
  return gulp.src('src/**/*.js')
    .pipe(istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

gulp.task('coverage:report', () => {
  return gulp.src('src/**/*.js', {read: false})
    .pipe(istanbul.writeReports({
      reporters: ['lcov', 'json', 'text-summary']
    }))
})

gulp.task('coverage:mocha', done => {
  runSequence('coverage:instrument', 'mocha', 'coverage:report', done)
})

gulp.task('test', done => {
  runSequence('eslint', 'coverage:mocha', 'build:webpack', done)
})

gulp.task('server-node', bg('node', './src/server'))
gulp.task('server-hot', bg('node', './webpack/server'))
// Shell fixes Windows este/issues/522, bg is still needed for server-hot.
gulp.task('server-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon src/server')
))

gulp.task('server', ['env'], done => {
  if (args.production) {
    runSequence('clean', 'build:webpack', 'server-node', done)
  } else {
    runSequence('server-hot', 'server-nodemon', done)
  }
})

gulp.task('default', ['server'])
