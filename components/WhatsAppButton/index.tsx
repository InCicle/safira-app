import React from 'react';
import styled from 'styled-components';
import InCicleBotIcon from './incicle_bot.jpg';

const WhatsAppLink = styled.a`
  position: fixed;
  width: 45px;
  height: 45px;
  bottom: 20px;
  left: 30px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 1000;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
`;

const WhatsAppButton: React.FC = () => {
  return (
    <WhatsAppLink href="https://wa.me/5511970270544" target="_blank">
      <img src={InCicleBotIcon} alt="WhatsApp" />
    </WhatsAppLink>
  );
};

export default WhatsAppButton;
