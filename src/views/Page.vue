<template>
    <v-container fluid class="homefone" v-if="ready">
      <MainMenu :page.sync="page" />
      <v-sheet
        width="100%"
        max-width="1440"
        color="homefone"
        tile
        class="mx-auto"
      >
        <section id="top" style="width: 100%">
          <div class="base-title">
            <a href="#top" class="core-goto"></a>
            <Top :top="top" :page.sync="goto" />
          </div>
        </section>

      </v-sheet>
      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row align="center" justify="center" class="mx-0 px-0">
        <Reviews :goto.sync="goto" />
      </v-row>

      <!-- ============================= USER CONTACT ============================= -->

      <v-sheet
          width="100%"
          max-width="1130"
          color="homefone"
          tile
          class="mx-auto"
      >
        <v-row align="start" justify="center" class="mx-0 px-0">
          <v-col cols="12" md="7" class="aside-col">
            <section id="benefits" style="width: 100%">
              <div class="base-title">
                <a href="#benefits" class="core-goto"></a>
                <Aside :info="info" />
              </div>
            </section>
          </v-col>
          <v-col cols="12" md="5" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <UserForm />
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- ============================= FAQ ============================= -->
      <!-- <v-row width="100%">
        <Faqs :goto.sync="goto" />
      </v-row> -->
    </v-container>
</template>

<style scoped>
@media screen and (max-width: 360px) {
  h3 {
    font-size: 14px;
  }
}
</style>

<script>

import { mapState, mapActions } from 'vuex'

import Top from '@/components/Top.vue'
import Aside from '@/components/Aside.vue'

export default {
  name: 'Page',
  props: ['route'],
  components: {
    UserForm: () => import(/* webpackChunkName: "userForm" */ '@/components/packages/UserForm.vue'),
    Reviews: () => import(/* webpackChunkName: "reviews" */ '@/components/packages/Reviews.vue'),
    MainMenu: () => import(/* webpackChunkName: "reviews" */ '@/components/packages/MainMenu.vue'),
    Top,
    Aside
  },
  data () {
    return {
      ready: false,
      page: null,
      goto: null
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'mailEndpoint', 'browserTabTitle', 'emailSubject', 'emailText', 'pages', 'mainContentHeight', 'footerHeight']),
    ...mapState('content', ['top', 'testimonials', 'info', 'address'])
  },
  watch: {
    route (val) {
      this.$vuetify.goTo('#top', {
        duration: 500,
        offset: 80,
        easing: 'easeInOutCubic'
      })
    },

    /* Buttons on page */
    goto (val) {
      if (!val) return
      this.$vuetify.goTo(val, {
        duration: 500,
        offset: 20,
        easing: 'easeInOutCubic'
      })
      this.goto = undefined
    },

    /* Buttons of main nav bar */
    page (val) {
      if (!val) return

      /* Inside page transition */
      if (val.indexOf('#') === 0) {
        this.$vuetify.goTo(val, {
          duration: 500,
          offset: 50,
          easing: 'easeInOutCubic'
        })
        this.page = undefined
        return
      }

      /* Go to external url */
      if (val.indexOf('http') === 0) {
        window.open(val, '_blank')
        this.page = undefined
        return
      }

      /* Go to page */
      this.$router.push({ name: val })
      this.page = undefined
    }
  },
  methods: {
    ...mapActions('content', {
      getContent: 'GET_PAGE_CONTENT'
    }),
    async getReady () {
      if (!this.emailSubject) await this.getContent('live')
      document.title = this.browserTabTitle
      // route: `${address.streetNumber}_${address.streetName.split(' ').join(-)}_${address.state}_${address.postcode}`
      const [number, street, state, postcode] = this.route.split('_')
      const streetName = street.split('-').join(' ')
      const page = this.pages.find(item => item.address.streetNumber === number && item.address.state === state && item.address.postcode === postcode && item.address.streetName === streetName)
      if (!page) return
      await this.getContent(`live-${page.id}`)
      this.ready = true
    }
  },
  beforeMount () {
    this.getReady()
  },
  mounted () {
    this.page = undefined
  }
}
</script>
