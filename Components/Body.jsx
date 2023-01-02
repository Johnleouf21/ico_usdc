import React from 'react'
import { useContext } from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import Link from 'next/link'
import { ConnectionContext } from '../context'


const Body = () => {

    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

    if (!connected) {
        if (isChainCorrect === null) {
            return (
                <div className='text bodyDiv'>
                    <h2 className='bodyText'>Bienvenue sur le programme ICO de Denarius!</h2>
                    <img width={'auto'} src='/Images/banner_image_min.png' />
                </div>
            )
        } else if (isChainCorrect === false) {
            return (<h1 className='text'>Incorrect Chain!</h1>);
        }
    }
    else if (connected) {
        return (
            <div>
                <ButtonGroup style={{marginBottom:'10px', display: 'flex'}}>
                    <Link href='/'>
                        <ToggleButton style={{margin: '5px'}}>Project</ToggleButton>
                    </Link>
                    <Link href='ICO'>
                        <ToggleButton style={{margin: '5px'}}>ICO</ToggleButton>
                    </Link>
                    <Link href='Staking'>
                        <ToggleButton style={{margin: '5px'}}>Staking</ToggleButton>
                    </Link>
                </ButtonGroup>
            </div>
        );
    }
}

export default Body