import React, { FC } from 'react'
import Collision from 'resources/collision.jpg'
import ExperimentMenu from 'components/ExperimentMenu'
import Gallery from 'components/Gallery'

const HomeRoute: FC = () => {
  return (
    <div className="min-h-page">
      <div className="shadow bg-gradient-to-b from-white to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-850 rounded-b mb-2">
        <Gallery
          title="Higgs Boson Portal (HBP) – a portal for up-to-date categorised articles about the Higgs boson"
          text="The HBP offers complete information about the latest and historic articles to experts. The categorisation is according to preliminary and published results. Using artifical intelligence, it also offers an automated categorisation for specific production and decay modes of the Higgs boson. The corresponding database is updated daily."
          // text="The Higgs boson, named after the the physicist Peter Higgs is a subatomic particle. It is the manifestation of the Higgs field, a quantum field that is present everywhere throughout the Universe. Certain particles interact with the Higgs field field via the Higgs mechanism and as a result obtain mass. The Higgs boson is the result of an excitation in this field."
          more="https://home.cern/science/physics/higgs-boson"
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
