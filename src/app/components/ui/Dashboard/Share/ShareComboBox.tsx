import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useParams } from 'next/navigation'
import { User } from '@src/app/lib/definitions'
import { useRouter } from 'next/navigation';



const getMembers = async (room_id: string) => {
  const response = await fetch(`/api/non_members?room_id=${room_id}`);

  if (!response.ok) {
    const text = await response.text();
    console.error('Error response from server:', text);
    throw new Error('Server responded with status ' + response.status);
  }

  const members = await response.json();
  console.log(members);
  return members;
}

export default function ShareCombo() {

  const [members, setMembers] = useState<User[]>([]); // Add this line
  const [selected, setSelected] = useState<User | undefined>()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const params = useParams<{ room_id: string }>()

  const router = useRouter();


  useEffect(() => {
    getMembers(params.room_id)
      .then((members) => {
        setMembers(members);
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
      });
  }, [])

  const filteredMembers =
    query === ''
      ? members
      : members.filter((member) =>
        member.name!
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );


  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const inviteHandler = async () => {

    setIsLoading(true);

    const formData = new FormData();
    formData.append('room_id', params.room_id);
    if (selected) {
      formData.append('user_id', selected.id);

      await fetch(`/api/invite/${params.room_id}`, {
        method: 'PUT',
        body: formData,
      });
    }
    setIsLoading(false);
    router.refresh();


  }

  return (
    <form className="w-full flex items-center justify-center" action={inviteHandler}>
      <Combobox value={selected} onChange={setSelected} className="w-full">
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-3 pl-3 pr-10 text-lg leading-5 text-gray-900 focus:ring-0"
              displayValue={(member: User) => member.name || ''}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className='flex absolute inset-y-0 right-0 items-center pr-3'>
              <Combobox.Button className="flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              <button
                disabled={isLoading}
                type="submit"
                className="h-8 w-20 rounded bg-black px-2 py-1 text-sm font-medium text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                {isLoading && <span>Inviting...</span>}
                {!isLoading && <span>Invite</span>}
              </button>
            </div>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredMembers.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <Combobox.Option
                    key={member.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={member}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">

                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}>
                            {member.name}

                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {/* <Combobox value={selected} onChange={setSelected}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
        <Combobox.Options>
          {filteredMembers.map((person) => (
            <Combobox.Option key={person.id} value={person}>
              {person.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox> */}
    </form>


  )
}
