import Cropper, { type Area } from "react-easy-crop";
import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/ui/dialog";
import { Slider } from "@/ui/slider";
import { Button } from "@/ui/button";
import { useUploadProfile } from "@/hooks/profile/useUploadProfile";
import { getCroppedImage } from "./GetCroppedImage";

interface ProfileCropDialogProps {
  image: string;
  open: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}

export function ProfileCropDialog({
  image,
  open,
  onClose,
  onSave,
}: ProfileCropDialogProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedPixels, setCroppedPixels] = useState<Area | null>(null);

  const { mutateAsync } = useUploadProfile();

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedPixels(pixels);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <h2 className="text-lg font-semibold text-center">
          Choose profile picture
        </h2>

        <div className="relative h-[300px] bg-black rounded-md overflow-hidden mt-4">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={(c: { x: number; y: number }) => setCrop(c)}
            onZoomChange={(z: number) => setZoom(z)}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="mt-4">
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={(v) => setZoom(v[0])}
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                const file = await getCroppedImage(image, croppedPixels);
                const form = new FormData();
                form.append("image", file);
                await mutateAsync(form);
                onSave(file);
                onClose();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
