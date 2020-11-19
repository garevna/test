<template>
  <v-container fluid class="homefone full-height-container">
    <v-row align="center" justify="center" class="full-height-container">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card flat max-width="320" max-height="200" class="transparent ma-auto">
          <v-card-text class="text-center">
            <h1>404</h1>
          </v-card-text>
          <v-card-text class="text-center">
            <h3>Page not found</h3>
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn large text color="buttons" @click="goHome">
              Home
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'NotFound',
  props: ['route'],
  data () {
    return {
      ret: false
    }
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.full-height-container {
  height: 100vh;
}
h1, h3 {
  width: 100%;
}
</style>
