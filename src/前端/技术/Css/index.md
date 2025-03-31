#


grid布局博客：
https://frontend.horse/articles/thinking-outside-the-box-with-css-grid/




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

## 解决css"背景蒙版" 覆盖了主要内容的问题

nuxt ui主页有个很好看的网格组件: <https://ui.nuxt.com/>

源代码是: <https://github.com/nuxt/ui/blob/dev/docs/pages/index.vue>

一般会出现这个背景蒙版挡住了你的主要显示的内容的情况

解决: 在父元素上加上`relative z-1`(twcss语法)

在子元素加上`relative z-10`

z-index只有position为`relative、absolute、fixed 或 sticky`的时候才会生效




## 3d 3d-transform

transform-style: preserve-3d; 设置3d的3d效果，一般用于父元素；

在创建 3D 效果的动画或布局时，perspective 是必不可少的，能够在一定程度上模拟真实世界的视觉效果。例如，旋转的盒子或者卡片翻转的效果。

perspective: 1000px;



