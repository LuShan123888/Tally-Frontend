<template>
  <v-container :class="{'ml-10':!isMobile}" :style="{ width: isMobile ? '100%' : '50%'}" class="py-0 px-4" fluid>
    <title-bar :title="title"/>
    <background-image :src="backgroundImagePath"/>
    <v-row align="center" class="mb-4" no-gutters>
      <v-col class="pr-2" cols="6">
        <v-btn-toggle v-model="tabs"
                      borderless class="rounded-lg" dense
                      style="width: 100%">
          <v-col class="pa-0" cols="6">
            <v-btn :color="isDark?'#1E1E1E':'#FFFFFF'" block class="rounded-lg rounded-r-0" depressed value="mouth">
              <span>月</span>
              <v-icon class="ml-2">mdi-weather-night</v-icon>
            </v-btn>
          </v-col>
          <v-col class="pa-0" cols="6">
            <v-btn :color="isDark?'#1E1E1E':'#FFFFFF'" block class="rounded-lg rounded-l-0" depressed value="year">
              <span>年</span>
              <v-icon class="ml-2">mdi-weather-sunny</v-icon>
            </v-btn>
          </v-col>
        </v-btn-toggle>
      </v-col>
      <v-col class="pl-2 d-flex justify-space-between" cols="6">
        <v-btn color="primary" depressed fab x-small @click="changeDate('sub')">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <span class="d-flex align-center">{{ query.displayDateGroupString }}</span>
        <v-btn color="primary" depressed fab x-small @click="changeDate('add')">
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-skeleton-loader
        v-for="(item) in 6"
        v-if="loading"
        :key="'skeleton-loader'+item"
        class="rounded-lg mt-4"
        type="table-heading, list-item-three-line"
    />
    <v-card v-if="!loading"
            class="pa-4 mb-4 rounded-lg"
            flat fluid>
      <v-card-title class="pa-0 text-subtitle-1 font-weight-medium">收支统计</v-card-title>
      <v-row no-gutters>
        <v-col class="my-1" cols="6">
          <div class="text-subtitle-2 grey--text text--darken-1">支出</div>
          <div class="text-h6 font-weight-regular">¥{{ numFormat(data.billSummaryData.expenditure) }}</div>
        </v-col>
        <v-col class="my-1" cols="6">
          <div class="text-subtitle-2 grey--text text--darken-1">收入</div>
          <div class="text-h6 font-weight-regular">¥{{ numFormat(data.billSummaryData.income) }}</div>
        </v-col>
        <v-col cols="6">
          <div class="text-subtitle-2 grey--text text--darken-1">结余</div>
          <div class="text-h6 font-weight-regular">¥{{ numFormat(data.billSummaryData.amount) }}</div>
        </v-col>
        <v-col cols="6">
          <div class="text-subtitle-2 grey--text text--darken-1">{{ tabs === 'mouth' ? '日' : '月' }}均支出</div>
          <div class="text-h6 font-weight-regular">¥{{ numFormat(data.billSummaryData.averageExpenditure) }}</div>
        </v-col>
      </v-row>
    </v-card>
    <v-card
        v-if="!loading && data.billGroupByDateList.length>0"
        class="pa-4 rounded-lg"
        flat fluid>
      <v-card-title class="pa-0 mb-2 text-subtitle-1 font-weight-medium">账单汇总</v-card-title>
      <v-row :style="{backgroundColor: isDark?'#2C2B2E':'#FAFAFB'}" class="rounded-lg" no-gutters>
        <v-row :style="{backgroundColor: isDark?'#000000':'#EDEDEF'}" class="rounded-t-lg" no-gutters>
          <v-col class="text-center py-2" cols="3">日期</v-col>
          <v-divider vertical/>
          <v-col class="text-center py-2" cols="3">支出</v-col>
          <v-divider vertical/>
          <v-col class="text-center py-2" cols="3">收入</v-col>
          <v-divider vertical/>
          <v-col class="text-center py-2" cols="3">结余</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-row v-for="(item, i) in data.billGroupByDateList" :key="i"
                   no-gutters>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">{{ numFormat(item.groupName) }}</v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.expenditure) }}</v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.income) }}</v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.amount) }}</v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">{{ tabs === 'mouth' ? '日' : '月' }}均</v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">
                ¥{{ numFormat(data.billSummaryData.averageExpenditure) }}
              </v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{
                  numFormat(data.billSummaryData.averageIncome)
                }}
              </v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{
                  numFormat(data.billSummaryData.averageAmount)
                }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
    </v-card>
    <v-container class="py-16"/>
  </v-container>
