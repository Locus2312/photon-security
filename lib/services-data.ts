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
        headline: "Secure Your Web Applications Before Attackers Exploit Them.",
        subheadline: "Deep manual and automated testing to eliminate logic flaws, vulnerabilities, and data leak vectors in your web platforms.",
        serviceOverview: "Custom web applications are the primary target for modern cyberattacks. Our Web Application Penetration Testing service simulates real-world adversary tactics to uncover hidden critical bugs in your web perimeter. We don't just rely on automated scanners; our experts perform heavy manual testing to locate complex business logic flaws.",
        whatWeTest: [
          { title: "OWASP Top 10 Risks", description: "Injection flaws (SQLi), Cross-Site Scripting (XSS), and Broken Authentication." },
          { title: "Business Logic Vulnerabilities", description: "Finding flaws in workflows that automated tools routinely miss." },
          { title: "Session Management", description: "Verifying cookie security, session timeouts, and token security." },
          { title: "Access Control Mechanics", description: "Ensuring users cannot escalate privileges or view other clients' data." }
        ],
        deliverables: [
          { title: "Regulatory Compliance", description: "Instantly satisfies compliance mandates for PCI DSS, SOC 2, and HIPAA." },
          { title: "Detailed Remediation Report", description: "Comprehensive developer-friendly proof of concepts to patch bugs quickly." },
          { title: "Executive Summary", description: "Clear, high-level risk overview tailored for C-suite decision-makers." }
        ]
      },
      {
        id: "api-vapt",
        slug: "api-penetration-testing",
        name: "API Penetration Testing",
        category: "vapt",
        shortDescription: "Identify weaknesses in REST and GraphQL APIs.",
        description:
          "Comprehensive API security assessment covering authentication, authorization, and data exposure.",
        headline: "Secure the Data Exchange Layer Connecting Your Digital Ecosystem.",
        subheadline: "Specialized security assessments for REST, GraphQL, and SOAP endpoints to block unauthorized data extraction.",
        serviceOverview: "Modern apps rely on APIs, making them high-value targets for attackers seeking back-door access to backend data. Our API Penetration Testing isolates your endpoints, analyzes authentication handshakes, and stress-tests your microservices infrastructure. We ensure that your data pipelines remain strictly locked down against unauthorized exposure.",
        whatWeTest: [
          { title: "OWASP API Security Top 10", description: "Targeting BOLA (Broken Object Level Authorization) and mass assignment flaws." },
          { title: "Authentication & Authorization", description: "Breaking down JWT, OAuth, and API key mechanics." },
          { title: "Rate Limiting & DoS Protection", description: "Testing server resilience against endpoint flooding and heavy payloads." },
          { title: "Data Input Validation", description: "Injecting malicious payloads directly into endpoint processing layers." }
        ],
        deliverables: [
          { title: "Safe Ecosystem Integrations", description: "Builds trust for third-party vendors and partners connecting to your network." },
          { title: "Data Leak Mitigation", description: "Directly blocks automated scrapers and attackers trying to harvest database records." },
          { title: "Post-Remediation Verification", description: "Complimentary re-test to confirm all API patches were successfully implemented." }
        ]
      },
      {
        id: "network-vapt",
        slug: "network-penetration-testing",
        name: "Network Penetration Testing",
        category: "vapt",
        shortDescription: "Assess internal and external network security.",
        description:
          "Simulate real-world attacks to identify network-level vulnerabilities and lateral movement risks.",
        headline: "Fortify Your Corporate Network Boundaries and Internal Assets.",
        subheadline: "Advanced internal and external infrastructure assessments to locate and block exploit pathways.",
        serviceOverview: "A single unpatched server or misconfigured router can compromise your entire business network. Our Network Penetration Testing service comprehensively maps out your infrastructure attack surface. We identify outdated software, default system credentials, and architecture weak spots, providing a blueprint to completely close entry points.",
        whatWeTest: [
          { title: "External Perimeter Security", description: "Firewalls, external IPs, routers, and remote access gateways (VPNs)." },
          { title: "Internal Network Architecture", description: "Lateral movement pathways, Active Directory security, and network segregation." },
          { title: "Wireless Network Security", description: "Testing rogue access points, weak encryption protocols, and guest network isolation." },
          { title: "Patch & Configuration Management", description: "Locating unpatched systems and insecure default configurations." }
        ],
        deliverables: [
          { title: "Ransomware Prevention", description: "Stops attackers from gaining initial network footholds and spreading malicious software." },
          { title: "Validated Network Security Stance", description: "Confirms your infrastructure defense can withstand modern automated network attacks." },
          { title: "Strategic IT Roadmap", description: "Prioritized list of technical remediation tasks ordered by real-world business impact risk." }
        ]
      },
      {
        id: "mobile-vapt",
        slug: "mobile-application-security-testing",
        name: "Mobile Application Security Testing",
        category: "vapt",
        shortDescription: "Security testing for Android and iOS applications.",
        description:
          "Detect vulnerabilities in mobile apps including insecure storage, weak encryption, and API misuse.",
        headline: "Complete Security Testing for iOS and Android Applications.",
        subheadline: "Protecting your client-side mobile applications, stored on-device data, and cellular network transmissions.",
        serviceOverview: "Mobile applications run directly on untrusted user devices, creating high exposure to code reverse-engineering and local data harvesting. Our Mobile Application Security Testing combines static code analysis (SAST) with dynamic runtime analysis (DAST). We pinpoint flaws hidden inside binaries, device storage, and transit layers.",
        whatWeTest: [
          { title: "OWASP Mobile Top 10", description: "Pinpointing insecure data storage, weak cryptography, and client-side code injection." },
          { title: "Reverse-Engineering Resilience", description: "Evaluating code obfuscation strength and binary modification defenses." },
          { title: "Local Data Storage Audit", description: "Scanning device storage, logs, and caches for leaked PII or access tokens." },
          { title: "API Communication Integrity", description: "Inspecting SSL/TLS implementation and verifying certificate pinning security." }
        ],
        deliverables: [
          { title: "App Store Trust", description: "Ensures your code clears stringent Google Play and Apple App Store compliance reviews." },
          { title: "Intellectual Property Protection", description: "Safeguards your core business logic and proprietary mobile code from competitors." },
          { title: "End-User Privacy", description: "Protects your customer base from local device data theft through compromised phones." }
        ]
      },
      {
        id: "cloud-vapt",
        slug: "cloud-security-testing",
        name: "Cloud Security Testing",
        category: "vapt",
        shortDescription: "Assess AWS, Azure, and GCP security.",
        description:
          "Identify misconfigurations, IAM issues, and data exposure risks in cloud environments.",
        headline: "Eliminate Complex Misconfigurations Across Cloud Architectures.",
        subheadline: "Deep security auditing and exploitation analysis for AWS, Microsoft Azure, and GCP environments.",
        serviceOverview: "Cloud breaches are almost always caused by simple configuration oversights rather than architecture design flaws. Our Cloud Security Testing service evaluates your exact multi-tenant posture. We blend deep configuration auditing with active platform threat emulation to ensure your cloud workloads, data storage, and access keys are perfectly defended.",
        whatWeTest: [
          { title: "Cloud Infrastructure Architecture", description: "Auditing misconfigured AWS S3 buckets, Azure Blobs, and exposed public assets." },
          { title: "Identity & Access Management (IAM)", description: "Pinpointing over-privileged roles, weak MFA policies, and privilege escalation vulnerabilities." },
          { title: "Container & Kubernetes Deployments", description: "Evaluating Docker images, orchestration rules, and microservice cluster boundaries." },
          { title: "Secret & Key Management", description: "Locating exposed programmatic keys, hardcoded passwords, and unencrypted parameters." }
        ],
        deliverables: [
          { title: "Devastating Breach Prevention", description: "Blocks attackers from accessing or downloading sensitive cloud-hosted databases." },
          { title: "Cloud Governance Alignment", description: "Instantly maps cloud infrastructure to industry frameworks like CIS Benchmarks." },
          { title: "Optimized Defense Spend", description: "Simplifies visibility so your team spends engineering time only on critical infrastructure vulnerabilities." }
        ]
      },
      {
        id: "redteam",
        slug: "red-team-blue-team-exercises",
        name: "Red Team & Blue Team Exercises",
        category: "vapt",
        shortDescription: "Simulated attacks and defense training.",
        description:
          "Comprehensive adversarial simulations to test detection, response, and remediation capabilities.",
        headline: "Ultimate Adversarial Simulations to Mature Your Incident Response.",
        subheadline: "Testing real-world operational readiness by pitting offensive simulation experts against active defenses.",
        serviceOverview: "Real threat actors do not follow narrow scoping rules. Our Red Team & Blue Team exercises provide the highest tier of security validation. We launch stealthy, multi-vector attacks against your company (Red Teaming) while actively working with or measuring your internal IT defense speed, detection mechanics, and containment capabilities (Blue Teaming).",
        whatWeTest: [
          { title: "Full-Scale Attack Emulation", description: "Executing stealthy multi-month cyber campaigns mimicking specific advanced persistence threats (APTs)." },
          { title: "Social Engineering & Phishing", description: "Stress-testing employee training with spear-phishing, vishing, or physical tailgating." },
          { title: "Detection & Alerting Optimization", description: "Auditing SIEM, EDR, and SOC setups to ensure malicious activity triggers warnings." },
          { title: "Incident Containment Timelines", description: "Measuring the exact minutes taken to identify, triage, and completely isolate active network attacks." }
        ],
        deliverables: [
          { title: "Validated Crisis Readiness", description: "Proves exactly how your organization will handle a real, full-scale breach scenario." },
          { title: "SOC & Blue Team Upgrades", description: "Concrete feedback data allowing internal defenders to tune detection thresholds immediately." },
          { title: "Maximized Security ROI", description: "Identifies whether highly expensive security software is actually working under real battlefield stress." }
        ]
      }
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
      {
        id: "ad-managed",
        slug: "active-directory-managed-security-support",
        name: "Active Directory Managed Security & Support",
        category: "mss",
        shortDescription: "Secure and optimize your AD infrastructure.",
        description:
          "Comprehensive Active Directory security monitoring, hardening, GPO management, and 24/7 support to prevent unauthorized access and privilege escalation.",
      },
      {
        id: "patch-mgmt",
        slug: "managed-security-patch-operations",
        name: "Managed Security Patch Operations",
        category: "mss",
        shortDescription:
          "Automated patch management and vulnerability closure.",
        description:
          "Proactive patch deployment, testing, and rollback procedures for operating systems, applications, and infrastructure with minimal downtime.",
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
    id: "compliance",
    name: "Compliance & Frameworks",
    description: "Regulatory compliance and security framework implementation.",
    services: [
      {
        id: "iso-27001",
        slug: "iso-27001-readiness",
        name: "ISO 27001 Readiness",
        category: "compliance",
        shortDescription:
          "Information security management system implementation and audit readiness.",
        description:
          "Comprehensive ISO 27001 implementation support including gap assessment, policy development, control implementation, and audit preparation to achieve certification readiness.",
        features: [
          "Gap assessment",
          "Policy development",
          "Control implementation",
          "Audit preparation",
        ],
      },

      {
        id: "cis-benchmark",
        slug: "cis-benchmark-compliance",
        name: "CIS Benchmark Compliance",
        category: "compliance",
        shortDescription:
          "Industry-standard security configuration baselines for servers, databases, and network devices.",
        description:
          "Implement and maintain CIS benchmark compliance through security configuration implementation, baseline hardening, continuous compliance monitoring, and remediation guidance.",
        features: [
          "Security configuration implementation",
          "Baseline hardening",
          "Continuous compliance monitoring",
          "Remediation guidance",
        ],
      },
      {
        id: "vapt-remediation",
        slug: "vapt-remediation-audit-closure-support",
        name: "VAPT Remediation & Audit Closure Support",
        category: "compliance",
        shortDescription:
          "Post-assessment remediation and verification support.",
        description:
          "Expert support for vulnerability remediation and audit closure including guidance on fixing vulnerabilities, security controls implementation, re-testing validation, and audit closure support.",
        features: [
          "Expert guidance on fixing vulnerabilities",
          "Security controls implementation",
          "Re-testing validation",
          "Audit closure support",
        ],
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
