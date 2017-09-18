import createHistory from 'history/createBrowserHistory';


const history = createHistory();

export default history;

// this createHistory() needs an actual browser, not good for dev
// if in testing mode, use memoryHistory, check out boilermaker solution and look at the history file --OB
