export function getApplyMailto(jobTitle?: string) {
  const subject = jobTitle
    ? `Application for ${jobTitle} – Photon Security`
    : `Job Application – Photon Security`;

  const body = `
Hello Hiring Team,

I would like to apply for the position of ${
    jobTitle ?? "[Job Title]"
  } at Photon Security.

Please find my resume attached with this email.

Details:
• Full Name:
• Phone Number:
• Current Location:
• Years of Experience:
• LinkedIn / GitHub / Portfolio (if any):
• Short Introduction (Why I'd like to join):

Looking forward to hearing from you.

Best regards,
[Your Name]
`;

  return `mailto:careers@photonsecurity.in?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
