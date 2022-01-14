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
            <div class="text-h4 pt-10 text-center">注册</div>
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
                <v-text-field
                    v-model="email"
                    :rules="[rules.isEmail]"
                    label="E-mail"
                    required
                    clearable
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
                  注册
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
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
      valid: false,
      show: false,
      username: null,
      password: null,
      email: null,
      rules: {
        isEmail: this.GLOBAL.rules.isEmail
      },
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
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const _this = this;
        const params = new URLSearchParams();
        params.append(username, this.username);
        params.append("password", this.password);
        params.append("email", this.email);
        this.axios
            .post(this.GLOBAL.apiBase + "/account/signUp", params)
            .then(() => {
              this.$notify({
                title: "注册成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              _this.$router.push({
                name: "Login",
                params: {
                  username: this.username,
                  password: this.password,
                },
              });
            });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>