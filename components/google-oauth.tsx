import React from 'react'

export const GoogleSignUp = () => {
    return (
        <>
            <script src="https://accounts.google.com/gsi/client" async></script>
            <div id="g_id_onload"
                data-client_id="260786178265-k3im15pear08ktgbbp42mu96jv5hlb8j.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri="https://wdpfwwwlljyytgwrmlgi.supabase.co/auth/v1/callback"
                data-auto_prompt="true">
            </div>

            <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signup_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </>
    )
}

export default GoogleSignUp