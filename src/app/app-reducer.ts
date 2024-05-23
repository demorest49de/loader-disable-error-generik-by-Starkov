export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      const newstate = {...state, status: action.status}
      console.log(' newstate: ', newstate)
      return newstate
    }
    default:
      return state
  }
}

export type  SetAppStatusType = ReturnType<typeof setAppStatusAC>
type ActionsType = SetAppStatusType
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS' as const,
    status,
  }
}

