import MagneticButton from "@/components/ui/MagneticButton";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0b] px-6 py-32 md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-white md:text-5xl">
          Ready to transform your engineering stack?
        </h2>
        <p className="mt-6 text-lg text-muted">
          Let&apos;s discuss how NexaForge can accelerate your path from legacy to AI-native.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton href="/contact" variant="primary">
            Start a Conversation
          </MagneticButton>
          <MagneticButton href="/case-studies" variant="outline">
            View Case Studies
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
