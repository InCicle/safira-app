import React, { useImperativeHandle, useState } from "react";
import { Divider, Link as MUILink, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { links } from "safira-app/config/links";
import { useHeaderProvider } from "safira-app/contexts/HeaderContext";
import RenderAvatar from "safira-app/components/RenderAvatar";
import TutorialVideos from "../TutorialVideos";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { School } from "@mui/icons-material";
import { translation } from "safira-app/utils/translation";
import { useTranslation } from "react-i18next";

export type ProfileMenuRef = {
  openProfileMenu: (ev: any) => void;
  closeProfileMenu: () => void;
};

type CustomLinkProps = {
  href?: string;
  icon: React.ReactElement;
};

const CustomLink: React.FC<React.PropsWithChildren<CustomLinkProps>> = ({ children, href, icon }) => (
  <MUILink
    href={href}
    underline={"none"}
    sx={{
      color: theme => theme.palette.grey[600],
      display: "flex",
      alignItems: "center",
    }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <span>{children}</span>
  </MUILink>
);

const ProfileMenu: React.ForwardRefRenderFunction<ProfileMenuRef> = (props, ref) => {
  const { profiles } = useHeaderProvider();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openTutorial, setOpenTutorial] = useState(false);

  function handleSignOut() {
    window.location.href = links.web.core + "/?signout=true";
  }

  function openDropdown(ev: any) {
    setAnchorEl(ev.currentTarget);
  }

  function closeDropdown() {
    setAnchorEl(null);
  }

  function getMenuItemUrl() {
    const personUrl = `${links.web.social}/friends`;
    const companyUrl = `${links.web.department}/#/collaborators`;
    return profiles?.type === "PERSON" ? personUrl : profiles?.type === "COMPANY" ? companyUrl : "#";
  }

  useImperativeHandle(ref, () => {
    return {
      openProfileMenu: openDropdown,
      closeProfileMenu: closeDropdown,
    };
  });

  return (
    <>
      {openTutorial && <TutorialVideos open={openTutorial} setOpen={setOpenTutorial} />}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeDropdown}
        onClick={closeDropdown}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            maxWidth: "250px",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "& li, & a": {
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "13px",
            },
            span: {
              fontSize: "13px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            width: "initial !important",
            textTransform: "capitalize",
            overflowWrap: "anywhere",
            whiteSpace: "break-spaces",
          }}
        >
          <CustomLink
            href={`${links.web.social}/p/${profiles?.username}`}
            icon={
              <RenderAvatar
                src={profiles?.avatar}
                sx={{
                  width: "32px !important",
                  height: "32px !important",
                  marginRight: 15,
                }}
              />
            }
          >
            {profiles?.social_name && profiles.social_name.length > 40
              ? `${profiles?.social_name.substring(0, 40)}...`
              : profiles?.social_name}
          </CustomLink>
        </MenuItem>
        <Divider />
        <MenuItem>
          <CustomLink href={getMenuItemUrl()} icon={<PeopleAltIcon fontSize="small" />}>
            {translation(t, profiles?.type === "PERSON" ? "friends" : "collaborators")}
          </CustomLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenTutorial(true)}>
          <CustomLink icon={<School fontSize="small" />}>{translation(t, "tutorials")}</CustomLink>
        </MenuItem>
        <MenuItem>
          <CustomLink href={links.web.settings} icon={<SettingsIcon fontSize="small" />}>
            {translation(t, "settings")}
          </CustomLink>
        </MenuItem>
        <MenuItem onClick={() => handleSignOut()} sx={{ color: theme => theme.palette.grey[600] }}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <span>{translation(t, "leave")}</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.forwardRef(ProfileMenu);
