"use client"
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Check, Phone, User } from "lucide-react";
import Image from "next/image";

const rotatingPhrases = [
  "fait ton CV pour chaque offre",
  "corrige tes erreurs.",
  "reformule mieux.",
  "te prépare aux entretiens.",
  "structure ton profil comme un pro.",
];

export default function LandingPage() {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
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

  const handleSubmit = () => {
    if (!firstName.trim()) {
      setError("Merci d&apos;indiquer ton prénom.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Numéro invalide. 9 chiffres attendus après +33");
      return;
    }
    setError("");
    alert(`Prénom: ${firstName}, Téléphone: +33${phone}`); // à remplacer par ton enregistrement Firebase
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Récupère juste les chiffres bruts
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 9);
    
    // Met à jour l'état avec la valeur brute
    setPhone(rawValue);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
       {/* Toutes les animations sont dans une seule balise style jsx */}
      <style jsx>{`
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
        .border-green-500 {
          animation: glow-green 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="py-12 px-6 text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400">
            <Image src="/rachel.png" alt="Rachel" width={120} height={120} />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"> Laisse Rachel faire ton CV 🚀 </h1>

        <p className="text-xl md:text-2xl mb-8">
          Rachel <span className="text-yellow-400">{displayedText}</span>
        </p>

        {/* Version desktop avec grille - format iPhone pour les GIFs */}
        <div className="hidden sm:grid grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float max-w-[280px] mx-auto">
              <div className="overflow-hidden rounded-2xl bg-black">
                <Image 
                  src="/Parcours.gif" 
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
                  src="/Analyse.gif" 
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
                  src="/CV.gif" 
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
                  src="/quiz-entretien.gif" 
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
        <div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 w-max snap-x snap-mandatory scroll-pl-4">
            <div className="snap-center shrink-0 w-52 flex flex-col items-center">
              <div className="w-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image 
                    src="/Parcours.gif" 
                    alt="Analyse de l'offre" 
                    width={208}
                    height={450}
                    className="w-full aspect-[9/19.5] object-contain" 
                  />
                </div>
              </div>
              <p className="text-yellow-400 font-semibold text-center mt-3">1. On remplit ton parcours</p>
            </div>
            <div className="snap-center shrink-0 w-52 flex flex-col items-center">
              <div className="w-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image 
                    src="/Analyse.gif" 
                    alt="Analyse de l'offre d'emploi" 
                    width={208}
                    height={450}
                    className="w-full aspect-[9/19.5] object-contain" 
                  />
                </div>
              </div>
              <p className="text-yellow-400 font-semibold text-center mt-3">2. On analyse une offre</p>
            </div>
            <div className="snap-center shrink-0 w-52 flex flex-col items-center">
              <div className="w-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image 
                    src="/CV.gif" 
                    alt="Quiz entretien" 
                    width={208}
                    height={450}
                    className="w-full aspect-[8.8/19.2] object-contain" 
                  />
                </div>
              </div>
              <p className="text-yellow-400 font-semibold text-center mt-3">3. On créé &quot;LE&quot; CV</p>
            </div>
            <div className="snap-center shrink-0 w-52 flex flex-col items-center">
              <div className="w-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-600 p-[2px] rounded-2xl shadow-xl animate-float">
                <div className="overflow-hidden rounded-2xl bg-black">
                  <Image 
                    src="/quiz-entretien.gif" 
                    alt="Quiz entretien" 
                    width={208}
                    height={450}
                    className="w-full aspect-[8.8/19.2] object-contain" 
                  />
                </div>
              </div>
              <p className="text-yellow-400 font-semibold text-center mt-3">4. On prépare l&apos;entretien</p>
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

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSubmit}
              className="relative inline-flex items-center gap-3 px-8 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg shadow-lg transition-all duration-300 group"
            >
              <span className="absolute -inset-1 rounded-xl bg-yellow-400 blur opacity-30 group-hover:scale-105 transition-all duration-300"></span>
              🚀 Je veux être prévenu.e !
            </button>
          </div>
        </div>
        {error && <p className="mt-4 text-red-400 font-semibold">{error}</p>}
      </section>
    </div>
  );
}