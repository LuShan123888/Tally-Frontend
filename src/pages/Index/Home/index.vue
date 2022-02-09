<template>
  <v-container :class="{'ml-10':!isMobile}" :style="{ width: isMobile ? '100%' : '50%'}" class="py-0 px-4" fluid>
    <title-bar :title="title"/>
    <background-image :src="backgroundImagePath"/>
    <v-btn
        color="primary"
        fab
        fixed
        right
        style="bottom: 68px"
        @click="loadSaveBillPage"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-row no-gutters>
      <v-col
          class="pr-3"
          cols="6"
      >
        <v-menu
            max-width="290px"
            min-width="auto"
            offset-y
            transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="query.monthString"
                dense
                label="请选择月份"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="query.monthString"
              color="primary"
              locale="zh-cn"
              no-title
              scrollable
              type="month"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
          class="pl-3"
          cols="6"
      >
        <v-text-field
            v-model="query.description"
            clearable
            dense
            label="请输入关键字"
            prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card
        class="pa-0 rounded-lg"
        flat fluid
    >
      <v-card-subtitle class="pa-3 pb-1 font-weight-medium">总支出</v-card-subtitle>
      <v-card-title :style="{ color: lightPrimary }" class="px-3 py-0 text-h3"
                    v-text="numFormat(billStat.expenditure)"></v-card-title>
      <v-card-subtitle class="pa-3 pt-4">
        <v-row no-gutters>
          <v-col cols="6">
            <span class="font-weight-medium">总收入</span>
            <span class="ml-3" v-text="'¥'+numFormat(billStat.income)"/>
          </v-col>
          <v-col cols="6">
            <span class="font-weight-medium">结余</span>
            <span class="ml-3" v-text="'¥'+numFormat(billStat.balance)"/>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-skeleton-loader
        v-for="(item, i) in 6"
        v-if="loading"
        class="rounded-lg mt-5"
        type="list-item-avatar-two-line"
    />
    <v-container v-for="(date, i) in billInfoList"
                 :key="i"
                 class="pa-0">
      <v-row align="center" class="px-0 py-3 font-weight-medium d-flex justify-space-between" no-gutters
             style="position: relative"
      >
        <span class="text-subtitle-2 text--darken-1 grey--text" v-text="date.billDate"/>
        <span class="text-subtitle-2 text--darken-1 grey--text">
          <span>余额</span>
          <span class="ml-2" v-text="'¥'+numFormat(date.amount)"/>
        </span>
      </v-row>
      <v-card
          class="py-0  px-3 rounded-lg"
          flat fluid
      >
        <v-container v-for="(item, i) in date.list" :key="i" class="pa-0">
          <v-row v-ripple align="center" no-gutters style="height: 60px;cursor: pointer"
                 @click="loadUpdateBillPage(item)">
            <v-col cols="1">
              <v-btn color="primary" depressed fab x-small>
                <v-icon v-if="item.billType.icon">mdi-{{ item.billType.icon }}</v-icon>
                <v-icon v-else>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col class="ml-3">
              <div class="text-subtitle-1" v-text="item.billType.billTypeName"/>
              <div class="text-subtitle-2 text--darken-1 grey--text" v-text="item.description"/>
            </v-col>
            <v-col class="d-flex justify-end" cols="3">
              <div class="text-subtitle-1">
                <span v-text="'¥'+numFormat(item.amountString)"/>
              </div>
            </v-col>
            <v-col class="d-flex justify-end" cols="1">
              <v-icon>mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
          <v-divider v-if="i!==(date.list.length-1)"/>
        </v-container>
      </v-card>
    </v-container>
    <v-dialog
        v-model="billPage.isShow"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <v-card :style="{backgroundColor: isDark?'#000000':'#F1F2F6'}">
        <v-toolbar
            class="mb-16"
            color="primary"
            dark
            style="border-radius: 0"
        >
          <v-btn
              dark
              icon
              @click="billPage.isShow = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title v-text="billPage.title"/>
        </v-toolbar>
        <v-row :style="{ width: isMobile ? '100%' : '50%' }"
               class="mx-auto px-4"
               justify="center"
               no-gutters>
          <v-form ref="billSaveOrUpdateForm">
            <v-card class="pa-3 rounded-lg" flat fluid>
              <v-row no-gutters>
                <v-col class="my-3" cols="5">
                  <v-select
                      v-model="billPage.bill.billType.parentId"
                      :items="billPage.billTypeList"
                      :rules="[(value) => !!value || '请选择一级账户类别']"
                      chips class="pr-1" dense
                      item-text="billTypeName" item-value="id" label="一级账单类别"
                      prepend-inner-icon="mdi-format-list-bulleted-type"/>
                </v-col>
                <v-col class="my-3" cols="5">
                  <v-select
                      v-model="billPage.bill.billType.id"
                      :items="billPage.billTypeChildren" chips class="pl-1"
                      dense
                      item-text="billTypeName" item-value="id" label="二级账单类别"
                      prepend-inner-icon="mdi-format-list-bulleted-type"/>
                </v-col>
                <v-col cols="2">
                  <v-row class="mb-1" justify="end" no-gutters>
                    <div style="color: rgba(0, 0, 0, 0.6);font-size: 0.5rem">类别图标</div>
                  </v-row>
                  <v-row justify="end" no-gutters>
                    <v-btn color="primary" depressed fab x-small>
                      <v-icon v-if="billPage.bill.billType.icon">mdi-{{ billPage.bill.billType.icon }}</v-icon>
                      <v-icon v-else>mdi-plus</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col class="mb-3" cols="6">
                  <v-select
                      v-model="billPage.bill.inAccountId"
                      :items="billPage.accountList"
                      :rules="[(value) => !!value || '请选择转入账户']" chips class="pr-1"
                      dense item-text="accountName"
                      item-value="id" label="转入账户"
                      prepend-inner-icon="mdi-wallet"/>
                </v-col>
                <v-col class="mb-3" cols="6">
                  <v-select
                      v-model="billPage.bill.outAccountId"
                      :items="billPage.accountList"
                      :rules="[(value) => !!value || '请选择转出账户']"
                      chips class="pr-1" dense
                      item-text="accountName" item-value="id"
                      label="转出账户"
                      prepend-inner-icon="mdi-wallet"/>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="billPage.bill.description"
                      clearable
                      label="账单描述"
                      prepend-inner-icon="mdi-card-bulleted-settings">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="billPage.bill.amountString"
                      :rules="[(value) => !!value || '请输入金额',rules.isPositive]"
                      clearable
                      label="账单金额"
                      prefix="¥"
                      prepend-inner-icon="mdi-currency-usd">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-3" no-gutters>
                <v-col v-if="billPage.type==='update'" class="pr-3" cols="6">
                  <v-btn
                      :disabled="billPage.buttons.delete.loading"
                      :loading="billPage.buttons.delete.loading"
                      block
                      class="rounded-lg"
                      color="error"
                      depressed
                      @click="deleteBill(billPage.bill.id)"
                  >
                    <v-icon class="mr-3">mdi-delete</v-icon>
                    <span>删除</span>
                  </v-btn>
                </v-col>
                <v-col :class="{'pl-3':billPage.type==='update'}" :cols="billPage.type==='update'?6:12">
                  <v-btn
                      :disabled="billPage.buttons.saveOrUpdate.loading"
                      :loading="billPage.buttons.saveOrUpdate.loading"
                      block
                      class="rounded-lg"
                      color="primary"
                      depressed
                      @click="saveOrUpdateBill"
                  >
                    <v-icon class="mr-3">mdi-content-save</v-icon>
                    <span>保存</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-row>
      </v-card>
    </v-dialog>
    <v-container class="py-16"/>
  </v-container>
