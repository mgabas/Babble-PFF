<template>
    <div class="progressive">
        <div class="body">
      <div class="content">
        <div class="container">
          <div id="rec" class="rectangle"></div>
          <div> <p> you entered {{datas}}% positive sentences </p></div>
        </div>
          <div class="text">
            <div class="form">
              <form @submit.prevent="submit" method="post">
                <div class="signup">
                    <label class="label"> Enter 10 sentence </label> <br>
                    <input placeholder="Enter a sentence" class="input" id="sentence" v-model="sentence"/>
                </div>
                <div>
                  <button class="submit" type="submit">Submit!</button>
                </div>
              </form>
            </div>
            <div class="validation">
              <p v-if="valid == 'PENDING'"> CURRENTLY : {{final}} <br> enter "reset" to reset the sentences</p>
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
    gradient () { 
      document.getElementById("rec").style.background = "linear-gradient(90deg, #26fdbd 0%, #26fdbd " + this.datas + "%, #851111 " + this.datas + "%, #851111 100%)";
      console.log("done")
    },

    submit() {

      this.valid = "PENDING"
      this.final.push(this.sentence)

      if (this.sentence == "reset" ) {

          this.final = []
          this.sentence = ""
          return

      }

      if (this.final.length == 10) { 

        this.valid = true
        this.$store.commit('POST_TEN_SENTIMENT', this.final);

        setTimeout(() => {
            this.$store.commit('GET_TEN_SENTIMENT');
            this.final = []
            this.valid = false

            setTimeout(() => {

              this.gradient()

            }, 1000)

        }, 1000)

      }

      this.sentence = ""

  },

  },
  name: 'index',
  data () {
    return {
      sentence: '',
      valid: null,
      final: []
      
    }
  },

  computed: {
    ...mapState([
      'datas'
    ])

  },

  mounted () {
    this.$store.commit('GET_TEN_SENTIMENT');

    setTimeout(() => {

      this.gradient()

    }, 1000)
  }

}
</script>

<style scoped>
@import '../assets/styles/index.css';
@import '../assets/styles/progressive.css';
</style>