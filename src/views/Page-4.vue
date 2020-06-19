<template>
  <v-app class="homefone">
    <v-container fluid class="homefone" v-if="ready">
      <AppHeader :pages="pages" :page.sync="page" />
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
            <Top :page.sync="page" />
          </div>
        </section>

      </v-sheet>
      <!-- ============================= TESTIMONIALS ============================= -->

      <section id="testimonials" style="width: 100%">
        <div class="base-title">
          <a href="#testimonials" class="core-goto"></a>
          <Testimonials :page.sync="page"/>
        </div>
      </section>

      <!-- ============================= USER CONTACT ============================= -->

      <v-sheet
          width="100%"
          max-width="1440"
          color="homefone"
          tile
          class="mx-auto"
      >
        <v-row align="center" class="mx-0 px-0">
          <v-col cols="12" md="6" class="aside-col">
            <section id="benefits" style="width: 100%">
              <div class="base-title">
                <a href="#benefits" class="core-goto"></a>
                <Aside />
              </div>
            </section>
          </v-col>
          <v-col cols="12" md="6" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <section id="contact" style="width: 100%">
                <div class="base-title">
                  <a href="#contact" class="core-goto"></a>
                  <v-card flat class="transparent mx-0">
                    <!-- <v-img src="@/img/map-picture.svg" height="800" contain style="opacity:0.2;"></v-img> -->
                      <v-card
                            flat
                            class="user-contact transparent mx-auto pa-0"
                            style="margin-bottom: 80px"
                      >
                        <UserContact />
                      </v-card>
                    </v-card>
                  </div>
                </section>
              </v-row>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- ============================= HOW TO CONNECT ============================= -->
      <!-- <v-row width="100%">
        <HowToConnect :page.sync="page" />
      </v-row> -->
      <!-- ============================= INTERNET PLANS ============================= -->
      <!-- <v-row width="100%" justify="center">
        <section id="plans">
          <div class="base-title">
            <a href="#plans" class="core-goto"></a>
            <InternetPlans :page.sync="page"/>
          </div>
        </section>
      </v-row> -->
      <!-- ============================= FAQ ============================= -->
      <v-row width="100%">
        <section id="faq" style="width: 100%">
          <div class="base-title">
            <a href="#faq" class="core-goto"></a>
            <FAQ :page.sync="page"/>
          </div>
        </section>
      </v-row>
      <!-- ============================= FOOTER ============================= -->
      <section id="footer" class="homefone">
        <div class="base-title">
          <a href="#footer" class="core-goto"></a>
            <v-row width="100%">
              <Footer :page.sync="page" :user.sync="user" />
            </v-row>
        </div>
      </section>
    </v-container>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import AppHeader from '@/components/AppHeader.vue'
import Top from '@/components/Top.vue'
import Aside from '@/components/Aside.vue'
import UserContact from '@/components/UserContact.vue'
// import HowToConnect from '@/components/HowToConnect.vue'
import Testimonials from '@/components/Testimonials.vue'
// import InternetPlans from '@/components/InternetPlans.vue'
import FAQ from '@/components/FAQ.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'page-4',

  components: {
    AppHeader,
    Top,
    Aside,
    UserContact,
    // HowToConnect,
    Testimonials,
    // InternetPlans,
    FAQ,
    Footer
  },

  data () {
    return {
      ready: false,
      page: null,
      user: {
        name: '',
        email: '',
        phone: ''
      },
      plans: false
    }
  },
  computed: {
    ...mapState(['viewport', 'viewportWidth', 'pages', 'selectors']),
    ...mapState('content', {
      title: 'browserTabTitle',
      subject: 'emailSubject',
      emailText: 'emailText',
      // pages: 'mainNavButtons',
      // selectors: 'selectors',
      top: 'top',
      info: 'info',
      userForm: 'userForm',
      howToConnect: 'howToConnect',
      testimonials: 'testimonials',
      faq: 'faq',
      footer: 'footer'
    })
  },
  watch: {
    page (val) {
      if (typeof val !== 'number') return
      console.log(val)

      if (this.pages[val].section) {
        this.$vuetify.goTo(this.pages[val].section, {
          duration: 500,
          offset: 20,
          easing: 'easeInOutCubic'
        })
        this.page = undefined
        return
      }
      if (this.pages[val].page) {
        this.$router.push({ name: this.pages[val].page })
      } else {
        window.open(this.pages[val].url, '_blank')
      }
      this.page = undefined
    }
  },
  methods: {
    ...mapActions('content', {
      getContent: 'GET_CONTENT'
    }),
    ...mapActions('testimonials', {
      getTestimonials: 'GET_CONTENT'
    }),
    onResize () {
      this.$store.commit('CHANGE_VIEWPORT')
    }
  },
  beforeMount () {
    this.getContent('2-4')
      .then((response) => {
        this.ready = !!response
      })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}

</script>
