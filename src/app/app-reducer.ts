export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorType = string | null

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as ResponseErrorType,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

export type  SetAppStatusType = ReturnType<typeof setAppStatusAC>
type ActionsType =
  SetAppStatusType
  | SetAppErrorType
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    status,
  } as const
}


export type  SetAppErrorType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: ResponseErrorType) => {
  return {
    type: 'APP/SET-ERROR',
    error,
  } as const
}

