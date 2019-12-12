import React from 'react';
import styled from 'styled-components';
import Articles from './styles/Articles.jsx';
import Article from './styles/Article.jsx';
import Image from './styles/Image.jsx';

const Title = styled.h1`
  text-align: left;
  color: #101820;
  font: 19px/23px 'Calibre-Medium';
  letter-spacing: .13em;
  overflow-wrap: break-word;
  padding-right: 5px;
  padding-left: 5px;
`;

const Mentions = ({articles}) => {
  var items = [];
  for (var i = 0; i < articles.length; i=i+2) {
    if (articles[i+1]) {
      items.push(
          <Articles>
            <Article>
              <Image src={articles[i].image} />
              <Title >{articles[i].title}</Title>
            </Article>
            <Article>
              <Image src={articles[i+1].image} />
              <Title >{articles[i+1].title}</Title>
            </Article>
          </Articles>
      )
    } else {
      items.push(
        <Article align='left'>
          <Image src={articles[i].image} />
          <Title >{articles[i].title}</Title>
        </Article>
      )
    }
  }
  return (
    <div>{items}</div>
  )
}

export default Mentions;