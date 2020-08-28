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
                    <div class="start-but">PRESSE <span style="font-size:1.8rem;">A</span> POUR CHOISIR TON JEU</div>
                  </div>

                  <div class="w-credit">
                    <span class="copyright">© PULS IMPACT · 2019 - 2020</span>
                    <span class="credit-infos">Agence en innovations solidaires</span>
                  </div>
            </div>


            <!-- GAMEPAD -->
            <helpGamepad :gpio_help="4"  @simulate_a="simulate_a" :B_but="false"/>

        </div>
    </div>
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';

export default {
  name: "Welcom",
  components: {helpGamepad},
  props: [],   
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    },
    b() {
      return this.$store.state.gamepad.B;
    },
    left() {
      return this.$store.state.gamepad.Left;
    },
    right() {
      return this.$store.state.gamepad.Right;
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        this.start();
      }
    },
    b: function(val) {
      if (val) {
        this.start();
      }
    },
    left: function(val) {
      if (val) {
        this.start();
      }
    },
    right: function(val) {
      if (val) {
        this.start();
       }
    }
  },
  methods: {
    simulate_a() {
      this.start();
    },
    start: function() {
        this.$emit("nextView");
      }
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
