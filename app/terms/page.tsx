import type { Metadata } from "next"
import { LegalLayout, LegalCard } from "@/components/LegalLayout"

export const metadata: Metadata = {
  title: "Terms of Service — Ecily",
  description: "The terms that govern using the Ecily app.",
}

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Service" updated="May 2026">
      <LegalCard title="1. Acceptance">
        By creating an account or using Ecily you agree to these Terms. If you are under 13, a
        parent or legal guardian must agree on your behalf. If you do not agree, do not use the
        App.
      </LegalCard>
      <LegalCard title="2. Eligibility">
        Ecily is designed for users aged 13 and older. Users under 18 should use Ecily with a
        parent or legal guardian&apos;s permission.
      </LegalCard>
      <LegalCard title="3. Educational Content Only">
        All financial information in Ecily is for educational purposes only. Nothing constitutes
        financial, investment, tax, or legal advice. Paper trading is simulated with virtual
        money only — no real money is ever used or at risk.
      </LegalCard>
      <LegalCard title="4. Account Responsibility">
        You are responsible for keeping your login credentials secure. Do not share your account.
        Report unauthorized access to joinecily@gmail.com. We are not liable for losses resulting
        from unauthorized account use.
      </LegalCard>
      <LegalCard title="5. Acceptable Use">
        You agree not to: (a) reverse-engineer or scrape the App; (b) access another user&apos;s
        account or data; (c) post harmful or misleading content; (d) use automated tools to
        interact with the App; or (e) violate any applicable law.
      </LegalCard>
      <LegalCard title="6. AI Coach Disclaimer">
        The Cily AI coach provides general financial education only. It is not a licensed
        financial advisor. Do not make real financial decisions based solely on Cily&apos;s
        responses. Always verify with a qualified professional.
      </LegalCard>
      <LegalCard title="7. Ecily Coins">
        Ecily Coins (EC) are virtual, have no real-world monetary value, cannot be exchanged for
        real money, and are non-transferable. We may modify or discontinue virtual currency at
        any time.
      </LegalCard>
      <LegalCard title="8. Intellectual Property">
        All content, branding, curriculum, and code in Ecily is owned by or licensed to Ecily
        Inc. You may not copy, distribute, or create derivative works without written permission.
      </LegalCard>
      <LegalCard title="9. Limitation of Liability" accent="#C4A06E">
        Ecily is provided &quot;as is.&quot; We do not guarantee uninterrupted or error-free
        access. To the fullest extent permitted by law, Ecily Inc. is not liable for indirect,
        incidental, or consequential damages from your use of the App.
      </LegalCard>
      <LegalCard title="10. Termination" accent="#C46E6E">
        We may suspend or terminate your account for violations of these Terms. You may delete
        your account at any time from Settings → Account → Delete Account. All personal data is
        permanently removed within 30 days.
      </LegalCard>
      <LegalCard title="11. Changes to Terms">
        We may update these Terms. We will notify you via in-app notification at least 7 days
        before material changes take effect. Continued use after changes constitutes acceptance.
      </LegalCard>
      <LegalCard title="12. Governing Law">
        These Terms are governed by the laws of the State of Delaware, United States. Disputes
        will be resolved by binding arbitration under AAA rules, with a waiver of class-action
        rights.
      </LegalCard>
      <LegalCard title="13. Contact">Questions? Email joinecily@gmail.com.</LegalCard>
    </LegalLayout>
  )
}
