import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    datas: []
  },
  mutations: {
    GET_SENTIMENT (state) {
      state.data = [];

      fetch('http://127.0.0.1:5000/sentiment')
        .then(response => response.json())
        .then(data => {

          state.data = data

        })
    },

    GET_TEN_SENTIMENT (state) {
      state.datas = [];

      fetch('http://127.0.0.1:5000/ten_sentiment')
        .then(response => response.json())
        .then(data => {
          let i = 0
          let n = 0
          let p = 0

          for ( i = 0; i < data["sentiment"].length; i++) {

            if (data["sentiment"][i] == "positif") {

              p = p + 1

            }

            if (data["sentiment"][i] == "negatif") {

              n = n + 1

            }

          }

          var pourcentage = (p * 100)/10
          state.datas = pourcentage

          console.log("get done")

        })
    },

    POST_SENTIMENT(state, playload) {

      let sentence = { sentence : playload }

      fetch('http://127.0.0.1:5000/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sentence)
      });

    },

    POST_TEN_SENTIMENT(state, playload) {

      let sentence = { sentence : playload }

      fetch('http://127.0.0.1:5000/ten_sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sentence)
      });

    },
  },
  actions: {
  },
  modules: {
  }
})
