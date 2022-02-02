<template>
  <v-container class="pa-0" fluid>
    <v-img :src="backgroundImagePath" :style="styles.backgroundImg" contain style="position: fixed">
      <template v-slot:placeholder>
        <v-row
            no-gutters
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
      </template>
    </v-img>
    <div
        :class="classes.title"
        :style="{ color: lightPrimary}"
        v-text="'收入'"
    />
    <v-hover v-slot="{ hover }">
      <v-card
          class="mt-9 transition-swing"
          :class="{'mx-auto':isMobile,'ml-9':!isMobile,'elevation-24':hover,'elevation-2':!hover}"
          :style="{ width: isMobile ? '90%' : '50%' }"
      >
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row justify="center" no-gutters class="mt-6">
              <v-col cols="12">
                <v-row no-gutters justify="space-around">
                  <v-col cols="5">
                    <v-text-field
                        label="金额"
                        prefix="¥"
                        :rules="[(value) => !!value || '请输入金额',rules.isFloat]"
                        v-model="bill.amount"
                        clearable
                    />
                  </v-col>
                  <v-col cols="5">
                    <v-combobox
                        :items="typeList"
                        v-model="bill.type"
                        :rules="[(value) => !!value || '请选择类型']"
                        label="类型"
                        clearable
                    />
                  </v-col>
                </v-row>
                <v-row justify="space-around" no-gutters>
                  <v-col cols="5">
                    <v-text-field
                        label="标签"
                        v-model="bill.remark"
                        clearable
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
                            label="日期"
                            :rules="[(value) => !!value || '请输入日期']"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        />
                      </template>
                      <v-date-picker
                          v-model="bill.billDate"
                          scrollable
                          locale="zh-cn"
                      >
                        <v-spacer/>
                        <v-btn text color="error" @click="showDatePicker = false">
                          取消
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(bill.billDate)"
                        >
                          确认
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col cols="11">
                    <v-textarea
                        v-model="bill.note"
                        auto-grow
                        rows="1"

                        clearable
                        label="备注"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters justify="space-around" class="mb-6">
                  <v-col cols="6" class="text-center">
                    <v-btn color="primary" x-large @click="submitForm"
                    >提交
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="text-center">
                    <v-btn color="error" x-large @click="resetForm"
                    >清空
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  name: "Income",
  components: {},
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
      backgroundImagePath: this.GLOBAL.images.working,
      valid: false,
      typeList: [
        "工资",
        "奖金补贴",
        "生活费",
        "人情社交",
        "兼职",
        "投资理财",
        "报销",
        "中奖",
        "其他",
      ],
      bill: {
        flow: "in",
        amount: null,
        type: null,
        remark: null,
        note: null,
        billDate: null,
      },
      showDatePicker: false,
      rules: {
        isFloat: this.GLOBAL.rules.isFloat
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
        this.axios
            .post("/bill/saveBill", JSON.stringify(this.bill))
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
    this.bill.billDate = (new Date()).Format("yyyy-MM-dd");
  },
};
</script>

<style lang="scss" scoped>

</style>