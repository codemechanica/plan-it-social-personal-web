import type { ActionArgs } from "@remix-run/node"
import { useActionData } from "react-router"
import { db } from "~/modules/database/db.server"


export async function action({ request }: ActionArgs) {

    const form = await request.formData()
    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    const confirmPassword = form.get('confirmPassword')

    if( !name || !email || !password || !confirmPassword ) {
        return { status: 400, message: 'Missing required fields' }
    }

    if ( password !== confirmPassword ) {
        return { status: 400, message: 'Passwords do not match' }
    }

    return { status: 200, message: '' }
}

// GET
export async function loader() {
    console.log('login loader')
    const users = await db.user.findMany()
    console.log('users', users)
    return {}
}

export default function Component() {

    const actionData = useActionData<typeof action>()

    return(
        <div className="flex w-full items-center justify-center mt-20 lg:mt-40">
            <form method="post" className="flex flex-col max-w-[800px] items-center justify-center gap-5">
                <h1 className="text-4xl">Sign Up</h1>
                <input className="bg-grayBackground" name="name" autoComplete="username" type="text" required />
                <input className="bg-grayBackground" name="email" autoComplete="email" type="email" required />
                <input className="bg-grayBackground" name="password" type="password" required />
                <input className="bg-grayBackground" name="confirmPassword" type="text" required />
                <button type="submit">Sign Up</button>
                { actionData && actionData.message && <p className="text-red-500">{actionData.message}</p> }
            </form>
        </div>
    )
}
