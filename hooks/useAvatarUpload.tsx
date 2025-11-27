"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAvatarUpload(profileId: string, initialUrl?: string) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(initialUrl || '');

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Por favor selecciona una imagen válida (JPG, PNG, WEBP o GIF)');
      return null;
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('La imagen debe ser menor a 5MB');
      return null;
    }

    setUploadingImage(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profileId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('UserData')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        setError(uploadError.message || 'Error al subir el archivo');
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('UserData')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      return publicUrl;
    } catch (err) {
      console.error('Error subiendo imagen (hook):', err);
      setError(err instanceof Error ? err.message : 'Error al subir la imagen');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  return {
    fileInputRef,
    uploadingImage,
    error,
    avatarUrl,
    setAvatarUrl,
    handleFileSelect,
    handleFileChange,
  } as const;
}

export default useAvatarUpload;
