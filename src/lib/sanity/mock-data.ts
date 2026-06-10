import type { PortableTextBlock } from "@portabletext/types";
import type { BlogPost, CaseStudy } from "@/types/cms";

export const mockBlogBodies: Record<string, PortableTextBlock[]> = {
  "governed-ai-pipelines": [
    {
      _type: "block",
      _key: "intro",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Enterprise AI adoption has reached an inflection point. Organizations that successfully bridge the gap between prototype and production are capturing disproportionate value — but the path is fraught with governance, infrastructure, and talent challenges.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "s2", text: "The Governance Imperative", marks: [] }],
    },
    {
      _type: "block",
      _key: "p2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s3",
          text: "Every model deployed to production needs an audit trail. Feature lineage, training data provenance, and inference logging aren't optional extras — they're the foundation of trustworthy AI at scale. NexaForge encodes these requirements as platform primitives, not afterthoughts.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2b",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "s4", text: "From Notebook to Production", marks: [] }],
    },
    {
      _type: "block",
      _key: "p3",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s5",
          text: "The typical enterprise journey spans six to eighteen months: data engineering, feature store setup, model registry configuration, CI/CD pipeline wiring, and compliance review. With a governed platform layer, teams compress that timeline to weeks while improving auditability at every step.",
          marks: [],
        },
      ],
    },
  ],
  "legacy-modernization": [
    {
      _type: "block",
      _key: "intro",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Legacy core systems are the silent tax on enterprise innovation. Every new product feature, every regulatory change, every integration request runs through decades of accumulated complexity — and the teams who understand those systems are retiring faster than replacements can be hired.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "s2", text: "The Strangler Fig Pattern at Scale", marks: [] }],
    },
    {
      _type: "block",
      _key: "p2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s3",
          text: "Rather than big-bang rewrites that risk business continuity, we use incremental extraction: identify bounded contexts, build cloud-native replacements behind API facades, and migrate traffic gradually. Each phase delivers measurable value while reducing operational risk.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "p3",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s4",
          text: "Our teams have migrated COBOL batch jobs to event-driven microservices, mainframe transaction logs to real-time streams, and monolithic Java EARs to containerized services — all without a single minute of unplanned downtime.",
          marks: [],
        },
      ],
    },
  ],
  "data-mesh-regulated": [
    {
      _type: "block",
      _key: "intro",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Regulated industries face a paradox: compliance demands centralized control, while agility demands decentralized ownership. The data mesh architecture resolves this tension by distributing data product ownership to domain teams while maintaining federated governance.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "h2",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "s2", text: "Federated Governance in Practice", marks: [] }],
    },
    {
      _type: "block",
      _key: "p2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s3",
          text: "Policy-as-code engines evaluate every data access request, schema change, and pipeline deployment against organizational standards. Domain teams retain autonomy over their data products while the platform enforces classification, lineage, and retention policies automatically.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "p3",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s4",
          text: "For healthcare clients, this means HIPAA-compliant data zones with automatic PHI detection. For financial services, it means SOX-ready audit trails on every transformation. The mesh adapts to your regulatory landscape without custom plumbing per domain.",
          marks: [],
        },
      ],
    },
  ],
};

export const postCoverGradients: Record<string, string> = {
  "governed-ai-pipelines": "from-indigo-600/40 via-violet-900/30 to-[#0a0a0b]",
  "legacy-modernization": "from-blue-600/30 via-slate-800/40 to-[#0a0a0b]",
  "data-mesh-regulated": "from-emerald-600/30 via-teal-900/30 to-[#0a0a0b]",
};

export const mockBlogPosts: BlogPost[] = [
  {
    _id: "mock-1",
    title: "Building Governed AI Pipelines at Enterprise Scale",
    slug: "governed-ai-pipelines",
    author: "Elena Vasquez",
    tags: ["AI", "Engineering", "Governance"],
    publishedAt: "2025-11-12T10:00:00Z",
    excerpt:
      "How NexaForge helps Fortune 500 teams move from prototype to production with auditable AI workflows.",
    coverImage: null,
    body: mockBlogBodies["governed-ai-pipelines"],
  },
  {
    _id: "mock-2",
    title: "Modernizing Legacy Core Systems Without Downtime",
    slug: "legacy-modernization",
    author: "Marcus Chen",
    tags: ["Modernization", "Cloud"],
    publishedAt: "2025-10-28T14:30:00Z",
    excerpt:
      "A phased approach to core system migration that preserves business continuity while unlocking cloud-native capabilities.",
    coverImage: null,
    body: mockBlogBodies["legacy-modernization"],
  },
  {
    _id: "mock-3",
    title: "The Data Mesh Playbook for Regulated Industries",
    slug: "data-mesh-regulated",
    author: "Priya Sharma",
    tags: ["Data", "Architecture"],
    publishedAt: "2025-10-15T09:00:00Z",
    excerpt:
      "Designing federated data architectures that satisfy compliance requirements without sacrificing agility.",
    coverImage: null,
    body: mockBlogBodies["data-mesh-regulated"],
  },
];

export const mockCaseStudies: CaseStudy[] = [
  {
    _id: "cs-1",
    title: "Global Bank AI Transformation",
    slug: "global-bank-ai",
    client: "Meridian Financial",
    industry: "Financial Services",
    challenge:
      "Legacy risk models couldn't scale to real-time fraud detection across 40M daily transactions.",
    solution:
      "Deployed a governed ML pipeline with NexaForge's AI platform, integrating with existing core banking systems.",
    results:
      "Reduced false positives by 62% while cutting fraud losses by $18M annually.",
    metrics: [
      { label: "Fraud Reduction", value: "62%" },
      { label: "Annual Savings", value: "$18M" },
      { label: "Deployment Time", value: "12 weeks" },
    ],
    publishedAt: "2025-09-01T00:00:00Z",
    coverImage: null,
  },
];
