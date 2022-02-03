<template>
  <v-container fluid>
    <app-bar :isShow="true" :style="{ zIndex: '101' }"/>
    <dark-button id="dark-button" :style="styles.darkButton"/>
    <v-row no-gutters style="margin-top: 56px">
      <title-bar :title="title"/>
    </v-row>
    <background-image :src="backgroundImagePath"/>
    <v-hover v-slot="{ hover }">
      <v-container :class="{'elevation-24':hover,'elevation-2':!hover}"
                   class="mx-auto transition-swing pa-0 rounded-lg"
                   :style="{ width: isMobile ? '85%' : '30%' }"
                   fluid
      >
        <v-tabs v-model="tab" class="rounded-lg" grow>
          <v-tab>
            <v-icon>mdi-cellphone-message</v-icon>
            <span v-if="!isMobile" class="ml-3">手机号注册</span>
          </v-tab>
          <v-tab>
            <v-icon>mdi-email-plus-outline</v-icon>
            <span v-if="!isMobile" class="ml-3">邮箱注册</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="rounded-lg">
          <v-tab-item>
            <v-row class="pt-16" justify="center" no-gutters>
              <v-col cols="10">
                <v-form
                    ref="phoneNumberForm"
                    v-model="form.phoneNumber.valid"
                >
                  <v-row no-gutters>
                    <v-text-field
                        ref="phoneNumberTextField"
                        v-model="form.phoneNumber.phoneNumber"
                        :counter="11"
                        :rules="[(value) => !!value || '请输入手机号',rules.isphoneNumber]"
                        clearable
                        label="手机号"
                    >
                      <template v-slot:append-outer>
                        <v-btn
                            :disabled="form.phoneNumber.verificationCodeBtn.disabled"
                            :loading="form.phoneNumber.verificationCodeBtn.loading"
                            depressed
                            small
                            @click="sendVerificationCode('phoneNumber')"
                            v-text="'获取验证码'"
                        />
                      </template>
                    </v-text-field>
                  </v-row>
                  <v-row no-gutters>
                    <v-otp-input
                        v-model="form.phoneNumber.verificationCode"
                        :rules="[(value) => !!value || '请输入验证码', rules.isInteger]"
                        length="6"
                        plain
                        type="number"
                    />
                  </v-row>
                  <v-row justify="space-between" no-gutters>
                    <v-col class="d-flex align-center" cols="4">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              class="mx-1"
                              color="primary"
                              depressed
                              fab
                              small
                              to="/signIn"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-icon>
                              mdi-login
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>登录账号</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              class="mx-1"
                              color="error"
                              depressed
                              fab
                              small
                              to="/forgot"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-icon>
                              mdi-lock-alert
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>找回账户</span>
                      </v-tooltip>
                    </v-col>
                    <v-col class="d-flex justify-end" cols="5">
                      <v-btn
                          :disabled="form.phoneNumber.loading"
                          :loading="form.phoneNumber.loading"
                          class="my-10"
                          color="primary"
                          depressed
                          large
                          width="100%"
                          @click="submitForm('phoneNumber')"
                          v-text="'注册'"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row class="pt-16" justify="center" no-gutters>
              <v-col cols="10">
                <v-form
                    ref="passwordForm"
                    v-model="form.email.valid"
                >
                  <v-row no-gutters>
                    <v-text-field
                        ref="emailTextField"
                        v-model="form.email.email"
                        :rules="[(value) => !!value || '请输入邮箱',rules.isEmail]"
                        clearable
                        label="邮箱"
                    >
                      <template v-slot:append-outer>
                        <v-btn
                            :disabled="form.email.verificationCodeBtn.disabled"
                            :loading="form.email.verificationCodeBtn.loading"
                            depressed
                            small
                            @click="sendVerificationCode('email')"
                            v-text="'获取验证码'"
                        />
                      </template>
                    </v-text-field>
                  </v-row>
                  <v-row no-gutters>
                    <v-otp-input
                        v-model="form.email.verificationCode"
                        :rules="[(value) => !!value || '请输入验证码', rules.isInteger]"
                        length="6"
                        plain
                        type="number"
                    />
                  </v-row>
                  <v-row no-gutters>
                    <v-text-field
                        v-model="form.email.username"
                        :rules="[(value) => !!value || '请输入用户名']"
                        clearable
                        label="用户名"
                    />
                  </v-row>
                  <v-row justify="center" no-gutters>
                    <v-text-field
                        v-model="form.email.password"
                        :append-icon="form.email.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :counter="rules.passwordMaxLength"
                        :rules="[rules.isPassword]"
                        :type="form.email.showPassword ? 'text' : 'password'"
                        label="密码"
                        clearable
                        @click:append="form.email.showPassword = !form.email.showPassword"
                    />
                  </v-row>
                  <v-row justify="space-between" no-gutters>
                    <v-col class="d-flex align-center" cols="4">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              class="mx-1"
                              color="primary"
                              depressed
                              fab
                              small
                              to="/signIn"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-icon>
                              mdi-login
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>登录账号</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              class="mx-1"
                              color="error"
                              depressed
                              fab
                              small
                              to="/forgot"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-icon>
                              mdi-lock-alert
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>找回账户</span>
                      </v-tooltip>
                    </v-col>
                    <v-col class="d-flex justify-end" cols="5">
                      <v-btn
                          :disabled="form.email.loading"
                          :loading="form.email.loading"
                          class="my-10"
                          color="primary"
                          depressed
                          large
                          width="100%"
                          @click="submitForm('password')"
                          v-text="'注册'"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-hover>
  </v-container>
