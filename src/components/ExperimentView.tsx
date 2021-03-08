import React, { FC } from 'react'

type ExperimentViewProps = {
  img: string
  imgSource: string
  more?: string
}

const ExperimentView: FC<ExperimentViewProps> = ({ img, imgSource, more, children }) => (
  <div className="w-full flex flex-row flex-wrap-reverse items-center">
    <div className="flex flex-col items-center w-full md:w-1/2 flex flex-col font-light p-16">
      <img src={img} alt="Experiment image" className="shadow-lg w-full" />
      <p className="source">{imgSource}</p>
    </div>
    <div className="w-full md:w-1/2 p-16 pb-0 md:p-16 md:px-32 2xl:px-64">
      {children}
      <div className="mt-10">
        <a href={more} target="_blank">
          <button className="btn">Learn more</button>
        </a>
      </div>
    </div>
  </div>
)

export default ExperimentView
