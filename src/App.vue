<template>
  <v-app :style="{backgroundColor: isDark?'#000000':'#F1F2F6'}">
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    isDark: function () {
      return this.$vuetify.theme.dark;
    }
  },
  data: function () {
    return {};
  },
  mounted() {
    let config = this.$store.getters.getConfig;
    if (config && config.dark) {
      this.$vuetify.theme.dark = config.dark;
    }
  }
};
</script>

<style lang="scss">
</style>