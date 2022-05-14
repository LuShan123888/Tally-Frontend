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
            <v-btn class="rounded-lg" color="primary" depressed fab x-small @click="changeDate('sub')">
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col class="rounded-lg d-flex justify-center align-center"
                 cols="7">
            <span class="d-flex align-center font-weight-medium">{{ query.displayDateGroupString }}</span>
          </v-col>
          <v-col class="d-flex align-center justify-end" cols="2">
            <v-btn class="rounded-lg" color="primary" depressed fab x-small @click="changeDate('add')">
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-if="loading">
      <v-skeleton-loader
          v-for="(item) in 6"

          :key="'skeleton-loader'+item"
          class="rounded-lg mt-4"
          type="list-item-three-line, image"
      />
    </div>
    <v-card v-if="!loading"
            class="pa-3 mb-4 rounded-lg"
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
    <v-card v-show="!loading" class="pa-3 mb-4 rounded-lg" flat>
      <v-card-title class="pa-0 mb-3 text-subtitle-1 font-weight-medium">
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
    <v-card v-show="!loading" class="pa-3 mb-4 rounded-lg" flat>
      <v-card-title class="pa-0 mb-3 text-subtitle-1 font-weight-medium">
        <v-row justify="space-between" no-gutters>
          <v-col cols="4">{{ charts.pieChart.tabs === 'OUT' ? '支出' : '收入' }}分类详细</v-col>
          <v-col class="d-flex justify-end">
            <v-btn-toggle v-model="charts.pieChart.tabs"
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
          <pie-chart ref="pieChart"
                     :chartData="charts.pieChart.chartData"
                     :options="charts.pieChart.options"
                     style="height: 200px"/>
        </v-col>
      </v-row>
      <v-card
          :style="{backgroundColor: isDark?'#2C2B2E':'#FAFAFB'}"
          class="py-0 rounded-lg mt-4"
          flat fluid>
        <v-container
            v-for="(item, i) in charts.pieChart.tabs==='OUT'?data.billGroupByBillType.expenditure:data.billGroupByBillType.income"
            :key="i" v-ripple
            class="pa-0 px-3"
            cols="12">
          <v-row align="center" no-gutters style="height: 60px"
                 @click="loadBillTypePage(item)">
            <v-col cols="1">
              <v-btn :color="charts.pieChart.tabs==='OUT'?'error':charts.pieChart.tabs==='IN'?'primary':''" depressed
                     class="rounded-lg" fab
                     x-small>
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-btn>
            </v-col>
            <v-col class="pl-3">
              <div>
                <span class="text-body-1">{{ item.billTypeName }}</span>
                <span class="ml-3 text-body-2">{{ numFormat(item.percentage) }}%</span>
              </div>
              <v-progress-linear :color="charts.pieChart.tabs==='OUT'?'error':charts.pieChart.tabs==='IN'?'primary':''"
                                 :value="item.percentage"
                                 rounded/>
            </v-col>
            <v-col class="d-flex flex-column align-end justify-center" cols="3">
              <div class="text-subtitle-2" v-text="'¥'+numFormat(item.sum)"/>
              <div class="text-body-2" v-text="item.count + '笔'"/>
            </v-col>
            <v-col class="d-flex justify-end" cols="1">
              <v-icon>mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
          <v-divider
              v-if="i!==((charts.pieChart.tabs==='OUT'?data.billGroupByBillType.expenditure:data.billGroupByBillType.income).length-1)"/>
        </v-container>
      </v-card>
    </v-card>
    <v-dialog
        v-model="billTypePage.isShow"
        eager
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition">
      <v-card :style="{backgroundColor: isDark?'#000000':'#F1F2F6'}">
        <v-toolbar
            class="mb-16"
            color="primary"
            dark
            style="border-radius: 0">
          <v-btn
              dark icon
              @click="billTypePage.isShow = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title v-text="billTypePage.title"/>
        </v-toolbar>
        <v-row :style="{ width: isMobile ? '100%' : '50%' }"
               class="mx-auto px-4"
               no-gutters>
          <v-subheader class="px-0 text-subtitle-1 font-weight-medium"
                       v-text="(charts.pieChart.tabs === 'OUT' ? '支出' : '收入')+'分类图'"/>
          <v-card class="pa-4 rounded-lg" flat fluid style="width: 100%">
            <v-row no-gutters>
              <v-col cols="12">
                <pie-chart ref="dialogPieChart"
                           :chartData="billTypePage.pieChart.chartData"
                           :options="billTypePage.pieChart.options"
                           style="height: 200px"/>
              </v-col>
            </v-row>
          </v-card>
          <v-subheader class="px-0 text-subtitle-1 font-weight-medium"
                       v-text="(charts.pieChart.tabs === 'OUT' ? '支出' : '收入')+'分类详细'"/>
          <v-card
              class="py-0 rounded-lg"
              flat
              fluid style="width: 100%">
            <v-container v-for="(item, i) in billTypePage.list" :key="i" v-ripple
                         class="pa-0 px-3"
                         cols="12">
              <v-row align="center" no-gutters
                     style="height: 60px">
                <v-col cols="1">
                  <v-btn :color="charts.pieChart.tabs==='OUT'?'error':charts.pieChart.tabs==='IN'?'primary':''"
                         class="rounded-lg" depressed fab x-small>
                    <v-icon>mdi-{{ item.icon }}</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="pl-3">
                  <div>
                    <span class="text-body-1">{{ item.billTypeName }}</span>
                    <span class="ml-3 text-body-2">{{ numFormat(item.percentage) }}%</span>
                  </div>
                  <v-progress-linear
                      :color="charts.pieChart.tabs==='OUT'?'error':charts.pieChart.tabs==='IN'?'primary':''"
                      :value="item.percentage"
                      rounded/>
                </v-col>
                <v-col class="d-flex flex-column align-end justify-center" cols="3">
                  <div class="text-subtitle-2">
                    ¥{{ numFormat(item.sum) }}
                  </div>
                  <div class="text-body-2">
                    {{ item.count }}笔
                  </div>
                </v-col>
              </v-row>
              <v-divider
                  v-if="i!==(billTypePage.list.length-1)"/>
            </v-container>
          </v-card>
        </v-row>
      </v-card>
    </v-dialog>
    <v-card v-show="!loading" class="pa-3 mb-4 rounded-lg" flat>
      <v-card-title class="pa-0 mb-3 text-subtitle-1 font-weight-medium">
        <v-row justify="space-between" no-gutters>
          <v-col cols="4">净资产趋势图</v-col>
        </v-row>
      </v-card-title>
      <v-row no-gutters>
        <v-col cols="12">
          <line-chart :chartData="charts.lineChart.chartData"
                      :options="charts.lineChart.options"
                      style="height: 200px"/>
        </v-col>
      </v-row>
    </v-card>
    <v-card
        v-if="!loading && data.billGroupByDateList.length>0"
        class="pa-3 rounded-lg"
        flat fluid>
      <v-card-title class="pa-0 mb-3 text-subtitle-1 font-weight-medium"
                    v-text="(tabs === 'MOUTH' ? '月' : '年') +'账单汇总'">
      </v-card-title>
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
            <div v-if="item.expenditure!==0 || item.income!==0">
              <v-col class="text-center py-2 text-subtitle-2" cols="3">{{ item.groupName }}</v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.expenditure) }}</v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.income) }}</v-col>
              <v-col class="text-center py-2 text-subtitle-2" cols="3">¥{{ numFormat(item.amount) }}</v-col>
            </div>
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
import PieChart from '@/components/PieChart';

