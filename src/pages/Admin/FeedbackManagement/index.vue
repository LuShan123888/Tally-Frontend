<template>
  <v-container class="pa-0" fluid>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="3" no-gutters><span :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'反馈处理'"/></v-col>
      <v-col cols="7">
        <v-row align="center" no-gutters>
          <v-col cols="5">
            <v-form ref="feedbackQueryForm">
              <v-row align="center" no-gutters>
                <v-col cols="6">
                  <v-text-field v-model="table.query.feedback.userId" :rules="[rules.isInteger]" class="mr-2 pt-0 mt-0"
                                clearable label="用户ID"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="table.query.feedback.processingUserId" :items="adminList" class="mr-2 pt-0 mt-0"
                            clearable item-text="username" item-value="id" label="处理人" no-data-text="无对应选项"></v-select>
                </v-col>
              </v-row>
              <v-row align="center" no-gutters>
                <v-col cols="6">
                  <v-select v-model="table.query.feedback.type" :items="enums.feedbackType" class="mt-0 pt-0 mr-2"
                            clearable label="反馈类型" no-data-text="无对应选项"/>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="table.query.feedback.status" :items="enums.feedbackStatus" class="mt-0 pt-0 mr-2"
                            clearable label="处理状态" no-data-text="无对应选项"/>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="1">
            <v-btn class="ml-2" color="primary" depressed fab small @click="pageFeedback">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end" cols="2">
        <v-row justify="end">
          <v-col cols="6"></v-col>
          <v-col cols="6">
            <v-btn :disabled="btn.export.isLoading" :loading="btn.export.isLoading" color="warning" depressed
                   @click="exportFeedback" v-text="'导出反馈'"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <el-table id="table" v-loading="table.loading" :data="table.data" height="68vh" highlight-current-row stripe
              style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="props">
          <v-row align="center" no-gutters>
            <v-col class="px-16" cols="6">
              <v-row v-if="props.row.description" v-ripple align="center" no-gutters style="height: 50px"><span
                  class="font-weight-bold" style="color: #909399" v-html="'反馈描述'"/><span class="ml-3"
                                                                                         style="color: #606266"
                                                                                         v-text="props.row.description"/>
              </v-row>
              <v-divider v-if="props.row.processingUserId"/>
              <v-row v-if="props.row.processingUserId" v-ripple align="center" no-gutters style="height: 50px"><span
                  class="font-weight-bold" style="color: #909399" v-html="'处理人ID'"/><span class="ml-3"
                                                                                          style="color: #606266"
                                                                                          v-html="props.row.processingUserId"/>
              </v-row>
              <v-divider v-if="props.row.processingDescription"/>
              <v-row v-if="props.row.processingDescription" v-ripple align="center" no-gutters style="height: 50px">
                <span class="font-weight-bold" style="color: #909399" v-html="'处理描述'"/><span class="ml-3"
                                                                                             style="color: #606266"
                                                                                             v-html="props.row.processingDescription"/>
              </v-row>
            </v-col>
            <v-col class="px-16" cols="6" v-if="props.row.imagePath">
              <div class="mb-2"><span class="font-weight-bold" style="color: #909399" v-html="'反馈图片'"/></div>
              <i-image id="feedbackImage" :src="getImageUrl(props.row.imagePath)"
                       @click.native="openImageDialog(getImageUrl(props.row.imagePath))"/>
            </v-col>
          </v-row>
        </template>
      </el-table-column>
      <el-table-column :index="(index) => index + 1" align="center" label="编号" type="index"
                       width="70px"/>
      <el-table-column align="center" label="反馈ID" property="id" sortable width="90px"/>
      <el-table-column align="center" label="用户ID" property="userId" sortable width="90px"/>
      <el-table-column :formatter="feedbackTypeFormatter" label="反馈类型"/>
      <el-table-column align="center" label="处理状态" width="200">
        <template v-slot="scope">
          <v-chip v-if="scope.row.status===enums.feedbackStatus[0].value" class="mx-1" color="success" label small
                  v-text="feedbackStatusFormatter(scope.row)"></v-chip>
          <v-chip v-if="scope.row.status===enums.feedbackStatus[1].value" class="mx-1" color="primary" label small
                  v-text="feedbackStatusFormatter(scope.row)"></v-chip>
          <v-chip v-if="scope.row.status===enums.feedbackStatus[2].value" class="mx-1" label small
                  v-text="feedbackStatusFormatter(scope.row)"></v-chip>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" property="createdDatetime"/>
      <el-table-column label="处理时间" property="updatedDatetime"/>
      <el-table-column align="center" label="操作" width="250px">
        <template v-slot="scope">
          <v-btn class="mx-1" color="primary" text @click="loadFeedbackUpdateDialog(scope.row)" v-text="'处理'"/>
          <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除该反馈吗？" @confirm="deleteFeedback(scope.row.id)">
            <template v-slot:reference>
              <v-btn class="mx-1" color="error" text v-text="'删除'"/>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <v-row class="mt-7" no-gutters>
      <v-col class="d-flex justify-end" cols="9">
        <div style="width:90px">
          <v-select v-model="table.query.page.size" :items="enums.page" dense label="分页大小" lined no-data-text="无对应选项"
                    @input="changePageSize"/>
        </div>
      </v-col>
      <v-col cols="3">
        <v-pagination v-model="table.query.page.current" :length="table.query.page.count" next-icon="mdi-menu-right"
                      prev-icon="mdi-menu-left" total-visible="5" @input="changePage"/>
      </v-col>
    </v-row>
    <v-form ref="feedbackUpdateForm">
      <v-dialog v-model="dialog.isShow" max-width="600px" persistent>
        <v-card>
          <v-card-title><span class="text-h5" v-text="dialog.title"/></v-card-title>
          <v-card-text class="pb-0">
            <v-container v-if="dialog.feedback.status=== enums.feedbackStatus[0].value" class="pa-0">
              <v-row no-gutters>
                <v-col align-self="center" cols="6">
                  <v-select v-model="dialog.feedback.type" :items="enums.feedbackType" class="pr-1" no-data-text="无对应选项"
                            disabled label="反馈类型"/>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="dialog.feedback.status" :items="enums.feedbackStatus" no-data-text="无对应选项"
                            class="pl-1" disabled label="反馈状态"/>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete v-model="dialog.feedback.processingUserId" :items="adminList"
                                  :rules="[(value) => !!value || '请分配处理人']" clearable item-text="username"
                                  item-value="id" label="处理人"/>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="dialog.feedback.status=== enums.feedbackStatus[1].value" class="pa-0">
              <v-row no-gutters>
                <v-col align-self="center" cols="6">
                  <v-select v-model="dialog.feedback.type" :items="enums.feedbackType" class="pr-1" disabled
                            label="反馈类型" no-data-text="无对应选项"/>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="dialog.feedback.status" :items="enums.feedbackStatus" no-data-text="无对应选项"
                            class="pl-1" disabled label="反馈状态"/>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="dialog.feedback.processingDescription" auto-grow clearable label="处理描述"
                              rows="1"/>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="dialog.feedback.status=== enums.feedbackStatus[2].value" class="pa-0">
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="12">
                  <v-icon color="error">mdi-alert-circle</v-icon>
                  <span class="ml-2">该反馈已处理完成，请勿重复处理</span></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text @click="dialog.isShow = false" v-text="'取消'"/>
            <v-btn v-if="dialog.feedback.status !== enums.feedbackStatus[2].value" :disabled="dialog.btn.loading"
                   :loading="dialog.btn.loading" color="primary" text @click="updateFeedback" v-text="'保存'"/>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
    <v-dialog v-model="imagePreview.isShow" max-width="600px">
      <i-image :src="imagePreview.imageUrl"/>
    </v-dialog>
  </v-container>
