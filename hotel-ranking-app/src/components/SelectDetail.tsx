import * as React from "react";
import { useDispatch } from "react-redux";
import { selectClasses, SelectProps } from "@mui/base/Select";
import { styled } from "@mui/system";

import { actions, Category, Country } from "../state/reducers";
import Label from "./Label";

export default function UnstyledSelectIntroduction({
  label,
  options,
  defaultValue,
  error,
  name,
}: {
  label: string;
  name: string;
  error?: string;
  defaultValue: string;
  options: Array<Category | Country>;
}) {
  return (
    <>
      <Label>{label}</Label>
      <StyledButton defaultValue={defaultValue} name={name}>
        <option value="" disabled>Select your option</option>
        {options.map(({ id, name }) => {
          return (
            <option key={id} value={id} selected={defaultValue === id}>
              {name}
            </option>
          );
        })}
      </StyledButton>
      <p>{error}</p>
    </>
  );
}

const Select = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(props: SelectProps<TValue, Multiple>) {
  const dispatch = useDispatch();

  const handleSelect = (e: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    dispatch(
      actions.inputChangeHotel({
        name: props.name as string,
        value: e.target.value,
      })
    );
  };
  return (
    <select
      style={{
        width: "100%",
        padding: "8px 12px",
        maxWidth: "320px",
        fontFamily: "'IBM Plex Sans',sansFerif",
        fontSize: "0.875rem",
        fontWeight: "400",
        lineHeight: "1.5",
        borderRadius: "8px",
        color: "#1C2025",
        background: "#fff",
        border: "1px solid #DAE2ED",
        boxShadow: "0px 2px 2px #F3F6F9",
      }}
      onChange={handleSelect}
      defaultValue={props.defaultValue as string}
    >
      {props.children}
    </select>
  );
});

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledButton = styled(Select, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  position: relative;
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);
