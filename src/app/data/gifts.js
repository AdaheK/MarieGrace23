export const GIFTS_DATA = [
  { id: 1, secretName: "Cadeau #01", type: "troll", mechanic: "none", label: "Direct", title: "Rien", content: "Piégée!!! il n'y a pas de cadeaux ici mais peut être qu'il y'en aura ailleurs haha" },
  { id: 2, secretName: "Cadeau #02", type: "bon", mechanic: "differences", label: "7 différences", title: "Plaque de cuisson", content: "🎂 Tu viens de gagner une plaque de cuisson afin de pouvoir cuisiner directement des petits plats dans ta chambre", images: { diffLeft: "/images/games/differences-02-a.jpeg", diffRight: "/images/games/differences-02-b.png" } },
  { id: 3, secretName: "Cadeau #03", type: "troll", mechanic: "choice", label: "Choix caché", title: "Pièce symbolique d'1 euro", choices: ["Boîte A", "Boîte B", "Boîte C"], correctChoice: 1, trollChoices: ["Mauvaise boîte. Elle contenait beaucoup d'espoir, mais zéro euro.", "Mauvaise boîte. Elle contenait une fausse promesse financière."], content: "🪙 Tu viens de gagner une pièce symbolique d'1 euro. Grande valeur sentimentale. Faible valeur économique." },
  { id: 4, secretName: "Cadeau #04", type: "souvenir", mechanic: "quiz", label: "Question", title: "Souvenir de Lourdes", question: "Quelle était la couleur de mon pull lors de notre premier date ?", choices: ["Bleu marine", "Gris", "Noir", "Beige"], answer: "Gris", content: "⛪ Je t'offre un petit souvenir de Lourdes vu que tu n'as pas pu faire le déplacement." },
  { id: 5, secretName: "Cadeau #05", type: "emotionnel", mechanic: "puzzle", label: "Chronologie", title: "Portrait sur peinture", events: [{ text: "Notre premier bisou", order: 1 }, { text: "Notre premier date", order: 2 }, { text: "L'officialisation de notre couple", order: 3 }, { text: "On fait Noël et le nouvel an ensemble", order: 4 }, { text: "Tu fêtes tes 23 ans", order: 5 }], content: "🎨 Tu viens de gagner ce magnifique portrait fait de tes propres mains et en option le mien aussi." },
  { id: 6, secretName: "Cadeau #06", type: "troll", mechanic: "roulette", label: "Roulette", title: "Boule d'attiéké", rouletteItems: ["Voyage surprise 🌴", "Sac de luxe 👜", "Boule d'attiéké 🍚", "Spa et Massage🧴", "Le tout dernier Iphone 📱", "Rien du tout 😭", " Un restaurant chic 🍽️", "Un vêtement de ton choix 👕"], fixedResult: 2, content: "🍚 Tu viens de gagner une boule d'attiéké. Cadeau culinaire, symbolique et très sérieux. Allez regale toi ma gourmande." },
  { id: 7, secretName: "Cadeau #07", type: "amour", mechanic: "memory", label: "Memory", title: "Abonnement câlin gratuit à vie", pairs: [{ id: "a", image: "/images/games/memory-1.jpeg" }, { id: "b", image: "/images/games/memory-2.jpeg" }, { id: "c", image: "/images/games/memory-3.jpeg"  }, { id: "d", image: "/images/games/memory-4.jpeg"  }, { id: "e", image: "/images/games/memory-5.jpeg"  }, { id: "f", image: "/images/games/memory-6.jpeg"  }], content: "🤗 Tu viens de gagner un abonnement câlin gratuit à vie. Pas de résiliation possible." },
  { id: 8, secretName: "Cadeau #08", type: "bon", mechanic: "anagram", label: "Anagramme", title: "2 places de ciné", scrambledWord: "ON-PPOCR", answer: "POP-CORN", hint: "En rapport avec le cinéma", content: "🎬 Tu viens de gagner deux places de ciné pour toi et la personne de ton choix (MOI bien sûr)." },
{
  id: 9,
  secretName: "Cadeau #09",
  type: "troll",
  mechanic: "motsmeles",
  label: "Mots mêlés",
  title: "Ritual body cream",

  grid: [
    ["N", "O", "Q", "U", "I", "U", "R", "P"],
    ["I", "N", "T", "E", "N", "S", "I", "F"],
    ["H", "C", "K", "M", "I", "T", "L", "K"],
    ["S", "W", "O", "P", "X", "J", "A", "A"],
    ["O", "O", "A", "R", "E", "H", "I", "Y"],
    ["I", "N", "U", "J", "P", "A", "T", "D"],
    ["N", "Y", "Q", "Q", "R", "S", "U", "E"],
    ["K", "B", "O", "K", "H", "U", "I", "U"],
  ],

  words: ["INTENSIF", "CORPS", "PEAU", "LAIT", "SOIN"],

  content:
    "🧴 Tu viens de gagner une crème de corps Rituals. Parce que prendre soin de soi, c'est important.",
},
  { id: 10, secretName: "Cadeau #10", type: "troll", mechanic: "quiz", label: "Question", title: "Ce pain sucré", question: "Quel est mon plat préféré ?", choices: ["Alloco", "Attiéké poisson", "Pâtes carbo", "Foutou sauce pistache"], answer: "Foutou sauce pistache", content: "🍞 Tu viens de gagner ce pain sucré : (Moi)" },
  { id: 11, secretName: "Cadeau #11", type: "bon", mechanic: "secretcode", label: "Code secret", title: "Restaurant de son choix", question: "Entre le code secret à 4 chiffres pour débloquer ce cadeau.", answer: "3063", hint: "Tes frères - Tes sœurs - Ton mois - Port Lympia...Saint Isidore", content: "🍽️ Tu viens de gagner un restaurant de ton choix. Cette fois, c'est toi qui décides." },
  { id: 12, secretName: "Cadeau #12", type: "bon", mechanic: "phototetris", label: "Tetris photo", title: "Bubble tea", sequenceLength: 6, content: "Tu viens de gagner un bubble tea de la taille que tu veux, histoire de raffraichir un peu ta journée." },
  { id: 13, secretName: "Cadeau #13", type: "amour", mechanic: "colors", label: "Séquence", title: "Massage par moi",photo: "/images/games/photo-tetris-12.jpeg", content: "💆🏾‍♀️ Tu viens de gagner un massage fait par moi même. Durée à négocier. Option : Finition" },
  { id: 14, secretName: "Cadeau #14", type: "troll", mechanic: "candles", label: "23 bougies", title: "Le droit de me faire un bon plat", candles: 23, content: "🍲 Tu viens de gagner le droit incroyable de me faire un bon plat que tu pourras manger avec moi." },
  { id: 15, secretName: "Cadeau #15", type: "bon", mechanic: "catch", label: "Panier", title: "Maillot de Côte d'Ivoire", itemsToCatch: ["⚽", "🇨🇮", "👕"], content: "🇨🇮 Tu viens de gagner un maillot de Côte d'Ivoire afin de mieux supporter les éléphants pendant ce mondial." },
  { id: 16, secretName: "Cadeau #16", type: "bon", mechanic: "sutom", label: "Sutom", title: "Gloss", answer: "HYDRATANT", maxTries: 6, content: "🌸 Tu viens de gagner un gloss DIOR hydratant pour tes lèvres." },
  { id: 17, secretName: "Cadeau #17", type: "emotionnel", mechanic: "shuffle", label: "Où était le cadeau ?", title: "Messages vidéo des proches", boxes: 6, showTime: 2000, video: "/videos/proches.mp4", content: "🎥 Tu viens de gagner une vidéo de quelques proches, essaye de ne pas pleurer." },
  { id: 18, secretName: "Cadeau #18", type: "emotionnel", mechanic: "whoiswho", label: "Qui de nous deux ?", title: "je t'aime", questions: [{ text: "Qui a dit je t'aime en premier ?", answer: "Toi" }, { text: "Qui n'aimes pas faire la vaiselle?", answer: "Nous deux" }, { text: "Qui gnan le plus ?", answer: "Moi" }, { text: "Qui fête son anniversaire aujourd'hui?", answer: "Moi" }], content: "❤️ Tu viens de gagner un JE T'AIME tout simplement." },
  { id: 19, secretName: "Cadeau #19", type: "bon", mechanic: "casino", label: "Jackpot", title: "Séance corps complet à la salle", winAttempt: 23, symbols: ["💪", "🏋️", "🔥", "💖", "🎰"], content: "🏋️ Tu viens de gagner une séance corps complet à la salle avec le meilleur coach (MOI)." },
  {
  id: 20,
  secretName: "Cadeau #20",
  type: "musique",
  mechanic: "texttrous",
  label: "Paroles trouées",
  title: "Parfum Yara Candy",

  lyrics: `
Yo, Jouda
Précis comme le sabre d'un _____
Si tu marches with me babe, c'est tout droit
La carte est black, disons "Alléluia"

Baby, j'ai les _____, vini
Vini, vini, pas timide
Ride en Lamborghini
Chérie nou sou sa _____

Pas mêlé, pas mêlé
_____ , bébé
Pas mêlé, pas mêlé
Chérie, nou sou sa kampé
`,

  answers: ["YAKUZA", "TALES", "KAMPÉ", "FULL BBL"],
  backgroundAudio: "/sounds/4kampe.mp3",

  content:
    "🎶 Ahh oue tu connais parfaitement les paroles. Tu viens donc de gagner un parfum Yara, j'espère qu'il te plaira"
},
  { id: 21, secretName: "Cadeau #21", type: "emotionnel", mechanic: "connectdots", label: "Relie les points", title: "Message vocal de moi", points: 23, shape: "heart", voiceAudio: "/sounds/message.mp3", content: "🎙️ Tu arrives vers la fin, j'espère que jusque là tous les cadeaux t'ont plu. On va passer aux deux derniers cadeaux." },
  { id: 22, secretName: "Cadeau #22", type: "surprise", mechanic: "qrcode", label: "QR Code", title: "Carte cadeau Zara de 70 euros", qrText: "Dis ce mot à un de nos proches : Quand tu fais ça la c'est doux deh", answer: "Allan est le meilleur mec du monde!!!", content: "Pour l'avant dernier cadeau, tu viens de gagner une carte cadeau Zara de 70 euros." },
  { id: 23, secretName: "Cadeau #23", type: "surprise", mechanic: "cemantix", label: "Final", title: "Une New balance", answer: "telephone", semanticHints: [{ word: "cadeau", score: 18 }, { word: "technologie", score: 42 }, { word: "appel", score: 76 }, { word: "telephone", score: 100 }], countdown: 23, content: "Tu viens de gagner une paire de baskets New Balance." },
];
