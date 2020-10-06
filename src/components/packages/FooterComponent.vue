<template>
  <section id="footer" class="homefone">
    <div class="base-title">
      <a href="#footer" class="core-goto"></a>
        <v-row width="100%">
          <Footer :emailEndpoint="mailEndpoint" v-mutate="footerMutationHandler" />
        </v-row>
    </div>
  </section>
</template>

<script>

import 'pineapple-footer'
import 'pineapple-footer/dist/pineapple-footer.css'

import { mapState } from 'vuex'

export default {
  name: 'FooterComponent',
  props: ['goto'],
  computed: {
    ...mapState(['viewportWidth', 'mailEndpoint', 'emailSubject', 'emailText', 'mainContentHeight', 'footerHeight'])
  },
  methods: {
    footerMutationHandler (mutations) {
      const footer = document.querySelector('.footer')
      this.$store.commit('UPDATE_FOOTER_HEIGHT', footer.offsetHeight)
      document.body.style.height = this.mainContentHeight + this.footerHeight - 36 + 'px'
    }
  }
}

</script>
