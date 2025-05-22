
### webcomponent
- 自定义标签
- 组件化
- 隔离性
- 可复用性
- 可维护性

webcomponet是浏览器原生支持的组件化技术，不依赖任何框架和库，允许开发者自己定义可复用的组件，自带shadow dom、ES Module、HTML Template等特性。
- Custom elements（自定义元素）
- Shadow DOM（影子DOM）
    - Shadow DOM 是针对 HTML & CSS 启动用了一个局部作用域,做到了与宿主环境的隔离
    - Shandow Dom 使用上与普通的dom的其余不同点是 ：
        - 创建方式不一致
        - 作为子元素时，已其他文档流中的元素隔离,宿主环境使用 ，querySelector获取不到 shandow dom 及其子节点元素。
- HTML templates（HTML模板）

适用场景：
跨框架、浏览器原生。微前端、嵌入网页

#### 例子:
```ts
// 定义 Web Component
class UserCard extends HTMLElement {
  constructor() {
    super();
    // 创建 Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  // 组件连接到 DOM 时
  connectedCallback() {
    const name = this.getAttribute('name') || 'Anonymous';
    const avatar = this.getAttribute('avatar') || 'default.png';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; border: 1px solid #ddd; padding: 10px; }
        .avatar { width: 50px; height: 50px; border-radius: 50%; }
      </style>
      <div>
        <img class="avatar" src="${avatar}">
        <h3>${name}</h3>
        <div class="info">
          <slot></slot>
        </div>
      </div>
    `;
  }
  
  // 监听属性变化
  static get observedAttributes() {
    return ['name', 'avatar'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    // 处理属性变化...
    this.connectedCallback();
  }
}

// 注册自定义元素
customElements.define('user-card', UserCard);

// 使用
// <user-card name="John Doe" avatar="john.jpg">
//   <p>Web Developer</p>
// </user-card>
```

等效的react组件:
```tsx
// React 组件
function UserCard({ name = 'Anonymous', avatar = 'default.png', children }) {
  return (
    <div className="user-card">
      <img className="avatar" src={avatar} alt={name} />
      <h3>{name}</h3>
      <div className="info">
        {children}
      </div>
    </div>
  );
}

// 使用
// <UserCard name="John Doe" avatar="john.jpg">
//   <p>Web Developer</p>
// </UserCard>
```


