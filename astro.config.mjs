import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// GitHub Pages project site. If you move to a custom domain at the root
// (for example docs.chrysalis.ai), set base to "/" and update site.
export default defineConfig({
  site: "https://impendingtech.github.io",
  base: "/mothy-docs",
  integrations: [
    starlight({
      title: "Mothy Documentation",
      description:
        "The official documentation for Mothy, a sovereign, self-hosted AI assistant.",
      customCss: ["./src/styles/brand.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ImpendingTech/mothy",
        },
      ],
      // Drop the real moth logo into src/assets/ and uncomment:
      // logo: { src: "./src/assets/logo.svg", alt: "Mothy" },
      sidebar: [
        {
          label: "Start here",
          items: [
            { label: "Getting started", slug: "getting-started" },
            { label: "Core concepts", slug: "concepts" },
          ],
        },
        {
          label: "Using Mothy",
          items: [
            { label: "Documents and answers", slug: "documents-and-answers" },
            { label: "Memory", slug: "memory" },
            { label: "Skills", slug: "skills" },
            { label: "Proposals and approvals", slug: "proposals-and-approvals" },
            { label: "Automations", slug: "automations" },
            { label: "Delegation", slug: "delegation" },
            { label: "Connectors and actions", slug: "connectors-and-actions" },
          ],
        },
        {
          label: "Running Mothy",
          items: [
            { label: "Users and isolation", slug: "users-and-isolation" },
            { label: "Audit and compliance", slug: "audit-and-compliance" },
            { label: "Security and hardening", slug: "security-and-hardening" },
            { label: "Deployment", slug: "deployment" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Configuration", slug: "configuration" },
            { label: "Commands", slug: "commands" },
            { label: "Data model", slug: "data-model" },
            { label: "Limitations", slug: "limitations" },
          ],
        },
      ],
    }),
  ],
});
