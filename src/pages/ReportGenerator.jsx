import React, { useState } from 'react'
import { FileText, Download, Plus, Calendar, Building2, TrendingUp, BarChart3, PieChart, ArrowRight, Eye, Edit, Copy, Save, Sparkles, Check } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const reportTemplates = [
  { id: 1, name: '公司深度研究报告', desc: '覆盖财务、管线、估值、竞争格局等', icon: Building2, usage: 89 },
  { id: 2, name: '行业专题报告', desc: '特定治疗领域或赛道深度分析', icon: TrendingUp, usage: 76 },
  { id: 3, name: '季报/年报点评', desc: '定期业绩跟踪与点评', icon: Calendar, usage: 95 },
  { id: 4, name: 'IPO估值报告', desc: '新股上市定价参考', icon: BarChart3, usage: 45 },
  { id: 5, name: '竞争格局分析', desc: '同行业多公司对比', icon: PieChart, usage: 68 },
]

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const mockChartData = {
  revenue: [
    { year: '2020', value: 120 },
    { year: '2021', value: 145 },
    { year: '2022', value: 168 },
    { year: '2023', value: 195 },
    { year: '2024E', value: 230 },
  ],
  pipeline: [
    { name: 'III期', value: 12, color: '#0ea5e9' },
    { name: 'II期', value: 8, color: '#10b981' },
    { name: 'I期', value: 5, color: '#f59e0b' },
    { name: '临床前', value: 15, color: '#8b5cf6' },
  ],
  marketShare: [
    { name: '恒瑞医药', value: 35 },
    { name: '百济神州', value: 25 },
    { name: '信达生物', value: 18 },
    { name: '君实生物', value: 12 },
    { name: '其他', value: 10 },
  ]
}

