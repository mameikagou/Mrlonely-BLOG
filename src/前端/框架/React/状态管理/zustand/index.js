
const createStore = (createState) => {

    let state;
    let getState = () => state;
    let setState = () => {};
    const subscript = () => {};
    const api = {getState, setState, subscript};
    state = createState(setState);
}