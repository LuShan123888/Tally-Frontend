<script>
const apiBase = "http://47.95.124.239/api";
// const apiBase = "http://127.0.0.1:8080";
const frameBase = "http://47.95.124.239:8080";
const fileBase = "http://47.95.124.239/static/";
const title = "一个简约的在线记账应用";
const adminTitle = "记账吧后台管理系统";
const rules = {
  isEmail: (v) => /.+@.+\..+/.test(v) || "邮箱格式有误",
  isNumber: (v) => (/^\d+$/.test(v) || /^\d+[.]?\d+$/.test(v)) || "只能输入数字"
}
const images = {
  avatar:
      "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/avatar.jpg",
  profile:
      "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/profile.svg",
  coding:
      "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/coding.svg",
  working:
      "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/working.svg",
  education:
      "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/education.svg",
  ideas:
      "https://cdn.jsdelivr.net/gh/LuShan123888/Tally-Frontend@gh-pages/static/images/ideas.svg",
};
const adminMenu = [
  {
    icon: "mdi-home",
    path: "/admin/index",
    title: "总览",
    children: null
  },
  {
    icon: "mdi-account",
    title: "账号管理",
    children: [
      {
        path: "/admin/userManagement",
        title: "用户管理",
        children: null
      },
      {
        path: "/admin/role",
        title: "角色管理",
        children: null
      },
      {
        path: "/admin/permission",
        title: "权限管理",
        children: null
      }
    ]
  },
  {
    icon: "mdi-message-alert",
    path: "/admin/feedback",
    title: "反馈处理",
    children: null
  },
  {
    icon: "mdi-database-eye",
    path: "/admin/druid",
    title: "数据源监控",
    children: null
  },
  {
    icon: "mdi-api",
    path: "/admin/swagger",
    title: "API文档",
    children: null
  }
]
export default {
  apiBase,
  frameBase,
  fileBase,
  title,
  images,
  adminTitle,
  adminMenu,
  rules
};
</script>