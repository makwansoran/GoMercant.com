'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle,
  Search,
  BookOpen,
  Rocket,
  Users,
  MessageSquare,
  Shield,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Mail,
  Lightbulb,
  Target,
  FolderOpen,
  Building2,
  CheckCircle2,
  AlertCircle,
  Zap,
  PlayCircle,
  Star,
  TrendingUp,
  Gift,
  Bell,
  FileText,
  Globe,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Clock,
  ArrowRight,
  Award,
  Headphones
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface GuideItem {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  steps: string[];
}

const faqData: FAQItem[] = [
  {
    question: "What is GoMercant?",
    answer: "GoMercant is a professional platform that connects businesses with skilled professionals through missions. Businesses can post tasks and projects, while professionals can browse, accept, and complete missions to earn rewards and build their reputation.",
    category: "general"
  },
  {
    question: "How do I create a mission?",
    answer: "Navigate to the 'Create' section from the sidebar. Fill in your mission details including title, description, budget, deadline, required skills, and any attachments. Once submitted, your mission will be visible to matching professionals.",
    category: "missions"
  },
  {
    question: "What types of missions can I post?",
    answer: "You can post various types of missions including software development, design, writing, marketing, data analysis, consulting, and more. Each mission can be categorized by skill requirements, complexity, and timeline.",
    category: "missions"
  },
  {
    question: "How does the matching system work?",
    answer: "Our algorithm matches missions with professionals based on their skills, experience, ratings, availability, and past performance. Professionals with relevant expertise will see your mission prioritized in their feed.",
    category: "missions"
  },
  {
    question: "How do I communicate with other users?",
    answer: "Use the Messaging feature accessible from the sidebar. You can start conversations with mission posters, collaborators, or other professionals. All messages are encrypted and stored securely.",
    category: "messaging"
  },
  {
    question: "Can I work on multiple missions simultaneously?",
    answer: "Yes! You can work on multiple missions at once. Track your active projects in the 'Projects' section. We recommend managing your workload carefully to ensure quality delivery.",
    category: "missions"
  },
  {
    question: "How do I get paid for completed missions?",
    answer: "Payment is released upon successful completion and approval of your mission deliverables. Funds are transferred to your connected payment method within 3-5 business days.",
    category: "payments"
  },
  {
    question: "What if there's a dispute with a mission?",
    answer: "We have a dedicated dispute resolution process. Contact our support team through the Help section, and we'll mediate between parties to find a fair resolution based on the mission terms and deliverables.",
    category: "support"
  },
  {
    question: "How do I build my reputation on the platform?",
    answer: "Complete missions successfully, receive positive reviews, respond promptly to messages, and maintain a professional profile. Your reputation score increases with each successful interaction.",
    category: "general"
  },
  {
    question: "Is my data secure on GoMercant?",
    answer: "Yes, we use industry-standard encryption for all data transmission and storage. Your personal information is never shared without consent, and we comply with GDPR and other privacy regulations.",
    category: "security"
  },
  {
    question: "How do I update my profile and skills?",
    answer: "Go to Settings from the sidebar to access your Account Settings. Here you can update your profile information, add work experience, education, skills, certifications, and social links.",
    category: "account"
  },
  {
    question: "What are the fees for using GoMercant?",
    answer: "We charge a small service fee on completed missions. The exact percentage varies based on your account tier and mission value. Premium members enjoy reduced fees and additional features.",
    category: "payments"
  }
];

const guides: GuideItem[] = [
  {
    title: "Getting Started",
    description: "Learn the basics of using GoMercant",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500",
    steps: [
      "Create your account and verify your email",
      "Complete your profile with skills and experience",
      "Browse available missions or create your first mission",
      "Connect with professionals and start collaborating",
      "Complete missions and build your reputation"
    ]
  },
  {
    title: "Creating Effective Missions",
    description: "Tips for posting missions that attract top talent",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    steps: [
      "Write clear, descriptive titles that summarize the task",
      "Provide detailed requirements and expectations",
      "Set realistic budgets based on market rates",
      "Include relevant attachments and reference materials",
      "Respond promptly to questions from interested professionals"
    ]
  },
  {
    title: "Finding & Completing Missions",
    description: "How to find and successfully complete missions",
    icon: CheckCircle2,
    color: "from-purple-500 to-violet-500",
    steps: [
      "Use filters to find missions matching your skills",
      "Read mission requirements carefully before accepting",
      "Communicate clearly with the mission poster",
      "Deliver work on time and request feedback",
      "Build your portfolio with completed projects"
    ]
  },
  {
    title: "Using the Messaging System",
    description: "Communicate effectively with other users",
    icon: MessageSquare,
    color: "from-pink-500 to-rose-500",
    steps: [
      "Access Messages from the sidebar navigation",
      "Start new conversations or continue existing ones",
      "Share files and attachments securely",
      "Use professional language and be responsive",
      "Report any inappropriate behavior"
    ]
  },
  {
    title: "Managing Your Projects",
    description: "Track and organize your active work",
    icon: FolderOpen,
    color: "from-orange-500 to-amber-500",
    steps: [
      "View all your projects in the Projects section",
      "Track progress and deadlines for each project",
      "Update status as you complete milestones",
      "Communicate updates to stakeholders",
      "Archive completed projects for reference"
    ]
  },
  {
    title: "Networking & Building Connections",
    description: "Grow your professional network",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
    steps: [
      "Explore companies and professionals in the Network section",
      "Connect with people in your industry",
      "Join relevant communities and discussions",
      "Collaborate on projects to build relationships",
      "Maintain an active, professional presence"
    ]
  }
];

