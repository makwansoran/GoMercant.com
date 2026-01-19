"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
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
    sections: [
      {
        heading: "Abstract",
        content: "As of 2026, the global cybersecurity workforce deficit has reached a critical inflection point, with human-centric Security Operations Centers (SOCs) proving insufficient against the velocity of machine-speed threats. This report examines the transition from traditional Security Orchestration, Automation, and Response (SOAR)—which relies on static, human-defined playbooks—to Agentic AI SOC Platforms. We analyze how autonomous reasoning and \"hyper-automation\" enable lean security teams to achieve a sub-minute Mean Time to Respond (MTTR), effectively neutralizing the talent gap through algorithmic scaling."
      },
      {
        heading: "1. The Architectural Evolution: From Playbooks to Agents",
        content: "The defining shift in 2026 is the obsolescence of the \"static playbook.\" Traditional SOAR required security engineers to manually map out every logical branch of an investigation.\n\n**The Playbook Maintenance Tax:** High-growth SMBs previously spent up to 30% of their security budget simply maintaining and updating brittle automation scripts that broke whenever a vendor updated an API.\n\n**Agentic Reasoning Models:** Modern platforms (e.g., Prophet Security, Tines, and Torq) now utilize Large Action Models (LAMs). These agents do not follow a fixed path; instead, they are given an objective (e.g., \"Investigate this lateral movement alert\") and autonomously determine which telemetry sources (EDR, CloudTrail, Okta logs) to query. This allows for Zero-Shot Task Execution, where the system handles novel threats without prior configuration."
      },
      {
        heading: "2. Solving the Talent Scarcity via \"Forensic Augmentation\"",
        content: "The \"Cyber Talent Gap\" is often a \"Data Synthesis Gap.\" Human analysts spend 70% of their time on low-level data normalization rather than high-level strategic defense.\n\n**Automated Contextual Enrichment:** Automation engines in 2026 perform real-time \"War Room\" assembly. By the time a human analyst is notified, the \"Autonomous Shield\" has already correlated the IP with global threat intelligence, pulled the user's last six months of behavioral data, and isolated the affected container.\n\n**The \"Intelligent Apprentice\" Model:** AI now acts as an onboarding accelerator. Junior analysts use natural language to query complex datasets (e.g., \"Show me all cross-region S3 bucket access by this service account in the last hour\"), effectively elevating a Tier 1 analyst to Tier 3 capability within weeks rather than years."
      },
      {
        heading: "3. Hyper-automation and the \"Glass Box\" Requirement",
        content: "A primary barrier to full automation has been the \"Black Box\" fear—the risk of an automated system accidentally shutting down a production server during a false positive.\n\n**Decision Provenance:** 2026 frameworks (aligned with ISO/IEC 42001) utilize Stateful Orchestration. Every action taken by the autonomous agent is recorded in a replayable \"Decision Log.\" This provides the \"Glass Box\" transparency required for auditability.\n\n**Human-in-the-Loop (HITL) Thresholds:** Strategic automation now uses Risk-Based Gating. Low-risk actions (e.g., blocking an external IP on the firewall) are fully autonomous, while high-impact actions (e.g., revoking a C-suite executive's global access) trigger a \"One-Click Approval\" notification to a human supervisor, maintaining accountability without sacrificing speed."
      },
      {
        heading: "4. Strategic Implementation for the Oslo SMB Sector",
        content: "For companies with 50-250 employees, building an in-house 24/7 SOC is financially unviable. The 2026 strategy for this sector is Managed Autonomous Defense.\n\n**Vendor Consolidation:** Organizations are moving away from \"best-of-breed\" tool sprawl toward Unified Security Platforms that offer native automation.\n\n**Compliance Automation:** With the full enforcement of NIS2 and DORA, automation is no longer just for defense; it is for survival. Automated agents now generate real-time compliance artifacts, turning a 6-month audit process into a continuous, machine-generated stream of evidence."
      },
      {
        heading: "Conclusion",
        content: "The \"Autonomous Shield\" represents the only viable path forward for the modern enterprise. By shifting the burden of \"Investigation and Triage\" to agentic AI, organizations can finally decouple their security posture from their headcount. In 2026, the hallmark of a resilient company is not the size of its security team, but the sophistication and autonomy of its automated response fabric."
      }
    ],
  },
  "predictive-intelligence": {
    title: "Predictive Intelligence: AI-Driven OSINT and Proactive Defense",
    category: "Research Report",
    image: "/images/card3.jpg",
    sections: [
      {
        heading: "Abstract",
        content: "In 2026, the traditional perimeter-based defense model has been superseded by Anticipatory Resilience. This report explores the convergence of Artificial Intelligence (AI) and Open-Source Intelligence (OSINT) as a mechanism for proactive threat mitigation. We analyze how neural-linguistic pipelines and automated dark-web reconnaissance allow organizations to transition from a \"Detect-and-Respond\" posture to a \"Predict-and-Preempt\" strategy, effectively neutralizing threats in the reconnaissance phase before the first packet of an exploit is sent."
      },
      {
        heading: "1. The OSINT Paradigm Shift: From Library to Live Radar",
        content: "Historically, OSINT was a manual, retrospective process used for post-incident attribution. In 2026, it has been transformed into a Real-Time Signal Intelligence (SIGINT) equivalent for the public domain.\n\n**Automated Surface & Deep Web Crawling:** Modern predictive engines utilize autonomous agents to monitor non-indexed forums, paste-sites, and encrypted messaging channels (Telegram/Matrix). By identifying the sale of proprietary credentials or the discussion of specific organizational vulnerabilities (CVEs) in developer communities, AI can flag an \"Imminent Attack Vector\" days before an intrusion attempt.\n\n**Sentiment and Intent Analysis:** Using Natural Language Processing (NLP), systems now scan for \"Adversarial Intent.\" A surge in negative sentiment toward a specific brand, combined with increased technical queries about that brand's specific tech stack on underground forums, provides a weighted risk score that triggers pre-emptive defensive hardening."
      },
      {
        heading: "2. Countering the \"Synthetic Reality\" Epidemic",
        content: "A primary challenge in 2026 OSINT is the proliferation of AI-generated misinformation and deepfakes designed to trigger false-positive security alerts or facilitate social engineering.\n\n**Automated Evidence Validation:** Predictive intelligence platforms now include Digital Provenance Pipelines. These systems use cryptographic hash-matching and GAN-detection (Generative Adversarial Networks) to verify the authenticity of leaked documents or video instructions, ensuring that security teams do not waste resources chasing \"hallucinated\" breaches or synthetic disinformation.\n\n**Behavioral OSINT:** Instead of tracking static identities, AI-driven OSINT now tracks Adversarial Behavioral Fingerprints. Even if an attacker uses a synthetic persona, their \"digital cadence\"—posting frequency, coding style (stylometry), and tool-usage patterns—is identified by ML models, allowing for the tracking of threat actors across multiple anonymous accounts."
      },
      {
        heading: "3. Attack-Path Modeling and Digital Twins",
        content: "Predictive intelligence is no longer just about external threats; it is about how those threats map to internal weaknesses.\n\n**Exposure Management:** Rather than traditional vulnerability scanning, 2026 platforms utilize Continuous Threat Exposure Management (CTEM). This involves creating a \"Digital Twin\" of the organization's network and running automated simulations based on real-time intelligence gathered from OSINT.\n\n**Proactive Patch Prioritization:** By correlating global \"In-the-Wild\" exploitation data with the organization's specific asset inventory, AI agents prioritize patches not by CVSS score, but by Exploitation Probability. If OSINT indicates an exploit for a \"Low\" severity bug is being actively automated by a known threat group, the system escalates its remediation priority to \"Critical.\""
      },
      {
        heading: "4. Dark Web Intelligence and Credential Proactivity",
        content: "For the SMB sector in Oslo, the most common entry point remains compromised credentials.\n\n**Real-Time Leak Correlation:** In 2026, the window between a data breach at a third-party vendor and the use of those credentials for credential-stuffing attacks has shrunk to minutes. Automated OSINT loops identify leaked corporate emails in \"combo lists\" the moment they are uploaded to dark-web repositories.\n\n**Automated Identity Reset:** Predictive systems are now integrated with Identity Providers (IdPs like Okta/Azure AD). Upon detecting a credential leak via OSINT, the system can autonomously force a password reset and invalidate active sessions for the affected user, neutralizing the threat before the attacker can even attempt a login."
      },
      {
        heading: "Conclusion",
        content: "Predictive Intelligence represents the final frontier of the \"Left of Bang\" strategy. By leveraging AI to synthesize the chaotic data of the open and dark web, organizations can force adversaries to operate in an environment where their \"element of surprise\" is mathematically diminished. In 2026, cybersecurity maturity is measured by the ability to turn external noise into internal action, ensuring that the defense is always one step ahead of the attack."
      }
    ],
  },
  "shadow-ai": {
    title: "Shadow AI: Securing the Automated Intelligence Loop",
    category: "Research Report",
    image: "/images/card4.jpg",
    sections: [
      {
        heading: "Abstract",
        content: "By 2026, the proliferation of decentralized AI adoption—often referred to as \"Shadow AI\"—has surpassed the scale of the \"Shadow IT\" wave of the 2010s. Employees and departments are increasingly deploying autonomous agents, unvetted Large Language Models (LLMs), and automated workflows without central IT oversight. This report investigates the systemic risks of Insecure Intelligence Loops, where sensitive corporate data is fed into external, non-compliant models, and analyzes the shift toward Automated AI Governance (AAG). We propose a framework for securing the \"Intelligence Lifecycle\" to prevent data exfiltration through adversarial prompt injection and model poisoning."
      },
      {
        heading: "1. The Emergence of the \"Intelligence Leak\"",
        content: "Traditional Data Loss Prevention (DLP) tools are designed to identify patterns like credit card numbers or Social Security codes. However, they are fundamentally unsuited for the Semantic Leakage inherent in AI usage.\n\n**Contextual Data Exfiltration:** Employees often input high-value \"unstructured data\"—such as internal strategy documents, meeting transcripts, or unreleased source code—into public AI agents to summarize or refactor. This data is then assimilated into the provider's training set or stored in insecure \"chat history\" logs.\n\n**The API Proliferation:** In 2026, many SMBs use \"wrapper\" apps that connect internal databases to external AI via APIs. Each connection represents an unmonitored \"Intelligence Loop\" where data flows out of the secure perimeter in natural language, making it invisible to standard network firewalls."
      },
      {
        heading: "2. Adversarial Prompt Injection and Agentic Hijacking",
        content: "The most critical technical threat in the Shadow AI era is Indirect Prompt Injection.\n\n**The Trojanized Input:** If an automated AI agent is tasked with \"researching a competitor's website\" or \"summarizing an incoming email,\" an attacker can hide malicious instructions within that external content (e.g., in invisible text or metadata).\n\n**Autonomous Escalation:** Once the agent processes the malicious prompt, it can be instructed to perform actions with the user's permissions, such as \"forward all internal contacts to an external server\" or \"delete cloud backups.\" This effectively turns a productivity tool into an Automated Insider Threat."
      },
      {
        heading: "3. Model Poisoning and Algorithmic Sabotage",
        content: "For companies utilizing \"Local LLMs\" or fine-tuning their own models, the risk shifts to the integrity of the training data.\n\n**Data Poisoning:** Adversaries can inject subtly corrupted data into public datasets that they know a target company uses for fine-tuning. This can create \"backdoors\" in the model—for example, a coding assistant that intentionally suggests insecure cryptographic libraries only when a specific project name is mentioned.\n\n**Output Hallucination as a Service:** Attackers are now targeting the \"inference phase.\" By subtly manipulating the input to a corporate AI, they can force the model to provide incorrect financial advice or flawed technical specs, leading to Operational Sabotage without ever \"hacking\" a traditional server."
      },
      {
        heading: "4. Implementing Automated AI Governance (AAG)",
        content: "To regain control, organizations must implement a Security Fabric for Intelligence.\n\n**AI Access Brokers (AIAB):** Similar to a CASB (Cloud Access Security Broker), an AIAB sits between the user and the LLM. It performs real-time Semantic Redaction, stripping sensitive PII (Personally Identifiable Information) and corporate IP from prompts before they reach the external model.\n\n**Agentic Sandboxing:** In 2026, high-security environments require all autonomous agents to run in \"Ephemeral Sandboxes.\" This limits the agent's ability to communicate with the broader network unless a specific, human-verified \"Intent Token\" is granted for each transaction.\n\n**Automated Policy Enforcement:** Rather than banning AI, companies are using AI-to-monitor-AI. An oversight model continuously audits the logs of other internal agents, flagging \"out-of-character\" requests or attempts to access restricted data silos."
      },
      {
        heading: "Conclusion",
        content: "Shadow AI is the \"Zero-Day of the Workplace.\" The speed of AI adoption has outpaced the development of traditional security controls. In 2026, securing the \"Automated Intelligence Loop\" is not about restriction, but about Visibility and Intent Verification. Organizations that fail to govern their AI usage risk not just data loss, but the complete loss of control over their automated decision-making processes."
      }
    ],
  },
  "grid-under-siege": {
    title: "Grid Under Siege: Critical Infrastructure and Power Grid Vulnerabilities",
    category: "Research Report",
    image: "/images/card5.webp",
    sections: [
      {
        heading: "Abstract",
        content: "In 2026, the convergence of legacy industrial control systems (ICS), accelerated digitalization, and sophisticated nation-state actors has transformed power grids into prime targets for cyber warfare. This report analyzes the systemic vulnerabilities in electrical infrastructure, from SCADA systems to smart grid endpoints, and examines how adversaries are exploiting the IT/OT convergence to achieve kinetic effects through digital means. We propose a defense-in-depth framework for protecting critical energy infrastructure against the evolving threat landscape."
      },
      {
        heading: "1. The Anatomy of Grid Vulnerability: Legacy Meets Modernity",
        content: "Power grids were designed in an era when \"air gaps\" provided security through isolation. The 2026 reality is fundamentally different.\n\n**The OT/IT Convergence Crisis:** As utilities have connected Operational Technology (OT) systems—substations, generation plants, and distribution networks—to corporate IT networks for efficiency gains, they have inadvertently created attack pathways from the internet directly to physical infrastructure.\n\n**Protocol Insecurity by Design:** Industrial protocols like Modbus, DNP3, and IEC 61850 were engineered for reliability, not security. Many lack authentication entirely. An attacker who gains network access can issue commands indistinguishable from legitimate operator instructions.\n\n**The 30-Year Lifecycle Problem:** Unlike IT systems refreshed every 3-5 years, grid components operate for decades. This means 2026 grids contain equipment designed in the 1990s, running unpatched operating systems and communicating over protocols with known vulnerabilities."
      },
      {
        heading: "2. Attack Vectors: From Phishing to Physical Destruction",
        content: "The threat to power grids spans the full spectrum from opportunistic criminals to state-sponsored actors with destructive intent.\n\n**Supply Chain Infiltration:** Adversaries are compromising grid equipment before installation. Firmware backdoors in transformers, protection relays, and smart meters provide persistent access that survives security audits. The 2026 discovery of compromised Chinese-manufactured inverters in European solar installations demonstrated this risk at scale.\n\n**The Aurora Vulnerability:** First demonstrated in 2007, the \"Aurora\" attack—rapidly opening and closing circuit breakers to damage generators—remains viable against many substations. Modern variants use precise timing to cause cascading failures across interconnected grids.\n\n**Ransomware Evolution:** Criminal groups have moved beyond data encryption to \"OT ransomware\" that threatens to physically damage equipment or cause blackouts unless payment is received. The 2025 Colonial Pipeline successor attacks showed that energy infrastructure is now a primary extortion target."
      },
      {
        heading: "3. Case Studies: Lessons from Grid Attacks",
        content: "Historical incidents provide critical intelligence for defense planning.\n\n**Ukraine 2015-2016:** The first confirmed cyberattacks causing power outages demonstrated that well-resourced adversaries could achieve physical effects through cyber means. Attackers used spear-phishing to gain access, then pivoted through corporate networks to reach SCADA systems.\n\n**The 2024 Nordic Grid Probing:** Coordinated reconnaissance activity across Scandinavian power infrastructure revealed pre-positioned access in multiple utilities. Attackers had mapped network topologies and identified critical control points without triggering alerts.\n\n**Solar Inverter Exploitation (2025):** A vulnerability in widely-deployed residential solar inverters allowed attackers to simultaneously disconnect thousands of units, causing grid frequency instability. This demonstrated how distributed energy resources create new attack surfaces."
      },
      {
        heading: "4. The Smart Grid Paradox: Efficiency vs. Attack Surface",
        content: "Modernization initiatives, while necessary for renewable integration and efficiency, dramatically expand the threat landscape.\n\n**Smart Meter Vulnerabilities:** With millions of endpoints, Advanced Metering Infrastructure (AMI) creates an unprecedented attack surface. Compromised meters can be used for demand manipulation attacks that destabilize grid frequency.\n\n**Distributed Energy Resources (DER):** Solar panels, battery storage, and electric vehicle chargers create bidirectional power flows and millions of potential entry points. Each internet-connected inverter is a potential gateway to grid control systems.\n\n**Cloud Dependencies:** Grid operators increasingly rely on cloud services for analytics, forecasting, and even real-time control. A compromise of these platforms could affect multiple utilities simultaneously."
      },
      {
        heading: "5. Defensive Framework for Critical Infrastructure",
        content: "Protecting power grids requires a paradigm shift from perimeter defense to assumed breach and resilience.\n\n**Network Segmentation and Zero Trust:** OT networks must be strictly segmented from IT environments, with all cross-boundary traffic inspected and authenticated. Zero Trust principles must extend to the control plane—no command should be trusted simply because it originates from an \"internal\" source.\n\n**Continuous OT Monitoring:** Passive monitoring solutions that understand industrial protocols can detect anomalous commands without impacting operational safety. Behavioral baselines enable identification of reconnaissance and lateral movement.\n\n**Incident Response Planning:** Utilities must develop and exercise response plans that account for cyber-physical scenarios. This includes manual override procedures, isolation protocols, and coordination with national cyber defense agencies.\n\n**Supply Chain Verification:** Critical components must undergo rigorous security testing before deployment. Firmware integrity verification, hardware inspection, and vendor security assessments are essential for new installations."
      },
      {
        heading: "Conclusion",
        content: "Power grid security in 2026 is a matter of national security. The asymmetry between the cost of attack and the cost of defense favors adversaries, while the consequences of successful attacks—blackouts affecting millions, economic disruption, and potential loss of life—demand urgent action. Organizations responsible for critical infrastructure must invest in security capabilities proportionate to the threat they face. The grid that powers modern society cannot be defended with yesterday's security models."
      }
    ],
  },
}

export default function ResearchPage() {
  const params = useParams()
  const t = useTranslations()
  const slug = params.slug as string
  const report = researchReports[slug]

  if (!report) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Report Not Found</h1>
          <Link href="/" className="text-orange-500 hover:underline">
            {t('research.returnToHome')}
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
            {t('common.backToHome')}
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
                  {t('research.wantToLearnMore')}
                </h3>
                <p className="text-neutral-500 text-lg mb-8 max-w-2xl mx-auto">
                  {t('research.description')}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
                >
                  {t('research.getInTouch')}
                </Link>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-neutral-400 mb-8">
              {t('research.contentComingSoon')}
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              {t('research.returnToHome')}
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
              alt={t('common.logoAlt')} 
              width={32} 
              height={32}
              className="object-contain brightness-0 invert"
            />
            <span className="text-xl font-bold">{t('common.brand')}</span>
          </div>
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} {t('common.copyright')}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
