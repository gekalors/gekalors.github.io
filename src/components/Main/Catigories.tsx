import React from "react";

type CategoriesProps={
  value: number;
  setCategory: (i: number) => void;
}

const Catigories: React.FC<CategoriesProps> = ({value, setCategory}: CategoriesProps)=> {
  
  const items = ["Усі" ,"М`ясні", "Вегетеріанські", "Гриль", "Гострі", "Закриті"];
  return (
    <div className="categories">
      <ul>
        
        {items.map((name, index) => (
          <li
            className={value=== index ? "active" : ""}
            onClick={() =>  setCategory(index)}
            key={index}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catigories;
