import Profile from './Profile';
import Card from './Card';
import CardsSection from './CardsSection';
import {api} from '../utils/Api';
import { useState, useEffect } from 'react';


export default function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <main className="main">
      <Profile
        profileName = {userName}
        profileDescription = {userDescription}
        profileAvatar = {userAvatar}
        {...props}
      />
      <CardsSection>
        {cards.map(card => {
            return <Card key={card._id} {...card} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick}/>
          })
        }
      </CardsSection>
    </main>
  )
}
