import { useLoaderData } from 'react-router-dom';
 import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    //ready divide class to divide the list items with a line and add some padding to the left and right of the list
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

 

export default Menu;