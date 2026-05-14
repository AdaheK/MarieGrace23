export default function QRConsignePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fff5fb] px-6 text-[#3b1024]">
      <div className="max-w-xl rounded-[2rem] bg-white border border-pink-100 p-8 text-center shadow-xl">
        <h1 className="text-3xl font-black mb-4">Mission secrète 💌</h1>

        <p className="text-lg leading-relaxed">
          Pour trouver le mot de passe, envoie ce message à l’un de tes proches :
        </p>

        <div className="my-6 rounded-2xl bg-pink-50 border border-pink-200 p-5 font-black text-xl">
          “Quand tu fais ça la c’est doux deh”
        </div>

        <p className="text-[#6f2948]/80">
          Si tu l’envoies à la bonne personne, elle te donnera le mot de passe.
        </p>
      </div>
    </main>
  );
}