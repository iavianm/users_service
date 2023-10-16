import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { getUsers } from "../../utils/userApi";
import "./UsersList.css";

function UsersList({ onUserClick, selectUser }) {
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = useState([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.reverse()))
      .catch((error) => console.error("Failed to fetch users:", error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedUsers = users.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <>
      <Table>
        <TableBody className={"table_body"}>
          {displayedUsers.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => onUserClick(user.id)}
              className={"table_row"}
            >
              <TableCell
                style={{
                  borderBottom: "none",
                }}
              >
                <Avatar />
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "none",
                  cursor: "pointer",
                }}
              >{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  borderBottom: "none",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    selectUser(user);
                  }}
                >
                  Редактировать
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
}

export default UsersList;
