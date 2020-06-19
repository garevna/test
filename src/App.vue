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
            <Footer
                  :title="footer ? footer.title : ''"
                  :text="footer ? footer.text : ''"
            />
          </v-row>
      </div>
    </section>
  </v-app>
</template>

<style>

html, body {
  width: 100%;
  max-width: 100%;
  font-family: Gilroy;
}

.container,
.container--fluid,
.container.fill-height {
  padding: 0!important;
}
.container.fill-height > .row {
  max-width: 100%!important;
}

h1, h2, h3, h4, h5 {
  white-space: normal;
  word-break: normal;
  font-style: normal;
  font-weight: 900;
  line-height: 150%;
  letter-spacing: 0.02em;
  color: #000;
  font-family: Gilroy;
}
h1 { font-size: 46px; }
h2 { font-size: 32px; }
h3 { font-size: 28px; }
h4 { font-size: 24px; }
h5 { font-size: 20px; }
h4, h5 { font-weight: 600; }

p {
  font-size: 16px;
  font-weight: normal;
  line-height: 180%;
  letter-spacing: 0.02em;
}

.row {
  margin-left: 0!important;
  margin-right: 0!important;
}

svg.defs-only {
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
}

.user-contact { width: 640px; }

.submit-button {
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 16px!important;
  line-height: 100%;
  text-transform: uppercase;
  min-width: 240px!important;
  max-width: 420px!important;
  height: 48px!important;
  background-color: #72BF44!important;
  color: #fff!important;
  border-radius: 48px!important;
}

@media (max-width: 600px), (max-height: 600px) {
  h1 { font-size: 28px; }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }
  h4, h5 { font-size: 18px; }
  p { font-size: 16px; }
  .user-contact { width: 480px; }
  .submit-button { font-size: 14px!important; }
}

@media (max-width: 400px), (max-height: 400px) {
  h1 { font-size: 26px; }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }
  h4, h5 { font-size: 16px; }
  p {
    font-size: 14px!important;
    width: 100%!important;
  }
  .user-contact { width: 300px; }
  .submit-button {
    font-size: 13px!important;
    width: 100%!important;
  }
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #20731C;
}
::-webkit-scrollbar-thumb {
  background: #4CAF50;
}
::-webkit-scrollbar-thumb:hover {
  background: #72BF44;
}

</style>

<script>

import { mapState, mapActions } from 'vuex'

import SystemBar from '@/components/SystemBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    SystemBar,
    Footer
  },
  data () {
    return {
      ready: false,
      page: null
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'pages', 'selectors']),
    ...mapState('content', ['browserTabTitle', 'footer'])
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
    this.getTestimonials()
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
