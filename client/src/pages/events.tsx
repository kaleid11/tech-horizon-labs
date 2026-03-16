import { Navbar, Footer, SkipLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { NewsletterDialog } from "@/components/newsletter-dialog";
import { MapPin, Calendar, Users, Waves, Lightbulb, ArrowRight, ExternalLink, Clock, Cpu, Bot, Wrench, Code, Mail } from "lucide-react";
import { Link } from "wouter";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

const LUMA_EVENT_URL = "https://luma.com/5mtx4dxx";
const LUMA_PROFILE_URL = "https://luma.com/user/usr-BxlvnyuCLwog2S6";

const upcomingTopics = [
  { 
    icon: Bot,
    title: "OpenClaw: The Honest Guide",
    desc: "Live demo of a safe OpenClaw setup. What it can do, what it can't, and how to avoid the security pitfalls.",
  },
  { 
    icon: Wrench,
    title: "AI for Tradies",
    desc: "Practical AI tools for construction, plumbing, and electrical businesses. Offline quoting, job scheduling, and site documentation.",
  },
  { 
    icon: Code,
    title: "Vibe Coding & No-Code AI",
    desc: "Build apps and automations without traditional coding. Using AI to turn ideas into working software in hours.",
  },
  { 
    icon: Cpu,
    title: "Local AI Servers & PicoClaw",
    desc: "Running AI on your own hardware. ESP32 microcontrollers, Ollama, and building a private AI stack from scratch.",
  },
  { 
    icon: Lightbulb,
    title: "n8n Workflow Automation",
    desc: "Self-hosted automation that actually works in production. Connect your tools without cloud dependency.",
  },
  { 
    icon: Users,
    title: "Claude for Business",
    desc: "Getting real work done with Claude. Document analysis, proposal writing, data processing. The workflows that actually save time.",
  },
];

const eventFormat = [
  { time: "5:00 PM", label: "Doors Open", desc: "Grab a drink at the surf club bar, ocean views" },
  { time: "5:30 PM", label: "Featured Talk", desc: "30-minute presentation on the evening's topic" },
  { time: "6:00 PM", label: "Live Demo", desc: "30-minute hands-on demo with audience participation" },
  { time: "6:30 PM", label: "Networking", desc: "Open conversation, Q&A, drinks and sunset until 7:30 PM" },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.events} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "EventSeries",
                "@id": "https://techhorizonlabs.com/events#series",
                "name": "AI on the Coast",
                "description": "Bi-monthly AI meetup on the Sunshine Coast. Practical talks, live demos, and community networking at Sunshine Beach Surf Club.",
                "url": LUMA_PROFILE_URL,
                "organizer": {
                  "@type": "Organization",
                  "@id": "https://techhorizonlabs.com/#organization",
                  "name": "Tech Horizon Labs"
                },
                "location": {
                  "@type": "Place",
                  "name": "Sunshine Beach Surf Life Saving Club",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Duke Street",
                    "addressLocality": "Sunshine Beach",
                    "addressRegion": "QLD",
                    "postalCode": "4567",
                    "addressCountry": "AU"
                  }
                },
                "eventSchedule": {
                  "@type": "Schedule",
                  "repeatFrequency": "P2M",
                  "byDay": "https://schema.org/Thursday",
                  "startDate": "2026-04-02",
                  "startTime": "17:00",
                  "endTime": "19:30"
                }
              },
              {
                "@type": "Event",
                "name": "AI on the Coast — April 2026",
                "startDate": "2026-04-02T17:00:00+10:00",
                "endDate": "2026-04-02T19:30:00+10:00",
                "url": LUMA_EVENT_URL,
                "location": {
                  "@type": "Place",
                  "name": "Sunshine Beach Surf Life Saving Club",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Duke Street",
                    "addressLocality": "Sunshine Beach",
                    "addressRegion": "QLD",
                    "postalCode": "4567",
                    "addressCountry": "AU"
                  }
                },
                "organizer": {
                  "@type": "Organization",
                  "@id": "https://techhorizonlabs.com/#organization",
                  "name": "Tech Horizon Labs"
                },
                "isAccessibleForFree": true,
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled"
              }
            ]
          })
        }}
      />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 text-salmon-400 mb-4">
              <Waves className="h-5 w-5" />
              <span className="text-sm font-medium">Community Meetup</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="heading-events-hero">
              AI on the Coast
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mb-4 leading-relaxed">
              Bi-monthly AI meetup at Sunshine Beach Surf Club. Practical talks, live demos, and honest conversations about what AI can actually do for your business.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
              No hype. No vendor pitches. Just local business owners and tech people sharing what actually works.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button data-testid="button-events-register" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
                <a href={LUMA_EVENT_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Register for April 2nd
                </a>
              </Button>
              <NewsletterDialog>
                <Button data-testid="button-events-notify" variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8">
                  <Mail className="mr-2 h-5 w-5" />
                  Get Notified of Future Events
                </Button>
              </NewsletterDialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700">
              <div>
                <div className="text-3xl font-bold text-salmon-500">Every</div>
                <div className="text-sm text-gray-400">2 Months</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">Free</div>
                <div className="text-sm text-gray-400">Entry</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500">5:00 PM</div>
                <div className="text-sm text-gray-400">Doors Open</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-salmon-500" data-testid="text-events-location">Sunshine</div>
                <div className="text-sm text-gray-400">Beach Surf Club</div>
              </div>
            </div>
          </div>
        </section>

        <PageBreadcrumb items={[
          { label: "About", href: "/about" },
          { label: "Events" },
        ]} />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-salmon-50 to-aubergine-50 rounded-2xl p-8 md:p-12 border border-salmon-100 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-salmon-600" />
                  <h2 className="text-2xl font-bold text-aubergine-900" data-testid="heading-next-event">Next Event</h2>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-lg text-aubergine-900 font-medium mb-2">
                    Thursday, April 2nd 2026 — 5:00 PM to 7:30 PM
                  </p>
                  <p className="text-gray-600 mb-2">
                    Come join us for a cold one at Sunshine Beach SLSC as we talk all things AI. Claude, OpenAI, agents, automation, and wherever the conversation takes us. Whether you're just starting to experiment with AI tools or you're knee-deep in building agentic systems, pull up a seat and swap stories.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    No agenda, no slides, no awkward networking. Just good drinks, great views, and honest conversations about what's actually working (and what's hilariously not) when it comes to running and building businesses in the age of AI.
                  </p>
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-salmon-500" />
                    Sunshine Beach SLSC, Duke St, Sunshine Beach QLD 4567. Look for the orange Tech Horizon Labs signs.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button data-testid="button-events-register-next" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-6 transition-all hover:scale-105" asChild>
                      <a href={LUMA_EVENT_URL} target="_blank" rel="noopener noreferrer">
                        Register Free on Luma
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" className="rounded-full" asChild>
                      <a href={LUMA_PROFILE_URL} target="_blank" rel="noopener noreferrer" data-testid="link-luma-all-events">
                        View All Events
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4" data-testid="heading-event-format">
              What to Expect
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Two hours. One topic. Real conversation. Every second month at Sunshine Beach Surf Club.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="space-y-0">
                {eventFormat.map((item, i) => (
                  <div key={i} className="flex gap-6 relative" data-testid={`event-format-${i}`}>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-salmon-500 rounded-full flex items-center justify-center text-aubergine-900 font-bold text-sm flex-shrink-0 z-10">
                        <Clock className="h-5 w-5" />
                      </div>
                      {i < eventFormat.length - 1 && (
                        <div className="w-0.5 bg-salmon-200 flex-1 my-1" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm font-bold text-salmon-600 mb-1">{item.time}</div>
                      <h3 className="text-lg font-bold text-aubergine-900">{item.label}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4" data-testid="heading-topics">
              Topics We Cover
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Each meetup focuses on one practical AI topic. No death by PowerPoint. Live demos, real tools, honest assessments.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {upcomingTopics.map((topic) => (
                <div key={topic.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow" data-testid={`topic-${topic.title.toLowerCase().replace(/\s+/g, '-').replace(/[&:]/g, '')}`}>
                  <div className="w-10 h-10 bg-aubergine-50 rounded-lg flex items-center justify-center mb-3">
                    <topic.icon className="h-5 w-5 text-aubergine-700" />
                  </div>
                  <h3 className="font-bold text-aubergine-900 mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4" data-testid="heading-venue">
              The Venue
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Ocean views, great food, cold drinks. The best place on the Sunshine Coast to talk AI.
            </p>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-salmon-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-salmon-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-aubergine-900">Sunshine Beach Surf Life Saving Club</h3>
                    <p className="text-gray-500">Duke Street, Sunshine Beach, QLD 4567</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="font-medium text-aubergine-900 mb-1">Beachfront Location</div>
                    <p className="text-sm text-gray-600">Panoramic ocean views from the function room. Watch the sunset while learning about AI.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="font-medium text-aubergine-900 mb-1">Full Bar & Kitchen</div>
                    <p className="text-sm text-gray-600">Restaurant and bar on-site. Grab dinner and drinks before, during, or after the meetup.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="font-medium text-aubergine-900 mb-1">Easy Parking</div>
                    <p className="text-sm text-gray-600">Free parking at the surf club. Just off David Low Way, easy access from anywhere on the Coast.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="font-medium text-aubergine-900 mb-1">Community Vibes</div>
                    <p className="text-sm text-gray-600">Relaxed surf club atmosphere. Come in thongs and a t-shirt. This isn't a corporate conference.</p>
                  </div>
                </div>

                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Sunshine%20Beach%20SLSC&query_place_id=ChIJi3uZytlrk2sRVs3FwItONME" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-salmon-600 hover:text-salmon-700 font-medium text-sm transition-colors"
                  data-testid="link-venue-maps"
                >
                  <MapPin className="h-4 w-4" />
                  View on Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-aubergine-900 text-center mb-4" data-testid="heading-past-events">
              Past Events
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Missed a meetup? Here's what we've covered so far.
            </p>

            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium mb-2">No past events yet</p>
                <p className="text-sm text-gray-400 mb-4">
                  AI on the Coast kicks off April 2nd 2026. Register now to secure your spot.
                </p>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href={LUMA_EVENT_URL} target="_blank" rel="noopener noreferrer" data-testid="link-past-events-register">
                    Register for First Event
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-aubergine-900 mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/academy" className="text-salmon-600 hover:text-salmon-700 underline">Tech Horizon Academy</a>
                <a href="/services/audit" className="text-salmon-600 hover:text-salmon-700 underline">Free AI Assessment</a>
                <a href="/resources" className="text-salmon-600 hover:text-salmon-700 underline">Resources & Guides</a>
                <a href={LUMA_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-salmon-600 hover:text-salmon-700 underline inline-flex items-center gap-1">
                  All Events on Luma <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't Miss the Next Meetup
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              April 2nd at Sunshine Beach Surf Club. Free entry, cold drinks, honest AI conversations. Register on Luma or join the newsletter for future event notifications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button data-testid="button-events-cta-register" size="lg" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105" asChild>
                <a href={LUMA_EVENT_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Register for April 2nd
                </a>
              </Button>
              <NewsletterDialog>
                <Button data-testid="button-events-cta-newsletter" variant="outline" size="lg" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-8">
                  <Mail className="mr-2 h-5 w-5" />
                  Join Newsletter
                </Button>
              </NewsletterDialog>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Sunshine Beach Surf Club • Every 2 Months • Free Entry
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
