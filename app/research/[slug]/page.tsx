"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"

const researchReports: Record<string, {
  title: string
  category: string
  image: string
  sections: { heading?: string; content: string }[]
}> = {
  "automated-adversaries": {
    title: "Automated Adversaries: The 2026 AI-Powered Threat Landscape",
    category: "Research Report",
    image: "/images/card1.jpg",
    sections: [
      {
        heading: "Abstract",
        content: "In 2026, the cyber-threat landscape has undergone a regime shift from human-speed operations to Autonomous Adversarial Frameworks (AAFs). This report analyzes the convergence of Large Language Models (LLMs), Reinforcement Learning (RL), and Automated Vulnerability Research (AVR). We posit that the primary risk to modern enterprises is no longer the \"lone hacker,\" but rather Self-Optimizing Attack Pipelines (SOAPs) that reduce the \"time-to-exploit\" from months to milliseconds."
      },
      {
        heading: "1. The Cognitive Shift: Hyper-Personalization at Scale",
        content: "The most visible evolution in 2026 is the industrialization of Socio-Technical Engineering. Traditional phishing relied on static templates; current adversaries utilize Context-Aware Generative Agents (CAGAs).\n\n**Semantic Mimicry:** Agents scrape an organization's \"digital exhaust\"—public GitHub commits, Slack-style communication patterns, and LinkedIn metadata—to generate perfect synthetic identities.\n\n**The Zero-Trust Human:** By leveraging real-time voice and video cloning (Deepfakes), attackers bypass traditional multi-factor authentication (MFA) via \"vishing\" calls that are indistinguishable from C-suite executives, forcing a transition toward Identity-Centric Cryptographic Verification rather than behavioral trust."
      },
      {
        heading: "2. Automated Vulnerability Research (AVR) & Zero-Day Proliferation",
        content: "The 2026 landscape is defined by the democratization of Exploit Synthesis.\n\n**LLM-Augmented Fuzzing:** Adversaries now use fine-tuned transformer models to predict buffer overflows and memory corruption vulnerabilities in proprietary binaries without source code access.\n\n**Polymorphic Payload Generation:** Once a vulnerability is identified, RL-agents generate thousands of unique payload variants. These variants are tested against \"local\" copies of common EDR (Endpoint Detection and Response) systems, ensuring that only undetectable mutations are deployed in the wild."
      },
      {
        heading: "3. Infrastructure-as-a-Code (IaC) and Cloud-Native Exploitation",
        content: "As Oslo-based SMBs move toward serverless and containerized environments, the attack surface has shifted to the Control Plane.\n\n**Misconfiguration Discovery:** Automated agents continuously scan cloud-native environments (Kubernetes/AWS/Azure) for logic flaws in IAM (Identity and Access Management) policies.\n\n**Shadow AI Connectors:** A critical 2026 vulnerability involves \"AI-to-AI\" communication. Attackers exploit insecure API connectors between internal AI agents and external LLMs, leading to Prompt Injection attacks that can exfiltrate sensitive datasets through authorized channels."
      },
      {
        heading: "4. Synthesis: The Defensibility Gap",
        content: "The \"Defensibility Gap\" is widening. While human defenders require \"rest and validation,\" automated adversaries operate with 24/7 persistence and non-linear scaling. For the Oslo SMB sector, the risk is not just data theft, but Algorithmic Sabotage, where subtle data poisoning renders business-critical AI models useless or biased."
      },
      {
        heading: "Conclusion",
        content: "To mitigate these autonomous threats, organizations must move beyond \"Signature-Based\" defense. The only viable countermeasure in 2026 is Autonomous Defense Orchestration, where AI-defenders are empowered to isolate compromised network segments and rotate cryptographic keys at the same velocity as the attacking agent."
      }
    ],
  },
  "autonomous-shield": {
    title: "The Autonomous Shield: Security Automation for Modern Enterprises",
    category: "Research Report",
    image: "/images/card2.jpg",
    sections: [],
  },
  "predictive-intelligence": {
    title: "Predictive Intelligence: AI-Driven OSINT and Proactive Defense",
    category: "Research Report",
    image: "/images/card3.jpg",
    sections: [],
  },
  "shadow-ai": {
    title: "Shadow AI: Securing the Automated Intelligence Loop",
    category: "Research Report",
    image: "/images/card4.jpg",
    sections: [],
  },
}

export default function ResearchPage() {
  const params = useParams()
  const slug = params.slug as string
  const report = researchReports[slug]

  if (!report) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Report Not Found</h1>
          <Link href="/" className="text-orange-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section with Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <Image
          src={report.image}
          alt={report.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-6 left-6 z-20"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </motion.div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-5xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-500 mb-4"
            >
              {report.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {report.title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-16 md:py-24"
      >
        {report.sections && report.sections.length > 0 ? (
          <div className="space-y-12">
            {report.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="prose prose-lg prose-neutral max-w-none"
              >
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 pb-4 border-b border-neutral-200">
                    {section.heading}
                  </h2>
                )}
                <div className="text-neutral-600 leading-relaxed text-lg">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-6">
                      {paragraph.split('**').map((part, partIndex) => 
                        partIndex % 2 === 1 ? (
                          <strong key={partIndex} className="text-black font-semibold">{part}</strong>
                        ) : (
                          <span key={partIndex}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-16 pt-12 border-t border-neutral-200"
            >
              <div className="bg-neutral-50 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Want to learn more?
                </h3>
                <p className="text-neutral-500 text-lg mb-8 max-w-2xl mx-auto">
                  Contact our team to discuss how GoMercant can help protect your organization against these evolving threats.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-neutral-400 mb-8">
              Research report content coming soon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              Return to Home
            </Link>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt="GoMercant Logo" 
              width={32} 
              height={32}
              className="object-contain brightness-0 invert"
            />
            <span className="text-xl font-bold">GoMercant</span>
          </div>
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} GoMercant. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
