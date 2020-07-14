<template>
  <v-app class="homefone">
    <v-container fluid class="homefone" v-if="ready">
      <MainNavBar :page.sync="page" />
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

      <section id="list" style="width: 100%">
        <div class="base-title">
          <a href="#list" class="core-goto"></a>
          <List :page.sync="goto" />
        </div>
      </section>

      <!-- ============================= CREEN SECTION ============================= -->
      <section id="dgtek" style="width: 100%">
        <div class="base-title">
          <a href="#dgtek" class="core-goto"></a>
          <GreenSection />
        </div>
      </section>

      <!-- ============================= HOW TO CONNECT ============================= -->

      <section id="how-to-connect" style="width: 100%">
        <div class="base-title">
          <a href="#how-to-connect" class="core-goto"></a>
          <HowToConnect :page.sync="goto" />
        </div>
      </section>

      <!-- ============================= TESTIMONIALS ============================= -->

      <section id="testimonials" style="width: 100%">
        <div class="base-title">
          <a href="#testimonials" class="core-goto"></a>
          <Testimonials :content="reviews" :page.sync="goto"/>
        </div>
      </section>

      <!-- ============================= INTERNET PLANS ============================= -->
      <v-row width="100%" justify="center">
        <section id="plans">
          <div class="base-title">
            <a href="#plans" class="core-goto"></a>
            <InternetPlans :page.sync="goto"/>
          </div>
        </section>
      </v-row>

      <!-- ============================= FAQ ============================= -->
      <v-row width="100%">
        <section id="faq" style="width: 100%">
          <div class="base-title">
            <a href="#faq" class="core-goto"></a>
            <FAQ :page.sync="goto"/>
          </div>
        </section>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import HomeTop from '@/components/HomeTop.vue'
import List from '@/components/List.vue'
import GreenSection from '@/components/GreenSection.vue'

export default {
  name: 'Home',
  components: {
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
    ...mapState(['viewportWidth', 'mailEndpoint']),
    ...mapState('content', {
      top: 'top',
      reviews: 'testimonials'
    }),
    ...mapState('content', ['mainNavButtons', 'mainNavSectors']),
    route () {
      return this.$route.name
    }
  },
  watch: {
    goto (val) {
      if (!val) return
      this.$vuetify.goTo(val, {
        duration: 500,
        offset: 20,
        easing: 'easeInOutCubic'
      })
      this.goto = undefined
    },
    page (val) {
      if (!val) return

      /* Inside page transition */
      if (val.indexOf('#') === 0) {
        this.$vuetify.goTo(val, {
          duration: 500,
          offset: 20,
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
    ...mapActions('content', {
      getContent: 'GET_CONTENT'
    })
  },
  beforeMount () {
    this.getContent('2').then(() => {
      this.ready = true
    })
  },
  mounted () {
    this.page = undefined
  }
}
</script>
