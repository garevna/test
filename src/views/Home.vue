<template>
  <v-app class="homefone">
    <v-container fluid class="homefone">
      <MainMenu :page.sync="page" />
      <v-sheet
        width="100%"
        max-width="1904"
        color="homefone"
        tile
        class="mx-auto"
      >
        <!-- ============================= TOP ============================= -->
        <section id="top" style="width: 100%">
          <div class="base-title">
            <a href="#top" class="core-goto"></a>
            <HomeTop :page.sync="page" />
          </div>
        </section>
      </v-sheet>

      <!-- ============================= LIST ============================= -->
      <v-row width="100%" justify="center">
        <section id="list" style="width: 100%">
          <div class="base-title">
            <a href="#list" class="core-goto"></a>
            <List :page.sync="goto" />
          </div>
        </section>
      </v-row>

      <!-- ============================= CREEN SECTION ============================= -->
      <v-row width="100%">
        <section id="dgtek" style="width: 100%">
          <div class="base-title">
            <a href="#dgtek" class="core-goto"></a>
            <GreenSection />
          </div>
        </section>
      </v-row>

      <!-- ============================= HOW TO CONNECT ============================= -->
      <v-row width="100%" justify="center">
        <section id="how-to-connect" class="section">
          <div class="base-title">
            <a href="#how-to-connect" class="core-goto"></a>
            <HowToConnect :page.sync="page" />
          </div>
        </section>
      </v-row>

      <!-- ============================= TESTIMONIALS ============================= -->
      <v-row width="100%" justify="center">
        <Reviews :goto.sync="goto" />
      </v-row>

      <!-- ============================= INTERNET PLANS ============================= -->
      <Plans :goto.sync="goto" />

    </v-container>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex'

/* HowToConnect */
import 'pineapple-how-to-connect'
import 'pineapple-how-to-connect/dist/pineapple-how-to-connect.css'

/* InternetPlans */
// import 'pineapple-internet-plans'
// import 'pineapple-internet-plans/dist/pineapple-internet-plans.css'

import HomeTop from '@/components/HomeTop.vue'
import List from '@/components/List.vue'
import GreenSection from '@/components/GreenSection.vue'

export default {
  name: 'Home',
  components: {
    Reviews: () => import(/* webpackChunkName: "reviews" */ '@/components/packages/Reviews.vue'),
    MainMenu: () => import(/* webpackChunkName: "main-menu" */ '@/components/packages/MainMenu.vue'),
    Plans: () => import(/* webpackChunkName: "internet-plans" */ '@/components/packages/Plans.vue'),
    HomeTop,
    List,
    GreenSection
  },
  data () {
    return {
      ready: false,
      page: undefined,
      goto: null
    }
  },
  computed: {
    ...mapState(['pages']),
    // ...mapState('content', ['top', 'mainNavButtons', 'mainNavSectors']),
    route () {
      return this.$route.name
    }
  },
  watch: {
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
          offset: 80,
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
      if (this.route.name === val) return
      this.$router.push({ name: val })
      this.page = undefined
    }
  },
  methods: {
    ...mapActions({
      getPages: 'GET_PAGES'
    }),
    ...mapActions('content', {
      getContent: 'GET_PAGE_CONTENT'
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPages()
        .then(() => vm.getContent('live'))
        .then(() => { vm.ready = true })
    })
  },
  mounted () {
    this.page = undefined
    this.$vuetify.goTo('#top', {
      duration: 500,
      offset: 20,
      easing: 'easeInOutCubic'
    })
    this.goto = undefined
  }
}
</script>
