import React, { useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const Dashboard = () => {
  const { users } = useSelector((state) => state.user);
  const [usersArray] = useState(Object.values(users));
  const birthDateData = usersArray.reduce((acc, user) => {
    const birthYear = dayjs(user.birthDate).format("YYYY");
    acc[birthYear] = (acc[birthYear] || 0) + 1;
    return acc;
  }, {});

  const professionData = usersArray.reduce((acc, user) => {
    acc[user.profession] = (acc[user.profession] || 0) + 1;
    return acc;
  }, {});

  const locationData = usersArray.reduce((acc, user) => {
    acc[user.occupation] = (acc[user.occupation] || 0) + 1;
    return acc;
  }, {});

  const COLORS = [
    "#8884d8",
    "#8dd1e1",
    "#ffc658",
    "#82ca9d",
    "#d0ed57",
    "#a4de6c",
    "#ffa07a",
    "#ff7f50",
    "#6a5acd",
    "#20b2aa",
  ];

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Статистика пользователей
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Гистограмма по дате рождения
            </Typography>
            <BarChart
              width={500}
              height={300}
              data={Object.entries(birthDateData).map(([year, count]) => ({ year, count }))}
            >
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Круговая диаграмма по местам жительства
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={Object.entries(locationData).map(([location, count]) => ({ name: location, value: count }))}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(locationData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Гистограмма по профессиям
            </Typography>
            <BarChart
              width={1000}
              height={300}
              data={Object.entries(professionData).map(([profession, count]) => ({ profession, count }))}
            >
              <XAxis dataKey="profession" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
