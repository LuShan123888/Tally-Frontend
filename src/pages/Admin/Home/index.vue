<template>
  <div>
    <h1>
      Home
    </h1>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
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
    return {};
  },
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>