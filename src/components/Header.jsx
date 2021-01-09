import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

export const Header = ({ language, name }) => (
  <StyledHeader>
    <StyledFlags>
      <Link to={`/?lang=br${name ? `&name=${encodeURIComponent(name)}` : ''}`}>
        <div className={`flag ${language === 'br' ? 'active' : ''}`} id="brazil">
          <img src="/img/brazil-flag.jpg" alt="Brazilian Portuguese" />
          <span>br</span>
        </div>
      </Link>
      <Link to={`/?lang=en${name ? `&name=${encodeURIComponent(name)}` : ''}`}>
        <div className={`flag ${language === 'en' ? 'active' : ''}`} id="ireland">
          <img src="/img/ireland-flag.jpg" alt="English" />
          <span>en</span>
        </div>
      </Link>
    </StyledFlags>
  </StyledHeader>
);

// styled components
const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  display: block;
  background: #ffffff57;
  border-radius: 0 0 0 6px;
  width: 138px;
  height: 73px;
  padding: 0.6em 1em;
`;

const StyledFlags = styled.div`
  display: flex;
  margin-left: auto;
  a {
    text-decoration: none;
  }
  .flag {
    text-align: center;
    padding: 0.25em;
    background: transparent;
    transition: all 0.2s ease;
    &#brazil {
      margin-right: 0.95em;
    }
    img {
      width: 30px;
      margin-top: 2.5px;
      display: block;
      transition: all 0.2s ease;
    }
    span {
      font-size: 0.8em;
      line-height: 0.8em;
      margin-top: 0.5em;
      display: block;
      transition: all 0.2s ease;
    }
    &.active {
      background: rgba(255, 255, 255, 0.6);
      img {
        width: 35px;
        margin-top: 0px;
      }
      span {
        font-weight: bold;
      }
    }
    &:hover {
      img {
        width: 35px;
        margin-top: 0px;
      }
      span {
        font-weight: 400;
      }
    }
  }
`;
