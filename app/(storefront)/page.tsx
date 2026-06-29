/* Landing page — hero, trust strip, catalogue listing, green band,
   "bien choisir" steps, and the contact section. The catalogue is fetched from
   Supabase, so this renders dynamically. */

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Listing from "@/components/sections/Listing";
import GreenBand from "@/components/sections/GreenBand";
import ErgoSteps from "@/components/sections/ErgoSteps";
import ContactSection from "@/components/sections/ContactSection";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      <TrustBar />
      <Listing products={products} />
      <GreenBand />
      <ErgoSteps />
      <ContactSection />
    </>
  );
}
