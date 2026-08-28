import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";

import { fetchProduct, resolveMediaUrl, type ProductBenefit } from "@/api/products";
import { SiteFooter } from "@/components/SiteChrome";

const BAR_TONES = ["solid", "deep", "outline"] as const;

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ params }) => {
    try {
      const product = await fetchProduct(params.productId);
      if (!product?._id) throw notFound();
      return { product };
    } catch (err) {
      if (err && typeof err === "object" && "status" in err) {
        const status = (err as { status?: number }).status;
        if (status === 404 || status === 400) throw notFound();
      }
      throw err;
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.product) {
      return {
        meta: [
          { title: "Product not found | YESEN Technologies Pvt Ltd" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} | YESEN Technologies Pvt Ltd`;
    const description =
      product.description1 ||
      product.description2 ||
      `${product.name} — ${product.label}`;
    const image = resolveMediaUrl(product.image?.url) ?? undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: ProductDetailPage,
});

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
}) {
  const offset =
    from === "left" ? { x: -60, y: 0 } : from === "right" ? { x: 60, y: 0 } : { x: 0, y: 34 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Map CMS benefit → E-MARINE bar: left = longer line, right = short green-bar tag. */
function benefitBarCopy(b: ProductBenefit) {
  const heading = b.heading?.trim() || "";
  const title = b.title?.trim() || "";
  if (heading && title) {
    return { left: title, right: heading };
  }
  return { left: title || heading || "Benefit", right: "" };
}

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const imageUrl = resolveMediaUrl(product.image?.url);
  const features = product.features ?? [];
  const benefits = product.benefits ?? [];
  const keyCount = features.length;

  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />

      <main className="relative z-10">
        {/* ------------------------------------------------------------ HERO */}
        <section className="relative isolate overflow-hidden">
          <h1 className="sr-only">
            {product.name} — {product.label} by YESEN Technologies Pvt Ltd
          </h1>
          <div className="relative min-h-[52vh] w-full lg:min-h-[68vh]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${product.name} — ${product.label}`}
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-brand-navy/90" />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, color-mix(in oklab, var(--brand-navy) 78%, transparent) 0%, color-mix(in oklab, var(--brand-navy) 40%, transparent) 48%, transparent 78%)",
              }}
              aria-hidden="true"
            />
            <div className="relative mx-auto flex min-h-[52vh] w-full max-w-[100rem] items-end px-6 pb-14 pt-32 sm:px-12 lg:min-h-[68vh] lg:pb-20">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-white"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-white/70">
                  {product.label}
                </p>
                <p className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]">
                  {product.name}
                </p>
                {product.description1 ? (
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                    {product.description1}
                  </p>
                ) : null}
              </motion.div>
            </div>
          </div>

          <Link to="/products" className="em-back" aria-label="Back to products">
            <ArrowLeft size={16} strokeWidth={1.8} />
            <span>Back</span>
          </Link>
        </section>

        {/* -------------------------------------------------------- BENEFITS */}
        <section id="benefits" className="relative scroll-mt-28 px-6 py-12 sm:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal className="text-center">
              <p className="about-eyebrow">Comprehensive Overview</p>
              <h2 className="display-xl mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
                {product.name} <span className="text-brand-forest">Benefits</span>
              </h2>
              {product.description2 ? (
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brand-navy/65">
                  {product.description2}
                </p>
              ) : null}
            </Reveal>

            {benefits.length > 0 ? (
              <div className="mt-10 space-y-4">
                {benefits.map((b, i) => {
                  const { left, right } = benefitBarCopy(b);
                  const tone = BAR_TONES[i % BAR_TONES.length];
                  return (
                    <Reveal key={`${left}-${right}-${i}`} delay={i * 0.08}>
                      <div className={`em-benefit-bar em-benefit-${tone}`}>
                        <p className="em-benefit-title">{left}</p>
                        {right ? <p className="em-benefit-tag">{right}</p> : null}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            ) : null}

            {keyCount > 0 ? (
              <div className="mt-10 grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:items-center">
                <Reveal from="left">
                  <div className="em-keycount">
                    <span className="em-keycount-mark" aria-hidden="true">
                      <Zap size={44} strokeWidth={1.4} />
                    </span>
                    <p className="em-keycount-text">
                      {keyCount} Key
                      <br />
                      Benefits
                    </p>
                  </div>
                </Reveal>

                <Reveal from="right">
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((k) => (
                      <li key={k} className="em-keyitem">
                        <span className="em-keydot" aria-hidden="true" />
                        {k}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ) : null}

            {benefits.length === 0 && keyCount === 0 ? (
              <Reveal>
                <p className="mt-10 text-center text-sm text-brand-navy/60">
                  Detailed benefits for this product will appear here once published in the CMS.
                </p>
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* ------------------------------------------------------------- CTA */}
        <section className="relative px-6 pb-20 pt-4 sm:px-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card about-cta relative isolate overflow-hidden text-center">
              <p className="about-eyebrow">Next step</p>
              <h2 className="display-xl mt-4 text-[clamp(1.8rem,3vw,2.6rem)]">
                Interested in <span className="about-highlight">{product.name}</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-brand-navy/65">
                Talk to our team about fitment, retrofit options and delivery for your vessel or fleet.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/enquire"
                  search={{ product: product._id, type: "product" }}
                  className="about-btn about-btn-primary"
                >
                  Enquire now <ArrowRight size={16} />
                </Link>
                <Link to="/products" hash="catalogue" className="about-btn about-btn-ghost">
                  All products
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
