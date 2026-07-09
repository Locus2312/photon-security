import type { ServiceCategory } from "@/lib/types";

export const servicesData: ServiceCategory[] = [
  {
    id: "vapt",
    name: "Vulnerability & Penetration Testing",
    description: "Comprehensive security testing to identify and remediate vulnerabilities.",
    services: [
      {
        id: "web-vapt",
        slug: "web-application-penetration-testing",
        name: "Web Application Penetration Testing",
        category: "vapt",
        shortDescription: "Test websites, e-commerce platforms, and portals for security flaws.",
        description: "Manual, adversarial testing of your web applications — authentication, business logic, and data flows — validated the way a real attacker would approach them.",
        headline: "Secure Your Web Applications Before Attackers Exploit Them",
        subheadline: "Manual, adversarial testing of your web applications — authentication, business logic, and data flows — validated the way a real attacker would approach them.",
        serviceOverview: "Web applications are the most exposed, most frequently changed, and most attacked surface most organizations operate. Every deployment, every new feature, every third-party integration introduces new risk. Our Web Application Penetration Testing service goes beyond automated scanning — our consultants manually explore your application's logic, authentication flows, and access control boundaries the way a real attacker would, uncovering issues that tools alone consistently miss.",
        whatWeTest: [
          { title: "Authentication & session management", description: "Login flows, password reset, MFA bypass attempts." },
          { title: "Authorization & role-based access control", description: "Testing across every user tier." },
          { title: "Input validation and data sanitization", description: "Layers across all forms and parameters." },
          { title: "File upload", description: "And document processing functionality." },
          { title: "Payment gateways", description: "And transaction workflows." },
          { title: "Third-party integrations", description: "Webhooks, and embedded widgets." },
          { title: "Business logic", description: "Discount abuse, workflow bypass, quantity/price manipulation." },
          { title: "API endpoints", description: "Consumed directly by the frontend application." }
        ],
        technologiesCovered: "React, Angular, Vue, Node.js, PHP/Laravel, Django/Python, Java/Spring Boot, .NET, WordPress & CMS platforms, Headless/JAMstack",
        commonVulnerabilities: "SQL Injection, Cross-Site Scripting (XSS), Broken Authentication, IDOR, CSRF, SSRF, File Upload Bypass, Business Logic Flaws, Security Misconfiguration, Sensitive Data Exposure, Clickjacking, Open Redirect",
        methodology: [
          { title: "Scoping & Application Walkthrough", description: "Understand user roles, core workflows, and business-critical functions before testing begins." },
          { title: "Authenticated Crawl & Mapping", description: "Map every accessible endpoint across all user roles, including hidden and admin-only paths." },
          { title: "Automated Baseline Scan", description: "Surface known technical issues quickly across the full attack surface." },
          { title: "Manual Logic & Auth Testing", description: "Test authentication, session handling, and role boundaries by hand." },
          { title: "Business Logic Abuse Testing", description: "Attempt workflow bypass, price manipulation, and multi-step process abuse unique to your application." },
          { title: "Exploitation & Chaining", description: "Combine findings to demonstrate real, end-to-end business impact." },
          { title: "Reporting & Risk Rating", description: "Document findings with CVSS scores, PoC evidence, and developer-ready remediation steps." },
          { title: "Retesting", description: "Verify each fix closes the reported issue completely." }
        ],
        deliverables: [
          { title: "Protect Customer Data", description: "Protect customer data and revenue-generating workflows from exploitation." },
          { title: "Reduce Breach Liability", description: "Reduce breach liability ahead of regulatory or contractual audits." },
          { title: "Support Compliance", description: "Support PCI DSS and ISO 27001 technical control requirements." },
          { title: "Build Enterprise Trust", description: "Pass customer security questionnaires with a credible, recent report." }
        ],
        faqs: [
          { question: "Do you test both authenticated and unauthenticated areas of the application?", answer: "Yes. We test every user role — anonymous visitors, registered users, and administrators — since access control failures often only appear when comparing behavior across roles." },
          { question: "Can you test a staging environment instead of production?", answer: "Yes, and we recommend it for higher-risk testing activities. We'll advise which parts of testing are safe for production versus better suited to staging during scoping." },
          { question: "How do you handle payment gateway testing without processing real transactions?", answer: "We work with your team to use sandbox/test-mode payment credentials wherever the provider supports it, avoiding any real financial transactions during testing." },
          { question: "Will you test our WordPress plugins and third-party integrations?", answer: "Yes, third-party plugins and integrations are included in scope by default unless explicitly excluded, since they're a common source of exploitable vulnerabilities." },
          { question: "What happens if you find a critical vulnerability mid-engagement?", answer: "We notify your team immediately, out of band from the final report, so remediation can begin without waiting for the full engagement to conclude." },
          { question: "Do you provide source-code-assisted (grey-box) testing?", answer: "Yes. Grey-box testing, where our consultants review relevant source code alongside black-box testing, is available and typically surfaces deeper logic flaws faster." },
          { question: "How is severity assigned to business logic flaws that don't have a CVSS precedent?", answer: "We manually assess business logic findings against your specific revenue and data-risk context, assigning a severity rating with clear justification rather than forcing them into generic CVSS categories." },
          { question: "Can this testing help us pass an enterprise customer's security questionnaire?", answer: "Yes — our report and completion certificate are commonly used by clients to satisfy vendor security assessments and questionnaires from enterprise customers." }
        ]
      },
      {
        id: "api-vapt",
        slug: "api-penetration-testing",
        name: "API Penetration Testing",
        category: "vapt",
        shortDescription: "Identify weaknesses in REST and GraphQL APIs.",
        description: "Manually testing REST, SOAP, and GraphQL APIs for authentication flaws, broken authorization, and data exposure — the layer your mobile apps, partners, and integrations all depend on.",
        headline: "Secure Your APIs",
        subheadline: "Manually testing REST, SOAP, and GraphQL APIs for authentication flaws, broken authorization, and data exposure.",
        serviceOverview: "APIs now carry the majority of application logic and data exchange — yet because they have no visual UI, they're frequently under-tested by generic scanning tools. Our API Penetration Testing service manually probes REST, SOAP, and GraphQL APIs for authentication weaknesses, authorization bypass, and data exposure risks, using the same techniques a real attacker would use against your integration layer.",
        whatWeTest: [
          { title: "REST APIs", description: "Endpoint enumeration, parameter tampering, rate-limit bypass, mass assignment." },
          { title: "SOAP APIs", description: "XML-based injection, XXE, WSDL exposure review." },
          { title: "GraphQL APIs", description: "Introspection abuse, nested query denial-of-service, field-level authorization gaps." },
          { title: "JWT", description: "Signature bypass, algorithm confusion (alg:none), token replay, weak secret brute-forcing." },
          { title: "OAuth", description: "Redirect URI manipulation, token leakage, scope escalation." },
          { title: "Broken Authentication", description: "Credential stuffing resistance, session fixation, missing MFA enforcement." },
          { title: "Authorization", description: "Object-level (BOLA) and function-level (BFLA) access control testing." }
        ],
        technologiesCovered: "REST, GraphQL, SOAP/XML, JWT, OAuth 2.0/OIDC, API Gateways (Kong, Apigee, AWS API Gateway), Webhook Architectures",
        commonVulnerabilities: "Broken Object Level Authorization (BOLA), Broken Function Level Authorization, Excessive Data Exposure, Lack of Rate Limiting, Mass Assignment, Improper Asset Management (Shadow APIs), Injection Flaws, Security Misconfiguration, Broken Authentication",
        methodology: [
          { title: "API Inventory & Documentation Review", description: "Collect Swagger/OpenAPI specs, Postman collections, or reverse-engineer endpoints where documentation is unavailable." },
          { title: "Authentication & Token Analysis", description: "Test JWT/OAuth implementation strength, expiry handling, and signature validation." },
          { title: "Endpoint Enumeration", description: "Identify undocumented, deprecated, or 'shadow' endpoints still live in production." },
          { title: "Authorization Testing (BOLA/BFLA)", description: "Attempt to access or modify other users' objects and privileged functions." },
          { title: "Injection & Data Exposure Testing", description: "Probe parameters, headers, and query structures for injection and excessive data return." },
          { title: "Rate Limit & Abuse Testing", description: "Validate throttling, pagination limits, and resource exhaustion protections." },
          { title: "Reporting & Risk Rating", description: "CVSS-rated findings mapped directly to affected endpoints and business functions." },
          { title: "Retesting", description: "Confirm authorization and authentication fixes hold under repeated testing." }
        ],
        deliverables: [
          { title: "Secure Data Layer", description: "Secures the data layer underpinning your mobile apps, partner integrations, and public API products." },
          { title: "Prevent Data Exposure", description: "Prevents large-scale data exposure incidents caused by broken object-level authorization." },
          { title: "API Monetization", description: "Supports secure API monetization for SaaS and platform businesses." },
          { title: "Close Shadow API Risk", description: "Undocumented endpoints are a leading source of undetected breaches." }
        ],
        faqs: [
          { question: "Do we need to provide API documentation before testing begins?", answer: "It helps significantly but isn't mandatory. If documentation isn't available, our consultants will reverse-engineer the API surface through traffic analysis and manual exploration during scoping." },
          { question: "Can you test GraphQL APIs with introspection disabled?", answer: "Yes. We use alternative enumeration techniques — including query batching analysis and error-based inference — to map schema structure even when introspection is turned off." },
          { question: "How do you test rate limiting without disrupting our production service?", answer: "We coordinate rate-limit testing during low-traffic windows and use controlled, incremental testing to avoid triggering unintended service degradation." },
          { question: "What is BOLA and why does it matter?", answer: "Broken Object Level Authorization occurs when an API fails to verify that a user is authorized to access a specific object (e.g., another user's order or profile) — it's currently the top-ranked risk in the OWASP API Security Top 10." },
          { question: "Do you test third-party APIs we integrate with, or only our own?", answer: "Our primary scope is APIs you own and operate. We can review the security implications of third-party integrations but generally cannot directly test infrastructure outside your control without the third party's authorization." },
          { question: "Can you assess our API gateway configuration as part of this engagement?", answer: "Yes, API gateway configuration (rate limiting, authentication enforcement, routing rules) is typically included as part of a full API penetration test scope." },
          { question: "How do you handle JWT secret testing without knowing the secret in advance?", answer: "We attempt controlled offline brute-forcing and algorithm-confusion testing using industry-standard wordlists and techniques, without impacting live token validity for real users." },
          { question: "Is mobile app API testing included, or is that a separate service?", answer: "API testing for a mobile app's backend can be scoped either as part of this service or bundled with our Mobile Application Security Testing engagement — we'll recommend the right structure during scoping." }
        ]
      },
      {
        id: "network-vapt",
        slug: "network-penetration-testing",
        name: "Network Penetration Testing",
        category: "vapt",
        shortDescription: "Assess internal and external network security.",
        description: "Simulating both an external attacker at your perimeter and a compromised insider moving laterally — to prove whether your segmentation and defenses actually hold.",
        headline: "Request a Network Security Assessment",
        subheadline: "Simulating both an external attacker at your perimeter and a compromised insider moving laterally.",
        serviceOverview: "Network Penetration Testing evaluates the security of the infrastructure connecting your organization together — the systems, protocols, and configurations attackers target once they gain any initial foothold. We simulate both an external attacker probing your internet-facing perimeter and an insider or compromised endpoint attempting to move laterally toward your most sensitive systems.",
        whatWeTest: [
          { title: "Internal Network", description: "Lateral movement paths, segmentation validation, insider-threat simulation." },
          { title: "External Network", description: "Perimeter exposure, open port and service enumeration, internet-facing asset review." },
          { title: "Active Directory", description: "Kerberoasting, misconfigured GPOs, privilege escalation paths, domain admin compromise scenarios." },
          { title: "Firewall Rule Review", description: "Analysis of rule sets for overly permissive or redundant entries." },
          { title: "VPN Assessment", description: "Authentication strength, split-tunneling risk, protocol-level vulnerabilities." },
          { title: "Server Assessment", description: "OS hardening review, patch levels, service misconfigurations." },
          { title: "Wireless Testing", description: "Rogue access point detection, WPA2/WPA3 weaknesses, guest network segregation." },
          { title: "Privilege Escalation", description: "Mapping realistic paths from initial foothold to domain admin or root." }
        ],
        technologiesCovered: "Windows Active Directory, Linux/Unix Server Environments, Cisco/Fortinet/Palo Alto Firewalls, VPN Gateways, Enterprise Wi-Fi (WPA2/WPA3), On-Premise Data Center Infrastructure",
        commonVulnerabilities: "Weak/Default Credentials, Kerberoasting-Vulnerable Accounts, Misconfigured Firewall Rules, Unpatched Services, Insecure Protocols (SMBv1, Telnet), Privilege Escalation Paths, Weak Wireless Encryption, Insufficient Network Segmentation",
        methodology: [
          { title: "Scoping & Rules of Engagement", description: "Define IP ranges, testing windows, and any systems explicitly out of scope." },
          { title: "External Reconnaissance", description: "Enumerate internet-facing assets, open ports, and exposed services." },
          { title: "Internal Foothold Simulation", description: "Begin testing from a simulated compromised endpoint or on-site connection point." },
          { title: "Active Directory Enumeration", description: "Map domain trust relationships, group memberships, and misconfigurations." },
          { title: "Lateral Movement Testing", description: "Attempt to pivot from initial access toward higher-value systems." },
          { title: "Privilege Escalation", description: "Chain misconfigurations toward domain admin or root-level access." },
          { title: "Firewall & VPN Configuration Review", description: "Assess rule sets and remote access security independently of live exploitation." },
          { title: "Reporting & Risk Rating", description: "Document the full attack path with network diagrams, evidence, and prioritized fixes." },
          { title: "Retesting", description: "Re-verify that segmentation and privilege paths have been properly remediated." }
        ],
        deliverables: [
          { title: "Validate Real Segmentation", description: "Confirms whether a single compromised endpoint can actually reach domain admin." },
          { title: "Reduce Dwell-Time Risk", description: "In the event of a genuine intrusion." },
          { title: "Strengthen Perimeter Defenses", description: "Against internet-facing reconnaissance and exploitation." },
          { title: "Support Compliance", description: "RBI, ISO 27001, and PCI DSS network security control requirements." }
        ],
        faqs: [
          { question: "Will network testing cause downtime on production systems?", answer: "We design testing to avoid service disruption wherever possible. Higher-risk activities (e.g., testing against fragile legacy services) are scheduled with your team's input and conducted with caution." },
          { question: "Do you test on-site, remotely, or both?", answer: "Both models are supported. External network testing is typically remote; internal testing can be performed on-site or remotely via a secure jump-box/VPN connection your team provisions for us." },
          { question: "What's included in an Active Directory assessment specifically?", answer: "We review domain trust configurations, group policy objects, service account permissions, Kerberos ticket handling, and common misconfigurations that lead to privilege escalation or domain compromise." },
          { question: "Can you test our wireless network without physical access to our office?", answer: "Wireless testing generally requires physical proximity to your access points, so on-site testing is required for this specific component; other network testing can often proceed remotely in parallel." },
          { question: "How do you avoid false positives in firewall rule reviews?", answer: "Firewall rules are manually reviewed against your actual network architecture and business intent — not just flagged automatically — so every finding reflects a real, actionable misconfiguration." },
          { question: "Do you test our VPN's authentication mechanism specifically?", answer: "Yes, VPN authentication strength, MFA enforcement, and known protocol vulnerabilities are core parts of our VPN assessment component." },
          { question: "What happens if you gain domain admin access during testing?", answer: "We stop further exploitation immediately, document the full path taken, and notify your team promptly — this is treated as a critical finding requiring immediate attention, independent of the final report timeline." },
          { question: "Is this the same as a vulnerability scan of our network?", answer: "No. A vulnerability scan identifies known issues automatically; our network penetration test manually validates exploitability and chains findings together to demonstrate real attack paths, including lateral movement and privilege escalation." }
        ]
      },
      {
        id: "mobile-vapt",
        slug: "mobile-application-security-testing",
        name: "Mobile Application Security Testing",
        category: "vapt",
        shortDescription: "Security testing for Android and iOS applications.",
        description: "Static and dynamic testing across Android and iOS — local storage, reverse engineering resistance, and API security — the risks unique to mobile that web testing doesn't cover.",
        headline: "Get Your Mobile App Tested",
        subheadline: "Static and dynamic testing across Android and iOS — local storage, reverse engineering resistance, and API security.",
        serviceOverview: "Mobile applications carry risks fundamentally different from web applications — local data storage, insecure inter-app communication, and exposure to reverse engineering once an app is in a user's hands. Our Mobile Application Security Testing service applies static and dynamic analysis across both Android and iOS, uncovering issues that only surface when an app binary itself becomes the attack surface.",
        whatWeTest: [
          { title: "Android", description: "APK decompilation, manifest review, intent-based attacks, insecure inter-process communication (IPC)." },
          { title: "iOS", description: "IPA analysis, plist review, keychain security, insecure inter-app communication." },
          { title: "OWASP Mobile Top 10", description: "Full coverage including improper platform usage, insecure data storage, insufficient cryptography." },
          { title: "API Security", description: "Testing of backend APIs the mobile app consumes." },
          { title: "Reverse Engineering Resistance", description: "Assessing how easily the app can be decompiled to expose logic, secrets, or hardcoded keys." },
          { title: "Local Storage", description: "Reviewing SQLite databases, shared preferences, and cache for sensitive data leakage." },
          { title: "Certificate Pinning", description: "Validating implementation strength against man-in-the-middle interception." },
          { title: "Root/Jailbreak Detection", description: "Testing bypass resistance of device-integrity checks." }
        ],
        technologiesCovered: "Native Android (Java/Kotlin), Native iOS (Swift/Objective-C), React Native, Flutter, Xamarin, Mobile Backend APIs",
        commonVulnerabilities: "Insecure Data Storage, Weak Server-Side Controls, Insufficient Cryptography, Insecure Communication, Reverse-Engineerable Hardcoded Secrets, Weak Certificate Pinning, Root/Jailbreak Detection Bypass, Insecure Inter-Process Communication",
        methodology: [
          { title: "Static Analysis", description: "Decompile the APK/IPA to review code structure, hardcoded secrets, and manifest/plist configuration." },
          { title: "Dynamic Analysis Setup", description: "Configure a testing device/emulator with interception tooling to observe live app behavior." },
          { title: "Local Storage & Data-at-Rest Review", description: "Inspect databases, cache, shared preferences, and keychain entries for sensitive data exposure." },
          { title: "Network Traffic Analysis", description: "Intercept and analyze API calls, testing certificate pinning and transport security." },
          { title: "Platform-Specific Control Testing", description: "Validate root/jailbreak detection, biometric authentication implementation, and IPC boundaries." },
          { title: "Reverse Engineering Assessment", description: "Evaluate resistance to decompilation and code tampering." },
          { title: "Reporting & Risk Rating", description: "CVSS-rated findings with platform-specific remediation guidance for both Android and iOS teams." },
          { title: "Retesting", description: "Confirm fixes across the updated app build before final sign-off." }
        ],
        deliverables: [
          { title: "Protect Intellectual Property", description: "Embedded in app binaries from reverse engineering." },
          { title: "Prevent Credential Leakage", description: "Prevents credential and API key leakage through decompilation." },
          { title: "Ensure Compliance", description: "Ensures compliance with app store security expectations and enterprise MDM requirements." },
          { title: "Build User Trust", description: "Builds user trust in apps handling sensitive financial, health, or personal data." }
        ],
        faqs: [
          { question: "Do you need our source code to test the mobile app?", answer: "No — our default approach is black-box testing using the compiled APK/IPA. Source-code access is optional and can accelerate certain deeper findings, but isn't required." },
          { question: "Can you test apps built with Flutter or React Native the same way as native apps?", answer: "Yes, with framework-specific adjustments. Cross-platform frameworks have unique considerations (e.g., Flutter's compiled Dart code requires different reverse-engineering techniques than native Java/Kotlin)." },
          { question: "Do you test on real devices or emulators?", answer: "We use a combination of both — real devices for accurate behavior around root/jailbreak detection and hardware-backed security features, and emulators/simulators for efficient broad coverage." },
          { question: "How do you test certificate pinning without breaking the app?", answer: "We use industry-standard interception and bypass techniques in a controlled testing environment, which don't affect your production app or live users." },
          { question: "Will you test the backend APIs the app connects to, or only the app itself?", answer: "Backend API testing is included in scope by default, since mobile app security is incomplete without validating the server-side logic it depends on." },
          { question: "What's the difference between testing a banking app and a typical consumer app?", answer: "Banking and financial apps receive additional scrutiny on transaction integrity, session timeout behavior, anti-tampering controls, and compliance-specific requirements (e.g., RBI mobile banking guidelines)." },
          { question: "Do you provide separate reports for Android and iOS?", answer: "We can provide a single consolidated report or separate platform-specific reports, depending on how your development teams are structured — this is agreed during scoping." },
          { question: "Can this testing help with Google Play or Apple App Store security reviews?", answer: "While we don't submit directly to app stores, our report and completion certificate are commonly used to demonstrate due diligence during internal security reviews prior to release." }
        ]
      },
      {
        id: "cloud-vapt",
        slug: "cloud-security-testing",
        name: "Cloud Security Testing",
        category: "vapt",
        shortDescription: "Assess AWS, Azure, and GCP security.",
        description: "Reviewing your AWS, Azure, or Google Cloud environment for identity misconfigurations, insecure storage, container risks, and exposed secrets.",
        headline: "Assess My Cloud Environment",
        subheadline: "Reviewing your AWS, Azure, or Google Cloud environment for identity misconfigurations, insecure storage, container risks, and exposed secrets — before they end up in a breach disclosure.",
        serviceOverview: "Cloud misconfigurations are now one of the leading causes of large-scale data exposure — not sophisticated exploits, but simple identity and storage misconfigurations that go unnoticed until it's too late. Our Cloud Security Testing service reviews your AWS, Azure, or Google Cloud environment across identity, workload, and storage layers, benchmarked against CIS standards and validated through manual testing.",
        whatWeTest: [
          { title: "AWS / Azure / GCP", description: "Platform-specific configuration review against CIS Benchmarks." },
          { title: "IAM", description: "Over-permissioned roles, privilege escalation paths, unused or stale access keys." },
          { title: "Kubernetes", description: "RBAC misconfigurations, exposed dashboards, pod security policy gaps." },
          { title: "Docker", description: "Image vulnerability scanning, container escape risk assessment." },
          { title: "Storage Security", description: "Public bucket/blob exposure, encryption-at-rest validation." },
          { title: "Cloud Misconfiguration", description: "Security group review, logging and monitoring gaps." },
          { title: "Secrets Management", description: "Hardcoded credentials, exposed environment variables, vault configuration review." }
        ],
        technologiesCovered: "AWS (IAM, S3, EC2, Lambda, RDS), Microsoft Azure (Entra ID, Blob Storage, AKS), Google Cloud Platform (IAM, GCS, GKE), Kubernetes, Docker, Terraform/IaC Configuration Review, Secrets Managers (Vault, AWS Secrets Manager, Azure Key Vault)",
        commonVulnerabilities: "Public Storage Buckets, Over-Permissioned IAM Roles, Exposed Kubernetes Dashboards, Unencrypted Data at Rest, Hardcoded Secrets in Code/Config, Missing Logging & Monitoring, Overly Permissive Security Groups, Container Escape Vulnerabilities",
        methodology: [
          { title: "Environment Scoping", description: "Identify in-scope cloud accounts, subscriptions, or projects and access boundaries." },
          { title: "Configuration Review", description: "Benchmark IAM, storage, networking, and compute configuration against CIS standards." },
          { title: "Identity & Access Testing", description: "Map role assignments and attempt controlled privilege escalation within IAM boundaries." },
          { title: "Workload & Container Review", description: "Assess Kubernetes cluster configuration and container image security." },
          { title: "Storage & Data Exposure Testing", description: "Identify publicly accessible or improperly secured storage resources." },
          { title: "Secrets & Credential Exposure Testing", description: "Search for hardcoded or improperly managed secrets across code and configuration." },
          { title: "Reporting & Risk Rating", description: "Findings mapped to CIS Benchmark control numbers alongside CVSS-style business risk ratings." },
          { title: "Remediation Support & Retesting", description: "Guidance on IaC-level fixes, followed by verification retesting." }
        ],
        deliverables: [
          { title: "Prevent Misconfigurations", description: "Prevents the exact misconfiguration class behind most publicly disclosed cloud breaches." },
          { title: "Support Shared-Responsibility", description: "Supports shared-responsibility-model compliance obligations with your cloud provider." },
          { title: "Validate DevOps Velocity", description: "Validates DevOps velocity hasn't outpaced security controls as infrastructure scales." },
          { title: "Reduce Cloud Spend Risk", description: "Reduces cloud spend risk from exposed resources being abused (e.g., cryptomining via compromised compute)." }
        ],
        faqs: [
          { question: "Do you need full admin access to our cloud environment to test it?", answer: "No. We typically request a read-only or security-audit-scoped role, which is sufficient for configuration review; any active exploitation testing is scoped and agreed separately with tightly controlled permissions." },
          { question: "Can you test a multi-cloud environment spanning AWS, Azure, and GCP simultaneously?", answer: "Yes. We scope and assess each provider independently against their respective best practices, while also reviewing cross-cloud integration points for consistency and risk." },
          { question: "Do you test our Infrastructure-as-Code (Terraform/CloudFormation) directly?", answer: "Yes, IaC configuration review is available and often catches misconfigurations before they're ever deployed — recommended alongside live environment testing." },
          { question: "How do you test Kubernetes clusters without disrupting running workloads?", answer: "We conduct configuration and RBAC review non-intrusively wherever possible, and any active testing (e.g., attempted container escape) is carefully scoped and scheduled to avoid affecting production workloads." },
          { question: "Will this testing affect our cloud billing or resource usage?", answer: "Our testing is designed to have negligible impact on cloud costs; any test requiring resource provisioning (e.g., spinning up a test instance) is coordinated with your team in advance." },
          { question: "Can you help us fix the misconfigurations you find, or just report them?", answer: "Our remediation guide provides specific, IaC-aware fix recommendations, and our consultants remain available post-engagement to clarify implementation questions with your DevOps team." },
          { question: "Do you review our CI/CD pipeline for secrets exposure?", answer: "Yes, secrets management review can extend into CI/CD pipeline configuration where credentials, API keys, or deployment secrets may be inadvertently exposed." },
          { question: "Is this different from a cloud security posture management (CSPM) tool scan?", answer: "Yes — CSPM tools provide continuous automated monitoring against policy baselines. Our engagement is a deeper, manually validated point-in-time assessment that also tests exploitability, not just configuration drift." }
        ]
      },
      {
        id: "redteam",
        slug: "red-team-blue-team-exercises",
        name: "Red Team & Blue Team Exercises",
        category: "vapt",
        shortDescription: "Simulated attacks and defense training.",
        description: "Simulating a real, multi-stage adversarial campaign while measuring whether your detection and response capability actually catches it — not just whether the controls exist on paper.",
        headline: "Discuss a Red Team Engagement",
        subheadline: "Simulating a real, multi-stage adversarial campaign while measuring whether your detection and response capability actually catches it.",
        serviceOverview: "For organizations with a mature security operations function, point-in-time VAPT isn't enough — you need to know whether your detection and response capability actually works under real attack conditions. Our Red Team & Blue Team exercises simulate advanced, goal-oriented adversarial campaigns while measuring your defensive team's ability to detect, respond to, and contain the simulated intrusion in real time.",
        whatWeTest: [
          { title: "Attack Simulation", description: "Realistic, goal-oriented campaigns (e.g., 'reach domain admin,' 'exfiltrate the customer database')." },
          { title: "Threat Emulation", description: "Replicating tactics, techniques, and procedures (TTPs) of threat actor groups relevant to your industry." },
          { title: "Purple Teaming", description: "Collaborative sessions where red and blue teams work together in real time to close detection gaps." },
          { title: "Detection Validation", description: "Confirming your SIEM/SOC actually alerts on the techniques used, not just theoretically covers them." },
          { title: "Phishing Simulation", description: "Targeted campaigns measuring employee susceptibility and reporting behavior." },
          { title: "Incident Response Testing", description: "Evaluating your IR playbook against a live, simulated compromise." },
          { title: "MITRE ATT&CK Mapping", description: "Every technique used mapped to the framework for clear reporting and defensive prioritization." }
        ],
        technologiesCovered: "SIEM Platforms (Splunk, Sentinel, QRadar), EDR/XDR Solutions, Email Security Gateways, Active Directory Environments, Cloud & Hybrid Infrastructure, SOC Alerting & Ticketing Workflows",
        commonVulnerabilities: "Initial Access (Phishing, Exposed Services), Persistence Mechanisms, Privilege Escalation, Defense Evasion, Lateral Movement, Command & Control Simulation, Data Exfiltration Simulation, Living-off-the-Land Techniques",
        methodology: [
          { title: "Objective Setting", description: "Define the specific 'crown jewel' goal (e.g., domain admin, customer database access) with your leadership team." },
          { title: "Threat Profile Selection", description: "Choose realistic TTPs based on threat actors relevant to your industry and threat landscape." },
          { title: "Initial Access Simulation", description: "Attempt entry via phishing, exposed services, or other realistic vectors, without informing your SOC in advance." },
          { title: "Campaign Execution", description: "Progress through the attack chain — persistence, privilege escalation, lateral movement — while your blue team operates normally." },
          { title: "Detection Checkpoint Analysis", description: "Independently log every technique used and whether/when it was detected by your defensive stack." },
          { title: "Purple Team Session (Optional)", description: "Bring red and blue teams together to walk through the campaign, closing detection gaps live." },
          { title: "Reporting", description: "Full campaign narrative mapped to MITRE ATT&CK, detection timeline analysis, and SOC improvement recommendations." },
          { title: "Retest / Follow-Up Exercise (Optional)", description: "Validate that detection improvements close the gaps identified in the original exercise." }
        ],
        deliverables: [
          { title: "Validate Real-World Capability", description: "Validates real-world detection and response capability, not just technical control presence." },
          { title: "Strengthen SOC Analyst Skills", description: "Strengthens SOC analyst skills through live-fire practice against realistic adversarial behavior." },
          { title: "Board-Level Assurance", description: "Provides board-level assurance that security investments translate into actual resilience." },
          { title: "Actionable SOC Improvements", description: "Identifies specific, actionable SOC and playbook improvements rather than generic recommendations." }
        ],
        faqs: [
          { question: "Does our SOC team know the exercise is happening?", answer: "Typically no — for a true red team exercise, only a small 'white cell' of trusted stakeholders (not the SOC analysts themselves) is aware, to accurately measure real detection and response capability." },
          { question: "How is this different from a standard penetration test?", answer: "A standard VAPT engagement is scoped against specific assets to find vulnerabilities within a defined time window. A red team exercise simulates a full adversarial campaign against your entire organization, measuring detection and response rather than just finding vulnerabilities." },
          { question: "What happens if your red team activity triggers a real incident response?", answer: "That's expected and valuable — we coordinate closely with your white cell contact to de-escalate safely if a full incident response is triggered, while capturing what was detected and how your team responded." },
          { question: "Do you include phishing simulations against our employees?", answer: "Yes, phishing simulation is a common initial access vector we can include, measuring both click-through rates and — more importantly — reporting behavior by employees who recognize the attempt." },
          { question: "What is a Purple Team session, and is it required?", answer: "A Purple Team session is an optional collaborative debrief where red and blue teams work together, technique by technique, to understand exactly what was and wasn't detected — highly recommended for maximizing the exercise's defensive value." },
          { question: "How long does a typical Red Team engagement take?", answer: "Most engagements run 2–6 weeks depending on objective complexity, organization size, and how much reconnaissance and campaign staging is required before active testing begins." },
          { question: "Can you map findings directly to our SOC's existing detection rules?", answer: "Yes, our reporting includes a technique-by-technique MITRE ATT&CK mapping that your SOC can cross-reference directly against existing detection rules and alerting logic." },
          { question: "Is this suitable for organizations without a mature SOC yet?", answer: "Red team exercises are most valuable for organizations with an established detection and response capability. If your SOC function is still maturing, we typically recommend starting with standard VAPT and building toward a red team engagement as your defensive capability grows." }
        ]
      }
    ]
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
        description: "24/7 configuration, monitoring, and tuning of your firewall and intrusion detection/prevention systems — so threats are blocked in real time, not discovered after the fact.",
        headline: "Request a Managed Firewall Consultation",
        subheadline: "24/7 configuration, monitoring, and tuning of your firewall and intrusion detection/prevention systems.",
        serviceOverview: "A firewall or IDS/IPS is only as effective as its configuration, rule hygiene, and the team watching its alerts. Most breaches involving these controls happen not because the technology failed, but because rules drifted out of date, alerts went unreviewed, or nobody was watching outside business hours. Our Managed Firewall & IDS/IPS service takes ongoing ownership of your perimeter defense — configuration, tuning, monitoring, and incident response — so your team doesn't have to run a 24/7 security operation internally.",
        whatWeTest: [
          { title: "Firewall rule-base design", description: "Cleanup, and ongoing optimization." },
          { title: "IDS/IPS signature tuning", description: "To reduce noise and false positives." },
          { title: "Real-time monitoring", description: "And alert triage across all managed devices." },
          { title: "Change management", description: "For firewall rule requests, with security review before deployment." },
          { title: "Intrusion detection", description: "And automated/manual blocking of malicious traffic." },
          { title: "Regular firewall configuration audits", description: "Against best-practice baselines." },
          { title: "Incident escalation", description: "And initial response coordination." }
        ],
        technologiesCovered: "Palo Alto Networks, Fortinet FortiGate, Cisco ASA/Firepower, Check Point, pfSense, Suricata, Snort, Sophos XG",
        commonVulnerabilities: "Overly Permissive Rules, Rule Bloat & Shadow Rules, Unpatched Firmware, Default/Weak Admin Credentials, Alert Fatigue Leading to Missed Detections, Misconfigured VPN Access, Unmonitored Off-Hours Traffic",
        methodology: [
          { title: "Onboarding & Baseline Audit", description: "Review existing firewall/IDS-IPS configuration and identify immediate risk areas." },
          { title: "Rule Base Optimization", description: "Clean up redundant, conflicting, or overly permissive rules." },
          { title: "Monitoring Integration", description: "Connect devices to our 24/7 monitoring stack for real-time visibility." },
          { title: "Tuning & Calibration", description: "Adjust IDS/IPS signatures to your environment to minimize false positives without missing real threats." },
          { title: "Ongoing Monitoring & Response", description: "Continuous alert triage, with defined escalation paths for confirmed incidents." },
          { title: "Change Management", description: "All new rule requests reviewed for security impact before deployment." },
          { title: "Monthly Reporting & Review", description: "Regular reporting on blocked threats, rule changes, and recommended improvements." }
        ],
        deliverables: [
          { title: "Eliminates Internal 24/7 Team", description: "Eliminates the need to staff an internal 24/7 security monitoring team." },
          { title: "Reduces Risk from Rule Drift", description: "Reduces risk from rule drift and configuration decay over time." },
          { title: "Faster Detection", description: "Faster detection and blocking of malicious traffic before it reaches critical systems." },
          { title: "Supports Compliance", description: "Supports compliance requirements around perimeter security controls (PCI DSS, ISO 27001)." }
        ],
        faqs: [
          { question: "Do you take over our existing firewall, or do we need new hardware?", answer: "In most cases, we work with your existing firewall and IDS/IPS infrastructure. We'll assess your current setup during onboarding and recommend hardware or licensing changes only where genuinely necessary." },
          { question: "Who approves changes to firewall rules once you're managing them?", answer: "All rule change requests go through a documented approval workflow with your designated internal contact before deployment, ensuring you retain control while we handle execution and security review." },
          { question: "How quickly do you respond to a detected intrusion attempt?", answer: "Our monitoring team triages alerts in real time and escalates confirmed incidents immediately according to a pre-agreed response SLA, typically within 15–30 minutes for critical alerts." },
          { question: "Can you manage firewalls across multiple office or data center locations?", answer: "Yes, multi-site and multi-vendor environments are fully supported, with centralized monitoring and reporting across all managed locations." },
          { question: "Will you reduce false positive alerts without missing genuine threats?", answer: "Yes — signature tuning is an ongoing process. We calibrate sensitivity specifically to your environment's traffic patterns rather than relying on generic default settings." },
          { question: "What's included in the monthly reporting?", answer: "Reports include blocked threat summaries, rule changes made, notable incidents, and recommended configuration improvements, in a format suitable for both technical teams and leadership." },
          { question: "Do you handle firmware and software patching for the firewall itself?", answer: "Yes, firmware and software updates for managed devices are included as part of the service to keep the underlying platform secure and supported." },
          { question: "Can we exit the service and take configurations back in-house later?", answer: "Yes. All configuration documentation remains available to you throughout the engagement, and we support a clean handover if you choose to bring management back in-house." }
        ]
      },
      {
        id: "edr",
        slug: "endpoint-detection-response-monitoring",
        name: "Endpoint Detection & Response (EDR)",
        category: "mss",
        shortDescription: "Advanced threat detection on endpoints.",
        description: "Continuous monitoring, threat detection, and rapid response across every laptop, server, and workstation in your organization — backed by a team that acts on alerts, not just generates them.",
        headline: "Get EDR Coverage for Your Endpoints",
        subheadline: "Continuous monitoring, threat detection, and rapid response across every laptop, server, and workstation.",
        serviceOverview: "Endpoints — laptops, servers, workstations — remain the most common initial foothold for attackers. Antivirus alone can't stop modern, fileless, or living-off-the-land attack techniques. Our Endpoint Detection & Response service deploys and manages enterprise-grade EDR technology combined with human-led monitoring, so suspicious behavior is investigated and contained in minutes, not discovered weeks later during an audit.",
        whatWeTest: [
          { title: "EDR agent deployment", description: "And configuration across all endpoints." },
          { title: "24/7 behavioral monitoring", description: "For malware, ransomware, and fileless attack techniques." },
          { title: "Real-time alert triage", description: "By security analysts, not automated systems alone." },
          { title: "Rapid endpoint isolation", description: "And containment during active incidents." },
          { title: "Threat hunting", description: "Across endpoint telemetry for undetected compromises." },
          { title: "Regular tuning", description: "Of detection rules to reduce noise and alert fatigue." },
          { title: "Root cause analysis", description: "And reporting for every confirmed incident." }
        ],
        technologiesCovered: "CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, Sophos Intercept X, Trend Micro Apex One",
        commonVulnerabilities: "Ransomware, Fileless Malware, Living-off-the-Land Attacks, Credential Theft Tools, Lateral Movement Attempts, Unauthorized Privilege Escalation, Command & Control Communication, Suspicious Script Execution",
        methodology: [
          { title: "Endpoint Discovery & Agent Deployment", description: "Inventory all endpoints and deploy EDR agents with minimal disruption to end users." },
          { title: "Baseline Tuning", description: "Calibrate detection sensitivity to your environment's normal behavior patterns." },
          { title: "24/7 Monitoring", description: "Continuous telemetry review by our security analysts across all managed endpoints." },
          { title: "Alert Triage & Investigation", description: "Every alert investigated by a human analyst before escalation, minimizing false alarms reaching your team." },
          { title: "Containment & Response", description: "Confirmed threats isolated immediately at the endpoint level to prevent lateral spread." },
          { title: "Threat Hunting", description: "Proactive searches across endpoint data for indicators of compromise that automated rules might miss." },
          { title: "Reporting & Review", description: "Regular reporting on detected threats, response actions taken, and endpoint health." }
        ],
        deliverables: [
          { title: "Contains Ransomware & Malware", description: "Contains ransomware and malware before it spreads across your network." },
          { title: "Removes 24/7 Burden", description: "Removes the burden of 24/7 endpoint monitoring from your internal IT team." },
          { title: "Reduces Dwell Time", description: "Reduces dwell time between compromise and detection from weeks to minutes." },
          { title: "Audit-Ready Evidence", description: "Provides audit-ready evidence of endpoint security controls for compliance requirements." }
        ],
        faqs: [
          { question: "Will EDR agents slow down our employees' laptops?", answer: "Modern EDR agents are designed for minimal performance impact. We tune agent configuration to balance thorough monitoring with day-to-day usability." },
          { question: "What happens when a threat is detected on an endpoint?", answer: "Our analysts investigate the alert immediately; if confirmed malicious, the endpoint is isolated from the network to contain the threat while we coordinate remediation with your team." },
          { question: "Do you support both Windows and macOS endpoints?", answer: "Yes, our EDR management covers Windows, macOS, and major Linux distributions, with platform-specific tuning for each." },
          { question: "Can EDR replace our existing antivirus software?", answer: "In most cases, yes — modern EDR platforms include antivirus-equivalent capabilities alongside advanced behavioral detection, allowing consolidation rather than running both simultaneously." },
          { question: "How do you handle remote and work-from-home endpoints?", answer: "EDR agents provide the same monitoring and response capability regardless of network location, since detection and telemetry collection happen at the endpoint itself, not the network perimeter." },
          { question: "What is included in incident reporting after a detected threat?", answer: "Each confirmed incident includes a root cause summary, timeline of detection and response actions, affected systems, and recommendations to prevent recurrence." },
          { question: "Do you proactively search for threats, or only respond to alerts?", answer: "Both. In addition to real-time alert response, our analysts conduct regular threat hunting exercises across endpoint telemetry to catch subtle indicators that automated detection alone might miss." },
          { question: "How quickly can EDR be deployed across our organization?", answer: "Deployment timelines depend on endpoint count and environment complexity, but most organizations achieve full coverage within 1–3 weeks of onboarding." }
        ]
      },
      {
        id: "ti",
        slug: "threat-intelligence-monitoring-reporting",
        name: "Threat Intelligence & Reporting",
        category: "mss",
        shortDescription: "Actionable threat intelligence and SOC reporting.",
        description: "Actionable, contextualized threat intelligence — mapped to your industry, technology stack, and risk profile — so your team acts on relevant signals instead of drowning in generic feeds.",
        headline: "Get Tailored Threat Intelligence",
        subheadline: "Actionable, contextualized threat intelligence — mapped to your industry, technology stack, and risk profile.",
        serviceOverview: "Generic threat feeds overwhelm security teams with volume and rarely reflect what's actually relevant to your organization. Our Threat Intelligence & Reporting service curates and contextualizes threat data specific to your industry, technology stack, and geographic footprint — turning raw intelligence into decisions your team can actually act on.",
        whatWeTest: [
          { title: "Continuous monitoring", description: "Of threat actor activity relevant to your industry." },
          { title: "Dark web and paste-site monitoring", description: "For leaked credentials or company mentions." },
          { title: "Vulnerability intelligence", description: "Early warning on newly disclosed CVEs affecting your stack." },
          { title: "Brand and domain monitoring", description: "For phishing infrastructure and impersonation." },
          { title: "Regular intelligence briefings", description: "Tailored to your leadership and technical teams." },
          { title: "Indicator-of-compromise (IOC) feeds", description: "Integrated with your existing security tools." },
          { title: "Ad hoc threat research", description: "For emerging incidents relevant to your sector." }
        ],
        technologiesCovered: "Open Source Intelligence (OSINT), Dark Web Forums & Marketplaces, Vulnerability Databases (CVE/NVD), Threat Actor TTP Tracking, Industry-Specific ISAC Feeds, Phishing & Typosquatting Domain Monitoring",
        commonVulnerabilities: "Leaked Employee or Customer Credentials, Impersonation Domains & Phishing Kits, Emerging Ransomware Campaigns Targeting Your Sector, Newly Disclosed Vulnerabilities in Your Tech Stack, Chatter Referencing Your Organization on Underground Forums",
        methodology: [
          { title: "Profile Development", description: "Define your industry, technology stack, and specific assets to monitor (domains, brand names, executive names)." },
          { title: "Source Configuration", description: "Configure monitoring across relevant OSINT, dark web, and vulnerability intelligence sources." },
          { title: "Continuous Monitoring", description: "Ongoing collection and filtering of intelligence relevant to your defined profile." },
          { title: "Analysis & Contextualization", description: "Analysts assess relevance and urgency before anything reaches your team." },
          { title: "Alerting", description: "Immediate notification for high-urgency findings (e.g., leaked credentials, active targeting)." },
          { title: "Regular Reporting", description: "Scheduled intelligence briefings summarizing trends, risks, and recommended actions." },
          { title: "Integration Support", description: "IOC feeds formatted for integration with your SIEM or existing security tooling where applicable." }
        ],
        deliverables: [
          { title: "Early Warning", description: "Provides early warning before threats materialize into actual incidents." },
          { title: "Reduces Noise", description: "Your team receives relevant intelligence, not generic feed volume." },
          { title: "Supports Board Reporting", description: "Supports board and leadership reporting with clear, contextualized risk narratives." },
          { title: "Strengthens Defenses", description: "Strengthens phishing and brand-impersonation defenses proactively." }
        ],
        faqs: [
          { question: "How is this different from a free threat intelligence feed?", answer: "Free feeds provide raw, generic data with no context. Our service filters, analyzes, and contextualizes intelligence specifically against your industry and technology stack, delivering only what's actually actionable for your organization." },
          { question: "What happens if our credentials are found on the dark web?", answer: "You're alerted immediately with details of what was found and where, along with recommended containment steps such as forced password resets or account monitoring." },
          { question: "Can you monitor for phishing domains impersonating our brand?", answer: "Yes, brand and domain monitoring is a core part of this service, including typosquatting detection and phishing kit identification targeting your organization." },
          { question: "Do you integrate threat intelligence directly into our SIEM?", answer: "Yes, where technically feasible, we provide IOC feeds formatted for direct integration with common SIEM platforms to support automated correlation." },
          { question: "How often will we receive intelligence reports?", answer: "Standard reporting is monthly, with weekly summaries available for higher-risk industries, plus immediate alerts for any high-urgency findings outside the regular reporting cycle." }
        ]
      },
      {
        id: "vuln-mgmt",
        slug: "vulnerability-management-service",
        name: "Vulnerability Management as a Service",
        category: "mss",
        shortDescription: "Ongoing vulnerability scanning and remediation tracking.",
        description: "Continuous vulnerability scanning, prioritization, and remediation tracking — so vulnerability management becomes an ongoing program, not an annual scramble before an audit.",
        headline: "Start Continuous Vulnerability Management",
        subheadline: "Continuous vulnerability scanning, prioritization, and remediation tracking — so vulnerability management becomes an ongoing program, not an annual scramble before an audit.",
        serviceOverview: "Point-in-time vulnerability scans go stale the moment a new patch is released or a new asset is deployed. Our Vulnerability Management as a Service transforms vulnerability management from a periodic checklist item into a continuous program — ongoing scanning, risk-based prioritization, and structured remediation tracking across your entire environment.",
        whatWeTest: [
          { title: "Continuous vulnerability scanning", description: "Across web, network, cloud, and endpoint assets." },
          { title: "Risk-based prioritization", description: "Combining CVSS scores with actual business context." },
          { title: "Remediation ticket creation", description: "And tracking through to closure." },
          { title: "Regular rescanning", description: "To confirm fixes and catch newly introduced vulnerabilities." },
          { title: "Asset discovery", description: "To catch shadow IT and previously unknown systems." },
          { title: "Trend reporting", description: "Showing risk reduction over time." },
          { title: "Executive and technical reporting", description: "Tailored to different stakeholders." }
        ],
        technologiesCovered: "Web Applications, Internal & External Network Assets, Cloud Infrastructure (AWS/Azure/GCP), Endpoints & Servers, Containerized Workloads",
        commonVulnerabilities: "Patch Backlogs Going Unnoticed, Newly Deployed Assets Missing Security Baselines, Shadow IT Introducing Unmanaged Risk, Compliance Gaps From Inconsistent Scanning Cadence, Remediation Efforts Losing Track of Progress",
        methodology: [
          { title: "Asset Discovery & Baseline Scan", description: "Full inventory and initial vulnerability scan across all in-scope assets." },
          { title: "Risk-Based Prioritization", description: "Findings ranked by exploitability, exposure, and actual business impact, not raw CVSS score alone." },
          { title: "Remediation Ticketing", description: "Findings converted into tracked remediation tasks assigned to responsible teams." },
          { title: "Continuous Rescanning", description: "Regular automated scans to catch new vulnerabilities and confirm previous fixes." },
          { title: "Manual Validation", description: "Periodic manual verification of high-risk findings to eliminate false positives." },
          { title: "Progress Reporting", description: "Ongoing dashboards and reports showing remediation velocity and overall risk trend." },
          { title: "Program Review", description: "Regular check-ins to adjust scanning scope and priorities as your environment evolves." }
        ],
        deliverables: [
          { title: "Continuous Risk Visibility", description: "Replaces reactive, once-a-year scanning with continuous risk visibility." },
          { title: "Prioritizes Remediation", description: "Prioritizes remediation effort where it actually reduces business risk." },
          { title: "Audit-Ready Evidence", description: "Provides audit-ready evidence of an ongoing vulnerability management program." },
          { title: "Catches Shadow Assets", description: "Catches new vulnerabilities and shadow assets as your environment changes." }
        ],
        faqs: [
          { question: "How is this different from a one-time vulnerability assessment?", answer: "A one-time assessment captures a single point in time. This service provides continuous scanning and tracking, so new vulnerabilities and newly deployed assets are caught as they appear, not just once a year." },
          { question: "How do you prioritize which vulnerabilities to fix first?", answer: "We combine CVSS severity with real business context — exposure (internet-facing vs. internal), data sensitivity, and exploit availability — to produce a prioritized list that reflects actual risk, not just raw scores." },
          { question: "Do you also fix the vulnerabilities you find?", answer: "Our service focuses on identification, prioritization, and remediation tracking; where needed, we can coordinate with your internal team or a technical partner to execute fixes, and we verify closure through rescanning." },
          { question: "How often do you scan our environment?", answer: "Scanning cadence is agreed during onboarding based on your risk profile — commonly weekly or continuous for internet-facing assets, with monthly cycles for lower-risk internal systems." },
          { question: "Can this service catch shadow IT we don't know about?", answer: "Yes, ongoing asset discovery is part of the service specifically to catch unmanaged or forgotten systems that traditional point-in-time assessments often miss." },
          { question: "Will this help with our ISO 27001 or SOC 2 audit requirements?", answer: "Yes, continuous vulnerability management directly supports technical control evidence required by ISO 27001, SOC 2, and similar frameworks, with reporting structured for auditor review." },
          { question: "How do remediation tickets integrate with our existing systems?", answer: "We can integrate with common ticketing platforms (e.g., Jira, ServiceNow) so remediation tasks appear directly in your team's existing workflow rather than a separate system." },
          { question: "What happens if a critical vulnerability is found outside the regular reporting cycle?", answer: "Critical findings are escalated immediately outside the normal reporting schedule, with clear guidance on urgency and recommended immediate action." }
        ]
      },
      {
        id: "ad-managed",
        slug: "active-directory-managed-security-support",
        name: "Active Directory Managed Security & Support",
        category: "mss",
        shortDescription: "Secure and optimize your AD infrastructure.",
        description: "Ongoing hardening, monitoring, and support for your Active Directory environment — the identity backbone attackers target first once they gain any foothold in your network.",
        headline: "Secure Your Active Directory Environment",
        subheadline: "Ongoing hardening, monitoring, and support for your Active Directory environment — the identity backbone attackers target first once they gain any foothold in your network.",
        serviceOverview: "Active Directory is the identity backbone of most enterprise networks — and one of the most common targets once an attacker gains initial access. Misconfigured permissions, stale accounts, and weak Group Policy settings can turn a single compromised endpoint into full domain compromise. Our Active Directory Managed Security & Support service provides ongoing hardening, monitoring, and support to keep your AD environment resilient against modern attack techniques.",
        whatWeTest: [
          { title: "Continuous monitoring", description: "For Active Directory attack techniques (Kerberoasting, Golden Ticket, DCSync)." },
          { title: "Regular privilege review", description: "And group membership review to eliminate excessive access." },
          { title: "Group Policy Object (GPO) security review", description: "And hardening recommendations." },
          { title: "Stale and orphaned account identification", description: "And cleanup support." },
          { title: "Domain trust relationship review", description: "For unnecessary or risky trusts." },
          { title: "Attack path analysis", description: "To identify realistic routes to domain admin." },
          { title: "Ongoing support", description: "For AD-related security incidents and configuration questions." }
        ],
        technologiesCovered: "Microsoft Active Directory, Azure AD / Entra ID, Identity & Access Management (IAM)",
        commonVulnerabilities: "Kerberoasting, Golden Ticket & Silver Ticket Attacks, DCSync Attacks, Pass-the-Hash Techniques, Privilege Escalation via Misconfigured ACLs, Unauthorized Changes to Privileged Groups, Suspicious Authentication Patterns",
        methodology: [
          { title: "AD Environment Assessment", description: "Baseline review of domain structure, privileged accounts, GPOs, and trust relationships." },
          { title: "Attack Path Mapping", description: "Identify realistic privilege escalation paths from standard user accounts to domain admin." },
          { title: "Hardening Recommendations", description: "Prioritized list of configuration changes to close identified attack paths." },
          { title: "Continuous Monitoring Setup", description: "Deploy monitoring for known AD attack techniques and anomalous authentication behavior." },
          { title: "Ongoing Privilege Review", description: "Regular audits of group memberships and permissions to catch privilege creep." },
          { title: "Incident Support", description: "Rapid support and investigation assistance if suspicious AD activity is detected." },
          { title: "Periodic Reassessment", description: "Regular re-evaluation as your environment and staff structure change over time." }
        ],
        deliverables: [
          { title: "Closes Attack Paths", description: "Closes the most common paths attackers use to escalate from initial access to full domain compromise." },
          { title: "Reduces Privilege Creep", description: "Reduces risk from privilege creep and stale accounts accumulating over time." },
          { title: "Provides Expert Support", description: "Provides ongoing expert support without requiring in-house AD security specialists." },
          { title: "Strengthens Compliance", description: "Strengthens compliance posture for frameworks requiring identity and access control review." }
        ],
        faqs: [
          { question: "Do you need domain admin access to provide this service?", answer: "We typically request a scoped, read-focused role sufficient for monitoring and assessment; any configuration changes are made collaboratively with your IT team rather than unilaterally." },
          { question: "How do you detect attacks like Kerberoasting or Golden Ticket without disrupting normal operations?", answer: "Detection is based on monitoring authentication logs and behavioral patterns non-intrusively — this doesn't affect normal AD operations or user authentication." },
          { question: "Can you help us clean up years of accumulated stale accounts and permissions?", answer: "Yes, identifying and supporting cleanup of stale accounts, orphaned permissions, and excessive group memberships is a core part of the ongoing service." },
          { question: "Will you review our Group Policy Objects for security weaknesses?", answer: "Yes, GPO security review is included, covering common misconfigurations that weaken authentication policies, password requirements, and privilege restrictions." },
          { question: "What happens if you detect suspicious AD activity?", answer: "You're alerted immediately with details of the suspicious behavior, and our team provides investigation support to determine whether it represents an active compromise." },
          { question: "Do you support hybrid Active Directory environments integrated with Azure AD/Entra ID?", answer: "Yes, hybrid identity environments are supported, with review extending to relevant Azure AD/Entra ID configuration and synchronization security." },
          { question: "How often do you reassess our AD environment once the service begins?", answer: "Formal reassessments are typically conducted quarterly, with continuous monitoring and ad hoc support available throughout the engagement." },
          { question: "Is this service a replacement for a full network penetration test?", answer: "No — this is an ongoing management and monitoring service focused specifically on AD. We often recommend pairing it with periodic network penetration testing for comprehensive coverage." }
        ]
      },
      {
        id: "patch-mgmt",
        slug: "managed-security-patch-operations",
        name: "Managed Security Patch Operations",
        category: "mss",
        shortDescription: "Automated patch management and vulnerability closure.",
        description: "Structured, ongoing patch management across your servers, endpoints, and applications — so critical vulnerabilities get closed on schedule, not whenever someone remembers.",
        headline: "Start Managed Patch Operations",
        subheadline: "Structured, ongoing patch management across your servers, endpoints, and applications — so critical vulnerabilities get closed on schedule, not whenever someone remembers.",
        serviceOverview: "Unpatched systems remain one of the most common — and most preventable — causes of security incidents. Patch management often falls through the cracks not because organizations don't care, but because it lacks ownership, process, and prioritization. Our Managed Security Patch Operations service takes structured, ongoing ownership of patching across your servers, endpoints, and key applications, with critical vulnerabilities fast-tracked outside the normal cycle.",
        whatWeTest: [
          { title: "Patch inventory and gap analysis", description: "Across servers, endpoints, and applications." },
          { title: "Risk-based patch prioritization", description: "Tied to actively exploited or high-severity vulnerabilities." },
          { title: "Scheduled patch deployment windows", description: "To minimize business disruption." },
          { title: "Emergency fast-track patching", description: "For critical, actively exploited vulnerabilities." },
          { title: "Pre-deployment testing coordination", description: "To reduce risk of patch-related outages." },
          { title: "Patch compliance tracking", description: "And reporting across the entire environment." },
          { title: "Rollback support", description: "And coordination if a deployed patch causes issues." }
        ],
        technologiesCovered: "Windows & Linux Servers, Employee Endpoints, Network Device Firmware, Third-Party Applications, Cloud-Hosted Workloads",
        commonVulnerabilities: "Exploitation of Known, Unpatched Vulnerabilities, Compliance Failures From Inconsistent Patch Cycles, Extended Exposure Windows for Critical CVEs, Patch Deployment Causing Unplanned Downtime, Untracked Patch Status Across a Growing Asset Base",
        methodology: [
          { title: "Patch Inventory & Gap Assessment", description: "Full inventory of current patch status across all in-scope systems." },
          { title: "Risk-Based Scheduling", description: "Prioritize patches by severity, exploitability, and business impact rather than vendor release order alone." },
          { title: "Deployment Window Planning", description: "Schedule routine patching during agreed low-impact windows." },
          { title: "Critical Patch Fast-Tracking", description: "Deploy emergency patches for actively exploited vulnerabilities outside the standard cycle." },
          { title: "Testing Coordination", description: "Where feasible, coordinate pre-deployment testing to catch compatibility issues before wide rollout." },
          { title: "Deployment & Verification", description: "Execute patches and verify successful installation across all target systems." },
          { title: "Compliance Reporting", description: "Ongoing reporting showing patch status, compliance percentage, and outstanding gaps." }
        ],
        deliverables: [
          { title: "Closes the Exposure Window", description: "Closes the exposure window on known vulnerabilities before they're exploited." },
          { title: "Removes Operational Burden", description: "Removes the operational burden of tracking patches across a growing and changing asset base." },
          { title: "Reduces Unplanned Downtime", description: "Reduces unplanned downtime through structured, tested deployment scheduling." },
          { title: "Provides Compliance Evidence", description: "Provides clear compliance evidence of a functioning patch management program." }
        ],
        faqs: [
          { question: "How quickly do you deploy patches for critical, actively exploited vulnerabilities?", answer: "Critical vulnerabilities with active exploitation in the wild are fast-tracked outside the normal cycle, typically within 24–72 hours depending on testing requirements and system criticality." },
          { question: "Will patching cause downtime for our critical systems?", answer: "We schedule routine patching during agreed low-impact windows and coordinate directly with your team for systems where any downtime needs careful planning, minimizing disruption." },
          { question: "What happens if a patch causes an issue after deployment?", answer: "We support rollback procedures where technically feasible and work with your team to resolve compatibility issues quickly, minimizing operational impact." },
          { question: "Do you patch third-party applications, or just operating systems?", answer: "Both. Patch management covers operating systems as well as commonly used third-party applications, which are frequently a source of exploited vulnerabilities." },
          { question: "How do you decide which patches to prioritize first?", answer: "Prioritization is based on severity, whether the vulnerability is being actively exploited, and how exposed the affected system is — not simply patching in the order vendors release updates." },
          { question: "Can you provide patch compliance reports for our auditors?", answer: "Yes, ongoing patch compliance reporting is a core part of the service and is formatted to support ISO 27001, SOC 2, PCI DSS, and similar audit requirements." },
          { question: "Do you test patches before deploying them across our environment?", answer: "Where feasible, we coordinate pre-deployment testing on representative systems before wider rollout, particularly for patches with known compatibility risk." },
          { question: "What's the difference between this and our existing patch management tool?", answer: "Tools can push updates but don't provide prioritization judgment, testing coordination, or accountability. This service adds the operational ownership and decision-making a tool alone can't provide." }
        ]
      }
    ]
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
        description: "A structured, point-in-time review of your AWS, Azure, or Google Cloud environment — benchmarked against CIS standards and validated through manual testing, not just automated policy scans.",
        headline: "Request a Cloud Security Assessment",
        subheadline: "A structured, point-in-time review of your AWS, Azure, or Google Cloud environment — benchmarked against CIS standards and validated through manual testing, not just automated policy scans.",
        serviceOverview: "Cloud environments change fast — new services, new permissions, new integrations — and security posture can drift silently between reviews. Our Cloud Security Assessment provides a comprehensive, point-in-time evaluation of your cloud environment's configuration, identity controls, and data exposure risk, combining automated benchmarking with manual validation to catch what policy-scanning tools alone miss.",
        whatWeTest: [
          { title: "Identity and access management configuration", description: "Across all cloud accounts." },
          { title: "Storage security", description: "Public exposure, encryption-at-rest, access policies." },
          { title: "Network configuration", description: "Security groups, VPC/VNet architecture, exposed services." },
          { title: "Logging and monitoring coverage", description: "Across critical services." },
          { title: "Compute and serverless", description: "Configuration hardening." },
          { title: "Data encryption", description: "In transit and at rest across managed services." },
          { title: "Third-party integrations", description: "And API keys with cloud-level access." }
        ],
        technologiesCovered: "AWS (IAM, S3, EC2, Lambda, RDS, VPC), Microsoft Azure (Entra ID, Blob Storage, Virtual Networks, AKS), Google Cloud Platform (IAM, GCS, GKE, VPC), Multi-Cloud & Hybrid Environments",
        commonVulnerabilities: "Publicly Accessible Storage Buckets, Over-Permissioned IAM Roles, Unencrypted Data at Rest, Missing Logging & Monitoring, Overly Permissive Security Groups, Exposed Management Interfaces, Unused or Stale Access Keys",
        methodology: [
          { title: "Scoping & Access Provisioning", description: "Define in-scope accounts/subscriptions and set up a read-only security-audit role." },
          { title: "Automated Configuration Benchmarking", description: "Assess configuration against CIS Benchmarks and provider-specific best practices." },
          { title: "Manual Validation", description: "Our consultants manually verify high-risk findings to eliminate false positives and confirm real exposure." },
          { title: "Identity & Access Review", description: "Deep review of IAM roles, policies, and privilege escalation paths." },
          { title: "Data Exposure Testing", description: "Identify publicly accessible or improperly secured storage and databases." },
          { title: "Reporting & Risk Rating", description: "Findings mapped to CIS control numbers with business-context risk ratings." },
          { title: "Remediation Guidance", description: "Clear, prioritized fix recommendations for your cloud and DevOps teams." }
        ],
        deliverables: [
          { title: "Identifies Misconfigurations", description: "Identifies misconfigurations before they become the source of a public data exposure incident." },
          { title: "Confirms Shared Responsibility", description: "Confirms whether your cloud provider's shared-responsibility obligations are actually being met on your side." },
          { title: "Supports Compliance", description: "Supports compliance evidence for ISO 27001, SOC 2, and similar frameworks." },
          { title: "Provides Clear Roadmap", description: "Provides a clear, prioritized roadmap rather than a raw list of hundreds of unranked findings." }
        ],
        faqs: [
          { question: "Do you need administrative access to assess our cloud environment?", answer: "No. A read-only or security-audit-scoped role is sufficient for the vast majority of assessment activities." },
          { question: "Can you assess a multi-cloud environment across AWS, Azure, and GCP together?", answer: "Yes, each provider is assessed against its own best-practice benchmarks, with additional review of cross-cloud integration points." },
          { question: "How is this different from a CSPM tool's automated scan?", answer: "CSPM tools flag configuration drift continuously but generate significant false positives and lack business context. Our assessment adds manual validation and prioritization based on actual exploitability and business risk." },
          { question: "Will this assessment disrupt our production cloud workloads?", answer: "No, this is primarily a configuration and access review — it does not involve active exploitation that could affect running workloads." },
          { question: "Do you review our Infrastructure-as-Code alongside the live environment?", answer: "Yes, IaC review (Terraform, CloudFormation) is available and helps catch misconfigurations before they're deployed, in addition to reviewing what's already live." },
          { question: "How often should we run a cloud security assessment?", answer: "We typically recommend annually at minimum, or after any major architectural change, with continuous monitoring in between for organizations with fast-changing environments." },
          { question: "What format does the final report come in?", answer: "You receive an executive summary for leadership, a detailed technical report for your cloud/DevOps team, and a prioritized remediation roadmap." },
          { question: "Can you help us fix the issues you find?", answer: "Yes, remediation guidance is included, and our consultants remain available afterward to clarify implementation questions with your team." }
        ]
      },
      {
        id: "iam",
        slug: "iam-access-control-management",
        name: "IAM & Access Control Management",
        category: "cloud-infra",
        shortDescription: "Identity and access management implementation.",
        description: "Ongoing design, review, and hardening of identity and access management across your cloud and enterprise systems — because most breaches trace back to a permission that should never have existed.",
        headline: "Strengthen Your IAM Posture",
        subheadline: "Ongoing design, review, and hardening of identity and access management across your cloud and enterprise systems.",
        serviceOverview: "Identity is the new perimeter — and in most modern breaches, the initial vulnerability matters less than the excessive permissions that let an attacker move freely once inside. Our IAM & Access Control Management service reviews, redesigns, and continuously monitors your identity and access controls across cloud platforms and enterprise systems, built around least-privilege principles rather than convenience-driven access sprawl.",
        whatWeTest: [
          { title: "IAM policy design and review", description: "Across cloud platforms (AWS, Azure, GCP)." },
          { title: "Role-based access control (RBAC)", description: "Structuring aligned to least-privilege principles." },
          { title: "Privileged account identification", description: "And ongoing monitoring." },
          { title: "Access recertification cycles", description: "To catch permission creep over time." },
          { title: "Service account", description: "And machine identity security review." },
          { title: "SSO and MFA", description: "Configuration review." },
          { title: "Privilege escalation path analysis", description: "Across interconnected systems." }
        ],
        technologiesCovered: "AWS IAM, Azure Entra ID, Google Cloud IAM, Okta, Active Directory, SSO/SAML/OIDC Providers, Privileged Access Management (PAM) Platforms",
        commonVulnerabilities: "Over-Permissioned Roles & Users, Standing Privileged Access With No Time Limits, Orphaned Service Accounts, Missing MFA on Privileged Accounts, Role Explosion & Inconsistent Permission Models, Cross-Account/Cross-Platform Privilege Escalation Paths",
        methodology: [
          { title: "Access Inventory", description: "Catalog all users, roles, service accounts, and their current permissions across in-scope systems." },
          { title: "Privilege Analysis", description: "Identify over-permissioned accounts and realistic privilege escalation paths." },
          { title: "Least-Privilege Redesign", description: "Restructure roles and policies to match actual business need rather than historical convenience." },
          { title: "MFA & SSO Hardening", description: "Review and strengthen authentication controls, particularly for privileged accounts." },
          { title: "Recertification Process Setup", description: "Establish a recurring cycle for reviewing and revoking unnecessary access." },
          { title: "Ongoing Monitoring", description: "Continuous tracking of new access grants and privilege changes for anomalies." },
          { title: "Periodic Reporting", description: "Regular reporting on access posture, recertification status, and identified risks." }
        ],
        deliverables: [
          { title: "Reduces Blast Radius", description: "Reduces blast radius if any single account is compromised." },
          { title: "Eliminates Permission Creep", description: "Eliminates accumulated permission creep that builds up unnoticed over years." },
          { title: "Strengthens Compliance", description: "Strengthens compliance posture for frameworks requiring access control evidence." },
          { title: "Provides Ongoing Visibility", description: "Provides ongoing visibility into who can access what, and why." }
        ],
        faqs: [
          { question: "Will redesigning our IAM policies disrupt daily operations?", answer: "Changes are rolled out carefully with staged testing and rollback plans to avoid disrupting legitimate workflows; we work closely with your team throughout the transition." },
          { question: "Do you manage IAM across multiple cloud providers and on-premise AD together?", answer: "Yes, we support unified IAM review and management across multi-cloud environments alongside on-premise Active Directory and hybrid identity setups." },
          { question: "How often should access recertification happen?", answer: "We typically recommend quarterly recertification for privileged accounts and semi-annual review for standard user access, adjusted based on your organization's risk profile." },
          { question: "Can you help us implement just-in-time (JIT) privileged access instead of standing access?", answer: "Yes, transitioning from standing privileged access to just-in-time, time-bound elevation is a common part of this service where supported by your existing tooling." },
          { question: "Do you review service accounts and machine identities, or just human users?", answer: "Both. Service accounts and machine identities are frequently over-permissioned and under-monitored, and are included as a core part of our review." },
          { question: "What happens if you find an active privilege escalation path during review?", answer: "It's flagged and escalated immediately as a priority finding, independent of the regular reporting cycle, given the potential severity." },
          { question: "Can this service help with SOC 2 or ISO 27001 access control requirements?", answer: "Yes, structured IAM management and recertification directly supports the access control evidence required under both frameworks." },
          { question: "Do you provide ongoing support, or is this a one-time engagement?", answer: "Both options are available — a one-time IAM review and redesign, or ongoing managed IAM governance with continuous monitoring and periodic recertification." }
        ]
      },
      {
        id: "container",
        slug: "container-kubernetes-security",
        name: "Container & Kubernetes Security",
        category: "cloud-infra",
        shortDescription: "Secure containerized and orchestrated workloads.",
        description: "Configuration review, runtime protection, and ongoing hardening for your containerized workloads — closing the gaps that generic cloud security reviews often overlook.",
        headline: "Secure Your Container Environment",
        subheadline: "Configuration review, runtime protection, and ongoing hardening for your containerized workloads.",
        serviceOverview: "Containers and Kubernetes introduce a distinct set of security risks that traditional cloud or network security reviews frequently miss — exposed dashboards, overly permissive RBAC, vulnerable base images, and container escape vulnerabilities. Our Container & Kubernetes Security service provides both a point-in-time configuration assessment and ongoing hardening support for your containerized infrastructure.",
        whatWeTest: [
          { title: "Kubernetes cluster configuration review", description: "Against CIS Kubernetes Benchmark." },
          { title: "RBAC policy review", description: "To eliminate excessive pod and namespace permissions." },
          { title: "Container image vulnerability scanning", description: "Across your registry." },
          { title: "Pod security policy", description: "Pod Security Standards enforcement review." },
          { title: "Network policy review", description: "For inter-pod and namespace segmentation." },
          { title: "Secrets management review", description: "Within container and orchestration configuration." },
          { title: "Runtime threat detection", description: "For anomalous container behavior." }
        ],
        technologiesCovered: "Kubernetes (EKS, AKS, GKE, self-managed), Docker, containerd, Helm Charts, Istio/Service Mesh Configurations, Container Registries (ECR, ACR, GCR, Harbor)",
        commonVulnerabilities: "Exposed Kubernetes Dashboards, Overly Permissive RBAC Roles, Vulnerable Base Images, Missing Network Segmentation Between Namespaces, Privileged Containers Running Unnecessarily, Hardcoded Secrets in Manifests/ConfigMaps, Container Escape Vulnerabilities",
        methodology: [
          { title: "Cluster & Registry Inventory", description: "Catalog all clusters, namespaces, and container images in scope." },
          { title: "Configuration Benchmarking", description: "Assess cluster configuration against CIS Kubernetes Benchmark controls." },
          { title: "RBAC & Network Policy Review", description: "Identify overly permissive roles and missing segmentation between workloads." },
          { title: "Image Vulnerability Scanning", description: "Scan container images for known vulnerabilities and outdated dependencies." },
          { title: "Secrets Exposure Review", description: "Check manifests, ConfigMaps, and environment variables for hardcoded credentials." },
          { title: "Runtime Behavior Assessment", description: "Where applicable, review runtime detection capability for anomalous container activity." },
          { title: "Reporting & Hardening Roadmap", description: "Prioritized findings with specific manifest-level and cluster-level remediation guidance." }
        ],
        deliverables: [
          { title: "Closes Container-Specific Risks", description: "Closes container-specific risks that generic cloud security reviews typically miss." },
          { title: "Reduces Blast Radius", description: "Reduces the blast radius of a compromised container through proper segmentation and RBAC." },
          { title: "Prevents Vulnerable Deployments", description: "Prevents deployment of vulnerable images into production." },
          { title: "Supports Secure Scaling", description: "Supports secure scaling as your containerized workloads grow." }
        ],
        faqs: [
          { question: "Do you need cluster-admin access to assess our Kubernetes environment?", answer: "No, a scoped read-only role is generally sufficient for configuration review; any deeper testing is agreed and tightly controlled separately." },
          { question: "Can you scan our container images before they're deployed to production?", answer: "Yes, image vulnerability scanning can be integrated into your CI/CD pipeline to catch vulnerable images before they reach production." },
          { question: "Will this assessment disrupt running workloads in our cluster?", answer: "No, configuration and RBAC review is non-intrusive; any active testing of container escape scenarios is carefully scoped and scheduled separately to avoid impacting production." },
          { question: "Do you support managed Kubernetes services like EKS, AKS, and GKE?", answer: "Yes, all major managed Kubernetes offerings are supported, along with self-managed clusters." },
          { question: "How do you review secrets management without exposing the secrets themselves?", answer: "We identify where and how secrets are stored and referenced without needing to view or extract the actual secret values, focusing on the exposure risk rather than the content." },
          { question: "Can you help us implement Pod Security Standards or OPA/Gatekeeper policies?", answer: "Yes, policy design and implementation guidance for Pod Security Standards or admission controllers like OPA/Gatekeeper is available as part of the hardening engagement." },
          { question: "Is Helm chart security included in this review?", answer: "Yes, Helm chart configuration is reviewed as part of the broader deployment manifest and configuration assessment." },
          { question: "Do you provide ongoing monitoring, or only a one-time assessment?", answer: "Both are available — a one-time configuration assessment, or ongoing management including ongoing monitoring, periodic reassessment, and hardening support as your cluster evolves." }
        ]
      },
      {
        id: "infra-harden",
        slug: "infrastructure-hardening-security-policies",
        name: "Infrastructure Hardening & Policies",
        category: "cloud-infra",
        shortDescription: "Baseline security and hardening standards.",
        description: "Systematic hardening of your servers, network devices, and infrastructure configuration — backed by documented security policies that keep hardening consistent as your environment grows.",
        headline: "Harden Your Infrastructure",
        subheadline: "Systematic hardening of your servers, network devices, and infrastructure configuration.",
        serviceOverview: "Default configurations are built for compatibility, not security. Every unhardened server, unnecessary open service, and undocumented configuration decision is a potential entry point. Our Infrastructure Hardening & Policies service systematically hardens your servers and network infrastructure against recognized benchmarks, then documents the standards so hardening remains consistent as new systems are added.",
        whatWeTest: [
          { title: "Server hardening", description: "Windows and Linux against CIS Benchmark standards." },
          { title: "Network device configuration hardening", description: "Routers, switches, firewalls." },
          { title: "Removal of unnecessary services", description: "Ports, and default accounts." },
          { title: "Security policy documentation", description: "For baseline configurations going forward." },
          { title: "Logging and audit configuration", description: "To support monitoring and forensics." },
          { title: "Patch and configuration baseline alignment", description: "Across server fleets." },
          { title: "Change management policy design", description: "To prevent hardening drift over time." }
        ],
        technologiesCovered: "Windows Server Environments, Linux/Unix Server Environments, Network Devices (Routers, Switches, Firewalls), Virtualization Platforms (VMware, Hyper-V), Database Server Hardening (SQL Server, MySQL, PostgreSQL, MongoDB)",
        commonVulnerabilities: "Default or Weak Credentials on Infrastructure Devices, Unnecessary Open Ports & Running Services, Missing or Inconsistent Logging Configuration, Outdated TLS/SSL Configuration, Inconsistent Hardening Across Server Fleets, Lack of Documented Configuration Standards",
        methodology: [
          { title: "Infrastructure Inventory", description: "Catalog all in-scope servers, network devices, and platforms." },
          { title: "Baseline Gap Assessment", description: "Compare current configuration against CIS Benchmark and industry best-practice standards." },
          { title: "Hardening Execution", description: "Apply configuration changes to close identified gaps, coordinated to avoid service disruption." },
          { title: "Policy Documentation", description: "Document baseline configuration standards so future deployments follow the same hardened standard." },
          { title: "Logging & Audit Configuration", description: "Ensure sufficient logging is enabled to support ongoing monitoring and incident investigation." },
          { title: "Validation Testing", description: "Confirm hardening changes haven't broken required application or business functionality." },
          { title: "Ongoing Maintenance (Optional)", description: "Periodic reassessment to catch configuration drift as infrastructure evolves." }
        ],
        deliverables: [
          { title: "Closes Basic Security Gaps", description: "Closes basic but high-impact security gaps left by default configurations." },
          { title: "Creates Repeatable Standards", description: "Creates a documented, repeatable hardening standard rather than one-off manual fixes." },
          { title: "Reduces Attack Surface", description: "Reduces attack surface across your entire server and network device fleet." },
          { title: "Supports Compliance", description: "Supports compliance requirements around baseline security configuration standards." }
        ],
        faqs: [
          { question: "Will hardening our servers break any existing applications?", answer: "We conduct validation testing after hardening changes to catch compatibility issues, and coordinate closely with your application teams before implementing changes that carry higher risk of disruption." },
          { question: "Do you provide the hardening policy document, or just implement the changes?", answer: "Both — you receive a documented configuration standard your team can reference for all future deployments, not just a one-time list of changes made." },
          { question: "Can you harden both our cloud-hosted and on-premise servers?", answer: "Yes, hardening methodology is adapted appropriately for cloud-hosted infrastructure, on-premise data centers, and hybrid environments." },
          { question: "How do you prioritize which hardening changes to make first?", answer: "We prioritize based on security impact and implementation risk — closing high-impact, low-disruption gaps first, then working through more involved changes with proper testing." },
          { question: "Do you harden network devices like firewalls and switches, or only servers?", answer: "Network device hardening is included, covering routers, switches, and firewalls alongside server-level hardening." },
          { question: "Will this help with compliance audits requiring documented security baselines?", answer: "Yes, documented hardening standards and evidence of implementation directly support baseline configuration requirements under ISO 27001, PCI DSS, and similar frameworks." },
          { question: "How do we keep new servers hardened to the same standard going forward?", answer: "The policy documentation we provide is designed specifically for this — giving your provisioning team a clear, repeatable standard to apply to every new deployment." },
          { question: "Is ongoing maintenance included, or is this a one-time project?", answer: "Hardening itself is typically a one-time project per environment; ongoing maintenance and periodic reassessment are available separately to catch configuration drift over time." }
        ]
      }
    ]
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
        shortDescription: "Information security management system implementation and audit readiness.",
        description: "Structured gap assessment, control implementation support, and audit preparation to get your Information Security Management System (ISMS) certification-ready — without the guesswork.",
        headline: "Start Your ISO 27001 Readiness Assessment",
        subheadline: "Structured gap assessment, control implementation support, and audit preparation to get your Information Security Management System (ISMS) certification-ready.",
        serviceOverview: "ISO 27001 certification signals to customers, partners, and regulators that your organization manages information security through a formal, auditable system — not ad hoc effort. But getting there involves more than writing policies; it requires implemented controls, evidence of operation over time, and a management system that can withstand external audit scrutiny. Our ISO 27001 Readiness service guides you through gap assessment, control implementation, documentation, and audit preparation, so certification becomes a structured process rather than a last-minute scramble.",
        whatWeTest: [
          { title: "Initial gap assessment", description: "Against all 93 Annex A controls (ISO 27001:2022)." },
          { title: "ISMS scope definition", description: "And risk assessment methodology design." },
          { title: "Policy and procedure documentation", description: "Aligned to your actual operations." },
          { title: "Statement of Applicability (SoA)", description: "Development and justification." },
          { title: "Control implementation support", description: "Across technical and organizational domains." },
          { title: "Internal audit preparation", description: "And mock certification audit." },
          { title: "Evidence collection guidance", description: "For sustained control operation." }
        ],
        technologiesCovered: "ISO/IEC 27001:2022, Annex A Controls (Organizational, People, Physical, Technological), Risk Assessment & Treatment Methodology, Statement of Applicability (SoA), Internal Audit Program Design",
        commonVulnerabilities: "Undefined or Overly Broad ISMS Scope, Missing Risk Assessment Documentation, Policies That Don't Reflect Actual Practice, Incomplete Access Control & Asset Management Records, Lack of Evidence for Ongoing Control Operation, Missing Incident Response & Business Continuity Documentation",
        methodology: [
          { title: "Scoping & Kickoff", description: "Define ISMS boundaries, involved business units, and certification timeline." },
          { title: "Gap Assessment", description: "Evaluate current state against all applicable Annex A controls to identify what's missing or incomplete." },
          { title: "Risk Assessment & Treatment Planning", description: "Establish or refine your risk assessment methodology and treatment plan." },
          { title: "Documentation Development", description: "Build or update policies, procedures, and the Statement of Applicability." },
          { title: "Control Implementation Support", description: "Guide implementation of missing technical and organizational controls." },
          { title: "Internal Audit & Mock Assessment", description: "Conduct an internal audit simulating the certification body's assessment approach." },
          { title: "Certification Audit Support", description: "Assist your team through Stage 1 and Stage 2 external audits, addressing any findings raised." }
        ],
        deliverables: [
          { title: "Provides Clear Path", description: "Provides a clear, structured path to certification rather than an undefined compliance effort." },
          { title: "Builds Functional ISMS", description: "Builds a genuinely functional ISMS, not just audit-ready paperwork." },
          { title: "Strengthens Trust", description: "Strengthens customer and partner trust through recognized international certification." },
          { title: "Reduces Risk of Delay", description: "Reduces the risk of failed or delayed certification audits due to incomplete preparation." }
        ],
        faqs: [
          { question: "How long does ISO 27001 readiness typically take before certification?", answer: "Timelines vary based on organizational maturity and scope, but most organizations require 3–9 months of preparation before they're ready for the Stage 1 audit." },
          { question: "Do you conduct the actual certification audit?", answer: "No — certification audits must be conducted by an accredited certification body. We prepare your organization thoroughly so that external audit goes smoothly, but the certification decision itself rests with the certifying body." },
          { question: "Can you help us define which Annex A controls actually apply to us?", answer: "Yes, developing a justified Statement of Applicability — including which controls apply, which don't, and why — is a core part of this service." },
          { question: "Do we need to hire a dedicated compliance officer for this process?", answer: "Not necessarily. We work with whoever is designated internally to own the ISMS, whether that's a dedicated compliance role or an existing IT/security leader, and provide the expertise to fill gaps in specialized knowledge." },
          { question: "Will our existing security policies need to be rewritten from scratch?", answer: "Not always — we review existing documentation first and update or restructure it to align with ISO 27001 requirements rather than discarding work that's already usable." },
          { question: "What happens if the certification body finds gaps during the actual audit?", answer: "Minor non-conformities are common and manageable with a corrective action plan; our preparation process, including the mock audit, is specifically designed to minimize major findings during the real assessment." },
          { question: "Do you provide ongoing support after certification is achieved?", answer: "Yes, ongoing support for surveillance audits, internal audit programs, and maintaining the ISMS as your organization evolves is available as a continued engagement." },
          { question: "Is this suitable for a company pursuing ISO 27001 for the first time?", answer: "Yes, this service is designed for organizations at any stage — including first-time certification — and structures the process so nothing critical gets missed." }
        ]
      },
      {
        id: "cis-benchmark",
        slug: "cis-benchmark-compliance",
        name: "CIS Benchmark Compliance",
        category: "compliance",
        shortDescription: "Industry-standard security configuration baselines.",
        description: "Configuration assessment and hardening against CIS Benchmarks across your servers, cloud platforms, and network devices — turning an industry-recognized standard into your actual baseline.",
        headline: "Assess Your CIS Benchmark Compliance",
        subheadline: "Configuration assessment and hardening against CIS Benchmarks across your servers, cloud platforms, and network devices.",
        serviceOverview: "CIS Benchmarks provide detailed, consensus-based configuration standards for hundreds of technologies — but implementing and maintaining compliance against them across a real, evolving environment is a different challenge from simply reading the document. Our CIS Benchmark Compliance service assesses your servers, cloud platforms, and network infrastructure against the relevant CIS Benchmarks, validates findings manually, and provides a prioritized roadmap to close the gaps that matter most.",
        whatWeTest: [
          { title: "Operating system configuration", description: "Windows Server, Linux distributions against CIS OS Benchmarks." },
          { title: "Cloud platform configuration", description: "AWS, Azure, GCP against CIS Cloud Foundation Benchmarks." },
          { title: "Kubernetes and container configuration", description: "Against CIS Kubernetes Benchmark." },
          { title: "Database configuration", description: "SQL Server, MySQL, PostgreSQL, MongoDB against relevant CIS Benchmarks." },
          { title: "Network device configuration", description: "Against applicable CIS Benchmarks." },
          { title: "Web server and application platform configuration", description: "Apache, Nginx, IIS." }
        ],
        technologiesCovered: "CIS Critical Security Controls, CIS Benchmarks for Windows Server & Linux, CIS AWS/Azure/GCP Foundations Benchmarks, CIS Kubernetes Benchmark, CIS Docker Benchmark",
        commonVulnerabilities: "Missing Password & Account Lockout Policies, Unnecessary Services & Ports Enabled by Default, Insufficient Logging & Audit Configuration, Missing Encryption Requirements at the Configuration Level, Weak Default Permission Structures, Inconsistent Configuration Across Similar Systems",
        methodology: [
          { title: "Scope & Platform Identification", description: "Determine which CIS Benchmarks apply across your technology stack." },
          { title: "Automated Baseline Scanning", description: "Run configuration checks against the relevant CIS Benchmark controls." },
          { title: "Manual Validation", description: "Verify findings manually to confirm real-world risk and eliminate false positives from automated scoring alone." },
          { title: "Gap Prioritization", description: "Rank findings by security impact and implementation complexity, not just benchmark scoring level." },
          { title: "Remediation Roadmap Development", description: "Provide a clear, sequenced plan for closing identified gaps." },
          { title: "Implementation Support", description: "Assist your team in applying configuration changes safely, with rollback planning where needed." },
          { title: "Compliance Scoring & Reporting", description: "Deliver a clear compliance percentage and control-by-control status report." }
        ],
        deliverables: [
          { title: "Establishes Defensible Baseline", description: "Establishes a recognized, defensible security configuration baseline across your environment." },
          { title: "Provides Objective Evidence", description: "Provides objective, benchmarked evidence of security posture for customers and auditors." },
          { title: "Reduces Attack Surface", description: "Reduces attack surface through systematic configuration hardening." },
          { title: "Supports Frameworks", description: "Supports multiple compliance frameworks that reference CIS Benchmarks as an accepted standard." }
        ],
        faqs: [
          { question: "Do we need to comply with every CIS Benchmark control to pass?", answer: "No — CIS Benchmarks include both 'Level 1' (baseline) and 'Level 2' (more restrictive) recommendations. We help you determine which level is appropriate for each system based on your operational and security needs." },
          { question: "Will implementing CIS Benchmark controls break any of our applications?", answer: "Some hardening changes carry compatibility risk, which is why we validate changes in a controlled manner and prioritize testing before wide rollout, particularly for Level 2 controls." },
          { question: "How is this different from your Infrastructure Hardening service?", answer: "This service is specifically benchmarked and scored against the CIS standard for compliance and audit purposes; our infrastructure hardening service takes a broader, best-practice approach that may extend beyond strict CIS scoring." },
          { question: "Can you assess our compliance across multiple cloud providers at once?", answer: "Yes, each cloud provider is assessed against its own specific CIS Foundations Benchmark, with a consolidated view across your full multi-cloud environment." },
          { question: "Do you provide a compliance percentage score?", answer: "Yes, our reporting includes a clear compliance score per platform, alongside a control-by-control breakdown of pass/fail status and remediation guidance." },
          { question: "How often should we reassess CIS Benchmark compliance?", answer: "We typically recommend reassessment annually, or after significant infrastructure changes, with continuous monitoring available for organizations that need ongoing compliance tracking." },
          { question: "Is CIS Benchmark compliance required for any specific regulation?", answer: "While not always mandatory by name, CIS Benchmarks are widely accepted as evidence of reasonable security configuration under frameworks like PCI DSS, HIPAA, and ISO 27001." },
          { question: "Can you help us maintain compliance on an ongoing basis, not just a one-time assessment?", answer: "Yes, ongoing compliance tracking and periodic reassessment are available to ensure configuration drift doesn't erode your compliance posture over time." }
        ]
      },
      {
        id: "vapt-remediation",
        slug: "vapt-remediation-audit-closure-support",
        name: "VAPT Remediation & Audit Closure Support",
        category: "compliance",
        shortDescription: "Post-assessment remediation and verification support.",
        description: "Hands-on support turning vulnerability assessment findings into closed, verified fixes — so your audit doesn't stall on a remediation backlog nobody has time to work through.",
        headline: "Get Remediation & Closure Support",
        subheadline: "Hands-on support turning vulnerability assessment findings into closed, verified fixes — so your audit doesn't stall.",
        serviceOverview: "Receiving a VAPT report is only the first step — the real work, and the real audit risk, lies in closing every finding with evidence an auditor will accept. Many internal teams get stuck translating technical findings into fixes, tracking remediation progress, and proving closure. Our VAPT Remediation & Audit Closure Support service picks up exactly where any VAPT report leaves off, whether it's from Photon Security or another provider, and drives findings through to verified, audit-ready closure.",
        whatWeTest: [
          { title: "Translating technical VAPT findings", description: "Into clear, actionable remediation tasks." },
          { title: "Prioritizing remediation effort", description: "Based on business risk, not just CVSS score." },
          { title: "Hands-on guidance", description: "For development and infrastructure teams implementing fixes." },
          { title: "Verification retesting", description: "To confirm each finding is genuinely closed." },
          { title: "Auditor-ready evidence packages", description: "Documenting remediation and verification." },
          { title: "Coordination support", description: "During external audits when remediation questions arise." },
          { title: "Remediation tracking dashboards", description: "Showing real-time closure progress." }
        ],
        technologiesCovered: "Web Application Findings, API Security Findings, Network Penetration Test Findings, Mobile Application Findings, Cloud Security Assessment Findings, Findings From Any Third-Party VAPT Report",
        commonVulnerabilities: "Findings Assigned Without Clear Ownership, Development Teams Unsure How to Fix Specific Technical Issues, No Verification That a Deployed Fix Actually Closed the Finding, Remediation Stalling Close to Audit Deadlines, Missing Documentation Linking Fixes to Original Findings",
        methodology: [
          { title: "Findings Intake & Triage", description: "Review your existing VAPT report and organize findings by severity, system, and owning team." },
          { title: "Remediation Planning", description: "Translate each finding into a specific, actionable fix recommendation with implementation guidance." },
          { title: "Ownership Assignment", description: "Work with your team to assign clear ownership and realistic timelines per finding." },
          { title: "Implementation Support", description: "Provide hands-on technical guidance to development and infrastructure teams as fixes are implemented." },
          { title: "Verification Retesting", description: "Independently retest each remediated finding to confirm it's genuinely closed, not just marked complete." },
          { title: "Evidence Package Assembly", description: "Compile documentation linking each finding to its fix and verification result, formatted for audit review." },
          { title: "Audit Support", description: "Be available during the audit itself to answer remediation-related questions from assessors." }
        ],
        deliverables: [
          { title: "Prevents Audit Stalling", description: "Prevents audits from stalling due to an unresolved remediation backlog." },
          { title: "Provides Genuine Verification", description: "Provides genuine verification, not just self-reported 'fixed' status on a spreadsheet." },
          { title: "Reduces Internal Burden", description: "Reduces the burden on internal teams who may lack security-specific remediation expertise." },
          { title: "Produces Audit-Ready Docs", description: "Produces audit-ready documentation accepted by external assessors and certification bodies." }
        ],
        faqs: [
          { question: "Do you only support remediation for Photon Security's own VAPT reports?", answer: "No, this service works with VAPT and vulnerability assessment reports from any provider — we review the findings as provided and build a remediation plan around them." },
          { question: "How do you verify that a vulnerability has actually been fixed?", answer: "We perform independent retesting of each remediated finding using the same techniques that originally identified it, confirming the issue is genuinely closed rather than relying on a self-reported status." },
          { question: "Can your team actually implement the fixes, or only advise on them?", answer: "Our core role is technical guidance and verification; for organizations without in-house development capacity, we can also discuss extended implementation support depending on the nature of the fixes required." },
          { question: "How quickly can this service help us close findings before an audit deadline?", answer: "Timelines depend on finding volume and complexity, but our prioritized approach focuses first on findings most likely to block audit sign-off, maximizing progress within tight deadlines." },
          { question: "What does the audit-ready evidence package include?", answer: "It includes the original finding, remediation action taken, verification retest results, and dates — structured in a format auditors and certification bodies commonly expect to see." },
          { question: "Can you join calls with our external auditor or certification body if questions come up?", answer: "Yes, we can support your team directly during audit conversations related to remediation status and evidence, if that's helpful for the audit process." },
          { question: "Do you help us build an internal process so this isn't a recurring problem?", answer: "Yes, alongside closing your current backlog, we can help establish a repeatable remediation tracking process so future VAPT findings don't accumulate the same way." },
          { question: "Is this useful even if we're not facing an immediate audit deadline?", answer: "Yes — closing VAPT findings promptly and with verification is good security practice regardless of audit timing, and reduces real risk exposure in the meantime." }
        ]
      }
    ]
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
        description: "Ongoing, realistic phishing simulations paired with targeted training — turning your employees from your biggest attack surface into your first line of defense.",
        headline: "Launch a Phishing Awareness Program",
        subheadline: "Ongoing, realistic phishing simulations paired with targeted training — turning your employees from your biggest attack surface into your first line of defense.",
        serviceOverview: "Phishing remains the most common entry point for real-world breaches, and a single well-crafted email can bypass millions of dollars in technical controls. Our Phishing Awareness Programs run structured, ongoing simulated phishing campaigns tailored to your organization's actual risk profile, paired with immediate, targeted training for employees who fall for a simulation — building genuine behavioral change over time, not just a one-off compliance exercise.",
        whatWeTest: [
          { title: "Ongoing simulated campaigns", description: "Scheduled phishing simulation campaigns of increasing sophistication." },
          { title: "Role-based targeting", description: "Finance, HR, and executive teams receive scenario-relevant simulations." },
          { title: "Automated micro-training", description: "Triggered immediately when an employee clicks a simulated phishing link." },
          { title: "Reporting-behavior tracking", description: "To measure how many employees correctly report suspicious emails." },
          { title: "Campaign variation", description: "Across email, and where relevant, SMS (smishing) and voice (vishing) vectors." },
          { title: "Performance benchmarking", description: "Departmental and organization-wide over time." },
          { title: "Executive reporting", description: "Summarizing risk trends and program effectiveness." }
        ],
        technologiesCovered: "Phishing Simulation Platforms, Email Gateways & Reporting Add-ins, Interactive Micro-Training Modules, Smishing (SMS) & Vishing (Voice) Simulation Tools",
        commonVulnerabilities: "Credential Harvesting Emails, Business Email Compromise (BEC) Scenarios, Invoice & Payment Fraud Simulations, Fake IT/Helpdesk Requests, Executive Impersonation Attempts, Malicious Attachment & Link Scenarios, SMS-Based Phishing (Smishing)",
        methodology: [
          { title: "Baseline Assessment", description: "Run an initial phishing simulation to establish your organization's current susceptibility rate." },
          { title: "Program Design", description: "Structure a campaign calendar with escalating sophistication and role-based scenario targeting." },
          { title: "Simulated Campaign Execution", description: "Deploy realistic phishing simulations on a scheduled, ongoing cadence." },
          { title: "Immediate Micro-Training", description: "Employees who click a simulated link receive instant, short-form training explaining the red flags they missed." },
          { title: "Reporting Behavior Tracking", description: "Monitor how many employees correctly identify and report simulations, not just who avoided clicking." },
          { title: "Trend Analysis", description: "Track susceptibility and reporting rates over time, by department and organization-wide." },
          { title: "Executive Reporting", description: "Regular summaries showing program impact, risk trends, and areas needing reinforcement." }
        ],
        deliverables: [
          { title: "Reduces Susceptibility", description: "Reduces real-world susceptibility to phishing attacks through repeated, realistic practice." },
          { title: "Builds Reporting Culture", description: "Builds a reporting culture where employees flag suspicious emails instead of ignoring them." },
          { title: "Provides Trackable Data", description: "Provides measurable, trackable risk reduction data for leadership and compliance reporting." },
          { title: "Targets Training Effectively", description: "Targets training where it's actually needed, rather than one-size-fits-all annual sessions." }
        ],
        faqs: [
          { question: "Will employees know in advance that simulations are happening?", answer: "Employees are typically informed that phishing simulations are part of an ongoing awareness program, but not given advance notice of specific campaign timing or content, to ensure realistic results." },
          { question: "What happens if an employee clicks a simulated phishing link?", answer: "They're immediately shown a short, non-punitive training module explaining what red flags were present in that specific email, reinforcing the lesson at the moment it's most relevant." },
          { question: "Can simulations be tailored to specific departments, like finance or HR?", answer: "Yes, role-based targeting is a core part of the program — finance teams might receive invoice fraud scenarios, while HR might see fake resume or benefits-related phishing attempts." },
          { question: "How often do phishing simulations run?", answer: "Cadence is agreed during program design, typically monthly or bi-monthly, with increasing sophistication over time as baseline awareness improves." },
          { question: "Do you track whether employees report suspicious emails, not just whether they click?", answer: "Yes, reporting behavior is tracked as a key metric — an organization where employees actively report suspicious emails is meaningfully more resilient than one that simply avoids clicking." },
          { question: "Is this suitable for organizations with remote or distributed teams?", answer: "Yes, the program is fully deliverable to remote and distributed employees, with simulations and training delivered digitally regardless of location." },
          { question: "Will repeat offenders be penalized or reported to management?", answer: "Our default approach is educational and non-punitive, focused on building awareness through repetition; if your organization wants specific escalation policies for repeat clicks, we can help you design that separately." },
          { question: "Can you include SMS or voice-based phishing simulations, not just email?", answer: "Yes, smishing (SMS) and vishing (voice) simulation scenarios are available as an extension to the core email-based program." }
        ]
      },
      {
        id: "training",
        slug: "security-training-employees",
        name: "Security Training for Employees",
        category: "awareness",
        shortDescription: "Role-based security training programs.",
        description: "Practical, role-relevant security training that goes beyond a once-a-year compliance video — building security awareness that actually changes day-to-day behavior.",
        headline: "Schedule Employee Security Training",
        subheadline: "Practical, role-relevant security training that goes beyond a once-a-year compliance video.",
        serviceOverview: "Most security incidents don't start with a sophisticated exploit — they start with an employee making a decision without the context to recognize risk. Generic, once-a-year compliance training rarely changes behavior. Our Security Training for Employees delivers practical, role-relevant content — live sessions, self-paced modules, or a blended approach — designed to build genuine security awareness that holds up in the moments that actually matter.",
        whatWeTest: [
          { title: "Role-based training tracks", description: "General staff, IT/technical teams, executives, finance, HR." },
          { title: "Live, instructor-led training", description: "Delivered on-site or virtually." },
          { title: "Self-paced e-learning", description: "Modules for flexible, ongoing training cycles." },
          { title: "New-hire security onboarding", description: "Training modules." },
          { title: "Knowledge assessments", description: "Quizzes to measure actual comprehension, not just attendance." },
          { title: "Compliance-aligned content", description: "ISO 27001, PCI DSS, HIPAA awareness clauses." },
          { title: "Customized content", description: "Reflecting your organization's specific tools, policies, and past incidents." }
        ],
        technologiesCovered: "Learning Management Systems (LMS), Interactive e-Learning Modules, Live Virtual Training Platforms, Compliance-Mapped Curriculums",
        commonVulnerabilities: "Password Security & Credential Hygiene, Phishing & Social Engineering Recognition, Safe Use of Cloud & Collaboration Tools, Data Handling & Classification Basics, Physical Security & Clean Desk Practices, Incident Reporting Procedures, Remote Work & BYOD Security, Executive-Specific Threat Awareness",
        methodology: [
          { title: "Training Needs Assessment", description: "Identify role-specific risks and existing knowledge gaps across your workforce." },
          { title: "Curriculum Customization", description: "Tailor content to your industry, tools, policies, and any relevant past incidents." },
          { title: "Delivery Format Selection", description: "Choose live sessions, self-paced modules, or a blended program based on your team's needs." },
          { title: "Training Delivery", description: "Conduct sessions across relevant employee groups, from general staff to specialized roles." },
          { title: "Knowledge Assessment", description: "Test comprehension through quizzes or scenario-based assessments following training." },
          { title: "Reporting & Gap Analysis", description: "Identify departments or individuals needing reinforcement based on assessment results." },
          { title: "Ongoing Refresher Cycles", description: "Schedule periodic refresher training to keep awareness current as threats evolve." }
        ],
        deliverables: [
          { title: "Reduces Human Error", description: "Reduces human-error-driven security incidents through practical, retained knowledge." },
          { title: "Supports Compliance", description: "Supports compliance requirements that mandate documented security awareness training." },
          { title: "Builds Security Culture", description: "Builds a security-conscious culture rather than a checkbox training exercise." },
          { title: "Provides Measurable Evidence", description: "Provides measurable evidence of training effectiveness through assessment data." }
        ],
        faqs: [
          { question: "Is this training delivered live, or is it self-paced e-learning?", answer: "Both formats are available, and many organizations use a blended approach — live sessions for deeper engagement combined with self-paced modules for flexibility and ongoing reinforcement." },
          { question: "Can training content be customized to reference our actual tools and policies?", answer: "Yes, customization to reflect your specific technology stack, internal policies, and even sanitized examples from past incidents is a standard part of the service." },
          { question: "Do you provide separate training tracks for technical and non-technical staff?", answer: "Yes, role-based tracks ensure IT and technical teams receive more advanced content, while general staff receive practical, relevant guidance suited to their daily work." },
          { question: "How do you measure whether training actually worked?", answer: "Knowledge assessments and quizzes following training sessions provide measurable data on comprehension, which we use to identify gaps and inform future training focus." },
          { question: "Is this training suitable for compliance requirements like ISO 27001 or HIPAA?", answer: "Yes, training content is structured to align with the security awareness requirements found in ISO 27001, HIPAA, PCI DSS, and similar frameworks, with documentation suitable for audit evidence." },
          { question: "How often should employee security training be repeated?", answer: "We typically recommend annual comprehensive training with shorter, more frequent refresher touchpoints throughout the year to keep awareness active rather than a once-a-year memory." },
          { question: "Can you train new hires as part of their onboarding process?", answer: "Yes, new-hire security onboarding modules are available and can be integrated into your existing onboarding workflow." },
          { question: "Do you provide training specifically for executives and leadership?", answer: "Yes, executive-specific training is available, addressing the unique targeting risks leadership faces, including business email compromise and whaling-style attacks." }
        ]
      },
      {
        id: "hygiene",
        slug: "cyber-hygiene-workshops",
        name: "Cyber Hygiene Workshops",
        category: "awareness",
        shortDescription: "Practical security best practices.",
        description: "Focused, practical workshops covering the everyday security habits that prevent the majority of common incidents — delivered in a format that fits busy teams.",
        headline: "Book a Cyber Hygiene Workshop",
        subheadline: "Focused, practical workshops covering the everyday security habits that prevent the majority of common incidents.",
        serviceOverview: "Not every security topic needs a lengthy training program — many of the most impactful improvements come from simple, consistently applied habits. Our Cyber Hygiene Workshops are focused, practical sessions covering the everyday security behaviors that prevent the majority of common incidents, delivered in a format designed to fit into busy team schedules without feeling like a lecture.",
        whatWeTest: [
          { title: "Password hygiene", description: "And password manager adoption." },
          { title: "Multi-factor authentication", description: "Setup and importance." },
          { title: "Safe browsing habits", description: "And recognizing suspicious websites." },
          { title: "Secure use of personal devices", description: "For work (BYOD practices)." },
          { title: "Safe file sharing", description: "And cloud storage habits." },
          { title: "Recognizing social engineering", description: "Avoiding common tactics." },
          { title: "Home network security", description: "And remote work basics." },
          { title: "Practical incident reporting", description: "What to do and who to tell." }
        ],
        technologiesCovered: "Password Managers, Multi-Factor Authentication (MFA) Tools, Secure Browsers & Extensions, VPNs & Secure Remote Access",
        commonVulnerabilities: "Single-Session Focused Workshops (60–90 minutes), Multi-Session Workshop Series, Department-Specific Sessions, Lunch-and-Learn Style Informal Sessions, New Employee Onboarding Add-On Sessions",
        methodology: [
          { title: "Topic Selection & Scoping", description: "Identify the specific hygiene topics most relevant to your organization's current risk areas." },
          { title: "Format Planning", description: "Choose session length, delivery style, and whether sessions are department-specific or organization-wide." },
          { title: "Workshop Delivery", description: "Conduct interactive, practical sessions on-site or virtually, focused on actionable habits rather than theory." },
          { title: "Live Demonstrations", description: "Where relevant, demonstrate tools like password managers or MFA setup directly during the session." },
          { title: "Takeaway Resources", description: "Provide simple reference materials employees can revisit after the session." },
          { title: "Feedback Collection", description: "Gather participant feedback to refine future sessions." },
          { title: "Follow-Up Reinforcement", description: "Schedule periodic refresher workshops to keep habits consistent over time." }
        ],
        deliverables: [
          { title: "Builds Practical Habits", description: "Builds practical, everyday habits that reduce the likelihood of common security incidents." },
          { title: "Respects Time", description: "Delivered in short, digestible formats that respect employees' time." },
          { title: "Complements Broad Training", description: "Complements broader security training programs with focused, reinforcing sessions." },
          { title: "Easy to Schedule", description: "Easy to schedule as recurring sessions without requiring a full training overhaul." }
        ],
        faqs: [
          { question: "How long does a typical workshop session run?", answer: "Most sessions run 60–90 minutes, designed to be focused and practical rather than a lengthy, theory-heavy training day." },
          { question: "Can workshops be delivered virtually for remote teams?", answer: "Yes, workshops are available both on-site and virtually, with interactive elements adapted appropriately for remote delivery." },
          { question: "Is this different from your full Security Training for Employees service?", answer: "Yes — cyber hygiene workshops are shorter, more focused sessions on specific practical habits, while our broader employee training service covers a wider curriculum with formal assessments and compliance alignment." },
          { question: "Can we choose specific topics relevant to recent incidents or concerns?", answer: "Yes, workshop content can be tailored to focus on specific topics your organization wants to address, including lessons from recent internal incidents where appropriate." },
          { question: "Do you provide any tools or resources during the workshop, like password managers?", answer: "We can demonstrate recommended tools like password managers or MFA setup during the session; providing organization-wide licenses for such tools would be a separate discussion based on your needs." },
          { question: "How many employees can attend a single workshop session?", answer: "Session capacity is flexible and can be scaled from small team sessions to organization-wide workshops, depending on your preferred format and venue or platform capacity." },
          { question: "Can these workshops be run as a recurring series throughout the year?", answer: "Yes, many organizations schedule these as quarterly or bi-annual recurring sessions to keep good habits consistently reinforced." },
          { question: "Are these workshops suitable for non-technical staff?", answer: "Yes, workshops are specifically designed to be accessible and practical for non-technical employees, avoiding jargon in favor of clear, actionable guidance." }
        ]
      },
      {
        id: "se-sim",
        slug: "social-engineering-attack-simulation",
        name: "Social Engineering Attack Simulation",
        category: "awareness",
        shortDescription: "Real-world social engineering testing.",
        description: "Realistic simulated attacks — phone-based pretexting, physical intrusion attempts, and targeted impersonation — testing whether your human defenses hold up against tactics no firewall can stop.",
        headline: "Request a Social Engineering Simulation",
        subheadline: "Testing whether your human defenses hold up against tactics no firewall can stop.",
        serviceOverview: "Technical controls can't stop an attacker who simply asks the right person the right question, or walks through the right door holding a clipboard and a confident tone. Our Social Engineering Attack Simulation service tests your organization's human and physical security defenses through realistic, controlled simulations — phone-based pretexting, targeted impersonation, and physical intrusion attempts — revealing gaps that no technical assessment alone can uncover.",
        whatWeTest: [
          { title: "Vishing (Voice Phishing)", description: "Phone-based pretexting attempting to extract sensitive information or access." },
          { title: "Pretexting Scenarios", description: "Impersonating vendors, delivery personnel, IT support, or new employees to test verification processes." },
          { title: "Physical Intrusion Testing", description: "Attempting to gain unauthorized physical access to offices or restricted areas." },
          { title: "Tailgating Simulation", description: "Testing whether employees challenge unbadged individuals following them through secure entry points." },
          { title: "USB Drop Testing", description: "Assessing whether employees plug in unknown USB devices found in common areas." },
          { title: "Targeted Executive Impersonation", description: "Simulating attacks that specifically leverage authority and urgency against staff." }
        ],
        technologiesCovered: "Voice & SMS Pretexting Tactics, Physical Access Control Bypasses, Open-Source Intelligence (OSINT) Reconnaissance, USB Payload Dropping",
        commonVulnerabilities: "Fake IT Support Calls Requesting Credentials, Vendor/Delivery Impersonation for Physical Access, Executive Impersonation Requesting Urgent Action, Tailgating Into Secure Facilities, USB Drop in Common Areas, Fake New-Employee Access Requests, Social Media Reconnaissance-Based Pretexting",
        methodology: [
          { title: "Scoping & Rules of Engagement", description: "Define which scenarios, locations, and departments are in scope, along with clear boundaries and safety protocols." },
          { title: "Reconnaissance", description: "Gather publicly available information about the organization to build realistic pretexts, mirroring real attacker research." },
          { title: "Scenario Execution", description: "Conduct simulated vishing calls, physical intrusion attempts, or targeted impersonation scenarios as scoped." },
          { title: "Real-Time Safety Monitoring", description: "A designated internal contact is kept informed to manage any safety or escalation concerns during physical testing." },
          { title: "Documentation of Outcomes", description: "Record precisely what worked, what didn't, and which specific behaviors need reinforcement." },
          { title: "Reporting", description: "Detailed findings covering successful and unsuccessful attempts, without singling out individual employees punitively." },
          { title: "Debrief & Training Recommendations", description: "Present findings alongside specific, practical recommendations for policy and training improvements." }
        ],
        deliverables: [
          { title: "Reveals Real Gaps", description: "Reveals real gaps in verification processes and physical security controls." },
          { title: "Tests Beyond Technology", description: "Tests defenses that technical assessments and phishing simulations alone can't cover." },
          { title: "Provides Concrete Evidence", description: "Provides concrete, scenario-based evidence to justify policy or process changes." },
          { title: "Builds Awareness", description: "Builds organizational awareness of tactics attackers actually use in the real world." }
        ],
        faqs: [
          { question: "Is this safe and legal to conduct against our own organization?", answer: "Yes, all simulations are conducted under a clearly defined scope and rules of engagement agreed with your organization in advance, with a designated internal contact aware of testing windows to manage any safety concerns." },
          { question: "Will individual employees be named or penalized in the report?", answer: "No, our default reporting approach focuses on systemic gaps and behavioral trends rather than singling out individual employees, keeping the exercise constructive rather than punitive." },
          { question: "What happens if a physical intrusion attempt is detected by security or staff?", answer: "Our team carries authorization documentation and a direct contact number for your designated internal point of contact, allowing quick verification and de-escalation if challenged." },
          { question: "Can we limit testing to just phone-based social engineering, without physical intrusion attempts?", answer: "Yes, scope is fully customizable — you can choose to include only vishing and pretexting, only physical testing, or a combination based on your organization's priorities and risk areas." },
          { question: "How do you decide which pretexts or scenarios to use?", answer: "Scenarios are built using realistic reconnaissance techniques mirroring what an actual attacker might use, tailored to your industry, organizational structure, and specific concerns raised during scoping." },
          { question: "Is this suitable for organizations without a large physical office footprint?", answer: "Yes, phone-based and remote social engineering scenarios can be conducted independent of physical office testing, making this relevant even for fully remote organizations." },
          { question: "How often should social engineering simulations be conducted?", answer: "Annual testing is a common baseline, though organizations in higher-risk industries or with previous findings needing validation may benefit from more frequent simulations." },
          { question: "Do you provide training based on the specific gaps found during simulation?", answer: "Yes, findings directly inform targeted training and workshop recommendations addressing the specific behaviors and gaps observed during the simulation." }
        ]
      }
    ]
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
        description: "Continuous discovery and monitoring of every internet-facing asset your organization owns — including the ones nobody remembers deploying.",
        headline: "Map Your Attack Surface",
        subheadline: "Continuous discovery and monitoring of every internet-facing asset your organization owns.",
        serviceOverview: "You can't secure what you don't know exists. Forgotten subdomains, staging environments left publicly accessible, cloud storage spun up by a marketing team, an old API still responding on a decommissioned server — these are exactly the assets attackers find first, because they're outside the scope of what your internal team is actively watching. Our Attack Surface Management service continuously discovers, monitors, and assesses every internet-facing asset associated with your organization, giving you visibility into your real, current exposure rather than the exposure you assume you have.",
        whatWeTest: [
          { title: "Continuous discovery", description: "Of domains, subdomains, and internet-facing assets." },
          { title: "Shadow IT detection", description: "And forgotten infrastructure still publicly accessible." },
          { title: "Exposure monitoring", description: "For open ports, misconfigured services, and exposed admin panels." },
          { title: "SSL/TLS certificate monitoring", description: "For expiry and misconfiguration." },
          { title: "Cloud asset discovery", description: "Across known and unknown provider accounts." },
          { title: "Third-party exposure tracking", description: "Where relevant to your supply chain." },
          { title: "Real-time alerting", description: "When new exposed assets or changes are detected." }
        ],
        technologiesCovered: "DNS Reconnaissance Tools, Port Scanners, Web Crawlers, Cloud Discovery Tools, Certificate Transparency Monitors, Asset Inventory Platforms",
        commonVulnerabilities: "Exposed Subdomains & DNS Records, Forgotten Staging & Development Environments, Open Ports & Exposed Services, Misconfigured Cloud Storage, Exposed Admin & Management Interfaces, Expired or Misconfigured SSL/TLS Certificates, Leaked API Keys Found in Public Repositories",
        methodology: [
          { title: "Initial Discovery Sweep", description: "Map your organization's known and unknown internet-facing footprint using passive and active reconnaissance techniques." },
          { title: "Asset Verification", description: "Confirm ownership and relevance of discovered assets, filtering out false positives." },
          { title: "Baseline Exposure Assessment", description: "Identify current-state risks across all confirmed assets." },
          { title: "Continuous Monitoring Setup", description: "Establish ongoing scanning to detect new assets and changes to existing ones." },
          { title: "Real-Time Alerting", description: "Notify your team immediately when new exposure or a newly discovered risky asset appears." },
          { title: "Prioritized Reporting", description: "Regular reporting ranking exposures by real-world risk, not just raw count." },
          { title: "Ongoing Review", description: "Periodic check-ins to refine monitoring scope as your infrastructure evolves." }
        ],
        deliverables: [
          { title: "Eliminates Blind Spots", description: "Eliminates blind spots created by shadow IT and forgotten infrastructure." },
          { title: "Provides Continuous Visibility", description: "Provides continuous visibility instead of a stale, point-in-time asset inventory." },
          { title: "Reduces Exposure Window", description: "Reduces the window between an asset becoming exposed and someone noticing." },
          { title: "Agentless Discovery", description: "Requires no agents or internal deployment — visibility built entirely from the outside-in, attacker's perspective." }
        ],
        faqs: [
          { question: "Do we need to install any agents or software for this service?", answer: "No, Attack Surface Management is entirely external and agentless — we discover and monitor your footprint the same way an attacker would, from the outside." },
          { question: "How do you find assets we don't already know about?", answer: "We use a combination of passive reconnaissance (DNS records, certificate transparency logs, public data sources) and active discovery techniques to build a comprehensive map of your organization's internet-facing presence." },
          { question: "What happens when you discover a newly exposed asset?", answer: "You're alerted in real time with details of the asset, what's exposed, and the associated risk level, so your team can investigate and remediate quickly." },
          { question: "Can this help us catch shadow IT created by other departments?", answer: "Yes, this is one of the most common and valuable findings — infrastructure spun up outside of IT's visibility, such as marketing microsites or unofficial cloud storage, is frequently surfaced through this service." },
          { question: "Do you monitor third-party or vendor infrastructure connected to us?", answer: "Where relevant to your supply chain risk, we can extend monitoring to include known vendor-related exposure, though primary focus remains on assets under your direct ownership." },
          { question: "How is this different from a one-time external network penetration test?", answer: "A penetration test is a scoped, point-in-time assessment against known assets. Attack Surface Management is continuous and specifically designed to discover assets you may not even know exist." },
          { question: "Will you actively exploit any exposed assets you find?", answer: "No, this service is focused on discovery, exposure assessment, and alerting — active exploitation, where needed, is scoped separately as a penetration testing engagement." },
          { question: "How quickly are we alerted to a new exposure?", answer: "Our monitoring operates continuously, with alerts typically generated within hours of a new asset or exposure appearing, depending on the specific change and detection method involved." }
        ]
      },
      {
        id: "darkweb",
        slug: "dark-web-monitoring",
        name: "Dark Web Monitoring",
        category: "specialized",
        shortDescription: "Detect credential leaks and breaches.",
        description: "Continuous monitoring of dark web forums, marketplaces, and leak sites for exposed credentials, data, and mentions of your organization — so you find out before an attacker acts on it.",
        headline: "Start Dark Web Monitoring",
        subheadline: "Continuous monitoring of dark web forums, marketplaces, and leak sites for exposed credentials and data.",
        serviceOverview: "By the time a data breach or leaked credential set becomes public knowledge, it may have already circulated on dark web forums and marketplaces for weeks or months. Our Dark Web Monitoring service continuously scans underground forums, marketplaces, paste sites, and breach databases for any mention of your organization, domains, employee credentials, or customer data — giving your team a critical early warning window to act before damage escalates.",
        whatWeTest: [
          { title: "Employee and customer credential leaks", description: "Tied to your domains." },
          { title: "Company and brand mentions", description: "Across dark web forums and marketplaces." },
          { title: "Leaked internal documents", description: "Source code, or database dumps." },
          { title: "Compromised third-party credentials", description: "That could enable access to your systems." },
          { title: "Executive mentions", description: "In targeting-related discussions." },
          { title: "Ransomware group claims", description: "And leak-site postings referencing your organization." },
          { title: "Stolen payment card data", description: "Associated with your customer base, where applicable." }
        ],
        technologiesCovered: "Dark Web Forumns & Marketplaces, Paste Sites (Pastebin and similar), Known Breach Databases, Ransomware Leak Sites, Telegram Channels Used for Data Trading, Underground Credential Marketplaces",
        commonVulnerabilities: "Account Takeover From Reused Credentials, Business Email Compromise Using Leaked Executive Details, Ransomware Follow-Through After Initial Access Sale, Customer Trust Damage From Undetected Data Exposure, Regulatory Penalties From Delayed Breach Notification",
        methodology: [
          { title: "Monitoring Profile Setup", description: "Define your domains, brand names, executive names, and other identifiers to monitor." },
          { title: "Source Configuration", description: "Configure monitoring across relevant dark web forums, marketplaces, and breach databases." },
          { title: "Continuous Scanning", description: "Ongoing automated and analyst-reviewed scanning across configured sources." },
          { title: "Relevance Filtering", description: "Analysts verify findings are genuinely relevant before alerting, reducing noise from false matches." },
          { title: "Real-Time Alerting", description: "Immediate notification for high-urgency findings such as active credential sales or leak-site postings." },
          { title: "Guided Response Recommendations", description: "Clear next steps provided alongside each alert — password resets, account monitoring, or broader investigation." },
          { title: "Regular Reporting", description: "Periodic summaries of monitoring activity and trend patterns relevant to your organization." }
        ],
        deliverables: [
          { title: "Provides Early Warning", description: "Provides an early warning window before leaked data is actively exploited." },
          { title: "Reduces Account Takeover Risk", description: "Reduces risk of account takeover from credential reuse across services." },
          { title: "Supports Breach Notification", description: "Supports faster, more informed breach notification decisions where required by regulation." },
          { title: "Strengthens Executive Protection", description: "Strengthens protection against targeted attacks on executives and key personnel." }
        ],
        faqs: [
          { question: "How do you access the dark web to monitor these sources safely?", answer: "Our analysts use specialized, controlled access methods and monitoring tools designed specifically for dark web intelligence gathering, without your organization needing any direct exposure to these environments." },
          { question: "What happens if our employee credentials are found in a leak?", answer: "You're alerted immediately with details of what was found and its source, along with recommended actions such as forced password resets and monitoring for suspicious account activity." },
          { question: "Can you monitor for our customers' data specifically, not just employees?", answer: "Yes, monitoring can be configured to include customer data exposure where relevant, particularly for organizations handling sensitive customer information such as financial or healthcare data." },
          { question: "Do you monitor ransomware leak sites for mentions of our organization?", answer: "Yes, ransomware group leak sites are actively monitored, providing early warning if your organization is named as a victim or if data is being posted or auctioned." },
          { question: "How quickly will we be alerted to a critical finding?", answer: "Critical, high-urgency findings such as active credential sales or ransomware leak postings are alerted immediately, outside of the standard reporting cycle." },
          { question: "Will this monitoring generate a lot of false positives?", answer: "Our analysts manually verify relevance before alerting your team, specifically to avoid the alert fatigue that comes from unfiltered automated dark web scanning tools." },
          { question: "Can dark web monitoring help with regulatory breach notification requirements?", answer: "Yes, early detection supports faster, better-informed decisions around breach notification obligations under frameworks like GDPR, DPDP Act, and sector-specific regulations." },
          { question: "Is this a one-time scan or an ongoing service?", answer: "This is an ongoing, continuous monitoring service — dark web content changes constantly, and a one-time scan would only capture a single moment in an environment that shifts daily." }
        ]
      },
      {
        id: "antiphish",
        slug: "anti-phishing-anti-rogue",
        name: "Anti-Phishing & Anti-Rogue",
        category: "specialized",
        shortDescription: "Protect against phishing and rogue apps.",
        description: "Active detection and takedown of phishing domains, fake mobile apps, and rogue impersonation of your brand — protecting your customers from attacks that happen entirely outside your own infrastructure.",
        headline: "Protect Your Brand From Impersonation",
        subheadline: "Active detection and takedown of phishing domains, fake mobile apps, and rogue impersonation.",
        serviceOverview: "Attackers don't need to breach your systems to harm your customers or your brand — a convincing phishing domain, a fake mobile app, or a fraudulent social media profile impersonating your organization can do plenty of damage entirely outside your infrastructure. Our Anti-Phishing & Anti-Rogue service actively monitors for these external threats and drives takedown action, protecting your customers and brand reputation from impersonation attacks you'd otherwise have no visibility into.",
        whatWeTest: [
          { title: "Phishing domain detection", description: "Including typosquatting and homograph variations of your domains." },
          { title: "Fake mobile app detection", description: "Across app stores and third-party app repositories." },
          { title: "Social media impersonation", description: "Monitoring across major platforms." },
          { title: "Fraudulent advertisements", description: "Or listings using your brand without authorization." },
          { title: "Phishing kit identification", description: "Targeting your customers or employees." },
          { title: "Active takedown coordination", description: "With hosting providers, registrars, and platforms." },
          { title: "Ongoing monitoring", description: "For repeat or evolving impersonation campaigns." }
        ],
        technologiesCovered: "Domain Registration Monitoring, App Store Scrapers, Social Media Intelligence Tools, Takedown Request Frameworks",
        commonVulnerabilities: "Typosquatted & Homograph Domains, Cloned Login Pages Mimicking Your Website, Fake Mobile Apps Impersonating Your Brand, Fraudulent Social Media Profiles, Phishing Emails Spoofing Your Domain, Fake Customer Support Accounts, Unauthorized Use of Your Logo/Brand in Ads or Listings",
        methodology: [
          { title: "Brand Profile Setup", description: "Define your domains, logos, app names, and other brand identifiers to monitor for impersonation." },
          { title: "Continuous Monitoring", description: "Ongoing scanning across domain registrations, app stores, social platforms, and phishing intelligence sources." },
          { title: "Verification & Triage", description: "Confirm genuine impersonation versus coincidental similarity before taking action." },
          { title: "Evidence Collection", description: "Document confirmed impersonation instances with the evidence needed for takedown requests." },
          { title: "Takedown Coordination", description: "Submit and follow up on takedown requests with hosting providers, domain registrars, app stores, and social platforms." },
          { title: "Escalation for Non-Compliant Providers", description: "Pursue additional escalation channels when initial takedown requests are ignored or delayed." },
          { title: "Ongoing Reporting", description: "Regular updates on detected threats, takedown status, and recurring campaign patterns." }
        ],
        deliverables: [
          { title: "Protects Customers", description: "Protects customers from fraud carried out under your brand's name, reducing reputational damage." },
          { title: "Reduces Fraud Losses", description: "Reduces financial fraud losses tied to phishing campaigns targeting your customer base." },
          { title: "Provides External Visibility", description: "Provides visibility into external threats your internal security team has no direct way to monitor." },
          { title: "Demonstrates Proactivity", description: "Demonstrates proactive brand protection to customers, partners, and regulators." }
        ],
        faqs: [
          { question: "How do you find phishing domains before they're reported to us by customers?", answer: "We proactively monitor domain registrations, certificate transparency logs, and phishing intelligence feeds for new domains resembling yours, often catching them before or shortly after they go live." },
          { question: "What happens once a phishing domain or fake app is confirmed?", answer: "We initiate takedown requests with the relevant hosting provider, registrar, or app store, and continue following up until the impersonating asset is removed or access is blocked." },
          { question: "How long does a typical takedown take?", answer: "Timelines vary significantly by provider — some hosting providers and app stores act within 24–48 hours, while others can take longer, particularly for domains hosted in less cooperative jurisdictions. We pursue escalation options where initial requests stall." },
          { question: "Can you monitor for fake apps across both Google Play and Apple's App Store?", answer: "Yes, monitoring covers major official app stores as well as commonly abused third-party app repositories where fraudulent apps often first appear." },
          { question: "Do you monitor social media platforms for fake accounts impersonating our brand or executives?", answer: "Yes, social media impersonation monitoring is included, covering fraudulent profiles, pages, and posts using your brand or leadership team's identity." },
          { question: "Will this stop all phishing attempts against our customers?", answer: "No service can guarantee zero phishing attempts, but active monitoring and rapid takedown significantly reduce the window of exposure and limit how long a fraudulent asset remains active and effective." },
          { question: "Is this useful for organizations without a large existing customer base?", answer: "Yes — brand impersonation risk exists regardless of company size, and early detection is often more valuable for smaller organizations that lack the internal resources to monitor for it themselves." },
          { question: "Do you provide evidence we can use for law enforcement reporting if needed?", answer: "Yes, documented evidence of confirmed impersonation is provided in a format suitable for law enforcement or regulatory reporting where your organization chooses to pursue that route." }
        ]
      }
    ]
  }
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
