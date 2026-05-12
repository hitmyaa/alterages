import { PublicHeader } from '@/components/site/public-header';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 pt-[76px]">{children}</main>

      <footer className="bg-deep px-6 py-10 text-center text-[0.78rem] leading-loose tracking-wide text-white/75">
        <p>
          <strong className="font-medium text-white">AlterAges</strong>
          <span className="mx-2 opacity-40">·</span>
          Projet en construction
          <span className="mx-2 opacity-40">·</span>
          Lancement septembre 2026
          <span className="mx-2 opacity-40">·</span>
          Lyon (69)
        </p>
        <p>
          Faustine Sornay
          <span className="mx-2 opacity-40">·</span>
          <a
            href="mailto:contact@alter-ages.fr"
            className="underline-offset-2 hover:underline"
          >
            contact@alter-ages.fr
          </a>
          <span className="mx-2 opacity-40">·</span>
          <a href="tel:+33673877571" className="underline-offset-2 hover:underline">
            06 73 87 75 71
          </a>
        </p>
        <p className="mt-2 text-[0.7rem] text-white/45">
          Démarches d'obtention de l'agrément SAP en cours d'instruction. Aucun service
          actuellement commercialisé.
        </p>
      </footer>
    </div>
  );
}
