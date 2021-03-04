import React, { FC } from 'react'

type ExperimentViewProps = {
  img: string
  imgSource: string
  more?: string
}

const ExperimentView: FC<ExperimentViewProps> = ({ img, imgSource, more, children }) => (
  <div className="justify-around items-center flex flex-col-reverse md:flex-row w-full md:px-20">
    <div className="text-black flex flex-col items-center font-light m-10 md:m-20">
      <img width={500} src={img} alt="Experiment image" className="shadow-lg" />
      <p className="source">{imgSource}</p>
    </div>
    <div className="w-3/4 md:w-1/3 m-10 md:m-20">
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
