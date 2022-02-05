<template>
  <v-container fluid>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="2" no-gutters>
        <div :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'总览'"/>
      </v-col>
      <v-col cols="10">
        <v-row justify="center" no-gutters>
          <v-col cols="2">
            <v-hover v-slot="{ hover }">
              <v-row :class="{'elevation-24':hover,'elevation-4':!hover}" :style="{height:'100px'}" no-gutters
                     align="center" class="transition-swing rounded">
                <v-col cols="5">
                  <v-icon class="ml-5" size="50">mdi-account-group</v-icon>
                </v-col>
                <v-col class="d-flex flex-column align-end pr-4" cols="7">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="userStatData.day"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'今日新增用户'"/>
                </v-col>
              </v-row>
            </v-hover>
          </v-col>
          <v-col class="mx-16" cols="2">
            <v-hover v-slot="{ hover }">
              <v-row :class="{'elevation-24':hover,'elevation-4':!hover}" :style="{height:'100px'}" no-gutters
                     align="center" class="transition-swing rounded">
                <v-col cols="5">
                  <v-icon class="ml-5" size="50">mdi-login</v-icon>
                </v-col>
                <v-col class="d-flex flex-column align-end pr-4" cols="7">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="signInRecordStatData.day"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'今日登录用户'"/>
                </v-col>
              </v-row>
            </v-hover>
          </v-col>
          <v-col class="mr-16" cols="2">
            <v-hover v-slot="{ hover }">
              <v-row :class="{'elevation-24':hover,'elevation-4':!hover}" :style="{height:'100px'}" no-gutters
                     align="center" class="transition-swing rounded">
                <v-col cols="5">
                  <v-icon class="ml-5" size="50">mdi-notebook-edit</v-icon>
                </v-col>
                <v-col class="d-flex flex-column align-end pr-4" cols="7">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="billStatData.day"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'今日新增账单'"/>
                </v-col>
              </v-row>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-12 mt-10" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card
              :class="{'elevation-24':hover,'elevation-4':!hover}"
              class="transition-swing">
            <v-card-title>
              <v-row :style="{height: '100px'}" align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'用户统计'"/>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="userStatData.total"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'总用户数'"/>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row
                  v-if="userStatData.week.loading"
                  :style="{height:'200px'}"
                  align="center"
                  no-gutters
                  class="fill-height ma-0"
                  justify="center"
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!userStatData.week.loading" :chartData="userStatData.week.chartData"
                          :options="userStatData.week.options"
                          style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 mt-10" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card
              :class="{'elevation-24':hover,'elevation-4':!hover}"
              class="transition-swing">
            <v-card-title>
              <v-row :style="{height: '100px'}" align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'登录统计'"/>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="signInRecordStatData.total"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'总登录数'"/>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row
                  v-if="signInRecordStatData.week.loading"
                  :style="{height:'200px'}"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
                  no-gutters
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!signInRecordStatData.week.loading" :chartData="signInRecordStatData.week.chartData"
                          :options="signInRecordStatData.week.options"
                          style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 mt-10" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card
              :class="{'elevation-24':hover,'elevation-4':!hover}"
              class="transition-swing">
            <v-card-title>
              <v-row :style="{height: '100px'}" align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'账单统计'"/>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="billStatData.total"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'总账单数'"/>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row
                  v-if="billStatData.week.loading"
                  :style="{height:'200px'}"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
                  no-gutters
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!billStatData.week.loading" :chartData="billStatData.week.chartData"
                          :options="billStatData.week.options"
                          style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 my-16" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card
              :class="{'elevation-24':hover,'elevation-4':!hover}"
              class="transition-swing">
            <v-card-title>
              <v-row :style="{height: '100px'}" align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'CPU 使用率'"/>
                <v-col class="d-flex justify-end">
                  <v-progress-circular
                      :rotate="90"
                      :size="100"
                      :value="monitorData.cpu.now"
                      :width="15"
                      color="primary"
                  >
                    <span v-text="monitorData.cpu.now+'%'"/>
                  </v-progress-circular>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle :style="{height:'32px'}" class="py-0">
              <v-row align="center" no-gutters>
                <v-icon>mdi-cpu-64-bit</v-icon>
                <span class="font-weight-bold" v-text="'CPU 核心数：'"/>
                <span :style="{color:lightPrimary}" class="text-subtitle-1" v-text="instanceAttribute.cpu"/>
              </v-row>
            </v-card-subtitle>
            <v-card-text>
              <v-row
                  :style="{height:'200px'}"
                  v-if="monitorData.cpu.hour.loading"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!monitorData.cpu.hour.loading" :chartData="monitorData.cpu.hour.chartData"
                          :options="monitorData.cpu.hour.options"
                          style="height: 200px"/>
              <v-row
                  :style="{height:'200px'}"
                  v-if="monitorData.cpu.day.loading"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!monitorData.cpu.day.loading" :chartData="monitorData.cpu.day.chartData"
                          :options="monitorData.cpu.day.options"
                          style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 my-16" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card
              :class="{'elevation-24':hover,'elevation-4':!hover}"
              class="transition-swing">
            <v-card-title>
              <v-row :style="{height: '100px'}" align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'网络流量'"/>
                <v-col cols="4">
                  <v-row no-gutters>
                    <v-col class="d-flex justify-center align-center" cols="2">
                      <v-icon>mdi-upload-network</v-icon>
                    </v-col>
                    <v-col class="d-flex justify-end align-end" cols="10">
                      <span :style="{color:lightError}" class="text-h5 mx-3" v-text="monitorData.internet.now.TX"/>
                      <span class="text-subtitle-1">&nbsp;MBits</span>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="d-flex justify-center align-center" cols="2">
                      <v-icon>mdi-download-network</v-icon>
                    </v-col>
                    <v-col class="d-flex justify-end align-end" cols="10">
                      <span :style="{color:lightPrimary}" class="text-h5 mx-3" v-text="monitorData.internet.now.RX"/>
                      <span class="text-subtitle-1">&nbsp;MBits</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle :style="{height:'32px'}" class="py-0">
              <v-row align="center" no-gutters>
                <v-icon>mdi-ip</v-icon>
                <span class="font-weight-bold" v-text="'公网地址：'"/>
                <span :style="{color:lightPrimary}" class="text-subtitle-1" v-text="instanceAttribute.ipAddress"/>
              </v-row>
            </v-card-subtitle>
            <v-card-text>
              <v-row
                  v-if="monitorData.internet.hour.loading"
                  :style="{height:'200px'}"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!monitorData.internet.hour.loading" :chartData="monitorData.internet.hour.chartData"
                          :options="monitorData.internet.hour.options"
                          style="height: 200px"/>
              <v-row
                  v-if="monitorData.internet.day.loading"
                  :style="{height:'200px'}"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!monitorData.internet.day.loading" :chartData="monitorData.internet.day.chartData"
                          :options="monitorData.internet.day.options"
                          style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 my-16" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card
              :class="{'elevation-24':hover,'elevation-4':!hover}"
              class="transition-swing">
            <v-card-title>
              <v-row :style="{height: '100px'}" align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'云盘带宽'"/>
                <v-col cols="4">
                  <v-row no-gutters>
                    <v-col class="d-flex justify-center align-center" cols="2">
                      <v-icon>mdi-cloud-upload</v-icon>
                    </v-col>
                    <v-col class="d-flex justify-end align-end" cols="10">
                      <span :style="{color:lightError}" class="text-h5 mx-3" v-text="monitorData.BPS.now.Read"/>
                      <span class="text-subtitle-1">&nbsp;KByte/s</span>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="d-flex justify-center align-center" cols="2">
                      <v-icon>mdi-cloud-download</v-icon>
                    </v-col>
                    <v-col class="d-flex justify-end align-end" cols="10">
                      <span :style="{color:lightPrimary}" class="text-h5 mx-3" v-text="monitorData.BPS.now.Write"/>
                      <span class="text-subtitle-1">&nbsp;KByte/s</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle :style="{height:'32px'}"/>
            <v-card-text>
              <v-row
                  :style="{height:'200px'}"
                  v-if="monitorData.BPS.hour.loading"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!monitorData.BPS.hour.loading" :chartData="monitorData.BPS.hour.chartData"
                          :options="monitorData.BPS.hour.options"
                          style="height: 200px"/>
              <v-row
                  :style="{height:'200px'}"
                  v-if="monitorData.BPS.day.loading"
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
              >
                <v-progress-circular
                    color="primary"
                    indeterminate
                    width="2"
                />
              </v-row>
              <line-chart v-if="!monitorData.BPS.day.loading" :chartData="monitorData.BPS.day.chartData"
                          :options="monitorData.BPS.day.options"
                          style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from '@/components/LineChart';

