<template>
  <v-app-bar app>
    <v-app-bar-nav-icon class="ml-3">
      <v-icon x-large color="primary"> mdi-notebook-edit</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title class="subtitle-1" v-text="title"/>
    <v-spacer/>
    <v-menu
        close-delay="300ms"
        bottom
        offset-y
        nudge-bottom="5px"
        nudge-left="50px"
        open-on-hover
        transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="mr-16"
        >
          <avatar :path="userInfo.avatarPath" size="50"/>
        </v-btn>
      </template>
      <v-container fluid style="background: #FFFFFF">
        <v-row v-if="userInfo" align="center" no-gutters style="height: 50px">
          <v-icon class="ml-4 mr-3" size="24">mdi-account-box</v-icon>
          <span v-text="userInfo.username"/>
        </v-row>
        <v-row no-gutters>
          <v-btn
              class="rounded-lg"
              color="primary"
              style="width: 100%"
              text
              to="/home"
          >
            <v-icon class="mr-3">mdi-application-outline</v-icon>
            <span>前往前台</span>
          </v-btn>
        </v-row>
        <v-row no-gutters>
          <v-btn
              class="rounded-lg"
              color="error"
              style="width: 100%"
              text
              @click="signOut"
          >
            <v-icon class="mr-3">mdi-logout</v-icon>
            <span>安全退出</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: "AppBar",
  components: {
    Avatar
  },
  data: function () {
    return {
      title: this.GLOBAL.adminTitle,
      userInfo: {
        avatarPath: null,
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
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.getUserInfo;
  },
  methods: {
    signOut() {
      this.$notify({
        title: "退出成功",
        message: null,
        type: "success",
        duration: 2000,
      });
      this.$store.commit("clean");
      this.$router.push({name: "SignIn"});
    }
  }
};
</script>

<style lang="scss">
</style>