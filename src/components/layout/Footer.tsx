import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">
            nexa<span className="text-accent">forge</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Premium B2B enterprise AI and IT services. From legacy to governed production.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/40">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/40">
              Connect
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="https://linkedin.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-8 text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} NexaForge. All rights reserved.
      </div>
    </footer>
  );
}
