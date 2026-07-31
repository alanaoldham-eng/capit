import { defineConfig } from "tinacms";

// We define the fields once to keep the config DRY (Don't Repeat Yourself)
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
    label: "Eyebrow (Optional Small Text)",
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
    name: "primaryCta",
    label: "Primary Button",
    fields: [
      { type: "string", name: "label", label: "Button Label" },
      { type: "string", name: "href", label: "Button Link (URL)" },
    ],
  },
  {
    type: "object",
    name: "secondaryCta",
    label: "Secondary Button",
    fields: [
      { type: "string", name: "label", label: "Button Label" },
      { type: "string", name: "href", label: "Button Link (URL)" },
    ],
  },
  {
    type: "object",
    name: "sections",
    label: "Content Sections",
    list: true,
    ui: {
      itemProps: (item) => {
        return { label: item?.heading || "New Section" };
      },
    },
    fields: [
      {
        type: "string",
        name: "heading",
        label: "Section Heading",
      },
      {
        type: "image",
        name: "image",
        label: "Section Image",
      },
      {
        type: "string",
        name: "body",
        label: "Section Body Text",
        ui: { component: "textarea" },
      },
      {
        type: "string",
        name: "bullets",
        label: "Bullet Points",
        list: true,
      },
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
        label: "Core Content",
        path: "content",
        match: {
          // This ensures Tina only reads JSON files in the root, ignoring the 'pages' subfolder
          include: "*.json",
        },
        format: "json",
        // @ts-ignore - Ignoring strict type checking for the shared array
        fields: standardPageFields,
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