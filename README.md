# Personal Homepage

杨耀鹏的双语学术与工程个人主页，面向中国大陆与海外访问。页面没有远程字体、远程脚本或图片依赖，可直接部署为静态网站。

## 本地预览

```bash
python3 -m http.server 4173
```

打开 `http://localhost:4173`。

## 修改内容

个人资料集中在 `Site_Data.js`。中英文内容分开维护，页面结构和交互无需重复修改。

## 部署结构

- 主站：GitHub Pages，作为免费、成熟且可回滚的发布源。
- 独立域名：`yepyoung.me`，在阿里云注册并使用阿里云 DNS。
- 加速主站：阿里云 ESA Functions & Pages，全球节点（不含中国内地），无需 ICP 备案。
- 构建命令留空，静态资源目录为 `.`。

`esa.jsonc` 固化了阿里云 ESA Pages 的静态部署配置。

## 隐私

公开页面包含姓名、城市、教育、研究、邮箱与 GitHub。手机号和精确出生年月不公开展示。
