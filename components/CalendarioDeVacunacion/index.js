import styles from "./styles.module.css";
import CardEtapaDeVida from "../CardEtapaDeVida/CardEtapaDeVida";

export default function CalendarioDeVacunacion() {
  const etapas = [
    {
      title: "Persona gestante",
      image: "1-PersonaGestante.jpg",
      page: "persona-gestante",
    },
    {
      title: "Persona recién nacida",
      image: "2-PersonaRecienNacida.jpg",
      page: "persona-recien-nacida",
    },
    {
      title: "Hasta el año de vida",
      image: "3-HastaElAnoDeVida.jpg",
      page: "hasta-el-ano-de-vida",
    },
    {
      title: "Hasta los dos años de vida",
      image: "4-HasLosDosAnosDeVida.jpg",
      page: "hasta-los-dos-anos-de-vida",
    },
    {
      title: "5 años",
      image: "5-CincoAnos.jpg",
      page: "cinco-anos",
    },
    {
      title: "11 años",
      image: "6-OnceAnos.jpg",
      page: "once-anos",
    },
    {
      title: "Personas jóvenes y adultas",
      image: "7-PersonasJovenesYAdultas.jpg",
      page: "personas-jovenes-y-adultas",
    },
    {
      title: "A partir de los 65 años",
      image: "8-APartirDeLosSesentaYCincoAnos.jpg",
      page: "a-partir-de-los-65-anos",
    },
  ];
  return (
    <>
      <h1>Calendario Nacional De Vacunación</h1>
      <p>
        Todas las vacunas del Calendario Nacional son obligatorias, gratuitas y
        se aplican en vacunatorios, centros de salud y hospitales públicos del
        país. Nuestro calendario incluye vacunas para todas las etapas de la
        vida, situaciones especiales y grupos específicos.
      </p>
      <h3>Vacunas para cada etapa de la vida</h3>
      <div className={styles.tarjetas}>
        {etapas.map((etapa, i) => (
          <CardEtapaDeVida etapa={etapa} key={i} />
        ))}
      </div>
    </>
  );
}
