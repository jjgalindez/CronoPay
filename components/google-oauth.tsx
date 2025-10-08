"use client";
import React, { useEffect } from 'react'

// Declaraciones de tipos para Google OAuth
declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    renderButton: (element: HTMLElement | null, config: any) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

interface GoogleSignUpProps {
    callbackFunction: (response: any) => void;
    buttonText?: string;
}

export const GoogleSignUp: React.FC<GoogleSignUpProps> = ({ callbackFunction, buttonText }) => {
    useEffect(() => {
        // Intenta inicializar y renderizar el botón si la API de google ya está disponible.
        const initAndRender = (): boolean => {
            if (!window.google || !window.google.accounts || !window.google.accounts.id) return false;

            try {
                window.google.accounts.id.initialize({
                    client_id: '260786178265-k3im15pear08ktgbbp42mu96jv5hlb8j.apps.googleusercontent.com',
                    callback: callbackFunction,
                    auto_select: false,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'),
                    {
                        type: 'standard',
                        shape: 'rectangular',
                        theme: 'outline',
                        text: buttonText || 'signup_with',
                        size: 'large',
                        logo_alignment: 'left',
                    }
                );

                return true;
            } catch (e) {
                // Si algo falla, devolvemos false para intentar de nuevo.
                return false;
            }
        };

        const loadGoogleScript = () => {
            const existing = document.getElementById('google-oauth-script');

            if (existing) {
                // Si el script ya existe, intentamos inicializar inmediatamente.
                if (initAndRender()) return;

                // Si la API aún no está lista, hacemos polling unos instantes hasta que esté disponible.
                let tries = 0;
                const maxTries = 25; // ~5 segundos (25 * 200ms)
                const interval = setInterval(() => {
                    if (initAndRender() || ++tries > maxTries) {
                        clearInterval(interval);
                    }
                }, 200);

                return;
            }

            const script = document.createElement('script');
            script.id = 'google-oauth-script';
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = () => {
                initAndRender();
            };
            document.head.appendChild(script);
        };

        loadGoogleScript();
    }, [callbackFunction]);

    return <div id="google-signin-button" className="w-full"></div>;
}

export default GoogleSignUp