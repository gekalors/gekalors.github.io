import React from "react";

function Catigories({_value, _setCategory}) {
  
  const _items = ["Усі" ,"М`ясна", "Вегетеріанська", "Гриль", "Гострі", "Закриті"];
  return (
    <div className="categories">
      <ul>
        
        {_items.map((_name, _index) => (
          <li
            className={_value=== _index ? "active" : ""}
            onClick={() =>  _setCategory(_index)}
            key={_index}
          >
            {_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catigories;
