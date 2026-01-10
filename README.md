# Tally-Frontend

[简体中文](#简体中文) | [English](#english)

---

## 简体中文

**云记贝** 前端应用 - 基于 Vue.js 2 的记账管理系统前端，包含 Web 应用和微信小程序。

### 功能特性

- **Web 应用** - 完整的记账管理系统
- **微信小程序** - 基于 UniApp 的跨平台小程序
- **管理后台** - 用户/角色/权限/账单类型管理
- **数据可视化** - Chart.js 图表展示统计信息
- **UI 框架** - Element UI + Vuetify 双框架支持

### 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| **核心框架** | Vue.js | 2.6.11 |
| **构建工具** | Vue CLI | 4.5.0 |
| **状态管理** | Vuex | 3.4.0 |
| **路由管理** | Vue Router | 3.2.0 |
| **UI 框架** | Element UI + Vuetify | 2.4.5 + 2.4.0 |
| **HTTP 客户端** | Axios | 0.21.1 |
| **图表库** | Chart.js + Vue-ChartJS | 2.9.4 + 3.5.1 |
| **样式预处理** | Sass/SCSS | 1.32.6 |
| **小程序** | UniApp | - |

### 快速开始

#### 安装依赖

```bash
yarn install
```

#### 开发模式

```bash
yarn serve
# 应用将启动在 http://localhost:8000
```

#### 生产构建

```bash
yarn build
```

#### 代码检查

```bash
yarn lint
```

#### 部署到 GitHub Pages

```bash
yarn deploy
```

### 项目结构

```
src/
├── main.js              # 应用入口文件
├── App.vue              # 根组件
│
├── axios/               # HTTP 请求配置
│   └── index.js         # Axios 拦截器配置
│
├── router/              # 路由配置
│   ├── index.js         # 路由定义
│   └── permission.js    # 路由权限控制
│
├── store/               # Vuex 状态管理
│   └── index.js         # Store 配置
│
├── components/          # 全局组件
│   ├── AppBar/          # 顶部栏组件
│   ├── Avatar/          # 头像组件
│   ├── BarChart/        # 柱状图组件
│   ├── DarkButton/      # 深色按钮组件
│   ├── ImageUploader/   # 图片上传组件
│   ├── LineChart/       # 折线图组件
│   ├── PieChart/        # 饼图组件
│   ├── iFooter/         # 页脚组件
│   └── iImage/          # 图片组件
│
├── pages/               # 页面组件
│   ├── Admin/           # 管理后台页面
│   │   ├── Home/                    # 后台首页
│   │   ├── UserManagement/          # 用户管理
│   │   ├── RoleManagement/          # 角色管理
│   │   ├── PermissionManagement/    # 权限管理
│   │   ├── BillTypeManagement/      # 账单类型管理
│   │   ├── FeedbackManagement/      # 反馈管理
│   │   ├── Druid/                   # Druid 监控
│   │   ├── Sentinel/                # Sentinel 限流
│   │   ├── Portainer/               # Docker 管理
│   │   └── Swagger/                 # API 文档
│   │
│   ├── Index/           # 主应用页面
│   │   ├── Home/        # 首页
│   │   ├── Account/     # 账户页
│   │   ├── Statistics/  # 统计页
│   │   └── Mine/        # 我的页面
│   │
│   ├── SignIn/          # 登录页
│   ├── SignUp/          # 注册页
│   ├── Forgot/          # 忘记密码页
│   ├── Test/            # 测试页
│   └── PageNotFound/    # 404 页面
│
├── plugins/             # 插件配置
│   ├── element/         # Element UI 配置
│   └── vuetify.js       # Vuetify 配置
│
├── common/              # 公共工具
│   ├── DateUtils.js     # 日期工具
│   └── Global.vue       # 全局变量
│
└── styles/              # 样式文件
    └── variables.scss   # SCSS 变量

uniapp/                  # UniApp 微信小程序
├── App.vue
├── main.js
├── manifest.json        # UniApp 配置
├── pages.json           # 页面配置
├── uni.scss             # 全局样式
├── pages/               # 小程序页面
└── static/              # 小程序静态资源
```

### 核心功能模块

#### 主应用 (Index)

- **首页** - 账单列表与快速记账
- **账户** - 账户管理与余额查看
- **统计** - 账单统计与图表展示
- **我的** - 个人中心与设置

#### 管理后台 (Admin)

- 用户管理
- 角色管理
- 权限管理
- 账单类型管理
- 反馈管理
- 系统监控（Druid、Sentinel、Portainer、Swagger）

#### 认证页面

- 登录/注册
- 忘记密码

### 图表组件

集成 Chart.js 实现数据可视化：

- **BarChart** - 柱状图
- **LineChart** - 折线图
- **PieChart** - 饼图

### 配置

| 文件 | 说明 |
|------|------|
| `vue.config.js` | Vue CLI 构建配置 |
| `babel.config.js` | Babel 转译配置 |
| `public/CNAME` | 自定义域名配置 |
| `uniapp/manifest.json` | UniApp 微信小程序配置 |

### 状态管理

使用 Vuex 进行状态管理，主要存储：

- 用户信息
- Token 认证信息
- 应用配置

Token 持久化：使用 `localStorage` 和 `sessionStorage`

### 路由权限

实现了基于 token 的路由守卫和权限验证：

- 未登录用户重定向到登录页
- 权限验证通过路由配置

### 部署

生产环境配置：
- 部署平台：GitHub Pages
- CDN：jsDelivr
- 自定义域名：通过 `public/CNAME` 配置

### 许可证

MIT

---

## English

**Tally-Frontend** - A Vue.js 2-based accounting management system frontend, including Web application and WeChat Mini Program.

### Features

- **Web Application** - Complete accounting management system
- **WeChat Mini Program** - Cross-platform mini program based on UniApp
- **Admin Dashboard** - User/Role/Permission/Bill Type management
- **Data Visualization** - Chart.js for statistics display
- **UI Frameworks** - Element UI + Vuetify dual framework support

### Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Core Framework** | Vue.js | 2.6.11 |
| **Build Tool** | Vue CLI | 4.5.0 |
| **State Management** | Vuex | 3.4.0 |
| **Router** | Vue Router | 3.2.0 |
| **UI Framework** | Element UI + Vuetify | 2.4.5 + 2.4.0 |
| **HTTP Client** | Axios | 0.21.1 |
| **Chart Library** | Chart.js + Vue-ChartJS | 2.9.4 + 3.5.1 |
| **CSS Preprocessor** | Sass/SCSS | 1.32.6 |
| **Mini Program** | UniApp | - |

### Quick Start

#### Install Dependencies

```bash
yarn install
```

#### Development

```bash
yarn serve
# App will start at http://localhost:8000
```

#### Production Build

```bash
yarn build
```

#### Lint

```bash
yarn lint
```

#### Deploy to GitHub Pages

```bash
yarn deploy
```

### Project Structure

```
src/
├── main.js              # App entry point
├── App.vue              # Root component
│
├── axios/               # HTTP request configuration
│   └── index.js         # Axios interceptor config
│
├── router/              # Router configuration
│   ├── index.js         # Route definitions
│   └── permission.js    # Route permission control
│
├── store/               # Vuex state management
│   └── index.js         # Store configuration
│
├── components/          # Global components
│   ├── AppBar/          # App bar component
│   ├── Avatar/          # Avatar component
│   ├── BarChart/        # Bar chart component
│   ├── DarkButton/      # Dark button component
│   ├── ImageUploader/   # Image upload component
│   ├── LineChart/       # Line chart component
│   ├── PieChart/        # Pie chart component
│   ├── iFooter/         # Footer component
│   └── iImage/          # Image component
│
├── pages/               # Page components
│   ├── Admin/           # Admin pages
│   │   ├── Home/                    # Admin home
│   │   ├── UserManagement/          # User management
│   │   ├── RoleManagement/          # Role management
│   │   ├── PermissionManagement/    # Permission management
│   │   ├── BillTypeManagement/      # Bill type management
│   │   ├── FeedbackManagement/      # Feedback management
│   │   ├── Druid/                   # Druid monitoring
│   │   ├── Sentinel/                # Sentinel rate limiting
│   │   ├── Portainer/               # Docker management
│   │   └── Swagger/                 # API documentation
│   │
│   ├── Index/           # Main app pages
│   │   ├── Home/        # Home page
│   │   ├── Account/     # Account page
│   │   ├── Statistics/  # Statistics page
│   │   └── Mine/        # Profile page
│   │
│   ├── SignIn/          # Sign in page
│   ├── SignUp/          # Sign up page
│   ├── Forgot/          # Forgot password page
│   ├── Test/            # Test page
│   └── PageNotFound/    # 404 page
│
├── plugins/             # Plugin configuration
│   ├── element/         # Element UI config
│   └── vuetify.js       # Vuetify config
│
├── common/              # Common utilities
│   ├── DateUtils.js     # Date utilities
│   └── Global.vue       # Global variables
│
└── styles/              # Style files
    └── variables.scss   # SCSS variables

uniapp/                  # UniApp WeChat Mini Program
├── App.vue
├── main.js
├── manifest.json        # UniApp configuration
├── pages.json           # Page configuration
├── uni.scss             # Global styles
├── pages/               # Mini program pages
└── static/              # Mini program static assets
```

### Core Features

#### Main App (Index)

- **Home** - Bill list and quick accounting
- **Account** - Account management and balance view
- **Statistics** - Bill statistics and chart display
- **Mine** - Profile and settings

#### Admin Dashboard

- User management
- Role management
- Permission management
- Bill type management
- Feedback management
- System monitoring (Druid, Sentinel, Portainer, Swagger)

#### Auth Pages

- Sign up/Sign in
- Forgot password

### Chart Components

Integrated Chart.js for data visualization:

- **BarChart** - Bar chart
- **LineChart** - Line chart
- **PieChart** - Pie chart

### Configuration

| File | Description |
|------|-------------|
| `vue.config.js` | Vue CLI build configuration |
| `babel.config.js` | Babel transpilation configuration |
| `public/CNAME` | Custom domain configuration |
| `uniapp/manifest.json` | UniApp WeChat Mini Program configuration |

### State Management

Uses Vuex for state management, mainly storing:

- User information
- Token authentication
- App configuration

Token persistence: `localStorage` and `sessionStorage`

### Route Permissions

Implements token-based route guards and permission verification:

- Unauthenticated users redirected to login page
- Permission verification through route configuration

### Deployment

Production configuration:
- Platform: GitHub Pages
- CDN: jsDelivr
- Custom domain: Configured via `public/CNAME`

### License

MIT
