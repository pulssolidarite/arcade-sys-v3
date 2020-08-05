<template>
  <div class="component">
    <div class="view amount-choice">

        <div class="s-title">
          <div class="title">COMBIEN SOUHAITE-TU REVERSER À L'ASSOCIATION ?</div>
          <div class="subtitle">Chaque don est déductible fiscalement</div>
        </div>

        <div class="s-content">
          
          <div class="content-amount">
            <img class="amount-frame" src="@/assets/img/amount-frame.svg" alt="cadre">
            <span class="h2 amount">{{ session.amount }}€</span>
            <span class="h2 amount2">{{ session.amount }}€</span>
          </div>

          <div class="content-flags">
            <div id="flag1" class="full-flag"></div>
            <div id="flag2" class="full-flag"></div>
            <div id="flag3" class="full-flag"></div>
            <div id="flag4" class="empty-flag"></div>
            <div id="flag5" class="empty-flag"></div>
            <div id="flag6" class="empty-flag"></div>
          </div>

          <div class="slider">
            <!-- <div class="container mb-5 pb-3 mt-2 text-center" id="content-slidebar"> -->
            <div class="content-slidebar">
              <div class="progress" style="height: 30px;">
                <div
                  class="progress-bar bg-warning"
                  role="progressbar"
                  :style="{ width: (this.session.amount/50)*100 + '%' }"
                  :aria-valuenow="this.session.amount"
                  aria-valuemin="0"
                  :aria-valuemax="50"
                >
                </div>
              </div>
            </div>
            <!-- </div> -->
            
            <span class="more-but" @click="simulate_right"><img src="@/assets/img/plus_btn.svg" alt="plus"></span>
            <span class="less-but" @click="simulate_left"><img src="@/assets/img/moins_btn.svg" alt="moins"></span>

            <div class="content-line" id="content-line">
              <!-- <span class="line1" :style="{ width: (this.session.amount/30)*100 + '%' }"></span> -->
              <span class="line1" id="line1"></span>
              <span class="line2" :style="{ left: (this.session.amount/50)*100 -0.4 + '%' }"></span>
              <span class="line3" id="line3"></span>
            </div>
          </div>
            <!-- amount DETAILS -->
              <div class="amount-detail">
                <div class="amount-icon">
                    <img :src="getActionPhoto(session.campaign, session.amount)" :alt="session.campaign.name" height="125" class="rounded"/>
                </div>
                <span class="amount-description"> {{ getAction(session.campaign, session.amount) }} </span>

              </div>
            <!-- \amount DETAILS -->
        </div>

        <!-- GAMEPAD -->
        <helpGamepad @simulate_a="simulate_a" @simulate_b="simulate_b" @simulate_left="simulate_left" @simulate_right="simulate_right"/>
    </div>
  </div>
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';

export default {
  name: "AmountChoice",
  components: {helpGamepad},
  props: ["session"],
  data: function() {
    return {
      choosenIndexOf: 2,
      amounts: [1, 5, 10, 20, 30, 50],
      value: 1,
      max: 100
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
        this.proceed();
      }
    },
    b: function(val) {
      if (val) {
        this.$emit("lastView");
      }
    },
    left: function(val) {
      if (val) {
        if (this.amounts[this.choosenIndexOf - 1]) {
          this.chooseAmount(this.choosenIndexOf - 1);
        }
      }
    },
    right: function(val) {
      if (val) {
        if (this.amounts[this.choosenIndexOf + 1]) {
          this.chooseAmount(this.choosenIndexOf + 1);
        }
      }
    }
  },
  mounted: function() {
    if (!this.session.position_asso) {
      this.$emit("lastView");
    } else {
      if (this.session.position_amount) {
        this.chooseAmount(this.session.position_amount - 1);
      } else {
        this.chooseAmount(2);
      }
    }
  },
  methods: {
    line_right() {
      var line3 = document.getElementById("line3");
      if (this.session.amount == 50) {
        line3.style.width = "70vw"; //122%
      }
      else
      {
        line3.style.width = "0vw";
      }
    },
    line_left() {
      var line1 = document.getElementById("line1");
      switch (this.session.amount) {
        case 1 : line1.style.width ="30%";
                 line1.style.left = "2%";
                break;
        case 5 : line1.style.width ="20%";
                 line1.style.left = "9.8%";
                break;
        case 10 : line1.style.width ="10%";
                  line1.style.left = "19.8%";
                break;
        default : line1.style.left = "40%";
                break; 
      }
    },
    flags() {
      // var flags;
      // for (let i = 1; i < 7; i++) {
      //   flags[i] = document.getElementById("flag"+i);
      // }
      var flag1 = document.getElementById("flag1");
      var flag2 = document.getElementById("flag2");
      var flag3 = document.getElementById("flag3");
      var flag4 = document.getElementById("flag4");
      var flag5 = document.getElementById("flag5");
      var flag6 = document.getElementById("flag6");
      switch (this.session.amount) {
        case 1 : flag2.className = 'empty-flag';
                break;
        case 5 : setTimeout(function() { flag2.className = 'full-flag'; }, 350);
                 flag3.className = 'empty-flag';
                break;
        case 10 : setTimeout(function() { flag3.className = 'full-flag'; }, 350);
                  flag4.className = 'empty-flag';
                break;
        case 20 : setTimeout(function() { flag4.className = 'full-flag'; }, 350);
                  flag5.className = 'empty-flag';
                break;
        case 30 : setTimeout(function() { flag5.className = 'full-flag'; }, 350);
                  flag6.className = 'empty-flag';
                break;
        case 50 : setTimeout(function() { flag6.className = 'full-flag'; }, 350);
                break;
      }
    },
    simulate_a() {
      this.proceed();
    },
    simulate_b() {
      this.$emit("lastView");
    },
    simulate_left() {
        if (this.amounts[this.choosenIndexOf - 1]) {
          this.chooseAmount(this.choosenIndexOf - 1);
        }
    },
    simulate_right() {
        if (this.amounts[this.choosenIndexOf + 1]) {
          this.chooseAmount(this.choosenIndexOf + 1);
        }
    },
    getAction: function(campaign, amount) {
      if (amount == 1) {
        return campaign.text1;
      }
      if (amount == 5) {
        return campaign.text5;
      }
      if (amount == 10) {
        return campaign.text10;
      }
      if (amount == 20) {
        return campaign.text20;
      }
      if (amount == 30) {
        return campaign.text30;
      }
      if (amount == 50) {
        return campaign.text30; //text50 when back ready
      }
    },
    getActionPhoto: function(campaign, amount) {
      if (amount == 1) {
        return campaign.photo1;
      }
      if (amount == 5) {
        return campaign.photo5;
      }
      if (amount == 10) {
        return campaign.photo10;
      }
      if (amount == 20) {
        return campaign.photo20;
      }
      if (amount == 30) {
        return campaign.photo30;
      }
      if (amount == 50) {
        return campaign.photo30; //photo50 when back ready
      }
    },
    chooseAmount: function(index) {
      this.choosenIndexOf = index;
      this.$emit("saveAmount", {
        amount: this.amounts[this.choosenIndexOf],
        indexOf: this.choosenIndexOf + 1
      });
      console.log("amount = "+ this.amounts[this.choosenIndexOf])
      this.line_right();
      this.line_left();
      this.flags();
    },
    proceed: function() {
      if (this.choosenIndexOf != null) {
        this.$emit("nextView");
      } else {
        this.$emit("error", {
          visible: true,
          title: "Aucun choix valide",
          errors: {}
        });
      }
    }
  }
};
</script>


