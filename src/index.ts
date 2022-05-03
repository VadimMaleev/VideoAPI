import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!')
})

app.get('/videos', (req: Request, res: Response ) => {
    res.send(videos)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find((v) => {
        if (v.id === id) return true;
        else return false;
    })
    if (video !== undefined) {
        res.send(video)
    } else {
        res.send(404)
    }
    // FIND VIDEO AND RETURN IT
    // IF VIDEO IS NOW EXISTS THEN RETURN 404 CODE
})

app.post('/videos', (req: Request, res: Response) => {
    if (typeof req.body.title !== "string" || req.body.title?.trim() === "" || req.body.title.length >= 40) {
      return  res.send(400)
    }
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

app.delete('/videos/:id',(req: Request, res: Response)=>{
    //videos = videos.filter((v) => v.id !== +req.params.id)
   //     res.send(204)
    const id = +req.params.id;
    const video = videos.find((v) => {
        if (v.id === id) return true;
        else return false;
    })
    if (video !== undefined) {
        videos = videos.filter((v) => v.id !== +req.params.id)
        res.send(204)
      } else {res.send(404)
        }

})

app.put('/videos/:id',(req: Request, res: Response)=>{
    if (typeof req.body.title !== "string" || req.body.title?.trim() === "" || req.body.title.length >= 40) {
        return res.send(400)
    }

    const id = +req.params.id;
    const video = videos.find((v) => {
        if (v.id === id) return true;
        else return false;
    })
    if (video !== undefined) {
        video.title = req.body.title
        res.status(204).send(video)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})