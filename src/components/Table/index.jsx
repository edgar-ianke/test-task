import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU
);
const TableComponent = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);
  const [usersArray] = useState(Object.values(users));
  const columns = [
    { field: "firstName", headerName: "Имя", flex: 1 },
    { field: "middleName", headerName: "Отчество", flex: 1 },
    { field: "lastName", headerName: "Фамилия", flex: 1 },
    { field: "birthPlace", headerName: "Место рождения", flex: 1 },
    { field: "birthDate", headerName: "Дата рождения", flex: 1, valueFormatter: (value) => {
      return value.toLocaleDateString()
      },},
    { field: "occupation", headerName: "Место жительства", flex: 1 },
    { field: "education", headerName: "ВУЗ", flex: 1 },
    { field: "profession", headerName: "Профессия", flex: 1 },
  ];
  const handleRowClick = (params) => {
    const userId = params.row.id;
    navigate(`/user/${userId}`);
  };
  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Список людей
      </Typography>

      <Paper sx={{ height: 720 }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={usersArray}
            columns={columns}
            initialState={{
              ...usersArray.initialState,
              pagination: {
                ...usersArray.initialState?.pagination,
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            disableSelectionOnClick
            onRowClick={handleRowClick}
            getRowId={(row) => row.id}
            sx={{
              "& .MuiDataGrid-row:hover": {
                cursor: "pointer",
              },
            }}
          />
        </ThemeProvider>
      </Paper>
    </Container>
  );
};

export default TableComponent;
