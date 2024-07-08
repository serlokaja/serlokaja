'use client'

import { useEffect, useState } from "react"
import {User} from "../../types/types"

export default function Page() {

  const User : User = {
    id: 0,
    username: "",
    telp: "",
    password : "",
  }

  const [user,setUser] = useState(User)
  
  const fetchUser = async ()=>{
    try {
      
      let res : Response = await fetch(process.env.NEXT_PUBLIC_URL_SERVER + "/users/1")
      let user = await res.json()

      setUser(user)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return <h1>Hello, Next.js! {`${user.username}`}</h1>
}