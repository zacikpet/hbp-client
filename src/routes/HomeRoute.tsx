import React, { FC } from 'react'
import Collision from 'resources/collision.jpg'
import ExperimentMenu from '../components/ExperimentMenu'

const HomeRoute: FC = () => {
  return (
    <div className="bg-white">
      <div className="justify-around items-center flex flex-col md:flex-row w-full">
        <div className="w-3/4 md:w-1/4 m-10 md:m-20">
          <h1 className="text-black text-4xl">The Higgs Boson</h1>
          <br />
          <p className="font-serif font-light">
            The Higgs boson is an elementary particle in the Standard Model of particle physics produced by the quantum
            excitation of the Higgs field, one of the fields in particle physics theory.
          </p>
          <p className="source">Source: Wikipedia</p>
          <div className="mt-10">
            <button className="btn">Learn more</button>
          </div>
        </div>
        <div className="text-black flex flex-col items-center font-light m-10 md:m-20">
          <img width={400} height={500} src={Collision} alt="Collision" className="shadow-lg" />
          <p>Illustration of a particle collision producing the Higgs boson.</p>
          <p className="source">Source: Lucas Taylor, CMS</p>
        </div>
      </div>
      <ExperimentMenu />
    </div>
  )
}

export default HomeRoute
