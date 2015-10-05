var gulp = require('gulp')
  , fs = require('fs')
  , sync = require('gulp-config-sync')
  , zip = require('gulp-zip')
  , del = require('del')
  , manifest = require('./manifest.json')
  ;
var projectProperties = {
  name:'chrome-ext-template',
  version: manifest.version
};
var zipName = projectProperties.name + '_' + projectProperties.version + '.zip';
var syncOptions = {
  src: 'manifest.json',
  fields: [
    'name',
    'version',
    'description'
  ],
  space: '  ',
};
function getInitInfo() {
  projectProperties.hasBower = true;
  try {
    var res = fs.statSync('bower.json');
  } catch (e) {
    projectProperties.hasBower = false;
  }
}
getInitInfo();
gulp.task('sync-package-files',function(){
  var filesToSync = ['package.json'];
  if(projectProperties.hasBower) {
    filesToSync.push('bower.json');
  }
  console.log('Syncing:', filesToSync.join(', '));
  return gulp.src('package.json')
    .pipe(sync(syncOptions))
    .pipe(gulp.dest('.'));
});
gulp.task('clean', function(cb) {
  var zipFile = projectProperties.name + '*.zip';
  return del(zipFile).then(function(paths){
    console.log('Deleted files/folders:\n', paths.join('\n\t'));
  });
})
gulp.task('zip' ,['clean'],function() {
  var include = ['./**']
    , exclude = ['!node_modules{,/**}','!.git{,/**}','!npm-debug.log']
    ;
    return gulp.src(include.concat(exclude))
    .pipe(zip(zipName))
    .pipe(gulp.dest('.'));
})
