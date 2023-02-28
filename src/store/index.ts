import Vuex , {StoreOptions , Store as VuexStore, CommitOptions, DispatchOptions,} from 'vuex'
// import postModule from './postModule';
import RootState from './types';
import post from './post';





const store : StoreOptions<RootState> = {
  state: {
    version : '0.0.1'
  },
  modules: {
    // post : postModule
    post
  }
}


// export type Store = Omit<
//   VuexStore<RootState>,
//   "commit" | "getters" | "dispatch"
// > & {
//   commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//     key: K,
//     payload: P,
//     options?: CommitOptions
//   ): ReturnType<Mutations[K]>;
// } & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>;
//   };
// } & {
//   dispatch<K extends keyof Actions>(
//     key: K,
//     payload: Parameters<Actions[K]>[1],
//     options?: DispatchOptions
//   ): ReturnType<Actions[K]>;
// };




// export function useStore() {
//   return store as Store;
// }


export default new Vuex.Store<RootState>(store);