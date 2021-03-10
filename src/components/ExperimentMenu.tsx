import React, { FC, useState } from 'react'
import { Link } from 'react-scroll'
import SwipeableViews from 'react-swipeable-views'
import AtlasDetector from 'resources/atlas-detector.jpg'
import CmsDetector from '../resources/cms-detector.jpg'
import CdfDetector from '../resources/cdf-detector.jpg'
import D0Detector from '../resources/d0-detector.jpg'
import AlephDetector from '../resources/aleph-detector.jpg'
import OpalDetector from '../resources/opal-detector.jpg'
import DelphiDetector from '../resources/delphi-detector.jpeg'
import L3Detector from '../resources/l3-detector.jpeg'

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
        <ExperimentView
          img={CdfDetector}
          imgSource="http://www.physics.mcgill.ca/xhep/en/gallery/photos/cdf_research_gallery.html"
        >
          <h1 className="text-4xl text-emphasis font-bold">CDF Experiment</h1>
          <br />
          <p className="font-serif font-light">
            CDF stands for the Collider Detector at Fermilab. CDF is an experiment at Fermilab which studies high energy
            proton-antiproton collisions from data collected through 2011 from the Tevatron. The Tevatron accelerated
            protons and antiprotons close to the speed of light, made them collide head-on inside the CDF detector and
            we study the products of such collisions.
          </p>
          <p className="source">Source: https://www-cdf.fnal.gov/about/index.html</p>
        </ExperimentView>
        <ExperimentView img={D0Detector} imgSource="https://en.wikipedia.org/wiki/D%C3%98_experiment">
          <h1 className="text-4xl text-emphasis font-bold">DØ Experiment</h1>
          <br />
          <p className="font-serif font-light">
            The DØ Experiment consists of a worldwide collaboration of scientists conducting research on the fundamental
            nature of matter. The experiment is located at the world's premier high-energy physics laboratory the Fermi
            National Accelerator Laboratory (Fermilab) in Batavia, Illinois, USA. The research is focused on precise
            studies of interactions of protons and antiprotons at the highest available energies provided by the
            Tevatron collider.
          </p>
          <p className="source">Source: https://www-d0.fnal.gov/</p>
        </ExperimentView>
        <ExperimentView img={DelphiDetector} imgSource="© 2021 CERN">
          <h1 className="text-4xl text-emphasis font-bold">DELPHI Experiment</h1>
          <br />
          <p className="font-serif font-light">
            DELPHI was one of four large detectors on the Large Electron-Positron collider (LEP). It took 7 years to
            design and build, and it started up in 1989. In December 2000, DELPHI stopped taking data and was dismantled
            to leave room for the construction of the Large Hadron Collider in the LEP tunnel.
          </p>
          <p className="source">Source: https://home.cern/science/experiments/delphi</p>
        </ExperimentView>
        <ExperimentView img={OpalDetector} imgSource="https://en.wikipedia.org/wiki/OPAL_experiment">
          <h1 className="text-4xl text-emphasis font-bold">OPAL Experiment</h1>
          <br />
          <p className="font-serif font-light">
            OPAL was one of four large detectors on the Large Electron-Positron collider (LEP). It started operation
            along with the collider in August 1989. Data taking for OPAL ended on 2 November 2000 and the detector was
            dismantled the following year to make way for construction of the Large Hadron Collider (LHC).
          </p>
          <p className="source">Source: https://home.cern/science/experiments/opal</p>
        </ExperimentView>
        <ExperimentView img={L3Detector} imgSource="https://www.tifr.res.in/~dhep/l3Exp.php">
          <h1 className="text-4xl text-emphasis font-bold">L3 Experiment</h1>
          <br />
          <p className="font-serif font-light">
            The L3 experiment was one of four large detectors on the Large Electron-Positron collider (LEP). The
            detector was designed to look for the physics of the Standard Model and beyond. It started up in 1989 and
            stopped taking data in November 2000 to make room for construction of the Large Hadron Collider (LHC). The
            ALICE detector now sits in the cavern that L3 used to occupy, reusing L3's characteristic red octagonal
            magnet.
          </p>
          <p className="source">Source: https://home.cern/science/experiments/l3</p>
        </ExperimentView>
        <ExperimentView img={AlephDetector} imgSource="https://cds.cern.ch/record/42204">
          <h1 className="text-4xl text-emphasis font-bold">ALEPH Experiment</h1>
          <br />
          <p className="font-serif font-light">
            ALEPH was a particle detector on the Large Electron-Positron collider (LEP). It was designed to explore the
            physics predicted by the Standard Model and to search for physics beyond it.
          </p>
          <p className="source">Source: https://home.cern/science/experiments/aleph</p>
        </ExperimentView>
      </SwipeableViews>
    </>
  )
}

export default ExperimentMenu
