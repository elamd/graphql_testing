import { graphqlHTTP } from 'express-graphql';
import express from 'express';
const app = express();
import {
  GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull
} from 'graphql';
import BookService from './services.mjs'; 

const authors = [
  { id: 1, name: 'J.K. Rowling'},
  { id: 2, name: 'J.R.R. Tolkien'},
  { id: 3, name: 'Brent Weeks'},
  { id: 4, name: 'Douglas Adams'},
  { id: 5, name: 'Philip K. Dick'},
  { id: 6, name: 'Robert A. Heinlein'},
  { id: 7, name: 'Isaac Asimov'},
  { id: 8, name: 'Robert Heinlein'},
];

// create an array of books by author id
const books = [
  { id: 1, authorId: 1, title: 'Harry Potter and the Chamber of Secrets' },
  { id: 2, authorId: 1, title: 'Harry Potter and the Prisoner of Azkaban' },
  { id: 3, authorId: 1, title: 'Harry Potter and the Goblet of Fire' },
  { id: 4, authorId: 1, title: 'Harry Potter and the Order of the Phoenix' },
  { id: 5, authorId: 1, title: 'Harry Potter and the Half-Blood Prince' },
  { id: 6, authorId: 1, title: 'Harry Potter and the Deathly Hallows' },
  { id: 7, authorId: 2, title: 'The Hobbit' },
  { id: 8, authorId: 2, title: 'The Fellowship of the Ring' },
  { id: 9, authorId: 2, title: 'The Two Towers' },
  { id: 10, authorId: 2, title: 'The Return of the King' },
  { id: 11, authorId: 3, title: 'Ender\'s Game' },
  { id: 12, authorId: 3, title: 'Snow Crash' },
  { id: 13, authorId: 3, title: 'A Deepness in the Sky' },
  { id: 14, authorId: 4, title: 'The Hitchhiker\'s Guide to the Galaxy' },
  { id: 15, authorId: 4, title: 'So Long, and Thanks for All the Fish' },
  { id: 16, authorId: 4, title: 'Mostly Harmless' },
  { id: 17, authorId: 5, title: 'Do Androids Dream of Electric Sheep?' },
  { id: 18, authorId: 5, title: 'The Hitchhiker\'s Guide to the Galaxy' },
  { id: 19, authorId: 5, title: 'Mostly Harmless' },
  { id: 20, authorId: 6, title: 'Stranger in a Strange Land' },
  { id: 21, authorId: 6, title: 'Dune' },
  { id: 22, authorId: 6, title: 'Fahrenheit 451' },
  { id: 23, authorId: 7, title: 'The Foundation' },
  { id: 24, authorId: 7, title: 'The Robots of Dawn' },
  { id: 25, authorId: 7, title: 'The Stars at War' },
  { id: 26, authorId: 8, title: 'Stranger in a Strange Land' },
  { id: 27, authorId: 8, title: 'Dune' },
  { id: 28, authorId: 8, title: 'Fahrenheit 451' },
];

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents an author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => books.filter(book => book.authorId === author.id)
    }
  })
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    author: {
      type: GraphQLNonNull(AuthorType),
      resolve: (book) => authors.find(author => author.id === book.authorId)
    },
  })
});

const BookInfoType = new GraphQLObjectType({
    name: 'BookInfo',
    description: 'Book information',
    fields: () => ({
      info: {
        type: GraphQLString,
        resolve: () => 'This is the meta info',
      }
    })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query',
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => 'Hello World',
      },
      authors: {
        type: GraphQLList(AuthorType),
        resolve: () => authors
      },
      books: {
        type: GraphQLList(BookType),
        resolve: () => books
      },
      bookInfo: {
        type: BookInfoType,
        args: {
          meta: { type: GraphQLString },
        },
        resolve: (parent, args) => {
          return {info : `This is a test ${args.meta}`}
        },
      },
    }),
  }),
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('Running a GraphQL API server at localhost:3000/graphql');
});
