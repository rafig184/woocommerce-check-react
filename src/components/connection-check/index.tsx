import { Button, TextField } from "@mui/material"
import axios, { AxiosError } from "axios"
import { useCallback, useState } from "react"
import WithLoading from "../../ui-components/spinner"



export interface IconnectionDetails {
    domain: string
    key: string
    secret: string
}

export function ConnectionCheck() {
    const [url, setUrl] = useState("")
    const [domain, setDomain] = useState("")
    const [key, setKey] = useState("")
    const [secret, setSecret] = useState("")
    const [statusCode, setStatusCode] = useState("")
    const [isStatus, setIsStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isConnectionGood, setIsConnectionGood] = useState(false)
    const [isConnectionLimited, setIsConnectionLimited] = useState(false)
    const [isConnectionError, setIsConnectionError] = useState(false)

    let statusClass = '';

    const handlerDomainCallback = useCallback((e: any) => {
        setDomain(e.target.value)
        console.log(e.target.value);

    }, [domain])
    const handlerKeyCallback = useCallback((e: any) => {
        setKey(e.target.value)
    }, [key])
    const handlerSecretCallback = useCallback((e: any) => {
        setSecret(e.target.value)
    }, [secret])

    async function checkConnection() {
        try {
            setIsConnectionError(false)
            setIsConnectionGood(false)
            setIsConnectionLimited(false)
            setUrl("")

            if (domain === "") {
                alert("אנא הכנס דומיין")
                setIsStatus(false)
                return
            }
            if (key === "") {
                alert("אנא הכנס מפתח")
                setIsStatus(false)
                return
            }
            if (secret === "") {
                alert("אנא הכנס סיסמה")
                setIsStatus(false)
                return
            }
            setIsLoading(true)


            const url = `${domain}/wp-json/wc/v3/data?consumer_key=${key}&consumer_secret=${secret}`
            setUrl(url)
            console.log(url);
            const result = await axios.get(url)

            if (result.status != 200) {
                console.log(result.status);
                throw new Error
            } else {
                setStatusCode(`חיבור תקין!! קוד סטטוס : ${result.status}`)
                console.log(result.status);
                setIsStatus(true)
                setIsConnectionGood(true)
            }
        } catch (error) {
            console.log(error);
            console.log(axios.isAxiosError(error));
            const axiosError = error as AxiosError<any>;
            if (axiosError.message === "Network Error") {
                setIsStatus(true)
                setIsConnectionLimited(true)
                setStatusCode(`בדוק תקינות בקישור ,${axiosError.message} : !חיבור מוגבל`)
            } else {
                setIsStatus(true)
                setIsConnectionError(true)
                console.log(error);
                setStatusCode(`${error}`)
            }
        } finally {
            setIsLoading(false)
        }
    }


    function clearAll() {
        setDomain("")
        setKey("")
        setSecret("")
        setStatusCode("")
        setIsStatus(false)
        setIsConnectionError(false)
        setIsConnectionGood(false)
        setIsConnectionLimited(false)
        console.log(domain);
        console.log(key);
        console.log(secret);
    }

    if (isConnectionGood) {
        statusClass = 'status-good'; // Set class name based on state
    } else if (isConnectionLimited) {
        statusClass = 'status-limited'; // Set class name based on state
    } else if (isConnectionError) {
        statusClass = 'status-error'; // Set class name based on state
    }

    return <div className="outterDiv">
        <div className="inlineDiv">
            <div className="inputDiv" >
                <TextField className="input" id="domain" value={domain} label=": הכנס דומיין" variant="filled" onChange={handlerDomainCallback} />
            </div>
            <div className="inputDiv">
                <TextField className="input" id="key" value={key} label=": הכנס מפתח" variant="filled" onChange={handlerKeyCallback} />
            </div>
            <div className="inputDiv">
                <TextField className="input" id="secret" value={secret} label=": הכנס סיסמה" variant="filled" onChange={handlerSecretCallback} />
            </div>
            <div className="btnDiv">
                <Button className="btn" color="error" variant="contained" onClick={clearAll}>נקה</Button>
                <Button className="btn" variant="contained" onClick={checkConnection}>בדוק חיבור</Button>
            </div>

            <WithLoading isLoading={isLoading}>
                <div>
                    {isStatus ? (
                        <div className="status">
                            <h3 className={statusClass}>{statusCode}</h3>
                            <div className="linkBtn">
                                <Button className="btn" color="warning" variant="contained" href={url} target="_blank">קישור לבדיקה</Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </WithLoading>
        </div>



    </div>
}