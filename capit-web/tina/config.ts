import { defineConfig } from "tinacms";

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
        name: "page",
        label: "Pages",
        path: "content",
        format: "json",
        fields: [
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
        ],
      },
    ],
  },
});