<template>
    <div id="errorModal" v-if="visible">
        <div class="bg-error"></div>
        <div class="view Errors">
            
            <div class="error-modal">
                <div class="bg-modal"></div>
                <div class="error-titles">
                    <div class="title">{{ title }}</div>
                    <div class="subtitle">{{ errors[0] }}</div>
                </div>
                <div class="error-line"></div>
                <div class="error-menu">          
                    <div class="but-group">
                        <div class="but-list"  v-for="(choice, i) in choices" :key="i" :for="i" @click.prevent="doChoice(i)">
                        <div :class="[selectedChoice == i ? 'selected' : '' ,'e-button']"> 
                            <div class="text-button"> {{choice.name}} </div>
                        </div>
                        </div>
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
  name: "Error",
  components: {helpGamepad},
  props: ["visible", "title", "errors"],
  data: function() {
    return { 
      choices : [
        { name : "Réessayer", id : 1},
        { name : "Revenir à l'accueil", id : 2},
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
        switch (this.selectedChoice) {
        case 0: this.$emit("lastView"); 
            break;
        case 1: this.$emit("homeView"); 
            break;
        }
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
    this.doChoice(0);
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
        case 0: this.$emit("lastView"); 
            break;
        case 1: this.$emit("homeView"); 
            break;
      }
    },
    simulate_b() {
      this.$emit("lastView");
    }, 
    doChoice(index) {
      if (index > 1) {
        this.selectedChoice = 0; 
      } else if (index < 0) {
        this.selectedChoice = 1;
      } else {
        this.selectedChoice = index;
      }
    }
  }
};
</script>