<style scoped>

.content-flags {
  position: relative;
}

.full-flag {
  position: absolute;
  width: 80px;
  height: 100px;
  top: 11vh;
  transform: scale(0.8);
  background: no-repeat url("../../assets/img/drap_plein.svg");
  z-index: 5;
}

.empty-flag {
  position: absolute;
  width: 80px;
  height: 100px;
  top: 11vh;
  transform: scale(0.8);
  background: no-repeat url("../../assets/img/drap_vide.svg");
}

#flag1 {
  left: 21.4vw; 
}
#flag2 {
  left: 26.1vw; 
}
#flag3 {
  left: 31.9vw; /* -0.2 en media < 1500px*/
}
#flag4 {
  left: 43.5vw; 
}
#flag5 {
  left: 55.05vw; 
}
#flag6 {
  left: 78.26vw; 
}


.content-amount {
  width : 150px; 
  margin-left:50%;
  height: 50px;
  margin-top: 25vh;
}

.amount {
    z-index: 5;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 3.1vh;
    font-family: pixel2;
    font-size: 3rem;
    color: white;
}

.amount2 {
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-47%);
    margin-top: 3.4vh;
    font-family: pixel2;
    font-size: 3rem;
    color: black;
}

.amount-frame {
  transform: translateX(-50%);
}

.amount-detail {
  margin-left: 50%;
  margin-top: -10vh;
  transform: translateX(-50%);
  background-color: #512FB5;
  box-shadow: -5px 0px #775CE4,
              0px -5px #775CE4,
              5px 0px #372491,
              0px 5px #372491;
  /* border : solid 3px rgb(33, 29, 255); */
  /* border-radius: 15px; */
  text-align: center;
  width: 30vw;
  z-index: 4;
}

.slider {
  position: relative;
  width: 58%;
  margin-left: 21%;
  margin-top: 18vh;
}

.content-line {
    height: 25vh;
    top: 19vw;
}

.content-slidebar {
  box-shadow: -8px 0px #775CE4,
              0px -8px #775CE4,
              8px 0px #372491,
              0px 8px #372491;
}

.amount-icon {
  margin-left: 50%;
  transform: translateX(-50%);
}

.amount-description {
  font-family: pixel3;
  color: white;
  font-size: 0.8rem;
}

.progress {
  border-radius: 0;
}

.line1{
    position: relative;
    /* top: 118.8%; */
    top: 78.8%;
    height: 100%;
    display: block;
    box-sizing: border-box;
}

.line2{
    position: relative;
    top: -25vh;
    display: block;
    box-sizing: border-box;
    width: 10px;
    height: 20vh;
    overflow: hidden;
}

.line3{
    position: relative;
    top : -101.5%;
    left: 59.5%;
    height: 100%;
    display: block;
    box-sizing: border-box;
}


.line1:before{
    content: '';
    position: absolute;
    width:100%;
    height: 4px;
    background: #ffc107;
}

.line2:before{
    content: '';
    position: absolute;
    left: -0.3%;
    width:4px;
    height: 30vh;
    background: #ffc107;
}

.line3:before{
    content: '';
    position: absolute;
    width: 33.33%;
    height: 4px;
    background: #ffc107;
}

.progress-bar, .line2, .line1, .line3{
  transition: all 0.35s ease-in-out;
}

.more-but {
  font-size: 3rem; 
  color : white;
  width: 30px;
  position: absolute;
  text-align: center;
  top: -9%;
  left: 60vw;
}

.less-but {
  font-size: 3rem;
  color : white;
  width: 30px;
  position: absolute;
  text-align: center;
  top: -9%;
  left: -4.5vw; /* +1 for media < 1500px */
}



</style>