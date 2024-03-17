import {
  BookmarkBorder,
  DeleteForever,
  EventBusy,
  ModeEdit,
  MoreHoriz,
  Share,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Poll, PollItem } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { closePoll, deletePoll, vote } from "../services/PollService";
import CustomAvatar from "./CustomAvatar";
import ErrorSnackbar from "./ErrorSnackbar";
import LoadingContent from "./LoadingContent";
import PollItemsButton from "./PollItemsButton";
import PollShareModal from "../pages/PollShareModal";
import { selectUser } from "../redux/reducers/AuthSlice";
import { removePollInState } from "../redux/reducers/PollSlice";
import TimeSlider from "./TimeSlider";

const PollWidget = ({ initPoll }: { initPoll: Poll }) => {
  const [poll, setPoll] = useState<Poll>(initPoll);
  const [checkItemId, setCheckItemId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShare, setIsShare] = useState(false);
  const isOptionClick = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isPollOwner =
    poll.createdBy !== undefined && poll.createdBy.id === user.id;

  const onVote = (item: PollItem) => {
    setIsLoading(true);
    dispatch(vote({ id: poll.id, itemId: item.id }))
      .unwrap()
      .then((res) => {
        setPoll(res);
        setCheckItemId(item.id);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{ position: "relative", margin: "1.5rem 0", borderRadius: "0.75rem" }}
    >
      <CardHeader
        avatar={<CustomAvatar name={poll.createdBy?.username} />}
        title={poll.createdBy ? poll.createdBy.username : "Anonymous"}
        subheader={poll.createdBy ? poll.createdBy.email : undefined}
        sx={{ padding: "0.5rem 1rem" }}
        titleTypographyProps={{ variant: "h5", textAlign: "left" }}
        subheaderTypographyProps={{ textAlign: "left" }}
        action={
          <Box>
            <IconButton aria-label="settings" onClick={handleOptionClick}>
              <MoreHoriz />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={isOptionClick}
              onClose={handleOptionClose}
              disableScrollLock={true}
            >
              <MenuItem
                onClick={() => {
                  setIsShare(true);
                  handleOptionClose();
                }}
              >
                <Share />
                Share
              </MenuItem>
              <MenuItem>
                <BookmarkBorder />
                Save
              </MenuItem>
              <MenuItem disabled={!isPollOwner}>
                <ModeEdit />
                Edit
              </MenuItem>
              <MenuItem
                disabled={!isPollOwner}
                onClick={() => {
                  dispatch(closePoll(poll.id));
                  handleOptionClose();
                }}
              >
                <EventBusy />
                Close
              </MenuItem>
              <MenuItem
                disabled={!isPollOwner}
                onClick={() => {
                  dispatch(deletePoll(poll.id));
                  dispatch(removePollInState(poll.id));
                  handleOptionClose();
                }}
              >
                <DeleteForever />
                Delete
              </MenuItem>
            </Menu>
          </Box>
        }
      />
      <CardContent sx={{ margin: "0", paddingTop: "0" }}>
        <Typography
          variant="h4"
          sx={{
            mt: "1rem",
            textAlign: "left",
            paddingTop: "0",
            marginTop: "0",
          }}
        >
          {poll.title}
        </Typography>
        <Typography paragraph sx={{ mt: "0.5rem", textAlign: "left" }}>
          {poll.description}
        </Typography>
        {poll.closedDate && (
          <TimeSlider
            date1={new Date(poll.createdAt)}
            date2={new Date(poll.closedDate)}
          />
        )}
        <PollItemsButton
          poll={poll}
          onVote={onVote}
          checkItemId={checkItemId}
        />
        {isLoading && <LoadingContent />}
        <ErrorSnackbar
          isTriggered={isError}
          setOpen={setIsError}
          message={errorMsg}
        />
      </CardContent>
      <Modal open={isShare} onClose={() => setIsShare(false)}>
        <Box>
          <PollShareModal id={poll.id} />
        </Box>
      </Modal>
    </Card>
  );
};

export default PollWidget;
