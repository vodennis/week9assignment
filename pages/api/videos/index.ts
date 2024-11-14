import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, url, votes, length } = req.body;
    try {
      const video = await prisma.video.create({
        data: { name, url, votes, length },
      });
      res.status(201).json(video);
    } catch (error) {
      console.error("Error creating video:", error);
      res.status(500).json({ error: "Failed to create video" });
    }
  } else {
    res.status(405).end();
  }
}




