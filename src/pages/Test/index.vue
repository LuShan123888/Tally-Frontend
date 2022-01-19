<template>
  <v-row>
    <v-col cols="9">
      <div>123</div>
      <div>41243</div>
    </v-col>
    <v-col cols="3"></v-col>
  </v-row>
</template>

<script>
export default {
  name: "Test",
  components: {},
  computed: {
    isMobile: function () {
      return this.isMobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
  },
  data: function () {
    return {}
  },
  methods: {
    
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
#background-img {
  position: fixed;
}
</style>