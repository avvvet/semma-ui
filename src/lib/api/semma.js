const API_URL = 'http://localhost:3000';

export async function transcribeAudio(audioBlob) {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.webm');

  const response = await fetch(`${API_URL}/api/transcribe`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Transcription failed');
  }

  return response.json();
}

export async function getRecent() {
  const response = await fetch(`${API_URL}/api/recent`);
  if (!response.ok) throw new Error('Failed to get recent');
  return response.json();
}

export async function getHealth() {
  const response = await fetch(`${API_URL}/api/health`);
  if (!response.ok) throw new Error('Health check failed');
  return response.json();
}