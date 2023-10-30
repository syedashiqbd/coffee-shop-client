import { useLoaderData } from 'react-router-dom';
import './App.css';
import CoffeeCard from './components/CoffeeCard';
import { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const loadedCoffees = useLoaderData();

  const [coffees, setCoffees] = useState(loadedCoffees);



  return (
    <div className="max-w-6xl mx-auto">
      <Navbar></Navbar>
      <h1 className="text-6xl text-purple-600 text-center my-6">
        Our Hot Coffee Shop {coffees?.length}
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        {coffees?.map((coffee) => (
          <CoffeeCard
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          ></CoffeeCard>
        ))}
      </div>
    </div>
  );
}

export default App;
