import React, { useState } from 'react'
import Loading from '../Components/Common/Loading'
export default function AboutUs() {
    const [loading, setLoading] = useState(true)
    return (
        <Loading loading={loading} tip="Loading">
            <iframe style={{ minWidth: "100vw", minHeight: "100vh", border: 0 }}
                src="https://saranshbalyan-1234.github.io/index.html"
                onLoad={() => { setLoading(false) }} />
        </Loading>
    )
}
