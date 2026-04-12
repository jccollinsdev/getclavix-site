const RESEND_API_KEY = env.RESEND_API_KEY;
const FROM_EMAIL = 'Clavix <support@getclavix.com>';

async function sendWelcomeEmail(email, env) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping welcome email');
    return;
  }
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "You're on the list — here's what comes next",
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 2rem;">
            <h1 style="font-size: 1.5rem; font-weight: 600; color: #E8ECF0; margin-bottom: 1.5rem;">Welcome to Clavix</h1>
            <p style="font-size: 1rem; color: #7A8799; line-height: 1.7; margin-bottom: 1rem;">
              Your spot on the waitlist is confirmed. You're among the first to know when Clavix launches.
            </p>
            <p style="font-size: 1rem; color: #7A8799; line-height: 1.7; margin-bottom: 1rem;">
              <strong style="color: #E8ECF0;">What is Clavix?</strong><br/>
              Clavix is a portfolio risk intelligence app for self-directed investors. It tracks your holdings, analyzes market-moving news, and scores downside risk — so you always know what matters and what needs attention.
            </p>
            <p style="font-size: 1rem; color: #7A8799; line-height: 1.7; margin-bottom: 1.5rem;">
              Your first month is free when we launch. No credit card required.
            </p>
            <hr style="border: none; border-top: 0.5px solid #2A3140; margin: 1.5rem 0;" />
            <p style="font-size: 0.78rem; color: #7A8799; line-height: 1.6;">
              Portfolio Risk · Holdings · Daily Digest<br/>
              <a href="https://getclavix.com" style="color: #7A8799;">getclavix.com</a>
            </p>
          </div>
        `,
        text: `Welcome to Clavix.\n\nYour spot on the waitlist is confirmed.\n\nClavix tracks your holdings, analyzes market-moving news, and scores downside risk. Your first month is free when we launch. No credit card required.\n\ngetclavix.com`,
      }),
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }
}

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { email } = body;
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = 'https://cmmtzrulxhhmndwimrlc.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbXR6cnVseGhobW5kd2ltcmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTAzNjksImV4cCI6MjA5MDA4NjM2OX0.Ch26oirSyLOuyhj6IGDUXwO1bTJEnvh2pGeA_tnmw4I';

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ email }),
    });

    if (res.status === 409) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: 'Failed to register', detail: err }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send welcome email via Resend
    await sendWelcomeEmail(email, env);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
