<template>
  <v-app-bar
      :style="{backdropFilter: 'blur(10px)',background:isDark?'rgba(30, 30, 30, 0.7)':'rgba(255, 255, 255, 0.7)'}" app>
    <v-app-bar-nav-icon>
      <v-icon class="pl-3" color="primary" x-large> mdi-notebook-edit</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title class="subtitle-1 pl-4" v-text="title"/>
    <v-spacer/>
    <v-menu bottom close-delay="300ms" nudge-bottom="5px" nudge-left="25px" offset-y open-on-hover
            transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-16" icon v-bind="attrs" v-on="on">
          <avatar :path="userInfo.avatarPath" size="50"/>
        </v-btn>
      </template>
      <v-container :style="{backgroundColor: isDark?'#000000':'#FFFFFF'}" class="pa-3" fluid>
        <v-row v-if="userInfo" align="center" class="mb-1 d-flex justify-center" no-gutters style="height: 36px"><span
            v-text="userInfo.username"/></v-row>
        <v-row class="mb-1" no-gutters>
          <v-btn block color="primary" depressed small to="/home"><span>前往前台</span></v-btn>
        </v-row>
        <v-row no-gutters>
          <v-btn block color="error" depressed small @click="signOut"><span>安全退出</span></v-btn>
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