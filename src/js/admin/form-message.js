{
  let view = {
    el: '.form-wrapper',
    template: `
      <div class="form">
        <div class="image">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinyue"></use>
          </svg>
          <div class="describe">COVER UPLOAD</div>
        </div>
        <div class="songDes">
          <label for="">歌名<input type="text" name="name" value="__name__"></label>
          <label for="">歌手<input type="text" name="singer" value="__singer__"></label>
          <label for="">外链<input type="text" name="songUrl" value="__songUrl__"></label>
          <label for="">图片<input type="text" name="imgUrl" value="__imgUrl__"></label>
        </div>
        <textarea name="lyric" id="" cols="30" rows="10" placeholder="歌词">__lyric__</textarea>
      </div>
      <button type="submit">保存</button>
    `,
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      let tempArr = ['name','singer','songUrl','imgUrl','lyric']
      let newTemplaye = this.template
      tempArr.map((value) => {
        newTemplaye = newTemplaye.replace(`__${value}__`, data[value])
      })
      this.$el.html(newTemplaye)
    }
  }
  let model = {
    data:{name:'', singer:'', songUrl:'',imgUrl:'', lyric:'', songId:''},
    setData(data) {
      Object.assign(this.data, data)
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.view.render(this.model.data)
      this.bindEventHub()
    },
    bindEventHub() {
      window.eventHub.on('upload', (data) => {
        this.model.setData(data)
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view, model)
}