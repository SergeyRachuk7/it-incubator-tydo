import { ChangeEvent, KeyboardEvent, useState } from "react";


type AddItemFromPropsType = {
  addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFromPropsType) {
  let [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null);




  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTask();
    }
  };


  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is  required");
    }
  };


  return <div>
    <input
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      className={error ? "error" : ""}
    />
    <button onClick={addTask}>+ New Task</button>
    {error && <div className="error-message">{error}</div>}
  </div>
}