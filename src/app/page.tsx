import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={index} className="flex w-48 flex-col gap-2">
            <Image
              src={image.url}
              alt={`Image ${image.id}`}
              width={192}
              height={192}
              className="size-full object-cover"
            />
            <div className="text-sm">{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
