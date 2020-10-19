<template>
  <v-card flat class="transparent" width="100%">
    <v-row align="start" justify="center" class="my-12">
      <v-card dark width="100%" class="deepgreen mx-auto my-12 pa-8">
        <h3 style="color: #fff!important; text-align: center;">
          {{ address.formatted }}
        </h3>
        <h4 style="color: #fff!important; text-wrap: normal; text-align: center;">
          {{ address.streetNumber }} {{ address.streetName }}, {{ address.city }} {{ address.state }} {{ address.postcode }}
        </h4>
      </v-card>
    </v-row>
    <v-card
          flat
          class="aside-card transparent mx-auto my-12"
          max-width="480"
    >
      <v-row align="center" justify="center" class="mt-12">
        <v-card-title>
          <h2 class="text-left">{{ info.header }}</h2>
        </v-card-title>
        <v-card-text>
          <p class="text-left" v-html="info.text.split('\n').join('<br>')"></p>
        </v-card-text>
        <v-card-text>
          <h5
                v-for="(item, index) in info.offer"
                :key="index"
                style="margin-bottom: 16px"
          >
            <strong style="color: #72BF44; margin-right: 8px;">{{ item.greenText }}</strong>{{ item.blackText }}
          </h5>
        </v-card-text>
      </v-row>
      <v-row align="center" justify="center" class="mt-0 mt-md-12">
        <v-card-text class="my-12">
          <a href="https://dgtek.net" target="_blank">
            <span class="small text-left" style="margin-right: 16px">Pineapple NET is powered by</span>
            <v-img src="@/assets/dgtek-logo.svg" width="50" style="display: inline-block; vertical-align: middle;"></v-img>
          </a>
        </v-card-text>
      </v-row>
    </v-card>
  </v-card>
</template>

<style scoped>

.small {
  font-size: 14px;
}
strong {
  font-weight: 600;
}

@media screen and (max-width: 900px) {
  .aside-card {
    margin-bottom: 40px;
  }
}

</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Aside',
  computed: {
    ...mapState('content', ['info', 'address'])
  }
}
</script>
