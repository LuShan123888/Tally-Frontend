<template>
  <v-container class="pa-0" fluid>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="2" no-gutters><span :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'总览'"/></v-col>
      <v-col cols="10">
        <v-row justify="space-around" no-gutters>
          <v-hover v-slot="{ hover }">
            <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing rounded"
                    style="width: 250px">
              <v-row align="center" class="pa-4" no-gutters>
                <v-col cols="3">
                  <v-icon color="primary" size="50">mdi-account-group</v-icon>
                </v-col>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="userMonitorData.day"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'今日新增用户'"/>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
          <v-hover v-slot="{ hover }">
            <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing rounded"
                    style="width: 250px">
              <v-row align="center" class="pa-4" no-gutters>
                <v-col cols="3">
                  <v-icon color="primary" size="50">mdi-login</v-icon>
                </v-col>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="userAccessMonitorData.day"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'今日新增访问'"/>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
          <v-hover v-slot="{ hover }">
            <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing rounded"
                    style="width: 250px">
              <v-row align="center" class="pa-4" no-gutters>
                <v-col cols="3">
                  <v-icon color="primary" size="50">mdi-notebook-edit</v-icon>
                </v-col>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="billMonitorData.day"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'今日新增账单'"/>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-12 mt-10" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing">
            <v-card-title>
              <v-row align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'用户统计'"/>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="userMonitorData.total"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'总用户数'"/>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row v-if="userMonitorData.week.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0"
                     justify="center" no-gutters>
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!userMonitorData.week.loading" :chartData="userMonitorData.week.chartData"
                          :options="userMonitorData.week.options" style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 mt-10" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing">
            <v-card-title>
              <v-row align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'访问统计'"/>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="userAccessMonitorData.total"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'总访问数'"/>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row v-if="userAccessMonitorData.week.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center" no-gutters>
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!userAccessMonitorData.week.loading" :chartData="userAccessMonitorData.week.chartData"
                          :options="userAccessMonitorData.week.options" style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 mt-10" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing">
            <v-card-title>
              <v-row align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'账单统计'"/>
                <v-col class="d-flex flex-column align-end">
                  <div :style="{ color: lightPrimary}" class="text-h3" v-text="billMonitorData.total"/>
                  <div class="text-subtitle-1 font-weight-bold grey--text text--darken-1" v-text="'总账单数'"/>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row v-if="billMonitorData.week.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center" no-gutters>
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!billMonitorData.week.loading" :chartData="billMonitorData.week.chartData"
                          :options="billMonitorData.week.options" style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 my-16" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing">
            <v-card-title>
              <v-row align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" v-text="'CPU 使用率'"/>
                <v-col class="d-flex justify-end">
                  <v-progress-circular :rotate="90" :size="80" :value="monitorData.cpu.now" :width="15" color="primary">
                    <span v-text="monitorData.cpu.now+'%'"/></v-progress-circular>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="px-4 pa-0 ma-0">
              <v-row align="center" no-gutters>
                <v-icon>mdi-cpu-64-bit</v-icon>
                <span class="font-weight-bold" v-text="'CPU 核心数'"/><span :style="{color:lightPrimary}"
                                                                         class="ml-3 text-subtitle-1"
                                                                         v-text="instanceAttribute.cpu"/></v-row>
            </v-card-subtitle>
            <v-card-text>
              <v-row v-if="monitorData.cpu.hour.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center">
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!monitorData.cpu.hour.loading" :chartData="monitorData.cpu.hour.chartData"
                          :options="monitorData.cpu.hour.options" style="height: 200px"/>
              <v-row v-if="monitorData.cpu.day.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center">
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!monitorData.cpu.day.loading" :chartData="monitorData.cpu.day.chartData"
                          :options="monitorData.cpu.day.options" style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 my-16" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing">
            <v-card-title>
              <v-row align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" cols="4" v-text="'网络流量'"/>
                <v-col>
                  <v-row align="center" justify="end" no-gutters><span :style="{color:lightError}" class="text-h5 "
                                                                       v-text="monitorData.internet.now.TX"/><span
                      class="text-subtitle-1 mx-3">&nbsp;MBits</span>
                    <v-icon>mdi-upload-network</v-icon>
                  </v-row>
                  <v-row align="center" justify="end" no-gutters><span :style="{color:lightPrimary}" class="text-h5 "
                                                                       v-text="monitorData.internet.now.RX"/><span
                      class="text-subtitle-1 mx-3">&nbsp;MBits</span>
                    <v-icon>mdi-download-network</v-icon>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="px-4 pa-0 ma-0">
              <v-row align="center" no-gutters>
                <v-icon>mdi-ip</v-icon>
                <span class="font-weight-bold" v-text="'公网地址'"/><span :style="{color:lightPrimary}"
                                                                      class="ml-3 text-subtitle-1"
                                                                      v-text="instanceAttribute.ipAddress"/></v-row>
            </v-card-subtitle>
            <v-card-text>
              <v-row v-if="monitorData.internet.hour.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center">
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!monitorData.internet.hour.loading" :chartData="monitorData.internet.hour.chartData"
                          :options="monitorData.internet.hour.options" style="height: 200px"/>
              <v-row v-if="monitorData.internet.day.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center">
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!monitorData.internet.day.loading" :chartData="monitorData.internet.day.chartData"
                          :options="monitorData.internet.day.options" style="height: 200px"/>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="px-12 my-16" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card :class="{'elevation-24':hover,'elevation-0':!hover}" class="transition-swing">
            <v-card-title>
              <v-row align="center" no-gutters>
                <v-col class="text-h5 font-weight-medium" cols="4" v-text="'云盘带宽'"/>
                <v-col>
                  <v-row align="center" justify="end" no-gutters><span :style="{color:lightError}" class="text-h5 mr-3"
                                                                       v-text="monitorData.BPS.now.Read"/><span
                      class="text-subtitle-1 mr-3">&nbsp;KByte/s</span>
                    <v-icon>mdi-cloud-upload</v-icon>
                  </v-row>
                  <v-row align="center" justify="end" no-gutters><span :style="{color:lightPrimary}"
                                                                       class="text-h5 mr-3"
                                                                       v-text="monitorData.BPS.now.Write"/><span
                      class="text-subtitle-1 mr-3">&nbsp;KByte/s</span>
                    <v-icon>mdi-cloud-download</v-icon>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="ma-0 px-4 pa-0"/>
            <v-card-text>
              <v-row v-if="monitorData.BPS.hour.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center">
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!monitorData.BPS.hour.loading" :chartData="monitorData.BPS.hour.chartData"
                          :options="monitorData.BPS.hour.options" style="height: 200px"/>
              <v-row v-if="monitorData.BPS.day.loading" :style="{height:'200px'}" align="center"
                     class="fill-height ma-0" justify="center">
                <v-progress-circular color="primary" indeterminate width="2"/>
              </v-row>
              <line-chart v-if="!monitorData.BPS.day.loading" :chartData="monitorData.BPS.day.chartData"
                          :options="monitorData.BPS.day.options" style="height: 200px"/>
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
                    stepSize: 200
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
      userMonitorData: {
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
      userAccessMonitorData: {
        total: 0,
        day: 0,
        week: {
          loading: true,
          chartData: {
            labels: [],
            datasets: [
              {
                label: '访问用户',
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
              text: '访问用户'
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
      billMonitorData: {
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
      timer: null
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
    getUserMonitorData() {
      this.axios.get("/user/getUserMonitorData")
          .then((response) => {
            let responseData = response.data.data;
            this.userMonitorData.total = responseData.total;
            this.userMonitorData.day = responseData.day;
            this.userMonitorData.week.chartData.labels = responseData.datetime;
            this.userMonitorData.week.chartData.datasets[0].data = responseData.week;
            this.userMonitorData.week.loading = false;
          });
    },
    getBillMonitorData() {
      this.axios.get("/bill/getBillMonitorData")
          .then((response) => {
            let responseData = response.data.data;
            this.billMonitorData.total = responseData.total;
            this.billMonitorData.day = responseData.day;
            this.billMonitorData.week.chartData.labels = responseData.datetime;
            this.billMonitorData.week.chartData.datasets[0].data = responseData.week;
            this.billMonitorData.week.loading = false;
          });
    },
    getUserAccessMonitorData() {
      this.axios.get("/userRecord/getUserAccessMonitorData")
          .then((response) => {
            let responseData = response.data.data;
            this.userAccessMonitorData.total = responseData.total;
            this.userAccessMonitorData.day = responseData.day;
            this.userAccessMonitorData.week.chartData.labels = responseData.datetime;
            this.userAccessMonitorData.week.chartData.datasets[0].data = responseData.week;
            this.userAccessMonitorData.week.loading = false;
          });
    }
  },
  mounted() {
    this.getUserMonitorData();
    this.getBillMonitorData();
    this.getUserAccessMonitorData();
    this.getInstanceAttribute();
    this.getInstanceMonitorDataNow();
    this.getInstanceMonitorDataHour();
    this.getInstanceMonitorDataDay();
    this.timer = setInterval(() => {
      this.getInstanceMonitorDataNow();
      this.getInstanceMonitorDataHour();
      this.getInstanceMonitorDataDay();
    }, 5000);
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer);
    });
  },
};
</script>

<style lang="scss">
</style>