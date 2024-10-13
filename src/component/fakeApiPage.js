import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, CircularProgress, Grid, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';


const FakeApiPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts"); // Fake API
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Fake API Data
      </Typography >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {data.slice(0, 9).map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card >
                <CardContent style={{height :"30vh"}}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" style={{height :"12vh"}}>{item.body}</Typography>
                  <IconButton  onClick={handleClickOpen} >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>      
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={fetchData}
        style={{ marginTop: "20px" }}
      >
        Create New Post
      </Button>

      <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want  Remove this Post !!!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> <CloseIcon /></Button>
          <Button onClick={handleClose} autoFocus>
          <CheckIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    </Container>
  );
};

export default FakeApiPage;
