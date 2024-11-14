'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddVideoPage() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [votes, setVotes] = useState(0);
  const [length, setLength] = useState(0);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url, votes, length }),
    });
    router.push('/videos');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Video</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" required />
      <input type="number" value={votes} onChange={(e) => setVotes(parseInt(e.target.value, 10))} placeholder="Votes" required />
      <input type="number" value={length} onChange={(e) => setLength(parseInt(e.target.value, 10))} placeholder="Length" required />
      <button type="submit">Add Video</button>
    </form>
  );
}
