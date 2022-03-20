<template>
  <v-container class="pa-0" fluid>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="3" no-gutters>
        <span :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'角色管理'"/>
      </v-col>
      <v-col cols="7">
        <v-row align="center" no-gutters>
          <v-col cols="7">
            <v-form ref="roleQueryForm">
              <v-row align="center" no-gutters>
                <v-col cols="4">
                  <v-text-field
                      v-model="table.query.role.id"
                      :rules="[rules.isInteger]"
                      class="mr-2 pt-0 mt-0"
                      clearable
                      label="角色ID"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                      v-model="table.query.role.roleName"
                      class="mr-2 pt-0 mt-0"
                      clearable
                      label="角色名称"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                      v-model="table.query.role.description"
                      class="mr-2 pt-0 mt-0"
                      clearable
                      label="角色描述"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="1">
            <v-btn
                depressed
                class="ml-2"
                color="primary"
                fab
                small
                @click="pageRole"
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end" cols="2">
        <v-row justify="end">
          <v-col cols="6">
            <v-btn
                color="primary"
                depressed
                @click="loadRoleSaveDialog"
                v-text="'新增角色'"
            />
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
          label="角色ID"
          property="id"
          sortable
          width="90px">
      </el-table-column>
      <el-table-column
          label="角色名称"
          property="roleName">
      </el-table-column>
      <el-table-column
          label="角色描述"
          property="description">
      </el-table-column>
      <el-table-column
          label="创建时间"
          property="createdDatetime"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" width="250px">
        <template v-slot="scope">
          <v-btn
              class="mx-1"
              color="primary"
              text
              @click="loadRoleUpdateDialog(scope.row)"
              v-text="'修改'"
          />
          <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该角色吗？"
              @confirm="deleteRole(scope.row.id)"
          >
            <v-btn
                slot="reference"
                class="mx-1"
                color="error"
                text
                v-text="'删除'"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <v-row class="mt-7" no-gutters>
      <v-col class="d-flex justify-end" cols="9">
        <div style="width:90px">
          <v-select
              v-model="table.query.page.size"
              :items="enums.page"
              no-data-text="无对应选项"
              dense
              label="分页大小"
              lined
              @input="changePageSize"
          />
        </div>
      </v-col>
      <v-col cols="3">
        <v-pagination
            v-model="table.query.page.current"
            :length="table.query.page.count"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            total-visible="5"
            @input="changePage"
        />
      </v-col>
    </v-row>
    <v-form ref="roleSaveOrUpdateForm">
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
                      v-model="dialog.role.roleName"
                      :counter="rules.roleNameMaxLength"
                      :rules="[rules.isRoleName]"
                      clearable
                      label="角色名称"
                  />
                </v-col>
                <v-col class="pl-1" cols="6">
                  <v-text-field
                      v-model="dialog.role.description"
                      clearable
                      label="角色描述"
                  />
                </v-col>
                <v-col cols="12">
                  <span :style="{fontSize: '16px'}" class="mt-3" v-text="'角色权限'"/>
                  <v-treeview
                      v-model="dialog.role.permissionIdSet" :items="dialog.permissionTree" dense
                      open-on-click selectable
                      hoverable item-children="children" item-key="id" item-text="permissionName"
                      selected-color="primary" transition/>
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
                @click="saveOrUpdateRole"
                v-text="'保存'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "RoleManagement",
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
          role: {
            id: null,
            roleName: null,
            description: null,
            createdDatetime: null
          },
        }
      },
      dialog: {
        isShow: false,
        title: null,
        role: {
          id: null,
          roleName: null,
          description: null,
          createdDatetime: null,
          permissionIdSet: [],
          version: null,
        },
        btn: {
          loading: false
        },
        permissionTree: null
      },
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums
    };
  },
  methods: {
    changePageSize() {
      this.table.query.page.current = 1;
      this.pageRole();
    },
    changePage() {
      this.pageRole();
    },
    pageRole() {
      if (this.$refs.roleQueryForm.validate()) {
        this.table.loading = true;
        this.axios.post("/role/pageRole/" + this.table.query.page.current + "/" + this.table.query.page.size, JSON.stringify(this.table.query.role))
            .then((response) => {
              this.table.data = response.data.data;
              this.table.query.page.count = response.data.count;
              this.table.loading = false;
            });
      }
    },
    saveOrUpdateRole() {
      if (!this.$refs.roleSaveOrUpdateForm.validate()) {
        return;
      }
      this.dialog.btn.loading = true;
      if (this.dialog.role.id) {
        this.axios.put("/role/updateRole", JSON.stringify(this.dialog.role))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.pageRole();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      } else {
        this.axios.post("/role/saveRole", JSON.stringify(this.dialog.role))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.dialog.isShow = false;
              this.pageRole();
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      }
    },
    deleteRole(roleId) {
      this.axios.delete("/role/removeRole/" + roleId)
          .then(() => {
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.pageRole();
          });
    },
    loadRoleSaveDialog() {
      this.$refs.roleSaveOrUpdateForm.resetValidation()
      this.dialog.title = "新增角色";
      this.dialog.isShow = true;
      this.dialog.role = {};
    },
    loadRoleUpdateDialog(role) {
      this.$refs.roleSaveOrUpdateForm.resetValidation()
      this.dialog.role = JSON.parse(JSON.stringify(role));
      this.dialog.title = "修改角色";
      this.dialog.isShow = true;
    },
    loadPermissionTree() {
      this.table.loading = true;
      this.axios.get("/permission/listAllPermissionTree")
          .then((response) => {
            this.dialog.permissionTree = response.data.data;
          });
    },
  },
  mounted() {
    this.loadPermissionTree();
    this.pageRole();
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

</style>