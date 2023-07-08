import React, { useState, useEffect } from 'react'
import { Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import axios from 'axios'

function App() {
  const [location, setLocation] = useState('')
  const [datalocation, setDataLocation] = useState('')
  const [sqft, setSqft] = useState('')
  const [bhk, setBhk] = useState(2)
  const [bath, setBath] = useState(2)
  const [predict, setPredict] = useState('')

  useEffect(() => {
    getLocation()
  }, [])


  const getLocation = async () => {
    const res = await axios.get('/get_location_names')
    const { locations } = res.data
    setDataLocation(locations)

  }
  const onSubmit = async (e) => {
    e.preventDefault()

    let inputs = {
      location: location,
      total_sqft: parseFloat(sqft),
      bhk: bhk,
      bath: bath
    }
    const { data } = await axios.post("/predict_home_price", inputs, {

      headers: {
        "Content-type": "multipart/form-data"
      }
    });

    //console.log(data);
    setPredict(Math.abs(data.estimated_price))
  }

  return (
    <div className='container' >
      <Navbar />
      <div className=' main'>
        <div style={{ margin: '20px' }} > <span >Bengaluru Property Prices</span></div>
        <div className='card'>
          <form method="POST" action="#" onSubmit={(e) => onSubmit(e)} >
            <FormControl >
              <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 'bold' }} >Area (Square Feet)</FormLabel>
              <input
                className='option'
                required
                type="number"
                placeholder='1000 sqft'
                onChange={(e) => setSqft(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 'bold' }} >BHK</FormLabel>
              <RadioGroup
                className='input'
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="2"
                row
                name="radio-buttons-group"
                onChange={(e) => setBhk(e.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />

              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 'bold' }}>Bath</FormLabel>
              <RadioGroup
                className='input'
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="2"
                row
                name="radio-buttons-group"
                onChange={(e) => setBath(e.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />

              </RadioGroup>
            </FormControl>

            <FormControl >
              <FormLabel id="demo-radio-buttons-group-label" style={{ fontWeight: 'bold' }} >Location</FormLabel>

              <select
                className='option'
                onChange={(e) => setLocation(e.target.value)}
              >
                {datalocation && datalocation.map((loc) => (
                  <option key={loc} value={loc} >{loc}</option>
                ))}
              </select>
            </FormControl>

            <Button className='button' onClick={(e) => onSubmit(e)} variant="contained" color="success">
              Estimate Price
            </Button>
          </form>
          <div style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            {predict ? <div className='predict'>{predict} lakh</div> : ''}
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
