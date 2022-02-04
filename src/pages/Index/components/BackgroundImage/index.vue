<template>
  <i-image :src="src" :style="styles.backgroundImg"/>
</template>

<script>
import iImage from '@/components/iImage'

export default {
  name: "BackgroundImage",
  components: {iImage},
  props: {
    src: String
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
      styles: {
        backgroundImg: {
          position: 'fixed',
          width: this.$vuetify.breakpoint.mobile ? "60vw" : "20vw",
          bottom: this.$vuetify.breakpoint.mobile ? "20vw" : "3vw",
          right: this.$vuetify.breakpoint.mobile ? "3vw" : "3vw",
        },
      },
    };
  },
  mounted() {
  },
};
</script>