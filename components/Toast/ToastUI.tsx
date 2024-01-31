import React, { useMemo } from 'react';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastUI: FC = () => {
  const toastContainer = useMemo<HTMLDivElement>(() => {
    const element = document.createElement('div');

    element.setAttribute('id', 'toast-root');

    return element;
  }, []);

  useEffect(() => {
    // if (!Array.from(document.body.children).some(child => child.id === "toast-root")) {
    //   document.body.insertBefore(toastContainer, document.body.firstChild);
    // }
    document.body.appendChild(toastContainer);

    return () => {
      if (document.body.contains(toastContainer)) {
        document.body.removeChild(toastContainer);
      }
    };
  }, []); // eslint-disable-line

  return createPortal(
    <ToastContainer position="top-right" autoClose={5000} pauseOnHover closeButton closeOnClick={false} />,
    toastContainer,
  );
};

export default ToastUI;
