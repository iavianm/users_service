import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { createUser, updateUser } from "../../utils/userApi";
import { useLocation, useNavigate } from "react-router-dom";

function UserActions(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: props.user?.firstName || "",
    lastName: props.user?.lastName || "",
    email: props.user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (location.pathname === "/create") {
        await createUser(formData);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        });
        alert("Пользователь создан!");
        navigate("/");
      }

      if (location.pathname === "/update") {
        await updateUser(props.user?.id, formData);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        });
        alert("Пользователь обновлен!");
        navigate("/");
      }
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="Имя"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Фамилия"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Электронная почта"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {props.button}
        </Button>
      </form>
    </Container>
  );
}

export default UserActions;
