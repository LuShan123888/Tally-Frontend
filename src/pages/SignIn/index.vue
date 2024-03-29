<template>
  <v-container class="py-0 px-4" fluid>
    <app-bar/>
    <v-row no-gutters style="margin-top: 56px">
      <title-bar :title="title"/>
    </v-row>
    <background-image :src="backgroundImagePath"/>
    <dark-button id="dark-button" :style="styles.darkButton"/>
    <v-hover v-slot="{ hover }">
      <v-container :class="{'elevation-24':hover,'elevation-0':!hover}" :style="{ width: isMobile ? '100%' : '30%' }"
                   class="mx-auto transition-swing pa-0 rounded-lg" fluid>
        <v-tabs v-model="tab" class="rounded-t-lg" grow>
          <v-tab class="leftTab">
            <v-icon>mdi-form-textbox-password</v-icon>
            <span v-if="!isMobile" class="ml-3">账号密码登录</span></v-tab>
          <v-tab class="rightTab">
            <v-icon>mdi-cellphone-message</v-icon>
            <span v-if="!isMobile" class="ml-3">验证码登录</span></v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="rounded-b-lg">
          <v-tab-item>
            <v-row class="pa-10" justify="center" no-gutters>
              <v-col cols="12">
                <v-form ref="passwordForm">
                  <v-row no-gutters>
                    <v-text-field v-model="form.password.username" :rules="[(value) => !!value || '请输入用户名或邮箱']"
                                  clearable label="用户名/邮箱"/>
                  </v-row>
                  <v-row justify="center" no-gutters>
                    <v-text-field v-model="form.password.password"
                                  :append-icon="form.password.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  :rules="[rules.isPassword]"
                                  :type="form.password.showPassword ? 'text' : 'password'" clearable
                                  counter label="密码" s
                                  @click:append="form.password.showPassword = !form.password.showPassword"/>
                  </v-row>
                  <v-row justify="space-between" no-gutters>
                    <v-col class="d-flex align-end" cols="4">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="mr-1 rounded-lg" color="primary" depressed fab small to="/signUp" v-bind="attrs"
                                 v-on="on">
                            <v-icon>mdi-account-multiple-plus</v-icon>
                          </v-btn>
                        </template>
                        <span>注册账号</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="mx-1 rounded-lg" color="error" depressed fab small to="/forgot" v-bind="attrs"
                                 @click="submitForm" v-on="on">
                            <v-icon>mdi-lock-alert</v-icon>
                          </v-btn>
                        </template>
                        <span>找回账号</span>
                      </v-tooltip>
                    </v-col>
                    <v-col class="d-flex justify-end" cols="5">
                      <v-btn :disabled="form.password.loading" :loading="form.password.loading" block
                             class="mt-4 rounded-lg" color="primary" depressed large @click="submitForm('password')"
                             v-text="'登录'"/>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row class="pa-10" justify="center" no-gutters>
              <v-col cols="12">
                <v-form ref="phoneNumberForm">
                  <v-row no-gutters>
                    <v-text-field ref="phoneNumberTextField" v-model="form.phoneNumber.phoneNumber"
                                  :rules="[(value) => !!value || '请输入手机号',rules.isPhoneNumber]" clearable counter
                                  label="手机号">
                      <template v-slot:append-outer>
                        <v-btn :disabled="form.phoneNumber.verificationCodeBtn.disabled"
                               :loading="form.phoneNumber.verificationCodeBtn.loading" depressed small
                               @click="sendVerificationCode" v-text="'获取验证码'"/>
                      </template>
                    </v-text-field>
                  </v-row>
                  <v-row no-gutters>
                    <v-otp-input v-model="form.phoneNumber.verificationCode"
                                 :rules="[(value) => !!value || '请输入验证码', rules.isInteger]" length="6" plain
                                 type="number"/>
                  </v-row>
                  <v-row justify="space-between" no-gutters>
                    <v-col class="d-flex align-end" cols="4">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="mr-1 rounded-lg" color="primary" depressed fab small to="/signUp" v-bind="attrs"
                                 v-on="on">
                            <v-icon>mdi-account-multiple-plus</v-icon>
                          </v-btn>
                        </template>
                        <span>注册账号</span></v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="mx-1 rounded-lg" color="error" depressed fab small to="/forgot" v-bind="attrs"
                                 v-on="on">
                            <v-icon> mdi-lock-alert</v-icon>
                          </v-btn>
                        </template>
                        <span>找回账号</span></v-tooltip>
                    </v-col>
                    <v-col class="d-flex justify-end" cols="5">
                      <v-btn :disabled="form.phoneNumber.loading" :loading="form.phoneNumber.loading"
                             block class="mt-4 rounded-lg" color="primary" depressed large
                             @click="submitForm('phoneNumber')" v-text="'登录'"/>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-hover>
    <i-footer/>
  </v-container>
