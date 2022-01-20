<template>
  <div>
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
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <div
        :class="classes.title"
        :style="{ color: lightPrimary }"
        v-text="title"
    />
    <v-hover v-slot="{ hover }">
      <v-card
          class="mt-9 transition-swing"
          :class="{'mx-auto':isMobile,'ml-9':!isMobile,'elevation-24':hover,'elevation-6':!hover}"
          :style="{ width: isMobile ? '90%' : '50%' }"
      >
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  用户名：{{ username }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  邮箱：{{ email }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  手机：{{ phoneNum }}
                </span>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  角色：{{ roleIdList }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  状态：{{ status }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-btn
                      small
                      color="error"
                      class="ma-auto"
                      style="width: 200px"
                      rounded
                      @click="logout"
                  >
                    退出
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "AccountInfo",
  components: {},
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
      bgImg: this.GLOBAL.images.profile,
      title: "账户信息",
      username: null,
      email: null,
      phoneNum: null,
      status: null,
      roleIdList: null,
      styles: {
        backgroundImg: {
          width: this.$vuetify.breakpoint.mobile ? "60vw" : "20vw",
          bottom: this.$vuetify.breakpoint.mobile ? "20vw" : "3vw",
          right: this.$vuetify.breakpoint.mobile ? "3vw" : "3vw",
        },
      },
      classes: {
        title: {
          "text-h2": !this.$vuetify.breakpoint.mobile,
          "text-h3": this.$vuetify.breakpoint.mobile,
          "ml-3": this.$vuetify.breakpoint.mobile,
          "ml-9": !this.$vuetify.breakpoint.mobile,
          "mt-3": this.$vuetify.breakpoint.mobile,
          "mt-9": !this.$vuetify.breakpoint.mobile,
        },
      },
    };
  },
  methods: {
    logout() {
      this.$notify({
        title: "退出成功",
        message: null,
        type: "success",
        duration: 2000,
      });
      this.$store.commit("clean");
      this.$router.push({name: "Login"});
    }
  },
  mounted() {
    const userinfo = this.$store.getters.getUserInfo;
    this.username = userinfo.username;
    this.phoneNum = userinfo.phoneNum;
    this.roleIdList = userinfo.roleIdList;
    this.email = userinfo.email;
    if (userinfo.status === "NORMAL") {
      this.status = "正常";
    } else {
      this.status = "禁用";
    }
  },
};
</script>

<style lang="scss" scoped>

</style>