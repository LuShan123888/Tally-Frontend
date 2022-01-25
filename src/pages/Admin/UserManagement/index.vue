<template>
  <div>
    <v-row style="height:150px" no-gutters align="center">
      <v-col cols="3" no-gutters>
        <div :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'用户管理'"/>
      </v-col>
      <v-col cols="8">
        <v-row no-gutters align="center">
          <v-col cols="5">
            <v-form style="width:100%" ref="userQueryForm">
              <v-row no-gutters align="center">
                <v-col cols="6">
                  <v-text-field
                      clearable
                      class="mr-2 pt-0 mt-0"
                      v-model="table.query.user.id"
                      :rules="[rules.isInteger]"
                      label="用户ID">
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      clearable
                      class="mr-2 pt-0 mt-0"
                      v-model="table.query.user.username"
                      label="用户名">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters align="center">
                <v-col cols="6">
                  <v-select v-model="table.query.user.status" :items="enums.userStatus" class="mt-0 pt-0 mr-2"
                            clearable label="状态"/>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="table.query.user.roleIdList" :items="roleMap" chips class="mt-0 pt-0 mr-2"
                            clearable deletable-chips item-text="roleName" item-value="id" label="角色" multiple
                            small-chips/>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="1">
            <v-btn class="ml-2" color="primary" fab small
                   @click="pageUser">
              <v-icon> mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1">
        <v-btn color="primary" @click="loadUserSaveDialog" v-text="'新增用户'"
        />
      </v-col>
    </v-row>
    <v-divider/>
    <el-table
        v-loading="table.loading"
        id="table"
        :data="table.data"
        stripe
        highlight-current-row
        height="68vh"
        style="width: 100%">
      <el-table-column
          label="编号"
          type="index"
          align="center"
          width="70px"
          :index="(index) => index + 1">
      </el-table-column>
      <el-table-column
          label="用户ID"
          property="id"
          align="center"
          sortable
          width="90px">
      </el-table-column>
      <el-table-column label="用户名" property="username">
      </el-table-column>
      <el-table-column label="邮箱" property="email">
      </el-table-column>
      <el-table-column label="手机号" property="phoneNum" width="180">
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template v-slot="scope">
          <v-avatar size="40" v-if="scope.row.avatarUrl!=null">
            <v-img :src="getAvatarPath(scope.row.avatarUrl)">
              <template v-slot:placeholder>
                <v-row align="center" class="fill-height ma-0" justify="center">
                  <v-progress-circular color="primary" indeterminate width="2"/>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
          <v-icon size="40" v-else>mdi-account-circle</v-icon>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色" width="200">
        <template slot-scope="scope">
          <v-chip v-for="item in scope.row.roleIdList"
                  :key="item" class="mx-1" label small
                  v-text="roleNameFormatter(item)">
          </v-chip>
        </template>
      </el-table-column>
      <el-table-column :formatter="userStatusFormatter" label="状态">
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template v-slot="scope">
          <v-btn
              text
              color="blue darken-1"
              class="mx-1"
              @click="loadUserUpdateDialog(scope.row)"
              v-text="'编辑'"
          />
          <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该用户吗？"
              @confirm="deleteUser(scope.row.id)"
          >
            <v-btn
                slot="reference"
                text
                color="red darken-1"
                class="mx-1"
                v-text="'删除'"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <v-row class="mt-7" no-gutters>
      <v-col cols="9" class="d-flex justify-end">
        <div style="width:90px">
          <v-select
              :items="enums.page"
              label="分页大小"
              lined
              dense
              v-model="table.query.page.size"
              @input="changePageSize"
          />
        </div>
      </v-col>
      <v-col cols="3">
        <v-pagination
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            v-model="table.query.page.current"
            :length="table.query.page.count"
            @input="changePage"
            total-visible="5"
        />
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog.isShow"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-text="dialog.title"/>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-form ref="userSaveOrUpdateForm">
            <v-container>
              <v-row no-gutters>
                <v-col cols="6" class="pr-3">
                  <v-text-field
                      v-model="dialog.user.username"
                      :disabled="!!dialog.user.id"
                      label="用户名"
                      :counter="rules.usernameMaxLength"
                      :rules="[rules.isUsername]"
                      clearable
                  />
                </v-col>
                <v-col class="pl-3" cols="6">
                  <v-text-field
                      v-model="dialog.user.phoneNum"
                      :rules="[rules.isPhoneNum]"
                      counter="11"
                      :disabled="!!dialog.user.id"
                      label="手机号码"
                      clearable
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="dialog.user.email"
                      :rules="[rules.isEmail]"
                      :disabled="!!dialog.user.id"
                      label="邮箱"
                      clearable
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-if="!dialog.user.id"
                      v-model="dialog.user.password"
                      :rules="[rules.isPassword]"
                      type="password"
                      label="密码"
                      :counter="rules.passwordMaxLength"
                      clearable
                  />
                  <v-text-field
                      v-if="!dialog.user.id"
                      type="password"
                      label="密码确认"
                      :rules="[value=>value===dialog.user.password||'两次输入的密码不一致']"
                      :counter="rules.passwordMaxLength"
                      clearable
                  />
                </v-col>
                <v-col cols="6">
                  <v-row align="center" class="mb-3 " no-gutters>
                    <div :style="{color:dialog.user.id?'#9E9E9D':'inherit'}" class="text-subtitle-1" v-text="'头像'"/>
                    <v-btn
                        v-if="dialog.user.avatarUrl!=null && !dialog.user.id"
                        x-small
                        depressed
                        class="error"
                        style="margin-left:72px"
                        @click="dialog.user.avatarUrl=null;"
                        v-text="'删除'"
                    />
                  </v-row>
                  <el-upload
                      v-if="!dialog.user.id"
                      class="avatar-uploader"
                      name="uploadFile"
                      :action="upload.path"
                      :headers="upload.header"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :on-error="handleAvatarError"
                      :before-upload="beforeAvatarUpload">
                    <v-img v-if="dialog.user.avatarUrl" :src="getAvatarPath(dialog.user.avatarUrl)"
                           contain height="150px" width="150px">
                      <template v-slot:placeholder>
                        <v-row
                            align="center"
                            class="fill-height ma-0"
                            justify="center"
                        >
                          <v-progress-circular
                              color="primary"
                              indeterminate
                              width="2"
                          />
                        </v-row>
                      </template>
                    </v-img>
                    <v-icon v-else>mdi-upload</v-icon>
                  </el-upload>
                  <div v-else>
                    <v-img v-if="dialog.user.avatarUrl" :src="getAvatarPath(dialog.user.avatarUrl)"
                           contain style="height: 150px;width: 150px;border: 2px dashed #9E9E9D;border-radius: 6px;">
                      <template v-slot:placeholder>
                        <v-row
                            align="center"
                            class="fill-height ma-0"
                            justify="center"
                        >
                          <v-progress-circular
                              color="primary"
                              indeterminate
                              width="2"
                          />
                        </v-row>
                      </template>
                    </v-img>
                    <v-icon v-else size="150px"
                            style="height: 150px;width: 150px;border: 2px dashed #9E9E9D;border-radius: 6px;">
                      mdi-account-circle
                    </v-icon>
                  </div>
                </v-col>
                <v-col cols=" 6" align-self="center">
                  <v-select
                      v-model="dialog.user.status"
                      class="pl-3"
                      :items="enums.userStatus"
                      label="状态"
                  />
                  <v-select
                      v-model="dialog.user.roleIdList"
                      class="pl-3"
                      chips
                      deletable-chips
                      small-chips
                      :items="roleMap"
                      item-text="roleName"
                      item-value="id"
                      label="角色"
                      multiple
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              color="grey darken-1"
              text
              @click="dialog.isShow = false"
              v-text="'取消'"
          />
          <v-btn
              color="primary"
              text
              :disabled="dialog.btn.loading"
              :loading="dialog.btn.loading"
              @click="saveOrUpdateUser"
              v-text="'保存'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  components: {},
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
  watch: {},
  created() {
  },
  data: function () {
    return {
      table: {
        loading: false,
        data: [],
        query: {
          page: {
            current: 1,
            size: 15,
            count: null
          },
          user: {
            id: null,
            username: null,
            status: null,
            roleIdList: null
          },
        }
      },
      dialog: {
        isShow: false,
        title: null,
        user: {
          id: null,
          username: null,
          phoneNum: null,
          email: null,
          avatarUrl: null,
          status: null,
          roleIdList: null,
          version: null,
        },
        btn: {
          loading: false
        }
      },
      upload: {
        path: this.GLOBAL.url.upload,
        header: {Authorization: this.$store.getters.getToken}
      },
      roleMap: [],
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums
    };
  },
  methods: {
    changePageSize() {
      this.table.query.page.current = 1;
      this.pageUser();
    },
    changePage() {
      this.pageUser();
    },
    pageUser() {
      if (this.$refs.userQueryForm.validate()) {
        this.table.loading = true;
        this.axios.post("/user/pageUser/" + this.table.query.page.current + "/" + this.table.query.page.size, JSON.stringify(this.table.query.user))
            .then((response) => {
              this.table.data = response.data.data;
              this.table.query.page.count = response.data.count;
              this.table.loading = false;
            });
      }
    },
    saveOrUpdateUser() {
      if (!this.$refs.userSaveOrUpdateForm.validate()) {
        return;
      }
      this.dialog.btn.loading = true;
      if (this.dialog.user.id) {
        this.axios.put("/user/updateUser", JSON.stringify(this.dialog.user))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.pageUser();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      } else {
        this.axios.post("/user/saveUser", JSON.stringify(this.dialog.user))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.pageUser();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      }
    },
    deleteUser(userId) {
      this.axios.delete("/user/removeUser/" + userId)
          .then(() => {
            this.showDialog = false;
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.pageUser();
          });
    },
    loadUserSaveDialog() {
      this.dialog.user.id = null;
      this.dialog.user.username = null;
      this.dialog.user.phoneNum = null;
      this.dialog.user.email = null;
      this.dialog.user.avatarUrl = null;
      this.dialog.user.status = null;
      this.dialog.user.roleIdList = null;
      this.dialog.user.version = null;
      this.dialog.title = "新增用户";
      this.dialog.isShow = true;
    },
    loadUserUpdateDialog(user) {
      this.dialog.user.id = user.id;
      this.dialog.user.username = user.username;
      this.dialog.user.phoneNum = user.phoneNum;
      this.dialog.user.email = user.email;
      this.dialog.user.avatarUrl = user.avatarUrl;
      this.dialog.user.status = user.status;
      this.dialog.user.roleIdList = user.roleIdList;
      this.dialog.user.version = user.version;
      this.dialog.title = "修改用户";
      this.dialog.isShow = true;
    },
    getAvatarPath(avatarUrl) {
      if (avatarUrl != null) {
        return this.GLOBAL.url.file + "/" + avatarUrl;
      }
    },
    handleAvatarSuccess(response) {
      this.dialog.user.avatarUrl = response.data;
      this.$notify({
        title: "图片上传成功",
        message: null,
        type: "success",
        duration: 2000,
      });
    },
    handleAvatarError(error) {
      console.log(error)
      this.$message.error("图像上传失败")
    },
    beforeAvatarUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    roleNameFormatter(roleId) {
      for (let item of this.roleMap) {
        if (item.id === roleId) {
          return item.roleName;
        }
      }
    },
    userStatusFormatter(row) {
      for (let item of this.enums.userStatus) {
        if (item.value === row.status) {
          return item.text;
        }
      }
    },
    loadRoleMap() {
      this.axios.get("/role/listAllRole").then((response) => {
        response.data.data.forEach(() => {
          this.roleMap = response.data.data;
        })
      });
    }
  },
  mounted() {
    this.pageUser();
    this.loadRoleMap();
  },
};
</script>

<style lang="scss">
#table {
  td, th.is-leaf {
    border-bottom: 0 solid #E0E0E0;
  }

  &:before {
    background-color: #E0E0E0;
  }
}

.el-popconfirm__main {
  margin-bottom: 10px;
}

.avatar-uploader {
  .el-upload {
    border: 1px solid #949494;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 150px;
    height: 150px;

    &:hover {
      border-color: #409EFF;
    }
  }
}

</style>