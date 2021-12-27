import { Switch, Link, Route } from "react-router-dom"

export const HomePage = () => {
  return (
    <div>
      <h1>Welcome to my Movie Site</h1>
      <Link to="/subpage1">Sub page 1</Link>
      <Link to="/subpage2">Sub page 2</Link>
      <Switch>
        <Route path="/subpage1">
          <h3>Sub page 1</h3>
        </Route>
        <Route path="/subpage2">
          <h3>Sub page 2</h3>
        </Route>
      </Switch>
    </div>
  )
}
