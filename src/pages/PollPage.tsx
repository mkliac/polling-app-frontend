import { Add, DeleteForever, EventBusy, Remove } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Poll } from "../models/PollModels";
import { User } from "../models/UserModel";
import PollService from "../services/PollService";
import LoadingPage from "./LoadingPage";
import PollItemsButton from "../components/PollItemsButton";

const PollForm = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState<Poll>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: { user: User }) => state.user);


  useEffect(() => {
    setIsLoading(true);
    PollService.getPoll(id)
      .then((data) => {
        setPoll(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  const onDeletePoll = () => {
    setIsLoading(true);
    PollService.deletePoll(id)
      .then(() => {
        setPoll(undefined);
        setIsLoading(false);
        alert("Poll deleted");
      })
      .catch((e) => console.log(e));
  };

  const onClosePoll = () => {
    setIsLoading(true);
    PollService.close(id)
      .then((data) => {
        setPoll(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
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
      {poll === undefined ? (
        <div>Poll with id {id} not exist </div>
      ) : (
        <Card sx={{ width: "550px", padding: "5px 5px", margin: "0 auto" }}>
          {user.username === poll.createdBy.username && (
            <CardHeader
              action={
                <Stack direction="row">
                  <Tooltip title="Add Options">
                    <IconButton>
                      <Add fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Options">
                    <IconButton>
                      <Remove fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close Poll">
                    <IconButton onClick={() => onClosePoll()}>
                      <EventBusy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Poll">
                    <IconButton onClick={() => onDeletePoll()}>
                      <DeleteForever fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />
          )}
          <CardContent
            sx={{
              maxWidth: "550px",
              maxHeight: "80vh",
              overflow: "auto",
              scrollbarGutter: "stable",
            }}
          >
            <Box sx={{ marginBottom: "12px" }}>
              {poll.closedDate && (
                <Typography textAlign="right">
                  Expiry Date:{" "}
                  {new Date(poll.closedDate).toLocaleDateString("en-GB")}
                </Typography>
              )}
              <Typography
                textAlign="left"
                variant="h3"
                component="div"
                sx={{ wordWrap: "break-word" }}
              >
                {poll.title}
              </Typography>
              <Typography textAlign="right">
                {poll.createdBy?.username}
              </Typography>
              <Divider />
              <Typography textAlign="left" variant="body1">
                {poll.description}
              </Typography>
            </Box>
            <PollItemsButton poll={poll} setPoll={setPoll} />
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PollForm;
