import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../api/graphql/mutations/login.mutation.js'

export default function Login({ show, setPage }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()
        login({ variables: { username, password } })
    }

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('phonenumbers-user-token', token)
            setPage('recommendations')
        }
    }, [result.data])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <label>name
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>

                <label>password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}
