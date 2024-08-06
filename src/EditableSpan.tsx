import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react"


type EditableSpanPropsType = {
  value: string
  onChange: (newvalue: string) => void
}


export const EditableleSpan = React.memo(function (props: EditableSpanPropsType) {
  console.log("EditableSpan");
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value);
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
    : <span onDoubleClick={activateEditMode}>{props.value}</span >
})      