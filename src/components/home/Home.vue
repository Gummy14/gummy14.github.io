<template>
  <div>
    <v-app-bar density="prominent" fixed>
      <v-app-bar-title class="ma-0 pa-0">
        <v-container fluid>
          <v-row>
            <v-col>
              Every Day In US History
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p class="text-subtitle-1">{{ currentMonthYear }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RecycleScroller
        v-if="historyData.length"
        ref="recycleScroll"
        :items="historyData"
        :item-size="50"
        key-field="Id"
        class="scroller"
        v-slot="{ item }"
        @scroll="render()"
      >
        <v-container fluid :class="{ 'month': item.DayNumber == 1}">
          <v-row>
            <v-col>
              {{ item.DayNumber }} - {{ item.Description }}
            </v-col>
          </v-row>
        </v-container>
        <div hidden class="day-event">{{ item.MonthName }} {{ item.Year }}</div>
      </RecycleScroller>
    </v-main>
    <v-bottom-navigation
      v-if="currentPresident != null"
      height="165" 
      style="position: fixed;"
    >
      <v-container fluid>
        <v-row>
          <v-col>
            <v-timeline 
              side="end"
              truncate-line="both"
              size="large"
              direction="horizontal"
            >
              <v-timeline-item 
                dot-color="blue"
                icon="mdi-bank-outline"
              >
                <template v-slot:opposite>
                  <span>Senate</span>
                </template>
                <div>Democratic</div>
              </v-timeline-item>
              <v-timeline-item 
                dot-color="red"
              >
                <template v-slot:icon>
                  <v-avatar :image="currentPresident.Image"></v-avatar>
                </template>
                <template v-slot:opposite>
                  <span>President</span>
                </template>
                <div>{{ currentPresident.Name }}</div>
              </v-timeline-item>
              <v-timeline-item 
                dot-color="blue"
                icon="mdi-bank-outline"
              >
                <template v-slot:opposite>
                  <span>House</span>
                </template>
                <div>Democratic</div>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-container>
    </v-bottom-navigation>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RecycleScroller } from 'vue3-virtual-scroller'

var recycleScroll = ref(null)
var currentPresident = ref(null)
var currentMonthYear = ref("January 1700")
const historyData = ref([])

function render(item) {
  var positionArray = []
  Array.from(recycleScroll.value.$_views).forEach(element => {
    positionArray.push(element[1])
  });
  var sortedArray = positionArray.sort((a, b) => a.position - b.position)
  currentMonthYear.value = sortedArray[6].item.MonthName + " " + sortedArray[6].item.Year
  console.log(sortedArray[6].item.President)
  currentPresident.value = sortedArray[6].item.President
}

onMounted(async () => {
  const res = await fetch('../../../years/WriteLines.json')
  const data = await res.json()

  historyData.value = data
});
</script>

<style scoped>
.scroller {
  height: 70vh;
}

.month {
  border-top: 2px solid white;
}
</style>
  