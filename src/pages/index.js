import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { space } from 'styled-system';
import Layout from '../components/layout';
import About from '../components/About';
import Contact from '../components/Contact';
import Separator from '../components/Separator';
import Projects from '../components/Projects';
import Meta from '../components/Meta';
import linkStyle from '../styles/link';
import MeOnTheInternet from '../components/MeOnTheInternet';

const Section = styled.section`
  ${space}
`;

const IndexPage = ({ location }) => (
  <Layout pathname={location.pathname}>
    <Meta title="Marcell Monteiro Cruz." />
    <Section pt={[3, 4, null, null, 5]}>
      <About />
    </Section>
    <Section pb={20}>
      <Link 
        style={linkStyle}
        to="/resume">
        More info →
      </Link>
    </Section>
    <Section>
      <Contact />
    </Section>
    <Separator my={[4, 5]} width={['50%', '25%']} height={24} />
    <Projects />
    <Separator my={[4, 5]} width={['50%', '25%']} height={24} />
    <Section>
      <MeOnTheInternet />
    </Section>
    <Separator my={[4, 5]} width={['50%', '25%']} height={24} />
  </Layout>
);

export default IndexPage;
