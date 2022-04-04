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
            <h1 class="note_title">기숙사 공지(효민기숙사만)</h1>
            <!--for 문으로 리스트 데이터를 가지고 온다.-->
            <ion-card class="table1" :style="{ overflow: 'scroll' }">
              <ion-card-header v-for="item in job_announcement" :key="item">
                <ion-card-title>{{ item.title }}</ion-card-title>
                <ion-card-subtitle>{{ item.date }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-slides :style="{'height':'40vh'}">
              <ion-slide>
                <ion-col>
                  <h1 class="food_title">행복기숙사 식단공지</h1>
                  <ion-card class="table2_food">
                    <ion-card-header class="food_title">
                      <ion-card-title>아침</ion-card-title>
                      <ion-card-title>{{happy["breakfast"]}}</ion-card-title>
                    </ion-card-header>
                    <ion-card-header class="food_title">
                      <ion-card-title>점심:</ion-card-title>
                      <ion-card-title>{{happy["lunch"]}}</ion-card-title>                      
                      <ion-card-title>점심특:</ion-card-title>
                      <ion-card-title>{{happy["lunch_s"]}}</ion-card-title>                      
                    </ion-card-header>
                    <ion-card-header class="food_title">
                      <ion-card-title>저녁</ion-card-title>
                       <ion-card-title>{{happy["dinner"]}}</ion-card-title>                                   
                      <ion-card-title>저녁특:</ion-card-title>
                     <ion-card-title>{{happy["dinner_s"]}}</ion-card-title>                                          
                    </ion-card-header>
                  </ion-card>
                </ion-col>
              </ion-slide>
              <ion-slide>
                <ion-col>
                  <h1 class="food_title">효민기숙사 식단공지</h1>
                  <ion-card class="table2_food">
                    <ion-card-header class="food_title">
                      <ion-card-title>아침</ion-card-title>
                    <ion-card-title>{{hyomin["breakfast"]}}</ion-card-title>                       
                      
                    </ion-card-header>
                    <ion-card-header class="food_title">
                      <ion-card-title>점심</ion-card-title>
                    <ion-card-title>{{hyomin["lunch"]}}</ion-card-title>                       

                    </ion-card-header>
                    <ion-card-header class="food_title">
                    <ion-card-title>저녁</ion-card-title>
                    <ion-card-title>{{hyomin["dinner"]}}</ion-card-title>                       
                    </ion-card-header>
                  </ion-card>
                </ion-col>
              </ion-slide>
            </ion-slides>
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
import dayjs from "dayjs"
export default defineComponent({
  name: "Tab3Page",
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
      job_announcement: [],
      hyomin: "",
      happy: "",
    };
  },
  async mounted() {
    let response = ""
    async function getfood(typei, data) {
      const time = dayjs().format("YYYY-MM-DD");
      //행복기숙사용
      if (typei == "happy") {
        try {
          for (let index = 0; index < 6; index++) {
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
          for (let index = 0; index < 5; index++) {
            console.log(data["hyomin"][index]);
              if (data["hyomin"][index].Date == time) {
                return data["hyomin"][index];
              }
          }
        } catch (error){
          return {
            breakfast: "없거나 Api서버 오류 발생",
            lunch: "없거나 Api서버 오류 발생",
            lunch_s: "없거나 Api서버 오류 발생",
            dinner: "없거나 Api서버 오류 발생",
            dinner_s: "없거나 Api서버 오류 발생",
          };
        }
      }
    }

    response = await axios(
      "https://raw.githubusercontent.com/asw-dod/Deu_food_api/master/output/api.json"
    );

    this.happy = await getfood("happy", response.data);
    this.hyomin = await getfood("hyomin", response.data);
    console.log(this.hyomin);
    //처음부터 파싱을 함
    response = await axios.get(
      "https://api.github.com/repos/asw-dod/dap-macro/issues"
    );
    if (response.data[0].title.indexOf("DAP") != -1) {
      const json = JSON.parse(response.data[0].body);
      this.job_announcement = json["기숙사공지"].notice;
    } else {
      const json = JSON.parse(response.data[1].body);
      this.job_announcement = json["기숙사공지"].notice;
    }
  },
});
</script>
