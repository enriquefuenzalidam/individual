import React from 'react';
import ArticlePage from '@/components/articlePage';
import LayeredTabsArticulo from './layeredTabsArticulo';

export const metadata = {
    title: "LayeredTabs" };

const Home: React.FC = () => {
  return React.createElement(ArticlePage,
    { smallheader: true },
    React.createElement(LayeredTabsArticulo, null) ) };

export default Home;

