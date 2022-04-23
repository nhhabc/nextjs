import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head'
// const dummy = [
//     {
//         id: 'm1',
//         title: 'A first meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 4, 1234 city',
//         description: 'This is a first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A second meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 12, 1234 city',
//         description: 'This is a second meetup'
//     }
// ]


const HomePage = (props) => {
    return (
        <>
        <Head>
            <title>React Meetup</title>
            <meta name="description" content="Browse a huge list of highly active React meetups!"/>
        </Head>
            <MeetupList meetups={props.meetups}></MeetupList>            
        </>
    )
}
// export function getServerSideProps() {
//     return{
//         props: {
//             meetups: dummy,
//         },
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://nhhabc:nhh4bci2e@cluster0.dptzh.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupCollection = db.collection('meetups')

    const meetups = await meetupCollection.find().toArray();

    console.log(meetups)
    client.close();

    return {
        props:{
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        }
    }
}


export default HomePage;