import React, {useRef} from 'react';
import {SketchField, Tools} from 'react-sketch2';
import {Button} from 'react-bootstrap'


const Draw = () => {
    const sketch = useRef()

    const handleReset = () => {
        const canvas = sketch.current.clear();
        sketch.current._backgroundColor('black')
    }
    const sendData = () => {
        const canvas = sketch.current.toDataURL()
        console.log(canvas)
    }

    const getResult = (id) => {

    }
    return (
        <React.Fragment>
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
                <Button onClick={sendData} variant="primary">Send</Button>
                <Button onClick={handleReset} variant="danger">Reset</Button>
            </div>
        </React.Fragment>
    )
}
export default Draw;