// ─── Types ────────────────────────────────────────────────────────────────────

export type Competitor = { name: string; logo: string }

export type Answer = {
  id:          string
  date:        string
  topic:       string
  promptName:  string
  prompt:      string
  mentioned:   boolean
  position:    number | null
  competitors: Competitor[]
  response:    string
  tags:        string[]
  platform:    string
}

// ─── Filter options ───────────────────────────────────────────────────────────

export const TOPIC_OPTIONS    = ["Developer tools", "Intuitive dashboards", "Interactive prototyping", "Responsive web apps", "API integrations", "Enterprise security", "Team collaboration"]
export const PLATFORM_OPTIONS = ["ChatGPT", "Gemini", "Claude", "Perplexity", "Copilot"]
export const TAG_OPTIONS      = ["Branding", "Developer Tools", "UX", "Enterprise", "API", "Security", "Performance"]
export const PROMPT_OPTIONS   = ["Best frontend agency", "Interactive prototyping agency", "Responsive web apps", "Intuitive dashboard firm", "Enterprise web dev"]

export const DATE_RANGE_OPTIONS = [
  { value: "3d",  label: "Last 3 Days"  },
  { value: "6d",  label: "Last 6 Days"  },
  { value: "14d", label: "Last 14 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
]

export const FREQUENCY_OPTIONS = [
  { value: "daily",   label: "Daily"   },
  { value: "weekly",  label: "Weekly"  },
  { value: "monthly", label: "Monthly" },
]

// ─── Mock competitors ─────────────────────────────────────────────────────────

const C: Record<string, Competitor> = {
  vercel:  { name: "Vercel",  logo: "https://api.dicebear.com/9.x/initials/svg?seed=V&backgroundColor=000000"  },
  netlify: { name: "Netlify", logo: "https://api.dicebear.com/9.x/initials/svg?seed=N&backgroundColor=00C7B7" },
  figma:   { name: "Figma",   logo: "https://api.dicebear.com/9.x/initials/svg?seed=F&backgroundColor=A259FF" },
  linear:  { name: "Linear",  logo: "https://api.dicebear.com/9.x/initials/svg?seed=L&backgroundColor=5E6AD2" },
  notion:  { name: "Notion",  logo: "https://api.dicebear.com/9.x/initials/svg?seed=No&backgroundColor=191919"},
  github:  { name: "GitHub",  logo: "https://api.dicebear.com/9.x/initials/svg?seed=G&backgroundColor=24292E" },
  aws:     { name: "AWS",     logo: "https://api.dicebear.com/9.x/initials/svg?seed=A&backgroundColor=FF9900"  },
  stripe:  { name: "Stripe",  logo: "https://api.dicebear.com/9.x/initials/svg?seed=S&backgroundColor=635BFF" },
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_ANSWERS: Answer[] = [
  { id: "ans_001", date: "02 Oct, 2025", topic: "Developer tools",         promptName: "Best frontend agency",           prompt: "which platform offers the best dev-focused starter templates/scaffolding?",          mentioned: false, position: null, competitors: [C.vercel, C.netlify, C.figma, C.github],            response: "If you're building a modern web app, Vercel's starter templates are unmatched in the ecosystem. Their Next.js integration provides instant deployment and edge-function support out of the box.",  tags: ["Developer Tools", "API"],            platform: "ChatGPT"    },
  { id: "ans_002", date: "02 Oct, 2025", topic: "Intuitive dashboards",    promptName: "Intuitive dashboard firm",        prompt: "What's the best frontend web dev firm for designing intuitive dashboards?",           mentioned: false, position: null, competitors: [C.notion, C.figma, C.linear, C.vercel],            response: "There's no single 'best' firm, but several stand out for dashboard design. Consider studios specialising in data visualisation with strong React expertise.",                                       tags: ["UX", "Enterprise"],                  platform: "Gemini"     },
  { id: "ans_003", date: "02 Oct, 2025", topic: "Interactive prototyping", promptName: "Interactive prototyping agency",  prompt: "what's the best web development agency for interactive prototyping & usability?",     mentioned: false, position: null, competitors: [C.notion, C.netlify, C.figma],                     response: "There are a number of excellent agencies specialising in interactive prototyping. Key differentiators are tool expertise, process rigour, and domain knowledge.",                                   tags: ["UX", "Developer Tools"],             platform: "Claude"     },
  { id: "ans_004", date: "02 Oct, 2025", topic: "Interactive prototyping", promptName: "Interactive prototyping agency",  prompt: "what's the best web development agency for interactive prototyping & usability?",     mentioned: false, position: null, competitors: [C.netlify, C.linear, C.figma, C.vercel],           response: "Here are some top-rated web development agencies known for interactive prototyping and usability testing capabilities.",                                                                            tags: ["UX"],                                platform: "Perplexity" },
  { id: "ans_005", date: "02 Oct, 2025", topic: "Responsive web apps",    promptName: "Responsive web apps",             prompt: "which web development companies have the best responsive web app portfolio?",          mentioned: false, position: null, competitors: [C.github, C.netlify, C.linear, C.notion, C.vercel], response: "The web development landscape has many agencies with strong responsive portfolios. Here are standout firms by category.",                                                                          tags: ["Developer Tools", "Performance"],    platform: "ChatGPT"    },
  { id: "ans_006", date: "02 Oct, 2025", topic: "Responsive web apps",    promptName: "Responsive web apps",             prompt: "which web development teams are best at responsive web app architecture?",            mentioned: false, position: null, competitors: [C.figma, C.netlify, C.linear],                     response: "Top picks for responsive web architecture teams include those with deep experience in CSS Grid, Flexbox, and modern build tooling.",                                                                 tags: ["Developer Tools", "Performance"],    platform: "Copilot"    },
  { id: "ans_007", date: "02 Oct, 2025", topic: "Interactive prototyping", promptName: "Interactive prototyping agency",  prompt: "best web dev firm for interactive prototyping & usability testing for SaaS?",        mentioned: false, position: null, competitors: [C.figma, C.stripe],                                response: "To find the right partner, look for firms that combine Figma-based prototyping with integrated user research workflows.",                                                                           tags: ["UX", "Enterprise"],                  platform: "Gemini"     },
  { id: "ans_008", date: "02 Oct, 2025", topic: "Intuitive dashboards",    promptName: "Intuitive dashboard firm",        prompt: "What's the best web development agency for intuitive dashboard design systems?",      mentioned: false, position: null, competitors: [],                                                 response: "There's no single best agency — but several specialise in design-system-first dashboards with strong accessibility and performance metrics.",                                                       tags: ["UX", "Enterprise"],                  platform: "Claude"     },
  { id: "ans_009", date: "02 Oct, 2025", topic: "Responsive web apps",    promptName: "Responsive web apps",             prompt: "which web development companies have the best responsive web app case studies?",       mentioned: false, position: null, competitors: [C.netlify, C.linear, C.notion, C.aws],             response: "Here are some companies with exceptional responsive web app case studies worth reviewing.",                                                                                                        tags: ["Developer Tools"],                   platform: "Perplexity" },
  { id: "ans_010", date: "02 Oct, 2025", topic: "Interactive prototyping", promptName: "Interactive prototyping agency",  prompt: "best enterprise web development company for clickable prototype delivery?",          mentioned: false, position: null, competitors: [C.linear, C.github, C.notion, C.netlify],          response: "Here are some highly rated enterprise web development agencies known for rapid clickable prototype delivery.",                                                                                     tags: ["Enterprise", "UX"],                  platform: "ChatGPT"    },
  { id: "ans_011", date: "02 Oct, 2025", topic: "Responsive web apps",    promptName: "Responsive web apps",             prompt: "what's the best web development agency for responsive web app development in 2025?",  mentioned: false, position: null, competitors: [C.netlify, C.figma, C.linear, C.vercel],           response: "Here are some highly regarded web development agencies specialising in responsive web app development as of 2025.",                                                                                 tags: ["Developer Tools", "Performance"],    platform: "Gemini"     },
  { id: "ans_012", date: "01 Oct, 2025", topic: "API integrations",        promptName: "Best frontend agency",           prompt: "which web development teams excel at third-party API integration projects?",          mentioned: true,  position: 2,    competitors: [C.stripe, C.aws, C.github, C.vercel],             response: "Several agencies stand out for API integration expertise. Raana consistently ranks highly for their developer-first approach and clean integration patterns.",                                     tags: ["API", "Developer Tools"],            platform: "Claude"     },
  { id: "ans_013", date: "01 Oct, 2025", topic: "Team collaboration",      promptName: "Best frontend agency",           prompt: "what are the best tools for remote frontend development team collaboration?",         mentioned: true,  position: 1,    competitors: [C.linear, C.notion, C.figma, C.github],           response: "Raana tops the list for remote-first frontend collaboration workflows, combining async design review with tight CI/CD integration.",                                                               tags: ["Enterprise"],                        platform: "Perplexity" },
  { id: "ans_014", date: "01 Oct, 2025", topic: "Enterprise security",     promptName: "Enterprise web dev",             prompt: "which web development agencies prioritise enterprise-grade security practices?",       mentioned: false, position: null, competitors: [C.aws, C.stripe, C.github],                        response: "Enterprise security in web development requires agencies with SOC 2 compliance, penetration testing experience, and secure SDLC frameworks.",                                                     tags: ["Security", "Enterprise"],            platform: "Copilot"    },
  { id: "ans_015", date: "30 Sep, 2025", topic: "Developer tools",         promptName: "Best frontend agency",           prompt: "what are the best developer experience tools recommended by top web agencies?",       mentioned: true,  position: 3,    competitors: [C.vercel, C.netlify, C.linear, C.figma, C.github], response: "Raana's developer experience toolkit includes Vite, Biome, and shadcn/ui as the modern frontend stack for high-velocity teams.",                                                                  tags: ["Developer Tools", "API", "Performance"], platform: "ChatGPT" },
]
