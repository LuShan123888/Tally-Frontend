<template>
  <v-container class="pa-0" fluid>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="10" no-gutters>
        <span :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'权限管理'"/>
      </v-col>
      <v-col class="d-flex justify-end" cols="2">
        <v-row justify="end">
          <v-col cols="6">
            <v-btn
                color="primary"
                depressed
                @click="loadPermissionSaveDialog"
                v-text="'新增权限'"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
          label="权限ID"
          property="id"
          width="200px">
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
              v-if="scope.row.parentId !== 0"
              class="mx-1"
              color="primary"
              text
              @click="loadPermissionUpdateDialog(scope.row)"
              v-text="'修改'"
          />
          <el-popconfirm
              v-if="!scope.row.children"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该权限吗？"
              @confirm="deletePermission(scope.row.id)"
          >
            <v-btn
                slot="reference"
                class="mx-1"
                color="error"
                text
                v-text="'删除'"
            />
          </el-popconfirm>
          <v-btn
              v-else
              class="mx-1"
              color="warning"
              text
              @click="loadPermissionOrderDialog(scope.row.children)"
              v-text="'排序'"
          />
        </template>
      </el-table-column>
    </el-table>
    <v-form ref="permissionSaveOrUpdateForm">
      <v-dialog
          v-model="dialog.isShow"
          max-width="600px"
          persistent
      >
        <v-card>
          <v-card-title>
            <span class="text-h5" v-text="dialog.title"/>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                      v-model="dialog.permission.permissionName"
                      :rules="[(v) => !!v || '权限名称不能为空']"
                      clearable
                      label="权限名称"
                  />
                </v-col>
                <v-col class="pr-1" cols="6">
                  <v-autocomplete
                      v-model="dialog.permission.parentId"
                      :items="permissionList"
                      :disabled="dialog.permission.parentId === 0"
                      :rules="[(value) => value === 0 || !!value || '请选择父权限',(value)=>!dialog.permission.id||value!==dialog.permission.id.toString()||'不能指定父权限为自身', rules.isInteger]"
                      item-text="permissionName"
                      item-value="id"
                      label="父权限"
                      no-data-text="无对应选项"
                  />
                </v-col>
                <v-col class="pl-1" cols="6">
                  <v-select
                      v-model="dialog.permission.requestMethod"
                      :items="enums.requestMethod"
                      no-data-text="无对应选项"
                      label="请求方式"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="dialog.permission.requestUrl"
                      :rules="[(value) => !!value || '请输入访问路径']"
                      clearable
                      label="访问路径"
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
                @click="saveOrUpdatePermission"
                v-text="'保存'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <v-dialog v-model="orderDialog.isShow" max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span v-text="orderDialog.title"/>
        </v-card-title>
        <v-card-text class="pb-0">
          <draggable :list="orderDialog.permissionList" handle="#handle" tag="div"
                     v-bind="dragOptions">
            <transition-group type="transition">
              <v-row v-for="(item) in orderDialog.permissionList" :key="item.id"
                     align="center" class="rounded-lg mb-1 px-2 py-1" no-gutters>
                <v-col>
                  <span class="text-subtitle-2">{{ item.permissionName }}</span>
                </v-col>
                <v-col class="d-flex justify-end" cols="2">
                  <v-icon id="handle">mdi-format-list-bulleted</v-icon>
                </v-col>
              </v-row>
            </transition-group>
          </draggable>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              depressed
              text
              @click="orderDialog.isShow = false"
              v-text="'取消'"/>
          <v-btn
              color="primary"
              depressed
              :disabled="orderDialog.btn.loading"
              :loading="orderDialog.btn.loading"
              text
              @click="updatePermissionOrder"
              v-text="'保存'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "PermissionManagement",
  components: {draggable},
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
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
      };
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
          version: null,
          children: []
        },
        btn: {
          loading: false
        }
      },
      orderDialog: {
        isShow: false,
        title: null,
        permissionList: [{
          id: null,
          parentId: null,
          weight: null,
          permissionName: null,
          requestUrl: null,
          requestMethod: null,
          version: null
        }],
        btn: {
          loading: false
        }
      },
      permissionList: [],
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums
    };
  },
  methods: {
    loadPermissionTree() {
      this.table.loading = true;
      this.axios.get("/permission/listAllPermissionTree")
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
      this.dialog.permission.children = null;
      if (this.dialog.permission.id) {
        this.axios.put("/permission/updatePermission", this.dialog.permission)
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.loadPermissionTree();
              this.loadPermissionList();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      } else {
        this.axios.post("/permission/savePermission", this.dialog.permission)
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.loadPermissionTree();
              this.loadPermissionList();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      }
    },
    updatePermissionOrder() {
      this.orderDialog.btn.loading = true;
      let list = [];
      let weight = 1;
      for (let item of this.orderDialog.permissionList) {
        list.push({id: item.id, weight: weight, version: item.version})
        weight = weight + 1;
      }
      this.axios.put("/permission/orderPermission", list)
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.orderDialog.isShow = false;
            this.loadPermissionTree();
            this.loadPermissionList();
          })
          .finally(() => {
            this.orderDialog.btn.loading = false;
          });
    },
    deletePermission(permissionId) {
      this.axios.delete("/permission/removePermission/" + permissionId)
          .then(() => {
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.loadPermissionTree();
            this.loadPermissionList();
          });
    },
    loadPermissionSaveDialog() {
      this.$refs.permissionSaveOrUpdateForm.resetValidation();
      this.dialog.title = "新增权限";
      this.dialog.isShow = true;
      this.dialog.permission.id = null;
      this.dialog.permission.createdDatetime = null;
      this.dialog.permission.updatedDatetime = null;
      this.dialog.permission.version = null;
      this.dialog.permission.deleted = null;
      this.dialog.permission.weight = 0;
    },
    loadPermissionUpdateDialog(permission) {
      this.$refs.permissionSaveOrUpdateForm.resetValidation();
      this.dialog.permission = JSON.parse(JSON.stringify(permission));
      this.dialog.title = "修改权限";
      this.dialog.isShow = true;
    },
    loadPermissionOrderDialog(permissionList) {
      this.orderDialog.permissionList = JSON.parse(JSON.stringify(permissionList));
      this.orderDialog.title = '权限排序';
      this.orderDialog.isShow = true;
    },
    loadPermissionList() {
      this.table.loading = true;
      this.axios.get("/permission/listAllPermission")
          .then((response) => {
            this.permissionList = response.data.data;
          });
    },
  },
  mounted() {
    this.loadPermissionTree();
    this.loadPermissionList();
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

.ghost {
  opacity: 0.5;
  background: #F1F2F6;
}
</style>