import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

import { devDependencies } from '../package.json'

export default defineConfig({
  title: "BLOG",
  // description: "BLOG！",
  lang: "zh-CN",
  ignoreDeadLinks: true, // 防止因死链而失败

  head: [
    [
      "link",
      {
        rel: "icon",
        href: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbmdlcnByaW50Ij48cGF0aCBkPSJNMTIgMTBhMiAyIDAgMCAwLTIgMmMwIDEuMDItLjEgMi41MS0uMjYgNCIvPjxwYXRoIGQ9Ik0xNCAxMy4xMmMwIDIuMzggMCA2LjM4LTEgOC44OCIvPjxwYXRoIGQ9Ik0xNy4yOSAyMS4wMmMuMTItLjYuNDMtMi4zLjUtMy4wMiIvPjxwYXRoIGQ9Ik0yIDEyYTEwIDEwIDAgMCAxIDE4LTYiLz48cGF0aCBkPSJNMiAxNmguMDEiLz48cGF0aCBkPSJNMjEuOCAxNmMuMi0yIC4xMzEtNS4zNTQgMC02Ii8+PHBhdGggZD0iTTUgMTkuNUM1LjUgMTggNiAxNSA2IDEyYTYgNiAwIDAgMSAuMzQtMiIvPjxwYXRoIGQ9Ik04LjY1IDIyYy4yMS0uNjYuNDUtMS4zMi41Ny0yIi8+PHBhdGggZD0iTTkgNi44YTYgNiAwIDAgMSA5IDUuMnYyIi8+PC9zdmc+',
      },
    ],
  ],
  // vite: {
  //   plugins: [
  //     groupIconVitePlugin({
  //       customIcon: {
  //         ts: localIconLoader(import.meta.url, "./svg/typescript.svg"), //本地ts图标导入
  //         md: localIconLoader(import.meta.url, "./svg/md.svg"), //markdown图标
  //         css: localIconLoader(import.meta.url, "./svg/css.svg"), //css图标
  //         js: "logos:javascript", //js图标
  //       },
  //     }),
  //   ],
  // },

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释
  themeConfig: {
    editLink: {
      pattern: "https://github.com/mameikagou/Mrlonely-BLOG/:path",
      text: "在 GitHub 上编辑此页面",
    },
    search: {
      provider: "local",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: generateSidebar([
      {
        manualSortFileNameByPriority: ["README"],
        collapsed: true,
        collapseDepth: 2,
        useFolderLinkFromIndexFile: true,
        // 如果要把 src 目录下的文件放到根目录，可以设置 scanStartPath 为 '/src'
        // 而不是使用 documentRootPath: 'example', 会导致所有文件都放到 example 目录下;
        scanStartPath: "/src",
        // 用法是, 直接写名字;
        excludeFolders: ["Exclude"],
      },
    ]),

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mameikagou/Mrlonely-BLOG",
      },
    ],
  },
});
