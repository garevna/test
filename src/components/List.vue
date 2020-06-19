<template>
  <v-container style="max-width:1440px" class="mx-auto">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card
              flat
              class="aside-card transparent mx-auto my-12"
              width="480"
        >
          <v-card-title>
            <h2 class="text-center text-md-left">{{ list.header }}</h2>
          </v-card-title>
          <v-card-text>
            <p class="text-center text-md-left">
                {{ list.text }}
            </p>
          </v-card-text>
          <v-card-text>
            <v-btn
                dark
                class="submit-button px-auto mx-auto"
                @click="$emit('update:page', list.goto)"
            >
                {{ list.button }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-row
            flat
            align="center"
            class="transparent"
            v-for="(item, index) in list.items"
            :key="index"
            style="max-width: 540px;"
        >
          <!-- <v-card flat class="transparent"> -->
            <v-col cols="2">
                <v-img :src="item.icon" width="70" contain></v-img>
            </v-col>
            <v-col cols="10">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
            </v-col>
          <!-- </v-card> -->
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

p {
  text-align: justify;
}

</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Aside',
  computed: {
    ...mapState('content', ['list'])
  }
}
</script>
