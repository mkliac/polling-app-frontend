import { Divider, Typography } from "@mui/material";
import { useState } from "react";
import { Poll } from "../models/PollModels";
import PollItemsButton from "./PollItemsButton";
import WidgetWrapper from "./WidgetWrapper";

const PollWidget = ({ poll }: { poll: Poll }) => {
  const [myPoll, setMyPoll] = useState<Poll>(poll);
  return (
    <WidgetWrapper m="2rem 0">
      <Typography variant="h4" sx={{ mt: "1rem", textAlign: "left" }}>
        {poll.title}
      </Typography>
      <Typography paragraph sx={{ mt: "0.5rem", textAlign: "left" }}>
        {poll.description}
      </Typography>
      <Divider />
      <br />
      <PollItemsButton poll={myPoll} setPoll={setMyPoll} />
    </WidgetWrapper>
  );
};

export default PollWidget;
