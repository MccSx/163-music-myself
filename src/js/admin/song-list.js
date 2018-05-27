{
  let view = {
    el:'.songList',
    template: `
      <h2>歌曲列表</h2>
      <ul>
      </ul>
    `,
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      this.$el.html(this.template)
      let {songs, selectSongID} = data
      songs.map((song) => {
        let liTag = $('<li></li>').text(`${song.name}-${song.singer}`).attr('data-songId', song.songId)
        if (song.songId === selectSongID) {
          liTag.attr('class', 'active')
        }
        this.$el.find('ul').append(liTag)
      })
    }
  }
  let model = {
    data: {
      songs:[],
      selectSongID: undefined
    },
    findSong() {
      var query = new AV.Query('Song');
      return query.find().then( (songs) => {
        this.data.songs = songs.map((song) => {
          return {songId: song.songId, ...song.attributes}
        })
      })
    },
    create(data) {
      this.data.songs.push(data)
    },
    update(data) {
      let songs = this.data.songs
      for (let i = 0; i < songs.length; i++) {
        if (data.songId === songs[i].songId) {
          songs[i] = data
        }
      }
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.getAllSong()
      this.bindEvents()
      this.bindEventHub()
    },
    getAllSong() {
      this.model.findSong().then(() => {
        this.view.render(this.model.data)
      })
    },
    bindEventHub() {
      window.eventHub.on('create', (data) => {
        this.model.create(data)
        this.view.render(this.model.data)
      })
      window.eventHub.on('update', (data) => {
        this.model.update(data)
        this.view.render(this.model.data)
      })
    },
    bindEvents() {
      this.view.$el.on('click', 'li', (e) => {
        e.preventDefault()
        window.eventHub.trigger('newSongActive', false)
        window.eventHub.trigger('selectSong', true)
        let id = $(e.currentTarget).attr('data-songId')
        this.model.data.selectSongID = id
        let songs = this.model.data.songs
        for (let i = 0; i < songs.length; i++) {
          if (songs[i].songId === id) {
            this.view.render(this.model.data)
            window.eventHub.trigger('select', songs[i])
          }
        }
      })
    }
  }
  controller.init(view, model)
}