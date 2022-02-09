<template>
  <v-container class="pa-0" fluid>
    <app-bar ref="appBar" :title="appBar.title"/>
    <navbar/>
    <v-main>
      <router-view @changeTitle="changeTitle"/>
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
  methods: {
    changeTitle(title) {
      this.$refs.appBar.changeIsShow(false);
      this.appBar.title = title;
    },
  },
  data: function () {
    return {
      appBar: {
        title: null
      },
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
    if (this.$store.getters.getToken) {
      this.$router.push({name: "Home"});
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