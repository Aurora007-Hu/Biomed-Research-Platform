import React, { useState } from 'react'
import { Database, Copy, Check, Code, FileSpreadsheet, Download, Key, Globe, Zap, BarChart3, Activity, Clock, ExternalLink, Play, ChevronDown, ChevronRight, Terminal } from 'lucide-react'

const apiEndpoints = [
  {
    category: '公司数据',
    endpoints: [
      { method: 'GET', path: '/api/v1/company/profile', desc: '获取公司基本信息', params: ['company_code'], example: '?company_code=600276' },
      { method: 'GET', path: '/api/v1/company/financials', desc: '获取财务数据', params: ['company_code', 'period'], example: '?company_code=600276&period=2024Q1' },
      { method: 'GET', path: '/api/v1/company/management', desc: '获取管理层信息', params: ['company_code'], example: '?company_code=600276' },
    ]
  },
  {
    category: '管线数据',
    endpoints: [
      { method: 'GET', path: '/api/v1/pipeline/list', desc: '获取公司管线列表', params: ['company_code'], example: '?company_code=600276' },
      { method: 'GET', path: '/api/v1/pipeline/detail', desc: '获取管线详细信息', params: ['drug_id'], example: '?drug_id=D001' },
      { method: 'GET', path: '/api/v1/pipeline/comparison', desc: '管线对比分析', params: ['company_codes'], example: '?company_codes=600276,688235' },
    ]
  },
  {
    category: '临床数据',
    endpoints: [
      { method: 'GET', path: '/api/v1/clinical/trials', desc: '获取临床试验列表', params: ['drug_name'], example: '?drug_name=卡瑞利珠' },
      { method: 'GET', path: '/api/v1/clinical/results', desc: '获取临床结果数据', params: ['trial_id'], example: '?trial_id=NCT123456' },
    ]
  },
  {
    category: '估值数据',
    endpoints: [
      { method: 'GET', path: '/api/v1/valuation/peers', desc: '可比公司分析', params: ['company_code'], example: '?company_code=600276' },
      { method: 'GET', path: '/api/v1/valuation/dcf', desc: 'DCF估值计算', params: ['company_code', 'params'], example: '?company_code=600276' },
    ]
  },
]

const sampleCode = {
  python: `import requests

api_key = "your_api_key_here"
headers = {"Authorization": f"Bearer {api_key}"}

# 获取公司基本信息
response = requests.get(
    "https://api.biomed-research.com/v1/company/profile",
    params={"company_code": "600276"},
    headers=headers
)

data = response.json()
print(data)`,

  javascript: `const axios = require('axios');

const apiKey = 'your_api_key_here';

// 获取公司基本信息
axios.get('https://api.biomed-research.com/v1/company/profile', {
    params: { company_code: '600276' },
    headers: { 'Authorization': \`Bearer \${apiKey}\` }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));`,

  curl: `curl -X GET "https://api.biomed-research.com/v1/company/profile?company_code=600276" \\
    -H "Authorization: Bearer your_api_key_here" \\
    -H "Content-Type: application/json"`,
}

const usageStats = [
  { label: '本月API调用', value: '45,234', change: '+12%', limit: '100,000' },
  { label: '平均响应时间', value: '120ms', change: '-8%', limit: '200ms' },
  { label: '可用率', value: '99.9%', change: '稳定', limit: '99.5%' },
]

const dataExportFormats = [
  { format: 'Excel (.xlsx)', icon: FileSpreadsheet, size: '~2.5MB', rows: '10,000' },
  { format: 'CSV (.csv)', icon: Database, size: '~500KB', rows: '50,000' },
  { format: 'JSON (.json)', icon: Code, size: '~1.2MB', rows: '20,000' },
  { format: 'PDF (.pdf)', icon: FileSpreadsheet, size: '~3MB', rows: 'Report' },
]

