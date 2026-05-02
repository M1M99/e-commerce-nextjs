"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Command as CommandPrimitive } from "cmdk"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import type { Product } from "@/lib/sanity-utils"
const EmptyState = ({ products, onSelect }: { products: Product[], onSelect: (slug: string) => void }) => {
    const popularProducts = products.slice(0, 3);
    return (
        <div className="py-6 px-4 text-center">
            <Search className="size-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">Heç nə tapılmadı.</p>
            <p className="text-xs text-muted-foreground mb-4">Axtarışınıza uyğun məhsul yoxdur, bəlkə bunlara göz atasınız?</p>
            
            {popularProducts.length > 0 && (
                <div className="flex flex-col gap-1 mt-4 text-left">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Populyar Məhsullar</div>
                    {popularProducts.map(p => (
                        <div 
                            key={`empty-${p._id}`}
                            onClick={() => onSelect(p.slug.current)}
                            className="flex items-center gap-3 cursor-pointer py-2 px-2 hover:bg-accent rounded-md transition-colors"
                        >
                            {p.mainImageUrl ? (
                                <img src={p.mainImageUrl} alt={p.title} className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
                            ) : (
                                <div className="h-10 w-10 rounded-md bg-muted flex-shrink-0" />
                            )}
                            <div className="flex-1 overflow-hidden text-left">
                                <div className="truncate text-sm font-medium text-foreground">{p.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{p.price} ₼</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export function SearchBar({ products = [] }: { products?: Product[] }) {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openDesktop, setOpenDesktop] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                if (window.innerWidth < 640) {
                    setOpenDialog((open) => !open)
                } else {
                    inputRef.current?.focus()
                }
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommandDesktop = React.useCallback((command: () => void) => {
        setOpenDesktop(false)
        setQuery("")
        command()
    }, [])

    const runCommandMobile = React.useCallback((command: () => void) => {
        setOpenDialog(false)
        command()
    }, [])

    return (
        <>
            {/* MOBILE: Trigger Icon & Command Dialog */}
            <div className="sm:hidden flex items-center justify-center">
                <button
                    onClick={() => setOpenDialog(true)}
                    className="flex items-center justify-center rounded-full h-10 w-10 transition-colors hover:bg-accent/50 shrink-0 cursor-pointer"
                    aria-label="Search products"
                >
                    <Search className="size-5 text-foreground" />
                </button>
            </div>

            <CommandDialog open={openDialog} onOpenChange={setOpenDialog}>
                <CommandInput placeholder="Məhsul axtar..." />
                <CommandList className="max-h-[350px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 pr-1">
                    <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">Heç nə tapılmadı.</CommandEmpty>
                    <CommandGroup heading="Məhsullar">
                        {products.map((product) => (
                            <CommandItem
                                key={`mobile-${product._id}`}
                                value={product.title}
                                onSelect={() => {
                                    runCommandMobile(() => router.push(`/products/${product.slug.current}`))
                                }}
                                className="flex justify-start items-center gap-3 cursor-pointer py-2 px-3"
                            >
                                {product.mainImageUrl ? (
                                    <img src={product.mainImageUrl} alt={product.title} className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
                                ) : (
                                    <div className="h-10 w-10 rounded-md bg-muted flex-shrink-0" />
                                )}
                                <div className="flex-1 overflow-hidden">
                                    <div className="truncate text-sm font-medium">{product.title}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">{product.price} ₼</div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

            {/* DESKTOP: Inline Command Search */}
            <div className="relative hidden w-auto sm:w-[260px] sm:block z-50">
                <Command
                    className="overflow-visible bg-transparent border-none"
                    shouldFilter={true}
                >
                    <div className="flex items-center rounded-full border border-input bg-background/50 backdrop-blur-sm shadow-sm transition-colors focus-within:bg-background px-3 h-10 w-full box-border">
                        <Search className="size-4 shrink-0 text-muted-foreground mr-2" />
                        <CommandPrimitive.Input
                            ref={inputRef}
                            id="desktop-search"
                            autoFocus={false}
                            placeholder="Məhsul axtar..."
                            value={query}
                            onValueChange={(val) => {
                                setQuery(val)
                                setOpenDesktop(val.length > 0)
                            }}
                            onFocus={() => {
                                if (query.length > 0) setOpenDesktop(true)
                            }}
                            onBlur={() => {
                                // Tiny delay to ensure we can capture item clicks before it unmounts
                                setTimeout(() => setOpenDesktop(false), 200)
                            }}
                            className="flex w-full h-full min-w-[120px] bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground border-none m-0 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                            style={{ WebkitAppearance: 'none', border: 'none', outline: 'none' }}
                        />
                        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex shrink-0">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>

                    {openDesktop && query.length > 0 && (
                        <div className="absolute top-12 right-0 w-[350px] bg-popover shadow-xl rounded-xl z-50 overflow-hidden border border-muted/50 transition-all animate-in fade-in slide-in-from-top-2">
                            <CommandList className="max-h-[350px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 pr-1">
                                {/* <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">Heç nə tapılmadı.</CommandEmpty> */}
                                <CommandEmpty>
                                    <EmptyState products={products} onSelect={(slug) => runCommandDesktop(() => router.push(`/products/${slug}`))} />
                                </CommandEmpty>
                                <CommandGroup heading="Məhsullar">
                                    {products.map((product) => (
                                        <CommandItem
                                            key={`desktop-${product._id}`}
                                            value={product.title}
                                            onSelect={() => {
                                                runCommandDesktop(() => router.push(`/products/${product.slug.current}`))
                                            }}
                                            className="flex justify-start items-center gap-3 cursor-pointer py-2 px-3"
                                        >
                                            {product.mainImageUrl ? (
                                                <img src={product.mainImageUrl} alt={product.title} className="h-10 w-10 rounded-md object-cover flex-shrink-0" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-md bg-muted flex-shrink-0" />
                                            )}
                                            <div className="flex-1 overflow-hidden">
                                                <div className="truncate text-sm font-medium">{product.title}</div>
                                                <div className="text-xs text-muted-foreground mt-0.5">{product.price} ₼</div>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </div>
                    )}
                </Command>
            </div>
        </>
    )
}
