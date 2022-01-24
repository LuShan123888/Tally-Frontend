<template>
  <v-container>
    <app-bar :isShow="true" :style="{ zIndex: '101' }"/>
    <dark-button id="dark-button" :style="styles.darkButton"/>
    <v-hover v-slot="{ hover }">
      <v-card
          class="mx-auto transition-swing"
          :style="{ width: isMobile ? '80%' : '40%' }"
          style="margin-top:20vh"
          :class="{'elevation-24':hover,'elevation-6':!hover}"
      >
        <v-row no-gutters>
          <v-col cols="12">
            <div class="text-h4 pt-10 text-center">登录</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form
                ref="form"
                class="mx-auto"
                style="width: 75%"
                v-model="valid"
            >
              <v-row>
                <v-text-field
                    v-model="username"
                    :rules="[rules.isUsername]"
                    label="用户名"
                    :counter="rules.usernameMaxLength"
                    clearable
                />
              </v-row>
              <v-row>
                <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.isPassword]"
                    :type="show ? 'text' : 'password'"
                    label="密码"
                    :counter="rules.passwordMaxLength"
                    @click:append="show = !show"
                />
              </v-row>
              <v-row>
                <v-btn
                    large
                    color="primary"
                    class="mx-auto my-10"
                    style="width: 40%"
                    @click="submitForm"
                >
                  登录
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
    <v-row>
      <v-col class="text-center text-subtitle-1 mt-5" cols="12" v-text="''">
        还没有账户？
        <router-link to="/signUp" v-text="'立即注册'"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from "@/pages/Index/components/AppBar";
import DarkButton from "@/components/DarkButton";

export default {
  name: "SignIn",
  components: {AppBar, DarkButton},
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.mobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
  },
  data: function () {
    return {
      valid: false,
      show: false,
      username: this.$route.params.username,
      password: this.$route.params.password,
      rules: this.GLOBAL.rules,
      styles: {
        darkButton: {
          top: "70px",
          right: "10px",
          position: "fixed",
          "z-index": 100,
        },
      },
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const _this = this;
        const params = new URLSearchParams();
        params.append("username", this.username);
        params.append("password", this.password);
        this.axios
            .post("/account/signIn", params)
            .then((response) => {
              this.$notify({
                title: "登录成功",
                message: "上次登录时间：" + response.data.data.lastSignInDateTime,
                type: "success",
                duration: 2000,
              });
              // 把数据共享出去
              _this.$store.commit("setToken", response.data.data.token);
              _this.$router.push({name: "Home"});
            });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>