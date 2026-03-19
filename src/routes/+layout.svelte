<script>
  import './layout.css';
</script>

<div class="app">

  <!-- background glows -->
  <div class="bg-glow bg-glow-1" aria-hidden="true"></div>
  <div class="bg-glow bg-glow-2" aria-hidden="true"></div>
  <div class="bg-grid" aria-hidden="true"></div>

  <header>
    <div class="banner">
      <p class="banner-text">
        Become an early client —
        <strong>bring your use case</strong> and we deploy
        the full voice AI stack for your business.
        <a href="https://t.me/a8c2e7" target="_blank" rel="noopener" class="banner-link">Get in touch →</a>
      </p>
      <p class="banner-sub">This is Demo instance · Production server is 13× faster</p>
    </div>
  </header>

  <main>
    <slot />
  </main>

  <!-- <footer>
    <div class="footer-inner">
      <span class="footer-text">orchestrated by <strong>Awet Tsegazeab</strong></span>
      <div class="footer-zoo">
        <span class="animal-bubble" style="z-index:3">🦒</span>
        <span class="animal-bubble" style="z-index:2; margin-left:-10px">🐘</span>
        <span class="animal-bubble" style="z-index:1; margin-left:-10px">🦓</span>
      </div>
      <span class="footer-caption">giraffe, elephant & zebra send their regards</span>
    </div>
  </footer> -->

  <footer>
    <div class="footer-inner">
      <span class="footer-text">we are <strong>Yisak · Nafiad · Nardos · Awet</strong> - model in active development. </span>
      <div class="footer-zoo">
        <span class="animal-bubble" style="z-index:3">🦒</span>
        <span class="animal-bubble" style="z-index:2; margin-left:-10px">🐘</span>
        <span class="animal-bubble" style="z-index:1; margin-left:-10px">🦓</span>
      </div>
      <span class="footer-caption"></span>
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

  header {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .banner {
    background: #f59e0b;
    padding: 0.75rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .banner-text {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: #fff;
    line-height: 1.5;
  }

  .banner-text strong {
    font-weight: 700;
  }

  .banner-link {
    color: #000000;
    font-weight: 700;
    text-decoration: underline;
    margin-left: 0.5rem;
  }

  .banner-sub {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    color: #78350f;
  }

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