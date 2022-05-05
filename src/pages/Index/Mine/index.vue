<template>
  <v-container
    :class="{ 'ml-10': !isMobile }"
    :style="{ width: isMobile ? '100%' : '50%' }"
    class="py-0 px-4"
    fluid
  >
    <title-bar :title="title" />
    <background-image :src="backgroundImagePath" />
    <v-card
      :style="{ cursor: 'pointer' }"
      class="mb-4 pa-3 rounded-lg"
      flat
      v-ripple
      fluid
      @click.native="
        userInfoPage.isShow = true;
        this.userInfoPage.dialog.userInfo = JSON.parse(
          JSON.stringify(this.userInfoPage.userInfo)
        );
      "
    >
      <v-row align="center" no-gutters>
        <v-col cols="2">
          <avatar
            :path="userInfoPage.userInfo.avatarPath"
            class="mx-0"
            size="50"
            style="width: 50px"
          />
        </v-col>
        <v-col class="pl-3" cols="9">
          <v-row
            class="text-h6"
            no-gutters
            v-text="userInfoPage.userInfo.username"
          />
          <v-row
            class="
              text-subtitle-2
              grey--text
              text--darken-1
              font-weight-regular
            "
            no-gutters
            v-text="'邮箱，手机号，密码'"
          />
        </v-col>
        <v-col class="d-flex justify-end" cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="userInfoPage.isShow"
      fullscreen
      hide-overlay
      :style="{ backgroundColor: isDark ? '#000000' : '#F1F2F6' }"
      transition="dialog-bottom-transition"
    >
      <v-card :style="{ backgroundColor: isDark ? '#000000' : '#F1F2F6' }">
        <v-toolbar class="mb-16" color="primary" dark style="border-radius: 0">
          <v-btn dark icon @click="userInfoPage.isShow = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>用户信息</v-toolbar-title>
        </v-toolbar>
        <v-row
          :style="{ width: isMobile ? '100%' : '50%' }"
          justify="center"
          class="mx-auto px-4"
          no-gutters
        >
          <avatar
            :path="userInfoPage.userInfo.avatarPath"
            size="100"
            style="cursor: pointer; z-index: 10"
            @click.native="loadUserInfoDialog('修改头像', 'avatar')"
          />
          <v-card
            :style="{ width: '100%' }"
            class="pt-16 rounded-lg mb-4"
            flat
            fluid
            style="margin-top: -50px"
          >
            <v-row
              v-ripple
              align="center"
              class="px-3 rounded-0"
              no-gutters
              style="height: 50px"
              @click="loadUserInfoDialog('修改用户名', 'username')"
            >
              <v-col cols="3">
                <v-btn class="rounded-lg" color="primary" depressed fab x-small>
                  <v-icon>mdi-account</v-icon>
                </v-btn>
                <span
                  class="ml-2 text-subtitle-2 grey--text text--darken-1"
                  v-text="'用户名'"
                />
              </v-col>
              <v-col class="pl-1">
                <span v-text="userInfoPage.userInfo.username" />
              </v-col>
              <v-col cols="1">
                <v-icon>mdi-pencil</v-icon>
              </v-col>
            </v-row>
            <v-divider class="mx-3" />
            <v-row
              v-ripple
              align="center"
              class="px-3"
              no-gutters
              style="height: 50px"
              @click="loadUserInfoDialog('修改密码', 'password')"
            >
              <v-col cols="3">
                <v-btn class="rounded-lg" color="primary" depressed fab x-small>
                  <v-icon>mdi-account-key</v-icon>
                </v-btn>
                <span
                  class="ml-2 text-subtitle-2 grey--text text--darken-1"
                  v-text="'密码'"
                />
              </v-col>
              <v-col class="pl-1">
                <span v-text="'********'" />
              </v-col>
              <v-col cols="1">
                <v-icon>mdi-pencil</v-icon>
              </v-col>
            </v-row>
            <v-divider class="mx-3" />
            <v-row
              v-ripple
              align="center"
              class="px-3"
              no-gutters
              style="height: 50px"
              @click="loadUserInfoDialog('绑定手机号', 'phoneNumber')"
            >
              <v-col cols="3">
                <v-btn class="rounded-lg" color="primary" depressed fab x-small>
                  <v-icon>mdi-cellphone-text</v-icon>
                </v-btn>
                <span
                  class="ml-2 text-subtitle-2 grey--text text--darken-1"
                  v-text="'手机号'"
                />
              </v-col>
              <v-col class="pl-1">
                <span v-text="userInfoPage.userInfo.phoneNumber" />
              </v-col>
              <v-col cols="1">
                <v-icon>mdi-pencil</v-icon>
              </v-col>
            </v-row>
            <v-divider class="mx-3" />
            <v-row
              v-ripple
              align="center"
              class="px-3"
              no-gutters
              style="height: 50px"
              @click="loadUserInfoDialog('绑定邮箱', 'email')"
            >
              <v-col cols="3">
                <v-btn class="rounded-lg" color="primary" depressed fab x-small>
                  <v-icon>mdi-email</v-icon>
                </v-btn>
                <span
                  class="ml-2 text-subtitle-2 grey--text text--darken-1"
                  v-text="'邮箱'"
                />
              </v-col>
              <v-col class="pl-1 text-truncate">
                <span
                  class="text-truncate"
                  v-text="userInfoPage.userInfo.email"
                />
              </v-col>
              <v-col cols="1">
                <v-icon>mdi-pencil</v-icon>
              </v-col>
            </v-row>
            <v-divider class="mx-3" />
            <v-row
              v-ripple
              align="center"
              class="px-3"
              no-gutters
              style="height: 50px"
            >
              <v-col cols="3">
                <v-btn class="rounded-lg" color="primary" depressed fab x-small>
                  <v-icon>mdi-list-status</v-icon>
                </v-btn>
                <span
                  class="ml-2 text-subtitle-2 grey--text text--darken-1"
                  v-text="'状态'"
                />
              </v-col>
              <v-col class="pl-1">
                <v-chip
                  :color="
                    userInfoPage.userInfo.status === 'NORMAL'
                      ? 'success'
                      : 'secondary'
                  "
                  class="mr-1"
                  label
                  small
                  v-text="getStatusText()"
                >
                </v-chip>
              </v-col>
            </v-row>
            <v-divider class="mx-3" />
            <v-row
              v-ripple
              align="center"
              class="px-3"
              no-gutters
              style="height: 50px"
            >
              <v-col cols="3">
                <v-btn class="rounded-lg" color="primary" depressed fab x-small>
                  <v-icon>mdi-clipboard-account-outline</v-icon>
                </v-btn>
                <span
                  class="ml-2 text-subtitle-2 grey--text text--darken-1"
                  v-text="'角色'"
                />
              </v-col>
              <v-col class="pl-1">
                <v-chip
                  v-for="item in userInfoPage.userInfo.roleVOList"
                  :key="item.id"
                  class="mr-1"
                  label
                  small
                  v-text="item.roleName"
                >
                </v-chip>
              </v-col>
            </v-row>
          </v-card>
          <v-btn
            block
            class="rounded-lg"
            color="error"
            depressed
            large
            @click="loadUserInfoDialog('注销账号', 'cancelUser')"
          >
            <v-icon class="mr-3">mdi-logout</v-icon>
            注销账号
          </v-btn>
        </v-row>
        <v-form ref="updateUserInfoForm">
          <v-dialog
            v-model="userInfoPage.dialog.isShow"
            max-width="600px"
            persistent
          >
            <v-card class="rounded-lg">
              <v-card-title>
                <span v-text="userInfoPage.dialog.title" />
              </v-card-title>
              <v-card-text class="pb-0">
                <v-container
                  v-if="userInfoPage.dialog.type === 'avatar'"
                  class="pa-0"
                >
                  <v-row no-gutters>
                    <v-col class="d-flex justify-center" cols="12">
                      <image-uploader
                        :image-path="userInfoPage.dialog.userInfo.avatarPath"
                        size="120"
                        border-radius="50%"
                        @setImagePath="
                          (imagePath) => {
                            userInfoPage.dialog.userInfo.avatarPath = imagePath;
                          }
                        "
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container
                  v-if="userInfoPage.dialog.type === 'username'"
                  class="pa-0"
                >
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="userInfoPage.dialog.userInfo.username"
                        :rules="[rules.isUsername]"
                        clearable
                        label="新用户名"
                        prepend-inner-icon="mdi-account"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container
                  v-if="userInfoPage.dialog.type === 'password'"
                  class="pa-0"
                >
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="userInfoPage.dialog.userInfo.password"
                        :rules="[rules.isPassword]"
                        prepend-inner-icon="mdi-account-key"
                        clearable
                        label="新密码"
                        counter
                        type="password"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        prepend-inner-icon="mdi-account-key"
                        :rules="[
                          (value) =>
                            value === userInfoPage.dialog.userInfo.password ||
                            '两次输入的密码不一致',
                        ]"
                        clearable
                        counter
                        label="密码确认"
                        type="password"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container
                  v-if="userInfoPage.dialog.type === 'phoneNumber'"
                  class="pa-0"
                >
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        ref="phoneNumberTextField"
                        prepend-inner-icon="mdi-cellphone-text"
                        v-model="userInfoPage.dialog.userInfo.phoneNumber"
                        :rules="[
                          (value) => !!value || '请输入手机号',
                          rules.isPhoneNumber,
                        ]"
                        clearable
                        counter
                        label="新手机号"
                      >
                        <template v-slot:append-outer>
                          <v-btn
                            :disabled="
                              userInfoPage.dialog.verificationCodeBtn.disabled
                            "
                            :loading="
                              userInfoPage.dialog.verificationCodeBtn.loading
                            "
                            depressed
                            small
                            @click="
                              sendVerificationCode(
                                'phoneNumber',
                                userInfoPage.dialog.userInfo.phoneNumber
                              )
                            "
                            v-text="'获取验证码'"
                          />
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" no-gutters>
                      <v-otp-input
                        v-model="userInfoPage.dialog.userInfo.verificationCode"
                        :rules="[
                          (value) => !!value || '请输入验证码',
                          rules.isInteger,
                        ]"
                        length="6"
                        plain
                        type="number"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container
                  v-if="userInfoPage.dialog.type === 'email'"
                  class="pa-0"
                >
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        ref="emailTextField"
                        prepend-inner-icon="mdi-email"
                        v-model="userInfoPage.dialog.userInfo.email"
                        :rules="[
                          (value) => !!value || '请输入邮箱',
                          rules.isEmail,
                        ]"
                        clearable
                        label="新邮箱"
                      >
                        <template v-slot:append-outer>
                          <v-btn
                            :disabled="
                              userInfoPage.dialog.verificationCodeBtn.disabled
                            "
                            :loading="
                              userInfoPage.dialog.verificationCodeBtn.loading
                            "
                            depressed
                            small
                            @click="
                              sendVerificationCode(
                                'email',
                                userInfoPage.dialog.userInfo.email
                              )
                            "
                            v-text="'获取验证码'"
                          />
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" no-gutters>
                      <v-otp-input
                        v-model="userInfoPage.dialog.userInfo.verificationCode"
                        :rules="[
                          (value) => !!value || '请输入验证码',
                          rules.isInteger,
                        ]"
                        length="6"
                        plain
                        type="number"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container
                  v-if="userInfoPage.dialog.type === 'cancelUser'"
                  class="pa-0"
                >
                  <v-row no-gutters>
                    <v-icon color="error">mdi-alert-circle</v-icon>
                    <span class="ml-2">确定要注销该账号吗？</span>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  class="rounded-lg"
                  depressed
                  @click="userInfoPage.dialog.isShow = false"
                  v-text="'取消'"
                />
                <v-btn
                  :disabled="userInfoPage.dialog.loading"
                  :loading="userInfoPage.dialog.loading"
                  class="rounded-lg"
                  color="primary"
                  depressed
                  @click="updateUserInfo"
                  v-text="'保存'"
                />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
      </v-card>
    </v-dialog>
    <v-card class="mb-4 pa-0 rounded-lg" flat fluid>
      <v-row
        v-ripple
        align="center"
        class="px-3"
        no-gutters
        style="height: 50px"
      >
        <v-col cols="1">
          <v-btn class="rounded-lg" color="primary" depressed fab x-small>
            <v-icon>mdi-brightness-4</v-icon>
          </v-btn>
        </v-col>
        <v-col class="ml-3">
          <span>深色模式</span>
        </v-col>
        <v-col class="d-flex justify-end" cols="2">
          <v-switch
            v-model="darkMode"
            class="ma-0 pa-0"
            color="success"
            dense
            hide-details="auto"
            inset
          ></v-switch>
        </v-col>
      </v-row>
      <v-divider class="mx-3" />
      <v-row
        v-ripple
        align="center"
        class="px-3"
        no-gutters
        style="height: 50px; cursor: pointer"
      >
        <v-col cols="1">
          <v-btn class="rounded-lg" color="primary" depressed fab x-small>
            <v-icon>mdi-notebook-multiple</v-icon>
          </v-btn>
        </v-col>
        <v-col class="ml-3" @click="billTypePage.isShow = true">
          <span>账单类别</span>
        </v-col>
        <v-col class="d-flex justify-end" cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
      <v-divider class="mx-3" />
      <v-row
        v-ripple
        align="center"
        class="px-3"
        no-gutters
        style="height: 50px; cursor: pointer"
      >
        <v-col cols="1">
          <v-btn class="rounded-lg" color="primary" depressed fab x-small>
            <v-icon>mdi-message-alert</v-icon>
          </v-btn>
        </v-col>
        <v-col class="ml-3" @click="loadFeedbackPage">
          <span>提交反馈</span>
        </v-col>
        <v-col class="d-flex justify-end" cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="billTypePage.isShow"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card :style="{ backgroundColor: isDark ? '#000000' : '#F1F2F6' }">
        <v-toolbar class="mb-16" color="primary" dark style="border-radius: 0">
          <v-btn dark icon @click="billTypePage.isShow = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>账单类别</v-toolbar-title>
        </v-toolbar>
        <v-row
          :style="{ width: isMobile ? '100%' : '50%' }"
          class="mx-auto px-4"
          justify="center"
          no-gutters
        >
          <v-card class="pa-4 rounded-lg" flat fluid style="width: 100%">
            <v-row align="center" no-gutters>
              <v-row no-gutters>
                <span class="text-h6">账单类别</span>
              </v-row>
              <v-row class="d-flex justify-end" no-gutters>
                <v-btn
                  class="mr-1 rounded-lg"
                  color="info"
                  depressed
                  small
                  @click="loadBillTypeSaveDialog"
                  v-text="'新增'"
                />
                <v-btn
                  class="rounded-lg"
                  color="warning"
                  depressed
                  small
                  @click="loadBillTypeOrderDialog(billTypePage.billTypeTree)"
                  v-text="'排序'"
                />
              </v-row>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-treeview
              :items="billTypePage.billTypeTree"
              item-children="children"
              item-key="id"
              item-text="billTypeName"
              open-on-click
              selected-color="primary"
              style="width: 100%"
              transition
            >
              <template v-slot:prepend="{ item, open }">
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
                  class="mr-3 rounded-lg"
                  depressed
                  fab
                  x-small
                >
                  <v-icon v-if="item.icon">mdi-{{ item.icon }}</v-icon>
                  <v-icon v-else>mdi-help</v-icon>
                </v-btn>
              </template>
              <template v-slot:append="{ item, open }">
                <v-btn
                  v-if="item.flow !== 'TRANSFER'"
                  class="mr-1 rounded-lg"
                  color="primary"
                  depressed
                  small
                  v-text="'修改'"
                  @click.stop="loadBillTypeUpdateDialog(item)"
                />
                <v-btn
                  v-if="item.children && item.flow !== 'TRANSFER'"
                  class="mr-1 rounded-lg"
                  color="warning"
                  depressed
                  small
                  v-text="'排序'"
                  @click.stop="loadBillTypeOrderDialog(item.children)"
                />
                <v-btn
                  v-if="!item.children && item.flow !== 'TRANSFER'"
                  class="mr-1 rounded-lg"
                  color="error"
                  depressed
                  small
                  v-text="'删除'"
                  @click.stop="
                    billTypePage.removeDialog.isShow = true;
                    billTypePage.removeDialog.billType.id = item.id;
                  "
                />
              </template>
            </v-treeview>
          </v-card>
        </v-row>
      </v-card>
      <v-form ref="billTypeForm">
        <v-dialog
          v-model="billTypePage.dialog.isShow"
          max-width="600px"
          persistent
        >
          <v-card class="rounded-lg">
            <v-card-title>
              <span v-text="billTypePage.dialog.title" />
            </v-card-title>
            <v-card-text class="pb-0">
              <v-container class="pa-0">
                <v-row no-gutters>
                  <v-col align-self="center" cols="10">
                    <v-text-field
                      v-model="billTypePage.dialog.billType.billTypeName"
                      :rules="[(value) => !!value || '请输入类别名称']"
                      label="类别名称"
                      prepend-inner-icon="mdi-notebook"
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-row justify="center" no-gutters>
                      <div style="color: rgba(0, 0, 0, 0.6); font-size: 8px">
                        图标
                      </div>
                    </v-row>
                    <v-row justify="center" no-gutters>
                      <v-btn
                        class="rounded-lg"
                        :color="
                          billTypePage.dialog.billType.flow === 'OUT'
                            ? 'error'
                            : billTypePage.dialog.billType.flow === 'IN'
                            ? 'primary'
                            : ''
                        "
                        depressed
                        fab
                        x-small
                        @click="billTypePage.iconDialog.isShow = true"
                      >
                        <v-icon
                          v-if="billTypePage.dialog.billType.icon"
                          v-text="'mdi-' + billTypePage.dialog.billType.icon"
                        ></v-icon>
                        <v-icon v-else>mdi-help</v-icon>
                      </v-btn>
                    </v-row>
                  </v-col>
                  <v-col class="pr-1" cols="6">
                    <v-select
                      v-model="billTypePage.dialog.billType.flow"
                      :items="[
                        { text: '支出', value: 'OUT' },
                        { text: '收入', value: 'IN' },
                      ]"
                      :rules="[(value) => !!value || '请选择类别类型']"
                      label="类型"
                      no-data-text="无对应选项"
                      prepend-inner-icon="mdi-format-list-bulleted-type"
                      @change="billTypePage.dialog.billType.parentId = null"
                    />
                  </v-col>
                  <v-col class="pl-1" cols="6">
                    <v-select
                      v-model="billTypePage.dialog.billType.parentId"
                      :items="
                        billTypePage.dialog.billType.flow === 'OUT'
                          ? billTypePage.outBillTypeList
                          : billTypePage.dialog.billType.flow === 'IN'
                          ? billTypePage.inBillTypeList
                          : []
                      "
                      :rules="[
                        (value) => value === 0 || !!value || '请选择父账单类别',
                      ]"
                      item-text="billTypeName"
                      item-value="id"
                      label="父账单类别"
                      no-data-text="请先选择类别类型"
                      prepend-inner-icon="mdi-account-arrow-up"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="rounded-lg"
                depressed
                @click="billTypePage.dialog.isShow = false"
                v-text="'取消'"
              />
              <v-btn
                :disabled="billTypePage.dialog.btn.loading"
                :loading="billTypePage.dialog.btn.loading"
                class="rounded-lg"
                color="primary"
                depressed
                @click="saveOrUpdateBillTpe"
                v-text="'保存'"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
      <v-dialog
        v-model="billTypePage.removeDialog.isShow"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-card-title>
            <span v-text="'删除账单类别'" />
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-icon color="error">mdi-alert-circle</v-icon>
                <span class="ml-2">确定要删除该账单类别吗？</span>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="rounded-lg"
              depressed
              @click="billTypePage.removeDialog.isShow = false"
              v-text="'取消'"
            />
            <v-btn
              :disabled="billTypePage.removeDialog.btn.loading"
              :loading="billTypePage.removeDialog.btn.loading"
              color="primary rounded-lg"
              depressed
              @click="removeBillType"
              v-text="'确定'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="billTypePage.iconDialog.isShow"
        max-width="600px"
        scrollable
      >
        <v-card class="rounded-lg">
          <v-card-title>
            <span v-text="'图标库'" />
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="item in icons.billType"
                :key="item"
                class="d-flex justify-center"
                cols="2"
                @click="
                  billTypePage.dialog.billType.icon = item;
                  billTypePage.iconDialog.isShow = false;
                "
              >
                <v-btn class="rounded-lg" depressed fab x-small>
                  <v-icon>mdi-{{ item }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="rounded-lg"
              depressed
              @click="billTypePage.iconDialog.isShow = false"
              v-text="'取消'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="billTypePage.orderDialog.isShow"
        max-width="600px"
        scrollable
      >
        <v-card class="rounded-lg">
          <v-card-title>
            <span v-text="'账单类别排序'" />
          </v-card-title>
          <v-card-text class="pb-0">
            <draggable
              :list="billTypePage.orderDialog.billTypeList"
              handle="#handle"
              tag="div"
              v-bind="dragOptions"
            >
              <transition-group type="transition">
                <v-row
                  v-for="item in billTypePage.orderDialog.billTypeList"
                  :key="item.id"
                  align="center"
                  class="rounded-lg mb-1 px-2 py-1"
                  no-gutters
                >
                  <v-col cols="2">
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
                      <v-icon v-if="item.icon">mdi-{{ item.icon }}</v-icon>
                      <v-icon v-else>mdi-help</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <span class="text-subtitle-2">{{ item.billTypeName }}</span>
                  </v-col>
                  <v-col class="d-flex justify-end" cols="2">
                    <v-icon id="handle">mdi-format-list-bulleted</v-icon>
                  </v-col>
                </v-row>
              </transition-group>
            </draggable>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="rounded-lg"
              depressed
              @click="billTypePage.orderDialog.isShow = false"
              v-text="'取消'"
            />
            <v-btn
              class="rounded-lg"
              color="primary"
              depressed
              :disabled="billTypePage.orderDialog.btn.loading"
              :loading="billTypePage.orderDialog.btn.loading"
              @click="updateBillTypeOrder"
              v-text="'保存'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
    <v-form ref="feedbackForm">
      <v-dialog
        v-model="feedbackPage.isShow"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card :style="{ backgroundColor: isDark ? '#000000' : '#F1F2F6' }">
          <v-toolbar
            class="mb-16"
            color="primary"
            dark
            style="border-radius: 0"
          >
            <v-btn dark icon @click="feedbackPage.isShow = false">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>提交反馈</v-toolbar-title>
          </v-toolbar>
          <v-container
            :style="{ width: isMobile ? '100%' : '50%' }"
            class="mx-auto px-4 py-0"
            fluid
            no-gutters
          >
            <v-card class="pa-4 rounded-lg" flat>
              <v-row align="center" no-gutters>
                <v-col cols="12">
                  <v-select
                    v-model="feedbackPage.feedback.type"
                    :items="enums.feedbackType"
                    :rules="[(value) => !!value || '请选择反馈类型']"
                    label="反馈类型"
                    no-data-text="无对应选项"
                    prepend-inner-icon="mdi-format-list-bulleted-type"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="feedbackPage.feedback.description"
                    :rules="[(value) => !!value || '请填写反馈类型']"
                    auto-grow
                    clearable
                    counter
                    label="反馈描述"
                    prepend-inner-icon="mdi-comment"
                    rows="3"
                  />
                </v-col>
                <v-col
                  class="text--darken-1 grey--text mb-3 d-flex align-center"
                  cols="12"
                  style="height: 32px"
                >
                  <v-icon
                    :color="feedbackPage.feedback.imagePath ? 'primary' : ''"
                    class="pr-1 mt-1"
                    >mdi-file-image
                  </v-icon>
                  <span>反馈图片</span>
                </v-col>
                <v-col class="d-flex justify-center" cols="12">
                  <image-uploader
                    :image-path="feedbackPage.feedback.imagePath"
                    @setImagePath="
                      (imagePath) => {
                        feedbackPage.feedback.imagePath = imagePath;
                      }
                    "
                  />
                </v-col>
              </v-row>
            </v-card>
            <v-row class="mt-4" no-gutters>
              <v-btn
                :disabled="feedbackPage.loading"
                :loading="feedbackPage.loading"
                block
                class="rounded-lg"
                color="primary"
                depressed
                large
                @click="saveFeedback"
              >
                <v-icon class="mr-3">mdi-logout</v-icon>
                <span>提交反馈</span>
              </v-btn>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-form>
    <v-row v-if="isAdmin && !isMobile" class="mb-4" no-gutters>
      <v-btn
        class="rounded-lg"
        color="primary"
        large
        block
        depressed
        to="/admin"
      >
        <v-icon class="mr-3">mdi-monitor-dashboard</v-icon>
        <span>前往后台</span>
      </v-btn>
    </v-row>
    <v-row no-gutters>
      <v-btn
        class="rounded-lg"
        color="error"
        large
        depressed
        block
        @click="signOut"
      >
        <v-icon class="mr-3">mdi-logout</v-icon>
        <span>安全退出</span>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Avatar from "@/components/Avatar";
import ImageUploader from "@/components/ImageUploader";
import BackgroundImage from "@/pages/Index/components/BackgroundImage";
import TitleBar from "@/pages/Index/components/TitleBar";
import draggable from "vuedraggable";

export default {
  name: "Mine",
  components: { TitleBar, ImageUploader, Avatar, BackgroundImage, draggable },
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
    isAdmin: function () {
      if (!this.userInfoPage.userInfo.roleVOList) return false;
      for (let item of this.userInfoPage.userInfo.roleVOList) {
        if (item.roleName === "管理员" || item.roleName === "测试用户") {
          return true;
        }
      }
      return false;
    },
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode;
      let config = this.$store.getters.getConfig;
      if (config) {
        config.dark = this.darkMode;
      } else {
        config = {
          dark: this.darkMode,
        };
      }
      this.$store.commit("setConfig", config);
    },
  },
  data: function () {
    return {
      backgroundImagePath: this.GLOBAL.images.profile,
      title: "我的",
      userInfoPage: {
        isShow: false,
        dialog: {
          title: null,
          isShow: false,
          loading: false,
          type: null,
          userInfo: {
            id: null,
            username: null,
            avatarPath: null,
            password: null,
            email: null,
            phoneNumber: null,
            verificationCode: null,
          },
          verificationCodeBtn: {
            loading: false,
            disabled: false,
          },
        },
        userInfo: {
          username: null,
          avatarPath: null,
          email: null,
          phoneNumber: null,
          status: null,
          roleVOList: [],
        },
      },
      feedbackPage: {
        isShow: false,
        loading: false,
        feedback: {
          imagePath: null,
          type: null,
          description: null,
          userId: null,
        },
      },
      billTypePage: {
        isShow: false,
        loading: false,
        billTypeTree: [],
        outBillTypeList: [],
        inBillTypeList: [],
        iconDialog: {
          isShow: false,
        },
        orderDialog: {
          isShow: false,
          btn: {
            loading: false,
          },
          billTypeList: [
            {
              id: null,
              parentId: null,
              weight: null,
              billTypeName: null,
              icon: null,
              flow: null,
              version: null,
            },
          ],
        },
        removeDialog: {
          isShow: false,
          billType: {
            id: null,
          },
          btn: {
            loading: false,
          },
        },
        dialog: {
          isShow: false,
          title: null,
          type: null,
          userId: null,
          billType: {
            parentId: null,
            weight: null,
            billTypeName: null,
            icon: null,
            flow: null,
            userId: null,
          },
          btn: {
            loading: false,
          },
        },
      },
      darkMode: this.$vuetify.theme.dark,
      enums: this.GLOBAL.enums,
      rules: this.GLOBAL.rules,
      icons: this.GLOBAL.icons,
      userInfo: this.$store.getters.getUserInfo,
    };
  },
  methods: {
    loadUserInfo() {
      let _this = this;
      this.axios.get("/user/getUserInfo").then((response) => {
        _this.$store.commit("setUserInfo", response.data.data);
        this.userInfoPage.userInfo = response.data.data;
      });
    },
    loadUserInfoDialog(title, type) {
      this.$refs.updateUserInfoForm.resetValidation();
      this.userInfoPage.dialog.title = title;
      this.userInfoPage.dialog.type = type;
      this.userInfoPage.dialog.isShow = true;
      this.userInfoPage.dialog.userInfo = JSON.parse(
        JSON.stringify(this.userInfoPage.userInfo)
      );
      this.userInfoPage.dialog.verificationCodeBtn.disabled = false;
    },
    updateUserInfo() {
      if (!this.$refs.updateUserInfoForm.validate()) {
        return;
      }
      if (this.userInfoPage.dialog.type === "cancelUser") {
        this.axios
          .delete("/user/cancelUser")
          .then(() => {
            this.$notify({
              title: "注销成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.userInfoPage.dialog.isShow = false;
            this.$router.push({ name: "SignIn" });
          })
          .finally(() => {
            this.userInfoPage.dialog.loading = false;
          });
        return;
      }
      let user;
      if (this.userInfoPage.dialog.type === "avatar") {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          avatarPath: this.userInfoPage.dialog.userInfo.avatarPath,
        };
      }
      if (this.userInfoPage.dialog.type === "username") {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          username: this.userInfoPage.dialog.userInfo.username,
        };
      }
      if (this.userInfoPage.dialog.type === "password") {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          password: this.userInfoPage.dialog.userInfo.password,
        };
      }
      if (this.userInfoPage.dialog.type === "phoneNumber") {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          phoneNumber: this.userInfoPage.dialog.userInfo.phoneNumber,
          verificationCode: this.userInfoPage.dialog.userInfo.verificationCode,
        };
      }
      if (this.userInfoPage.dialog.type === "email") {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          email: this.userInfoPage.dialog.userInfo.email,
          verificationCode: this.userInfoPage.dialog.userInfo.verificationCode,
        };
      }
      this.userInfoPage.dialog.loading = true;
      this.axios
        .put("/user/updateUserInfo", user)
        .then(() => {
          this.$notify({
            title: "保存成功",
            message: null,
            type: "success",
            duration: 2000,
          });
          this.loadUserInfo();
          this.userInfoPage.dialog.isShow = false;
        })
        .finally(() => {
          this.userInfoPage.dialog.loading = false;
        });
    },
    loadFeedbackPage() {
      this.$refs.feedbackForm.resetValidation();
      this.feedbackPage.feedback = {};
      this.feedbackPage.isShow = true;
    },
    saveFeedback() {
      if (!this.$refs.feedbackForm.validate()) return;
      this.feedbackPage.feedback.userId = this.userInfo.id;
      this.feedbackPage.feedback.status = "CREATED";
      this.feedbackPage.loading = true;
      this.axios
        .post("/feedback/saveFeedback", this.feedbackPage.feedback)
        .then(() => {
          this.$notify({
            title: "保存成功",
            message: null,
            type: "success",
            duration: 2000,
          });
          this.feedbackPage.isShow = false;
        })
        .finally(() => {
          this.feedbackPage.loading = false;
        });
    },
    loadBillTypeSaveDialog() {
      this.$refs.billTypeForm.resetValidation();
      let dialog = this.billTypePage.dialog;
      dialog.isShow = true;
      dialog.type = "save";
      dialog.title = "新增账单类别";
      dialog.billType = {};
    },
    loadBillTypeUpdateDialog(billType) {
      this.$refs.billTypeForm.resetValidation();
      let dialog = this.billTypePage.dialog;
      dialog.isShow = true;
      dialog.type = "update";
      dialog.title = "修改账单类别";
      dialog.billType = JSON.parse(JSON.stringify(billType));
    },
    saveOrUpdateBillTpe() {
      if (!this.$refs.billTypeForm.validate()) {
        return;
      }
      this.billTypePage.dialog.billType.userId = this.userInfo.id;
      if (this.billTypePage.dialog.type === "update") {
        this.billTypePage.dialog.btn.loading = true;
        this.axios
          .put("/billType/updateBillType", this.billTypePage.dialog.billType)
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.loadBillTypeTree();
            this.loadBillTypeList();
            this.billTypePage.dialog.isShow = false;
          })
          .finally(() => {
            this.billTypePage.dialog.btn.loading = false;
          });
      } else if (this.billTypePage.dialog.type === "save") {
        this.billTypePage.dialog.loading = true;
        this.billTypePage.dialog.billType.weight = 0;
        this.axios
          .post("/billType/saveBillType", this.billTypePage.dialog.billType)
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.loadBillTypeTree();
            this.loadBillTypeList();
            this.billTypePage.dialog.isShow = false;
          })
          .finally(() => {
            this.billTypePage.dialog.btn.loading = false;
          });
      }
    },
    removeBillType() {
      this.billTypePage.removeDialog.btn.loading = true;
      this.axios
        .delete(
          "/billType/removeBillType/" +
            this.billTypePage.removeDialog.billType.id
        )
        .then(() => {
          this.$notify({
            title: "删除成功",
            message: null,
            type: "success",
            duration: 2000,
          });
          this.loadBillTypeTree();
          this.loadBillTypeList();
          this.billTypePage.removeDialog.isShow = false;
        })
        .finally(() => {
          this.billTypePage.removeDialog.btn.loading = false;
        });
    },
    loadBillTypeTree() {
      this.axios.get("/billType/listUserBillTypeTree").then((response) => {
        this.billTypePage.billTypeTree = response.data.data;
      });
    },
    loadBillTypeList() {
      let billType = {
        parentId: 0,
      };
      this.axios.post("/billType/listBillType", billType).then((response) => {
        this.billTypePage.outBillTypeList = [];
        this.billTypePage.outBillTypeList.push({
          id: 0,
          billTypeName: "根类别",
        });
        this.billTypePage.inBillTypeList = [];
        this.billTypePage.inBillTypeList.push({
          id: 0,
          billTypeName: "根类别",
        });
        for (let item of response.data.data) {
          if (item.flow === "OUT") {
            this.billTypePage.outBillTypeList.push({
              id: item.id,
              billTypeName: item.billTypeName,
            });
          } else if (item.flow === "IN") {
            this.billTypePage.inBillTypeList.push({
              id: item.id,
              billTypeName: item.billTypeName,
            });
          }
        }
      });
    },
    loadBillTypeOrderDialog(billTypeList) {
      this.billTypePage.orderDialog.billTypeList = JSON.parse(
        JSON.stringify(billTypeList)
      );
      this.billTypePage.orderDialog.isShow = true;
    },
    updateBillTypeOrder() {
      this.billTypePage.orderDialog.btn.loading = true;
      let list = [];
      let weight = 1;
      for (let item of this.billTypePage.orderDialog.billTypeList) {
        list.push({ id: item.id, weight: weight, version: item.version });
        weight = weight + 1;
      }
      this.axios
        .put("/billType/orderBillType", list)
        .then(() => {
          this.$notify({
            title: "保存成功",
            message: null,
            type: "success",
            duration: 2000,
          });
          this.billTypePage.orderDialog.isShow = false;
          this.loadBillTypeTree();
          this.loadBillTypeList();
        })
        .finally(() => {
          this.billTypePage.orderDialog.btn.loading = false;
        });
    },
    getImageUrl(imagePath) {
      if (imagePath != null) {
        return this.GLOBAL.url.static + "/" + imagePath;
      }
    },
    sendVerificationCode(type, code) {
      if (type === "phoneNumber") {
        if (!this.$refs.phoneNumberTextField.validate(true)) return;
        this.userInfoPage.dialog.verificationCodeBtn.loading = true;
        this.userInfoPage.dialog.verificationCodeBtn.disabled = true;
        this.axios
          .get("/user/sendVerificationCode?phoneNumber=" + code)
          .then(() => {
            this.$notify({
              title: "已发送验证码",
              message: null,
              type: "success",
              duration: 2000,
            });
          })
          .finally(() => {
            this.userInfoPage.dialog.verificationCodeBtn.loading = false;
          });
      } else if (type === "email") {
        if (!this.$refs.emailTextField.validate(true)) return;
        this.userInfoPage.dialog.verificationCodeBtn.loading = true;
        this.userInfoPage.dialog.verificationCodeBtn.disabled = true;
        this.axios
          .get("/user/sendVerificationCode?email=" + code)
          .then(() => {
            this.$notify({
              title: "已发送验证码",
              message: null,
              type: "success",
              duration: 2000,
            });
          })
          .finally(() => {
            this.userInfoPage.dialog.verificationCodeBtn.loading = false;
          });
      }
    },
    signOut() {
      this.$notify({
        title: "退出成功",
        message: null,
        type: "success",
        duration: 2000,
      });
      this.$store.commit("clean");
      this.$router.push({ name: "SignIn" });
    },
    getStatusText() {
      for (let item of this.enums.userStatus) {
        if (item.value === this.userInfoPage.userInfo.status) {
          return item.text;
        }
      }
    },
  },
  mounted() {
    this.userInfoPage.userInfo = this.$store.getters.getUserInfo;
    this.$emit("changeTitle", this.title);
    this.loadBillTypeTree();
    this.loadBillTypeList();
  },
};
</script>

<style lang="scss">
.ghost {
  opacity: 0.5;
  background: #f1f2f6;
}
</style>