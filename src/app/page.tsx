"use client";
import React from 'react';
import Header from "@/components/header";
import Main from './main';
import Footer from "@/components/footer";

const Home: React.FC = () => {

  return React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', height:'auto', width: '100%', backgroundColor: 'white', background: 'linear-gradient( 54deg, white 15%, #fffaf4 38%, white)' } },
    React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', maxWidth: '64rem', height:'auto', width: '100%', } },
      React.createElement(Header, null),
      React.createElement(Main,  null),
      React.createElement(Footer, null) ) ) }

export default Home;
