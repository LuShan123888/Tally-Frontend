<template>
  <v-footer absolute padless @click.native="openNewPage">
    <v-row align="center" no-gutters>
      <v-col
          class="text-center pa-1"
          cols="12"
      >
        <span class="text--darken-1 grey--text text-subtitle-2">
          ©2022 云记贝 版权所有
        </span>
      </v-col>
      <v-col class="pa-1"
             cols="12">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="1">
            <i-image height="20px" src="https://s1.ax1x.com/2020/07/02/NqYHbQ.png"/>
          </v-col>
          <v-col cols="5">
            <span class="ml-3 text--darken-1 grey--text text-subtitle-2">赣ICP备2022000564号</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import iImage from '@/components/iImage'

export default {
  name: "iFooter",
  components: {iImage},
  props: {},
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
    openNewPage() {
      window.open('https://beian.miit.gov.cn', '_blank');
    }
  },
  mounted() {
  },
};
</script>