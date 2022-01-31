<template>
  <div>
    <Title :title="title"></Title>
    <background-image :path="backgroundImagePath"></background-image>
    <v-hover v-slot="{ hover }">
      <v-card
          :style="{ width: isMobile ? '85%' : '50%' }"
          :class="{'mx-auto':isMobile,'ml-9':!isMobile,'elevation-24':hover,'elevation-6':!hover}"
          class="transition-swing"
      >
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  用户名：{{ username }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  邮箱：{{ email }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  手机：{{ phoneNumber }}
                </span>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  角色：{{ roleIdList }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <span style="font-weight: bold; line-height: 150%">
                  状态：{{ status }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-btn
                      small
                      color="error"
                      class="ma-auto"
                      style="width: 200px"
                      rounded
                      @click="logout"
                  >
                    退出
                  </v-btn>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import Title from '@/pages/Index/components/Title'
import BackgroundImage from '@/pages/Index/components/BackgroundImage'

export default {
  name: "AccountInfo",
  components: {Title, BackgroundImage},
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
    return {
      backgroundImagePath: this.GLOBAL.images.profile,
      title: "我的",
      username: null,
      email: null,
      phoneNumber: null,
      status: null,
      roleIdList: null,
      classes: {},
    };
  },
  methods: {
    logout() {
      this.$notify({
        title: "退出成功",
        message: null,
        type: "success",
        duration: 2000,
      });
      this.$store.commit("clean");
      this.$router.push({name: "SignIn"});
    }
  },
  mounted() {
    let userinfo = this.$store.getters.getUserInfo;
    this.username = userinfo.username;
    this.phoneNumber = userinfo.phoneNumber;
    this.roleIdList = userinfo.roleIdList;
    this.email = userinfo.email;
    if (userinfo.status === "NORMAL") {
      this.status = "正常";
    } else {
      this.status = "禁用";
    }
  },
};
</script>

<style lang="scss" scoped>

</style>