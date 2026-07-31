import { defineConfig } from "tinacms";

// Unified Schema covering 100% of fields across home.json, site.json, footer.json, and dashboard.json
const coreConfigurationFields = [
  // --- Site Config (site.json) ---
  { type: "string", name: "name", label: "Site Name" },
  {
    type: "object",
    name: "logo",
    label: "Logo Config",
    fields: [
      { type: "image", name: "src", label: "Logo Image" },
      { type: "string", name: "alt", label: "Alt Text" },
    ],
  },
  {
    type: "object",
    name: "navigation",
    label: "Navigation Links",
    list: true,
    fields: [
      { type: "string", name: "label", label: "Link Label" },
      { type: "string", name: "href", label: "URL / Path" },
    ],
  },
  {
    type: "object",
    name: "ctaButton",
    label: "Header CTA Button",
    fields: [
      { type: "string", name: "label", label: "Button Label" },
      { type: "string", name: "href", label: "URL / Path" },
    ],
  },

  // --- Home Config (home.json) ---
  {
    type: "object",
    name: "seo",
    label: "SEO Metadata",
    fields: [
      { type: "string", name: "title", label: "SEO Title" },
      { type: "string", name: "description", label: "SEO Description", ui: { component: "textarea" } },
    ],
  },
  {
    type: "object",
    name: "hero",
    label: "Hero Section",
    fields: [
      { type: "string", name: "eyebrow", label: "Eyebrow" },
      { type: "string", name: "headline", label: "Headline" },
      { type: "string", name: "headlineHighlight", label: "Headline Highlight" },
      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
      {
        type: "object",
        name: "ctaButton",
        label: "Primary CTA",
        fields: [
          { type: "string", name: "label", label: "Label" },
          { type: "string", name: "href", label: "URL" },
        ],
      },
      {
        type: "object",
        name: "secondaryCta",
        label: "Secondary CTA",
        fields: [
          { type: "string", name: "label", label: "Label" },
          { type: "string", name: "href", label: "URL" },
        ],
      },
      {
        type: "object",
        name: "tertiaryCta",
        label: "Tertiary CTA",
        fields: [
          { type: "string", name: "label", label: "Label" },
          { type: "string", name: "href", label: "URL" },
        ],
      },
      { type: "string", name: "trustNote", label: "Trust Note", ui: { component: "textarea" } },
      {
        type: "object",
        name: "image",
        label: "Hero Image",
        fields: [
          { type: "image", name: "src", label: "Image File" },
          { type: "string", name: "alt", label: "Alt Text" },
        ],
      },
    ],
  },
  {
    type: "object",
    name: "snapshot",
    label: "National Snapshot Section",
    fields: [
      { type: "string", name: "heading", label: "Heading" },
      { type: "string", name: "intro", label: "Intro Text", ui: { component: "textarea" } },
    ],
  },
  {
    type: "object",
    name: "educationalCards",
    label: "Educational Cards",
    list: true,
    fields: [
      { type: "string", name: "title", label: "Card Title" },
      { type: "string", name: "description", label: "Card Description", ui: { component: "textarea" } },
      { type: "image", name: "imageSrc", label: "Card Image" },
      { type: "string", name: "imageAlt", label: "Alt Text" },
      { type: "string", name: "linkHref", label: "Link URL" },
      { type: "string", name: "linkLabel", label: "Link Text" },
    ],
  },
  {
    type: "object",
    name: "methodologyStrip",
    label: "Methodology Strip",
    fields: [
      { type: "string", name: "heading", label: "Heading" },
      { type: "string", name: "body", label: "Body Text", ui: { component: "textarea" } },
      { type: "string", name: "href", label: "Link Href" },
      { type: "string", name: "label", label: "Button Label" },
    ],
  },

  // --- Footer Config (footer.json) ---
  { type: "string", name: "quote", label: "Quote / Tagline" },
  { type: "string", name: "disclaimer", label: "Disclaimer", ui: { component: "textarea" } },
  {
    type: "object",
    name: "socialLinks",
    label: "Social Media Links",
    list: true,
    fields: [
      { type: "string", name: "platform", label: "Platform" },
      { type: "string", name: "href", label: "URL" },
      { type: "string", name: "ariaLabel", label: "Aria Label" },
    ],
  },
  {
    type: "object",
    name: "walletButton",
    label: "Wallet Button Config",
    fields: [{ type: "string", name: "label", label: "Button Label" }],
  },
  { type: "string", name: "copyright", label: "Copyright Notice" },
  {
    type: "object",
    name: "legalLinks",
    label: "Legal Links",
    list: true,
    fields: [
      { type: "string", name: "label", label: "Label" },
      { type: "string", name: "href", label: "URL" },
    ],
  },

  // --- Dashboard Config (dashboard.json) ---
  {
    type: "object",
    name: "statsCards",
    label: "Stats Cards",
    list: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "value", label: "Value" },
      { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
    ],
  },
  {
    type: "object",
    name: "tokensCard",
    label: "Tokens Card",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "value", label: "Value" },
      { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
    ],
  },
  {
    type: "object",
    name: "pluggingTrend",
    label: "Plugging Trend Section",
    fields: [
      { type: "string", name: "sectionTitle", label: "Section Title Parts", list: true },
      { type: "string", name: "chartTitle", label: "Chart Title" },
      { type: "string", name: "chartSubtitle", label: "Chart Subtitle" },
      { type: "string", name: "dataSource", label: "Data Source Note", ui: { component: "textarea" } },
      {
        type: "object",
        name: "trendData",
        label: "Trend Data Points",
        list: true,
        fields: [
          { type: "number", name: "day", label: "Day" },
          { type: "number", name: "value", label: "Value" },
        ],
      },
      { type: "string", name: "mintLogTitle", label: "Mint Log Title" },
      {
        type: "object",
        name: "mintLogEntries",
        label: "Mint Log Entries",
        list: true,
        fields: [
          { type: "string", name: "date", label: "Date" },
          { type: "number", name: "wells", label: "Wells Count" },
          { type: "string", name: "status", label: "Status" },
        ],
      },
    ],
  },
  {
    type: "object",
    name: "dailyMintLog",
    label: "Daily Mint Log Section",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "currentDate", label: "Current Date Label" },
      {
        type: "object",
        name: "entries",
        label: "Log Entries",
        list: true,
        fields: [
          { type: "string", name: "date", label: "Date" },
          { type: "number", name: "wells", label: "Wells Count" },
          { type: "string", name: "status", label: "Status" },
        ],
      },
      {
        type: "object",
        name: "footer",
        label: "Mint Log Footer",
        fields: [
          { type: "string", name: "brandLabel", label: "Brand Label" },
          { type: "string", name: "recordsUrl", label: "Records URL" },
        ],
      },
    ],
  },
  {
    type: "object",
    name: "stateLeaderboard",
    label: "State Leaderboard Section",
    fields: [
      { type: "string", name: "title", label: "Title" },
      {
        type: "object",
        name: "entries",
        label: "Leaderboard Entries",
        list: true,
        fields: [
          { type: "number", name: "rank", label: "Rank" },
          { type: "string", name: "state", label: "State Name" },
          { type: "string", name: "flag", label: "State Abbreviation / Flag" },
          { type: "number", name: "wells", label: "Wells Count" },
        ],
      },
      {
        type: "object",
        name: "viewAllButton",
        label: "View All Button",
        fields: [
          { type: "string", name: "label", label: "Button Label" },
          { type: "string", name: "href", label: "URL" },
        ],
      },
      { type: "string", name: "dataSourceNote", label: "Data Source Note", ui: { component: "textarea" } },
    ],
  },
];

