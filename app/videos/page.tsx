'use client';

import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

export default function VideosPage() {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideoList(data);
    }
    fetchVideos();
  }, []);

  async function handleDelete(id) {
    const response = await fetch(`/api/videos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setVideoList(videoList.filter((video) => video.id !== id));
    } else {
      console.error("Failed to delete video on Vercel");
    }
  }

  return (
    <div>
      <h1>Video List</h1>
      <Link href="/videos/video/add">Add New Video</Link>
      <ul>
        {videoList.map((video) => (
          <li key={video.id}>
            <Link href={`/videos/video/edit/${video.id}`}>{video.name}</Link>
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
