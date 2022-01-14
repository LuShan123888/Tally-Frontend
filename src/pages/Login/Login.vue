<template>
  <v-container>
    <app-bar :isShow="true" :style="{ 'z-index': '101' }"/>
    <dark-button id="dark-button" :style="style.darkButton"/>
    <v-hover v-slot="{ hover }">
      <v-card
          class="mx-auto mt-16 transition-swing"
          :style="{ width: isMobile ? '80%' : '40%' }"
          :class="`elevation-${hover ? 24 : 6}`"
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
                    :counter="16"
                    :rules="[(value) => !!value || '请输入用户名']"
                    label="用户名"
                    clearable
                    required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[(value) => !!value || '请输入密码', (v) => (!!v && v.length >= 6) || '长度最少为6位']"
                    :type="show ? 'text' : 'password'"
                    label="密码"
                    :counter="16"
                    @click:append="show = !show"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-btn
                    large
                    color="primary"
                    class="mx-auto my-10"
                    style="width: 40%"
                    @click="submitForm()"
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
      <v-col class="text-center text-subtitle-1 mt-5" cols="12">
        还没有账户？
        <router-link to="/register">立即注册</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AppBar from "../Index/components/AppBar";
import DarkButton from "../../components/DarkButton";

export default {
  name: "Login",
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
      class: {
        title: {
          "text-h2": !this.$vuetify.breakpoint.mobile,
          "text-h3": this.$vuetify.breakpoint.mobile,
          "ml-3": this.$vuetify.breakpoint.mobile,
          "ml-9": !this.$vuetify.breakpoint.mobile,
          "mt-3": this.$vuetify.breakpoint.mobile,
          "mt-9": !this.$vuetify.breakpoint.mobile,
        },
      },
      style: {
        darkButton: {
          top: "70px",
          right: "10px",
          position: "fixed",
          "z-index": 100,
        },
      },
      valid: false,
      show: false,
      username: this.$route.params.username,
      password: this.$route.params.password,
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
            .post(this.GLOBAL.apiBase + "/account/signIn", params)
            .then((res) => {
              this.$notify({
                title: "登录成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              const jwt = res.data.data.token;
              // 把数据共享出去
              _this.$store.commit("setToken", jwt);
              _this.$router.push("/");
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