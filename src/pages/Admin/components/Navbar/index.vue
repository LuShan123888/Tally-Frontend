<template>
  <v-navigation-drawer app expand-on-hover mini-variant mini-variant-width="70px" permanent
                       style="backdrop-filter: blur(10px);background: rgba(255, 255, 255, .7);" width="320">
    <v-list nav style="margin-top:48px">
      <div v-for="(item, i) in menus.data" :key="i">
        <v-list-item v-if="item.children == null"
                     :to="item.path"
                     class="my-3"
                     color="primary"
                     link
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
            v-model="menus.isFold"
            :prepend-icon="item.icon"
            no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </template>
          <v-list-item
              v-for="(item, i) in item.children"
              :key="i"
              :to="item.path"
              link>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
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
      mini: true
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
        icon: "mdi-ballot-outline",
        path: "/admin/billType",
        title: "账单类别管理",
        children: null
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
      },
      {
        icon: "mdi-docker",
        path: "/admin/portainer",
        title: "Docker 监控",
        children: null
      }
    ];
  },
};
</script>