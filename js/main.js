/* -----------------------------
Component
----------------------------- */

Vue.component('header-component', {
  data: function () {
    return {
    }
  },
  template: `
    <header>
      <nav>
        <div class="nav-wrapper">
            <a href="#" class="brand-logo">YouTube Favorite List</a>
        </div>
      </nav>
    </header>
  `
})

Vue.component('movie-card', {
  props: ['content'],
  data: function () {
    return {
      date: new Date(),
      title: 'My Title'
    }
  },
  methods: {
    embId: function () {
      return 'https://www.youtube.com/embed/' + this.content.url.split('=')[1]
    }
  },
  template: `
    <div class="card">
      <div class="card-image">
        <iframe width="100%" height="auto" v-bind:src="embId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="card-content center">
        <p>Update: {{content.date | date-filter}}</p>
      </div>
      <div class="card-action center">
        <a class="waves-effect waves-light btn" v-bind:href="content.url" target="_blank">
          YouTube
        </a>
        <a v-on:click.native="removeCard(content.id)" class="waves-effect waves-light btn">
          <i class="material-icons">delete</i>
        </a>
      </div>
    </div>
    `
})

Vue.component('footer-component', {
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  },
  template: `
    <footer class="page-footer center">
      <div class="container">
        <p>
            {{ year }} <a href="https://twitter.com/don_bu_rakko" target="_blank">@don_bu_rakko</a> All Rights Reserved
        </p>
      </div>
    </footer>
  `
})

/* -----------------------------
Filter
----------------------------- */

Vue.filter('date-filter', function (val) {
  return [val.getFullYear(), (val.getMonth() + 1), val.getDate()]
    .join('/') + ' ' +
  [val.getHours(), val.getMinutes()].join(':')
})

/* -----------------------------
Main
----------------------------- */

const content = new Vue({
  el: '#app',
  data: {
    url: '',
    cards: [
      {
        id: 0,
        url: 'https://www.youtube.com/watch?v=DJ6PD_jBtU0',
        date: new Date(2019, 0, 1, 1, 1)
      },
      {
        id: 1,
        url: 'https://www.youtube.com/watch?v=cJ1GgrMgoi4',
        date: new Date(2019, 0, 2, 2, 2)
      },
      {
        id: 2,
        url: 'https://www.youtube.com/watch?v=78tNYZUS-ps',
        date: new Date(2019, 0, 3, 3, 3)
      }
    ],
    nextIdNum: 3
  },
  methods: {
    addCard: function () {
      this.cards.unshift({
        id: this.nextIdNum,
        url: this.url,
        date: new Date()
      })
      this.nextIdNum++
    },
    removeCard: function (index) {
      this.cards.splice(index, 1)
    },
    embId: function (key) {
      return 'https://www.youtube.com/embed/' + key.split('=')[1]
    }
  }
})
