<template>
  <div>
    <v-row style="height:150px" no-gutters align="center">
      <v-col cols="2" no-gutters>
        <div class="text-h4 pl-10" v-text="'用户管理'"/>
      </v-col>
      <v-col cols="9">
        <v-form style="width:100%" ref="userQueryForm">
          <v-row no-gutters>
            <v-col cols="2">
              <v-text-field
                  dense
                  clearable
                  v-model="table.query.user.id"
                  :rules="[rules.isInteger]"
                  label="用户ID"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2" class="mx-3">
              <v-text-field
                  clearable
                  dense
                  v-model="table.query.user.username"
                  label="用户名"
              >
              </v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn
                  small
                  fab
                  color="primary"
                  @click="queryUser"
              >
                <v-icon>
                  mdi-magnify
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="1">
        <v-btn
            color="primary"
            @click="loadUserSaveDialog()"
            v-text="'新增用户'"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
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
      <el-table-column
          label="用户名"
          property="username">
      </el-table-column>
      <el-table-column
          label="邮箱"
          property="email"
      >
      </el-table-column>
      <el-table-column
          label="手机号"
          property="phoneNum"
          width="180">
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template v-slot="scope">
          <v-avatar size="40" v-if="scope.row.avatarUrl!=null">
            <img :src="getAvatarPath(scope.row.avatarUrl)">
          </v-avatar>
          <v-icon size="40" v-else>mdi-account-circle</v-icon>
        </template>
      </el-table-column>
      <el-table-column
          label="角色"
          sortable
          align="center"
          width="200">
        <template slot-scope="scope">
          <v-chip
              v-for="item in scope.row.sysRoleIdList"
              :key="item"
              class="mx-1"
              label
              small
              v-text="roleFormatter(item)"
          >
          </v-chip>
        </template>
      </el-table-column>
      <el-table-column
          label="状态"
          sortable
          :formatter="(row) => row.status === 'NORMAL' ?'正常':'禁用'"
      >
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
              :items="[10,20,50,100]"
              label="分页大小"
              lined
              dense
              v-model="table.query.page.pageSize"
              @input="changePageSize"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="3">
        <v-pagination
            v-model="table.query.page.currentPage"
            :length="table.query.page.pageCount"
            @input="changePage"
            :total-visible="7"
        ></v-pagination>
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
          <v-form ref="userSaveForm">
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
                  ></v-text-field>
                </v-col>
                <v-col class="pl-3" cols="6">
                  <v-text-field
                      v-model="dialog.user.phoneNum"
                      :rules="[rules.isPhoneNum]"
                      counter="11"
                      :disabled="!!dialog.user.id"
                      label="手机号码"
                      clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="dialog.user.email"
                      :rules="[rules.isEmail]"
                      :disabled="!!dialog.user.id"
                      label="邮箱"
                      clearable
                  ></v-text-field>
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
                  ></v-text-field>
                  <v-text-field
                      v-if="!dialog.user.id"
                      type="password"
                      label="密码确认"
                      :rules="[value=>value===dialog.user.password||'两次输入的密码不一致']"
                      :counter="rules.passwordMaxLength"
                      clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-row align="center" class="mb-3 " no-gutters>
                    <div class="text-subtitle-1" v-text="'头像'"/>
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
                    <img v-if="dialog.user.avatarUrl" :src="getAvatarPath(dialog.user.avatarUrl)"
                         style="height: 150px;width: 150px">
                    <v-icon v-else>mdi-upload</v-icon>
                  </el-upload>
                  <div v-else>
                    <img v-if="dialog.user.avatarUrl" :src="getAvatarPath(dialog.user.avatarUrl)"
                         style="height: 150px;width: 150px;border: 1px solid #949494;border-radius: 6px;">
                    <v-icon v-else size="150px" style="height: 150px;width: 150px;border: 1px solid #949494;border-radius: 6px;">mdi-account-circle</v-icon>
                  </div>
                </v-col>
                <v-col cols=" 6" align-self="center">
                  <v-select
                      v-model="dialog.user.status"
                      class="pl-3"
                      :items="[{text:'正常',value:'NORMAL'},{text:'禁用',value:'PROHIBIT'}]"
                      label="状态"
                  />
                  <v-select
                      v-model="dialog.user.sysRoleIdList"
                      class="pl-3"
                      chips
                      deletable-chips
                      small-chips
                      :items="roleMap"
                      label="角色"
                      multiple
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="grey darken-1"
              text
              @click="dialog.isShow = false"
              v-text="'取消'"
          />
          <v-btn
              color="blue darken-1"
              text
              @click="saveOrUpdateUser()"
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
    }
  },
  watch: {},
  created() {
  },
  data: function () {
    return {
      table: {
        loading: false,
        data: null,
        query: {
          page: {
            currentPage: 1,
            pageSize: 10,
            pageCount: 5
          },
          user: {
            id: null,
            username: null
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
          sysRoleIdList: null,
        },
      },
      upload: {
        path: this.GLOBAL.url.upload,
        header: {Authorization: this.$store.getters.getToken}
      },
      roleMap: [],
      rules: this.GLOBAL.rules
    };
  },
  methods: {
    changePageSize(pageSize) {
      this.page.pageSize = pageSize;
      this.loadData();
    },
    changePage(currentPage) {
      this.page.currentPage = currentPage;
      this.loadData();
    },
    loadUserSaveDialog() {
      this.dialog.user.id = null;
      this.dialog.user.username = null;
      this.dialog.user.phoneNum = null;
      this.dialog.user.email = null;
      this.dialog.user.avatarUrl = null;
      this.dialog.user.status = null;
      this.dialog.user.sysRoleIdList = null;
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
      this.dialog.user.sysRoleIdList = user.sysRoleIdList;
      this.dialog.user.version = user.version;
      this.dialog.title = "修改用户";
      this.dialog.isShow = true;
    },
    saveOrUpdateUser() {
      if (!this.$refs.userSaveForm.validate()) {
        return;
      }
      if(this.dialog.user.id){
        console.log(this.dialog.user)
        this.axios.put("/user/updateUser", JSON.stringify(this.dialog.user))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.loadData();
            });
      }else {
        this.axios.post("/user/saveUser", JSON.stringify(this.dialog.user))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.loadData();
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
            this.loadData();
          });
    },
    queryUser() {
      if (this.$refs.userQueryForm.validate()) {
        this.loadData();
      }
    }
    ,
    loadData() {
      this.table.loading = true;
      this.axios.post("/user/listUser", JSON.stringify(this.table.query.user))
          .then((response) => {
            this.table.data = response.data.data;
            this.table.loading = false;
          });
    }
    ,
    getAvatarPath(avatarUrl) {
      if (avatarUrl != null) {
        return this.GLOBAL.url.file + avatarUrl;
      }
    }
    ,
    handleAvatarSuccess(res) {
      this.dialog.user.avatarUrl = res.data;
      this.$notify({
        title: "图片上传成功",
        message: null,
        type: "success",
        duration: 2000,
      });
    }
    ,
    handleAvatarError(err) {
      console.log(err)
      this.$message.error("图像上传失败")
    }
    ,
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
    ,
    roleFormatter(roleId) {
      for (let item of this.roleMap) {
        if (item.value === roleId) {
          return item.text;
        }
      }
    }
    ,
    loadRoleMap() {
      let _this = this;
      this.axios.get("/role/listAllRole").then((response) => {
        response.data.data.forEach(item => {
          let role = {
            text: item.roleName,
            value: item.id
          }
          _this.roleMap.push(role)
        })
      });
    }
  }
  ,
  mounted() {
    this.loadData();
    this.loadRoleMap();
  }
  ,
}
;
</script>

<style lang="scss">
#background-img {
  position: fixed;
}

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