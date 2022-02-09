<template>
  <v-app-bar app style="backdrop-filter: blur(10px);background: rgba(255, 255, 255, .7);">
    <v-app-bar-nav-icon>
      <v-icon class="pl-3" color="primary" x-large> mdi-notebook-edit</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title class="subtitle-1 pl-4" v-text="title"/>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  props: {},
  data: function () {
    return {
      title: this.GLOBAL.title
    };
  },
  mounted() {
  },
};
</script>
