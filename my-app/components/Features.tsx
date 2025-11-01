export default function Features() {
  const features = [
    {
      title: "Smart Proposals",
      desc: "Generate personalized AI proposals and send them instantly.",
      icon: "💡",
    },
    {
      title: "Invoice Tracking",
      desc: "Track client payments, overdue invoices, and send reminders.",
      icon: "📊",
    },
    {
      title: "N8N Automations",
      desc: "Automate your daily tasks using our ready-made workflows.",
      icon: "⚙️",
    },
    {
      title: "Secure Storage",
      desc: "Your files and client data are protected with top-tier encryption.",
      icon: "🔒",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Powerful Features</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-2xl p-6 hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
