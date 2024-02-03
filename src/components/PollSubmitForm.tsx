import { Add, Delete } from "@material-ui/icons";
import { Button, Card, CardContent, Grid, IconButton, Switch, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SavePollRequest } from "../models/PollModels";
import PollService from "../services/PollService";

const PollSubmitForm = () => {
    const [request, setRequest] = useState<SavePollRequest>(
        {title: '', 
        description: '', 
        items: [], 
        isPrivate: false,
        isAnonymous: false,
        closedDate: undefined});

    // const [pollItems, setPollItems] = useState<string[]>([]);
    
    const removeItem = (index) => {
        setRequest({
            ...request,
            items: request.items.filter((_, i) => i !== index)
        });
    }

    const addItem = (newItem) => {
        setRequest({
            ...request,
            items: [...request.items, newItem]
        });
    }

    const submitRequest = (request:SavePollRequest) => {
        PollService.savePoll(request).then((res) => console.log(res));
    }

    return (
        <div>
            <Card style={{maxWidth: 450, padding: "20px 5px", margin: "0 auto"}}>
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
                        {request.items.map((_item, idx) => 
                            <Grid item xs={12} key={idx}>
                                <TextField fullWidth onChange={(e) => {request.items[idx]=e.target.value}} />
                                <IconButton key={idx} onClick={() => {removeItem(idx)}}>
                                    <Delete />
                                </IconButton>
                            </Grid>)}
                        <Grid item xs={12}>
                            <IconButton onClick={() => {addItem('')}}>
                                <Add />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Switch onChange={(e) => {request.isPrivate=e.target.checked}}/>
                            <Switch onChange={(e) => {request.isAnonymous=e.target.checked}}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* TODO: add date to request */}
                                {/* <DatePicker onChange={(e) => {setRequest({...request, closedDate: e.value})}}/> */}
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