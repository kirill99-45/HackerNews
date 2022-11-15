import { Route, Switch } from 'react-router-dom'

import { HomePage } from '../components/pages/home-page/home-page'
import { NewsPage } from '../components/pages/news-page/news-page'

import './App.css';

export const App = () => {
  return (
    <div className='wrapper'>
      <header className='header' />
      <main>
        <div className='main'>
          <Route exact path='/' component={HomePage} />
          <Route path='/new/:id' component={NewsPage} />
        </div>
      </main>
      <footer className='footer' />
    </div>
  )
}