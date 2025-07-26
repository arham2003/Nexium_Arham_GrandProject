"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQs() {
  const faqItems = [
    {
      id: "item-1",
      question: "What is this app and who is it for?",
      answer:
        "This app helps founders, creators, and startup teams craft sharper, more persuasive pitches using AI. Whether you're writing for investors, accelerators, or just refining your idea, our tools give you clear, high-impact summaries and feedback.",
    },
    {
      id: "item-2",
      question: "Is the AI-generated pitch content unique and safe to use?",
      answer:
        "Yes. Each pitch or email draft is generated based on your unique input. We don’t recycle content, and your data stays private — securely stored and only accessible to you.",
    },
    {
      id: "item-3",
      question: "Do I need an account to use the features?",
      answer:
        "Yes, signing in is required. We use magic link authentication for quick and passwordless access. Once logged in, you’ll be able to view your saved pitches and AI feedback anytime.",
    },
    {
      id: "item-4",
      question: "What kind of input should I give for the best results?",
      answer:
        "Be as clear and detailed as possible. For summaries, paste your full idea or document. For feedback, upload or write your draft pitch. The more context you give, the better the AI can help.",
    },
    {
      id: "item-5",
      question: "Will more AI tools be added in the future?",
      answer:
        "Absolutely. We're actively working on new features like investor email drafting, elevator pitch rewriting, and smart feedback analysis — all powered through n8n workflows and LLMs.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center text-white">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className=" mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            our platform, services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-transparent ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0 text-white"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            Can't find what you're looking for? Contact our{" "}
            <Link
              href="mailto:try.arhamkhan@gmail.com"
              target="_blank"
              className="text-secondary font-medium hover:underline"
            >
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
