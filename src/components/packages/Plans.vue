<template>
  <v-row width="100%" justify="center">
    <section id="plans" class="section">
      <div class="base-title">
        <a href="#plans" class="core-goto"></a>
        <InternetPlans :page.sync="section" />
      </div>
    </section>
  </v-row>
</template>

<script>

import 'pineapple-internet-plans'
import 'pineapple-internet-plans/dist/pineapple-internet-plans.css'

export default {
  name: 'Plans',
  props: ['goto'],
  computed: {
    section: {
      get () {
        return this.goto
      },
      set (val) {
        this.$emit('update:goto', val)
      }
    }
  }
}

</script>
