<template>
  <div>
    <v-navigation-drawer app width="320" touchless>
      <div class="d-flex align-center mx-auto" style="height: 100%; width: 80%">
        <div style="width: 100%">
          <div class="mb-16">
            <v-icon class="mr-4" x-large color="primary">
              mdi-notebook-edit
            </v-icon>
            <span class="text-subtitle-1">{{ title }}</span>
          </div>
          <v-list rounded>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                  v-for="(item, i) in menus"
                  :key="i"
                  :to="item.path"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"/>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                      v-text="item.text"
                      class="text-subtitle-2"
                  />
                </v-list-item-content>
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
          height="inherit"
      >
        <span v-text="item.text"/>
        <v-icon v-text="item.icon"/>
      </v-btn>
    </v-bottom-navigation>
  </div>
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
        {text: "首页", path: "/home", icon: "mdi-chart-timeline-variant-shimmer"},
        {text: "支出", path: "/outcome", icon: "mdi-cash-minus"},
        {text: "收入", path: "/income", icon: "mdi-cash-plus"},
        {text: "我的", path: "/accountInfo", icon: "mdi-account"},
      ],
    };
  },
  mounted() {
  },
};
</script>