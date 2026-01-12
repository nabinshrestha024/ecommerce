import { type Area } from "react-easy-crop";

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

export async function getCroppedImage(
  imageSrc: string,
  pixelCrop: Area | null,
): Promise<File> {
  const image = await createImage(imageSrc);
  if (!pixelCrop) {
    const side = Math.min(image.width, image.height);
    const x = Math.floor((image.width - side) / 2);
    const y = Math.floor((image.height - side) / 2);
    pixelCrop = { x, y, width: side, height: side } as Area;
  }
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Failed to create blob from canvas"));
      const file = new File([blob], "profile.jpg", { type: blob.type });
      resolve(file);
    }, "image/jpeg");
  });
}
