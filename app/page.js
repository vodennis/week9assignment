import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  const videos = await prisma.video.findMany();

  return (
    <div>
      <h1>Video List</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.name}</li>
        ))}
      </ul>
    </div>
  );
}
