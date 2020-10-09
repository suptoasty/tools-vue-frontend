import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import GoogleAuth from "@/config/google_oauth.js";

const gauthOption = {
  clientId:
    "133839807075-cu5qaq7jn6bn9u23017752n4kmmbk7vu.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GoogleAuth, gauthOption);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
