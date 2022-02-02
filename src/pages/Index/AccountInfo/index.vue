<template>
  <v-container class="pa-0" fluid>
    <title-bar :title="title"/>
    <background-image :path="backgroundImagePath"/>
    <v-hover v-slot="{ hover }">
      <v-container v-ripple :class="{'mx-auto':isMobile,'ml-9':!isMobile,'elevation-24':hover,'elevation-2':!hover}"
                   :style="{ width: isMobile ? '85%' : '50%' ,cursor:'pointer'}"
                   class="transition-swing mb-5 pa-0 rounded-lg"
                   fluid
                   @click="userInfoDialog.isShow = true"
      >
        <v-row align="center" class="py-3 px-3" justify="space-between" no-gutters>
          <v-col cols="2" @click="userInfoDialog.isShow=true">
            <avatar :path="userInfo.avatarPath" size="50"/>
          </v-col>
          <v-col class="pl-3" cols="9">
            <div class="text-h6">{{ userInfo.username }}</div>
            <div class="text-subtitle-2 grey--text text--darken-1 font-weight-regular">邮箱，手机号，密码</div>
          </v-col>
          <v-col cols="1">
            <v-icon>mdi-chevron-right</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-hover>
    <v-dialog
        v-model="userInfoDialog.isShow"
        fullscreen
        hide-overlay
        style="height: 100vh"
        transition="dialog-bottom-transition"
    >
      <v-container class="pa-0" fluid style="height: 100%;background: #FFFFFF">
        <v-toolbar
            class="mb-16"
            color="primary"
            dark
            style="border-radius: 0"
        >
          <v-btn
              dark
              icon
              @click="userInfoDialog.isShow = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>用户信息</v-toolbar-title>
        </v-toolbar>
        <v-row :class="{'mx-auto':isMobile,'ml-9':!isMobile}" :style="{ width: isMobile ? '85%' : '50%' }"
               justify="center"
               no-gutters>
          <avatar :path="userInfo.avatarPath" elevation="3" size="100"/>
        </v-row>
        <v-container :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
                     :style="{ width: isMobile ? '85%' : '50%' }"
                     class="transition-swing mb-5 pa-0 rounded-lg elevation-24"
                     fluid
                     style="margin-top: -50px"
        >
          <v-row align="center" class="px-3" no-gutters style="height: 50px"/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-account</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1">用户名：</span>{{ userInfo.username }}
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-account-key</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1">密码：</span>********
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-cellphone-text</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1">手机号：</span>{{ userInfo.phoneNumber }}
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-email</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1">邮箱：</span>{{ userInfo.email }}
            </v-col>
            <v-col cols="1">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-account</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1" v-text="'状态：'"/>
              <v-chip :color="userInfo.status==='NORMAL'?'success':'secondary'" class="mx-1" label
                      v-text="getStatusText()">
              </v-chip>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
            <v-col cols="1">
              <v-icon>mdi-account</v-icon>
            </v-col>
            <v-col class="ml-2">
              <span class="grey--text text--darken-1">角色：</span>
              <v-chip v-for="item in userInfo.roleIdList"
                      :key="item" class="mx-1" label
                      v-text="roleNameFormatter(item)">
              </v-chip>
            </v-col>
          </v-row>
          <v-divider/>
          <v-row align="center" justify="center" no-gutters style="height: 60px">
            <v-btn
                class="rounded-lg"
                color="error"
                large
                style="width: 70%"
                @click="deleteAccount"
            >
              <v-icon class="mr-3">mdi-logout</v-icon>
              注销账号
            </v-btn>
          </v-row>
        </v-container>
      </v-container>
    </v-dialog>
    <v-hover v-slot="{ hover }">
      <v-container :class="{'mx-auto':isMobile,'ml-9':!isMobile,'elevation-24':hover,'elevation-2':!hover}"
                   :style="{ width: isMobile ? '85%' : '50%' }"
                   class="transition-swing mb-5 pa-0 rounded-lg"
                   fluid
      >
        <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px">
          <v-col cols="1">
            <v-icon>mdi-brightness-4</v-icon>
          </v-col>
          <v-col class="ml-2">
            <span>深色模式</span>
          </v-col>
          <v-col cols="2">
            <el-switch
                v-model="darkMode"
                active-color="#13ce66"
                inactive-color="#757575"
                @change="changeDarkMode">
            </el-switch>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px;cursor: pointer">
          <v-col cols="1">
            <v-icon>mdi-notebook-multiple</v-icon>
          </v-col>
          <v-col class="ml-2">
            <span>账单分类</span>
          </v-col>
          <v-col cols="1">
            <v-icon>mdi-chevron-right</v-icon>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row v-ripple align="center" class="px-3" no-gutters style="height: 50px;cursor: pointer" @click="">
          <v-col cols="1">
            <v-icon>mdi-message-alert</v-icon>
          </v-col>
          <v-col class="ml-2" @click="feedbackDialog.isShow = true">
            <span>提交反馈</span>
          </v-col>
          <v-col cols="1">
            <v-icon>mdi-chevron-right</v-icon>
          </v-col>
        </v-row>
        <v-dialog
            v-model="feedbackDialog.isShow"
            fullscreen
            hide-overlay
            style="height: 100vh"
            transition="dialog-bottom-transition"
        >
          <v-container class="pa-0" fluid style="height: 100%;background: #FFFFFF">
            <v-toolbar
                class="mb-16"
                color="primary"
                dark
                style="border-radius: 0"
            >
              <v-btn
                  dark
                  icon
                  @click="feedbackDialog.isShow = false"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title>提交反馈</v-toolbar-title>
            </v-toolbar>
            <v-container :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
                         :style="{ width: isMobile ? '85%' : '50%' }"
                         class="transition-swing mb-5 pa-5 rounded-lg elevation-24"
                         fluid
            >
              <v-row no-gutters>
                <v-col cols="12">
                  <v-select
                      v-model="feedbackDialog.feedback.type" :items="enums.feedbackType"
                      label="反馈类型"
                      prepend-inner-icon="mdi-format-list-bulleted-type"/>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                      v-model="feedbackDialog.feedback.description"
                      auto-grow
                      clearable
                      counter
                      label="反馈描述"
                      prepend-inner-icon="mdi-comment"
                      rows="3"
                  />
                </v-col>
                <v-col class="text--darken-1 grey--text mb-2" cols="12">
                  <v-icon class="mr-1">mdi-file-image</v-icon>
                  <span>反馈图片</span>
                </v-col>
                <v-col class="d-flex justify-center" cols="12">
                  <image-uploader :image-path="feedbackDialog.feedback.imagePath"
                                  @setImagePath="(imagePath)=>{feedbackDialog.feedback.imagePath = imagePath}"/>
                </v-col>
              </v-row>
              <v-row class="mt-10" no-gutters>
                <v-btn
                    :disabled="feedbackDialog.loading"
                    :loading="feedbackDialog.loading"
                    class="rounded-lg"
                    color="primary"
                    large
                    style="width: 100%"
                    @click="saveFeedback"
                >
                  <v-icon class="mr-3">mdi-logout</v-icon>
                  提交反馈
                </v-btn>
              </v-row>
            </v-container>
          </v-container>
        </v-dialog>
      </v-container>
    </v-hover>
    <v-row v-if="userInfo.roleIdList && userInfo.roleIdList.indexOf(1) !== -1" class="mb-5" no-gutters>
      <v-btn
          :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
          :style="{ width: isMobile ? '85%' : '50%' }"
          class="ma-auto rounded-lg"
          color="primary"
          large
          to="/admin"
      >
        <v-icon class="mr-3">mdi-monitor-dashboard</v-icon>
        前往后台
      </v-btn>
    </v-row>
    <v-row class="my-3" no-gutters>
      <v-btn
          :class="{'mx-auto':isMobile,'ml-9':!isMobile}"
          :style="{ width: isMobile ? '85%' : '50%' }"
          class="ma-auto rounded-lg"
          color="error"
          large
          style="width: 85%"
          @click="signOut"
      >
        <v-icon class="mr-3">mdi-logout</v-icon>
        退出登录
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Avatar from '@/components/Avatar'
import ImageUploader from '@/components/ImageUploader'
import BackgroundImage from '@/pages/Index/components/BackgroundImage'
import TitleBar from "@/pages/Index/components/TitleBar";

