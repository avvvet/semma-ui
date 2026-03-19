<script>
  import { micState, transcript, error } from '$lib/stores/transcription.js';
  import { transcribeAudio } from '$lib/api/semma.js';

  let mediaRecorder = null;
  let audioChunks = [];
  let timerInterval = null;
  let seconds = 0;
  let MAX_SECONDS = 30;

  let displayText = '';
  let typewriterTimeout = null;
  let disappearTimeout = null;

  function typewrite(text) {
    displayText = '';
    let i = 0;
    clearTimeout(typewriterTimeout);
    clearTimeout(disappearTimeout);

    function next() {
      if (i < text.length) {
        displayText += text[i];
        i++;
        typewriterTimeout = setTimeout(next, 40);
      } else {
        disappearTimeout = setTimeout(() => {
          displayText = '';
        }, 8000);
      }
    }
    next();
  }

  $: if ($transcript.text) {
    typewrite($transcript.text);
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  // async function startRecording() {
  //   error.set('');
  //   displayText = '';
  //   micState.set('permission');

  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     micState.set('recording');

  //     const mimeTypes = [
  //       'audio/webm;codecs=opus',
  //       'audio/mp4',
  //       'audio/ogg;codecs=opus',
  //       'audio/webm'
  //     ];
  //     const mimeType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';

  //     mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
  //     audioChunks = [];

  //     // mediaRecorder.ondataavailable = (e) => {
  //     //   if (e.data.size > 0) audioChunks.push(e.data);
  //     // };

  //     mediaRecorder.onstop = async () => {
  //       stream.getTracks().forEach(t => t.stop());
  //       clearInterval(timerInterval);
  //       seconds = 0;
  //       micState.set('processing');

  //       try {
  //         const blob = new Blob(audioChunks, { type: mimeType || 'audio/webm' });
  //         const result = await transcribeAudio(blob);
  //         transcript.set(result);
  //         micState.set('idle');
  //       } catch (e) {
  //         error.set(e.message);
  //         micState.set('idle');
  //       }
  //     };

  //     // mediaRecorder.start();

  //     // timerInterval = setInterval(() => {
  //     //   seconds += 1;
  //     //   if (seconds >= MAX_SECONDS) stopRecording();
  //     // }, 1000);

  //     mediaRecorder.start(1000); // collect data every 1 second

  //     // start timer only when first data arrives
  //     let timerStarted = false;
  //     mediaRecorder.ondataavailable = (e) => {
  //       if (e.data.size > 0) {
  //         audioChunks.push(e.data);
  //         if (!timerStarted) {
  //           timerStarted = true;
  //           timerInterval = setInterval(() => {
  //             seconds += 1;
  //             if (seconds >= MAX_SECONDS) stopRecording();
  //           }, 1000);
  //         }
  //       }
  //     };

  //   } catch (e) {
  //     error.set('Microphone access denied');
  //     micState.set('idle');
  //   }
  // }

  async function startRecording() {
    error.set('');
    displayText = '';
    micState.set('recording'); // change icon instantly

    // let UI render first, then request permission
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeTypes = [
        'audio/mp4',
        'audio/webm;codecs=opus',
        'audio/ogg;codecs=opus',
        'audio/webm'
      ];
      const mimeType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';

      mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      audioChunks = [];
      let timerStarted = false;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
          if (!timerStarted) {
            timerStarted = true;
            timerInterval = setInterval(() => {
              seconds += 1;
              if (seconds >= MAX_SECONDS) stopRecording();
            }, 1000);
          }
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        clearInterval(timerInterval);
        seconds = 0;
        micState.set('processing');

        try {
          const blob = new Blob(audioChunks, { type: mimeType || 'audio/mp4' });
          const result = await transcribeAudio(blob);
          transcript.set(result);
          micState.set('idle');
        } catch (e) {
          error.set(e.message);
          micState.set('idle');
        }
      };

      mediaRecorder.start(1000);

    } catch (e) {
      error.set('Microphone access denied');
      micState.set('idle');
    }
  }

  function stopRecording() {
    micState.set('processing'); // change icon instantly
    seconds = 0;
    clearInterval(timerInterval);
    
    // let UI render first, then stop recorder
    setTimeout(() => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    }, 50);
  }
</script>

