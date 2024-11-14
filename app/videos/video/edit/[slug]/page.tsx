'use client';

import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const prisma = new PrismaClient();

type Video = {
  id: number;
  name: string;
  url: string;
  votes: number;
  length: number;
};

export default function EditVideoPage({ params }) {
  const [video, setVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchVideo() {
      const res = await fetch(`/api/videos/${params.slug}`);
      const data = await res.json();
      setVideo(data);
    }
    fetchVideo();
  }, [params.slug]);

  if (!video) return <div>Loading...</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    if (video) { 
      await fetch(`/api/videos/${video.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: video.name,
          url: video.url,
          votes: video.votes,
          length: video.length,
        }),
      });
      router.push('/videos');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Video</h1>
      <input type="text" value={video.name} onChange={(e) => setVideo({ ...video, name: e.target.value })} required />
      <input type="text" value={video.url} onChange={(e) => setVideo({ ...video, url: e.target.value })} required />
      <input type="number" value={video.votes} onChange={(e) => setVideo({ ...video, votes: parseInt(e.target.value) })} required />
      <input type="number" value={video.length} onChange={(e) => setVideo({ ...video, length: parseInt(e.target.value) })} required />
      <button type="submit">Update Video</button>
    </form>
  );
}
