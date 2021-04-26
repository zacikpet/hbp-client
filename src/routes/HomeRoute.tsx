import React, { FC } from 'react'
import Collision from 'resources/collision.jpg'
import ExperimentMenu from 'components/ExperimentMenu'
import Gallery from 'components/Gallery'

const HomeRoute: FC = () => {
  return (
    <div className="min-h-page">
      <div className="shadow bg-gradient-to-b from-white to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-850 rounded-b mb-2">
        <Gallery
          title="HBP – the portal for categorised information about the Higgs boson"
          text="The Higgs boson, named after the the physicist Peter Higgs is a subatomic particle. It is the manifestation of the Higgs field, a quantum field that is present everywhere throughout the Universe.
        Certain particles interact with the Higgs field field via the Higgs mechanism and as a result obtain mass. The Higgs boson is the result of an excitation in this field."
          source="CERN 2021"
          more="https://en.wikipedia.org/wiki/Higgs_boson"
          contentClassName="w-full lg:w-3/4"
          contentLabel="Illustration of a particle collision producing the Higgs boson"
          contentSource="Lucas Taylor, CMS"
        >
          <img src={Collision} alt="Collision" />
        </Gallery>
        <ExperimentMenu />
      </div>
    </div>
  )
}

export default HomeRoute
