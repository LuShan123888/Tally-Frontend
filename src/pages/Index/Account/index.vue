<template>
  <v-container class="pa-0" fluid>
    <title-bar :title="title"/>
    <background-image :src="backgroundImagePath"/>
    <v-hover v-slot="{ hover }">
      <v-card
          class="mt-9 transition-swing"
          :class="{'mx-auto':isMobile,'ml-9':!isMobile,'elevation-24':hover,'elevation-0':!hover}"
          :style="{ width: isMobile ? '90%' : '50%' }"
      >
        234
      </v-card>
    </v-hover>
    <v-form ref="form" v-model="valid">
      <v-container class="pa-0" fluid>
        <v-row class="mt-6" justify="center" no-gutters>
          <v-col cols="12">
            <v-row justify="space-around" no-gutters>
              <v-col cols="5">
                <v-text-field
                    v-model="bill.amount"
                    :rules="[(value) => !!value || '请输入金额', rules.isFloat]"
                    clearable
                    label="金额"
                    prefix="¥"
                />
              </v-col>
              <v-col cols="5">
                <v-combobox
                    v-model="bill.type"
                    :items="typeList"
                    :rules="[(value) => !!value || '请选择类型']"
                    clearable
                    label="类型"
                />
              </v-col>
            </v-row>
            <v-row justify="space-around" no-gutters>
              <v-col cols="5">
                <v-text-field
                    v-model="bill.remark"
                    clearable
                    label="标签"
                />
              </v-col>
              <v-col cols="5">
                <v-dialog
                    ref="dialog"
                    v-model="showDatePicker"
                    :return-value.sync="bill.billDate"
                    width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="bill.billDate"
                        :rules="[(value) => !!value || '请输入日期']"
                        label="日期"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    />
                  </template>
                  <v-date-picker
                      v-model="bill.billDate"
                      locale="zh-cn"
                      scrollable
                  >
                    <v-spacer/>
                    <v-btn
                        color="error"
                        text
                        @click="showDatePicker = false"
                    >
                      取消
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="$refs.dialog.save(bill.billDate)"
                    >
                      确认
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters>
              <v-col cols="11">
                <v-textarea
                    v-model="bill.note"
                    auto-grow
                    clearable

                    label="备注"
                    rows="1"
                />
              </v-col>
            </v-row>
            <v-row class="mb-6" justify="space-around" no-gutters>
              <v-col class="text-center" cols="6">
                <v-btn color="primary" x-large @click="submitForm"
                >提交
                </v-btn>
              </v-col>
              <v-col class="text-center" cols="6">
                <v-btn color="error" x-large @click="resetForm"
                >清空
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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