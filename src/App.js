import { useEffect, useRef, useState } from "react";
import "./index.css";
import List from "./components/List";
import Alert from "./components/Alert";

function getLocalStorage() {
  const storage = localStorage.getItem('list');
  if (storage) {
    return JSON.parse(storage);
  }
  else {
    return []
  }
}

function App() {
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alertInformation, setAlertInformation] = useState({
    display: false,
    color: "",
    message: "",
  });
  const [editing, setEditing] = useState(false);
  const inputField = useRef();
  const [editItem, setEditItem] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();

    // pushing new item to the list
    if (!editing) {
      setList((prevList) => {
        const newList = [...prevList];
        newList.push({ id: new Date().getTime(), name: itemName });
        return newList;
      });
    
      setAlertInformation({
        display: true,
        color: "green",
        message: "Item added successfully",
      });
    }
    // pushing an item to the list with the changes saved
    else if (editing) {
      
      setList((prevList) => {
        let newList = prevList;
        newList = newList.map(item => {
          if (item.id === editItem.id) {
            return {
              ...item,
              name: itemName
            }
          }
          return item
        })
        return newList;
      });

      setAlertInformation({
        display: true,
        color: "green",
        message: "Item edited successfully",
      });

      setEditing(false);
      setEditItem({});
    }

    // clearing input field
    setItemName("");
  };

  // showing alert on adding or removing items
  const alertDisplayHandler = () => {
    setAlertInformation({
      display: false,
      color: "",
      message: "",
    });
  };

  // removing item from list
  const itemRemoveHandler = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    setAlertInformation({
      display: true,
      color: "red",
      message: "Item removed successfully",
    });
  };

  //clicking edit button
  const editHandler = (id) => {
    const editable = list.find((item) => item.id === id);
    setItemName(editable.name); 
    setEditItem(editable);
    setEditing(true);
    inputField.current.focus();
  };

  const clearListHandler = props => {
    setList([]);
    setItemName('');
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <div className="container">
      <div className="main-box">
        {alertInformation.display && (
          <Alert
            alertInformation={alertInformation}
            alertDisplayHandler={alertDisplayHandler}
            list={list}
          />
        )}
        <h2 className="heading">Grocery Cart</h2>
        <div className="input-form">
          <form onSubmit={submitHandler}>
            <input
              ref={inputField}
              type="text"
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
              required
              placeholder="e.g. buy avocado"
            />
            <button type="submit">{ editing ? 'Save Changes' : 'Submit'}</button>
          </form>
        </div>
        <List
          list={list}
          itemRemoveHandler={itemRemoveHandler}
          editHandler={editHandler}
        />
        {list.length !== 0 && <div className="clear-list-btn"><button type="button" onClick={clearListHandler}>Clear List</button></div>}
      </div>
    </div>
  );
}

export default App;