<template>
  <v-container class="pa-0" fluid>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="3" no-gutters>
        <span :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'反馈处理'"/>
      </v-col>
      <v-col cols="8">
        <v-row align="center" no-gutters>
          <v-col cols="5">
            <v-form ref="feedbackQueryForm" style="width:100%">
              <v-row align="center" no-gutters>
                <v-col cols="6">
                  <v-text-field
                      v-model="table.query.feedback.userId"
                      :rules="[rules.isInteger]"
                      class="mr-2 pt-0 mt-0"
                      clearable
                      label="用户ID"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                      v-model="table.query.feedback.processingUserId"
                      class="mr-2 pt-0 mt-0"
                      :items="adminList"
                      item-text="username"
                      item-value="id"
                      label="处理人"
                      clearable
                      no-data-text="无对应选项"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row align="center" no-gutters>
                <v-col cols="6">
                  <v-select
                      v-model="table.query.feedback.type"
                      :items="enums.feedbackType"
                      no-data-text="无对应选项"
                      class="mt-0 pt-0 mr-2"
                      clearable
                      label="反馈类型"
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                      v-model="table.query.feedback.status"
                      :items="enums.feedbackStatus"
                      no-data-text="无对应选项"
                      class="mt-0 pt-0 mr-2"
                      clearable
                      label="处理状态"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="1">
            <v-btn
                class="ml-2"
                color="primary"
                fab
                small
                @click="pageFeedback"
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
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
      <el-table-column type="expand">
        <template v-slot="props">
          <v-row align="center" no-gutters>
            <v-col class="px-16" cols="6">
              <v-row v-if="props.row.processingUserId" v-ripple align="center" no-gutters style="height: 50px">
                <span class="font-weight-bold" style="color: #909399" v-html="'反馈描述'"/>
                <span class="ml-3" style="color: #606266" v-text="props.row.description"/>
              </v-row>
              <v-divider v-if="props.row.processingUserId"/>
              <v-row v-if="props.row.processingUserId" v-ripple align="center" no-gutters style="height: 50px">
                <span class="font-weight-bold" style="color: #909399" v-html="'处理人ID'"/>
                <span class="ml-3" style="color: #606266" v-html="props.row.processingUserId"/>
              </v-row>
              <v-divider v-if="props.row.processingDescription"/>
              <v-row v-if="props.row.processingDescription" v-ripple align="center" no-gutters style="height: 50px">
                <span class="font-weight-bold" style="color: #909399" v-html="'处理描述'"/>
                <span class="ml-3" style="color: #606266" v-html="props.row.processingDescription"/>
              </v-row>
            </v-col>
            <v-col class="px-16" cols="6">
              <div class="mb-2">
                <span class="font-weight-bold" style="color: #909399" v-html="'反馈图片'"/>
              </div>
              <i-image v-if="props.row.imagePath!=null" id="feedbackImage" :src="getImageUrl(props.row.imagePath)"
                       @click.native="openImageDialog(getImageUrl(props.row.imagePath))"/>
              <v-icon v-else size="300">mdi-note-alert-outline</v-icon>
            </v-col>
          </v-row>
        </template>
      </el-table-column>
      <el-table-column
          :index="(index) => index + 1"
          align="center"
          label="编号"
          type="index"
          width="70px">
      </el-table-column>
      <el-table-column
          align="center"
          label="反馈ID"
          property="id"
          sortable
          width="90px">
      </el-table-column>
      <el-table-column
          align="center"
          label="用户ID"
          property="userId"
          sortable
          width="90px">
      </el-table-column>
      <el-table-column
          :formatter="feedbackTypeFormatter"
          label="反馈类型"
      />
      <el-table-column
          align="center"
          label="处理状态"
          width="200">
        <template v-slot="scope">
          <v-chip v-if="scope.row.status===enums.feedbackStatus[0].value" class="mx-1" color="success"
                  label small v-text="feedbackStatusFormatter(scope.row)">
          </v-chip>
          <v-chip v-if="scope.row.status===enums.feedbackStatus[1].value" class="mx-1" color="primary"
                  label small v-text="feedbackStatusFormatter(scope.row)">
          </v-chip>
          <v-chip v-if="scope.row.status===enums.feedbackStatus[2].value" class="mx-1" label
                  small v-text="feedbackStatusFormatter(scope.row)">
          </v-chip>
        </template>
      </el-table-column>
      <el-table-column
          label="创建时间"
          property="createdDatetime"
      />
      <el-table-column
          label="处理时间"
          property="updatedDatetime"
      />
      <el-table-column align="center" label="操作" width="250px">
        <template v-slot="scope">
          <v-btn
              class="mx-1"
              color="blue darken-1"
              text
              @click="loadFeedbackUpdateDialog(scope.row)"
              v-text="'处理'"
          />
          <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该反馈吗？"
              @confirm="deleteFeedback(scope.row.id)"
          >
            <template v-slot:reference>
              <v-btn class="mx-1"
                     color="red darken-1" text v-text="'删除'"/>
            </template>
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
              dense
              no-data-text="无对应选项"
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
    <v-dialog v-model="dialog.isShow" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5" v-text="dialog.title"/>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-form ref="feedbackUpdateForm">
            <v-container v-if="dialog.feedback.status=== enums.feedbackStatus[0].value" class="pa-0">
              <v-row no-gutters>
                <v-col align-self="center" cols="4">
                  <v-select v-model="dialog.feedback.type"
                            :items="enums.feedbackType" class="px-2"
                            no-data-text="无对应选项"
                            disabled label="反馈类型"/>
                </v-col>
                <v-col cols="4">
                  <v-select v-model="dialog.feedback.status"
                            :items="enums.feedbackStatus"
                            no-data-text="无对应选项"
                            class="px-2" disabled label="反馈状态"/>
                </v-col>
                <v-col cols="4">
                  <v-select v-model="dialog.feedback.processingUserId"
                            :items="adminList"
                            :rules="[(value) => !!value || '请分配处理人']"
                            class="px-2"
                            clearable
                            item-text="username" item-value="id"
                            label="处理人"/>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="dialog.feedback.status=== enums.feedbackStatus[1].value" class="pa-0">
              <v-row no-gutters>
                <v-col align-self="center" cols="6">
                  <v-select v-model="dialog.feedback.type"
                            :items="enums.feedbackType"
                            no-data-text="无对应选项"
                            class="px-3" disabled label="反馈类型"/>
                </v-col>
                <v-col cols="6">
                  <v-select v-model="dialog.feedback.status"
                            :items="enums.feedbackStatus"
                            no-data-text="无对应选项"
                            class="px-3" disabled label="反馈状态"/>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="dialog.feedback.processingDescription" auto-grow class="px-3"
                              clearable label="处理描述" rows="1"/>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="dialog.feedback.status=== enums.feedbackStatus[2].value" class="pa-0">
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="12">
                  <span class="font-weight-bold text--lighten-1 red--text">该反馈已处理完成，请勿重复处理！</span>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="grey darken-1" text
                 @click="dialog.isShow = false" v-text="'取消'"/>
          <v-btn
              v-if="dialog.feedback.status !== enums.feedbackStatus[2].value"
              :disabled="dialog.btn.loading" :loading="dialog.btn.loading" color="primary"
              text @click="updateFeedback" v-text="'保存'"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        this.axios.post("/feedback/pageFeedback/" + this.table.query.page.current + "/" + this.table.query.page.size, JSON.stringify(this.table.query.feedback))
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
        this.axios.put("/feedback/updateFeedback", JSON.stringify(postFeedback))
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
      } else {
        postFeedback.status = this.enums.feedbackStatus[2].value;
        this.axios.put("/feedback/updateFeedback", JSON.stringify(postFeedback))
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
      }
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
    loadFeedbackUpdateDialog(feedback) {
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
        roleIdList: [1]
      };
      this.axios.post("/user/listUser", JSON.stringify(user))
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