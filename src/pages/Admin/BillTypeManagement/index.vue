<template>
  <v-container class="pa-0" fluid>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="10" no-gutters>
        <span :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'账单类别管理'"/>
      </v-col>
      <v-col class="d-flex justify-end" cols="2">
        <v-row justify="end">
          <v-col class="d-flex justify-end" cols="6">
            <v-btn
                color="primary"
                depressed
                @click="loadBillTypeSaveDialog"
                v-text="'新增类别'"/>
          </v-col>
          <v-col cols="6">
            <v-btn
                color="warning"
                depressed
                @click="loadBillTypeOrderDialog(table.data)"
                v-text="'排序类别'"/>
          </v-col>
          <v-col cols="6">
            <v-btn
                color="error"
                depressed
                @click="allocateDialog.isShow = true"
                v-text="'分配类别'"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <el-table
        id="table"
        v-loading="table.loading"
        :data="table.data"
        :expand-row-keys="['1']"
        :tree-props="{children: 'children'}"
        height="68vh"
        highlight-current-row
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
          label="账单类别ID"
          property="id"
          width="200px">
      </el-table-column>
      <el-table-column
          label="账单类别名称"
          property="billTypeName">
      </el-table-column>
      <el-table-column
          label="账单类别图标">
        <template v-slot="scope">
          <v-btn
              :color="scope.row.flow==='OUT'?'error':scope.row.flow==='IN'?'primary':scope.row.flow==='TRANSFER'?'warning':''"
              depressed fab
              x-small>
            <v-icon v-if="scope.row.icon">mdi-{{ scope.row.icon }}</v-icon>
            <v-icon v-else>mdi-help</v-icon>
          </v-btn>
        </template>
      </el-table-column>
      <el-table-column
          label="账单类别类型">
        <template v-slot="scope">
          <v-chip v-if="scope.row.flow==='OUT'" color="error" label small>支出</v-chip>
          <v-chip v-else-if="scope.row.flow==='IN'" color="primary" label small>收入</v-chip>
          <v-chip v-else-if="scope.row.flow==='TRANSFER'" color="warning" label small>转账</v-chip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250px">
        <template v-slot="scope">
          <v-btn
              class="mx-1"
              color="primary"
              text
              @click="loadBillTypeUpdateDialog(scope.row)"
              v-text="'修改'"
          />
          <el-popconfirm
              v-if="!scope.row.children"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该账单类别吗？"
              @confirm="deleteBillType(scope.row.id)"
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
              @click="loadBillTypeOrderDialog(scope.row.children)"
              v-text="'排序'"
          />
        </template>
      </el-table-column>
    </el-table>
    <v-form ref="billTypeForm">
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
                <v-col cols="10">
                  <v-text-field
                      v-model="dialog.billType.billTypeName"
                      :rules="[(value) => !!value || '请输入类别名称']"
                      clearable
                      label="类别名称"
                      prepend-inner-icon="mdi-notebook"
                  />
                </v-col>
                <v-col cols="2">
                  <v-row justify="center" no-gutters>
                    <div style="color: rgba(0, 0, 0, 0.6);font-size: 0.5rem">图标</div>
                  </v-row>
                  <v-row justify="center" no-gutters>
                    <v-btn
                        :color="dialog.billType.flow === 'OUT'?'error':dialog.billType.flow === 'IN'?'primary':''"
                        depressed fab x-small
                        @click="iconDialog.isShow=true;">
                      <v-icon v-if="dialog.billType.icon"
                              v-text="'mdi-'+dialog.billType.icon"></v-icon>
                      <v-icon v-else>mdi-help</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col class="pr-1" cols="6">
                  <v-select v-model="dialog.billType.flow"
                            :items="[{text:'支出',value:'OUT'},{text:'收入',value:'IN'}]"
                            :rules="[(value) => !!value || '请选择类别类型']"
                            label="类型"
                            no-data-text="无对应选项"
                            prepend-inner-icon="mdi-format-list-bulleted-type"
                            @change="dialog.billType.parentId = null"/>

                </v-col>
                <v-col class="pl-1" cols="6">
                  <v-select v-model="dialog.billType.parentId"
                            :items="dialog.billType.flow==='OUT'?outBillTypeList:dialog.billType.flow==='IN'?inBillTypeList:[]"
                            :rules="[(value) => value === 0 || !!value || '请选择父账单类别']"
                            item-text="billTypeName"
                            item-value="id"
                            label="父账单类别"
                            no-data-text="请先选择类别类型"
                            prepend-inner-icon="mdi-account-arrow-up"/>
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
                @click="saveOrUpdateBillType"
                v-text="'保存'"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <v-dialog v-model="orderDialog.isShow" max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span v-text="'账单类别排序'"/>
        </v-card-title>
        <v-card-text class="pb-0">
          <draggable :list="orderDialog.billTypeList" handle="#handle" tag="div"
                     v-bind="dragOptions">
            <transition-group type="transition">
              <v-row v-for="(item) in orderDialog.billTypeList" :key="item.id"
                     align="center"
                     class="rounded-lg mb-1 px-2 py-1" no-gutters>
                <v-col cols="2">
                  <v-btn
                      :color="item.flow==='OUT'?'error':item.flow==='IN'?'primary':item.flow==='TRANSFER'?'warning':''"
                      depressed fab
                      x-small>
                    <v-icon v-if="item.icon">mdi-{{ item.icon }}</v-icon>
                    <v-icon v-else>mdi-help</v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <span class="text-subtitle-2">{{ item.billTypeName }}</span>
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
              depressed text
              @click="orderDialog.isShow = false"
              v-text="'取消'"/>
          <v-btn
              color="primary"
              depressed text
              :disabled="orderDialog.btn.loading"
              :loading="orderDialog.btn.loading"
              @click="updateBillTypeOrder"
              v-text="'保存'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-form ref="allocateForm">
      <v-dialog v-model="allocateDialog.isShow" max-width="600px" scrollable>
        <v-card>
          <v-card-title>
            <span v-text="'分配默认账单类别'"/>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-row align="center" no-gutters>
              <v-col cols="12">
                <v-text-field
                    v-model="allocateDialog.userId"
                    :rules="[rules.isInteger]"
                    clearable
                    label="用户ID">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                depressed text
                @click="allocateDialog.isShow = false"
                v-text="'取消'"/>
            <v-btn
                :disabled="allocateDialog.btn.loading"
                :loading="allocateDialog.btn.loading" color="primary"
                depressed
                text
                @click="allocateDefaultBillType"
                v-text="'保存'"/>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <v-dialog v-model="iconDialog.isShow" max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span v-text="'图标库'"/>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="item in icons.billType" :key="item" class="d-flex justify-center"
                   cols="2"
                   @click="dialog.billType.icon = item; iconDialog.isShow = false;">
              <v-btn depressed fab x-small>
                <v-icon>mdi-{{ item }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              depressed
              @click="iconDialog.isShow = false"
              v-text="'取消'"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "BillTypeManagement",
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
        type: null,
        billType: {
          id: null,
          parentId: null,
          weight: null,
          billTypeName: null,
          icon: null,
          flow: null,
          version: null,
          children: []
        },
        btn: {
          loading: false
        }
      },
      iconDialog: {
        isShow: false
      },
      orderDialog: {
        isShow: false,
        btn: {
          loading: false
        },
        billTypeList: [
          {
            id: null,
            parentId: null,
            weight: null,
            billTypeName: null,
            icon: null,
            flow: null,
            version: null
          }
        ]
      },
      allocateDialog: {
        isShow: false,
        btn: {
          loading: false
        },
        userId: null
      },
      outBillTypeList: [],
      inBillTypeList: [],
      rules: this.GLOBAL.rules,
      icons: this.GLOBAL.icons,
      enums: this.GLOBAL.enums
    };
  },
  methods: {
    loadBillTypeTree() {
      this.table.loading = true;
      this.axios.get("/billType/listDefaultBillTypeTree")
          .then((response) => {
            this.table.data = response.data.data;
            this.table.loading = false;
          });
    },
    saveOrUpdateBillType() {
      if (!this.$refs.billTypeForm.validate()) {
        return;
      }
      if (this.dialog.type === 'update') {
        this.dialog.btn.loading = true;
        this.axios.put("/billType/updateDefaultBillType", JSON.stringify(this.dialog.billType))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.loadBillTypeTree();
              this.loadBillTypeList();
              this.dialog.isShow = false;
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      } else if (this.dialog.type === 'save') {
        this.dialog.loading = true;
        this.dialog.billType.weight = 0;
        this.axios.post("/billType/saveDefaultBillType", JSON.stringify(this.dialog.billType))
            .then(() => {
              this.$notify({
                title: "保存成功",
                message: null,
                type: "success",
                duration: 2000,
              });
              this.loadBillTypeTree();
              this.loadBillTypeList();
              this.dialog.isShow = false;
            })
            .finally(() => {
              this.dialog.btn.loading = false;
            });
      }
    },
    updateBillTypeOrder() {
      this.orderDialog.btn.loading = true;
      let list = [];
      let weight = 1;
      for (let item of this.orderDialog.billTypeList) {
        list.push({id: item.id, weight: weight, version: item.version})
        weight = weight + 1;
      }
      this.axios.put("/billType/orderDefaultBillType", JSON.stringify(list))
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.orderDialog.isShow = false;
            this.loadBillTypeTree();
            this.loadBillTypeList();
          })
          .finally(() => {
            this.orderDialog.btn.loading = false;
          });
    },
    deleteBillType(billTypeId) {
      this.axios.delete("/billType/removeDefaultBillType/" + billTypeId)
          .then(() => {
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.loadBillTypeTree();
            this.loadBillTypeList();
          }).finally(() => {
      });
    },
    loadBillTypeSaveDialog() {
      this.$refs.billTypeForm.resetValidation();
      this.dialog.title = "新增账单类别";
      this.dialog.type = 'save';
      this.dialog.billType = {};
      this.dialog.isShow = true;
    },
    loadBillTypeUpdateDialog(billType) {
      this.$refs.billTypeForm.resetValidation();
      this.dialog.billType = JSON.parse(JSON.stringify(billType));
      this.dialog.title = "修改账单类别";
      this.dialog.type = 'update';
      this.dialog.isShow = true;
    },
    loadBillTypeOrderDialog(billTypeList) {
      this.orderDialog.billTypeList = JSON.parse(JSON.stringify(billTypeList));
      this.orderDialog.isShow = true;
    },
    loadBillTypeList() {
      let billType = {
        parentId: 0
      }
      this.axios.post("/billType/listDefaultBillType", billType)
          .then((response) => {
            this.outBillTypeList = [];
            this.outBillTypeList.push({id: 0, billTypeName: '根类别'});
            this.inBillTypeList = [];
            this.inBillTypeList.push({id: 0, billTypeName: '根类别'});
            for (let item of response.data.data) {
              if (item.flow === 'OUT') {
                this.outBillTypeList.push({id: item.id, billTypeName: item.billTypeName});
              } else if (item.flow === 'IN') {
                this.inBillTypeList.push({id: item.id, billTypeName: item.billTypeName});
              }
            }
          });
    },
    allocateDefaultBillType() {
      if (!this.$refs.allocateForm.validate()) {
        return;
      }
      this.allocateDialog.btn.loading = true;
      this.axios.put("/billType/allocateDefaultBillType/" + this.allocateDialog.userId)
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.allocateDialog.isShow = false;
          })
          .finally(() => {
            this.allocateDialog.btn.loading = false;
          });
    }
  },
  mounted() {
    this.loadBillTypeTree();
    this.loadBillTypeList();
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