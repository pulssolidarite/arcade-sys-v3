<template>
    <div class="component">
        <div class="view tutorial">

            <div class="s-title">
                <div class="title">DIDACTITIEL</div>
                <div class="subtitle"></div>
            </div>

            <div class="s-content">
                <div class="joystick_d">
                    <img src="@/assets/img/didactitiel/joystick_d.svg" alt="joystick illustration">
                    <span class="j1">Haut</span>
                    <span class="j2">Gauche</span>
                    <span class="j3">Droite</span>
                    <span class="j4">Bas</span>
                </div>
                <div class="button_d">
                    <div class="t1">
                        <img src="@/assets/img/didactitiel/touch_X.svg" alt="touch_X">
                        <span class="sp_t1">Lancer</span>
                    </div>
                    <div class="t2">
                        <img src="@/assets/img/didactitiel/touch_Y.svg" alt="touch_Y">
                        <span class="sp_t2">Kick</span>
                    </div>
                    <div class="t3">
                        <img src="@/assets/img/didactitiel/touch_L.svg" alt="touch_L">
                        <span class="sp_t3">Dormir</span>
                    </div>
                    <div class="t4">
                        <img src="@/assets/img/didactitiel/touch_A.svg" alt="touch_A">
                        <span class="sp_t4">Courir</span>
                    </div>
                    <div class="t5">
                        <img src="@/assets/img/didactitiel/touch_B.svg" alt="touch_B">
                        <span class="sp_t5">Sauter</span>
                    </div>
                    <div class="t6">
                        <img src="@/assets/img/didactitiel/touch_R.svg" alt="touch_R">
                        <span class="sp_t6">Plonger</span>
                    </div>
                </div>
            </div>


            <helpGamepad :gpio_help="4" :B_but="false" @simulate_a="simulate_a"/>
        </div>
    </div>    
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';


export default {
    components: {helpGamepad},
    computed: {
        a() {
            return this.$store.state.gamepad.A;
        },
    },
    watch: {
        a: function(val) {
            if (val) {
                this.$emit("nextView");
            }
        },
    },
    methods: {
        simulate_a() {
            this.$emit("nextView");
        }
    }
    
}
</script>

<style scoped>

</style>