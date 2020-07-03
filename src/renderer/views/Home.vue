<template>
  <div class="w-100 h-100 bg-gradient"  style="overflow :hidden;"> <!-- overflow for transition -->
    <Error
      class="w-100 h-100 position-absolute"
      style="z-index: 999;"
      :visible="errors.visible"
      :title="errors.title"
      :errors="errors.errors"
      @lastView="lastView"
    ></Error>

    <transition name="step-tr">
      <stepping :n_step="viewIndex" v-if="viewIndex >=0 && viewIndex<5"/>
    </transition>


    <vue-element-loading :active="loading" is-full-screen />
    <div class="w-100 h-100" v-if="!loading">
      <transition name="mytr" mode="out-in">
        <!-- SCREENSAVER -->
        <Welcom
          @error="handleError"
          @nextView="nextView"
          v-if="viewIndex == -1"
        ></Welcom>

        <!-- FIRST VIEW -->
        <Start
          :games="games"
          :session="session"
          @saveGame="saveGame"
          @error="handleError"
          @nextView="nextView"
          v-if="viewIndex == 0"
        ></Start>

        <!-- SECOND VIEW -->
        <CampaignChoice
          :campaigns="campaigns"
          :session="session"
          @startSession="startSession"
          @saveCampaign="saveCampaign"
          @error="handleError"
          @nextView="nextView"
          @lastView="lastView"
          v-if="viewIndex == 1"
        ></CampaignChoice>

        <!-- THIRD VIEW -->
        <AmountChoice
          :session="session"
          @saveAmount="saveAmount"
          @error="handleError"
          @nextView="nextView"
          @lastView="lastView"
          v-if="viewIndex == 2"
        ></AmountChoice>

        <!-- 4TH VIEW -->
        <Payment
          :session="session"
          @savePayment="savePayment"
          @error="handleError"
          @nextView="nextView"
          @lastView="lastView"
          v-if="viewIndex == 3"
        ></Payment>

        <!-- 4TH VIEW -->
        <!-- <CampaignDetail
          :session="session"
          @error="handleError"
          @nextView="nextView"
          @lastView="lastView"
          v-if="viewIndex == 4"
        ></CampaignDetail> -->
        
        <didactitiel
          @nextView="nextView"
          v-if="viewIndex == 4"
        ></didactitiel>

        <!-- 5TH VIEW -->
        <Play
          :session="session"
          @error="handleError"
          @nextView="nextView"
          @lastView="lastView"
          v-if="viewIndex == 5"
        ></Play>

        <ticketProposition
          @error="handleError"
          @requestTicket="ticket_request"
          @nextView="nextView"
          @lastView="lastView"
          v-if="viewIndex == 6"
        ></ticketProposition>

        <!-- 6TH VIEW -->
        <End
          :session="session"
          @error="handleError"
          @home="nextView"
          @lastView="lastView"
          @replay="replay"
          @moreInfo="moreInfo"
          @ticket_request="ticket_request"
          v-if="viewIndex == 7"
        ></End>

        <requestTicket
          :session="session"
          @error="handleError"
          @lastView="view6"
          @nextView="lastView"
          v-if="viewIndex == 8"
        ></requestTicket>
      </transition>
    </div>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import Error from "@/components/Interface/Error.vue";
import Stepping from "@/components/stepping.vue";
import Welcom from "@/components/Interface/Welcom.vue";
import Start from "@/components/Interface/Start.vue";
import CampaignChoice from "@/components/Interface/CampaignChoice.vue";
import AmountChoice from "@/components/Interface/AmountChoice.vue";
import Payment from "@/components/Interface/Payment.vue";
import didactitiel from '@/components/Interface/didactitiel.vue';
import CampaignDetail from "@/components/Interface/CampaignDetail.vue";
import Play from "@/components/Interface/Play.vue";
import ticketProposition from '@/components/Interface/ticketProposition.vue'
import End from "@/components/Interface/End.vue";
import requestTicket from "@/components/Interface/requestTicket.vue";