</template>

<script>
import BackgroundImage from '@/pages/Index/components/BackgroundImage'
import TitleBar from "@/pages/Index/components/TitleBar";

export default {
  name: "Statistics",
  components: {BackgroundImage, TitleBar},
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.mobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
    lightPrimary: function () {
      return this.$vuetify.theme.themes.light.primary;
    }
  },
  watch: {
    tabs(newVal) {
      if (newVal === 'mouth') {
        let split = new Date().Format("yyyy-MM").split('-');
        this.query.dateGroupString = new Date().Format("yyyy-MM");
        this.query.displayDateGroupString = split[0] + ' 年 ' + split[1] + ' 月';
      } else if (newVal === 'year') {
        this.query.dateGroupString = new Date().Format("yyyy");
        this.query.displayDateGroupString = new Date().Format("yyyy") + ' 年';
      }
      this.loadStatData();
    }
  },
  data: function () {
    return {
      title: '统计',
      tabs: 'mouth',
      loading: true,
      query: {
        dateGroupString: null,
        displayDateGroupString: null,
      },
      data: {
        billSummaryData: {
          averageExpenditure: null,
          averageIncome: null,
          averageAmount: null,
        },
        billGroupByDateList: [{
          groupName: null,
          expenditure: null,
          income: null,
          amount: null,
        }]
      },
      backgroundImagePath: this.GLOBAL.images.dataReport,
    };
  },
  methods: {
    changeDate(type) {
      if (type === 'add') {
        if (this.tabs === 'mouth') {
          let split = this.query.dateGroupString.split('-');
          let year = parseInt(split[0]);
          let mouth = parseInt(split[1]) + 1;
          if (mouth > 12) {
            year = parseInt(split[0]) + 1;
            mouth = '1';
          }
          if (mouth < 10) {
            mouth = '0' + mouth.toString();
          }
          this.query.dateGroupString = year.toString() + '-' + mouth.toString();
          this.query.displayDateGroupString = year.toString() + ' 年 ' + mouth.toString() + ' 月';
        } else if (this.tabs === 'year') {
          this.query.dateGroupString = (parseInt(this.query.dateGroupString) + 1).toString();
          this.query.displayDateGroupString = (parseInt(this.query.dateGroupString.substring(0, 4))).toString() + ' 年';
        }
      } else if (type === 'sub') {
        if (this.tabs === 'mouth') {
          let split = this.query.dateGroupString.split('-');
          let year = parseInt(split[0]);
          let mouth = parseInt(split[1]) - 1;
          if (mouth < 1) {
            year = parseInt(split[0]) - 1;
            mouth = '12';
          }
          if (mouth < 10) {
            mouth = '0' + mouth.toString();
          }
          this.query.dateGroupString = year.toString() + '-' + mouth.toString();
          this.query.displayDateGroupString = year.toString() + ' 年 ' + mouth.toString() + ' 月';
        } else if (this.tabs === 'year') {
          this.query.dateGroupString = (parseInt(this.query.dateGroupString) - 1).toString();
          this.query.displayDateGroupString = (parseInt(this.query.dateGroupString.substring(0, 4))).toString() + ' 年';
        }
      }
      this.loadStatData();
    },
    loadStatData() {
      this.loading = true;
      let billType = {
        dateGroupString: this.query.dateGroupString
      };
      this.axios.post("/bill/getBillStatData", JSON.stringify(billType))
          .then((response) => {
            this.data = response.data.data;
            this.loading = false;
          })
    },
    numFormat(number) {
      return number.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ",";
        });
      });
    }
  },
  mounted() {
    this.$emit("changeTitle", this.title);
    let split = new Date().Format("yyyy-MM").split('-');
    this.query.displayDateGroupString = split[0] + ' 年 ' + split[1] + ' 月';
    this.query.dateGroupString = new Date().Format("yyyy-MM");
    this.loadStatData();
  },
};
</script>

<style lang="scss">
</style>