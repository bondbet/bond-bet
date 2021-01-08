import React, {useContext, useEffect} from 'react'
import AppContext from '../../ContextAPI'

const YouLoss = () => {
    const { setOpenModal, setModalType } = useContext(AppContext);

    useEffect(() => {
        setOpenModal(true)
        setModalType('PA')
    }, [setOpenModal, setModalType])

    return (
        <div></div>
    )
}

export default YouLoss