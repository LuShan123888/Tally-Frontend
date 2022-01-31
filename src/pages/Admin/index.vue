<template>
  <v-container class="pa-0" fluid>
    <app-bar/>
    <navbar/>
    <v-main>
      <v-container class="pa-0" fluid>
        <router-view/>
      </v-container>
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
    this.$router.push({name: "AdminHome"});
    this.axios.get("/account/getUserInfo").then((response) => {
      _this.$store.commit("setUserInfo", response.data.data);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>