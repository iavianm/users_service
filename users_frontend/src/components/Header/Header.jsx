import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <Typography variant="h6">Менеджер пользователей</Typography>

        {location.pathname === "/" && (
          <Link to="/create" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Создать пользователя</Button>
          </Link>
        )}

        {(location.pathname === "/create" ||
          location.pathname === "/update") && (
          <Button color="inherit" onClick={handleGoBack}>
            Вернуться на главную
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
