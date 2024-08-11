import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import http from "../../instance"; // presupun că este configurat corect pentru Axios
import axios from "axios";
const ProfilePage = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [employeeId, setEmployeeId] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !employeeId) {
      alert("Please select a file and enter an Employee ID.");
      return;
    }

    const formData = new FormData();
    formData.append("EmployeeId", employeeId);
    formData.append("File", file);

    try {
      const response = await http.post("/api/CV/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("CV uploaded successfully.");
      } else {
        alert("Failed to upload CV1.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload CV2.");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await http.get(
        `/api/CV/GetCV?codeEmployee=${employeeId}`,
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "CV.pdf");
        document.body.appendChild(link);
        link.click();
      } else {
        alert("Failed to download CV.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to download CV.");
    }
  };

  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        {t("ProfilePage")}
      </Typography>
      <input type='file' onChange={handleFileChange} />
      <input
        type='text'
        value={employeeId}
        onChange={handleEmployeeIdChange}
        placeholder='Employee ID'
      />
      <button onClick={handleUpload}>Upload CV</button>

      <button onClick={handleDownload}>Download CV</button>
    </Box>
  );
};

export default ProfilePage;
