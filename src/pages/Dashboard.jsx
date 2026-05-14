import React from 'react'
import { TrendingUp, Users, DollarSign, Activity, Calendar, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const quickStats = [
  { label: '研究覆盖', value: '128', unit: '家公司', change: '+12', trend: 'up', icon: Activity },
  { label: '活跃用户', value: '2,847', unit: '人', change: '+8%', trend: 'up', icon: Users },
  { label: '报告产出', value: '456', unit: '份/月', change: '+23', trend: 'up', icon: FileText },
  { label: 'API调用', value: '156K', unit: '次', change: '-3%', trend: 'down', icon: DollarSign },
]

const mockData = {
  activity: [
    { month: '1月', reports: 120, queries: 340 },
    { month: '2月', reports: 145, queries: 380 },
    { month: '3月', reports: 168, queries: 420 },
    { month: '4月', reports: 185, queries: 460 },
    { month: '5月', reports: 210, queries: 510 },
    { month: '6月', reports: 245, queries: 580 },
  ],
  pipeline: [
    { company: '恒瑞医药', phase3: 12, phase2: 8, phase1: 5 },
    { company: '百济神州', phase3: 8, phase2: 6, phase1: 4 },
    { company: '信达生物', phase3: 6, phase2: 5, phase1: 3 },
    { company: '君实生物', phase3: 4, phase2: 4, phase1: 2 },
    { company: '复星医药', phase3: 10, phase2: 7, phase1: 6 },
  ]
}

const recentActivities = [
  { type: 'report', title: '恒瑞医药深度研究报告已完成', time: '5分钟前', status: 'completed' },
  { type: 'alert', title: 'FDA批准百济神州泽布替尼新适应症', time: '15分钟前', status: 'new' },
  { type: 'data', title: '信达生物2024年财务数据已更新', time: '30分钟前', status: 'updated' },
  { type: 'report', title: 'ADC药物行业专题报告已生成', time: '1小时前', status: 'completed' },
  { type: 'alert', title: '荣昌生物泰安泰III期临床数据积极', time: '2小时前', status: 'new' },
]

const upcomingEvents = [
  { date: '05-15', title: '百济神州Q1财报发布', type: 'earnings' },
  { date: '05-18', title: 'ASCO年会摘要提交截止', type: 'conference' },
  { date: '05-20', title: '信达生物投资者日', type: 'meeting' },
  { date: '05-22', title: '恒瑞医药创新药审评会议', type: 'regulatory' },
]

const hotTopics = [
  { title: 'PD-1/L1竞争格局', count: 234 },
  { title: 'ADC药物研发进展', count: 189 },
  { title: 'GLP-1减肥赛道', count: 156 },
  { title: '细胞疗法最新动态', count: 142 },
  { title: 'AI制药行业趋势', count: 128 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 card-hover animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-xl bg-primary-500/20">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.unit}</p>
                <p className="text-sm text-slate-300 mt-1">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">平台活跃度趋势</h3>
              <p className="text-sm text-slate-400">报告生成 & AI查询量</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                <span className="text-slate-400">报告产出</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-400">AI查询</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.activity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="reports" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                <Line type="monotone" dataKey="queries" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Chart */}
        <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">重点药企管线数量</h3>
            <p className="text-sm text-slate-400">III期、II期、I期临床试验分布</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.pipeline} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="company" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="phase3" stackId="a" fill="#0ea5e9" name="III期" />
                <Bar dataKey="phase2" stackId="a" fill="#10b981" name="II期" />
                <Bar dataKey="phase1" stackId="a" fill="#6366f1" name="I期" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">最近动态</h3>
            <button className="text-sm text-primary-400 hover:text-primary-300">查看全部</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'new' ? 'bg-emerald-400 animate-pulse-slow' : 'bg-slate-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">近期重要事件</h3>
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <div className="text-center min-w-[50px]">
                  <p className="text-lg font-bold text-primary-400">{event.date.split('-')[1]}</p>
                  <p className="text-xs text-slate-400">{event.date.split('-')[0]}月</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-slate-400 mt-1 capitalize">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Topics */}
        <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">热门研究话题</h3>
            <TrendingUp className="w-5 h-5 text-rose-400" />
          </div>
          <div className="space-y-3">
            {hotTopics.map((topic, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  index < 3 ? 'bg-primary-500/20 text-primary-400' : 'bg-slate-700 text-slate-400'
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{topic.title}</p>
                </div>
                <span className="text-sm text-slate-400">{topic.count}次</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <button className="w-full py-2 text-sm text-primary-400 hover:text-primary-300 transition-colors">
              浏览全部话题 →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
