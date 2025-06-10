import { useState } from 'react'
import Input from './Input'
import login from '../services/login'

const FormLogin = ({ state, setState }) => {
  const { message } = state
  const { setStateSession, setMessage } = setState
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClickLogin = async (event) => {
    event.preventDefault()
    const response = await login(username, password)
    if ('error' in response) {
      setMessage({ description: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      const { data } = response

      const dataSession = {
        username: data.username,
        token: data.token,
      }

      setStateSession(dataSession)
      localStorage.setItem('session', JSON.stringify(dataSession))
      setUsername('')
      setPassword('')
      setMessage(null)
    }
  }

  return (
    <form onSubmit={handleClickLogin}>
      <h1>log in to application</h1>
      <div>
        {message && (
          <div className={message.type === 'error' ? 'error' : 'success'}>
            {message.description}
          </div>
        )}
      </div>
      <div>
        <Input
          data-testid="username"
          type="text"
          value={username}
          onChange={setUsername}
          label="username"
        />
      </div>
      <div>
        <Input
          data-testid="password"
          type="password"
          value={password}
          onChange={setPassword}
          label="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default FormLogin