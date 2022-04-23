import { MongoClient } from "mongodb";

// /api/new-meetup

const handle = async (req, res) => {
    const route = useRouter()

     if(req.method === 'POST') {
        const data = req.body;
        console.log(data);

        const client = await MongoClient.connect('mongodb+srv://nhhabc:nhh4bci2e@cluster0.dptzh.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()

        const meetupCollection = db.collection('meetups')

        const result = await meetupCollection.insertOne(data)

        console.log(result);

        client.close();
        
        res.status(201).json({message: 'Meetup inserted!'})
     }

     
}

export default handle