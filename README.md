# Supabase Auth 前端演示项目

这是一个使用 Supabase Auth 服务实现用户认证功能的前端静态页面项目。包含完整的登录、注册、邮箱验证、重置密码等功能，界面采用现代化设计。

## 功能特性

- ✅ 用户注册 (邮箱/密码)
- ✅ 用户登录 (邮箱/密码)
- ✅ 邮箱验证
- ✅ 忘记密码/重置密码
- ✅ 社交账号登录 (Google, GitHub, Twitter)
- ✅ 现代化UI设计，响应式布局
- ✅ 流畅的动画和交互效果

## 项目结构

```
supabase/
├── app.js               # Supabase Auth 核心功能实现
├── login.html           # 登录页面
├── register.html        # 注册页面
├── verify-email.html    # 邮箱验证回调页面
├── forgot-password.html # 忘记密码页面
├── reset-password.html  # 重置密码页面
└── README.md            # 项目说明文档
```

## 使用说明

### 1. 配置 Supabase

1. 首先，您需要在 [Supabase](https://app.supabase.io) 创建一个账户和项目
2. 在项目设置中找到您的项目 URL 和匿名密钥
3. 编辑 `app.js` 文件，将以下两行替换为您的实际值：

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 2. 配置认证设置

在 Supabase 控制台中：

1. 进入「Authentication」设置
2. 启用电子邮件/密码认证方法
3. 配置以下 URL（根据您的部署情况调整）：
   - 站点 URL: 您的网站基础 URL
   - 重定向 URL: 包括登录后的回调 URL 和密码重置 URL

### 3. 部署项目

您可以使用任何静态网站托管服务部署此项目，例如：
- Vercel
- Netlify
- GitHub Pages
- AWS S3

### 4. 本地开发

直接在浏览器中打开 HTML 文件即可进行本地测试。由于 CORS 限制，某些功能可能需要通过本地服务器访问。

您可以使用以下简单的方法启动本地服务器：

**使用 Python:**
```bash
python -m http.server
```

**使用 Node.js 和 http-server:**
```bash
npx http-server
```

## 技术栈

- HTML5
- Tailwind CSS v3 (用于样式)
- Font Awesome (用于图标)
- Supabase JavaScript SDK v2 (用于认证功能)

## 安全注意事项

1. 请确保保护好您的 Supabase 密钥，不要在客户端代码中暴露服务端密钥
2. 在生产环境中，考虑使用环境变量管理配置
3. 实现适当的表单验证和错误处理
4. 考虑添加 CSRF 保护和其他安全措施

## 浏览器兼容性

此项目支持所有现代浏览器，包括：
- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT