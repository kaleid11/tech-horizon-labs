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
    title: 'AI Readiness Consulting',
    description: "Australia's practical AI readiness partner. We prepare organisations to thrive with AI—private infrastructure, compliant by design, teams trained to deliver results.",
    canonical: BASE_URL,
  },
  about: {
    title: 'About Huxley Peckham',
    description: 'Meet Huxley Peckham, Founder of Tech Horizon Labs – AI Systems Architect helping QLD and Australian SMEs deploy private, compliant AI systems.',
    canonical: `${BASE_URL}/about`,
  },
  portfolio: {
    title: 'Case Studies & Results',
    description: 'Real AI implementation results from Australian businesses. See how we help organisations achieve measurable outcomes with private AI infrastructure.',
    canonical: `${BASE_URL}/portfolio`,
  },
  academy: {
    title: 'Tech Horizon Academy',
    description: 'Join 300+ Queensland business operators learning to deploy AI workflows. 1,300+ templates, weekly workshops, Australian compliance pre-mapped.',
    canonical: `${BASE_URL}/academy`,
  },
  resources: {
    title: 'AI Resources & Guides',
    description: 'Free AI resources, guides, and templates for Australian businesses. Learn practical AI implementation strategies.',
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
  locations: {
    queensland: {
      title: 'AI Consulting Queensland',
      description: 'Enterprise AI consulting across Queensland. Private infrastructure, compliant by design, serving Brisbane, Gold Coast, Sunshine Coast and regional QLD.',
      canonical: `${BASE_URL}/locations/queensland`,
    },
    brisbane: {
      title: 'AI Consulting Brisbane',
      description: 'Enterprise AI consulting in Brisbane. Private AI infrastructure, Privacy Act compliant, built for Queensland businesses.',
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
