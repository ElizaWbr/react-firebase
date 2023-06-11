import { useState, useEffect } from 'react';

import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

import Icon from '@mdi/react';
import { mdiCheckboxMarkedCirclePlusOutline, mdiDogService, mdiTextBoxEditOutline, mdiCheckboxOutline, mdiClose, mdiMenuDown, mdiMenuUp, mdiDelete } from '@mdi/js';

import {
  mdiEmoticonDevilOutline, mdiEmoticonCoolOutline, mdiEmoticonOutline, mdiEmoticonLolOutline, mdiEmoticonHappyOutline, mdiCow, mdiPenguin, mdiRobotHappyOutline, mdiBird, mdiDolphin, mdiGoogleDownasaur, mdiPawOutline, mdiBrushOutline, mdiAirplane, mdiAlarm, mdiAlertCircleOutline, mdiAlienOutline, mdiAttachment, mdiShoppingOutline, mdiBabyCarriage, mdiBadgeAccountHorizontalOutline, mdiBadgeAccountOutline, mdiBagPersonalOutline, mdiBalloon, mdiBarcodeScan, mdiBasketPlusOutline, mdiBasketOutline, mdiBeach, mdiBedKingOutline, mdiBedOutline, mdiBeeFlower, mdiBeerOutline, mdiBicycle, mdiBookAccountOutline, mdiBookOpenPageVariantOutline, mdiBookOpenVariant, mdiBookmarkCheckOutline, mdiBottleSodaClassicOutline, mdiBowlMixOutline, mdiBriefcaseAccountOutline, mdiBriefcaseOutline, mdiBrushVariant, mdiBus, mdiBullseyeArrow, mdiButterflyOutline, mdiCakeVariantOutline, mdiCalendar, mdiCalendarEditOutline, mdiCameraOutline, mdiCancel, mdiCandyOutline, mdiCarOutline, mdiChurchOutline, mdiCityVariantOutline, mdiCoffeeMakerOutline, mdiEmailOutline, mdiRobotLoveOutline, mdiHomeHeart, mdiCat, mdiWrenchOutline, mdiTumbleDryer, mdiTranslateVariant, mdiTortoise, mdiTheater, mdiPodiumGold, mdiHandHeart, mdiPhoneOutline, mdiCartOutline, mdiEmoticonSadOutline
} from '@mdi/js';

import Header from '../../components/Header';
import Background from '../../components/Background';

import './home.css';

