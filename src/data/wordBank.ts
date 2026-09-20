import { WordCategory } from '../types';

export interface WordDefinition {
  word: string;
  category: WordCategory;
  clues: {
    nova: string[];   // Abstract / creative
    byte: string[];   // Technical / precise
    lumi: string[];   // Short / punchy
    pixel: string[];  // Detailed / observant
  };
}

export const CATEGORY_BLUFFS: Record<WordCategory, { nova: string[]; byte: string[]; lumi: string[]; pixel: string[] }> = {
  Technology: {
    nova: [
      "It is a digital pulse shaping how modern minds solve modern enigmas.",
      "An invisible nervous system translating ideas into silicon motion.",
      "Where mathematical harmony creates futuristic ripples."
    ],
    byte: [
      "An architecture designed around processing units and scalable bandwidth.",
      "Involves automated computational loops and system-level protocols.",
      "Optimized for algorithmic throughput across distributed nodes."
    ],
    lumi: [
      "High tech!",
      "Super digital.",
      "Future vibes!",
      "Runs on code."
    ],
    pixel: [
      "Involves a structured interface connecting electronic inputs with computed outputs.",
      "Typically deployed in computer labs and tech infrastructure stacks.",
      "Features data pipelines that require calibrated maintenance."
    ]
  },
  Innovation: {
    nova: [
      "Transforming a spark in the dark into a blazing path forward.",
      "The bridge between imagination and real-world impact.",
      "Rewriting the rules before anyone realized they were old."
    ],
    byte: [
      "A cyclical optimization framework that iteratively disrupts legacy workflows.",
      "Requires milestone roadmaps, risk-adjusted equity, and validation gates.",
      "Transforms raw hypothesis into verified market value propositions."
    ],
    lumi: [
      "Big ideas!",
      "Game changer.",
      "Fresh concept!",
      "Bold moves."
    ],
    pixel: [
      "Involves detailed stakeholder pitches, feedback loops, and resource allocation.",
      "Documented through milestone presentations and measurable KPI reviews.",
      "Takes raw prototypes through competitive testing and market appraisal."
    ]
  },
  'University Life': {
    nova: [
      "A collective voyage where young ambitions intersect and discover identity.",
      "Echoes in lecture halls turning curious wanderers into pioneers.",
      "Where shared caffeine fuels breakthroughs before dawn."
    ],
    byte: [
      "A structured academic pipeline with credit milestones and cohort evaluations.",
      "Collaborative scheduling matrices balancing deadlines with peer reviews.",
      "Synchronous group interactions measured by attendance and project deliverables."
    ],
    lumi: [
      "Campus energy!",
      "Student grind.",
      "Study time!",
      "Group effort."
    ],
    pixel: [
      "Features registered student rosters, scheduled campus rooms, and team submissions.",
      "Includes calendar deadlines, slide decks, and formal evaluation rubrics.",
      "A milestone experienced across university terms alongside fellow classmates."
    ]
  },
  'Future Technology': {
    nova: [
      "A glimpse of tomorrow whispering into today's horizon.",
      "Redefining reality with algorithms woven into physical existence.",
      "Where science fiction steps into everyday existence."
    ],
    byte: [
      "Next-generation cyber-physical integration with sensor telemetry and low latency.",
      "Utilizes decentralized telemetry and autonomous feedback control routines.",
      "High-density compute architecture interacting directly with ambient environments."
    ],
    lumi: [
      "Sci-fi now!",
      "Next-gen stuff.",
      "Future tech!",
      "Wild robotics."
    ],
    pixel: [
      "Deploys advanced sensors, real-time spatial mapping, and autonomous firmware.",
      "Prototypes tested in smart testbeds with stringent latency benchmarks.",
      "Integrates predictive machine telemetry into physical infrastructure."
    ]
  },
  'MIH Activities': {
    nova: [
      "A sandbox where diverse sparks collide and illuminate unexpected ideas.",
      "The pulse of Middlesex creativity bringing bold visions into the spotlight.",
      "Where questions become movements inside our innovation sanctuary."
    ],
    byte: [
      "Structured co-creation sprints monitored by faculty facilitators and timers.",
      "Iterative problem-solving modules with milestone checkpoints and peer audits.",
      "A scheduled innovation hub event with allocated presentation slots and metrics."
    ],
    lumi: [
      "Hub action!",
      "MIH spirit!",
      "Pitch time!",
      "Team energy."
    ],
    pixel: [
      "Organized at the Middlesex Innovation Hub with badges, agendas, and mentor desks.",
      "Includes whiteboard ideation, rapid feedback rounds, and judged showcases.",
      "Brings together university students across Dubai campus to solve real challenges."
    ]
  }
};

