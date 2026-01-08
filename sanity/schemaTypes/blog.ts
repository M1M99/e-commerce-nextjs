import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'author', type: 'reference', to: { type: 'author' } }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alternative text' })]
    }),
    defineField({ name: 'categories', type: 'array', of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })] }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'body', type: 'blockContent' }),
  
    // --- DÜZƏLİŞ EDİLƏN HİSSƏ ---
    defineField({
      name: 'relatedProduct',
      title: 'Əlaqəli Məhsul',
      description: 'Bu məqaləni oxuyan şəxsə hansı məhsulu təklif edək?',
      type: 'reference',
      to: [{ type: 'product' }] // DİQQƏT: Səndə 'product' adında schema mütləq olmalıdır
    }),
    // -----------------------------
  
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'mainImage' },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})