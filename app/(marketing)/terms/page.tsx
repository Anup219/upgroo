export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-[var(--color-pk-text-primary)] mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none text-[var(--color-pk-text-secondary)]">
        <p className="mb-6">Last updated: June 2026</p>
        
        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using Upgroo, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">2. Accounts and Eligibility</h2>
        <p className="mb-4">
          You must be at least 18 years old (or the legal age of majority in your jurisdiction) to use Upgroo.
          You are strictly prohibited from creating multiple accounts, using VPNs/proxies to alter your location, or using bots to automate tasks. 
          Violation of these rules will result in immediate account termination and forfeiture of points.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">3. Earning and Redeeming Points</h2>
        <p className="mb-4">
          Points have no cash value until redeemed for a gift card. Upgroo reserves the right to adjust point balances or cancel redemptions if fraudulent activity is detected.
          Points are not transferable and cannot be exchanged for cryptocurrency or fiat currency directly to a bank account.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-pk-text-primary)] mt-8 mb-4">4. Changes to Service</h2>
        <p className="mb-4">
          We reserve the right to modify or discontinue the service at any time without notice. We are not liable to you or any third party for modifications to the service.
        </p>
      </div>
    </div>
  );
}
