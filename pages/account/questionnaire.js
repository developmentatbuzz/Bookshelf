import axios from "axios"
import { useSession, getSession, getCsrfToken } from 'next-auth/react'
import Image from "next/image"
import { useState } from 'react'
import FileBase64 from 'react-file-base64';
import connectDB from "../api/auth/lib/connect";

const Questionnaire = () => {
    const { data: session } = useSession()
    const [name, changeName] = useState('')
    const [img, changeImage] = useState('')
    const [message, changeMessage] = useState('')
    const saveImg = (e) => {

        changeImage(e.base64)
        console.log(e.base64)
        // const strImage = img.replace(/^data:image\/[a-z]+;base64,/, "");
        // console.log(strImage)
        // console.log(img)

    }
    // const uploadImage = (e) => {
    //     console.log(e)
    //     const file = e.target.files[0]
    //     console.log(file)
    // }
    const updateUser = (e) => {
        e.preventDefault()
        axios.post('/api/users/update', {
            id:session.user.id,
            name: name,
            image: img
        }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className='flex flex-col space-y-4 items-center'>
            <h1 className='text-5xl'>Bookshelf</h1>
            <form className='flex flex-col space-y-4' method='post'>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                    Name
                    <input onChange={e => changeName(e.target.value)} value={name} className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' name="username" type="text" />
                </label>
                <label className='flex flex-col text-grey-darker text-sm font-bold mb-2'>
                    Picture
                    <FileBase64 multiple={false} onDone={saveImg.bind(this)}/>

                </label>
                {img.length != 0 && <Image src={img} width="500" height="500"/>}

                <button onClick={updateUser} className='text-red' type="submit" >
                    <p className='text-red'>
                        Finish account registration
                    </p>
                </button>
            </form>
            <div>
                {message}
            </div>
            {/* <div className={img.length === 0 ? : 'hidden ' : }> */}

            {/* </div> */}
            {/* <input type='file' onChange={e => uploadImage(e)}/> */}
        </div>
    );
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session){
        return {
            redirect:{destination:'/'}
        }
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}
export default Questionnaire;