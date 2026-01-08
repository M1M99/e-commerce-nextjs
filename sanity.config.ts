// import { defineConfig } from "sanity"
// import { structureTool } from "sanity/structure"
// import { visionTool } from "@sanity/vision"
// import { schema } from "./sanity/schema"

// const config = defineConfig({
//   name: "default",
//   title: "Baku E-Commerce",
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "test",
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   basePath: "/studio",
//   plugins: [structureTool(), visionTool()],
//   schema: schema,
// })

// export { config }
// export default config



import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schema } from "./sanity/schemaTypes" 
import { structure } from "./sanity/structure"

export default defineConfig({
  name: "default",
  title: "Baku E-Commerce",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: schema,
})
