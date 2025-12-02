import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, AlertTriangle, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LockBadge } from "@/components/ui/lock-badge";
import homepageBanner from '@/assets/Homepage Banner.jpg';

const features = [
  {
    icon: <MapPin className="h-8 w-8 text-gc-accent" />,
    title: "Weather & Conditions Map",
    description:
      "Real-time temperature, humidity, rainfall, and frost overlays tailored to Frederick County.",
    href: "/map",
    pro: false,
  },
  {
    icon: <Sprout className="h-8 w-8 text-gc-accent" />,
    title: "Plant Index",
    description:
      "Comprehensive database with growing guides, planting windows, and localized tips.",
    href: "/plant-index",
    pro: false,
  },
  {
    icon: <Calendar className="h-8 w-8 text-gc-accent" />,
    title: "Smart Planting Calendar",
    description:
      "Automated schedules, reminders, and recurring tasks based on USDA Zone 6b–7a.",
    href: "/calendar",
    pro: false,
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-gc-accent" />,
    title: "Pest & Disease Alerts",
    description:
      "Local alerts with organic control recommendations for Frederick County gardeners.",
    href: "/pests",
    pro: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src={homepageBanner}
          alt="Garden background with trees, shrubs, and soil"
          fill
          className="object-cover z-0"
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        {/* Hero Content */}
        <div className="relative z-[2] container mx-auto px-4 py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Grow smarter with{" "}
              <span className="text-green-300" style={{ color: '#86efac' }}>GrowCommon</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              Weather intelligence, planting calendars, pest alerts, and
              horticultural therapy insights built specifically for our local
              gardening community.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/plant-index">
                <Button size="lg" className="group">
                  Explore Plants
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="group">
                  <LockBadge className="mr-2" />
                  Unlock Pro Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Everything you need to thrive in the garden
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tools, data, and guidance designed around Frederick’s microclimate,
            growing season, and community.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-large"
            >
              <div className="flex items-center justify-between">
                {feature.icon}
                {feature.pro ? <LockBadge /> : null}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {feature.description}
              </p>
              <span className="mt-6 inline-flex items-center text-sm font-medium text-gc-accent">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}