function Home() {
  const [todoInput, setTodoInput] = useState('');
  const [todoIcon, setTodoIcon] = useState('');
  const [newTodo, setNewTodo] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [editTodoInfo, setEditTodoInfo] = useState({});
  const [errors, setErrors] = useState('');

  useEffect(() => {
    async function loadTodo() {
      const todoRef = collection(db, "users/" + auth.currentUser.uid + "/tarefas");
      const q = query(todoRef, orderBy("created", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        let list = [];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            todo: doc.data().todo,
            icon: doc.data().icon,
          })
        })
        setTodoList(list);
      })
    }

    loadTodo();
  }, [])

  async function handleNewTodo() {
    if (todoInput === '') {
      console.log("Tarefa vazia")
      setErrors('A tarefa não pode ficar vazia.')
      return;
    }
    if (todoIcon === '') {
      console.log("Ícone não selecionado.")
      setErrors('Selecione um ícone antes de continuar.')
      return;
    }

    await addDoc(collection(db, 'users/' + auth.currentUser.uid + '/tarefas'), {
      todo: todoInput,
      created: new Date(),
      icon: todoIcon,
    })
      .then(() => {
        console.log('Tarefa registrada.');
        setErrors('');
        setTodoInput('');
        setNewTodo(false);
      })
      .catch((error) => {
        console.log('Erro: ' + error)
        setErrors('Tarefa não registrada.')
      })
  }

  async function deleteTodo(id) {
    const docRef = doc(db, "users/" + auth.currentUser.uid + "/tarefas/" + id);
    await deleteDoc(docRef);
    setNewTodo(false);
    setTodoInput('');
    setEditTodoInfo({});
    console.log('Tarefa deletada.')
  }

  function editTodo(item) {
    setNewTodo(true);

    setTodoInput(item.todo);
    setTodoIcon(item.icon);

    setEditTodoInfo(item);
  }

  async function handleUpdateTodo() {
    
    const docRef = doc(db, "users/" + auth.currentUser.uid + "/tarefas/" + editTodoInfo?.id);
    if (todoInput === '') {
      console.log("Tarefa vazia")
      setErrors('A tarefa não pode ficar vazia.')
      return;
    }
    
    await updateDoc(docRef, {
      todo: todoInput,
      icon: todoIcon
    })
      .then(() => {
        console.log('Tarefa atualizada');
        setErrors('');
        openNewTodo();
        setTodoInput('');
        setEditTodoInfo({});
      })
      .catch((error) => {
        console.log('Erro ao atualizar: ' + error);
        setErrors('Erro ao atualizar tarefa.')
        setEditTodoInfo({});
      })
  }

  function openNewTodo() {
    setNewTodo(!newTodo);
    setEditTodoInfo({});
    setTodoInput('');
  }

  return (
    <div className='container_home'>
      <Header />
      <Background />

      {newTodo ? (
        <div className='background_box_home'>
          <div className='home_todo_page'>
          <div className='home_todo_page_header'>
            <div className='home_title'>
              <h1>NOVO &nbsp;</h1>
              <h1 className='title_aff'>AFF</h1>
              <h1>AZER:</h1>
            </div>
            <button className='button_header' onClick={openNewTodo}>
              <Icon path={mdiClose} size={1.5} />
            </button>
          </div>
          <div className='home_todo_content'>
            <div className="todo_form">
              <div className='todo_form_textarea'>
                <h3>NOVA TAREFA:</h3>
                <textarea
                  placeholder='Digite sua tarefa...'
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                />
              </div>
              <div>
                <div className='button_select'>
                  <div className='button_select_label'>
                    <h3>ÍCONE ATUAL: </h3>
                    <Icon path={todoIcon} size={1.2} className='selected_icon' />
                  </div>
                  <div className='newtodo_select_icons'>
                    <button onClick={() => setTodoIcon(mdiRobotHappyOutline)}><Icon path={mdiRobotHappyOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiRobotLoveOutline)}><Icon path={mdiRobotLoveOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiEmoticonDevilOutline)}><Icon path={mdiEmoticonDevilOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiEmoticonCoolOutline)}><Icon path={mdiEmoticonCoolOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiEmoticonOutline)}><Icon path={mdiEmoticonOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiEmoticonLolOutline)}><Icon path={mdiEmoticonLolOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiEmoticonHappyOutline)}><Icon path={mdiEmoticonHappyOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCow)}><Icon path={mdiCow} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCat)}><Icon path={mdiCat} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiPenguin)}><Icon path={mdiPenguin} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBird)}><Icon path={mdiBird} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiDolphin)}><Icon path={mdiDolphin} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiDogService)}><Icon path={mdiDogService} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiTortoise)}><Icon path={mdiTortoise} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiGoogleDownasaur)}><Icon path={mdiGoogleDownasaur} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiPawOutline)}><Icon path={mdiPawOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBrushOutline)}><Icon path={mdiBrushOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiAirplane)}><Icon path={mdiAirplane} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiAlarm)}><Icon path={mdiAlarm} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiAlertCircleOutline)}><Icon path={mdiAlertCircleOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiAlienOutline)}><Icon path={mdiAlienOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiAttachment)}><Icon path={mdiAttachment} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiShoppingOutline)}><Icon path={mdiShoppingOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBabyCarriage)}><Icon path={mdiBabyCarriage} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBadgeAccountHorizontalOutline)}><Icon path={mdiBadgeAccountHorizontalOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBadgeAccountOutline)}><Icon path={mdiBadgeAccountOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBagPersonalOutline)}><Icon path={mdiBagPersonalOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBalloon)}><Icon path={mdiBalloon} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBarcodeScan)}><Icon path={mdiBarcodeScan} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBasketPlusOutline)}><Icon path={mdiBasketPlusOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBasketOutline)}><Icon path={mdiBasketOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBeach)}><Icon path={mdiBeach} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBedKingOutline)}><Icon path={mdiBedKingOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBedOutline)}><Icon path={mdiBedOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBeeFlower)}><Icon path={mdiBeeFlower} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBeerOutline)}><Icon path={mdiBeerOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBicycle)}><Icon path={mdiBicycle} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBookAccountOutline)}><Icon path={mdiBookAccountOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBookOpenPageVariantOutline)}><Icon path={mdiBookOpenPageVariantOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBookOpenVariant)}><Icon path={mdiBookOpenVariant} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBookmarkCheckOutline)}><Icon path={mdiBookmarkCheckOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBottleSodaClassicOutline)}><Icon path={mdiBottleSodaClassicOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBowlMixOutline)}><Icon path={mdiBowlMixOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBriefcaseAccountOutline)}><Icon path={mdiBriefcaseAccountOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBriefcaseOutline)}><Icon path={mdiBriefcaseOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBrushVariant)}><Icon path={mdiBrushVariant} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBus)}><Icon path={mdiBus} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiBullseyeArrow)}><Icon path={mdiBullseyeArrow} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiButterflyOutline)}><Icon path={mdiButterflyOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCakeVariantOutline)}><Icon path={mdiCakeVariantOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCalendar)}><Icon path={mdiCalendar} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCalendarEditOutline)}><Icon path={mdiCalendarEditOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCameraOutline)}><Icon path={mdiCameraOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCancel)}><Icon path={mdiCancel} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCandyOutline)}><Icon path={mdiCandyOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCarOutline)}><Icon path={mdiCarOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiChurchOutline)}><Icon path={mdiChurchOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCityVariantOutline)}><Icon path={mdiCityVariantOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCoffeeMakerOutline)}><Icon path={mdiCoffeeMakerOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiEmailOutline)}><Icon path={mdiEmailOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiHomeHeart)}><Icon path={mdiHomeHeart} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiClose)}><Icon path={mdiClose} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiTextBoxEditOutline)}><Icon path={mdiTextBoxEditOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiDelete)}><Icon path={mdiDelete} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiCartOutline)}><Icon path={mdiCartOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiWrenchOutline)}><Icon path={mdiWrenchOutline} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiTumbleDryer)}><Icon path={mdiTumbleDryer} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiTranslateVariant)}><Icon path={mdiTranslateVariant} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiTheater)}><Icon path={mdiTheater} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiPodiumGold)}><Icon path={mdiPodiumGold} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiHandHeart)}><Icon path={mdiHandHeart} size={1.2} /></button>
                    <button onClick={() => setTodoIcon(mdiPhoneOutline)}><Icon path={mdiPhoneOutline} size={1.2} /></button>
                  </div>
                </div>
                {errors.length > 0 ? (
                    <div className='button_select'>
                        <span className='has_error_home'>{errors}</span>
                      </div>
                    ) : (
                        <span className='empty_errors_home'></span>
                    )}
              </div>
              {Object.keys(editTodoInfo).length > 0 ? (
                <div className='todo_page_action_buttons'>
                  <button onClick={handleUpdateTodo}>
                    ATUALIZAR
                    <Icon path={mdiCheckboxMarkedCirclePlusOutline} size={1} className='todo_action_btn_icon' />
                  </button>
                </div>
              ) : (
                <div className='todo_page_action_buttons'>
                  <button onClick={handleNewTodo}>
                    REGISTRAR
                    <Icon path={mdiCheckboxMarkedCirclePlusOutline} size={1} className='todo_action_btn_icon' />
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='background_box_home'>
          <div className='home_todo_page'>
            <div className='home_todo_page_header'>
              <div className='home_title'>
                <h1>MEUS &nbsp;</h1>
                <h1 className='title_aff'>AFF</h1>
                <h1>AZERES:</h1>
              </div>
              <button className='button_header' onClick={openNewTodo} title='Adicionar nova tarefa.'>
                <Icon path={mdiCheckboxMarkedCirclePlusOutline} size={1.5} />
              </button>
            </div>
            <div className='home_todo_content'>
              {todoList.length === 0 ? (
              <div className='empty_todo_list'>
                <h2>Sua lista está vazia.</h2>
                <div className='create_first_todo'>
                  <h4>Clique em </h4>
                  <button className='button_header' onClick={openNewTodo} title='Adicionar nova tarefa.'>
                    <Icon path={mdiCheckboxMarkedCirclePlusOutline} size={1} />
                  </button>
                  <h4>para adicionar uma nova tarefa!</h4>
                </div>
              </div>
            ) : (
              <span className='not_empty'></span>
            )}
              {todoList.map((item) => (
                <div key={item.id} className='todo_content'>
                  <Icon path={item.icon} size={2} className='todo_icon' />
                  <h4 className='todo_title'>{item.todo}</h4>
                  <div className='todo_buttons'>
                    <Icon path={mdiTextBoxEditOutline} size={1.5} title='Editar tarefa.' onClick={() => editTodo(item)} />
                    <Icon path={mdiCheckboxOutline} size={1.5} title='Concluir tarefa.' onClick={() => deleteTodo(item.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
