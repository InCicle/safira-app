import axios from "axios";

export const api = axios.create({
  baseURL: "https://schedule-lumen-stage.incicle.com/api/",
  headers: {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zY2hlZHVsZS1sdW1lbi1zdGFnZS5pbmNpY2xlLmNvbVwvYXBpXC9hdXRoXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE2NDQ4NTQ0NDQsImV4cCI6MTY4MTE0MjQ0NCwibmJmIjoxNjQ0ODU0NDQ0LCJqdGkiOiJHaHduRDBEZDYxbzROWTRMIiwic3ViIjoiY2MxMjc0MWItMDE5Ni00ZjY5LWJmNWUtNDQzMmMyYzU0NDExIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVzZXIiOnsiaWQiOiJjYzEyNzQxYi0wMTk2LTRmNjktYmY1ZS00NDMyYzJjNTQ0MTEiLCJ1c2VybmFtZSI6InRoYWxpc3NvbjQyIiwiZW1haWwiOiJ0aGFsaXNzb24uYmFuZGVpcmFAaG90bWFpbC5jb20iLCJ0eXBlIjoiUEVSU09OIiwicHJvZmlsZV9pZCI6IjFmY2YwMDNiLThiMWQtNGNlOS04NDk3LWY0MTk2NGYwYzJjMiIsImNvbmZpZyI6eyJtYXN0ZXIiOmZhbHNlLCJhdXRoMmYiOmZhbHNlLCJkZWZhdWx0X2xhbmd1YWdlIjoicHQtYnIiLCJkZWZhdWx0X2ludGVyZmFjZSI6IkxJR0hUIiwic2NoZWR1bGVfZGVmYXVsdCI6ImYwYWIyYTUwLWYyMDItNGUwNy1hZmVkLTkyZWY1OTc2NDEzOSJ9fX0.0_ruL-GBeHGG7DAbsc4uBgL_mEftGCQB0U6nd6czjzM`,
  },
});

export const user = {
  config: {
    auth2f: false,
    default_interface: "LIGHT",
    default_language: "pt-br",
    layout_name: "idk",
  },
  profile_id: "abc",
  email: "person@hotmail.com",
  id: "123",
  type: "PERSON",
  username: "person@username",
};

export const profiles = {
  user_id: "123",
  username: "person@username",
  name: "Person Name",
  type: "PERSON",
  profile_id: "456",
  avatar: "avatar.png",
  companies: [],
  profile_config: {},
  user_config: user.config,
};
