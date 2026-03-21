import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.HEAD ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    "main",

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

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
        match: {
          include: "site",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Site Name",
          },
          {
            type: "object",
            name: "logo",
            label: "Logo",
            fields: [
              {
                type: "string",
                name: "alt",
                label: "Logo Alt Text",
              },
            ],
          },
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "href",
                label: "Link",
              },
            ],
          },
          {
            type: "object",
            name: "ctaButton",
            label: "Header CTA Button",
            fields: [
              {
                type: "string",
                name: "label",
                label: "Button Label",
              },
              {
                type: "string",
                name: "href",
                label: "Button Link",
              },
            ],
          },
        ],
      },
      {
        label: "Homepage",
        name: "home",
        path: "content",
        format: "json",
        match: {
          include: "home",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              {
                type: "string",
                name: "headline",
                label: "Headline",
              },
              {
                type: "string",
                name: "headlineHighlight",
                label: "Headline Highlight",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "ctaButton",
                label: "CTA Button",
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Button Label",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Button Link",
                  },
                ],
              },
              {
                type: "object",
                name: "image",
                label: "Hero Image",
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "educationalCards",
            label: "Educational Cards",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "imageSrc",
                label: "Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Alt Text",
              },
              {
                type: "string",
                name: "linkHref",
                label: "Link",
              },
              {
                type: "string",
                name: "linkLabel",
                label: "Link Label",
              },
            ],
          },
        ],
      },
      {
        label: "Dashboard",
        name: "dashboard",
        path: "content",
        format: "json",
        match: {
          include: "dashboard",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "statsCards",
            label: "Stats Cards",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "value",
                label: "Value",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
              },
            ],
          },
          {
            type: "object",
            name: "tokensCard",
            label: "Tokens Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "value",
                label: "Value",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
              },
            ],
          },
          {
            type: "object",
            name: "pluggingTrend",
            label: "Plugging Trend",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                list: true,
              },
              {
                type: "string",
                name: "chartTitle",
                label: "Chart Title",
              },
              {
                type: "string",
                name: "chartSubtitle",
                label: "Chart Subtitle",
              },
              {
                type: "string",
                name: "dataSource",
                label: "Data Source",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "trendData",
                label: "Trend Data",
                list: true,
                fields: [
                  {
                    type: "number",
                    name: "day",
                    label: "Day",
                  },
                  {
                    type: "number",
                    name: "value",
                    label: "Value",
                  },
                ],
              },
              {
                type: "string",
                name: "mintLogTitle",
                label: "Mint Log Title",
              },
              {
                type: "object",
                name: "mintLogEntries",
                label: "Mint Log Entries",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "date",
                    label: "Date",
                  },
                  {
                    type: "number",
                    name: "wells",
                    label: "Wells",
                  },
                  {
                    type: "string",
                    name: "status",
                    label: "Status",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "dailyMintLog",
            label: "Daily Mint Log",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "currentDate",
                label: "Current Date",
              },
              {
                type: "object",
                name: "entries",
                label: "Entries",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "date",
                    label: "Date",
                  },
                  {
                    type: "number",
                    name: "wells",
                    label: "Wells",
                  },
                  {
                    type: "string",
                    name: "status",
                    label: "Status",
                  },
                ],
              },
              {
                type: "object",
                name: "footer",
                label: "Footer",
                fields: [
                  {
                    type: "string",
                    name: "brandLabel",
                    label: "Brand Label",
                  },
                  {
                    type: "string",
                    name: "recordsUrl",
                    label: "Records URL",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "stateLeaderboard",
            label: "State Leaderboard",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "object",
                name: "entries",
                label: "Entries",
                list: true,
                fields: [
                  {
                    type: "number",
                    name: "rank",
                    label: "Rank",
                  },
                  {
                    type: "string",
                    name: "state",
                    label: "State",
                  },
                  {
                    type: "string",
                    name: "flag",
                    label: "Flag Abbreviation",
                  },
                  {
                    type: "number",
                    name: "wells",
                    label: "Wells",
                  },
                ],
              },
              {
                type: "object",
                name: "viewAllButton",
                label: "View All Button",
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Button Label",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Button Link",
                  },
                ],
              },
              {
                type: "string",
                name: "dataSourceNote",
                label: "Data Source Note",
              },
            ],
          },
        ],
      },
      {
        label: "Footer",
        name: "footer",
        path: "content",
        format: "json",
        match: {
          include: "footer",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "quote",
            label: "Quote",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "href",
                label: "Link",
              },
            ],
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "platform",
                label: "Platform",
              },
              {
                type: "string",
                name: "href",
                label: "Link",
              },
              {
                type: "string",
                name: "ariaLabel",
                label: "Aria Label",
              },
            ],
          },
          {
            type: "object",
            name: "walletButton",
            label: "Wallet Button",
            fields: [
              {
                type: "string",
                name: "label",
                label: "Button Label",
              },
            ],
          },
          {
            type: "string",
            name: "copyright",
            label: "Copyright",
          },
          {
            type: "object",
            name: "legalLinks",
            label: "Legal Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "href",
                label: "Link",
              },
            ],
          },
        ],
      },
    ],
  },
});