<template>
  <v-container :style="{height:height}" class="pa-0" fluid>
    <iframe :src="iframeSrc" width="100%" height="100%" frameborder="0"/>
  </v-container>
</template>

<script>
export default {
  name: "Swagger",
  components: {},
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
      iframeSrc: this.GLOBAL.url.api + '/swagger-ui/',
      height: document.documentElement.clientHeight - 64 + "px",
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss">
</style>