<template>
    <div class="stepping" id="stepping">
        <div class="step">
            <span class="etape">Etape</span>
            <span class="numero-etape">{{n_step +1}}</span>
        </div>
        <div class="indicator">
            <div class="indicator-step"  v-for="i in nb_step" :key="i" :for="i">
              <div :class="[i <= n_step+1 ? 'star_fill' : 'star']"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["n_step"],
    data: function() {
        return {
            nb_step: 5, 
        };
    }
}
</script>

<style scoped>

.stepping {
    position: absolute;
    height: 100px;
    width: 230px;
    margin-top: 2vh;
    margin-left: 1.5vw;
    /* border: solid 4px #f00; */
    z-index: 10;
}

.step {
    color: white;
    font-family: Pixel2;
    /* text-align: center; */
    font-size: 1.5rem;
}

.numero-etape {
    float: right;
}

.indicator {
    margin-top: 2%;
}

.star_fill {
    width: 45px;
    height: 45px;
    float: left;
    background-image: url("../assets/img/star_fill.svg");
    background-size: 45px;
}

.star {
    width: 45px;
    height: 45px;
    float: left;
    background-image: url("../assets/img/star.svg");
    background-size: 45px;
}


</style>