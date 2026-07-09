import type { Metadata } from 'next';

import { LegalLayout, LegalList, LegalSection } from '../_components/legal';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité d'AlterAges : données collectées, finalités, base légale, durée de conservation et vos droits (RGPD).",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      eyebrow="Vos données"
      title="Politique de confidentialité"
      intro="AlterAges accorde une importance particulière à la protection de vos données personnelles. La présente politique décrit les traitements que nous mettons en œuvre, les finalités poursuivies, et les droits dont vous disposez conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée."
      updated="9 juillet 2026"
    >
      <LegalSection title="Responsable du traitement">
        <p>
          AlterAges, association loi 1901
          <br />
          RNA : W691112992
          <br />
          Directrice de la publication : Faustine Sornay
          <br />
          Contact :{' '}
          <a href="mailto:contact@alter-ages.fr" className="text-terra hover:underline">
            contact@alter-ages.fr
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>Nous collectons les données suivantes selon les formulaires que vous remplissez :</p>
        <LegalList>
          <li>Formulaire de contact : nom, prénom, email, téléphone, message.</li>
          <li>
            Préinscription étudiante : nom, prénom, date de naissance, téléphone, email, formation,
            établissement, disponibilités, zones d’intervention, documents administratifs déposés.
          </li>
          <li>
            Préinscription bénéficiaire ou famille : nom, prénom, coordonnées, adresse, informations
            relatives à la personne aidée.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Finalités du traitement">
        <p>Vos données sont traitées pour les finalités suivantes :</p>
        <LegalList>
          <li>Répondre à vos demandes de contact.</li>
          <li>Gérer votre préinscription (étudiant, bénéficiaire, aidant).</li>
          <li>
            Établir les contrats, bulletins de paie et déclarations administratives (CESU, URSSAF).
          </li>
          <li>Assurer la coordination des interventions et le suivi de la relation.</li>
          <li>Vous informer d’évolutions du service (avec votre consentement).</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Base légale">
        <p>Nos traitements reposent sur :</p>
        <LegalList>
          <li>
            L’exécution d’un contrat ou de mesures précontractuelles (préinscription, contrat de
            travail).
          </li>
          <li>
            Le respect d’obligations légales (déclarations administratives, CESU, URSSAF,
            fiscalité).
          </li>
          <li>Votre consentement pour les communications informationnelles.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Destinataires des données">
        <p>
          Vos données sont destinées à AlterAges et à ses sous-traitants strictement nécessaires :
        </p>
        <LegalList>
          <li>URSSAF (déclarations CESU).</li>
          <li>Prestataire de signature électronique (YouSign ou équivalent).</li>
          <li>Hébergeur (OVH).</li>
          <li>Outils de gestion interne.</li>
        </LegalList>
        <p>Aucune donnée n’est vendue, cédée ou communiquée à des tiers à des fins commerciales.</p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <LegalList>
          <li>Données des prospects (formulaires de contact non aboutis) : 3 ans.</li>
          <li>
            Données des bénéficiaires actifs : durée du contrat + 5 ans (obligations comptables et
            sociales).
          </li>
          <li>Données des intervenants : durée du contrat + 5 ans après la fin de la relation.</li>
          <li>Données de préinscription étudiante non concrétisée : 2 ans.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <LegalList>
          <li>Accès à vos données.</li>
          <li>Rectification.</li>
          <li>Effacement (dans les limites des obligations légales).</li>
          <li>Opposition et limitation du traitement.</li>
          <li>Portabilité.</li>
          <li>Retrait de votre consentement à tout moment.</li>
        </LegalList>
        <p>
          Pour exercer vos droits, contactez-nous à{' '}
          <a href="mailto:contact@alter-ages.fr" className="text-terra hover:underline">
            contact@alter-ages.fr
          </a>
          . Vous disposez également du droit d’introduire une réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terra hover:underline"
          >
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Le site alter-ages.fr utilise uniquement des cookies techniques strictement nécessaires à
          son fonctionnement. Aucun cookie de mesure d’audience, publicitaire ou de suivi tiers
          n’est déposé sans votre consentement explicite.
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          AlterAges met en œuvre les mesures techniques et organisationnelles appropriées pour
          protéger vos données contre tout accès non autorisé, altération, divulgation ou
          destruction.
        </p>
      </LegalSection>

      <LegalSection title="Mise à jour de la politique">
        <p>
          La présente politique peut être mise à jour à tout moment. La date de dernière mise à jour
          est indiquée en bas de page.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
