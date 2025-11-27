"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function usePasswordChange() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const validate = () => {
    setError(null);
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (passwordData.newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    if (!validate()) return;
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: supaError } = await supabase.auth.updateUser({ password: passwordData.newPassword });
      if (supaError) throw supaError;
      setSuccess(true);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      if (onSuccess) onSuccess();
      return { success: true };
    } catch (err: any) {
      console.error('Error changing password (hook):', err);
      setError(err?.message || String(err) || 'Error al cambiar la contraseña');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setError(null);
    setSuccess(false);
  };

  return {
    passwordData,
    setPasswordData,
    loading,
    success,
    error,
    handleSubmit,
    handleCancel,
  } as const;
}

export default usePasswordChange;
