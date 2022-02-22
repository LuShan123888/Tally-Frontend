<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-autocomplete v-model="value"></v-autocomplete>
    </v-col>
    <v-col>
      {{ value }}
    </v-col>
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
    return {
      value: null
    }
  },
  methods: {
    
  },
  mounted() {
  },
};
</script>

<style lang="scss">

</style>