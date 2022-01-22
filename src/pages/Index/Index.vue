<template>
  <div>
    <dark-button id="dark-button" :style="styles.darkButton"/>
    <app-bar :isShow="isMobile" :style="{ 'z-index': '101' }"/>
    <navbar/>
    <v-main>
      <v-container class="pa-0 ma-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import DarkButton from "../../components/DarkButton";
import Navbar from "./components/Navbar";
import AppBar from "./components/AppBar";

export default {
  name: "Index",
  components: {DarkButton, Navbar, AppBar},
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
      styles: {
        darkButton: {
          top: this.$vuetify.breakpoint.mobile ? "70px" : "20px",
          right: this.$vuetify.breakpoint.mobile ? "10px" : "20px",
          position: "fixed",
          "z-index": 100,
        },
      },
    };
  },
  mounted() {
    const _this = this;
    this.axios.get("/account/getUserInfo").then((response) => {
      _this.$store.commit("setUserInfo", response.data.data);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>