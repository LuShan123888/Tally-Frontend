<template>
  <v-container :class="{'ml-10':!isMobile}" :style="{ width: isMobile ? '100%' : '50%'}" class="px-4" fluid>
    <title-bar :title="title"/>
    <background-image :src="backgroundImagePath"/>
    <v-btn
        color="primary"
        fab
        fixed
        right
        style="bottom: 70px"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-card
        class="90% pa-0 rounded-lg"
        flat fluid
    >
      <v-card-subtitle class="py-2 font-weight-bold">净资产</v-card-subtitle>
      <v-card-title :style="{ color: lightPrimary }" class="py-0 text-h3">¥123312</v-card-title>
      <v-card-subtitle class="py-4">
        <v-row no-gutters>
          <v-col class="font-weight-bold" cols="6">
            <span>总资产：</span>
            <span>¥123312</span>
          </v-col>
          <v-col class="font-weight-bold" cols="6">
            <span>总负债：</span>
            <span>¥123312</span>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-subheader class="px-0 font-weight-bold d-flex justify-space-between"
    >
      <span>资金账户</span>
      <span>余额：¥1231232</span>
    </v-subheader>
    <v-card
        class="90% mb-5 py-0  px-3 rounded-lg"
        flat fluid
    >
      <v-row v-ripple align="center" no-gutters style="height: 60px;cursor: pointer">
        <v-col cols="1">
          <v-icon color="primary">mdi-credit-card-outline</v-icon>
        </v-col>
        <v-col class="ml-2">
          <div class="text-subtitle-1">消费卡</div>
          <div class="text-subtitle-2 text--darken-1 grey--text">储蓄卡</div>
        </v-col>
        <v-col cols="3">
          <div class="text-subtitle-1">¥10000</div>
        </v-col>
        <v-col class="d-flex justify-end" cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
      <v-divider/>
      <v-row v-ripple align="center" no-gutters style="height: 60px;cursor: pointer">
        <v-col cols="1">
          <v-icon color="primary">mdi-credit-card-outline</v-icon>
        </v-col>
        <v-col class="ml-2">
          <div class="text-subtitle-1">消费卡</div>
          <div class="text-subtitle-2 text--darken-1 grey--text">储蓄卡</div>
        </v-col>
        <v-col cols="3">
          <div class="text-subtitle-1">¥10000</div>
        </v-col>
        <v-col class="d-flex justify-end" cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
    </v-card>
    <v-subheader class="px-0 font-weight-bold d-flex justify-space-between"
    >
      <span>资金账户</span>
      <span>余额：¥1231232</span>
    </v-subheader>
    <v-card
        class="90% mb-5 py-0  px-3 rounded-lg"
        flat fluid
    >
      <v-row v-ripple align="center" no-gutters style="height: 60px;cursor: pointer">
        <v-col cols="1">
          <v-icon color="primary">mdi-credit-card-outline</v-icon>
        </v-col>
        <v-col class="ml-2">
          <div class="text-subtitle-1">消费卡</div>
          <div class="text-subtitle-2 text--darken-1 grey--text">储蓄卡</div>
        </v-col>
        <v-col cols="3">
          <div class="text-subtitle-1">¥10000</div>
        </v-col>
        <v-col class="d-flex justify-end" cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
      <v-divider/>
      <v-row v-ripple align="center" no-gutters style="height: 60px;cursor: pointer">
        <v-col cols="1">
          <v-icon color="primary">mdi-credit-card-outline</v-icon>
        </v-col>
        <v-col class="ml-2">
          <div class="text-subtitle-1">消费卡</div>
          <div class="text-subtitle-2 text--darken-1 grey--text">储蓄卡</div>
        </v-col>
        <v-col cols="3">
          <div class="text-subtitle-1">¥10000</div>
        </v-col>
        <v-col class="d-flex justify-end" cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>

<script>
import BackgroundImage from '@/pages/Index/components/BackgroundImage'
import TitleBar from "@/pages/Index/components/TitleBar";

export default {
  name: "Account",
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
  data: function () {
    return {
      title: '账户',
      backgroundImagePath: this.GLOBAL.images.coding,
      valid: false,
      typeList: [
        "餐饮",
        "水果零食",
        "购物",
        "住房",
        "生活服务",
        "通讯",
        "生活日用",
        "人情社交",
        "穿搭美容",
        "医疗保健",
        "休闲娱乐",
        "家居家电",
        "网络虚拟",
        "其他",
      ],
      bill: {
        flow: "out",
        amount: null,
        type: null,
        remark: null,
        note: null,
        billDate: null,
      },
      showDatePicker: false,
      rules: {
        isFloat: this.GLOBAL.rules.isFloat,
      },
      styles: {
        backgroundImg: {
          width: this.$vuetify.breakpoint.mobile ? "60vw" : "20vw",
          bottom: this.$vuetify.breakpoint.mobile ? "20vw" : "3vw",
          right: this.$vuetify.breakpoint.mobile ? "3vw" : "3vw",
        },
      },
      classes: {
        title: {
          "text-h2": !this.$vuetify.breakpoint.mobile,
          "text-h3": this.$vuetify.breakpoint.mobile,
          "ml-3": this.$vuetify.breakpoint.mobile,
          "ml-9": !this.$vuetify.breakpoint.mobile,
          "mt-3": this.$vuetify.breakpoint.mobile,
          "mt-9": !this.$vuetify.breakpoint.mobile,
        },
      },
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        this.axios.post("/bill/saveBill", JSON.stringify(this.bill))
            .then(() => {
              this.$notify({
                title: "提交成功",
                message: null,
                type: "success",
                duration: 2000,
              });
            });
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
  mounted() {
    this.bill.billDate = new Date().Format("yyyy-MM-dd");
  },
};
</script>

<style lang="scss">

</style>