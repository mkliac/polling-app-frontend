import { Add, Cancel, Delete, Remove, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Poll } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectAppConfig } from "../redux/reducers/ConfigSlice";
import {
  resetUpdateStatus,
  selectPollError,
  selectUpdatePollStatus,
} from "../redux/reducers/PollSlice";
import { updatePoll } from "../services/PollService";
import { APIStatus } from "../types/ApiStatusType";
import { getHelperText, isTextValid } from "../utils/TextUtil";
import CustomSnackbar from "./CustomSnackbar";
import CustomTextField from "./CustomTextField";
import LoadingContent from "./LoadingContent";

const EditPollModal = ({
  poll,
  setPoll,
  onClose,
}: {
  poll: Poll;
  setPoll: (poll: Poll) => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState<string>(poll.title);
  const [description, setDescription] = useState<string>(poll.description);
  const [removeItemIds, setRemoveItemIds] = useState<string[]>([]);
  const [newItemTexts, setNewItemTexts] = useState<string[]>([]);
  const [closedDate, setClosedDate] = useState<Date>(poll.closedDate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const error = useAppSelector(selectPollError);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const status = useAppSelector(selectUpdatePollStatus);
  const pollConfig = useAppSelector(selectAppConfig).pollConfig;
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(min-width:650px)");
  const theme = useTheme();

  const addRemoveItem = (id: string) => {
    setRemoveItemIds([...removeItemIds, id]);
  };

  const deleteRemoveItem = (id: string) => {
    setRemoveItemIds(removeItemIds.filter((itemId) => itemId !== id));
  };

  const addNewItem = (text: string) => {
    setNewItemTexts([...newItemTexts, text]);
  };

  const deleteNewItem = (idx: number) => {
    setNewItemTexts(newItemTexts.filter((_, index) => index !== idx));
  };

  const onNewItemChange = (idx: number, text: string) => {
    let newItems = [...newItemTexts];
    newItems[idx] = text;
    setNewItemTexts(newItems);
  };

  const handleSave = () => {
    dispatch(
      updatePoll({
        id: poll.id,
        title,
        description,
        removeItemIds,
        addItemTexts: newItemTexts.filter((text) => text !== ""),
        closedDate,
      })
    )
      .unwrap()
      .then((res) => {
        setPoll(res);
        setTitle(res.title);
        setDescription(res.description);
        setClosedDate(res.closedDate);
        setRemoveItemIds([]);
        setNewItemTexts([]);
      });
  };

  useEffect(() => {
    if (status === APIStatus.LOADING) {
      setIsLoading(true);
    } else if (status !== APIStatus.IDLE) {
      setIsLoading(false);
      setShowMsg(true);
    }
  }, [status]);

  useEffect(() => {
    if (!showMsg) {
      dispatch(resetUpdateStatus());
    }
  }, [showMsg]);

  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: matches ? "40rem" : "95%",
      }}
    >
      <Card
        sx={{
          padding: "1.5rem 0.3rem",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            height: "70vh",
            overflow: "auto",
            scrollbarGutter: "stable",
          }}
        >
          <Typography variant="h6" textAlign="left">
            Title*
          </Typography>
          <CustomTextField
            value={title}
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            inputProps={{ maxLength: pollConfig.maxTitleLength }}
            error={
              !isTextValid(
                title,
                pollConfig.minTitleLength,
                pollConfig.maxTitleLength
              )
            }
            helperText={getHelperText(
              title,
              pollConfig.minTitleLength,
              pollConfig.maxTitleLength
            )}
          />
          <Typography variant="h6" textAlign="left" marginTop="1.2rem">
            Description
          </Typography>
          <CustomTextField
            value={description}
            fullWidth
            multiline
            rows={5}
            placeholder="(Optional)"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            inputProps={{ maxLength: pollConfig.maxDescriptionLength }}
            error={
              !isTextValid(description, 0, pollConfig.maxDescriptionLength)
            }
            helperText={getHelperText(
              description,
              0,
              pollConfig.maxDescriptionLength
            )}
          />
          <Typography variant="h6" textAlign="left" marginTop="1.2rem">
            Options
          </Typography>
          <Stack gap={1}>
            {poll.items.map((item) => (
              <Box
                key={item.id}
                display="flex"
                gap="0.1rem"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <TextField
                  disabled
                  value={item.text}
                  fullWidth
                  size="small"
                  sx={{
                    backgroundColor: removeItemIds.includes(item.id)
                      ? theme.palette.grey[300]
                      : "white",
                  }}
                />
                <IconButton
                  onClick={() => {
                    if (removeItemIds.includes(item.id)) {
                      deleteRemoveItem(item.id);
                    } else {
                      addRemoveItem(item.id);
                    }
                  }}
                  size="medium"
                >
                  <Remove fontSize="medium" />
                </IconButton>
              </Box>
            ))}
            <Stack gap={3}>
              {newItemTexts.map((text, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  gap="0.1rem"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <TextField
                    value={text}
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiFormHelperText-root": {
                        position: "absolute",
                        top: "100%",
                      },
                    }}
                    onChange={(e) => onNewItemChange(idx, e.target.value)}
                    inputProps={{ maxLength: pollConfig.maxItemTextLength }}
                    error={!isTextValid(text, 1, pollConfig.maxItemTextLength)}
                    helperText={getHelperText(
                      text,
                      1,
                      pollConfig.maxItemTextLength
                    )}
                  />
                  <IconButton
                    onClick={() => {
                      deleteNewItem(idx);
                    }}
                    size="medium"
                  >
                    <Delete fontSize="medium" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
            {poll.items.length - removeItemIds.length + newItemTexts.length <
              pollConfig.maxPollItems && (
              <Box display="flex" justifyContent="center">
                <IconButton
                  onClick={() => {
                    addNewItem("");
                  }}
                >
                  <Add />
                </IconButton>
              </Box>
            )}
          </Stack>
          <Typography variant="h6" textAlign="left" marginTop="1.2rem">
            Accessibility
          </Typography>
          <FormControlLabel
            checked={poll.private}
            control={<Switch disabled />}
            label="Private"
          />
          <FormControlLabel
            checked={poll.anonymous}
            control={<Switch disabled />}
            label="Anonymous"
          />
          <Typography variant="h6" textAlign="left" marginTop="1.2rem">
            Closed Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={closedDate === null ? null : dayjs(closedDate)}
              onChange={(e) => {
                setClosedDate(new Date(e.toLocaleString()));
              }}
            />
          </LocalizationProvider>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "right" }}>
          <Button
            aria-label="cancel"
            onClick={() => {
              dispatch(resetUpdateStatus());
              onClose();
            }}
            color="warning"
          >
            <Cancel />
            Cancel
          </Button>
          <Button aria-label="save" onClick={handleSave} variant="outlined">
            <Save />
            Save
          </Button>
        </CardActions>
        {isLoading && <LoadingContent />}
        <CustomSnackbar
          isTriggered={showMsg}
          setOpen={setShowMsg}
          message={status === APIStatus.SUCCESS ? "Saved" : error}
          serverity={status === APIStatus.SUCCESS ? "success" : "error"}
        />
      </Card>
    </Box>
  );
};

export default EditPollModal;
