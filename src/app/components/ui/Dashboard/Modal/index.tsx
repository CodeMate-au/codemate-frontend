'use client'
import { useRouter } from 'next/navigation'
import { XCircleIcon } from '@heroicons/react/24/solid'
import ModalForm from './ModalForm'

export default async function MyModal() {

  const router = useRouter()
  return (

    <div className="fixed inset-0 overflow-y-auto" >
      <div className="flex min-h-full items-center justify-center p-4 text-center">

        <div className="w-full max-w-md transform overflow-hidden rounded-2xl dark:bg-slate-700 bg-gray-300 px-6 py-4 text-left align-middle shadow-xl transition-all">
          <div className='w-full flex justify-end items-center'>
            <XCircleIcon onClick={() => router.back()} className={`w-8 h-8`} />
          </div>
          <h3
            className="text-lg font-medium leading-6 "
          >
            Room Name
          </h3>
          <ModalForm />
          {/* <span onClick={() => router.back()}>Close modal</span> */}
        </div>


      </div>
    </div>
  )
}