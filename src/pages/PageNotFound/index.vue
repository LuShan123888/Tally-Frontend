<template>
  <v-container class="pa-0 px-4" fluid>
    <v-row class="mt-16" justify="center" no-gutters>
      <i-image :src="imageUrl" max-width="1000px" width="100%"/>
    </v-row>
    <v-row justify="center">
      <v-btn class="mt-6" color="primary" to="/home" x-large v-text="'返回主页'"/>
    </v-row>
  </v-container>
</template>
<script>
import iImage from "@/components/iImage";

export default {
  name: "PageNotFound",
  components: {
    iImage
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
      imageUrl: this.GLOBAL.images.pageNotFound.toString()
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss">
</style>