# 环境变量配置指南

## 配置步骤

1. 复制环境变量模板:
```bash
cp .env.example .env
```

2. 根据实际环境修改 `.env` 文件中的配置

## 可用的环境变量

### API 配置

| 变量名 | 说明 | 默认值 | 示例 |
|--------|------|--------|------|
| VITE_API_SERVER | API服务器地址 | http://localhost:3000 | https://api.example.com |

## 多环境配置

项目支持以下环境配置文件:

- `.env` - 基础配置
- `.env.local` - 本地开发配置(优先级高于.env)
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置
- `.env.test` - 测试环境配置

运行不同环境:

```bash
# 开发环境
npm run dev

# 生产环境
npm run build -- --mode production

# 测试环境
npm run build -- --mode test
```

## 注意事项

1. 所有环境变量必须以 `VITE_` 开头才会被 Vite 识别
2. .env 文件包含敏感信息,已添加到 .gitignore
3. 请妥善保管生产环境的环境变量
4. 修改环境变量后需要重启开发服务器
