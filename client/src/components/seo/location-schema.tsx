interface FAQItem {
  question: string;
  answer: string;
}

interface LocationSchemaProps {
  location: string;
  description: string;
  faqs: FAQItem[];
}

export function LocationSchema({ location, description, faqs }: LocationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://techhorizonlabs.com/locations/${location.toLowerCase().replace(/\s+/g, '-')}#business`,
        "name": "Tech Horizon Labs",
        "description": description,
        "url": `https://techhorizonlabs.com/locations/${location.toLowerCase().replace(/\s+/g, '-')}`,
        "areaServed": {
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
        },
        "parentOrganization": {
          "@id": "https://techhorizonlabs.com/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://techhorizonlabs.com/locations/${location.toLowerCase().replace(/\s+/g, '-')}#faq`,
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
