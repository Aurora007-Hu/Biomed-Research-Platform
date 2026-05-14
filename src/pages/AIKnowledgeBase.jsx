import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, BookOpen, Search, Sparkles, Copy, ThumbsUp, ThumbsDown, ChevronRight, Clock, Zap } from 'lucide-react'

const sampleTerms = [
  { term: 'ORR', fullName: 'Objective Response Rate', description: '客观缓解率，指肿瘤缩小达到预定标准的患者比例' },
  { term: 'mPFS', fullName: 'median Progression-Free Survival', description: '中位无进展生存期，从治疗开始到肿瘤进展的时间' },
  { term: 'ADC', fullName: 'Antibody-Drug Conjugate', description: '抗体药物偶联物，通过连接子将抗体与细胞毒药物连接' },
  { term: 'PD-1', fullName: 'Programmed Death-1', description: '程序性死亡受体1，免疫检查点抑制剂靶点' },
  { term: 'rNPV', fullName: 'risk-adjusted NPV', description: '风险调整后净现值，考虑研发成功率的估值方法' },
  { term: 'OS', fullName: 'Overall Survival', description: '总生存期，从治疗开始到死亡的时间' },
]

const hotQuestions = [
  'PD-1/L1抑制剂的竞争格局分析',
  'ADC药物的技术路线对比',
  'GLP-1减肥药市场空间测算',
  '细胞疗法最新进展与挑战',
  '创新药出海策略分析',
]

const chatHistory = [
  {
    role: 'assistant',
    content: '您好！我是BioMed AI助手，专注于生物医药行业研究。\n\n我可以帮您：\n• 解释医药专业术语\n• 分析药物竞争格局\n• 解读政策法规影响\n• 回答行业研究问题\n\n请问有什么可以帮您？',
    timestamp: new Date()
  }
]

export default function AIKnowledgeBase() {
  const [messages, setMessages] = useState(chatHistory)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = { role: 'user', content: inputValue, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question) => {
    if (question.includes('PD-1') || question.includes('竞争')) {
      return `## PD-1/L1抑制剂竞争格局分析\n\n### 市场概况\n截至2024年，全球已获批上市的PD-1/L1药物超过10款，国内市场呈现\"4+4\"格局（4款进口+4款国产）。\n\n### 核心玩家\n| 企业 | 代表药物 | 市场份额 |\n|------|---------|---------|\n| 默沙东 | Keytruda | 约40% |\n| 百时美施贵宝 | Opdivo | 约20% |\n| 信达生物 | 信迪利单抗 | 约12% |\n| 恒瑞医药 | 卡瑞利珠单抗 | 约15% |\n\n### 发展趋势\n1. **适应症拓展**：从肿瘤到自身免疫病\n2. **联合用药**：与化疗、抗血管生成药联用\n3. **双抗技术**：PD-1/CTLA-4双抗（康方生物卡度尼利）\n\n### 投资建议\n建议关注：差异化适应症布局、国际化进展、成本控制能力\n\n*数据来源：公司公告、药物临床试验登记平台*`
    }
    if (question.includes('ADC')) {
      return `## ADC药物技术路线对比\n\n### ADC结构组成\nADC = 抗体(Antibody) + 连接子(Linker) + 细胞毒药物(Payload)\n\n### 主流技术平台\n| 技术要素 | 第一代 | 第二代 | 第三代 |\n|---------|-------|-------|-------|\n| 抗体 | 鼠源/嵌合 | 人源化 | 全人源 |\n| 细胞毒药物 | MMAE | MMAE/DM1 | DXd/TDxd |\n| 连接子 | 可裂解 | 酶敏感 | 定点偶联 |\n\n### 明星药物\n• **DS-8201**(Enhertu)：HER2 ADC，疗效显著优于T-DM1\n• **戈沙妥珠单抗**：TROP2 ADC，三阴性乳腺癌\n• **维泊妥珠单抗**：CD79b ADC，DLBCL\n\n### 国内布局\n荣昌生物(纬迪西妥单抗)、科伦博泰、恒瑞医药等多家企业布局`
    }
    return `根据您的问题，我来为您分析：\n\n**关键发现**\n1. 市场规模持续增长，年复合增长率约15%\n2. 技术迭代加速，创新靶点不断涌现\n3. 政策支持创新药发展，审评审批提速\n\n**风险提示**\n• 研发失败风险\n• 竞争加剧导致价格压力\n• 政策变化不确定性\n\n如果您需要更详细的分析，请提供更具体的公司或药物名称。`
  }

  const handleTermClick = (term) => {
    setSelectedTerm(term)
  }

  const handleQuickQuestion = (question) => {
    setInputValue(question)
  }

  return (
    <div className="h-[calc(100vh-180px)] flex gap-6">
      {/* Left Panel - 术语库 */}
      <div className="w-80 flex-shrink-0 flex flex-col gap-4">
        {/* 热门术语 */}
        <div className="glass rounded-2xl p-5 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary-400" />
            <h3 className="font-semibold">核心术语速查</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {sampleTerms.map((item) => (
              <button
                key={item.term}
                onClick={() => handleTermClick(item)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedTerm?.term === item.term
                    ? 'bg-primary-500/20 border border-primary-500/30'
                    : 'bg-slate-800/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary-400">{item.term}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-xs text-slate-400 mt-1 truncate">{item.fullName}</p>
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <button className="w-full py-2 text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              搜索更多术语
            </button>
          </div>
        </div>

        {/* 快捷问题 */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold">热门问题</h3>
          </div>
          <div className="space-y-2">
            {hotQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(q)}
                className="w-full text-left p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors text-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Panel - AI对话 */}
      <div className="flex-1 flex flex-col glass rounded-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary-500/20">
            <Bot className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold">AI知识库助手</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              在线
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Sparkles className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-primary-500 text-white rounded-tr-sm'
                    : 'bg-slate-800/80 rounded-tl-sm'
                }`}>
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1 ml-2">
                      <button className="p-1 hover:bg-slate-800 rounded transition-colors">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-slate-800 rounded transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-slate-800 rounded transition-colors">
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="输入您的问题，如：PD-1抑制剂的竞争格局如何？"
              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors placeholder-slate-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-5 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              发送
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            AI助手可帮助理解专业术语、分析竞争格局，但最终投资决策请咨询专业人士
          </p>
        </div>
      </div>

      {/* Right Panel - 术语详情 */}
      <div className="w-80 flex-shrink-0">
        <div className="glass rounded-2xl p-5 h-full overflow-y-auto">
          {selectedTerm ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                  {selectedTerm.term}
                </div>
                <h3 className="font-semibold text-lg">{selectedTerm.fullName}</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/50">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">术语解释</h4>
                  <p className="text-sm">{selectedTerm.description}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">相关知识点</h4>
                  <div className="flex flex-wrap gap-2">
                    {['临床试验', '疗效评估', '监管要求'].map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-primary-500/20 text-primary-400 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">相关术语</h4>
                  <div className="space-y-2">
                    {sampleTerms.filter(t => t.term !== selectedTerm.term).slice(0, 3).map(term => (
                      <button
                        key={term.term}
                        onClick={() => handleTermClick(term)}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-700 transition-colors text-sm"
                      >
                        <span className="text-primary-400 font-medium">{term.term}</span>
                        <span className="text-slate-400 ml-2">{term.fullName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <BookOpen className="w-16 h-16 text-slate-600 mb-4" />
              <h3 className="font-semibold mb-2">选择术语查看详情</h3>
              <p className="text-sm text-slate-500">
                点击左侧术语卡片，查看详细解释和相关知识点
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
