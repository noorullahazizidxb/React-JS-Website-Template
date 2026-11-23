import "./devminds-products.css";

import type { CSSProperties } from "react";
import { m } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { DEVMINDS_PRODUCTS, LOGO_HEIGHT, desktopSpan, hasWideLogo, productLogoSrc, type DevmindsProduct, type LogoVariant, type ProductSlug } from "@/lib/devminds-products";

interface DevmindsProductsProps {
  /** The product this app is; highlighted as "You are here". */
  current: ProductSlug;
}

function Logo({ product, variant, className }: { product: DevmindsProduct; variant: LogoVariant; className: string }) {
  const decorative = variant.startsWith("icon");
  return (
    <img
      className={`dmp-img ${className}`}
      src={productLogoSrc(product.slug, variant)}
      alt={decorative ? "" : product.name}
      width={product.logoWidths[variant]}
      height={LOGO_HEIGHT}
      loading="lazy"
      decoding="async"
    />
  );
}

function CardBody({ product, isCurrent }: { product: DevmindsProduct; isCurrent: boolean }) {
  return (
    <>
      <span className="dmp-logo">
        <Logo product={product} variant="light" className="dmp-light" />
        <Logo product={product} variant="dark" className="dmp-dark" />
      </span>
      <span className="dmp-compact">
        <Logo product={product} variant="icon-light" className="dmp-light" />
        <Logo product={product} variant="icon-dark" className="dmp-dark" />
        <span className="dmp-name">{product.name}</span>
      </span>
      <span className="dmp-desc">{product.descriptor}</span>
      {isCurrent && <span className="dmp-badge">You are here</span>}
    </>
  );
}

type SpanStyle = CSSProperties & { "--dmp-span": number };

const spanStyle = (product: DevmindsProduct): SpanStyle => ({ "--dmp-span": desktopSpan(product) });

const gridStagger = stagger(0.05);

/** "More from DevMinds" footer section listing every DevMinds product (two rows on desktop). */
export function DevmindsProducts({ current }: DevmindsProductsProps) {
  return (
    <nav className="dmp" aria-labelledby="dmp-title">
      <h2 id="dmp-title" className="dmp-title">More from DevMinds</h2>
      <m.ul className="dmp-grid" variants={gridStagger} initial="hidden" whileInView="show" viewport={viewportOnce}>
        {DEVMINDS_PRODUCTS.map((product) => {
          const isCurrent = product.slug === current;
          const label = `${product.name}: ${product.descriptor}`;
          return (
            <m.li key={product.slug} className={hasWideLogo(product) ? "dmp-item dmp-item--wide" : "dmp-item"} style={spanStyle(product)} variants={fadeUp}>
              {isCurrent ? (
                <div className="dmp-card" aria-current="page">
                  <CardBody product={product} isCurrent />
                </div>
              ) : (
                <a className="dmp-card" href={product.url} target="_blank" rel="noopener" aria-label={`${label} (opens in new tab)`}>
                  <CardBody product={product} isCurrent={false} />
                </a>
              )}
            </m.li>
          );
        })}
      </m.ul>
    </nav>
  );
}
