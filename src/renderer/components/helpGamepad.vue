<template>
    <div class="footer">
        <div class="gamapad1" id="gp1" style="height:100%;">
            <div class="left-side">
                <div class="gpio1" id="gpio1" style="display: none;">
                    <span class="left-gpio"  @click="simulate_left"></span>
                    <span class="dot"></span>
                    <span class="right-gpio"  @click="simulate_right"></span>
                    <span class="gpio-help"> Se déplacer </span>
                </div>
                 <div class="gpio2" id="gpio2" style="display: none;">
                    <span class="up-gpio" @click="simulate_up"></span>
                    <span class="dot"></span>
                    <span class="down-gpio"  @click="simulate_down"></span>
                    <span class="gpio-help"> Se déplacer </span>
                </div>
                 <div class="gpio3" id="gpio3" style="display: none;">
                    <span class="left-gpio"  @click="simulate_left"></span>
                    <span class="up-gpio" @click="simulate_up"></span>
                    <span class="dot"></span>
                    <span class="down-gpio"  @click="simulate_down"></span>
                    <span class="right-gpio"  @click="simulate_right"></span>
                    <span class="gpio-help"> Se déplacer </span>
                </div>
                 <div class="no-gpio" id="no-gpio" style="display: none;">
                    <span class="dot"></span>
                    <span class="gpio-help"> Se déplacer </span>
                </div>
            </div>
            <div class="right-side">
                <span class="B-but" id="B-but" @click="simulate_b"><span class="g-btn">B</span>Retour</span>
                <span class="A-but" id="A-but" @click="simulate_a"><span class="g-btn">A</span>Valider</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "helpGamepad",
    props : {
        gpio_help: { type: Number, default: 1 },
        A_but: { type: Boolean, default: true },
        B_but: { type: Boolean, default: true }
    },
    mounted () {
        this.select_ath(this.gpio_help, this.A_but, this.B_but);
    },
    methods: {
        simulate_a() {
            this.$emit("simulate_a");
        },
        simulate_b() {
            this.$emit("simulate_b");
        },
        simulate_left() {
            this.$emit("simulate_left");
        },
        simulate_right() {
            this.$emit("simulate_right");
        },
        simulate_up() {
            this.$emit("simulate_up");
        },
        simulate_down() {
            this.$emit("simulate_down");
        },
        select_ath(gpio_help, A_but, B_but) {
            let gpio1 = document.getElementById("gpio1");       // 1 : gpio left-right
            let gpio2 = document.getElementById("gpio2");       // 2 : gpio up-down
            let gpio3 = document.getElementById("gpio3");       // 3 : gpio all-direction
            let no_gpio = document.getElementById("no-gpio");   // 4 : no-gpio
            switch (gpio_help) {
                case 1 : gpio1.style.display = "block";
                    break;
                case 2 : gpio2.style.display = "block";
                    break;
                case 3 : gpio3.style.display = "block";
                    break; 
                case 4 : no_gpio.style.display = "none";
                    break;
                default : this.$emit("error", {
                            visible: true,
                            title: "Aucun helpGamepad valide",
                            errors: {}
                        });
                    break;
            }
            if (!A_but) {
                let Element_A = document.getElementById("A-but");
                Element_A.style.display ="none";
            }
            if (!B_but) {
                let Element_B = document.getElementById("B-but");
                Element_B.style.display ="none";
            }
        }
    }
}
</script>


<style scoped>

.footer {
    position: absolute;
    height: 86px;
    width: 100%;
    top: 92vh;
    z-index: 10;
}

.dot {
  height: 28px;
  width: 28px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.left-side {
    height: 50px;
    margin-top: 18px; 
    margin-left: 3vw;
    float: left;
}

.right-side {
    margin-top: 28px; 
    margin-right: 3vw;
    float: right;
}

.left-gpio {
    margin-bottom: 12px;
	border-top: 13px solid transparent;
	border-right: 17px solid #bbb;
    border-bottom: 13px solid transparent;
    display: inline-block;
    cursor: pointer;
}   

.right-gpio {
    margin-bottom: 12px;
	border-top: 13px solid transparent;
	border-left: 17px solid #bbb;
    border-bottom: 13px solid transparent;
    display: inline-block;
    cursor: pointer;
}

.up-gpio {
    margin-bottom: 12px;
	border-left: 13px solid transparent;
	border-bottom: 17px solid #bbb;
    border-right: 13px solid transparent;
    display: inline-block;
    cursor: pointer;
}   

.down-gpio {
    margin-bottom: 12px;
	border-left: 13px solid transparent;
	border-top: 17px solid #bbb;
    border-right: 13px solid transparent;
    display: inline-block;
    cursor: pointer;
}

.gpio-help {
    position: absolute;
    margin-top: -3.9vh;
    margin-left: 10vw;
    color: white;
}

.A-but {
    color: white;
    cursor: pointer;
}

.B-but {
    color: white;
    cursor: pointer;
}

</style>