</template>

<script>
import AppBar from "@/pages/Index/components/AppBar";
import TitleBar from "@/pages/Index/components/TitleBar";
import BackgroundImage from "@/pages/Index/components/BackgroundImage";
import DarkButton from "@/components/DarkButton";

export default {
  name: "SignUp",
  components: {AppBar, TitleBar, BackgroundImage, DarkButton},
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
          valid: null,
          loading: false,
          phoneNumber: null,
          verificationCode: null,
          verificationCodeBtn: {
            loading: false,
            disabled: false
          }
        },
        email: {
          valid: null,
          loading: false,
          username: null,
          password: null,
          email: null,
          verificationCode: null,
          showPassword: false,
          verificationCodeBtn: {
            loading: false,
            disabled: false
          }
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
      backgroundImagePath: this.GLOBAL.images.signUp,
      title: '注册'
    };
  },
  methods: {
    sendVerificationCode(type) {
      if (type === 'phoneNumber') {
        if (!this.$refs.phoneNumberTextField.validate(true)) return;
        this.form.phoneNumber.verificationCodeBtn.loading = true;
        this.form.phoneNumber.verificationCodeBtn.disabled = true;
        this.axios.get("/account/sendVerificationCode?phoneNumber=" + this.form.phoneNumber.phoneNumber).then(() => {
          this.$notify({
            title: "已发送验证码",
            message: null,
            type: "success",
            duration: 2000,
          });
        }).finally(() => {
          this.form.phoneNumber.verificationCodeBtn.loading = false;
        });
      } else if (type === 'email') {
        if (!this.$refs.emailTextField.validate(true)) return;
        this.form.email.verificationCodeBtn.loading = true;
        this.form.email.verificationCodeBtn.disabled = true;
        this.axios.get("/account/sendVerificationCode?email=" + this.form.email.email).then(() => {
          this.$notify({
            title: "已发送验证码",
            message: null,
            type: "success",
            duration: 2000,
          });
        }).finally(() => {
          this.form.email.verificationCodeBtn.loading = false;
        });
      }
    },
    submitForm(type) {
      let _this = this;
      if (type === 'phoneNumber') {
        if (!this.$refs.phoneNumberForm.validate()) return;
        let user = {
          phoneNumber: this.form.phoneNumber.phoneNum,
          verificationCode: this.form.phoneNum.verificationCode
        };
        this.form.phoneNum.loading = true;
        this.axios.post("/account/signUp", JSON.stringify(user))
            .then(() => {
              this.$notify({
                title: "注册成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              let params = new URLSearchParams();
              params.append("username", this.form.phoneNum.phoneNum);
              params.append("password", this.form.phoneNum.verificationCode);
              this.axios
                  .post("/account/signIn", params)
                  .then((response) => {
                    this.$notify({
                      title: "登录成功",
                      message: "上次登录时间：" + response.data.data.lastSignInDateTime,
                      type: "success",
                      duration: 2000,
                    });
                    _this.$store.commit("setToken", response.data.data.token);
                    _this.$router.push({name: "Home"});
                  })
            }).finally(() => {
          this.form.phoneNum.loading = false;
        });
      } else if (type === 'password') {
        if (!this.$refs.passwordForm.validate()) return;
        let user = {
          email: this.form.email.email,
          verificationCode: this.form.email.verificationCode,
          username: this.form.email.username,
          password: this.form.email.password,
        };
        this.form.email.loading = true;
        this.axios.post("/account/signUp", JSON.stringify(user))
            .then(() => {
              this.$notify({
                title: "注册成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              let params = new URLSearchParams();
              params.append("username", this.form.email.username);
              params.append("password", this.form.email.password);
              this.axios
                  .post("/account/signIn", params)
                  .then((response) => {
                    this.$notify({
                      title: "登录成功",
                      message: "上次登录时间：" + response.data.data.lastSignInDateTime,
                      type: "success",
                      duration: 2000,
                    });
                    _this.$store.commit("setToken", response.data.data.token);
                    _this.$router.push({name: "Home"});
                  })
            }).finally(() => {
          this.form.email.loading = false;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>