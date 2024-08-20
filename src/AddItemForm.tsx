import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFromPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFromPropsType) => {
  console.log("AddItemForm  is callled");
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null);


  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItem();
    }
  };

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



