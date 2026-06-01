import { Link } from "wouter";
import { ArrowLeft, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Calculators
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-14 max-w-3xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you — whether it's a bug report, a calculator request, or a general enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Mail,    title: "Email",    value: "hello@trufflshuffl.com",    sub: "We aim to reply within 2 business days" },
            { icon: MapPin,  title: "Based in", value: "South Africa",              sub: "Serving users worldwide" },
            { icon: Clock,   title: "Hours",    value: "Mon–Fri, 08:00–17:00 SAST", sub: "UTC+2" },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-card border border-border rounded-xl p-5 space-y-2">
                <Icon className="w-5 h-5 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.title}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-foreground">Send Us a Message</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              const subject = encodeURIComponent(`TrufflShuffl Enquiry: ${data.get("subject") || "General"}`);
              const body = encodeURIComponent(
                `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`
              );
              window.location.href = `mailto:hello@trufflshuffl.com?subject=${subject}&body=${body}`;
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" required
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email" required
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="subject">Subject</label>
              <input
                id="subject" name="subject"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Bug report / Calculator request / Other"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="message">Message</label>
              <textarea
                id="message" name="message" required rows={5}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
          <p className="text-xs text-muted-foreground">
            Clicking Send will open your email client with the message pre-filled. No data is sent directly through this website.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Common Enquiries</h2>
          <div className="space-y-3">
            {[
              { q: "Can I request a new calculator?", a: "Absolutely — send us an email describing what you'd like to calculate and we'll consider it for a future update." },
              { q: "I found an error in a calculation", a: "Please email us with the calculator name, the values you entered, and the result you received. We take accuracy seriously and will investigate promptly." },
              { q: "Can I embed a calculator on my site?", a: "Please contact us to discuss licensing and embedding arrangements. Unauthorised scraping or embedding is not permitted under our Terms." },
              { q: "Are the calculators available offline?", a: "Once loaded in your browser, most calculators work without an internet connection. No app download is required." },
            ].map(item => (
              <details key={item.q} className="bg-card border border-border rounded-lg group">
                <summary className="px-4 py-3 text-sm font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <footer className="border-t border-border pt-6 text-center space-y-1">
          <p className="text-xs text-muted-foreground">© 2026 TrufflShuffl.com — WordShuffl Trading. ALL RIGHTS RESERVED</p>
        </footer>
      </main>
    </div>
  );
}
