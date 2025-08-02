import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Ban,
  AlertTriangle,
  Terminal
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";

const Terms = () => {
  const sections = [
    {
      title: "1. Introduction",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Welcome to Voidmail.fun ("Service"). These Terms of Service ("Terms") govern your access to and use of our temporary email service. By accessing or using the Service, you agree to be bound by these Terms.</p>
          <p>If you do not agree to these Terms, you must immediately discontinue using our Service. Continued use constitutes acceptance of these Terms.</p>
        </>
      )
    },
    {
      title: "2. Service Description",
      icon: <Terminal className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Voidmail.fun provides temporary, disposable email addresses ("Burner Emails") that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Are automatically generated without registration</li>
            <li>Can receive but not send emails</li>
            <li>Automatically expire after 24 hours of inactivity</li>
            <li>Provide a layer of privacy for your primary email</li>
          </ul>
        </>
      )
    },
    {
      title: "3. User Responsibilities",
      icon: <Lock className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">When using our Service, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service only for lawful purposes</li>
            <li>Not impersonate others or provide false information</li>
            <li>Be solely responsible for your use of Burner Emails</li>
            <li>Not rely on Burner Emails for critical communications</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Prohibited Activities",
      icon: <Ban className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">You may not use our Service to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Send spam, phishing emails, or malware</li>
            <li>Harass, threaten, or defraud others</li>
            <li>Violate any laws or regulations</li>
            <li>Bypass security measures of other services</li>
            <li>Engage in any fraudulent activity</li>
          </ul>
          <p>Violations may result in immediate termination of access without notice.</p>
        </>
      )
    },
    {
      title: "5. Privacy and Data",
      icon: <Lock className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Our Privacy Policy explains how we handle your data:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>We do not require personal information to use the Service</li>
            <li>Emails are automatically deleted after 24 hours</li>
            <li>We do not store email contents long-term</li>
            <li>We may collect minimal usage data for analytics</li>
          </ul>
          <p>By using the Service, you consent to our data practices as described in our <Link to="/privacy" className="text-[#10B981] hover:underline">Privacy Policy</Link>.</p>
        </>
      )
    },
    {
      title: "6. Service Limitations",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">The Service has certain limitations:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Emails are temporary and will expire</li>
            <li>We cannot recover deleted emails</li>
            <li>Service may be interrupted for maintenance</li>
            <li>We impose rate limits to prevent abuse</li>
          </ul>
          <p>We reserve the right to modify or discontinue the Service at any time without notice.</p>
        </>
      )
    },
    {
      title: "7. Liability Disclaimer",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, VOIDMAIL.FUN DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED.</p>
          <p>In no event shall Voidmail.fun be liable for any indirect, incidental, special or consequential damages arising from your use of the Service.</p>
        </>
      )
    },
    {
      title: "8. Changes to Terms",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We may modify these Terms at any time. When we do, we will update the "last updated" date at the top of this page.</p>
          <p>Your continued use of the Service after such modifications constitutes acceptance of the revised Terms.</p>
        </>
      )
    },
    {
      title: "9. Governing Law",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Voidmail.fun operates, without regard to its conflict of law provisions.</p>
      )
    }
  ];

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <div className="mt-2 mr-2 ml-2">
        <Navbar />
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#10B981]/10 rounded-full mb-6">
            <ShieldCheck className="h-8 w-8 text-[#10B981]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-[#151517] p-8 rounded-xl border border-[#ffffff08] hover:border-[#10B981]/30 transition-colors"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  {section.icon}
                </span>
                {section.title}
              </h2>
              <div className="text-gray-400 space-y-4">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#151517] p-8 rounded-xl border border-[#ffffff08] mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#10B981]">Contact Information</h2>
          <p className="text-gray-400 mb-4">For questions about these Terms, please contact us at:</p>
          <p className="text-white">legal@voidmail.fun</p>
        </div>
      </main>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default Terms;