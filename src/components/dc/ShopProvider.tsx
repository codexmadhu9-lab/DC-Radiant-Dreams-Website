import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { products, findProducts, formatPrice, type Product } from "./catalog";

type Panel = { kind: "search" | "wishlist" | "bag"; title: string } | { kind: "product"; product: Product; title: string } | { kind: "info"; title: string; text: string };
type Saved = { bag: Record<string, number>; wishlist: string[] };
type Shop = Saved & {
  add: (id: string) => void;
  toggleWish: (id: string) => void;
  browse: (query?: string) => void;
  show: (kind: "wishlist" | "bag") => void;
  quickView: (product: Product) => void;
  info: (title: string, text: string) => void;
};
const Context = createContext<Shop | null>(null);
export function useShop() {
  const value = useContext(Context);
  if (!value) throw new Error("ShopProvider is required");
  return value;
}
const action = "border border-navy/20 px-4 py-3 text-xs transition-colors hover:bg-navy hover:text-white";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>({ bag: {}, wishlist: [] });
  const [ready, setReady] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("dc-shop-v1") ?? "null");
      if (raw && typeof raw.bag === "object" && raw.bag && Array.isArray(raw.wishlist)) {
        const ids = new Set(products.map((p) => p.id));
        setSaved({ bag: Object.fromEntries(Object.entries(raw.bag).filter(([id, n]) => ids.has(id) && Number.isInteger(n) && Number(n) > 0 && Number(n) <= 99)) as Record<string, number>, wishlist: raw.wishlist.filter((id: unknown) => typeof id === "string" && ids.has(id)) });
      }
    } catch { /* Storage may be disabled. Shopping still works for this visit. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem("dc-shop-v1", JSON.stringify(saved)); } catch { /* Keep in-memory state. */ }
  }, [saved, ready]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  const add = (id: string) => {
    setSaved((s) => ({ ...s, bag: { ...s.bag, [id]: Math.min(99, (s.bag[id] ?? 0) + 1) } }));
    setNotice("Added to your shopping bag");
  };
  const quantity = (id: string, value: number) => setSaved((s) => {
    const bag = { ...s.bag };
    if (value <= 0) delete bag[id]; else bag[id] = Math.min(value, 99);
    return { ...s, bag };
  });
  const toggleWish = (id: string) => setSaved((s) => ({ ...s, wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id] }));
  const shop: Shop = {
    ...saved, add, toggleWish,
    browse: (term = "") => { setQuery(term); setPanel({ kind: "search", title: "Explore jewellery" }); },
    show: (kind) => setPanel({ kind, title: kind === "bag" ? "Your shopping bag" : "Your wishlist" }),
    quickView: (product) => setPanel({ kind: "product", product, title: product.name }),
    info: (title, text) => setPanel({ kind: "info", title, text }),
  };
  const listing = panel?.kind === "wishlist" ? products.filter((p) => saved.wishlist.includes(p.id)) : panel?.kind === "bag" ? products.filter((p) => saved.bag[p.id]) : findProducts(query);
  const visit = () => { setPanel(null); window.setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 100); };
  return (
    <Context.Provider value={shop}>
      {children}
      <div role="status" className={`pointer-events-none fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 bg-navy px-6 py-3 text-sm text-white shadow-lg transition-opacity ${notice ? "opacity-100" : "opacity-0"}`}>{notice}</div>
      <Dialog open={panel !== null} onOpenChange={(open) => { if (!open) setPanel(null); }}>
        <DialogContent className="max-h-[85svh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto p-6 sm:p-8">
          <DialogTitle className="pr-6 font-display text-3xl">{panel?.title}</DialogTitle>
          <DialogDescription>{panel?.kind === "info" ? "Discover more with DC." : "Explore your favourites and plan your next visit."}</DialogDescription>
          {panel?.kind === "info" ? <><p className="whitespace-pre-line text-sm leading-7">{panel.text}</p><button className={action} onClick={visit}>Contact a DC store</button></> : panel?.kind === "product" ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <img src={panel.product.img} alt={panel.product.alt} className="aspect-[4/5] w-full object-cover" />
              <div className="space-y-5"><p className="text-xs tracking-widest text-royal">{panel.product.tag} · {panel.product.category}</p><p className="text-xl">{formatPrice(panel.product.price)}</p><p className="text-sm leading-7 text-muted-foreground">Save this piece or add it to your bag to plan your visit. Contact the store for current availability, sizing and final pricing.</p><button className={action} onClick={() => add(panel.product.id)}>Add to Bag</button><button className={`${action} ml-2`} aria-pressed={saved.wishlist.includes(panel.product.id)} onClick={() => toggleWish(panel.product.id)}>{saved.wishlist.includes(panel.product.id) ? "Remove from wishlist" : "Save to wishlist"}</button><button className="block text-sm underline" onClick={visit}>Ask about this piece</button></div>
            </div>
          ) : panel ? (
            <>
              {panel.kind === "search" && <input aria-label="Search jewellery" autoFocus placeholder="Search rings, gold, earrings…" className="w-full border p-3" value={query} onChange={(e) => setQuery(e.target.value)} />}
              {listing.length === 0 && <div className="py-10 text-center"><p>{panel.kind === "search" ? "No pieces match this search. Try a different category or ask a store about our full range." : panel.kind === "bag" ? "Your shopping bag is empty." : "Save pieces using the heart on any product."}</p><button className={`${action} mt-5`} onClick={() => shop.browse()}>Browse all jewellery</button></div>}
              <div className="space-y-4">{listing.map((p) => <div key={p.id} className="flex gap-4 border-b pb-4"><button aria-label={`View ${p.name}`} onClick={() => shop.quickView(p)}><img src={p.img} alt={p.alt} className="h-24 w-20 shrink-0 object-cover" /></button><div className="flex-1"><button className="text-left font-display text-lg" onClick={() => shop.quickView(p)}>{p.name}</button><p className="my-2 text-sm">{formatPrice(p.price)}</p>{panel.kind === "bag" ? <div className="flex flex-wrap items-center gap-3"><button className={action} aria-label={`Decrease ${p.name} quantity`} onClick={() => quantity(p.id, (saved.bag[p.id] ?? 1) - 1)}>−</button><span aria-label="Quantity">{saved.bag[p.id]}</span><button className={action} aria-label={`Increase ${p.name} quantity`} onClick={() => quantity(p.id, (saved.bag[p.id] ?? 0) + 1)}>+</button><button className="text-xs underline" onClick={() => quantity(p.id, 0)}>Remove</button></div> : <div className="flex flex-wrap gap-2"><button className={action} onClick={() => add(p.id)}>Add to Bag</button><button className={action} aria-pressed={saved.wishlist.includes(p.id)} onClick={() => toggleWish(p.id)}>{saved.wishlist.includes(p.id) ? "Unsave" : "Save"}</button></div>}</div></div>)}</div>
              {panel.kind === "bag" && listing.length > 0 && <div className="space-y-4"><p className="text-lg">Estimated total: {formatPrice(listing.reduce((sum, p) => sum + p.price * (saved.bag[p.id] ?? 0), 0))}</p><p className="text-sm text-muted-foreground">Online checkout is not available yet. Your bag is saved on this device; visit a store to confirm availability and complete your purchase.</p><button className={action} onClick={visit}>Find a store</button></div>}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Context.Provider>
  );
}
