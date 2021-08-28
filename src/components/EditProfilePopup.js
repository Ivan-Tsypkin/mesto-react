import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen = {props.isOpen} onClose = {props.onClose} buttonText="Сохранить" onSubmit = {handleSubmit} onOvelayClick = {props.onOvelayClick}>
      <input type="text" className="popup__form-item popup__form-item_value_name" placeholder="Имя" name="userName" id="user-name" minLength="2" maxLength="40" required
      value={name || ''} //Если присваивать value={name}, то в консоли будет ошибка "A component is changing an uncontrolled input to be controlled", т.е. я так понимаю пока данные с сервера не пришли value считается undefined и является неуправляемым, после прихода данных становится управляемым и появляется ошибка, поэтому задаём пустую строку по умолчанию
      onChange={(e) => setName(e.target.value)}
      />
      <span className="user-name-error popup__form-error-msg"></span>
      <input type="text" className="popup__form-item popup__form-item_value_job" placeholder="Род деятельности" name="userJob" id="user-job" minLength="2" maxLength="200" required
      value={description || ''}
      onChange={(e) => setDescription(e.target.value)}
      />
      <span className="user-job-error popup__form-error-msg popup__form-error-msg_pos_bottom"></span>
    </PopupWithForm>
  )
}
