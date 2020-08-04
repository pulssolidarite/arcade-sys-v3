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

                  <!-- <div class="w-credit">© PULS IMPACT · 2019 - 2020</div>
                  <div class="w-credit-infos">Agence en innovations solidaires</div> -->
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
          //Nothing
      }
    },
    right: function(val) {
      if (val) {
          // Nothing
       }
    }
  },
  methods: {
    simulate_a() {
      this.start();
    },
    simulate_b() {
      this.start();
    },
    start: function() {
        this.$emit("nextView");
      }
    }
};
</script>


<style scoped>

.cadre {
  position: relative;
  margin: 0 auto;
  border: 5px solid transparent;
}

.top,
.bottom,
.left,
.right {
  position: absolute;
  -webkit-animation: 8s linear infinite;
          animation: 8s linear infinite;
}
.top {
  top: -3px;
  left: -3px;
  height: 5px;
  -webkit-animation-name: top;
          animation-name: top;
}
@-webkit-keyframes top {
  25% {
    width: 0;
    background: #ffdb00;
  }
  38% {
    width: calc(100%);
    background: #ffdb00;
  }
  50% {
    background: #ffdb00;
  }
  62% {
    background: #ffdb00;
  }
  75% {
    width: calc(101%);
    background: #ffdb00;
  }
  88% {
    left: auto;
    right: -3px;
    width: 0;
    background: #ffdb00;
  }
}

.bottom {
  bottom: -3px;
  right: -3px;
  height: 5px;
  -webkit-animation-name: bottom;
          animation-name: bottom;
}
@-webkit-keyframes bottom {
  0% {
    width: 0;
  }
  12% {
    width: calc(100%);
    background: #ffdb00;
  }
  25% {
    background: #ffdb00;
  }
  38% {
    background: #ffdb00;
  }
  50% {
    width: calc(101%);
    background: #ffdb00;
  }
  62% {
    left: -3px;
    width: 0;
    background: #ffdb00;
  }
  75% {
    background: #ffdb00;
  }
}

.left {
  bottom: -3px;
  left: -3px;
  width: 5px;
  -webkit-animation-name: left;
          animation-name: left;
}
@-webkit-keyframes left {
  12% {
    height: 0;
    background: #ffdb00;
  }
  25% {
    height: calc(103%);
    background: #ffdb00;
  }
  38% {
    background: #ffdb00;
  }
  50% {
    background: #ffdb00;
  }
  62% {
    height: calc(103%);
    background: #ffdb00;
  }
  75% {
    top: -3px;
    height: 0;
    background: #ffdb00;
  }
  88% {
    background: #ffdb00;
  }
}

.right {
  top: -3px;
  right: -3px;
  width: 5px;
  -webkit-animation-name: right;
          animation-name: right;
}
@-webkit-keyframes right {
  38% {
    height: 0;
    background: #ffdb00;
  }
  50% {
    height: calc(103%);
    background: #ffdb00;
  }
  62% {
    background: #ffdb00;
  }
  75% {
    background: #ffdb00;
  }
  88% {
    height: calc(103%);
    background: #ffdb00;
  }
  100% {
    top: auto;
    bottom: -3px;
    height: 0;
    background: #ffdb00;
  }
}

</style>
