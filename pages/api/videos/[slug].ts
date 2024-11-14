import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = parseInt(req.query.slug as string, 10);

  const method = req.body._method || req.method;

  if (method === 'DELETE') {
    try {
      await prisma.video.delete({
        where: { id },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  } else if (method === 'PUT') {
    const { name, url, votes, length } = req.body;
    try {
      const video = await prisma.video.update({
        where: { id },
        data: { name, url, votes, length },
      });
      res.status(200).json(video);
    } catch (error) {
      console.error("Error updating video:", error);
      res.status(500).json({ error: "Failed to update video" });
    }
  } else {
    res.status(405).end();
  }
}