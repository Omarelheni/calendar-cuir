import React, { useEffect, useState } from "react"
import { SnackbarProvider } from "notistack"
import { Snackbars, SnackbarError } from "../../controls"
import { isEmpty } from "lodash"
import { useDispatch } from "react-redux"
import SnackbarUploadFileError from "../snackbars/SnackbarUploadFileError";

const FlashMessageUploadError = ({ error, onClose }) => {

    const dispatch = useDispatch()

    const [showError, setShowError] = useState(false)
    const [errorObj, setError] = useState(false)

    useEffect(() => {
        if (!isEmpty(error) && !showError) {
            setShowError(true)
            setError(error)
            dispatch(onClose())
        }

        if (!isEmpty(error) && showError) {
            setShowError(false)
            setError(error)
            dispatch(onClose())
            setShowError(true)
        }

        // eslint-disable-next-line
    }, [error])


    const onCloseErrorMessage = () => {
        setShowError(false)
        setError(null)
    }


    return (
        <SnackbarProvider maxSnack={3}>
            { showError && <SnackbarUploadFileError open={true}  error={errorObj} onClose={onCloseErrorMessage} />}
        </SnackbarProvider>
    )
}


export default FlashMessageUploadError
