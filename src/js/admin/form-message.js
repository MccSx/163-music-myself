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
          <label for="">图片<input type="text" name="coverUrl" value="__coverUrl__"></label>
        </div>
        <textarea name="lyric" id="" cols="30" rows="10" placeholder="歌词">__lyric__</textarea>
      </div>
      <button type="submit">保存</button>
    `,
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      let tempArr = ['name','singer','songUrl','coverUrl','lyric']
      let newTemplaye = this.template
      tempArr.map((value) => {
        newTemplaye = newTemplaye.replace(`__${value}__`, data[value] || '')
      })
      this.$el.html(newTemplaye)
    }
  }
  let model = {
    data:{name:'', singer:'', songUrl:'',coverUrl:'', lyric:'', songId:''},
    setData(data) {
      Object.assign(this.data, data)
    },
    update(data) {
      let song = AV.Object.createWithoutData('Song', data.songId)
      // 修改属性
      song.set('name', data,name)
      song.set('singer', data.singer)
      song.set('songUrl', data.songUrl)
      song.set('coverUrl', data.coverUrl)
      song.set('lyric', data.lyric)
      song.set('songId', data.songId)
      // 保存到云端
      return song.save().then((response) => {
        Object.assign(this.data, data)
      })
    },
    create(data) {
       let Song = AV.Object.extend('Song')
       // 新建一个 Todo 对象
       let song = new Song()
       song.set('name', data.name)
       song.set('singer', data.singer)
       song.set('songUrl', data.songUrl)
       song.set('coverUrl', data.coverUrl)
       song.set('lyric', data.lyric)
       song.set('songId', data.songId)
       return song.save().then((response) => {
         // 成功保存之后，执行其他逻辑.
         Object.assign(this.data, data)
       })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.view.render(this.model.data)
      this.bindEventHub()
      this.bindEvents()
    },
    bindEventHub() {
      window.eventHub.on('upload', (data) => {
        this.model.setData(data)
        this.view.render(this.model.data)
      })
      window.eventHub.on('select', (data) => {
        this.model.setData(data)
        this.view.render(this.model.data)
      })
    },
    update() {
      let tempArr = ['name','singer','songUrl','coverUrl','lyric','songId']
      let tempData = {}
      tempArr.map((value) => {
        tempData[value] = this.view.$el.find(`[name=${value}]`).val()
      })
      this.model.update(tempData).then(() => {
        this.view.render({})
        window.eventHub.trigger('update', JSON.parse(JSON.stringify(this.model.data)))
      })
    },
    create() {
      let tempArr = ['name','singer','songUrl','coverUrl','lyric','songId']
      let tempData = {}
      tempArr.map((value) => {
        tempData[value] = this.view.$el.find(`[name=${value}]`).val()
      })
      this.model.create(tempData).then(() => {
        this.view.render({})
        window.eventHub.trigger('create', JSON.parse(JSON.stringify(this.model.data)))
      })
    },
    bindEvents() {
      this.view.$el.on('submit', (e) => {
        e.preventDefault()
        if (this.model.data.songId) {
          this.update()
        } else {
          this.create()
        }
      })
    }
  }
  controller.init(view, model)
}