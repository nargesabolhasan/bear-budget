"use client";
import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionItemsType, IconOption } from "@/types/global";
import { margin } from "@mui/system";

export type AccordionProps = {
  items: AccordionItemsType[];
  className?: string;
  summeryClassName?: string;
  detailClassName?: string;
  ExpandMoreIconComponent?: IconOption["icon"];
};

const IAccordion = ({
  items,
  className,
  summeryClassName,
  detailClassName,
  ExpandMoreIconComponent = ExpandMoreIcon,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string, onExpandPanel?: AccordionItemsType["onExpandPanel"]) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      onExpandPanel?.(event, isExpanded, panel);
    };

  return (
    <div>
      {items.map((item) => (
        <Accordion
          key={`I-Accordion-item-${item.id}`}
          expanded={expanded === item.panel}
          onChange={handleChange(item.panel, item?.onExpandPanel)}
          className={className}
        >
          <AccordionSummary
            sx={{
              padding: 0,
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
              },
            }}
            expandIcon={<ExpandMoreIconComponent />}
            aria-controls={item.ariaControl}
            id={item.panelHeaderId}
            className={summeryClassName}
          >
            {item.summary}
          </AccordionSummary>
          <AccordionDetails
            className={detailClassName}
            sx={{
              padding: 0,
            }}
          >
            {item.detail}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default IAccordion;
