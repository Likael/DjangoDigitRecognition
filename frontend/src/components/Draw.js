import React from 'react';
import {SketchField, Tools} from 'react-sketch2';
import {Button} from 'react-bootstrap'

const Draw = () => {


    return (
        <React.Fragment>
            <SketchField width='500px'
                         height='500px'
                         tool={Tools.Pencil}
                         lineColor='white'
                         style={{margin : '0 auto'}}
                         backgroundColor='black'
                         imageFormat='jpg'
                         lineWidth={30}/>
            <div className='mt-3'>
                <Button onClick={()=>{}} variant="primary">Send</Button>
                <Button onClick={()=>{}} variant="danger">Reset</Button>
            </div>
        </React.Fragment>
    )
}
export default Draw;