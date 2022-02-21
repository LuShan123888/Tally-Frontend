<template>
  <v-container class="pa-0" fluid>
    <v-row justify="center" no-gutters>
      <v-avatar v-if="path" :class="`elevation-${elevation}`" :size="size">
        <i-image :src="getImageUrl(path)"/>
      </v-avatar>
      <v-icon v-else :size="size" light>mdi-account-circle</v-icon>
    </v-row>
  </v-container>
</template>

<script>
import iImage from '@/components/iImage'

export default {
  name: "Avatar",
  components: {
    iImage
  },
  props: {
    path: String,
    size: String,
    elevation: {
      type: String,
      default: '0'
    }
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
  methods: {
    getImageUrl: function (imagePath) {
      if (imagePath != null) {
        return this.GLOBAL.url.static + "/" + imagePath;
      }
    }
  },
  mounted() {
  },
};
</script>