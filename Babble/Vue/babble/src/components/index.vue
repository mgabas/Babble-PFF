<template>
  <div class="index">
    <div class="body">
      <div class="content">
        <div class="container">
          <div v-if="data['sentiment'] == 'negatif'" class="negatif circle">
          </div>
          <div v-if="data['sentiment'] == 'positif'" class="positif circle">
          </div>
          <div v-if="data['sentiment'] == 'neutral'" class="neutral circle">
          </div>
        </div>
        <div class="response">
          <div v-if="data['sentiment'] == 'negatif'" class="talk_negatif talk">
            <p> Hey dude, that's rude ! </p>
          </div>
          <div v-if="data['sentiment'] == 'positif'" class="talk_positif talk">
            <p> Thanks pal, that's cool ! </p>
          </div>
          <div  v-if="data['sentiment'] == 'neutral'" class="talk_neutral talk">
            <p> Say me something. </p>
          </div>
        </div>
          <div class="text">
            <div class="form">
              <form @submit.prevent="submit" method="post">
                <div class="signup">
                    <label class="label"> Enter a sentence </label> <br>
                    <input placeholder="Enter a sentence" class="input" v-model="sentence"/>
                </div>
                <div>
                  <button class="submit" type="submit">Submit!</button>
                </div>
              </form>
            </div>
            <div class="validation">
              <p v-if="valid == true"> SUCCESSFULLY SEND : {{final}} </p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  methods: {

    submit() {

      this.valid = true
      this.final = this.sentence

      if (this.final == "neutral" || this.final == " " || this.final == "") {

        this.data['sentiment'] = "neutral"
        this.sentence = ""
        return

      }

      this.$store.commit('POST_SENTIMENT', this.final);

      setTimeout(() => {
          this.$store.commit('GET_SENTIMENT');
          this.sentence = ""


    }, 1000)

  },
  },
  name: 'index',
  data () {
    return {
      sentence: '',
      valid: null,
      final: null
      
    }
  },

  computed: {
    ...mapState([
      'data'
    ])

  },

  mounted () {
    this.$store.commit('GET_SENTIMENT');
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/styles/index.css';
</style>
