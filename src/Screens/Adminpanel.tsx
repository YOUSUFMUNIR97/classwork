import React from 'react'
import Dashboard from './Dashboard'
import BAInput from '../Componets/BAInput'
import { Label } from '@mui/icons-material'
import BAButton from '../Componets/BAButton'

const Adminpanel = () => {
  return (
    <>
    <div style={{marginTop:'50px', marginLeft:'1200px'}}>
    <BAButton label='SAVE'/>                                       
    </div>

<div className='py-5'style={{display:'flex',}}>
    <div>
    <BAInput label='QUIZ NAME'/>
    </div>
    <div>
    <BAInput label='QUIZ DURATION'/>
    </div>
    <div>
    <BAInput label='SECRET KEY'/>
    </div>
    </div>
    <BAButton label='Lock Quiz'/>
    </>
  )
}

export default Adminpanel