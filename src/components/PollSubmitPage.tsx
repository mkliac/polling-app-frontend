import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { SavePollRequest } from "../models/PollModels";
import PollService from "../services/PollService";
import LoadingPage from "./LoadingPage";
import PollShareModal from "./PollShareModal";

const PollSubmitForm = () => {
  const [items, setItems] = useState([]);
  const [request, setRequest] = useState<SavePollRequest>({
    title: "",
    description: "",
    items: [],
    isPrivate: false,
    isAnonymous: false,
    closedDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setTitle = (newTitle: string) => {
    setRequest({ ...request, title: newTitle });
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const changeItem = (newVal, index) => {
    let newItems = [...items];
    newItems[index] = newVal;
    setItems(newItems);
  };

  const submitRequest = (request: SavePollRequest) => {
    setIsLoading(true);
    request.items = items;
    PollService.savePoll(request)
      .then((res) => {
        setOpen(true);
        setId(res.id);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <LoadingPage isLoading={isLoading} />
      <Card sx={{ padding: "20px 5px", margin: "0 auto" }}>
        <Typography variant="h3">Create Poll</Typography>
        <CardContent
          sx={{
            maxWidth: "550px",
            maxHeight: "80vh",
            overflow: "auto",
            scrollbarGutter: "stable",
          }}
        >
          <Typography variant="h6" textAlign="left">
            Title*
          </Typography>
          <TextField
            fullWidth
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            error={request.title === ""}
            helperText={request.title === "" ? "Required Field!" : ""}
          />
          <Typography variant="h6" textAlign="left">
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="(Optional)"
            onChange={(e) => {
              request.description = e.target.value;
            }}
          />
          <Box margin="8px 0px">
            <Typography textAlign="left" variant="h6">
              Options
            </Typography>
            <Divider />
            <List
              sx={{
                position: "relative",
                width: "100%",
                height: "200px",
                overflow: "auto",
                scrollbarGutter: "stable",
              }}
            >
              {items.map((item, idx) => (
                <ListItem
                  key={idx}
                  secondaryAction={
                    <IconButton
                      onClick={() => {
                        removeItem(idx);
                      }}
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <TextField
                    sx={{ marginRight: "12px" }}
                    value={item}
                    fullWidth
                    onChange={(e) => {
                      changeItem(e.target.value, idx);
                    }}
                    error={item === ""}
                    helperText={item === "" ? "Required Field!" : ""}
                  />
                </ListItem>
              ))}
              {items.length < 10 && (
                <IconButton
                  onClick={() => {
                    addItem("");
                  }}
                >
                  <Add />
                </IconButton>
              )}
            </List>
            <Divider />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "6px 0px",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  onChange={(e) => {
                    request.isPrivate = e.target.checked;
                  }}
                />
              }
              label="Private"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={(e) => {
                    request.isAnonymous = e.target.checked;
                  }}
                />
              }
              label="Anonymous"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(e) => {
                  request.closedDate = new Date(e.toLocaleString());
                }}
              />
            </LocalizationProvider>
          </Box>
          <Button variant="contained" onClick={() => submitRequest(request)}>
            Create
          </Button>
        </CardContent>
      </Card>
      <Modal open={open}>
        <Box>
          <PollShareModal id={id} />
        </Box>
      </Modal>
    </Box>
  );
};

export default PollSubmitForm;
