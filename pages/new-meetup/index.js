import Head from 'next/head'
import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

// domain/new-meetup

function NewMeetupPage () {
    const route = useRouter()

    async function addMeetup(meetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        route.push('/')
    }

    return (
        <>
        <Head>
            <title>Add a new meetup</title>
            <meta name='description' content='Add your own meetups and create amazing networking opportunities'/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetup}/>
        </>
        )
}

export default NewMeetupPage