</template>

<script>
import AppBar from "@/components/AppBar";
import TitleBar from "@/pages/Index/components/TitleBar";
import BackgroundImage from "@/pages/Index/components/BackgroundImage";
import DarkButton from "@/components/DarkButton";
import iFooter from "@/components/iFooter";

export default {
  name: "SignIn",
  components: {iFooter, AppBar, TitleBar, BackgroundImage, DarkButton},
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
      form: {
        phoneNumber: {
          loading: false,
          phoneNumber: null,
          verificationCode: null,
          verificationCodeBtn: {
            loading: false,
            disabled: false
          }
        },
        password: {
          loading: false,
          username: null,
          password: null,
          showPassword: false
        }
      },
      tab: null,
      rules: this.GLOBAL.rules,
      styles: {
        darkButton: {
          top: "70px",
          right: "10px",
          position: "fixed",
          "z-index": 100,
        },
      },
      backgroundImagePath: this.GLOBAL.images.welcome.toString(),
      title: '登录'
    };
  },
  methods: {
    sendVerificationCode() {
      if (!this.$refs.phoneNumberTextField.validate(true)) return;
      this.form.phoneNumber.verificationCodeBtn.loading = true;
      this.form.phoneNumber.verificationCodeBtn.disabled = true;
      this.axios.get("/user/sendVerificationCode?phoneNumber=" + this.form.phoneNumber.phoneNumber).then(() => {
        this.$notify({
          title: "已发送验证码",
          message: null,
          type: "success",
          duration: 2000,
        });
      }).finally(() => {
        this.form.phoneNumber.verificationCodeBtn.loading = false;
      });
    },
    submitForm(signInType) {
      let _this = this;
      let params = new URLSearchParams();
      if (signInType === "phoneNumber") {
        if (!this.$refs.phoneNumberForm.validate()) return;
        params.append("username", this.form.phoneNumber.phoneNumber);
        params.append("password", this.form.phoneNumber.verificationCode);
      } else if (signInType === "password") {
        if (!this.$refs.passwordForm.validate()) return;
        params.append("username", this.form.password.username);
        params.append("password", this.form.password.password);
      }
      this.form.phoneNumber.loading = true;
      this.form.password.loading = true;
      this.axios
          .post("/user/signIn", params)
          .then((response) => {
            this.$notify({
              title: "登录成功",
              message: "上次登录时间：" + response.data.data.lastSignInDateTime,
              type: "success",
              duration: 2000,
            });
            _this.$store.commit("setToken", response.data.data.token);
            _this.$router.push({name: "Home"});
          }).finally(() => {
        this.form.phoneNumber.loading = false;
        this.form.password.loading = false;
      });
    },
  },
};
</script>

<style lang="scss">
.leftTab {
  &:before {
    border-radius: 8px 0 0 0;
  }
}

.rightTab {
  &:before {
    border-radius: 0 8px 0 0;
  }
}
</style>