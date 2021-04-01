import React, { FC } from 'react'
import Collision from 'resources/collision.jpg'
import ExperimentMenu from 'components/ExperimentMenu'
import Gallery from 'components/Gallery'

const HomeRoute: FC = () => {
  return (
    <>
      <Gallery
        title="The Higgs Boson"
        text="The Higgs boson is an elementary particle in the Standard Model of particle physics produced by the quantum
        excitation of the Higgs field, one of the fields in particle physics theory."
        source="Wikipedia"
        more="https://en.wikipedia.org/wiki/Higgs_boson"
        contentClassName="w-full lg:w-3/4"
        contentLabel="Illustration of a particle collision producing the Higgs boson"
        contentSource="Lucas Taylor, CMS"
      >
        <img src={Collision} alt="Collision" />
      </Gallery>
      <ExperimentMenu />
    </>
  )
}

export default HomeRoute
