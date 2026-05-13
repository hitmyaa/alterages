import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

// Validation des champs (miroir du formulaire public)
const ContactSchema = z.object({
  prenom: z.string().trim().min(1, 'Prénom requis').max(80),
  nom: z.string().trim().min(1, 'Nom requis').max(80),
  email: z.string().trim().email('Email invalide').max(160),
  telephone: z.string().trim().max(40).optional().default(''),
  profil: z.string().trim().max(60).optional().default(''),
  message: z.string().trim().min(1, 'Message requis').max(5000),
  // Honeypot — champ caché dans le form, doit rester vide
  website: z.string().max(0).optional().default(''),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  // Vérif des variables d'env côté serveur
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error('[contact] Missing env vars');
    return NextResponse.json(
      { ok: false, error: 'server_misconfigured' },
      { status: 500 },
    );
  }

  // Parse + validation
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Honeypot — si rempli, c'est un bot. On fait semblant d'avoir réussi.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { prenom, nom, email, telephone, profil, message } = parsed.data;

  const subject = `[AlterAges] Contact — ${prenom} ${nom}`;

  const textBody = [
    'Nouveau message depuis alter-ages.fr',
    '',
    `Nom : ${prenom} ${nom}`,
    `Email : ${email}`,
    telephone ? `Téléphone : ${telephone}` : null,
    profil ? `Profil : ${profil}` : null,
    '',
    '--- Message ---',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;color:#2a2419;max-width:560px">
      <h2 style="color:#c2562b;margin:0 0 16px">Nouveau message depuis alter-ages.fr</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
        <tr><td style="padding:6px 0;color:#7a6e5e;width:120px">Nom</td><td style="padding:6px 0;font-weight:600">${escapeHtml(prenom)} ${escapeHtml(nom)}</td></tr>
        <tr><td style="padding:6px 0;color:#7a6e5e">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${telephone ? `<tr><td style="padding:6px 0;color:#7a6e5e">Téléphone</td><td style="padding:6px 0">${escapeHtml(telephone)}</td></tr>` : ''}
        ${profil ? `<tr><td style="padding:6px 0;color:#7a6e5e">Profil</td><td style="padding:6px 0">${escapeHtml(profil)}</td></tr>` : ''}
      </table>
      <div style="padding:16px;background:#f8f4ec;border-left:3px solid #c2562b;border-radius:4px;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
      <p style="margin-top:24px;font-size:12px;color:#a59688">Envoyé depuis alter-ages.fr</p>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('[contact] Resend error', error);
      return NextResponse.json(
        { ok: false, error: 'send_failed' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error', err);
    return NextResponse.json(
      { ok: false, error: 'unexpected' },
      { status: 500 },
    );
  }
}
