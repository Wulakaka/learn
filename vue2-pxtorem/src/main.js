import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
function Foo(a) {
  this.a = a;
}
Foo.prototype.bar = function () {
  console.log(this.a);
};

function Sub() {}
Sub.prototype = new Foo(4);
const obj = new Sub();
obj.bar();
console.log(Foo === Foo.prototype.constructor);
