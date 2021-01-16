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
  const [number, setNumber] = React.useState(0);
  const [pickUpLocation, setPickUpLocation] = React.useState('');
  const [botField, setBotField] = React.useState();

  const handleChange = (e) => {
    const { name: targetName, value: targetValue } = e.target;
    if (targetName === 'bot-field') {
      setBotField(targetValue);
    } else if (targetName === 'name') {
      setName(targetValue);
    } else if (targetName === 'number') {
      setNumber(targetValue);
    }
  };

  const handleRadioChange = (e) => {
    setPickUpLocation(e.target.value);
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
        number,
        pickUpLocation,
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
    setNumber(0);
    setPickUpLocation('');
  };

  const {
    name: labelName,
    button: buttonLabel,
    location,
    seats,
    success_button,
    success_subtitle,
    success_title,
  } = props.form;

  return (
    <StyledFormHolder>
      <TextSection
        title={props.form.title}
        subTitle={props.form.sub_title}
        description={props.form.description}
      />
      {success ? (
        <StyledSuccess>
          <div>
            <span>{success_title.replace('{name}', name)}</span>
            {success_subtitle}
            <StyledButton onClick={handleFormBack}>{success_button}</StyledButton>
          </div>
        </StyledSuccess>
      ) : (
        <form
          name="confirmation"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="confirmation" />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <StyledLabel>
            {labelName}
            <StyledInput
              required
              type="text"
              name="name"
              placeholder={labelName}
              onChange={handleChange}
              value={name}
            />
          </StyledLabel>
          <StyledLabel>
            {seats}
            <StyledInput
              required
              min="0"
              type="number"
              name="number"
              placeholder={seats}
              onChange={handleChange}
              value={number}
            />
          </StyledLabel>
          <StyledLabel>{location}</StyledLabel>
          <StyledRadiosHolder>
            <label htmlFor="vila-prudente">
              <input
                type="radio"
                id="vila-prudente"
                name="pickUpLocation"
                value="vila-prudente"
                onChange={handleRadioChange}
              />
              Metrô Vila Prudente
            </label>
            <label htmlFor="orlando-chiodi">
              <input
                type="radio"
                id="orlando-chiodi"
                name="pickUpLocation"
                value="orlando-chiodi"
                onChange={handleRadioChange}
              />
              Rua Orlando Chiodi
            </label>
            <label htmlFor="santo-andre">
              <input
                type="radio"
                id="santo-andre"
                name="pickUpLocation"
                value="santo-andre"
                onChange={handleRadioChange}
              />
              Santo André
            </label>
          </StyledRadiosHolder>

          {name != '' && number > 0 && pickUpLocation != '' && (
            <StyledButton type="submit">
              <div>{buttonLabel}</div>
            </StyledButton>
          )}
        </form>
      )}
      <StyledFlower04 fluid={props.flowerImage} />
    </StyledFormHolder>
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

const StyledRadiosHolder = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  @media ${breakpoints.mobileSmall} {
    flex-direction: column;
  }
  label {
    display: flex;
    align-items: baseline;
    @media ${breakpoints.mobileSmall} {
      &:not(:last-child) {
        margin-bottom: 0.5em;
      }
    }
    input {
      margin: 0 0.5em 0 0;
    }
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
