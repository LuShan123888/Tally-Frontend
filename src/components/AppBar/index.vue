<template>
  <v-app-bar app>
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
  computed: {},
  data: function () {
    return {
      title: this.GLOBAL.title
    };
  },
  mounted() {
  },
};
</script>
