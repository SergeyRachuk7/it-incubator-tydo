import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";
import { useAdditemForm } from "./useAdditemForm";

type AddItemFromPropsType = {
  addItem: (title: string) => void
}



export const AddItemForm = React.memo((props: AddItemFromPropsType) => {
  const {
    title,
    error,
    onKeyPressHandler,
    onChangeHandler,
    addItem
  } = useAdditemForm(props.addItem)


  return <div>
    <TextField size={"small"}
      value={title}
      label={"Type value"}
      variant={"outlined"}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      error={!!error}
      helperText={error}
    />
    <IconButton onClick={addItem} color={"primary"}><ControlPoint /> </IconButton>
  </div>
}
)



