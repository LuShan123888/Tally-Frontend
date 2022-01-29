<template>
  <v-container class="pa-0 ma-0" fluid>
    <v-img :src="bgImg" :style="styles.backgroundImg" contain style="position: fixed">
      <template v-slot:placeholder>
        <v-row
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
    <app-bar :isShow="true" :style="{ zIndex: '101' }"/>
    <dark-button id="dark-button" :style="styles.darkButton"/>
    <v-row align="center" class="my-16 ml-4" no-gutters>
      <v-col class="pt-4" cols="12">
        <div :style="{ color: lightPrimary }" class="text-h2" v-text="'注册'"/>
      </v-col>
    </v-row>
    <v-hover v-slot="{ hover }">
      <v-card
          class="mx-auto transition-swing"
          :style="{ width: isMobile ? '80%' : '30%' }"
          :class="{'elevation-24':hover,'elevation-6':!hover}"
      >
        <v-tabs v-model="tab" grow>
          <v-tab>
            <v-icon class="mx-4">mdi-cellphone-message</v-icon>
            <span v-if="!isMobile">手机号注册</span>
          </v-tab>
          <v-tab>
            <v-icon class="mx-4">mdi-email-plus-outline</v-icon>
            <span v-if="!isMobile">邮箱注册</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="pt-16" justify="center" no-gutters>
              <v-col cols="10">
                <v-form
                    ref="phoneNumForm"
                    v-model="form.phoneNum.valid"
                >
                  <v-row no-gutters>
                    <v-text-field
                        ref="phoneNumTextField"
                        v-model="form.phoneNum.phoneNum"
                        :counter="11"
                        :rules="[(value) => !!value || '请输入手机号',rules.isPhoneNum]"
                        clearable
                        label="手机号"
                    >
                      <template v-slot:append-outer>
                        <v-btn
                            :disabled="form.phoneNum.verificationCodeBtn.disabled"
                            :loading="form.phoneNum.verificationCodeBtn.loading"
                            depressed
                            small
                            @click="sendVerificationCode('phoneNum')"
                            v-text="'获取验证码'"
                        />
                      </template>
                    </v-text-field>
                  </v-row>
                  <v-row no-gutters>
                    <v-otp-input
                        v-model="form.phoneNum.verificationCode"
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
                        <span>找回账号</span>
                      </v-tooltip>
                    </v-col>
                    <v-col class="d-flex justify-end" cols="5">
                      <v-btn
                          :disabled="form.phoneNum.loading"
                          :loading="form.phoneNum.loading"
                          class="my-10"
                          color="primary"
                          depressed
                          large
                          width="100%"
                          @click="submitForm('phoneNum')"
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
                    v-model="form.password.valid"
                >
                  <v-row no-gutters>
                    <v-text-field
                        ref="emailTextField"
                        v-model="form.password.email"
                        :rules="[(value) => !!value || '请输入邮箱',rules.isEmail]"
                        clearable
                        label="邮箱"
                    >
                      <template v-slot:append-outer>
                        <v-btn
                            :disabled="form.password.verificationCodeBtn.disabled"
                            :loading="form.password.verificationCodeBtn.loading"
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
                        v-model="form.password.verificationCode"
                        :rules="[(value) => !!value || '请输入验证码', rules.isInteger]"
                        length="6"
                        plain
                        type="number"
                    />
                  </v-row>
                  <v-row no-gutters>
                    <v-text-field
                        v-model="form.password.username"
                        :rules="[(value) => !!value || '请输入用户名或邮箱']"
                        clearable
                        label="用户名"
                    />
                  </v-row>
                  <v-row justify="center" no-gutters>
                    <v-text-field
                        v-model="form.password.password"
                        :append-icon="form.password.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :counter="rules.passwordMaxLength"
                        :rules="[rules.isPassword]"
                        :type="form.password.showPassword ? 'text' : 'password'"
                        label="密码"
                        @click:append="form.password.showPassword = !form.password.showPassword"
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
                              to="/signUp"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-icon>
                              mdi-account-multiple-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>注册账号</span>
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
                        <span>找回账号</span>
                      </v-tooltip>
                    </v-col>
                    <v-col class="d-flex justify-end" cols="5">
                      <v-btn
                          :disabled="form.password.loading"
                          :loading="form.password.loading"
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
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
import AppBar from "@/pages/Index/components/AppBar";
import DarkButton from "@/components/DarkButton";

export default {
  name: "SignUp",
  components: {AppBar, DarkButton},
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
        phoneNum: {
          valid: null,
          loading: false,
          phoneNum: null,
          verificationCode: null,
          verificationCodeBtn: {
            loading: false,
            disabled: false
          }
        },
        password: {
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
        backgroundImg: {
          width: this.$vuetify.breakpoint.mobile ? "60vw" : "20vw",
          bottom: this.$vuetify.breakpoint.mobile ? "20vw" : "3vw",
          right: this.$vuetify.breakpoint.mobile ? "3vw" : "3vw",
        },
      },
      bgImg: this.GLOBAL.images.signUp
    };
  },
  methods: {
    sendVerificationCode(type) {
      if (type === 'phoneNum') {
        if (!this.$refs.phoneNumTextField.validate(true)) return;
        this.form.phoneNum.verificationCodeBtn.loading = true;
        this.form.phoneNum.verificationCodeBtn.disabled = true;
        this.axios.get("/account/sendVerificationCode?phoneNum=" + this.form.phoneNum.phoneNum).then(() => {
          this.$notify({
            title: "已发送验证码",
            message: null,
            type: "success",
            duration: 2000,
          });
        }).finally(() => {
          this.form.phoneNum.verificationCodeBtn.loading = false;
        });
      } else if (type === 'email') {
        if (!this.$refs.emailTextField.validate(true)) return;
        this.form.password.verificationCodeBtn.loading = true;
        this.form.password.verificationCodeBtn.disabled = true;
        this.axios.get("/account/sendVerificationCode?email=" + this.form.password.email).then(() => {
          this.$notify({
            title: "已发送验证码",
            message: null,
            type: "success",
            duration: 2000,
          });
        }).finally(() => {
          this.form.password.verificationCodeBtn.loading = false;
        });
      }
    },
    submitForm(type) {
      let _this = this;
      if (type === 'phoneNum') {
        if (!this.$refs.phoneNumForm.validate()) return;
        let user = {
          phoneNum: this.form.phoneNum.phoneNum,
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
          email: this.form.password.email,
          verificationCode: this.form.password.verificationCode,
          username: this.form.password.username,
          password: this.form.password.password,
        };
        this.form.password.loading = true;
        this.axios.post("/account/signUp", JSON.stringify(user))
            .then(() => {
              this.$notify({
                title: "注册成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              let params = new URLSearchParams();
              params.append("username", this.form.password.username);
              params.append("password", this.form.password.password);
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
          this.form.password.loading = false;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>