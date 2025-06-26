"use client";
import React from 'react';
import ArticlePage from '@/components/articlePage';
import useIndividualStyling from '@/hooks/useindividualstyling';

import EntradaPreview from '@/components/entradaPreview';
import entradasPreviews from '@/data/entradasPreviews.json'

type DescriptionItem = string | { bold: string };

interface EntradaData {
  title: string;
  href: string;
  description: DescriptionItem[]; }

const Home: React.FC = () => {

  const { pBold } = useIndividualStyling();

  const parseDescription = (descriptionArray: DescriptionItem[], pBold: React.CSSProperties): React.ReactNode[] =>
    descriptionArray.map((item, i) => typeof item === 'string' ? item : React.createElement('span', { key: i, style: { ...pBold } }, item.bold) );

  return React.createElement(ArticlePage, null, 

    (entradasPreviews as EntradaData[]).map(({ title, href, description }) =>
      React.createElement( React.Fragment, { key: href },
        EntradaPreview({ title, href, description: parseDescription(description, pBold) } ) ) )
    /*
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
          ].map(( { title, href, description} ) => EntradaPreview( { title, href, description} ) ) */
   ) };

export default Home;
