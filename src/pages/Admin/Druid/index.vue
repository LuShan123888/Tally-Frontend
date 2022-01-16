<template>
  <div :style="'height:'+ height">
    <iframe :src="iframeSrc" width="100%" height="100%" frameborder="0"/>
  </div>
</template>

<script>
export default {
  name: "Druid",
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
      iframeSrc: this.GLOBAL.url.iframe + '/druid/index.html',
      height: document.documentElement.clientHeight - 64 + "px;"
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>