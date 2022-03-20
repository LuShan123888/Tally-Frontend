<template>
  <v-container class="pa-0" fluid>
    <v-navigation-drawer app width="320">
      <div class="d-flex align-center mx-auto px-4" style="height: 100%;">
        <div style="width: 100%">
          <div class="mb-16 px-4">
            <v-btn class="rounded-lg mr-4" color="primary" depressed fab small>
              <v-icon>mdi-notebook-edit</v-icon>
            </v-btn>
            <span class="text-subtitle-1" v-text="title"/>
          </div>
          <v-list nav>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                  v-for="(item, i) in menus"
                  :key="i"
                  :to="item.path"
                  class="listItem rounded-lg">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"/>
                </v-list-item-icon>
                <v-list-item-title
                    class="text-subtitle-2"
                    v-text="item.text"/>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
    <v-bottom-navigation color="primary" fixed app grow v-show="isMobile">
      <v-btn
          v-for="(item, i) in menus"
          :key="i"
          :to="item.path"
          min-width="70px"
          height="inherit">
        <v-icon v-text="item.icon"/>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.mobile;
    },
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
  },
  data: function () {
    return {
      selectedItem: 1,
      title: this.GLOBAL.title,
      menus: [
        {text: "账本", path: "/home", icon: "mdi-book-edit"},
        {text: "账户", path: "/account", icon: "mdi-bank"},
        {text: "统计", path: "/statistics", icon: "mdi-chart-timeline-variant-shimmer"},
        {text: "我的", path: "/mine", icon: "mdi-account"}
      ],
    };
  },
  mounted() {
  },
};
</script>
<style lang="scss">
.listItem {
  &:before {
    border-radius: 8px !important;
  }
}
</style>