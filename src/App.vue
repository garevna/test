<template>
  <v-app class="homefone">
    <v-container fluid class="homefone" v-mutate="mutationHandler">
      <SystemBar />
      <transition
            name="fade"
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter"
            @afterEnter="afterEnter"
      >
          <router-view v-if="pageContentReady"></router-view>
      </transition>
      <Faqs />
    </v-container>
    <!-- ============================= FOOTER ============================= -->
    <FooterComponent />
    <div style="position: fixed; bottom: 0; left: 0; height: 32px; width: 100%; background: transparent; text-align: right; padding-right: 16px;">
      <v-img
        v-if="christmas"
        src="@/assets/christmas.webp"
        height="32"
        width="48"
        contain
        style="position: fixed; bottom: 0; left: 0;"
      />
      <small>
        <sub style="color: #fff3 !important"> Release {{ gitTagNumber }} / {{ releaseDate }} </sub>
      </small>
    </div>
  </v-app>
</template>

<script>

/* GLOBAL COMPONENTS */

import 'pineapple-styles'

/* SystemBar */
import 'pineapple-system-bar'
import 'pineapple-system-bar/dist/pineapple-system-bar.css'

/* Popup */
import 'pineapple-popup'
import 'pineapple-popup/dist/pineapple-popup.css'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Faqs: () => import(/* webpackChunkName: "faqs" */ '@/components/packages/Faq.vue'),
    // Reviews: () => import(/* webpackChunkName: "reviews" */ '@/components/packages/Reviews.vue'),
    // MainMenu: () => import(/* webpackChunkName: "reviews" */ '@/components/packages/MainMenu.vue'),
    FooterComponent: () => import(/* webpackChunkName: "footer-component" */ '@/components/packages/FooterComponent.vue')
  },

  data () {
    return {
      gitTagNumber: process.env.VUE_APP_GIT_TAG,
      releaseDate: document.documentElement.dataset.buildTimestampUtc,
      ready: false,
      pageContentReady: false,
      page: null,
      routesNames: []
    }
  },

  computed: {
    ...mapState(['pages', 'mainContentHeight', 'footerHeight']),
    // ...mapState('content', ['footer', 'top']),
    christmas () {
      const date = new Date()
      return date.getMonth() === 11 && date.getDate() > 22
    }
  },

  methods: {
    ...mapActions({
      getGeneralInfo: 'GET_GENERAL_INFO',
      getPages: 'GET_PAGES'
    }),
    ...mapActions('content', {
      getPageContent: 'GET_PAGE_CONTENT'
    }),
    async getReady () {
      const response = await Promise.all([
        this.getGeneralInfo(),
        this.getPageContent('live'),
        this.getPages()
      ])
      return response[2] ? response[1] : 'Pineapple NET'
    },
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)
      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    },
    mutationHandler (mutations) {
      this.$store.commit('UPDATE_MAIN_CONTENT_HEIGHT', this.$el.offsetHeight)
      document.body.style.height = this.mainContentHeight + this.footerHeight - 36 + 'px'
    },
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT')
    }
  },

  created () {
    this.gitTagNumber = process.env.VUE_APP_GIT_TAG
  },

  beforeMount () {
    this.getReady()
      .then((response) => {
        document.title = response
        this.pageContentReady = true
      })
  }

  // mounted () {
  //   this.onResize()
  //   window.addEventListener('resize', this.onResize, { passive: true })
  // },

  // beforeDestroy () {
  //   if (typeof window !== 'undefined') {
  //     window.removeEventListener('resize', this.onResize, { passive: true })
  //   }
  // }
}
</script>

<style>
  .section {
    width: 100%;
    max-width: 1440px;
  }
  body {
    overflow: hidden;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
