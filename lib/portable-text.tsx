import { PortableText, type PortableTextComponents } from "@portabletext/react"

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-balance">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-balance">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-pretty">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

export { PortableText }