export default {
  name: "AccountInfo",
  components: {TitleBar, ImageUploader, Avatar, BackgroundImage},
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
      userInfoDialog: {
        isShow: false
      },
      feedbackDialog: {
        isShow: false,
        loading: false,
        feedback: {
          imagePath: null,
          type: null,
          description: null
        },
      },
      userInfo: {
        username: null,
        avatarPath: null,
        email: null,
        phoneNumber: null,
        roleIdList: null,
        status: null,
      },
      darkMode: this.$vuetify.theme.dark,
      classes: {},
      roleMap: [],
      enums: this.GLOBAL.enums
    };
  },
  methods: {
    changeDarkMode(darkMode) {
      this.$vuetify.theme.dark = darkMode;
    },
    deleteAccount() {
    },
    signOut() {
      this.$notify({
        title: "退出成功",
        message: null,
        type: "success",
        duration: 2000,
      });
      this.$store.commit("clean");
      this.$router.push({name: "SignIn"});
    },
    getStatusText() {
      for (let item of this.enums.userStatus) {
        if (item.value === this.userInfo.status) {
          return item.text;
        }
      }
    },
    roleNameFormatter(roleId) {
      for (let item of this.roleMap) {
        if (item.id === roleId) {
          return item.roleName;
        }
      }
    },
    saveFeedback() {
      this.feedbackDialog.loading = true;
      this.axios.post("/feedback/saveFeedback", JSON.stringify(this.feedbackDialog.feedback))
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.feedbackDialog.feedback.imagePath = null;
            this.feedbackDialog.feedback.type = null;
            this.feedbackDialog.feedback.description = null;
          })
          .finally(() => {
            this.feedbackDialog.loading = false;
          });
    },
    loadRoleMap() {
      this.axios.get("/role/listAllRole").then((response) => {
        response.data.data.forEach(() => {
          this.roleMap = response.data.data;
        })
      });
    },
  },
  mounted() {
    this.userInfo = this.$store.getters.getUserInfo;
    this.loadRoleMap();
  }
};
</script>

<style lang="scss" scoped>

</style>