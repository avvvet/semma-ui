import { writable } from 'svelte/store';

// 5 states: idle | permission | recording | processing | result
export const micState = writable('idle');

export const transcript = writable({
  text: '',
  duration: 0,
  processingTime: 0,
  segments: []
});

export const recentList = writable([]);

export const error = writable('');