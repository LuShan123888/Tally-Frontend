<template>
  <div>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="11" no-gutters>
        <div :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'权限管理'"/>
      </v-col>
      <v-col cols="1">
        <v-btn
            color="primary"
            @click="loadPermissionSaveDialog"
            v-text="'新增权限'"
        />
      </v-col>
    </v-row>
    <v-divider/>
    <el-table
        id="table"
        v-loading="table.loading"
        :data="table.data"
        height="68vh"
        highlight-current-row
        :expand-row-keys="['1']"
        :tree-props="{children: 'children'}"
        row-key="id"
        stripe
        style="width: 100%">
      <el-table-column
          :index="(index) => index + 1"
          align="center"
          label="编号"
          type="index"
          width="70px">
      </el-table-column>
      <el-table-column
          align="center"
          label="权限ID"
          property="id"
          width="200px">
      </el-table-column>
      <el-table-column
          label="权重"
          property="weight"
          width="70px">
      </el-table-column>
      <el-table-column
          label="权限名称"
          property="permissionName">
      </el-table-column>
      <el-table-column
          label="访问路径"
          property="requestUrl">
      </el-table-column>
      <el-table-column
          label="请求方式"
          property="requestMethod">
      </el-table-column>
      <el-table-column align="center" label="操作" width="250px">
        <template v-slot="scope">
          <v-btn
              class="mx-1"
              color="blue darken-1"
              text
              @click="loadPermissionUpdateDialog(scope.row)"
              v-text="'编辑'"
          />
          <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该权限吗？"
              @confirm="deletePermission(scope.row.id)"
          >
            <v-btn
                slot="reference"
                class="mx-1"
                color="red darken-1"
                text
                v-text="'删除'"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <v-dialog
        v-model="dialog.isShow"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-text="dialog.title"/>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-form ref="permissionSaveOrUpdateForm">
            <v-container>
              <v-row no-gutters>
                <v-col class="pr-3" cols="6">
                  <v-text-field
                      v-model="dialog.permission.permissionName"
                      :counter="rules.permissionNameMaxLength"
                      :rules="[rules.isPermissionName]"
                      clearable
                      label="权限名称"
                  />
                </v-col>
                <v-col class="pr-3" cols="6">
                  <v-text-field
                      v-model="dialog.permission.parentId"
                      :rules="[(value) => !!value || '请输入父权限ID',(value)=>!dialog.permission.id||value!==dialog.permission.id.toString()||'不能指定父权限为自身', rules.isInteger]"
                      clearable
                      label="父权限ID"
                  />
                </v-col>
                <v-col class="pr-3" cols="6">
                  <v-text-field
                      v-model="dialog.permission.weight"
                      :rules="[(value) => !!value || '请输入权重', rules.isInteger]"
                      clearable
                      label="权重"
                  />
                </v-col>
                <v-col class="pr-3" cols="6">
                  <v-select
                      v-model="dialog.permission.requestMethod"
                      :items="enums.requestMethod"
                      label="请求方式"
                  />
                </v-col>
                <v-col class="pr-3" cols="12">
                  <v-text-field
                      v-model="dialog.permission.requestUrl"
                      :rules="[(value) => !!value || '请输入访问路径']"
                      clearable
                      label="访问路径"
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
              :disabled="dialog.btn.loading"
              :loading="dialog.btn.loading"
              color="primary"
              text
              @click="saveOrUpdatePermission"
              v-text="'保存'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PermissionManager",
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
        data: []
      },
      dialog: {
        isShow: false,
        title: null,
        permission: {
          id: null,
          parentId: null,
          weight: null,
          permissionName: null,
          requestUrl: null,
          requestMethod: null,
          version: null
        },
        btn: {
          loading: false
        }
      },
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums
    };
  },
  methods: {
    changePageSize() {
      this.table.query.page.current = 1;
      this.pagePermission();
    },
    changePage() {
      this.pagePermission();
    },
    pagePermission() {
      this.table.loading = true;
      this.axios.get("/permission/listAllPermission")
          .then((response) => {
            this.table.data = response.data.data;
            this.table.loading = false;
          });
    },
    saveOrUpdatePermission() {
      if (!this.$refs.permissionSaveOrUpdateForm.validate()) {
        return;
      }
      this.dialog.btn.loading = true;
      if (this.dialog.permission.id) {
        this.axios.put("/permission/updatePermission", JSON.stringify(this.dialog.permission))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.pagePermission();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      } else {
        this.axios.post("/permission/savePermission", JSON.stringify(this.dialog.permission))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.pagePermission();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      }
    },
    deletePermission(permissionId) {
      this.axios.delete("/permission/removePermission/" + permissionId)
          .then(() => {
            this.showDialog = false;
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.pagePermission();
          });
    },
    loadPermissionSaveDialog() {
      if (this.dialog.permission.id) {
        this.$refs.permissionSaveOrUpdateForm.resetValidation();
      }
      this.dialog.permission.id = null;
      this.dialog.permission.weight = this.dialog.permission.weight ? this.dialog.permission.weight + 1 : null;
      this.dialog.permission.version = null;
      this.dialog.title = "新增权限";
      this.dialog.isShow = true;
    },
    loadPermissionUpdateDialog(permission) {
      this.dialog.permission.id = permission.id;
      this.dialog.permission.parentId = permission.parentId;
      this.dialog.permission.weight = permission.weight;
      this.dialog.permission.permissionName = permission.permissionName;
      this.dialog.permission.requestUrl = permission.requestUrl;
      this.dialog.permission.requestMethod = permission.requestMethod;
      this.dialog.permission.version = permission.version;
      this.dialog.title = "修改权限";
      this.dialog.isShow = true;
    },
  },
  mounted() {
    this.pagePermission();
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