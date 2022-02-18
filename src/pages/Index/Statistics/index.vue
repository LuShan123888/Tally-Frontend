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
            <v-btn :color="isDark?'#1E1E1E':'#FFFFFF'" block class="rounded-lg rounded-r-0" depressed value="MOUTH">
              <span>月</span>
              <v-icon class="ml-2">mdi-weather-night</v-icon>
            </v-btn>
          </v-col>
          <v-col class="pa-0" cols="6">
            <v-btn :color="isDark?'#1E1E1E':'#FFFFFF'" block class="rounded-lg rounded-l-0" depressed value="YEAR">
              <span>年</span>
              <v-icon class="ml-2">mdi-weather-sunny</v-icon>
            </v-btn>
          </v-col>
        </v-btn-toggle>
      </v-col>
      <v-col class="pl-2" cols="6">
        <v-row justify="space-between" no-gutters style="height: 36px">
          <v-col class="d-flex align-center" cols="2">
            <v-btn color="primary" depressed fab x-small @click="changeDate('sub')">
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col :style="{backgroundColor: isDark?'#1E1E1E':'#FFFFFF'}"
                 class="rounded-lg d-flex justify-center align-center"
                 cols="7">
            <span class="d-flex align-center font-weight-medium">{{ query.displayDateGroupString }}</span>
          </v-col>
          <v-col class="d-flex align-center justify-end" cols="2">
            <v-btn color="primary" depressed fab x-small @click="changeDate('add')">
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
      <v-card-title class="pa-0 mb-1 text-subtitle-1 font-weight-medium">收支统计</v-card-title>
      <v-row no-gutters>
        <v-col class="mb-1" cols="6">
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
          <div class="text-subtitle-2 grey--text text--darken-1">{{ tabs === 'MOUTH' ? '日' : '月' }}均支出</div>
          <div class="text-h6 font-weight-regular">¥{{ numFormat(data.billSummaryData.averageExpenditure) }}</div>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-show="!loading" class="pa-4 mb-4" flat>
      <v-card-title class="pa-0 mb-1 text-subtitle-1 font-weight-medium">
        <v-row justify="space-between" no-gutters>
          <v-col cols="4">{{ charts.barChart.tabs === 'OUT' ? '支出' : '收入' }}统计图</v-col>
          <v-col class="d-flex justify-end">
            <v-btn-toggle v-model="charts.barChart.tabs"
                          borderless class="rounded-lg" dense>
              <v-col class="pa-0" cols="6">
                <v-btn block class="rounded-lg rounded-r-0" depressed small value="OUT">
                  <span>支出</span>
                  <v-icon class="ml-2">mdi-bank-transfer-out</v-icon>
                </v-btn>
              </v-col>
              <v-col class="pa-0" cols="6">
                <v-btn block class="rounded-lg rounded-l-0" depressed small value="IN">
                  <span>收入</span>
                  <v-icon class="ml-2">mdi-bank-transfer-in</v-icon>
                </v-btn>
              </v-col>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card-title>
      <v-row no-gutters>
        <v-col cols="12">
          <bar-chart ref="barChart"
                     :chartData="charts.barChart.chartData"
                     :options="charts.barChart.options"
                     style="height: 200px"/>
        </v-col>
      </v-row>
    </v-card>
    <v-card
        v-if="!loading && data.billGroupByDateList.length>0"
        class="pa-4 rounded-lg"
        flat fluid>
      <v-card-title class="pa-0 mb-2 text-subtitle-1 font-weight-medium">账单汇总</v-card-title>
      <v-row :style="{backgroundColor: isDark?'#000000':'#EDEDEF'}" class="rounded-t-lg" no-gutters>
        <v-col class="text-center py-2" cols="3">日期</v-col>
        <v-divider vertical/>
        <v-col class="text-center py-2" cols="3">支出</v-col>
        <v-divider vertical/>
        <v-col class="text-center py-2" cols="3">收入</v-col>
        <v-divider vertical/>
        <v-col class="text-center py-2" cols="3">结余</v-col>
      </v-row>
      <v-row :style="{backgroundColor: isDark?'#2C2B2E':'#FAFAFB'}" no-gutters>
        <v-col cols="12">
          <v-row v-for="(item, i) in data.billGroupByDateList" :key="i" no-gutters>
            <v-col class="text-center py-2 text-subtitle-2" cols="3">{{ numFormat(item.groupName) }}</v-col>
            <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.expenditure) }}</v-col>
            <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.income) }}</v-col>
            <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.amount) }}</v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col class="text-center py-2 text-subtitle-2" cols="3">{{ tabs === 'MOUTH' ? '日' : '月' }}均</v-col>
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
    </v-card>
    <v-container class="py-16"/>
  </v-container>
