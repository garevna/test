import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify, {
  VApp,
  VContainer,
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VFadeTransition
} from 'vuetify/lib'

import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify)

export default new Vuetify({
  treeShake: true,
  icons: {
    iconfont: 'mdi',
    values: {
      expand: 'mdi-chevron-down',
      valid: 'mdi-check-bold',
      invalid: 'mdi-alert-outline',
      home: 'mdi-home-circle'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#4CAF50',
        secondary: '#75BE00',
        buttons: '#72BF44',
        greentext: '#20731C',
        deepgreen: '#20731C',
        homefone: '#FAFAFA',
        plansfone: '#E5FDD7',
        warning: '#FAFF00'
      },
      dark: {
        primary: '#4CAF50',
        secondary: '#75BE00',
        buttons: '#72BF44',
        greentext: '#20731C',
        deepgreen: '#20731C',
        homefone: '#FAFAFA',
        plansfone: '#E5FDD7',
        warning: '#FAFF00'
      }
    }
  },
  components: {
    VApp,
    VContainer,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VFadeTransition
  },
  directives: {
    Ripple
  }
})
