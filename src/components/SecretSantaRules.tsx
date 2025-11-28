import React from "react";

interface SecretSantaRulesProps {
  onClose?: () => void;
}

const SecretSantaRules: React.FC<SecretSantaRulesProps> = ({ onClose }) => {
  return (
    <div className="space-y-4 text-sm text-brightSnow">
      {/* Articolo 1 */}
      <section className="space-y-1.5">
        <h3 className="text-sm font-semibold">
          📌 Articolo 1 — Partecipazione
        </h3>
        <p>
            Chi si è iscritto al Secret Santa lo ha fatto in totale libertà oppure
            per pressione sociale travestita da “Dai, che è divertente”.
            Comunque tutti quelli iscritti devono comprare un regalo.
        </p>
        <p>
            Nessuno escluso.
            Nemmeno quello che dice sempre “eh ma io non sono bravo con i regali”.
            Che poi è il primo che porta le cose più strane.
        </p>
      </section>

      {/* Articolo 2 */}
      <section className="mt-8 space-y-1.5">
        <h3 className="text-sm font-semibold">
          💸 Articolo 2 — Budget
        </h3>
        <p>
          Il regalo deve costare tra{" "}
          <span className="font-semibold">10 e 15 euro</span>, che è la cifra
          perfetta per:
        </p>
        <ul className="list-disc list-inside text-sm text-brightSnow/90 space-y-1">
          <li>comprare qualcosa di decente,</li>
          <li>
            ma non così caro da pentirsi di avere degli amici/colleghi.
          </li>
        </ul>
        <p className="text-sm text-brightSnow/90">
          Se spendi 3 euro ti sgamano subito; se ne spendi 30 sembri quello che
          vuole fare il brillante.
        </p>
      </section>

      {/* Articolo 3 */}
      <section className="mt-8 space-y-1.5">
        <h3 className="text-sm font-semibold">
          🧑‍🦲 Articolo 3 — Tipologia del regalo
        </h3>
        <p>
          Il regalo dev&apos;essere una sorta di{" "}
          <span className="italic">Svizzera degli oggetti</span>: neutrale,
          tranquillo, che non offende nessuno (a parte i dipententi Rheinmetall Italia).
        </p>
        <ul className="list-disc list-inside text-sm text-brightSnow/90 space-y-1">
          <li>
            <span className="font-semibold">Unisex</span>: niente “kit da boscaiolo
            alpha” o cose palesemente “rosa confetto vibes”.
          </li>
          <li>
            <span className="font-semibold">Adatto a tutte le età</span>
          </li>
        </ul>
      </section>

      {/* Articolo 4 */}
      <section className="mt-8 space-y-1.5">
        <h3 className="text-sm font-semibold">
          🔥 Articolo 4 — Vietato riciclare roba usata
        </h3>
        <p>
          Regola d&apos;oro:{" "}
          <span className="font-semibold">
            niente riciclo di cose prese da un cassetto oscuro
          </span>{" "}
          in casa.
        </p>
        <p>
          Quindi no, non puoi riciclare il soprammobile che ti ha regalato Nonna Papera nel 2006, che “tanto era ancora
            incartato”.
        </p>
        <p className="text-sm text-brightSnow/90">
          Il regalo deve essere{" "}
          <span className="font-semibold">nuovo</span>. Se puzza di nostalgia,
          naftalina o scaffale Ikea dimenticato, ti sgamiamo subito.
        </p>
      </section>

      {/* Articolo 5 */}
      <section className="mt-8 space-y-1.5">
        <h3 className="text-sm font-semibold">
          🗓️ Articolo 5 — Il giorno dell&apos;estrazione (tipo Natale ma con più ansia e meno calorie)
        </h3>
        <p>
          Il regalo verrà consegnato{" "}
          <span className="font-semibold">il giorno stesso dell&apos;estrazione</span>,
          quindi:
        </p>
        <ul className="list-disc list-inside text-sm text-brightSnow/90 space-y-1">
          <li>
            Vieni con il regalo <span className="font-semibold">incartato</span>.
          </li>
          <li>
            La busta del supermercato non è carta regalo, manco se ci disegni
            sopra un albero.
          </li>
          <li>
            Quando viene estratto il destinatario, è il momento di consegnare il regalo. Mentre lo fai sorridi a quel poveraccio, che già gli è toccato beccarsi il tuo regalo.
          </li>
        </ul>
      </section>

      {/* Articolo 6 */}
      <section className="mt-8 space-y-1.5">
        <h3 className="text-sm font-semibold">
          🎄 Articolo 6 — Annessi e Connessi (ovvero i drammi potenziali)
        </h3>
        <ul className="list-disc list-inside text-sm text-brightSnow/90 space-y-1">
          <li>
            <span className="font-semibold">Ti scordi il regalo?</span> Ti spetta una "Walk of shame" in officina tipo Game of Thrones ma senza scene di nudo sennò quelli del PIT ce se bevono.
          </li>
          <li>
            <span className="font-semibold">Sfori di troppo il budget?</span> Tutti penseranno che vuoi farli sentire poveri o peggio s'accorgeranno di essere poveri e si accolleranno al responsabile per avere un aumento.
            E' una situazione sgradevole per tutti, evita!
          </li>
          <li>
            <span className="font-semibold">Regalo super kitsch?</span> Farai ridere tutti. Tecnicamente è un successo.
          </li>
        </ul>
      </section>

      {/* Conclusione */}
      <section className="mt-8 space-y-1.5">
        <h3 className="text-sm font-semibold">
          ❤️ Conclusione
        </h3>
        <p>
          Lo scopo del Secret Santa è semplice: fare un regalo a caso a qualcuno
          a caso, sperando di non sbagliare taglia, gusto, filosofia di vita e
          rapporto con la camomilla.
        </p>
        <p>
          Se alla fine <span className="font-semibold">tutti ridono</span> e{" "}
          <span className="font-semibold">nessuno piange</span>, è già un Natale
          riuscito. 🎁 Se poi il regalo piace davvero, è un miracolo riconosciuto dal
          Ministero della Magia, ma il premio produzione 2026 rimarrà lo stesso.
        </p>
      </section>
    </div>
  );
};

export default SecretSantaRules;