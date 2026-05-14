import React, { useState } from 'react'
import { Bell, Plus, Search, Filter, Calendar, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, Star, Building2, Activity, DollarSign, X, Settings, Trash2 } from 'lucide-react'

const alertCategories = [
  { id: 'earnings', label: '财报发布', icon: DollarSign, color: 'emerald' },
  { id: 'clinical', label: '临床进展', icon: Activity, color: 'primary' },
  { id: 'regulatory', label: '监管动态', icon: CheckCircle, color: 'amber' },
  { id: 'news', label: '新闻舆情', icon: Bell, color: 'rose' },
  { id: 'pipeline', label: '管线更新', icon: TrendingUp, color: 'violet' },
  { id: 'ma', label: '并购融资', icon: Star, color: 'cyan' },
]

const mockAlerts = [
  {
    id: 1,
    type: 'clinical',
    title: '百济神州泽布替尼新适应症获FDA批准',
    company: '百济神州',
    time: '5分钟前',
    impact: 'high',
    content: 'FDA批准泽布替尼用于治疗华氏巨球蛋白血症，这是该药物在美国获批的第三项适应症。',
    read: false,
  },
  {
    id: 2,
    type: 'earnings',
    title: '恒瑞医药发布2024年半年报',
    company: '恒瑞医药',
    time: '1小时前',
    impact: 'medium',
    content: '收入同比增长15%，净利润增长12%，研发投入占比达26%。',
    read: false,
  },
  {
    id: 3,
    type: 'regulatory',
    title: 'CDE公示优先审评品种',
    company: '信达生物',
    time: '2小时前',
    impact: 'high',
    content: '信迪利单抗新适应症进入优先审评通道，预计审评周期缩短至6个月。',
    read: true,
  },
  {
    id: 4,
    type: 'pipeline',
    title: '荣昌生物泰安泰III期临床数据积极',
    company: '荣昌生物',
    time: '3小时前',
    impact: 'high',
    content: 'RC88联合治疗晚期实体瘤的III期临床试验达到主要终点，ORR显著提升。',
    read: false,
  },
  {
    id: 5,
    type: 'ma',
    title: '石药集团完成对和铂医药的战略投资',
    company: '石药集团',
    time: '5小时前',
    impact: 'medium',
    content: '石药集团以5亿元战略投资和铂医药，获得双抗技术平台优先使用权。',
    read: true,
  },
  {
    id: 6,
    type: 'news',
    title: 'GLP-1药物市场持续火热',
    company: '行业',
    time: '6小时前',
    impact: 'low',
    content: '诺和诺德、礼来、司美格鲁肽等GLP-1药物供不应求，国内企业加速布局。',
    read: true,
  },
]

const mockWatchlist = [
  { company: '恒瑞医药', code: '600276', price: 52.35, change: 2.5, watch: true, tags: ['肿瘤', '创新药'] },
  { company: '百济神州', code: '688235', price: 128.50, change: -1.2, watch: true, tags: ['肿瘤', '国际化'] },
  { company: '信达生物', code: '1801.HK', price: 42.80, change: 3.8, watch: true, tags: ['肿瘤', 'PD-1'] },
  { company: '君实生物', code: '688180', price: 35.20, change: 0.5, watch: true, tags: ['肿瘤', '特瑞普利'] },
  { company: '荣昌生物', code: '688331', price: 68.90, change: 5.2, watch: false, tags: ['ADC', '泰安泰'] },
  { company: '石药集团', code: '1093.HK', price: 8.50, change: -0.3, watch: false, tags: ['综合', '创新药'] },
]

const mockCalendar = [
  { date: '05-15', title: '百济神州Q1财报电话会', type: 'earnings' },
  { date: '05-18', title: 'ASCO摘要提交截止', type: 'conference' },
  { date: '05-20', title: '信达生物投资者日', type: 'meeting' },
  { date: '05-22', title: 'CDE审评会议', type: 'regulatory' },
  { date: '05-25', title: '恒瑞医药股东大会', type: 'meeting' },
]

