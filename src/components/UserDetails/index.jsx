import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../services/features/users";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./styles.module.scss";

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users[id]);
  const [editData, setEditData] = useState(user);
  const [editable, setEditable] = useState(false);

  // Фильтрация пользователей по атрибутам
  const users = useSelector((state) => state.user.users);

  const sameCityUsers = Object.values(users).filter((u) => u.birthPlace === user.birthPlace);
  const sameEducationUsers = Object.values(users).filter((u) => u.education === user.education);
  const sameOccupationUsers = Object.values(users).filter((u) => u.occupation === user.occupation);
  const sameProfessionUsers = Object.values(users).filter((u) => u.profession === user.profession);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleDateChange = (date) => {
    setEditData({ ...editData, birthDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(editData));
  };

  const handleBack = () => {
    navigate(-1);
  };
  const renderAssociates = (list, title) => {
    return (
      <Paper sx={{ width: "300px", paddingLeft: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ paddingTop: 1 }}>
          {title}
        </Typography>
        <List
          className={styles.associatesList}
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            padding: 1,
          }}
        >
          {list.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem
                button="true"
                onClick={() => {
                  navigate(`/user/${user.id}`);
                }}
                sx={{ padding: 1.5, cursor: "pointer" }}
              >
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Button variant="contained" onClick={handleBack}>
            <ArrowBackIcon sx={{ marginRight: 1 }} />
            Назад
          </Button>
          <Typography variant="h4" gutterBottom align="center">
            Профиль пользователя
          </Typography>

          <Card sx={{ display: "flex", marginBottom: 2 }}>
            <CardMedia
              component="img"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                margin: 2,
              }}
              image={user.avatar ? user.avatar : "/no-avatar.png"}
              alt="User Avatar"
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{`${user.firstName} ${user.middleName} ${user.lastName}`}</Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Место рождения:</strong> {user.birthPlace}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Дата рождения:</strong> {user.birthDate.toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Место жительства:</strong> {user.occupation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Образование:</strong> {user.education}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Профессия:</strong> {user.profession}
              </Typography>

              <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => setEditable(!editable)}>
                Редактировать профиль
              </Button>
            </CardContent>
          </Card>

          {editable && (
            <>
              <Typography variant="h5" gutterBottom>
                Редактировать информацию
              </Typography>
              <form onSubmit={handleSubmit} className={styles.editProfile}>
                <div className={styles.editProfile__column}>
                  <TextField
                    label="Имя"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Отчество"
                    name="middleName"
                    value={editData.middleName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Фамилия"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Место рождения"
                    name="birthPlace"
                    value={editData.birthPlace}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" sx={{ marginTop: 1, width: "120px", marginBottom: 2 }}>
                    Сохранить
                  </Button>
                </div>
                <div className={styles.editProfile__column}>
                  <DatePicker
                    label="Дата рождения"
                    value={dayjs(editData.birthDate)}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                  <TextField
                    label="Место жительства"
                    name="occupation"
                    value={editData.occupation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="ВУЗ"
                    name="education"
                    value={editData.education}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Профессия"
                    name="profession"
                    value={editData.profession}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </form>
            </>
          )}
          <div className={styles.associatesGroup}>
            {renderAssociates(sameCityUsers, "Родились в этом же городе:")}
            {renderAssociates(sameEducationUsers, "Учились в этом же ВУЗе:")}
            {renderAssociates(sameOccupationUsers, "Живут в этом же городе:")}
            {renderAssociates(sameProfessionUsers, "Одной профессии с:")}
          </div>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default UserPage;
