<template>
  <v-container class="pa-0" fluid>
    <v-row justify="center" no-gutters>
      <v-avatar v-if="path" :class="`elevation-${elevation?elevation:0}`" :size="size">
        <v-img :src="getImageUrl(path)" contain>
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
      </v-avatar>
      <v-icon v-else :size="size">mdi-account-circle</v-icon>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    path: String,
    size: String,
    elevation: String
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
        return this.GLOBAL.url.file + "/" + imagePath;
      }
    }
  },
  mounted() {
  },
};
</script>