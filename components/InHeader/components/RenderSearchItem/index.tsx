import React from "react";
import { SearchItemInterface } from "@safira/interfaces/Search";
import RenderAvatar from "@safira/components/RenderAvatar";
import { links } from "@safira/config/links";

interface Props {
  item: SearchItemInterface;
  liProps: React.HTMLAttributes<HTMLLIElement>;
}

const RenderSearchItem: React.FC<React.PropsWithChildren<Props>> = ({ liProps, item }) => {
  const linkRedirect = () => {
    /**
     * This function is used to know the link to set on anchor item.
     */
    if (item.type === "PERSON" || item.type === "COMPANY") {
      return `${links.web?.social}/p/${item.username}`;
    } else if (item.type === "GROUP") {
      return `${links.web?.social}/group/${item.profile_id}/home`;
    }
  };

  return (
    <li {...liProps} key={`${item.username}`}>
      <a
        href={linkRedirect()}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textDecoration: "none",
          color: "#747474",
        }}
      >
        <RenderAvatar src={item.avatar} />
        <div
          style={{
            marginLeft: "5px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              textTransform: "capitalize",
            }}
          >
            {item.name}
          </span>
          {item.type === "COMPANY" && <span style={{ fontSize: "11px", marginTop: "-2px" }}>Perfil de empresa</span>}
          {item.type === "GROUP" && <span style={{ fontSize: "11px", marginTop: "-2px" }}>Grupo</span>}
        </div>
      </a>
    </li>
  );
};

export default RenderSearchItem;
