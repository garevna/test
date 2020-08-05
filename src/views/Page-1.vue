<template>
  <v-app class="homefone">
    <v-container fluid class="homefone" v-if="ready">
      <MainNavBar :page.sync="page" />
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

      <section id="testimonials" style="width: 100%">
        <div class="base-title">
          <a href="#testimonials" class="core-goto"></a>
          <Testimonials :content="testimonials" :page.sync="goto" />
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
                <Aside :info="info" />
              </div>
            </section>
          </v-col>
          <v-col cols="12" md="6" class="mx-0 px-0">
            <v-row align="center" justify="center" class="pa-0 my-12">
              <section id="contact" style="width: 100%">
                <div class="base-title">
                  <a href="#contact" class="core-goto"></a>
                  <v-card flat class="transparent mx-0">
                      <v-card
                            flat
                            class="user-contact transparent mx-auto pa-0"
                            style="margin-bottom: 80px"
                      >
                        <UserContact
                              :userForm="userForm"
                              :emailSubject="emailSubject"
                              :emailText="emailText"
                              :emailEndpoint="mailEndpoint"
                              v-if="userForm"
                        />
                      </v-card>
                    </v-card>
                  </div>
                </section>
              </v-row>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- ============================= FAQ ============================= -->
      <v-row width="100%">
        <section id="faq" style="width: 100%">
          <div class="base-title">
            <a href="#faq" class="core-goto"></a>
            <FAQ :faq="faq" :page.sync="goto"/>
          </div>
        </section>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import Top from '@/components/Top.vue'
import Aside from '@/components/Aside.vue'

export default {
  name: 'page-1',
  components: {
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
    ...mapState(['viewportWidth', 'mailEndpoint', 'browserTabTitle', 'emailSubject', 'emailText', 'mainContentHeight', 'footerHeight']),
    ...mapState('content', ['userForm', 'top', 'testimonials', 'info', 'faq']),
    route () {
      return this.$route.name
    }
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
      if (!this.emailSubject) await this.getContent(2)
      document.title = this.browserTabTitle
      await this.getContent('2-1')
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
