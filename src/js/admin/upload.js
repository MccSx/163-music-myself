{
  let view = {
    el: '#container',
    template:`
      <div class="upload-content">
        <span>退拽到这里上传</span><br>
        <span>文件大小不能超过40Mb</span>
      </div>
      <span>或者</span>
      <button id="upload">点击上传</button>
    `,
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      this.$el.html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.view.render(this.model.data)
      this.initQiniu()
    },
    initQiniu() {
      let uploader = Qiniu.uploader({
        runtimes: 'html5',      // 上传模式，依次退化
        browse_button: 'upload',         // 上传选择的点选按钮，必需
        uptoken_url: 'http://localhost:8888/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
        get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
        domain: 'p98ljclgg.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
        max_file_size: '40mb',             // 最大文件体积限制
        max_retries: 3,                     // 上传失败最大重试次数
        dragdrop: true,                     // 开启可拖曳上传
        drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                  // 分块上传时，每块的体积
        auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          'FilesAdded': function(up, files) {
              plupload.each(files, function(file) {
                  // 文件添加进队列后，处理相关的事情
              });
          },
          'BeforeUpload': function(up, file) {
                // 每个文件上传前，处理相关的事情
          },
          'UploadProgress': function(up, file) {
                // 每个文件上传时，处理相关的事情
          },
          'FileUploaded': function(up, file, info) {
            let domain = up.getOption('domain')
            let response = JSON.parse(info.response)
            let key = encodeURIComponent(response.key)
            let sourceLink = `http://${domain}/${key}`
            let data = {
              name: response.key,
              songUrl: sourceLink
            }
            window.eventHub.trigger('upload', data)
            window.eventHub.trigger('newSongActive', true)
          },
          'Error': function(up, err, errTip) {
                //上传出错时，处理相关的事情
          },
          'UploadComplete': function() {
                //队列文件处理完毕后，处理相关的事情
          }
        }
      })
    }
  }
  controller.init(view, model)
}