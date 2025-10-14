import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Si es un popup (detectamos por el opener), enviar mensaje al parent
      if (request.headers.get('sec-fetch-dest') === 'iframe' || searchParams.get('popup') === 'true') {
        return new Response(`
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, '${origin}');
              window.close();
            } else {
              window.location.href = '${next}';
            }
          </script>
        `, {
          headers: { 'Content-Type': 'text/html' }
        });
      }

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else {
      // Error en autenticación
      if (request.headers.get('sec-fetch-dest') === 'iframe' || searchParams.get('popup') === 'true') {
        return new Response(`
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_ERROR', error: '${error.message}' }, '${origin}');
              window.close();
            } else {
              window.location.href = '${origin}/auth/auth-code-error';
            }
          </script>
        `, {
          headers: { 'Content-Type': 'text/html' }
        });
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}