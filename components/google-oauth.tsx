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
}

export const GoogleSignUp: React.FC<GoogleSignUpProps> = ({ callbackFunction }) => {
    
    useEffect(() => {
        // Cargar el script de Google OAuth dinámicamente
        const loadGoogleScript = () => {
            if (document.getElementById('google-oauth-script')) {
                return; // Script ya cargado
            }

            const script = document.createElement('script');
            script.id = 'google-oauth-script';
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = () => {
                // Configurar Google OAuth cuando el script se carga
                if (window.google) {
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
                            text: 'signup_with',
                            size: 'large',
                            logo_alignment: 'left'
                        }
                    );
                }
            };
            document.head.appendChild(script);
        };

        loadGoogleScript();
    }, [callbackFunction]);
    
    return (
        <div id="google-signin-button" className="w-full"></div>
    );
}

export default GoogleSignUp