var APP_ID = 'GoaBqUGRvpJ9Iy5GGzWTKKbt-gzGzoHsz';
var APP_KEY = 'jft9cSPQCLwTGwfL4xJNxK5E';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

// var Song = AV.Object.extend('Song');
// // 新建一个 Todo 对象
// var song = new Song();
// song.set('name', '歌名');
// song.set('singer', '歌手');
// song.set('songUrl', '外链');
// song.set('coverUrl', '图片');
// song.set('lyric', '歌词');
// song.save().then(function (todo) {
//   // 成功保存之后，执行其他逻辑.
//   console.log('New object created with objectId: ' + todo.id);
// }, function (error) {
//   // 异常处理
//   console.error('Failed to create new object, with error message: ' + error.message);
// });