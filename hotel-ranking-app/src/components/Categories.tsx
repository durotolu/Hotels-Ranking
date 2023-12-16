import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "../state/reducers";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/base/FormControl";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import InputDetails from "./InputDetails";
import SelectDetail from "./SelectDetail";
import { RootState } from "../store";
import { Paper } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function DeleteModal() {
  const { activeHotel } = useSelector(
    ({ app: { activeHotel } }: RootState) => ({
      activeHotel,
    })
  );
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteHotel = () => {
    handleClose();
    dispatch(actions.toggleHotelModal());
    dispatch(actions.deleteHotel(activeHotel.id));
  };

  return (
    <Fragment>
      <Button color="error" onClick={handleOpen}>
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Delete</h2>
          <p id="child-modal-description">Are you sure you want to delete?</p>
          <Button variant="contained" color="error" onClick={deleteHotel}>
            Delete
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}

const Categories = () => {
  const { categoriesModalIsOpen, activeHotel, isEditMode, categories } =
    useSelector(
      ({
        app: { categoriesModalIsOpen, activeHotel, isEditMode, categories },
      }: RootState) => ({
        categoriesModalIsOpen,
        activeHotel,
        isEditMode,
        categories,
      })
    );
  const dispatch = useDispatch();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    dispatch(
      actions.inputChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const toggleCategoriesModalState = () => {
    if (!categoriesModalIsOpen)
      dispatch(
        actions.setSelectedHotel({
          id: "",
          name: "",
          country: "",
          address: "",
        })
      );
    dispatch(actions.setEditMode(false));
    dispatch(actions.toggleCategoriesModal());
  };

  const submitHotel = () => {
    console.log("isEditMode", isEditMode);
    if (isEditMode) {
      dispatch(actions.editHotel(activeHotel));
    } else {
      dispatch(actions.addHotel(activeHotel));
    }
    dispatch(actions.toggleHotelModal());
  };

  const handleDelete = (category: any) => {
    console.info("You clicked the delete icon.", category);
  };

  const handleClickCategory = (category: any) => {
    dispatch(actions.editCategory({ ...category, selected: !category.selected }));
    console.info("You clicked the chip.", category);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleCategoriesModalState}>
        Manage Categories
      </Button>
      <Modal
        open={categoriesModalIsOpen}
        onClose={toggleCategoriesModalState}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Manage Categories here</h2>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {categories.map((category) => {
              return (
                <ListItem key={category.key}>
                  <Chip
                    label={category.name}
                    color="primary"
                    variant={category.selected ? "filled" : "outlined"}
                    onClick={() => handleClickCategory(category)}
                    onDelete={
                      category.deletable
                        ? () => handleDelete(category)
                        : undefined
                    }
                  />
                </ListItem>
              );
            })}
          </Paper>

          <InputDetails
            placeholder="Enter name here"
            name="name"
            label="Name"
            handleChange={handleChange}
          />

          <Box
            paddingTop={"20px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Button
              variant="contained"
              onClick={submitHotel}
              type="submit"
              disabled={
                !activeHotel.name ||
                !activeHotel.address ||
                !activeHotel.country
              }
            >
              {isEditMode ? "Update" : "Create"}
            </Button>
            <DeleteModal />
            {isEditMode && <DeleteModal />}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Categories;
