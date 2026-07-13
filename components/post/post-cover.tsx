import Image from "next/image";

type PostCoverProps = {
  src?: string;
  title: string;
  sizes?: string;
  preload?: boolean;
  decorative?: boolean;
  className?: string;
};

export function PostCover({
  src,
  title,
  sizes = "100vw",
  preload = false,
  decorative = false,
  className = "",
}: PostCoverProps) {
  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-lg bg-stone-200 ${className}`.trim()}
      aria-hidden={src ? undefined : true}
    >
      {src ? (
        <Image
          src={src}
          alt={decorative ? "" : `《${title}》文章封面`}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
