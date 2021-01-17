import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

import { colors, breakpoints } from '../assets/globalStyles';
import { TextSection } from '../components/TextSection';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const Form = (props) => {
  const [success, setSuccess] = React.useState(false);
  const [name, setName] = React.useState(props.name);
  const [eMail, setEMail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [going, setGoing] = React.useState();
  const [botField, setBotField] = React.useState();

  const handleChange = (e) => {
    const { name: targetName, value: targetValue } = e.target;
    if (targetName === 'bot-field') {
      setBotField(targetValue);
    } else if (targetName === 'name') {
      setName(targetValue);
    } else if (targetName === 'phone') {
      setPhone(targetValue);
    } else if (targetName === 'e_mail') {
      setEMail(targetValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        success,
        name,
        eMail,
        phone,
        going,
        botField,
      }),
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
    success_button = 'Default success_button',
    success_subtitle = 'Default success_subtitle',
    success_title = 'Default success_title',
    name: labelName,
    namePlaceholder,
    eMailPlaceholder,
    phonePlaceholder,
    e_mail,
    phone: phoneLabel,
    not_going: not_goingLabel,
    maybe: maybeLabel,
    going: goingLabel,
  } = props.form;

  return (
    <>
      <TextSection
        title={props.form.title}
        subTitle={props.form.sub_title}
        description={props.form.description}
      />
      <StyledFormHolder>
        {success ? (
          <StyledSuccess>
            <div>
              <span>{success_title.replace('{name}', name)}</span>
              {success_subtitle}
              <StyledButton onClick={handleFormBack}>{success_button}</StyledButton>
            </div>
          </StyledSuccess>
        ) : (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <form
            name="confirmation"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="confirmation" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" onChange={handleChange} />
              </label>
            </p>
            <StyledLabel>
              {labelName} *
              <StyledInput
                required
                type="text"
                name="name"
                placeholder={namePlaceholder || labelName}
                onChange={handleChange}
                value={name}
              />
            </StyledLabel>
            <StyledLabel>
              {phoneLabel} *
              <StyledInput
                required
                type="text"
                name="phone"
                placeholder={phonePlaceholder || phoneLabel}
                onChange={handleChange}
                value={phone}
              />
            </StyledLabel>
            <StyledLabel>
              {e_mail}
              <StyledInput
                type="text"
                name="e_mail"
                placeholder={eMailPlaceholder || e_mail}
                onChange={handleChange}
                value={eMail}
              />
            </StyledLabel>

            <StyledButton type="submit" onClick={() => setGoing('yes')}>
              <div>{goingLabel}</div>
            </StyledButton>

            <StyledButton type="submit" onClick={() => setGoing('maybe')}>
              <div>{maybeLabel}</div>
            </StyledButton>

            <StyledButton type="submit" onClick={() => setGoing('no')}>
              <div>{not_goingLabel}</div>
            </StyledButton>
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
  background: white;
  padding: 2em 2em 0.5em;
  transition: all 0.5s ease;
  @media ${breakpoints.tablet} {
    width: calc(75% + 3em);
    padding: 1.5em 1.5em 0.5em;
  }
  @media ${breakpoints.mobileSmall} {
    width: 100%;
    padding: 1em 0.5em 0.5em;
  }
`;

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 1.5em;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${colors.primary};
  padding: 10px;
  margin-top: 0.7em;
  &::placeholder {
    color: #d0d0d0;
    opacity: 1;
    font-size: 0.9em;
  }
`;

const StyledButton = styled.button`
  margin: 1em auto 1.5em;
  position: relative;
  background: ${colors.primary};
  color: white;
  cursor: pointer;
  width: 100%;
  padding: 5px;
  border: 0;
  text-decoration: none;
  transition: all 0.5s ease;
  &:hover {
    background: #234a47;
  }
  div {
    color: white;
    text-align: center;
    padding: 0.65em;
    border: 1px solid;
  }
`;

const StyledSuccess = styled.div`
  div {
    font-size: 0.9em;
    span {
      display: block;
      color: #2b5854;
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
