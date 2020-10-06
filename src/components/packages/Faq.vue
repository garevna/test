<template>
  <section id="faq" style="width: 100%">
    <div class="base-title">
      <a href="#faq" class="core-goto"></a>
      <FAQ :page.sync="section"/>
    </div>
  </section>
</template>

<script>

import 'pineapple-faq'
import 'pineapple-faq/dist/pineapple-faq.css'

export default {
  name: 'Faqs',
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
