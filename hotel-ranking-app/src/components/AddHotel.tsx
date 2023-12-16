import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/base/FormControl";

import { actions } from "../state/reducers";
import InputDetails from "./InputDetails";
import SelectDetail from "./SelectDetail";
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

const AddHotel = () => {
  const { hotelModalIsOpen, activeHotel, isEditMode, categories, countries } =
    useSelector(
      ({
        app: {
          hotelModalIsOpen,
          activeHotel,
          isEditMode,
          categories,
          countries,
        },
      }: RootState) => ({
        hotelModalIsOpen,
        activeHotel,
        isEditMode,
        categories,
        countries,
      })
    );
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = (e: { target: { name: string; value: string } }) => {
    dispatch(
      actions.inputChangeHotel({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const toggleHotelModalState = () => {
    if (!hotelModalIsOpen)
      dispatch(
        actions.setSelectedHotel({
          id: "",
          name: "",
          country: "",
          address: "",
          category: "",
        })
      );
    dispatch(actions.setEditMode(false));
    dispatch(actions.toggleHotelModal());
  };

  const submitHotel = () => {
    console.log("activeHotel", activeHotel);
    if (isEditMode) {
      dispatch(actions.editHotel(activeHotel));
    } else {
      dispatch(actions.addHotel(activeHotel));
    }
    dispatch(actions.toggleHotelModal());
  };

  useEffect(() => {
    if (!countries.length) {
      (function () {
        const apiCountries = `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`;
        fetch(apiCountries)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const result = data.reduce(function (
              r: { [x: string]: { id: string; name: string } },
              a: {
                country: string;
              }
            ) {
              r[a.country] = {
                id: a.country,
                name: a.country,
              };

              return r;
            }, []);
            console.log(result);
            dispatch(actions.setCountries(Object.values(result)));
          })
          .catch((err) => {
            setError(err.message);
          });
      })();
    }
  }, [countries.length, dispatch]);

  return (
    <div>
      <Button variant="contained" onClick={toggleHotelModalState}>
        New Hotel
      </Button>
      <Modal
        open={hotelModalIsOpen}
        onClose={toggleHotelModalState}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">
            {isEditMode ? "Edit existing" : "Add new"} Hotel
          </h2>
          <p id="parent-modal-description">All fields required</p>

          <FormControl defaultValue={activeHotel.name} required>
            <InputDetails
              placeholder="Enter name here"
              name="name"
              label="Name"
              handleChange={handleChange}
            />
          </FormControl>
          <SelectDetail
            label="Country"
            name="country"
            options={countries}
            error={error}
            defaultValue={activeHotel.country}
          />
          <FormControl defaultValue={activeHotel.address} required>
            <InputDetails
              placeholder="Enter address here"
              name="address"
              label="Address"
              handleChange={handleChange}
            />
          </FormControl>
          <SelectDetail
            name="category"
            label="Category"
            options={categories}
            defaultValue={activeHotel.category}
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
            {isEditMode && <DeleteModal />}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddHotel;
