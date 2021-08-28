import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isCardDeleteConfirmOpen, setCardDeleteConfirmOpen] = useState({isOpen: false, cardToDelete: {}});
  const [selectedCard, setSelectedCard] = useState({isOpen: false, data: {}})
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const closeByEscape = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardDeleteConfirmOpen({isOpen: false, cardToDelete: {}});
    setSelectedCard({isOpen: false, data: selectedCard.data}); //Если очистить data при закрытии, то появляется неприятное искажение анимации закрытия: удаляется картинка и крестик закрытия перемещается в центр, а потом затухает
  }

  function handleCardClick(data) {
    setSelectedCard(
      {
        isOpen: true,
        data: {
          link: data.link,
          name: data.name
        }
      }
    )
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(error => console.log(error))
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(error => console.log(error))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => console.log(error));
  }

  function handleCardDelete(e, card) {
    e.preventDefault();
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(error => console.log(error))
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch(error => console.log(error))
  }


  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider value = {currentUser}>

          <Header />

          <Main
            onEditProfile = {() => setEditProfilePopupOpen(true)}
            onEditAvatar = {() => setEditAvatarPopupOpen(true)}
            onAddPlace = {() => setAddPlacePopupOpen(true)}
            onCardLike = {handleCardLike}
            onCardDelete = {(card) => {setCardDeleteConfirmOpen({isOpen: true, cardToDelete: {...card}})}}
            onCardClick = {handleCardClick}
            cards = {cards}
          />

          <Footer />

          <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser} onOvelayClick = {closeAllPopups}/>

          <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} onOvelayClick = {closeAllPopups}/>

          <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit} onOvelayClick = {closeAllPopups}/>

          <PopupWithForm name="delete-card-confirm" title="Вы уверены?" isOpen = {isCardDeleteConfirmOpen.isOpen} onClose = {closeAllPopups} buttonText="Да" onSubmit = {(e) => {handleCardDelete(e, isCardDeleteConfirmOpen.cardToDelete)}} onOvelayClick = {closeAllPopups}/>

          <ImagePopup {...selectedCard} onClose = {closeAllPopups} onOvelayClick = {closeAllPopups}/>

        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
