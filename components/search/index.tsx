import React from "react";
import ITextField from "@/components/atoms/textField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const SearchBar = ({
  onSearch,
  className,
}: {
  onSearch: (value: string) => void;
  className?: string;
}) => {
  const { control } = useForm();
  return (
    <div
      className={twMerge("w-full block print:hidden", className && className)}
    >
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <ITextField
            size={"small"}
            className={"w-full"}
            placeholder="Search"
            borderRadius={"40px"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => {
              field.onChange(e);
              onSearch(e.target.value);
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchBar;
