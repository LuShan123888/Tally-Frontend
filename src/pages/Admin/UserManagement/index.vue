<template>
  <div>
    <v-row style="height:150px" no-gutters align="center">
      <v-col cols="2" no-gutters>
        <div class="text-h4 pl-10">用户管理</div>
      </v-col>
      <v-col cols="9">
        <v-row no-gutters>
          <v-col cols="2">
            <v-text-field
                dense
                clearable
                v-model="queryUser.id"
                label="用户ID"
            >
            </v-text-field>
          </v-col>
          <v-col cols="2" class="mx-3">
            <v-text-field
                clearable
                dense
                v-model="queryUser.username"
                label="用户名"
            >
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn
                small
                fab
                color="primary"
                @click="loadData()"
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1">
        <v-btn
            color="primary"
            @click="handleSave()"
        >
          新增用户
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <el-table
        v-loading="loading"
        id="table"
        :data="tableData"
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
      <el-table-column
          label="角色"
          sortable
          align="center"
          property="roleIdList"
          width="200">
        <template slot-scope="scope">
          <v-chip
              v-for="item in scope.row.roleIdList"
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
          property="status"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template v-slot="scope">
          <v-btn
              small
              class="ma-1"
              @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </v-btn>
          <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该用户吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
          >
            <v-btn
                slot="reference"
                small
                color="error"
                class="ma-1"
            >
              删除
            </v-btn>
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
              v-model="page.pageSize"
              @input="changePageSize"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="3">
        <v-pagination
            v-model="page.currentPage"
            :length="page.pageCount"
            @input="changePage"
            :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-text="dialogTitle"/>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-container>
            <v-row no-gutters>
              <v-col cols="6" class="pr-3">
                <v-text-field
                    v-model="tempUser.username"
                    label="用户名"
                    required
                    clearable
                ></v-text-field>
              </v-col>
              <v-col class="pl-3" cols="6">
                <v-text-field
                    v-model="tempUser.phoneNum"
                    label="手机号码"
                    clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="tempUser.email"
                    label="邮箱"
                    clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="tempUser.id == null">
                <v-text-field
                    v-model="tempUser.password"
                    type="password"
                    label="密码"
                    clearable
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1 mt-3 mb-1">
                  头像
                </div>
                <el-upload
                    class="avatar-uploader"
                    name="uploadFile"
                    :action="uploadPath"
                    :headers="uploadHeader"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError"
                    :before-upload="beforeAvatarUpload">
                  <img v-if="tempUser.avatarUrl" :src="tempUser.avatarPath" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </v-col>
              <v-col cols="6">
                <v-row no-gutters>
                  <v-autocomplete
                      v-model="tempUser.status"
                      class="pl-3"
                      :items="[{text:'正常',value:'NORMAL'},{text:'禁用',value:'PROHIBIT'}]"
                      label="状态"
                      required
                  ></v-autocomplete>
                </v-row>
                <v-row no-gutters>
                  <v-autocomplete
                      v-model="tempUser.roleIdList"
                      class="pl-3"
                      chips
                      deletable-chips
                      small-chips
                      :items="roleMap"
                      label="角色"
                      multiple
                  ></v-autocomplete>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="saveOrUpdateUser()"
          >
            保存
          </v-btn>
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
  },
  watch: {},
  created() {
  },
  data: function () {
    return {
      loading: false,
      tableData: null,
      dialog: false,
      dialogTitle: null,
      uploadPath: this.GLOBAL.apiBase + "/file/upload",
      uploadHeader: {
        Authorization: this.$store.getters.getToken
      },
      tempUser: {
        id: null,
        username: null,
        phoneNum: null,
        email: null,
        avatarUrl: null,
        status: null,
        roleIdList: null,
        avatarPath: null
      },
      queryUser: {
        id: null,
        username: null
      },
      roleMap: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        pageCount: 5
      }
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
    handleEdit(index, item) {
      this.tempUser.id = item.id;
      this.tempUser.username = item.username;
      this.tempUser.phoneNum = item.phoneNum;
      this.tempUser.email = item.email;
      this.tempUser.avatarUrl = item.avatarUrl;
      this.tempUser.status = item.status;
      this.tempUser.roleIdList = item.roleIdList;
      if (item.avatarUrl != null) {
        this.tempUser.avatarPath = this.GLOBAL.fileBase + item.avatarUrl;
      }
      this.dialogTitle = "修改用户";
      this.dialog = true;
    },
    handleDelete(index, item) {
      console.log(item);
    },
    handleSave() {
      this.tempUser.id = null;
      this.tempUser.username = null;
      this.tempUser.phoneNum = null;
      this.tempUser.email = null;
      this.tempUser.avatarUrl = null;
      this.tempUser.status = null;
      this.tempUser.roleIdList = null;
      this.dialogTitle = "新增用户";
      this.dialog = true;
    },
    saveOrUpdateUser() {
      this.dialog = false;
      console.log(this.tempUser);
    },
    loadData() {
      this.loading = true;
      this.axios.post(this.GLOBAL.apiBase + "/user/listUser",
          JSON.stringify(this.queryUser),
          {headers: {"Content-Type": "application/json;charset=UTF-8",},}
      ).then((response) => {
        this.tableData = response.data.data;
        this.loading = false;
      });
    },
    handleAvatarSuccess(res) {
      console.log(res)
      let filePath = res.data;
      this.tempUser.avatarUrl = filePath;
      this.tempUser.avatarPath = this.GLOBAL.fileBase + filePath;
      this.$notify({
        title: "图片上传成功",
        message: null,
        type: "success",
        duration: 2000,
      });
    },
    handleAvatarError(err) {
      console.log(err)
      this.$message.error("图像上传失败")
    },
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
    },
    roleFormatter(roleId) {
      for (let item of this.roleMap) {
        if (item.value === roleId) {
          return item.text;
        }
      }
    },
    loadRoleMap() {
      let _this = this;
      this.axios.get(this.GLOBAL.apiBase + "/role/listAllRole").then((response) => {
        let roleMap = response.data.data;
        roleMap.forEach(item => {
          let tempRole = {
            text: item.roleName,
            value: item.id
          }
          _this.roleMap.push(tempRole)
        })
      });
    }
  },
  mounted() {
    this.loadData();
    this.loadRoleMap();
  },
};
</script>

<style lang="scss">
#background-img {
  position: fixed;
}

#table td, #table th.is-leaf {
  border-bottom: 0 solid #E0E0E0;
}

#table::before {
  background-color: #E0E0E0;
}

.el-popconfirm__main {
  margin-bottom: 10px;
}

.avatar-uploader .el-upload {
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 150px;
  height: 150px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 28px;
  height: 28px;
  line-height: 150px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>