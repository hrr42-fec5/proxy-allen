import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Image from './Image.jsx';
import Single from './Single.jsx';
import Multi from './Multi.jsx';
import { Facebook } from 'styled-icons/boxicons-logos/Facebook';
import { ScTwitter } from 'styled-icons/evil/ScTwitter';
import { Mail } from 'styled-icons/octicons/Mail';
import { DotsHorizontalRounded } from 'styled-icons/boxicons-regular/DotsHorizontalRounded';
import { PinterestAlt } from 'styled-icons/boxicons-logos/PinterestAlt';
import { SocialGooglePlus } from 'styled-icons/typicons/SocialGooglePlus';
import { Tumblr } from 'styled-icons/boxicons-logos/Tumblr';


const Container = styled.div`
  width: 100%;
  background-color: #fff;
  text-align: center;
  white-space: nowrap;
  top: 0;
  left: 0;
  position: relative;
`;
Container.displayName = 'container';

const Carousel = styled.div`
  height: 384px;
  position: relative;
  overflow: hidden;
  display: flex;
`;
Carousel.displayName = 'carousel';

const Button = styled.button`
  background-color: rgba(16,24,32,.75);
  height: 40px;
  padding-right: 10px;
  padding-left: 16px;
  right: 40px;
  top: calc(50% - 20px);
  font: 9px/11px 'Arial';
  color: #fff;
  letter-spacing: .125em;
  text-transform: uppercase;
  position: absolute;
  z-index: 2;
  border: none;

  &:hover {
    background-color: #101820;
  }

  &:focus {
    outline: 0;
  }
`;
Button.displayName = 'button';

const Shadow = styled.div`
  background: linear-gradient(rgba(16,24,32,0),rgba(16,24,32,.50));
    bottom: 0;
    content: "";
    height: 96px;
    left: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
    z-index: 1;
`;

const StyledShare = styled.div`
  background: #101820;
  width: 242;
  height: 60;
  position: absolute;
  right: 40px;
  top: calc(100% - 40px);
  z-index: 2;
`;

const StyledShareContainer = styled.div`
  background: #101820;
  padding: 10px 8px 10px 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  color: #101820;
`;

const StyledFacebook = styled(Facebook)`
  width: 30px;
  height: 30px;
  color: #fff;
  margin: 0 7px;
  padding: 4px;
  background: #000;
  border: 1.2px solid #fff;
  border-radius: 50%;
  &:hover {
    background-color: #4267B2;
    border: 1.2px solid #4267B2;
  }
`;

const StyledTwitter = styled(ScTwitter)`
  width: 30px;
  height: 30px;
  color: #fff;
  padding: 4px;
  margin: 0 7px;
  background: #000;
  border: 1.2px solid #fff;
  border-radius: 50%;
  &:hover {
    background-color: #1DA1F2;
    border: 1.2px solid #1DA1F2;
  }
`;

const StyledPinterest = styled(PinterestAlt)`
  width: 30px;
  height: 30px;
  color: #fff;
  padding: 4px;
  margin: 0 7px;
  background: #000;
  border: 1.2px solid #fff;
  border-radius: 50%;
  &:hover {
    background-color: #c8232c;
    border: 1.2px solid #c8232c;
  }
`;

const StyledGooglePlus = styled(SocialGooglePlus)`
  width: 30px;
  height: 30px;
  color: #fff;
  padding: 4px;
  margin: 0 7px;
  background: #000;
  border: 1.2px solid #fff;
  border-radius: 50%;
  &:hover {
    background-color:  #d34836;
    border: 1.2px solid  #d34836;
  }
`;

const StyledTumblr = styled(Tumblr)`
  width: 30px;
  height: 30px;
  color: #fff;
  padding: 4px;
  margin: 0 7px;
  background: #000;
  border: 1.2px solid #fff;
  border-radius: 50%;
  &:hover {
    background-color: #34526f;
    border: 1.2px solid #34526f;
  }
`;

const StyledDots = styled(DotsHorizontalRounded)`
  width: 30px;
  height: 30px;
  color: #fff;
  padding: 4px;
  margin: 0 7px;
  background: #000;
  border: 1.2px solid #fff;
  border-radius: 50%;
  &:hover {
    background-color: #FFFFFF;
    border: 1.2px solid #FFFFFF;
    color: #000;
  }
`;

const StyledEmail = styled(Mail)`
  width: 30px;
  height: 30px;
  color: rgba(250,250,250,.75);
  padding: 4px;
  margin: 0 8px 0 2px;
  &:hover {
    background-color: #b70038;
  }
`;

const StyledLine = styled.div`
  border-left: 1px solid #e1e1e1;
  opacity: .5;
  align-self: center;
  height: 30px;
  margin: 0 6px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: 'main',
      id: '',
      name,
      imageUrls: [],
      single: '',
      open: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleView = this.handleView.bind(this);
    this.openSocial = this.openSocial.bind(this);
  }

  componentDidMount() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const restaurantID = url.searchParams.get('restaurantID');

    axios.get(`/api/images/${restaurantID}`)
      .then(res => {
        const { id, imageUrls, name } = res.data[0];
        this.setState({
          id,
          name,
          imageUrls,
        });
      })
      .catch(err => console.log(err));
  }

  handleClick(idx) {
    this.setState({
      view: 'single',
      single: idx,
    });
  }

  handleView(view) {
    this.setState({
      view,
    });
  }

  renderView() {
    const { imageUrls, single, view, name } = this.state;
    if (view === 'single') {
      return (
        <Single url={imageUrls[single]} idx={single} total={imageUrls.length} name={name} handleClick={this.handleClick} handleView={this.handleView} />
      );
    } else if (view === 'multi') {
      return (
        <Multi imageUrls={imageUrls} name={name} handleClick={this.handleClick} handleView={this.handleView} />
      );
    }
  }

  openSocial() {
    if (this.state.open === true) {
      return (
        <React.Fragment>
        <StyledEmail size="20" />
        <StyledLine>.</StyledLine>
        <StyledFacebook size="20" />
        <StyledTwitter size="20" />
        <StyledPinterest size="20" />
        <StyledGooglePlus size="20" />
        <StyledTumblr size="20" />
        <StyledDots size="20" onClick={() => this.setState({ open: false })} />
      </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <StyledEmail size="20" />
          <StyledLine>.</StyledLine>
          <StyledFacebook size="20" />
          <StyledTwitter size="20" />
          <StyledDots size="20" onClick={() => this.setState({ open: true })} />
        </React.Fragment>
      )
    }
  }

  render() {
    document.onkeydown = null;
    const { imageUrls, single, view } = this.state;
    return (
      <React.Fragment>
        {this.renderView()}
        <Container>
          <Carousel>
            {imageUrls.map((url, idx) => <Image src={url} idx={idx} handleClick={this.handleClick} key={idx} imageUrls={imageUrls} />)}
            <Button onClick={() => this.handleView('multi')}>{imageUrls.length} photos +</Button>
          </Carousel>
          <Shadow />
          <StyledShare>
            <StyledShareContainer>
              {this.openSocial()}
            </StyledShareContainer>
          </StyledShare>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
