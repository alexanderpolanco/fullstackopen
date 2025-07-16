import { NavLink } from "react-router";

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <NavLink to="/" style={padding}>anecdotes</NavLink>
      <NavLink to="/create" style={padding}>create new</NavLink>
      <NavLink to="/about" style={padding}>about</NavLink>
    </div>
  )
}

export default Menu