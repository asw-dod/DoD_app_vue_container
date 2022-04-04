<template>
  <ion-page>
    <ion-toolbar>
      <ion-title>ASW D.O.D Dap announcement</ion-title>
    </ion-toolbar>
    <ion-content fullscreen="true">
      <!--body-->
      <ion-row class="row1">
        <ion-grid>
          <ion-col>
            <ion-slides>
              <ion-slide>
                <ion-col>
                  <h1 class="food_title">정보관 식단공지</h1>
                  <ion-card class="food_table">
                    <ion-card-header class="food_title">
                      <ion-card-title>정보공학관 코너1:</ion-card-title>
                      <ion-card-title>{{ this.inforamtion["cor1"]}}</ion-card-title>
                    </ion-card-header>
                    <ion-card-header class="food_title">
                      <ion-card-title>정보공학관 코너3:</ion-card-title>
                      <ion-card-title>{{ this.inforamtion["cor3"]}}</ion-card-title>
                    </ion-card-header>
                  </ion-card>
                </ion-col>
              </ion-slide>
              <ion-slide>
                <ion-col>
                  <h1 class="food_title">수덕전 식단공지</h1>
                  <ion-card class="food_table">
                    <ion-card-header class="food_title">
                      <ion-card-title>수덕전 코너1</ion-card-title>
                      <ion-card-title>정식</ion-card-title>
                    </ion-card-header>
                    <ion-card-header class="food_title">
                      <ion-card-title>수덕전 코너2</ion-card-title>
                      <ion-card-title>{{ this.suduck["cor2"]}}</ion-card-title>
                    </ion-card-header>
                    <ion-card-header class="food_title">
                      <ion-card-title>수덕전 코너3</ion-card-title>
                      <ion-card-title>{{ this.suduck["cor3"]}}</ion-card-title>
                    </ion-card-header>
                  </ion-card>
                </ion-col>
              </ion-slide>
            </ion-slides>
          </ion-col>
          <!--학사공지-->
          <ion-col>
            <h1 class="note_title">학사공지</h1>
            <!--for 문으로 리스트 데이터를 가지고 온다.-->
            <ion-card class="table_main" :style="{ overflow: 'scroll' }">
              <ion-card-header v-for="item in Bachelor" :key="item">
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
  IonRow,
  IonCol,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSlide,
  IonSlides
} from "@ionic/vue";
import {
  cog,
  settings,
  contrast,
  refresh,
  checkbox,
  information,
} from "ionicons/icons";
import axios from "axios";
import dayjs from "dayjs";

export default defineComponent({
  name: "Tab1Page",
  components: {
    IonPage,
    IonRow,
    IonCol,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonSlide,
    IonSlides,
  },
  setup() {
    return {
      //아이콘
      cog,
      settings,
      contrast,
      refresh,
      checkbox,
      information,
    };
  },
  data() {
    return {
      scholarship: [],
      Bachelor: [],
      dormitory: [],
      inforamtion: [],
      suduck: [],
    };
  },
  async mounted() {
    //처음부터 파싱을 함;
    let response = "";
    response = await axios.get(
      "https://api.github.com/repos/asw-dod/dap-macro/issues"
    );
    if (response.data[0].title.indexOf("DAP") != -1) {
      const json = JSON.parse(response.data[0].body);
      this.Bachelor = json["학사공지"].notice;
    } else {
      console.log(response.data[1].body);
      const json = JSON.parse(response.data[1].body);
      this.Bachelor = json["학사공지"].notice;
    }

    response = await axios.get(
      "https://raw.githubusercontent.com/asw-dod/Deu_food_api/master/output/api.json"
    );
    async function getfood(typei, data) {
      const time = dayjs().format("YYYY-MM-DD");
      //행복기숙사용
      if (typei == "happy") {
        try {
          for (let index = 0; index < 7; index++) {
            if (data["happy"][index].Date == time) {
              return data["happy"][index];
            }
          }
        } catch (error) {
          return {
            breakfast: "없거나 Api서버 오류 발생",
            lunch: "없거나 Api서버 오류 발생",
            lunch_s: "없거나 Api서버 오류 발생",
            dinner: "없거나 Api서버 오류 발생",
            dinner_s: "없거나 Api서버 오류 발생",
          };
        }
        //효민기숙사용
      } else if (typei == "hyomin") {
        try {
          for (let index = 0; index < 7; index++) {
            if (data["hyomin"][index].Date == time) {
              return data["hyomin"][index];
            }
          }
        } catch (error) {
          return {
            breakfast: "없거나 Api서버 오류 발생",
            lunch: "없거나 Api서버 오류 발생",
            lunch_s: "없거나 Api서버 오류 발생",
            dinner: "없거나 Api서버 오류 발생",
            dinner_s: "없거나 Api서버 오류 발생",
          };
        }
      } else if (typei == "inforamtion") {
        try {
          return {
            cor1: data["inforamtion"]["정보공학관 코너1"][0]["menuName"],
            cor3: data["inforamtion"]["정보공학관 코너3"][0]["menuName"],
          };
        } catch (error) {
          return {
            cor1: "없습",
            cor3: "없습",
          };
        }
      } else if (typei == "suduck") {
        try {
          return {
            cor2: data["suduck"]["수덕전 코너2"][0]["menuName"],
            cor3: data["suduck"]["수덕전 코너3"][0]["menuName"],
          };
        } catch (error) {
          return {
            cor2: "없습",
            cor3: "없습",
          };
        }
      }
    }

    this.inforamtion = await getfood("inforamtion", response.data);
    this.suduck = await getfood("suduck", response.data);
  },
});
</script>
