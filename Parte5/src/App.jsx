import {
  useState,
  useEffect,
  useRef,
} from 'react'
import FormLogin from './components/FormLogin'
import FormAddBlogs from './components/FormAddBlogs'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { getAll } from './services/blogs'
import './styles.css'

const orderBlogs = (blogs) => {
  return blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1
    }
    if (a.likes < b.likes) {
      return 1
    }
    return 0
  })
}

const handleClickGetBlogs = async (setBlogs) => {
  const response = await getAll()
  if (response) {
    const { data } = response
    const blogsOrdered = orderBlogs(data)
    setBlogs(blogsOrdered)
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [stateSession, setStateSession] = useState(null)
  const [message, setMessage] = useState(null)

  const toggleFormRef = useRef()

  const session = localStorage.getItem('session')
  if (session) {
    const sessionParse = JSON.parse(session)
    if (stateSession === null) {
      setStateSession(sessionParse)
    }
  }

  const handleClickLogout = () => {
    localStorage.removeItem('session')
    setStateSession(null)
    setMessage(null)
  }

  useEffect(() => {
    if (stateSession) {
      handleClickGetBlogs(setBlogs)
    }
  }, [stateSession])
  return (
    <div>
      {stateSession === null ? (
        <FormLogin
          setState={{ setStateSession, setMessage }}
          state={{ message }}
        />
      ) : (
        <div>
          <h1>blogs</h1>
          <div>
            {message && (
              <div className={message.type === 'error' ? 'error' : 'success'}>
                {message.description}
              </div>
            )}
          </div>
          <div>
            {`${stateSession.username} logged in `}
            <button onClick={handleClickLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog" ref={toggleFormRef}>
            <FormAddBlogs
              toggleFormRef={toggleFormRef}
              states={{ stateSession }}
              setStates={{ setStateSession, setBlogs }}
            />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlogs={() => handleClickGetBlogs(setBlogs)}
                session={stateSession}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
