<template>
  <v-app-bar app>
    <v-app-bar-nav-icon class="ml-3">
      <v-icon x-large color="primary"> mdi-notebook-edit</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title class="subtitle-1" v-text="title"></v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu
        open-on-hover
        close-delay="300ms"
        bottom
        offset-y
        nudge-bottom="5px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="mr-7"
        >
          <v-avatar v-if="userInfo.avatarUrl!=null">
            <img :src="avatarPath">
          </v-avatar>
          <v-icon x-large v-if="userInfo.avatarUrl==null">mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list nav>
        <v-list-item-group>
          <v-list-item
              id="item-group"
              dense
              class="my-0"
              inactive
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ml-0">
              <v-list-item-title v-text="userInfo.username"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              id="item-group"
              dense
              link
              @click="changePassword()"
              class="my-0"
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ml-0">
              <v-list-item-title>修改密码</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              dense
              link
              to="/"
              :class="{'v-list-item--active':false,'v-item--active':false}"
              class="my-0"
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-application-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>前往前台</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              dense
              link
              @click="logout()"
              class="my-0"
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>安全退出</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",
  data: function () {
    return {
      title: this.GLOBAL.adminTitle,
      userInfo: {
        avatarUrl: null,
        username: null
      },
      avatarPath: null
    };
  },
  mounted() {
    this.userInfo = this.$store.getters.getUserInfo;
    if (this.userInfo.avatarUrl != null){
      this.avatarPath = this.GLOBAL.fileBase + this.userInfo.avatarUrl;
    }
  },
  methods: {
    logout() {
      this.$notify({
        title: "退出成功",
        message: null,
        type: "success",
        duration: 2000,
      });
      this.$store.commit("clear");
      this.$router.push("/login");
    },
    changePassword() {
    }
  }
};
</script>

<style lang="scss" scoped>

</style>