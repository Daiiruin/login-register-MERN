import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Mettre à jour l'état avec les détails de l'utilisateur
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Supprimer le token du stockage local
    localStorage.removeItem("token");
    console.log("You are now logged out");
    // Rediriger l'utilisateur vers la page de connexion
    navigate("/login");
  };

  return (
    <div>
      <p>Votre nom : {userData.name}</p>
      <p>Votre mail : {userData.email}</p>{" "}
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};
