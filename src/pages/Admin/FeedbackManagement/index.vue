<template>
  <div>
    <v-row align="center" no-gutters style="height:150px">
      <v-col cols="3" no-gutters>
        <div :style="{ color: lightPrimary }" class="text-h2 pl-10" v-text="'反馈处理'"/>
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
                      class="mr-2"
                      clearable
                      label="用户ID"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      v-model="table.query.feedback.description"
                      class="mr-2"
                      clearable
                      label="反馈描述"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" no-gutters>
                <v-col cols="6">
                  <v-select
                      v-model="table.query.feedback.type"
                      :items="['PROBLEM','SUGGESTION']"
                      class="mt-0 pt-0 mr-2"
                      clearable
                      label="反馈类型"
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                      v-model="table.query.feedback.status"
                      :items="['CREATED','PROCESSING','FINISHED']"
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
    <v-divider/>
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
      >
      </el-table-column>
      <el-table-column
          label="反馈描述"
          property="description"
          width="180">
      </el-table-column>
      <el-table-column align="center" label="反馈图片">
        <template v-slot="scope">
          <v-avatar v-if="scope.row.imageUrl!=null" size="40">
            <v-img :src="getImagePath(scope.row.imageUrl)">
              <template v-slot:placeholder>
                <v-row
                    align="center"
                    class="fill-height ma-0"
                    justify="center"
                >
                  <v-progress-circular
                      color="primary"
                      indeterminate
                      width="2"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
          <v-icon v-else size="40">mdi-account-circle</v-icon>
        </template>
      </el-table-column>
      <el-table-column
          :formatter="feedbackStatusFormatter"
          label="处理状态"
          width="200">
      </el-table-column>
      <el-table-column
          label="创建时间"
          property="createTime"
      />
      <el-table-column
          label="处理时间"
          property="updateTime"
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
              :items="enums.page"
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
    <!--    <v-dialog-->
    <!--        v-model="dialog.isShow"-->
    <!--        max-width="600px"-->
    <!--    >-->
    <!--      <v-card>-->
    <!--        <v-card-title>-->
    <!--          <span class="text-h5" v-text="dialog.title"/>-->
    <!--        </v-card-title>-->
    <!--        <v-card-text class="pb-0">-->
    <!--          <v-form ref="userSaveOrUpdateForm">-->
    <!--            <v-container>-->
    <!--              <v-row no-gutters>-->
    <!--                <v-col cols="6" class="pr-3">-->
    <!--                  <v-text-field-->
    <!--                      v-model="dialog.feedback.username"-->
    <!--                      :disabled="!!dialog.feedback.id"-->
    <!--                      label="用户名"-->
    <!--                      :counter="rules.usernameMaxLength"-->
    <!--                      :rules="[rules.isUsername]"-->
    <!--                      clearable-->
    <!--                  />-->
    <!--                </v-col>-->
    <!--                <v-col class="pl-3" cols="6">-->
    <!--                  <v-text-field-->
    <!--                      v-model="dialog.feedback.phoneNum"-->
    <!--                      :rules="[rules.isPhoneNum]"-->
    <!--                      counter="11"-->
    <!--                      :disabled="!!dialog.feedback.id"-->
    <!--                      label="手机号码"-->
    <!--                      clearable-->
    <!--                  />-->
    <!--                </v-col>-->
    <!--                <v-col cols="12">-->
    <!--                  <v-text-field-->
    <!--                      v-model="dialog.feedback.email"-->
    <!--                      :rules="[rules.isEmail]"-->
    <!--                      :disabled="!!dialog.feedback.id"-->
    <!--                      label="邮箱"-->
    <!--                      clearable-->
    <!--                  />-->
    <!--                </v-col>-->
    <!--                <v-col cols="12">-->
    <!--                  <v-text-field-->
    <!--                      v-if="!dialog.feedback.id"-->
    <!--                      v-model="dialog.feedback.password"-->
    <!--                      :rules="[rules.isPassword]"-->
    <!--                      type="password"-->
    <!--                      label="密码"-->
    <!--                      :counter="rules.passwordMaxLength"-->
    <!--                      clearable-->
    <!--                  />-->
    <!--                  <v-text-field-->
    <!--                      v-if="!dialog.feedback.id"-->
    <!--                      type="password"-->
    <!--                      label="密码确认"-->
    <!--                      :rules="[value=>value===dialog.feedback.password||'两次输入的密码不一致']"-->
    <!--                      :counter="rules.passwordMaxLength"-->
    <!--                      clearable-->
    <!--                  />-->
    <!--                </v-col>-->
    <!--                <v-col cols="6">-->
    <!--                  <v-row align="center" class="mb-3 " no-gutters>-->
    <!--                    <div :style="{color:dialog.feedback.id?'#9E9E9D':'inherit'}" class="text-subtitle-1" v-text="'头像'"/>-->
    <!--                    <v-btn-->
    <!--                        v-if="dialog.feedback.avatarUrl!=null && !dialog.feedback.id"-->
    <!--                        x-small-->
    <!--                        depressed-->
    <!--                        class="error"-->
    <!--                        style="margin-left:72px"-->
    <!--                        @click="dialog.feedback.avatarUrl=null;"-->
    <!--                        v-text="'删除'"-->
    <!--                    />-->
    <!--                  </v-row>-->
    <!--                  <el-upload-->
    <!--                      v-if="!dialog.feedback.id"-->
    <!--                      class="avatar-uploader"-->
    <!--                      name="uploadFile"-->
    <!--                      :action="upload.path"-->
    <!--                      :headers="upload.header"-->
    <!--                      :show-file-list="false"-->
    <!--                      :on-success="handleAvatarSuccess"-->
    <!--                      :on-error="handleAvatarError"-->
    <!--                      :before-upload="beforeAvatarUpload">-->
    <!--                    <v-img v-if="dialog.feedback.avatarUrl" :src="getAvatarPath(dialog.feedback.avatarUrl)"-->
    <!--                           contain height="150px" width="150px">-->
    <!--                      <template v-slot:placeholder>-->
    <!--                        <v-row-->
    <!--                            align="center"-->
    <!--                            class="fill-height ma-0"-->
    <!--                            justify="center"-->
    <!--                        >-->
    <!--                          <v-progress-circular-->
    <!--                              color="primary"-->
    <!--                              indeterminate-->
    <!--                              width="2"-->
    <!--                          ></v-progress-circular>-->
    <!--                        </v-row>-->
    <!--                      </template>-->
    <!--                    </v-img>-->
    <!--                    <v-icon v-else>mdi-upload</v-icon>-->
    <!--                  </el-upload>-->
    <!--                  <div v-else>-->
    <!--                    <v-img v-if="dialog.feedback.avatarUrl" :src="getAvatarPath(dialog.feedback.avatarUrl)"-->
    <!--                           contain style="height: 150px;width: 150px;border: 2px dashed #9E9E9D;border-radius: 6px;">-->
    <!--                      <template v-slot:placeholder>-->
    <!--                        <v-row-->
    <!--                            align="center"-->
    <!--                            class="fill-height ma-0"-->
    <!--                            justify="center"-->
    <!--                        >-->
    <!--                          <v-progress-circular-->
    <!--                              color="primary"-->
    <!--                              indeterminate-->
    <!--                              width="2"-->
    <!--                          ></v-progress-circular>-->
    <!--                        </v-row>-->
    <!--                      </template>-->
    <!--                    </v-img>-->
    <!--                    <v-icon v-else size="150px"-->
    <!--                            style="height: 150px;width: 150px;border: 2px dashed #9E9E9D;border-radius: 6px;">-->
    <!--                      mdi-account-circle-->
    <!--                    </v-icon>-->
    <!--                  </div>-->
    <!--                </v-col>-->
    <!--                <v-col cols=" 6" align-self="center">-->
    <!--                  <v-select-->
    <!--                      v-model="dialog.feedback.status"-->
    <!--                      class="pl-3"-->
    <!--                      :items="enums.userStatus"-->
    <!--                      label="状态"-->
    <!--                  />-->
    <!--                  <v-select-->
    <!--                      v-model="dialog.feedback.roleIdList"-->
    <!--                      class="pl-3"-->
    <!--                      chips-->
    <!--                      deletable-chips-->
    <!--                      small-chips-->
    <!--                      :items="roleMap"-->
    <!--                      item-text="roleName"-->
    <!--                      item-value="id"-->
    <!--                      label="角色"-->
    <!--                      multiple-->
    <!--                  />-->
    <!--                </v-col>-->
    <!--              </v-row>-->
    <!--            </v-container>-->
    <!--          </v-form>-->
    <!--        </v-card-text>-->
    <!--        <v-card-actions>-->
    <!--          <v-spacer></v-spacer>-->
    <!--          <v-btn-->
    <!--              color="grey darken-1"-->
    <!--              text-->
    <!--              @click="dialog.isShow = false"-->
    <!--              v-text="'取消'"-->
    <!--          />-->
    <!--          <v-btn-->
    <!--              color="primary"-->
    <!--              text-->
    <!--              :disabled="dialog.btn.loading"-->
    <!--              :loading="dialog.btn.loading"-->
    <!--              @click="saveOrUpdateUser"-->
    <!--              v-text="'保存'"-->
    <!--          />-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
  </div>
