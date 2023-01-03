import Vue from "vue";
import App from "./App.vue";
// import TslTable from "@tslsmart/bigscreen-table";
// import "@tslsmart/bigscreen-table/lib/tsl-table.css";
import { Button, Select } from "element-ui";
// import "element-theme-tsl-purple";
Vue.use(Button);
Vue.use(Select);
// Vue.use(TslTable);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
