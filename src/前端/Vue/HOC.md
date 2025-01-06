
Vue中关于HOC的实现：使用defineComponent，然后使用provide和inject来实现，最后return一个h函数；

```ts
export function withConfigProvider(App: Component) {
  return defineComponent({
    name: 'ConfigProvider',
    setup(_, { slots }) {
      const { theme, localeIndex } = useData()
      const config = computed(() => resolveConfig(theme.value, localeIndex.value))

      provide(configSymbol, config)

      const activeTag = ref<Theme.activeTag>({
        label: '',
        type: ''
      })
      provide(activeTagSymbol, activeTag)

      const pageNum = ref(1)
      provide(currentPageNum, pageNum)

      const mode = useColorMode({
        attribute: 'theme',
        modes: {
          // 内置的颜色主题
          'vp-default': 'vp-default',
          'vp-green': 'vp-green',
          'vp-yellow': 'vp-yellow',
          'vp-red': 'vp-red',
          'el-blue': 'el-blue',
          'el-yellow': 'el-yellow',
          'el-green': 'el-green',
          'el-red': 'el-red'
        }
      })
      watch(config, () => {
        mode.value = config.value.blog?.themeColor ?? 'vp-default'
      }, {
        immediate: true
      })

      return () => h(App, null, slots)
    }
  })
}
```


相关知识：

h 函数是 Vue 3 中的渲染函数（render function），用于创建虚拟 DOM 节点（VNode）。它是 createElement 的简写（hyperscript 的简写）。

```ts
// 完整参数签名
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
): VNode

// 省略 props
function h(type: string | Component, children?: Children | Slot): VNode

type Children = string | number | boolean | VNode | null | Children[]

type Slot = () => Children

type Slots = { [name: string]: Slot }
```

```ts
// 默认插槽
h(MyComponent, null, {
  default: () => h('div', null, 'Default slot content')
})

// 具名插槽
h(MyComponent, null, {
  header: () => h('div', null, 'Header content'),
  footer: () => h('div', null, 'Footer content')
})
```