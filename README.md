# T-Gig (Boston) 🚇
### MBTA Subway-Connected Student Job & Gig Aggregator for Boston College Students

**T-Gig** 是一款专为大波士顿地区在校大学生（Harvard、MIT、Northeastern、BU、BC、Tufts、Emerson 等）打造的轻量兼职与实习机会智能聚合平台。

---

## 💡 产品解决的核心痛点

1. **解决交通痛点（MBTA The T 沿线导向）**
   - 大部分波士顿大学生没有私家车，极度依赖红线（Red）、橙线（Orange）、绿线（Green）、蓝线（Blue）。
   - T-Gig 将波士顿地铁全图与岗位坐标结合，直观展示岗位距地铁站步行时间（≤ 2分钟、≤ 5分钟、≤ 10分钟）。
2. **解决信任与薪资拖欠痛点**
   - 传统平台虚假岗位多、拖欠薪水。T-Gig 展示**雇主按时发薪率（Pay Punctuality Rate）**、大学生真实评价与 Vibe Check。
3. **解决学生签证身份痛点（F-1 / CPT / OPT）**
   - 一键筛选 `🎓 On-Campus (F-1 100% Safe)` 与 `⚡ CPT/OPT Eligible`，避免触碰违规红线。
4. **薪资直观色阶（Wage Color Coding）**
   - 地图上直接标出时薪，按色阶区分：
     - 🟢 **$30+/hr**：高阶家教、科研助理（RA）、技术岗位；
     - 🔵 **$20 - $29/hr**：IT 技术支持、校园 Desk、活动会务；
     - 🟡 **$15 - $19/hr**：咖啡师、书店零售、餐饮等基础时薪。
5. **轻量无中介 + 邮件订阅（Daily Digest）**
   - 纯聚合展示（聚合自 Indeed、Craigslist、Reddit r/bostonjobs、各大高校官方就业中心），点击直接跳转原网页申请。
   - 支持单条岗位“一键转发至邮箱”以及定制每天早上 8:00 AM 的 MBTA 沿线兼职日报推送。

---

## 🛠️ 技术栈与设计亮点

- **前端技术**：Vite + React 19 + TypeScript + Tailwind CSS
- **地图引擎**：Leaflet（加载暗黑高对比度瓦片图层 + MBTA 官方配色地铁折线与大学站点）
- **UI & 动效**：Lucide React 图标、Canvas-Confetti 订阅反馈、Plus Jakarta Sans 现代美式大学审美排版
- **运行性能**：构建仅需 1.5 秒，无需繁重后端，开箱即用。

---

## 🚀 启动与体验指南

```bash
# 启动本地开发服务器
npm run dev

# 构建生产版本
npm run build
```

启动后在浏览器打开 `http://localhost:5173` 即可进行交互体验！
