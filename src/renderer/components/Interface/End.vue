<template>
  <div class="component">
    <div class="view end">
            
        <div class="end-title">
            <span class="title">Fin de partie !</span><br>
            <span class="subtitle">On réessaye ?</span>
        </div>

        <div class="end-content">          
          <div class="but-group">
            <div class="but-list"  v-for="(choice, i) in choices" :key="i" :for="i" @click.prevent="doChoice(i)">
              <div :class="[selectedChoice == i ? 'selected' : '' ,'e-button']"> {{choice.name}} </div>
            </div>
          </div>

        </div>
              
        <helpGamepad :gpio_help="2"  @simulate_a="simulate_a" @simulate_b="simulate_b" @simulate_up="simulate_up" @simulate_down="simulate_down"/>

    </div>
  </div>
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';

export default {
  name: "End",
  components: {helpGamepad},
  props: ["session"],
  data: function() {
    return { 
      choices : [
        { name : "Rejouer", id : 1},
        { name : "Revenir à l'accueil", id : 2},
        { name : "Qui sommes-nous ?", id : 3},
      ],
      selectedChoice: ""
    };
  },
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    },
    b() {
      return this.$store.state.gamepad.B;
    },
    up() {
      return this.$store.state.gamepad.Up;
    },
    down() {
      return this.$store.state.gamepad.Down;
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        // this.$emit("nextView");
      }
    },
    b: function(val) {
      if (val) {
        this.$emit("lastView");
      }
    },
    up: function(val) {
      if (val) {
          this.doChoice(this.selectedChoice - 1);
      }
    },
    down: function(val) {
      if (val) {
          this.doChoice(this.selectedChoice + 1);
       }
    }
  },
  mounted: function() {
    this.$store.commit("startListening");
    this.$emit("endGameSession");
    this.$emit("endSession");
    this.doChoice(1);
  },
  methods: {
    simulate_up() {
        this.doChoice(this.selectedChoice - 1);
    },
    simulate_down() {
        this.doChoice(this.selectedChoice + 1);
    },
    simulate_a() {
      switch (this.selectedChoice) {
        case 0: this.$emit("replay");
            break;
        case 1: this.$emit("home"); 
            break;
        case 2: this.$emit("moreInfo"); 
            break;
      }
    },
    simulate_b() {
      this.$emit("lastView");
    }, 
    doChoice(index) {
      if (index > 2) {
        this.selectedChoice = 0; 
      } else if (index < 0) {
        this.selectedChoice = 2;
      } else {
        this.selectedChoice = index;
      }
    }
  }
};
</script>

<style scoped>

.end-content  {
  height: 80%;
  width: 100%;
  position:absolute;
  top:10%;
}

.selected {
  background-color : rgb(252, 236, 17) !important;
}

.end-title {
  text-align: center;
  color: white;
  margin-top: 12vh;
}

.but-group {
  width: 30%;
  margin-left : 50%;
  transform: translateX(-50%);
}

.e-button {
  margin-top:30px;
  border : 3px solid rgb(255, 56, 56);
  background-color: rgb(255, 129, 129);
  color: white;
  font-size: 2rem;
  text-align: center;
}

</style>
