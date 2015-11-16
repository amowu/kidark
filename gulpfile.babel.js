import {exec} from 'child_process'
import gulp from 'gulp'
import bg from 'gulp-bg'
import istanbul from 'gulp-istanbul'
import mocha from 'gulp-mocha'
import standard from 'gulp-standard'
import gutil from 'gulp-util'
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

// Phaser issue: Webpack bundle and import module problem
// https://github.com/photonstorm/phaser/issues/1974#issuecomment-134222165
gulp.task('p1', done1 => {
  exec('cd node_modules/phaser && npm install grunt-cli --save', (error, stdout, stderr) => {
    gutil.log(stdout)
    gutil.log(stderr)
    if (error !== null) {
      gutil.log(gutil.colors.red(error))
      gutil.beep()
      done1(error)
    }
    done1()
  })
})
gulp.task('p2', done2 => {
  exec('cd node_modules/phaser && npm install', (error, stdout, stderr) => {
    gutil.log(stdout)
    gutil.log(stderr)
    if (error !== null) {
      gutil.log(gutil.colors.red(error))
      gutil.beep()
      done2(error)
    }
    done2()
  })
})
gulp.task('p3', done3 => {
  exec('cd node_modules/phaser && node_modules/.bin/grunt custom --exclude p2,creature,ninja --split true', (error, stdout, stderr) => {
    gutil.log(stdout)
    gutil.log(stderr)
    if (error !== null) {
      gutil.log(gutil.colors.red(error))
      gutil.beep()
      done3(error)
    }
    done3()
  })
})
gulp.task('build:phaser', done => {
  runSequence('p1', 'p2', 'p3', done)
})

gulp.task('build:webpack', ['env'], webpackBuild)

gulp.task('build', done => {
  runSequence('build:phaser', 'build:webpack', done)
})

gulp.task('standard', () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'test/**/*.js',
    'webpack/*.js'
  ]).pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
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
    .pipe(istanbul.writeReports())
})

gulp.task('coverage', done => {
  runSequence('coverage:instrument', 'mocha', 'coverage:report', done)
})

gulp.task('test', done => {
  runSequence('standard', 'coverage', 'build:webpack', done)
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
    runSequence('build:webpack', 'server-node', done)
  } else {
    runSequence('server-hot', 'server-nodemon', done)
  }
})

gulp.task('default', ['server'])
