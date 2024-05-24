import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'
import { handleError } from '../../common/utils/handle-error.ts'

export const fetchDecksTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  decksAPI.fetchDecks().then((res) => {
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    // на подходе к аксиос
    // throw new Error('Нативная js ошибка с полем message')
    const res = await decksAPI.updateDeck(params)
    // 500 errors
    dispatch(updateDeckAC(res.data))
  } catch (error) {
    //server error
    handleError(error, dispatch)
  }
}
