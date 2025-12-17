import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import Book from './schemas/bookSchema.js'
import Author from './schemas/authorShema.js'
import User from './schemas/userSchema.js'
import jwt from 'jsonwebtoken'

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Mutation {
    addBook(
        title: String!,
        published: Int!,
        author: String!,
        genres: [String!]!
    ): Book,
    editAuthor(
        name: String!,
        setBornTo: Int!
    ):Author,
    createUser(
      username: String!,
      favoriteGenre: String!
    ): User,
    login(
      username: String!,
      password: String!
    ): Token
  }


  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`

const resolvers = {
    Query: {
        bookCount: async () => await Book.countDocuments(),
        authorCount: async () => await Author.countDocuments(),
        allBooks: async (root, args) => {
            const { author: authorName, genre } = args
            const filter = {}

            if (authorName) {
                const author = await Author.findOne({ name: authorName })
       
                filter.author = author ? author._id : null
            }
            if (genre) {
                filter.genres = { $in: [genre] }
            }
            return await Book.find(filter).populate('author')
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            const authorsWithBookCount = await Promise.all(authors.map(async (author) => {
                const bookCount = await Book.countDocuments({ author: author._id })
                return { ...author.toObject(), bookCount }
            }))
            return authorsWithBookCount
        },
        me: async (root, args, context) => {
            return context.currentUser
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const { title, published, author: authorName, genres } = args
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }

            if (!title || title.length < 2) {
                throw new GraphQLError('Debe ingresar un título con más de 2 caracteres', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            if (authorName && authorName.length < 4) {
                throw new GraphQLError('Debe ingresar un autor con más de 4 caracteres', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }


            let author = await Author.findOne({ name: authorName })

            if (!author) {
                author = new Author({ name: authorName, born: null })
                await author.save()
            }

            // 2. Crear el libro usando el ID del autor.
            const newBook = new Book({
                title,
                published,
                author: author._id,
                genres,
            })

            await newBook.save()

            return newBook.populate('author')
        },
        editAuthor: async (root, args, context) => {
            const { name, setBornTo } = args
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            }

            if (!name || name.length < 4) {
                throw new GraphQLError('Debe ingresar un autor con más de 4 caracteres', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const updatedAuthor = await Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
            return updatedAuthor
        }, createUser: async (root, args) => {
            const user = new User(args)
            return user.save().catch(error => {
                throw new GraphQLError('User creation failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        exception: error,
                    },
                });
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials')
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            }
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})