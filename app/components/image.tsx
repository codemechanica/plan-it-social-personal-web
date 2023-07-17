import type { ImgHTMLAttributes } from 'react'

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    alt: string
    src: string
}

export function Image({ alt, src, ... props }: ImageProps) {

    return <img
                alt={alt}
                src={src}
                { ... props }
            />
}
