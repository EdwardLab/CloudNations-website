export const site = {
  name: 'Cloud Nations',
  origin: 'https://cloudnations.org',
  dashboard: 'https://id.cloudnations.org',
  support: 'contact@edgealphix.com',
  operator: 'EdgeAlphix LLC',
  reviewDate: '2026-10-13',
};
export const plans = [
  { name: 'Cloud Residency', price: '19.99', label: 'For individuals', description: 'Digital identity and community membership.', features: ['Identity verification included', 'Permanent CNID after approval', 'Digital Resident ID and certificate', 'Public profile, community and OAuth'], path: '/application', button: 'Apply for Residency', featured: true },
  { name: 'Cloud Organization', price: '19.99', label: 'For communities', description: 'A shared identity for your group.', features: ['Verified Resident owner required', 'Platform review and permanent CNOID', 'Member roles and domain verification', 'Organization page and certificate'], path: '/dashboard/organizations', button: 'Explore organizations' },
  { name: 'Verified Organization', price: '49.99', label: 'For legal entities', description: 'A verified identity for your legal entity.', features: ['Business and representative checks', 'Permanent CNOID after approval', 'Verified legal organization status', 'Organization page and certificate'], path: '/dashboard/organizations', button: 'Explore organizations' },
];
export const faqs = [
  ['What is Cloud Residency?', 'A five-year private digital identity and community membership. You can use a basic account after payment. Approved identity verification adds a permanent CNID and verified resident credentials.'],
  ['Is Cloud Nations a country?', 'Cloud Nations is operated by EdgeAlphix LLC as a private digital identity and community network. Membership does not grant government nationality, immigration status, residence rights or a travel document.'],
  ['What happens after five years?', 'You can renew manually. Your account, CNID and history remain yours if membership expires. Resident credentials show their current status, and verification benefits require an active membership.'],
  ['Who can apply?', 'Applicants must be at least 18. Each person can receive one CNID. You acknowledge the application terms before payment; the application fee is non-refundable.'],
  ['What does a QR scan reveal?', 'By default: preferred name, a masked number, credential authenticity, residency status and identity verification status. You choose additional public fields independently of your public profile.'],
  ['Can I add my ID to Google or Apple Wallet?', 'Open Identity → Wallet in your dashboard to add your Digital Resident ID to Google Wallet. Apple Wallet is coming soon.'],
  ['How do I become a Founding Resident?', 'The first 10,000 real users issued a CNID before January 1, 2028 UTC receive the permanent Founding Resident · 2026 badge. Eligibility ends when either the issuance cap or the date is reached.'],
];
export const help = [
  { category: 'Application', title: 'Continue an existing application', body: 'Sign in with the same account and open Application. Your saved details and completed steps stay with the original application. You can review earlier steps before submission.', path: '/application', action: 'Continue application' },
  { category: 'Application', title: 'When your CNID is issued', body: 'Your payment, adult eligibility, identity verification and duplicate identity checks must pass before issuance. Until then, you have an Application Number. A new account cannot be used to obtain a second CNID.', path: '/application', action: 'View application' },
  { category: 'Verification', title: 'Payment comes before verification', body: 'KYC is included in your membership and opens after payment is confirmed. You can use your basic dashboard while you complete the same application.', path: '/application', action: 'View application' },
  { category: 'Verification', title: 'KYC passed but the application is still processing', body: 'Check your status in Application. If it remains processing, contact support with your Application Number. Do not pay again or start a new application.', path: '/application', action: 'Check application' },
  { category: 'Verification', title: 'Complete requested documents or a retry', body: 'Use the verification link on your existing application. Follow the KYC instructions. If the link cannot resume, contact us with your Application Number. Do not email document photos or liveness recordings.', path: '/application', action: 'Resume application' },
  { category: 'Account', title: 'Recover your account', body: 'Use Forgot password on the sign-in page. If you cannot access the original email or your second factor, contact support. Do not send passwords, recovery codes or one-time verification codes by email.', path: '/login', action: 'Open sign in' },
  { category: 'Account', title: 'Set up an authenticator or security key', body: 'Open Security in Settings to manage Google Authenticator or another authenticator app, passkeys, hardware security keys and recovery codes. Keep recovery codes in a private place.', path: '/dashboard/settings?section=security', action: 'Open settings' },
  { category: 'Billing', title: 'Find a payment or membership record', body: 'Open Billing in Settings for your payment status and records. Contact us with an order number if you need help with a payment.', path: '/dashboard/settings?section=billing', action: 'Open billing' },
  { category: 'Billing', title: 'Renew your membership', body: 'Renewal is manual. Membership lasts five years from payment confirmation; completing KYC does not restart that term. An expired membership does not release your CNID to another person.', path: '/dashboard', action: 'Open dashboard' },
  { category: 'Identity', title: 'Download your ID and certificate', body: 'After approval, Identity contains the front and back of your ID, PNG downloads and the residency certificate.', path: '/dashboard/identity', action: 'Open identity' },
  { category: 'Identity', title: 'Control public profile and QR information', body: 'Profile visibility and QR disclosure have separate controls. You can also hide nationality and sex on your ID. Your verification page always shows the current credential status.', path: '/dashboard/profile', action: 'Open profile settings' },
  { category: 'Wallet', title: 'Add your ID to Google Wallet', body: 'Open Identity, select Wallet and choose Add to Google Wallet. Sign in to your Google account to save the pass. Your ID’s front, back and verification QR are included.', path: '/dashboard/identity?section=wallet', action: 'Open Wallet settings' },
  { category: 'Wallet', title: 'Apple Wallet availability', body: 'Apple Wallet is coming soon. You can view your ID on your phone through the dashboard and download its front and back as PNG images.', path: '/dashboard/identity', action: 'Open identity' },
  { category: 'Organizations', title: 'Choose an organization type', body: 'Cloud Organizations are platform communities and display the CNO suffix. Verified Organizations are legal entities that complete business and required representative checks. The creator must be an active Verified Resident.', path: '/dashboard/organizations', action: 'Open organizations' },
];
