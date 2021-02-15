<template>
  <div class="component">
    <div class="view screensaver">
      <div class="w-title">
        <div class="title">ART.CADE SOLIDAIRE</div>
        <div class="subtitle">SOUTIENS UNE ASSOCIATION EN JOUANT</div>
      </div>

      <div class="w-content">
        <div class="w-description">1 Jeu, 1 Association, 1 Don</div>
        <div class="cadre">
          <div class="top"></div>
          <div class="bottom"></div>
          <div class="left"></div>
          <div class="right"></div>
          <div class="start-but">
            PRESSE <span style="font-size:1.8rem;">A</span> POUR CHOISIR TON JEU
          </div>
        </div>

        <div class="w-credit">
          <span class="credit-infos">{{ this.version }}</span>
          <span class="copyright">© PULS IMPACT · 2021</span>
          <span class="credit-infos">Agence en innovations solidaires</span>
        </div>
      </div>

      <!-- GAMEPAD -->
      <helpGamepad :gpio_help="4" @simulate_a="simulate_a" :B_but="false" />
    </div>
  </div>
</template>

<script>
import helpGamepad from "@/components/helpGamepad.vue";

//const fs = require('fs')
//const packageJson = fs.readFileSync('/package.json')
//const version = JSON.parse(packageJson).version || 0

export default {
  name: "Welcome",
  components: { helpGamepad },
  props: [],

  methods: {
    simulate_a() {
      this.start();
    },
    start: function() {
      this.$emit("nextView");
    },
  },
  data: function() {
    return {
      //version: "v" + require('/package.json').version
      version: "vX.X.X"
    };
  }
};
</script>

<style scoped>
/* 
.cadre {
  position: relative;
  margin: 0 auto;
  border: 5px solid transparent;
} */
</style>
