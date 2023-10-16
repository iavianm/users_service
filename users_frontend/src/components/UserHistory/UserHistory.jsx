import React, { useEffect, useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { getUserHistory } from "../../utils/historyApi";
import Pagination from "@mui/material/Pagination";
import { format } from "date-fns";

function UserHistory({ userId }) {
  const [userHistory, setUserHistory] = useState([]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(userHistory.length / itemsPerPage);

  const formatDate = (timestamp) => format(new Date(timestamp), "dd.MM.yyyy HH:mm:ss");

  useEffect(() => {
    getUserHistory(userId)
      .then((res) => {
        const sortedHistory = [...res].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
        setUserHistory(sortedHistory);
      })
      .catch((error) => console.error("Failed to fetch users:", error));
  }, []);

  const formatDetails = (details) => {
    return Object.entries(details)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Table>
        <TableBody>
          {userHistory
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.action}</TableCell>
                <TableCell>{formatDetails(event.details)}</TableCell>
                <TableCell>{formatDate(event.timestamp)}</TableCell>
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

export default UserHistory;
