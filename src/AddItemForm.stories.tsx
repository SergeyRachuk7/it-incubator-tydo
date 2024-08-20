import React from "react"
import { AddItemForm } from "./AddItemForm"
import { action } from '@storybook/addon-actions';

export default {
  title: "AdditemForm Component",
  component: AddItemForm
}

const callback = action("Button 'add'  was pressed inside the form");
export const AdditemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />
}


