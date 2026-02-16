"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    // preload images
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/laferrari-sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) drawFrame(0);
      };

      images.push(img);
    }

    function drawFrame(index: number) {
      const img = images[index];
      if (!img) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;

      context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    }

    function onScroll() {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollFraction = scrollTop / maxScroll;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollFraction * TOTAL_FRAMES)
      );

      drawFrame(frameIndex);
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={styles.main}>
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* TITLE */}
      <section style={styles.section}>
        <div style={styles.center}>
          <h1 style={styles.ferrari}>Ferrari</h1>
          <h2 style={styles.laferrari}>LaFerrari</h2>
          <p style={styles.tagline}>
            Hybrid Hypercar • 950 Horsepower • 0-100 in 2.6s
          </p>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section style={styles.section}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Specifications</h2>

          <div style={styles.specGrid}>
            <Spec label="Horsepower" value="950 HP" />
            <Spec label="Top Speed" value="350 km/h" />
            <Spec label="0-100 km/h" value="2.6 sec" />
            <Spec label="Engine" value="V12 Hybrid" />
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section style={styles.section}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Price</h2>

          <div style={styles.price}>$1,420,000</div>

          <p style={styles.priceNote}>
            Limited Production • Ultra Exclusive
          </p>
        </div>
      </section>
    </main>
  );
}

function Spec({ label, value }: any) {
  return (
    <div style={styles.specItem}>
      <div style={styles.specValue}>{value}</div>
      <div style={styles.specLabel}>{label}</div>
    </div>
  );
}

const styles: any = {
  main: {
    height: "400vh",
    background: "#000",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
  },

  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },

  section: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },

  center: {
    textAlign: "center",
  },

  ferrari: {
    fontSize: "4rem",
    letterSpacing: "12px",
    fontWeight: 300,
  },

  laferrari: {
    fontSize: "7rem",
    fontWeight: 700,
    background:
      "linear-gradient(90deg, #ff2a2a, #ff6a6a, #ff2a2a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  tagline: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#bbb",
  },

  card: {
    background: "rgba(0,0,0,0.6)",
    padding: "60px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  },

  cardTitle: {
    fontSize: "3rem",
    marginBottom: "30px",
  },

  specGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 200px)",
    gap: "30px",
  },

  specItem: {
    textAlign: "center",
  },

  specValue: {
    fontSize: "2rem",
    color: "#ff3c3c",
  },

  specLabel: {
    color: "#aaa",
  },

  price: {
    fontSize: "4rem",
    color: "#ff3c3c",
  },

  priceNote: {
    marginTop: "10px",
    color: "#aaa",
  },
};
