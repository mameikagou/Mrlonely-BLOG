import { useData, useRoute, withBase } from 'vitepress'
import {
    computed,
    defineComponent,
    h,
    inject,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    watch,
} from 'vue'
import type {
    Component,
    ComputedRef,
    InjectionKey,
    Ref
} from 'vue'

export function withConfigProvider(App: Component) {
    return defineComponent({
        name: 'ConfigProvider',
        setup(_, { slots }) {
            return () => h(App, null, slots)
        }
    })
}