import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const prisma = new PrismaClient();

export default async function EditVideoPage({ params }) {
  const video = await prisma.video.findUnique({
    where: { id: parseInt(params.slug, 10) },
  });

  if (!video) {
    return <div>Video not found</div>;
  }

  return <ClientEditForm video={video} />;
}

function ClientEditForm({ video }) {
  'use client';

  const [name, setName] = useState(video.name);
  const [url, setUrl] = useState(video.url);
  const [votes, setVotes] = useState(video.votes);
  const [length, setLength] = useState(video.length);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`/api/videos/${video.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url, votes, length }),
    });
    router.push('/videos');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Video</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
      <input type="number" value={votes} onChange={(e) => setVotes(parseInt(e.target.value, 10))} required />
      <input type="number" value={length} onChange={(e) => setLength(parseInt(e.target.value, 10))} required />
      <button type="submit">Update Video</button>
    </form>
  );
}
