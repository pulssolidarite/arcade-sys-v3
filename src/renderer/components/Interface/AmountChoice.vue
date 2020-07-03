<template>
  <div class="component">
      <div class="view amount-choice">

        <!-- /////// -->
        <div class="content">
          
          <div class="content-amount" style="width : 150px; margin-left:50%; height: 50px">
            <span class="h2 amount">{{ session.amount }}€</span>
          </div>

          <div class="slider">
            <!-- <div class="container mb-5 pb-3 mt-2 text-center" id="content-slidebar"> -->
            <div class="content-slidebar">
              <div class="progress" style="height: 30px;">
                <div
                  class="progress-bar bg-warning"
                  role="progressbar"
                  :style="{ width: (this.session.amount/30)*100 + '%' }"
                  :aria-valuenow="this.session.amount"
                  aria-valuemin="0"
                  :aria-valuemax="30"
                >
                </div>
              </div>
            </div>
            <!-- </div> -->
            
            <span class="more-but" @click="simulate_right">+</span>
            <span class="less-but" @click="simulate_left">-</span>

            <div class="content-line" id="content-line">
              <!-- <span class="line1" :style="{ width: (this.session.amount/30)*100 + '%' }"></span> -->
              <span class="line1" id="line1"></span>
              <span class="line2" :style="{ left: (this.session.amount/30)*100 + '%' }"></span>
              <span class="line3" id="line3"></span>
            </div>
          </div>
            <!-- amount DETAILS -->
              <div class="amount-detail">
                <div class="logo-rounded">
                      <img
                        :src="getActionPhoto(session.campaign, session.amount)"
                        :alt="session.campaign.name"
                        height="125"
                        class="rounded"
                      />
                    </div>
                      <span class="mt-3">{{
                        getAction(session.campaign, session.amount)
                      }}</span>

              </div>
            <!-- \amount DETAILS -->
        </div>

        

        <!-- /////// -->
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
      amounts: [1, 5, 10, 20, 30],
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
      if (this.session.amount == 30) {
        line3.style.width = "100%";
      }
      else
      {
        line3.style.width = "0%";
      }
    },
    line_left() {
      var line1 = document.getElementById("line1");
      switch (this.session.amount) {
        case 1 : line1.style.width ="30%";
                 line1.style.left = "3.1%";
                break;
        case 5 : line1.style.width ="25%";
                 line1.style.left = "16.8%";
                break;
        case 10 : line1.style.width ="5%";
                  line1.style.left = "33%";
                break;
        default : line1.style.width = "0%";
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

.content {
  position: relative;
  width : 100%; 
  height:80%; 
  margin-top:8%;
}

.amount-detail {
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: rgb(0, 140, 255) ;
  border : solid 3px rgb(33, 29, 255);
  border-radius: 15px;
  width: 30vw;
  z-index: 4;
}

.slider {
  width: 58%;
  margin-left: 21%;
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

.progress {
  border-radius: 0;
}

.line1{
    position: relative;
    top: 118.8%;
    height: 100%;
    display: block;
    box-sizing: border-box;
}

.line2{
    position: relative;
    top: -25vh;
    display: block;
    box-sizing: border-box;
}

.line3{
    position: relative;
    top: 18.5%;
    left: 66.5%;
    height: 100%;
    display: block;
    box-sizing: border-box;
}


.line1:before{
    content: '';
    position: absolute;
    width:100%;
    height: 4px;
    background: #F3CA30;
}

.line2:before{
    content: '';
    position: absolute;
    left: -0.3%;
    width:4px;
    height: 30vh;
    background: #F3CA30;
}

.line3:before{
    content: '';
    position: absolute;
    width: 33.33%;
    height: 4px;
    background: #F3CA30;
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
  top: 2.8%;
  left: 80%;
}

.less-but {
  font-size: 3rem;
  color : white;
  width: 30px;
  position: absolute;
  text-align: center;
  top: 2.8%;
  left: 18%;
}


  


</style>