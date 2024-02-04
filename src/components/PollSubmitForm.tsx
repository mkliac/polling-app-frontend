import { Add, Delete } from "@material-ui/icons";
import { Button, Card, CardContent, FormControlLabel, Grid, IconButton, Switch, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SavePollRequest } from "../models/PollModels";
import PollService from "../services/PollService";
import { useNavigate } from "react-router-dom";

const PollSubmitForm = () => {
    const [items, setItems] = useState([]);
    const [request] = useState<SavePollRequest>(
        {title: '', 
        description: '', 
        items: [], 
        isPrivate: false,
        isAnonymous: false,
        closedDate: undefined});
    const navigate = useNavigate();
    
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    }

    const addItem = (newItem) => {
        setItems([...items, newItem]);
    }

    const changeItem = (newVal, index) => {
        let newItems = [...items];
        newItems[index] = newVal;
        setItems(newItems);
    }

    const submitRequest = (request:SavePollRequest) => {
        request.items = items;
        PollService.savePoll(request)
        .then((res) => {
            console.log(res);
            navigate(`/polls/${res.id}`)
        })
        .catch((e) => console.log(e));
    }

    return (
        <div>
            <Card style={{maxWidth: 550, padding: "20px 5px", margin: "0 auto"}}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Title" required placeholder="Title must not be empty" 
                                        onChange={(e) => {request.title=e.target.value}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline rows={4} label="Description" placeholder="(Optional)" 
                                        onChange={(e) => {request.description=e.target.value}}/>
                        </Grid>
                        {items.map((item, idx) => 
                            <Grid item container spacing={1} key={idx}>
                                <Grid item xs>
                                    <TextField value={item} fullWidth onChange={(e) => {changeItem(e.target.value, idx)}} />
                                </Grid>
                                <Grid item width={56}>
                                    <IconButton onClick={() => {removeItem(idx)}}>
                                        <Delete fontSize="inherit"/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <IconButton onClick={() => {addItem('')}}>
                                <Add />
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <FormControlLabel
                                control={
                                    <Switch onChange={(e) => {request.isPrivate=e.target.checked}}/>
                                }
                                label="Private"
                            />
                        </Grid>
                        <Grid item xs>
                            <FormControlLabel
                                    control={
                                        <Switch onChange={(e) => {request.isAnonymous=e.target.checked}}/>
                                    }
                                    label="Anonymous"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={(e) => {request.closedDate=new Date(e.toLocaleString())}}/>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={() => submitRequest(request)}>Submit</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default PollSubmitForm