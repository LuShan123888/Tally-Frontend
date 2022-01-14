<template>
  <v-row>
    <v-col cols="9">
      <div>123</div>
      <div>41243</div>
    </v-col>
    <v-col cols="3"></v-col>
  </v-row>
</template>
<script>
export default {
  name: "Test",
  components: {},
  computed: {
    isMobile: function () {
      return this.isMobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
  },
  data: function () {
    return {
      bgImg: this.GLOBAL.images.coding,
      formValid: false,
      showDialog: false,
      showDatePicker: false,
      outcomeTypeList: [
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
      incomeTypeList: [
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
      selectedBill: {
        id: null,
        flow: null,
        amount: null,
        type: null,
        remark: null,
        note: null,
        billDate: null,
      },
      billList: null,
      style: {
        backgroundImg: {
          width: this.isMobile ? "60vw" : "20vw",
          bottom: this.isMobile ? "20vw" : "3vw",
          right: this.isMobile ? "3vw" : "3vw",
        },
      },
      class: {},
    };
  },
  methods: {
    selectBill(item) {
      this.showDialog = true;
      this.selectedBill = item;
    },
    deleteBill() {
      const _this = this;
      this.axios
          .delete(
              this.GLOBAL.apiBase + "/bill/deleteBill/" + this.selectedBill.id
          )
          .then(() => {
            _this.showDialog = false;
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.axios
                .get(this.GLOBAL.apiBase + "/bill/listBill")
                .then((response) => {
                  this.billList = response.data.data;
                });
          });
    },
    updateBill() {
      const _this = this;
      if (this.$refs.form.validate()) {
        if (this.selectedBill.billDate == null) {
          this.selectedBill.billDate = new Date().Format("yyyy-MM-dd");
        }
        this.axios
            .put(
                this.GLOBAL.apiBase + "/bill/updateBill",
                JSON.stringify(this.selectedBill),
                {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                }
            )
            .then(() => {
              _this.showDialog = false;
              this.$notify({
                title: "更新成功",
                message: null,
                type: "success",
                duration: 2000,
              });
            });
      }
    },
  },
  mounted() {
    this.axios.get(this.GLOBAL.apiBase + "/bill/listBill").then((response) => {
      this.billList = response.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
#background-img {
  position: fixed;
}
</style>