export default {
  name: "Statistics",
  components: {BackgroundImage, TitleBar, LineChart, BarChart, PieChart},
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
        this.query.dateQueryString = new Date().Format("yyyy-MM");
        this.query.displayDateGroupString = split[0] + ' 年 ' + split[1] + ' 月';
      } else if (newVal === 'YEAR') {
        this.query.dateQueryString = new Date().Format("yyyy");
        this.query.displayDateGroupString = new Date().Format("yyyy") + ' 年';
      }
      this.loadStatData();
    },
    'charts.barChart.tabs': {
      handler() {
        this.renderBarChart();
      }
    },
    'charts.pieChart.tabs': {
      handler() {
        this.renderPieChart();
      }
    },
  },
  data: function () {
    let _this = this;
    return {
      title: '统计',
      tabs: null,
      loading: true,
      query: {
        dateQueryString: null,
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
        billTableByDate: {
          datetimeStringList: [],
          expenditureList: [],
          incomeList: [],
          amountList: []
        },
        billGroupByBillType: {
          expenditure: [{
            billTypeName: null,
            percentage: null,
            sum: null,
            count: null,
            icon: null,
            children: [{
              billTypeName: null,
              percentage: null,
              sum: null,
              count: null,
              icon: null,
            }]
          }],
          income: [{
            billTypeName: null,
            percentage: null,
            sum: null,
            count: null,
            icon: null,
            children: [{
              billTypeName: null,
              percentage: null,
              sum: null,
              count: null,
              icon: null,
            }]
          }],
        },
        netAssetTrendMap: {
          datetimeStringList: [],
          netAssetList: []
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
                backgroundColor: null,
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
                    label += '：¥';
                    label += _this.numFormat(tooltipItem.yLabel);
                  }
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
                },
                ticks: {
                  autoSkip: true,
                },
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
        },
        pieChart: {
          tabs: null,
          chartData: {
            labels: [],
            datasets: [
              {
                label: null,
                data: [],
                backgroundColor: []
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
                    label += '：';
                    label += data.labels[tooltipItem.index];
                    label += ' ¥';
                    label += _this.numFormat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                  }
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
          },
        },
        lineChart: {
          chartData: {
            labels: [],
            datasets: [
              {
                label: '净资产',
                backgroundColor: '#AACFF2',
                borderColor: this.$vuetify.theme.themes.light.primary,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                fill: true,
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
                    label += ' ¥';
                    label += _this.numFormat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                  }
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
                ticks: {},
                gridLines: {
                  display: false
                }
              }]
            }
          },
        }
      },
      billTypePage: {
        isShow: false,
        title: null,
        list: [{
          billTypeName: null,
          percentage: null,
          sum: null,
          count: null,
          icon: null,
        }],
        pieChart: {
          tabs: null,
          chartData: {
            labels: [],
            datasets: [
              {
                label: null,
                data: [],
                backgroundColor: []
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
                    label += '：';
                    label += data.labels[tooltipItem.index];
                    label += ' ¥';
                    label += _this.numFormat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                  }
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
          },
        }
      },
      backgroundImagePath: this.GLOBAL.images.dataReport.toString(),
      colors: this.GLOBAL.colors
    };
  },
  methods: {
    changeDate(type) {
      if (type === 'add') {
        if (this.tabs === 'MOUTH') {
          let split = this.query.dateQueryString.split('-');
          let year = parseInt(split[0]);
          let mouth = parseInt(split[1]) + 1;
          if (mouth > 12) {
            year = parseInt(split[0]) + 1;
            mouth = '1';
          }
          if (mouth < 10) {
            mouth = '0' + mouth.toString();
          }
          this.query.dateQueryString = year.toString() + '-' + mouth.toString();
          this.query.displayDateGroupString = year.toString() + ' 年 ' + mouth.toString() + ' 月';
        } else if (this.tabs === 'YEAR') {
          this.query.dateQueryString = (parseInt(this.query.dateQueryString) + 1).toString();
          this.query.displayDateGroupString = (parseInt(this.query.dateQueryString.substring(0, 4))).toString() + ' 年';
        }
      } else if (type === 'sub') {
        if (this.tabs === 'MOUTH') {
          let split = this.query.dateQueryString.split('-');
          let year = parseInt(split[0]);
          let mouth = parseInt(split[1]) - 1;
          if (mouth < 1) {
            year = parseInt(split[0]) - 1;
            mouth = '12';
          }
          if (mouth < 10) {
            mouth = '0' + mouth.toString();
          }
          this.query.dateQueryString = year.toString() + '-' + mouth.toString();
          this.query.displayDateGroupString = year.toString() + ' 年 ' + mouth.toString() + ' 月';
        } else if (this.tabs === 'YEAR') {
          this.query.dateQueryString = (parseInt(this.query.dateQueryString) - 1).toString();
          this.query.displayDateGroupString = (parseInt(this.query.dateQueryString)).toString() + ' 年';
        }
      }
      this.loadStatData();
    },
    loadStatData() {
      this.loading = true;
      let billType = {
        dateQueryString: this.query.dateQueryString
      };
      this.axios.post("/bill/getBillStatData", billType)
          .then((response) => {
            this.data = response.data.data;
            this.renderBarChart();
            this.renderPieChart();
            this.renderLineChart();
            this.loading = false;
          })
    },
    numFormat(number) {
      if (!number) {
        return '0.00';
      }
      number = number.toFixed(2);
      return number.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ",";
        });
      });
    },
    renderBarChart() {
      if (this.charts.barChart.tabs === 'OUT') {
        this.charts.barChart.chartData.datasets[0].label = '支出金额';
        this.charts.barChart.chartData.datasets[0].data = this.data.billTableByDate.expenditureList;
        this.charts.barChart.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes.light.error;
      } else if (this.charts.barChart.tabs === 'IN') {
        this.charts.barChart.chartData.datasets[0].label = '收入金额';
        this.charts.barChart.chartData.datasets[0].data = this.data.billTableByDate.incomeList;
        this.charts.barChart.chartData.datasets[0].backgroundColor = this.$vuetify.theme.themes.light.primary;
      }
      this.charts.barChart.chartData.labels = this.data.billTableByDate.datetimeStringList;
      this.$refs.barChart.renderChart(this.charts.barChart.chartData, this.charts.barChart.options);
    },
    renderPieChart() {
      this.charts.pieChart.chartData.labels = [];
      this.charts.pieChart.chartData.datasets[0].data = [];
      this.charts.pieChart.chartData.datasets[0].backgroundColor = [];
      if (this.data.billGroupByBillType.expenditure && this.data.billGroupByBillType.income) {
        if (this.charts.pieChart.tabs === 'OUT') {
          for (let i = 0; i < this.data.billGroupByBillType.expenditure.length; i++) {
            this.charts.pieChart.chartData.labels.push(this.data.billGroupByBillType.expenditure[i].billTypeName);
            this.charts.pieChart.chartData.datasets[0].data.push(this.data.billGroupByBillType.expenditure[i].sum);
            this.charts.pieChart.chartData.datasets[0].backgroundColor.push(this.colors[0][i]);
          }
          this.charts.pieChart.chartData.datasets[0].label = '支出类别';
        } else if (this.charts.pieChart.tabs === 'IN') {
          for (let i = 0; i < this.data.billGroupByBillType.income.length; i++) {
            this.charts.pieChart.chartData.labels.push(this.data.billGroupByBillType.income[i].billTypeName);
            this.charts.pieChart.chartData.datasets[0].data.push(this.data.billGroupByBillType.income[i].sum);
            this.charts.pieChart.chartData.datasets[0].backgroundColor.push(this.colors[1][i]);
          }
          this.charts.pieChart.chartData.datasets[0].label = '收入类别';
        }
      }
      this.$refs.pieChart.renderChart(this.charts.pieChart.chartData, this.charts.pieChart.options);
    },
    renderLineChart() {
      this.charts.lineChart.chartData.labels = this.data.netAssetTrendMap.datetimeStringList;
      this.charts.lineChart.chartData.datasets[0].data = this.data.netAssetTrendMap.netAssetList;
    },
    loadBillTypePage(item) {
      this.billTypePage.isShow = true;
      this.billTypePage.title = item.billTypeName;
      this.billTypePage.list = item.children;
      this.billTypePage.pieChart.chartData.labels = [];
      this.billTypePage.pieChart.chartData.datasets[0].data = [];
      this.billTypePage.pieChart.chartData.datasets[0].backgroundColor = [];
      if (this.charts.pieChart.tabs === 'OUT') {
        this.billTypePage.pieChart.chartData.datasets[0].label = '支出类别';
      } else if (this.charts.pieChart.tabs === 'IN') {
        this.billTypePage.pieChart.chartData.datasets[0].label = '收入类别';
      }
      for (let i = 0; i < item.children.length; i++) {
        this.billTypePage.pieChart.chartData.labels.push(item.children[i].billTypeName);
        this.billTypePage.pieChart.chartData.datasets[0].data.push(item.children[i].sum);
        if (this.charts.pieChart.tabs === 'OUT') {
          this.billTypePage.pieChart.chartData.datasets[0].backgroundColor.push(this.colors[0][i]);
        } else if (this.charts.pieChart.tabs === 'IN') {
          this.billTypePage.pieChart.chartData.datasets[0].backgroundColor.push(this.colors[1][i]);
        }
      }
      this.$refs.dialogPieChart.renderChart(this.billTypePage.pieChart.chartData, this.billTypePage.pieChart.options);
    }
  },
  mounted() {
    this.$emit("changeTitle", this.title);
    this.tabs = 'MOUTH';
    this.query.dateQueryString = new Date().Format("yyyy-MM");
    let split = this.query.dateQueryString.split('-');
    this.query.displayDateGroupString = split[0] + ' 年 ' + split[1] + ' 月';
    this.charts.barChart.tabs = 'OUT';
    this.charts.pieChart.tabs = 'OUT';
    this.loadStatData();
  },
};
</script>

<style lang="scss">
</style>