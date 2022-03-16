<template>
  <v-container :style="{height:height}" class="pa-0" fluid>
    <iframe :src="iframeSrc" frameborder="0" height="100%" width="100%"/>
  </v-container>
</template>
<script>
export default {
  name: "Sentinel",
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
      iframeSrc: 'https://sentinel.tally.ltd',
      height: document.documentElement.clientHeight - 64 + "px"
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss">
</style>