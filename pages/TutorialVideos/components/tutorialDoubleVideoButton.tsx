import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';

import { TutorialDoubleVideoLayout, WatchButton, ViewedButton, FinalButtons } from './styles';

interface Props {
  name: string;
  moduleImg: string;
  description: string;
  markAsViewed: (module: string) => Promise<void>;
  videos: Array<string>;
  doubleOptions: Array<string>;
  doubleIsViewed: Array<boolean>;
  doubleKeys: Array<string>;
}

export const TutorialDoubleVideoButton: React.FC<Props> = ({
  name,
  moduleImg,
  description,
  markAsViewed,
  videos,
  doubleOptions,
  doubleIsViewed,
  doubleKeys,
}) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');

  function handleModal() {
    setOpen(!open);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& iframe': { border: 0 },
        }}
      >
        <iframe
          width="560"
          height="315"
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </Modal>
      <TutorialDoubleVideoLayout>
        <Box className="overlay">
          <Box
            className="leftHalf"
            onClick={() => {
              setUrl(videos[0]);
              handleModal();
              markAsViewed(doubleKeys[0]);
            }}
          ></Box>
          <Box
            className="rightHalf"
            onClick={() => {
              setUrl(videos[1]);
              handleModal();
              markAsViewed(doubleKeys[1]);
            }}
          ></Box>
        </Box>
        <Box className="title">
          <img src={moduleImg} alt="Module Icon" />
          <Typography color="textPrimary">{name}</Typography>
        </Box>
        <Typography color="textPrimary">{description}</Typography>
        <FinalButtons>
          <Box className="finalButtonsWrapper">
            <Box className="finalButtonsItem">
              <Typography color="textPrimary">{doubleOptions[0]}:</Typography>
              {doubleIsViewed[0] ? (
                <ViewedButton>
                  <CheckCircle /> <p>Completo</p>
                </ViewedButton>
              ) : (
                <WatchButton>
                  <p>Iniciar</p>
                </WatchButton>
              )}
            </Box>
            <Box className="finalButtonsItem">
              <Typography color="textPrimary">{doubleOptions[1]}:</Typography>
              {doubleIsViewed[1] ? (
                <ViewedButton>
                  <CheckCircle /> <p>Completo</p>
                </ViewedButton>
              ) : (
                <WatchButton>
                  <p>Iniciar</p>
                </WatchButton>
              )}
            </Box>
          </Box>
        </FinalButtons>
      </TutorialDoubleVideoLayout>
    </>
  );
};
