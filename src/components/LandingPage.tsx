"use client"
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Check, Phone, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import MentionsLegales from "@/components/MentionsLegales";
import SnapPixel from "@/components/SnapPixel";

const rotatingPhrases = [
  "fait ton CV pour chaque offre",
  "corrige tes erreurs.",
  "reformule mieux.",
  "te prépare aux entretiens.",
  "structure ton profil comme un pro.",
];
declare global {
  interface Window {
    snaptr?: (...args: any[]) => void;
  }
}

// Déclaration pour Snapchat Pixel
export default function LandingPage() {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0.20);
  const [isEndOfScroll, setIsEndOfScroll] = useState(false);
  // États pour la conformité RGPD
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix pour les cookies
    const cookieChoice = localStorage.getItem('cookiesAccepted');
    if (cookieChoice) {
      setShowCookieBanner(false);
    }
    
    // Initialiser les pixels si cookies acceptés
    if (cookieChoice === 'true' && typeof window !== 'undefined' && window.snaptr) {
      window.snaptr?.('track', 'PAGE_VIEW');
    }
    
    const phrase = rotatingPhrases[phraseIndex];

    if (!deleting && letterIndex < phrase.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(phrase.slice(0, letterIndex + 1));
        setLetterIndex(letterIndex + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else if (!deleting && letterIndex === phrase.length) {
      const pause = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(pause);
    } else if (deleting && letterIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(phrase.slice(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else if (deleting && letterIndex === 0) {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }
  }, [letterIndex, deleting, phraseIndex]);

  // Fonction pour valider le format du numéro de téléphone
  const isValidPhoneFormat = (value: string) => {
    if (!value) return null; // Si vide, pas de validation
    const regex = /^\d{9}$/;
    return regex.test(value);
  };

  // Fonction pour formater le numéro avec des espaces
  const formatPhoneNumber = (value: string) => {
    // Divise en groupes de 2 chiffres
    let formattedNumber = "";
    for (let i = 0; i < value.length; i++) {
      // Ajoute un espace après chaque groupe de 2 chiffres (sauf à la fin)
      if (i > 0 && i % 2 === 1 && i < value.length) {
        formattedNumber += " ";
      }
      formattedNumber += value[i];
    }
    
    return formattedNumber;
  };

  const validatePhone = (value: string) => {
    // Vérifie que le numéro a 9 chiffres
    const regex = /^\d{9}$/;
    return regex.test(value);
  };
  
  const handleSubmit = async () => {
    if (!firstName.trim()) {
      setError("Merci d'indiquer ton prénom.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Numéro invalide. 9 chiffres attendus après +33");
      return;
    }
    if (!consentAccepted) {
      setError("Veuillez accepter la politique de confidentialité pour continuer.");
      return;
    }
  
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch("https://backnewsloc2.onrender.com/rachel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: firstName,
          tel: `+33${phone}`,
          consentement: true, // Enregistrer le consentement
          date_consentement: new Date().toISOString(), // Date du consentement
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi.");
      }
      
      // Tracking de conversion Snapchat
      if (typeof window !== 'undefined' && window.snaptr) {
        window.snaptr?.('track', 'SIGN_UP', {
          'sign_up_method': 'form',
          'user_phone_number': `+33${phone}`
        });
      }
  
      setSuccessModal(true); // Affiche la modale
      setFirstName("");
      setPhone("");
      setConsentAccepted(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erreur:", error.message);
        setError("Une erreur est survenue. Veuillez réessayer.");
      } else {
        console.error("Erreur inconnue:", error);
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Récupère juste les chiffres bruts
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 9);
    
    // Met à jour l'état avec la valeur brute
    setPhone(rawValue);
  };

  const acceptCookies = () => {
    setShowCookieBanner(false);
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Initialisation Snapchat Pixel
    if (typeof window !== 'undefined' && window.snaptr) {
      window.snaptr?.('track', 'PAGE_VIEW');
    }
  };

  const rejectCookies = () => {
    setShowCookieBanner(false);
    localStorage.setItem('cookiesAccepted', 'false');
  };

  return (
    <>
    <SnapPixel />
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
       {/* Toutes les animations sont dans une seule balise style jsx */}
      <style jsx>{`
      @keyframes bounce-right {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(6px); }
      }
      @keyframes bounce-left {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-6px); }
      }
      .animate-bounce-right {
        animation: bounce-right 1s infinite;
      }
      .animate-bounce-left {
        animation: bounce-left 1s infinite;
      }
        .loader {
          border-color: rgba(0, 0, 0, 0.2);
          border-top-color: #000;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-custom {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(250, 204, 21, 0.7); }
          50% { text-shadow: 0 0 20px rgba(250, 204, 21, 0.9), 0 0 30px rgba(250, 204, 21, 0.6); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        @keyframes glow-green {
          0%, 100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 14px rgba(34, 197, 94, 0.8); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .border-green-500 {
          animation: glow-green 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Hero Section */}

      <section className="py-0 px-6 text-center max-w-3xl mx-auto">
        {/* Announce Bar - à ajouter juste après l'ouverture de la div principale */}
        <div className="absolute left-0 right-0 bg-yellow-400 text-black py-3 mb-5 w-full text-center font-bold z-50 shadow-md">
          <p className="text-sm md:text-base uppercase tracking-wide">
            PRÈS DE 80% DES CV SONT ÉLIMINÉS DÈS LA SÉLECTION ROBOT.
          </p>
        </div>
        <div className="flex justify-center mb-6">
      <div className="relative w-28 h-28 mt-20">
        {/* Cercle extérieur avec dégradé */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 p-[3px] shadow-lg">
        {/* Cercle intérieur contenant l'image */}
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-yellow-300/50">
            <Image 
              src="/rachel.png" 
              alt="Rachel" 
              width={120} 
              height={120} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
    
    {/* Effet de lueur */}
    <div className="absolute -inset-1 rounded-full bg-yellow-400/10 blur-md"></div>
  </div>
</div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"> Laisse <span className="text-yellow-400">Rachel</span> faire ton CV </h1>

        <p className="text-xl md:text-2xl mb-8">
          Rachel <span className="text-yellow-400">{displayedText}</span>
        </p>

        {/* Version desktop avec grille - format iPhone pour les GIFs */}
        <div className="hidden sm:grid grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float max-w-[280px] mx-auto">
              <div className="overflow-hidden rounded-2xl bg-black">
                <Image 
                  src="/parcours1.gif" 
                  alt="Analyse de l'offre" 
                  width={280}
                  height={605}
                  className="w-full aspect-[9/19.5] object-contain" 
                />
              </div>
            </div>
            <p className="text-yellow-400 font-semibold mt-4">1. Structuration de ton parcours</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float max-w-[280px] mx-auto">
              <div className="overflow-hidden rounded-2xl bg-black">
                <Image 
                  src="/analyse.jpg" 
                  alt="Création de CV" 
                  width={280}
                  height={605}
                  className="w-full aspect-[9/19.5] object-contain" 
                />
              </div>
            </div>
            <p className="text-yellow-400 font-semibold mt-4">2. Analyse d&apos;une offre d&apos;emploi</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float max-w-[280px] mx-auto">
              <div className="overflow-hidden rounded-2xl bg-black">
                <Image 
                  src="/cv.jpg" 
                  alt="Quiz entretien" 
                  width={280}
                  height={605}
                  className="w-full aspect-[9/19.5] object-contain" 
                />
              </div>
            </div>
            <p className="text-yellow-400 font-semibold mt-4">3. On créé &quot;LE&quot; CV</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float max-w-[280px] mx-auto">
              <div className="overflow-hidden rounded-2xl bg-black">
                <Image 
                  src="/quiz.jpg" 
                  alt="Quiz entretien" 
                  width={280}
                  height={605}
                  className="w-full aspect-[9/19.5] object-contain" 
                />
              </div>
            </div>
            <p className="text-yellow-400 font-semibold mt-4">4. Préparation à l&apos;entretien</p>
          </div>
        </div>

        {/* Version mobile avec défilement horizontal - format iPhone */}
          {/* Carrousel mobile avec scroll horizontal, barre de progression et hint UX */}
          <div className="sm:hidden relative">
           {/* Barre de progression UX plus visible & stylée */}
          <div className="absolute top-0 left-0 w-full h-2 bg-purple-950/40 z-10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

            {/* Hint de swipe en dessous */}
            <div className="mt-2 flex justify-center items-center gap-2 animate-pulse text-yellow-400 text-sm">
            <span className="hidden mt-5 xs:inline">
                {isEndOfScroll ? "Tu peux revenir" : "Fais glisser pour découvrir"}
              </span>

  {isEndOfScroll ? (
    // Flèche vers la gauche
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 animate-bounce-left mt-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ) : (
    // Flèche vers la droite
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 animate-bounce-right mt-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )}
            </div>
            {/* Conteneur scroll horizontal */}
            <div
              className="overflow-x-auto pb-4 -mx-4 px-4 pt-6 scroll-smooth snap-x snap-mandatory relative"
              onScroll={(e) => {
                const el = e.currentTarget;
                const scrollLeft = el.scrollLeft;
                const maxScrollLeft = el.scrollWidth - el.clientWidth;
                const ratio = scrollLeft / maxScrollLeft;
              
                setScrollProgress(Math.min(Math.max(ratio, 0.2), 1));
                setIsEndOfScroll(scrollLeft + 10 >= maxScrollLeft); // marge de 10px pour éviter les imprécisions
              }}
              
            >
              <div className="flex gap-6 w-max scroll-pl-4">
                {[
                  {
                    gif: "/parcours1.gif",
                    text: "1. On remplit ton parcours",
                    alt: "Analyse de l'offre",
                  },
                  {
                    gif: "/analyse.jpg",
                    text: "2. On analyse une offre",
                    alt: "Analyse d'une offre d'emploi",
                  },
                  {
                    gif: "/cv.jpg",
                    text: "3. On créé \"LE\" CV",
                    alt: "Création du CV",
                  },
                  {
                    gif: "/quiz.jpg",
                    text: "4. On prépare l'entretien",
                    alt: "Préparation à l'entretien",
                  },
                ].map((slide, index) => (
                  <div
                    key={index}
                    className="snap-center shrink-0 w-52 flex flex-col items-center"
                  >
                    <div className="w-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float">
                      <div className="overflow-hidden rounded-2xl bg-black">
                        <Image
                          src={slide.gif}
                          alt={slide.alt}
                          width={208}
                          height={450}
                          className="w-full aspect-[9/19.5] object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-yellow-400 font-semibold text-center mt-3 px-2">
                      {slide.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>


        {/* Section d'appel à l'action plus impactante */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-purple-900/30 via-yellow-500/30 to-purple-900/30 p-6 rounded-xl shadow-lg animate-pulse-custom">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              🎁 Application très bientôt disponible...
            </h3>
            <p className="text-white text-lg md:text-xl font-semibold">
              
              Une <span className="text-yellow-400">semaine gratuite</span> ça t&apos;intéresse ? 
              <br/>
              On t&apos;enverra le code promo par SMS quand l&apos;app sort ! 

            </p>
          </div>
        </div>

        {/* Section formulaire d'inscription */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="relative flex items-center w-full max-w-xs">
            <User className="absolute left-3 text-gray-500" size={18} />
            <Input
              type="text"
              value={firstName}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^a-zA-ZÀ-ÿ\-\s]/g, '')
                  .slice(0, 20);
                setFirstName(value);
              }}
              placeholder="Ton prénom"
              className="pl-10 w-full bg-white text-black"
            />
          </div>
          
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              value={formatPhoneNumber(phone)}
              onChange={handlePhoneInput}
              placeholder="6 12 34 56 07"
              className={`w-full bg-white text-black pl-20 pr-10 transition-all duration-300 
                ${phone && (isValidPhoneFormat(phone) 
                  ? 'border-2 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' 
                  : 'border-2 border-red-500')}`}
              inputMode="numeric"
              pattern="\d*"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Image
                src="/france-flag.png"
                alt="France"
                width={20}
                height={15}
                className="flex-shrink-0"
              />
              <span className="text-black font-semibold mt-0.5">+33</span>
            </div>
            {phone && isValidPhoneFormat(phone) && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
            )}
            {phone && !isValidPhoneFormat(phone) && (
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
            )}
            {!phone && (
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            )}
          </div>

          {/* Ajout de la case à cocher pour le consentement */}
          <div className="flex items-start gap-3 mt-4 w-full max-w-xs">
            <div className="mt-1">
              <input 
                type="checkbox" 
                id="consent" 
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                className="h-4 w-4 accent-yellow-400 cursor-pointer"
              />
            </div>
            <label htmlFor="consent" className="text-sm text-left">
              J&apos;accepte de recevoir par SMS l&apos;offre de lancement et les communications de Jobboost concernant l&apos;application. Voir notre{" "}
              <button 
                id="privacy-policy-btn"
                type="button"
                onClick={() => setShowPrivacyPolicy(true)} 
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                politique de confidentialité
              </button>
            </label>
          </div>

          <div className="mt-10 mb-20 flex justify-center">
          <button
              onClick={handleSubmit}
              disabled={loading}
              className={`relative inline-flex items-center justify-center gap-3 px-8 py-3 rounded-xl ${
                loading ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300'
              } text-black font-bold text-lg shadow-lg transition-all duration-300 group`}
            >
              {loading ? (
                <span className="loader ease-linear rounded-full border-4 border-t-4 border-yellow-500 h-5 w-5"></span>
              ) : (
                "🚀 Je veux être prévenu.e !"
              )}
            </button>
          </div>
        </div>
        {error && <p className="mt-4 text-red-400 font-semibold">{error}</p>}
        
        {/* Modal succès */}
        {successModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white text-black rounded-xl shadow-xl p-8 max-w-sm text-center animate-glow">
              <h2 className="text-2xl font-bold mb-4">🎉 Inscription reçue !</h2>
              <p className="mb-6">
                Tu recevras un SMS dès que l&apos;application sera dispo. À bientôt !
              </p>
              <button
                onClick={() => setSuccessModal(false)}
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 rounded-full font-semibold shadow-md transition"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Modal de politique de confidentialité */}
        {showPrivacyPolicy && <PrivacyPolicyModal onClose={() => setShowPrivacyPolicy(false)} />}
        
        {/* Modal de mentions légales */}
        {showLegalNotice && <MentionsLegales onClose={() => setShowLegalNotice(false)} />}
      </section>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 shadow-lg z-50">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <p>Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic de notre site. Certains cookies nous permettent également de personnaliser notre contenu et nos publicités.</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={rejectCookies}
                variant="outline" 
                className="text-black border-white hover:bg-gray-800 whitespace-nowrap"
              >
                Refuser
              </Button>
              <Button 
                onClick={acceptCookies}
                className="bg-yellow-400 text-black hover:bg-yellow-300"
              >
                Accepter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer avec mentions légales */}
      <footer className="py-6 px-6 bg-gray-900/70 border-t border-gray-800 mt-8">
        <div className="max-w-3xl mx-auto text-center text-sm">
          <p className="text-gray-400 mb-4">
            © {new Date().getFullYear()} Jobboost - Tous droits réservés.
          </p>
          <p className="italic">Entre IA on se comprend - Selma </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-gray-400 hover:text-yellow-400"
            >
              Politique de confidentialité
            </button>
            <button 
              id="legal-notice-btn"
              onClick={() => setShowLegalNotice(true)}
              className="text-gray-400 hover:text-yellow-400"
            >
              Mentions légales
            </button>
            <a href="mailto:contact@jobboost.fr" className="text-gray-400 hover:text-yellow-400">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  </>);
}