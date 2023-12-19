import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'
import  { useField } from './hooks'
const Notification = ({ message }) => {
  if (message === null) {
      return null
  }
  return (
      <div>
          <br />
          <div className='error'>
              {message}
          </div>
          <br />
      </div>
  )
}

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><a href={`/anecdotes/${anecdote.id}`}>{anecdote.content}</a></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  const handleClear = (e) => {
    e.preventDefault()
    content.resetField()
    author.resetField()
    info.resetField()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input name='content' type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          {/* If we were to do this, we would lose much of the benefit provided by the useField hook. Instead, come up with a solution that fixes the issue, but is still easy to use with spread syntax. */}
          <input name='author' value={author.value} type={author.type} onChange={author.onChange}  />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} type={info.type} />
        </div>
        <button onClick={handleSubmit}>create </button>
        <button onClick={handleClear}>reset</button>
      </form>
    </div>
  )

}

const ViewAnecdote = ({ anecdote }) => {
  console.log("anecdote--",anecdote)
  return (
    <div>
      {
        anecdote ? <div>
          <h2> {anecdote.content} </h2>
          <p> has {anecdote.votes} votes </p>
          <p> for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
        </div> :
          <div>
          </div>
      }
    </div>

  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const padding = {
    padding: 5
  }

  const navigate = useNavigate()
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setErrorMessage(
      `${anecdote.content} added successfully`
  )
  setTimeout(() => {
      setErrorMessage(null)
  }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id == id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const match = useMatch('/anecdotes/:id')
  var anecdote = null
  if(match)
  {
    anecdote = anecdoteById(match.params.id)
  }
  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <Notification message={errorMessage} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<ViewAnecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
