<script>
  const sectors = [
    {
      name: 'Telecom',
      desc: 'Voice IVR and customer service',
      use: 'Transcribe millions of support calls in real time. Route customers by voice in their native language.'
    },
    {
      name: 'Banking',
      desc: 'Voice transactions and KYC',
      use: 'Verify customer identity by voice. Enable balance checks and transfers without a smartphone.'
    },
    {
      name: 'Media',
      desc: 'Broadcast transcription',
      use: 'Auto-generate subtitles for news and radio. Archive decades of broadcast audio as searchable text.'
    },
    {
      name: 'Government',
      desc: 'Public service voice interfaces',
      use: 'Transcribe parliamentary sessions and court proceedings. Make public records accessible to all citizens.'
    },
    {
      name: 'Healthcare',
      desc: 'Doctor dictation and records',
      use: 'Doctors dictate notes hands-free during consultations. Patient records created instantly, accurately.'
    },
    {
      name: 'Education',
      desc: 'Classroom and lecture capture',
      use: 'Transcribe lectures automatically. Give students searchable notes in their mother tongue.'
    }
  ];
</script>

<div class="business">
  <div class="sectors">
    {#each sectors as sector, i}
      <div class="sector">
        <div class="sector-top">
          <span class="index">0{i + 1}</span>
          <span class="name">{sector.name}</span>
        </div>
        <p class="desc">{sector.desc}</p>
        <p class="use">{sector.use}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .business {
    width: 100%;
  }

  .sectors {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    overflow: hidden;
  }

  .sector {
    background: #060609;
    padding: 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    transition: background 0.2s;
  }

  .sector:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .sector-top {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .index {
    font-size: 0.58rem;
    color: rgba(255, 255, 255, 0.15);
    letter-spacing: 0.08em;
    font-family: 'Inter', monospace;
    flex-shrink: 0;
  }

  .name {
    font-family: 'Inter', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: -0.01em;
  }

  .desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    color: rgb(31, 213, 249);
    opacity: 0.65;
    margin: 0;
    letter-spacing: 0.02em;
  }

  .use {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.3);
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 640px) {
    .sectors {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 400px) {
    .sectors {
      grid-template-columns: 1fr;
    }
  }
</style>