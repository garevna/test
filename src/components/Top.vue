<template>
<v-container fluid class="page-top-container mb-12">
  <v-card flat tile class="mx-auto homefone" width="100%" max-width="1180">
    <v-row align="center" justify="center">
      <v-col sm="12" md="6">
        <v-card flat tile width="100%" max-width="480" class="transparent left-col">
          <v-card-text class="text-center text-lg-left">
            <h1 class="text-center text-md-left">
              {{ top.header }}
            </h1>
          </v-card-text>
          <v-card-text class="mx-auto mx-lg-0">
            <p class="text-center text-md-left" v-html="top.text.split('\n').join('<br>')">
            </p>
          </v-card-text>
          <v-card-text class="text-center text-md-left">
            <v-btn
                color="buttons"
                dark
                rounded
                height="48"
                class="submit-button px-auto mx-auto"
                @click="$emit('update:page', top.goto)"
            >
                {{ top.button }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="6" order="first" order-md="last" class="right-col mx-auto">
        <TopPicture :url="top.pictureURL" class="top-picture" />
      </v-col>
    </v-row>
  </v-card>
</v-container>
</template>

<style scoped>

.page-top-container {
  overflow-x: hidden;
  margin-top: 80px;
  margin-bottom: -120px;
}

.left-col {
  max-width: 480px;
}

.clip-svg {
  clip-path: url(#myClip);
}

p {
  line-height: 180%!important;
}

@media screen and (max-width: 959px) {
  .page-top-container {
    margin-top: 80px;
    margin-bottom: 32px;
  }
  .left-col {
    max-width: 100%!important;
    margin-top: 48px;
    text-align: center;
  }
  .right-col {
    margin-top: -40px;
    margin-bottom: -180px;
  }
}

@media screen and (max-width: 500px) {
  .page-top-container {
    margin-top: 20px;
    margin-bottom: 120px;
  }
}
</style>

<script>

import { mapState } from 'vuex'

import TopPicture from '@/components/TopPicture.vue'

export default {
  name: 'Top',
  components: {
    TopPicture
  },
  props: ['page'],
  computed: {
    ...mapState('content', ['top'])
  }
}
</script>