export const WORD_BANK: WordDefinition[] = [
  // CATEGORY 1: TECHNOLOGY
  {
    word: "Artificial Intelligence",
    category: "Technology",
    clues: {
      nova: ["Silicon learning to mimic the dreams of the human mind.", "Thinking in patterns without having a heartbeat."],
      byte: ["Neural networks optimizing loss functions across billions of parameters.", "Inference models trained on matrix multiplications."],
      lumi: ["Smart machines!", "Brainy computers."],
      pixel: ["Trained on massive datasets with supervised and reinforcement feedback.", "Generates natural language and predictive visual outputs."]
    }
  },
  {
    word: "Robotics",
    category: "Technology",
    clues: {
      nova: ["Giving metal hands to dance with human intentions.", "Where mechanical limbs echo living grace."],
      byte: ["Actuators, servomotors, and kinematics coordinated by microcontrollers.", "Closed-loop feedback control with inverse kinematics."],
      lumi: ["Metal buddies!", "Automated arms."],
      pixel: ["Combines mechanical chassis, sensory LiDAR, and precision motor controllers.", "Built to handle physical manipulation and automated assembly tasks."]
    }
  },
  {
    word: "Machine Learning",
    category: "Technology",
    clues: {
      nova: ["Algorithms digesting history to forecast the whispers of tomorrow.", "Experience turned into statistical intuition."],
      byte: ["Gradient descent iteratively updating tensor weights through backpropagation.", "Hyperparameter tuning across regression and classification trees."],
      lumi: ["Learns fast!", "Pattern cruncher."],
      pixel: ["Features training, validation, and test splits to prevent overfitting.", "Converts feature vectors into probabilistic scoring models."]
    }
  },
  {
    word: "Cybersecurity",
    category: "Technology",
    clues: {
      nova: ["Invisible digital shields guarding castles built of code.", "The eternal dance between digital shadow and light."],
      byte: ["Zero-trust architecture, SHA-256 cryptographic hashing, and firewall rules.", "Intrusion detection systems analyzing packet payload anomalies."],
      lumi: ["Lock it down!", "Firewall up."],
      pixel: ["Monitors access tokens, pen-testing logs, and patch vulnerability tables.", "Protects enterprise databases from SQL injection and unauthorized breaches."]
    }
  },
  {
    word: "Internet of Things",
    category: "Technology",
    clues: {
      nova: ["Giving voices to everyday objects so chairs and lamps can converse.", "A tapestry of ordinary things connected by an invisible thread."],
      byte: ["MQTT broker routing telemetry from ESP32 edge nodes to cloud endpoints.", "Low-power Zigbee and BLE sensor nodes streaming telemetry."],
      lumi: ["Connected stuff!", "Smart gadgets."],
      pixel: ["Sensors installed in thermostats, wearables, and streetlights reporting to a hub.", "Collects environmental telemetry through low-power wireless microchips."]
    }
  },
  {
    word: "Computer Vision",
    category: "Technology",
    clues: {
      nova: ["Teaching cameras to look at the world and truly understand what they behold.", "Eyes crafted from glass and pixels."],
      byte: ["Convolutional kernels performing edge detection and bounding box regression.", "YOLO architectures running frame-by-frame tensor parsing."],
      lumi: ["Digital eyes!", "Can see you."],
      pixel: ["Processes video pixel arrays to segment foreground objects and recognize faces.", "Utilizes convolutional layers to tag landmarks and optical flow."]
    }
  },
  {
    word: "Data Science",
    category: "Technology",
    clues: {
      nova: ["Digging through mountains of digital sand to uncover buried diamonds.", "The alchemy of turning messy numbers into sharp clarity."],
      byte: ["Pandas dataframes, exploratory scatter matrices, and ANOVA hypothesis testing.", "ETL pipelines cleaning unstructured JSON into normalized tabular warehouses."],
      lumi: ["Stats & charts!", "Number crunching."],
      pixel: ["Involves feature engineering, statistical p-values, and Seaborn visual plots.", "Combines Python notebooks, standard deviations, and trend predictions."]
    }
  },
  {
    word: "Cloud Computing",
    category: "Technology",
    clues: {
      nova: ["Renting a slice of an infinite sky to power our thoughts.", "Computers humming in far-off lands while we touch them from our desks."],
      byte: ["Elastic auto-scaling virtual machines orchestrated in container clusters.", "Serverless lambdas, S3 bucket storage, and VPC subnet peering."],
      lumi: ["Online servers!", "Up in the cloud."],
      pixel: ["Hosted across multi-region datacenters with 99.99% SLA availability.", "Offers on-demand compute instances and virtual storage without on-prem hardware."]
    }
  },

  // CATEGORY 2: INNOVATION
  {
    word: "Startup",
    category: "Innovation",
    clues: {
      nova: ["A brave little ship sailing uncharted waters seeking its treasure island.", "A tiny seed planted in uncertainty aiming to shake the world."],
      byte: ["A high-burn rate early-stage entity iterating towards product-market fit.", "Pre-revenue venture equity aiming for exponential user acquisition."],
      lumi: ["New hustle!", "Disrupting fast."],
      pixel: ["Formed by co-founders testing an MVP before their seed runway expires.", "Tracks monthly recurring revenue, customer churn, and pitch deck metrics."]
    }
  },
  {
    word: "Prototype",
    category: "Innovation",
    clues: {
      nova: ["The first rough clay sculpture that proves a dream can stand on its own.", "A sketch brought into three dimensions, flawed yet full of promise."],
      byte: ["Proof-of-concept iteration validating functional requirements under test.", "Hardware breadboard or Figma wireframe tested for interface feasibility."],
      lumi: ["Version 0.1!", "First model."],
      pixel: ["Assembled using quick 3D prints or mock wireframes to demo user flow.", "Built to test usability and catch mechanical design flaws early."]
    }
  },
  {
    word: "Pitch",
    category: "Innovation",
    clues: {
      nova: ["Casting a spell with your voice so investors see the future you inhabit.", "Three minutes to convince the world your spark is worth lighting."],
      byte: ["A timed 10-slide deck summarizing TAM, SAM, SOM, and unit economics.", "Targeting angel investors with slide cadence and traction metrics."],
      lumi: ["Talk fast!", "Sell the vision."],
      pixel: ["Includes problem statement, competitive moat, financial forecast, and ask.", "Delivered standing on stage with a clicker in front of an evaluation panel."]
    }
  },
  {
    word: "Entrepreneurship",
    category: "Innovation",
    clues: {
      nova: ["The daring art of jumping off a cliff and building wings on the way down.", "Turning restless curiosity into an enterprise that impacts lives."],
      byte: ["Risk-adjusted enterprise creation maximizing capital efficiency and equity growth.", "Systematic commercialization of intellectual property into operating profit."],
      lumi: ["Boss mindset!", "Building dreams."],
      pixel: ["Involves registering trade licenses, managing cashflow, and assembling founders.", "Navigating operational risks while scaling commercial business units."]
    }
  },
  {
    word: "Research",
    category: "Innovation",
    clues: {
      nova: ["Holding a lantern into the vast forest of human ignorance.", "Questioning what everyone accepts until the truth reveals its quiet secret."],
      byte: ["Rigorous peer-reviewed methodology validating empirical null hypotheses.", "Citation analysis, literature review synthesis, and controlled lab trials."],
      lumi: ["Deep study!", "Finding facts."],
      pixel: ["Documented in academic journals with DOI references and experimental controls.", "Includes ethical approvals, sample cohorts, and detailed laboratory notes."]
    }
  },
  {
    word: "Innovation",
    category: "Innovation",
    clues: {
      nova: ["The spark that turns yesterday's impossible into tomorrow's routine.", "Reimagining the canvas before the paint has even dried."],
      byte: ["Systemic transformation of technological inputs into superior output vectors.", "Patentable novel methodology that outpaces incumbent industry standards."],
      lumi: ["Next level!", "Fresh ideas."],
      pixel: ["Recognized at MIH through patents, creative prototypes, and novel solutions.", "Improves efficiency and user satisfaction compared to standard solutions."]
    }
  },
  {
    word: "Sustainability",
    category: "Innovation",
    clues: {
      nova: ["Borrowing from tomorrow in a way that allows the earth to breathe.", "Designing our footprints so the green grass still springs up behind us."],
      byte: ["Net-zero carbon lifecycle metrics and circular economy closed-loop loops.", "ESG index compliance optimizing energy dissipation per operational cycle."],
      lumi: ["Eco-friendly!", "Save planet."],
      pixel: ["Monitored through recycled material audits, solar offsets, and waste diversion.", "Aims to satisfy current operational needs without depleting natural reserves."]
    }
  },
  {
    word: "Investment",
    category: "Innovation",
    clues: {
      nova: ["Placing your gold upon someone else's horizon, believing it will shine.", "Trust converted into fuel for someone else's engine."],
      byte: ["Capital allocation evaluating IRR, SAFE notes, and liquidation preferences.", "Venture financing structured across pre-seed convertible debt and series rounds."],
      lumi: ["Back the bag!", "Funding time."],
      pixel: ["Signed term sheets allocating funding tranches in exchange for equity shares.", "Requires due diligence audits into cap tables and revenue statements."]
    }
  },

  // CATEGORY 3: UNIVERSITY LIFE
  {
    word: "Hackathon",
    category: "University Life",
    clues: {
      nova: ["A 48-hour whirlwind where caffeine and camaraderie forge digital wonders.", "No sleep, endless ideas, and working software born in a single weekend."],
      byte: ["Time-boxed 36-hour sprint with git commit bursts and final API demo judging.", "Rapid software development with team repositories and submission deadlines."],
      lumi: ["Code sprint!", "No sleep weekend."],
      pixel: ["Teams huddled over laptops with pizza boxes, submitting repos before the countdown.", "Judged on technical execution, originality, UI design, and live demo."]
    }
  },
  {
    word: "Workshop",
    category: "University Life",
    clues: {
      nova: ["Where curiosity meets hands-on discovery in a circle of eager minds.", "Rolling up sleeves to turn abstract theories into tangible skills."],
      byte: ["Interactive skill transfer session with practical exercises and step-by-step code repo.", "Structured 2-hour lab syllabus covering targeted tooling and frameworks."],
      lumi: ["Learn hands-on!", "Skill boost."],
      pixel: ["Facilitator shares screen slides while students follow along on their own devices.", "Includes starter code templates, interactive Q&A, and practical exercises."]
    }
  },
  {
    word: "Student Society",
    category: "University Life",
    clues: {
      nova: ["A constellation of peers gathered by a shared passion outside the classroom.", "Where kindred spirits gather to make university feel like home."],
      byte: ["Chartered student organization with committee bylaws, elections, and budget lines.", "Affiliated student body coordinating calendar events and member registries."],
      lumi: ["Campus club!", "Squad goals."],
      pixel: ["Elects a president, treasurer, and holds regular campus meetups and activities.", "Registered with the student guild with scheduled general meetings."]
    }
  },
  {
    word: "Competition",
    category: "University Life",
    clues: {
      nova: ["A shared arena where sharp minds test their limits and honor their craft.", "The electric tension between rival teams striving for gold."],
      byte: ["Ranked bracket tournament governed by strict rubrics and standardized scoring.", "Competitive event with timed heats, leaderboard updates, and podium standings."],
      lumi: ["Game on!", "Win the prize."],
      pixel: ["Contestants submit entries evaluated by an impartial panel of guest judges.", "Includes trophy presentations, certificates of achievement, and finalist rankings."]
    }
  },
  {
    word: "Campus",
    category: "University Life",
    clues: {
      nova: ["The bustling village of knowledge where future lives begin to unfold.", "Paths of stone walked by thousands of dreams every morning."],
      byte: ["Geolocated physical premises housing academic faculties, labs, and student hubs.", "Middlesex Dubai knowledge village grounds with interconnected blocks."],
      lumi: ["Uni grounds!", "Middlesex hub."],
      pixel: ["Features lecture halls, MIH innovation labs, libraries, and student courtyards.", "The physical university location where classes and events occur."]
    }
  },
  {
    word: "Teamwork",
    category: "University Life",
    clues: {
      nova: ["Different voices joining together to create a harmony none could sing alone.", "Dividing the heavy burden so everyone shares in the joyous summit."],
      byte: ["Asynchronous collaboration utilizing task boards, kanban, and shared repos.", "Distributed effort balancing member competencies against project deliverables."],
      lumi: ["All together!", "Squad power."],
      pixel: ["Assigns defined roles to team members to complete a joint submission.", "Demonstrated through shared Google Docs, peer reviews, and combined presentations."]
    }
  },
  {
    word: "Presentation",
    category: "University Life",
    clues: {
      nova: ["Standing in the spotlight to paint your thoughts onto the minds of your listeners.", "Speaking truth with visual clarity to captivate the room."],
      byte: ["Projecting slide visuals with scripted speaker notes and structured Q&A.", "Delivering a 10-minute briefing with PowerPoint or Canva visuals."],
      lumi: ["Stage talk!", "Show the slides."],
      pixel: ["Speaker stands near the podium clicking through visual slides on the auditorium screen.", "Evaluated on vocal delivery, timing, visual clarity, and question handling."]
    }
  },
  {
    word: "Graduation",
    category: "University Life",
    clues: {
      nova: ["Tossing your cap toward the sky as one chapter closes and the world awaits.", "The golden doorway from student days into the wide unknown."],
      byte: ["Conferral of accredited academic credentials upon completion of requisite degree credits.", "Official commencement ceremony issuing diploma transcripts."],
      lumi: ["Cap & gown!", "We made it!"],
      pixel: ["Students don black gowns and mortarboards to cross the auditorium stage.", "Receives a degree scroll witnessed by family and university faculty."]
    }
  },

  // CATEGORY 4: FUTURE TECHNOLOGY
  {
    word: "Smart City",
    category: "Future Technology",
    clues: {
      nova: ["An urban organism whose veins pulse with data and energy in perfect rhythm.", "Streets that think ahead so people can live in quiet ease."],
      byte: ["Integrated municipal SCADA networks optimizing traffic grid flow and energy grids.", "IoT city-wide middleware aggregating public transport and utility telemetry."],
      lumi: ["Future town!", "Connected streets."],
      pixel: ["Monitored from central control rooms managing smart lampposts and waste bins.", "Optimizes urban mobility and clean energy distribution across city zones."]
    }
  },
  {
    word: "Autonomous Vehicle",
    category: "Future Technology",
    clues: {
      nova: ["A carriage steered by invisible minds, gliding safely through winding avenues.", "Cars that watch the road with unwavering electronic focus."],
      byte: ["Level 5 automated driving stack fusing LiDAR, radar, and lane-keeping neural nets.", "Path-planning algorithms executing vehicle steering without human intervention."],
      lumi: ["Self driving!", "Hands-free car."],
      pixel: ["Equipped with roof-mounted LiDAR arrays and computer vision cameras.", "Navigates street intersections and pedestrian crossings without a human driver."]
    }
  },
  {
    word: "Virtual Reality",
    category: "Future Technology",
    clues: {
      nova: ["Slipping on goggles to step through mirrors into entirely new realities.", "Worlds forged purely out of light, waiting for your footsteps."],
      byte: ["Dual-display stereoscopic headset running 90 FPS with 6-DoF spatial tracking.", "Low-latency spatial rendering with binaural spatial audio."],
      lumi: ["VR headset!", "Virtual world."],
      pixel: ["User straps on a visor and holds haptic controllers to navigate a 3D simulated space.", "Provides immersive field-of-view and spatial interaction."]
    }
  },
  {
    word: "Drone",
    category: "Future Technology",
    clues: {
      nova: ["A mechanical dragonfly gazing down upon our rooftops from the clouds.", "Wings of rotor blades surveying horizons unreachable by foot."],
      byte: ["Unmanned quadcopter UAV stabilized by onboard gyroscopes and GPS telemetry.", "Brushless DC motors controlled by electronic speed controllers via PWM signals."],
      lumi: ["Flying robot!", "Quad rotors."],
      pixel: ["Features four spinning propellers, a gimbal camera, and remote radio controls.", "Used for aerial photography, site surveying, and courier delivery."]
    }
  },
  {
    word: "Smart Home",
    category: "Future Technology",
    clues: {
      nova: ["A house that senses your arrival and warms the hearth before you ask.", "Walls that listen and lights that greet you by name."],
      byte: ["Home automation hub integrating Matter protocols across thermostats and smart bulbs.", "Voice-controlled Zigbee ecosystem executing automated scene triggers."],
      lumi: ["Automated house!", "Smart lights."],
      pixel: ["Allows homeowners to lock doors and adjust temperatures via smartphone apps.", "Includes smart doorbells, motion sensors, and automated sockets."]
    }
  },
  {
    word: "Digital Twin",
    category: "Future Technology",
    clues: {
      nova: ["A ghostly mirror image made of numbers, aging in unison with its physical brother.", "A digital shadow that predicts tomorrow's wear and tear."],
      byte: ["Real-time digital replica updated continuously via bidirectional IoT telemetry.", "Computational simulation reflecting mechanical stress and thermodynamic state."],
      lumi: ["Digital copy!", "Live simulation."],
      pixel: ["Used by engineers to simulate factory stress tests before altering real machines.", "Mirrors live operational telemetry from physical sensors onto a virtual 3D asset."]
    }
  },
  {
    word: "Renewable Energy",
    category: "Future Technology",
    clues: {
      nova: ["Harvesting the breath of winds and the golden gift of sunlight.", "Power that flows endlessly without leaving a scar upon the earth."],
      byte: ["Photovoltaic generation and offshore wind turbine arrays feeding smart inverter grids.", "Decarbonized energy harvesting coupled with utility-scale battery storage."],
      lumi: ["Clean power!", "Solar & wind."],
      pixel: ["Generated through solar panels and wind turbines without consuming fossil fuels.", "Supplies kilowatt-hours with minimal greenhouse gas emissions."]
    }
  },
  {
    word: "3D Printing",
    category: "Future Technology",
    clues: {
      nova: ["Whispering a CAD drawing into reality layer by microscopic layer.", "Sculpting solid form out of thin filaments of hot plastic."],
      byte: ["Additive manufacturing extruding PLA/ABS filament along coordinate G-code paths.", "Stereolithography curing liquid photopolymer resin layer by layer."],
      lumi: ["Print in 3D!", "Layer by layer."],
      pixel: ["Heated nozzle moves across an X-Y-Z gantry building physical plastic parts.", "Turns digital CAD models into physical prototypes directly on the print bed."]
    }
  },

  // CATEGORY 5: MIH ACTIVITIES
  {
    word: "Innovation Challenge",
    category: "MIH Activities",
    clues: {
      nova: ["A summons to dreamers to solve riddles that matter to our future world.", "Where creative courage is put to the test for meaningful change."],
      byte: ["Competitive problem-solving sprint focused on real industry problem statements.", "Scored milestone challenge evaluating technical novelty and market feasibility."],
      lumi: ["Solve it fast!", "Challenge mode."],
      pixel: ["Students form teams at MIH to develop solutions for sponsor-provided briefs.", "Concludes with presentations before an expert panel with awards and certificates."]
    }
  },
  {
    word: "Startup Weekend",
    category: "MIH Activities",
    clues: {
      nova: ["From Friday night idea to Sunday evening company under one roof.", "54 hours of frantic ambition, camaraderie, and entrepreneurial fire."],
      byte: ["54-hour experiential entrepreneurship program culminating in Sunday demo pitches.", "Intensive startup incubator format covering lean validation and customer discovery."],
      lumi: ["Weekend hustle!", "Pitch Sunday."],
      pixel: ["Participants pitch ideas Friday, form teams, build MVPs Saturday, and pitch Sunday night.", "Hosted at MIH with mentors, food, and startup judging panels."]
    }
  },
  {
    word: "Brainstorming",
    category: "MIH Activities",
    clues: {
      nova: ["A storm of wild thoughts where every raindrop could be the next revelation.", "Unleashing the mind so unusual connections can collide and spark."],
      byte: ["Divergent thinking exercise generating high-volume unstructured concept nodes.", "Unconstrained ideation session preceding convergence and feasibility filtering."],
      lumi: ["Sticky notes!", "Wild ideas."],
      pixel: ["Students write diverse concepts onto colorful Post-it notes across whiteboards.", "Encourages quantity of ideas first before selecting the strongest concepts to test."]
    }
  },
  {
    word: "Networking",
    category: "MIH Activities",
    clues: {
      nova: ["Weaving the invisible web of handshakes and conversations that open doors.", "Planting seeds of friendship that may one day bear collaborative fruit."],
      byte: ["Establishing high-value professional contact nodes across industry attendees.", "Exchanging LinkedIn handles, portfolio links, and career opportunities."],
      lumi: ["Make contacts!", "Coffee & chat."],
      pixel: ["Held in the MIH lounge with name badges, business card exchanges, and introductions.", "Connects university students with founders, alumni, and potential co-creators."]
    }
  },
  {
    word: "Demo Day",
    category: "MIH Activities",
    clues: {
      nova: ["The unveiling of treasures crafted in secret over weeks of dedicated toil.", "Where prototypes step out of the shadows and into the bright light."],
      byte: ["Public showcase showcasing validated prototypes to investors and press.", "Scheduled demonstration slots highlighting product telemetry and commercial readiness."],
      lumi: ["Show and tell!", "Live demo time."],
      pixel: ["Stands and screens set up at the hub where teams present their working software live.", "Audience and judges vote on favorite projects and investor-ready prototypes."]
    }
  },
  {
    word: "Mentorship",
    category: "MIH Activities",
    clues: {
      nova: ["A seasoned traveler holding a lantern for those who walk the path behind.", "Wisdom passed hand-to-hand like a torch through generations."],
      byte: ["Structured advisory sessions pairing domain experts with early-stage founders.", "Targeted feedback on business model validation, code architecture, and scaling."],
      lumi: ["Guidance & tips!", "Coach advice."],
      pixel: ["Scheduled one-on-one office hours at MIH with industry veterans and professors.", "Provides strategic advice on pitching, development pitfalls, and career growth."]
    }
  },
  {
    word: "Collaboration",
    category: "MIH Activities",
    clues: {
      nova: ["When two sparks join and produce a flame neither could achieve alone.", "The alchemy of different strengths united behind a single dream."],
      byte: ["Cross-functional syndicate executing shared goals with synchronized deliverables.", "Pairing designers, developers, and business strategists for project synergy."],
      lumi: ["Work together!", "Synergy time."],
      pixel: ["Interdisciplinary students combining computer science, business, and design skills.", "Evidenced through co-authored prototypes and joint project credit at MIH."]
    }
  },
  {
    word: "Exhibition",
    category: "MIH Activities",
    clues: {
      nova: ["A gallery where innovations stand proudly like statues in a grand hall.", "Inviting the world to wander through the landscape of student ingenuity."],
      byte: ["Curated showcase displaying active project stands and interactive user terminals.", "Public floor plan organized with demo booths and feedback collection stations."],
      lumi: ["Showcase floor!", "Booths & banners."],
      pixel: ["Rows of poster boards, product tables, and digital screens at Middlesex campus.", "Open to students, faculty, and visiting industry guests to test new innovations."]
    }
  }
];

export function getRandomWord(category?: WordCategory): WordDefinition {
  const filtered = category
    ? WORD_BANK.filter(w => w.category === category)
    : WORD_BANK;
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}
