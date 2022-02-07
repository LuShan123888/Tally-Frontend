<script>
const url = {
  api: "https://api.tally.ltd",
  // api: "http://127.0.0.1:8080",
  static: "https://static.tally.ltd",
};
const title = "一款简约的在线记账平台";
const adminTitle = "云记贝后台管理系统";
const rules = {
  usernameMaxLength: 20,
  passwordMinLength: 8,
  passwordMaxLength: 30,
  roleNameMaxLength: 20,
  permissionNameMaxLength: 20,
  isEmail: (value) => !value || /.+@.+\..+/.test(value) || "邮箱格式有误",
  isInteger: (value) => !value || /^\d+$/.test(value) || "只能输入整数",
  isFloat: (value) => !value || /^\d+$/.test(value) || /^\d+[.]?\d+$/.test(value) || "只能输入数字",
  isUsername: (value) => {
    if (!!value && value.length <= 20) {
      return true;
    }
    if (!value) {
      return '请输入用户名';
    }
    if (value.length > 20) {
      return '用户名不能超过20位';
    }
  },
  isPassword: (value) => {
    if (!!value && value.length >= 8 && value.length <= 30) {
      return true;
    }
    if (!value) {
      return '请输入密码';
    }
    if (value.length < 8) {
      return '密码不能少于8位';
    }
    if (value.length > 30) {
      return '密码不能超过30位';
    }
  },
  isphoneNumber: (value) => {
    if (!value) {
      return true;
    }
    if (/^1\d+$/.test(value) && value.length === 11) {
      return true;
    }
    if (!/^1\d+$/.test(value)) {
      return '手机号格式不正确'
    }
    if (!(value.length === 11)) {
      return '手机号只能为11位';
    }
  },
  isRoleName: (value) => {
    if (!!value && value.length <= 20) {
      return true;
    }
    if (!value) {
      return '请输入角色名称';
    }
    if (value.length > 20) {
      return '角色名称不能超过20位';
    }
  },
  isPermissionName: (value) => {
    if (!!value && value.length <= 20) {
      return true;
    }
    if (!value) {
      return '请输入权限名称';
    }
    if (value.length > 20) {
      return '权限名称不能超过20位';
    }
  },
}
const enums = {
  requestMethod: [
    {text: '*', value: '*'},
    {text: 'GET', value: 'GET'},
    {text: 'POST', value: 'POST'},
    {text: 'PUT', value: 'PUT'},
    {text: 'DELETE', value: 'DELETE'}
  ],
  userStatus: [
    {text: '正常', value: 'NORMAL'},
    {text: '禁用', value: 'PROHIBIT'}
  ],
  feedbackStatus: [
    {text: '已创建', value: 'CREATED'},
    {text: '处理中', value: 'PROCESSING'},
    {text: '处理完成', value: 'FINISHED'}
  ],
  feedbackType: [
    {text: '问题解决', value: 'PROBLEM'},
    {text: '网站建议', value: 'SUGGESTION'}
  ],
  page: [5, 15, 50, 100]
}
const images = {
  avatar: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/avatar.jpg",
  profile: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/profile.svg",
  coding: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/coding.svg",
  working: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/working.svg",
  education: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/education.svg",
  ideas: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/ideas.svg",
  pageNotFound: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/pageNotFound.svg",
  signUp: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/signUp.svg",
  welcome: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/welcome.svg",
  forgot: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/forgot.svg",
  annotation: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/annotation.svg",
  feedback: "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/feedback.svg",
};
export default {
  url,
  title,
  adminTitle,
  images,
  rules,
  enums
};
</script>