<template>
  <v-app class="homefone">
    <v-container fluid class="homefone">
      <MainNavigation :pages="pages.map(item => item.buttonText)" :page.sync="page" />
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
          <Testimonials :content="testimonials" :page.sync="goto"/>
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
                        <UserContact :userForm="userForm" />
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

import MainNavigation from '@/components/MainNavigation.vue'
import Top from '@/components/Top.vue'
import Aside from '@/components/Aside.vue'
import UserContact from '@/components/UserContact.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQ from '@/components/FAQ.vue'

export default {
  name: 'page-1',
  components: {
    MainNavigation,
    Top,
    Aside,
    UserContact,
    Testimonials,
    FAQ
  },
  data () {
    return {
      ready: false,
      page: null,
      goto: null
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('page-3', ['top', 'testimonials', 'info', 'userForm', 'faq']),
    ...mapState('page-3', { pages: 'mainNavButtons' }),
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
    ...mapState('testimonials', {
      reviews: 'testimonials'
    }),
    ...mapActions('contact', {
      // getContent: 'GET_CONTENT',
      updateFields: 'SET_FIELDS_TO_SHOW'
    })
  },
  mounted () {
    this.page = undefined
    this.updateFields(this.userForm.fieldsToShow)
  }
}
</script>
