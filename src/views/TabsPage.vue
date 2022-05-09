<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="albums" />
          <ion-label>비교과</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="food_modal" tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="clipboard" />
          <ion-label>기숙사</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<script >
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { home, albums, clipboard, globe , pizza} from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      home,
      albums,
      clipboard,
      globe,
      pizza
    };
  },
  methods: {
    async food_modal() {

    }
  },
});
</script>
