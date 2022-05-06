<template>
  <el-upload
    :action="upload.path"
    :before-upload="beforeAvatarUpload"
    :headers="upload.header"
    :on-error="handleAvatarError"
    :on-success="handleAvatarSuccess"
    :show-file-list="false"
    :style="{
      height: size + 'px',
      width: size + 'px',
      '--border-radius': borderRadius,
    }"
    class="avatar-uploader"
    name="uploadFile"
  >
    <i-image
      v-if="imagePath"
      :height="size + 'px'"
      :src="getImageUrl(imagePath)"
      :width="size + 'px'"
    />
    <v-icon v-else>mdi-upload</v-icon>
  </el-upload>
</template>

<script>
import iImage from "@/components/iImage";

export default {
  name: "ImageUploader",
  components: { iImage },
  props: {
    size: {
      type: String,
      default: "150",
    },
    imagePath: String,
    borderRadius: {
      type: String,
      default: "6px",
    },
  },
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
  },
  data: function () {
    return {
      upload: {
        path: this.GLOBAL.url.api + "/file/upload",
        header: { Authorization: this.$store.getters.getToken },
      },
    };
  },
  methods: {
    getImageUrl: function (imagePath) {
      if (imagePath != null) {
        return this.GLOBAL.url.static + "/" + imagePath;
      }
    },
    handleAvatarSuccess(response) {
      this.imagePath = response.data;
      this.$emit("setImagePath", this.imagePath);
      this.$notify({
        title: "图片上传成功",
        message: null,
        type: "success",
        duration: 2000,
      });
    },
    handleAvatarError(error) {
      console.log(error);
      this.$notify({
        title: "图像上传失败",
        message: null,
        type: "error",
        duration: 2000,
      });
    },
    beforeAvatarUpload(file) {
      let isImage = file.type === "image/jpeg" || file.type === "image/png";
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$notify({
          title: "上传图片只能是 JPG 或 PNG 格式",
          message: null,
          type: "error",
          duration: 2000,
        });
      }
      if (!isLt2M) {
        if (!isImage) {
          this.$notify({
            title: "上传图片大小不能超过 2MB",
            message: null,
            type: "error",
            duration: 2000,
          });
        }
        return isImage && isLt2M;
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1.5px solid #949494;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100%;
    width: 100%;

    &:hover {
      border-color: #3874cb;
    }
  }
}
</style>