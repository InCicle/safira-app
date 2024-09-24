import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  passport: string;
};

const Portal: FC<PropsWithChildren<PortalProps>> = ({ children, passport }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let portalEl: HTMLDivElement | null = null;

    try {
      portalEl = document.createElement('div');
      portalEl.setAttribute('id', passport);

      if (!document.querySelector(`#${passport}`)) {
        document.body.append(portalEl);
      }

      setMounted(true);
    } catch {
      setMounted(false);
    }

    return () => {
      setMounted(false);

      try {
        if (portalEl) {
          document.removeChild(portalEl);
        }
      } catch {}
    };
  }, [passport]);

  try {
    return mounted ? createPortal(children, document.querySelector(`#${passport}`)!) : null;
  } catch {
    return null;
  }
};

export default Portal;
