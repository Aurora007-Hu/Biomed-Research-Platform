# BioMed Research Platform - 生物医药行业研究平台

> 一站式生物医药行业智能研究平台，服务于券商行研部门

## 🎯 核心功能

### 1. AI知识库 ⭐⭐⭐ 最高优先级
- 术语解释（ORR、mPFS、ADC等专业术语）
- 智能问答（基于LLM的自然语言查询）
- 法规解读（FDA、NMPA政策解读）
- 知识图谱（药物靶点关系可视化）

### 2. 自动化报告生成 ⭐⭐⭐ 最高优先级
- 5种专业报告模板
- 一键生成图表（财务趋势、管线对比）
- AI辅助撰写
- Word/PDF/PPT导出

### 3. 行业监控预警 ⭐⭐ 优先级
- 自选股监控
- 关键事件推送（临床结果、FDA批准、财报发布）
- 事件日历
- 舆情监控

### 4. 数据API ⭐⭐ 优先级
- RESTful API接口
- 多格式数据导出（Excel、CSV、JSON）
- Excel插件
- API文档

## 🛠️ 技术栈

- **前端框架**: React 18 + Vite 5
- **样式**: Tailwind CSS
- **图表**: Recharts
- **图标**: Lucide React
- **路由**: React Router DOM 6
- **日期**: date-fns

## 📁 项目结构

```
frontend/
├── src/
│   ├── components/     # 可复用组件
│   ├── pages/          # 页面组件
│   │   ├── Dashboard.jsx         # 首页概览
│   │   ├── AIKnowledgeBase.jsx   # AI知识库
│   │   ├── ReportGenerator.jsx    # 自动化报告
│   │   ├── MonitoringCenter.jsx   # 行业监控
│   │   └── DataAPI.jsx           # 数据API
│   ├── hooks/          # 自定义Hooks
│   ├── data/           # 模拟数据
│   ├── App.jsx         # 主应用
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── public/             # 静态资源
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 快速开始

### 安装依赖

```bash
cd frontend
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📝 功能页面

### 首页概览
- 快速统计（研究覆盖、活跃用户、报告产出、API调用）
- 平台活跃度趋势图
- 重点药企管线数量
- 最近动态
- 近期重要事件
- 热门研究话题

### AI知识库
- 左侧：核心术语速查 + 热门问题快捷入口
- 中间：AI对话界面
- 右侧：术语详情展示

### 自动化报告
- 三步流程：选择模板 → 配置参数 → 生成预览
- 多种报告模板
- 图表自动生成
- 多格式导出

### 行业监控
- 提醒中心（分类筛选、搜索）
- 自选股监控表格
- 事件日历
- 添加监控弹窗

### 数据API
- API Key管理
- API端点文档
- 代码示例（Python/JavaScript/cURL）
- 数据导出功能
- Excel插件介绍

## 🎨 设计规范

### 颜色系统
- **主色**: Primary (#0ea5e9)
- **辅助色**: Accent (#10b981)
- **背景**: Dark (#0f172a, #1e293b)
- **文字**: Primary (#f8fafc), Secondary (#94a3b8)

### 组件风格
- 玻璃拟态效果 (Glassmorphism)
- 卡片悬浮动画
- 平滑过渡动画
- 深色主题

## 📄 文档

- [PRD文档](./PRD/生物医药行业研究平台PRD-v2.0.md) - 产品需求文档 v2.0

## 🔄 更新日志

### v1.0.0 (2026-05-12)
- 完成PRD v2.0
- 完成MVP前端界面开发
- 4大核心功能全部实现

## 📧 联系

如有问题或建议，请联系开发团队。

---

**项目路径**: `E:\WorkBuddy\biomed-research-platform`
