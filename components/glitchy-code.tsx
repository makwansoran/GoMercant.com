"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const codeSnippets = [
  `function secureSystem() {
  const threat = detectThreat();
  if (threat) {
    neutralize(threat);
  }
  return "System Secure";
}`,
  `async function analyzeData() {
  const insights = await AI.analyze(data);
  return insights.map(i => i.actionable);
}`,
  `class SecurityPlatform {
  constructor() {
    this.monitoring = true;
    this.aiEnabled = true;
  }
  
  protect() {
    return this.defend();
  }
}`,
  `const intelligence = {
  realTime: true,
  aiPowered: true,
  analyze: (data) => {
    return transform(data);
  }
};`,
  `function automate() {
  const workflow = createWorkflow();
  workflow.execute();
  return optimize(workflow);
}`,
]

const keywords = ['function', 'const', 'async', 'await', 'class', 'return', 'if', 'else', 'true', 'false', 'null', 'undefined']
const operators = ['=>', '=', '===', '!==', '&&', '||', '?', ':', '...']
const strings = ['"', "'", '`']

export function GlitchyCode() {
  const [currentCode, setCurrentCode] = useState(codeSnippets[0])
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 150)
      }
    }, 2000)

    // Change code snippet every 5 seconds
    const codeInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * codeSnippets.length)
      setCurrentCode(codeSnippets[randomIndex])
      setGlitch(true)
      setTimeout(() => setGlitch(false), 300)
    }, 5000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(codeInterval)
    }
  }, [])

  const renderCode = (code: string) => {
    const lines = code.split('\n')
    return lines.map((line, lineIndex) => {
      let lastIndex = 0
      const parts: Array<{ text: string; type: string }> = []

      // Simple tokenizer
      const tokenize = (text: string) => {
        const tokens: Array<{ text: string; type: string }> = []
        let i = 0

        while (i < text.length) {
          // Check for operators
          let matched = false
          for (const op of operators) {
            if (text.substring(i, i + op.length) === op) {
              tokens.push({ text: op, type: 'operator' })
              i += op.length
              matched = true
              break
            }
          }
          if (matched) continue

          // Check for strings
          for (const quote of strings) {
            if (text[i] === quote) {
              const endQuote = text.indexOf(quote, i + 1)
              if (endQuote !== -1) {
                tokens.push({ text: text.substring(i, endQuote + 1), type: 'string' })
                i = endQuote + 1
                matched = true
                break
              }
            }
          }
          if (matched) continue

          // Check for keywords
          let keywordMatched = false
          for (const keyword of keywords) {
            const regex = new RegExp(`^${keyword}\\b`)
            if (regex.test(text.substring(i))) {
              tokens.push({ text: keyword, type: 'keyword' })
              i += keyword.length
              keywordMatched = true
              break
            }
          }
          if (keywordMatched) continue

          // Check for function names (word followed by parenthesis)
          const funcMatch = text.substring(i).match(/^(\w+)\s*\(/)
          if (funcMatch) {
            tokens.push({ text: funcMatch[1], type: 'function' })
            i += funcMatch[1].length
            continue
          }

          // Regular text
          if (text[i] === ' ') {
            tokens.push({ text: ' ', type: 'text' })
            i++
          } else {
            const wordMatch = text.substring(i).match(/^(\S+)/)
            if (wordMatch) {
              tokens.push({ text: wordMatch[1], type: 'text' })
              i += wordMatch[1].length
            } else {
              tokens.push({ text: text[i], type: 'text' })
              i++
            }
          }
        }

        return tokens
      }

      const tokens = tokenize(line)

      return (
        <div key={lineIndex} className="flex items-start">
          <span className="text-neutral-400 text-sm mr-4 select-none">{lineIndex + 1}</span>
          <span className="flex-1 font-mono text-sm">
            {tokens.map((token, tokenIndex) => {
              let className = 'text-neutral-700'
              if (token.type === 'keyword') className = 'text-orange-500'
              else if (token.type === 'function') className = 'text-blue-600'
              else if (token.type === 'string') className = 'text-green-600'
              else if (token.type === 'operator') className = 'text-purple-500'

              return (
                <span
                  key={tokenIndex}
                  className={className}
                  style={{
                    textShadow: glitch && Math.random() > 0.8 
                      ? '2px 0 0 rgba(255,0,0,0.5), -2px 0 0 rgba(0,255,255,0.5)' 
                      : 'none',
                    transform: glitch && Math.random() > 0.9 
                      ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` 
                      : 'translate(0, 0)',
                    transition: 'all 0.05s',
                  }}
                >
                  {token.text}
                </span>
              )
            })}
          </span>
        </div>
      )
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="relative bg-neutral-900 rounded-xl p-6 shadow-2xl border border-neutral-800 overflow-hidden max-w-2xl w-full">
        {/* Glitch overlay effects */}
        {glitch && (
          <>
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.1) 50%, transparent 100%)',
                animation: 'glitch-scan 0.15s',
                mixBlendMode: 'screen',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.1) 50%, transparent 100%)',
                animation: 'glitch-scan 0.15s 0.05s',
                mixBlendMode: 'screen',
              }}
            />
          </>
        )}

        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-neutral-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-neutral-500 text-xs ml-4 font-mono">code.ts</span>
        </div>

        {/* Code content */}
        <div className="relative">
          <motion.div
            key={currentCode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            {renderCode(currentCode)}
          </motion.div>
        </div>

        {/* Animated cursor */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1">
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="w-2 h-5 bg-orange-500"
          />
          <span className="text-orange-500 text-xs font-mono">SPECTR</span>
        </div>
      </div>

    </motion.div>
  )
}
