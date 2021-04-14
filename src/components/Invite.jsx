import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { breakpoints } from '../assets/globalStyles';
import { useTheme } from './hooks/Theme/useTheme';

export const Invite = ({ date }) => {
  const { theme } = useTheme();

  const { maiaraRodrigo } = useStaticQuery(graphql`
    query MaiaraRodrigo {
      maiaraRodrigo: file(relativePath: { eq: "nomes-maiara-rodrigo.png" }) {
        childImageSharp {
          fixed(width: 500, quality: 90) {
            originalName
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  // *Estacionamento no local: R$30,00

  return (
    <StyledInviteWrapper theme={theme}>
      <div className="invite-content">
        <div className="left">
          <div className="one">Com a benção dos seus pais</div>
          <div className="two">
            <StyledBackgroundImage
              className="maiara-e-rodrigo"
              fixed={maiaraRodrigo.childImageSharp.fixed}
            />
          </div>
          <div className="three">convidam para o seu casamento</div>
        </div>
        <div className="right">
          <div className="one">
            {format(new Date(date), 'dd MMMM yyyy', { locale: ptBR })
              .split(' ')
              .join(' de ')}
          </div>
          <div className="two">Sábado, às 19h45</div>
          <div className="three">Mansão Génova</div>
          <div className="four">
            Rua da Mooca, 1415 - <span>Mooca - Sao Paulo - SP</span>
          </div>
          <div className="five">*Estacionamento no local: R$30,00</div>
        </div>
      </div>
    </StyledInviteWrapper>
  );
};

const StyledBackgroundImage = styled(BackgroundImage)`
  background-size: contain !important;
  width: 100% !important;
`;

// styled components
const StyledInviteWrapper = styled.div`
  margin: 100px auto;
  width: 100%;
  max-width: 1100px;
  height: 340px;
  padding: 10px;
  background: white;
  @media ${breakpoints.tabletSmall} {
    height: auto;
    width: 90%;
  }
  .invite-content {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 3px solid ${(props) => props.theme.secondary};
    height: 100%;
    width: 100%;
    z-index: 1;
    @media ${breakpoints.tabletSmall} {
      flex-direction: column;
      padding: 50px 10px;
      overflow: auto;
    }
  }
  * {
    font-weight: 200;
  }
  .left,
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    @media ${breakpoints.tabletSmall} {
      width: 100%;
      height: auto;
    }
  }
  .left {
    z-index: -2;
    background: white;
    flex: 3;
    padding-right: 70px;
    @media ${breakpoints.tabletSmall} {
      flex: 1;
      padding-right: 0;
    }
    .one {
      text-transform: uppercase;
      font-size: 1.5em;
      @media ${breakpoints.mobile} {
        font-size: 1.3em;
      }
    }
    .two {
      margin: 10px 0;
      height: 110px;
      width: 100%;
      @media ${breakpoints.mobile} {
        width: 120%;
        margin: 40px 0;
      }
    }
  }
  .right {
    background: ${(props) => props.theme.bg};
    z-index: -1;
    position: relative;
    flex: 2;
    min-width: 420px;
    @media ${breakpoints.tabletSmall} {
      margin-top: 30px;
      flex: 1;
      background: transparent;
      min-width: auto;
    }
    @media ${breakpoints.mobile} {
      margin-top: 50px;
    }
    .one {
      font-size: 2em;
      font-weight: 400;
    }
    .two {
      font-size: 1.2em;
      margin-bottom: 40px;
      @media ${breakpoints.tabletSmall} {
        margin-bottom: 20px;
      }
      @media ${breakpoints.mobile} {
        margin: 10px 0 30px;
      }
    }
    .three {
      text-transform: uppercase;
      font-size: 1.7em;
      font-weight: 400;
      @media ${breakpoints.tabletSmall} {
        font-size: 1.25em;
      }
      @media ${breakpoints.mobile} {
        margin: 10px 0;
      }
    }
    span {
      display: block;
      @media ${breakpoints.tabletSmall} {
        display: inline-block;
      }
    }
    .five{
      font-size: 0.75em;
      margin-top: 1em;
    }
    &:before {
      content: '';
      display: block;
      background: ${(props) => props.theme.bg};
      height: 500px;
      width: 500px;
      border-radius: 5000px;
      position: absolute;
      left: -50px;
      z-index: -1;
      top: -100px;
      @media ${breakpoints.tabletSmall} {
        height: 3px;
        width: 80%;
        left: 0;
        margin: 0 auto 20px;
        top: 0;
        position: relative;
        border-radius: 0;
      }
    }
  }
`;
