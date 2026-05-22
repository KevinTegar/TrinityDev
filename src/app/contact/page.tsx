import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with TrinityDev. Free initial consultation, response within 24 hours. Web development, UI/UX, mobile apps, and digital marketing.",
};

export default function ContactPage() {
  return <ContactForm />;
}
