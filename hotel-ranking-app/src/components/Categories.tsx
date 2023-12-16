import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/base/FormControl";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

import { Category, actions, getInitialState } from "../state/reducers";
import InputDetails from "./InputDetails";
import { RootState } from "../store";

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

function DeleteModal({
  openDelete,
  setOpenDelete,
  categoryId,
}: {
  openDelete: boolean;
  categoryId: string;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDelete(false);
  };

  const deleteCategory = () => {
    handleClose();
    dispatch(actions.deleteCategory(categoryId));
  };

  return (
    <Fragment>
      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Delete</h2>
          <p id="child-modal-description">
            This will be removed as a category on existing hotels?
          </p>
          <Button variant="contained" color="error" onClick={deleteCategory}>
            Delete
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}

const Categories = () => {
  const { categoriesModalIsOpen, activeCategory, categories } = useSelector(
    ({
      app: { categoriesModalIsOpen, activeCategory, categories },
    }: RootState) => ({
      categoriesModalIsOpen,
      activeCategory,
      categories,
    })
  );
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleChange = (e: { target: { name: string; value: string } }) => {
    dispatch(
      actions.inputChangeCategory({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const toggleCategoriesModalState = () => {
    if (!categoriesModalIsOpen)
      dispatch(
        actions.selectCategory({
          id: "",
          name: "",
          deletable: true,
        })
      );
    dispatch(actions.toggleCategoriesModal());
  };

  const submitCategory = () => {
    if (activeCategory.id) {
      dispatch(actions.editCategory(activeCategory));
    } else {
      dispatch(actions.addCategory(activeCategory));
    }
    dispatch(actions.selectCategory({ ...getInitialState().activeCategory }));
  };

  const openDeleteModal = (categoryId: string) => {
    handleOpen();
    setDeleteId(categoryId);
  };

  const handleClickCategory = (category: Category) => {
    dispatch(actions.selectCategory(category));
  };

  const handleOpen = () => {
    setOpenDelete(true);
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
                <ListItem key={category.id}>
                  <Chip
                    label={category.name}
                    color="primary"
                    variant={
                      category.id === activeCategory.id ? "filled" : "outlined"
                    }
                    onClick={() => handleClickCategory(category)}
                    onDelete={
                      category.deletable
                        ? () => openDeleteModal(category.id)
                        : undefined
                    }
                  />
                </ListItem>
              );
            })}
          </Paper>
          <FormControl value={activeCategory.name} required>
            <InputDetails
              placeholder="Enter category here"
              name="name"
              label=""
              required={false}
              handleChange={handleChange}
            />
          </FormControl>
          <Box
            paddingTop={"20px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Button
              variant="contained"
              onClick={submitCategory}
              type="submit"
              disabled={!activeCategory.name}
            >
              {activeCategory.id
                ? `Update ${activeCategory.id}`
                : "Create Category"}
            </Button>
            <DeleteModal
              openDelete={openDelete}
              categoryId={deleteId}
              setOpenDelete={setOpenDelete}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Categories;
