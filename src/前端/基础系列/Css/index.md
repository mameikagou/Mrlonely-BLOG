# 不知道叫啥

### 属性

```css
mix-blend-mode: multiply;
```

这个的作用是，控制元素与其背景的混合模式。

以下是一些常见的 mix-blend-mode 值及其效果： normal：默认值，不进行混合。

- multiply：将元素的颜色与其背景颜色相乘，通常会使结果变暗。
- screen：将元素的颜色与其背景颜色的补色相乘，通常会使结果变亮。
- overlay：根据背景颜色的亮度，选择 multiply 或 screen 效果。
- darken：选择元素和背景中较暗的颜色。 lighten：选择元素和背景中较亮的颜色。
- color-dodge：通过降低背景颜色的对比度来使元素变亮。
- color-burn：通过增加背景颜色的对比度来使元素变暗。
- hard-light：根据元素的亮度，选择 multiply 或 screen 效果。 soft-light：类似于
- overlay，但效果更柔和。
- difference：从背景颜色中减去元素颜色，或从元素颜色中减去背景颜色，取绝对值。
- exclusion：类似于 difference，但效果更柔和。
- hue：使用元素的色相，但保留背景的饱和度和亮度。
- saturation：使用元素的饱和度，但保留背景的色相和亮度。
- color：使用元素的色相和饱和度，但保留背景的亮度。
- luminosity：使用元素的亮度，但保留背景的色相和饱和度。

```
object-fit: cover;
```

- contain (包含)
作用: 保持内容的原始宽高比，同时将其缩放，使其完全包含在容器内。
效果: 内容会完整显示，不会被裁剪，但如果内容的宽高比与容器不同，容器可能会留有空白区域（类似电影宽屏幕在普通屏幕上播放时的“黑边”效果，称为 letterboxing 或 pillarboxing）。
场景: 当你需要确保整个图像或视频都可见，即使容器尺寸不匹配时使用。

- cover (覆盖)
作用: 保持内容的原始宽高比，同时将其缩放，使其完全覆盖整个容器区域。
效果: 容器会被完全填满，不会有空白区域。但如果内容的宽高比与容器不同，内容的一部分可能会被裁剪掉（超出容器的部分不可见）。
场景: 当你需要让容器完全被图像或视频填满，即使牺牲部分内容的可见性时使用，常用于背景图或卡片封面。

- none (无)
作用: 不对内容进行任何缩放。
效果: 内容将以其原始尺寸显示。如果容器小于内容原始尺寸，内容会被裁剪；如果容器大于内容原始尺寸，内容会居中显示（默认，可通过 object-position 调整），周围留有空白。
场景: 当你需要以 1:1 的像素显示图像，或者不希望图像被缩放时使用。

- scale-down (向下缩放)
作用: 比较 none 和 contain 的效果，选择那个能让内容尺寸更小的。
效果: 如果内容的原始尺寸小于或等于容器尺寸，效果如同 none（显示原始尺寸）。如果内容的原始尺寸大于容器尺寸，效果如同 contain（缩小以适应容器并保持宽高比）。
场景: 当你希望小图片保持原样，大图片则缩小以适应容器时使用，可以防止小图片被无谓放大。


### 示例

```vue
<template>
    <div class="layer" id="layer1">
        <div class="can-container">
            <img src="http://47.109.134.184:9000/myimages/can%202.png" class="can-img" />
            <img src="http://47.109.134.184:9000/myimages/Contents.png" alt="" class="can-wrapper">
        </div>
    </div>
</template>

<style scoped>
    .layer {
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    #layer1 {
        background: rgb(255, 239, 219);
        z-index: 2;
    }

    .can-container {
        width: 200px;
        position: relative;
        overflow: hidden;
    }

    .can-img {
        width: 100%;
    }

    .can-wrapper {
        mix-blend-mode: multiply;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -51%);
        height: 90%;
        width: 100%;
        /* 使用object-fit: cover; 来解决变形的问题 */
        object-fit: cover; 
    }
</style>
```

<BlendModeDemo />
