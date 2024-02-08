import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserData {
  name?: string;
  email?: string;
}

export const Home = () => {
  const [userData, setUserData] = useState<UserData>({});
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
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({});
    console.log("You have been logged out");
    navigate("/login");
  };

  return (
    <div>
      <p>Votre nom : {userData.name}</p>
      <p>Votre mail : {userData.email}</p>{" "}
      <Link to="/updateProfile">Update Profile</Link>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
