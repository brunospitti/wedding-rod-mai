import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { Theme } from '../components/hooks/Theme/Theme';
import { Name } from '../components/hooks/Name/Name';
import { Layout } from '../components/helpers/Layout';

const NotFoundPage = () => (
  <Theme>
    <Name>
      <Layout>
        <Styled404Page>
          <Styled404Text>
            <h2>Esse é um site com uma página só.</h2>
            <p>
              Volta pra ela clicando <Link to="/">aqui</Link>
            </p>
          </Styled404Text>
        </Styled404Page>
      </Layout>
    </Name>
  </Theme>
);

const Styled404Page = styled.section`
  h1 {
    padding: 0;
    font-size: 33px;
    letter-spacing: 25px;
    width: 85%;
    margin: 0 auto 2vh;
  }
`;

const Styled404Text = styled.div`
  padding: 23.4vh 0;
  text-align: center;
  h2 {
    margin-bottom: 2vh;
  }
`;

export default NotFoundPage;
