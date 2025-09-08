import React from "react";
import IButton from "@/components/atoms/button";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";

const PrintComponent = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <IButton size="small" variant={"outlined"} onClick={handlePrint}>
      <PrintTwoToneIcon color={"primary"} />
    </IButton>
  );
};

export default PrintComponent;
