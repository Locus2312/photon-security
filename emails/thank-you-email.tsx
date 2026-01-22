import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ThankYouEmailProps {
  name: string;
  company: string;
}

const baseUrl = "https://photonsecurity.in";

export const ThankYouEmail = ({ name, company }: ThankYouEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Photon Security</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={header}>
            <Link href="https://photonsecurity.in">
              <Img
                src={`${baseUrl}/assets/logo_no_bg.png`}
                alt="Photon Security"
                style={logo}
                width={250}
                height={250}
              />
            </Link>
          </Section>

          {/* Content Section */}
          <Section style={content}>
            <Heading style={heading}>Thank You for Reaching Out!</Heading>

            <Section style={messageSection}>
              <Text style={greeting}>Hello {name},</Text>

              <Text style={paragraph}>
                Thank you for contacting <strong>Photon Security</strong>. We've
                received your message and appreciate you taking the time to
                reach out to us.
              </Text>

              <Text style={paragraph}>
                Our team is reviewing your inquiry and will get back to you
                within <strong>24-48 hours</strong>. We're excited to learn more
                about how we can help secure {company}.
              </Text>

              <Text style={paragraph}>
                In the meantime, feel free to explore our{" "}
                <Link href={`${baseUrl}/services`} style={link}>
                  services
                </Link>{" "}
                or learn more about our{" "}
                <Link href={`${baseUrl}/about`} style={link}>
                  company
                </Link>
                .
              </Text>

              <Text style={paragraph}>
                If you have any urgent questions, don't hesitate to reach us
                directly at{" "}
                <Link href="mailto:info@photonsecurity.in" style={link}>
                  info@photonsecurity.in
                </Link>{" "}
                or call us at{" "}
                <Link href="tel:+917990282583" style={link}>
                  +91 79902 82583
                </Link>
                .
              </Text>

              <Text style={signature}>
                Best regards,
                <br />
                <strong>The Photon Security Team</strong>
              </Text>
            </Section>
          </Section>

          {/* Footer Section */}
          <Section style={footer}>
            <Link href={baseUrl}>
              <Img
                src={`${baseUrl}/assets/eagle_no_bg.png`}
                alt="Photon Security Icon"
                style={footerLogo}
                width={100}
                height={100}
              />
            </Link>

            <Text style={footerText}>
              <strong>Photon Security</strong>
            </Text>
            <Text style={footerText}>GIFT City, Gandhinagar, India</Text>
            <Text style={footerText}>
              <Link href="mailto:info@photonsecurity.in" style={footerLink}>
                info@photonsecurity.in
              </Link>{" "}
              |{" "}
              <Link href="tel:+917990282583" style={footerLink}>
                +91 79902 82583
              </Link>
            </Text>

            <Section style={footerLinks}>
              <Link href={baseUrl} style={footerNavLink}>
                Home
              </Link>
              <Text style={separator}>|</Text>
              <Link href={`${baseUrl}/services`} style={footerNavLink}>
                Services
              </Link>
              <Text style={separator}>|</Text>
              <Link href={`${baseUrl}/about`} style={footerNavLink}>
                About
              </Link>
              <Text style={separator}>|</Text>
              <Link href={`${baseUrl}/contact`} style={footerNavLink}>
                Contact
              </Link>
            </Section>

            <Text style={copyright}>
              © 2026 Photon Security. All Rights Reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ThankYouEmail;

// Styles
const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#000000",
  padding: "40px 20px",
  textAlign: "center" as const,
};

const logo = {
  width: "280px",
  height: "auto",
  margin: "0 auto",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px 30px",
};

const heading = {
  color: "#000000",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 30px 0",
  lineHeight: "1.3",
};

const messageSection = {
  backgroundColor: "#ffffff",
};

const greeting = {
  color: "#000000",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 20px 0",
};

const paragraph = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 20px 0",
};

const highlightBox = {
  backgroundColor: "#f0f9ff",
  border: "2px solid #0ea5e9",
  borderRadius: "8px",
  padding: "20px",
  margin: "30px 0",
};

const highlightText = {
  color: "#0369a1",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px 0",
};

const highlightContent = {
  color: "#334155",
  fontSize: "15px",
  lineHeight: "1.8",
  margin: "0",
};

const link = {
  color: "#0ea5e9",
  textDecoration: "none",
  fontWeight: "600",
};

const signature = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "30px 0 0 0",
};

const footer = {
  backgroundColor: "#1a1a1a",
  padding: "40px 20px",
  textAlign: "center" as const,
};

const footerLogo = {
  width: "80px",
  height: "auto",
  margin: "0 auto 20px",
};

const footerText = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "5px 0",
};

const footerLink = {
  color: "#0ea5e9",
  textDecoration: "none",
};

const footerLinks = {
  margin: "20px 0",
};

const footerNavLink = {
  color: "#ffffff",
  fontSize: "14px",
  textDecoration: "none",
};

const separator = {
  color: "#666666",
  fontSize: "14px",
  margin: "0 10px",
  display: "inline",
};

const copyright = {
  color: "#999999",
  fontSize: "12px",
  margin: "20px 0 0 0",
};
