<template>
  <v-container fluid>
    <v-row class="mt-16" justify="center">
      <i-image :src="imageUrl" width="100vw"/>
    </v-row>
    <v-row justify="center">
      <v-btn
          class="mt-6"
          color="primary"
          to="/home"
          x-large
          v-text="'返回主页'">
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import AppBar from "@/pages/Admin/components/AppBar";
import iImage from "@/components/iImages";

export default {
  name: "PageNotFound",
  components: {
    AppBar, iImage
  },
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.mobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
    lightPrimary: function () {
      return this.$vuetify.theme.themes.light.primary;
    }
  },
  data: function () {
    return {
      imageUrl: this.GLOBAL.images.pageNotFound
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss">
</style>