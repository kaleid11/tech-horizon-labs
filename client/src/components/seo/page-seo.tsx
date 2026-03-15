import { useEffect } from 'react';

interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://techhorizonlabs.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;
const SITE_NAME = 'Tech Horizon Labs';

/**
 * Custom SEO component for React 19 (react-helmet-async not compatible)
 * Updates document head on mount and cleans up on unmount
 */
export function PageSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageSEOProps) {
  useEffect(() => {
    // Store original values for cleanup
    const originalTitle = document.title;

    // Update title
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
      return meta;
    };

    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      return link;
    };

    // Update meta tags
    setMeta('description', description);

    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    }

    // Open Graph
    setMeta('og:title', ogTitle || fullTitle, true);
    setMeta('og:description', ogDescription || description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', 'website', true);

    if (canonical) {
      setMeta('og:url', canonical, true);
      setLink('canonical', canonical);
    }

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', ogTitle || fullTitle);
    setMeta('twitter:description', ogDescription || description);
    setMeta('twitter:image', ogImage);

    // Cleanup on unmount - restore original title
    return () => {
      document.title = originalTitle;
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, noIndex]);

  return null;
}

/**
 * Pre-configured SEO for common pages
 */
export const SEO_CONFIGS = {
  home: {
    title: 'AI Consulting Sunshine Coast & Brisbane',
    description: "AI won't save your business — fixing the right problem will. Queensland AI consulting that finds your costliest bottleneck and fixes it in 4 weeks.",
    canonical: BASE_URL,
  },
  about: {
    title: 'About Us — AI Consulting Queensland',
    description: 'Meet Huxley Peckham, Founder of Tech Horizon Labs. AI Systems Architect helping Queensland and Australian SMEs deploy private, compliant AI systems.',
    canonical: `${BASE_URL}/about`,
  },
  portfolio: {
    title: 'AI Case Studies — Real Business Results',
    description: 'Real AI case studies from Australian businesses. Construction directors saving 2 days/week, manufacturers cutting downtime 30%. See measurable results.',
    canonical: `${BASE_URL}/portfolio`,
  },
  academy: {
    title: 'AI Business Training Sunshine Coast',
    description: '1,300+ tested AI workflows, weekly live workshops, and 300+ operators. Learn to find and fix business bottlenecks with AI. Hands-on templates included.',
    canonical: `${BASE_URL}/academy`,
  },
  resources: {
    title: 'AI Resources & Training Guides',
    description: 'Free AI workshop materials, training guides, and templates for Australian businesses. Practical AI skills from invoice automation to workflow optimisation.',
    canonical: `${BASE_URL}/resources`,
  },
  services: {
    audit: {
      title: 'Free AI Readiness Assessment',
      description: 'Free 15-minute AI readiness assessment for Australian businesses. Identify your highest-impact opportunities and understand your data readiness.',
      canonical: `${BASE_URL}/services/audit`,
    },
    accelerator: {
      title: 'AI Foundation Sprint — 4 Weeks',
      description: '4-week AI implementation sprint. Build your AI-ready knowledge base and deploy private infrastructure with hands-on setup and staff training.',
      canonical: `${BASE_URL}/services/accelerator`,
    },
    partner: {
      title: 'Ongoing AI Partnership & Support',
      description: 'Continuous AI partnership keeping your infrastructure current as tools advance. Monthly reviews, priority support, and proactive updates.',
      canonical: `${BASE_URL}/services/partner`,
    },
  },
  research: {
    title: 'AI Research Hub & Company Analysis',
    description: 'Deep analysis of Anthropic, OpenAI, Google DeepMind, Meta AI and more. Company comparisons, governance, funding rounds, and AI policy shifts.',
    canonical: `${BASE_URL}/research`,
  },
  locations: {
    queensland: {
      title: 'AI Consulting Queensland — All Regions',
      description: 'Queensland AI consulting that finds your costliest bottleneck and fixes it. Private infrastructure, compliant by design, Brisbane to Gold Coast.',
      canonical: `${BASE_URL}/locations/queensland`,
    },
    brisbane: {
      title: 'AI Consulting Brisbane — Local Expert',
      description: 'Brisbane AI consulting that finds the right problem before selling you tools. Manufacturers cut downtime 30%, firms reduce admin 40%. Privacy Act compliant.',
      canonical: `${BASE_URL}/locations/brisbane`,
    },
    sunshineCoast: {
      title: 'AI Consulting Sunshine Coast',
      description: 'Sunshine Coast AI consulting that finds your costliest bottleneck and fixes it. Local expertise, private infrastructure, compliant by design.',
      canonical: `${BASE_URL}/locations/sunshine-coast`,
    },
    goldCoast: {
      title: 'AI Consulting Gold Coast — Local Expert',
      description: 'Gold Coast AI consulting that finds the right problem first. Private infrastructure, compliant systems, real results for local businesses.',
      canonical: `${BASE_URL}/locations/gold-coast`,
    },
  },
  industries: {
    construction: {
      title: 'AI for Construction Companies',
      description: 'Construction AI consulting that finds the bottleneck costing builders the most. 60% faster quotes, 2 days saved per week. Free 15-min assessment.',
      canonical: `${BASE_URL}/industries/construction`,
    },
    accounting: {
      title: 'AI for Accounting Firms — Cut Admin',
      description: 'AI consulting for accounting firms. Find the bottleneck eating your billable hours — receipt processing, document triage, client follow-ups. 40% reduction.',
      canonical: `${BASE_URL}/industries/accounting`,
    },
    legal: {
      title: 'AI for Law Firms — Document Automation',
      description: 'Legal AI consulting that finds the right problem first. 50% faster document review, 70% less manual searching. Private, privilege-aware infrastructure.',
      canonical: `${BASE_URL}/industries/legal`,
    },
    healthcare: {
      title: 'AI for Healthcare — Cut Admin Time',
      description: 'Healthcare AI consulting that reduces admin burden on clinicians. 35% less documentation time, 50% faster referrals. Private, health data compliant.',
      canonical: `${BASE_URL}/industries/healthcare`,
    },
    retail: {
      title: 'AI for Retail — Smarter Operations',
      description: 'Retail AI consulting that fixes operational bottlenecks — inventory forecasting, order processing, unified reporting. 30% fewer stockouts.',
      canonical: `${BASE_URL}/industries/retail`,
    },
  },
  insights: {
    claudeVsChatgpt2026: {
      title: 'Claude vs ChatGPT 2026 Comparison',
      description: 'Honest Claude vs ChatGPT comparison from a consultant who deploys both. Real client data on privacy, cost, quality, and when to use each.',
      canonical: `${BASE_URL}/insights/claude-vs-chatgpt-2026`,
    },
  },
  auditTool: {
    title: 'AI Readiness Self-Assessment Tool',
    description: 'Free 2-minute AI readiness assessment. 10 questions, instant results with a personalised radar chart showing your strengths and gaps.',
    canonical: `${BASE_URL}/audit-tool`,
  },
  aiEthics: {
    title: 'Our AI Ethics & Transparency Principles',
    description: 'How Tech Horizon Labs uses AI responsibly. Our five principles, data handling commitments, and clear boundaries on what we will and won\'t do.',
    canonical: `${BASE_URL}/ai-ethics`,
  },
  openclaw: {
    title: 'OpenClaw Setup Sunshine Coast — Honest Expert Guide',
    description: 'OpenClaw setup on the Sunshine Coast by a consultant who tells you what it can and can\'t safely do. 512 known vulnerabilities. We deploy it right or recommend something better.',
    canonical: `${BASE_URL}/openclaw`,
  },
  events: {
    title: 'AI on the Coast — Sunshine Coast AI Meetup',
    description: 'Free bi-monthly AI meetup at Sunshine Beach Surf Club. Practical talks, live demos, and honest conversations about AI for local businesses. No hype, no vendor pitches.',
    canonical: `${BASE_URL}/events`,
  },
};
