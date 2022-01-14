<template>
  <div>
    <v-navigation-drawer expand-on-hover mini-variant-width="70px" app width="320"
                         touchless>
      <v-list nav style="margin-top:48px">
        <div v-for="(item, i) in menus"
             :key="i">
          <v-list-item v-if="item.children==null"
                       link
                       :to="item.path"
                       class="my-3"
                       color="primary"
                       @click="fold=false">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
              v-if="item.children!=null"
              no-action
              v-model="fold"
              :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                v-for="(item, i) in item.children"
                :key="i"
                :to="item.path"
                link
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
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
      menus: null,
      fold: false,
    };
  },
  mounted() {
    this.menus = this.GLOBAL.adminMenu;
  },
};
</script>