export default {
  name: "AdminHome",
  components: {
    LineChart
  },
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.mobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
    lightPrimary: function () {
      return this.$vuetify.theme.themes.light.primary;
    },
    lightError: function () {
      return this.$vuetify.theme.themes.light.error;
    }
  },
  data: function () {
    return {
      monitorData: {
        cpu: {
          now: 0,
          hour: {
            loading: true,
            chartData: {
              labels: [],
              datasets: [
                {
                  label: 'CPU 使用率',
                  backgroundColor: this.$vuetify.theme.themes.light.primary,
                  fill: false,
                  data: [],
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'CPU 使用率（一小时）'
              },
              tooltips: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += tooltipItem.yLabel + ' %';
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
                    max: 100,
                    stepSize: 100
                  },
                  gridLines: {
                    display: false
                  }
                }]
              }
            },
          },
          day: {
            loading: true,
            chartData: {
              labels: [],
              datasets: [
                {
                  label: 'CPU使用率',
                  backgroundColor: this.$vuetify.theme.themes.light.primary,
                  fill: false,
                  data: [],
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'CPU使用率（一天）'
              },
              tooltips: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += tooltipItem.yLabel + ' %';
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
                    max: 100,
                    stepSize: 100
                  },
                  gridLines: {
                    display: false
                  }
                }]
              }
            },
          }
        },
        internet: {
          now: {
            RX: 0,
            TX: 0
          },
          hour: {
            loading: true,
            chartData: {
              labels: [],
              datasets: [
                {
                  label: '上传流量',
                  backgroundColor: this.$vuetify.theme.themes.light.error,
                  fill: false,
                  data: [],
                },
                {
                  label: '下载流量',
                  backgroundColor: this.$vuetify.theme.themes.light.primary,
                  fill: false,
                  data: [],
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: '网络流量（一小时）'
              },
              tooltips: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += tooltipItem.yLabel + ' MBits';
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
                    stepSize: 10
                  },
                  gridLines: {
                    display: false
                  }
                }]
              }
            },
          },
          day: {
            loading: true,
            chartData: {
              labels: [],
              datasets: [
                {
                  label: '上传流量',
                  backgroundColor: this.$vuetify.theme.themes.light.error,
                  fill: false,
                  data: [],
                },
                {
                  label: '下载流量',
                  backgroundColor: this.$vuetify.theme.themes.light.primary,
                  fill: false,
                  data: [],
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: '网络流量（一天）'
              },
              tooltips: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += tooltipItem.yLabel + ' MBits';
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
                    stepSize: 20
                  },
                  gridLines: {
                    display: false
                  }
                }]
              }
            },
          }
        },
        BPS: {
          now: {
            Read: 0,
            Write: 0
          },
          hour: {
            loading: true,
            chartData: {
              labels: [],
              datasets: [
                {
                  label: '读取带宽',
                  backgroundColor: this.$vuetify.theme.themes.light.error,
                  fill: false,
                  data: [],
                },
                {
                  label: '写入带宽',
                  backgroundColor: this.$vuetify.theme.themes.light.primary,
                  fill: false,
                  data: [],
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: '云盘带宽（一小时）'
              },
              tooltips: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += tooltipItem.yLabel + ' KByte/s';
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
                    stepSize: 100,
                  },
                  gridLines: {
                    display: false
                  },
                }]
              }
            },
          },
          day: {
            loading: true,
            chartData: {
              labels: [],
              datasets: [
                {
                  label: '读取带宽',
                  backgroundColor: this.$vuetify.theme.themes.light.error,
                  fill: false,
                  data: [],
                },
                {
                  label: '写入带宽',
                  backgroundColor: this.$vuetify.theme.themes.light.primary,
                  fill: false,
                  data: [],
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: '云盘带宽（一天）'
              },
              tooltips: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += tooltipItem.yLabel + ' KByte/s';
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
                    stepSize: 100
                  },
                  gridLines: {
                    display: false
                  }
                }]
              }
            },
          }
        },
      },
      instanceAttribute: {
        cpu: 0,
        ipAddress: '0.0.0.0'
      },
      userStatData: {
        total: 0,
        day: 0,
        week: {
          loading: true,
          chartData: {
            labels: [],
            datasets: [
              {
                label: '新增用户',
                backgroundColor: this.$vuetify.theme.themes.light.primary,
                fill: false,
                data: [],
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: '新增用户'
            },
            tooltips: {
              mode: 'nearest',
              intersect: false,
              callbacks: {
                label: function (tooltipItem, data) {
                  let label = data.datasets[tooltipItem.datasetIndex].label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += tooltipItem.yLabel + ' 人';
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
                  stepSize: 10
                },
                gridLines: {
                  display: false
                }
              }]
            }
          },
        },
      },
      signInRecordStatData: {
        total: 0,
        day: 0,
        week: {
          loading: true,
          chartData: {
            labels: [],
            datasets: [
              {
                label: '登录用户',
                backgroundColor: this.$vuetify.theme.themes.light.primary,
                fill: false,
                data: [],
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: '登录用户'
            },
            tooltips: {
              mode: 'nearest',
              intersect: false,
              callbacks: {
                label: function (tooltipItem, data) {
                  let label = data.datasets[tooltipItem.datasetIndex].label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += tooltipItem.yLabel + ' 人';
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
                  stepSize: 10
                },
                gridLines: {
                  display: false
                }
              }]
            }
          },
        },
      },
      billStatData: {
        total: 0,
        day: 0,
        week: {
          loading: true,
          chartData: {
            labels: [],
            datasets: [
              {
                label: '新增账单',
                backgroundColor: this.$vuetify.theme.themes.light.primary,
                fill: false,
                data: [],
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: '新增账单'
            },
            tooltips: {
              mode: 'nearest',
              intersect: false,
              callbacks: {
                label: function (tooltipItem, data) {
                  let label = data.datasets[tooltipItem.datasetIndex].label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += tooltipItem.yLabel + ' 笔';
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
                  stepSize: 10
                },
                gridLines: {
                  display: false
                }
              }]
            }
          },
        },
      },
    };
  },
  methods: {
    getInstanceAttribute() {
      this.axios.get("/monitor/getInstanceAttribute")
          .then((response) => {
            this.instanceAttribute = response.data.data;
          });
    },
    getInstanceMonitorDataNow() {
      this.axios.get("/monitor/getInstanceMonitorDataNow")
          .then((response) => {
            let responseData = response.data.data;
            this.monitorData.cpu.now = responseData.cpu;
            this.monitorData.internet.now.RX = responseData.internetRX;
            this.monitorData.internet.now.TX = responseData.internetTX;
            this.monitorData.BPS.now.Read = responseData.BPSRead;
            this.monitorData.BPS.now.Write = responseData.BPSWrite;
          });
    },
    getInstanceMonitorDataHour() {
      this.axios.get("/monitor/getInstanceMonitorDataHour")
          .then((response) => {
            let responseData = response.data.data;

            this.monitorData.cpu.hour.chartData.labels = responseData.datetime;
            this.monitorData.cpu.hour.chartData.datasets[0].data = responseData.cpu;
            this.monitorData.cpu.hour.loading = false;

            this.monitorData.internet.hour.chartData.labels = responseData.datetime;
            this.monitorData.internet.hour.chartData.datasets[0].data = responseData.internetRX;
            this.monitorData.internet.hour.chartData.datasets[1].data = responseData.internetTX;
            this.monitorData.internet.hour.loading = false;

            this.monitorData.BPS.hour.chartData.labels = responseData.datetime;
            this.monitorData.BPS.hour.chartData.datasets[0].data = responseData.BPSRead;
            this.monitorData.BPS.hour.chartData.datasets[1].data = responseData.BPSWrite;
            this.monitorData.BPS.hour.loading = false;
          });
    },
    getInstanceMonitorDataDay() {
      this.axios.get("/monitor/getInstanceMonitorDataDay")
          .then((response) => {
            let responseData = response.data.data;
            for (let i = 0, len = responseData.datetime.length; i < len; i++) {
              if (i % 2 === 0) {
                this.monitorData.cpu.day.chartData.datasets[0].data.push(responseData.cpu[i]);
                this.monitorData.cpu.day.chartData.labels.push(responseData.datetime[i]);

                this.monitorData.internet.day.chartData.labels.push(responseData.datetime[i]);
                this.monitorData.internet.day.chartData.datasets[0].data.push(responseData.internetRX[i]);
                this.monitorData.internet.day.chartData.datasets[1].data.push(responseData.internetTX[i]);

                this.monitorData.BPS.day.chartData.labels.push(responseData.datetime[i]);
                this.monitorData.BPS.day.chartData.datasets[0].data.push(responseData.BPSRead[i]);
                this.monitorData.BPS.day.chartData.datasets[1].data.push(responseData.BPSWrite[i]);
              }
            }
            this.monitorData.cpu.day.loading = false;
            this.monitorData.internet.day.loading = false;
            this.monitorData.BPS.day.loading = false;
          });
    },
    getUserStatData() {
      this.axios.get("/user/getUserStatData")
          .then((response) => {
            let responseData = response.data.data;
            this.userStatData.total = responseData.total;
            this.userStatData.day = responseData.day;
            this.userStatData.week.chartData.labels = responseData.datetime;
            this.userStatData.week.chartData.datasets[0].data = responseData.week;
            this.userStatData.week.loading = false;
          });
    },
    getBillStatData() {
      this.axios.get("/bill/getBillStatData")
          .then((response) => {
            let responseData = response.data.data;
            this.billStatData.total = responseData.total;
            this.billStatData.day = responseData.day;
            this.billStatData.week.chartData.labels = responseData.datetime;
            this.billStatData.week.chartData.datasets[0].data = responseData.week;
            this.billStatData.week.loading = false;
          });
    },
    getSignInRecordStatData() {
      this.axios.get("/user/getSignInRecordStatData")
          .then((response) => {
            let responseData = response.data.data;
            this.signInRecordStatData.total = responseData.total;
            this.signInRecordStatData.day = responseData.day;
            this.signInRecordStatData.week.chartData.labels = responseData.datetime;
            this.signInRecordStatData.week.chartData.datasets[0].data = responseData.week;
            this.signInRecordStatData.week.loading = false;
          });
    }
  },
  mounted() {
    this.getInstanceAttribute();
    this.getInstanceMonitorDataNow();
    this.getInstanceMonitorDataHour();
    this.getInstanceMonitorDataDay();
    this.getUserStatData();
    this.getBillStatData();
    this.getSignInRecordStatData();
  },
};
</script>

<style lang="scss">
</style>