export default function MonitoringCenter() {
  const [activeTab, setActiveTab] = useState('alerts')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [alerts, setAlerts] = useState(mockAlerts)

  const filteredAlerts = mockAlerts.filter(alert => {
    if (selectedCategory && alert.type !== selectedCategory) return false
    if (searchQuery && !alert.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const unreadCount = alerts.filter(a => !a.read).length

  const markAsRead = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a))
  }

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id))
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-rose-500'
      case 'medium': return 'bg-amber-500'
      case 'low': return 'bg-emerald-500'
      default: return 'bg-slate-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/20">
              <AlertCircle className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unreadCount}</p>
              <p className="text-xs text-slate-400">未读提醒</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-slate-400">今日已处理</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-500/20">
              <Bell className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-xs text-slate-400">关注公司</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-slate-400">待处理事件</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Navigation */}
        <div className="lg:col-span-1 space-y-4">
          {/* Tabs */}
          <div className="glass rounded-2xl p-2">
            <div className="flex flex-col gap-1">
              {[
                { id: 'alerts', label: '提醒中心', icon: Bell, count: unreadCount },
                { id: 'watchlist', label: '自选股', icon: Star, count: 23 },
                { id: 'calendar', label: '事件日历', icon: Calendar, count: 5 },
              ].map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'text-slate-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left font-medium">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.id ? 'bg-primary-500 text-white' : 'bg-slate-700'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Categories */}
          {activeTab === 'alerts' && (
            <div className="glass rounded-2xl p-4">
              <h4 className="font-medium mb-3">提醒分类</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                  <span className="text-sm">全部</span>
                </button>
                {alertCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.id ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full bg-${cat.color}-500`}></span>
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Add */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 text-primary-400 hover:bg-primary-500/10 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">添加监控</span>
          </button>
        </div>

        {/* Center Panel - Main Content */}
        <div className="lg:col-span-3">
          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="glass rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-slate-700/50 flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索提醒..."
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
                <button className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <Filter className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Alert List */}
              <div className="divide-y divide-slate-700/50">
                {filteredAlerts.map(alert => {
                  const category = alertCategories.find(c => c.id === alert.type)
                  return (
                    <div
                      key={alert.id}
                      className={`p-4 hover:bg-slate-800/30 transition-colors ${!alert.read ? 'bg-slate-800/20' : ''}`}
                      onClick={() => markAsRead(alert.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-2 h-2 rounded-full mt-2 ${!alert.read ? getImpactColor(alert.impact) : 'bg-slate-600'}`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded text-xs bg-${category?.color}-500/20 text-${category?.color}-400`}>
                                  {category?.label}
                                </span>
                                <span className="text-sm font-medium">{alert.company}</span>
                              </div>
                              <h4 className="font-medium mb-1">{alert.title}</h4>
                              <p className="text-sm text-slate-400 line-clamp-2">{alert.content}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs text-slate-500">{alert.time}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteAlert(alert.id); }}
                                className="p-1 rounded hover:bg-slate-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-slate-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Watchlist Tab */}
          {activeTab === 'watchlist' && (
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                <h3 className="font-semibold">自选股监控</h3>
                <button className="px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-sm font-medium transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  添加股票
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left p-4 text-sm font-medium text-slate-400">股票</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-400">最新价</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-400">涨跌幅</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-400">标签</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockWatchlist.map((stock, index) => (
                      <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-primary-400" />
                            </div>
                            <div>
                              <p className="font-medium">{stock.company}</p>
                              <p className="text-xs text-slate-500">{stock.code}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-4 font-mono">¥{stock.price.toFixed(2)}</td>
                        <td className={`text-right p-4 font-medium ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          <div className="flex items-center justify-end gap-1">
                            {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {stock.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 rounded-lg bg-slate-700/50 text-xs text-slate-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="text-right p-4">
                          <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                            <Settings className="w-4 h-4 text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">重要事件日历</h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800/50 text-sm">上一月</button>
                  <span className="px-4 py-1.5 font-medium">2024年5月</span>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800/50 text-sm">下一月</button>
                </div>
              </div>
              <div className="space-y-3">
                {mockCalendar.map((event, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                    <div className="text-center min-w-[50px]">
                      <p className="text-lg font-bold text-primary-400">{event.date.split('-')[1]}</p>
                      <p className="text-xs text-slate-400">{event.date.split('-')[0]}月</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-slate-400 capitalize">{event.type}</p>
                    </div>
                    <button className="px-3 py-1 rounded-lg bg-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/30 transition-colors">
                      设置提醒
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAddModal(false)}></div>
          <div className="relative glass-strong rounded-2xl p-6 w-full max-w-md animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">添加监控</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">公司/关键词</label>
                <input
                  type="text"
                  placeholder="例如：恒瑞医药"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">监控类型</label>
                <div className="grid grid-cols-2 gap-2">
                  {alertCategories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600" />
                      <span className="text-sm">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">提醒方式</label>
                <div className="flex gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-primary-500/20 border border-primary-500/30 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">站内通知</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">邮件通知</span>
                  </label>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors">
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
