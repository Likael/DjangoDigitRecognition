import React, {useRef, useState} from 'react';
import {SketchField, Tools} from 'react-sketch2';
import {Button, Alert} from 'react-bootstrap'


const Draw = () => {
    const sketch = useRef()
    const axios = require('axios');
    const [sent, setSent] = useState(false)
    const handleReset = () => {
        const canvas = sketch.current.clear();
        sketch.current._backgroundColor('black')
    }
    const sendData = () => {
        const canvas = sketch.current.toDataURL()
        const form = new FormData()
        form.append('image', canvas)
        const headers = {
            'accept': 'application/json'
        }
        axios.post('http://localhost:8000/api/digit/', form, {headers: headers})
            .then(function (response) {
                console.log(response)
                setSent(true);
            }).catch(function (err) {
            console.log(err)
        })
    }

    const getResult = (id) => {

    }
    return (
        <React.Fragment>
            {sent && <Alert variant='dark' onClose={() => setSent(false)} dismissible>Data successfully sent</Alert>}
            <SketchField
                ref={sketch}
                width='500px'
                height='500px'
                tool={Tools.Pencil}
                lineColor='white'
                style={{margin: '0 auto'}}
                backgroundColor='black'
                imageFormat='jpg'
                lineWidth={30}/>
            <div className='mt-3'>
                <Button onClick={sendData} size="lg" variant="primary">Send</Button>
                <Button className='ml-2' onClick={handleReset} size="lg" variant="danger">Reset</Button>
            </div>
        </React.Fragment>
    )
}
export default Draw;