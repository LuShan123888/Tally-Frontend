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
          <v-avatar v-if="userInfo&&userInfo.avatarUrl!=null">
            <img :src="avatarPath">
          </v-avatar>
          <v-icon x-large v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list nav>
        <v-list-item-group>
          <v-list-item
              id="item-group"
              dense
              class="my-0"
              inactive
              v-if="userInfo"
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ml-0">
              <v-list-item-title v-text="userInfo.username"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              dense
              link
              to="/home"
              class="my-0"
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-application-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'前往前台'"/>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              dense
              link
              @click="logout"
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
      }
    };
  },
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.mobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
    avatarPath: function () {
      if (this.userInfo.avatarUrl != null) {
        return this.GLOBAL.url.file + "/" + this.userInfo.avatarUrl;
      }
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.getUserInfo;
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
  }
};
</script>

<style lang="scss" scoped>
</style>