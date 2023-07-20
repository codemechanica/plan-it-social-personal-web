import { redirect, type ActionArgs, LoaderArgs } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { getHash } from "~/modules/database/crypto.server"
import { db } from "~/modules/database/db.server"
import { createUserSession, getUserSession } from "~/modules/session/session.server"


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

    const cleanEmail: string = email.toString().toLowerCase().trim()
    const user = await db.user.findUnique({ where: { email: cleanEmail }})

    if (user) {
        return { status: 400, message: 'Email already in use. Is this you? Please log in instead.' }
    }

    const newUser = await db.user.create({
        data: {
            name: name.toString(),
            email: cleanEmail,
        },
    })

    await db.password.create({
        data: {
            userId: newUser.id,
            hash: await getHash(password.toString()),
        },
    })

    const headers = await createUserSession(newUser.id)

    // console.log('form', Object.fromEntries(form.entries()))

    return redirect('/', { headers })
}

// GET
export async function loader({ request }: LoaderArgs) {
    const session = await getUserSession(request)
    if(session) {
        return redirect('/')
    }
    return {}

    // console.log('login loader')
    // const users = await db.user.findMany()
    // console.log('users', users)
    // return {}
}

export default function Component() {

    const actionData = useActionData()

    return(
        <div className="flex w-full items-center justify-center mt-20 lg:mt-40">
            <Form method="post" className="flex flex-col max-w-[800px] items-center justify-center gap-5">
                <h1 className="text-4xl">Sign Up</h1>
                <label>
                    Email:
                    <input className="bg-grayBackground" name="email" autoComplete="email" type="email" required />
                </label>
                <label>
                    Name:
                    <input className="bg-grayBackground" name="name" autoComplete="username" type="text" required />
                </label>
                <label>
                    Password:
                    <input className="bg-grayBackground" name="password" type="password" required />
                </label>
                <label>
                    Confirm Password:
                    <input className="bg-grayBackground" name="confirmPassword" type="text" required />
                </label>
                <button type="submit">Sign Up</button>
                { actionData && actionData.message && <p className="text-red-500">{actionData.message}</p> }
            </Form>
        </div>
    )
}
