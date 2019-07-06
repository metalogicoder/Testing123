<template>
  <div>
    <div class="panel-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="book.name" v-for="book in books">
            <td><a v-bind:href="book.url">{{book.title}}</a></td>
            <td>{{book.author}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Add New Books</h3>
      </div>
      <div class="panel-body">
          <form id="form" class="form-inline" v-on:submit.prevent="addBook">
          <div class="form-group">
            <label for="bookTitle">Title:</label>
            <input type="text" id="bookTitle" class="form-control" v-model="newBook.title">
          </div>
          <div class="form-group">
            <label for="bookAuthor">Author:</label>
            <input type="text" id="bookAuthor" class="form-control" v-model="newBook.author">
          </div>
          <div class="form-group">
            <label for="bookUrl">Url:</label>
            <input type="text" id="bookUrl" class="form-control" v-model="newBook.url">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Book">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Firebase from 'firebase';
  import FirebaseConfig from '../config/firebase-config';

  let app = Firebase.initializeApp(FirebaseConfig);
  let db = app.database();

  let booksRef = db.ref('books');

  export default {
    name: 'App',
    components: {
      
    },
    firebase: {
      books: booksRef
    },
    data() {
      return {
        newBook: {
          title: '',
          author: '',
          url: 'http://'
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
