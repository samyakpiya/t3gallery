import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/c9736860-3878-4848-9a95-bd5a787fe182-6kk2kw.jpg",
  "https://utfs.io/f/20045ad0-e88e-4419-a33b-258f796e7b6c-75tnjv.jpg",
  "https://utfs.io/f/9fcc4897-3cc6-4fa1-9e4b-1d9809453c67-fxz3u2.jpg",
  "https://utfs.io/f/b81f1a89-3825-483d-89c2-0c6eacb2d140-36d39x.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <Image
            key={index}
            src={image.url}
            alt={`Image ${image.id}`}
            width={200}
            height={200}
            className="object-cover"
          />
        ))}
      </div>
    </main>
  );
}