export default function DataAPI() {
  const [activeTab, setActiveTab] = useState('api')
  const [expandedCategory, setExpandedCategory] = useState('公司数据')
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0].endpoints[0])
  const [codeLanguage, setCodeLanguage] = useState('python')
  const [copied, setCopied] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const apiKey = 'sk_live_bmrd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500/20 text-emerald-400'
      case 'POST': return 'bg-primary-500/20 text-primary-400'
      case 'PUT': return 'bg-amber-500/20 text-amber-400'
      case 'DELETE': return 'bg-rose-500/20 text-rose-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* API Key Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">API访问凭证</h3>
            <p className="text-sm text-slate-400">使用API Key访问数据接口，请在安全环境中保管您的密钥</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors">
            生成新密钥
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-3">
            <Key className="w-5 h-5 text-slate-400" />
            <code className="flex-1 font-mono text-sm">
              {showApiKey ? apiKey : 'sk_live_' + '*'.repeat(40)}
            </code>
          </div>
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
          >
            {showApiKey ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <button
            onClick={() => handleCopy(apiKey)}
            className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {usageStats.map((stat, index) => (
          <div key={index} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{stat.label}</span>
              <span className={`text-xs px-2 py-1 rounded-lg ${
                stat.change.includes('+') ? 'bg-emerald-500/20 text-emerald-400' :
                stat.change.includes('-') ? 'bg-rose-500/20 text-rose-400' :
                'bg-slate-700 text-slate-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-slate-500">/ {stat.limit}</span>
            </div>
            <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Endpoints */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-700/50">
            <h3 className="font-semibold">API端点文档</h3>
          </div>
          <div className="divide-y divide-slate-700/50 max-h-[500px] overflow-y-auto">
            {apiEndpoints.map((category) => (
              <div key={category.category}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors"
                >
                  <span className="font-medium">{category.category}</span>
                  {expandedCategory === category.category ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedCategory === category.category && (
                  <div className="bg-slate-800/30">
                    {category.endpoints.map((endpoint) => (
                      <button
                        key={endpoint.path}
                        onClick={() => setSelectedEndpoint(endpoint)}
                        className={`w-full text-left p-4 pl-8 hover:bg-slate-800/50 transition-colors ${
                          selectedEndpoint?.path === endpoint.path ? 'bg-primary-500/10 border-l-2 border-primary-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm font-mono">{endpoint.path}</code>
                        </div>
                        <p className="text-sm text-slate-400">{endpoint.desc}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* API Details */}
        <div className="space-y-4">
          {/* Endpoint Detail */}
          {selectedEndpoint && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2 py-1 rounded text-sm font-medium ${getMethodColor(selectedEndpoint.method)}`}>
                  {selectedEndpoint.method}
                </span>
                <code className="text-lg font-mono">{selectedEndpoint.path}</code>
              </div>
              <p className="text-slate-400 mb-4">{selectedEndpoint.desc}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">请求参数</h4>
                  <div className="space-y-2">
                    {selectedEndpoint.params.map((param) => (
                      <div key={param} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                        <code className="text-primary-400">{param}</code>
                        <span className="text-slate-500">-</span>
                        <span className="text-sm text-slate-400">string</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-400 ml-auto">必填</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">示例请求</h4>
                  <div className="p-4 rounded-xl bg-slate-900/80 font-mono text-sm overflow-x-auto">
                    <code className="text-emerald-400">
                      https://api.biomed-research.com{selectedEndpoint.path}{selectedEndpoint.example}
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">响应示例</h4>
                  <div className="p-4 rounded-xl bg-slate-900/80 font-mono text-sm overflow-x-auto">
                    <pre className="text-slate-300">{`{
  "code": 200,
  "data": {
    "company_code": "600276",
    "company_name": "恒瑞医药",
    "industry": "创新药",
    "market_cap": 320000000000,
    "employees": 20000
  }
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-700/50">
                <button className="flex-1 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  发送请求
                </button>
                <button className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  API文档
                </button>
              </div>
            </div>
          )}

          {/* Quick Code */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-slate-400" />
                <span className="font-medium">快速集成代码</span>
              </div>
              <div className="flex gap-1">
                {['python', 'javascript', 'curl'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCodeLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      codeLanguage === lang ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-slate-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <pre className="p-4 text-sm font-mono overflow-x-auto max-h-64">
                <code className="text-slate-300 whitespace-pre">{sampleCode[codeLanguage]}</code>
              </pre>
              <button
                onClick={() => handleCopy(sampleCode[codeLanguage])}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Export Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">数据导出功能</h3>
            <p className="text-sm text-slate-400">支持多种格式导出，满足不同分析场景需求</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-sm font-medium transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            批量导出
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dataExportFormats.map((format, index) => {
            const Icon = format.icon
            return (
              <button
                key={index}
                className="glass rounded-2xl p-5 text-left card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary-500/20 group-hover:bg-primary-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <Download className="w-5 h-5 text-slate-500 group-hover:text-primary-400 transition-colors" />
                </div>
                <h4 className="font-medium mb-1">{format.format}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{format.size}</span>
                  <span>•</span>
                  <span>~{format.rows}行</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Excel Plugin */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20">
            <FileSpreadsheet className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Excel数据插件</h3>
            <p className="text-sm text-slate-400 mb-3">
              在Excel中直接调用平台数据，一键刷新，告别手动复制粘贴
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-4 h-4" /> 支持Excel 2016+
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-4 h-4" /> 实时数据同步
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-4 h-4" /> 自定义刷新频率
              </span>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            下载插件
          </button>
        </div>
      </div>
    </div>
  )
}

function Eye(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
