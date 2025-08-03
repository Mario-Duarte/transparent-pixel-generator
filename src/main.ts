import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoCopy, CoCheck } from "oh-vue-icons/icons";

const app = createApp(App);
app.component("v-icon", OhVueIcon);
addIcons(CoCopy, CoCheck);
app.mount("#app");
