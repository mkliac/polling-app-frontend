import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Poll } from "../models/PollModels";
import { User } from "../models/UserModel";
import PollService from "../services/PollService";
import PollWidget from "./PollWidget";

const PollsWidget = () => {
  const user = useSelector((state: { user: User }) => state.user);
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    // Fetch all polls
    PollService.getPolls()
      .then((data) => {
        setPolls(data);
      })
      .catch(() => {
        console.log("Failed to fetch polls");
      });
  }, []);

  return (
    <>
      {polls.map((poll) => (
        <PollWidget poll={poll} key={poll.id} />
      ))}
    </>
  );
};

export default PollsWidget;
