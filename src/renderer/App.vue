<template>
  <div id="app">
    <div class="container">
      <div id="notification" class="alert alert-warning mx-auto d-none my-3">
        <div class="d-flex align-items-center justify-content-between">
          <span id="message">Une nouvelle version est disponible !</span>
          <button
            class="btn btn-primary d-none"
            id="restart-app"
            @click.prevent="restartApp"
          >
            Appuyer sur
            <span class="g-btn"
              ><font-awesome-icon class="small" icon="play"
            /></span>
            pour redémarrer
          </button>
        </div>
      </div>
    </div>
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
      <router-view />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  name: "App",
  data: function() {
    return {
      gamepads: []
    };
  },
  created: function() {
    window.addEventListener("gamepadconnected", this.gamepadConnectionHandler);
    window.addEventListener(
      "gamepaddisconnected",
      this.gamepadDisconnectionHandler
    );
  },
  computed: {
    start() {
      return this.$store.state.gamepad.Start;
    }
  },
  watch: {
    start: function(val) {
      if (val) {
        this.restartApp();
      }
    },
    right: function(val) {
      console.log(val);
    }
  },
  mounted: function() {
    const version = document.getElementById("version");

    ipcRenderer.send("app_version");
    ipcRenderer.on("app_version", (event, arg) => {
      ipcRenderer.removeAllListeners("app_version");
      //version.innerText = "Version " + arg.version;
    });

    const notification = document.getElementById("notification");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart-app");

    ipcRenderer.on("update_available", () => {
      ipcRenderer.removeAllListeners("update_available");
      message.innerText = "A new update is available. Downloading now...";
      notification.classList.remove("d-none");
    });
    ipcRenderer.on("update_downloaded", () => {
      ipcRenderer.removeAllListeners("update_downloaded");
      message.innerText =
        "Update Downloaded. It will be installed on restart. Restart now?";
      restartButton.classList.remove("d-none");
      notification.classList.remove("d-none");
    });
  },
  methods: {
    restartApp: function() {
      ipcRenderer.send("restart_app");
    },
    gamepadConnectionHandler: function(event) {
      this.gamepads.push(event.gamepad);
      console.log("Gamepad Connected: " + event.gamepad.id);
      this.cycle();
    },
    gamepadDisconnectionHandler: function(event) {
      this.gamepads.splice(this.gamepads.indexOf(event.gamepad), 1);
      console.log("Gamepad Disconnected: " + event.gamepad.id);
      cancelAnimationFrame();
    },
    scanGamepads: function() {
      return navigator.getGamepads
        ? Array.from(navigator.getGamepads()).filter(gp => gp !== null)
        : navigator.webkitGetGamepads
        ? Array.from(navigator.webkitGetGamepads()).filter(gp => gp !== null)
        : [];
    },
    buttonPressed: function(btn) {
      if (typeof btn === "object") {
        return btn.pressed;
      }
      return btn == 1.0;
    },
    cycle: function() {
      this.gamepads = this.scanGamepads();

      var gp = this.gamepads[0];
      if (this.$store.state.gamepad.listening) {
        if (this.buttonPressed(gp.buttons[1])) {
          this.$store.commit("toggleA", true);
        } else {
          this.$store.commit("toggleA", false);
        }
        if (this.buttonPressed(gp.buttons[0])) {
          this.$store.commit("toggleB", true);
        } else {
          this.$store.commit("toggleB", false);
        }
        if (this.buttonPressed(gp.buttons[2])) {
          this.$store.commit("toggleX", true);
        } else {
          this.$store.commit("toggleX", false);
        }
        if (this.buttonPressed(gp.buttons[3])) {
          this.$store.commit("toggleY", true);
        } else {
          this.$store.commit("toggleY", false);
        }
        if (this.buttonPressed(gp.buttons[8])) {
          this.$store.commit("toggleStart", true);
        } else {
          this.$store.commit("toggleStart", false);
        }
        if (gp.axes[0] > 0.7) {
          this.$store.commit("toggleRight", true);
        } else {
          this.$store.commit("toggleRight", false);
        }
        if (gp.axes[0] < -0.7) {
          this.$store.commit("toggleLeft", true);
        } else {
          this.$store.commit("toggleLeft", false);
        }
        if (gp.axes[1] < -0.7) {
          this.$store.commit("toggleTop", true);
        } else {
          this.$store.commit("toggleTop", false);
        }
        if (gp.axes[1] > 0.7) {
          this.$store.commit("toggleBottom", true);
        } else {
          this.$store.commit("toggleBottom", false);
        }
      }
      requestAnimationFrame(this.cycle);
    }
  }
};
</script>

<style>
@import "./assets/css/all.min.css";

.card.card-rounded {
  border-radius: 20px !important;
  border: none !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13);
}

html,
body,
#app {
  height: 100%;
}
</style>
