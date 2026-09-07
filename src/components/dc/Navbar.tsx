import { useEffect, useState } from "react";
import { FiSearch, FiHeart, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import logo from "@/assets/dc-logo.png.asset.json";
import necklaces from "@/assets/cat-necklaces.jpg";
import rings from "@/assets/cat-rings.jpg";
import wedding from "@/assets/col-wedding.jpg";

const megaMenus: Record<string, { links: string[]; image: string; caption: string }> = {
  JEWELLERY: {
    links: ["Rings", "Earrings", "Necklaces", "Pendants", "Bracelets", "Bangles", "Chains", "Mangalsutra"],
    image: rings,
    caption: "The Signature Edit",
  },
  COLLECTIONS: {
    links: ["New Arrivals", "Best Sellers", "Wedding", "Diamond", "Gold", "Festive", "Everyday", "Premium"],
    image: necklaces,
    caption: "Curated by DC",
  },
  GIFTING: {
    links: ["Birthday", "Wedding", "Anniversary", "Engagement", "Festive", "Special Moments"],
    image: wedding,
    caption: "Gifts that stay",
  },
};

const navItems = ["HOME", "JEWELLERY", "COLLECTIONS", "MALL", "GIFTING", "ABOUT", "CONTACT"];

export function Navbar() {
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
      <nav className="mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 lg:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3" data-cursor="home">
          <img
            src={logo.url}
            alt="DC Shopping Mall & Jewellery"
            className={`h-12 w-auto shrink-0 object-contain transition-all duration-500 lg:h-16 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        <ul className="hidden items-center justify-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item} onMouseEnter={() => setOpen(megaMenus[item] ? item : null)}>
              <a
                href="#top"
                className={`relative py-6 text-[0.66rem] font-medium uppercase tracking-[0.24em] transition-colors ${
                  scrolled ? "text-navy hover:text-royal" : "text-white/90 hover:text-champagne"
                }`}
              >
                {item}
                <span
                  className={`absolute inset-x-0 -bottom-0 mx-auto block h-px w-0 bg-gold transition-all duration-300 ${
                    open === item ? "w-full" : ""
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
            <button aria-label="Search" className="transition-colors hover:text-gold">
              <FiSearch />
            </button>
            <button aria-label="Wishlist" className="transition-colors hover:text-gold">
              <FiHeart />
            </button>
            <button aria-label="Account" className="transition-colors hover:text-gold">
              <FiUser />
            </button>
            <button aria-label="Cart" className="relative transition-colors hover:text-gold">
              <FiShoppingBag />
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[0.55rem] text-navy">
                2
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
                    <a
                      href="#top"
                      className="font-display text-xl text-navy transition-colors hover:text-royal"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden" data-cursor="view">
              <img
                src={megaMenus[open].image}
                alt={megaMenus[open].caption}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/70 to-transparent" />
              <p className="absolute bottom-4 left-5 font-display text-lg text-white">
                {megaMenus[open].caption}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 bg-navy transition-transform duration-500 lg:hidden ${
          mobile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <img src={logo.url} alt="DC" className="h-12 w-auto brightness-0 invert" />
          <button aria-label="Close" onClick={() => setMobile(false)} className="text-2xl text-white">
            <FiX />
          </button>
        </div>
        <ul className="mt-6 flex flex-col gap-2 px-6">
          {navItems.map((item) => (
            <li key={item} className="border-b border-white/10">
              <a
                href="#top"
                onClick={() => setMobile(false)}
                className="block py-4 font-display text-3xl text-white"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center gap-8 text-2xl text-white">
          <FiSearch />
          <FiHeart />
          <FiUser />
          <FiShoppingBag />
        </div>
      </div>
    </header>
  );
}
