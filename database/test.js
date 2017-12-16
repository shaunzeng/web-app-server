const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
  { id: 1, authorId: 2, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Apollo', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 2, title: 'Launchpad is Cool', votes: 7 },
];

const comments =[
  {id: 1, title: "test comment1", authorId: 2, postId: 2},
  {id: 2, title: "test comment3", authorId: 3, postId: 2},
  {id: 3, title: "test comment2", authorId: 2, postId: 2},
  {id: 1, title: "test comment11", authorId: 2, postId: 3},
  {id: 2, title: "test comment33", authorId: 3, postId: 3},
  {id: 3, title: "test comment22", authorId: 2, postId: 3},
];

module.exports = {
  authors,
  posts,
  comments
}