</template>

<script>
import BackgroundImage from '@/pages/Index/components/BackgroundImage'
import TitleBar from "@/pages/Index/components/TitleBar";

export default {
  name: "Home",
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
      title: '账本',
      backgroundImagePath: this.GLOBAL.images.noteList,
      loading: true,
      query: {
        monthString: new Date().Format("yyyy-MM"),
        description: null
      },
      billInfoList: [],
      billStat: {
        expenditure: 0.00,
        income: 0.00,
        balance: 0.00
      },
      billPage: {
        isShow: false,
        title: null,
        type: null,
        bill: {
          id: null,
          flow: null,
          amount: null,
          description: null,
          amountString: null,
          billDate: null,
          billTypeId: null,
          inAccountId: null,
          outAccountId: null,
          billType: {
            id: null,
            parentId: null,
            billTypeName: null,
            icon: null
          }
        },
        buttons: {
          delete: {
            loading: false
          },
          saveOrUpdate: {
            loading: false
          }
        },
        accountList: [],
        billTypeList: [],
        billTypeChildren: [],
      },
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums,
      icons: this.GLOBAL.icons.accountType
    };
  },
  watch: {
    query: {
      handler(newVal, oldVal) {
        this.listBill();
      },
      deep: true
    },
    'billPage.bill.billType.parentId': {
      handler(newVal, oldVal) {
        if (!newVal) {
          return;
        }
        for (let item of this.billPage.billTypeList) {
          if (item.id === newVal) {
            this.billPage.billTypeChildren = item.children;
          }
        }
      },
      deep: true
    },
    'billPage.bill.billType.id': {
      handler(newVal, oldVal) {
        if (!newVal) {
          return;
        }
        for (let item of this.billPage.billTypeList) {
          if (item.id === this.billPage.bill.billType.parentId) {
            for (let child of item.children) {
              if (child.id === newVal) {
                this.billPage.bill.billType.icon = child.icon;
              }
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    listBill() {
      this.loading = true;
      this.axios.post("/bill/listUserBill", JSON.stringify(this.query)).then((response) => {
        this.billInfoList = response.data.data.billInfoList;
        this.billStat = response.data.data.billStat;
        this.loading = false;
      });
    },
    loadAccountList() {
      this.axios.get("/account/listAllUserAccount")
          .then((response) => {
            this.billPage.accountList = response.data.data;
          });
    },
    loadBillTypeList() {
      this.axios.get("/billType/listUserBillType")
          .then((response) => {
            this.billPage.billTypeList = response.data.data;
          });
    },
    loadUpdateBillPage(bill) {
      let billPage = this.billPage;
      billPage.isShow = true;
      billPage.type = 'update';
      billPage.title = '修改账单';
      billPage.bill = JSON.parse(JSON.stringify(bill));
    },
    loadSaveBillPage() {
      let billPage = this.billPage;
      billPage.isShow = true;
      billPage.type = 'save';
      billPage.title = '新增账单';
      billPage.bill.flow = 'OUT';
      billPage.billTypeChildren = [];
      billPage.bill.billType = {};
    },
    deleteBill(billId) {
      this.billPage.buttons.delete.loading = true;
      this.axios.delete("/bill/removeBill/" + billId)
          .then(() => {
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.billPage.isShow = false;
            this.listBill();
          }).finally(() => {
        this.billPage.buttons.delete.loading = false;
      });
    },
    saveOrUpdateBill() {
      if (!this.$refs.billSaveOrUpdateForm.validate()) {
        return;
      }
      this.billPage.bill.billTypeId = this.billPage.bill.billType.id;
      if (this.billPage.type === 'update') {
        this.billPage.buttons.saveOrUpdate.loading = true;
        this.axios.put("/bill/updateBill", JSON.stringify(this.billPage.bill))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.billPage.isShow = false;
              this.listBill();
            })
            .finally(() => {
              this.billPage.buttons.saveOrUpdate.loading = false;
            });
      } else if (this.billPage.type === 'save') {
        this.billPage.buttons.saveOrUpdate.loading = true;
        this.axios.post("/bill/saveBill", JSON.stringify(this.billPage.bill))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.billPage.isShow = false;
              this.listBill();
            })
            .finally(() => {
              this.billPage.buttons.saveOrUpdate.loading = false;
            });
      }
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
    this.listBill();
    this.loadAccountList();
    this.loadBillTypeList();
  }
};
</script>

<style lang="scss">
</style>