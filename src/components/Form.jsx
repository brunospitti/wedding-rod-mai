import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

import { colors, breakpoints } from '../assets/globalStyles';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      name: this.props.name,
      number: 0,
      pickUpLocation: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRadioChange = (e) => {
    this.setState({ pickUpLocation: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => this.handleSuccess())
      .catch((err) => this.handleError(err));
  };

  handleSuccess = () => {
    this.setState({ success: true });
  };

  handleError = (err) => {
    console.log(`Error -> ${err}`);
  };

  handleFormBack = () => {
    this.setState({
      name: '',
      number: 0,
      pickUpLocation: '',
      success: false,
    });
  };

  render() {
    const {
      name: labelName,
      button: buttonLabel,
      location,
      seats,
      success_button,
      success_subtitle,
      success_title,
    } = this.props.formInfo;

    return (
      <StyledFormHolder>
        {this.state.success ? (
          <StyledSuccess>
            <div>
              <span>{success_title.replace('{name}', this.state.name)}</span>
              {success_subtitle}
              <StyledButton onClick={this.handleFormBack}>{success_button}</StyledButton>
            </div>
          </StyledSuccess>
        ) : (
          <form
            name="shuttleVan"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="shuttleVan" />
            <p hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <StyledLabel>
              {labelName}
              <StyledInput
                required
                type="text"
                name="name"
                placeholder={labelName}
                onChange={this.handleChange}
                value={this.state.name}
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
                onChange={this.handleChange}
                value={this.state.number}
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
                  onChange={this.handleRadioChange}
                />
                Metrô Vila Prudente
              </label>
              <label htmlFor="orlando-chiodi">
                <input
                  type="radio"
                  id="orlando-chiodi"
                  name="pickUpLocation"
                  value="orlando-chiodi"
                  onChange={this.handleRadioChange}
                />
                Rua Orlando Chiodi
              </label>
              <label htmlFor="santo-andre">
                <input
                  type="radio"
                  id="santo-andre"
                  name="pickUpLocation"
                  value="santo-andre"
                  onChange={this.handleRadioChange}
                />
                Santo André
              </label>
            </StyledRadiosHolder>

            {this.state.name != '' &&
              this.state.number > 0 &&
              this.state.pickUpLocation != '' && (
                <StyledButton type="submit">
                  <div>{buttonLabel}</div>
                </StyledButton>
              )}
          </form>
        )}
        <StyledFlower04 fluid={this.props.flowerImage} />
      </StyledFormHolder>
    );
  }
}

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
