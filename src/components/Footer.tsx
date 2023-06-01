import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";

const Footer = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/cookieukw")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!userData) {
    return null;
  }

  const { name, avatar_url, html_url, created_at } = userData;

  return (
    <Box sx={{ backgroundColor: "#212121", py: 4, px: 2 }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Avatar
        src={avatar_url} 
        alt={name} 
        sx={{ marginRight: 2 }} />
        <Typography 
        variant="body1"
        sx={{ color: "#fff" }}>
          Developed by{" "}
          <Link
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#fff" }}
          >
            {name}
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: "#fff" }}>
          © {new Date(created_at).getFullYear()} All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;