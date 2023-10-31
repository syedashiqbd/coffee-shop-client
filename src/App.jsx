import axios from 'axios';
import './App.css';
import CoffeeCard from './components/CoffeeCard';

import Navbar from './components/Navbar';
import { useQuery } from '@tanstack/react-query';

function App() {
  const {
    data: coffees,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['repoData'],
    // queryFn: () =>
    //   fetch(`${import.meta.env.VITE_APP_SERVER_URL}/coffee`).then((res) =>
    //     res.json()
    //   ),

    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/coffee`
      );
      return await res.data;
    },
    retry: 3,
  });

  if (isLoading)
    return (
      <h1 className="text-red-600 text-4xl font-semibold text-center">
        Loading
      </h1>
    );
  if (isError)
    return (
      <h1 className="text-red-600 text-4xl font-semibold text-center">
        Error loading data! !
      </h1>
    );

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto">
        <h1 className="divider text-4xl text-purple-700 text-center font-semibold my-20">
          {coffees?.length} Hot Coffee in Our Shop
        </h1>
        <div className="grid md:grid-cols-2 gap-4">
          {coffees?.map((coffee) => (
            <CoffeeCard
              key={coffee._id}
              coffee={coffee}
              coffees={coffees}
              refetch={refetch}
            ></CoffeeCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
