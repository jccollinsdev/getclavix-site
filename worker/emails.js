const RESEND_API_KEY = env.RESEND_API_KEY;
const FROM_EMAIL = 'Clavix <support@getclavix.com>';

// Clavix Email Template Library
// Styles match the dark theme (bg: #0F1117, surface: #161B24, text: #E8ECF0, accent: #1D9E75)

const emailStyles = 'font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0F1117; color: #E8ECF0; line-height: 1.65;';

function emailBody(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Clavix</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { ${emailStyles} margin: 0; }
    a { color: #1D9E75; text-decoration: none; }
    .container { max-width: 520px; margin: 0 auto; padding: 2.5rem 1.5rem; }
    .logo { height: 36px; margin-bottom: 2rem; }
    .headline { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.2; }
    .body-text { font-size: 0.95rem; color: #7A8799; margin-bottom: 1.25rem; }
    .body-text strong { color: #E8ECF0; }
    .divider { border: none; border-top: 0.5px solid #2A3140; margin: 1.5rem 0; }
    .footer { font-size: 0.72rem; color: #7A8799; line-height: 1.7; margin-top: 2rem; }
    .footer a { color: #7A8799; }
    .risk-disclaimer { font-size: 0.68rem; color: #7A8799; line-height: 1.6; border-top: 0.5px solid #2A3140; padding-top: 1rem; margin-top: 1.5rem; }
    .highlight-box { background: #1E2530; border: 0.5px solid #2A3140; border-radius: 8px; padding: 1.25rem; margin: 1.5rem 0; }
    .highlight-box p { font-size: 0.9rem; color: #E8ECF0; }
    .btn { display: inline-block; background: #1E2530; color: #E8ECF0; padding: 0.75rem 1.5rem; border: 0.5px solid #2A3140; border-radius: 6px; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; margin-top: 1rem; }
    .btn:hover { background: #2A3140; }
  </style>
</head>
<body style="${emailStyles}">
  <div class="container">
    ${content}
    <hr class="divider" />
    <p class="footer">
      <strong>Andover Digital LLC</strong> - Operator of Clavix<br/>
      <a href="https://getclavix.com">getclavix.com</a> - <a href="mailto:support@getclavix.com">support@getclavix.com</a>
    </p>
    <p class="risk-disclaimer">
      Clavix is for informational purposes only and does not provide investment advice. Nothing in this message constitutes a recommendation to buy, sell, or hold any security. Portfolio risk scores and signal actions are generated algorithmically and may be inaccurate, delayed, or incomplete. Always do your own research and consult a licensed financial advisor before making investment decisions.
    </p>
  </div>
</body>
</html>`;
}

// ─── 1. Waitlist Confirmation ───────────────────────────────────────
function buildWaitlistConfirmation(name) {
  return emailBody(`<img src="https://getclavix.com/img/logo.svg" alt="Clavix" class="logo" />
<h1 class="headline">You're on the list.</h1>
<p class="body-text">Your spot is confirmed${name ? ', ' + name : ''}. You're joining investors who want to actually understand their portfolio risk - not just hope for the best.</p>
<p class="body-text"><strong>What happens next:</strong><br/>We'll reach out the moment Clavix is ready. Your first month is free, no credit card required. You'll be among the first to get access when we launch.</p>
<div class="highlight-box"><p>Follow the build at <a href="https://getclavix.com">getclavix.com</a> - or track progress on social to see what's coming.</p></div>
<p class="body-text">Questions? Reply to this email anytime - we actually read them.</p>
<p class="body-text">- Sansar<br/><span style="font-size: 0.8rem; color: #7A8799;">Founder, Clavix</span></p>`);
}

// ─── 2. Welcome Email ──────────────────────────────────────────────
function buildWelcomeEmail(name) {
  return emailBody(`<img src="https://getclavix.com/img/logo.svg" alt="Clavix" class="logo" />
<h1 class="headline">Welcome to Clavix${name ? ', ' + name : ''}.</h1>
<p class="body-text"><strong>1. Add your first position.</strong> Enter any stock ticker - Clavix will score your downside risk instantly. Takes about 30 seconds.</p>
<p class="body-text"><strong>2. Set your digest time.</strong> Every morning, we'll send you a briefing on what changed in your portfolio and what needs attention.</p>
<p class="body-text"><strong>3. Connect a brokerage (optional).</strong> For real-time holdings sync, connect your account via SnapTrade. Read-only - we never see your credentials.</p>
<div class="highlight-box"><p>Your first month is free. We'll remind you before any charge - and you can cancel anytime from settings.</p></div>
<p class="body-text"><strong>Something to know:</strong> Clavix tells you what happened and what it means. It does <em>not</em> tell you what to do. Every output is informational - you're in control.</p>
<a href="https://getclavix.com" class="btn">Open Clavix</a>`);
}

// ─── 3. Trial Ending Reminder ──────────────────────────────────────
function buildTrialEndingEmail(name, daysLeft) {
  const urgency = daysLeft <= 1 ? 'Tomorrow' : 'In ' + daysLeft + ' days';
  return emailBody(`<img src="https://getclavix.com/img/logo.svg" alt="Clavix" class="logo" />
<h1 class="headline">Your trial ends ${urgency}.</h1>
<p class="body-text">Hey${name ? ' ' + name : ''}, your Clavix Plus trial is about to expire.</p>
<div class="highlight-box"><p><strong>What this means:</strong><br/>- You'll be downgraded to the free tier<br/>- Your positions and digest history will be preserved<br/>- You'll lose access to unlimited holdings, broker sync, and priority analysis</p></div>
<p class="body-text"><strong>No action needed to cancel.</strong> If you do nothing, you won't be charged. Your account will simply move to the free tier.</p>
<p class="body-text">Want to keep going? Just keep using the app. Your card won't be charged without explicit confirmation.</p>
<a href="https://getclavix.com" class="btn">Review My Account</a>`);
}

// ─── 4. Payment Failed ─────────────────────────────────────────────
function buildPaymentFailedEmail(name) {
  return emailBody(`<img src="https://getclavix.com/img/logo.svg" alt="Clavix" class="logo" />
<h1 class="headline">Payment failed - action needed.</h1>
<p class="body-text">Hey${name ? ' ' + name : ''}, we couldn't process your recent payment. Your account has been suspended until the outstanding balance is resolved.</p>
<div class="highlight-box"><p><strong>What this means:</strong><br/>- You won't receive digest briefings until payment is updated<br/>- Access to Plus features is paused<br/>- If payment isn't updated within 14 days, your account may be deactivated<br/>- Your data is retained for 30 days after deactivation</p></div>
<p class="body-text"><strong>To restore access:</strong> Update your payment method in Clavix settings. Once updated, your account will be reinstated immediately.</p>
<a href="https://getclavix.com" class="btn">Update Payment Method</a>
<p class="body-text" style="margin-top: 1.5rem; font-size: 0.8rem;">If you believe this was an error, reply to this email. We respond within 1 business day.</p>`);
}

// ─── 5. Account Deletion Confirmation ──────────────────────────────
function buildAccountDeletionEmail(name) {
  return emailBody(`<img src="https://getclavix.com/img/logo.svg" alt="Clavix" class="logo" />
<h1 class="headline">Your account has been deleted.</h1>
<p class="body-text">Hey${name ? ' ' + name : ''}, we've received your account deletion request. Your account and all associated personal data has been removed from our systems.</p>
<div class="highlight-box"><p><strong>What was deleted:</strong><br/>- Your Clavix account and login credentials<br/>- All portfolio holdings and position history<br/>- Your digest history and alerts<br/>- Notification tokens and preferences<br/>- Any brokerage connections (read-only access has been revoked)</p></div>
<p class="body-text">This process is irreversible. If you wish to use Clavix again, you'll need to create a new account.</p>
<p class="body-text">Thank you for having tried Clavix. If you have feedback about why you're leaving, we'd love to hear it - reply to this email anytime.</p>`);
}

// ─── Resend API Helper ──────────────────────────────────────────────
async function sendEmail(to, subject, html) {
  if (!RESEND_API_KEY) { console.warn('RESEND_API_KEY not set - skipping email'); return; }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
    });
    if (!res.ok) console.error('Resend error:', await res.text());
    return res;
  } catch (err) { console.error('Failed to send email:', err); }
}

export { buildWaitlistConfirmation, buildWelcomeEmail, buildTrialEndingEmail, buildPaymentFailedEmail, buildAccountDeletionEmail, sendEmail };