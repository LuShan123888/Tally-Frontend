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
        @click="loadSaveAccountPage"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-card
        class="pa-0 rounded-lg"
        flat fluid>
      <v-card-subtitle class="pa-3 pb-1 font-weight-medium d-flex align-center">
        <span>净资产</span>
        <v-icon class="ml-1" small @click="changeHide">{{ hide.isHide ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
      </v-card-subtitle>
      <v-card-title :style="{ color: lightPrimary }" class="px-3 py-0 text-h3"
                    v-text="hide.isHide?'******':'¥'+numFormat(accountStat.netAssets)"></v-card-title>
      <v-card-subtitle class="pa-3 pt-1 ma-0">
        <v-row no-gutters>
          <v-col cols="6">
            <span class="font-weight-medium">总资产</span>
            <span class="ml-3" v-text="hide.isHide?'******':'¥'+numFormat(accountStat.assets)"/>
          </v-col>
          <v-col cols="6">
            <span class="font-weight-medium">总负债</span>
            <span class="ml-3" v-text="hide.isHide?'******':'¥'+numFormat(accountStat.liabilities)"/>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-skeleton-loader
        v-for="(item) in 6"
        :key="'skeleton-loader'+item"
        v-if="loading"
        class="rounded-lg mt-4"
        type="list-item-avatar-two-line"
    />
    <v-container v-for="(type, i) in accountInfoList" v-if="!loading"
                 :key="i"
                 class="pa-0" fluid>
      <v-row align="center" class="px-0 py-3 font-weight-medium d-flex justify-space-between" no-gutters
             style="position: relative">
        <span v-text="accountTypeFormatter(type.type)"></span>
        <span class="text-subtitle-2 text--darken-1 grey--text">
          <span>余额</span>
          <span class="ml-2" v-text="'¥'+numFormat(type.amount)"/>
        </span>
      </v-row>
      <v-card
          class="py-0  rounded-lg"
          flat fluid>
        <v-container v-for="(item, i) in type.list" :key="i" v-ripple class="pa-0  px-3" fluid>
          <v-row align="center" no-gutters style="height: 60px;cursor: pointer"
                 @click="loadUpdateAccountPage(item)">
            <v-col cols="1">
              <v-btn color="primary" depressed fab x-small>
                <v-icon v-if="item.icon">mdi-{{ item.icon }}</v-icon>
                <v-icon v-else>mdi-help</v-icon>
              </v-btn>
            </v-col>
            <v-col class="ml-3">
              <div class="text-subtitle-1" v-text="item.accountName"/>
              <div class="text-subtitle-2 text--darken-1 grey--text" v-text="item.description"/>
            </v-col>
            <v-col class="d-flex justify-end" cols="3">
              <div class="text-subtitle-1">
                <span v-text="'¥'+numFormat(item.amount)"/>
              </div>
            </v-col>
            <v-col class="d-flex justify-end" cols="1">
              <v-icon>mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
          <v-divider v-if="i!==(type.list.length-1)"/>
        </v-container>
      </v-card>
    </v-container>
    <v-form ref="accountSaveOrUpdateForm">
      <v-dialog
          v-model="accountPage.isShow"
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
                dark
                icon
                @click="accountPage.isShow = false">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title v-text="accountPage.title"/>
          </v-toolbar>
          <v-row :style="{ width: isMobile ? '100%' : '50%' }"
                 class="mx-auto px-4"
                 justify="center"
                 no-gutters>
            <v-card class="pa-4 rounded-lg" flat fluid>
              <v-row no-gutters>
                <v-col cols="10">
                  <v-select
                      v-model="accountPage.account.type" :items="enums.accountType"
                      :rules="[(value) => !!value || '请选择账户类型']"
                      label="账户类型"
                      no-data-text="无对应选项"
                      prepend-inner-icon="mdi-format-list-bulleted-type"/>
                </v-col>
                <v-col cols="2">
                  <v-row class="mb-1" justify="center" no-gutters>
                    <div style="color: rgba(0, 0, 0, 0.6);font-size: 0.5rem">账户图标</div>
                  </v-row>
                  <v-row justify="center" no-gutters>
                    <v-btn color="primary" depressed fab x-small
                           @click="accountPage.iconDialog.isShow=true;">
                      <v-icon v-if="accountPage.account.icon">mdi-{{ accountPage.account.icon }}</v-icon>
                      <v-icon v-else>mdi-help</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="accountPage.account.accountName"
                      :rules="[(value) => !!value || '请输入账户名称']"
                      clearable
                      label="账户名称"
                      prepend-inner-icon="mdi-card-text">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="accountPage.account.description"
                      clearable
                      label="账户描述"
                      prepend-inner-icon="mdi-card-bulleted-settings">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="accountPage.account.amount"
                      :rules="[(value) => !!value || '请输入金额', rules.isFloat]"
                      clearable
                      label="账户金额"
                      prefix="¥"
                      prepend-inner-icon="mdi-currency-usd">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card>
            <v-row class="mt-4" no-gutters>
              <v-col v-if="accountPage.type==='update'" class="pr-2" cols="6">
                <v-btn
                    :disabled="accountPage.buttons.delete.loading"
                    :loading="accountPage.buttons.delete.loading"
                    block
                    class="rounded-lg"
                    color="error"
                    depressed
                    large
                    @click="deleteAccount(accountPage.account.id)">
                  <v-icon class="mr-3">mdi-delete</v-icon>
                  <span>删除</span>
                </v-btn>
              </v-col>
              <v-col :class="{'pl-2':accountPage.type==='update'}" :cols="accountPage.type==='update'?6:12">
                <v-btn
                    :disabled="accountPage.buttons.saveOrUpdate.loading"
                    :loading="accountPage.buttons.saveOrUpdate.loading"
                    block class="rounded-lg"
                    color="primary"
                    depressed
                    large
                    @click="saveOrUpdateAccount">
                  <v-icon class="mr-3">mdi-content-save</v-icon>
                  <span>保存</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <v-dialog v-model="accountPage.iconDialog.isShow" max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span v-text="'图标库'"/>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="item in icons.accountType" :key="item" class="d-flex justify-center"
                   cols="2"
                   @click="accountPage.account.icon = item;accountPage.iconDialog.isShow=false;">
              <v-btn color="primary" depressed fab x-small>
                <v-icon>mdi-{{ item }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              class="rounded-lg"
              depressed
              @click="accountPage.iconDialog.isShow = false"
              v-text="'取消'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container class="py-16"/>
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
      loading: true,
      hide: {
        icon: 'eye',
        isHide: false
      },
      accountInfoList: [],
      accountStat: {
        assets: 0.00,
        netAssets: 0.00,
        liabilities: 0.00
      },
      accountPage: {
        isShow: false,
        title: null,
        type: null,
        account: {
          accountName: null,
          icon: null,
          amount: null,
          description: null,
          type: null
        },
        buttons: {
          delete: {
            loading: false
          },
          saveOrUpdate: {
            loading: false
          }
        },
        iconDialog: {
          isShow: false
        },
      },
      backgroundImagePath: this.GLOBAL.images.wallet,
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums,
      icons: this.GLOBAL.icons
    };
  },
  methods: {
    listUserAccount() {
      this.loading = true;
      this.axios.get("/account/listUserAccount").then((response) => {
        this.accountInfoList = response.data.data.accountInfoList;
        this.accountStat = response.data.data.accountStat;
        this.loading = false;
      });
    },
    accountTypeFormatter(accountCode) {
      for (let item of this.enums.accountType) {
        if (item.value === accountCode) {
          return item.text;
        }
      }
    },
    loadUpdateAccountPage(account) {
      this.$refs.accountSaveOrUpdateForm.resetValidation()
      let accountPage = this.accountPage;
      accountPage.isShow = true;
      accountPage.type = 'update';
      accountPage.title = '修改账户';
      accountPage.account = JSON.parse(JSON.stringify(account));
    },
    loadSaveAccountPage() {
      this.$refs.accountSaveOrUpdateForm.resetValidation()
      let accountPage = this.accountPage;
      accountPage.isShow = true;
      accountPage.type = 'save';
      accountPage.title = '新建账户';
      accountPage.account = {};
    },
    deleteAccount(accountId) {
      this.accountPage.buttons.delete.loading = true;
      this.axios.delete("/account/removeAccount/" + accountId)
          .then(() => {
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.accountPage.isShow = false;
            this.listUserAccount();
          }).finally(() => {
        this.accountPage.buttons.delete.loading = false;
      });
    },
    saveOrUpdateAccount() {
      if (!this.$refs.accountSaveOrUpdateForm.validate()) {
        return;
      }
      if (this.accountPage.type === 'update') {
        this.accountPage.buttons.saveOrUpdate.loading = true;
        this.axios.put("/account/updateAccount", JSON.stringify(this.accountPage.account))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.accountPage.isShow = false;
              this.listUserAccount();
            })
            .finally(() => {
              this.accountPage.buttons.saveOrUpdate.loading = false;
            });
      } else if (this.accountPage.type === 'save') {
        this.accountPage.buttons.saveOrUpdate.loading = true;
        this.axios.post("/account/saveAccount", JSON.stringify(this.accountPage.account))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.accountPage.isShow = false;
              this.listUserAccount();
            })
            .finally(() => {
              this.accountPage.buttons.saveOrUpdate.loading = false;
            });
      }
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
    changeHide() {
      this.hide.isHide = !this.hide.isHide;
      let config = this.$store.getters.getConfig;
      if (config && config.account) {
        config.account.isHide = this.hide.isHide;
      } else {
        config = {
          account: {
            isHide: this.hide.isHide
          }
        }
      }
      this.$store.commit("setConfig", config);
    }
  },
  mounted() {
    this.$emit("changeTitle", this.title);
    this.listUserAccount();
    let config = this.$store.getters.getConfig;
    if (config && config.account && config.account.isHide) {
      this.hide.isHide = config.account.isHide;
    }
  },
};
</script>

<style lang="scss">

</style>