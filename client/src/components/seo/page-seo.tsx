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
    title: 'AI Business Training Sunshine Coast & QLD',
    description: 'Construction directors saving 2 days per week on invoices and timesheets — set up in 2 hours. AI business training, private infrastructure & consulting for Sunshine Coast and Queensland SMEs.',
    canonical: BASE_URL,
  },
  about: {
    title: 'About Huxley Peckham',
    description: 'Meet Huxley Peckham, Founder of Tech Horizon Labs – AI Systems Architect helping QLD and Australian SMEs deploy private, compliant AI systems.',
    canonical: `${BASE_URL}/about`,
  },
  portfolio: {
    title: 'AI Case Studies Australia | Real Business Results',
    description: 'Real AI case studies from Australian businesses. Construction directors saving 2 days/week, manufacturers cutting downtime 30%, accounting firms reducing admin 40%. See measurable results.',
    canonical: `${BASE_URL}/portfolio`,
  },
  academy: {
    title: 'AI Training Sunshine Coast | Tech Horizon Academy',
    description: 'Hands-on AI training workshops for Sunshine Coast & QLD businesses. 300+ operators trained, 1,300+ templates, real results — construction firms cut admin from 2 days to 1 hour.',
    canonical: `${BASE_URL}/academy`,
  },
  resources: {
    title: 'AI Workshop Resources & Training Guides',
    description: 'Free AI workshop materials, training guides, and templates for Australian businesses. Practical AI skills for teams — from invoice automation to workflow optimisation.',
    canonical: `${BASE_URL}/resources`,
  },
  services: {
    audit: {
      title: 'Readiness Assessment',
      description: 'Free 15-minute AI readiness assessment. Identify your highest-impact opportunities and understand your data readiness.',
      canonical: `${BASE_URL}/services/audit`,
    },
    accelerator: {
      title: 'Foundation Sprint',
      description: '4-week implementation sprint to build your AI-ready knowledge base and deploy private infrastructure.',
      canonical: `${BASE_URL}/services/accelerator`,
    },
    partner: {
      title: 'Ongoing Evolution',
      description: 'Continuous AI partnership keeping your infrastructure current as tools and capabilities advance.',
      canonical: `${BASE_URL}/services/partner`,
    },
  },
  research: {
    title: 'AI Company Research: Governance, Funding & Power',
    description: 'Deep analysis of Anthropic, OpenAI, Google DeepMind, Meta AI, xAI, Perplexity, Kimi, and Mistral. Governance, funding rounds, investor breakdowns, and policy shifts. Free research from Tech Horizon Labs.',
    canonical: `${BASE_URL}/research`,
  },
  locations: {
    queensland: {
      title: 'AI Consulting Queensland',
      description: 'Enterprise AI consulting across Queensland. Private infrastructure, compliant by design, serving Brisbane, Gold Coast, Sunshine Coast and regional QLD.',
      canonical: `${BASE_URL}/locations/queensland`,
    },
    brisbane: {
      title: 'AI Consulting Brisbane | AI Solutions for Brisbane Business',
      description: 'Brisbane AI consultants helping manufacturers cut downtime by 30% and professional services firms reduce admin by 40%. Private infrastructure, 4-week implementation, Privacy Act compliant.',
      canonical: `${BASE_URL}/locations/brisbane`,
    },
    sunshineCoast: {
      title: 'AI Consulting Sunshine Coast',
      description: 'Sunshine Coast-based AI consulting. Local expertise, enterprise-grade AI infrastructure for Sunshine Coast businesses.',
      canonical: `${BASE_URL}/locations/sunshine-coast`,
    },
    goldCoast: {
      title: 'AI Consulting Gold Coast',
      description: 'AI consulting services on the Gold Coast. Private infrastructure, compliant systems for Gold Coast enterprises.',
      canonical: `${BASE_URL}/locations/gold-coast`,
    },
  },
};
