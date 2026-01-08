import { defineField, defineType } from "sanity"
import { blogType } from "./schemaTypes/blog" // və ya postType
import { authorType } from "./schemaTypes/authorType"
import { categoryType } from "./schemaTypes/categoryType"
import { blockContentType } from "./schemaTypes/blockContentType"

// Sizin Product Sminiz ( olduğu kimi qalır )
export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (AZN)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required() }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt Text", type: "string" }] }],
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      options: {
        list: [
          { title: "In Stock", value: "inStock" },
          { title: "Out of Stock", value: "outOfStock" },
        ],
        layout: "radio",
      },
      initialValue: "inStock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Electronics", value: "electronics" },
          { title: "Clothing", value: "clothing" },
          { title: "Home & Garden", value: "home-garden" },
          { title: "Books", value: "books" },
          { title: "Sports", value: "sports" },
        ],
      },
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      price: "price",
      availability: "availability",
    },
    prepare(selection) {
      const { title, media, price, availability } = selection
      return {
        title: title,
        subtitle: `${price} AZN - ${availability === "inStock" ? "✅ In Stock" : "❌ Out of Stock"}`,
        media: media,
      }
    },
  },
})

export const schema = {
  types: [
    productSchema,    
    blogType,         
    authorType,       
    categoryType,     
    blockContentType  
  ],
}
