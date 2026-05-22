import type { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A selection of web development, mobile app, and design projects we've delivered for clients across industries.",
};

export default function WorkPage() {
  return <WorkClient />;
}
