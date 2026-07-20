export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-[var(--color-pk-text-primary)] mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none text-[var(--color-pk-text-secondary)]">
        <p className="mb-6">Last updated: June 2026</p>
        
        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          PointKart collects minimal personal information necessary to provide our service. This includes:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Email address (for account creation and reward delivery)</li>
            <li>Basic profile information (name)</li>
            <li>IP address and device information (for fraud prevention)</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use your information exclusively to:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Process rewards and send gift cards</li>
            <li>Prevent fraud and abuse of the platform</li>
            <li>Communicate essential service updates</li>
          </ul>
          We do not sell your personal data to third parties.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">3. Third-Party Offerwalls</h2>
        <p className="mb-4">
          When you interact with third-party offerwalls (like Lootably), you are subject to their respective privacy policies. 
          We only receive a notification of task completion and do not track your activity on their platforms.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">4. Contact Us</h2>
        <p className="mb-4">
          If you have questions about this Privacy Policy, please contact us at support@pointkart.example.com.
        </p>
      </div>
    </div>
  );
}
