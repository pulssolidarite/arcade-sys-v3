<template>
    <div class="component">
        <div class="view about">
            <div class="s-title">
                <div class="title">PULS IMPACT</div>
                <div class="subtitle">Agence en innovation solidaire</div>
            </div>

            <div class="about-content">
                <div class="infos-puls">
                    <p>
                        Puls Impact est le fruit de deux entrepreneurs sociaux qui engagent leurs actions dans la recherche et le développement de nouvelles solutions pour démocratiser la générosité et l’engagement.
                        <br><br>« Une société de l’engagement passe par le développement de la générosité »<br><br>
                        Notre approche consiste à placer le plaisir, l’émotion, le divertissement et le ludique au cœur des solutions de générosité afin de sensibiliser différemment aux enjeux associatifs et multiplier le geste de don pour le grand public.
                    </p>
                </div>
                <div class="contact">
                        <p>
                            Nous contacter
                            <br><br>                            
                            Site web : www.puls-impact.fr<br>
                            Email : contact@puls-impact.fr<br>
                            Téléphone : +33 (0)6 32 46 51 64
                        </p>
                </div>
                <div class="QR">
                    <img src="@/assets/img/QR_PULS.png" alt="QR code vers puls-imapct.fr">
                </div>
            </div>
            <helpGamepad :gpio_help="4" :A_but="false" @simulate_b="simulate_b"/>
        </div>
    </div>
</template>

<script>
import helpGamepad from '@/components/helpGamepad.vue';
export default {
    name: "about",
    components : {helpGamepad}, 
    methods: {
        simulate_b() {
            this.$emit("lastView");
        },
    }
}
</script>

