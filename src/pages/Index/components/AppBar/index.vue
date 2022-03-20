<template>
  <v-app-bar v-model="isShow" app inverted-scroll
             :style="{backdropFilter: 'blur(10px)',background:isDark?'rgba(30, 30, 30, 0.7)':'rgba(255, 255, 255, 0.7)'}">
    <v-app-bar-nav-icon>
      <v-btn class="rounded-lg ml-3" color="primary" depressed fab small>
        <v-icon>mdi-notebook-edit</v-icon>
      </v-btn>
    </v-app-bar-nav-icon>
    <v-app-bar-title class="subtitle-1 pl-4" v-text="title"/>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  props: {
    title: String
  },
  computed: {
    isDark: function () {
      return this.$vuetify.theme.dark;
    }
  },
  data: function () {
    return {
      isShow: false
    };
  },
  methods: {
    changeIsShow: function (isShow) {
      this.isShow = isShow;
    }
  },
  mounted() {
  },
};
</script>
