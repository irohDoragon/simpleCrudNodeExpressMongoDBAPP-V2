const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://irohdoragon:ZSJLrdESVdhbDk4z@cluster0.4hbwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

MongoClient.connect(connectionString).then(

    console.log('Connected to Database')

  ).then(client => {

    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')
    
    
    app.use(express.json())
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))

    app.post('/quotes', (req, res) => {
        quotesCollection
        .insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res)=> {

            quotesCollection
            .find()
            .toArray()
            .then(resultss => {
                res.render('index.ejs', {quotes: resultss})
            })
            .catch(error => console.error(error))
        
            
    })

    app.put('/quotes', (req, res) => {
        console.log(req.body)
        quotesCollection
        .findOneAndUpdate(
            { name: req.body.nameS },
            {
            $set: {
                name: req.body.name,
                quote: req.body.quote,
            },
            },
            {
            upsert: true,
            }
        )
    .then(result => {
        console.log(result)
        res.json('Success')
        
    })
    .catch(error => console.error(error))
        })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne({ name: req.body.name }).then(result => {
            res.json(`Deleted Darth Vader's quote`)
            }).catch(error => console.error(error))
        })

    app.listen(9001, () => {
        console.log('this port is over nine thousnd!')
    })
  })
  .catch(console.error)

  

  

console.log('May Node be with you')