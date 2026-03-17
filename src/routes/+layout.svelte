<script>
  import './layout.css';
</script>

<div class="app">

  <!-- background glows -->
  <div class="bg-glow bg-glow-1" aria-hidden="true"></div>
  <div class="bg-glow bg-glow-2" aria-hidden="true"></div>
  <div class="bg-grid" aria-hidden="true"></div>

  <header>
    <div class="header-inner">
      <div class="brand">
        <svg class="brand-icon" viewBox="0 0 24 24" fill="none">
          <rect x="2"  y="9"  width="2" height="6"  rx="1" fill="rgb(31,213,249)"/>
          <rect x="6"  y="5"  width="2" height="14" rx="1" fill="rgb(31,213,249)"/>
          <rect x="10" y="2"  width="2" height="20" rx="1" fill="rgb(31,213,249)"/>
          <rect x="14" y="5"  width="2" height="14" rx="1" fill="rgb(31,213,249)"/>
          <rect x="18" y="9"  width="2" height="6"  rx="1" fill="rgb(31,213,249)"/>
        </svg>
        <span class="brand-name">semma</span>
        <span class="brand-sep">·</span>
        <span class="brand-sub">ስማ — "listen"</span>
      </div>
      <p class="brand-tagline">we help you deploy voice technology in your infrastructure</p>
    </div>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <div class="footer-inner">
      <span class="footer-text">orchestrated by <strong>Awet Tsegazeab</strong></span>
      <div class="footer-zoo">
        <span class="animal-bubble" style="z-index:3">🦒</span>
        <span class="animal-bubble" style="z-index:2; margin-left:-10px">🐘</span>
        <span class="animal-bubble" style="z-index:1; margin-left:-10px">🦓</span>
      </div>
      <span class="footer-caption">giraffe, elephant & zebra send their regards</span>
    </div>
  </footer>

</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #0c0a0e;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .bg-glow {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(120px);
    z-index: 0;
  }
  .bg-glow-1 {
    width: 600px; height: 500px;
    top: -150px; left: -100px;
    background: radial-gradient(ellipse, rgba(0, 180, 160, 0.08) 0%, transparent 70%);
  }
  .bg-glow-2 {
    width: 500px; height: 400px;
    top: 100px; right: -100px;
    background: radial-gradient(ellipse, rgba(0, 150, 180, 0.06) 0%, transparent 70%);
  }
  .bg-grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%);
  }

  .brand-tagline {
    margin: 0.35rem 0 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
  }

  .tagline-pronunciation {
    color: rgba(255,255,255,0.8);
    font-style: italic;
  }

  .tagline-phonetic {
    color: rgb(31, 213, 249);
    font-weight: 500;
    letter-spacing: 0.06em;
  }

  .tagline-dash {
    color: rgba(255,255,255,0.1);
  }

  .tagline-meaning {
    color: rgba(255,255,255,0.45);
    font-style: italic;
  }

  header {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 2.5rem 1rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .header-inner {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .brand-icon {
    width: 32px;
    height: 32px;
  }

  .brand-name {
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .brand-sep {
    color: rgba(255,255,255,0.1);
    font-size: 1.6rem;
  }

  .brand-sub {
    font-size: 1.4rem;
    color: rgba(255,255,255,0.8);
    font-weight: 400;
  }

  /* .brand-sub {
    font-size: 0.85rem;
    color: #4b5563;
    font-weight: 400;
  } */

  main {
    position: relative;
    z-index: 10;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  footer {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 1.25rem 1rem;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.55);
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  footer strong {
    color: rgba(255,255,255,0.9);
  }

  .footer-text {
    margin: 0;
  }

  .footer-zoo {
    display: flex;
    align-items: center;
  }

  .animal-bubble {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    cursor: default;
    line-height: 1;
    position: relative;
  }

  .animal-bubble:hover {
    background: rgba(31, 213, 249, 0.08);
    border-color: rgba(31, 213, 249, 0.25);
    transform: translateY(-3px);
    z-index: 10 !important;
  }

  .footer-caption {
    margin: 0;
    font-style: italic;
    color: rgba(255,255,255,0.85);
    font-size: 0.75rem;
  }
</style>