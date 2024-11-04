#

## 颜色

hsl() 函数, 三个参数分别是 色相, 饱和度, 亮度

在:root{}类下面做出类似如下的定义:

```css
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
}
```

而可以在tailwind css 的tailwind.config.ts中像这样定义颜色
```ts
 extend: {
      colors: {
        slate5: 'var(--slate5)',
        border: 'hsl(var(--border))',
    }
}
```

一套基于twcss的切换浅色和深色的方案: 

```css
@layer base {
  :root .light {
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
  }
  /* 在dark中覆盖其颜色 */
  .dark {
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
  }
}
```