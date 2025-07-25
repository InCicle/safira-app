import styled from 'styled-components';

export const HeaderInStyle = styled.header`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 55px;
  background: #fff;
  border-bottom: 1px solid #ccc;

  .incicleheader-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-width: max-content;
  }

  .incicleheader-content.flex-end {
    justify-content: flex-end;
  }

  .incicleheader-content.center {
    justify-content: center;
  }

  .incicleheader-inputbutton {
    display: none;
  }

  .incicleheader-inputsearch {
    width: 100% !important;
    color: #747474;
    font-family: 'Open Sans', sans-serif;

    &::placeholder {
      color: #747474aa !important;
    }
  }

  /* MOBILE */
  .incicleheader-modules-label {
    display: none;
  }

  .incicleheader-modules-content.toggle {
    display: none;
  }

  .incicleheader-modules-content.toggle.view {
    z-index: 10;
    position: absolute;
    top: calc(100% + 16px);
    left: 8px;
    display: flex !important;
    flex-direction: column;
    justify-content: space-evenly;
    width: calc(100% - (24px));
    padding: 4px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow:
      0 0 8px rgba(0, 0, 0, 0.3),
      0 0 16px rgba(0, 0, 0, 0.2);

    a.MuiTypography-root {
      position: relative;
    }
  }

  /* DESKTOP */
  .incicleheader-desktopmodules-label {
    display: initial;
  }

  .incicleheader-desktopmodules-content.toggle {
    display: none;
  }

  .incicleheader-desktopmodules-content.toggle.view {
    z-index: 10;
    position: absolute;
    top: calc(100% + 16px);
    right: 8px;
    display: flex !important;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    max-width: 715px;
    padding: 0 16px;
    background-color: #fff;
    box-shadow:
      0 0 8px rgba(0, 0, 0, 0.3),
      0 0 16px rgba(0, 0, 0, 0.2);

    a.MuiTypography-root {
      position: relative;
    }

    .incicleheader-desktopmodules-items {
      padding: 10px 0;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      gap: 5px;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  @media only screen and (max-width: 1200px) {
    .incicleheader-inputbox {
      display: none !important;
    }

    .incicleheader-inputbutton {
      display: flex;
    }

    .incicleheader-inputbox.view {
      position: absolute;
      z-index: 5;
      display: flex !important;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 4px 0px;
      box-sizing: border-box;
    }
  }

  @media only screen and (max-width: 1000px) {
    .incicleheader-companies {
      span.MuiChip-label {
        display: none !important;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .incicleheader-desktopmodules-label {
      display: none;
    }

    .incicleheader-modules-label {
      display: initial;
    }

    .incicleheader-modules-content {
      display: none;
    }
  }

  @media only screen and (max-width: 700px) {
    .logo {
      width: auto !important;
    }

    .incicleheader-avatar {
      margin: 0 !important;

      &,
      .MuiAvatar-root {
        width: 28px;
        height: 28px;
        /* padding: 8px; */
        margin: 0 8px !important;
      }
    }
  }
`;
