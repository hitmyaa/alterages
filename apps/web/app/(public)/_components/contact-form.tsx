'use client';

import { useState } from 'react';

/**
 * Formulaire de contact — envoi server-side via /api/contact (Resend).
 * Les données sont transmises par email à contact@alter-ages.fr.
 */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      prenom: String(data.get('prenom') ?? '').trim(),
      nom: String(data.get('nom') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      telephone: String(data.get('telephone') ?? '').trim(),
      profil: String(data.get('profil') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      // Honeypot anti-bots
      website: String(data.get('website') ?? ''),
    };

    if (!payload.prenom || !payload.nom || !payload.email || !payload.message) {
      setStatus('error');
      setErrorMsg('Merci de remplir au moins votre prénom, nom, email et message.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? 'network_error');
      }

      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMsg(
        "L'envoi a échoué. Réessayez dans un instant, ou écrivez à contact@alter-ages.fr.",
      );
    }
  }

  const sending = status === 'sending';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-bd bg-cream p-8 md:p-9"
      noValidate
    >
      <h3 className="font-serif text-2xl leading-tight text-deep">Contact</h3>
      <p className="mt-1.5 text-[0.8rem] leading-[1.6] text-mid">
        Votre message sera envoyé directement à Faustine Sornay à{' '}
        <span className="text-deep">contact@alter-ages.fr</span>.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Prénom *" name="prenom" placeholder="Votre prénom" required />
        <Field label="Nom *" name="nom" placeholder="Votre nom" required />
      </div>
      <div className="mt-3">
        <Field
          label="Email *"
          name="email"
          type="email"
          placeholder="votre@email.fr"
          required
        />
      </div>
      <div className="mt-3">
        <Field
          label="Téléphone"
          name="telephone"
          type="tel"
          placeholder="06 XX XX XX XX"
        />
      </div>
      <div className="mt-3">
        <label className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.09em] text-mid">
          Vous êtes
        </label>
        <select
          name="profil"
          defaultValue=""
          className="w-full appearance-none rounded-[5px] border border-bd bg-warm px-[0.95rem] py-3 text-[0.87rem] text-deep outline-none transition-colors focus:border-terra"
        >
          <option value="">— Sélectionnez —</option>
          <option>Famille / Proche aidant</option>
          <option>Prescripteur (SSIAD, CLIC, AS…)</option>
          <option>Bénéficiaire</option>
          <option>Partenaire potentiel</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="mt-3">
        <label className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.09em] text-mid">
          Message *
        </label>
        <textarea
          name="message"
          required
          placeholder="Décrivez votre situation ou votre demande…"
          className="min-h-[110px] w-full resize-y rounded-[5px] border border-bd bg-warm px-[0.95rem] py-3 text-[0.87rem] leading-[1.6] text-deep outline-none transition-colors focus:border-terra"
        />
      </div>

      {/* Honeypot anti-bots : champ cach\u00e9, invisible pour les humains */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label>
          Ne pas remplir
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-5 w-full rounded-[5px] bg-terra px-4 py-3.5 text-[0.9rem] font-medium text-white transition-colors hover:bg-terra-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? 'Envoi en cours…' : 'Envoyer ma demande →'}
      </button>

      {status === 'sent' ? (
        <div className="mt-4 rounded-md border border-[#a8d5ad] bg-[#eaf5ec] px-5 py-3 text-[0.85rem] leading-[1.7] text-[#2a5c30]">
          Merci ! Votre message a bien été envoyé à Faustine. Vous recevrez une
          réponse sous peu à l'adresse indiquée.
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="mt-4 rounded-md border border-[#e8b4b4] bg-[#fbecec] px-5 py-3 text-[0.85rem] leading-[1.7] text-[#7a2a2a]">
          {errorMsg ||
            "Un problème est survenu. Réessayez ou écrivez directement à contact@alter-ages.fr."}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.09em] text-mid">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-[5px] border border-bd bg-warm px-[0.95rem] py-3 text-[0.87rem] text-deep outline-none transition-colors focus:border-terra"
      />
    </div>
  );
}
