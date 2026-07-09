import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// GitHub Pages project site. If you move to a custom domain at the root
// (for example docs.chrysalis.ai), set base to "/" and update site,
// and change the /mothy-docs/ links in the content to /.
export default defineConfig({
  site: "https://impendingtech.github.io",
  base: "/mothy-docs",
  integrations: [
    starlight({
      title: "Mothy Documentation",
      description:
        "How to use Mothy, the private AI assistant on your organisation's Chrysalis appliance.",
      customCss: ["./src/styles/brand.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ImpendingTech/mothy",
        },
      ],
      logo: {
        light: "./src/assets/mothy-wordmark.svg",
        dark: "./src/assets/mothy-wordmark-reversed.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.svg",
      sidebar: [
        {
          label: "Start here",
          items: [
            { label: "Getting started", slug: "getting-started" },
            { label: "How Mothy works", slug: "concepts" },
          ],
        },
        {
          label: "Using Mothy",
          items: [
            { label: "Documents and answers", slug: "documents-and-answers" },
            { label: "Memory", slug: "memory" },
            { label: "Skills", slug: "skills" },
            { label: "Automations", slug: "automations" },
            { label: "Delegation", slug: "delegation" },
            { label: "Connectors and actions", slug: "connectors-and-actions" },
          ],
        },
        {
          label: "Administration",
          items: [
            { label: "Proposals and approvals", slug: "proposals-and-approvals" },
            { label: "Users and access", slug: "users-and-isolation" },
            { label: "Audit and compliance", slug: "audit-and-compliance" },
            { label: "Security and privacy", slug: "security-and-hardening" },
          ],
        },
        {
          label: "Good to know",
          items: [{ label: "Good to know", slug: "limitations" }],
        },
      ],
    }),
  ],
});
