<template>
  <v-app class="homefone">
    <v-container fluid class="homefone">
      <!-- <AppHeader :pages="pages" :page.sync="page" /> -->
      <SystemBar />
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-container>
    <!-- ============================= FOOTER ============================= -->
    <section id="footer" class="homefone">
      <div class="base-title">
        <a href="#footer" class="core-goto"></a>
          <v-row width="100%">
            <Footer :emailEndpoint="mailEndpoint" v-if="ready" />
          </v-row>
      </div>
    </section>
  </v-app>
</template>

<script>

/* GLOBAL COMPONENTS */

import 'pineapple-styles'

/* SystemBar */
import 'pineapple-system-bar'
import 'pineapple-system-bar/dist/pineapple-system-bar.css'

/* SystemBar */
import 'pineapple-main-nav-bar'
import 'pineapple-main-nav-bar/dist/pineapple-main-nav-bar.css'

/* Popup */
import 'pineapple-popup'
import 'pineapple-popup/dist/pineapple-popup.css'

/* Footer */
import 'pineapple-footer'
import 'pineapple-footer/dist/pineapple-footer.css'

/* HowToConnect */
import 'pineapple-how-to-connect'
import 'pineapple-how-to-connect/dist/pineapple-how-to-connect.css'

/* Testimonials */
import 'pineapple-testimonials'
import 'pineapple-testimonials/dist/pineapple-testimonials.css'

/* UserContact */
import 'pineapple-contact-form'
import 'pineapple-contact-form/dist/pineapple-contact-form.css'

/* FAQ */
import 'pineapple-faq'
import 'pineapple-faq/dist/pineapple-faq.css'

/* InternetPlans */
import 'pineapple-internet-plans'
import 'pineapple-internet-plans/dist/pineapple-internet-plans.css'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      ready: false,
      page: null,
      routesNames: []
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'mailEndpoint']),
    ...mapState('content', ['browserTabTitle', 'footer', 'mainNavButtons', 'mainNavSectors']),
    ...mapState('contact', ['mailEndpoint'])
  },
  watch: {
    $route (val) {
      this.ready = false
      const index = this.routesNames.indexOf(val.name)
      const resource = ['2', '2-1', '2-2', '2-3'][index]
      this.getContent(resource).then(() => { this.ready = true })
    }
  },
  methods: {
    ...mapActions('content', {
      getContent: 'GET_CONTENT'
    }),
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT')
    }
  },
  beforeMount () {
    this.getContent(2).then(title => {
      this.ready = true
      document.title = title
    })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
    this.routesNames = this.$router.options.routes.map(item => item.name)
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>
