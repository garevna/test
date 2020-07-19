<template>
  <v-app class="homefone">
    <v-container fluid class="homefone" v-mutate="mutationHandler">
      <SystemBar />
      <transition>
        <keep-alive>
          <router-view v-if="pageContentReady"></router-view>
        </keep-alive>
      </transition>
    </v-container>
    <!-- ============================= FOOTER ============================= -->
    <section id="footer" class="homefone">
      <div class="base-title">
        <a href="#footer" class="core-goto"></a>
          <v-row width="100%">
            <Footer :emailEndpoint="mailEndpoint" v-mutate="footerMutationHandler" />
          </v-row>
      </div>
    </section>
  </v-app>
</template>

<style>
  .section {
    width: 100%;
    max-width: 1440px;
  }
  body {
    overflow: hidden;
  }
</style>

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
      pageContentReady: false,
      page: null,
      routesNames: []
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'mailEndpoint', 'emailSubject', 'emailText', 'mainContentHeight', 'footerHeight']),
    ...mapState('content', ['footer', 'top'])
  },
  watch: {
    $route (val) {
      this.pageContentReady = false
      const index = this.routesNames.indexOf(val.name)
      const resource = ['2', '2-1', '2-2', '2-3'][index]
      this.getPageContent(resource).then(() => {
        this.pageContentReady = true
      })
    }
  },
  methods: {
    ...mapActions({
      getGeneralInfo: 'GET_GENERAL_INFO'
    }),
    ...mapActions('content', {
      getPageContent: 'GET_PAGE_CONTENT'
    }),
    mutationHandler (mutations) {
      this.$store.commit('UPDATE_MAIN_CONTENT_HEIGHT', this.$el.offsetHeight)
      document.body.style.height = this.mainContentHeight + this.footerHeight - 36 + 'px'
    },
    footerMutationHandler (mutations) {
      const footer = document.querySelector('.footer')
      this.$store.commit('UPDATE_FOOTER_HEIGHT', footer.offsetHeight)
      document.body.style.height = this.mainContentHeight + this.footerHeight - 36 + 'px'
    },
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT')
    }
  },
  beforeMount () {
    this.getGeneralInfo()
    this.getPageContent(2)
      .then((response) => {
        document.title = response
        this.ready = true
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
