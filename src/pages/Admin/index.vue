<template>
  <v-container class="pa-0" fluid>
    <app-bar/>
    <navbar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-container>
</template>

<script>
import AppBar from "@/pages/Admin/components/AppBar";
import Navbar from "@/pages/Admin/components/Navbar";

export default {
  name: "AdminIndex",
  components: {
    AppBar,
    Navbar
  },
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.mobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {},
  data: function () {
    return {
      styles: {}
    };
  },
  mounted() {
    let _this = this;
    if (this.$store.getters.getToken) {
      this.$router.push({name: "AdminHome"});
      this.axios.get("/user/getUserInfo").then((response) => {
        _this.$store.commit("setUserInfo", response.data.data);
      });
    } else {
      this.$router.push({name: "SignIn"});
    }
  },
};
</script>

<style lang="scss">
</style>