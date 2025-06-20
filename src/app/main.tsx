import React, { useState, useEffect} from "react";
import useIndividualStyling from "@/hooks/useindividualstyling";
import EntradaPreview from "@/components/entradaPreview";

const Main: React.FC = () => {

    const { screenReady, nullBlockStyle, pBold, dynSzGttr } = useIndividualStyling();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 500);
        return () => clearTimeout(timeout); }, [screenReady]);

    return React.createElement('main', { style: { ...nullBlockStyle, padding: dynSzGttr( '5', '4.36', '3.72', '3.08', '2.44', '1.8') + 'rem 0 ' + dynSzGttr('5', '4.36', '3.72', '3.08', '2.44', '1.8') + 'rem 0', margin: 0, transition: 'opacity 500ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },

        [
          { title: 'LayeredTabs',
            href: '/layeredtabsarticulo',
            description: [
              'Presentar contenido en capas navegables a través de pestañas, es una forma tradicional de ordenamiento en páginas y sitios webs. ',
              React.createElement('span', { style: { ...pBold } }, 'LayeredTabs'),
              ' procura hacer muy simple la implementación de esta forma de organizar contenido web, proporciona formatos distintos y apariencia personalizable. Un repositorio demo ya se encuentra disponible y, pronto, un paquete npm instalable.' ] },
          { title: `Quick'n'Full`,
            href: '/quicknfullarticulo',
            description: [
              'Componente constituido por una ',
              React.createElement('span', { style: { ...pBold } }, 'galería de previsualización'),
              ' para cinco imágenes, más una ',
              React.createElement('span', { style: { ...pBold } }, 'galería principal'),
              ' para navegar a través de toda la lista de imágenes y verlas en formato completo. Tiene opciones personalizables y se adapta a las dimensiones del elemento contenedor.' ] }
          ].map(( { title, href, description} ) => EntradaPreview( { title, href, description} ) ),

      ) }
export default Main;
