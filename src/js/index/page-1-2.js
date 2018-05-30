{
  let view = {
    el:'section.songs',
    template: `
      <li>
        <div class="song">
          <h4>__name__</h4>
          <div class="desc">
            <img src="./img/icon.png" alt="">
            <p>__singer__ - __name__</p>
          </div>
        </div>
        <div class="play">
          <a class="playButton" href="./song.html?id=__songId__">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          </a>
        </div>
      </li>
    `,
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      let tempArr = ['name', 'name', 'singer', 'songId']
      let songs = data.songs
      for (let i = 0; i < songs.length; i++) {
        let newTemplate = this.template
        tempArr.map((value) => {
          newTemplate = newTemplate.replace(`__${value}__`, songs[i][value])
        })
        this.$el.find('ol').append(newTemplate)
      }
    }
  }
  let model = {
    data: {
      songs:[]
    },
    findSong() {
      var query = new AV.Query('Song');
      return query.find().then((songs) => {
        this.data.songs = songs.map((song) => {
          return {
            songId: song.id,
            name: song.attributes.name,
            singer: song.attributes.singer,
            songUrl: song.attributes.songUrl,
            coverUrl: song.attributes.coverUrl,
            lyric: song.attributes.lyric
          }
        })
      })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.model.findSong().then(() => {
        this.view.render(this.model.data)
        this.view.$el.find('.loading-wrapper').addClass('hide')
      })
    }
  }
  controller.init(view, model)
}