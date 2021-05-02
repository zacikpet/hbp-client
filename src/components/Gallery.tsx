import React, { FC, ReactNode } from 'react'

type GalleryProps = {
  reversed?: boolean
  title: string | React.ReactNode
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
  <div className={`w-full flex ${reversed ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center px-8 md:px-16`}>
    <div className="w-full md:w-1/2 py-8 pb-0 md:p-16">
      <h1 className="text-title font-semibold text-emphasis text-4xl font-serif tracking-tight">{title}</h1>
      <br />
      <span className="font-serif tracking-tight">{text}</span>
      {source && <p className="source">Source: {source}</p>}
      {more && (
        <div className="mt-10">
          <a href={more} target="_blank">
            <button className="btn">Learn more</button>
          </a>
        </div>
      )}
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-center font-light py-4 md:px-4">
      <div className={contentClassName}>{children}</div>
      <p className="text-sm">{contentLabel}</p>
      <p className="source">{contentSource}</p>
    </div>
  </div>
)

export default Gallery
