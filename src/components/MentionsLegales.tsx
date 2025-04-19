"use client"
import React from "react";
import { X } from "lucide-react";

interface MentionsLegalesProps {
  onClose: () => void;
}

const MentionsLegales: React.FC<MentionsLegalesProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-xl shadow-xl p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-2">
          <h2 className="text-2xl font-bold">Mentions légales</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-left">
          <section>
            <h3 className="text-xl font-semibold mb-2">Éditeur du site</h3>
            <p>
              Le site Jobboost est édité par :
            </p>
            <p className="my-2">
              LYAMAPPS<br />
              Forme juridique : EI<br />
              SIEGE : 3123, 361 ALLEE BERLIOZ, 38400 SAINT-MARTIN-DHERES<br />
              SIRET : 93521129200013<br />
              RCS : 935 211 292 R.C.S. Grenoble<br />
              Directeur de la publication : Laëtitia Youssef
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Hébergement</h3>
            <p>
              Le site Jobboost est hébergé par :
            </p>
            <p className="my-2">
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723<br />
            États-Unis<br />
            Téléphone : Non communiqué<br />
            Email de contact : support@vercel.com
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Conditions d&apos;utilisation</h3>
            <p>
              L&apos;utilisation du site Jobboost implique l&apos;acceptation pleine et entière des conditions générales d&apos;utilisation décrites ci-après. Ces conditions d&apos;utilisation sont susceptibles d&apos;être modifiées ou complétées à tout moment.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Propriété intellectuelle</h3>
            <p>
              Le contenu du site Jobboost (structure, textes, logos, images, etc.) est la propriété exclusive de [Nom de votre société] et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="my-2">
              Toute reproduction totale ou partielle de ce contenu est strictement interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Responsabilité</h3>
            <p>
              [Nom de votre société] s&apos;efforce d&apos;assurer au mieux de ses possibilités l&apos;exactitude et la mise à jour des informations diffusées sur le site. Toutefois, [Nom de votre société] ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur le site.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Liens hypertextes</h3>
            <p>
              Le site Jobboost peut contenir des liens hypertextes vers d&apos;autres sites internet. [Nom de votre société] n&apos;exerce aucun contrôle sur ces sites et ne saurait être tenu responsable de leur contenu ou de leurs pratiques.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Protection des données personnelles</h3>
            <p>
              Conformément à la loi &quot;Informatique et Libertés&quot; du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez de droits concernant vos données personnelles. Pour en savoir plus, consultez notre <button onClick={() => {onClose(); setTimeout(() => document.getElementById('privacy-policy-btn')?.click(), 100);}} className="text-blue-600 hover:underline">Politique de confidentialité</button>.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Droit applicable et juridiction compétente</h3>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <p>
              Pour toute question ou demande d&apos;information concernant le site, vous pouvez nous contacter à l&apos;adresse email : <a href="mailto:contact@jobboost.fr" className="text-blue-600 hover:underline">contact@jobboost.fr</a>
            </p>
          </section>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 rounded-lg font-semibold text-black shadow-md transition"
          >
            J&apos;ai compris
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;