<div class="hero">

  <div class="mic-area">

    {#if $micState === 'idle'}
      <button class="mic-btn idle" on:click={startRecording}>
        <div class="ring ring1"></div>
        <div class="ring ring2"></div>
        <div class="ring ring3"></div>
        <svg class="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      </button>
      <p class="hint">Click to speak</p>

    {:else if $micState === 'permission'}
      <div class="mic-btn permission">
        <svg class="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      </div>
      <p class="hint">Allow microphone access...</p>

    {:else if $micState === 'recording'}
      <button class="mic-btn recording" on:click={stopRecording}>
        <svg class="mic-icon stop-icon" viewBox="0 0 24 24" fill="currentColor">
          <rect x="7" y="7" width="10" height="10" rx="2"/>
        </svg>
      </button>

      <div class="waves">
        {#each Array(12) as _, i}
          <div class="bar" style="animation-delay: {i * 0.08}s"></div>
        {/each}
      </div>

      <p class="timer">{formatTime(seconds)}</p>
      <p class="hint">Listening — tap to stop</p>

      <div class="progress-track">
        <div
          class="progress-fill"
          class:warning={seconds > 24}
          style="width: {(seconds / MAX_SECONDS) * 100}%"
        ></div>
      </div>

    {:else if $micState === 'processing'}
      <div class="mic-btn processing">
        <div class="spinner"></div>
      </div>
      <p class="hint">Transcribing...</p>
    {/if}

  </div>

  {#if displayText}
    <div class="transcription">
      <p class="result-text">{displayText}<span class="cursor">|</span></p>
      <p class="result-meta">
        {$transcript.duration}s · {($transcript.processing_time || 0).toFixed(2)}s
      </p>
    </div>
  {/if}

  {#if $error}
    <p class="error">{$error}</p>
  {/if}

</div>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem 1rem 2rem;
    width: 100%;
    max-width: 520px;
  }

  .mic-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  /* ── MIC BUTTON ── */
  .mic-btn {
    position: relative;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  }

  .mic-btn:active { transform: scale(0.94); }

  /* idle — glass with cyan glow */
  .mic-btn.idle {
    background: rgba(31, 213, 249, 0.08);
    border: 1px solid rgba(31, 213, 249, 0.25);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .mic-btn.idle:hover {
    background: rgba(31, 213, 249, 0.14);
    border-color: rgba(31, 213, 249, 0.45);
    box-shadow: 0 0 40px rgba(31, 213, 249, 0.12);
    transform: scale(1.04);
  }

  /* ripple rings */
  .ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(31, 213, 249, 0.2);
    animation: ripple 2.5s ease-out infinite;
    pointer-events: none;
  }

  .ring1 { width: 120px; height: 120px; animation-delay: 0s; }
  .ring2 { width: 150px; height: 150px; animation-delay: 0.8s; }
  .ring3 { width: 180px; height: 180px; animation-delay: 1.6s; }

  @keyframes ripple {
    0%   { opacity: 0.45; transform: scale(0.93); }
    100% { opacity: 0;    transform: scale(1.06); }
  }

  .mic-btn.permission {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    cursor: wait;
  }

  /* recording — red */
  .mic-btn.recording {
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.35);
    animation: rec-pulse 1.2s ease-in-out infinite alternate;
  }

  @keyframes rec-pulse {
    from { box-shadow: 0 0 12px rgba(220, 38, 38, 0.15); }
    to   { box-shadow: 0 0 40px rgba(220, 38, 38, 0.45); }
  }

  /* processing */
  .mic-btn.processing {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    cursor: wait;
  }

  .spinner {
    width: 34px;
    height: 34px;
    border: 2px solid rgba(255,255,255,0.06);
    border-top-color: rgb(31, 213, 249);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .mic-icon {
    width: 34px;
    height: 34px;
    color: rgb(31, 213, 249);
    position: relative;
    z-index: 1;
  }

  .stop-icon {
    color: rgba(220, 38, 38, 0.85);
    width: 28px;
    height: 28px;
  }

  /* ── WAVES ── */
  .waves {
    display: flex;
    align-items: center;
    gap: 3px;
    height: 36px;
  }

  .bar {
    width: 3px;
    border-radius: 2px;
    background: linear-gradient(to top, rgba(31,213,249,0.2), rgba(31,213,249,0.9));
    animation: wave 0.9s ease-in-out infinite alternate;
    height: 6px;
  }

  @keyframes wave {
    0%   { transform: scaleY(0.25); opacity: 0.35; }
    100% { transform: scaleY(1);    opacity: 1; }
  }

  /* ── TIMER ── */
  .timer {
    font-family: 'Inter', monospace;
    font-size: 1.5rem;
    font-weight: 300;
    color: rgba(220, 38, 38, 0.8);
    letter-spacing: 0.14em;
    margin: 0;
  }

  /* ── PROGRESS ── */
  .progress-track {
    width: 140px;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: rgb(31, 213, 249);
    border-radius: 1px;
    transition: width 1s linear, background 0.3s;
  }

  .progress-fill.warning { background: #f59e0b; }

  /* ── HINT ── */
  .hint {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.18);
    margin: 40px;
    letter-spacing: 0.06em;
  }

  /* ── TRANSCRIPTION ── */
  .transcription {
    width: 100%;
    text-align: center;
    animation: fadeUp 0.5s ease;
    padding: 1.5rem 1rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .result-text {
    font-family: 'Noto Sans Ethiopic', 'Inter', sans-serif;
    font-size: 1.5rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.88);
    margin: 0 0 0.5rem;
  }

  .cursor {
    display: inline-block;
    color: rgb(31, 213, 249);
    font-weight: 100;
    animation: blink 0.8s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .result-meta {
    font-family: 'Inter', monospace;
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.15);
    letter-spacing: 0.08em;
  }

  /* ── ERROR ── */
  .error {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: rgba(220, 38, 38, 0.65);
    letter-spacing: 0.02em;
  }
</style>