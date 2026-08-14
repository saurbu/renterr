import React, { useEffect, useState } from "react";
import Hero from "./hero/Hero";
import AddCarForm from "./hero/form/AddCar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [showAddCar, setShowAddCar] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full h-fit bg-white">
      <main className="w-full">
        {showAddCar ? (
          <AddCarForm onBack={() => setShowAddCar(false)} />
        ) : (
          <Hero
            user={user}
            onAddCar={() => setShowAddCar(true)}
          />
        )}
      </main>
    </div>
  );
};

export default Home;