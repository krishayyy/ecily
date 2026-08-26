import type { Metadata } from "next"
import { LegalLayout, LegalCard, LegalSectionHeading, DataRow } from "@/components/LegalLayout"

export const metadata: Metadata = {
  title: "Privacy Policy: Ecily",
  description: "What Ecily collects, why, and how long it's kept.",
}

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" updated="May 2026">
      <LegalCard title="Our Commitment">
        Ecily collects only what is needed to run the app. We never sell your data, never use it
        for advertising, and never share it without your knowledge. This policy explains exactly
        what we collect, why, and how long we keep it.
      </LegalCard>

      <LegalSectionHeading>Data We Collect</LegalSectionHeading>

      <DataRow
        category="Account Information"
        what="Name, email address"
        why="To create your account and identify you across devices. Email is used for account recovery and critical security notices only."
        retention="Kept until you delete your account, then purged within 30 days."
      />
      <DataRow
        category="Onboarding Profile"
        what="Age, US state, money situation, financial goals, explanation style, birthday (optional)"
        why="To personalize lesson content, tone, and difficulty. Your state is used to display accurate local tax rates and minimum wage. Your age group determines which Jump$tart standards apply to you."
        retention="Kept until you update your profile settings or delete your account."
      />
      <DataRow
        category="Learning Progress"
        what="Completed lessons, quiz scores, XP, Ecily Coins, streak, world progress, last active date"
        why="To track your progress, award achievements, maintain your streak, and personalize what Cily recommends next."
        retention="Kept for the lifetime of your account. Exported on request within 30 days."
      />
      <DataRow
        category="Paper Trading Activity"
        what="Simulated trades, portfolio value, watchlist tickers"
        why="To simulate a realistic investing experience. No real money is ever involved."
        retention="Kept for the lifetime of your account. Deleted with account."
      />
      <DataRow
        category="AI Coach Conversations"
        what="Messages you send to Cily"
        why="Sent to Groq's API to generate responses. For context, Ecily also sends your first name, age group (never your exact age or birthday), US state, money situation, goals, explanation style, and a short summary of your recent in-app activity."
        retention="NOT stored by Ecily after the response is returned. Groq's privacy policy applies (groq.com/privacy)."
      />
      <DataRow
        category="Device & Usage Data"
        what="Device model, OS version, crash logs, feature usage"
        why="To fix bugs and improve performance. Analytics events are tied to your app instance, never sold or used for ads."
        retention="Crash logs kept 90 days. Usage analytics kept up to 2 years."
      />
      <DataRow
        category="Reminders"
        what="Locally scheduled streak and learning reminders"
        why="Scheduled on your device, only if you grant permission. Nothing leaves your phone."
        retention="Stored only on-device. Cleared when you disable notifications or delete the app."
      />

      <LegalSectionHeading>How We Share Data</LegalSectionHeading>

      <LegalCard title="Service Providers">
        Firebase (Google) stores your account and progress data. Groq Inc. processes AI coach
        messages. Yahoo Finance provides stock prices, charts, and news headlines, ticker symbols
        only, never anything that identifies you. All three are bound by data processing
        agreements or public API terms and are prohibited from using your data for any other
        purpose. We do not share your learning progress with schools or teachers.
      </LegalCard>
      <LegalCard title="Legal Requirements">
        We may disclose data if required by law, valid court order, or to protect the safety of
        our users or the public. We will notify you of such disclosures where legally permitted.
      </LegalCard>

      <LegalSectionHeading>Your Rights</LegalSectionHeading>

      <LegalCard title="Access & Export" accent="#7B8FD4">
        Request a full copy of your personal data by emailing joinecily@gmail.com. We respond
        within 30 days.
      </LegalCard>
      <LegalCard title="Correction" accent="#7B8FD4">
        Update your name, state, age, goals, or explanation style at any time in Settings.
      </LegalCard>
      <LegalCard title="Deletion" accent="#C46E6E">
        Delete your account from Settings → Account → Delete Account. All personal data is
        permanently removed from our systems within 30 days. Anonymized aggregate analytics (not
        linked to you) may be retained.
      </LegalCard>
      <LegalCard title="Children (COPPA)" accent="#C4A06E">
        Ecily is designed for users 13 and older. We do not knowingly collect data from children
        under 13. Parents can request deletion of any under-13 account by emailing
        joinecily@gmail.com.
      </LegalCard>
      <LegalCard title="California (CCPA) / EU/UK (GDPR)" accent="#5EA88A">
        You have the right to know, access, correct, and delete your data. We do not sell data.
        EU/UK users may contact our DPO at joinecily@gmail.com for erasure or portability requests.
      </LegalCard>
      <LegalCard title="Security">
        All data is encrypted in transit (TLS 1.3) and at rest (AES-256 via Firebase). Access to
        user data is restricted to authorized Ecily engineers on a strict need-to-know basis.
      </LegalCard>
      <LegalCard title="Contact">Privacy questions: joinecily@gmail.com</LegalCard>
    </LegalLayout>
  )
}
