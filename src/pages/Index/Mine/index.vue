<template>
  <v-container class="pa-0" fluid>
    <title-bar :title="title"/>
    <background-image :src="backgroundImagePath"/>
    <v-card :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
            :style="{ width: isMobile ? '90%' : '50%' ,cursor:'pointer'}"
            class="transition-swing mb-5 pa-0 rounded-lg"
            flat
            fluid
            @click.native="userInfoPage.isShow = true"
    >
      <v-row v-ripple align="center" class="py-3 px-3" justify="space-between" no-gutters>
        <v-col cols="2">
          <avatar :path="userInfoPage.userInfo.avatarPath" size="50"/>
        </v-col>
        <v-col class="pl-3" cols="9">
          <v-row class="text-h6" no-gutters v-text="userInfoPage.userInfo.username"/>
          <v-row class="text-subtitle-2 grey--text text--darken-1 font-weight-regular" no-gutters v-text="'邮箱，手机号，密码'"/>
        </v-col>
        <v-col cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
        v-model="userInfoPage.isShow"
        fullscreen
        hide-overlay
        style="height: 100vh"
        :style="{backgroundColor: isDark?'#000000':'#F1F2F6'}"
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
              @click="userInfoPage.isShow = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>用户信息</v-toolbar-title>
        </v-toolbar>
        <v-row :style="{ width: isMobile ? '90%' : '50%' }"
               justify="center"
               class="mx-auto"
               no-gutters>
          <avatar :path="userInfoPage.userInfo.avatarPath"
                  size="100" style="cursor: pointer;z-index: 10" @click.native="loadUserInfoDialog('修改头像','avatar')"/>
        </v-row>
        <v-card
            :style="{ width: isMobile ? '90%' : '50%' }"
            class="transition-swing pa-0 rounded-lg mx-auto"
            flat
            fluid
            style="margin-top: -50px"
        >
          <v-row align="center" class="px-3" no-gutters style="height: 50px"/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px"
                 @click="loadUserInfoDialog('修改用户名','username')">
            <v-col cols="1">
              <v-icon>mdi-account</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1" v-text="'用户名：'"/>
              <span v-text="userInfoPage.userInfo.username"/>
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px"
                 @click="loadUserInfoDialog('修改密码','password')">
            <v-col cols="1">
              <v-icon>mdi-account-key</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1" v-text="'密码：********'"/>
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px"
                 @click="loadUserInfoDialog('修改手机号','phoneNumber')">
            <v-col cols="1">
              <v-icon>mdi-cellphone-text</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1" v-text="'手机号：'"/>
              <span v-text="userInfoPage.userInfo.phoneNumber"/>
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px"
                 @click="loadUserInfoDialog('修改邮箱','email')">
            <v-col cols="1">
              <v-icon>mdi-email</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1" v-text="'邮箱：'"/>
              <span v-text="userInfoPage.userInfo.email"/>
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-list-status</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1" v-text="'状态：'"/>
              <v-chip :color="userInfoPage.userInfo.status==='NORMAL'?'success':'secondary'" class="mx-1" label
                      v-text="getStatusText()">
              </v-chip>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-clipboard-account-outline</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1" v-text="'角色：'"/>
              <v-chip v-for="item in userInfoPage.userInfo.roleVoList"
                      :key="item.id" class="mx-1" label
                      v-text="item.roleName">
              </v-chip>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row align="center" justify="center" no-gutters style="height: 60px">
            <v-btn
                class="rounded-lg"
                color="error"
                large
                depressed
                style="width: 70%"
                @click="loadUserInfoDialog('注销账号','cancelUser')"
            >
              <v-icon class="mr-3">mdi-logout</v-icon>
              注销账号
            </v-btn>
          </v-row>
        </v-card>
        <v-dialog v-model="userInfoPage.dialog.isShow" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5" v-text="userInfoPage.dialog.title"/>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-form ref="updateAccountForm">
                <v-container v-if="userInfoPage.dialog.type==='avatar'">
                  <v-row no-gutters>
                    <v-col class="d-flex justify-center" cols="12">
                      <image-uploader :image-path="userInfoPage.dialog.userInfo.avatarPath" size="120"
                                      border-radius="50%"
                                      @setImagePath="(imagePath)=>{userInfoPage.dialog.userInfo.avatarPath = imagePath}"/>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-if="userInfoPage.dialog.type==='username'">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                          v-model="userInfoPage.dialog.userInfo.username"
                          :counter="rules.usernameMaxLength"
                          :rules="[rules.isUsername]" clearable
                          label="新用户名" prepend-inner-icon="mdi-account"/>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-if="userInfoPage.dialog.type==='password'">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field v-model="userInfoPage.dialog.userInfo.password" :counter="rules.passwordMaxLength"
                                    :rules="[rules.isPassword]"
                                    prepend-inner-icon="mdi-account-key"
                                    clearable label="新密码" type="password"/>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          :counter="rules.passwordMaxLength"
                          prepend-inner-icon="mdi-account-key"
                          :rules="[value=>value===userInfoPage.dialog.userInfo.password||'两次输入的密码不一致']"
                          clearable
                          label="密码确认"
                          type="password"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-if="userInfoPage.dialog.type==='phoneNumber'">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                          ref="phoneNumberTextField"
                          prepend-inner-icon="mdi-cellphone-text"
                          v-model="userInfoPage.dialog.userInfo.phoneNumber"
                          :counter="11"
                          :rules="[(value) => !!value || '请输入手机号',rules.isphoneNumber]"
                          clearable
                          label="新手机号"
                      >
                        <template v-slot:append-outer>
                          <v-btn
                              :disabled="userInfoPage.dialog.verificationCodeBtn.disabled"
                              :loading="userInfoPage.dialog.verificationCodeBtn.loading"
                              depressed
                              small
                              @click="sendVerificationCode('phoneNumber',userInfoPage.dialog.userInfo.phoneNumber)"
                              v-text="'获取验证码'"
                          />
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" no-gutters>
                      <v-otp-input
                          v-model="userInfoPage.dialog.userInfo.verificationCode"
                          :rules="[(value) => !!value || '请输入验证码', rules.isInteger]"
                          length="6"
                          plain
                          type="number"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-if="userInfoPage.dialog.type==='email'">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                          ref="emailTextField"
                          prepend-inner-icon="mdi-email"
                          v-model="userInfoPage.dialog.userInfo.email"
                          :rules="[(value) => !!value || '请输入邮箱',rules.isEmail]"
                          clearable
                          label="新邮箱"
                      >
                        <template v-slot:append-outer>
                          <v-btn
                              :disabled="userInfoPage.dialog.verificationCodeBtn.disabled"
                              :loading="userInfoPage.dialog.verificationCodeBtn.loading"
                              depressed
                              small
                              @click="sendVerificationCode('email',userInfoPage.dialog.userInfo.email)"
                              v-text="'获取验证码'"
                          />
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" no-gutters>
                      <v-otp-input
                          v-model="userInfoPage.dialog.userInfo.verificationCode"
                          :rules="[(value) => !!value || '请输入验证码', rules.isInteger]"
                          length="6"
                          plain
                          type="number"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-if="userInfoPage.dialog.type==='cancelUser'">
                  <v-row no-gutters>
                    <span class="red--text">确定要注销该账号吗？</span>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="grey darken-1" dark depressed
                     @click="userInfoPage.dialog.isShow = false" v-text="'取消'"/>
              <v-btn
                  :disabled="userInfoPage.dialog.loading" :loading="userInfoPage.dialog.loading" color="primary"
                  depressed @click="updateAccount" v-text="'保存'"/>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-dialog>
    <v-card :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
            :style="{ width: isMobile ? '90%' : '50%' }"
            class="transition-swing mb-5 pa-0 rounded-lg"
            flat
            fluid
    >
      <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
        <v-col cols="1">
          <v-icon>mdi-brightness-4</v-icon>
        </v-col>
        <v-col class="ml-2">
          <span>深色模式</span>
        </v-col>
        <v-col cols="2">
          <el-switch
              v-model="darkMode"
              active-color="#13ce66"
              inactive-color="#757575"
              @change="changeDarkMode">
          </el-switch>
        </v-col>
      </v-row>
      <v-divider/>
      <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px;cursor: pointer">
        <v-col cols="1">
          <v-icon>mdi-notebook-multiple</v-icon>
        </v-col>
        <v-col class="ml-2">
          <span>账单类别</span>
        </v-col>
        <v-col cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
      <v-divider/>
      <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px;cursor: pointer" @click="">
        <v-col cols="1">
          <v-icon>mdi-message-alert</v-icon>
        </v-col>
        <v-col class="ml-2" @click="feedbackPage.isShow = true">
          <span>提交反馈</span>
        </v-col>
        <v-col cols="1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
        v-model="feedbackPage.isShow"
        fullscreen
        hide-overlay
        style="height: 100vh"
        transition="dialog-bottom-transition"
    >
      <v-card :style="{backgroundColor: isDark?'#000000':'#F1F2F6'}" class="pa-0">
        <v-toolbar
            class="mb-16"
            color="primary"
            dark
            style="border-radius: 0"
        >
          <v-btn
              dark
              icon
              @click="feedbackPage.isShow = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>提交反馈</v-toolbar-title>
        </v-toolbar>
        <v-card :style="{ width: isMobile ? '90%' : '50%' }" class="transition-swing mb-5 pa-5 rounded-lg mx-auto"
                flat
                fluid
        >
          <v-row no-gutters>
            <v-col cols="12">
              <v-select
                  v-model="feedbackPage.feedback.type" :items="enums.feedbackType"
                  label="反馈类型"
                  prepend-inner-icon="mdi-format-list-bulleted-type"/>
            </v-col>
            <v-col cols="12">
              <v-textarea
                  v-model="feedbackPage.feedback.description"
                  auto-grow
                  clearable
                  counter
                  label="反馈描述"
                  prepend-inner-icon="mdi-comment"
                  rows="3"
              />
            </v-col>
            <v-col class="text--darken-1 grey--text mb-2" cols="12">
              <v-icon class="mr-1">mdi-file-image</v-icon>
              <span>反馈图片</span>
            </v-col>
            <v-col class="d-flex justify-center" cols="12">
              <image-uploader :image-path="feedbackPage.feedback.imagePath"
                              @setImagePath="(imagePath)=>{feedbackPage.feedback.imagePath = imagePath}"/>
            </v-col>
          </v-row>
          <v-row class="mt-10" no-gutters>
            <v-btn
                :disabled="feedbackPage.loading"
                :loading="feedbackPage.loading"
                class="rounded-lg"
                color="primary"
                depressed
                large
                style="width: 100%"
                @click="saveFeedback"
            >
              <v-icon class="mr-3">mdi-logout</v-icon>
              提交反馈
            </v-btn>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
    <v-row v-if="isAdmin"
           class="mb-5"
           no-gutters>
      <v-btn
          :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
          :style="{ width: isMobile ? '90%' : '50%' }"
          class="ma-auto rounded-lg"
          color="primary"
          large
          depressed
          to="/admin"
      >
        <v-icon class="mr-3">mdi-monitor-dashboard</v-icon>
        <span>前往后台</span>
      </v-btn>
    </v-row>
    <v-row class="my-3" no-gutters>
      <v-btn
          :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
          :style="{ width: isMobile ? '90%' : '50%' }"
          class="ma-auto rounded-lg"
          color="error"
          large
          depressed
          style="width: 90%"
          @click="signOut"
      >
        <v-icon class="mr-3">mdi-logout</v-icon>
        <span>退出登录</span>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Avatar from '@/components/Avatar'
