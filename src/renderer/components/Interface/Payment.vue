<template>
  <div class="component">
    <div class="view payment">

        <div class="row d-flex align-items-center justify-content-around mt-5 pt-5 w-100">
          <span class="col-4 offset-1 h3 mt-3 text-uppercase text-center d-flex flex-column align-items-center">
            <span class="text-white">On y est presque</span>
            <span class="text-black">Glisse ton moyen de paiement</span>
          </span>
          <div class="col-2 offset-5">
            <div class="logo-circle">
              <img :src="session.campaign.logo" :alt="session.campaign.name" />
            </div>
          </div>
          <span class="text-white"> {{ session.game.name }} </span>
          <span class="text-white"> {{ session.amount }} </span>
        </div>
        <div class="container px-5 my-3 text-center">
          <img
            src="@/assets/img/nfc.png"
            style="width: 80%; margin-top: -60px;"
          />
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
    setTimeout(() => this.skipPayment(this.session.amount), 6000);
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
              title: "Erreur de connexion au terminal",
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
