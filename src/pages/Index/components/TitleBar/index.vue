<template>
  <v-row align="center" class="my-4 ml-4" no-gutters>
    <v-col cols="12">
      <div :style="{ color: lightPrimary }" class="text-h2" v-text="title"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TitleBar",
  props: {
    title: String
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
    return {};
  },
  mounted() {
  },
};
</script>