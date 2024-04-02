import { Add, Delete, Home } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fab,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";
import ErrorSnackbar from "../components/ErrorSnackbar";
import FlexBetween from "../components/FlexBwtween";
import LoadingContent from "../components/LoadingContent";
import { Poll, SavePollRequest } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectAppConfig } from "../redux/reducers/ConfigSlice";
import {
  resetSubmitStatus,
  selectPoll,
  selectPollError,
  selectSubmitStatus,
} from "../redux/reducers/PollSlice";
import { savePoll } from "../services/PollService";
import { APIStatus } from "../types/ApiStatusType";
import { getHelperText, isTextValid } from "../utils/TextUtil";
import PollShareModal from "./PollShareModal";

const PollSubmitForm = () => {
  const [items, setItems] = useState([]);
  const [request, setRequest] = useState<SavePollRequest>({
    title: "",
    description: "",
    items: [],
    private: false,
    anonymous: false,
    closedDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Descriptions", "Poll Items", "Poll Settings"];
  const poll: Poll = useAppSelector(selectPoll);
  const status = useAppSelector(selectSubmitStatus);
  const error = useAppSelector(selectPollError);
  const [id, setId] = useState("");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:650px)");
  const pollConfig = useAppSelector(selectAppConfig).pollConfig;
  const navigate = useNavigate();

  const stepBack = () => {
    setActiveStep((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const stepNext = () => {
    setActiveStep((prev) =>
      prev === steps.length - 1 ? steps.length - 1 : prev + 1
    );
  };

  const setTitle = (newTitle: string) => {
    setRequest({ ...request, title: newTitle });
  };

  const setDescription = (newDescription: string) => {
    setRequest({ ...request, description: newDescription });
  };

  const setClosedDate = (newDate: Date) => {
    setRequest({ ...request, closedDate: newDate });
  };

  const setPrivate = (isPrivate: boolean) => {
    setRequest({ ...request, private: isPrivate });
  };

  const setAnonymous = (isAnonymous: boolean) => {
    setRequest({ ...request, anonymous: isAnonymous });
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
    request.items = items;
    dispatch(savePoll(request));
  };

  useEffect(() => {
    if (status === APIStatus.SUCCESS) {
      setId(poll.id);
      setOpen(true);
      dispatch(resetSubmitStatus());
    } else if (status === APIStatus.ERROR) {
      setShowError(true);
    }
  }, [status]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <ErrorSnackbar
        isTriggered={showError}
        setOpen={setShowError}
        message={error}
      />
      <Stepper
        activeStep={activeStep}
        sx={{ padding: "0rem 1rem", width: "100%" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box width={matches ? "40rem" : "98%"} minWidth="20rem">
        <Card
          sx={{
            padding: "1.5rem 0.3rem",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {status === APIStatus.LOADING && <LoadingContent />}
          <Typography variant="h3">{steps[activeStep]}</Typography>
          <CardContent
            sx={{
              width: "100%",
              height: "70vh",
              overflow: "auto",
              scrollbarGutter: "stable",
            }}
          >
            {activeStep === 0 ? (
              <>
                <Typography variant="h6" textAlign="left">
                  Title*
                </Typography>
                <CustomTextField
                  value={request.title}
                  fullWidth
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  inputProps={{ maxLength: pollConfig.maxTitleLength }}
                  error={
                    !isTextValid(
                      request.title,
                      pollConfig.minTitleLength,
                      pollConfig.maxTitleLength
                    )
                  }
                  helperText={getHelperText(
                    request.title,
                    pollConfig.minTitleLength,
                    pollConfig.maxTitleLength
                  )}
                />
                <Typography variant="h6" textAlign="left" marginTop="3rem">
                  Description
                </Typography>
                <CustomTextField
                  value={request.description}
                  fullWidth
                  multiline
                  rows={10}
                  placeholder="(Optional)"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  inputProps={{ maxLength: pollConfig.maxDescriptionLength }}
                  error={
                    !isTextValid(
                      request.description,
                      0,
                      pollConfig.maxDescriptionLength
                    )
                  }
                  helperText={getHelperText(
                    request.description,
                    0,
                    pollConfig.maxDescriptionLength
                  )}
                />
              </>
            ) : activeStep == 1 ? (
              <>
                <Typography textAlign="left" variant="h6">
                  Options
                </Typography>
                <Divider />
                <List
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "85%",
                    overflow: "auto",
                    scrollbarGutter: "stable",
                  }}
                >
                  {items.map((item, idx) => (
                    <ListItem
                      key={idx}
                      sx={{ margin: "0.25rem 0" }}
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
                      <CustomTextField
                        sx={{ marginRight: "0.75rem" }}
                        value={item}
                        fullWidth
                        onChange={(e) => {
                          changeItem(e.target.value, idx);
                        }}
                        inputProps={{ maxLength: pollConfig.maxItemTextLength }}
                        error={
                          !isTextValid(item, 1, pollConfig.maxItemTextLength)
                        }
                        helperText={getHelperText(
                          item,
                          1,
                          pollConfig.maxItemTextLength
                        )}
                      />
                    </ListItem>
                  ))}
                  {items.length < pollConfig.maxPollItems && (
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
              </>
            ) : (
              <>
                <Box
                  display="flex"
                  justifyContent="left"
                  flexDirection="column"
                  gap="1.5rem"
                >
                  <Typography variant="h6" textAlign="left" marginTop="3rem">
                    Accessibility
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="left"
                    flexDirection="column"
                    gap="0.5rem"
                    padding="0rem 2rem"
                  >
                    <FormControlLabel
                      checked={request.private}
                      control={
                        <Switch
                          onChange={(e) => {
                            setPrivate(e.target.checked);
                          }}
                        />
                      }
                      label="Private"
                    />
                    <FormControlLabel
                      checked={request.anonymous}
                      control={
                        <Switch
                          onChange={(e) => {
                            setAnonymous(e.target.checked);
                          }}
                        />
                      }
                      label="Anonymous"
                    />
                  </Box>
                  <Typography variant="h6" textAlign="left" marginTop="3rem">
                    Expiry Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={
                        request.closedDate == undefined
                          ? null
                          : dayjs(request.closedDate)
                      }
                      onChange={(e) => {
                        setClosedDate(new Date(e.toLocaleString()));
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </>
            )}
          </CardContent>
          <FlexBetween>
            <Button
              onClick={() => {
                stepBack();
              }}
              disabled={activeStep === 0}
              color="inherit"
            >
              Back
            </Button>
            <Button
              sx={{
                color:
                  activeStep === steps.length - 1 && id !== ""
                    ? "lightgreen"
                    : "",
              }}
              onClick={() => {
                if (activeStep !== steps.length - 1) {
                  stepNext();
                } else if (id === "") {
                  submitRequest(request);
                } else {
                  setOpen(true);
                }
              }}
            >
              {activeStep !== steps.length - 1
                ? "Next"
                : id === ""
                ? "Submit"
                : "Share"}
            </Button>
          </FlexBetween>
        </Card>
        <Modal open={open} onClose={handleClose}>
          <Box>
            <PollShareModal id={id} />
          </Box>
        </Modal>
        <Fab
          sx={{
            position: "absolute",
            bottom: 16,
            right: matches ? 16 : "50%",
            transform: matches ? "none" : "translateX(50%)",
            bgcolor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            "&:hover": {
              bgcolor: theme.palette.grey[300],
            },
          }}
          onClick={() => {
            navigate("/home");
          }}
        >
          <Home />
        </Fab>
      </Box>
    </Box>
  );
};

export default PollSubmitForm;
