<template>
  <v-container
      :class="{ 'ml-10': !isMobile }"
      :style="{ width: isMobile ? '100%' : '50%' }"
      class="py-0 px-4"
      fluid>
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
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-row class="flex" no-gutters>
      <div class="pr-1" style="width: 115px">
        <v-menu
            max-width="290px"
            min-width="auto"
            offset-y
            transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="query.dateQueryString"
                dense
                flat
                label="请选择月份"
                prepend-inner-icon="mdi-calendar"
                readonly
                solo
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="query.dateQueryString"
              color="primary"
              locale="zh-cn"
              no-title
              scrollable
              type="month"
          >
          </v-date-picker>
        </v-menu>
      </div>
      <div class="pl-1 flex-grow-1">
        <v-text-field
            v-model="query.description"
            clearable
            dense
            flat
            label="请输入关键字"
            prepend-inner-icon="mdi-magnify"
            solo
        ></v-text-field>
      </div>
    </v-row>
    <v-card class="pa-0 rounded-lg" flat fluid>
      <v-card-subtitle class="pa-3 pb-1 font-weight-medium"
      >总支出
      </v-card-subtitle
      >
      <v-card-title
          :style="{ color: lightPrimary }"
          class="px-3 py-0 text-h3"
          v-text="'¥' + numFormat(billSummaryData.expenditure)"
      ></v-card-title>
      <v-card-subtitle class="pa-3 pt-1 ma-0">
        <v-row no-gutters>
          <v-col cols="6">
            <span class="font-weight-medium">总收入</span>
            <span
                class="ml-3"
                v-text="'¥' + numFormat(billSummaryData.income)"
            />
          </v-col>
          <v-col cols="6">
            <span class="font-weight-medium">结余</span>
            <span
                class="ml-3"
                v-text="'¥' + numFormat(billSummaryData.amount)"
            />
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-card class="pa-0 rounded-lg mt-3 px-4" flat fluid>
      <v-row align="center" no-gutters @click="loadBudgetDialog">
        <v-col cols="6">
          <div class="font-weight-medium pa-0 flex align-center" style="height: 50px">
            <div style="line-height: 50px">
              <span
                  :style="{fontSize: '14px',color:isDark?'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.6)'}">本月预算：</span>
              <span class="">¥{{ numFormat(budgetBar.budget.amount) }}</span>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <span class="float-end text-subtitle-2">{{
              numFormat(billSummaryData.expenditure * 100 / budgetBar.budget.amount)
            }}%</span>
          <v-progress-linear :color="(billSummaryData.expenditure*100 / budgetBar.budget.amount)>25?
                             (billSummaryData.expenditure*100 / budgetBar.budget.amount)>50?(billSummaryData.expenditure*100 / budgetBar.budget.amount)>75?'error':'warning':'primary':'success'"
                             :value="billSummaryData.expenditure*100 / budgetBar.budget.amount"
                             rounded/>
        </v-col>
      </v-row>
    </v-card>
    <v-form ref="saveOrUpdateBudgetForm">
      <v-dialog
          v-model="budgetBar.dialog.isShow"
          max-width="600px"
          persistent
      >
        <v-card class="rounded-lg">
          <v-card-title>
            <span v-text="budgetBar.dialog.title"/>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                      v-model="budgetBar.dialog.budget.amount"
                      :rules="[(value) => !!value || '请输入预算金额',rules.isPositive]"
                      clearable
                      label="预算金额"
                      prepend-inner-icon="mdi-currency-usd"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                class="rounded-lg"
                depressed
                @click="budgetBar.dialog.isShow = false"
                v-text="'取消'"
            />
            <v-btn
                :disabled="budgetBar.dialog.loading"
                :loading="budgetBar.dialog.loading"
                class="rounded-lg"
                color="primary"
                depressed
                @click="saveOrUpdateBudget"
                v-text="'保存'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <div v-if="loading">
      <v-skeleton-loader
          v-for="item in 6"
          :key="'skeleton-loader' + item"
          class="rounded-lg mt-4"
          type="list-item-avatar-two-line"
      />
    </div>
    <div v-if="!loading">
      <v-container
          v-for="(date, i) in billList"

          :key="i"
          class="pa-0"
          fluid
      >
        <v-row
            align="center"
            class="px-0 py-3 font-weight-medium d-flex justify-space-between"
            no-gutters
            style="position: relative"
        >
        <span
            class="text-subtitle-2 text--darken-1 grey--text"
            v-text="date.groupName"
        />
          <span class="text-subtitle-2 text--darken-1 grey--text">
          <span>结余</span>
          <span class="ml-2" v-text="'¥' + numFormat(date.amount)"/>
        </span>
        </v-row>
        <v-card class="py-0 rounded-lg" flat fluid>
          <v-container
              v-for="(item, i) in date.list"
              :key="i"
              v-ripple
              class="pa-0 px-3"
              fluid
          >
            <v-row
                align="center"
                no-gutters
                style="height: 60px; cursor: pointer"
                @click="loadUpdateBillPage(item)"
            >
              <v-col cols="1">
                <v-btn
                    :color="
                  item.flow === 'OUT'
                    ? 'error'
                    : item.flow === 'IN'
                    ? 'primary'
                    : item.flow === 'TRANSFER'
                    ? 'warning'
                    : ''
                "
                    class="rounded-lg"
                    depressed
                    fab
                    x-small
                >
                  <v-icon v-if="item.billTypeVO && item.billTypeVO.icon"
                  >mdi-{{ item.billTypeVO.icon }}
                  </v-icon
                  >
                  <v-icon v-else>mdi-help</v-icon>
                </v-btn>
              </v-col>
              <v-col class="ml-3 text-truncate">
                <div
                    class="text-subtitle-1"
                    v-text="item.billTypeVO && item.billTypeVO.billTypeFullName"
                />
                <div
                    class="text-subtitle-2 text--darken-1 grey--text text-truncate"
                    style="max-width: 100%"
                    v-text="item.description"
                />
              </v-col>
              <v-col class="d-flex justify-end" cols="3">
                <div class="text-subtitle-1">
                <span
                    v-text="
                    (item.flow === 'OUT' ? '¥-' : '¥') + numFormat(item.amount)
                  "
                />
                </div>
              </v-col>
              <v-col class="d-flex justify-end" cols="1">
                <v-icon>mdi-chevron-right</v-icon>
              </v-col>
            </v-row>
            <v-divider v-if="i !== date.list.length - 1"/>
          </v-container>
        </v-card>
      </v-container>
    </div>
    <v-dialog
        ref="dialog"
        v-model="billPage.isShow"
        eager
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <el-upload
          :action="upload.path"
          :before-upload="beforeAvatarUpload"
          :headers="upload.header"
          :on-error="handleAvatarError"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :style="{
          height: 0 + 'px',
          width: 0 + 'px',
        }"
          name="image"
      >
        <v-btn
            :loading="upload.loading"
            color="primary"
            fab
            fixed
            right
            style="bottom: 68px"
        >
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </el-upload>
      <v-card :style="{ backgroundColor: isDark ? '#000000' : '#F1F2F6' }">
        <v-toolbar class="mb-16" color="primary" dark style="border-radius: 0">
          <template v-slot:extension>
            <v-tabs
                v-model="billPage.tab"
                color="white"
                dark
                grow
                @change="changeTabs"
            >
              <v-tab>支出</v-tab>
              <v-tab>收入</v-tab>
              <v-tab>转账</v-tab>
            </v-tabs>
          </template>
          <v-btn dark icon @click="billPage.isShow = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title v-text="billPage.title"/>
        </v-toolbar>
        <v-tabs-items
            v-model="billPage.tab"
            :style="{ backgroundColor: isDark ? '#000000' : '#F1F2F6' }"
            touchless
        >
          <v-tab-item>
            <v-container
                :style="{ width: isMobile ? '100%' : '50%' }"
                class="mx-auto px-4 py-0"
                fluid
                no-gutters
            >
              <v-form ref="outBillSaveOrUpdateForm">
                <v-card class="pa-4 rounded-lg" flat>
                  <v-row no-gutters>
                    <v-col class="my-3" cols="6">
                      <v-select
                          v-model="billPage.bill.billTypeVO.parentId"
                          :items="billPage.outBillTypeTree"
                          :rules="[(value) => !!value || '请选择主账单类别']"
                          chips
                          class="pr-1"
                          dense
                          item-text="billTypeName"
                          item-value="id"
                          label="主账单类别"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-format-list-bulleted-type"
                          @change="billPage.bill.billTypeVO.id = null"
                      >
                      </v-select>
                    </v-col>
                    <v-col class="mb-3" cols="6">
                      <v-row class="mb-2" justify="center" no-gutters>
                        <div
                            :style="{ color:  isDark?'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.6)', fontSize: '12px',lineHeight:'15px',marginTop:'2px'}">
                          类别图标
                        </div>
                      </v-row>
                      <v-row justify="center" no-gutters>
                        <v-btn
                            class="rounded-lg"
                            color="error"
                            depressed
                            fab
                            x-small
                        >
                          <v-icon
                              v-if="billPage.bill.billTypeVO.icon"
                              v-text="'mdi-' + billPage.bill.billTypeVO.icon"
                          />
                          <v-icon v-else>mdi-help</v-icon>
                        </v-btn>
                      </v-row>
                    </v-col>
                    <v-col class="pr-1" cols="6">
                      <v-select
                          v-model="billPage.bill.billTypeVO.id"
                          :items="billPage.billTypeChildren"
                          chips
                          class="pl-1"
                          clearable
                          dense
                          item-text="billTypeName"
                          item-value="id"
                          label="子账单类别"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-format-list-bulleted-type"
                      />
                    </v-col>
                    <v-col class="pl-1" cols="6">
                      <v-select
                          v-model="billPage.bill.outAccountId"
                          :items="billPage.accountList"
                          :rules="[(value) => !!value || '请选择转出账户']"
                          chips
                          class="pr-1"
                          dense
                          item-text="accountName"
                          item-value="id"
                          label="转出账户"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-wallet"
                      />
                    </v-col>
                    <v-col class="pr-1" cols="6">
                      <v-menu
                          max-width="290px"
                          min-width="auto"
                          offset-y
                          transition="scale-transition"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="billPage.bill.billDate"
                              label="请选择账单日期"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="billPage.bill.billDate"
                            color="primary"
                            locale="zh-cn"
                            no-title
                            scrollable
                            type="date"
                        >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="pl-1" cols="6">
                      <v-text-field
                          v-model="billPage.bill.amount"
                          :rules="[
                          (value) => !!value || '请输入金额',
                          rules.isPositive,
                        ]"
                          clearable
                          label="账单金额"
                          prefix="¥"
                          prepend-inner-icon="mdi-currency-usd"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="billPage.bill.description"
                          clearable
                          label="账单描述"
                          messages=" "
                          prepend-inner-icon="mdi-card-bulleted-settings"
                      >
                        <template v-slot:message="{  }">
                          <div
                              class="overflow-auto"
                              style="white-space: nowrap"
                          >
                            <v-chip
                                v-for="item in billPage.recentBillDescriptionList"
                                :key="item"
                                class="mr-1"
                                small
                                @click="billPage.bill.description = item"
                            >
                              {{ item }}
                            </v-chip>
                          </div>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row class="mt-4" no-gutters>
                  <v-col
                      v-if="billPage.type === 'update'"
                      class="pr-2"
                      cols="6"
                  >
                    <v-btn
                        :disabled="billPage.buttons.delete.loading"
                        :loading="billPage.buttons.delete.loading"
                        block
                        class="rounded-lg"
                        color="error"
                        depressed
                        large
                        @click="deleteBill(billPage.bill.id)"
                    >
                      <v-icon class="mr-3">mdi-delete</v-icon>
                      <span>删除</span>
                    </v-btn>
                  </v-col>
                  <v-col
                      :class="{ 'pl-2': billPage.type === 'update' }"
                      :cols="billPage.type === 'update' ? 6 : 12"
                  >
                    <v-btn
                        :disabled="billPage.buttons.saveOrUpdate.loading"
                        :loading="billPage.buttons.saveOrUpdate.loading"
                        block
                        class="rounded-lg"
                        color="primary"
                        depressed
                        large
                        @click="saveOrUpdateBill('OUT')"
                    >
                      <v-icon class="mr-3">mdi-content-save</v-icon>
                      <span>保存</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container
                :style="{ width: isMobile ? '100%' : '50%' }"
                class="mx-auto px-4 py-0"
                fluid
                no-gutters
            >
              <v-form ref="inBillSaveOrUpdateForm">
                <v-card class="pa-4 rounded-lg" flat>
                  <v-row no-gutters>
                    <v-col class="my-3" cols="6">
                      <v-select
                          v-model="billPage.bill.billTypeVO.parentId"
                          :items="billPage.inBillTypeTree"
                          :rules="[(value) => !!value || '请选择主账单类别']"
                          chips
                          class="pr-1"
                          dense
                          item-text="billTypeName"
                          item-value="id"
                          label="主账单类别"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-format-list-bulleted-type"
                          @change="billPage.bill.billTypeVO.id = null"
                      />
                    </v-col>
                    <v-col class="mb-3" cols="6">
                      <v-row class="mb-2" justify="center" no-gutters>
                        <div
                            :style="{ color:  isDark?'rgba(255, 255, 255, 0.7)':'rgba(0, 0, 0, 0.6)', fontSize: '12px',lineHeight:'15px',marginTop:'2px'}">
                          类别图标
                        </div>
                      </v-row>
                      <v-row justify="center" no-gutters>
                        <v-btn
                            class="rounded-lg"
                            color="primary"
                            depressed
                            fab
                            x-small
                        >
                          <v-icon
                              v-if="billPage.bill.billTypeVO.icon"
                              v-text="'mdi-' + billPage.bill.billTypeVO.icon"
                          />
                          <v-icon v-else>mdi-help</v-icon>
                        </v-btn>
                      </v-row>
                    </v-col>
                    <v-col class="pr-1" cols="6">
                      <v-select
                          v-model="billPage.bill.billTypeVO.id"
                          :items="billPage.billTypeChildren"
                          chips
                          class="pl-1"
                          clearable
                          dense
                          item-text="billTypeName"
                          item-value="id"
                          label="子账单类别"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-format-list-bulleted-type"
                      />
                    </v-col>
                    <v-col class="pl-1" cols="6">
                      <v-select
                          v-model="billPage.bill.inAccountId"
                          :items="billPage.accountList"
                          :rules="[(value) => !!value || '请选择转入账户']"
                          chips
                          class="pr-1"
                          dense
                          item-text="accountName"
                          item-value="id"
                          label="转入账户"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-wallet"
                      />
                    </v-col>
                    <v-col class="pr-1" cols="6">
                      <v-menu
                          max-width="290px"
                          min-width="auto"
                          offset-y
                          transition="scale-transition"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="billPage.bill.billDate"
                              label="请选择账单日期"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="billPage.bill.billDate"
                            color="primary"
                            locale="zh-cn"
                            no-title
                            scrollable
                            type="date"
                        >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="pl-1" cols="6">
                      <v-text-field
                          v-model="billPage.bill.amount"
                          :rules="[
                          (value) => !!value || '请输入金额',
                          rules.isPositive,
                        ]"
                          clearable
                          label="账单金额"
                          prefix="¥"
                          prepend-inner-icon="mdi-currency-usd"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="billPage.bill.description"
                          clearable
                          label="账单描述"
                          messages=" "
                          prepend-inner-icon="mdi-card-bulleted-settings"
                      >
                        <template v-slot:message="{  }">
                          <div
                              class="overflow-auto"
                              style="white-space: nowrap"
                          >
                            <v-chip
                                v-for="item in billPage.recentBillDescriptionList"
                                :key="item"
                                class="mr-1"
                                small
                                @click="billPage.bill.description = item"
                            >
                              {{ item }}
                            </v-chip>
                          </div>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row class="mt-4" no-gutters>
                  <v-col
                      v-if="billPage.type === 'update'"
                      class="pr-2"
                      cols="6"
                  >
                    <v-btn
                        :disabled="billPage.buttons.delete.loading"
                        :loading="billPage.buttons.delete.loading"
                        block
                        class="rounded-lg"
                        color="error"
                        depressed
                        large
                        @click="deleteBill(billPage.bill.id)"
                    >
                      <v-icon class="mr-3">mdi-delete</v-icon>
                      <span>删除</span>
                    </v-btn>
                  </v-col>
                  <v-col
                      :class="{ 'pl-2': billPage.type === 'update' }"
                      :cols="billPage.type === 'update' ? 6 : 12"
                  >
                    <v-btn
                        :disabled="billPage.buttons.saveOrUpdate.loading"
                        :loading="billPage.buttons.saveOrUpdate.loading"
                        block
                        class="rounded-lg"
                        color="primary"
                        depressed
                        large
                        @click="saveOrUpdateBill('IN')"
                    >
                      <v-icon class="mr-3">mdi-content-save</v-icon>
                      <span>保存</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container
                :style="{ width: isMobile ? '100%' : '50%' }"
                class="mx-auto px-4 py-0"
                fluid
                no-gutters
            >
              <v-form ref="transferBillSaveOrUpdateForm">
                <v-card class="pa-4 rounded-lg" flat>
                  <v-row no-gutters>
                    <v-col class="mt-3" cols="6">
                      <v-select
                          v-model="billPage.bill.outAccountId"
                          :items="billPage.accountList"
                          :rules="[(value) => !!value || '请选择转出账户']"
                          chips
                          class="pr-1"
                          dense
                          item-text="accountName"
                          item-value="id"
                          label="转出账户"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-wallet"
                      />
                    </v-col>
                    <v-col class="mt-3" cols="6">
                      <v-select
                          v-model="billPage.bill.inAccountId"
                          :items="billPage.accountList"
                          :rules="[
                          (value) => !!value || '请选择转入账户',
                          (value) =>
                            value !== billPage.bill.outAccountId ||
                            '转入账户不能为转出账户',
                        ]"
                          chips
                          class="pr-1"
                          dense
                          item-text="accountName"
                          item-value="id"
                          label="转入账户"
                          no-data-text="无对应选项"
                          prepend-inner-icon="mdi-wallet"
                      />
                    </v-col>
                    <v-col class="pr-1" cols="6">
                      <v-menu
                          max-width="290px"
                          min-width="auto"
                          offset-y
                          transition="scale-transition"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="billPage.bill.billDate"
                              label="请选择账单日期"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="billPage.bill.billDate"
                            color="primary"
                            locale="zh-cn"
                            no-title
                            scrollable
                            type="date"
                        >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="pl-1" cols="6">
                      <v-text-field
                          v-model="billPage.bill.amount"
                          :rules="[
                          (value) => !!value || '请输入金额',
                          rules.isPositive,
                        ]"
                          clearable
                          label="账单金额"
                          prefix="¥"
                          prepend-inner-icon="mdi-currency-usd"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="billPage.bill.description"
                          clearable
                          label="账单描述"
                          messages=" "
                          prepend-inner-icon="mdi-card-bulleted-settings"
                      >
                        <template v-slot:message="{  }">
                          <div
                              class="overflow-auto"
                              style="white-space: nowrap"
                          >
                            <v-chip
                                v-for="item in billPage.recentBillDescriptionList"
                                :key="item"
                                class="mr-1"
                                small
                                @click="billPage.bill.description = item"
                            >
                              {{ item }}
                            </v-chip>
                          </div>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row class="mt-4" no-gutters>
                  <v-col
                      v-if="billPage.type === 'update'"
                      class="pr-2"
                      cols="6"
                  >
                    <v-btn
                        :disabled="billPage.buttons.delete.loading"
                        :loading="billPage.buttons.delete.loading"
                        block
                        class="rounded-lg"
                        color="error"
                        depressed
                        large
                        @click="deleteBill(billPage.bill.id)"
                    >
                      <v-icon class="mr-3">mdi-delete</v-icon>
                      <span>删除</span>
                    </v-btn>
                  </v-col>
                  <v-col
                      :class="{ 'pl-2': billPage.type === 'update' }"
                      :cols="billPage.type === 'update' ? 6 : 12"
                  >
                    <v-btn
                        :disabled="billPage.buttons.saveOrUpdate.loading"
                        :loading="billPage.buttons.saveOrUpdate.loading"
                        block
                        class="rounded-lg"
                        color="primary"
                        depressed
                        large
                        @click="saveOrUpdateBill('TRANSFER')"
                    >
                      <v-icon class="mr-3">mdi-content-save</v-icon>
                      <span>保存</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <v-container class="py-16"/>
  </v-container>
