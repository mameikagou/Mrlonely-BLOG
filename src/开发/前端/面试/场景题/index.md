# 场景题

## 1. URL 从输入到显示会发生什么？

### 标准答法
- DNS 解析
- 建立 TCP 连接（HTTPS 还包含 TLS 握手）
- 发起 HTTP 请求并接收响应
- 浏览器解析 HTML/CSS/JS，构建 DOM/CSSOM
- 生成 Render Tree，布局、绘制、合成

### 关键点
- 渲染主流程：解析 → 构建树 → 布局 → 绘制 → 合成
- 关键路径优化：减少阻塞资源、利用缓存

### 追问
- HTTP/1.1 与 HTTP/2 的差异？
- 解析过程中 JS 为什么会阻塞渲染？

## 2. 用户退出后重定向到登录，如何规划逻辑？

### 标准答法
- 前端：
  - 调用退出接口
  - 清理本地状态（token、用户信息）
  - 重定向到登录页
  - 对需登录页面做路由守卫
- 后端：
  - 提供退出接口
  - 将 token 拉黑或缩短有效期

### 关键点
- 退出要同时清理本地与服务端状态
- 路由守卫避免“退出后回退”

### 追问
- 单点登录场景如何处理退出？

## 3. 讲讲 CSRF-Token 的细节

### 标准答法
- CSRF 是跨站请求伪造，利用浏览器自动携带 Cookie 造成越权请求
- 防护方式：
  - 同源策略限制攻击者读取 token
  - 服务端生成 CSRF token，要求请求携带并校验

### 关键点
- 服务端一般不在 Cookie 中读取 token，而是对比 Cookie 与请求头/表单字段
- 可配合 SameSite Cookie 降低风险

### 追问
- CSRF 与 XSS 的差异？
- SameSite=Lax/Strict/None 的区别？

## 4. localStorage、sessionStorage、Cookie 的区别

| 特性 | Cookie | localStorage | sessionStorage |
| :--- | :--- | :--- | :--- |
| **生命周期** | 可设置过期时间，关闭浏览器后依然存在 | 永久存在，除非手动清除 | 当前会话有效，关闭标签页或浏览器后清除 |
| **存储大小** | **约 4KB** | **约 5MB ~ 10MB** | **约 5MB ~ 10MB** |
| **与服务端通信** | 每次 HTTP 请求都会自动携带 | 仅在客户端，不自动发送 | 仅在客户端，不自动发送 |
| **作用域** | 同源下的所有窗口和标签页共享 | 同源下的所有窗口和标签页共享 | 仅在当前浏览器标签页内有效，不同标签页不共享 |

### 关键点
- localStorage 与 sessionStorage 的核心差异是生命周期与标签页共享
- 大容量存储建议使用 IndexedDB 封装库（如 localforage）

### 追问
- localStorage 超出容量怎么办？
- Cookie 如何设置 HttpOnly/SameSite？

## 5. 双 token 的两个 token 分别做什么？

### 标准答法
- access token：用于请求业务接口，生命周期短
- refresh token：用于刷新 access token，生命周期长

### 关键点
- refresh token 应存储更安全（如 HttpOnly Cookie）
- 业务接口只接受 access token

### 追问
- refresh token 被盗如何止损？
