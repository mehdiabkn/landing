"use client"
import React from "react";
import { X } from "lucide-react";

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-xl shadow-xl p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-2">
          <h2 className="text-2xl font-bold">Politique de confidentialité</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-left">
          <section>
            <h3 className="text-xl font-semibold mb-2">1. Collecte des données personnelles</h3>
            <p>
              Dans le cadre de notre service de notification pour l&apos;application Jobboost, nous collectons les informations suivantes :
            </p>
            <ul className="list-disc pl-6 my-2">
              <li>Prénom</li>
              <li>Numéro de téléphone</li>
              <li>Date et heure du consentement</li>
            </ul>
            <p>
              Ces données sont collectées uniquement lorsque vous les soumettez volontairement via notre formulaire d&apos;inscription pour être informé(e) du lancement de l&apos;application.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">2. Finalités du traitement</h3>
            <p>
              Les données personnelles que vous nous fournissez sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 my-2">
              <li>Vous envoyer par SMS des informations sur le lancement de l&apos;application Jobboost</li>
              <li>Vous fournir le code promotionnel pour la semaine gratuite</li>
              <li>Vous tenir informé(e) des fonctionnalités de l&apos;application</li>
              <li>Analyser l&apos;efficacité de nos campagnes marketing et améliorer nos services</li>
              <li>Personnaliser les publicités qui pourraient vous être présentées sur d&apos;autres plateformes</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">3. Base légale du traitement</h3>
            <p>
              Le traitement de vos données est basé sur votre consentement explicite, que vous accordez en cochant la case correspondante lors de votre inscription.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">4. Destinataires des données</h3>
            <p>
              Vos données personnelles sont destinées à :
            </p>
            <ul className="list-disc pl-6 my-2">
              <li>Notre équipe interne responsable du lancement de l&apos;application</li>
              <li>Nos prestataires techniques pour l&apos;envoi des SMS (conformément à nos instructions et exclusivement pour les finalités mentionnées)</li>
              <li>Nos partenaires d&apos;analyse (Meta, Snapchat) pour l&apos;optimisation de nos campagnes marketing</li>
            </ul>
            <p>
              Nous ne vendons, n&apos;échangeons ni ne transférons d&apos;une autre manière vos informations personnelles à des tiers.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">5. Durée de conservation</h3>
            <p>
              Vos données personnelles sont conservées pour une durée de 3 ans à compter de votre inscription ou de votre dernier contact avec nous. À l&apos;issue de cette période, vos données seront supprimées.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">6. Sécurité et confidentialité</h3>
            <p>
              Nous mettons en œuvre les mesures techniques et organisationnelles appropriées afin de protéger vos données personnelles contre toute altération, perte ou accès non autorisé.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">7. Vos droits</h3>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 my-2">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit à l&apos;effacement de vos données</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d&apos;opposition au traitement</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse : <a href="mailto:rgpd@jobboost.fr" className="text-blue-600 hover:underline">rgpd@jobboost.fr</a>
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">8. Délégué à la protection des données</h3>
            <p>
              Pour toute question relative à vos données personnelles, vous pouvez contacter notre Délégué à la Protection des Données à l&apos;adresse suivante : <a href="mailto:dpo@jobboost.fr" className="text-blue-600 hover:underline">dpo@jobboost.fr</a>
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">9. Droit d&apos;introduire une réclamation</h3>
            <p>
              Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) en ligne sur <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cnil.fr</a>.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">10. Modification de la politique de confidentialité</h3>
            <p>
              Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. Toute modification sera publiée sur cette page. Date de dernière mise à jour : {new Date().toLocaleDateString()}
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

export default PrivacyPolicyModal;