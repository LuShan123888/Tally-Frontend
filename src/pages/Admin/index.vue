<template>
  <div>
    <app-bar/>
    <navbar/>
    <v-main>
      <v-container class="pa-0 ma-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
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
    const _this = this;
    this.axios.get("/account/getUserInfo").then((response) => {
      _this.$store.commit("setUserInfo", response.data.data);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>