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
                    <div class="start-but">PRESSE A POUR CHOISIR TON JEU</div>
                  </div>

                  <div class="w-credit">© PULS IMPACT · 2019 - 2020</div>
                  <div class="w-credit-infos">Agence en innovations solidaires</div>
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
.screensaver {
  z-index: 10;
}

.w-title {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 8vh;
}

.title {
  font-family: Pixel;
  font-size: 4.5rem;
  color : #FFF222;
  text-shadow: 5px 0px #C97005;
}

.subtitle {
  font-family: Pixel;
  font-size: 2.2rem;
  color :#C97005;
}

.w-content {
    text-align: center;
    position: relative;
    height: 53vh;
    top: 44vh;
}

.w-description {
  font-family: Pixel;
  font-size: 1.8rem;
  color : #9183BE;
  margin-bottom: 3vh;
}

.start-but {
  font-family: Pixel;
  width: 36vw;
  height: 80px;
  padding-top: 23px;

  font-size: 1.4rem;
  color: white; 
  background-color: #4B37AF;
  box-shadow: -5px 0px #775CE4,
              0px -5px #775CE4,
              5px 0px #372491,
              0px 5px #372491;
}

.cadre{
  width: fit-content; 
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  box-shadow: -5px 0px #2c2c2c,
              0px -5px #2c2c2c,
              5px 0px #2c2c2c,
              0px 5px #2c2c2c;
}

.w-credit {
  font-family: Pixel;
  font-size: 1.4rem;
  color :white;
  margin-top:18%;
}

.w-credit-infos {
  font-family: Pixel;
  font-size: 1.1rem;
  color:white;
}

</style>
