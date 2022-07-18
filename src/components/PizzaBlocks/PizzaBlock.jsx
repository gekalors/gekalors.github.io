import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice";

const _typeNames = ["Тонке", "Традиційне"];

function PizzaBlock({ imageUrl, name, types, sizes, price, id }) {
  
  const [_ActiveType, _SetActiveType] = React.useState(0);
  const [_ActiveSize, _SetActiveSize] = React.useState(0);
  
  const cartItem = useSelector(selectCartItemById(id) )
  
  const addedCount = cartItem ? cartItem.count : 0 ;

  const dispatch = useDispatch();
  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      imageUrl,
      type: _typeNames[_ActiveType],
      size: sizes[_ActiveSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((_type) => (
              <li
                onClick={() => _SetActiveType(_type)}
                key={`${id}_${_type}`}
                className={_ActiveType === _type ? "active" : ""}
              >
                {_typeNames[_type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((_size, _index) => (
              <li
                onClick={() => _SetActiveSize(_index)}
                key={`${_size}_${_index}`}
                className={_ActiveSize === _index ? "active" : ""}
              >
                {_size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">від {price} ₴</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Додати</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
export default PizzaBlock;