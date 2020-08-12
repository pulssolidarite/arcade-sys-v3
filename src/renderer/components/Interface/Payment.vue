<template>
  <div class="component">
    <div class="view payment">

      <div class="s-title">
          <div class="title">
            <img class="padlock-icon" src="@/assets/img/padlock.svg" alt="padlock">
            Realise ton don !
            <img class="padlock-icon" src="@/assets/img/padlock.svg" alt="padlock">
          </div>
          <div class="subtitle"><div class="animHorizontalText" style="margin-bottom:-50px">Place ton moyen de paiement sans contact sur le terminal de la borne.</div> <br> Tu pourras récupérer un reçu après ta partie.</div>
      </div>

      <div class="s-content">
        <img class="nfc-illustration" src="@/assets/img/payement.svg"/>

        <div class="recap">
          <div class="game-icon">
            <img class="logo-circle" :src="session.game.logo" :alt="session.game.name" />
          </div>
          <span class="txt-recap">Je reverse <span style="color:#C97005;">{{session.amount}} €</span> 
                                  à l’association  <span style="color:#C97005;">{{session.campaign.name}}</span> 
                                  en jouant à  <span style="color:#C97005;">{{session.game.name}}</span>
          </span>
          <div class="asso-icon">
            <img class="logo-circle" :src="session.campaign.logo" :alt="session.campaign.name" /> 
          </div>
        </div>
      </div>
                
    </div>
  </div>
</template>

<script>
export default {
  name: "Payment",
  props: ["session"],
  mounted: function() {
    // IN PRODUCTION UNCOMMENT THIS
    // For paying with PayterTerminal
    // if (this.session.amount) {
    //   setTimeout(() => this.pay(this.session.amount), 1000); // Adding a one second timeout to wait for divs to load
    // } else {
    //   this.$emit("lastView");
    // }

    // FOR DEV PURPOSE ONLY
    // For skipping payment
    setTimeout(() => this.skipPayment(this.session.amount), 100000);
  },
  methods: {
    skipPayment: function(amount) {
      this.payment = {
        donator: this.session.donator.id,
        terminal: this.session.terminal.id,
        campaign: this.session.campaign.id,
        game: this.session.game.id,
        date: new Date(),
        method: "Manual",
        status: "Accepted",
        amount: amount,
        currency: "EUR",
      };

      this.$emit("savePayment", { payment: this.payment });
    },
    skipPaymentError: function(amount) {
      this.payment = {
        donator: this.session.donator.id,
        terminal: this.session.terminal.id,
        campaign: this.session.campaign.id,
        game: this.session.game.id,
        date: new Date(),
        method: "Manual",
        status: "",
        amount: amount,
        currency: "EUR",
      };

      this.$emit("error", {
              visible: true,
              title: "Erreur de connexion",
              errors: [
                "Il y a un problème de connexion au terminal de paiement. Veuillez réessayer ou contacter le support.",
              ],
            });
    },
    launchPayment: function(amount) {
      // Here we use Electron Edge JS to execute a C# script (edje-script.csx) along with a Customized Payter DLL.
      // This script only launches a series of functions in the PayPay customized DLL and receives bunch of error code.
      var edge = require("electron-edge-js");
      var pay = edge.func({ 
        source: "edje-script.csx",
        references: ["PayterPay.dll"],
      });

      var payload = {
        amount: amount,
        timeout: 15, // Default timeout
      };

      var result = pay(payload, true);
      return result;
    },
    pay: function(amount) {
      if (this.session.amount != null) {
        // Calling PayterPay script from here
        var result = this.launchPayment(amount);

        this.payment = {
          donator: this.session.donator.id,
          terminal: this.session.terminal.id,
          campaign: this.session.campaign.id,
          game: this.session.game.id,
          date: new Date(),
          method: "Contactless",
          status: "",
          amount: amount,
          currency: "EUR",
        };

        // Checking response from the Payter Pay DLL
        switch (result) {
          case 0:
            // APPROVED
            this.payment.status = "Accepted";
            this.$emit("savePayment", { payment: this.payment });
            break;
          case 1:
            // DECLINED
            this.$emit("error", {
              visible: true,
              title: "Paiement décliné",
              errors: [
                "Votre paiement a été refusé. Veuillez contacter votre émetteur de carte.",
              ],
            });
            this.$emit("savePayment", { payment: this.payment });
            break;
          case -1:
            // CONNECTION ERROR
            this.$emit("error", {
              visible: true,
              title: "Erreur de connexion",
              errors: [
                "Il y a un problème de connexion au terminal de paiement. Veuillez réessayer ou contacter le support.",
              ],
            });
            break;
          case -5:
            // TIMEOUT
            this.$emit("error", {
              visible: true,
              title: "Temps écoulé",
              errors: [
                "Vous avez mis trop de temps à passer votre carte. L'opération est annulée, veuillez réessayer.",
              ],
            });
            break;
          case -6:
            // INVALID CARD
            this.$emit("error", {
              visible: true,
              title: "Carte invalide",
              errors: [
                "Votre carte est invalide. Veuillez réessayer ou contacter le support.",
              ],
            });
            break;
          default:
            // UNKNOWN ERROR
            this.$emit("error", {
              visible: true,
              title: "Erreur inconnue",
              errors: [
                "Un problème inconnu est survenu. Veuillez réessayer ou contacter le support.",
              ],
            });
            break;
        }
      }
    },
  },
};
</script>


<style scoped>


.nfc-illustration {
    height: 70%;
    margin-top: 50vh;
    margin-left: 50%;
    transform: translate3d(-50%,-50%,0);
}

.recap {
  position: relative;
  margin-left: 50%;
  margin-top: -18vh;
  transform: translateX(-50%);
  background-color: #512FB5;
  box-shadow: -5px 0px #775CE4,
              0px -5px #775CE4,
              5px 0px #372491,
              0px 5px #372491;
  text-align: center;
  width: 50vw;
  height: 10vh;
  z-index: 4;
}

.txt-recap {
  font-family: pixel3;
  color: white;
  font-size: 0.8rem;
  position: absolute;
  left :50%;
  width: 36vw;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
}

.game-icon {
  position: absolute;
  left: 100%;
  transform: translateX(-100%) scale(0.8);
}
.asso-icon {
  position: absolute;
  left: 0%;
  transform: scale(0.8);
}

</style>