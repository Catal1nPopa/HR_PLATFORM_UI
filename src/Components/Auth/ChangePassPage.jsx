import {
  styled,
  IconButton,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SwitchLanguage from "../../Translate/SwitchLanguage";
import { useNavigate } from "react-router-dom";
import black_mode from "../../assets/Login/black.jpg";
import white_mode from "../../assets/Login/white.jpg";
import useAuth from "./UseAuth";
import { MdOutlineModeNight, MdOutlineLightMode } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== "darkMode",
})(({ darkMode }) => ({
  backgroundImage: `url(${darkMode ? black_mode : white_mode})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

const BlurOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backdropFilter: "blur(8px)",
  zIndex: 1,
});

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "darkMode",
})(({ theme, darkMode }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[15],
  // border: `1px solid ${darkMode ? "white" : "black"}`,
  padding: theme.spacing(3),
  position: "relative",
  width: "100%",
  maxWidth: 500,
  zIndex: 2,
}));

const ChangePassPage = ({ darkMode, toggleDarkTheme }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [codEmployee, setcodEmployee] = useState("");
  const [error, setError] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    try {
      const response = await fetch("/api/Auth/ChangePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, codEmployee }),
      });

      if (response.ok) {
        toast.success("Schimbare parola cu success:");
        navigate("/login");
      } else {
        toast.error("Login failed.");
        setError(true);
      }
    } catch (error) {
      toast.error("Error");
      setError(true);
    }
  };

  return (
    <StyledContainer darkMode={darkMode} maxWidth={false}>
      <CssBaseline />
      <BlurOverlay />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          zIndex: 2, // Ensure the language switch button is above the blur overlay
        }}
      >
        <Box sx={{ flexGrow: 1 }}></Box>
        <SwitchLanguage sx={{ marginRight: 2 }} />
      </Box>
      <StyledCard darkMode={darkMode}>
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <IconButton onClick={toggleDarkTheme}>
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineModeNight />}
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
          }}
        >
          <Button onClick={() => navigate("/login")}>
            <IoMdArrowRoundBack
              size={27}
              color={darkMode ? "white" : "black"}
            />
          </Button>
        </Box>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography
                variant='h5'
                sx={{
                  fontStyle: "italic",
                  fontFamily: "Helvetica Neue",
                  fontSize: "3rem",
                }}
              >
                {t("ChangePassword")}
              </Typography>
            </Box>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              variant='standard'
              autoFocus
              value={username}
              autoComplete='username'
              onChange={(e) => setUsername(e.target.value)}
              error={error}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              name='password'
              label={t("Password")}
              type='password'
              variant='standard'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='codEmployee'
              name='codEmployee'
              label={t("codEmployee")}
              type='number'
              variant='standard'
              autoComplete='false'
              value={codEmployee}
              onChange={(e) => setcodEmployee(e.target.value)}
              error={error}
              helperText={error ? "Datele introduse nu sunt valide" : ""}
            />
            <Button
              fullWidth
              variant='contained'
              color='info'
              sx={{ mt: 3, mb: 2 }}
              type='submit'
            >
              {t("Save")}
            </Button>
          </form>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default ChangePassPage;
