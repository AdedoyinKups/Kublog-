'use client'

import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Page = () => {

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        title: '',
        description: '',
        category: '',
        author: 'Doyin kups',
        authorImg: '/author_image.png',
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data,[name]:value}))
        console.log(data)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('author', data.author)
        const response = await axios.post('/api/blog', formData)
        if (response.data.success) {
            toast.success(response.data.msg)
            setImage(false)
            setData({
        title: '',
        description: '',
        category: '',
        author: 'Doyin kups',
        authorImg: '/author_image.png',
    })
        } else {
            toast.error('Error')
        }
        console.log(response.data)
        
    
    }

  return (
    <>
        <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
           <p>Upload thumbnail</p> 
           <label htmlFor="image">
            <Image src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt=' ' className='mt-4'/>
           </label>

           <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
           <p className='text-xl mt-4'>Blog Title</p>
           <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
           <p className='text-xl mt-4'>Blog Description</p>
           <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Description.....' rows={6} required />
           <p className='text-xl mt-4'>Blog category</p>
           <select onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500' name="category" >
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                
           </select>
           <br />
           <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
        </form>
    </>
  )
}

export default Page