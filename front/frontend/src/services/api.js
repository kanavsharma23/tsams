export const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://tsams-backend.onrender.com";

export const apiService = {
  // 🔹 Login
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (err) {
      console.error("Login error:", err.message);
      throw err;
    }
  },

  // 🔹 Register
  register: async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (err) {
      console.error("Register error:", err.message);
      throw err;
    }
  },

  // 🔹 Profile
  getUserProfile: async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data;
    } catch (err) {
      console.error("Profile error:", err.message);
      throw err;
    }
  },

  // 🔹 Items
  getItems: async () => {
    const res = await fetch(`${API_URL}/api/items`);
    return res.json();
  },

  // 🔹 Bookings
  getBookings: async (token) => {
    const res = await fetch(`${API_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
