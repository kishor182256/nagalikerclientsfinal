import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CrossIcon } from "./UserSvg";
import { Box, List, Typography } from "@material-ui/core";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectDropDown = ({ data, setSelectedSub, setTotal }) => {
  const [selectedItems, setSelectedItems] = React.useState([]);

  // Calculate the total price of selected items
  const totalPrice = selectedItems?.reduce(
    (sum, item) => Number(sum) + Number(item?.Rate),
    0
  );
  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems?.splice(index, 1);
      return updatedItems;
    });
  };
  const handleItemSelect = (event, value) => {
    setSelectedItems(value);
    setSelectedSub(value);
  };

  React.useEffect(() => {
    setTotal(totalPrice);
  }, [totalPrice]);

  return (
    <>
      <Box style={{ width: "80%", marginBottom: "20px", paddingLeft: "30px" }}>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={data}
          disableCloseOnSelect
          getOptionLabel={(option) => option?.name}
          renderOption={(props, option, { selected }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                //   width: "70%",
              }}
            >
              <li
                {...props}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box style={{ flex: 1 }}>{option?.name}</Box>
                <Box style={{ minWidth: 60 }}>{option?.Rate}</Box>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
              </li>
            </div>
          )}
          style={{}}
          onChange={handleItemSelect}
          renderInput={(params) => (
            <TextField {...params} label="Checkboxes" placeholder="Favorites" />
          )}
        />
      </Box>
      <>
        {selectedItems?.map((itmes, index) => {
          return (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "80%",
                marginLeft: "20px",
                marginBottom: "10px",
                border: "1px solid rgba(201, 201, 201, 1)",
                borderRadius: "4px",
                backgroundColor: "rgba(201, 201, 201, 0.15)",
              }}
            >
              <Box style={{ display: "flex",justifyContent: "space-between",width: "80%"}}>
                <Typography style={{ marginLeft: "30px" }}>
                  {itmes?.name}
                </Typography>
                <Typography style={{ marginLeft: "10px" }}>
                  ₹{itmes?.Rate}
                </Typography>
              </Box>
              <List
                style={{ marginRight: "10px" }}
                onClick={() => handleRemoveItem(index)}
              >
                <CrossIcon />
              </List>
            </Box>
          );
        })}
        <div
          style={{
            width: "88%",
            marginBottom: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
          }}
        >
          <div style={{ marginLeft: "30px" }}>
            Investigation count ({selectedItems?.length})
          </div>
          <div>Total amount: ₹ {totalPrice}</div>
        </div>
      </>
    </>
  );
};

export default SelectDropDown;
