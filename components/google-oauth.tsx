"use client";
import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface GoogleSignUpProps {
    buttonText?: string;
    redirectTo?: string;
}

export const GoogleSignUp: React.FC<GoogleSignUpProps> = ({ buttonText, redirectTo = '/protected' }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            
            // Crear el popup manualmente
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?popup=true&next=${encodeURIComponent(redirectTo)}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account',
                    },
                    skipBrowserRedirect: true, // Importante para popup
                    scopes: 'email profile',
                },
            });

            if (error) throw error;

            // Abrir popup manualmente centrado
            if (data?.url) {
                // Calcular posición centrada
                const width = 500;
                const height = 600;
                const left = (screen.width / 2) - (width / 2);
                const top = (screen.height / 2) - (height / 2);
                
                const popup = window.open(
                    data.url,
                    'google-oauth',
                    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
                );

                // Escuchar el mensaje del popup cuando se complete
                const messageListener = (event: MessageEvent) => {
                    if (event.origin !== window.location.origin) return;
                    
                    if (event.data.type === 'OAUTH_SUCCESS') {
                        popup?.close();
                        router.push(redirectTo);
                        window.removeEventListener('message', messageListener);
                    } else if (event.data.type === 'OAUTH_ERROR') {
                        popup?.close();
                        console.error('OAuth error:', event.data.error);
                        window.removeEventListener('message', messageListener);
                    }
                };

                window.addEventListener('message', messageListener);

                // Limpiar si el popup se cierra manualmente
                const checkClosed = setInterval(() => {
                    if (popup?.closed) {
                        clearInterval(checkClosed);
                        window.removeEventListener('message', messageListener);
                        setIsLoading(false);
                    }
                }, 1000);
            }
        } catch (error) {
            console.error('Error en login con Google:', error);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-gray-700 font-medium transition-colors"
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
            )}
            {isLoading ? 'Conectando...' : (buttonText || 'Iniciar sesión con Google')}
        </button>
    );
};

export default GoogleSignUp;