import ImageUploader from '@/components/ImageUploader'
import BackgroundImage from '@/pages/Index/components/BackgroundImage'
import TitleBar from "@/pages/Index/components/TitleBar";

export default {
  name: "Mine",
  components: {TitleBar, ImageUploader, Avatar, BackgroundImage},
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
            disabled: false
          }
        },
        userInfo: {
          username: null,
          avatarPath: null,
          email: null,
          phoneNumber: null,
          status: null,
          roleVoList: []
        },
      },
      feedbackPage: {
        isShow: false,
        loading: false,
        feedback: {
          imagePath: null,
          type: null,
          description: null
        },
      },

      darkMode: this.$vuetify.theme.dark,
      classes: {},
      roleMap: [],
      enums: this.GLOBAL.enums,
      rules: this.GLOBAL.rules
    };
  },
  methods: {
    changeDarkMode(darkMode) {
      this.$vuetify.theme.dark = darkMode;
    },
    updateAccount() {
      if (!this.$refs.updateAccountForm.validate()) {
        return;
      }
      if (this.userInfoPage.dialog.type === 'cancelUser') {
        this.axios.delete("/user/cancelUser")
            .then(() => {
              this.$notify({
                title: "注销成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.userInfoPage.dialog.isShow = false;
              this.$router.push({name: "SignIn"});
            })
            .finally(() => {
              this.userInfoPage.dialog.loading = false;
            });
        return;
      }
      let user;
      if (this.userInfoPage.dialog.type === 'avatar') {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          avatarPath: this.userInfoPage.dialog.userInfo.avatarPath
        }
      }
      if (this.userInfoPage.dialog.type === 'username') {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          username: this.userInfoPage.dialog.userInfo.username
        }
      }
      if (this.userInfoPage.dialog.type === 'password') {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          password: this.userInfoPage.dialog.userInfo.password
        }
      }
      if (this.userInfoPage.dialog.type === 'phoneNumber') {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          phoneNumber: this.userInfoPage.dialog.userInfo.phoneNumber,
          verificationCode: this.userInfoPage.dialog.userInfo.verificationCode
        }
      }
      if (this.userInfoPage.dialog.type === 'email') {
        user = {
          id: this.userInfoPage.dialog.userInfo.id,
          email: this.userInfoPage.dialog.userInfo.email,
          verificationCode: this.userInfoPage.dialog.userInfo.verificationCode
        }
      }
      this.userInfoPage.dialog.loading = true;
      this.axios.put("/user/updateAccount", JSON.stringify(user))
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
    signOut() {
      this.$notify({
        title: "退出成功",
        message: null,
        type: "success",
        duration: 2000,
      });
      this.$store.commit("clean");
      this.$router.push({name: "SignIn"});
    },
    getStatusText() {
      for (let item of this.enums.userStatus) {
        if (item.value === this.userInfoPage.userInfo.status) {
          return item.text;
        }
      }
    },
    roleNameFormatter(roleId) {
      for (let item of this.roleMap) {
        if (item.id === roleId) {
          return item.roleName;
        }
      }
    },
    isAdmin() {
      if (!this.userInfoPage.userInfo.roleVoList) return false;
      for (let item of this.userInfoPage.userInfo.roleVoList) {
        if (item.id === 1) {
          return true;
        }
      }
      return false;
    },
    saveFeedback() {
      this.feedbackPage.loading = true;
      this.axios.post("/feedback/saveFeedback", JSON.stringify(this.feedbackPage.feedback))
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.feedbackPage.feedback.imagePath = null;
            this.feedbackPage.feedback.type = null;
            this.feedbackPage.feedback.description = null;
          })
          .finally(() => {
            this.feedbackPage.loading = false;
          });
    },
    loadUserInfoDialog(title, type) {
      this.userInfoPage.dialog.title = title;
      this.userInfoPage.dialog.type = type;
      this.userInfoPage.dialog.isShow = true;
      this.userInfoPage.dialog.verificationCodeBtn.disabled = false;
    },
    loadUserInfo() {
      let _this = this;
      this.axios.get("/user/getUserInfo").then((response) => {
        _this.$store.commit("setUserInfo", response.data.data);
        this.userInfoPage.userInfo = response.data.data;
        this.userInfoPage.dialog.userInfo = JSON.parse(JSON.stringify(response.data.data));
      });
    },
    getImageUrl(imagePath) {
      if (imagePath != null) {
        return this.GLOBAL.url.file + "/" + imagePath;
      }
    },
    sendVerificationCode(type, code) {
      if (type === 'phoneNumber') {
        if (!this.$refs.phoneNumberTextField.validate(true)) return;
        this.userInfoPage.dialog.verificationCodeBtn.loading = true;
        this.userInfoPage.dialog.verificationCodeBtn.disabled = true;
        this.axios.get("/user/sendVerificationCode?phoneNumber=" + code).then(() => {
          this.$notify({
            title: "已发送验证码",
            message: null,
            type: "success",
            duration: 2000,
          });
        }).finally(() => {
          this.userInfoPage.dialog.verificationCodeBtn.loading = false;
        });
      } else if (type === 'email') {
        if (!this.$refs.emailTextField.validate(true)) return;
        this.userInfoPage.dialog.verificationCodeBtn.loading = true;
        this.userInfoPage.dialog.verificationCodeBtn.disabled = true;
        this.axios.get("/user/sendVerificationCode?email=" + code).then(() => {
          this.$notify({
            title: "已发送验证码",
            message: null,
            type: "success",
            duration: 2000,
          });
        }).finally(() => {
          this.userInfoPage.dialog.verificationCodeBtn.loading = false;
        });
      }
    },
  },
  mounted() {
    this.userInfoPage.userInfo = this.$store.getters.getUserInfo;
    this.userInfoPage.dialog.userInfo = JSON.parse(JSON.stringify(this.$store.getters.getUserInfo));
  }
};
</script>

<style lang="scss">

</style>