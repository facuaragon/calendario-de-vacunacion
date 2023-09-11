import ALosCincoAnos from "@/components/VacunasPorEtapaDeVida/ALosCincoAnos/ALosCincoAnos";
import ALosOnceAnos from "@/components/VacunasPorEtapaDeVida/ALosOnceAnos/ALosOnceAnos";
import APartirDeLosSesentaYCincoAnos from "@/components/VacunasPorEtapaDeVida/APartirDeLosSesentaYCincoAnos/APartirDeLosSesentaYCincoAnos";
import HastaElAnoDeVida from "@/components/VacunasPorEtapaDeVida/HastaElAnoDeVida";
import HastaLosDosAnosDeVida from "@/components/VacunasPorEtapaDeVida/HastaLosDosAnosDeVida";
import PersonaGestante from "@/components/VacunasPorEtapaDeVida/PersonaGestante";
import PersonaRecienNacida from "@/components/VacunasPorEtapaDeVida/PersonaRecienNacida";
import PersonasJovenesYAdultas from "@/components/VacunasPorEtapaDeVida/PersonasJovenesYAdultas/PersonasJovenesYAdultas";

export default function EtapasDeVida(props) {
  const etapas = [
    {
      page: "persona-gestante",
      component: <PersonaGestante />,
    },
    {
      page: "persona-recien-nacida",
      component: <PersonaRecienNacida />,
    },
    {
      page: "hasta-el-ano-de-vida",
      component: <HastaElAnoDeVida />,
    },
    {
      page: "hasta-los-dos-anos-de-vida",
      component: <HastaLosDosAnosDeVida />,
    },
    {
      page: "cinco-anos",
      component: <ALosCincoAnos />,
    },
    {
      page: "once-anos",
      component: <ALosOnceAnos />,
    },
    {
      page: "personas-jovenes-y-adultas",
      component: <PersonasJovenesYAdultas />,
    },
    {
      page: "a-partir-de-los-65-anos",
      component: <APartirDeLosSesentaYCincoAnos />,
    },
  ];

  const selectedEtapa = etapas.find(
    (etapa) => etapa.page === props.params.etapa
  );

  return <>{selectedEtapa && selectedEtapa.component}</>;
}
export const getServerSideProps = async (context) => {
  const { etapa } = context.params;
  return { props: etapa };
};
