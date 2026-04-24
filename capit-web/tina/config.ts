import { defineConfig } from "tinacms";

const ctaFields: any = [
  { type: "string", name: "label", label: "Label" },
  { type: "string", name: "href", label: "Link" },
];

const sectionFields: any = [
  { type: "string", name: "heading", label: "Heading" },
  { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
  { type: "string", name: "bullets", label: "Bullets", list: true },
];

export default defineConfig({
  branch: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Site Settings",
        name: "site",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "name", label: "Site Name" },
          {
            type: "object",
            name: "logo",
            label: "Logo",
            fields: [
              { type: "image", name: "src", label: "Logo Image" },
              { type: "string", name: "alt", label: "Logo Alt Text" },
            ],
          },
          { type: "object", name: "navigation", label: "Navigation", list: true, fields: ctaFields },
          { type: "object", name: "ctaButton", label: "Header CTA Button", fields: ctaFields },
        ],
      },
      {
        label: "Homepage",
        name: "home",
        path: "content",
        format: "json",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "headlineHighlight", label: "Headline Highlight" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "object", name: "ctaButton", label: "Primary CTA", fields: ctaFields },
              { type: "object", name: "secondaryCta", label: "Secondary CTA", fields: ctaFields },
              { type: "object", name: "tertiaryCta", label: "Tertiary CTA", fields: ctaFields },
              { type: "string", name: "trustNote", label: "Trust Note", ui: { component: "textarea" } },
              {
                type: "object",
                name: "image",
                label: "Hero Image",
                fields: [
                  { type: "image", name: "src", label: "Image" },
                  { type: "string", name: "alt", label: "Alt Text" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "snapshot",
            label: "National Snapshot Intro",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "intro", label: "Intro", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "educationalCards",
            label: "Explainer Cards",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "imageSrc", label: "Image" },
              { type: "string", name: "imageAlt", label: "Alt Text" },
              { type: "string", name: "linkHref", label: "Link" },
              { type: "string", name: "linkLabel", label: "Link Label" },
            ],
          },
          {
            type: "object",
            name: "methodologyStrip",
            label: "Methodology Strip",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              { type: "string", name: "href", label: "Link" },
              { type: "string", name: "label", label: "Link Label" },
            ],
          },
        ],
      },
      {
        label: "Dashboard Data",
        name: "dashboard",
        path: "content",
        format: "json",
        match: { include: "dashboard" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "statsCards",
            label: "Stats Cards",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "subtitle", label: "Helper Text" },
            ],
          },
          {
            type: "object",
            name: "tokensCard",
            label: "CAPIT Mint Activity Card",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "subtitle", label: "Helper Text" },
            ],
          },
          {
            type: "object",
            name: "pluggingTrend",
            label: "Trend Card",
            fields: [
              { type: "string", name: "sectionTitle", label: "Section Title Lines", list: true },
              { type: "string", name: "chartTitle", label: "Chart Title" },
              { type: "string", name: "chartSubtitle", label: "Chart Helper" },
              { type: "string", name: "dataSource", label: "Data Source", ui: { component: "textarea" } },
              { type: "object", name: "trendData", label: "Trend Data", list: true, fields: [{ type: "number", name: "day", label: "Day" }, { type: "number", name: "value", label: "Value" }] },
              { type: "string", name: "mintLogTitle", label: "Mint Log Title" },
              { type: "object", name: "mintLogEntries", label: "Mint Log Entries", list: true, fields: [{ type: "string", name: "date", label: "Date" }, { type: "number", name: "wells", label: "Wells" }, { type: "string", name: "status", label: "Status" }] },
            ],
          },
          { type: "object", name: "dailyMintLog", label: "Recent Records Log", fields: [
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "currentDate", label: "Current Date" },
            { type: "object", name: "entries", label: "Entries", list: true, fields: [{ type: "string", name: "date", label: "Date" }, { type: "number", name: "wells", label: "Wells" }, { type: "string", name: "status", label: "Status" }] },
            { type: "object", name: "footer", label: "Footer", fields: [{ type: "string", name: "brandLabel", label: "Brand Label" }, { type: "string", name: "recordsUrl", label: "Records URL" }] },
          ] },
          { type: "object", name: "stateLeaderboard", label: "State Leaderboard", fields: [
            { type: "string", name: "title", label: "Title" },
            { type: "object", name: "entries", label: "Entries", list: true, fields: [{ type: "number", name: "rank", label: "Rank" }, { type: "string", name: "state", label: "State" }, { type: "string", name: "flag", label: "State Abbreviation" }, { type: "number", name: "wells", label: "Wells" }] },
            { type: "object", name: "viewAllButton", label: "View All Button", fields: ctaFields },
            { type: "string", name: "dataSourceNote", label: "Data Source Note" },
          ] },
        ],
      },
      {
        label: "Footer",
        name: "footer",
        path: "content",
        format: "json",
        match: { include: "footer" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "quote", label: "Tagline", ui: { component: "textarea" } },
          { type: "string", name: "disclaimer", label: "Disclaimer", ui: { component: "textarea" } },
          { type: "object", name: "navigation", label: "Footer Navigation", list: true, fields: ctaFields },
          { type: "object", name: "socialLinks", label: "Social Links", list: true, fields: [{ type: "string", name: "platform", label: "Platform" }, { type: "string", name: "href", label: "Link" }, { type: "string", name: "ariaLabel", label: "Aria Label" }] },
          { type: "object", name: "walletButton", label: "Wallet Button", fields: [{ type: "string", name: "label", label: "Button Label" }] },
          { type: "string", name: "copyright", label: "Copyright" },
          { type: "object", name: "legalLinks", label: "Legal Links", list: true, fields: ctaFields },
        ],
      },
      {
        label: "Content Pages",
        name: "pages",
        path: "content/pages",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "SEO Title" },
          { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "headline", label: "Headline" },
          { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
          { type: "object", name: "primaryCta", label: "Primary CTA", fields: ctaFields },
          { type: "object", name: "secondaryCta", label: "Secondary CTA", fields: ctaFields },
          { type: "object", name: "sections", label: "Sections", list: true, fields: sectionFields },
        ],
      },
    ],
  },
});
