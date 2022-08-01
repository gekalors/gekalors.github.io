import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const {id} = useParams();
  const navigate = useNavigate();
  React.useEffect(()=>{
    async function fetchPizza(){
      try{
        const {data} = await axios.get('https://62b2dd4e20cad3685c95976d.mockapi.io/items/'+id)
        setPizza(data);
      }   catch (error){
        alert("Сталася помилка");
        navigate('/')
      }
    }
    fetchPizza();
  },[])
  if(!pizza){
    return <>Loading...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza_img"/>
      <h2>{pizza.name}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, cum
        est aliquam officiis quia alias unde, dolorum consectetur eligendi,
        voluptatibus harum sint earum non totam modi quos distinctio et
        assumenda!
      </p>
      <h4>{pizza.price} ₴</h4>
    </div>
  );
};
export default FullPizza;
