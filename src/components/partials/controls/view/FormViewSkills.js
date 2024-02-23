/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useRef } from "react"
import { FormattedMessage } from "react-intl"

import { Card, CardBody, CardHeader, CardHeaderToolbar, ModalProgressBar, FlashMessages } from "../../controls"
import _ from "lodash"

import { isRLTLang } from "./../../../../i18n"

import { Button } from "react-bootstrap"

const FormViewSkills = ({ children, title, goBackTo, goToDisplay, successMsg = [], toolBar, isLoading, error, onClose }) => {

    const saveRef = useRef()

    const onSave = () => {
        if (saveRef && saveRef.current) {
            saveRef.current.click()
        }
    }

    return (
        <Card>
            <FlashMessages successMsg={successMsg} error={error} onClose={onClose} />
            {isLoading && <ModalProgressBar />}
            <CardBody >
                {children  ({ saveRef })}
                <div style={{ display: "flex" }} >
                <Button
                    disabled={isLoading}
                    onClick={onSave}
                    type="button"
                    className="btn btn-sm btn-primary  mx-2"
                    style={{marginLeft: "auto"}}
                >
                    {isLoading && <span className="px-5 spinner spinner-white"></span>}
                    <FormattedMessage id="GENERAL.SAVE" />
                </Button>
                </div>

            </CardBody>
        </Card>
    )
}


export default FormViewSkills
