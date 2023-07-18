import { db } from "~/modules/database/db.server"

export async function loader() {
    console.log('login loader')
    const users = await db.user.findMany()
    console.log('users', users)
    return {}
}

export default function Component() {
    return(
        <section>
           <h1 className="h-[80vh] text-4xl">Login</h1>
        </section>
    )
}
