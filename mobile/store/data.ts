import {create} from 'zustand' 

export type User = {
    name: string;
    age: string;
    weight: string;
    height: string;

    level: string;
    objective: string;
    gender: string;

}

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, 'gender' | 'objective' | 'level' >)=> void;
    setPageTwo: (data: Pick<User, 'gender' | 'objective' | 'level'> ) => void;
}



export const useDataStore = create<DataState> ((set)=> ({
    user: {
        name: '',
        age: '',
        weight: '',
        height: '',
        level: '',
        objective: '',
        gender: '',
        },
        setPageOne: (data)=> set((state)=>({ user: {...state.user, ...data} }) ),
        setPageTwo: (data)=> set((state)=>({ user: {...state.user, ...data} }) )
}))