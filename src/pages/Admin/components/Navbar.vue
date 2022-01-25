<template>
  <div>
    <v-navigation-drawer expand-on-hover mini-variant-width="70px" app width="320">
      <v-list nav style="margin-top:48px">
        <div v-for="(item, i) in menus.data" :key="i">
          <v-list-item v-if="item.children == null"
                       link
                       :to="item.path"
                       class="my-3"
                       color="primary"
                       @click="menus.isFold=false">
            <v-list-item-icon>
              <v-icon v-text="item.icon"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
              v-if="item.children!=null"
              no-action
              v-model="menus.isFold"
              :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"/>
              </v-list-item-content>
            </template>
            <v-list-item
                v-for="(item, i) in item.children"
                :key="i"
                :to="item.path"
                link
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"/>
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
      menus: {
        data: [],
        isFold: false
      },
    };
  },
  methods: {},
  mounted() {
    this.menus.data = [
      {
        icon: "mdi-home",
        path: "/admin/home",
        title: "总览",
        children: null
      },
      {
        icon: "mdi-account",
        title: "账号管理",
        children: [
          {
            path: "/admin/userManagement",
            title: "用户管理",
            children: null
          },
          {
            path: "/admin/role",
            title: "角色管理",
            children: null
          },
          {
            path: "/admin/permission",
            title: "权限管理",
            children: null
          }
        ]
      },
      {
        icon: "mdi-message-alert",
        path: "/admin/feedback",
        title: "反馈处理",
        children: null
      },
      {
        icon: "mdi-database-eye",
        path: "/admin/druid",
        title: "数据源监控",
        children: null
      },
      {
        icon: "mdi-api",
        path: "/admin/swagger",
        title: "API文档",
        children: null
      }
    ];
  },
};
</script>