</template>

<script>
export default {
  name: "FeedbackManagement",
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
          feedback: {
            id: null,
            userId: null,
            type: null,
            description: null,
            imageUrl: null,
            status: null,
            createTime: null,
            updateTime: null,
            version: null
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
          imageUrl: null,
          status: null,
          createTime: null,
          updateTime: null,
          version: null
        },
        btn: {
          loading: false
        }
      },
      upload: {
        path: this.GLOBAL.url.upload,
        header: {Authorization: this.$store.getters.getToken}
      },
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
      this.axios.put("/feedback/updateUser", JSON.stringify(this.dialog.feedback))
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
    },
    deleteFeedback(feedbackId) {
      this.axios.delete("/feedback/removeFeedback/" + feedbackId)
          .then(() => {
            this.showDialog = false;
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
      this.dialog.feedback.id = feedback.id;
      this.dialog.feedback.userId = feedback.userId;
      this.dialog.feedback.type = feedback.type;
      this.dialog.feedback.description = feedback.description;
      this.dialog.feedback.imageUrl = feedback.imageUrl;
      this.dialog.feedback.status = feedback.status;
      this.dialog.feedback.version = feedback.version;
      this.dialog.title = "修改反馈";
      this.dialog.isShow = true;
    },
    getImagePath(imageUrl) {
      if (imageUrl != null) {
        return this.GLOBAL.url.file + "/" + imageUrl;
      }
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
  },
  mounted() {
    this.pageFeedback();
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