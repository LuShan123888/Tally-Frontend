<template>
  <v-container class="pa-0" fluid>
    <Title :title="title"></Title>
    <background-image :path="backgroundImagePath"></background-image>
    <v-hover v-slot="{ hover }">
      <v-card
          :class="{'mx-auto':isMobile,'ml-9':!isMobile,'elevation-24':hover,'elevation-6':!hover}"
          :style="{ width: isMobile ? '85%' : '50%' }"
          class="transition-swing mb-5"
      >
        <v-row align="center" class="py-3 px-3" justify="center" no-gutters>
          <v-col cols="3">
            <v-avatar v-if="userInfo&&userInfo.avatarUrl!=null">
              <v-img :src="avatarPath" contain>
                <template v-slot:placeholder>
                  <v-row
                      align="center"
                      class="fill-height ma-0"
                      justify="center"
                      no-gutters
                  >
                    <v-progress-circular
                        color="primary"
                        indeterminate
                        width="2"
                    />
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <v-icon v-else x-large>mdi-account-circle</v-icon>
          </v-col>
          <v-col cols="9">
            <span>用户名：</span>{{ userInfo.username }}
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
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
                <v-row no-gutters>
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
  </v-container>
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
    },
    avatarPath: function () {
      if (this.userInfo.avatarUrl != null) {
        return this.GLOBAL.url.file + "/" + this.userInfo.avatarUrl;
      }
    }
  },
  data: function () {
    return {
      backgroundImagePath: this.GLOBAL.images.profile,
      title: "我的",
      userInfo: {
        username: null,
        avatarUrl: null,
        email: null,
        phoneNumber: null,
        roleIdList: null,
        status: null,
      },
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
    this.userInfo = this.$store.getters.getUserInfo;
  }
};
</script>

<style lang="scss" scoped>

</style>