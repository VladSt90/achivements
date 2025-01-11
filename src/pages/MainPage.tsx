import styled from "@emotion/styled";
import { Settings } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import DisplayAchievement from "../components/DisplayAchievement/DisplayAchivement";
import Loader from "../components/Loader";
import { useAchievements } from "../hooks/useAchievements";
import { StorageService } from "../services/StorageService";

const MainPage: React.FC = () => {
  const { currentAchievement, loading, error, refetch } = useAchievements();
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    const storedLink = StorageService.getGoogleSheetsLink();
    if (!storedLink) {
      setOpen(true);
    } else {
      setLink(storedLink);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Handle saving the link
    console.log("Google Sheets link:", link);
    StorageService.setGoogleSheetsLink(link);
    setOpen(false);
    refetch(); // Redownload achievements using the new link
  };

  const renderContent = useMemo(() => {
    if (loading || !currentAchievement) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
      <AnimatePresence mode="wait">
        <DisplayAchievement
          key={currentAchievement.achievement} // Ensure unique key
          achivement={currentAchievement}
        />
      </AnimatePresence>
    );
  }, [loading, currentAchievement, error]);

  return (
    <Container>
      <IconButton
        color="inherit"
        sx={{ position: "absolute", top: 20, right: 20 }}
        name="settings"
        onClick={handleClickOpen}
      >
        <Settings fontSize="small" />
      </IconButton>
      {renderContent}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Google Sheets Link</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Please make sure your Google Sheets link is in CSV mode.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Google Sheets Link"
            type="url"
            fullWidth
            variant="standard"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom left, #2ec5f3, #007ab9);
`;
