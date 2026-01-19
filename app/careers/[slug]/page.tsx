"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Mail, Building, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"

const jobListings: Record<string, {
  title: string
  department: string
  location: string
  type: string
  mode: string
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
}> = {
  "senior-security-engineer": {
    title: "Senior Security Engineer",
    department: "Security",
    location: "Oslo, Norway",
    type: "Full-time",
    mode: "Remote",
    description: "We're looking for an experienced Senior Security Engineer to lead our security infrastructure and protect critical systems for enterprise clients. You'll be at the forefront of defending against sophisticated cyber threats, designing robust security architectures, and mentoring the next generation of security professionals.",
    responsibilities: [
      "Design and implement enterprise-grade security architectures for our clients",
      "Conduct comprehensive threat assessments and vulnerability analyses",
      "Lead incident response efforts and forensic investigations",
      "Develop security policies, procedures, and best practices documentation",
      "Mentor junior security team members and conduct knowledge sharing sessions",
      "Collaborate with engineering teams to integrate security into the development lifecycle",
      "Stay current with emerging threats, attack vectors, and defensive technologies",
    ],
    requirements: [
      "5+ years of hands-on experience in cybersecurity engineering",
      "Strong expertise in cloud security (AWS, Azure, or GCP)",
      "Deep knowledge of network security, firewalls, and intrusion detection systems",
      "Experience with SIEM platforms, EDR solutions, and incident response",
      "Proficiency in at least one programming/scripting language (Python, Go, Bash)",
      "Industry certifications such as CISSP, OSCP, or equivalent",
      "Excellent problem-solving and analytical skills",
    ],
    niceToHave: [
      "Experience with Kubernetes security and container orchestration",
      "Background in penetration testing or red team operations",
      "Knowledge of compliance frameworks (ISO 27001, SOC 2, NIS2)",
      "Experience working with government or defense sector clients",
    ],
    benefits: [
      "Competitive salary with equity options",
      "Fully remote position with flexible hours",
      "Annual learning budget of 30,000 NOK",
      "Conference attendance and certification support",
      "Premium health insurance for you and your family",
      "Modern equipment and home office setup allowance",
    ],
  },
  "ai-ml-engineer": {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Oslo, Norway",
    type: "Full-time",
    mode: "Hybrid",
    description: "Join our engineering team to build intelligent systems that power next-generation security automation and threat detection. You'll develop machine learning models that analyze vast amounts of security data, identify anomalies, and predict potential threats before they materialize.",
    responsibilities: [
      "Design and implement machine learning models for threat detection and anomaly analysis",
      "Build NLP pipelines for processing security logs and threat intelligence feeds",
      "Develop predictive models for identifying emerging attack patterns",
      "Optimize model performance and ensure real-time inference capabilities",
      "Collaborate with security analysts to translate domain knowledge into ML features",
      "Build and maintain ML infrastructure and data pipelines",
      "Research and prototype new AI/ML approaches for security applications",
    ],
    requirements: [
      "3+ years of experience in machine learning engineering",
      "Strong proficiency in Python and ML frameworks (TensorFlow, PyTorch, scikit-learn)",
      "Experience with NLP, time-series analysis, and anomaly detection",
      "Solid understanding of MLOps practices and model deployment",
      "Familiarity with data engineering tools (Spark, Airflow, or similar)",
      "Strong mathematical foundation in statistics and linear algebra",
      "Ability to communicate complex technical concepts clearly",
    ],
    niceToHave: [
      "Experience with cybersecurity data and threat analysis",
      "Knowledge of LLMs and transformer architectures",
      "Background in reinforcement learning or agent-based systems",
      "Published research in ML/AI security applications",
    ],
    benefits: [
      "Competitive salary with equity options",
      "Hybrid work model (2-3 days in Oslo office)",
      "Annual learning budget of 30,000 NOK",
      "Access to GPU clusters for experimentation",
      "Premium health insurance for you and your family",
      "Regular team events and knowledge sharing sessions",
    ],
  },
  "full-stack-developer": {
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Oslo, Norway",
    type: "Full-time",
    mode: "On-site",
    description: "We're seeking a talented Full-Stack Developer to create powerful applications that transform how enterprises operate and secure their data. You'll build scalable web applications, intuitive dashboards, and robust APIs that form the backbone of our security platform.",
    responsibilities: [
      "Design and develop full-stack web applications using React/Next.js and Node.js",
      "Build RESTful and GraphQL APIs for internal and client-facing services",
      "Create intuitive, responsive user interfaces for security dashboards",
      "Implement authentication, authorization, and security best practices",
      "Optimize application performance and ensure scalability",
      "Write comprehensive tests and maintain high code quality standards",
      "Participate in code reviews and contribute to architectural decisions",
    ],
    requirements: [
      "4+ years of professional full-stack development experience",
      "Expert-level knowledge of React/Next.js and TypeScript",
      "Strong backend experience with Node.js, Express, or similar frameworks",
      "Proficiency with PostgreSQL, Redis, and database optimization",
      "Experience with cloud services (AWS, Azure, or GCP)",
      "Understanding of CI/CD pipelines and DevOps practices",
      "Strong focus on security in application development",
    ],
    niceToHave: [
      "Experience with real-time data visualization and WebSocket",
      "Knowledge of microservices architecture",
      "Familiarity with cybersecurity concepts and terminology",
      "Contributions to open-source projects",
    ],
    benefits: [
      "Competitive salary with equity options",
      "Modern office in central Oslo",
      "Annual learning budget of 30,000 NOK",
      "Premium health insurance for you and your family",
      "Subsidized lunch and snacks",
      "Team building activities and social events",
    ],
  },
  "threat-intelligence-analyst": {
    title: "Threat Intelligence Analyst",
    department: "Security",
    location: "Oslo, Norway",
    type: "Full-time",
    mode: "Hybrid",
    description: "We're looking for a skilled Threat Intelligence Analyst to monitor the evolving threat landscape and provide actionable intelligence to our clients. You'll track adversary tactics, investigate emerging threats, and produce detailed reports that help organizations stay ahead of attackers.",
    responsibilities: [
      "Monitor dark web forums, paste sites, and underground channels for threat indicators",
      "Analyze and attribute cyber threats to specific threat actors or campaigns",
      "Produce high-quality threat intelligence reports for clients and internal teams",
      "Develop and maintain threat intelligence feeds and automated collection systems",
      "Collaborate with incident response teams during active investigations",
      "Track and profile threat actors, their TTPs, and infrastructure",
      "Brief clients and executives on relevant threats and recommended mitigations",
    ],
    requirements: [
      "3+ years of experience in threat intelligence or security research",
      "Strong knowledge of OSINT tools and methodologies",
      "Familiarity with MITRE ATT&CK framework and threat modeling",
      "Excellent analytical, research, and writing skills",
      "Experience with threat intelligence platforms (MISP, OpenCTI, or similar)",
      "Understanding of malware analysis and reverse engineering concepts",
      "Ability to work with sensitive information and maintain confidentiality",
    ],
    niceToHave: [
      "Language skills beyond English (Russian, Chinese, Arabic)",
      "Experience with nation-state or APT analysis",
      "Background in journalism or investigative research",
      "Certifications such as GCTI or CTIA",
    ],
    benefits: [
      "Competitive salary with equity options",
      "Hybrid work model (2-3 days in Oslo office)",
      "Annual learning budget of 30,000 NOK",
      "Conference attendance and training opportunities",
      "Premium health insurance for you and your family",
      "Access to premium intelligence tools and databases",
    ],
  },
  "devsecops-engineer": {
    title: "DevSecOps Engineer",
    department: "Engineering",
    location: "Oslo, Norway",
    type: "Full-time",
    mode: "Remote",
    description: "Join us as a DevSecOps Engineer to integrate security into every stage of our development pipeline. You'll automate security testing, manage cloud infrastructure, and ensure compliance across all our systems while enabling teams to ship secure code faster.",
    responsibilities: [
      "Design and maintain CI/CD pipelines with integrated security testing",
      "Manage and secure cloud infrastructure across AWS, Azure, and GCP",
      "Implement Infrastructure as Code using Terraform, Pulumi, or CloudFormation",
      "Automate security scanning, vulnerability management, and compliance checks",
      "Configure and maintain Kubernetes clusters with security best practices",
      "Develop monitoring, alerting, and incident response automation",
      "Collaborate with development teams to embed security into their workflows",
    ],
    requirements: [
      "4+ years of experience in DevOps, SRE, or platform engineering",
      "Strong expertise in Kubernetes, Docker, and container orchestration",
      "Proficiency with Infrastructure as Code (Terraform, Pulumi)",
      "Experience with CI/CD security tools (Snyk, Trivy, SonarQube)",
      "Deep knowledge of cloud security across major providers",
      "Strong scripting skills (Python, Bash, Go)",
      "Understanding of compliance requirements (SOC 2, ISO 27001)",
    ],
    niceToHave: [
      "Experience with GitOps practices (ArgoCD, Flux)",
      "Knowledge of service mesh technologies (Istio, Linkerd)",
      "Background in security operations or incident response",
      "CKS, CKA, or cloud security certifications",
    ],
    benefits: [
      "Competitive salary with equity options",
      "Fully remote position with flexible hours",
      "Annual learning budget of 30,000 NOK",
      "Home office setup allowance",
      "Premium health insurance for you and your family",
      "Quarterly team gatherings in Oslo",
    ],
  },
  "security-consultant": {
    title: "Security Consultant",
    department: "Consulting",
    location: "Oslo, Norway",
    type: "Full-time",
    mode: "Hybrid",
    description: "We're seeking an experienced Security Consultant to work directly with clients, assess their security posture, and implement tailored solutions. You'll conduct security audits, develop remediation strategies, and build lasting relationships with enterprise clients.",
    responsibilities: [
      "Conduct comprehensive security assessments and gap analyses for clients",
      "Develop and present security strategies and roadmaps to executive leadership",
      "Lead compliance initiatives (ISO 27001, NIS2, DORA, SOC 2)",
      "Design and implement security controls and governance frameworks",
      "Provide expert guidance on security architecture and technology selection",
      "Build and maintain strong client relationships as a trusted advisor",
      "Contribute to thought leadership through blog posts, webinars, and presentations",
    ],
    requirements: [
      "5+ years of experience in security consulting or advisory roles",
      "Deep knowledge of compliance frameworks (ISO 27001, NIS2, SOC 2, GDPR)",
      "Strong presentation and executive communication skills",
      "Experience leading security assessments and audit engagements",
      "Ability to translate technical risks into business impact",
      "Project management skills and ability to manage multiple engagements",
      "Bachelor's degree in Computer Science, Cybersecurity, or related field",
    ],
    niceToHave: [
      "CISM, CISA, or similar certifications",
      "Experience in the Nordic market and regulatory environment",
      "Background in Big 4 consulting or enterprise security",
      "Knowledge of the defense or critical infrastructure sectors",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Hybrid work model with client site flexibility",
      "Annual learning budget of 30,000 NOK",
      "Premium health insurance for you and your family",
      "Company car or transportation allowance",
      "Executive networking opportunities",
    ],
  },
}

