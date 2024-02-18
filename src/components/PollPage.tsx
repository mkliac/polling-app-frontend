import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Poll, PollItem } from "../models/PollModels";
import PollService from "../services/PollService";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import LoadingPage from "./LoadingPage";

const PollForm = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState<Poll>(undefined);
  const [totalVotes, setTotalVotes] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const calItemContribution = (item: PollItem) => {
    return totalVotes === 0 ? 0 : (item.voteCount * 100.0) / totalVotes;
  };

  useEffect(() => {
    setIsLoading(true);
    PollService.getPoll(id)
      .then((data) => {
        setPoll(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setTotalVotes(
      poll !== undefined
        ? poll.items.map((i) => i.voteCount).reduce((a, b) => a + b)
        : 0
    );
  }, [poll]);

  const onVote = (item: PollItem) => {
    setIsLoading(true);
    PollService.vote(poll.id, item.id)
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
      <Modal open={isLoading}>
        <Box>
          <LoadingPage />
        </Box>
      </Modal>
      {poll && (
        <Card sx={{ width: "550px", padding: "20px 5px", margin: "0 auto" }}>
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
            <Stack overflow="auto" spacing={2} sx={{ flex: 1 }}>
              {poll.items.map((item, idx) => (
                <Button
                  key={idx}
                  sx={{ textTransform: "none" }}
                  onClick={() => onVote(item)}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography textAlign="left">{item.text}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                          sx={{ height: "16px" }}
                          variant="determinate"
                          value={calItemContribution(item)}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >{`${Math.round(
                          calItemContribution(item)
                        )}%`}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PollForm;
