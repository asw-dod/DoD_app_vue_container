<template>
  <ion-page>
    <ion-toolbar>
      <ion-title>ASW D.O.D Dap announcement</ion-title>
    </ion-toolbar>
    <ion-content fullscreen="true">
      <ion-row class="row1">
        <ion-grid>
          <!--학사공지-->
          <ion-col>
            <h1 class="note_title">비교과 프로그램</h1>
            <!--for 문으로 리스트 데이터를 가지고 온다.-->
            <ion-card class="table" :style="{ overflow: 'scroll' }">
              <ion-card-header v-for="item in non_discipline" :key="item">
                <ion-card-title>{{ item.title }}</ion-card-title>
                <ion-card-subtitle>{{ item.date }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col>
            <!--장학공지-->
            <h1 class="note_title">비교과 공지</h1>
            <!--listview-->
            <!--for 문으로 리스트 데이터를 가지고 온다.-->
            <ion-card class="table" :style="{ overflow: 'scroll' }">
              <ion-card-header
                v-for="item in non_discipline_notice"
                :key="item"
              >
                <ion-card-title>{{ item.title }}</ion-card-title>
                <ion-card-subtitle>{{ item.date }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-grid>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { settings, refresh, information, checkbox } from "ionicons/icons";
import axios from "axios";
export default defineComponent({
  name: "Tab2Page",
  components: { IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    return {
      settings,
      refresh,
      information,
      checkbox,
    };
  },
  data() {
    return {
      non_discipline: [],
      non_discipline_notice: [],
    };
  },
  async mounted() {
    //처음부터 파싱을 함
    const response = await axios.get(
      "https://api.github.com/repos/asw-dod/dap-macro/issues"
    );
    if (response.data[0].title.indexOf("DAP") != -1) {
      const json = JSON.parse(response.data[0].body);
      this.non_discipline = json["비교과"].notice;
      this.non_discipline_notice = json["비교과공지"].notice;
    } else {
      console.log(response.data[1].body);
      const json = JSON.parse(response.data[1].body);
      this.non_discipline = json["비교과"].notice;
      this.non_discipline_notice = json["비교과공지"].notice;
    }
  },
});
</script>
