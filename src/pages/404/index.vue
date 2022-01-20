<template>
  <v-container>
    <app-bar/>
    <v-row class="mt-16" justify="center">
    </v-row>
    <v-row justify="center">
    </v-row>
  </v-container>
</template>
<script>
import AppBar from "@/pages/Admin/components/AppBar";

export default {
  name: "404",
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
      styles: {},
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>