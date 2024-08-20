
import React from "react"
import { action } from '@storybook/addon-actions';
import { EditableleSpan } from "./EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableleSpan
}

const changeCallback = action("value changed")

export const EditableleSpanBaseExample = () => {
  return <EditableleSpan value={"Start value"} onChange={changeCallback} />
} 
