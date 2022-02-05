import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import it from "vuetify/src/locale/it";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { it },
    current: "it",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: "#00bcd4",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        accent2: "#FF4F8B",
        error: "#b71c1c",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50",
        other: "#373737",
      }
    },
    dark: true,
  }
});
