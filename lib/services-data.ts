import type { ServiceCategory } from "@/lib/types";

export const servicesData: ServiceCategory[] = [
  {
    id: "vapt",
    name: "Vulnerability & Penetration Testing",
    description:
      "Comprehensive security testing to identify and remediate vulnerabilities.",
    services: [
      {
        id: "web-vapt",
        slug: "web-application-penetration-testing",
        name: "Web Application Penetration Testing",
        category: "vapt",
        shortDescription:
          "Test websites, e-commerce platforms, and portals for security flaws.",
        description:
          "Identify vulnerabilities in web applications through manual and automated testing, including OWASP Top 10 risks.",
      },
      {
        id: "api-vapt",
        slug: "api-penetration-testing",
        name: "API Penetration Testing",
        category: "vapt",
        shortDescription: "Identify weaknesses in REST and GraphQL APIs.",
        description:
          "Comprehensive API security assessment covering authentication, authorization, and data exposure.",
      },
      {
        id: "network-vapt",
        slug: "network-penetration-testing",
        name: "Network Penetration Testing",
        category: "vapt",
        shortDescription: "Assess internal and external network security.",
        description:
          "Simulate real-world attacks to identify network-level vulnerabilities and lateral movement risks.",
      },
      {
        id: "mobile-vapt",
        slug: "mobile-application-security-testing",
        name: "Mobile Application Security Testing",
        category: "vapt",
        shortDescription: "Security testing for Android and iOS applications.",
        description:
          "Detect vulnerabilities in mobile apps including insecure storage, weak encryption, and API misuse.",
      },
      {
        id: "cloud-vapt",
        slug: "cloud-security-testing",
        name: "Cloud Security Testing",
        category: "vapt",
        shortDescription: "Assess AWS, Azure, and GCP security.",
        description:
          "Identify misconfigurations, IAM issues, and data exposure risks in cloud environments.",
      },
      {
        id: "redteam",
        slug: "red-team-blue-team-exercises",
        name: "Red Team & Blue Team Exercises",
        category: "vapt",
        shortDescription: "Simulated attacks and defense training.",
        description:
          "Comprehensive adversarial simulations to test detection, response, and remediation capabilities.",
      },
    ],
  },
  {
    id: "audits",
    name: "Security Audits & Compliance",
    description:
      "Align your organization with industry standards and regulatory frameworks.",
    services: [
      {
        id: "iso27001",
        slug: "iso-27001-audit-consulting",
        name: "ISO 27001 Audit & Consulting",
        category: "audits",
        shortDescription: "Information security management system readiness.",
        description:
          "Achieve ISO 27001 readiness through comprehensive gap analysis and implementation guidance.",
      },
      {
        id: "soc2",
        slug: "soc-2-soc-1-audits",
        name: "SOC 2 / SOC 1 Audits",
        category: "audits",
        shortDescription:
          "Service Organization Control audits for SaaS and service providers.",
        description:
          "Meet SOC 2 Type I/II or SOC 1 requirements with end-to-end audit and compliance support.",
      },
      {
        id: "certin",
        slug: "cert-in-guidelines-compliance",
        name: "CERT-In Guidelines Compliance",
        category: "audits",
        shortDescription:
          "Indian cybersecurity advisory aligned to CERT-In frameworks.",
        description:
          "CERT-In guidelines compliance advisory for organizations operating in India.",
      },
      {
        id: "gdpr",
        slug: "gdpr-pci-dss-compliance-assessment",
        name: "GDPR / PCI-DSS Compliance Assessment",
        category: "audits",
        shortDescription:
          "Data protection and payment card security compliance.",
        description:
          "Assess readiness for GDPR, PCI-DSS, and data residency requirements.",
      },
      {
        id: "internal-audit",
        slug: "internal-it-security-audits",
        name: "Internal IT Security Audits",
        category: "audits",
        shortDescription: "Policy and procedure evaluation.",
        description:
          "Evaluate internal security policies, procedures, and technical controls.",
      },
      {
        id: "rbi",
        slug: "rbi-cybersecurity-it-compliance",
        name: "RBI Cybersecurity & IT Compliance",
        category: "audits",
        shortDescription: "Reserve Bank of India framework compliance.",
        description:
          "Align with RBI cybersecurity and IT risk management guidelines.",
      },
      {
        id: "sebi",
        slug: "sebi-compliance",
        name: "SEBI Compliance",
        category: "audits",
        shortDescription:
          "Securities and Exchange Board of India requirements.",
        description:
          "SEBI-aligned cybersecurity and business continuity framework implementation.",
      },
    ],
  },
  {
    id: "mss",
    name: "Managed Security Services",
    description: "Continuous security monitoring and management.",
    services: [
      {
        id: "managed-firewall",
        slug: "managed-firewall-ids-ips",
        name: "Managed Firewall & IDS/IPS",
        category: "mss",
        shortDescription: "Continuous network threat detection and prevention.",
        description:
          "Monitor and manage firewalls, IDS/IPS systems with 24/7 SOC support.",
      },
      {
        id: "edr",
        slug: "endpoint-detection-response-monitoring",
        name: "Endpoint Detection & Response (EDR)",
        category: "mss",
        shortDescription: "Advanced threat detection on endpoints.",
        description:
          "Real-time endpoint monitoring, threat hunting, and incident response.",
      },
      {
        id: "ti",
        slug: "threat-intelligence-monitoring-reporting",
        name: "Threat Intelligence & Reporting",
        category: "mss",
        shortDescription: "Actionable threat intelligence and SOC reporting.",
        description:
          "Continuous intelligence gathering, analysis, and threat correlation.",
      },
      {
        id: "vuln-mgmt",
        slug: "vulnerability-management-service",
        name: "Vulnerability Management as a Service",
        category: "mss",
        shortDescription:
          "Ongoing vulnerability scanning and remediation tracking.",
        description:
          "Continuous vulnerability assessment, prioritization, and remediation tracking.",
      },
    ],
  },
  {
    id: "cloud-infra",
    name: "Cloud & Infrastructure Security",
    description: "Secure your cloud and on-premises infrastructure.",
    services: [
      {
        id: "cloud-assess",
        slug: "cloud-security-assessment",
        name: "Cloud Security Assessment",
        category: "cloud-infra",
        shortDescription: "Identify misconfigurations and data leaks.",
        description:
          "Deep-dive assessment of AWS, Azure, GCP for security misconfigurations and data exposure.",
      },
      {
        id: "iam",
        slug: "iam-access-control-management",
        name: "IAM & Access Control Management",
        category: "cloud-infra",
        shortDescription: "Identity and access management implementation.",
        description:
          "Design and implement zero-trust IAM frameworks and access control policies.",
      },
      {
        id: "container",
        slug: "container-kubernetes-security",
        name: "Container & Kubernetes Security",
        category: "cloud-infra",
        shortDescription: "Secure containerized and orchestrated workloads.",
        description:
          "Harden container images, Kubernetes clusters, and orchestration platforms.",
      },
      {
        id: "infra-harden",
        slug: "infrastructure-hardening-security-policies",
        name: "Infrastructure Hardening & Policies",
        category: "cloud-infra",
        shortDescription: "Baseline security and hardening standards.",
        description:
          "Implement security baselines, CIS benchmarks, and hardening policies.",
      },
    ],
  },
  {
    id: "awareness",
    name: "Security Awareness & Training",
    description: "Build a security-conscious organization.",
    services: [
      {
        id: "phishing",
        slug: "phishing-awareness-programs",
        name: "Phishing Awareness Programs",
        category: "awareness",
        shortDescription: "Simulated phishing and awareness training.",
        description:
          "Conduct phishing simulations and provide targeted security awareness training.",
      },
      {
        id: "training",
        slug: "security-training-employees",
        name: "Security Training for Employees",
        category: "awareness",
        shortDescription: "Role-based security training programs.",
        description:
          "Comprehensive security training tailored to employee roles and responsibilities.",
      },
      {
        id: "hygiene",
        slug: "cyber-hygiene-workshops",
        name: "Cyber Hygiene Workshops",
        category: "awareness",
        shortDescription: "Practical security best practices.",
        description:
          "Hands-on workshops on password management, secure communication, and incident response.",
      },
      {
        id: "se-sim",
        slug: "social-engineering-attack-simulation",
        name: "Social Engineering Attack Simulation",
        category: "awareness",
        shortDescription: "Real-world social engineering testing.",
        description:
          "Simulate social engineering attacks (phishing, pretexting, vishing) to identify vulnerabilities.",
      },
    ],
  },
  {
    id: "specialized",
    name: "Specialized Services",
    description: "Niche security solutions for emerging threats.",
    services: [
      {
        id: "asm",
        slug: "attack-surface-management",
        name: "Attack Surface Management (ASM)",
        category: "specialized",
        shortDescription: "Continuous monitoring of external assets.",
        description:
          "Discover, inventory, and monitor external-facing assets and shadow IT.",
      },
      {
        id: "darkweb",
        slug: "dark-web-monitoring",
        name: "Dark Web Monitoring",
        category: "specialized",
        shortDescription: "Detect credential leaks and breaches.",
        description:
          "Monitor dark web and paste sites for leaked credentials, data, and organizational mentions.",
      },
      {
        id: "antiphish",
        slug: "anti-phishing-anti-rogue",
        name: "Anti-Phishing & Anti-Rogue",
        category: "specialized",
        shortDescription: "Protect against phishing and rogue apps.",
        description:
          "Detect and takedown phishing domains, unauthorized apps, and counterfeit platforms.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  for (const category of servicesData) {
    const service = category.services.find((s) => s.slug === slug);
    if (service) return service;
  }
  return null;
}

export function getAllServices() {
  return servicesData.flatMap((cat) => cat.services);
}
