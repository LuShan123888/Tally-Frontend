<template>
  <v-img
      :class="`elevation-${elevation}`"
      :height="height"
      :max-height="maxHeight"
      :max-width="maxWidth"
      :src="src"
      :width="width"
      contain>
    <template v-slot:placeholder>
      <v-row
          align="center"
          class="fill-height ma-0"
          justify="center"
          no-gutters>
        <v-progress-circular
            color="primary"
            indeterminate
            width="2"/>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "iImages",
  props: {
    src: String,
    width: String,
    maxWidth: String,
    height: String,
    maxHeight: String,
    elevation: {
      type: Number,
      default: 0
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
  methods: {},
  mounted() {
  },
};
</script>