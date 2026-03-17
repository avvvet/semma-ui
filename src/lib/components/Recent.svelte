<script>
  import { onMount } from 'svelte';
  import { recentList } from '$lib/stores/transcription.js';
  import { getRecent } from '$lib/api/semma.js';

  onMount(async () => {
    try {
      const items = await getRecent();
      recentList.set(items || []);
    } catch (e) {
      console.error('recent fetch failed', e);
    }
  });

  function truncate(text, max = 90) {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '...' : text;
  }

  function timeAgo(dateStr) {
    if (!dateStr) return '';
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }
</script>

{#if $recentList && $recentList.length > 0}
  <div class="scroll-outer">
    <div class="scroll-track">
      {#each [...$recentList, ...$recentList] as item, i}
        <div class="entry">
          <span class="index">0{(i % $recentList.length) + 1}</span>
          <span class="text">{truncate(item.text)}</span>
          <span class="meta">
            {#if item.duration}{item.duration}s{/if}
            {#if item.created_at}&nbsp;·&nbsp;{timeAgo(item.created_at)}{/if}
          </span>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .scroll-outer {
    width: 100%;
    overflow: hidden;
    max-height: 90px;
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0,0,0,0.6) 12%,
      black 30%,
      black 70%,
      rgba(0,0,0,0.6) 88%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0,0,0,0.6) 12%,
      black 30%,
      black 70%,
      rgba(0,0,0,0.6) 88%,
      transparent 100%
    );
  }

  .scroll-track {
    display: flex;
    flex-direction: column;
    animation: scrollUp 20s linear infinite;
  }

  .scroll-track:hover {
    animation-play-state: paused;
  }

  @keyframes scrollUp {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  .entry {
    display: grid;
    grid-template-columns: 2rem 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 0.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .index {
    font-family: 'Inter', monospace;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.12);
    letter-spacing: 0.08em;
    flex-shrink: 0;
  }

  .text {
    font-family: 'Noto Sans Ethiopic', 'Inter', sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.45);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    font-family: 'Inter', monospace;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.15);
    white-space: nowrap;
    flex-shrink: 0;
    letter-spacing: 0.04em;
  }
</style>