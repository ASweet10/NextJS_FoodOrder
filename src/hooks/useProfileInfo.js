import { useEffect, useState } from "react"

export function useProfileInfo() {
    const [ data, setData ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    
    useEffect(() => {
        setLoading(true)
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data)
                console.log(data)
                setLoading(false)
            })
        })
    }, [])

    return { loading, data }
}