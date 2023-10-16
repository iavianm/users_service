import React, { useState } from "react";
import UsersList from "../UsersList/UsersList";
import UserHistory from "../UserHistory/UserHistory";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Header from "../Header/Header";
import "./App.css";
import UserActions from "../UserActions/UserActions";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  function selectUser(user) {
    setSelectedUser(user);
    navigate("/update");
  }

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/create"
          element={<UserActions title={"Создать пользователя"} button={'Создать'}/>}
        />
        <Route
          path="/update"
          element={
            <UserActions
              user={selectedUser}
              title={"Редактировать пользователя"}
              button={'Обновить'}
            />
          }
        />
        <Route
          path="/*"
          element={
            selectedUserId ? (
              <Dialog
                open={!!selectedUserId}
                onClose={() => setSelectedUserId(null)}
              >
                <DialogTitle>История пользователя</DialogTitle>
                <DialogContent>
                  <UserHistory userId={selectedUserId} />
                </DialogContent>
              </Dialog>
            ) : (
              <UsersList
                onUserClick={setSelectedUserId}
                selectUser={selectUser}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
