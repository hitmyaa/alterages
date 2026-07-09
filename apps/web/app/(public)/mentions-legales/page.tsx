import type { Metadata } from 'next';

import { LegalLayout, LegalSection } from '../_components/legal';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    "Mentions légales du site alter-ages.fr : éditeur, hébergeur, activité de services à la personne et informations juridiques d'AlterAges.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout eyebrow="Informations légales" title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <p>
          AlterAges, association déclarée régie par la loi du 1<sup>er</sup> juillet 1901.
        </p>
        <p>
          Siège social : 26 rue Lalande, 69006 Lyon
          <br />
          RNA : W691112992
          <br />
          SIRET : 106 758 006 00014
          <br />
          Code APE : 88.10A
          <br />
          Directrice de la publication : Faustine Sornay, présidente
          <br />
          Email :{' '}
          <a href="mailto:contact@alter-ages.fr" className="text-terra hover:underline">
            contact@alter-ages.fr
          </a>
          <br />
          Téléphone :{' '}
          <a href="tel:+33673877571" className="text-terra hover:underline">
            06 73 87 75 71
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Hébergeur">
        <p>
          OVH SAS
          <br />
          2 rue Kellermann, 59100 Roubaix, France
          <br />
          Téléphone : 1007
          <br />
          Site :{' '}
          <a
            href="https://www.ovh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terra hover:underline"
          >
            www.ovh.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Activité : services à la personne">
        <p>
          AlterAges est un organisme de services à la personne déclaré auprès de la Direction
          Départementale de l’Emploi, du Travail et des Solidarités (DDETS) du Rhône.
        </p>
        <p>Numéro de déclaration : SAP106758006</p>
        <p>
          Les activités déclarées relèvent du régime déclaratif prévu à l’article L.7232-1-1 du Code
          du travail. Les bénéficiaires des services d’AlterAges peuvent bénéficier du crédit
          d’impôt de 50 % prévu à l’article 199 sexdecies du Code général des impôts.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L’ensemble des contenus du site (textes, images, graphismes, logo, structure) est la
          propriété exclusive d’AlterAges, sauf mentions contraires. Toute reproduction,
          représentation, modification, publication ou adaptation totale ou partielle est interdite
          sans autorisation écrite préalable.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          AlterAges met en œuvre tous les moyens raisonnables pour assurer l’exactitude et la mise à
          jour des informations diffusées sur ce site. Toutefois, AlterAges ne peut garantir
          l’exactitude, la précision ou l’exhaustivité des informations mises à disposition.
          AlterAges ne saurait être tenue pour responsable des erreurs, indisponibilités du site, ou
          de la présence de virus.
        </p>
      </LegalSection>

      <LegalSection title="Liens hypertextes">
        <p>
          Le site peut contenir des liens vers d’autres sites internet. AlterAges n’exerce aucun
          contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Le présent site et ses conditions d’utilisation sont régis par le droit français. En cas
          de litige, les tribunaux français seront seuls compétents.
        </p>
      </LegalSection>

      <LegalSection title="Crédits">
        <p>Photographies : illustrations générées par intelligence artificielle, usage libre.</p>
      </LegalSection>
    </LegalLayout>
  );
}
