import React from 'react';
import ArticlePage from '@/components/articlePage';
import QuicknFullArticulo from './quicknFullArticulo';

export const metadata = {
    title: "Quick'n'Full" };

const Home: React.FC = () => {
  return React.createElement(ArticlePage, null,
        React.createElement(QuicknFullArticulo, null ) ) };

export default Home;


