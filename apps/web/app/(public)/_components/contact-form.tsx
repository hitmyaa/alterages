'use client';

import { useState } from 'react';

/**
 * Formulaire de contact — reproduit le comportement de l'HTML V12 :
 * ouvre la messagerie de l'utilisateur avec un mailto pré-rempli.
 * Aucune donnée n'est stockée côté serveur.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const prenom = String(data.get('prenom') ?? '').trim();
    const nom = String(data.get('nom') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const telephone = String(data.get('telephone') ?? '').trim();
    const profil = String(data.get('profil') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!prenom || !nom || !email || !message) {
      window.alert('Merci de remplir au moins votre prénom, nom, email et message.');
      return;
    }

    const sujet = `[AlterAges] Contact — ${prenom} ${nom}`;
    const corps = [
      'Bonjour Faustine,',
      '',
      'Je vous contacte via le site AlterAges.',
      '',
      `Nom : ${prenom} ${nom}`,
      `Email : ${email}`,
      telephone ? `Téléphone : ${telephone}` : null,
      profil ? `Profil : ${profil}` : null,
      '',
      message,
      '',
      '—',
      'Envoyé depuis alterages.fr',
    ]
      .filter((line) => line !== null)
      .join('\n');

    window.location.href =
      'mailto:contact@alter-ages.fr' +
      '?subject=' +
      encodeURIComponent(sujet) +
      '&body=' +
      encodeURIComponent(corps);

    setSent(true);
  }

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

      <button
        type="submit"
        className="mt-5 w-full rounded-[5px] bg-terra px-4 py-3.5 text-[0.9rem] font-medium text-white transition-colors hover:bg-terra-dark"
      >
        Envoyer ma demande →
      </button>
      <p className="mt-3 text-center text-[0.7rem] leading-[1.55] text-light">
        Ce formulaire ouvre votre messagerie. Aucune donnée stockée.
      </p>

      {sent ? (
        <div className="mt-4 rounded-md border border-[#a8d5ad] bg-[#eaf5ec] px-5 py-3 text-[0.85rem] leading-[1.7] text-[#2a5c30]">
          Votre messagerie s'est ouverte avec le message prêt à envoyer. Si rien ne
          s'affiche, écrivez à <strong>contact@alter-ages.fr</strong> ou appelez le{' '}
          <strong>06 73 87 75 71</strong>.
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