</template>

<script>
import BackgroundImage from "@/pages/Index/components/BackgroundImage";
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
    },
  },
  data: function () {
    return {
      title: "账本",
      backgroundImagePath: this.GLOBAL.images.noteList.toString(),
      loading: true,
      query: {
        dateQueryString: new Date().Format("yyyy-MM"),
        description: null,
      },
      billList: [
        {
          amount: null,
          groupName: null,
          list: [],
        },
      ],
      billSummaryData: {
        expenditure: 0.0,
        income: 0.0,
        amount: 0.0,
      },
      billPage: {
        isShow: false,
        tab: null,
        title: null,
        type: null,
        bill: {
          id: null,
          flow: null,
          amount: null,
          description: null,
          billDate: null,
          billTypeId: null,
          inAccountId: null,
          outAccountId: null,
          userId: null,
          billTypeVO: {
            id: null,
            parentId: null,
            billTypeName: null,
            billTypeFullName: null,
            icon: null,
          },
        },
        buttons: {
          delete: {
            loading: false,
          },
          saveOrUpdate: {
            loading: false,
          },
        },
        accountList: [],
        billTypeTree: [],
        outBillTypeTree: [],
        inBillTypeTree: [],
        billTypeChildren: [],
        recentBillDescriptionList: [],
      },
      budgetBar: {
        isShow: true,
        percentage: 0.0,
        dialog: {
          isShow: false,
          loading: false,
          title: null,
          budget: {
            userId: null,
            amount: 0,
            dateString: null,
          }
        },
        budget: {
          id: null,
          userId: null,
          amount: 0,
          dateString: null,
        }
      },
      upload: {
        path: this.GLOBAL.url.api + "/bill/generateBillByImage",
        header: {Authorization: this.$store.getters.getToken},
        loading: false,
      },
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums,
      userInfo: null,
    };
  },
  watch: {
    query: {
      handler() {
        this.listBill();
        this.loadBudget();
      },
      deep: true,
    },
    "billPage.isShow": {
      handler() {
        this.$refs.outBillSaveOrUpdateForm.resetValidation();
        this.$refs.inBillSaveOrUpdateForm.resetValidation();
        this.$refs.transferBillSaveOrUpdateForm.resetValidation();
      },
    },
    "billPage.bill.billTypeVO.parentId": {
      handler(newVal) {
        this.loadRecentBillDescriptionList(newVal);
        for (let item of this.billPage.billTypeTree) {
          if (item.id === newVal) {
            this.billPage.billTypeChildren = item.children;
            this.billPage.bill.billTypeVO.icon = item.icon;
            return;
          }
        }
      },
    },
    "billPage.bill.billTypeVO.id": {
      handler(newVal) {
        this.loadRecentBillDescriptionList(newVal);
        for (let item of this.billPage.billTypeTree) {
          if (
              item.id === this.billPage.bill.billTypeVO.parentId &&
              item.children
          ) {
            for (let child of item.children) {
              if (child.id === newVal) {
                this.billPage.bill.billTypeVO.icon = child.icon;
                return;
              }
            }
          }
        }
      },
    },
  },
  methods: {
    changeTabs() {
      this.billPage.bill.billTypeVO.parentId = null;
      this.billPage.bill.billTypeVO.id = null;
      this.billPage.bill.billTypeVO.icon = null;
      this.$refs.outBillSaveOrUpdateForm.resetValidation();
      this.$refs.inBillSaveOrUpdateForm.resetValidation();
      this.$refs.transferBillSaveOrUpdateForm.resetValidation();
      this.loadRecentBillDescriptionList(null);
    },
    listBill() {
      this.loading = true;
      this.axios.post("/bill/listUserBill", this.query).then((response) => {
        this.billList = response.data.data.billList;
        for (let list of this.billList) {
          for (let item of list.list) {
            if (item.billTypeVO && item.billTypeVO.parentId === 0) {
              item.billTypeVO.parentId = item.billTypeVO.id;
              item.billTypeVO.id = null;
            }
          }
        }
        this.billSummaryData = response.data.data.billSummaryData;
        this.loading = false;
      });
    },
    loadAccountList() {
      this.axios.get("/account/listUserAllAccount").then((response) => {
        this.billPage.accountList = response.data.data;
      });
    },
    loadBillTypeTree() {
      this.axios.get("/billType/listUserBillTypeTree").then((response) => {
        this.billPage.billTypeTree = response.data.data;
        for (let item of this.billPage.billTypeTree) {
          if (item.flow === "OUT") {
            this.billPage.outBillTypeTree.push(item);
          } else if (item.flow === "IN") {
            this.billPage.inBillTypeTree.push(item);
          }
        }
      });
    },
    loadUpdateBillPage(bill) {
      let billPage = this.billPage;
      switch (bill.flow) {
        case "OUT":
          billPage.tab = 0;
          break;
        case "IN":
          billPage.tab = 1;
          break;
        case "TRANSFER":
          billPage.tab = 2;
          break;
        default:
          break;
      }
      billPage.isShow = true;
      billPage.type = "update";
      billPage.title = "修改账单";
      billPage.bill = JSON.parse(JSON.stringify(bill));
      if (!bill.billTypeVO) {
        bill.billTypeVO = {};
      }
      this.loadRecentBillDescriptionList(null);
    },
    loadSaveBillPage() {
      let billPage = this.billPage;
      billPage.tab = 0;
      billPage.isShow = true;
      billPage.type = "save";
      billPage.title = "新增账单";
      billPage.billTypeChildren = [];
      for (let key in billPage.bill) {
        billPage.bill[key] = null;
      }
      billPage.bill.billTypeVO = {
        id: null,
        parentId: null,
        billTypeName: null,
        billTypeFullName: null,
        icon: null,
      };
      billPage.bill.billDate = new Date().Format("yyyy-MM-dd");
      this.loadRecentBillDescriptionList(null);
    },
    deleteBill(billId) {
      this.billPage.buttons.delete.loading = true;
      this.axios
          .delete("/bill/removeBill/" + billId)
          .then(() => {
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.billPage.isShow = false;
            this.listBill();
          })
          .finally(() => {
            this.billPage.buttons.delete.loading = false;
          });
    },
    saveOrUpdateBill(billFlow) {
      switch (billFlow) {
        case "OUT":
          if (!this.$refs.outBillSaveOrUpdateForm.validate()) {
            return;
          }
          break;
        case "IN":
          if (!this.$refs.inBillSaveOrUpdateForm.validate()) {
            return;
          }
          break;
        case "TRANSFER":
          if (!this.$refs.transferBillSaveOrUpdateForm.validate()) {
            return;
          }
          break;
        default:
          break;
      }
      this.billPage.bill.flow = billFlow;
      this.billPage.bill.userId = this.userInfo.id;
      if (this.billPage.bill.billTypeVO.id) {
        this.billPage.bill.billTypeId = this.billPage.bill.billTypeVO.id;
      } else {
        this.billPage.bill.billTypeId = this.billPage.bill.billTypeVO.parentId;
      }
      if (this.billPage.type === "update") {
        this.billPage.buttons.saveOrUpdate.loading = true;
        this.axios
            .put("/bill/updateBill", this.billPage.bill)
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
      } else if (this.billPage.type === "save") {
        this.billPage.buttons.saveOrUpdate.loading = true;
        this.axios
            .post("/bill/saveBill", this.billPage.bill)
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
    loadRecentBillDescriptionList(billTypeId) {
      let bill = {
        billTypeId: billTypeId,
        flow:
            this.billPage.tab === 0
                ? "OUT"
                : this.billPage.tab === 1
                    ? "IN"
                    : "TRANSFER",
      };
      this.axios
          .post("/bill/listRecentBillDescription", bill)
          .then((response) => {
            this.billPage.recentBillDescriptionList = response.data.data;
          });
    },
    numFormat(number) {
      if (!number) {
        return "0.00";
      }
      number = number.toFixed(2);
      return number.toString().replace(/\d+/, function (n) {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ",";
        });
      });
    },
    handleAvatarSuccess(response) {
      this.upload.loading = false;
      const billVO = response.data;
      this.billPage.bill.amount = billVO.amount;
      this.billPage.bill.outAccountId = billVO.outAccountId;
      this.billPage.bill.billDate = billVO.billDate;
      this.billPage.bill.description = billVO.description;
      if (billVO.billTypeVO) {
        if (billVO.billTypeVO.parentId !== 0) {
          this.billPage.bill.billTypeVO.id = billVO.billTypeVO.id;
          this.billPage.bill.billTypeVO.parentId = billVO.billTypeVO.parentId;
        } else {
          this.billPage.bill.billTypeVO.parentId = billVO.billTypeId;
        }
      }
      this.$notify({
        title: "图片解析成功",
        message: null,
        type: "success",
        duration: 2000,
      });
    },
    handleAvatarError() {
      this.upload.loading = false;
      this.$notify({
        title: "图像解析失败",
        message: null,
        type: "error",
        duration: 2000,
      });
    },
    beforeAvatarUpload(file) {
      let isImage = file.type === "image/jpeg" || file.type === "image/png";
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$notify({
          title: "上传图片只能是 JPG 或 PNG 格式",
          message: null,
          type: "error",
          duration: 2000,
        });
      }
      if (!isLt2M) {
        this.$notify({
          title: "上传图片大小不能超过 2MB",
          message: null,
          type: "error",
          duration: 2000,
        });
      }
      this.upload.loading = true;
      return isImage && isLt2M;
    },
    loadBudget() {
      this.budgetBar.budget.dateString = this.query.dateQueryString;
      this.axios.post("/budget/listUserBudget", this.budgetBar.budget).then((response) => {
        const budgetList = response.data.data;
        if (budgetList.length > 0) {
          this.budgetBar.budget = budgetList[0];
        } else {
          this.budgetBar.budget = {}
        }
      });
    },
    loadBudgetDialog() {
      this.budgetBar.dialog.isShow = true;
      if (this.budgetBar.budget.id) {
        this.budgetBar.dialog.title = "修改预算";
        this.budgetBar.dialog.budget = JSON.parse(JSON.stringify(this.budgetBar.budget));
      } else {
        this.budgetBar.dialog.title = "新增预算";
        this.budgetBar.dialog.budget = {};
      }
    },
    saveOrUpdateBudget() {
      if (!this.$refs.saveOrUpdateBudgetForm.validate()) {
        return;
      }
      this.budgetBar.dialog.loading = true;
      this.budgetBar.dialog.budget.userId = this.userInfo.id;
      this.budgetBar.dialog.budget.dateString = this.query.dateQueryString;
      if (this.budgetBar.dialog.budget.id) {
        this.axios.put("/budget/updateBudget", this.budgetBar.dialog.budget).then(() => {
          this.$notify({
            title: "修改成功",
            message: null,
            type: "success",
            duration: 2000,
          });
          this.loadBudget();
          this.budgetBar.dialog.isShow = false;
        }).finally(() => {
          this.budgetBar.dialog.loading = false;
        });
      } else {
        this.axios.post("/budget/saveBudget", this.budgetBar.dialog.budget).then(() => {
          this.$notify({
            title: "新增成功",
            message: null,
            type: "success",
            duration: 2000,
          });
          this.loadBudget();
          this.budgetBar.dialog.isShow = false;
        }).finally(() => {
          this.budgetBar.dialog.loading = false;
        });
      }
    },
    getUserInfo() {
      this.axios.get("/user/getUserInfo").then((response) => {
        this.userInfo = response.data.data;
      });
    }
  },
  mounted() {
    this.getUserInfo();
    this.$emit("changeTitle", this.title);
    this.listBill();
    this.loadBudget();
    this.loadAccountList();
    this.loadBillTypeTree();
  },
};
</script>

<style lang="scss">
</style>