<template>
  <v-row justify="center">
      <v-dialog v-model="opened" persistent max-width="290">
        <v-card class="pa-6" style="overflow: hidden;">
          <figure style="position: absolute; bottom: -8px; right: 0; z-index: 0">
            <svg width="173" height="158" viewBox="0 0 173 158" fill="none">
              <g style="mix-blend-mode:multiply">
                <path d="M173 3.05176e-05C77.4548 2.21647e-05 7.62439e-06 70.7 0 157.913L163 157.913C168.523 157.913 173 153.436 173 147.913L173 3.05176e-05Z" fill="#E6FED8"/>
                <path d="M173 41.2199C102.395 41.2199 45.1581 93.4651 45.1581 157.913L153 157.913C162.428 157.913 167.142 157.913 170.071 154.984C173 152.055 173 147.341 173 137.913L173 41.2199Z" fill="#D8FEC2"/>
                <path d="M173 84.1815C128.389 84.1815 92.2243 117.192 92.2243 157.913L163 157.913C168.523 157.913 173 153.436 173 147.913L173 84.1815Z" fill="#C2E9AB"/>
              </g>
            </svg>
          </figure>
          <v-card-text class="text-center">
            <h2>Error</h2>
          </v-card-text>
          <v-card-text>
            <p>Please fill the form fields</p>
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn
                  class="submit-button"
                  width="80"
                  text @click="$emit('update:opened', false)"
            >
              CLOSE
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<style scoped>
h2 {
  color: #900;
}
</style>

<script>
export default {
  name: 'PopupError',
  props: ['opened']
}
</script>