</template>

<script>
import BackgroundImage from '@/pages/Index/components/BackgroundImage'
import TitleBar from "@/pages/Index/components/TitleBar";
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';

export default {
  name: "Statistics",
  components: {BackgroundImage, TitleBar, LineChart, BarChart},
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
      if (newVal === 'MOUTH') {
        let split = new Date().Format("yyyy-MM").split('-');
        this.query.dateGroupString = new Date().Format("yyyy-MM");
        this.query.displayDateGroupString = split[0] + ' 年 ' + split[1] + ' 月';
      } else if (newVal === 'YEAR') {
        this.query.dateGroupString = new Date().Format("yyyy");
        this.query.displayDateGroupString = new Date().Format("yyyy") + ' 年';
      }
      this.loadStatData();
    },
    'charts.barChart.tabs': {
      handler() {
        this.renderBarChart();
      }
    },
  },
  data: function () {
    return {
      title: '统计',
      tabs: null,
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
        }],
        billStatTable: {
          datetimeStringList: [],
          expenditureList: [],
          incomeList: [],
          amountList: []
        }
      },
      charts: {
        barChart: {
          tabs: null,
          chartData: {
            labels: [],
            datasets: [
              {
                label: null,
                backgroundColor: this.$vuetify.theme.themes.light.error,
                fill: false,
                data: [],
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: false,
            },
            tooltips: {
              mode: 'nearest',
              intersect: false,
              callbacks: {
                label: function (tooltipItem, data) {
                  let label = data.datasets[tooltipItem.datasetIndex].label || '';
                  if (label) {
                    label += ': ¥';
                  }
                  label += tooltipItem.yLabel;
                  return label;
                }
              }
            },
            hover: {
              mode: 'nearest',
              intersect: false
            },
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  min: 0,
                },
                gridLines: {
                  display: false
                }
              }]
            }
          },
        }
      },
      backgroundImagePath: this.GLOBAL.images.dataReport,
    };
  },
  methods: {
    changeDate(type) {
      if (type === 'add') {
        if (this.tabs === 'MOUTH') {
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
        } else if (this.tabs === 'YEAR') {
          this.query.dateGroupString = (parseInt(this.query.dateGroupString) + 1).toString();
          this.query.displayDateGroupString = (parseInt(this.query.dateGroupString.substring(0, 4))).toString() + ' 年';
        }
      } else if (type === 'sub') {
        if (this.tabs === 'MOUTH') {
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
        } else if (this.tabs === 'YEAR') {
          this.query.dateGroupString = (parseInt(this.query.dateGroupString) - 1).toString();
          this.query.displayDateGroupString = (parseInt(this.query.dateGroupString)).toString() + ' 年';
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
            this.renderBarChart();
            this.loading = false;
          })
    },
    numFormat(number) {
      return number.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ",";
        });
      });
    },
    renderBarChart() {
      if (this.charts.barChart.tabs === 'OUT') {
        this.charts.barChart.chartData.labels = this.data.billStatTable.datetimeStringList;
        this.charts.barChart.chartData.datasets[0].label = '支出金额';
        this.charts.barChart.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes.light.error;
        this.charts.barChart.chartData.datasets[0].data = this.data.billStatTable.expenditureList;
        this.$refs.barChart.renderChart(this.charts.barChart.chartData, this.charts.barChart.options);
      } else if (this.charts.barChart.tabs === 'IN') {
        this.charts.barChart.chartData.labels = this.data.billStatTable.datetimeStringList;
        this.charts.barChart.chartData.datasets[0].label = '收入金额';
        this.charts.barChart.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes.light.primary;
        this.charts.barChart.chartData.datasets[0].data = this.data.billStatTable.incomeList;
        this.$refs.barChart.renderChart(this.charts.barChart.chartData, this.charts.barChart.options);
      }
    }
  },
  mounted() {
    this.$emit("changeTitle", this.title);
    this.tabs = 'MOUTH';
    let split = new Date().Format("yyyy-MM").split('-');
    this.query.displayDateGroupString = split[0] + ' 年 ' + split[1] + ' 月';
    this.query.dateGroupString = new Date().Format("yyyy-MM");
    this.charts.barChart.tabs = 'OUT';
    this.loadStatData();
  },
};
</script>

<style lang="scss">
</style>