</template>

<script>
import iImage from '@/components/iImage'

export default {
  name: "FeedbackManagement",
  components: {iImage},
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
          feedback: {
            userId: null,
            type: null,
            processingUserId: null,
            status: null,
          },
        }
      },
      dialog: {
        isShow: false,
        title: null,
        feedback: {
          id: null,
          userId: null,
          type: null,
          description: null,
          imagePath: null,
          status: null,
          processingUserId: null,
          processingDescription: null,
          createdDatetime: null,
          updatedDatetime: null,
          version: null
        },
        btn: {
          loading: false
        }
      },
      imagePreview: {
        isShow: false,
        imageUrl: null
      },
      upload: {
        path: this.GLOBAL.url.api + "/file/upload",
        header: {Authorization: this.$store.getters.getToken}
      },
      btn: {
        export: {
          isLoading: false
        }
      },
      adminList: [],
      rules: this.GLOBAL.rules,
      enums: this.GLOBAL.enums
    };
  },
  methods: {
    changePageSize() {
      this.table.query.page.current = 1;
      this.pageFeedback();
    },
    changePage() {
      this.pageFeedback();
    },
    pageFeedback() {
      if (this.$refs.feedbackQueryForm.validate()) {
        this.table.loading = true;
        this.axios.post("/feedback/pageFeedback/" + this.table.query.page.current + "/" + this.table.query.page.size, this.table.query.feedback)
            .then((response) => {
              this.table.data = response.data.data;
              this.table.query.page.count = response.data.count;
              this.table.loading = false;
            });
      }
    },
    updateFeedback() {
      if (!this.$refs.feedbackUpdateForm.validate()) {
        return;
      }
      this.dialog.btn.loading = true;
      let postFeedback = JSON.parse(JSON.stringify(this.dialog.feedback));
      if (postFeedback.status === this.enums.feedbackStatus[0].value) {
        postFeedback.status = this.enums.feedbackStatus[1].value;
      } else {
        postFeedback.status = this.enums.feedbackStatus[2].value;
      }
      this.axios.put("/feedback/updateFeedback", postFeedback)
          .then(() => {
            this.$notify({
              title: "保存成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.dialog.isShow = false;
            this.pageFeedback();
          })
          .finally(() => {
            this.dialog.btn.loading = false;
          });
    },
    deleteFeedback(feedbackId) {
      this.axios.delete("/feedback/removeFeedback/" + feedbackId)
          .then(() => {
            this.$notify({
              title: "删除成功",
              message: null,
              type: "success",
              duration: 2000,
            });
            this.pageFeedback();
          });
    },
    exportFeedback() {
      if (this.$refs.feedbackQueryForm.validate()) {
        this.btn.export.isLoading = true;
        this.axios.post(
            '/feedback/pageFeedback/' + this.table.query.page.current + '/' + this.table.query.page.size + '/?export=excel',
            this.table.query.feedback,
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
    loadFeedbackUpdateDialog(feedback) {
      this.$refs.feedbackUpdateForm.resetValidation();
      this.dialog.feedback = JSON.parse(JSON.stringify(feedback));
      this.dialog.title = "处理反馈";
      this.dialog.isShow = true;
    },
    getImageUrl(imagePath) {
      if (imagePath != null) {
        return this.GLOBAL.url.static + "/" + imagePath;
      }
    },
    openImageDialog(imageUrl) {
      this.imagePreview.isShow = true;
      this.imagePreview.imageUrl = imageUrl;
    },
    feedbackTypeFormatter(row) {
      for (let item of this.enums.feedbackType) {
        if (item.value === row.type) {
          return item.text;
        }
      }
    },
    feedbackStatusFormatter(row) {
      for (let item of this.enums.feedbackStatus) {
        if (item.value === row.status) {
          return item.text;
        }
      }
    },
    loadAdminList() {
      let user = {
        roleIdSet: [1]
      };
      this.axios.post("/user/listUser", user)
          .then((response) => {
            this.adminList = response.data.data;
          })
    }
  },
  mounted() {
    this.pageFeedback();
    this.loadAdminList();
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

#feedbackImage {
  border: 2px solid #949494;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 300px;
  height: 300px;

  &:hover {
    border-color: #1976D2;
  }
}

</style>