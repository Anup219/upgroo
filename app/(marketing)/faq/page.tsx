"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Mail,
  MessageSquare,
  ShieldCheck,
  Coins,
  Gift,
  User,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: any;
  items: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: User,
    items: [
      {
        question: "What is Upgroo and how does it work?",
        answer: "Upgroo is a rewards platform that lets you earn points for activities you already do online, like browsing partner sites, completing short surveys, and participating in brand campaigns. Once you collect enough points, you can redeem them for gift cards, vouchers, and direct cashback.",
      },
      {
        question: "Is Upgroo free to use?",
        answer: "Yes, Upgroo is 100% free to join and use. There are no hidden fees or premium subscriptions required to start earning or redeeming rewards.",
      },
      {
        question: "How do I create an account?",
        answer: "Simply click the 'Get started' button in the navigation bar. You can sign up using your email address, or with Google authentication for a faster, one-click setup.",
      },
    ],
  },
  {
    id: "earning-points",
    name: "Earning Points",
    icon: Coins,
    items: [
      {
        question: "How long does it take for points to credit?",
        answer: "Most points are credited to your account instantly upon completing an activity. However, some offers or purchases may take up to 24–48 hours to be verified by our partners before appearing in your balance.",
      },
      {
        question: "Are there any limits on how much I can earn?",
        answer: "No, there are no hard caps on your earnings. As long as you complete valid campaigns and follow our guidelines, you can keep earning points daily.",
      },
      {
        question: "Why did I not receive points for a completed offer?",
        answer: "Ensure that you disable adblockers and content filters while completing offers, as they can prevent tracking. Also, make sure you meet all requirements detailed in the offer description. If points are still missing after 48 hours, reach out to support with screenshots.",
      },
    ],
  },
  {
    id: "redemptions",
    name: "Rewards & Redemptions",
    icon: Gift,
    items: [
      {
        question: "What rewards can I redeem with my points?",
        answer: "We offer a diverse catalog including e-gift cards for popular shopping platforms (like Amazon and Flipkart), food delivery vouchers (Zomato and Swiggy), fashion brands, gaming credits, and direct bank transfers.",
      },
      {
        question: "How long does reward delivery take?",
        answer: "E-gift cards and vouchers are typically processed and delivered to your registered email address within 2 to 24 hours. Bank transfers and UPI cashbacks can take up to 2-3 business days.",
      },
      {
        question: "Can I cancel a redemption request?",
        answer: "Once a redemption is requested and the voucher code is generated, it cannot be cancelled or refunded. Please verify your selected reward and email details carefully before confirming.",
      },
    ],
  },
  {
    id: "security",
    name: "Security & Privacy",
    icon: ShieldCheck,
    items: [
      {
        question: "How does Upgroo protect my personal information?",
        answer: "We take your privacy seriously. Your personal details and browsing history are encrypted both in transit and at rest. We never sell your personal identification details to third-party advertisers.",
      },
      {
        question: "Can I use multiple accounts or a VPN?",
        answer: "No. To maintain system integrity, we permit only one account per person. The use of VPNs, proxies, or automated bots to complete tasks is strictly prohibited and will result in permanent account suspension.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleAccordion = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter categories and items based on selection and query
  const filteredCategories = FAQ_CATEGORIES.map((cat) => {
    const matchedItems = cat.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, items: matchedItems };
  }).filter((cat) => {
    const matchesCategory = activeCategory === "all" || cat.id === activeCategory;
    const hasItems = cat.items.length > 0;
    return matchesCategory && hasItems;
  });

  return (
    <main className="min-h-screen bg-transparent pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-card)] px-3 text-[var(--font-size-xs)] font-medium text-[var(--color-text-accent)] shadow-[var(--shadow-1)] mb-4">
            <HelpCircle className="h-4 w-4" />
            <span>Got questions? We've got answers.</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[var(--font-size-md)] text-[var(--color-text-inverse)] max-w-xl mx-auto">
            Everything you need to know about earning points, redeeming rewards, and managing your account.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-lg mx-auto mb-12">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--color-text-muted)]">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] transition-all shadow-[var(--shadow-1)] text-[var(--font-size-sm)]"
          />
        </div>

        {/* Categories navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-[var(--font-size-sm)] font-medium transition-all ${
              activeCategory === "all"
                ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-1)]"
                : "bg-[var(--color-surface-card)] border border-[var(--color-border)] text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]"
            }`}
          >
            All Questions
          </button>
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[var(--font-size-sm)] font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-1)]"
                    : "bg-[var(--color-surface-card)] border border-[var(--color-border)] text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* FAQs List */}
        <div className="space-y-10">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => {
              const CatIcon = category.icon;
              return (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-text-accent)]">
                      <CatIcon className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                      {category.name}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, idx) => {
                      const itemKey = `${category.id}-${idx}`;
                      const isExpanded = !!expandedItems[itemKey];
                      return (
                        <div
                          key={idx}
                          className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-card)] transition-all overflow-hidden"
                        >
                          <button
                            onClick={() => toggleAccordion(itemKey)}
                            aria-expanded={isExpanded}
                            className="w-full flex items-center justify-between p-5 text-left font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-text-accent)] transition-colors focus:outline-none"
                          >
                            <span>{item.question}</span>
                            <ChevronDown
                              className={`h-5 w-5 text-[var(--color-text-inverse)] transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-[var(--color-text-accent)]" : ""
                              }`}
                            />
                          </button>
                          
                          <div
                            className={`transition-all duration-200 ease-in-out ${
                              isExpanded ? "max-h-[300px] border-t border-[var(--color-border)]" : "max-h-0"
                            }`}
                          >
                            <div className="p-5 text-[var(--font-size-sm)] text-[var(--color-text-inverse)] leading-relaxed bg-[var(--color-surface-page)]/50">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-surface-card)]">
              <p className="text-[var(--font-size-md)] text-[var(--color-text-inverse)] mb-2 font-medium">
                No matching questions found.
              </p>
              <p className="text-[var(--font-size-sm)] text-[var(--color-text-muted)]">
                Try searching for general terms like "points", "rewards", or "account".
              </p>
            </div>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 p-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-card)] text-center shadow-[var(--shadow-1)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
            Still have questions?
          </h3>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] mb-6 max-w-md mx-auto">
            If you couldn't find the answers you need in our help pages, our support team is available to assist you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link href="mailto:support@upgroo.app" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email Support</span>
              </Button>
            </Link>
            <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Live Chat Support</span>
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
