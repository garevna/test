<template>
  <figure class="mx-auto">
    <svg
          width="800"
          height="800"
          style="position: absolute; top: -100px; left: -80px; transform: rotate(25deg)"
      >
          <path d="M56.5648 80.1215C59.4047 77.0002 61.3428 75.6889 63.9787 73.8127C83.6173 59.8443 105.177 49.9693 128.533 44.0817C138.449 41.5889 148.526 40.2663 158.755 41.1812C165.902 41.8274 172.696 43.5912 178.78 47.5441C179.88 48.2696 180.956 48.9738 182.056 49.6993C182.33 49.933 182.628 50.188 182.901 50.4216C183.235 50.8361 183.545 51.2293 183.878 51.6438C185.8 53.9747 187.963 56.1244 189.644 58.6365C195.846 67.9373 198.662 78.4309 200.142 89.3307C202.03 103.376 201.408 117.339 198.81 131.248C195.701 147.818 190.396 163.586 180.202 177.325C176.407 182.469 171.93 186.901 166.467 190.274C158.015 195.481 148.744 197.019 139 196.09C130.005 195.24 121.557 192.493 113.385 188.819C105.691 185.34 98.3655 181.23 91.4892 176.342C86.995 173.145 82.4795 169.974 78.2826 166.43C73.7627 162.609 69.5402 158.441 65.3425 154.294C61.2478 150.278 57.7376 145.729 54.603 140.942C49.4923 133.133 45.7746 124.751 44.7154 115.372C43.5054 104.66 45.96 94.8434 52.0085 85.905" fill="#72BF44" transform="scale(3.8, 3.8)"/>
      </svg>

    <img :src="url" class="clip-svg">

    <svg width="0" height="0" style="position: absolute; top:80px; left: 80px;">
      <defs>
        <clipPath id="clipping-mask">
          <path d="M28.1694 106.851C34.9083 98.837 39.5866 95.3979 45.9404 90.4906C93.2789 53.9542 145.777 27.3811 203.115 10.52C227.459 3.37854 252.316 -0.877352 277.767 0.399966C295.55 1.30951 312.566 5.02431 328.034 14.2357C330.833 15.9279 333.568 17.5698 336.367 19.2619C337.067 19.8148 337.831 20.418 338.532 20.9709C339.4 21.9662 340.204 22.9112 341.073 23.9065C346.064 29.4995 351.634 34.62 356.045 40.6856C372.323 63.1452 380.322 88.8902 385.048 115.772C391.091 150.412 390.901 185.093 385.807 219.831C379.705 261.216 368.08 300.825 344.135 335.877C335.225 348.999 324.555 360.422 311.335 369.315C290.886 383.045 268.046 387.756 243.798 386.395C221.413 385.161 200.201 379.168 179.582 370.852C160.17 362.971 141.608 353.489 124.085 342.036C112.632 334.546 101.129 327.121 90.3803 318.74C78.8033 309.706 67.93 299.78 57.1204 289.905C46.579 280.344 37.4349 269.406 29.199 257.841C15.7709 238.974 5.74096 218.551 2.20584 195.4C-1.83237 168.957 3.30258 144.38 17.4331 121.632" fill="#72BF44" transform="scale(1.5, 1.5)"/>
        </clipPath>
      </defs>
    </svg>
  </figure>
</template>

<style scoped>

svg# {

}

figure {
  position: relative;
  width: 800px;
  height:800px;
  overflow: hidden;
  transform: translate(-120px, 0);
}

@media screen and (max-width: 1360px) {
  figure {
    transform: scale(0.8,0.8) translate(-120px, 0);
  }
}

@media screen and (max-width: 1110px) {
  figure {
    transform: scale(0.8,0.8) translate(-160px, 0);
  }
}

@media screen and (max-width: 960px) {
  figure {
    margin-top: -70px;
    margin-bottom: -80px;
    transform: scale(0.8,0.8) translate(-0px, 0);
  }
}

@media screen and (max-width: 700px) {
  figure {
    transform: scale(0.8,0.8) translate(-60px, 0);
  }
}

@media screen and (max-width: 600px) {
  figure {
    transform: scale(0.7,0.7) translate(-150px, 0);
  }
}

@media screen and (max-width: 500px) {
  figure {
    transform: scale(0.6,0.6) translate(-260px, 0);
  }
}

@media screen and (max-width: 460px) {
  figure {
    transform: scale(0.6,0.6) translate(-280px, 0);
  }
}

@media screen and (max-width: 430px) {
  figure {
    transform: scale(0.6,0.6) translate(-320px, 0);
  }
}

@media screen and (max-width: 400px) {
  figure {
    transform: scale(0.6,0.6) translate(-340px, 0);
  }
}

@media screen and (max-width: 375px) {
  figure {
    transform: scale(0.6,0.6) translate(-355px, 0);
  }
}

@media screen and (max-width: 360px) {
  figure {
    transform: scale(0.55,0.55) translate(-400px, 0);
  }
}

@media screen and (max-width: 340px) {
  figure {
    transform: scale(0.5,0.5) translate(-470px, 0);
  }
}

@media screen and (max-width: 320px) {
  figure {
    transform: scale(0.5,0.5) translate(-490px, 0);
  }
}

img {
  position: absolute;
  min-width: 600px;
  max-width: 800px;
  top:80px;
  left: 80px;
}
.clip-svg {
  clip-path: url(#clipping-mask);
}
</style>

<script>
export default {
  name: 'TopPicture',
  props: ['url']
}
</script>
