<template>
  <v-card
          flat
          width="100%"
          class="transparent my-10"
  >
    <v-card-text class="text-center">
      <h2>FIBRE <span class="green--text">INTERNET PLANS</span></h2>
    </v-card-text>
    <!-- <v-card-text>
      <p v-html="internetPlans.text"></p>
    </v-card-text> -->

    <v-card-text width="100%" class="mx-0 px-0 text-center">
      <SwitchMode />
    </v-card-text>

    <v-slide-x-transition leave-absolute>
      <v-card
              flat
              class="d-flex flex-wrap justify-center transparent"
      >
        <PriceCard class="d-none d-md-block"
                  v-for="(item, index) in plans[plan]"
                  :key="index"
                  :item="item"
                  :index="index"
                  :contact.sync="contact"
        />

      <v-carousel
          :height="carouselHeight"
          hide-delimiter-background
          show-arrows-on-hover
          class="d-block d-md-none"
        >
          <v-carousel-item
            v-for="(item, index) in plans[plan]"
            :key="index"
          >
            <v-sheet
              height="320"
              light
              class="transparent"
            >
              <v-row
                class="fill-height transparent"
                align="center"
                justify="center"
              >
              <PriceCard
                        :mode="plan"
                        :item="item"
                        :index="index"
                        :contact.sync="contact"
                        :selected.sync="selected"
              />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-slide-x-transition>
    <v-card-actions class="text-center my-4 mb-md-8">
      <v-btn
          dark
          class="submit-button px-auto mx-auto"
          @click="$emit('update:page', '#top')"
      >
        Contact Us
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>

</style>

<script>

import { mapState } from 'vuex'

import PriceCard from '@/components/plans/PriceCard.vue'
import SwitchMode from '@/components/plans/SwitchToggle.vue'

export default {
  name: 'InternetPlans',
  components: {
    PriceCard,
    SwitchMode
  },
  props: ['page'],
  data () {
    return {
      contact: false,
      selected: null
    }
  },
  computed: {
    ...mapState(['viewportWidth', 'plan']),
    ...mapState('internetPlans', ['plans']),
    ...mapState('content', ['internetPlans']),
    carouselHeight () {
      return this.viewportWidth < 960 ? this.viewportWidth < 600 ? 420 : 480 : 420
    }
  }
}
</script>
