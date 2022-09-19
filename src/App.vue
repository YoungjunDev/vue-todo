<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
    ></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data() {
    return {
      todoItems: []
    };
  },
  methods: {
    addOneItem(todoItem) {
      const obj = { completed: false, item: todoItem };
      // localStorage.setItem(this.todoItem, obj);
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem(todoItem, idx) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(idx, 1);
    },
    toggleOneItem(todoItem, idx) {
      // => todoitems -> propsdata로 내림 -> 내린 데이터에서 todoItem, idx 추출
      // -> v-on 메서드 인자로 들어갔다가 -> 버튼 이벤트로 다시 데이터를 App으로 올려 수정
      //->  안티 패턴 (안좋음)
      // todoItem.completed = !todoItem.completed;
      // ----------- 같은 동작 다른 데이터 흐름 ----------------------
      // App.vue란 container의 데이터를 직접 바꾸는 것이 좋다.
      this.todoItems[idx].completed = !this.todoItems[idx].completed;
      //localStorage의 데이터를 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  created() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          localStorage.getItem(localStorage.key(i));
          console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
          // this.todoItems.push(localStorage.key(i));
        }
      }
    }
  },
  components: {
    //TodoHeader: TodoHeader,  객체의 속성 명과 값 명이 동일할 때 아래와 같이 축약 가능
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>