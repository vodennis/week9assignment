import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function VideosPage() {
  const videos = await prisma.video.findMany();

  return (
    <div>
      <h1>Video List</h1>
      <Link href="/videos/video/add">Add New Video</Link>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <Link href={`/videos/video/edit/${video.id}`}>{video.name}</Link>
            <form action={`/api/videos/${video.id}`} method="post" style={{ display: 'inline' }}>
              <input type="hidden" name="_method" value="DELETE" />
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

