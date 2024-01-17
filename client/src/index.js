import ReactDOM from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import ApolloProvider from './ApolloProvider';

ReactDOM.render(ApolloProvider, document.getElementById('root'));

serviceWorker.unregister();
