<template>
    <div class="component">
        <div class="view tutorial">

            <div class="s-title">
                <div class="title">DIDACTITIEL</div>
                <div class="subtitle"></div>
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