export default {
  name: "Home",
  components: {
    VueElementLoading,
    Error,
    Stepping,
    Welcom,
    Start,
    CampaignChoice,
    AmountChoice,
    Payment,
    didactitiel,
    CampaignDetail,
    Play,
    ticketProposition,
    End,
    requestTicket,
  },
  data: function() {
    return {
      loading: false,
      errors: {
        visible: false,
        title: "",
        errors: {},
      },
      viewIndex: -1, // Starting index 
      maxViewIndex: 7,
      isAdmin: this.$store.getters.isAdmin,
      isLoggedIn: this.$store.getters.isLoggedIn,
      session: {
        terminal: {},
        campaign: {},
        game: {},
        donator: {},
        amount: null,
        start_global: null,
        end_global: null,
        start_time: null,
        end_time: null,
        position_asso: null,
        position_game: null,
        position_amount: null,
      },
      campaigns: {},
      games: {},
    };
  },
  mounted: function() {
    this.session = {
      terminal: {},
      campaign: {},
      game: {},
      donator: {},
      amount: null,
      start_global: null,
      end_global: null,
      start_time: null,
      end_time: null,
      position_asso: null,
      position_game: null,
      position_amount: null,
    };
    this.loading = true;
    // First checking if logged in
    if (!this.isLoggedIn) {
      this.$router.push("/login");
    }

    // Start timer for return to home 
    var timeoutHandle = window.setTimeout(() => this.goBackHome(), 10000);

    // Loading all the data from API
    this.loading = true;
    this.$store.commit("startListening");
    this.$http
      .get("terminal/mine/")
      .then((resp) => {
        this.terminal = resp.data.terminal;
        this.campaigns = resp.data.campaigns;
        this.games = resp.data.games;

        // Random appearance of games and campaigns
        this.shuffleArray(this.campaigns);
        this.shuffleArray(this.games);

        // Switching on the terminal
        this.$http.get("terminal/mine/on/");

        // Stop the loading spinner
        this.loading = false;
      })
      .catch((err) => {
        this.errors = {
          visible: true,
          title: "Erreur de chargement",
          errors: err.response.data,
        };
        this.loading = false;
      });
  },
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    }
  },
  watch : {
    a: function(val) {
        if (val) {
            this.resetTimer();
        }
    }
  },
  methods: {
    // CHOICE METHODS
    saveGame: function(payload) {
      this.session.game = payload.game;
      this.session.position_game = payload.indexOf;
    },
    saveCampaign: function(payload) {
      this.session.campaign = payload.campaign;
      this.session.position_asso = payload.indexOf;
    },
    saveAmount: function(payload) {
      this.session.amount = payload.amount;
      this.session.position_amount = payload.indexOf;
    },
    savePayment: function(payload) {
      // Saving the payment right away, avoiding to loose sensitive data
      this.loading = true;
      this.$http
        .post("payment/", payload.payment)
        .then((resp) => {
          if (resp.status == "201") {
            this.loading = false;
            this.nextView();
          }
        })
        .catch((err) => {
          this.loading = false;
          this.errors = {
            visible: true,
            title: "Erreur d'enregistrement",
            errors: err.response.data,
          };
        });
    },

    // SESSION SPECIFIC METHODS
    startSession: function() {
      this.loading = true;
      // Creating a new donator for the session
      this.$http
        .post("donator/", {})
        .then((resp) => {
          this.session.terminal = this.terminal; // Binding the terminal to the session
          this.session.start_global = new Date(); // Starting global timer for session
          this.session.donator = resp.data; // Binding the donator to the session
          this.loading = false;
        })
        .catch((err) => {
          this.errors = {
            visible: true,
            title: "Erreur de session",
            errors: err.response.data,
          };
          this.loading = false;
        });
    },
    startGameSession: function() {
      this.session.start_time = new Date(); // Starting gaming timer for session
      this.$http
        .get("terminal/mine/play/")
        .then()
        .catch((err) => {
          this.errors = {
            visible: true,
            title: "Erreur de status de jeu",
            errors: err.response.data,
          };
        }); // Activating Playing status on backend
    },
    endGameSession: function() {
      this.session.end_time = new Date(); // Ending gaming timer for session
      this.$http.get("terminal/mine/gameover/").catch((err) => {
        this.errors = {
          visible: true,
          title: "Impossible d'éteindre la borne",
          errors: err.response.data,
        };
      });
    },
    endSession: function() {
      this.session.end_global = new Date(); // Ending global timer for session
      this.session.terminal = this.session.terminal.id;
      this.session.donator = this.session.donator.id;
      this.session.campaign = this.session.campaign.id;
      this.session.game = this.session.game.id;

      this.$http.post("session/", this.session).catch((err) => {
        this.errors = {
          visible: true,
          title: "Erreur de sauvegarde de session",
          errors: err.response.data,
        };
      });
    },

    // ERROR SPECIFIC METHODS
    handleError: function(payload) {
      this.errors = payload;
    },

    // ALL GENERAL METHODS
    nextView: function() {
      if (this.viewIndex < this.maxViewIndex) {
        this.viewIndex += 1;
      } else {
        this.viewIndex = 0;
      }
    },
    lastView: function() {
      if (this.viewIndex > 0) {
        this.viewIndex -= 1;
      }
      this.errors = {
        visible: false,
        title: "",
        errors: [],
      };
    },
    goBackHome() {
        if(this.viewIndex == 5) { // in Game
            clearTimeout(10000);
        } else {
          console.log("timourend 10sec");
        }
    },
    resetTimer(){
      console.log("reset");
      window.clearTimeout(timeoutHandle);
      timeoutHandle = window.setTimeout(() => this.goBackHome(), 10000);

    },
    replay: function() {
      this.startSession();
      this.viewIndex = 2; // 2 if you want to replay from amount choice
    },
    moreInfo: function() {
      // add view for only that? ? 
    },
    view6() {
      this.viewIndex = 6;
    },
    ticket_request: function() {
      this.viewIndex = 8;
    },
    shuffleArray: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
  },
};
</script>
