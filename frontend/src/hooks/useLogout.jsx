import { useAuthContext } from "./useAuthContext"
import {useWorkoutContext} from './useWorkoutContext'
export const useLogout =() =>{

    const {dispatch} = useAuthContext()
    const {dispatch:workoutsDispatch} = useWorkoutContext()
    const logout =()=>{
        // remove user from storsge

        localStorage.removeItem('user')

        // dispatach logout action

        dispatch({type:'LOGOUT'})
        workoutsDispatch({type:'SET_WORKOUTS',payload:[]})
    }

    return {logout}
}