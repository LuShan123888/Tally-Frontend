<template>
  <v-container class="pa-0" fluid>
    <v-row style="height:150px" no-gutters align="center">
      <v-col cols="3" no-gutters>
        <span :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'用户管理'"/>
      </v-col>
      <v-col cols="7">
        <v-row no-gutters align="center">
          <v-col cols="5">
            <v-form ref="userQueryForm">
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
                  <v-select v-model="table.query.user.status"
                            :items="enums.userStatus" class="mt-0 pt-0 mr-2"
                            no-data-text="无对应选项"
                            clearable label="状态"/>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="table.query.user.roleIdSet"
                            :items="roleMap" chips class="mt-0 pt-0 mr-2"
                            no-data-text="无对应选项"
                            clearable deletable-chips item-text="roleName" item-value="id" label="角色" multiple
                            small-chips/>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="1">
            <v-btn class="ml-2" color="primary" depressed fab small
                   @click="pageUser">
              <v-icon> mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end" cols="2">
        <v-row justify="end">
          <v-col cols="6"></v-col>
          <v-col cols="6">
            <v-btn color="primary" depressed @click="loadUserSaveDialog" v-text="'新增用户'"/>
          </v-col>
          <v-col cols="6">
            <v-btn :disabled="btn.export.isLoading"
                   :loading="btn.export.isLoading"
                   color="warning"
                   depressed @click="exportUser" v-text="'导出用户'"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
      <el-table-column label="手机号" property="phoneNumber" width="180">
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template v-slot="scope">
          <avatar :path="scope.row.avatarPath" size="40"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色" width="200">
        <template v-slot="scope">
          <v-chip v-for="item in scope.row.roleIdSet"
                  :key="item" class="mx-1" label small
                  v-text="roleNameFormatter(item)">
          </v-chip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template v-slot="scope">
          <v-chip :color="scope.row.status==='NORMAL'?'success':'secondary'" class="mx-1" label small
                  v-text="userStatusFormatter(scope.row)">
          </v-chip>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template v-slot="scope">
          <v-btn
              text
              color="primary"
              class="mx-1"
              @click="loadUserUpdateDialog(scope.row)"
              v-text="'修改'"/>
          <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该用户吗？"
              @confirm="deleteUser(scope.row.id)">
            <v-btn
                slot="reference"
                text
                color="error"
                class="mx-1"
                v-text="'删除'"/>
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
              no-data-text="无对应选项"
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
    <v-form ref="userSaveOrUpdateForm">
      <v-dialog
          v-model="dialog.isShow"
          max-width="600px"
          persistent>
        <v-card>
          <v-card-title>
            <span class="text-h5" v-text="dialog.title"/>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col class="pr-1" cols="6">
                  <v-text-field
                      v-model="dialog.user.username"
                      :disabled="!!dialog.user.id"
                      label="用户名"
                      :counter="rules.usernameMaxLength"
                      :rules="[rules.isUsername]"
                      clearable
                  />
                </v-col>
                <v-col class="pl-1" cols="6">
                  <v-text-field
                      v-model="dialog.user.phoneNumber"
                      :rules="[rules.isphoneNumber]"
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
                      :rules="[(value) => value === dialog.user.password || '两次输入的密码不一致']"
                      :counter="rules.passwordMaxLength"
                      clearable
                  />
                </v-col>
                <v-col cols="4">
                  <v-row align="center" class="mb-3 " no-gutters>
                    <span :style="{color:dialog.user.id?'#9E9E9D':'inherit'}" class="text-subtitle-1" v-text="'头像'"/>
                    <v-btn
                        v-if="dialog.user.avatarPath!=null && !dialog.user.id"
                        x-small
                        depressed
                        class="error"
                        style="margin-left:72px"
                        @click="dialog.user.avatarPath=null;"
                        v-text="'删除'"
                    />
                  </v-row>
                  <image-uploader v-if="!dialog.user.id" :image-path="dialog.user.avatarPath" border-radius="50%"
                                  @setImagePath="(imagePath)=>{dialog.user.avatarPath = imagePath}"/>
                  <div v-else>
                    <i-image v-if="dialog.user.avatarPath" :src="getImageUrl(dialog.user.avatarPath)"
                             style="height: 150px;width: 150px;border: 2px dashed #9E9E9D;border-radius: 50%;"/>
                    <v-icon v-else size="150px"
                            style="height: 150px;width: 150px;border: 2px dashed #9E9E9D;border-radius: 50%;">
                      mdi-account-circle
                    </v-icon>
                  </div>
                </v-col>
                <v-col align-self="center">
                  <v-select
                      v-model="dialog.user.status"
                      no-data-text="无对应选项"
                      :items="enums.userStatus"
                      label="状态"
                  />
                  <v-select
                      v-model="dialog.user.roleIdSet"
                      no-data-text="无对应选项"
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
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                text
                @click="dialog.isShow = false"
                v-text="'取消'"
            />
            <v-btn
                :disabled="dialog.btn.loading"
                :loading="dialog.btn.loading"
                color="primary"
                text
                @click="saveOrUpdateUser"
                v-text="'保存'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<script>
