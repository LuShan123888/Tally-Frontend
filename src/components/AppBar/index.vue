<template>
  <v-app-bar app>
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