export default function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [step, setStep] = useState(1) // 1: 选择模板, 2: 配置参数, 3: 生成预览
  const [companyName, setCompanyName] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReport, setGeneratedReport] = useState(null)

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setStep(2)
  }

  const handleGenerate = () => {
    if (!companyName || !reportTitle) return
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedReport({
        title: reportTitle,
        company: companyName,
        date: new Date().toLocaleDateString('zh-CN'),
        content: generateReportContent(companyName)
      })
      setIsGenerating(false)
      setStep(3)
    }, 2500)
  }

  const generateReportContent = (company) => {
    return `## 执行摘要

**${company}** 是国内领先的创新药企业，专注于肿瘤、自身免疫病等重大疾病领域。公司已建立完善的研发管线，其中核心产品XXX已于2024年获批上市，商业化进展顺利。

### 核心看点
1. **研发管线丰富**：12个III期临床项目，涵盖肿瘤、免疫等多个治疗领域
2. **国际化进展**：核心产品已启动全球多中心临床试验
3. **商业化能力**：销售团队覆盖全国，已建立完善的学术推广体系

## 一、公司概况

${company}成立于2010年，总部位于上海，是一家专注于创新药研发的生物医药企业。公司于2020年在科创板上市，目前市值约500亿元。

### 1.1 股权结构
- 创始人团队持股：35%
- 机构投资者：45%
- 公众股东：20%

## 二、研发管线分析

公司目前拥有在研项目30余个，其中进入III期临床的项目12个。

### 2.1 核心在研产品

| 产品名称 | 靶点 | 适应症 | 临床阶段 | 预计获批时间 |
|---------|-----|-------|---------|------------|
| JS-001 | PD-1 | 肺癌 | III期 | 2025年 |
| JS-002 | VEGF | 眼底疾病 | III期 | 2025年 |
| JS-003 | HER2 ADC | 乳腺癌 | II期 | 2026年 |

## 三、财务分析

### 3.1 收入趋势
公司近五年收入保持稳健增长，年复合增长率约20%。2024年收入预计达230亿元。

### 3.2 盈利能力
毛利率保持在80%以上，研发投入占收入比重约25%。

## 四、估值分析

采用DCF模型对公司进行估值，关键假设如下：
- 折现率：10%
- 永续增长率：3%
- 研发成功率：参考行业平均约15%

**目标市值**：550亿元  
**目标价**：68元/股

## 五、投资建议

**维持"推荐"评级**

风险提示：研发不及预期、政策降价风险、市场竞争加剧`
  }

  const handleExport = (format) => {
    alert(`正在导出${format}格式报告...`)
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {[
            { num: 1, label: '选择模板' },
            { num: 2, label: '配置参数' },
            { num: 3, label: '生成预览' },
          ].map((s, index) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s.num
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-sm font-medium ${step >= s.num ? 'text-white' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
              {index < 2 && (
                <div className={`flex-1 h-1 mx-4 rounded ${step > s.num ? 'bg-primary-500' : 'bg-slate-700'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Select Template */}
      {step === 1 && (
        <div className="animate-fadeIn">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">选择报告模板</h3>
            <p className="text-slate-400">从专业模板库中选择适合的报告类型</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon
              return (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="glass rounded-2xl p-6 text-left card-hover group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary-500/20 group-hover:bg-primary-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <span className="text-xs text-slate-400">{template.usage}%使用率</span>
                  </div>
                  <h4 className="font-semibold mb-2">{template.name}</h4>
                  <p className="text-sm text-slate-400 mb-4">{template.desc}</p>
                  <div className="flex items-center gap-2 text-primary-400 text-sm group-hover:gap-3 transition-all">
                    开始使用 <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              )
            })}
            <button className="glass rounded-2xl p-6 text-left card-hover border-dashed border-2 border-slate-700 hover:border-primary-500/50 group">
              <div className="flex items-center justify-center h-full min-h-[120px]">
                <div className="text-center">
                  <div className="p-3 rounded-xl bg-slate-800/50 group-hover:bg-slate-800 transition-colors inline-block mb-3">
                    <Plus className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-400">自定义模板</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Configure Parameters */}
      {step === 2 && selectedTemplate && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Config Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary-500/20">
                    <FileText className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedTemplate.name}</h3>
                    <p className="text-sm text-slate-400">{selectedTemplate.desc}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">公司/标的名称</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="例如：恒瑞医药"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">报告标题</label>
                    <input
                      type="text"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      placeholder="例如：恒瑞医药深度研究报告"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">报告期间</label>
                      <select className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors">
                        <option>2024年度</option>
                        <option>2024H1</option>
                        <option>2023年度</option>
                        <option>自定义</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">分析师</label>
                      <input
                        type="text"
                        defaultValue="胡玲溪"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">包含章节</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['执行摘要', '公司概况', '研发管线', '财务分析', '估值分析', '投资建议'].map(chapter => (
                        <label key={chapter} className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 text-primary-500 focus:ring-primary-500" />
                          <span className="text-sm">{chapter}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-700/50">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors"
                  >
                    返回
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={!companyName || !reportTitle || isGenerating}
                    className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        AI生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        AI生成报告
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-5">
                <h4 className="font-medium mb-4">自动生成图表预览</h4>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-2">收入趋势图</p>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockChartData.revenue}>
                          <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-2">管线分布饼图</p>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={mockChartData.pipeline}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            dataKey="value"
                          >
                            {mockChartData.pipeline.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Export */}
      {step === 3 && generatedReport && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Report Content */}
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl overflow-hidden">
                {/* Report Header */}
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{generatedReport.title}</h2>
                      <p className="text-slate-400">{generatedReport.company} | {generatedReport.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors" title="编辑">
                        <Edit className="w-5 h-5 text-slate-400" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors" title="复制">
                        <Copy className="w-5 h-5 text-slate-400" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors" title="保存">
                        <Save className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Report Body */}
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm">
                    {generatedReport.content}
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-5">
                <h4 className="font-medium mb-4">导出格式</h4>
                <div className="space-y-3">
                  {[
                    { format: 'Word', icon: FileText, color: 'primary' },
                    { format: 'PDF', icon: FileText, color: 'rose' },
                    { format: 'PPT', icon: FileText, color: 'amber' },
                    { format: 'Excel', icon: BarChart3, color: 'emerald' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.format}
                        onClick={() => handleExport(item.format)}
                        className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                      >
                        <div className={`p-2 rounded-lg bg-${item.color}-500/20`}>
                          <Icon className={`w-5 h-5 text-${item.color}-400`} />
                        </div>
                        <span className="flex-1 text-left font-medium">{item.format}</span>
                        <Download className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="glass rounded-2xl p-5">
                <h4 className="font-medium mb-4">生成图表</h4>
                <div className="space-y-3">
                  {[
                    { label: '收入趋势图', chart: LineChart },
                    { label: '管线分布图', chart: PieChart },
                    { label: '竞争对比图', chart: BarChart },
                  ].map((item) => {
                    return (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors text-sm"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-4 h-4 text-slate-500 ml-auto" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="glass rounded-2xl p-5">
                <h4 className="font-medium mb-4">快捷操作</h4>
                <div className="space-y-2">
                  <button className="w-full py-2 text-sm text-primary-400 hover:text-primary-300 transition-colors text-left">
                    发送到团队审阅
                  </button>
                  <button className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors text-left">
                    生成配套PPT
                  </button>
                  <button className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors text-left">
                    分享报告链接
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors"
            >
              重新编辑
            </button>
            <button
              onClick={() => {
                setStep(1)
                setGeneratedReport(null)
              }}
              className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              生成新报告
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
