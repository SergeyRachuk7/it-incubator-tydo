import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react"


type EditableSpanPropsType = {
  title: string
  onChange: (newvalue: string) => void
}


export function EditableleSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title);
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <TextField value={title} onChange={changeTitle} onBlur={activateViewMode} autoFocus />
    : <span onDoubleClick={activateEditMode}> {props.title}   </span >
}      