/**
 * Layout standard d'une page de l'espace étudiant — placeholder.
 * Utilisé tant que le contenu des sections n'est pas encore implémenté.
 */
export function EspacePagePlaceholder({
  pageTitle,
  cardTitle,
  cardDescription,
}: {
  pageTitle: string;
  cardTitle: string;
  cardDescription: string;
}) {
  return (
    <div className="p-6 pt-20 md:p-10 md:pt-10">
      <header className="mb-8">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-light">
          Espace étudiant
        </p>
        <h1 className="heading-serif font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15] text-deep">
          {pageTitle}
        </h1>
      </header>

      <div className="rounded-xl border border-bd bg-white p-8 text-center">
        <h2 className="heading-serif font-serif text-[1.1rem] text-deep">
          {cardTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[0.88rem] leading-[1.7] text-mid">
          {cardDescription}
        </p>
      </div>
    </div>
  );
}
