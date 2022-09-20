const addOneItem = (state, todoItem) => {
    const obj = { completed: false, item: todoItem };
    // localStorage.setItem(this.todoItem, obj);
    localStorage.setItem(todoItem, JSON.stringify(obj));
    state.todoItems.push(obj);
}
const removeOneItem = (state, payload) => {
    localStorage.removeItem(payload.todoItem.item);
    state.todoItems.splice(payload.idx, 1);
}
const toggleOneItem = (state, payload) => {
    // => todoitems -> propsdata로 내림 -> 내린 데이터에서 todoItem, idx 추출
    // -> v-on 메서드 인자로 들어갔다가 -> 버튼 이벤트로 다시 데이터를 App으로 올려 수정
    //->  안티 패턴 (안좋음)
    // todoItem.completed = !todoItem.completed;
    // ----------- 같은 동작 다른 데이터 흐름 ----------------------
    // App.vue란 container의 데이터를 직접 바꾸는 것이 좋다.
    state.todoItems[payload.idx].completed = !state.todoItems[payload.idx].completed;
    //localStorage의 데이터를 갱신
    localStorage.removeItem(payload.todoItem.item);
    localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
}
const clearAllItems = (state) => {
    localStorage.clear();
    state.todoItems = [];
}

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems }