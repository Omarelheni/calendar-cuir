import React, { useEffect, useState } from "react"
import _ from "lodash"
import { Button } from "react-bootstrap"
import CandidateSchoolModalDialog
    from "../../../../../modules/admin/containers/candidate/components/dialog/AddData/CandidateSchoolModalDialog";

const ButtonField = ({
    label="Add"
}) => {

    return (
        <div>
            <br/>
            <Button>  {label}</Button>

        </div>
    )
}


export default ButtonField