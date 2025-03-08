"use client";
import React from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProntoVistaArticle from './prontoVistaElement';

const Home: React.FC = () => {
  return React.createElement('main', { style: { position: 'relative', width: '100%', maxWidth: '64rem', transition: 'all 300ms ease-in-out' } },
    React.createElement(Header, null),
    React.createElement(ProntoVistaArticle, null ),
    React.createElement(Footer, null)
   )
}

export default Home;