const categories = [
  { id: 'all', label: 'All Topics', icon: BookOpen },
  { id: 'general', label: 'General', icon: HelpCircle },
  { id: 'missions', label: 'Missions', icon: Target },
  { id: 'messaging', label: 'Messaging', icon: MessageSquare },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'account', label: 'Account', icon: Settings },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'support', label: 'Support', icon: Mail },
];

const whatsNew = [
  {
    title: "Enhanced Messaging",
    description: "Real-time messaging with read receipts and typing indicators",
    date: "Jan 2026",
    type: "feature",
    icon: MessageSquare
  },
  {
    title: "Project Dashboard",
    description: "New project management tools to track your active work",
    date: "Jan 2026",
    type: "feature",
    icon: FolderOpen
  },
  {
    title: "Improved Search",
    description: "Better mission matching with advanced filters",
    date: "Dec 2025",
    type: "improvement",
    icon: Search
  }
];

const videoTutorials = [
  { title: "Platform Overview", duration: "3:45", thumbnail: "rocket" },
  { title: "Creating Your First Mission", duration: "5:20", thumbnail: "target" },
  { title: "Building Your Profile", duration: "4:15", thumbnail: "user" },
  { title: "Messaging Best Practices", duration: "3:30", thumbnail: "message" },
];

export const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<number, boolean | null>>({});

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col h-full px-4 py-6 pb-24 overflow-y-auto">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto w-full space-y-10"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 text-center space-y-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 mx-auto"
            >
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                How can we help?
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Find answers, learn best practices, and get the most out of GoMercant.
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles, guides, and more..."
                className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-primary/50 bg-background/80 backdrop-blur-sm"
              />
              {searchQuery && (
                <Badge className="absolute right-3 top-1/2 -translate-y-1/2">
                  {filteredFAQs.length} results
                </Badge>
              )}
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['Getting started', 'Payments', 'Create mission', 'Profile'].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs h-7"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Rocket, label: 'Getting Started', description: 'New to GoMercant?', color: 'from-blue-500 to-cyan-500', view: 'guide-0' },
              { icon: Target, label: 'Create Mission', description: 'Post a new task', color: 'from-green-500 to-emerald-500', view: 'create' },
              { icon: Headphones, label: 'Contact Support', description: 'Get personal help', color: 'from-purple-500 to-violet-500', view: 'support' },
              { icon: Bell, label: "What's New", description: 'Latest updates', color: 'from-orange-500 to-amber-500', view: 'news' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group overflow-hidden h-full">
                  <CardContent className="p-5 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    <div className="relative z-10 flex flex-col items-center text-center gap-3">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold block">{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What's New Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Gift className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold">What&apos;s New</h2>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {whatsNew.map((item, index) => (
              <Card key={index} className="group hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                        <Badge variant={item.type === 'feature' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                          {item.type === 'feature' ? 'New' : 'Updated'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-2">{item.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Video Tutorials */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <PlayCircle className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold">Video Tutorials</h2>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videoTutorials.map((video, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer group"
              >
                <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="h-6 w-6 text-primary fill-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-[10px] text-white font-medium">
                    {video.duration}
                  </div>
                </div>
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{video.title}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guides Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Step-by-Step Guides</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {guides.map((guide, index) => (
              <Card key={index} className="overflow-hidden group">
                <div 
                  className="p-5 cursor-pointer transition-colors hover:bg-muted/30"
                  onClick={() => setExpandedGuide(expandedGuide === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <guide.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        expandedGuide === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedGuide === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="border-t pt-4">
                          <ol className="space-y-3">
                            {guide.steps.map((step, stepIndex) => (
                              <motion.li 
                                key={stepIndex} 
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: stepIndex * 0.05 }}
                              >
                                <span className={`flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br ${guide.color} text-white text-xs font-medium flex items-center justify-center shadow-sm`}>
                                  {stepIndex + 1}
                                </span>
                                <span className="text-sm pt-0.5">{step}</span>
                              </motion.li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="gap-2 rounded-full"
              >
                <category.icon className="h-3.5 w-3.5" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFAQs.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-muted mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Try adjusting your search or filter. You can also contact support for personalized help.
                  </p>
                  <Button variant="outline" className="mt-4 gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredFAQs.map((faq, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-sm transition-shadow">
                  <div 
                    className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          expandedFAQ === index ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <ChevronRight 
                            className={`h-4 w-4 transition-transform ${
                              expandedFAQ === index ? 'rotate-90' : ''
                            }`} 
                          />
                        </div>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0 capitalize">
                        {faq.category}
                      </Badge>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <div className="border-t pt-4 pl-11 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            
                            {/* Feedback */}
                            <div className="flex items-center gap-4 pt-2">
                              <span className="text-sm text-muted-foreground">Was this helpful?</span>
                              <div className="flex gap-2">
                                <Button
                                  variant={helpfulFeedback[index] === true ? 'default' : 'outline'}
                                  size="sm"
                                  className="h-8 gap-1.5"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHelpfulFeedback({ ...helpfulFeedback, [index]: true });
                                  }}
                                >
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                  Yes
                                </Button>
                                <Button
                                  variant={helpfulFeedback[index] === false ? 'default' : 'outline'}
                                  size="sm"
                                  className="h-8 gap-1.5"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHelpfulFeedback({ ...helpfulFeedback, [index]: false });
                                  }}
                                >
                                  <ThumbsDown className="h-3.5 w-3.5" />
                                  No
                                </Button>
                              </div>
                              {helpfulFeedback[index] !== undefined && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-xs text-primary"
                                >
                                  Thanks for your feedback!
                                </motion.span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))
            )}
          </div>
        </motion.div>

        {/* Pro Tips */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Pro Tips</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Complete Your Profile",
                description: "Profiles with photos, skills, and work history get 3x more mission opportunities.",
                icon: Users,
                stat: "3x",
                statLabel: "more opportunities"
              },
              {
                title: "Respond Quickly",
                description: "Users who respond within 24 hours have higher success rates on missions.",
                icon: Clock,
                stat: "24h",
                statLabel: "response time"
              },
              {
                title: "Use Clear Descriptions",
                description: "Detailed mission descriptions attract better-qualified professionals.",
                icon: FileText,
                stat: "2x",
                statLabel: "more applications"
              },
              {
                title: "Build Your Network",
                description: "Connect with others in your field to discover more opportunities.",
                icon: TrendingUp,
                stat: "40%",
                statLabel: "faster growth"
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold mb-1">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground">{tip.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold text-primary">{tip.stat}</div>
                            <div className="text-[10px] text-muted-foreground">{tip.statLabel}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support CTA */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="relative bg-gradient-to-r from-primary via-primary to-primary/90 p-8 md:p-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTItNC0yLTItNCAyLTQgMi00LTItMi00LTItNC0yIDItNCAyLTQgMi00IDItMiA0LTIgNC0yczIgMiA0IDIgNC0yIDItNCAyLTQtMi0yLTQtMi00IDItMiA0LTIgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
                  <p className="text-white/80 max-w-lg">
                    Our support team is here to help you succeed. Get personalized assistance from our experts.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="secondary" className="gap-2 shadow-lg">
                    <Mail className="h-4 w-4" />
                    Email Support
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                    <MessageSquare className="h-4 w-4" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Keyboard Shortcuts */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <Settings className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-lg">Keyboard Shortcuts</CardTitle>
                  <CardDescription>Navigate GoMercant like a pro</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-x-8 gap-y-3">
                {[
                  { keys: ['Ctrl', 'K'], action: 'Quick search' },
                  { keys: ['Ctrl', 'N'], action: 'New mission' },
                  { keys: ['Ctrl', 'M'], action: 'Open messages' },
                  { keys: ['Ctrl', '/'], action: 'Show help' },
                  { keys: ['Esc'], action: 'Close dialog' },
                  { keys: ['Enter'], action: 'Submit form' },
                ].map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm text-muted-foreground">{shortcut.action}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-mono font-medium bg-muted rounded border shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-muted-foreground text-xs self-center">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center space-y-4 py-6">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Status Page
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            GoMercant v1.0.0 • Made with <Heart className="h-3 w-3 inline text-red-500 fill-red-500" /> for professionals worldwide
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
