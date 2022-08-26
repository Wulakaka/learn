import Vue from "vue";
import App from "./App.vue";
// import TslTable from "@tslsmart/bigscreen-table";
// import "@tslsmart/bigscreen-table/lib/tsl-table.css";
import ElementUI from "element-ui";
// import "@tslsmart/theme-desktop-purple/src/index.scss";
// import "element-theme-tsl-purple";
Vue.use(ElementUI);
// Vue.use(TslTable);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
