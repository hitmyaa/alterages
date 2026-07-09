import type { Metadata } from 'next';

import { LegalLayout, LegalList, LegalSection } from '../_components/legal';

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description:
    "Conditions générales d'utilisation du site alter-ages.fr et de ses services (formulaires, préinscription étudiante, plateforme d'accompagnement).",
};

export default function CGUPage() {
  return (
    <LegalLayout
      eyebrow="Conditions d’utilisation"
      title="Conditions générales d’utilisation"
      updated="9 juillet 2026"
    >
      <LegalSection title="Objet">
        <p>
          Les présentes conditions générales d’utilisation régissent l’accès et l’usage du site
          alter-ages.fr et de ses services associés (formulaires, préinscription étudiante,
          plateforme d’accompagnement).
        </p>
      </LegalSection>

      <LegalSection title="Acceptation">
        <p>
          L’usage du site implique l’acceptation pleine et entière des présentes conditions. Si vous
          n’acceptez pas ces conditions, nous vous invitons à ne pas utiliser le site.
        </p>
      </LegalSection>

      <LegalSection title="Accès au site">
        <p>
          L’accès au site est gratuit. Les frais liés à l’accès (connexion internet, matériel) sont
          à la charge de l’utilisateur. AlterAges se réserve le droit de suspendre ou modifier tout
          ou partie du site sans préavis.
        </p>
      </LegalSection>

      <LegalSection title="Comptes utilisateurs">
        <p>
          Certaines fonctionnalités du site (espace étudiant, espace bénéficiaire) nécessitent la
          création d’un compte. L’utilisateur s’engage à fournir des informations exactes et à
          maintenir la confidentialité de ses identifiants. Toute utilisation frauduleuse pourra
          entraîner la suspension du compte.
        </p>
      </LegalSection>

      <LegalSection title="Contenu des utilisateurs">
        <p>
          Les documents et informations déposés par les utilisateurs sur leur espace personnel
          restent leur propriété. AlterAges les utilise dans le cadre strict de la gestion du
          dossier (voir la Politique de confidentialité).
        </p>
      </LegalSection>

      <LegalSection title="Comportements interdits">
        <p>Sont notamment interdits :</p>
        <LegalList>
          <li>Toute utilisation détournée ou frauduleuse du site.</li>
          <li>L’accès non autorisé aux comptes d’autres utilisateurs.</li>
          <li>
            La diffusion de contenus illicites, offensants ou portant atteinte aux droits de tiers.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Le site est fourni « en l’état ». AlterAges décline toute responsabilité en cas de
          dysfonctionnement, indisponibilité ou perte de données non imputable à sa faute directe.
        </p>
      </LegalSection>

      <LegalSection title="Modification des CGU">
        <p>
          AlterAges se réserve le droit de modifier les présentes conditions à tout moment. Les
          utilisateurs seront informés des modifications substantielles.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes CGU sont régies par le droit français. Tout litige relèvera de la compétence
          exclusive des tribunaux français.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
