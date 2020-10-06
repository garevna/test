<template>
  <section id="testimonials" class="section">
    <div class="base-title">
      <a href="#testimonials" class="core-goto"></a>
      <Testimonials :page.sync="section"/>
    </div>
  </section>
</template>

<script>

import 'pineapple-testimonials'
import 'pineapple-testimonials/dist/pineapple-testimonials.css'

export default {
  name: 'Reviews',
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
