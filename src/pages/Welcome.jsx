import { Login, Registration } from "../components"

export const Welcome = () => {
    return (
        <main className='max-w-7xl mx-auto p-5 dark:bg-slate-900'>
            <h1 className="text-2xl text-center mb-5 dark:text-slate-300">👋 Welcome</h1>
            <Login />
            <Registration />
        </main>
    )
}