// Schema for Sub-Pages (content/pages/*.json)
const standardPageFields = [
  {
    type: "string",
    name: "title",
    label: "Title (Meta/SEO)",
    isTitle: true,
    required: true,
  },
  {
    type: "string",
    name: "description",
    label: "Description (Meta/SEO)",
    ui: { component: "textarea" },
  },
  {
    type: "string",
    name: "eyebrow",
    label: "Eyebrow",
  },
  {
    type: "string",
    name: "headline",
    label: "Main Headline",
  },
  {
    type: "image",
    name: "heroImage",
    label: "Hero Image",
  },
  {
    type: "string",
    name: "body",
    label: "Main Body Text",
    ui: { component: "textarea" },
  },
  {
    type: "object",
    name: "sections",
    label: "Content Sections",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.heading || "New Section" }),
    },
    fields: [
      { type: "string", name: "heading", label: "Section Heading" },
      { type: "image", name: "image", label: "Section Image" },
      { type: "string", name: "body", label: "Section Body Text", ui: { component: "textarea" } },
      { type: "string", name: "bullets", label: "Bullet Points", list: true },
    ],
  },
];

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "", 
  token: process.env.TINA_TOKEN || "",

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
        name: "core",
        label: "Core Config",
        path: "content",
        match: {
          exclude: "pages/**", // Excludes subfolder content while matching root JSON files
        },
        format: "json",
        // @ts-ignore
        fields: coreConfigurationFields,
      },
      {
        name: "pages",
        label: "Sub Pages",
        path: "content/pages",
        format: "json",
        // @ts-ignore
        fields: standardPageFields,
      },
    ],
  },
});