import fs from 'node:fs';
const path = 'src/components/dc/sections.tsx';
let s = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
s = s.replace('import { Marquee } from "./Marquee";', 'import { Marquee } from "./Marquee";\nimport { products, formatPrice, photo, type Product } from "./catalog";\nimport { useShop } from "./ShopProvider";');
s = s.replace('name: "Pendants", img: everyday', 'name: "Pendants", img: photo("category-pendants")').replace('name: "Bracelets", img: goldCol', 'name: "Bracelets", img: photo("category-bracelets")').replace('name: "Chains", img: necklaces', 'name: "Chains", img: photo("category-chains")');
s = s.replace(/(name: "Festive Glamour"[^\n]+img:) festive/, '$1 photo("collection-festive")').replace(/(name: "Modern Classics"[^\n]+img:) necklaces/, '$1 photo("collection-modern")');
for (const [name, item] of [['CategorySection','c'], ['CollectionSection','c'], ['OccasionSection','o']]) {
  const start = s.indexOf(`export function ${name}()`);
  const end = s.indexOf('\n/*', start);
  let block = s.slice(start, end);
  block = block.replace('() {\n', '() {\n  const shop = useShop();\n');
  block = block.replace('<article', `<button type="button" onClick={() => shop.browse(${item}.name)}`).replace('</article>', '</button>').replace('className="group relative', 'className="group relative block w-full text-left');
  s = s.slice(0,start) + block + s.slice(end);
}
s = s.replace(/type Product =[^]*?function ProductCard/, 'function ProductCard');
s = s.replace('  const [wishlisted, setWishlisted] = useState(false);\n  const [added, setAdded] = useState(false);', '  const shop = useShop();\n  const wishlisted = shop.wishlist.includes(p.id);');
s = s.replace('aria-label="Add to wishlist"', 'aria-label={`${wishlisted ? "Remove" : "Add"} ${p.name} ${wishlisted ? "from" : "to"} wishlist`}').replace('onClick={() => setWishlisted((value) => !value)}', 'onClick={() => shop.toggleWish(p.id)}');
s = s.replace('<div className="absolute inset-x-0 bottom-0 translate-y-full', '<button type="button" onClick={() => shop.quickView(p)} aria-label={`Quick view ${p.name}`} className="absolute inset-x-0 bottom-0');
s = s.replace('          Quick View\n        </div>', '          Quick View\n        </button>');
s = s.replace('{p.price}', '{formatPrice(p.price)}').replace('onClick={() => setAdded(true)}', 'onClick={() => shop.add(p.id)}').replace('{added ? "Added to Bag" : "Add to Bag"}', 'Add to Bag');
s = s.replace('items={products}', 'items={products.slice(0, 4)}');
s = s.replace('tab === "ALL" ? products : products.filter', 'tab === "ALL" ? products.slice(4) : products.slice(4).filter');
s = s.replace('onClick={() => setTab(t)}', 'onClick={() => setTab(t)}\n              aria-pressed={tab === t}');
s = s.replace(/const occasions = \[[^]*?\];/, `const occasions = [${['Wedding','Engagement','Anniversary','Birthday','Festive','Everyday'].map(n => `\n  { name: "${n}", img: photo("occasion-${n.toLowerCase()}") },`).join('')}\n];`);
s = s.replace('export function DCExperience() {', 'export function DCExperience() {\n  const shop = useShop();');
s = s.replace('src={mall}', 'src={e.name === "Jewellery" ? mall : photo(`experience-${e.name.toLowerCase()}`)}');
s = s.replace('alt={`DC mall ${e.name.toLowerCase()} zone`}', 'alt={`${e.name} inspiration`}');
s = s.replace('{e.copy}</p>', '{e.copy}</p>\n                <button className="mt-5 text-xs uppercase tracking-widest text-champagne underline underline-offset-4" onClick={() => shop.info(e.name, `${e.copy}\\n\\nPlan your visit with a DC store. Contact the team for current brands, opening times and availability.`)}>Explore {e.name}</button>');
s = s.replace('placeholder="Search city or area"', 'aria-label="Search city or area"\n            placeholder="Search city or area"');
s = s.replace('{s.phone}</li>', '<a href={`tel:${s.phone.replace(/\\s/g, "")}`}>{s.phone}</a></li>');
s = s.replace(/const gallery = \[[^]*?\];/, `const gallery = [
  { img: photo("journal-bridal"), title: "The bridal edit", text: "Build your look around one statement piece, then balance it with complementary earrings. Bring a fabric swatch to your styling appointment to explore colours together." },
  { img: photo("journal-tradition"), title: "A touch of tradition", text: "Pair heirloom jewellery with a simple neckline to let the craftsmanship stand out. Store individual pieces separately to protect their surfaces." },
  { img: photo("journal-colour"), title: "Celebrate in colour", text: "Use one accent colour to connect your jewellery with your outfit. Try different combinations in person to see how they catch the light." },
  { img: photo("journal-heritage"), title: "Details to remember", text: "Consider your neckline, hairstyle and comfort when choosing a celebration look. Bring photographs of your outfit to help the store team suggest pairings." },
  { img: photo("journal-silver"), title: "A little brilliance", text: "A delicate pair of earrings can add a finishing touch to an everyday look. Keep pieces away from perfumes and harsh cleaners." },
  { img: photo("journal-minimal"), title: "Less, beautifully", text: "A single bracelet gives a clean silhouette. Try the fit with your wrist relaxed and allow comfortable movement." },
  { img: photo("journal-mixed"), title: "Mix your metals", text: "Repeat a metal tone in two places for a balanced look. Leave a little space between bracelets to reduce rubbing." },
  { img: photo("journal-layering"), title: "The art of layering", text: "Choose necklaces of different lengths so each pendant has room to shine. Untangle and store chains individually after wearing." },
];`);
s = s.replace('export function InstagramGallery() {', 'export function InstagramGallery() {\n  const shop = useShop();');
s = s.replace('eyebrow="@dcjewellery"', 'eyebrow="Style & inspiration"');
const galleryStart = s.indexOf('export function InstagramGallery()');
const galleryEnd = s.indexOf('/* ---------------- 19.', galleryStart);
let galleryBlock = s.slice(galleryStart, galleryEnd).replace('<a\n', '<button type="button"\n').replace('href="#top"', 'onClick={() => shop.info(g.title, g.text)}').replace('src={g} alt="DC jewellery social post"', 'src={g.img} alt={g.title}').replace('<FiInstagram className="text-2xl text-champagne" />', '<FiArrowRight className="text-2xl text-champagne" />').replace('>View</span>', '>{g.title}</span>').replace('</a>', '</button>');
s = s.slice(0,galleryStart) + galleryBlock + s.slice(galleryEnd);
// There is no subscription API configured: do not claim an email was registered.
const newsletterStart = s.indexOf('export function Newsletter()');
const newsletterEnd = s.indexOf('/* ---------------- 20.', newsletterStart);
s = s.slice(0,newsletterStart) + `export function Newsletter() {
  return (
    <section className="bg-navy py-24 lg:py-28">
      <div className="mx-auto max-w-2xl px-5 text-center lg:px-10">
        <SectionHeading light eyebrow="Keep in touch" title="Stay In The Glow" />
        <p className="mt-6 text-sm font-light leading-loose text-white/70">Discover new collections and find your next favourite with the DC team.</p>
        <div className="mt-10"><MagneticButton variant="glass" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>Connect with a store</MagneticButton></div>
      </div>
    </section>
  );
}

` + s.slice(newsletterEnd);
s = s.replace('export function Footer({ logoUrl }: { logoUrl: string }) {', 'export function Footer({ logoUrl }: { logoUrl: string }) {\n  const shop = useShop();');
s = s.replace(/            <div className="mt-7 flex gap-4[^]*?            <\/div>/, '            <a href="#contact" className="mt-7 inline-block text-sm text-champagne underline">Connect with DC</a>');
s = s.replace('<a href="#top" className="text-xs font-light text-white/65 transition-colors hover:text-white">\n                        {l}\n                      </a>', `<button type="button" onClick={() => {
                        if (col.title === "Shop" || col.title === "Collections") shop.browse(l);
                        else if (col.title === "Contact") document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                        else shop.info(l, col.title === "DC Mall" ? "Explore the DC experience and contact a store for current brands, events and opening times." : l === "Care Guide" ? "Store jewellery separately in a soft pouch. Avoid contact with perfume, chlorine and harsh cleaners. Ask the store about care appropriate for your particular gemstone and setting." : l === "Size Guide" ? "For an accurate fit, visit a store to have your ring or wrist size measured. Bring an existing piece that fits well, and let the team know whether you prefer a close or relaxed fit." : l === "Track Order" ? "Please contact the store where you placed your order with your order reference. Online order tracking is not available here yet." : "Contact the DC team for information about " + l.toLowerCase() + ". The store can answer your questions and provide the current details.");
                      }} className="text-left text-xs font-light text-white/65 transition-colors hover:text-white">{l}</button>`);
fs.writeFileSync(path, s);
