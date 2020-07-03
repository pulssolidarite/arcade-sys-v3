<template>
    <div class="component">
        <div class="view tutorial">



            <helpGamepad :gpio_help="4" :B_but="false" @simulate_a="simulate_a"/>
        </div>
    </div>    
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';


export default {
    components: {helpGamepad},
    methods: {
        simulate_a() {
            this.$emit("nextView");
        }
    }
    
}
</script>

<style scoped>

</style>