<template>
  <v-app class="homefone">
    <v-container fluid class="homefone">
      <!-- <AppHeader :pages="pages" :page.sync="page" /> -->
      <MainNavigation :pages="mainNavButtons.map(item => item.buttonText)" :page.sync="page" />
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
            <Top />
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

import MainNavigation from '@/components/MainNavigation.vue'
import Top from '@/components/HomeTop.vue'
import List from '@/components/List.vue'
import HowToConnect from '@/components/HowToConnect.vue'
import GreenSection from '@/components/GreenSection.vue'
import Testimonials from '@/components/Testimonials.vue'
import InternetPlans from '@/components/InternetPlans.vue'
import FAQ from '@/components/FAQ.vue'

export default {
  name: 'Home',
  components: {
    MainNavigation,
    Top,
    List,
    HowToConnect,
    GreenSection,
    Testimonials,
    InternetPlans,
    FAQ
  },
  data () {
    return {
      ready: false,
      page: 10,
      goto: null
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('content', {
      top: 'top',
      reviews: 'testimonials'
    }),
    ...mapState('content', ['mainNavButtons']),
    route () {
      return this.$route.name
    }
  },
  watch: {
    route (val) {
      this.$vuetify.goTo('#top', {
        duration: 500,
        offset: 100,
        easing: 'easeInOutCubic'
      })
    },
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
      if (typeof val !== 'number') return

      if (this.mainNavButtons[val].section) {
        this.$vuetify.goTo(this.mainNavButtons[val].section, {
          duration: 500,
          offset: 20,
          easing: 'easeInOutCubic'
        })
        this.page = undefined
        return
      }
      if (this.mainNavButtons[val].page) {
        this.$router.push({ name: this.mainNavButtons[val].page })
      } else {
        window.open(this.mainNavButtons[val].url, '_blank')
      }
      this.page = undefined
    }
  },
  methods: {
    ...mapActions('content', {
      getContent: 'GET_CONTENT'
    })
  },
  mounted () {
    // this.$store.commit('content/UPDATE_BUTTONS')
    this.page = undefined
  }
}
</script>
