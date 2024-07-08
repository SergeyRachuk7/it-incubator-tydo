import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";


type AddItemFromPropsType = {
  addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFromPropsType) {

  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null);


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addItem();
    }
  };


  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is  required");
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