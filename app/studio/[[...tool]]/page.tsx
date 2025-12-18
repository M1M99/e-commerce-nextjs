"use client"

import { NextStudio } from "next-sanity/studio"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schema } from "@/sanity/schema"

export const dynamic = "force-static"

const config = defineConfig({
  name: "default",
  title: "Baku E-Commerce",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "test",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: schema,
})

export default function StudioPage() {
  return <NextStudio config={config} />
}
