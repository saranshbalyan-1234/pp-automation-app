import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
export default function Test() {
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setDisabled(false)
        }, 500)
    }, [])

    return (
        <div>
            <input disabled={disabled} />
        </div>
    )
}
const StyledStep = styled.div`
    padding: 100px;
    .ant-steps {
        height: 150px;
    }
`