import Avatar from '@/components/Avatar';
import iImage from '@/components/iImage';
import ImageUploader from '@/components/ImageUploader';

export default {
  name: "UserManagement",
  components: {iImage, Avatar, ImageUploader},
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
            roleIdSet: null
          },
        }
      },
      dialog: {
        isShow: false,
        title: null,
        user: {
          id: null,
          username: null,
          phoneNumber: null,
          email: null,
          avatarPath: null,
          status: null,
          roleIdSet: null,
          version: null,
        },
        btn: {
          loading: false
        }
      },
      btn: {
        export: {
          isLoading: false
        }
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
        this.axios.post("/user/pageUser/" + this.table.query.page.current + "/" + this.table.query.page.size, this.table.query.user)
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
        this.axios.put("/user/updateUser", this.dialog.user)
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
        this.axios.post("/user/saveUser", this.dialog.user)
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
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.pageUser();
          });
    },
    exportUser() {
      if (this.$refs.userQueryForm.validate()) {
        this.btn.export.isLoading = true;
        this.axios.post(
            '/user/pageUser/' + this.table.query.page.current + '/' + this.table.query.page.size + '/?export=excel',
            this.table.query.user,
            {responseType: 'blob'})
            .then(response => {
              let url = window.URL.createObjectURL(new Blob([response.data]));
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;
              link.setAttribute('download', 'export.xlsx')
              document.body.appendChild(link)
              link.click()
            }).finally(() => {
          this.btn.export.isLoading = false;
        })
      }
    },
    loadUserSaveDialog() {
      this.$refs.userSaveOrUpdateForm.resetValidation();
      this.dialog.title = "新增用户";
      this.dialog.isShow = true;
      this.dialog.user = {};
    },
    loadUserUpdateDialog(user) {
      this.$refs.userSaveOrUpdateForm.resetValidation();
      this.dialog.user = JSON.parse(JSON.stringify(user));
      this.dialog.title = "修改用户";
      this.dialog.isShow = true;
    },
    getImageUrl(imagePath) {
      if (imagePath != null) {
        return this.GLOBAL.url.static + "/" + imagePath;
      }
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
  }
  ,
  mounted() {
    this.pageUser();
    this.loadRoleMap();
  }
  ,
}
;
</script>

<style lang="scss">
#table {
  td, th.is-leaf {
    border-bottom: 0 solid #E0E0E0;
  }

  &:before {
    background-color: #E0E0E0;
    height: 0;
  }
}

.el-popconfirm__main {
  margin-bottom: 10px;
}

.v-pagination {
  li {
    button {
      box-shadow: none;
    }
  }
}
</style>