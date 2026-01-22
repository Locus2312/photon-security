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
  Row,
  Column,
} from "@react-email/components";

interface PhotonSecurityEmailProps {
  name: string;
  email: string;
  companyName: string;
  message: string;
  phone?: string;
  clientIP?: string;
  timestamp?: string;
}

const baseUrl = "https://photonsecurity.in";

export const PhotonSecurityEmail = ({
  name = "Bank transfer - USD",
  email = "$8,000.00",
  companyName = "Tomorrow",
  message = "Tomorrow",
}: PhotonSecurityEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission - Photon Security</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/assets/logo_no_bg.png`}
              alt="Photon Security"
              style={logo}
              width={250}
              height={250}
            />
          </Section>

          {/* Content Section */}
          <Section style={content}>
            <Heading style={heading}>New Contact Form</Heading>

            <Section style={detailsSection}>
              <Text style={detailsHeading}>Contact Details</Text>

              <Section style={formField}>
                <Row>
                  <Column style={labelColumn}>
                    <Text style={label}>Name</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{name}</Text>
                  </Column>
                </Row>
              </Section>

              <Section style={formField}>
                <Row>
                  <Column style={labelColumn}>
                    <Text style={label}>Email</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{email}</Text>
                  </Column>
                </Row>
              </Section>

              <Section style={formField}>
                <Row>
                  <Column style={labelColumn}>
                    <Text style={label}>Company Name</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{companyName}</Text>
                  </Column>
                </Row>
              </Section>

              <Section style={formField}>
                <Row>
                  <Column style={labelColumn}>
                    <Text style={label}>Message</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{message}</Text>
                  </Column>
                </Row>
              </Section>
            </Section>
          </Section>

          {/* Footer Section */}
          <Section style={footer}>
            <Img
              src={`${baseUrl}/assets/eagle_no_bg.png`}
              alt="Photon Security Icon"
              style={footerLogo}
            />
            <Text style={copyright}>Copyright 2026. All Rights Reserved</Text>
            <Text style={address}>GIFT City, Gandhinagar</Text>
            <Text style={noReply}>This is a no-reply email</Text>
            <Section style={footerLinks}>
              <Link href="https://photonsecurity.in" style={link}>
                Home
              </Link>
              <Text style={separator}>|</Text>
              <Link href="https://photonsecurity.in/contact" style={link}>
                Contact Us
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PhotonSecurityEmail;

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
  backgroundColor: "#f5f5f0",
  padding: "40px 20px",
};

const heading = {
  color: "#000000",
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "0 0 40px 0",
};

const detailsSection = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "30px",
  maxWidth: "500px",
  margin: "0 auto",
};

const detailsHeading = {
  color: "#000000",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 20px 0",
};

const formField = {
  marginBottom: "20px",
  borderBottom: "1px solid #e5e5e5",
  paddingBottom: "15px",
};

const labelColumn = {
  width: "40%",
  verticalAlign: "top" as const,
};

const valueColumn = {
  width: "60%",
  verticalAlign: "top" as const,
};

const label = {
  color: "#000000",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const value = {
  color: "#666666",
  fontSize: "14px",
  margin: "0",
  textAlign: "right" as const,
};

const footer = {
  backgroundColor: "#1a1a1a",
  padding: "40px 20px",
  textAlign: "center" as const,
};

const footerLogo = {
  width: "100px",
  height: "auto",
  margin: "0 auto 20px",
};

const copyright = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "0 0 5px 0",
};

const address = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "0 0 20px 0",
};

const noReply = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "0 0 10px 0",
};

const footerLinks = {
  margin: "10px 0 0 0",
};

const link = {
  color: "#ffffff",
  fontSize: "14px",
  textDecoration: "underline",
};

const separator = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "0 10px",
  display: "inline",
};
