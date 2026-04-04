interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceAreaItem {
  "@type": string;
  name: string;
  postalCode?: string[];
}

interface LocationSchemaProps {
  location: string;
  description: string;
  faqs: FAQItem[];
  serviceAreas?: ServiceAreaItem[];
}

function buildAreaServedItem(item: ServiceAreaItem) {
  const base: Record<string, unknown> = {
    "@type": item["@type"],
    "name": item.name,
  };
  if (item.postalCode && item.postalCode.length > 0) {
    base["address"] = item.postalCode.map(pc => ({
      "@type": "PostalAddress",
      "postalCode": pc,
      "addressRegion": "QLD",
      "addressCountry": "AU"
    }));
  }
  return base;
}

export function LocationSchema({ location, description, faqs, serviceAreas }: LocationSchemaProps) {
  const slug = location.toLowerCase().replace(/\s+/g, '-');

  const areaServed = serviceAreas
    ? serviceAreas.map(buildAreaServedItem)
    : {
        "@type": "City",
        "name": location,
        "containedInPlace": {
          "@type": "State",
          "name": "Queensland",
          "containedInPlace": {
            "@type": "Country",
            "name": "Australia"
          }
        }
      };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://techhorizonlabs.com/locations/${slug}#business`,
        "name": "Tech Horizon Labs",
        "description": description,
        "url": `https://techhorizonlabs.com/locations/${slug}`,
        "areaServed": areaServed,
        "parentOrganization": {
          "@id": "https://techhorizonlabs.com/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://techhorizonlabs.com/locations/${slug}#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
