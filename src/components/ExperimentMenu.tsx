import React, { FC, useState } from 'react'
import { Link } from 'react-scroll'
import SwipeableViews from 'react-swipeable-views'
import AtlasDetector from 'resources/atlas-detector.jpg'
import CmsDetector from '../resources/cms-detector.jpg'
import Collision from '../resources/collision.jpg'
import ExperimentView from './ExperimentView'

const randomExperiment = () => Math.floor(Math.random() * 8)

const ExperimentMenu: FC = () => {
  const [index, setIndex] = useState(randomExperiment)

  return (
    <>
      {/* Menu */}
      <Link to="experiment" smooth offset={-64} duration={500}>
        <div id="experiments" className="h-fit md:h-screen-3/4 cursor-pointer flex flex-col md:flex-row">
          <div className="h-full card-experiment bg-atlas" onClick={() => setIndex(0)}>
            <div className="card-experiment-title">ATLAS</div>
          </div>
          <div className="h-full card-experiment bg-cms" onClick={() => setIndex(1)}>
            <div className="card-experiment-title">CMS</div>
          </div>
          <div className="h-full card-experiment bg-cdf" onClick={() => setIndex(2)}>
            <div className="card-experiment-title">CDF</div>
          </div>
          <div className="h-full card-experiment bg-d0" onClick={() => setIndex(3)}>
            <div className="card-experiment-title">DØ</div>
          </div>
          <div className="w-full h-full">
            <div className="h-1/2 card-experiment bg-delphi" onClick={() => setIndex(4)}>
              <div className="card-experiment-title">DELPHI</div>
            </div>
            <div className="h-1/2 card-experiment bg-opal" onClick={() => setIndex(5)}>
              <div className="card-experiment-title">OPAL</div>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="h-1/2 card-experiment bg-l3" onClick={() => setIndex(6)}>
              <div className="card-experiment-title">L3</div>
            </div>
            <div className="h-1/2 card-experiment bg-aleph" onClick={() => setIndex(7)}>
              <div className="card-experiment-title">ALEPH</div>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <SwipeableViews id="experiment" index={index}>
        {/* Atlas */}
        <ExperimentView img={AtlasDetector} imgSource="ATLAS Experiment © 2021 CERN" more={'https://atlas.cern/'}>
          <h1 className="text-4xl text-emphasis font-bold">ATLAS Experiment</h1>
          <br />
          <p className="font-serif font-light">
            ATLAS is one of the four major experiments at the Large Hadron Collider (LHC) at CERN. It is a
            general-purpose particle physics experiment run by an international collaboration and, together with CMS, is
            designed to exploit the full discovery potential and the huge range of physics opportunities that the LHC
            provides.
          </p>
          <p className="source">Source: atlas.cern</p>
        </ExperimentView>
        {/* Cms */}
        <ExperimentView img={CmsDetector} imgSource="© 2021 CERN" more={'https://cms.cern'}>
          <h1 className="text-4xl text-emphasis font-bold">CMS Experiment</h1>
          <br />
          <p className="font-serif font-light">
            The Compact Muon Solenoid (CMS) is a general-purpose detector at the Large Hadron Collider (LHC). It has a
            broad physics programme ranging from studying the Standard Model (including the Higgs boson) to searching
            for extra dimensions and particles that could make up dark matter. Although it has the same scientific goals
            as the ATLAS experiment, it uses different technical solutions and a different magnet-system design.
          </p>
          <p className="source">Source: home.cern/science/experiments/cms</p>
        </ExperimentView>
        {/* Cdf */}
        <ExperimentView img={Collision} imgSource="">
          <h1 className="text-4xl text-emphasis font-bold">CDF Experiment</h1>
          <br />
          <p className="font-serif font-light">CDF description ... </p>
          <p className="source">Source: </p>
        </ExperimentView>
        <ExperimentView img={Collision} imgSource="">
          <h1 className="text-4xl text-emphasis font-bold">DØ Experiment</h1>
          <br />
          <p className="font-serif font-light">DØ description ... </p>
          <p className="source">Source: </p>
        </ExperimentView>
        <ExperimentView img={Collision} imgSource="">
          <h1 className="text-4xl text-emphasis font-bold">DELPHI Experiment</h1>
          <br />
          <p className="font-serif font-light">DELPHI description ... </p>
          <p className="source">Source: </p>
        </ExperimentView>
        <ExperimentView img={Collision} imgSource="">
          <h1 className="text-4xl text-emphasis font-bold">OPAL Experiment</h1>
          <br />
          <p className="font-serif font-light">OPAL description ... </p>
          <p className="source">Source: </p>
        </ExperimentView>
        <ExperimentView img={Collision} imgSource="">
          <h1 className="text-4xl text-emphasis font-bold">L3 Experiment</h1>
          <br />
          <p className="font-serif font-light">L3 description ... </p>
          <p className="source">Source: </p>
        </ExperimentView>
        <ExperimentView img={Collision} imgSource="">
          <h1 className="text-4xl text-emphasis font-bold">ALEPH Experiment</h1>
          <br />
          <p className="font-serif font-light">ALEPH description ... </p>
          <p className="source">Source: </p>
        </ExperimentView>
      </SwipeableViews>
    </>
  )
}

export default ExperimentMenu
