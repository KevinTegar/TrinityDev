import type { Metadata } from "next";
import { SITE } from "@/data/site";
import ContactForm from "@/components/contact/ContactForm";
import CopyEmail from "@/components/contact/CopyEmail";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with TrinityDev. We reply within 24 hours — usually faster.",
};

export default function ContactPage() {
  return (
    <>
      <section data-world="ink" className="flex min-h-[60svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">(Start a project)</p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
          Let&apos;s <em className="font-serif normal-case italic text-vermilion">talk</em>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
          Tell us what you&apos;re building. We reply within 24 hours — usually faster.
        </p>
      </section>

      <section
        data-world="paper"
        className="grid gap-16 px-4 py-24 md:grid-cols-2 md:gap-12 md:px-10 md:py-36"
      >
        <div className="space-y-12">
          <div>
            <p className="mb-4 font-mono text-meta uppercase opacity-60">Email</p>
            <CopyEmail />
          </div>
          <div>
            <p className="mb-4 font-mono text-meta uppercase opacity-60">WhatsApp</p>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-display-md font-medium uppercase transition-colors duration-300 hover:text-vermilion"
            >
              Chat with us ↗
            </a>
          </div>
          <dl className="grid grid-cols-2 gap-8 border-t hairline pt-8 font-mono text-meta uppercase">
            <div>
              <dt className="opacity-60">Based in</dt>
              <dd className="mt-2">
                {SITE.location}
                <br />
                {SITE.coords}
              </dd>
            </div>
            <div>
              <dt className="opacity-60">Response time</dt>
              <dd className="mt-2">Within 24 hours</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
