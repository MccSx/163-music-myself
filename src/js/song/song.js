{
  let view = {
    el: '.page',
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      let {song} = data
      this.$el.find('audio').attr('src', song.songUrl)
    },
    audioPlay() {
      this.$el.find('audio')[0].play()
    },
    audioPause() {
      this.$el.find('audio')[0].pause()
    }
  }
  let model = {
    data: {
      song:{songId:'', name:'', singer:'', songUrl:'', coverUrl:'', lyric:''},
      paused: false
    },
    getSong(id) {
      var query = new AV.Query('Song')
      return query.get(id).then((songItem) => {
        let {song} = this.data
        song.songId = songItem.id
        song.name = songItem.attributes.name
        song.singer = songItem.attributes.singer
        song.songUrl = songItem.attributes.songUrl
        song.coverUrl = songItem.attributes.coverUrl
        song.lyric = songItem.attributes.lyric
      }, (error) => {
        console.log(error)
      })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      let songId = this.getSongId()
      this.model.getSong(songId).then(() => {
        this.view.render(this.model.data)
        this.view.audioPlay()
      })
      this.bindEvents()
    },
    getSongId() {
      let search = window.location.search
      if (search.indexOf('?') === 0) {
        search = search.substring(1)
      }

      // 把类似'a=1&b=2&c=3'变为['a=1', 'b=2;, 'c=3']，filter是把如果遇到&&，把切出来的空字符串过滤掉
      let searchArr = search.split('&').filter(a => a)
      let searchID = ''
      for (let i = 0; i < searchArr.length; i++) {
        let tempArr = searchArr[i].split('=')
        if (tempArr[0] === 'id') {
          searchID = tempArr[1]
        }
      }
      return searchID
    },
    bindEvents() {
      this.view.$el.find('.disc-wrapper').on('click', '.icon-wrapper', (e) => {
        this.model.data.paused = !(this.model.data.paused)
        if (this.model.data.paused) {
          this.view.audioPause()
          $(e.currentTarget).find('div').addClass('active')
          $(e.currentTarget).siblings('.cover').addClass('paused')
        } else {
          this.view.audioPlay()
          $(e.currentTarget).find('div').removeClass('active')
          $(e.currentTarget).siblings('.cover').removeClass('paused')          
        }
      })
    }
  }
  controller.init(view, model)
}