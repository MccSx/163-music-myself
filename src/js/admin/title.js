{
  let view = {
    el: '.title',
    templete: `
      <h2 id="createSong">新建歌曲</h2>
      <h2 id="updateSong" class="hide">修改歌曲</h2>
    `,
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      this.$el.html(this.templete)
    },
    update() {
      this.$el.find('#createSong').addClass('hide')
      this.$el.find('#updateSong').removeClass('hide')
    },
    create() {
      this.$el.find('#createSong').removeClass('hide')
      this.$el.find('#updateSong').addClass('hide')
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.view.render(this.model.data)
      this.bindEventHub()
    },
    bindEventHub() {
      window.eventHub.on('selectSong', (bol) => {
        if (bol) {
          this.view.update()
        } else {
          this.view.create()
        }
      })
    }
  }
  controller.init(view, model)
}