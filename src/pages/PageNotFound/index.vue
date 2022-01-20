<template>
  <v-container>
    <app-bar/>
    <v-row class="mt-16" justify="center">
      <v-img
          :src="imgSrc"
          contain
          max-width="900"
      >
        <template v-slot:placeholder>
          <v-row
              align="center"
              class="fill-height ma-0"
              justify="center"
          >
            <v-progress-circular
                color="grey lighten-5"
                indeterminate
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
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

export default {
  name: "PageNotFound",
  components: {
    AppBar
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
      imgSrc: this.GLOBAL.images.pageNotFound,
      styles: {},
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>