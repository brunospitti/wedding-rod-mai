import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import BackgroundImage from 'gatsby-background-image';

import { breakpoints } from '../assets/globalStyles';
import { TextSection } from '../components/TextSection';

import { useName } from './hooks/Name/useName';
import { useTheme } from './hooks/Theme/useTheme';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const Form = (props) => {
  const { theme } = useTheme();
  const { name: nameFromContext } = useName();

  const [success, setSuccess] = React.useState(false);
  const [name, setName] = React.useState(nameFromContext);
  const [eMail, setEMail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [going, setGoing] = React.useState();
  const [botField, setBotField] = React.useState();

  const subTitleDisplay = props.form.subTitle.replace('{name}', nameFromContext || 'Hey');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const submitValue = {
      'form-name': form.getAttribute('name'),
      success,
      name,
      eMail,
      phone,
      going,
      botField,
    };

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(submitValue),
    })
      .then(() => handleSuccess())
      .catch((err) => handleError(err));
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleError = (err) => {
    console.log(`Error -> ${err}`);
  };

  const handleFormBack = () => {
    setSuccess(false);
    setName('');
    setEMail('');
    setPhone('');
  };

  const {
    title,
    description,
    nameLabel,
    eMailLabel,
    phoneLabel,
    namePlaceholder,
    eMailPlaceholder,
    phonePlaceholder,
    notGoing: notGoingLabel,
    maybe: maybeLabel,
    going: goingLabel,
    successTitle,
    successSubTitle,
    successButtonText,
  } = props.form;

  return (
    <>
      <TextSection title={title} subTitle={subTitleDisplay} description={description} />
      <StyledFormHolder theme={theme}>
        {success ? (
          <div className="success">
            <span>{successTitle.replace('{name}', name)}</span>
            {successSubTitle}
            <div className="buttons-holder">
              <button className="primary" onClick={handleFormBack}>
                {successButtonText}
              </button>
            </div>
          </div>
        ) : (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <form
            name="confirmation"
            method="post"
            data-netlify-honeypot="bot-field"
            data-netlify="true"
            onSubmit={handleSubmit}
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="confirmation" />
            <p hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={(e) => setBotField(e.target.value)} />
              </label>
            </p>
            <label>
              {nameLabel} *
              <input
                required
                type="text"
                name="name"
                placeholder={namePlaceholder || nameLabel}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
            <label>
              {phoneLabel} *
              <input
                required
                type="text"
                name="phone"
                placeholder={phonePlaceholder || phoneLabel}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </label>
            <label>
              {eMailLabel}
              <input
                type="text"
                name="eMail"
                placeholder={eMailPlaceholder || eMailLabel}
                onChange={(e) => setEMail(e.target.value)}
                value={eMail}
              />
            </label>

            <input hidden type="hidden" name="going" />
            <div className="buttons-holder">
              <button
                className="secondary"
                type="submit"
                onClick={() => setGoing('maybe')}
              >
                {maybeLabel}
              </button>

              <button className="primary" type="submit" onClick={() => setGoing('yes')}>
                {goingLabel}
              </button>

              <button className="secondary" type="submit" onClick={() => setGoing('no')}>
                {notGoingLabel}
              </button>
            </div>
          </form>
        )}
        <StyledFlower04 fluid={props.flowerImage} />
      </StyledFormHolder>
    </>
  );
};

const StyledFormHolder = styled.div`
  position: relative;
  width: calc(50% + 4em);
  margin: 5em auto 10em;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.7);
  padding: 2em 2em 0.5em;
  transition: all 0.5s ease;
  border-radius: 10px;
  @media ${breakpoints.tablet} {
    width: calc(75% + 3em);
    padding: 1.5em 1.5em 0.5em;
  }
  @media ${breakpoints.mobileSmall} {
    width: 100%;
    padding: 1em 0.5em 0.5em;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 1.5em;
    input:not([type='hidden']) {
      width: 100%;
      border: 1px solid ${({ theme }) => theme.secondary};
      padding: 10px;
      margin-top: 0.7em;
      border-radius: 5px;
      &::placeholder {
        color: #d0d0d0;
        opacity: 1;
        font-size: 0.9em;
      }
    }
  }

  .buttons-holder {
    display: flex;
    button {
      flex: 1;
      margin: 1em 0 1.5em;
      position: relative;
      cursor: pointer;
      padding: 12px 5px;
      border: 0;
      transition: all 0.5s ease;
      border-radius: 10px;
      &:not(:first-child):not(:last-child) {
        margin-left: 10px;
        margin-right: 10px;
      }
      &.primary {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.primaryContrast};
        border: 3px solid ${({ theme }) => theme.primary};
        &:hover {
          border-color: ${({ theme }) => theme.secondary};
        }
      }
      &.secondary {
        background: transparent;
        color: ${({ theme }) => theme.primary};
        border: 1px solid ${({ theme }) => theme.primary};
        &:hover {
          background: ${({ theme }) => darken(0.05, theme.bg)};
          color: ${({ theme }) => theme.text};
          border-color: ${({ theme }) => theme.text};
        }
      }
    }
  }

  .success {
    font-size: 0.9em;
    span {
      display: block;
      color: ${({ theme }) => theme.primary};
      font-size: 1.2em;
      margin-bottom: 0.5em;
    }
  }
`;

const StyledFlower04 = styled(BackgroundImage)`
  display: block;
  width: 120px;
  height: 160px;
  bottom: -30%;
  right: -13%;
  position: absolute !important;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media ${breakpoints.mobile} {
    bottom: -20%;
    right: -10%;
    height: 120px;
    width: 90px;
  }
`;
