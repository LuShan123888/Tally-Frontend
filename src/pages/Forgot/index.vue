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
            <v-icon>mdi-email-sync</v-icon>
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
                  <v-row justify="center" no-gutters>
                    <v-text-field
                        v-model="form.phoneNumber.password"
                        :append-icon="form.phoneNumber.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :counter="rules.passwordMaxLength"
                        :rules="[rules.isPassword]"
                        :type="form.phoneNumber.showPassword ? 'text' : 'password'"
                        label="密码"
                        clearable
                        @click:append="form.phoneNumber.showPassword = !form.phoneNumber.showPassword"
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
                          v-text="'重设密码'"
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
                          @click="submitForm('email')"
                          v-text="'重设密码'"
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
    <i-footer/>
  </v-container>
</template>

<script>
import AppBar from "@/pages/Index/components/AppBar";
import TitleBar from "@/pages/Index/components/TitleBar";
import BackgroundImage from "@/pages/Index/components/BackgroundImage";
import DarkButton from "@/components/DarkButton";
import iFooter from "@/components/iFooter";

export default {
  name: "Forget",
  components: {AppBar, TitleBar, BackgroundImage, DarkButton, iFooter},
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
          password: null,
          showPassword: false,
          verificationCode: null,
          verificationCodeBtn: {
            loading: false,
            disabled: false
          }
        },
        email: {
          valid: null,
          loading: false,
          email: null,
          password: null,
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
      backgroundImagePath: this.GLOBAL.images.forgot,
      title: '找回账户'
    };
  },
  methods: {
    sendVerificationCode(type) {
      if (type === 'phoneNumber') {
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
      } else if (type === 'email') {
        if (!this.$refs.emailTextField.validate(true)) return;
        this.form.email.verificationCodeBtn.loading = true;
        this.form.email.verificationCodeBtn.disabled = true;
        this.axios.get("/user/sendVerificationCode?email=" + this.form.email.email).then(() => {
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
          phoneNumber: this.form.phoneNumber.phoneNumber,
          verificationCode: this.form.phoneNum.verificationCode,
          password: this.form.phoneNum.showPassword
        };
        this.form.phoneNum.loading = true;
        this.axios.put("/user/changePassword", JSON.stringify(user))
            .then(() => {
              this.$notify({
                title: "修改成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              let params = new URLSearchParams();
              params.append("username", this.form.phoneNum.phoneNum);
              params.append("password", this.form.phoneNum.verificationCode);
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
                  })
            }).finally(() => {
          this.form.phoneNum.loading = false;
        });
      } else if (type === 'email') {
        if (!this.$refs.passwordForm.validate()) return;
        let user = {
          email: this.form.email.email,
          verificationCode: this.form.email.verificationCode,
          password: this.form.email.password,
        };
        this.form.email.loading = true;
        this.axios.put("/user/changePassword", JSON.stringify(user))
            .then(() => {
              this.$notify({
                title: "修改成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              let params = new URLSearchParams();
              params.append("username", this.form.email.email);
              params.append("password", this.form.email.password);
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
                  })
            }).finally(() => {
          this.form.email.loading = false;
        });
      }
    },
  },
};
</script>

<style lang="scss">
</style>