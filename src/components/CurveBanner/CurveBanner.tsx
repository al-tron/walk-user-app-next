import { ReactNode } from 'react'

import Image from 'next/image'

import { ImageDataType } from '@/types/types'

export const CurveBanner = ({ children, image }: CurveBannerProps) => {
  return (
    <div className="c-topo-bg dark:c-topo-bg--dark relative mb-4 w-full after:relative after:bottom-0 after:block after:h-[22px] after:w-full after:bg-curve after:bg-[length:100%_23px] after:content-[''] dark:after:bg-curveDark sm:after:h-[36px] sm:after:bg-[length:100%_37px] md:after:h-[44px] md:after:bg-[length:100%_45px] lg:after:h-[58px] lg:after:bg-[length:100%_59px] xl:after:h-[64px] xl:after:bg-[length:100%_65px]">
      {image?.url && (
        <>
          <div className="absolute top-0 z-10 block h-32 w-full bg-gradient-to-b from-black/60 to-black/0"></div>

          <Image
            className="object-cover dark:brightness-90"
            src={image.url}
            alt={image.alt}
            placeholder="blur"
            blurDataURL={image.dataUrl}
            fill
          />
        </>
      )}

      <div className="relative pb-20 pt-28 xxs:pb-24 xxs:pt-32 xs:pb-24 xs:pt-36 md:pt-40">{children}</div>
    </div>
  )
}

type CurveBannerProps = {
  children: ReactNode
  image?: ImageDataType
}
