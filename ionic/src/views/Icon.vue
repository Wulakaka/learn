<template>
<ion-page>
  <ion-content>
    <ion-icon :icon="heart"></ion-icon>
    <ion-icon :ios="logoApple" :md="logoAndroid"></ion-icon>
  </ion-content>
</ion-page>
</template>

<script>
import {heart,logoApple, logoAndroid} from 'ionicons/icons'
import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue'
import {defineComponent} from "vue"
export default defineComponent({
  name: "Icon",
  components: {
    IonContent,
    IonPage,
    IonIcon
  },
  setup() {
    return {
      heart,
      logoApple,
      logoAndroid
    }
  }
})
</script>

<style scoped>

</style>
