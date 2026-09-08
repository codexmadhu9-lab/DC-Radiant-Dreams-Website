import { useState } from "react";
import { FiHeart, FiArrowRight, FiInstagram, FiFacebook, FiYoutube, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { LuGem, LuShieldCheck, LuBadgeCheck, LuSparkles, LuRefreshCw, LuHandHeart } from "react-icons/lu";
import { MagneticButton } from "./MagneticButton";
import { CoverflowCarousel } from "./CoverflowCarousel";
import { Marquee } from "./Marquee";
import { products, formatPrice, photo, type Product } from "./catalog";
import { useShop } from "./ShopProvider";

import rings from "@/assets/cat-rings.jpg";
import earrings from "@/assets/cat-earrings.jpg";
import necklaces from "@/assets/cat-necklaces.jpg";
import bangles from "@/assets/cat-bangles.jpg";
import wedding from "@/assets/col-wedding.jpg";
import diamond from "@/assets/col-diamond.jpg";
import goldCol from "@/assets/col-gold.jpg";
import everyday from "@/assets/col-everyday.jpg";
import festive from "@/assets/col-festive.jpg";
import editorial from "@/assets/editorial-hand.jpg";
import mall from "@/assets/mall-interior.jpg";
import story from "@/assets/story-bg.jpg";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center" data-reveal>
      {eyebrow ? (
        <p className={`text-[0.6rem] uppercase tracking-[0.45em] ${light ? "text-champagne" : "text-royal"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        data-reveal-words
        className={`mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div className="gold-rule mx-auto mt-6 w-40" />
      {subtitle ? (
        <p className={`mt-5 text-sm font-light tracking-wide ${light ? "text-white/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------- 6. Categories ---------------- */
const categories = [
  { name: "Rings", img: rings },
  { name: "Earrings", img: earrings },
  { name: "Necklaces", img: necklaces },
  { name: "Pendants", img: photo("category-pendants") },
  { name: "Bracelets", img: photo("category-bracelets") },
  { name: "Bangles", img: bangles },
  { name: "Chains", img: photo("category-chains") },
  { name: "Bridal Jewellery", img: festive },
];

export function CategorySection() {
  const shop = useShop();
  return (
    <section id="jewellery" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="Shop by category"
          title="Discover Your Signature"
          subtitle="Find the piece that speaks to you."
        />
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {categories.map((c, i) => (
            <button type="button" onClick={() => shop.browse(c.name)}
              key={c.name}
              data-reveal
              data-reveal-delay={(i % 4) * 0.08}
              data-cursor="view"
              className="group relative block w-full text-left aspect-[3/4.4] overflow-hidden bg-mist"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/10 to-transparent transition-opacity duration-500 group-hover:from-royal/85" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl text-white lg:text-2xl">{c.name}</h3>
                <div className="mt-2 h-px w-0 bg-gold transition-all duration-500 group-hover:w-16" />
                <p className="mt-3 flex translate-y-3 items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-champagne opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore <FiArrowRight />
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 8. Collections coverflow ---------------- */
const collections = [
  { name: "The Wedding Edit", desc: "Heirloom bridal sets for the day you remember forever.", img: wedding },
  { name: "Diamond Stories", desc: "Brilliance cut to catch every glance.", img: diamond },
  { name: "Timeless Gold", desc: "Classic karats, reimagined for today.", img: goldCol },
  { name: "Everyday Elegance", desc: "Light, wearable pieces for daily rituals.", img: everyday },
  { name: "Festive Glamour", desc: "Statement jewels for the season of light.", img: photo("collection-festive") },
  { name: "Modern Classics", desc: "Architectural lines with a soft finish.", img: photo("collection-modern") },
];

export function CollectionSection() {
  const shop = useShop();
  return (
    <section id="collections" className="scroll-mt-20 bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <SectionHeading
          light
          eyebrow="Curated editions"
          title="The DC Collections"
          subtitle="Six worlds of craftsmanship, each with its own story."
        />
        <div className="mt-14" data-reveal>
          <CoverflowCarousel
            items={collections}
            render={(c) => (
              <button type="button" onClick={() => shop.browse(c.name)} className="group relative block w-full text-left aspect-[3/4.2] overflow-hidden border border-gold/40" data-cursor="view">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white">{c.name}</h3>
                  <p className="mt-2 text-xs font-light leading-relaxed text-white/70">{c.desc}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.3em] text-champagne">
                    Explore Collection <FiArrowRight />
                  </p>
                </div>
              </button>
            )}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- 9. Editorial split ---------------- */
export function EditorialSection() {
  return (
    <section id="about" className="scroll-mt-20 overflow-hidden bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="relative aspect-[4/5] overflow-hidden" data-cursor="view" data-reveal>
          <img
            src={editorial}
            alt="Diamond ring and gold bangles worn by a model"
            loading="lazy"
            className="h-[115%] w-full object-cover"
            data-parallax
          />
          <span className="absolute -bottom-px left-0 h-24 w-px bg-gold" />
        </div>
        <div data-reveal>
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-royal">The DC Atelier</p>
          <h2 data-reveal-words className="mt-5 font-display text-4xl leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
            Made For Your Moments
          </h2>
          <div className="gold-rule mt-7 w-40" />
          <p className="mt-7 max-w-md text-sm font-light leading-loose text-muted-foreground">
            From everyday elegance to unforgettable celebrations, discover jewellery designed to become
            part of your story.
          </p>
          <div className="mt-9">
            <MagneticButton variant="solid" onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}>Explore Jewellery</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 10 & 12. Products ---------------- */
function ProductCard({ p }: { p: Product }) {
  const shop = useShop();
  const wishlisted = shop.wishlist.includes(p.id);

  return (
    <article className="group flex h-full flex-col bg-white" data-cursor="view">
      <div className="shine-sweep relative aspect-[4/5] overflow-hidden bg-mist">
        <img
          src={p.img}
          alt={p.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        />
        <button
          aria-label={`${wishlisted ? "Remove" : "Add"} ${p.name} ${wishlisted ? "from" : "to"} wishlist`}
          aria-pressed={wishlisted}
          onClick={() => shop.toggleWish(p.id)}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors ${wishlisted ? "bg-gold text-white" : "bg-white/80 text-navy hover:bg-gold hover:text-white"}`}
        >
          <FiHeart />
        </button>
        <button type="button" onClick={() => shop.quickView(p)} aria-label={`Quick view ${p.name}`} className="absolute inset-x-0 bottom-0 bg-navy/90 py-3 text-center text-[0.58rem] uppercase tracking-[0.3em] text-white transition-transform duration-500 group-hover:translate-y-0">
          Quick View
        </button>
      </div>
      <div className="flex flex-1 flex-col px-1 pt-5">
        <p className="text-[0.55rem] uppercase tracking-[0.3em] text-royal">{p.tag}</p>
        <h3 className="mt-2 font-display text-lg text-navy">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(p.price)}</p>
        <button onClick={() => shop.add(p.id)} className="mt-4 w-full border border-navy/20 py-3 text-[0.58rem] uppercase tracking-[0.3em] text-navy transition-colors hover:border-gold hover:bg-navy hover:text-white">
          Add to Bag
        </button>
      </div>
    </article>
  );
}

export function NewArrivalsSection() {
  return (
    <section id="products" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <SectionHeading eyebrow="Just landed" title="New Arrivals" subtitle="This week's most-wanted pieces." />
        <div className="mt-14" data-reveal>
          <CoverflowCarousel items={products.slice(0, 4)} render={(p) => <ProductCard p={p} />} />
        </div>
      </div>
    </section>
  );
}

const tabs = ["ALL", "GOLD", "DIAMOND", "BRIDAL", "EVERYDAY"] as const;

export function BestSellerSection() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("ALL");
  const filtered = tab === "ALL" ? products.slice(4) : products.slice(4).filter((p) => p.tag === tab);

  return (
    <section id="best-sellers" className="scroll-mt-20 bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <SectionHeading eyebrow="Loved by many" title="Best Sellers" />
        <div className="mt-10 flex flex-wrap justify-center gap-2" data-reveal>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`px-6 py-3 text-[0.58rem] uppercase tracking-[0.3em] transition-all duration-300 ${
                tab === t ? "bg-navy text-white" : "text-navy hover:text-royal"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
          {filtered.map((p) => (
            <div key={p.name} className="animate-fade-in">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 13. Occasions ---------------- */
const occasions = [
  { name: "Wedding", img: photo("occasion-wedding") },
  { name: "Engagement", img: photo("occasion-engagement") },
  { name: "Anniversary", img: photo("occasion-anniversary") },
  { name: "Birthday", img: photo("occasion-birthday") },
  { name: "Festive", img: photo("occasion-festive") },
  { name: "Everyday", img: photo("occasion-everyday") },
];

export function OccasionSection() {
  const shop = useShop();
  return (
    <section id="gifting" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <SectionHeading eyebrow="Shop by occasion" title="For Every Celebration" />
        <div className="mt-14" data-reveal>
          <CoverflowCarousel
            items={occasions}
            autoplay={false}
            render={(o) => (
              <button type="button" onClick={() => shop.browse(o.name)} className="group relative block w-full text-left aspect-[3/4] overflow-hidden" data-cursor="view">
                <img
                  src={o.img}
                  alt={o.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-royal/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/90 to-transparent p-6">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white">{o.name}</h3>
                </div>
              </button>
            )}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- 14. Story ---------------- */
export function StorySection() {
  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
      <img src={story} alt="Model wearing diamond earrings" loading="lazy" className="absolute inset-0 h-[115%] w-full object-cover" data-parallax />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 data-reveal-words className="max-w-4xl font-display text-4xl leading-tight text-white sm:text-6xl lg:text-7xl">
          Every Jewel Tells A Story
        </h2>
        <div className="gold-rule mt-8 w-48" />
        <p className="mt-8 max-w-md text-sm font-light leading-loose text-white/75" data-reveal>
          Designed to celebrate moments that deserve to shine forever.
        </p>
        <div className="mt-10" data-reveal>
          <MagneticButton variant="glass" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>Discover the Story</MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 15. DC Experience horizontal scroll ---------------- */
const experiences = [
  { name: "Fashion", copy: "Global labels and homegrown couture under one roof." },
  { name: "Jewellery", copy: "The DC flagship atelier and diamond salon." },
  
  { name: "Lifestyle", copy: "Home, tech and design boutiques." },
 
  { name: "Events", copy: "Launches, showcases and seasonal festivals." },
];

export function DCExperience() {
  const shop = useShop();
  return (
    <section id="experience" data-horizontal-wrap className="scroll-mt-20 overflow-hidden bg-navy py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeading light eyebrow="More than jewellery" title="The DC Experience" />
      </div>
      <div className="mt-14 overflow-x-auto pb-4 md:overflow-visible">
        <div data-horizontal-track className="flex gap-6 px-5 lg:px-10" style={{ width: "max-content" }}>
          {experiences.map((e, i) => (
            <article
              key={e.name}
              className="group relative h-[420px] w-[78vw] shrink-0 overflow-hidden border border-white/10 sm:w-[420px]"
              data-cursor="view"
            >
              <img
                src={e.name === "Jewellery" ? mall : photo(`experience-${e.name.toLowerCase()}`)}
                alt={`${e.name} inspiration`}
                loading="lazy"
                className="h-full w-full object-cover opacity-60 transition-all duration-[1.4s] group-hover:scale-110 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[0.55rem] uppercase tracking-[0.4em] text-gold">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-3xl text-white">{e.name}</h3>
                <p className="mt-3 max-w-xs text-xs font-light leading-relaxed text-white/70">{e.copy}</p>
                <button className="mt-5 text-xs uppercase tracking-widest text-champagne underline underline-offset-4" onClick={() => shop.info(e.name, `${e.copy}\n\nPlan your visit with a DC store. Contact the team for current brands, opening times and availability.`)}>Explore {e.name}</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 16. Trust ---------------- */
const promises = [
  { icon: LuGem, title: "Premium Quality", copy: "Hallmarked metals, hand-finished settings." },
  { icon: LuBadgeCheck, title: "Certified Jewellery", copy: "Every diamond independently graded." },
  { icon: LuShieldCheck, title: "Secure Shopping", copy: "Insured delivery, protected payments." },
  { icon: LuHandHeart, title: "Exceptional Service", copy: "Personal styling at every DC store." },
  { icon: LuRefreshCw, title: "Easy Returns", copy: "15-day returns and lifetime exchange." },
  { icon: LuSparkles, title: "Trusted Experience", copy: "Complimentary cleaning, forever." },
];

export function TrustSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1300px] px-5 lg:px-10">
        <SectionHeading eyebrow="Why DC" title="The DC Promise" />
        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              data-reveal-delay={(i % 3) * 0.1}
              className="group bg-white p-9 transition-colors duration-500 hover:bg-mist"
            >
              <p.icon className="h-7 w-7 text-royal transition-transform duration-500 group-hover:scale-110 group-hover:text-gold" />
              <h3 className="mt-6 font-display text-xl text-navy">{p.title}</h3>
              <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 17. Store locator ---------------- */
const stores = [
  { city: "Hyderabad", name: "DC Flagship — Banjara Hills", address: "Road No. 12, Banjara Hills, Hyderabad 500034", hours: "10:30 AM – 9:30 PM", phone: "+91 90000 11122" },
  { city: "Bengaluru", name: "DC Mall — Indiranagar", address: "100 Ft Road, Indiranagar, Bengaluru 560038", hours: "11:00 AM – 10:00 PM", phone: "+91 90000 11133" },
  { city: "Mumbai", name: "DC Jewellery — Bandra West", address: "Linking Road, Bandra West, Mumbai 400050", hours: "11:00 AM – 9:00 PM", phone: "+91 90000 11144" },
];

export function StoreLocator() {
  const [query, setQuery] = useState("");
  const matchingStores = stores.filter((store) =>
    `${store.city} ${store.name} ${store.address}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <section id="contact" className="scroll-mt-20 bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-[1300px] px-5 lg:px-10">
        <SectionHeading eyebrow="Store locator" title="Visit DC" subtitle="Experience the craft in person." />
        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row" data-reveal>
          <input
            type="text"
            aria-label="Search city or area"
            placeholder="Search city or area"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 border border-navy/15 bg-white px-5 py-4 text-sm outline-none transition-colors focus:border-gold"
          />
          <MagneticButton variant="solid" className="shrink-0" onClick={() => document.querySelector("#store-results")?.scrollIntoView({ behavior: "smooth", block: "center" })}>Find your nearest DC</MagneticButton>
        </div>
        <div id="store-results" className="mt-14 grid scroll-mt-28 gap-6 lg:grid-cols-3">
          {matchingStores.map((s, i) => (
            <article key={s.name} data-reveal data-reveal-delay={i * 0.08} className="border border-navy/10 bg-white p-8">
              <p className="text-[0.55rem] uppercase tracking-[0.4em] text-royal">{s.city}</p>
              <h3 className="mt-4 font-display text-xl text-navy">{s.name}</h3>
              <div className="gold-rule my-5 w-20" />
              <ul className="space-y-3 text-xs font-light text-muted-foreground">
                <li className="flex gap-3"><FiMapPin className="mt-0.5 shrink-0 text-gold" />{s.address}</li>
                <li className="flex gap-3"><FiClock className="mt-0.5 shrink-0 text-gold" />{s.hours}</li>
                <li className="flex gap-3"><FiPhone className="mt-0.5 shrink-0 text-gold" /><a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></li>
              </ul>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.3em] text-navy transition-colors hover:text-royal">
                Directions <FiArrowRight />
              </a>
            </article>
          ))}
        </div>
        {matchingStores.length === 0 ? <p className="mt-8 text-center text-sm text-muted-foreground">No DC store matches that search yet.</p> : null}
      </div>
    </section>
  );
}

/* ---------------- 18. Instagram ---------------- */
const gallery = [
  { img: photo("journal-bridal"), title: "The bridal edit", text: "Build your look around one statement piece, then balance it with complementary earrings. Bring a fabric swatch to your styling appointment to explore colours together." },
  { img: photo("journal-tradition"), title: "A touch of tradition", text: "Pair heirloom jewellery with a simple neckline to let the craftsmanship stand out. Store individual pieces separately to protect their surfaces." },
  { img: photo("journal-colour"), title: "Celebrate in colour", text: "Use one accent colour to connect your jewellery with your outfit. Try different combinations in person to see how they catch the light." },
  { img: photo("journal-heritage"), title: "Details to remember", text: "Consider your neckline, hairstyle and comfort when choosing a celebration look. Bring photographs of your outfit to help the store team suggest pairings." },
  { img: photo("journal-silver"), title: "A little brilliance", text: "A delicate pair of earrings can add a finishing touch to an everyday look. Keep pieces away from perfumes and harsh cleaners." },
  { img: photo("journal-minimal"), title: "Less, beautifully", text: "A single bracelet gives a clean silhouette. Try the fit with your wrist relaxed and allow comfortable movement." },
  { img: photo("journal-mixed"), title: "Mix your metals", text: "Repeat a metal tone in two places for a balanced look. Leave a little space between bracelets to reduce rubbing." },
  { img: photo("journal-layering"), title: "The art of layering", text: "Choose necklaces of different lengths so each pendant has room to shine. Untangle and store chains individually after wearing." },
];

export function InstagramGallery() {
  const shop = useShop();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <SectionHeading eyebrow="Style & inspiration" title="The DC Journal" subtitle="Follow the shine." />
        <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-4">
          {gallery.map((g, i) => (
            <button type="button"
              key={i}
              onClick={() => shop.info(g.title, g.text)}
              data-cursor="view"
              data-reveal
              data-reveal-delay={(i % 4) * 0.06}
              className="group relative aspect-square overflow-hidden"
            >
              <img src={g.img} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <FiArrowRight className="text-2xl text-champagne" />
                <span className="text-[0.55rem] uppercase tracking-[0.3em] text-white">{g.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 19. Newsletter ---------------- */
export function Newsletter() {
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

/* ---------------- 20. Footer ---------------- */
const footerCols = [
  { title: "Shop", links: ["Rings", "Earrings", "Necklaces", "Bangles", "Chains"] },
  { title: "Collections", links: ["New Arrivals", "Wedding", "Diamond", "Festive", "Everyday"] },
  { title: "DC Mall", links: ["Fashion",  "Events"] },
  { title: "About DC", links: ["Our Story", "Craftsmanship", "Careers", "Press", "Sustainability"] },
  { title: "Customer Care", links: ["Track Order", "Returns", "Care Guide", "Size Guide", "FAQs"] },
  { title: "Contact", links: ["care@dcjewellery.com", "+91 90000 11122", "Banjara Hills, Hyderabad"] },
];

export function Footer({ logoUrl }: { logoUrl: string }) {
  const shop = useShop();
  return (
    <footer className="bg-navy pb-10 pt-20 text-white">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <img src={logoUrl} alt="DC Shopping Mall & Jewellery" className="h-24 w-24 rounded-full object-cover" loading="lazy" />
            <p className="mt-6 max-w-xs text-xs font-light leading-loose text-white/60">
              Shop. Shine. Belong. A shopping mall and jewellery house built around the moments that matter.
            </p>
            <a href="#contact" className="mt-7 inline-block text-sm text-champagne underline">Connect with DC</a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.58rem] uppercase tracking-[0.3em] text-gold">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <button type="button" onClick={() => {
                        if (col.title === "Shop" || col.title === "Collections") shop.browse(l);
                        else if (col.title === "Contact") document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                        else shop.info(l, col.title === "DC Mall" ? "Explore the DC experience and contact a store for current brands, events and opening times." : l === "Care Guide" ? "Store jewellery separately in a soft pouch. Avoid contact with perfume, chlorine and harsh cleaners. Ask the store about care appropriate for your particular gemstone and setting." : l === "Size Guide" ? "For an accurate fit, visit a store to have your ring or wrist size measured. Bring an existing piece that fits well, and let the team know whether you prefer a close or relaxed fit." : l === "Track Order" ? "Please contact the store where you placed your order with your order reference. Online order tracking is not available here yet." : "Contact the DC team for information about " + l.toLowerCase() + ". The store can answer your questions and provide the current details.");
                      }} className="text-left text-xs font-light text-white/65 transition-colors hover:text-white">{l}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="gold-rule mt-16" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.25em] text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} DC Shopping Mall &amp; Jewellery</p>
          <p>Shop | Shine | Belong</p>
        </div>
      </div>
    </footer>
  );
}

export { Marquee };
