export default function Footer() {
  const sections = [
    {
      title: "Features",
      links: [
        "Plan",
        "Build",
        "Insights",
        "Customer Requests",
        "Linear Asks",
        "Security",
        "Mobile",
      ],
    },
    {
      title: "Product",
      links: [
        "Pricing",
        "Method",
        "Integrations",
        "Changelog",
        "Documentation",
        "Download",
        "Switch",
      ],
    },
    {
      title: "Company",
      links: [
        "About",
        "Customers",
        "Careers",
        "Now",
        "README",
        "Quality",
        "Brand",
      ],
    },
    {
      title: "Resources",
      links: [
        "Developers",
        "Status",
        "Startups",
        "Report vulnerability",
        "DPA",
        "Privacy",
        "Terms",
      ],
    },
    {
      title: "Connect",
      links: ["Contact us", "Community", "X (Twitter)", "GitHub", "YouTube"],
    },
  ];

  return (
    <footer className="w-full bg-black text-center text-gray-400 border-t border-neutral-900 py-10 px-5 md:px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="text-white font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Oncree SaaS. All rights reserved.
      </div>
    </footer>
  );
}
