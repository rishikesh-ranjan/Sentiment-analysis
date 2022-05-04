import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/ExpandMore';

import './app.css';

function App() {
  const [text, setText] = React.useState()
  const [pred, setPred] = React.useState(null)
  const [sat,setSat] = React.useState(null)
  const [desired,setDesired] = React.useState(null)
  const [yes, setYes] = React.useState(null)
  const [no, setNo] = React.useState(null)
  const [submit, setSubmit] =React.useState(false)

  var formData = new FormData()
  formData.append('text', text); 

  async function analyze() {
    await axios({
      method: 'post',
      url: 'https://sentiment-analysis-py4.herokuapp.com/predict',
      data: formData,
      headers:{"Content-Type": "multipart/form-data"}, 
      withCredentials: true
    }).then((props) => {
      console.log(props)
      setPred(props.data.prediction)
    }).catch(function (response) {
      console.log(response);
    });
  }

  async function analyzeAgain() {
    setPred(null)
    location.reload()
  }

  async function satisfaction(value) {
    // await axios({
    //   method: 'post',
    //   data: {
    //     text: text,
    //     result: pred,
    //     satisfaction: value,
    //     desiredResult: desired
    //   },
    //   headers:{"Content-Type": "multipart/form-data"}, 
    //   withCredentials: true,
    //   url: 'http://localhost:8000/app/sentiment',
    // }).then((props) => {
    //   console.log(props)
    // }).catch(function (response) {
    //   console.log(response);
    // });

    await axios.post('https://sentiment-analysis4.herokuapp.com/app/sentiment', {
        text: text,
        result: pred,
        satisfaction: value,
        desiredResult: desired
    })
  }

  return (
    <div className="App">
      <div className='x'>
       <h1>Bang in your text 
           and see what it
          sounds like...</h1>
       <p>
       This is a sentiment analysis tool. Whatever you
       wanna say, add it to this textbox and find our
       what kind of sentiment it conveys.
       </p>
      </div>
      <div className='y'>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40vw' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-multiline-static"
          label="Give your text here"
          multiline
          rows={12}
          variant="filled"
          fullWidth
          size="large"
          onChange={(e)=>setText(e.target.value)}
        />
      </div>
    </Box>
    {pred !== null &&
      <div>
      <p>It sounds <b style={{fontSize: "20px"}}>{pred == '0'? 'Negative' : (pred == '1' ? 'Neutral' : 'Positive')}</b></p>
      </div>
    }
    

    {pred !== null ? 
    <>
    { sat == null ?
    <>
      <p>Are you satisfied by the result</p>
      <ToggleButton id="toggle"
          value="check"
          selected={yes}
          onChange={() => {
            setYes(!yes)
            // satisfaction(true)
            setSat(true)
          }}
          >
          Yes
      </ToggleButton>
      <ToggleButton id="toggle"
          value="check"
          selected={no}
          onChange={() => {
            setNo(!no);
            setSat(false)
          }}
          
          >
          No
      </ToggleButton>
     </> :
     (sat === true ? 
     <>
     <p>Thank you for your feedback.</p>
     </>
     : 
     ( !submit ?  
     <>
     <p>
     <TextField id="outlined-basic" 
       label="Enter your desired result" variant="outlined" 
       margin="dense" size="small"
       onChange={(e)=>setDesired(e.target.value)}
      />
     </p>
     <Button variant="outlined" size="small" onClick={()=>{satisfaction(false); setSubmit(true)}}>
        Submit
     </Button>
     </>
     :
     <p>Thank you for your feedback.</p>
     )
      )
     }
     <br/>
    <Button 
    variant="contained"
    onClick = {analyzeAgain}
    >Analyze Again</Button>
    </>
    :
    <Button 
    variant="contained"
    onClick = {analyze}
    >Analyze</Button>
    }
    
      </div>
      

    </div>
  );
}

export default App;



