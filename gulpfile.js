var gulp = require('gulp')
  , fs = require('fs')
  , sync = require('gulp-config-sync')
  ;
var projectProperties = {
  name:'chrome-ext-template'
};
var zipName = 'rally-ext.zip';
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
  console.log(filesToSync);
  return gulp.src('package.json')
    .pipe(sync(syncOptions))
    .pipe(gulp.dest('.'));
});
