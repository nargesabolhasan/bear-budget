"use client";

import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionItemsType, IconOption } from "@/types/global";

export type AccordionProps = {
  items: AccordionItemsType[];
  className?: string;
  summeryClassName?: string;
  detailClassName?: string;
  ExpandMoreIconComponent?: IconOption["icon"];
  showExpandIcon?: boolean;
};

const IAccordion = ({
  items,
  className,
  summeryClassName,
  detailClassName,
  ExpandMoreIconComponent = ExpandMoreIcon,
  showExpandIcon = true,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string, onExpandPanel?: AccordionItemsType["onExpandPanel"]) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      onExpandPanel?.(event, isExpanded, panel);
    };

  return (
    <>
      {items.map((item) => (
        <Accordion
          key={`I-Accordion-item-${item.id}`}
          expanded={expanded === item.panel}
          onChange={handleChange(item.panel, item.onExpandPanel)}
          className={className}
          disableGutters
          sx={{
            position: "relative",
            boxShadow: "none",
            borderRadius: "20px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              showExpandIcon ? <ExpandMoreIconComponent /> : undefined
            }
            aria-controls={item.ariaControl}
            id={item.panelHeaderId}
            className={summeryClassName}
            sx={{
              p: 0,
              minHeight: "unset",

              "&.Mui-expanded": {
                minHeight: "unset",
              },

              "& .MuiAccordionSummary-content": {
                margin: 0,
              },

              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
              },

              "& .MuiAccordionSummary-expandIconWrapper": {
                position: "absolute",
                right: 16,
                top: "3px",
                transform: "translateY(-3px)",
                transition: "transform 200ms ease",
              },

              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "translateY(-3px) rotate(180deg)",
              },
            }}
          >
            {item.summary}
          </AccordionSummary>

          <AccordionDetails
            className={detailClassName}
            sx={{
              p: 0,
              justifyContent: "center",
            }}
          >
            {item.detail}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default IAccordion;
