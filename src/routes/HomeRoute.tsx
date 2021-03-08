import React, { FC } from 'react'
import Collision from 'resources/collision.jpg'
import ExperimentMenu from '../components/ExperimentMenu'

const HomeRoute: FC = () => {
  return (
    <>
      <div className="w-full flex flex-row flex-wrap items-center">
        <div className="w-full md:w-1/2 p-16 pb-0 md:p-16 md:px-32 2xl:px-64">
          <h1 className="text-4xl font-bold text-emphasis">The Higgs Boson</h1>
          <br />
          <p className="font-serif font-light">
            The Higgs boson is an elementary particle in the Standard Model of particle physics produced by the quantum
            excitation of the Higgs field, one of the fields in particle physics theory.
          </p>
          <p className="source">Source: Wikipedia</p>
          <div className="mt-10">
            <a href="https://en.wikipedia.org/wiki/Higgs_boson" target="_blank">
              <button className="btn">Learn more</button>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center font-light p-16">
          <img src={Collision} alt="Collision" className="w-full lg:w-3/4 shadow-lg" />
          <p>Illustration of a particle collision producing the Higgs boson.</p>
          <p className="source">Source: Lucas Taylor, CMS</p>
        </div>
      </div>
      <ExperimentMenu />
    </>
  )
}

export default HomeRoute
