<template>
  <div>
    404
  </div>
</template>

<script>
export default {
  name: "404",
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
      styles: {},
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>