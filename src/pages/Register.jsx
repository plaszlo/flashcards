
export const Register = () => {
  return (
    <main className="max-w-xl mx-auto p-5">
        <div className="border border-gray-400 rounded-xl p-2">
            <h1 className="font-semibold text-xl mb-3">Register</h1>

            <div className="grid grid-cols-4 gap-2">
                <div className="">User Name</div>
                <input className="bg-gray-100 col-span-3 px-1"></input>
                <div className="">Email</div>
                <input className="bg-gray-100 col-span-3 px-1"></input>
                {/* <div className="">Password</div>
                <input className="bg-gray-100 col-span-3 px-1"></input>
                <div className="">Conf Password</div>
                <input className="bg-gray-100 col-span-3 px-1"></input> */}
            </div>
        </div>
    </main>
  )
}
