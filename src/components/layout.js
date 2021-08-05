/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { space, maxWidth } from 'styled-system';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import linkStyle from '../styles/link';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;700&family=Fira+Sans:wght@400;700&display=swap');
  html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; } h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal; } ul { list-style: none; } button, input, select, textarea { margin: 0; } html { box-sizing: border-box; } *, *:before, *:after { box-sizing: inherit; } img, iframe, embed, object, video { height: auto; max-width: 100%; } audio { max-width: 100%; } iframe { border: 0; } table { border-collapse: collapse; border-spacing: 0; } td, th { padding: 0; text-align: left; }          
  body {
    font-family: 'Fira Sans', sans-serif;
    color: #fafafa;
    /* font-size:12px; */
  }
  a, a:link {
    text-decoration: none;
    color: #44bce3;
    &:hover {
      color: #3cf0b9;
    }
  }
  p,ul,ol,li {
    line-height: 1.6;
    font-family: 'Fira Mono', monospace;
  }
`;

const Body = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  background: #16161d;
  position: relative;
`;

const Container = styled.div.attrs(() => ({
  px: [3, 4],
  py: [4, 5],
}))`
  ${space}
  max-width: 768px;
  ${maxWidth}
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1440px',
};

const Layout = ({ children, maxWidth, pathname }) => (
  <ThemeProvider
    theme={{
      breakpoints: Object.values(breakpoints),
    }}
  >
    <>
      <GlobalStyle />
      <Body>
        <Container maxWidth={maxWidth}>
          {pathname !== '/' &&
            <Link 
              style={linkStyle}
              to="/">
              ← Back
            </Link>
          }
          <main>{children}</main>
        </Container>
      </Body>
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  discreet: PropTypes.bool,
};

Layout.defaultProps = {
  discreet: false,
};

export default Layout;
