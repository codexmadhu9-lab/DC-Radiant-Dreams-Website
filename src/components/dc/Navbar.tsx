import { useEffect, useState } from "react";
import { FiSearch, FiHeart, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { Marquee } from "./Marquee";
import { useShop } from "./ShopProvider";

const megaMenus: Record<string, { links: string[]; caption: string }> = {
  JEWELLERY: {
    links: ["Rings", "Earrings", "Necklaces", "Pendants", "Bracelets", "Bangles", "Chains", "Mangalsutra"],
    caption: "The Signature Edit",
  },
  COLLECTIONS: {
    links: ["New Arrivals", "Best Sellers", "Wedding", "Diamond", "Gold", "Festive", "Everyday", "Premium"],
    caption: "Curated by DC",
  },
  GIFTING: {
    links: ["Birthday", "Wedding", "Anniversary", "Engagement", "Festive", "Special Moments"],
    caption: "Gifts that stay",
  },
};

const navItems = [
  { label: "HOME", href: "#top" },
  { label: "JEWELLERY", href: "#jewellery" },
  { label: "COLLECTIONS", href: "#collections" },
  { label: "MALL", href: "#experience" },
  { label: "GIFTING", href: "#gifting" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const shop = useShop();
  const bagCount = Object.values(shop.bag).reduce((sum, n) => sum + n, 0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onMouseLeave={() => setOpen(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/40 bg-white/85 shadow-[0_10px_40px_-24px_oklch(0.22_0.075_260/0.6)] backdrop-blur-xl"
          : "border-b border-white/10 bg-transparent"
      }`}
    >
      <Marquee items={["Welcome to DC Shopping Mall & Jewellery", "Discover the New Collection", "Shop · Shine · Belong", "Plan Your Visit"]} duration={32} className="bg-navy py-2.5 text-white border-b border-gold/30" itemClassName="text-[0.6rem] uppercase tracking-[0.22em]" />
      <nav className="mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 lg:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3" data-cursor="home">
          <img
            src="/logo.jpg"
            alt="DC Shopping Mall & Jewellery"
            className="h-12 w-12 shrink-0 rounded-full object-cover mix-blend-multiply transition-all duration-500 lg:h-16 lg:w-16"
          />
        </a>

        <ul className="hidden items-center justify-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.label} onMouseEnter={() => setOpen(megaMenus[item.label] ? item.label : null)} onFocus={() => setOpen(megaMenus[item.label] ? item.label : null)}>
              <a
                href={item.href}
                className={`relative py-6 text-[0.66rem] font-medium uppercase tracking-[0.24em] transition-colors ${
                  scrolled ? "text-navy hover:text-royal" : "text-white/90 hover:text-champagne"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0 mx-auto block h-px w-0 bg-gold transition-all duration-300 ${
                    open === item.label ? "w-full" : ""
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-4">
          <div
            className={`hidden items-center gap-5 text-lg md:flex ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            <button aria-label="Search products" onClick={() => shop.browse()} className="transition-colors hover:text-gold">
              <FiSearch />
            </button>
            <button aria-label="Wishlist" onClick={() => shop.show("wishlist")} className="transition-colors hover:text-gold">
              <FiHeart />
            </button>
            <button aria-label="Contact a store" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-gold">
              <FiUser />
            </button>
            <button aria-label={`Shopping bag, ${bagCount} items`} onClick={() => shop.show("bag")} className="relative transition-colors hover:text-gold">
              <FiShoppingBag />
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[0.55rem] text-navy">
                {bagCount}
              </span>
            </button>
          </div>
          <button
            aria-label="Menu"
            onClick={() => setMobile(true)}
            className={`text-2xl lg:hidden ${scrolled ? "text-navy" : "text-white"}`}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mega menu */}
      <div
        className={`hidden overflow-hidden border-t border-gold/30 bg-white/95 backdrop-blur-xl transition-all duration-500 lg:block ${
          open && megaMenus[open] ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        {open && megaMenus[open] ? (
          <div className="mx-auto grid max-w-[1400px] grid-cols-[1.4fr_1fr] gap-12 px-10 py-10">
            <div>
              <p className="mb-6 text-[0.6rem] uppercase tracking-[0.4em] text-royal">{open}</p>
              <ul className="grid grid-cols-3 gap-x-10 gap-y-4">
                {megaMenus[open].links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => { setOpen(null); shop.browse(l); }}
                      className="font-display text-xl text-navy transition-colors hover:text-royal"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center border-l border-gold/30 px-10 py-6">
              <p className="font-display text-3xl text-navy">
                {megaMenus[open].caption}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Find your signature piece. Explore the edit and save your favourites for your next visit.</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile drawer */}
      <div
        inert={!mobile}
        onKeyDown={(event) => { if (event.key === "Escape") setMobile(false); }}
        className={`fixed inset-0 z-50 bg-navy transition-transform duration-500 lg:hidden ${
          mobile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <img src="/logo.jpg" alt="DC" className="h-12 w-12 rounded-full object-cover" />
          <button aria-label="Close" onClick={() => setMobile(false)} className="text-2xl text-white">
            <FiX />
          </button>
        </div>
        <ul className="mt-6 flex flex-col gap-2 px-6">
          {navItems.map((item) => (
            <li key={item.label} className="border-b border-white/10">
              <a
                href={item.href}
                onClick={() => setMobile(false)}
                className="block py-4 font-display text-3xl text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center gap-8 text-2xl text-white">
          <button aria-label="Search products" onClick={() => { setMobile(false); shop.browse(); }}><FiSearch /></button>
          <button aria-label="Wishlist" onClick={() => { setMobile(false); shop.show("wishlist"); }}><FiHeart /></button>
          <button aria-label="Contact a store" onClick={() => { setMobile(false); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}><FiUser /></button>
          <button aria-label={`Shopping bag, ${bagCount} items`} onClick={() => { setMobile(false); shop.show("bag"); }}><FiShoppingBag /></button>
        </div>
      </div>
    </header>
  );
}
