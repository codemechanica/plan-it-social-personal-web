import type { HTMLAttributes } from "react"
import type { NavLinkProps } from "@remix-run/react"
import { NavLink } from "@remix-run/react"

export function log(href: string) {
    console.log(href)
}

type LinkProps = NavLinkProps & {
    className?: HTMLAttributes<HTMLDivElement>['className']
    to: string
}

/*
 * Reusable link component that logs the href when clicked
 * Classes are applied to a wrapping div to allow for flexbox
 * and other layout styles
 */
export function Link(props: LinkProps){
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        log(props.to)
        if (props.onClick) {
            props.onClick(e)
        }
    }
    return (
        <div className={props.className}>
            <NavLink  {...props} className="text-green-500" onClick={handleClick} >
                {props.children}
            </NavLink>
        </div>
    )
}
