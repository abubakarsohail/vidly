import React from "react";
import {default as ListGroupBootstrap} from 'react-bootstrap/ListGroup';

const ListGroup = props => {

  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;
  
  return (
    <ListGroupBootstrap as="ul">
      {items.map(item => (
        <ListGroupBootstrap.Item as="li"
          key={item[valueProperty]}
          style={{cursor: "pointer"}}
          onClick={() => onItemSelect(item)}
          className={item === selectedItem && "active"}
        >
          {item[textProperty]}
        </ListGroupBootstrap.Item>
      ))}
    </ListGroupBootstrap>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
