
### 为什么用defer和async？
- defer
    - DOMContentLoaded之前解析
    - DOMContentLoaded vs window.onload
        - 前者不等待图片、CSS、iframe等外部资源
        - 后者包括所有资源
- async 
    - 并行解析，不阻塞。
    - 可能出现依赖问题直接报错。
- `<script type="module">`自带一个defer
#### `<script>`标签为什么要放在`<body>`底部，放在`<head>`中会有什么影响?

- 解析时间太长，主要是解析时间的问题。