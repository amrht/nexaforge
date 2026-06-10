export interface Service {
  id: string;
  title: string;
  description: string;
  category: "consulting" | "engineering" | "data" | "ai" | "cloud" | "security";
  icon: string;
}

export const services: Service[] = [
  {
    id: "consulting",
    title: "Consulting & Engineering",
    description:
      "Strategic technology advisory and full-stack engineering teams embedded in your organization.",
    category: "consulting",
    icon: "globe",
  },
  {
    id: "ai-platform",
    title: "AI Platform Engineering",
    description:
      "End-to-end ML infrastructure from model training to governed production deployment.",
    category: "ai",
    icon: "brain",
  },
  {
    id: "data-mesh",
    title: "Connected Data Architecture",
    description:
      "Federated data mesh design with real-time pipelines and enterprise-grade governance.",
    category: "data",
    icon: "database",
  },
  {
    id: "modernization",
    title: "Core Modernization",
    description:
      "Phased legacy migration to cloud-native architectures without business disruption.",
    category: "engineering",
    icon: "layers",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "Multi-cloud infrastructure, CI/CD automation, and observability at scale.",
    category: "cloud",
    icon: "cloud",
  },
  {
    id: "security",
    title: "Security & Compliance",
    description:
      "Zero-trust architecture, SOC2 readiness, and regulatory compliance frameworks.",
    category: "security",
    icon: "shield",
  },
];
