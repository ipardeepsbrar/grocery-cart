import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

// import styles from './List.module.css';

const List = (props) => {
  return (
    <div>
      {props.list.map((item) => {
        const { id, name } = item;
        return (
          <div key={id} className="list-item">
            {name}
            <div className="item-btns">
              <button className="edit-btn">
                <BsFillPencilFill
                  onClick={() => {
                    props.editHandler(id);
                  }}
                />
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  props.itemRemoveHandler(id);
                }}
              >
                <BsFillTrashFill />
              </button>
            </div>
            </div>
        );
      })}
    </div>
  );
};

export default List;
