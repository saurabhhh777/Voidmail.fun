import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  MoveHorizontal,
  Mail,
  Lock,
  Trash
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";

const Home = () => {
  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="mt-2 mr-2 ml-2">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 text-center bg-[#0e0e10]">
        <div className="absolute w-[600px] h-[600px] bg-[#10B981]/10 blur-[120px] -top-32 left-1/2 -translate-x-1/2 z-0" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="tracking-[0.5em] text-[#10B981] text-sm uppercase mb-4">
            VOIDMAIL
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-poppins">
            Start your <br />
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-poppins">
              free trial today
            </span>
          </h2>

          <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto font-pt--sans">
            Unlock the full potential of private communication with our secure disposable email solution.
          </p>

          <Link to="/main">
            <button className="px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#10B981]/30 flex items-center gap-2 mx-auto">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#121214] border-y border-[#ffffff08]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-5xl font-bold text-[#10B981] mb-2">50K+</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Emails Generated</div>
          </div>

          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-5xl font-bold text-[#10B981] mb-2">99.9%</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Service Uptime</div>
          </div>

          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-5xl font-bold text-[#10B981] mb-2">24h</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Auto-Destruct</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0e0e10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">SECURE EMAIL EXPERIENCE</h2>
            <div className="w-24 h-1 bg-[#10B981] mx-auto"></div>
            <p className="text-gray-400 max-w-2xl mx-auto mt-6">
              Our platform provides the tools you need to maintain privacy and security in your online communications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Instant Creation",
                text: "Generate new email addresses in one click with our lightning-fast system"
              },
              {
                icon: ShieldCheck,
                title: "Military-Grade Security",
                text: "End-to-end encrypted communications with zero data retention"
              },
              {
                icon: Clock,
                title: "Self-Destructing",
                text: "All emails and attachments automatically delete after 24 hours"
              },
              {
                icon: Lock,
                title: "No Registration",
                text: "Use our service completely anonymously without any sign-up"
              },
              {
                icon: Trash,
                title: "Zero Spam",
                text: "Keep your primary inbox clean from unwanted marketing emails"
              },
              {
                icon: MoveHorizontal,
                title: "Easy Forwarding",
                text: "Optionally forward important emails to your main account"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#ffffff03] rounded-xl border border-[#ffffff08] hover:border-[#10B981]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center mb-6 group-hover:bg-[#10B981]/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA and Footer */}
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Home;
