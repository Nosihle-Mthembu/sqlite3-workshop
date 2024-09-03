const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

// app.get('/tasks', (req, res) => {
//     db.all('SELECT * FROM tasks', [], (err, rows) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         tasks: rows,
//       });
//     });
//   });

app.get('/',(req, res) => {
    const movies = {
        id: 1,
        title: "Akeelah and the Bee",
        year: 1994,
        genre: "Drama",
    }
    res.json(movies)
    // res.send('Hello Everyone!')
})

app.listen(5000, () => {
    console.log(`Server running on http://localhost:${5000}`);
  });