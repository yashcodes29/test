import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes } from '../redux/pasteSlice';
import { updateToPastes } from '../redux/pasteSlice';

const Home = () => {

    const[title,setTitle] = useState('');
    const[value,setValue] = useState('');
    const[searchParams,setsearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const Allpaste = useSelector((state)=>state.paste.pastes)

    function createPaste(){
        const paste={
            title: title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            //update paste
            dispatch(updateToPastes(paste));
        }else{
            
            //create paste
            dispatch(addToPastes(paste));
        }

        //after creation or updation 
        setTitle('');
        setValue('');
        setsearchParams({});
    }

    useEffect(()=>{
        if(pasteId){
            const paste = Allpaste.find((p)=>p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
        
    },[pasteId])
  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
      <input className='p-1 rounded-2xl place-content-evenly mt-2 w-[67%] pl-4'
        type='text'
        placeholder='Enter title here'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
      onClick={createPaste} 
      className='p-2 rounded-2xl place-content-evenly mt-2'>
        {
            pasteId ? "Update Paste" : "Create My Paste"
        }
      </button>
      
    </div>

    <div className='mt-8'>

       <textarea 
            className='rounded-2xl mt-4 min-w-[500px] p-4'
            value={value}
            placeholder='enter content here'
            onChange={(e)=>setValue(e.target.value)
            }
            rows={20}
       />

    </div>
    </div>
  )
}

export default Home