export default function JobPage() {
  const params = useParams()
  const slug = params.slug as string
  const job = jobListings[slug]

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Position Not Found</h1>
          <Link href="/careers" className="text-orange-500 hover:underline">
            View All Positions
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt="SPECTR Logo" 
              width={32} 
              height={32}
              className="object-contain brightness-0 invert"
            />
            <span className="text-2xl font-bold tracking-tight">
              SPECTR
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/careers"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              All Positions
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b border-neutral-800">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Positions
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm font-medium">
                {job.department}
              </span>
              <div className="flex items-center gap-1 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1 text-neutral-400 text-sm">
                <Clock className="w-4 h-4" />
                {job.type}
              </div>
              <div className="flex items-center gap-1 text-neutral-400 text-sm">
                <Building className="w-4 h-4" />
                {job.mode}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {job.title}
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
              {job.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Responsibilities</h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-4">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Nice to Have */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">Nice to Have</h2>
                <ul className="space-y-4">
                  {job.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-neutral-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="sticky top-24"
              >
                {/* Apply Card */}
                <div className="p-6 border border-neutral-800 rounded-xl mb-6">
                  <h3 className="text-xl font-bold mb-4">Apply for this Position</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    Send your CV and cover letter to join our team. We review all applications carefully.
                  </p>
                  <a
                    href="mailto:msi@spectr.no?subject=Application: {job.title}"
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-orange-500 px-6 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105 mb-4"
                  >
                    <Mail className="w-5 h-5" />
                    Apply Now
                  </a>
                  <p className="text-center text-neutral-500 text-sm">
                    Email: <a href="mailto:msi@spectr.no" className="text-orange-500 hover:underline">msi@spectr.no</a>
                  </p>
                </div>

                {/* Benefits Card */}
                <div className="p-6 border border-neutral-800 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 border-t border-neutral-800">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Apply?
            </h2>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              Send your CV and cover letter to <span className="text-orange-500">msi@spectr.no</span> and tell us why you'd be a great fit for the {job.title} role.
            </p>
            <a
              href={`mailto:msi@spectr.no?subject=Application: ${job.title}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Send Application
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt={t('common.logoAlt')} 
              width={32} 
              height={32}
              className="object-contain brightness-0 invert"
            />
            <span className="text-xl font-bold">SPECTR</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/careers" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Careers
            </Link>
            <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Contact
            </Link>
          </div>
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} spectr.no By SPECTR AS · Org nr 936961967
          </div>
        </div>
      </footer>
    </div>
  )
}
