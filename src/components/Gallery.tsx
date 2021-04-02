import React, { FC, ReactNode } from 'react'

type GalleryProps = {
  reversed?: boolean
  title: string
  text: string | ReactNode
  source?: string
  more?: string
  contentSource?: string
  contentLabel?: string
  contentClassName?: string
}

const Gallery: FC<GalleryProps> = ({
  children,
  title,
  text,
  source,
  more,
  contentLabel,
  contentSource,
  reversed = false,
  contentClassName,
}) => (
  <div className={`w-full flex ${reversed ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center xl:px-16 md:py-8`}>
    <div className="w-full md:w-1/2 p-16 pb-0 md:p-16">
      <h1 className="text-4xl font-bold text-emphasis">{title}</h1>
      <br />
      <span className="font-serif font-light">{text}</span>
      {source && <p className="source">Source: {source}</p>}
      {more && (
        <div className="mt-10">
          <a href={more} target="_blank">
            <button className="btn">Learn more</button>
          </a>
        </div>
      )}
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-center font-light p-4">
      <div className={contentClassName}>{children}</div>
      <p>{contentLabel}</p>
      <p className="source">{contentSource}</p>
    </div>
  </div>
)

export default Gallery
