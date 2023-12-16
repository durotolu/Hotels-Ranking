import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { RootState } from "../store";
import { actions } from "../state/reducers";

export default function Filter() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (id: string) => {
    dispatch(actions.setFilter(id));
    setAnchorEl(null)
  };

  const { categories, filterBy } = useSelector(({ app: { categories, filterBy } }: RootState) => ({
    categories,
    filterBy
  }));

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        style={{minWidth: "200px"}}
      >
        Filter {filterBy && `(${filterBy})`}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleSelect("")}>All</MenuItem>
        {categories.map(({ name, id }) => (
          <MenuItem key={id} onClick={() => handleSelect(id)}>{name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
