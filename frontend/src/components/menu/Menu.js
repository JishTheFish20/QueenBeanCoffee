// src/components/CoffeeMenu.jsx
import React, { useEffect, useState } from 'react';
import {supabase} from '../../lib/supabaseClient.js'

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase
        .from('coffee_menu')
        .select('*')
        .eq('available', true);

      if (error) {
        console.error('Error fetching menu:', error.message);
      } else {
        setMenu(data);
      }

      setLoading(false);
    };

    fetchMenu();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading menu...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {menu.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="text-lg font-semibold mt-2">${item.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default Menu;
