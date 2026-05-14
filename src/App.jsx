import React, { useState } from 'react'
import { Brain, FileText, Bell, Database, Home, Menu, X } from 'lucide-react'
import AIKnowledgeBase from './pages/AIKnowledgeBase'
import ReportGenerator from './pages/ReportGenerator'
import MonitoringCenter from './pages/MonitoringCenter'
import DataAPI from './pages/DataAPI'
import Dashboard from './pages/Dashboard'

const navItems = [
  { id: 'dashboard', label: '首页概览', icon: Home },
  { id: 'ai-knowledge', label: 'AI知识库', icon: Brain },
  { id: 'report', label: '自动化报告', icon: FileText },
  { id: 'monitoring', label: '行业监控', icon: Bell },
  { id: 'data-api', label: '数据API', icon: Database },
]

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderPage = () => {
    switch (activePage) {
      case 'ai-knowledge':
        return <AIKnowledgeBase />
      case 'report':
        return <ReportGenerator />
      case 'monitoring':
        return <MonitoringCenter />
      case 'data-api':
        return <DataAPI />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 glass-strong z-50 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg">BioMed Research</h1>
              <p className="text-xs text-slate-400">生物医药研究平台</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activePage === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-primary-400"></span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              HLX
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">胡玲溪</p>
              <p className="text-xs text-slate-400">分析师</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg glass"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="absolute left-0 top-0 h-full w-72 glass-strong animate-slideIn">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="font-bold text-lg">BioMed Research</h1>
                  <p className="text-xs text-slate-400">生物医药研究平台</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activePage === item.id
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActivePage(item.id)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                            : 'text-slate-400 hover:bg-slate-700/50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 glass border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {navItems.find(item => item.id === activePage)?.label || '首页概览'}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {activePage === 'dashboard' && '欢迎回来，今天的研究任务已准备就绪'}
                {activePage === 'ai-knowledge' && '智能问答，随时解答您的专业疑问'}
                {activePage === 'report' && '一键生成专业研究报告'}
                {activePage === 'monitoring' && '实时监控行业动态，不再错过任何重要信息'}
                {activePage === 'data-api' && '灵活的数据接口，满足自定义分析需求'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors">
                联系我们
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6 animate-fadeIn">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default App
