<template>
  <div>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="11" no-gutters>
        <div class="text-h4 pl-10 blue--text text--darken-2" v-text="'权限管理'"/>
      </v-col>
      <v-col cols="1">
        <v-btn
            color="primary"
            @click="loadRoleSaveDialog"
            v-text="'新增权限'"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
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
          label="权限ID"
          property="id"
          sortable
          width="90px">
      </el-table-column>
      <el-table-column
          label="权限名称"
          property="roleName">
      </el-table-column>
      <el-table-column
          label="权限描述"
          property="roleDescription">
      </el-table-column>
      <el-table-column
          label="创建时间"
          property="createTime"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" width="250px">
        <template v-slot="scope">
          <v-btn
              class="mx-1"
              color="blue darken-1"
              text
              @click="loadRoleUpdateDialog(scope.row)"
              v-text="'编辑'"
          />
          <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该权限吗？"
              @confirm="deleteRole(scope.row.id)"
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
    <v-row class="mt-7" no-gutters>
      <v-col class="d-flex justify-end" cols="9">
        <div style="width:90px">
          <v-select
              v-model="table.query.page.size"
              :items="[5,15,50,100]"
              dense
              label="分页大小"
              lined
              @input="changePageSize"
          ></v-select>
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
          <v-form ref="roleSaveOrUpdateForm">
            <v-container>
              <v-row no-gutters>
                <v-col class="pr-3" cols="6">
                  <v-text-field
                      v-model="dialog.role.roleName"
                      :counter="rules.roleNameMaxLength"
                      :rules="[rules.isRoleName]"
                      clearable
                      label="权限名称"
                  ></v-text-field>
                </v-col>
                <v-col class="pr-3" cols="6">
                  <v-text-field
                      v-model="dialog.role.roleDescription"
                      clearable
                      label="权限描述"
                  ></v-text-field>
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
              color="blue darken-1"
              text
              @click="saveOrUpdateRole"
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
            current: 1,
            size: 15,
            count: null
          },
          role: {
            id: null,
            roleName: null,
            roleDescription: null,
            createTime: null
          },
        }
      },
      dialog: {
        isShow: false,
        title: null,
        role: {
          id: null,
          roleName: null,
          roleDescription: null,
          createTime: null
        },
        btn: {
          loading: false
        }
      },
      rules: this.GLOBAL.rules
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
            })
            .finally(() => {
              this.dialog.btn.loading = false;
              this.dialog.isShow = false;
              this.pageRole();
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
            })
            .finally(() => {
              this.dialog.btn.loading = false;
              this.dialog.isShow = false;
              this.pageRole();
            });
      }
    },
    deleteRole(roleId) {
      this.axios.delete("/role/removeRole/" + roleId)
          .then(() => {
            this.showDialog = false;
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
      this.dialog.role.id = null;
      this.dialog.role.roleName = null;
      this.dialog.role.roleDescription = null;
      this.dialog.role.createTime = null;
      this.dialog.title = "新增权限";
      this.dialog.isShow = true;
    },
    loadRoleUpdateDialog(role) {
      this.dialog.role.id = role.id;
      this.dialog.role.roleName = role.roleName;
      this.dialog.role.roleDescription = role.roleDescription;
      this.dialog.role.createTime = role.createTime;
      this.dialog.title = "修改权限";
      this.dialog.isShow = true;
    },
  },
  mounted() {
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