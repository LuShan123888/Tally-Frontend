<template>
  <v-container>
    <v-row>
      <span class="text--primary text-h2">服务器信息</span>
    </v-row>
  </v-container>
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