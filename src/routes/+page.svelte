<script>
  import MicHero from '$lib/components/MicHero.svelte';
  import Recent from '$lib/components/Recent.svelte';
  import Business from '$lib/components/Business.svelte';
  import { micState, transcript, recentList } from '$lib/stores/transcription.js';
  import { getRecent } from '$lib/api/semma.js';

  $: if ($micState === 'idle' && $transcript.text) {
    getRecent().then(items => recentList.set(items || []));
  }


</script>

<svelte:head>
  <title>Private Speech Recognition</title>
  <meta name="description" content="Low-resource language speech recognition — private, fast, sovereign." />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<div class="root">

  <!-- ░░ BACKGROUND GLOWS ░░ -->
  <div class="bg-glow bg-glow-1"></div>
  <div class="bg-glow bg-glow-2"></div>
  <div class="bg-grid"></div>

  <!-- ══ HERO ══ -->
  <section class="hero">
    <div class="hero-inner">

      <div class="mic-wrap">
        <MicHero />
      </div>

      <div class="hero-text">
        <h1 class="hero-headline">
          A privately trained<br/>
          <span class="hero-gradient">speech model.</span>
        </h1>
        <p class="hero-sub">
          Runs inside your own infrastructure, built for large-scale detection,
          deployed on your terms — with zero data leaving your environment.
          No third-party APIs, No OpenAI. No Gemini. No Anthropic.
        </p>
      </div>

      <a href="https://t.me/a8c2e7" target="_blank" rel="noopener" class="btn-cta">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
        Contact Sales
      </a>

    </div>
  </section>

  <!-- ══ RECENT ══ -->
  <!-- <section class="band">
    <div class="band-inner">
      <p class="section-eyebrow">Live stream</p>
      <Recent />
    </div>
  </section> -->

  <!-- ══ INDUSTRIES ══ -->
  <section class="band">
    <div class="band-inner">
      <p class="section-eyebrow">Industries</p>
      <h2 class="section-title">Built for every sector.</h2>
      <Business />
    </div>
  </section>

</div>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; }

  :global(body) {
    margin: 0;
    padding: 0;
    background: #0c0a0e;
    color: #e2e2e2;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── ROOT ── */
  .root {
    position: relative;
    min-height: 100vh;
  }

  /* ── BACKGROUND ── */
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
    background: radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
  }
  .bg-glow-2 {
    width: 500px; height: 400px;
    top: 100px; right: -100px;
    background: radial-gradient(ellipse, rgba(31, 213, 249, 0.05) 0%, transparent 70%);
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

  /* ── HERO ── */
  .hero {
    position: relative;
    z-index: 10;
    padding: 2rem 2rem 4rem;
  }
  .hero-inner {
    max-width: 780px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }



  .mic-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  .hero-headline {
    font-size: clamp(2.2rem, 5.5vw, 3.8rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: #fff;
    margin: 0;
  }

  .hero-gradient {
    background: linear-gradient(90deg, #1fd5f9 0%, #a78bfa 60%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 400;
    line-height: 1.7;
    color: rgba(255,255,255,0.45);
    margin: 0;
    max-width: 540px;
  }

  .btn-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    background: rgba(99, 179, 237, 0.15);
    border: 1px solid rgba(99, 179, 237, 0.3);
    padding: 0.65rem 1.5rem;
    border-radius: 8px;
    transition: background 0.15s, border-color 0.15s;
  }
  .btn-cta:hover {
    background: rgba(99, 179, 237, 0.25);
    border-color: rgba(99, 179, 237, 0.5);
  }

  /* ── BANDS ── */
  .band {
    position: relative;
    z-index: 10;
    padding: 4rem 2rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .band-inner {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .section-eyebrow {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin: 0;
  }

  .section-title {
    font-size: clamp(1.6rem, 4vw, 2.25rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: #fff;
    margin: 0;
  }


  /* ── FOOTER ── */
  .footer {
    position: relative;
    z-index: 10;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 2rem;
  }
  .footer-inner {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer-logo {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.3);
  }
  .footer-copy {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.2);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .hero { padding: 4rem 1.25rem 3rem; }
    .band { padding: 3rem 1.25rem; }
    .feature-grid { grid-template-columns: 1fr; }
    .footer-inner { flex-direction: column; gap: 0.5rem; text-align: center; }
  }

</style>