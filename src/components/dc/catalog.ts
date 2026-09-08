export const photo = (name: string) => `/images/${name}.jpg`;

export type Product = { id: string; name: string; price: number; img: string; alt: string; tag: string; category: string };
export const products: Product[] = [
  { id: "aurelia", name: "Aurelia Solitaire Ring", price: 84500, img: photo("product-ring"), alt: "Diamond rings on a rose background", tag: "DIAMOND", category: "Rings" },
  { id: "celeste", name: "Celeste Drop Earrings", price: 46900, img: photo("product-earrings"), alt: "Diamond earrings on a white surface", tag: "DIAMOND", category: "Earrings" },
  { id: "lumina", name: "Lumina Pendant Chain", price: 32400, img: photo("product-pendant"), alt: "Golden pendant on a reflective surface", tag: "EVERYDAY", category: "Pendants" },
  { id: "rani", name: "Rani Heritage Bracelet", price: 124000, img: photo("product-bracelet"), alt: "Gold bracelet with colourful gems", tag: "BRIDAL", category: "Bracelets" },
  { id: "nova", name: "Nova Diamond Earrings", price: 98700, img: photo("bestseller-earrings"), alt: "Sparkling diamond earrings", tag: "DIAMOND", category: "Earrings" },
  { id: "soleil", name: "Soleil Gold Bracelet", price: 28900, img: photo("bestseller-bracelet"), alt: "Gold bracelet on decorative stone", tag: "GOLD", category: "Bracelets" },
  { id: "aria", name: "Aria Medallion Necklace", price: 18600, img: photo("bestseller-pendant"), alt: "Round gold pendants on marble", tag: "EVERYDAY", category: "Necklaces" },
  { id: "utsav", name: "Utsav Pendant Chain", price: 156000, img: photo("bestseller-chain"), alt: "Ornate gold medallion necklace", tag: "BRIDAL", category: "Chains" },
];

export const formatPrice = (price: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export function findProducts(query: string) {
  const term = query.trim().toLowerCase();
  const aliases: Record<string, string> = { wedding: "bridal", engagement: "rings", anniversary: "diamond", birthday: "everyday", festive: "bridal", "the wedding edit": "bridal", "diamond stories": "diamond", "timeless gold": "gold", "everyday elegance": "everyday", "festive glamour": "bridal", "modern classics": "gold", "special moments": "everyday", premium: "diamond", gold: "gold" };
  const search = aliases[term] ?? term;
  if (["all", "new arrivals", "best sellers", "jewellery", "collections", "gifting"].includes(search)) return products;
  return products.filter((p) => `${p.name} ${p.tag} ${p.category}`.toLowerCase().includes(search));
}
