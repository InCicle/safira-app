import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { Layout, WatchButton, ViewedButton } from './styles';

interface Props {
  name: string;
  moduleImg: string;
  description: string;
  videoUrl: string;
  isViewed: boolean;
  markAsViewed: Function;
}

const TutorialVideoButton: React.FC<Props> = ({ name, moduleImg, description, videoUrl, isViewed, markAsViewed }) => {
  const [open, setOpen] = useState(false);
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
          src={videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </Modal>
      <Layout
        onClick={() => {
          handleModal();
          if (!isViewed) markAsViewed();
        }}
      >
        <Box className="title">
          <img src={moduleImg} alt="Module Icon" />
          <Typography color="textPrimary">{name}</Typography>
        </Box>
        <Typography color="textPrimary">{description}</Typography>
        {isViewed ? (
          <ViewedButton>
            <CheckCircle /> <p>Completo</p>
          </ViewedButton>
        ) : (
          <WatchButton>
            <p>Iniciar</p>
          </WatchButton>
        )}
      </Layout>
    </>
  );
};

export default TutorialVideoButton;
