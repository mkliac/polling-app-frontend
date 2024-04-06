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
  CardActions,
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
import { useAppDispatch } from "../redux/hook";
import { bookmark, closePoll, deletePoll, vote } from "../services/PollService";
import { formatRelativeTime } from "../utils/TextUtil";
import CustomAvatar from "./CustomAvatar";
import CustomSnackbar from "./CustomSnackbar";
import EditPollModal from "./EditPollModal";
import ExpireAlarm from "./ExpireAlarm";
import LoadingContent from "./LoadingContent";
import PollItemsButton from "./PollItemsButton";

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
  const [isSaved, setIsSaved] = useState(initPoll.bookmarked);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = searchParams.get("filterType") as PollFitlerType;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const onAvatarClick = () => {
    if (!poll.createdBy) return;

    setSearchParams(
      (prev) => {
        prev.set("filterType", PollFilter.USER);
        prev.set("search", "");
        prev.set("userId", poll.createdBy.email);
        return prev;
      },
      { replace: true }
    );
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    handleOptionClose();
  };

  return (
    <Card sx={{ position: "relative", margin: "0.75rem 0" }}>
      <CardHeader
        avatar={
          <IconButton
            disabled={!poll.createdBy}
            onClick={onAvatarClick}
            sx={{ padding: "0", margin: "0" }}
          >
            <CustomAvatar src={poll.createdBy?.picture} />
          </IconButton>
        }
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <span>
              {poll.createdBy ? poll.createdBy.username : "Anonymous"}
            </span>
            <span style={{ margin: "0 0.4rem" }}>&middot;</span>
            <Typography variant="caption" color="textSecondary">
              {formatRelativeTime(new Date(poll.createdAt))}
            </Typography>
          </div>
        }
        subheader={poll.createdBy ? poll.createdBy.email : undefined}
        sx={{ padding: "0.5rem 1rem" }}
        titleTypographyProps={{ variant: "h5", textAlign: "left" }}
        subheaderTypographyProps={{ textAlign: "left" }}
        action={
          <Box>
            {poll.closedDate && (
              <ExpireAlarm
                date1={new Date(poll.createdAt)}
                date2={new Date(poll.closedDate)}
              />
            )}
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
              <MenuItem disabled={!poll.owner} onClick={openEditModal}>
                <ModeEdit />
                Edit
              </MenuItem>
              <MenuItem
                disabled={!poll.owner}
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
                disabled={!poll.owner}
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
        <PollItemsButton poll={poll} onVote={onVote} />
        {isLoading && <LoadingContent />}
        <CustomSnackbar
          isTriggered={isError}
          setOpen={setIsError}
          message={errorMsg}
        />
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "right" }}>
        <IconButton aria-label="share" onClick={() => setIsShare(true)}>
          <Share />
        </IconButton>
        <IconButton
          aria-label="add to favorites"
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
        </IconButton>
      </CardActions>
      <Modal open={isShare} onClose={() => setIsShare(false)}>
        <Box>
          <PollShareModal id={poll.id} />
        </Box>
      </Modal>
      <Modal open={isEditModalOpen}>
        <Box>
          <EditPollModal
            poll={poll}
            setPoll={setPoll}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Box>
      </Modal>
    </Card>
  );
};

export default PollWidget;
