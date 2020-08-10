<template>
  <div class="component">
    <div class="view game-choice">

        <div class="s-title">
          <div class="title">CHOISI TON JEU</div>
          <div class="subtitle">1 partie = 5 minutes</div>
        </div>

        <div class="s-content">

          <div class="carousel">
            <vueper-slides ref="carousel" class="no-shadow"
                          :infinite="false" :visibleSlides="1" 
                          :fixedHeight="true" :bullets="false" 
                          :touchable="false" :gap=30 :transition-speed="300"
                          @ready="chooseGame($event.currentSlide.index)" 
                          @slide="chooseGame($event.currentSlide.index)">
              
              <template v-slot:arrow-left>
                <div id="left-arrow" class="left-arrow"></div>
              </template>
              <template v-slot:arrow-right>
                <div id="right-arrow" class="right-arrow"></div>
              </template>

              <vueper-slide v-for="(game, i) in games" :key="i">
                <template v-slot:content>
                  <div class="carousel-content">
                    <div class="row title-g"> {{ game.name }} </div>
                    <div class="row picture">
                        <img :src=game.logo :alt=game.name class="slide-picture">
                    </div>
                    <div class="c-line"></div>
                    <div class="row infos">
                      <div class="icon1"></div>
                      <div class="nb-j"></div>
                      <div class="icon2"></div>
                      <div class="type"></div>
                    </div>
                    <div class="c-line"></div>
                    <div class="row descr">
                      <span class="slide-description">
                          {{ game.description }}
                        </span>
                    </div>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>     

        </div>

        <!-- GAMEPAD -->
        <helpGamepad :gpio_help="1" @simulate_a="simulate_a" @simulate_b="simulate_b" @simulate_left="simulate_left" @simulate_right="simulate_right"/>

    </div>
  </div>
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';
import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
  name: "Start",
  components : {VueperSlides, VueperSlide, helpGamepad},
  props: ["games", "session"],   
  data: function() {
    return {
      choosenGame: {},
      choosenIndexOf: {
        games: "",
      }
    };
  },
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
        this.gotoCampaign();
      }
    },
    b: function(val) {
      if (val) {
        this.$emit("lastView");
      }
    },
    left: function(val) {
      if (val) {
          this.$refs.carousel.previous();
          this.animateArrow('left');
      }
    },
    right: function(val) {
      if (val) {
          this.$refs.carousel.next();
          this.animateArrow('right');
       }
    }
  },
  mounted: function() {
    if (this.session.position_game) {
      this.chooseGame(this.session.position_game - 1);
    } else {
      this.chooseGame(0);
    }
  },
  methods: {
    // SIMULATE GAMEPAD METHODS
    simulate_a() {
      this.gotoCampaign();
    },
    simulate_b() {
      this.$emit("lastView");
    },
    simulate_left() {
      this.$refs.carousel.previous();
      this.animateArrow('left');
    },
    simulate_right() {
      this.$refs.carousel.next();
      this.animateArrow('right');
    },

    // OTHER METHODS
    chooseGame: function(index) {
      this.choosenGame = this.games[index];
      this.choosenIndexOf.games = index;

      // Saving
      this.$emit("saveGame", {
        game: this.choosenGame,
      });
    },
    gotoCampaign: function() {
      if ((this.choosenGame != null)) {
        this.$emit("nextView");
      } else {
        this.$emit("error", {
          visible: true,
          title: "Aucun choix valide",
          errors: {}
        });
      }
    },
    animateArrow(dir) {
      if (dir == 'left') {
        var arrow = document.getElementById("left-arrow");
      } else {
        var arrow = document.getElementById("right-arrow");
      }
      arrow.style.transform = "scale(1.4)";  
      setTimeout(function() { arrow.style.transform = "scale(1)"; }, 150);
    }
  }
};
</script>
