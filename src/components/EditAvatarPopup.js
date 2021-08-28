import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';



export default function EditAvatarPopup(props) {

  const inputAvatarUrlRef = useRef();


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputAvatarUrlRef.current.value
    });
    inputAvatarUrlRef.current.value = '';
  }


  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose = {props.onClose} buttonText="Сохранить" onSubmit={handleSubmit} onOvelayClick = {props.onOvelayClick}>
      <input ref={inputAvatarUrlRef} type="url" className="popup__form-item popup__form-item_value_link" placeholder="Ссылка на аватар" name="avatarLink" id="avatar-link" required/>
      <span className="avatar-link-error popup__form-error-msg"></span>
    </PopupWithForm>
  )
}
