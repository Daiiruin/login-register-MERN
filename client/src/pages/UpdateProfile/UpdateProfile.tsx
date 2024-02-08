import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

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
          setName(response.data.name);
          setEmail(response.data.email);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(
        "http://localhost:5000/user/update",
        { name, email },
        { headers }
      );
      console.log("User updated successfully:", response.data);
      setError("User updated successfully!");
    } catch (error) {
      console.log("Failed to update user:", error.response?.data?.message);
    }
  };

  return (
    <>
      <button onClick={goBack}>Go Back</button>
      <form onSubmit={handleUpdate}>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Ajoutez d'autres champs de formulaire au besoin */}
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};
