import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from 'react'

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-https";
import {getSingleQuote} from '../lib/api'
import LoadingSpinner from "../components/UI/LoadingSpinner";


const QuoteDetails = () => {
  const params = useParams();
  const match = useRouteMatch()

  const { quotesID } = params

  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

  useEffect( () => {
    sendRequest(quotesID)
  }, [sendRequest, quotesID])

  if(status === 'pending'){
    return <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if(error){
    return <p className='centered'>{error}</p>
  }
  
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link
            className="btn--flat"
            to={`/quotes/${params.quotesID}/comments`}
          >
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetails;
