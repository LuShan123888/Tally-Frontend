<template>
  <v-app-bar app collapse-on-scroll :value="isShow">
    <v-app-bar-nav-icon class="mx-1">
      <v-icon color="primary" x-large> mdi-notebook-edit</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title class="subtitle-1" v-text="title"/>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  props: {
    isShow: Boolean
  },
  data: function () {
    return {
      title: this.GLOBAL.title
    };
  },
  mounted() {
  },
};
</script>
