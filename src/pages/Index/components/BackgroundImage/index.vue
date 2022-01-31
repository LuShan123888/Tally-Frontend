<template>
  <v-img :src="path" :style="styles.backgroundImg" contain style="position: fixed">
    <template v-slot:placeholder>
      <v-row
          align="center"
          class="fill-height ma-0"
          justify="center"
          no-gutters
      >
        <v-progress-circular
            color="primary"
            indeterminate
            width="2"
        />
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "BackgroundImage",
  props: {
    path: String
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