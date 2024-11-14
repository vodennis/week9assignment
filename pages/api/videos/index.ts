import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all videos
    try {
      const videos = await prisma.video.findMany();
      res.status(200).json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  } else if (req.method === 'POST') {
    const { name, url, votes, length } = req.body;
    try {
      const video = await prisma.video.create({
        data: { name, url, votes, length },
      });
      res.status(201).json(video);
    } catch (error) {
      console.error("Error adding video:", error);
      res.status(500).json({ error: "Failed to add video" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
