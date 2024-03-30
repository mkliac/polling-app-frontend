import {
  Bookmark,
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
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Poll,
  PollFilter,
  PollFitlerType,
  PollItem,
} from "../models/PollModels";
import PollShareModal from "../pages/PollShareModal";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";
import { bookmark, closePoll, deletePoll, vote } from "../services/PollService";
import CustomAvatar from "./CustomAvatar";
import ErrorSnackbar from "./ErrorSnackbar";
import LoadingContent from "./LoadingContent";
import PollItemsButton from "./PollItemsButton";
import TimeSlider from "./TimeSlider";

const PollWidget = ({
  initPoll,
  removePoll,
}: {
  initPoll: Poll;
  removePoll: (id: string) => void;
}) => {
  const [poll, setPoll] = useState<Poll>(initPoll);
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
  const [isSaved, setIsSaved] = useState(initPoll.bookmarked);

  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = searchParams.get("filterType") as PollFitlerType;

  const onVote = (item: PollItem) => {
    setIsLoading(true);
    dispatch(vote({ id: poll.id, itemId: item.id }))
      .unwrap()
      .then((res) => {
        setPoll(res);
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
        avatar={<CustomAvatar src={poll.createdBy?.picture} />}
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
              <MenuItem
                onClick={() => {
                  dispatch(bookmark({ pollId: poll.id, isBookmark: !isSaved }));
                  setIsSaved(!isSaved);
                  if (filterType === PollFilter.BOOKMARKED) {
                    removePoll(poll.id);
                  }
                  handleOptionClose();
                }}
              >
                {isSaved ? <Bookmark /> : <BookmarkBorder />}
                Save
              </MenuItem>
              <MenuItem disabled={!isPollOwner}>
                <ModeEdit />
                Edit
              </MenuItem>
              <MenuItem
                disabled={!isPollOwner}
                onClick={() => {
                  dispatch(closePoll(poll.id))
                    .unwrap()
                    .then((res) => setPoll(res));
                  handleOptionClose();
                }}
              >
                <EventBusy />
                Close
              </MenuItem>
              <MenuItem
                disabled={!isPollOwner}
                onClick={() => {
                  dispatch(deletePoll(poll.id))
                    .unwrap()
                    .then(() => {
                      removePoll(poll.id);
                    });
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
        <PollItemsButton poll={poll} onVote={onVote} />
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
