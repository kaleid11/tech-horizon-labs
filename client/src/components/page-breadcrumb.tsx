import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BASE_URL = "https://techhorizonlabs.com";

interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItemData[];
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  const schemaItems = [
    { "@type": "ListItem" as const, position: 1, name: "Home", item: `${BASE_URL}/` },
    ...items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 2,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems,
  };

  return (
    <div className="bg-white border-b border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4 md:px-6 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-gray-500 hover:text-salmon-600 text-sm">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {items.map((item, index) => (
              <span key={index} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === items.length - 1 || !item.href ? (
                    <BreadcrumbPage className="text-sm text-aubergine-900">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} className="text-gray-500 hover:text-salmon-600 text-sm">
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
