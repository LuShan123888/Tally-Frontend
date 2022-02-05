<template>
  <v-container class="pa-0" fluid>
    <navbar/>
    <v-main>
      <v-container class="pa-0" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import DarkButton from "@/components/DarkButton";
import Navbar from "@/pages/Index/components/NavBar";
import AppBar from "@/pages/Index/components/AppBar";

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
    let _this = this;
    this.$router.push({name: "Home"});
    this.axios.get("/user/getUserInfo").then((response) => {
      _this.$store.commit("setUserInfo", response.data.data);
    });
  },
};
</script>

<style lang="scss">
</style>