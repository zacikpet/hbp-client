import React, { FC, useState } from 'react'
import Collision from 'resources/collision.jpg'
import { Link } from 'react-scroll'
import AtlasLogo from 'resources/atlas-logo.jpg'
import CmsDetector from 'resources/cms-detector.jpg'
import SwipeableViews from 'react-swipeable-views'

const randomExperiment = () => Math.floor(Math.random() * 8)

const HomeRoute: FC = () => {
  const [index, setIndex] = useState(randomExperiment)

  return (
    <div>
      <div className="bg-white">
        <div className="justify-around items-center flex flex-col md:flex-row w-full">
          <div className="w-3/4 md:w-1/4 m-10 md:m-20">
            <h1 className="text-black text-4xl">The Higgs Boson</h1>
            <br />
            <p className="font-serif font-light">
              The Higgs boson is an elementary particle in the Standard Model of particle physics produced by the
              quantum excitation of the Higgs field, one of the fields in particle physics theory.
            </p>
            <p className="font-light text-sm">Source: Wikipedia</p>
            <div className="mt-10">
              <button className="btn">Learn more</button>
            </div>
          </div>
          <div className="text-black flex flex-col items-center font-light m-10 md:m-20">
            <img width={400} height={500} src={Collision} alt="Collision" className="shadow-lg" />
            <p>Illustration of a particle collision producing the Higgs boson.</p>
            <p className="text-sm">Source: Lucas Taylor, CMS</p>
          </div>
        </div>
      </div>
      <Link to="experiment" smooth offset={-64} duration={500}>
        <div id="experiments" className="h-fit md:h-screen-3/4 flex cursor-pointer flex-col md:flex-row">
          <div className="h-full card-experiment bg-atlas" onClick={() => setIndex(0)}>
            <div className="card-experiment-title">ATLAS</div>
          </div>
          <div className="h-full card-experiment bg-cms" onClick={() => setIndex(1)}>
            <div className="card-experiment-title">CMS</div>
          </div>
          <div className="h-full card-experiment bg-cdf" onClick={() => setIndex(2)}>
            <div className="card-experiment-title">CDF</div>
          </div>
          <div className="h-full card-experiment bg-d0">
            <div className="card-experiment-title">D0</div>
          </div>
          <div className="w-full h-full">
            <div className="h-1/2 card-experiment bg-delphi">
              <div className="card-experiment-title">DELPHI</div>
            </div>
            <div className="h-1/2 card-experiment bg-opal">
              <div className="card-experiment-title">OPAL</div>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="h-1/2 card-experiment bg-l3">
              <div className="card-experiment-title">L3</div>
            </div>
            <div className="h-1/2 card-experiment bg-aleph">
              <div className="card-experiment-title">ALEPH</div>
            </div>
          </div>
        </div>
      </Link>
      <SwipeableViews id="experiment" index={index}>
        <div className="justify-around items-center flex flex-col-reverse md:flex-row w-full md:px-20">
          <div className="text-black flex flex-col items-center font-light m-10 md:m-20">
            <img width={400} src={AtlasLogo} alt="Atlas logo" className="shadow-lg" />
            <p className="text-sm">Source: ATLAS Experiment © 2021 CERN</p>
          </div>
          <div className="w-3/4 md:w-1/3 m-10 md:m-20">
            <h1 className="text-black text-4xl">ATLAS Experiment</h1>
            <br />
            <p className="font-serif font-light">
              ATLAS is one of the four major experiments at the Large Hadron Collider (LHC) at CERN. It is a
              general-purpose particle physics experiment run by an international collaboration and, together with CMS,
              is designed to exploit the full discovery potential and the huge range of physics opportunities that the
              LHC provides.
            </p>
            <p className="font-light text-sm">Source: atlas.cern</p>
            <div className="mt-10">
              <button className="btn">Learn more</button>
            </div>
          </div>
        </div>
        <div className="justify-around items-center flex flex-col-reverse md:flex-row w-full md:px-20">
          <div className="text-black flex flex-col items-center font-light m-10 md:m-20">
            <img width={500} src={CmsDetector} alt="CMS detector" className="shadow-lg" />
            <p className="text-sm">Source: CERN</p>
          </div>
          <div className="w-3/4 md:w-1/3 m-10 md:m-20">
            <h1 className="text-black text-4xl">CMS Experiment</h1>
            <br />
            <p className="font-serif font-light">
              The Compact Muon Solenoid (CMS) is a general-purpose detector at the Large Hadron Collider (LHC). It has a
              broad physics programme ranging from studying the Standard Model (including the Higgs boson) to searching
              for extra dimensions and particles that could make up dark matter. Although it has the same scientific
              goals as the ATLAS experiment, it uses different technical solutions and a different magnet-system design.
            </p>
            <p className="font-light text-sm">Source: home.cern/science/experiments/cms</p>

            <div className="mt-10">
              <button className="btn">Learn more</button>
            </div>
          </div>
        </div>
        <div className="justify-around items-center flex flex-col-reverse md:flex-row w-full md:px-20">
          <div className="text-black flex flex-col items-center font-light m-10 md:m-20">
            <img width={500} src={Collision} alt="CMS detector" className="shadow-lg" />
            <p className="text-sm">Source: CERN</p>
          </div>
          <div className="w-3/4 md:w-1/3 m-10 md:m-20">
            <h1 className="text-black text-4xl">CDF Experiment</h1>
            <br />
            <p className="font-serif font-light">CDF description ... </p>
            <p className="font-light text-sm">Source: </p>

            <div className="mt-10">
              <button className="btn">Learn more</button>
            </div>
          </div>
        </div>
      </SwipeableViews>
    </div>
  )
}

export default HomeRoute
