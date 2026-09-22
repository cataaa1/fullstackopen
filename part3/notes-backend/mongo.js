const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://catalina_db_user:${password}@cluster0.4sepdgs.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})



const Note = mongoose.model('Note', noteSchema)

//const note = new Note({
   //content: 'HTML is easy',
   //important: true,
//})

//note.save().then(result => {
    //console.log('note saved!')
    //mongoose.connection.close()
//})

/* const notes = [
    {
      content: 'HTML is easy',
      important: true,
    },
    {
      content: 'Browser can execute only JavaScript',
      important: false,
    },
    {
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true,
    },
  ]
  
  Note.insertMany(notes)
    .then(result => {
      console.log('all notes saved!')
      console.log(result)
      mongoose.connection.close()
    }) */

Note.find({important: true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})    