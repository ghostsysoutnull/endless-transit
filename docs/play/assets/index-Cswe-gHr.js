(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`Recursive
Unhandled
Orphaned
Severed
Inverted
Writhing
Eyeless
Null
Corrupted
Dangling
Leaking
Unbound
`,t=`Ornate
Golden
Cathedral
Sacred
Opulent
Marble
Grand
Sanctum
Gilt
Vaulted
Solemn
Baroque
`,n=`Gilded
Velvet
Brass
Crystal
Ornate
Mahogany
Opulent
Clockwork
Burnished
Lacquered
Polished
Velvet-Lined
`,r=`Brutalist
Concrete
Silent
Impenetrable
Grey
Eternal
Static
Cold
Featureless
Basalt
Sealed
Unbroken
`,i=`Vibrant
Fluorescent
Flickering
Synthetic
Digital
Glitchy
Pulsing
Lucid
Buzzing
Chrome
Holographic
Wet
`,a=`Living
Grown
Pulsing
Verdant
Breathing
Soft
Neural
Fungal
Damp
Ribbed
Veined
Sporing
`,o=`Corroded
Oxidized
Patchwork
Scrapyard
Weathered
Fading
Dusty
Assembled
Flaking
Riveted
Sooty
Buckled
`,s=`Lacquered
Silent
Folded
Cedar
Ashen
Vermilion
Paper
Moonlit
Quiet
Tiled
Ink-Black
Ceremonial
`,c=`Hollow
Empty
Silent
Ghostly
Drifting
Dark
Abyssal
Stellar
Blank
Pale
Weightless
Unmarked
`,l=`Marble
Ivory
Laurel
Olympian
Sunlit
Alabaster
Columned
Serene
Gilded
Radiant
Fluted
Olympic
`,u=`Gate
Fall
Reach
Spire
Well
Root
`,d=`Static
Frequencies
Resonance
Stability
Time
Light
The Web
`,f=`landmarks
concepts
compounds
`,p=`The Eye of the Web
Old Unimatrix Root
The Last Stable Surface
The Crystal Sanctum
The Silent Node
The Phantom Spire
The First Pillar
The Heart of the Strata
Apex of Lost Frequencies
The Great Neural Anchor
Pillar of Eternal Static
Unit Zero
The Bleeding Sky-Structure
Memory of the First Pulse
The Void-Watcher
`,m=`Vertex
Thread
Partition
Cyst
Membrane
Sigil
Altar
Exception
Stack
Socket
Fault
Kernel
`,h=`Gallery
Archive
Palace
Temple
Sanctum
Hall
Cathedral
Altar
Chapel
Vestry
Cloister
Spire
`,g=`Salon
Gallery
Atrium
Parlour
Conservatory
Manor
Ballroom
Ledger
Study
Lounge
Vault
Pavilion
`,ee=`Slab
Tower
Obelisk
Block
Unit
Monolith
Foundation
Pillar
Vault
Cube
Plinth
Shaft
`,te=`Hub
Nexus
Array
Node
Core
Circuit
Relay
Grid
Arcade
Booth
Terminal
Strip
`,ne=`Pod
Spore
Nest
Shell
Chamber
Limb
Leaf
Root
Sac
Cyst
Bloom
Hollow
`,re=`Shell
Stack
Monolith
Heap
Vault
Husk
Anchor
Frame
Yard
Silo
Pit
Girder
`,ie=`Pavilion
Shrine
Garden
Dojo
Keep
Teahouse
Lantern
Bridge
Hall
Gatehouse
Courtyard
Tower
`,ae=`Void
Shadow
Echo
Aperture
Gravity
Well
Horizon
Reach
Cell
Plane
Hush
Field
`,oe=`Forum
Temple
Colonnade
Basilica
Agora
Pantheon
Rotunda
Acropolis
Portico
Atrium
Shrine
Terrace
`,se=`small
medium
large
`,ce=`Arcology
Mega-Structure
Spire
Sky-Anchor
Bastion
Citadel
`,le=`Block
Plaza
Heights
Center
Complex
`,ue=`Annex
Cell
Unit
Pod
Hut
Point
`,de=`Silver
Gold
Black
White
Iron
Steel
Neon
Cyber
Steam
Clock
Void
Star
Cloud
Rain
`,fe=`head
tail
`,pe=`town
city
burg
ville
port
gate
haven
peak
spire
bridge
fall
cross
well
ford
`,me=`Arid
Frost
Verdant
Iron
Storm
Shadow
Light
Dust
Glacier
Jungle
Desert
Ocean
`,he=`prefix
core
suffix
`,ge=`The United
Great
New
Old
Western
Eastern
Northern
Southern
Imperial
Democratic
Holy
Free
`,_e=`Republic
Kingdom
Empire
Federation
Sovereignty
Union
Territories
Lands
Domain
`,ve=`Alpha
Beta
Gamma
Delta
Epsilon
Zeta
Eta
Theta
Iota
Kappa
Lambda
Mu
`,ye=`greek
type
`,be=`Strand
Thread
Web
Link
Sync
Stream
Flow
Pulse
`,xe=`lobby
peak
`,Se=`TRANSIT_LOBBY
`,Ce=`PEAK_OBSERVATORY
`,we=`MECHANICAL_SUMP
STORAGE_CELL
POWER_RELAY
FILTRATION_INTAKE
`,Te=`EXECUTIVE_SUITE
NEURAL_UPLINK
DATA_VAULT
VIP_QUARTERS
`,Ee=`basement
living
executive
`,De=`LIVING_UNIT
RESEARCH_LAB
HYDROPONIC_BAY
BIO_SERVER
`,Oe=`Ter
Neo
Xen
Kry
Vex
Zion
Aura
Nova
Eden
Gaia
Hydra
Nyx
Orion
Phoe
Rhea
Styx
`,ke=`head
tail
`,Ae=`ra
on
os
is
us
ia
ea
ax
ox
un
ar
el
im
um
`,je=`Hydroponic Bay||stillness
Spore Farm||stillness
Oxygen Sump||stillness
Growth Chamber||stillness
`,Me=`Prayer Hall||stillness
Ritual Chamber||stillness
Archive||stillness
Memory Well||frost
`,Ne=`Trading Floor||stillness
Logic Market||stillness
Credit Hub||humming
Supply Node||clicking
`,Pe=`Power Plant||ozone
Processing Core||ozone
Maintenance Bay||clicking
Fuel Depot||humming
`,Fe=`Security Station|burned DANGER|clicking
Barracks||humming
Armory|burned DANGER|clicking
Tactical Hub||humming
`,Ie=`Laboratory|stamped DATA_VAULT|ozone
Neural Link Array||ozone
Observation Deck||stillness
Bio-Server|stamped DATA_VAULT|ozone
`,Le=`Outer
Inner
Core
Rim
Void
Prime
Secondary
Tertiary
Quaternary
`,Re=`descriptor
noun
`,ze=`Sector
Quadrant
Grid
Matrix
Zone
Region
Reach
Expanse
`,Be=`prefix
suffix
`,Ve=`Alpha
Proxima
Sirius
Vega
Rigel
Antares
Betelgeuse
Altair
Deneb
Polaris
Zeta
Epsilon
Omicron
Sigma
Tau
Lambda
`,He=`Prime
Minor
Major
Borealis
Australis
Centauri
Ceti
Eridani
Groombridge
Kapteyn
Luyten
`,Ue=`High
Low
Main
Grand
Broad
Dark
Bright
Old
New
Quiet
Busy
Long
Short
Hidden
`,We=`adjective
noun
`,Ge=`Way
Road
Street
Avenue
Lane
Drive
Path
Walk
Boulevard
Terrace
Row
Circle
Loop
Alley
`,Ke=`a single flickering green bulb
pulsing red emergency strobes
unshielded sparking conduits
the dim glow of dying data-cores
harsh sodium-yellow glare
complete darkness punctuated by blue static
the rhythmic blink of a foundation-alarm
cold moonlight-simulations through ceiling-cracks
`,qe=`the warm cathode glow of a CRT monitor
flickering fluorescent tubes with a distinct hum
the orange pulse of vacuum tubes
buzzing neon signage leaking green light
dim yellow incandescent bulbs on frayed wires
the flicker of a slide projector left cycling
a desk lamp with a bent green shade
the amber glow of a radio dial
a bare bulb behind a cracked lampshade
the phosphor trace of an oscilloscope
`,Je=`the flickering flame of oil lamps
guttering beeswax candles
harsh sunlight filtered through dust
low-burning embers in a stone hearth
pale moonlight through a narrow aperture
guttering tallow candles in iron sconces
embers breathing in a clay hearth
dust-thick sunlight through a narrow slit
a single oil lamp on a stone ledge
moonlight through a broken lattice
`,Ye=`the green phosphor sweep of a radar scope
ring-shaped fluorescent tubes humming behind chrome grilles
the sickly glow of radium-painted dials
a bare bulb swinging inside a lead-lined cage
harsh flashbulb pops from a camera no one is holding
the strobe of a rotating beacon
formica gleaming under fluorescent panels
a lava lamp's slow orange churn
the pale wash of a television test pattern
a neon diner sign buzzing red
`,Xe=`the blue-white wash of a flat-panel monitor left on
status LEDs blinking green and amber along an ethernet hub
a screensaver's slow colours crawling across the ceiling
the translucent glow of a tower case lit from within
pale light leaking around a frosted glass disc
the cyan glow of a loading bar
a monitor cycling through screensaver stars
a wall of LEDs blinking out of sync
a scanner's green line sweeping the floor
the pale flicker of a failing backlight
`,Ze=`light that fades the moment you look at it
a residual glow bleeding from surfaces that no longer exist
the after-image of a lamp that has already gone out
dissolving motes of static drifting like ash
a dull heat-shimmer where the ceiling used to be
light that arrives a moment after its source
a glow with no lamp left to cast it
sunlight faded to the colour of dust
the memory of fluorescence, humming
shadows brighter than the room
`,Qe=`a soft holographic haze with no visible source
laser-etched lines glowing along the seams of the floor
smart glass panels dimming and brightening on their own
the violet corona of an idle plasma coil
a drone's searchlight sweeping past the doorway
a lattice of laser threads across the ceiling
bioluminescent panels breathing slowly
the white glare of a field emitter
a hologram flickering between two rooms
light bent around a gravity plate
`,$e=`abyssal
analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,et=`the intense white arc of a welding torch
humming mercury-vapor lamps
cold sodium-glare reflecting off soot
pulsing red emergency strobes
the steady burn of gas-lanterns
a foundry glow through smoked glass
carbide lamps hissing on hooks
a wall of gauges lit from behind
sparks arcing from an open junction
oil lamps swinging on a chain
`,tt=`shifting quantum particles suspended in air
the soft, directionless glow of pure data
blinding white singularity-flashes
flickering holographic rays in various spectra
the cold blue luminescence of dark-matter cores
light folded twice before it reaches you
the blue shimmer of a probability field
a glow that is brighter when you look away
stars visible through a wall that is not there
the slow pulse of a zero-point coil
`,nt=`a sprawling grow-chamber with hanging pods
terraced geometric shelves for organic data
low-humidity storage-vault architecture
spatial grid designed for nutrient-flow
domed environment with recycled atmosphere
a humid grow-hall under banks of pink lamps
stacked hydroponic trays dripping into gutters
a seed vault of numbered steel drawers
a composting pit ringed with vents
a greenhouse with every pane fogged
`,rt=`a cavernous vaulted hall
geometry designed for acoustic resonance
ornate processional pathway with high ceilings
ceremonial viewing-gallery structure
sacred geometric reconstruction
a circular nave beneath a dark dome
a hall of benches facing an empty dais
a crypt of stacked memory-urns
a bell chamber with the bell removed
a reliquary room lined with sealed niches
`,it=`a tiered trading floor beneath a dead ticker board
shuttered market stalls arranged in a strict grid
a vaulted credit hall of teller cages and pneumatic tubes
shelving-lined supply geometry with a barcode on every edge
an open atrium of kiosks lit for customers who never came
a counting room of locked drawers and ledgers
a showroom of empty plinths
a warehouse aisle of numbered crates
a ticket hall with every window shuttered
an exchange floor of dead terminals
`,at=`a soot-blackened machine hall with catwalks overhead
pipe-choked geometry built around a single humming turbine
a maintenance pit ringed by chain hoists and drip trays
a cavernous fuel bay of riveted tanks and warning stencils
gantry-braced architecture that vibrates with every pulse
a pump room throbbing behind a steel grille
a foundry floor scarred by cooled spills
a control gallery over a silent line
a coal bunker with a sloping floor
a compressor hall lined with gauges
`,ot=`a cramped, blast-shielded alcove
reinforced bunker-like geometry
spatial cell with tactical telemetry projected on the floor
narrow kill-zone corridor layout
armored transit-node architecture
a briefing room with the map torn down
a magazine of empty racks and chains
a watch post with a slit for a window
a gas-lock chamber with two sealed doors
a drill floor marked in faded lines
`,st=`a sterile, hyper-clean laboratory cell
geometry optimized for spectral observation
sprawling containment unit with glass partitions
data-rich environment with floating schematics
modular experimental subspace
a clean room behind a double airlock
an archive of slide drawers and lamps
an observation cell walled in one-way glass
a specimen vault of frosted jars
a calibration bay of silent instruments
`,ct=`geometry that folds back into itself at the corners
a non-Euclidean chamber whose far wall is also its floor
a probability-field cell that resolves only while observed
space stretched thin around a dormant quantum core
a time-dilated alcove where echoes arrive before their source
a corridor that ends where it began
a room whose ceiling is another floor
a stairwell that descends into its own top
an alcove folded inside a larger alcove
a chamber lit by its own reflection
`,lt=`a cavernous brutalist vault
geometry designed for substrate-pressure
massive maintenance sub-void
foundation pit with echoing depths
unfinished spatial segment
recursively deepening concrete shaft
oppressive low-ceiling transit-node
forgotten infrastructure cell
`,ut=`abyssal
Agricultural
Ceremonial
Commercial
Industrial
Military
Research
Singularity
`,dt=`raw pour-concrete
rusted rebar
vibrating metal plates
exposed heavy cabling
moist, dark aggregate
black oily tiles
heavily weathered granite
oxidized iron plating
`,ft=`silk damask with gold thread
heavy mahogany paneling
plaster with crumbling frescoes
velvet-lined stonework
gilded ivory slabs
stone tracery over faded frescoes
dark oak panels carved with vines
gilt mouldings peeling from plaster
cold flagstone under tapestries
stained glass set into black iron
`,pt=`velvet-flocked wallpaper above mahogany wainscoting
brass-framed panels of etched crystal
silk tapestries hung over gilt plaster
clock-mechanism friezes in tarnished brass
mirrored panels in ornate gold-leaf frames
wallpaper of interlocking clock faces
mahogany cabinets glazed with crystal
panels of tooled leather and brass studs
cream plaster with gilded cornices
mirrored alcoves behind velvet ropes
`,mt=`unyielding obsidian blocks
matte-black composite plating
brutalist concrete with geometric grooves
featureless grey ceramic
seamless dark alloy
matte basalt slabs with no visible mortar
dark composite panels etched with a grid
polished grey stone that swallows echoes
seamless black alloy, faintly warm
hexagonal ceramic tiles, unbroken
`,ht=`flickering acrylic panels
exposed wiring behind translucent plastic
projected holographic static
humming glass conduits
backlit mirrored surfaces
wet-look acrylic streaked with pink light
glass block lit from within
panels of dead advertising screens
corrugated plastic over flickering tubes
mirrored strips under a violet wash
`,gt=`pulsing sinew and bone-like struts
translucent membrane over fluid-filled sacks
hardened chitinous plates
woven vine-lattices with moss overgrowth
calcified shell-fragments
ribbed cartilage that flexes as you pass
damp membrane veined with light
overlapping scales the colour of bone
a lattice of roots grown through plaster
soft fungal shelves in tiers
`,_t=`corrugated sheets bolted over crumbling brick
flaking industrial paint over pitted iron
welded scrap plates streaked with orange oxide
oil-stained concrete cracked down to the rebar
chain-link mesh stretched over rusted girders
oxide-streaked steel with weeping seams
patched sheet metal over brick
iron plating bubbled with corrosion
soot-black concrete and rusted mesh
warped girders behind tarpaulin
`,vt=`shoji screens of paper stretched over cedar
lacquered panels painted with cranes and mist
plaster stained by the smoke of a thousand lanterns
woven bamboo lattice over dark timber
vermilion pillars framing calligraphy scrolls
dark cedar beams over white plaster
sliding panels painted with pines
bamboo slats and rice-paper light
black lacquer inlaid with mother-of-pearl
stacked stone under a tiled eave
`,yt=`seamless white surfaces with no visible joins
perfectly matte panels that swallow every shadow
glass so clear it reads as open air
white light strips set flush into featureless plaster
silent, unmarked panels that hum when touched
white panels with no seams or shadows
frosted glass lit evenly from nowhere
matte surfaces that refuse a reflection
pale plaster, absolutely silent
a curved wall with no corner to find
`,bt=`fluted marble columns set into alabaster
sun-bleached limestone carved with laurel friezes
ivory-veined marble polished to a mirror
weathered travertine blocks joined without mortar
painted plaster of sandaled figures in procession
white marble veined with gold
fluted columns between painted panels
limestone blocks carved with olive wreaths
travertine warmed by an unseen sun
bronze plaques set into alabaster
`,xt=`white
blue
pink
gray
purple
orange
green
red
`,St=`overturned
dust-covered
cracked
humming
bolted-down
half-dismantled
flickering
pristine
scorched
overgrown
frost-rimed
rewired
upended
sealed
sagging
immaculate
`,Ct=`obsidian shard
liquid static
calcified memory
jagged vertex
severed conduit
unhandled exception
null reference
recursive loop
dead thread
orphan process
inverted angle
folding edge
impossible cube
shadowless mass
writhing data-tendril
pulsing memory-cyst
eyeless observer-node
membrane of forgotten code
ichor-stained conduit
altar of the core-dump
sacrificial thread
sigil of the unmaker
pact of the root-user
ceremonial gateway
whispering partition
shackled deity-process
void-gate of the deep
hunger of the zero-vector
`,wt=`stone gargoyle
incense burner
stained glass shard
iron portcullis
prayer bench
velvet kneeling-rug
heavy beeswax candle
gothic arch fragment
reliquary box
wrought-iron sconce
illuminated folio
marble cherub
brass censer
carved choir stall
rose-window fragment
funeral mask
`,Tt=`velvet armchair
mahogany desk
brass clock
crystal chandelier
ornate mirror
pocket watch
silk tapestry
candelabra
ledger stand
gilt picture frame
crystal decanter
velvet chaise
brass telescope
music box
ivory letter opener
mahogany humidor
`,Et=`abyssal
baroque
gilded
monolith
neon
organic
rust
shogun
void
zenith
`,Dt=`obsidian cube
green power conduit
data probe
geometric slab
neural interface
black glass panel
hexagonal pillar
bioluminescent vein
matte alloy plate
blank data tablet
grey conduit spool
hexagonal tile
null terminal
basalt bench
silent turbine blade
obsidian lens
`,Ot=`flickering light tube
acrylic panel
synthetic fur
holographic billboard fragment
data-cable bundle
vending machine keypad
neon signage
plastic bead curtain
glitching billboard
arcade cabinet
translucent umbrella
vinyl booth seat
chrome ashtray
pachinko ball
neon tube coil
shattered visor
`,kt=`chitinous plate
pulsating membrane
bone-like strut
neural-fiber cluster
oozing valve
keratin spine
leathery sac
flesh-mesh
spore sac
vein cluster
chitin shell
nerve bundle
pod husk
resin node
cartilage frame
mycelium mat
`,At=`corrugated metal sheet
rusted chain
iron girder
oil-stained rag
scrap heap
welded pipe
cracked concrete block
industrial valve
bent rebar
drum of solvent
chain hoist
broken gauge
oxidized bolt
tin canteen
burnt workbench
iron manhole cover
`,jt=`shoji screen
tatami mat
katana rack
bonsai tree
lacquered chest
paper lantern
calligraphy scroll
wooden geta
iron tea kettle
folding fan
stone lantern
ink stone
straw sandal
kabuto helmet
bamboo ladle
hanging scroll
`,Mt=`floating white sphere
invisible support
seamless glass cube
silent fan
perfectly white tile
hidden speaker
white light strip
shadowless corner
blank white cube
silent bell
empty frame
hovering disc
matte pillar
unmarked door
white noise emitter
absent chair
`,Nt=`marble pillar
white stone altar
laurel wreath
toga-draped statue
ivory pedestal
sandaled footprint
lyre
amphora
bronze tripod
olive-wood chest
wax signet
scroll case
sundial
bronze greave
marble bust
oil flask
`,Pt=`A long corridor with multiple doors
A narrow service corridor, doors set flush into either wall
A curved gallery of doors beneath a single strip of light
A dead-straight corridor whose far end dissolves into static
`,Ft=`The air hums with the resonance of {culture} geometry.
{culture} geometry presses in from every wall; the elevator sighs shut behind you.
A landing of {culture} design, silent except for the lift cables ticking overhead.
The floor plate resonates faintly with {culture} architecture.
`,It=`corridor
floor
`,Lt=`inscriptions
materials
states
`,Rt=`VOID_SINK
LATTICE
HELP_IS_STATIC
QUARANTINE
RESONANCE
NO_ENTRY
HOLLOW
DO_NOT_ANSWER
SIGNAL_LOST
KEEP_WALKING
SEALED_BY_ORDER
THE_ROOT_REMEMBERS
`,zt=`Heavy Bulkhead|A heavily reinforced poly-slab bulkhead.
Synth-Glass Slab|A pristine synth-glass barrier, reflecting the corridor's dim light.
Pitted Concrete|A massive brutalist slab of pitted concrete.
Reinforced Polymer|A slab of reinforced polymer, dull and unscratched.
Oxidized Metal Hatch|An oxidized metal hatch, its wheel-lock seized.
Pristine Ceramic|A pristine ceramic panel, cool and faintly glossy.
Brutalist Slab|A massive brutalist slab of pitted concrete.
Industrial Barrier|An industrial barrier of stamped steel and yellow chevrons.
Riveted Iron Hatch|A hatch of riveted iron, its seams weeping orange.
Frosted Crystal Pane|A pane of frosted crystal, faintly luminous.
Lacquered Timber Gate|A timber gate under many coats of black lacquer.
Bone-Lattice Aperture|An aperture of interlocking bone-white struts.
`,Bt=`Vibrating|The surface is vibrating with a low-frequency thrum.
Cold|The frame is ice-cold to the touch, pulling heat from your palm.
Rusted|The metal hinges are fused by deep, flakey oxidation.
Stable|The structure appears stable.
Pitted|The surface is heavily scarred by micro-impacts and substrate decay.
Polished|The surface is perfectly smooth and sterile.
Static|The door is totally motionless, appearing almost like a static image.
Scorched|The surface is blackened in a fan shape, as if something burned its way out.
Weeping|Moisture beads along the seams and runs in slow lines.
Humming|A steady hum is felt through the frame rather than heard.
Frozen|A rime of frost has sealed the edges shut.
Warped|The panel has bowed outward and no longer meets its frame.
`,Vt=`colours
conditions
planet-frames
traits
`,Ht=`baroque|yellow
gilded|white
monolith|cyan
neon|bright-cyan
organic|green
rust|red
shogun|magenta
void|grey
zenith|blue
`,Ut=`crt monitor
floppy disk
cassette tape
rotary phone
beige keyboard
magnetic strip
dot matrix printer
vhs player
reel-to-reel deck
punch card stack
oscilloscope
trimline handset
slide projector
ticker tape spool
answering machine
transistor radio
`,Wt=`clay pot
stone tool
oil lamp
dried papyrus
bronze figurine
woven basket
hewn log
flint scraper
bronze mirror
grinding stone
amphora stopper
bone needle
wax tablet
obsidian blade
reed flute
clay tablet
`,Gt=`chrome tailfin
geiger counter
lead-lined container
vacuum tube
bakelite dial
radar dish
lunch box
protective goggles
formica counter
atomic clock
film reel canister
chrome toaster
civil defense siren
slide rule
rocket-fin lamp
dosimeter badge
`,Kt=`translucent blue shell
ethernet hub
optical mouse
flat-panel monitor
zip drive
pager
frosted glass disc
pixelated icon
beige tower case
dial-up modem
cd-rom spindle
trackball
cathode webcam
mp3 player
ribbon cable
blue LED array
`,qt=`dissolving edge
shadow fragment
lingering heat
unravelling thread
crumbling mass
faded memory
flickering existence
static residue
half-erased sign
dust outline
stopped clock
rusted-through frame
sun-bleached print
collapsed shelf
cold ash heap
echo of a voice
`,Jt=`hologram projector
gravity plate
laser cutter
smart glass
neural link
plasma coil
nanotech mesh
drone dock
haptic glove
quantum key
synth-skin patch
aerogel slab
orbital beacon
cryo cell
optic implant
field emitter
`,Yt=`analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,Xt=`pressure gauge
brass piston
coal-stained shovel
steam whistle
copper pipe
heavy flywheel
iron rivet
soot-covered lens
oil can
riveted boiler plate
coal scuttle
governor flywheel
foundry ladle
leather drive belt
signal lantern
brass valve wheel
`,Zt=`shifting geometry
quantum core
probability field
void shard
time-dilated echo
entropy drive
singularity seed
non-euclidean frame
folded horizon
tesseract hinge
causal loop
event-horizon lens
phase anchor
negative-mass bead
observer shard
zero-point coil
`,Qt=`Ceremonial
Military
Industrial
Agricultural
Research
Commercial
`,$t=class{#e;constructor(){this.#e=Object.assign({"./names/buildings/adj/abyssal.txt":e,"./names/buildings/adj/baroque.txt":t,"./names/buildings/adj/gilded.txt":n,"./names/buildings/adj/monolith.txt":r,"./names/buildings/adj/neon.txt":i,"./names/buildings/adj/organic.txt":a,"./names/buildings/adj/rust.txt":o,"./names/buildings/adj/shogun.txt":s,"./names/buildings/adj/void.txt":c,"./names/buildings/adj/zenith.txt":l,"./names/buildings/compounds.txt":u,"./names/buildings/concepts.txt":d,"./names/buildings/index.txt":f,"./names/buildings/landmarks.txt":p,"./names/buildings/noun/abyssal.txt":m,"./names/buildings/noun/baroque.txt":h,"./names/buildings/noun/gilded.txt":g,"./names/buildings/noun/monolith.txt":ee,"./names/buildings/noun/neon.txt":te,"./names/buildings/noun/organic.txt":ne,"./names/buildings/noun/rust.txt":re,"./names/buildings/noun/shogun.txt":ie,"./names/buildings/noun/void.txt":ae,"./names/buildings/noun/zenith.txt":oe,"./names/buildings/sizes/index.txt":se,"./names/buildings/sizes/large.txt":ce,"./names/buildings/sizes/medium.txt":le,"./names/buildings/sizes/small.txt":ue,"./names/city/head.txt":de,"./names/city/index.txt":fe,"./names/city/tail.txt":pe,"./names/country/core.txt":me,"./names/country/index.txt":he,"./names/country/prefix.txt":ge,"./names/country/suffix.txt":_e,"./names/filament/greek.txt":ve,"./names/filament/index.txt":ye,"./names/filament/type.txt":be,"./names/floors/index.txt":xe,"./names/floors/lobby.txt":Se,"./names/floors/peak.txt":Ce,"./names/floors/zones/basement.txt":we,"./names/floors/zones/executive.txt":Te,"./names/floors/zones/index.txt":Ee,"./names/floors/zones/living.txt":De,"./names/planet/head.txt":Oe,"./names/planet/index.txt":ke,"./names/planet/tail.txt":Ae,"./names/rooms/Agricultural.txt":je,"./names/rooms/Ceremonial.txt":Me,"./names/rooms/Commercial.txt":Ne,"./names/rooms/Industrial.txt":Pe,"./names/rooms/Military.txt":Fe,"./names/rooms/Research.txt":Ie,"./names/sector/descriptor.txt":Le,"./names/sector/index.txt":Re,"./names/sector/noun.txt":ze,"./names/solar-system/index.txt":Be,"./names/solar-system/prefix.txt":Ve,"./names/solar-system/suffix.txt":He,"./names/street/adjective.txt":Ue,"./names/street/index.txt":We,"./names/street/noun.txt":Ge,"./themes/atmosphere/lighting/abyssal.txt":Ke,"./themes/atmosphere/lighting/analog.txt":qe,"./themes/atmosphere/lighting/ancient.txt":Je,"./themes/atmosphere/lighting/atomic.txt":Ye,"./themes/atmosphere/lighting/digital.txt":Xe,"./themes/atmosphere/lighting/entropic.txt":Ze,"./themes/atmosphere/lighting/future.txt":Qe,"./themes/atmosphere/lighting/index.txt":$e,"./themes/atmosphere/lighting/industrial.txt":et,"./themes/atmosphere/lighting/singularity.txt":tt,"./themes/atmosphere/structures/Agricultural.txt":nt,"./themes/atmosphere/structures/Ceremonial.txt":rt,"./themes/atmosphere/structures/Commercial.txt":it,"./themes/atmosphere/structures/Industrial.txt":at,"./themes/atmosphere/structures/Military.txt":ot,"./themes/atmosphere/structures/Research.txt":st,"./themes/atmosphere/structures/Singularity.txt":ct,"./themes/atmosphere/structures/abyssal.txt":lt,"./themes/atmosphere/structures/index.txt":ut,"./themes/atmosphere/walls/abyssal.txt":dt,"./themes/atmosphere/walls/baroque.txt":ft,"./themes/atmosphere/walls/gilded.txt":pt,"./themes/atmosphere/walls/monolith.txt":mt,"./themes/atmosphere/walls/neon.txt":ht,"./themes/atmosphere/walls/organic.txt":gt,"./themes/atmosphere/walls/rust.txt":_t,"./themes/atmosphere/walls/shogun.txt":vt,"./themes/atmosphere/walls/void.txt":yt,"./themes/atmosphere/walls/zenith.txt":bt,"./themes/colours.txt":xt,"./themes/conditions.txt":St,"./themes/cultures/abyssal.txt":Ct,"./themes/cultures/baroque.txt":wt,"./themes/cultures/gilded.txt":Tt,"./themes/cultures/index.txt":Et,"./themes/cultures/monolith.txt":Dt,"./themes/cultures/neon.txt":Ot,"./themes/cultures/organic.txt":kt,"./themes/cultures/rust.txt":At,"./themes/cultures/shogun.txt":jt,"./themes/cultures/void.txt":Mt,"./themes/cultures/zenith.txt":Nt,"./themes/descriptions/corridor.txt":Pt,"./themes/descriptions/floor.txt":Ft,"./themes/descriptions/index.txt":It,"./themes/doors/index.txt":Lt,"./themes/doors/inscriptions.txt":Rt,"./themes/doors/materials.txt":zt,"./themes/doors/states.txt":Bt,"./themes/index.txt":Vt,"./themes/planet-frames.txt":Ht,"./themes/timelines/analog.txt":Ut,"./themes/timelines/ancient.txt":Wt,"./themes/timelines/atomic.txt":Gt,"./themes/timelines/digital.txt":Kt,"./themes/timelines/entropic.txt":qt,"./themes/timelines/future.txt":Jt,"./themes/timelines/index.txt":Yt,"./themes/timelines/industrial.txt":Xt,"./themes/timelines/singularity.txt":Zt,"./themes/traits.txt":Qt})}read(e){return this.#e[`./${e}`]}paths(){return Object.keys(this.#e).map(e=>e.replace(/^\.\//,``))}},en=class{#e;#t=new Map;constructor(e){this.#e=e}index(e){return this.list(`${e}/index`)}has(e){return this.#t.has(e)||this.#e.read(`${e}.txt`)!==void 0}list(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#n(`${e}.txt`);return this.#t.set(e,n),n}pairs(e){return this.list(e).map(t=>{let n=t.indexOf(`|`);if(n<0)throw Error(`content file ${e}.txt: '${t}' is not a key|value line`);return[t.slice(0,n).trim(),t.slice(n+1).trim()]})}#n(e){let t=this.#e.read(e);if(t===void 0)throw Error(`content file is missing: ${e}`);let n=t.split(/\r?\n/).map(e=>e.trim()).filter(e=>e!==``);if(n.length===0)throw Error(`content file has no entries: ${e}`);return Object.freeze(n)}},tn=/^0(\.(0|[1-9]\d*))*$/,_=class e{#e;constructor(e){for(let t of e)if(!Number.isSafeInteger(t)||t<0)throw RangeError(`a child index is a whole number from zero up, got ${String(t)}`);this.#e=Object.freeze([...e])}static parse(t){if(!tn.test(t))return;let n=t.split(`.`).slice(1).map(Number);return n.every(e=>Number.isSafeInteger(e))?new e(n):void 0}child(t){return new e([...this.#e,t])}parent(){return this.#e.length===0?void 0:new e(this.#e.slice(0,-1))}indices(){return this.#e}depth(){return this.#e.length}equals(e){return this.toString()===e.toString()}toString(){return[`0`,...this.#e.map(String)].join(`.`)}},nn=`☠`,rn=`map`,v=class{#e;#t;constructor(e){this.#e=e}callSign(){return this.name()}ordinal(){return this.index()+1}goesByNumber(){return!1}facts(){return[]}drawing(){return this.kind().key()}figure(){return null}readings(){return[]}listing(){return this.children()}admits(e){return this.listing().includes(e)}arrival(){return this}arrive(){let e=this.arrival();return e===this?this:e.arrive()}current(){return!1}exit(){return this.parent()?.arrival()}leave(){return this.exit()}leaveLabel(){return`Leave ${this.kind().title()}`}moves(){return[]}move(e){if(this.moves().some(t=>t.id===e))throw Error(`${this.kind().key()} offers the move '${e}' but does not make it`)}remember(){}recall(e){return e===this.remember()}startOfJourney(){return this.children()[0]?.startOfJourney()??this}sealed(){return!1}landmark(){return!1}contents(){return null}scan(e){}scanned(e){return[]}sensed(){return``}findRelic(e){return this.contents()?.objects.find(t=>t.key()===e)}capture(e){if(this.contents()?.objects[e]!==void 0)throw Error(`${this.kind().key()} holds things but does not hand them over`)}drop(e){if(this.contents()!==null)throw Error(`${this.kind().key()} holds things but takes none in (${e.name()})`);return!1}lottery(e){}echo(){}sample(){this.parent()?.sample()}infuse(){this.parent()?.infuse()}forge(e){return this.parent()?.forge(e)}keystone(){return this.parent()?.keystone()}prime(){return this.parent()?.prime()??!1}breachOffered(e){return!1}breach(e){}abyssal(){return this.parent()?.abyssal()??!1}peers(){return this.parent()?.children()??[]}root(){return this.parent()?.root()??this}indoors(){return this.parent()?.indoors()??!1}mapped(){return!0}mapNodes(){return this.listing()}mapGlyph(){return this.abyssal()?nn:this.kind().icon()}mapSpot(e,t){let n=this.seed().branch(rn);return{x:n.branch(`x`).range(0,e-1),y:n.branch(`y`).range(0,t-1)}}meta(){return``}drainFactor(){return this.parent()?.drainFactor()??1}vibe(){return this.parent()?.vibe()}drainEra(){return this.vibe()?.era()}landmarkFactor(){return this.parent()?.landmarkFactor()??1}seed(){return this.#e.seed}parent(){return this.#e.parent}index(){return this.#e.index}address(){return this.parent()?.address().child(this.index())??new _([])}depth(){return this.address().depth()}trail(){return[...this.parent()?.trail()??[],this]}children(){return this.#t??=Object.freeze([...this.#e.children.childrenOf(this)]),this.#t}populated(){return this.#t!==void 0}descendant(e){if(!this.sealed())return e.indices().slice(this.depth()).reduce((e,t)=>{let n=e?.children()[t];return n?.sealed()===!0?void 0:n},this)}locate(e){return e.indices().slice(this.depth()).reduce((e,t)=>e?.children()[t],this)}},y=class{#e;#t;#n;#r;constructor(e){this.#e=e.key,this.#t=e.title,this.#n=e.icon,this.#r=e.indexLabel}key(){return this.#e}title(){return this.#t}icon(){return this.#n}indexLabel(){return this.#r}equals(e){return this.#e===e.#e}},an=new y({key:`apartment`,title:`Apartment`,icon:`🚪`,indexLabel:`UNIT`}),on=`dealt`,sn=class extends v{#e;#t;#n;#r;#i;#a;#o;constructor(e,t){super(e),this.#e=t.door,this.#t=t.behind,this.#n=t.culture,this.#r=t.era,this.#i=t.anomaly,this.#a=t.rooms,this.#o=Object.freeze([...t.relics])}kind(){return an}name(){return this.#e.description()}door(){return this.#e}behind(){return this.#t}culture(){return this.#n}era(){return this.#r}anomaly(){return this.#i}roomCount(){return this.#a}relics(){return this.#o}relicsIn(e){return this.#o.filter((t,n)=>this.seed().branch(on).branch(n).range(0,this.#a-1)===e)}arrival(){return this.children()[0]??this}readings(){return[{key:`narrative`,label:`APPEARANCE`,value:this.#e.narrative()}]}scanned(){return[{key:`signal`,label:`TRACE`,value:this.#e.trace().name()},{key:`alert`,label:`INSCRIPTION`,value:this.#e.inscription()?.formatted()??``},{key:`reading`,label:`MATERIAL`,value:this.#e.material()},{key:`reading`,label:`STATE`,value:this.#e.state()},{key:`zone`,label:`ROOM_TYPE`,value:this.#t.name()}]}sensed(){return this.#e.sensed()}scan(e){return{title:`[STRATA_OVERVIEW]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:t,current:!1,note:``}))}}description(){return[]}facts(){return this.#i?[{key:`alert`,label:`TEMPORAL_ANOMALY_DETECTED`,value:`[!]`}]:[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#r.key()}]}status(){return this.#i?`ATMOS: [UNSTABLE]`:`ATMOS: [NOMINAL]`}childrenHeading(){return`Internal cells detected:`}approachVerb(){return`Enter Room:`}},cn=new y({key:`crypt`,title:`Crypt`,icon:`🚪`,indexLabel:`UNIT`}),ln=class extends sn{kind(){return cn}facts(){return[{key:`alert`,label:`ABYSSAL_RESONANCE`,value:`DETECTED`}]}status(){return`ATMOS: [PRESSURE_HIGH]`}},un=`hidden`,dn=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.steps,this.#n=e.frequency}key(){return`${un}(${this.#e.toString()}@${String(this.#t)})`}name(){return`Hidden Frequency`}frequency(){return this.#n}resonant(){return!1}data(){return{kind:un,from:this.#e.toString(),steps:this.#t}}},fn=`hybrid`,pn=`-`,mn=` Hybrid`,hn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return`${fn}(${this.#e.key()}+${this.#t.key()})`}name(){let e=e=>e.name().split(` `)[0]??``;return`${e(this.#e)}${pn}${e(this.#t)}${mn}`}frequency(){return this.#e.frequency().plus(this.#t.frequency())}resonant(){return this.frequency().resonant()}data(){return{kind:fn,parts:[this.#e.data(),this.#t.data()]}}},gn=11,_n={times:11,over:10},vn=class e{#e;constructor(e){if(!Number.isInteger(e)||e<0)throw RangeError(`a frequency is a whole number of hertz from zero up, got ${String(e)}`);this.#e=e}hertz(){return this.#e}plus(t){return new e(this.#e+t.#e)}amplified(){return new e(Math.floor(this.#e*_n.times/_n.over))}resonant(){return this.#e>0&&this.#e%gn===0}equals(e){return this.#e===e.#e}},yn=`keystone`,bn=new vn(0),xn=class{#e;#t;constructor(e){this.#e=e.name,this.#t=e.building}key(){return`${yn}(${this.#t.toString()})`}name(){return this.#e}frequency(){return bn}resonant(){return!1}building(){return this.#t}data(){return{kind:yn,building:this.#t.toString()}}},Sn=`relic`,Cn=class{#e;constructor(e){this.#e=e}facts(){return this.#e}key(){return this.#e.relic.key()}name(){return this.#e.relic.name()}frequency(){return this.#e.frequency}resonant(){return this.#e.resonant}from(){return this.#e.from}data(){return{kind:Sn,from:this.#e.from.toString(),key:this.#e.relic.key()}}},wn=`echo`,Tn=class{#e;#t;constructor(e){this.#e=e.from,this.#t=e.frequency}key(){return`${wn}(${this.#e.toString()})`}name(){return`Spectral Echo`}frequency(){return this.#t}resonant(){return!1}data(){return{kind:wn,from:this.#e.toString()}}};function En(e,t){if(typeof t!=`string`)return;let n=_.parse(t);return n===void 0?void 0:e.locate(n)}function Dn(e){if(Array.isArray(e))return`[${e.map(Dn).join(`,`)}]`;if(typeof e==`object`&&e){let t=e;return`{${Object.keys(t).sort().map(e=>`${JSON.stringify(e)}:${Dn(t[e])}`).join(`,`)}}`}return JSON.stringify(e)}var On={[Sn]:({from:e,key:t},n)=>typeof t==`string`?En(n,e)?.findRelic(t):void 0,[fn]:({parts:e},t,n)=>{if(!Array.isArray(e)||e.length!==2)return;let[r,i]=e,a=n.read(r,t),o=n.read(i,t);return a===void 0||o===void 0?void 0:new hn(a,o)},[yn]:({building:e},t)=>En(t,e)?.keystone(),[un]:({from:e,steps:t},n)=>typeof t==`number`?En(n,e)?.lottery(t):void 0,[wn]:({from:e},t)=>En(t,e)?.echo()?.fragment()},kn=class{read(e,t){if(typeof e!=`object`||!e||Array.isArray(e))return;let n=e,r=(typeof n.kind==`string`?On[n.kind]:void 0)?.(n,t,this);if(r!==void 0)return Dn(r.data())===Dn(n)?r:void 0}readAll(e,t){if(!Array.isArray(e))return;let n=[];for(let r of e){let e=this.read(r,t);if(e===void 0)return;n.push(e)}return n}},An=new Set([`a`,`e`,`i`,`o`,`u`]),jn=97,Mn=new Set([11,22,33]),Nn=class{#e;constructor(e){let t=0;for(let n of e.toLowerCase())n<`a`||n>`z`||An.has(n)||(t+=n.charCodeAt(0)-jn+1);this.#e=t}sum(){return this.#e}master(){return Mn.has(this.#e)}frequencyAt(e){return new vn((this.master()?this.#e*2:this.#e)*e)}},Pn=Array.from(`█▓▒░/\\%!$#*`),Fn=class{mangle(e,t,n){return Array.from(e,(e,r)=>e===` `||e===`
`||!n.branch(r).probability(t)?e:n.branch(r).pick(Pn)).join(``)}},In=class{#e;constructor(e){this.#e=new Map(e.map(e=>[e.move.id,e]))}offered(e){return[...this.#e.values()].filter(t=>t.to(e)!==void 0).map(e=>e.move)}make(e,t){let n=this.#e.get(t),r=n?.to(e);return n!==void 0&&r!==void 0&&n.act?.(e),r}},Ln=new y({key:`room`,title:`Room`,icon:`□`,indexLabel:`CELL`}),Rn=new Fn,zn={structure:.2,walls:.1,lighting:.3},Bn=`static`,Vn=new kn,Hn=`action`,Un=.3,Wn={min:1e6,max:9999999},Gn={resonant:`≈≈≈`,plain:`~~~`,degraded:`###`},Kn=new In([{move:{id:`back`,label:`Go back`,opposite:`forward`},to:e=>e.neighbour(-1)},{move:{id:`forward`,label:`Go forward`,opposite:`back`},to:e=>e.neighbour(1)}]),qn=class extends v{#e;#t;#n;#r;#i;#a;#o=[];#s=[];constructor(e,t){super(e),this.#e=e.parent,this.#t=t.name,this.#n=t.category,this.#r=t.atmosphere,this.#i=t.traits,this.#a=Object.freeze([...t.furniture])}kind(){return Ln}name(){return this.#t}type(){return this.#n.name()}category(){return this.#n}oxygen(){return this.#i.oxygen}temperature(){return this.#i.temperature}signal(){return this.#i.signal}atmosphere(){return this.#r}furniture(){return this.#a}objects(){return[...this.#c().map(e=>this.#l(e)),...this.#s]}contents(){return{objects:this.objects(),furniture:this.furniture()}}findRelic(e){let t=this.#e.relicsIn(this.index()).find(t=>t.key()===e);return t===void 0?void 0:this.#l(t)}capture(e){let t=this.#c();if(!Number.isInteger(e)||e<0)return;if(e<t.length){let n=t[e];return n===void 0?void 0:(this.#o.push(n.key()),{fragment:this.#l(n),fresh:!0})}let[n]=this.#s.splice(e-t.length,1);return n===void 0?void 0:{fragment:n,fresh:!1}}drop(e){return this.#s.push(e),!0}remember(){if(this.#o.length!==0||this.#s.length!==0)return JSON.stringify({taken:this.#o,dropped:this.#s.map(e=>e.data())})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{taken:n,dropped:r,...i}=t;if(Object.keys(i).length>0||!Array.isArray(n))return!1;let a=n,o=new Set(this.#e.relicsIn(this.index()).map(e=>e.key()));if(!a.every(e=>typeof e==`string`&&o.has(e))||new Set(a).size!==a.length)return!1;let s=Vn.readAll(r,this.root());return s===void 0||a.length===0&&s.length===0?!1:(this.#o.splice(0,this.#o.length,...a),this.#s.splice(0,this.#s.length,...s),!0)}#c(){return this.#e.relicsIn(this.index()).filter(e=>!this.#o.includes(e.key()))}#l(e){let t=this.vibe()?.culture(),n=t!==void 0&&this.#e.culture().equals(t),r=new Nn(e.name()).frequencyAt(this.depth());return new Cn({relic:e,from:this.address(),frequency:n?r.amplified():r,resonant:n})}listing(){return[]}mapped(){return!1}lottery(e){let t=this.seed().branch(Hn).branch(e);if(t.branch(`win`).probability(Un))return new dn({from:this.address(),steps:e,frequency:new vn(t.branch(`hertz`).range(Wn.min,Wn.max))})}scan(e){return this.#e.scan(e)}scanned(e){let t=new Nn(this.#t).frequencyAt(this.depth()),n=this.#e.anomaly()?{key:`alert`,label:`WAVE`,value:Gn.degraded}:t.resonant()?{key:`stable`,label:`WAVE`,value:Gn.resonant}:{key:`signal`,label:`WAVE`,value:Gn.plain};return[{key:`reading`,label:`FREQ`,value:`${String(t.hertz())}Hz`},n,e(this)?{key:`stable`,label:`STATUS`,value:`[VISITED]`}:{key:`reading`,label:`STATUS`,value:`[UNSTABLE]`},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`IDENTIFIER`,value:this.#t}]}neighbour(e){return this.#e.children()[this.index()+e]}moves(){return Kn.offered(this)}move(e){return Kn.make(this,e)}exit(){return this.index()===0?this.#e.exit():void 0}leaveLabel(){return`Exit Apartment`}description(){let{structure:e,colour:t,walls:n,lighting:r}=this.#r,i=(e,t)=>this.#e.anomaly()?Rn.mangle(t,zn[e],this.seed().branch(Bn).branch(e)):t;return[`You are in ${i(`structure`,e)}. The walls are ${t} ${i(`walls`,n)}.`,`The space is illuminated by ${i(`lighting`,r)}.`]}facts(){return[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#e.era().key()},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`OXY`,value:`${String(this.#i.oxygen)}%`},{key:`reading`,label:`TEMP`,value:`${String(this.#i.temperature)}°C`},{key:`signal`,label:`SIGNAL`,value:this.#i.signal},this.#e.anomaly()?{key:`alert`,label:`RESONANCE`,value:`[DEGRADED]`}:{key:`stable`,label:`RESONANCE`,value:`[STABLE]`}]}status(){return`ATMOS: ${String(this.#i.oxygen)}% | TEMP: ${String(this.#i.temperature)}°C`}childrenHeading(){return``}approachVerb(){return``}},Jn=new y({key:`shard`,title:`Shard`,icon:`☠`,indexLabel:`SHARD`}),Yn=class extends qn{kind(){return Jn}leaveLabel(){return`Exit Crypt`}},Xn=new y({key:`universe`,title:`Universe`,icon:`∞`,indexLabel:`ROOT`}),Zn=class extends v{kind(){return Xn}name(){return`The Endless Universe`}description(){return[`A neural web of infinite complexity.`]}status(){return`UNIMATRIX_STABLE`}childrenHeading(){return`Primary filaments radiating from root:`}approachVerb(){return`Synchronize with`}},Qn=class{nth(e,t,n){let r=this.take(e,t,n+1).at(-1);if(r===void 0)throw RangeError(`a deal always deals`);return r}take(e,t,n){if(t.length===0)throw RangeError(`a deal needs at least one item`);let r=[];for(let i=0;r.length<n;i++){let a=[...t];for(let o=0;o<t.length&&r.length<n;o++){let t=e.branch(i).branch(o).range(0,a.length-1),n=a[t];if(n===void 0)throw RangeError(`a deal always deals`);r.push(n),a=a.filter((e,n)=>n!==t)}}return r}},$n=`Stable`,er=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.material,this.#t=e.state,this.#n=e.inscription,this.#r=e.trace,this.#i=e.told}material(){return this.#e}state(){return this.#t}inscription(){return this.#n}trace(){return this.#r}brief(){return this.#t===$n?this.#e:`${this.#e} [${this.#t.toUpperCase()}]`}narrative(){let e=`${this.#i.material} ${this.#i.state}`;return this.#n===void 0?e:`${e} ${this.#n.narrative()}`}sensed(){let e=`${this.#i.material} ${this.#i.state} ${this.#r.sentence()}`;return this.#n===void 0?e:`${e} ${this.#n.narrative()}`}description(){return this.#n===void 0?this.brief():`${this.#n.formatted()} ${this.brief()}`}},tr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}word(){return this.#e}style(){return this.#t}formatted(){return this.#t.format(this.#e)}narrative(){return this.#t.narrative(this.#e)}},nr=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.key,this.#t=e.before,this.#n=e.after,this.#r=e.lowered??!1,this.#i=e.applied}key(){return this.#e}format(e){return`${this.#t}${this.#r?e.toLowerCase():e}${this.#n}`}narrative(e){return`The word '${this.#r?e.toLowerCase():e}' is ${this.#i}.`}equals(e){return this.#e===e.#e}},rr=[new nr({key:`stamped`,before:`[`,after:`]`,applied:`stamped into the metal in block letters`}),new nr({key:`scrawled`,before:`_`,after:`_`,lowered:!0,applied:`scrawled across the surface in jagged, desperate lines`}),new nr({key:`etched`,before:`⟨`,after:`⟩`,applied:`finely etched into the frame, appearing almost as a structural glyph`}),new nr({key:`burned`,before:`!! `,after:` !!`,applied:`burned into the material with a high-intensity plasma torch`})],ir=`themes/doors`,ar=.2,or=class{#e;constructor(e){this.#e=e}of(e,t){let[n,r]=e.branch(`material`).pick(this.#e.pairs(`${ir}/materials`)),[i,a]=e.branch(`state`).pick(this.#e.pairs(`${ir}/states`));return new er({material:n,state:i,inscription:e.branch(`inscribed`).probability(ar)?this.#t(e,t):void 0,trace:t.trace(),told:{material:r,state:a}})}#t(e,t){return t.guarantee()??new tr(e.branch(`word`).pick(this.#e.list(`${ir}/inscriptions`)),e.branch(`style`).pick(rr))}},sr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}name(){return this.#t}equals(e){return this.#e===e.#e}},cr=`themes/cultures`,lr=`themes/timelines`,ur=[{key:`with`,join:(e,t)=>`${t} with ${e}`},{key:`infused`,join:(e,t)=>`${e} infused with ${t}`},{key:`fused`,join:(e,t)=>`${e} fused to ${t}`},{key:`grafted`,join:(e,t)=>`${t} grafted onto ${e}`}],dr=class{#e;#t=new Map;constructor(e){this.#e=e}of(e,t){let n=`${e.key()}|${t.key()}`,r=this.#t.get(n);return r===void 0&&(r=Object.freeze(this.#n(e,t)),this.#t.set(n,r)),r}#n(e,t){let n=this.#e.list(`${cr}/${e.key()}`),r=this.#e.list(`${lr}/${t.key()}`);return[...n.flatMap(e=>r.flatMap(t=>ur.map(n=>new sr(`${n.key}|${e}|${t}`,n.join(e,t))))),...n.map(e=>new sr(`culture|${e}`,e)),...r.map(e=>new sr(`era|${e}`,e))]}},fr=`children`,b=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t===void 0?void 0:{...t,unit:t.unit??1},this.#n=n}of(e){return this.exactly(e,this.count(e.seed()))}count(e){if(this.#t===void 0)throw Error(`this progeny has no count range: use exactly()`);return e.branch(fr).range(this.#t.min,this.#t.max)*this.#t.unit}exactly(e,t,n=0){return Array.from({length:t},(t,r)=>{let i=n+r,a=e.seed().branch(i);return this.#n(a).create({parent:e,seed:a,index:i,children:this.#e})})}},pr=.01,mr={min:1,max:10},hr={min:5,max:19},gr=`relics`,_r={kind:an,rooms:Ln,make:(e,t)=>new sn(e,t)},vr=class{#e;#t;#n;#r;#i;#a=new Qn;constructor(e,t,n,r=_r){this.#e=r,this.#t=new or(t),this.#n=n,this.#r=new b(e,mr,()=>e.factoryFor(r.rooms)),this.#i=new dr(t)}kind(){return this.#e.kind}create(e){let t=e.parent.vibe(),n=t?.mutation();if(t===void 0||n===void 0)throw Error(`an apartment takes its culture, era and trait from the country above: it needs one`);let r=e.seed.branch(`anomaly`).probability(pr),i=r?t.culture():t.pickCulture(e.seed.branch(`culture`)),a=r?t.era():t.pickEra(e.seed.branch(`era`)),o=e.seed.branch(gr),s=this.#n.categoryOf(e.seed.branch(0),n);return this.#e.make(e,{door:this.#t.of(e.seed.branch(`door`),s),behind:s,culture:i,era:a,anomaly:r,rooms:this.#r.count(e.seed),relics:this.#a.take(o,this.#i.of(i,a),o.range(hr.min,hr.max))})}populate(e){return this.#r.exactly(e,e.roomCount())}},yr=new y({key:`corridor`,title:`Corridor`,icon:`▅`,indexLabel:`CONDUIT`}),br=class extends v{#e;#t;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.sentence}kind(){return yr}name(){return`Corridor`}floor(){return this.#e}arrival(){return this.#e}scan(e){return{title:`[DATA_SUMMARY]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:void 0,current:!1,note:t.sensed()}))}}description(){return[`${this.#t}.`]}facts(){let e=this.vibe()?.culture();return e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}]}status(){return`TRAFFIC: [STABLE] | THEME: [${this.vibe()?.culture().key().toUpperCase()??`UNKNOWN`}]`}childrenHeading(){return`Local access list:`}approachVerb(){return`Access:`}},xr=new y({key:`artery`,title:`Artery`,icon:`▅`,indexLabel:`CONDUIT`}),Sr=class extends br{#e;constructor(e,t){super(e,{sentence:t.sentence}),this.#e=t.vibe}kind(){return xr}name(){return`Artery`}vibe(){return this.#e}status(){return`TRAFFIC: [PRESSURE_HIGH] | THEME: [${this.#e.culture().key().toUpperCase()}]`}},Cr=.85,wr=.1,Tr=.9,Er=class e{#e;constructor(e){this.#e={...e,stability:e.stability??Cr,mutation:e.mutation,frame:e.frame??e.culture.frame()}}culture(){return this.#e.culture}era(){return this.#e.era}secondCulture(){return this.#e.secondCulture}secondEra(){return this.#e.secondEra}stability(){return this.#e.stability}mutation(){return this.#e.mutation}frame(){return this.#e.frame}pickCulture(e){return e.probability(this.#e.stability)?this.#e.culture:this.#e.secondCulture}pickEra(e){return e.probability(this.#e.stability)?this.#e.era:this.#e.secondEra}mutate(t,n){let r=Math.max(wr,Math.min(Tr,this.#e.stability+n));return new e({...this.#e,stability:r,mutation:t})}rebel(){return new e({...this.#e,culture:this.#e.secondCulture,secondCulture:this.#e.culture,era:this.#e.secondEra,secondEra:this.#e.era})}},Dr=`A pulsing, organic artery of data`,Or=1,kr=class{#e;#t;constructor(e,t){this.#e=t,this.#t=new b(e,void 0,()=>e.factoryFor(cn))}kind(){return xr}create(e){let t=e.parent.vibe();if(t===void 0)throw Error(`an artery lies under a country: it needs its trait`);let n=this.#e.bedrock();return new Sr(e,{sentence:Dr,vibe:new Er({era:n.era,culture:n.culture,secondCulture:n.culture,secondEra:n.era,stability:Or,mutation:t.mutation()})})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Ar=new y({key:`building`,title:`Building`,icon:`⌂`,indexLabel:`STRATA`}),jr=0,Mr=2,Nr=7,Pr=10,Fr=[`elevator`,`sampled`,`merges`,`breached`],Ir=class extends v{#e;#t;#n;#r;#i=jr;#a=new Set;#o=0;#s=!1;constructor(e,t){super(e),this.#e=t.name,this.#t=t.landmark,this.#n=t.floors,this.#r=t.doorsPerFloor}kind(){return Ar}name(){return this.#e}landmark(){return this.#t}figure(){return{floors:this.#n,doors:this.#r}}floors(){return this.#n}layers(){return Pr}doorsPerFloor(){return this.#r}elevatorAt(){return this.#i}elevatorTo(e){this.#i=e}floorNumbered(e){return e>=0?e<this.#n?this.children()[e]:void 0:this.#s?this.children()[this.#n-e-1]:void 0}sampled(){return[...this.#a]}sampleFloor(e){e>=0&&e<this.#n&&this.#a.add(e)}merges(){return this.#o}infuse(){this.#o+=1}primed(){return this.#a.size>=this.#n&&this.#o>=Nr}breached(){return this.#s}keystone(){return new xn({name:`${this.#e} Keystone`,building:this.address()})}forge(e){return this.primed()&&this.#c(e)===void 0?this.keystone():void 0}prime(){for(let e=0;e<this.#n;e++)this.#a.add(e);return this.#o=Nr,!0}breachOfferedAt(e,t){return e===this.#n-1&&this.primed()&&!this.#s&&this.#c(t)!==void 0}breachFrom(e,t){if(this.breachOfferedAt(e,t))return this.#s=!0,this.#c(t)}remember(){let e={};return this.#i!==jr&&(e.elevator=this.#i),this.#a.size>0&&(e.sampled=[...this.#a]),this.#o>0&&(e.merges=this.#o),this.#s&&(e.breached=!0),Object.keys(e).length===0?void 0:JSON.stringify(e)}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=t,r=Object.keys(n);if(r.length===0||r.some(e=>!Fr.includes(e)))return!1;let{elevator:i,sampled:a,merges:o,breached:s}=n;if(s!==void 0&&s!==!0)return!1;let c=s===!0;if(i!==void 0&&!this.#l(i,c)||a!==void 0&&!this.#u(a)||o!==void 0&&(!Number.isInteger(o)||o<1))return!1;this.#i=i??jr,this.#a.clear();for(let e of a??[])this.#a.add(e);return this.#o=o??0,this.#s=c,!0}listing(){let e=this.children();return[...e.slice(0,this.#n).reverse(),...this.#s?e.slice(this.#n):[]]}admits(e){return this.floorNumbered(this.#i)===e}description(){return[`Analyzing vertical lattice structure...`]}scanAround(e,t){let n=this.listing().filter(t=>Math.abs(t.ordinal()-e)<=Mr).sort((e,t)=>t.ordinal()-e.ordinal());return{title:`NEURAL_PROXIMITY_REPORT`,notes:[`BUILDING: ${this.#e}`,`TOTAL_STRATA: ${String(this.#n)} units detected.`],rows:n.map(n=>({cells:[{key:`reading`,label:`ID`,value:String(n.ordinal()).padStart(2,`0`)},...n.scanned(t)],place:void 0,current:n.ordinal()===e,note:``}))}}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}],...this.#t?[{key:`alert`,label:`UNIQUE_LOCUS_DETECTION`,value:`MAJOR_LANDMARK_DISCOVERED`}]:[]]}status(){return this.#s?`BEDROCK_BREACHED`:this.#o>0?`INFUSION_ACTIVE: ${String(this.#o)}`:`STRUCTURAL_STABLE`}indoors(){return!0}meta(){return this.#s?` [BREACHED]`:` [FLOORS: ${String(this.#n)}]`}childrenHeading(){return`Building strata diagnostics:`}approachVerb(){return`Access:`}#c(e){let t=this.keystone().key();return e.find(e=>e.key()===t)}#l(e,t){return typeof e!=`number`||!Number.isInteger(e)||e===jr?!1:e>0?e<this.#n:t&&this.#n-e-1<this.children().length}#u(e){if(!Array.isArray(e)||e.length===0)return!1;let t=e;return t.every(e=>typeof e==`number`&&Number.isInteger(e)&&e>=0&&e<this.#n)?new Set(t).size===t.length:!1}},Lr=new In([{move:{id:`elevator`,label:`Back to Elevator`,opposite:`corridor`},to:e=>e,act:e=>{e.returnToElevator()}}]),Rr=class{id(){return`corridor`}listing(e){return e.corridor().listing()}admits(e,t){return t===e.corridor()}moves(e){return Lr.offered(e)}move(e,t){return Lr.make(e,t)}facts(e){return e.corridor().facts()}description(e){return e.corridor().description()}status(e){return e.corridor().status()}childrenHeading(e){return e.corridor().childrenHeading()}approachVerb(e){return e.corridor().approachVerb()}scan(e,t){return e.corridor().scan(t)}},zr=0,Br=new In([{move:{id:`up`,label:`Go Up`,opposite:`down`},to:e=>e.neighbour(1)},{move:{id:`down`,label:`Go Down`,opposite:`up`},to:e=>e.number()===zr?void 0:e.neighbour(-1)},{move:{id:`descend`,label:`Descend into the Substrate`,opposite:`up`},to:e=>e.number()===zr?e.neighbour(-1):void 0},{move:{id:`corridor`,label:`Enter Corridor`,opposite:`elevator`},to:e=>e,act:e=>{e.enterCorridor()}}]),Vr=2,Hr=class{id(){return`elevator`}listing(){return[]}admits(){return!1}moves(e){return Br.offered(e)}move(e,t){return Br.make(e,t)}facts(e){let t=e.vibe();return t===void 0?[]:[{key:`era`,label:`TECH_ERA`,value:t.era().key()},{key:`culture`,label:`RESONANCE`,value:t.culture().key()},{key:`reading`,label:`STABILITY`,value:`${(t.stability()*100).toFixed(Vr)}%`},{key:`trait`,label:`ATMOS_SHIFT`,value:t.mutation()?.key()??`Standard`}]}description(e){return[`${e.name()}. ${e.sentence()}`,`Local signal is STABLE. Corridor access authorized.`]}status(e){return e.diagnostic()}childrenHeading(){return``}approachVerb(){return``}scan(e,t){return e.building().scanAround(e.number(),t)}},Ur=new y({key:`floor`,title:`Floor`,icon:`▤`,indexLabel:`Z-AXIS`}),Wr=new Hr,Gr=new Rr,Kr=new Map([Wr,Gr].map(e=>[e.id(),e])),qr={min:1e3,max:2999},Jr=`100%`,Yr=class extends v{#e;#t;#n;#r;#i=Wr;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.number,this.#n=t.zone,this.#r=t.sentence}kind(){return Ur}number(){return this.#t}name(){return`Floor ${String(this.#t)}`}callSign(){return this.#t===0?`Lobby`:this.#t===this.#e.floors()-1?`Peak`:this.name()}ordinal(){return this.#t}goesByNumber(){return!0}arrive(){return this.#e.elevatorTo(this.#t),this}current(){return this.#e.elevatorAt()===this.#t}zone(){return this.#n}sentence(){return this.#r}resonance(){return this.seed().branch(`resonance`).range(qr.min,qr.max)}readings(){return[{key:`zone`,label:`FUNCTION`,value:this.#n},{key:`reading`,label:`ST`,value:Jr},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}building(){return this.#e}diagnostic(){return`SYSTEM_DIAGNOSTIC: [NOMINAL]`}peers(){return this.#e.children().slice(0,this.#e.floors())}mapNodes(){return this.corridor().listing()}corridor(){let e=this.children()[0];if(e===void 0)throw Error(`${this.name()} has no corridor`);return e}neighbour(e){return this.#e.floorNumbered(this.#t+e)}sample(){this.#e.sampleFloor(this.#t)}breachOffered(e){return this.#e.breachOfferedAt(this.#t,e)}breach(e){return this.#e.breachFrom(this.#t,e)}enterCorridor(){this.#i=Gr}returnToElevator(){this.#i=Wr}listing(){return this.#i.listing(this)}admits(e){return this.#i.admits(this,e)}moves(){return this.#i.moves(this)}move(e){return this.#i.move(this,e)}leave(){return this.returnToElevator(),this.exit()}remember(){return this.#i===Wr?void 0:this.#i.id()}recall(e){let t=Kr.get(e);return t!==void 0&&(this.#i=t,!0)}facts(){return this.#i.facts(this)}description(){return this.#i.description(this)}status(){return this.#i.status(this)}childrenHeading(){return this.#i.childrenHeading(this)}approachVerb(){return this.#i.approachVerb(this)}scan(e){return this.#i.scan(this,e)}scanned(){return[{key:`zone`,label:`FUNCTION`,value:this.#n}]}},Xr=new y({key:`layer`,title:`Layer`,icon:`▤`,indexLabel:`STRATA`}),Zr=`ABYSSAL_SUBSTRATE`,Qr=10,$r=100,ei=2,ti=class extends Yr{constructor(e,t){super(e,{number:t.number,zone:Zr,sentence:t.sentence})}kind(){return Xr}name(){return`Layer -0x${Math.abs(this.number()).toString(16).toUpperCase()}`}readings(){let e=Math.min($r,Math.abs(this.number())*Qr);return[{key:`zone`,label:`FUNCTION`,value:Zr},{key:`reading`,label:`ST`,value:`P: ${String(e)}%`},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}sealed(){return!this.building().breached()}diagnostic(){return`SYSTEM_STATUS: [ABYSS_SYNC]`}abyssal(){return!0}drainFactor(){return ei}peers(){return this.building().children().slice(this.building().floors())}},x=`names/buildings`,ni=300,ri=5,ii=50,ai=2500,oi=1500,si=4094,ci=[10,20],li=class{#e;constructor(e){this.#e=e}nameOf(e,t){let n=e.branch(`name`),r=n.branch(`rarity`).range(0,9999),i=this.landmarkChance(t.depth,t.landmarkFactor);if(r<i)return{name:n.branch(`landmark`).pick(this.#e.list(`${x}/landmarks`)),landmark:!0};let a=n.branch(`pattern`).range(0,1);return{name:r<i+oi?this.#t(n,a,t):this.#r(n,a,t.culture),landmark:!1}}landmarkChance(e,t){let n=ni+Math.max(0,e-ri)*ii;return Math.min(ai,n*t)}#t(e,t,n){if(t===0)return`Unit 0x${e.branch(`serial`).range(0,si).toString(16).toUpperCase()} ${e.branch(`size-word`).pick(this.#n(n.floors))}`;let r=e.branch(`concept`).pick(this.#e.list(`${x}/concepts`));return`The ${this.#i(e,n.culture)} of ${r}`}#n(e){let t=this.#e.index(`${x}/sizes`),n=ci.filter(t=>e>=t).length,r=t[Math.min(n,t.length-1)];if(r===void 0)throw Error(`${x}/sizes/index names no list`);return this.#e.list(`${x}/sizes/${r}`)}#r(e,t,n){if(t===0)return`${e.branch(`adjective`).pick(this.#e.list(`${x}/adj/${n.key()}`))} ${this.#i(e,n)}`;let r=e.branch(`compound`).pick(this.#e.list(`${x}/compounds`));return`${this.#i(e,n)}${r}`}#i(e,t){return e.branch(`noun`).pick(this.#e.list(`${x}/noun/${t.key()}`))}},ui={min:0,max:99},di=[{upTo:40,size:{floors:{min:3,max:10},doors:{min:2,max:6}}},{upTo:70,size:{floors:{min:10,max:25},doors:{min:4,max:10}}},{upTo:90,size:{floors:{min:30,max:50},doors:{min:8,max:16}}},{upTo:ui.max,size:{floors:{min:50,max:100},doors:{min:10,max:20}}}],fi=class{bandFor(e){let t=Number.isInteger(e)&&e>=ui.min?di.find(t=>e<=t.upTo):void 0;if(t===void 0)throw RangeError(`a size roll is a whole number from 0 to 99, not ${String(e)}`);return t.size}bandOf(e){return this.bandFor(e.branch(`size`).range(ui.min,ui.max))}floorsOf(e){let t=this.bandOf(e).floors;return e.branch(`floors`).range(t.min,t.max)}doorsPerFloorOf(e){let t=this.bandOf(e).doors;return e.branch(`doors`).range(t.min,t.max)}},pi=class{#e;#t=new fi;#n;#r;constructor(e,t){this.#e=new li(t),this.#n=new b(e,void 0,()=>e.factoryFor(Ur)),this.#r=new b(e,void 0,()=>e.factoryFor(Xr))}kind(){return Ar}create(e){let t=e.parent,n=t?.vibe()?.culture();if(t===void 0||n===void 0)throw Error(`a building is named in the culture of its street: it needs a street under a planet`);let r=this.#t.floorsOf(e.seed),i=this.#e.nameOf(e.seed,{culture:n,floors:r,depth:t.depth(),landmarkFactor:t.landmarkFactor()});return new Ir(e,{name:i.name,landmark:i.landmark,floors:r,doorsPerFloor:this.#t.doorsPerFloorOf(e.seed)})}populate(e){return[...this.#n.exactly(e,e.floors()),...this.#r.exactly(e,e.layers(),e.floors())]}},mi=new y({key:`city`,title:`City`,icon:`🏙`,indexLabel:`DISTRICT`}),hi=class extends v{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.rebelVibe}kind(){return mi}name(){return this.#e}vibe(){return this.#t??super.vibe()}description(){return[this.#t===void 0?`A stable regional node connected to the planetary lattice.`:`The air is thick with illegal data-streams and shifting static.`]}facts(){return this.#t===void 0?[]:[{key:`alert`,label:`UNAUTHORIZED_ZONE`,value:`UNAUTHORIZED_RESONANCE_DETECTED`}]}status(){return this.#t===void 0?`STABILITY: [STABLE]`:`STABILITY: [VOLATILE]`}meta(){return this.#t===void 0?``:` [UNAUTHORIZED_ZONE]`}childrenHeading(){return`Streets detected in this city:`}approachVerb(){return`Go to`}},gi=new y({key:`street`,title:`Street`,icon:`═`,indexLabel:`WAY`}),_i=class extends v{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return gi}name(){return this.#e}description(){return[`Buildings stand in pairs along both sides of the way.`]}facts(){let e=this.vibe();return e===void 0?[]:[{key:`era`,label:`Era`,value:e.era().key()},{key:`culture`,label:`Culture`,value:e.culture().key()}]}status(){return``}childrenHeading(){return`Buildings on this street:`}approachVerb(){return`Enter Building:`}startOfJourney(){return this}},vi=`name`,S=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}words(e){return this.#e.index(this.#t).map(t=>this.naming(e).branch(t).pick(this.#e.list(`${this.#t}/${t}`)))}naming(e){return e.branch(vi)}},yi=.1,bi=class{#e;#t;constructor(e,t){this.#e=new S(t,`names/city`),this.#t=new b(e,{min:3,max:15},()=>e.factoryFor(gi))}kind(){return mi}create(e){let t=e.seed.branch(`rebel`).probability(yi);return new hi(e,{name:this.#e.words(e.seed).join(``),rebelVibe:t?e.parent?.vibe()?.rebel():void 0})}populate(e){return this.#t.of(e)}},xi=`themes/descriptions`,Si=`sentence`,Ci=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}dealt(e){return e.branch(Si).pick(this.#e.list(`${xi}/${this.#t}`))}},wi=class{#e;#t;constructor(e,t){this.#e=new Ci(t,`corridor`),this.#t=new b(e,void 0,()=>e.factoryFor(an))}kind(){return yr}create(e){return new br(e,{sentence:this.#e.dealt(e.seed)})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Ti=new y({key:`country`,title:`Country`,icon:`⬚`,indexLabel:`REGION`}),Ei=class extends v{#e;#t;#n;constructor(e,t){super(e),this.#e=t.name,this.#t=t.trait,this.#n=t.vibe}kind(){return Ti}name(){return this.#e}vibe(){return this.#n??super.vibe()}description(){return[`A vast administrative region governed by the ${this.#t.key()} directive.`]}facts(){return[{key:`trait`,label:`Sector Mutation`,value:this.#t.key()}]}status(){return`TRAIT: [${this.#t.key().toUpperCase()}]`}meta(){return` [TRAIT: ${this.#t.key().toUpperCase()}]`}childrenHeading(){return`Regional cities identified:`}approachVerb(){return`Travel to`}},Di={min:-100,max:100,scale:1e3},Oi=class{#e;#t;#n;constructor(e,t,n){this.#e=new S(t,`names/country`),this.#t=n,this.#n=new b(e,{min:2,max:10},()=>e.factoryFor(mi))}kind(){return Ti}create(e){let t=e.seed.branch(`trait`).pick(this.#t.traits()),n=e.seed.branch(`stability`).range(Di.min,Di.max)/Di.scale;return new Ei(e,{name:this.#e.words(e.seed).join(` `),trait:t,vibe:e.parent?.vibe()?.mutate(t,n)})}populate(e){return this.#n.of(e)}},ki=new y({key:`filament`,title:`Cosmic filament`,icon:`»`,indexLabel:`CONDUIT`}),Ai=class extends v{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.conduitId}kind(){return ki}name(){return this.#e}description(){return[`A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${this.#t}]`]}status(){return`SYNC: [NODE_RELIABILITY_HIGH]`}childrenHeading(){return`Galactic sectors within this conduit:`}approachVerb(){return`Pulse to`}},ji=new y({key:`sector`,title:`Galactic sector`,icon:`○`,indexLabel:`SECTOR`}),Mi=class extends v{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return ji}name(){return this.#e}callSign(){return`MATTER_CLUSTER: ${this.#e}`}description(){return[`A dense cluster of celestial bodies within the neural web.`]}status(){return`GRID: [LATTICE_SYNC_OK]`}childrenHeading(){return`Solar systems within proximity:`}approachVerb(){return`Transition to System:`}},Ni={min:1e3,max:9999},Pi={min:10,max:39},Fi=100,C=0,Ii=`echo`,Li=`echo-hertz`,Ri=class{#e;#t=C;#n=!1;constructor(e){this.#e=e}signal(){return this.#t}locked(){return this.#t>=Fi}found(){return this.#n}scan(e){if(this.#n)return this.#t;let t=this.#e.seed().branch(Ii).branch(e).range(Pi.min,Pi.max);return this.#t=Math.min(Fi,this.#t+t),this.#t}fragment(){return new Tn({from:this.#e.address(),frequency:new vn(this.#e.seed().branch(Li).range(Ni.min,Ni.max))})}capture(){if(!(!this.locked()||this.#n))return this.#n=!0,this.#t=C,{fragment:this.fragment(),fresh:!0}}remember(){if(this.#n)return JSON.stringify({found:!0});if(this.#t>C)return JSON.stringify({signal:this.#t})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{signal:n,found:r,...i}=t;return Object.keys(i).length>0?!1:r===!0&&n===void 0?(this.#n=!0,this.#t=C,!0):r!==void 0||typeof n!=`number`||!Number.isInteger(n)||n<=C||n>Fi?!1:(this.#n=!1,this.#t=n,!0)}},zi=new y({key:`null-reach`,title:`Null reach`,icon:`○`,indexLabel:`VOID`}),Bi=2,Vi=class extends v{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=new Ri(this)}kind(){return zi}name(){return this.#e}callSign(){return`VOID_REACH: ${this.#e}`}echo(){return this.#t}description(){return this.#t.found()?[`A silent void. The spectral resonance has been harvested.`]:[`A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.`]}facts(){let e=this.#t.signal();return[{key:`signal`,label:`VOID_STATUS`,value:e===0?`Searching for signals...`:`SIGNAL_STRENGTH: ${String(e)}% | FREQ_DRIFT: ${String(this.#t.fragment().frequency().hertz())}Hz`}]}status(){if(this.#t.found())return`SIGNAL: [HARVESTED]`;let e=this.#t.signal();return e===0?`SIGNAL: [SCAN_REQUIRED]`:`SIGNAL: ${String(e)}%`}remember(){return this.#t.remember()}recall(e){return this.#t.recall(e)}childrenHeading(){return`Faint gravitational anomalies detected:`}approachVerb(){return`Detect faint signal:`}landmarkFactor(){return super.landmarkFactor()*Bi}},Hi=.3,Ui=class{#e;#t;constructor(e,t){this.#e=new S(t,`names/filament`),this.#t=new b(e,{min:4,max:8},t=>e.factoryFor(t.branch(`null-roll`).probability(Hi)?zi:ji))}kind(){return ki}create(e){let[t,n]=this.#e.words(e.seed),r=this.#e.naming(e.seed).branch(`number`).range(0,998),i=e.seed.branch(`conduit`).range(0,65534);return new Ai(e,{name:`${String(t)}-${String(r)}-${String(n)}`,conduitId:`0x${i.toString(16)}`})}populate(e){return this.#t.of(e)}},w=`names/floors`,Wi=5,Gi=5,Ki=class{#e;constructor(e){this.#e=e}zoneOf(e,t,n){if(t===0)return this.#t(`${w}/lobby`);if(t===n-1)return this.#t(`${w}/peak`);let r=this.#e.index(`${w}/zones`),i=r[t<Wi?0:t>n-Gi?r.length-1:1];if(i===void 0)throw Error(`${w}/zones/index names too few lists`);return e.branch(`zone`).pick(this.#e.list(`${w}/zones/${i}`))}#t(e){let[t,...n]=this.#e.list(e);if(t===void 0||n.length>0)throw Error(`${e}.txt holds exactly one word`);return t}},qi=class{#e;#t;#n;constructor(e,t){this.#e=new Ki(t),this.#t=new Ci(t,`floor`),this.#n=new b(e,void 0,()=>e.factoryFor(yr))}kind(){return Ur}create(e){let t=e.parent,n=t.vibe()?.culture().key().toUpperCase()??`UNKNOWN`;return new Yr(e,{number:e.index,zone:this.#e.zoneOf(e.seed,e.index,t.floors()),sentence:this.#t.dealt(e.seed).replace(`{culture}`,n)})}populate(e){return this.#n.exactly(e,1)}},Ji=`The air is thick with oily static and the hum of abyssal substrate.`,Yi=class{#e;constructor(e){this.#e=new b(e,void 0,()=>e.factoryFor(xr))}kind(){return Xr}create(e){return new ti(e,{number:e.parent.floors()-1-e.index,sentence:Ji})}populate(e){return this.#e.exactly(e,1)}},Xi=new y({key:`solar-system`,title:`Solar system`,icon:`☼`,indexLabel:`RADII`}),Zi=class extends v{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Xi}name(){return this.#e}description(){return[`A star holding its resonant nodes in orbit.`]}status(){return`SYNC: [RESONANT_NODES_STABLE]`}childrenHeading(){return`Orbital bodies within range:`}approachVerb(){return`Land on`}},Qi=class{#e;constructor(e){this.#e=new b(e,{min:1,max:2},()=>e.factoryFor(Xi))}kind(){return zi}create(e){return new Vi(e,{name:`Null Reach ${e.seed.branch(`name`).range(0,4094).toString(16).toUpperCase()}`})}populate(e){return this.#e.of(e)}},$i=new y({key:`planet`,title:`Planet`,icon:`⊕`,indexLabel:`ORBIT`}),ea=class extends v{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.vibe}kind(){return $i}name(){return this.#e}vibe(){return this.#t}description(){return[`A world on the surface layer of the lattice, tuned to one culture and one era.`]}facts(){return[{key:`culture`,label:`RESONANCE`,value:this.#t.culture().key()},{key:`era`,label:`TIMELINE`,value:this.#t.era().key()}]}status(){return`RESONANCE: [${this.#t.culture().key().toUpperCase()}]`}meta(){return` [SURFACE | ERA: ${this.#t.era().key().toUpperCase()}]`}childrenHeading(){return`Planetary landmasses scanned:`}approachVerb(){return`Visit`}},ta=class{#e;#t;#n;constructor(e,t,n){this.#e=new S(t,`names/planet`),this.#t=n,this.#n=new b(e,{min:2,max:8},()=>e.factoryFor(Ti))}kind(){return $i}create(e){return new ea(e,{name:this.#e.words(e.seed).join(``),vibe:this.#r(e.seed)})}populate(e){return this.#n.of(e)}#r(e){let t=e.branch(`vibe`),n=t.branch(`culture`).pick(this.#t.surfaceCultures()),r=t.branch(`era`).pick(this.#t.eras()),i=this.#t.surfaceCultures().filter(e=>!e.equals(n)),a=this.#t.eras().filter(e=>!e.equals(r));return new Er({culture:n,era:r,secondCulture:i.length===0?n:t.branch(`second-culture`).pick(i),secondEra:a.length===0?r:t.branch(`second-era`).pick(a)})}},na=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}name(){return this.#e}guarantee(){return this.#t}trace(){return this.#n}equals(e){return this.#e===e.#e}},ra={ozone:{name:`Ozone`,sentence:`A sharp smell of ozone escapes the frame, ionizing the nearby air.`},frost:{name:`Frost`,sentence:`Thin frost is forming on the magnetic hinges. Total absence of thermal signature detected.`},clicking:{name:`Clicking`,sentence:`A persistent, rhythmic clicking sound—like high-speed mechanical relays—originates from the lock housing.`},humming:{name:`Humming`,sentence:`A heavy, low-frequency thrum (60Hz) vibrates through the surrounding strata.`},stillness:{name:`Stillness`,sentence:`The air nearby is unnaturally still. Not even the standard system-hum is audible.`}},ia=class e{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}static of(t){let n=ra[t];return n===void 0?void 0:new e(t,n.name,n.sentence)}key(){return this.#e}name(){return this.#t}sentence(){return this.#n}equals(e){return this.#e===e.#e}},aa=`names/rooms`,oa=class{#e;#t=new Map;constructor(e){this.#e=e}allowedBy(e){let t=this.#t.get(e.key());return t===void 0&&(t=Object.freeze(this.#e.pairs(`${aa}/${e.key()}`).map(([e,t])=>{let n=t.indexOf(`|`);if(n<0)throw Error(`${aa}: '${e}|${t}' is not 'name|guarantee|trace'`);let r=ia.of(t.slice(n+1).trim());if(r===void 0)throw Error(`${aa}: '${e}' names no known trace`);return new na(e,this.#n(t.slice(0,n).trim()),r)})),this.#t.set(e.key(),t)),t}categoryOf(e,t){return e.branch(`category`).pick(this.allowedBy(t))}#n(e){if(e===``)return;let t=e.indexOf(` `),n=rr.find(n=>n.key()===e.slice(0,t));if(t<0||n===void 0)throw Error(`${aa}: '${e}' is not '<style> <WORD>' with a known style`);return new tr(e.slice(t+1),n)}},sa=`themes/atmosphere`,ca=`themes/cultures`,la=`themes/timelines`,ua=`themes/colours`,da=`glitch`,fa=.05,pa=.5,ma=[`abyssal`,`Singularity`],ha=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t){let n=e.branch(da),r=t.anomaly||n.probability(fa),i=e=>r&&n.branch(e).probability(pa),a=this.#e.index(ca),o=this.#e.index(la),s=i(`walls`)?n.branch(`walls`).pick(a):t.culture.key(),c=i(`lighting`)?n.branch(`lighting`).pick(o):t.era.key(),l=i(`structure`)?n.branch(`structure`).pick(ma):t.trait.key();return{structure:e.branch(`structure`).pick(this.#n(`structures`,l,`${sa}/structures`)),colour:e.branch(`colour`).pick(this.#e.list(ua)),walls:e.branch(`walls`).pick(this.#n(`walls`,s,ca)),lighting:e.branch(`lighting`).pick(this.#n(`lighting`,c,`${sa}/lighting`))}}#n(e,t,n){let r=`${sa}/${e}/${t}`;if(this.#e.has(r))return this.#e.list(r);let i=this.#e.index(n)[0]??``;return this.#t.warn(`[THEME_WARN] no ${e} file for '${t}' — falling back to '${i}' (${r}.txt)`),this.#e.list(`${sa}/${e}/${i}`)}},ga=`themes/conditions`,_a=`themes/cultures`,va=`pieces`,ya=`condition`,ba=class{#e;#t=new Qn;constructor(e){this.#e=e}of(e,t,n){let r=this.#e.list(ga),i=this.#e.list(`${_a}/${t.key()}`);return this.#t.take(e.branch(va),i,Math.min(n,i.length)).map((t,n)=>{let i=e.branch(ya).branch(n).range(0,r.length-1);return t.startsWith(`${r[i]??``} `)&&(i=(i+1)%r.length),`${r[i]??``} ${t}`})}},xa=`names/buildings/adj`,Sa={min:12,max:21},Ca={min:5,max:25},wa=[`[SHIELDED]`,`[CLEAR]`],Ta={min:1,max:3},Ea={kind:Ln,make:(e,t)=>new qn(e,t)},Da=class{#e;#t;#n;#r;#i;#a=new Qn;constructor(e,t,n,r=Ea){this.#e=r,this.#t=e,this.#n=t,this.#r=new ha(e,n),this.#i=new ba(e)}kind(){return this.#e.kind}create(e){let t=e.parent,n=t.vibe()?.mutation();if(n===void 0)throw Error(`a room takes its category from the country above: it needs one`);let r=this.#n.categoryOf(e.seed,n),i=this.#a.nth(t.seed().branch(`adjectives`),this.#t.list(`${xa}/${t.culture().key()}`),e.index);return this.#e.make(e,{name:`${i} ${r.name()}`,category:r,atmosphere:this.#r.of(e.seed,{culture:t.culture(),era:t.era(),trait:n,anomaly:t.anomaly()}),traits:{oxygen:e.seed.branch(`oxygen`).range(Sa.min,Sa.max),temperature:e.seed.branch(`temperature`).range(Ca.min,Ca.max),signal:e.seed.branch(`signal`).pick(wa)},furniture:this.#i.of(e.seed.branch(`furniture`),t.culture(),e.seed.branch(`furniture`).range(Ta.min,Ta.max))})}populate(){return[]}},Oa=class{#e;#t;constructor(e,t){this.#e=new S(t,`names/sector`),this.#t=new b(e,{min:3,max:7},()=>e.factoryFor(Xi))}kind(){return ji}create(e){let t=this.#e.naming(e.seed).branch(`number`).range(0,98);return new Mi(e,{name:`${this.#e.words(e.seed).join(` `)} ${String(t)}`})}populate(e){return this.#t.of(e)}},ka=class{#e;#t;constructor(e,t){this.#e=new S(t,`names/solar-system`),this.#t=new b(e,{min:2,max:10},()=>e.factoryFor($i))}kind(){return Xi}create(e){return new Zi(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Aa=class{#e;#t;constructor(e,t){this.#e=new S(t,`names/street`),this.#t=new b(e,{min:2,max:10,unit:2},()=>e.factoryFor(Ar))}kind(){return gi}create(e){return new _i(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},ja=class{#e;constructor(e){this.#e=new b(e,{min:3,max:7},()=>e.factoryFor(ki))}kind(){return Xn}create(e){return new Zn(e)}populate(e){return this.#e.of(e)}},Ma=class{#e;constructor(e,t,n){let r=new oa(e),i=[new ja(this),new Ui(this,e),new Oa(this,e),new Qi(this),new ka(this,e),new ta(this,e,t),new Oi(this,e,t),new bi(this,e),new Aa(this,e),new pi(this,e),new qi(this,e),new wi(this,e),new vr(this,e,r),new Da(e,r,n),new Yi(this),new kr(this,t),new vr(this,e,r,{kind:cn,rooms:Jn,make:(e,t)=>new ln(e,t)}),new Da(e,r,n,{kind:Jn,make:(e,t)=>new Yn(e,t)})];this.#e=new Map(i.map(e=>[e.kind().key(),e]))}universe(e){return this.factoryFor(Xn).create({parent:void 0,seed:e,index:0,children:this})}kinds(){return[...this.#e.values()].map(e=>e.kind())}factoryFor(e){let t=this.#e.get(e.key());if(t===void 0)throw Error(`no factory is registered for the kind '${e.key()}'`);return t}childrenOf(e){return this.factoryFor(e.kind()).populate(e)}},Na=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}frame(){return this.#t}equals(e){return this.#e===e.#e}},Pa=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Fa=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Ia=`themes/planet-frames`,La=`themes/timelines`,Ra=`themes/cultures`,za=`themes/traits`,T={culture:`abyssal`,era:`atomic`},Ba=class{#e;#t;#n;#r;constructor(e){this.#e=e}surfaceCultures(){return this.#t??=Object.freeze(this.#e.pairs(Ia).map(([e,t])=>new Na(e,t))),this.#t}bedrock(){if(!this.#e.index(Ra).includes(T.culture))throw Error(`${Ra}/index names no '${T.culture}' culture`);let e=this.eras().find(e=>e.key()===T.era);if(e===void 0)throw Error(`${La}/index names no '${T.era}' era`);return{culture:new Na(T.culture,T.culture),era:e}}eras(){return this.#n??=Object.freeze(this.#e.index(La).map(e=>new Pa(e))),this.#n}traits(){return this.#r??=Object.freeze(this.#e.list(za).map(e=>new Fa(e))),this.#r}},Va=/^([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})$/i,Ha=2**53,E=`#`,Ua=`${E}range`,Wa=`${E}pick`,Ga=`${E}probability`,Ka=class e{#e;#t;constructor(e,t){this.#e=e>>>0,this.#t=t>>>0}static parse(t){let n=Va.exec(t.trim());if(n===null)return;let r=n.slice(1).join(``);return new e(Number.parseInt(r.slice(0,8),16),Number.parseInt(r.slice(8),16))}branch(e){if(typeof e==`number`){if(!Number.isSafeInteger(e))throw RangeError(`a number key is a whole number, got ${String(e)}`);return this.#n(`${E}n:${String(e)}`)}if(e.startsWith(E))throw RangeError(`keys starting with '${E}' are reserved for Seed itself, got '${e}'`);return this.#n(e)}#n(t){let n=(this.#e^2654435769)>>>0,r=(this.#t^2135587861)>>>0;n=Math.imul(n^r>>>15,2246822507),r=Math.imul(r^n>>>13,3266489909);for(let e=0;e<t.length;e++){let i=t.charCodeAt(e);n=Math.imul(n^i,2654435761),r=Math.imul(r^i,1597334677),n=n<<13|n>>>19,r=r<<17|r>>>15}return n^=t.length,n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,668265263)^r>>>15,new e(n,r)}range(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||t<e)throw RangeError(`range needs whole numbers with min <= max, got ${String(e)}..${String(t)}`);return e+Math.floor(this.#n(Ua).#r()*(t-e+1))}pick(e){let t=e[Math.floor(this.#n(Wa).#r()*e.length)];if(t===void 0)throw RangeError(`pick needs a list with at least one item`);return t}probability(e){if(!(e>=0&&e<=1))throw RangeError(`probability needs a chance in [0, 1], got ${String(e)}`);return this.#n(Ga).#r()<e}equals(e){return this.#e===e.#e&&this.#t===e.#t}toString(){let e=(this.#e.toString(16).padStart(8,`0`)+this.#t.toString(16).padStart(8,`0`)).toUpperCase();return`${e.slice(0,4)}-${e.slice(4,8)}-${e.slice(8,12)}-${e.slice(12)}`}#r(){return(this.#e*2097152+(this.#t>>>11))/Ha}},D=100,O=0,qa=[{key:`stable`,from:70},{key:`degraded`,from:30},{key:`critical`,from:O}],Ja=40,Ya=2,k=class e{#e;static range(){return{min:O,max:D}}static edges(){let e=new Set([D,1]);for(let t of[...qa.map(e=>e.from),Ja])t<=O||(e.add(t),e.add(t-1));return[...e].sort((e,t)=>t-e)}constructor(e=D){if(!Number.isInteger(e)||e<O||e>D)throw RangeError(`coherence is a whole number from ${String(O)} to ${String(D)}, got ${String(e)}`);this.#e=e}value(){return this.#e}drained(t){return new e(Math.max(O,this.#e-t))}restored(t){return new e(Math.min(D,this.#e+t))}exhausted(){return this.#e===O}band(){return qa.find(e=>this.#e>=e.from)?.key??`critical`}corrupting(){return this.#e<Ja}decay(){let e=qa[0]?.from??D;return Math.min(1,Math.max(0,(e-this.#e)/(e-O)))}glitchMarks(){let e=qa.at(-2)?.from??O;return Math.max(0,Math.floor((e-this.#e)/Ya))}equals(e){return this.#e===e.#e}},Xa=6,Za=class e{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e){this.#e=e.seed,this.#t=e.address,this.#n=new Map(e.states??[]),this.#r=e.coherence??new k().value(),this.#i=e.steps??0,this.#a=[...e.visited??[]],this.#o=[...e.buffer??[]],this.#s=e.resonant??0}static parse(t){if(t===void 0)return;let n;try{n=JSON.parse(t)}catch{return}if(typeof n!=`object`||!n)return;let{version:r,seed:i,path:a,states:o,coherence:s,steps:c,visited:l,buffer:u,resonant:d}=n;if(r!==Xa||typeof i!=`string`)return;let f=Ka.parse(i),p=e.#l(o),m=e.#u(l),h=e.#c(u);if(f===void 0||p===void 0||m===void 0||h===void 0||!e.#d(s)||!e.#f(c)||!e.#f(d))return;let g=typeof a==`string`?_.parse(a):void 0;if(a!==null&&g===void 0)return;let ee=new k().value();if(g!==void 0||s===ee&&c===0&&m.length===0&&p.size===0&&h.length===0&&d===0)return new e({seed:f,address:g,states:p,coherence:s,steps:c,visited:m,buffer:h,resonant:d})}static#c(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`object`||!n||Array.isArray(n))return;let e=n;if(typeof e.kind!=`string`)return;t.push(e)}return t}static#l(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=Object.entries(e),n=new Map;for(let[e,r]of t){if(_.parse(e)===void 0||typeof r!=`string`)return;n.set(e,r)}return n}static#u(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`string`||_.parse(n)===void 0)return;t.push(n)}return new Set(t).size===t.length?t:void 0}static#d(e){if(typeof e!=`number`)return!1;try{return new k(e),!0}catch{return!1}}static#f(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}seed(){return this.#e}address(){return this.#t}states(){return this.#n}coherence(){return this.#r}steps(){return this.#i}visited(){return this.#a}buffer(){return this.#o}resonant(){return this.#s}toText(){return JSON.stringify({version:Xa,seed:this.#e.toString(),path:this.#t?.toString()??null,states:Object.fromEntries(this.#n),coherence:this.#r,steps:this.#i,visited:this.#a,buffer:this.#o,resonant:this.#s})}};function A(e,t,n){return{id:e,key:t,label:n,place:``,role:`system`,sealed:!1,landmark:!1,ordinal:``,readings:[],opposite:``,current:!1,visited:!1,address:``,figure:null}}var Qa=`buffer`,$a=`pick:`,eo=`drop:`,to=`close`,no=Array.from({length:9},(e,t)=>String(t+1)),ro=class{#e;#t;constructor(e){this.#e=e}summary(){return{id:Qa,outcome:``,figures:{selected:this.#t===void 0?``:String(this.#t)}}}options(){let e=this.#e.player().buffer().fragments(),t=this.#e.here()?.contents()!==null,n=e=>this.#t===void 0?`Select`:this.#t===e?`Unselect`:`Merge`;return[...e.flatMap((e,r)=>{let i=String(r+1),a={...A(`${$a}${String(r)}`,no[r]??``,n(r)),role:`pick`,ordinal:i},o={...A(`${eo}${String(r)}`,``,`Drop here`),role:`drop`,ordinal:i};return t?[a,o]:[a]}),{...A(to,`b`,`Back to reality`),role:`return`}]}answer(e){if(!this.options().some(t=>t.id===e))return;if(e===to)return{message:``,done:!0};if(e.startsWith($a))return{message:this.#n(Number(e.slice(5))),done:!1};let t=this.#e.drop(Number(e.slice(5)));return this.#t=void 0,{message:t===void 0?``:`Dropped ${t.name()} here.`,done:!1}}#n(e){let t=this.#t;if(t===void 0)return this.#t=e,``;if(this.#t=void 0,t===e)return``;let n=this.#e.merge(t,e);if(n===void 0)return``;let{fragment:r}=n;if(n.forged)return`Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: ${r.name()}. Coherence +15.`;let i=r.resonant()?` Resonance detected.`:``;return`Synthesis complete: ${r.name()} (${String(r.frequency().hertz())} Hz). Coherence +15.${i}`}},io=`corrupt`,ao=.1,oo=class{#e=new Fn;read(e,t,n){if(!t.corrupting())return e;let r=n.branch(io);return e.map((e,t)=>this.#e.mangle(e,ao,r.branch(t)))}},so=1,co=new Map([[`entropic`,2]]),lo=class{cost(e){let t=e.drainEra()?.key()??``;return so*(co.get(t)??1)*e.drainFactor()}},uo=`frame`,fo=class{of(e,t){return e.seed().branch(uo).branch(t)}},po=`help`,mo=`close`,ho=class{summary(){return{id:po,outcome:``,figures:{}}}options(){return[{...A(mo,`b`,`Back to the world`),role:`return`}]}answer(e){return e===mo?{message:``,done:!0}:void 0}},go=16,_o=class{#e;constructor(e=[]){if(e.length>go)throw RangeError(`the buffer holds ${String(go)} fragments, not ${String(e.length)}`);this.#e=[...e]}fragments(){return this.#e}size(){return this.#e.length}capacity(){return go}full(){return this.#e.length>=go}add(e){return!this.full()&&(this.#e.push(e),!0)}take(e){if(!Number.isInteger(e)||e<0||e>=this.#e.length)return;let[t]=this.#e.splice(e,1);return t}merge(e,t,n){if(e===t)return;let r=this.#e[e],i=this.#e[t];if(r===void 0||i===void 0)return;let a=n===void 0?new hn(r,i):n(r,i);return this.#e.splice(Math.max(e,t),1),this.#e.splice(Math.min(e,t),1),this.#e.push(a),a}remove(e){let t=this.#e.indexOf(e);return t<0?!1:(this.#e.splice(t,1),!0)}},vo=15,yo=class{#e;#t;#n;#r;#i;#a;constructor(e={coherence:new k().value(),steps:0,visited:[],buffer:[],resonant:0}){this.#e=new k(e.coherence),this.#t=e.steps,this.#n=[...e.visited],this.#r=new Set(this.#n),this.#i=new _o(e.buffer),this.#a=e.resonant}buffer(){return this.#i}resonantTraces(){return this.#a}capture(e){return this.#i.add(e.fragment)?(e.fresh&&e.fragment.resonant()&&(this.#a+=1),!0):!1}merge(e,t,n){let r=this.#i.merge(e,t,n===void 0?void 0:()=>n);if(r!==void 0)return this.restore(vo),r.resonant()&&(this.#a+=1),r}discard(e){return this.#i.remove(e)}drop(e){return this.#i.take(e)}coherence(){return this.#e}steps(){return this.#t}drain(e){this.#e=this.#e.drained(e)}restore(e){this.#e=this.#e.restored(e)}setCoherence(e){this.#e=new k(e)}count(){this.#t+=1}markFootprint(e){for(let t of e.trail()){let e=t.address().toString();this.#r.has(e)||(this.#r.add(e),this.#n.push(e))}}visited(e){return this.#r.has(e.address().toString())}footprints(){return this.#n}placesVisited(){return this.#n.length}reboot(){this.#e=new k}},bo=new kn,xo=class{#e;#t;#n;#r;#i;#a=new yo;constructor(e){this.#e=e}world(){return this.#t}universe(){return this.#n}here(){return this.#r}player(){return this.#a}resumes(){return this.#i!==void 0}begin(e){this.#t=e,this.#n=this.#e.universe(e),this.#r=void 0,this.#i=void 0,this.#a=new yo}enter(){return this.#n!==void 0&&(this.#o(this.#i??this.#n.startOfJourney()),this.#i=void 0,!0)}descend(e){let t=this.#r?.listing()[e];return t===void 0||t.sealed()?!1:(this.#o(t.arrive()),!0)}move(e){let t=this.#r?.move(e);return t!==void 0&&(this.#o(t.arrive()),!0)}leave(){if(this.#r?.exit()===void 0)return!1;let e=this.#r.leave();return e!==void 0&&(this.#o(e),!0)}toTitle(){return this.#r!==void 0&&(this.#i=this.#r,this.#r=void 0,!0)}capture(e){if(this.#r===void 0||this.#a.buffer().full())return;let t=this.#r.capture(e);if(t!==void 0)return this.#a.capture(t),this.#r.sample(),t.fragment}lottery(){if(this.#r===void 0||this.#a.buffer().full())return;let e=this.#r.lottery(this.#a.steps());if(e!==void 0)return this.#a.capture({fragment:e,fresh:!0}),this.#r.sample(),e}echo(){let e=this.#r?.echo();if(!(e===void 0||e.found()))return e.scan(this.#a.steps())}captureEcho(){if(this.#a.buffer().full())return;let e=this.#r?.echo()?.capture();if(e!==void 0)return this.#a.capture(e),e.fragment}drop(e){if(this.#r?.contents()===null||this.#r===void 0)return;let t=this.#a.buffer().fragments()[e];if(t!==void 0&&this.#r.drop(t))return this.#a.drop(e)}merge(e,t){let n=this.#r?.forge(this.#a.buffer().fragments()),r=this.#a.merge(e,t,n);if(r!==void 0)return this.#r?.infuse(),{fragment:r,forged:n!==void 0}}breachOffered(){return this.#r?.breachOffered(this.#a.buffer().fragments())??!1}breach(){let e=this.#r?.breach(this.#a.buffer().fragments());if(e!==void 0)return this.#a.discard(e),e}prime(){return this.#r?.prime()??!1}spawnKeystone(){let e=this.#r?.keystone();if(!(e===void 0||this.#a.buffer().full()))return this.#a.capture({fragment:e,fresh:!1}),e}reboot(){return this.#t!==void 0&&(this.#n=this.#e.universe(this.#t),this.#i=void 0,this.#a.reboot(),this.#o(this.#n.startOfJourney()),!0)}saved(){if(this.#t===void 0)return;let e=this.#r??this.#i;return new Za({seed:this.#t,address:e?.address(),states:this.#s(this.#a.footprints()),coherence:this.#a.coherence().value(),steps:this.#a.steps(),visited:this.#a.footprints(),buffer:this.#a.buffer().fragments().map(e=>e.data()),resonant:this.#a.resonantTraces()})}restore(e){let t=this.#e.universe(e.seed()),n=new Set;for(let t of e.visited()){let e=_.parse(t);if(e===void 0)return!1;let r=e.parent();if(r!==void 0&&!n.has(r.toString()))return!1;n.add(t)}for(let[r,i]of e.states()){let e=_.parse(r),a=e===void 0||!n.has(r)?void 0:t.descendant(e);if(a===void 0||!a.recall(i)||a.remember()!==i)return!1}for(let n of e.visited()){let e=_.parse(n);if(e===void 0||t.locate(e)===void 0)return!1}let r=e.address(),i=r===void 0?void 0:t.descendant(r);if(r!==void 0&&(i===void 0||i.arrival()!==i))return!1;let a=i?.trail()??[];if(a.some(e=>!n.has(e.address().toString())))return!1;for(let[e,t]of a.entries()){let n=a[e+1];if(n!==void 0&&!t.admits(n))return!1}let o=bo.readAll(e.buffer(),t);return o===void 0||o.length>this.#a.buffer().capacity()?!1:(this.#t=e.seed(),this.#n=t,this.#r=i,this.#i=void 0,this.#a=new yo({coherence:e.coherence(),steps:e.steps(),visited:e.visited(),buffer:o,resonant:e.resonant()}),!0)}#o(e){this.#r=e,this.#a.markFootprint(e)}#s(e){let t=new Map;for(let n of e){let e=_.parse(n),r=e===void 0?void 0:this.#n?.descendant(e)?.remember();r!==void 0&&t.set(n,r)}return t}},So=30,Co=15,wo=10,To=`marks`,Eo=`static`,Do=.08,Oo=[`?`,`!`,`░`,`▒`,`▓`,`X`,`#`],ko=class{of(e,t,n,r){if(!e.mapped())return null;let i=new Set,a=(e,t)=>`${String(e)},${String(t)}`,o=r.branch(Eo),s=e.mapNodes().map((n,r)=>{let{x:s,y:c}=n.mapSpot(So,Co);for(let e=0;i.has(a(s,c))&&e<wo;e++)s=(s+1)%So,s===0&&(c=(c+1)%Co);i.add(a(s,c));let l=o.branch(r),u=e.abyssal()&&l.probability(Do);return{x:s,y:c,glyph:u?l.branch(`glyph`).pick(Oo):n.mapGlyph(),name:n.name(),visited:t(n),noise:u}}),c=r.branch(To);return{width:So,height:Co,origin:{name:e.name(),glyph:e.mapGlyph()},frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),nodes:s,marks:Array.from({length:n.glitchMarks()},(e,t)=>({x:c.branch(t).branch(`x`).range(0,29),y:c.branch(t).branch(`y`).range(0,14)}))}}},Ao=`reboot`,jo=class{#e;constructor(e){this.#e=e}summary(){return{id:Ao,outcome:`rebooting`,figures:{}}}options(){return[A(Ao,``,`Rebuild`)]}answer(e){if(e===`reboot`)return this.#e.reboot(),{message:`Substrate rebuilt. Coherence ${String(this.#e.player().coherence().value())}.`,done:!0}}},Mo=20,No=[{id:`void`,reached:e=>e.here.abyssal()},{id:`expedition`,reached:e=>e.places>=Mo},{id:`severed`,reached:()=>!0}],Po=class{of(e){return No.find(t=>t.reached(e))?.id??``}},Fo=`recap`,Io=`resume`,Lo=`end-session`,Ro=class{#e;#t=new Po;constructor(e){this.#e=e}summary(){let e=this.#e.here(),t=this.#e.player();return{id:Fo,outcome:e===void 0?``:this.#t.of({here:e,places:t.placesVisited()}),figures:{locus:e?.address().toString()??``,steps:String(t.steps()),places:String(t.placesVisited()),buffer:String(t.buffer().size()),resonant:String(t.resonantTraces())}}}options(){return[A(Io,`b`,`Resume`),A(Lo,`q`,`End session`)]}answer(e){if(e===Io)return{message:``,done:!0};if(e===Lo)return this.#e.toTitle(),{message:``,done:!0}}},zo=`spectrogram`,Bo=5,Vo=9,Ho=`void`,Uo=.3,Wo=[`It is cold down here.`,`We see you.`,`Return to the surface.`,`Bedrock approaching.`],Go=class{of(e,t){if(!e.indoors())return null;let n=t.branch(zo),r=t.branch(Ho);return{spectrogram:Array.from({length:Bo},(e,t)=>n.branch(t).range(1,Vo)),voice:e.abyssal()&&r.probability(Uo)?r.branch(`words`).pick(Wo):null}}},Ko=class{#e;#t;constructor(e){this.#e=e.drains,this.#t=e.counts}drains(){return this.#e}counts(){return this.#t}},j=new Ko({drains:!1,counts:!1}),M=new Ko({drains:!0,counts:!1}),N=new Ko({drains:!0,counts:!0}),qo=`enter:`,Jo=`move:`,Yo=`capture:`,Xo=`scan`,Zo=`map`,Qo=`trace`,$o=`echo`,es=`capture-echo`,ts=`breach`,ns=`debug:integrity:`,rs=`debug:prime`,is=`debug:keystone`,as=100,os={up:`u`,down:`d`,descend:`d`,corridor:`c`,elevator:`b`,back:`b`,forward:`f`},ss=`j`,cs=`e`,ls=`c`,us=`m`,ds=`h`,fs=Array.from({length:9},(e,t)=>String(t+1)),ps=Array.from({length:26},(e,t)=>String.fromCharCode(97+t)),ms=class{#e;#t;#n;#r;#i;#a;#o=new lo;#s=new fo;#c=new Go;#l=new ko;#u=new oo;#d;#f=``;#p=null;#m=null;#h=null;constructor(e){this.#e=new xo(e.world),this.#t=e.entropy,this.#n=e.saves,this.#r=e.debug??!1,this.#i=[{keys:[`n`],turn:j,options:()=>this.#v()&&!this.#y()?[A(`new-world`,`n`,`New world`)]:[],run:()=>this.#x()},{keys:[`e`],turn:j,options:()=>this.#v()&&this.#y()?[A(`enter-world`,`e`,this.#e.resumes()?`Continue`:`Enter world`)]:[],run:()=>this.#b(this.#e.enter(),`Entered ${this.#e.here()?.name()??``}.`)},{keys:[`r`],turn:j,options:()=>this.#v()&&this.#y()?[A(`reroll`,`r`,`Re-roll`)]:[],run:()=>this.#x()},{keys:[],turn:N,options:()=>this.#C(),run:e=>{let t=this.#e.player(),n=t.resonantTraces(),r=this.#e.capture(Number(e.slice(8)));if(r===void 0)return this.#f;let i=t.resonantTraces()>n?` Harmonic resonance: +10%.`:``;return`Captured ${r.name()}. Frequency: ${String(r.frequency().hertz())} Hz.${i}`}},{keys:[],turn:N,options:()=>this.#S(),run:e=>{let t=this.#e.descend(Number(e.slice(6)));return this.#b(t,`Entered ${this.#e.here()?.name()??``}.`)}},{keys:[...new Set(Object.values(os))],turn:N,options:()=>this.#T(),run:e=>{let t=e.slice(5),n=this.#e.here(),r=n?.moves().find(e=>e.id===t)?.label??``,i=this.#e.move(t),a=this.#e.here();return this.#b(i,a===n?`${r}.`:`Entered ${a?.name()??``}.`)}},{keys:[`l`],turn:N,options:()=>{let e=this.#e.here();return e?.exit()===void 0?[]:[{...A(`leave`,`l`,e.leaveLabel()),role:`return`}]},run:()=>this.#b(this.#e.leave(),`Returned to ${this.#e.here()?.name()??``}.`)},{keys:[ss],turn:N,options:()=>this.#e.breachOffered()?[{...A(ts,ss,`Breach the Bedrock`),role:`move`}]:[],run:()=>this.#e.breach()===void 0?this.#f:`HARMONIC_INVERSION_PROTOCOL_ENGAGED — breaching the bedrock substrate. Lattice weight normalized: aperture opening at root. The Keystone is spent.`},{keys:[cs],turn:N,options:()=>this.#w(),run:e=>{if(e===$o){let e=this.#e.echo();return e===void 0?this.#f:e>=as?`HARMONIC_LOCK_ESTABLISHED: Spectral Echo isolated. Signal 100%.`:`SCANNING_VOID: Signal strength increasing... ${String(e)}%.`}let t=this.#e.captureEcho();return t===void 0?this.#f:`VOID_RESONANCE: Echo captured and stabilized. Frequency: ${String(t.frequency().hertz())} Hz.`}},{keys:[`s`],turn:M,options:()=>this.#v()?[]:[A(Xo,`s`,`Scan`)],run:()=>{let e=this.#e.here(),t=this.#e.player(),n=e?.scan(e=>t.visited(e));return n===void 0?`No scan-compatible structure detected in this strata.`:(this.#p={title:n.title,notes:n.notes,rows:n.rows.map(e=>({cells:e.cells,current:e.current,note:e.note}))},`LOCAL_LATTICE_SCAN_INITIATED [LOCUS: ${e?.address().toString()??``}]. SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.`)}},{keys:[us],turn:M,options:()=>this.#v()?[]:[A(Zo,us,`Map`)],run:()=>{let e=this.#e.here(),t=e===void 0?null:this.#D(e,this.#e.player());return t===null?`SCAN_ERROR: Current location does not support spatial projection.`:(this.#m=t,`NEURAL_LATTICE_PROJECTION: ${String(t.nodes.length)} nodes plotted from ${t.origin.name}.`)}},{keys:[`i`],turn:M,options:()=>this.#v()?[]:[A(Qa,`i`,`Buffer`)],run:()=>(this.#d=new ro(this.#e),``)},{keys:[],turn:M,options:()=>this.#v()?[]:[A(Qo,``,`Trace`)],run:()=>{let e=this.#e.here()?.trail()??[];return this.#h={steps:e.map((t,n)=>({depth:n,icon:t.kind().icon(),kind:t.kind().title(),name:t.name(),meta:t.meta(),current:n===e.length-1,abyssal:t.abyssal()}))},`NEURAL_LATTICE_TRACE_INITIATED: ${String(e.length)} levels from the universe.`}},{keys:[ds],turn:M,options:()=>this.#v()?[]:[A(po,ds,`Help`)],run:()=>(this.#d=new ho,``)},{keys:[`t`],turn:M,options:()=>this.#v()?[]:[A(`to-title`,`t`,`Title screen`)],run:()=>this.#b(this.#e.toTitle(),``)},{keys:[`q`],turn:M,options:()=>this.#v()?[]:[A(Fo,`q`,`End session`)],run:()=>(this.#d=new Ro(this.#e),``)},{keys:[],turn:j,options:()=>this.#r&&!this.#v()?k.edges().map(e=>({...A(`${ns}${String(e)}`,``,`Integrity ${String(e)}`),role:`debug`})):[],run:e=>{let t=Number(e.slice(16));return this.#e.player().setCoherence(t),`Integrity set to ${String(t)}%.`}},{keys:[],turn:j,options:()=>this.#r&&this.#e.here()?.indoors()===!0?[{...A(rs,``,`Prime building`),role:`debug`},{...A(is,``,`Spawn Keystone`),role:`debug`}]:[],run:e=>{if(e===rs)return this.#e.prime()?`Building primed: every floor sampled, seven merges in.`:this.#f;let t=this.#e.spawnKeystone();return t===void 0?this.#f:`${t.name()} generated in the trace buffer.`}}];let t=new Set([...this.#i.flatMap(e=>e.keys),`v`]);this.#a=[...fs,...ps.filter(e=>!t.has(e))],this.#g()}step(e){this.#p=null,this.#m=null,this.#h=null;let t=this.#d;if(t!==void 0){let n=t.answer(e);return n!==void 0&&(n.done&&(this.#d=void 0),this.#f=n.message,this.#_()),this.snapshot()}let n=this.#i.find(t=>t.options().some(t=>t.id===e&&!t.sealed));if(n===void 0)return this.snapshot();let r=this.#e.here(),i=this.#e.player();if(r!==void 0&&n.turn.drains()&&(i.drain(this.#o.cost(r)),i.coherence().exhausted()))return this.#d=new jo(this.#e),this.#f=``,this.#_(),this.snapshot();if(this.#f=n.run(e),n.turn.counts()){i.count();let e=this.#e.lottery();e!==void 0&&(this.#f=`${this.#f} SPECTRAL_DEVIATION: Extracted Frequency ${String(e.frequency().hertz())} Hz.`)}return this.#_(),this.snapshot()}snapshot(){let e=this.#e.world(),t=this.#e.here(),n=this.#e.player();return{world:e===void 0?null:{seed:e.toString(),name:this.#e.universe()?.name()??``},place:t===void 0?null:this.#E(t,n),player:t===void 0?null:{coherence:n.coherence().value(),band:n.coherence().band(),steps:n.steps()},buffer:t===void 0?null:this.#O(n),prompt:this.#d?.summary()??null,options:this.#d?.options()??this.#i.flatMap(e=>e.options()),message:this.#f,scan:this.#p,map:this.#m,trace:this.#h}}#g(){let e=Za.parse(this.#n.load());if(e===void 0||!this.#e.restore(e))return;let t=this.#e.here(),n=t===void 0?``:` at ${t.name()}`;this.#f=`Restored world ${e.seed().toString()}${n}.`,this.#e.player().coherence().exhausted()&&(this.#d=new jo(this.#e))}#_(){let e=this.#e.saved();e!==void 0&&this.#n.save(e.toText())}#v(){return this.#e.here()===void 0}#y(){return this.#e.world()!==void 0}#b(e,t){return e?t:this.#f}#x(){let e=this.#t.draw();return this.#e.begin(e),`World ${e.toString()} drawn.`}#S(){let e=this.#e.here();if(e===void 0)return[];let t=this.#e.player(),n=0,r=e=>{if(e.sealed())return``;if(!e.goesByNumber())return this.#a[n++]??``;let t=String(e.ordinal());return t.length===1?t:``};return e.listing().map((n,i)=>({id:`${qo}${String(i)}`,key:r(n),label:`${e.approachVerb()} ${n.callSign()}`,place:n.name(),role:`travel`,sealed:n.sealed(),landmark:n.landmark(),ordinal:String(n.ordinal()),readings:n.readings(),opposite:``,current:n.current(),visited:t.visited(n),address:n.address().toString(),figure:n.figure()}))}#C(){let e=this.#e.here()?.contents();if(e==null)return[];let t=this.#e.player().buffer().full();return e.objects.map((e,n)=>({...A(`${Yo}${String(n)}`,t?``:fs[n]??``,`Take ${e.name()}`),place:e.name(),role:`take`,sealed:t,ordinal:String(n+1)}))}#w(){let e=this.#e.here()?.echo();if(e===void 0||e.found())return[];let t={...A($o,cs,`Scan for spectral echoes`),role:`move`};return e.locked()?[t,{...A(es,ls,`Capture Spectral Echo`),role:`move`,sealed:this.#e.player().buffer().full()}]:[t]}#T(){let e=this.#e.here();return e===void 0?[]:e.moves().map(e=>({...A(`${Jo}${e.id}`,os[e.id]??``,e.label),role:`move`,opposite:`${Jo}${e.opposite}`}))}#E(e,t){let n=e.peers(),r=this.#s.of(e,t.steps());return{kind:e.kind().title(),icon:e.kind().icon(),name:e.name(),address:e.address().toString(),position:n.length===0?null:{label:e.kind().indexLabel(),index:n.indexOf(e)+1,total:n.length},trail:e.trail().map(e=>({icon:e.kind().icon(),kind:e.kind().title(),name:e.name()})),status:e.status(),description:this.#u.read(e.description(),t.coherence(),r),facts:e.facts(),drawing:e.drawing(),noise:r.toString(),frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),childrenHeading:e.childrenHeading(),contents:this.#k(e),telemetry:this.#c.of(e,r),lattice:this.#D(e,t)}}#D(e,t){return this.#l.of(e,e=>t.visited(e),t.coherence(),this.#s.of(e,t.steps()))}#O(e){let t=e.buffer();return{size:t.size(),capacity:t.capacity(),resonant:e.resonantTraces(),fragments:t.fragments().map(e=>({key:e.key(),name:e.name(),hertz:e.frequency().hertz(),resonant:e.resonant()}))}}#k(e){let t=e.contents();return t===null?null:{objects:t.objects.map(e=>({key:e.key(),name:e.name()})),furniture:t.furniture}}},hs=class{warn(e){console.warn(e)}},gs=class{#e;constructor(e){this.#e=e}draw(){let[e=0,t=0]=this.#e.getRandomValues(new Uint32Array(2));return new Ka(e,t)}},_s=class{#e;constructor(e){this.#e=e}request(e){return this.#e.requestAnimationFrame(e)}cancel(e){this.#e.cancelAnimationFrame(e)}now(){return this.#e.performance.now()}},vs=`endless-transit.save`,ys=class{#e;constructor(e){this.#e=e}load(){try{return this.#e().getItem(vs)??void 0}catch{return}}save(e){try{this.#e().setItem(vs,e)}catch{}}},bs=class{#e;constructor(e){this.#e=e}name(){return`ENDLESS TRANSIT`}buildLine(){return`build ${this.#e}`}},xs=class{#e;#t=new Set;#n;constructor(e){this.#e=e}subscribe(e){return this.#t.add(e),this.#n===void 0&&this.#r(),()=>{this.#t.delete(e),this.#t.size===0&&this.#n!==void 0&&(this.#e.cancel(this.#n),this.#n=void 0)}}now(){return this.#e.now()}#r(){this.#n=this.#e.request(e=>{this.#i(e)})}#i(e){if(this.#n=void 0,this.#t.size!==0){this.#r();for(let t of[...this.#t])this.#t.has(t)&&t(e)}}},Ss=class{#e;constructor(e){this.#e=new Map(Object.entries(e))}picture(e){return this.#e.get(e)}},Cs=`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,ws=12,Ts=16,Es=.8,Ds=.1,Os=.95,ks=.55,As=50,js=100,Ms=.62,Ns=14,Ps=4,Fs=40,Is=class{layout(e,t){return this.#e(e,t).map(e=>{let t=e.base-e.height,n=Math.max(0,t-e.roof-2);return{id:e.child.id,x:e.middle-e.slot/2+1,y:n,width:e.slot-2,height:e.base+Ts-n,anchor:{x:e.middle,y:t+e.height/2}}})}paint(e,t,n,r,i,a){let o=i/1e3,{width:s,height:c}=n;e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,s,c),this.#i(e,n,r,o),this.#a(e,n,r,o);for(let i of this.#e(t,n))this.#t(e,i,r,o,a);this.#r(e,n,r,o),e.globalAlpha=1}#e(e,t){let n=t.width/(e.children.length+.6),r=t.height*Es,i=r-t.height*Ds;return e.children.map((e,t)=>{let a=n*Ms,o=Math.min(a*.45,12),s=Math.min(Math.max(e.floors,0),js);return{child:e,slot:n,middle:n*(.8+t),base:r,width:a,height:(i-o)*(.3+.68*Math.sqrt(s/js)),roof:o}})}#t(e,t,n,r,i){let{child:a,middle:o,base:s,width:c,height:l,roof:u}=t,d=o-c/2,f=s-l,p=a.id===i,m=a.sealed?.45:1;e.fillStyle=n(p?`rule-hi`:`rule`),e.globalAlpha=p?1:.85*m,e.fillRect(d,f,c,l),this.#n(e,t,n,r,m),e.strokeStyle=n(p?`yl`:a.sealed?`dim`:`frame`),e.globalAlpha=p?1:.6*m,e.lineWidth=p?1.8:1,e.beginPath(),e.moveTo(d,s),e.lineTo(d,f),e.lineTo(d+c,f),e.lineTo(d+c,s);let h=this.#o(a.address,0);a.landmark?(e.moveTo(d+c*.2,f),e.lineTo(o,f-u),e.lineTo(d+c*.8,f)):h<.4?(e.moveTo(d+c*.7,f),e.lineTo(d+c*.7,f-u*.7)):h<.7&&(e.moveTo(d+c*.25,f),e.lineTo(d+c*.25,f-u*.4),e.lineTo(d+c*.75,f-u*.4),e.lineTo(d+c*.75,f)),e.stroke(),a.landmark&&(e.strokeStyle=n(`yl`),e.globalAlpha=.75*m,e.lineWidth=1,e.beginPath(),e.arc(o,f-u*.3,c*.62,0,Math.PI*2),e.stroke()),a.visited&&(e.fillStyle=n(`yl`),e.globalAlpha=1,e.beginPath(),e.arc(d+c-4,f+4,2.5,0,Math.PI*2),e.fill()),e.font=`${p?`700`:`400`} ${String(ws)}px ${Cs}`,e.textAlign=`center`,e.textBaseline=`top`,e.fillStyle=n(p?`yl`:a.sealed?`dim`:`text`),e.globalAlpha=1,e.fillText(a.ordinal,o,s+2)}#n(e,t,n,r,i){let{child:a,middle:o,base:s,width:c,height:l}=t,u=a.doors===0?3:Math.min(Math.max(a.doors,2),Ps),d=Math.min(Math.max(a.floors,3),Ns),f=c/(u*2+1),p=l/(d*2+1),m=o-c/2,h=s-l,g=n(`text`),ee=n(`yl`);for(let t=0;t<d;t++)for(let n=0;n<u;n++){let o=t*u+n+1,s=this.#o(a.address,o);if(s<.35)continue;let c=this.#o(a.address,-o),l=.55+.45*Math.sin(r*c*3+c*20),d=s>.85;e.fillStyle=d?ee:g,e.globalAlpha=(d?.6:.22)*l*i,e.fillRect(m+f*(1+n*2),h+p*(1+t*2),f,p)}}#r(e,t,n,r){let i=t.height*Es;e.strokeStyle=n(`frame`),e.globalAlpha=.5,e.lineWidth=1,e.beginPath(),e.moveTo(0,i+.5),e.lineTo(t.width,i+.5),e.stroke();let a=t.height*Os,o=r*20%26;e.strokeStyle=n(`yl`),e.globalAlpha=.35,e.beginPath();for(let n=o-26;n<t.width;n+=26)e.moveTo(n,a),e.lineTo(n+14,a);e.stroke()}#i(e,t,n,r){let i=n(`text`),a=n(`yl`);for(let n=0;n<As;n++){let o=this.#o(`star-x`,n)*t.width,s=this.#o(`star-y`,n)*t.height*ks,c=this.#o(`star-big`,n)<.07,l=.5+this.#o(`star-pace`,n)*1.8,u=this.#o(`star-phase`,n)*6,d=this.#o(`star-glow`,n);e.fillStyle=this.#o(`star-warm`,n)<.14?a:i,e.globalAlpha=.45*(.2+.7*d*(.55+.45*Math.sin(r*l+u))),e.fillRect(o,s,c?1.8:1,c?1.8:1)}}#a(e,t,n,r){e.strokeStyle=n(`dim`),e.globalAlpha=.3,e.lineWidth=1,e.beginPath();for(let n=0;n<Fs;n++){let i=(this.#o(`rain`,n)*t.width+r*30*(1+n%3))%t.width,a=(n*53+r*260)%(t.height*1.1)-t.height*.1;e.moveTo(i,a),e.lineTo(i-2,a+9)}e.stroke()}#o(e,t){let n=2166136261,r=`${e}/${String(t)}`;for(let e=0;e<r.length;e++)n^=r.charCodeAt(e),n=Math.imul(n,16777619);return n^=n>>>15,n=Math.imul(n,739982445),n^=n>>>12,(n>>>0)/4294967296}},Ls=`default`,Rs=`abyssal`;function zs(e){return e===null?Ls:e.abyssal?Rs:e.frame??Ls}var Bs=`buffer`,Vs=`▲ `,Hs=10,Us=`█`,Ws=`░`,Gs={stable:`STABLE`,shifting:`SHIFTING`},Ks={text:`[RESONANT]`,label:`Resonant`},qs=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Bs}toViewModel(e){let t=e.prompt,n=e.buffer;if(t?.id!==Bs||n===null)throw Error(`BufferPresenter needs the buffer prompt`);let r=e=>String(e).padStart(2,`0`),i=t.figures.selected??``,a=`[QUANTUM_TRACE_BUFFER_SYNC...]`,o=n.fragments.map((t,n)=>{let a=String(n+1),o=i===String(n),s=t.hertz%2==0,c=Math.floor(t.hertz%100/10)+1;return{key:t.key,ordinal:r(n+1),hertz:`${String(t.hertz)}Hz`,bar:Us.repeat(c)+Ws.repeat(Hs-c),phase:s?Gs.stable:Gs.shifting,phaseKey:s?`stable`:`shifting`,name:t.name,badge:t.resonant?Ks:null,selected:o,selectedLabel:o?`Selected`:``,actions:e.options.filter(e=>(e.role===`pick`||e.role===`drop`)&&e.ordinal===a).map(e=>this.#t(e))}}),s=e.options.filter(e=>e.role===`return`).map(e=>this.#n(e));return{scene:Bs,title:this.#e.name(),frame:zs(e.place),heading:a,count:{label:`TRACE_BUFFER`,value:`${r(n.size)}/${r(n.capacity)} FRAGMENTS`},tally:{label:`RESONANT_TRACES`,value:String(n.resonant)},empty:o.length===0?`(No spectral traces detected in local buffer)`:``,rows:o,hint:`Select one fragment, then another: they merge into a hybrid and give 15 Coherence back.`,sync:`SYNC_STATUS: NOMINAL`,dock:s,options:[...o.flatMap(e=>e.actions),...s],note:e.message,status:e.message===``?a:e.message,build:this.#e.buildLine(),regions:{buffer:`Quantum trace buffer`,actions:`Back`}}}#t(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:``}}#n(e){return{...this.#t(e),label:`${Vs}${e.label.toUpperCase()}`}}},Js=globalThis,Ys=e=>e,Xs=Js.trustedTypes,Zs=Xs?Xs.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Qs=`$lit$`,P=`lit$${Math.random().toFixed(9).slice(2)}$`,$s=`?`+P,ec=`<${$s}>`,F=document,I=()=>F.createComment(``),L=e=>e===null||typeof e!=`object`&&typeof e!=`function`,tc=Array.isArray,nc=e=>tc(e)||typeof e?.[Symbol.iterator]==`function`,rc=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ic=/-->/g,ac=/>/g,z=RegExp(`>|${rc}(?:([^\\s"'>=/]+)(${rc}*=${rc}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),oc=/'/g,sc=/"/g,cc=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),V=Symbol.for(`lit-noChange`),H=Symbol.for(`lit-nothing`),lc=new WeakMap,U=F.createTreeWalker(F,129);function uc(e,t){if(!tc(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Zs===void 0?t:Zs.createHTML(t)}var dc=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=R;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===R?c[1]===`!--`?o=ic:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=z):(cc.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=z):o=ac:o===z?c[0]===`>`?(o=i??R,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?z:c[3]===`"`?sc:oc):o===sc||o===oc?o=z:o===ic||o===ac?o=R:(o=z,i=void 0);let d=o===z&&e[t+1].startsWith(`/>`)?` `:``;a+=o===R?n+ec:l>=0?(r.push(s),n.slice(0,l)+Qs+n.slice(l)+P+d):n+P+(l===-2?t:d)}return[uc(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},fc=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=dc(t,n);if(this.el=e.createElement(l,r),U.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=U.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(Qs)){let t=u[o++],n=i.getAttribute(e).split(P),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?hc:r[1]===`?`?gc:r[1]===`@`?_c:G}),i.removeAttribute(e)}else e.startsWith(P)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(cc.test(i.tagName)){let e=i.textContent.split(P),t=e.length-1;if(t>0){i.textContent=Xs?Xs.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],I()),U.nextNode(),c.push({type:2,index:++a});i.append(e[t],I())}}}else if(i.nodeType===8){if(i.data===$s)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(P,e+1))!==-1;)c.push({type:7,index:a}),e+=P.length-1}}a++}}static createElement(e,t){let n=F.createElement(`template`);return n.innerHTML=e,n}};function W(e,t,n=e,r){if(t===V)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=L(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=W(e,i._$AS(e,t.values),i,r)),t}var pc=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??F).importNode(t,!0);U.currentNode=r;let i=U.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new mc(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new vc(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=U.nextNode(),a++)}return U.currentNode=F,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},mc=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),L(e)?e===H||e==null||e===``?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==V&&this._(e):e._$litType$===void 0?e.nodeType===void 0?nc(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==H&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=fc.createElement(uc(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new pc(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=lc.get(e.strings);return t===void 0&&lc.set(e.strings,t=new fc(e)),t}k(t){tc(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(I()),this.O(I()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=Ys(e).nextSibling;Ys(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=H}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=W(this,e,t,0),a=!L(e)||e!==this._$AH&&e!==V,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=W(this,r[n+o],t,o),s===V&&(s=this._$AH[o]),a||=!L(s)||s!==this._$AH[o],s===H?e=H:e!==H&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},hc=class extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}},gc=class extends G{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==H)}},_c=class extends G{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=W(this,e,t,0)??H)===V)return;let n=this._$AH,r=e===H&&n!==H||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==H&&(n===H||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},vc=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}},yc={M:Qs,P,A:$s,C:1,L:dc,R:pc,D:nc,V:W,I:mc,H:G,N:gc,U:_c,B:hc,F:vc},bc=Js.litHtmlPolyfillSupport;bc?.(fc,mc),(Js.litHtmlVersions??=[]).push(`3.3.3`);var K=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new mc(t.insertBefore(I(),e),e,void 0,n??{})}return i._$AI(e),i},xc={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Sc=e=>(...t)=>({_$litDirective$:e,values:t}),Cc=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:wc}=yc,Tc=e=>e,Ec=()=>document.createComment(``),q=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new wc(r.insertBefore(Ec(),i),r.insertBefore(Ec(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Tc(e).nextSibling;Tc(r).insertBefore(e,i),e=t}}}return n},J=(e,t,n=e)=>(e._$AI(t,n),e),Dc={},Oc=(e,t=Dc)=>e._$AH=t,kc=e=>e._$AH,Ac=e=>{e._$AR(),e._$AA.remove()},jc=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Y=Sc(class extends Cc{constructor(e){if(super(e),e.type!==xc.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=kc(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=J(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=J(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=J(i[d],a[m]),q(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=J(i[f],a[p]),q(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=jc(o,p,m),u=jc(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=q(e,i[d]);J(t,a[p]),c[p]=t}else c[p]=J(n,a[p]),q(e,i[d],n),i[t]=null;p++}else Ac(i[f]),f--}else Ac(i[d]),d++;for(;p<=m;){let t=q(e,c[m+1]);J(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Ac(e)}return this.ut=o,Oc(e,c),V}}),Mc=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`BufferView.render before mount`);K(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&K(H,this.#e),this.#e=void 0}#t(e){return B`
      <div class="app buffer" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap trace" aria-label=${e.regions.buffer} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="buffer-heading">${e.heading}</h2>
          <p class="bcount">
            <span class="k">${e.count.label}</span> <b data-testid="buffer-count">${e.count.value}</b>
            <span class="k">${e.tally.label}</span> <b data-testid="resonant-traces">${e.tally.value}</b>
          </p>
          ${e.empty===``?H:B`<p class="empty" data-testid="buffer-empty">${e.empty}</p>`}
          ${e.rows.length===0?H:B`<ol class="frags" data-testid="fragments">
                  ${Y(e.rows,e=>`${e.ordinal}/${e.key}`,e=>B`
                      <li class=${e.selected?`frag selected`:`frag`} data-fragment=${e.key}>
                        <p class="fline">
                          <span class="ord">${e.ordinal}</span>
                          <span class="hz">${e.hertz}</span>
                          <span class="sig" data-phase=${e.phaseKey} aria-hidden="true">${e.bar}</span>
                          <span class="ph" data-phase=${e.phaseKey}>[${e.phase}]</span>
                        </p>
                        <p class="fname">
                          <b>${e.name}</b>
                          ${e.badge===null?H:B`<span class="badge" aria-hidden="true">${e.badge.text}</span
                                  ><span class="vh">${e.badge.label}</span>`}
                          ${e.selectedLabel===``?H:B`<span class="vh">${e.selectedLabel}</span>`}
                        </p>
                        <p class="facts">
                          ${Y(e.actions,e=>e.id,e=>this.#n(e,`pb fb`))}
                        </p>
                      </li>
                    `)}
                </ol>`}
          <p class="hint">${e.hint}</p>
          <p class="tl">${e.sync}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="dock" aria-label=${e.regions.actions}>
          ${Y(e.dock,e=>e.id,e=>this.#n(e,`pb`))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e,t){return B`
      <button type="button" class=${t} data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Nc=`help`,Pc=`▲ `,Fc=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Nc}toViewModel(e){if(e.prompt?.id!==Nc)throw Error(`HelpPresenter needs the help prompt`);let t=`[OPERATOR_MANUAL]`,n=e.options.filter(e=>e.role===`return`).map(e=>this.#t(e));return{scene:Nc,title:this.#e.name(),frame:zs(e.place),heading:t,lead:`You are a traveller in an endless lattice of places. Every tap is a prompt; every prompt costs Coherence. Go deep, take what resonates, and come back before the link fails.`,sections:[{heading:`MOVING`,entries:[{term:`A listed place`,what:`Tap it to enter. The list is what lies one level down.`},{term:`▲ LEAVE`,what:`Back up one level, to the place you came from.`},{term:`GO UP · GO DOWN`,what:`Ride a building’s elevator one floor. The top and the ground floor drop one of them.`},{term:`ENTER CORRIDOR · BACK TO ELEVATOR`,what:`The corridor lists the floor’s doors; a door opens an apartment’s first room.`},{term:`GO FORWARD · GO BACK`,what:`Walk an apartment’s rooms. Only the first room has EXIT APARTMENT.`},{term:`An object`,what:`Tap one in a room to take it into the buffer. Sixteen fit; the tiles stop being buttons when it is full.`}]},{heading:`THE DOCK`,entries:[{term:`SCAN`,what:`What is behind the doors, which floors are near you, or the rooms of the apartment. Costs 1, no step.`},{term:`MAP`,what:`Draws the places you can enter from here, you at the centre; dim is unvisited. Nothing inside a room. Costs 1.`},{term:`BUFFER`,what:`Your inventory. Select one fragment, then another: they merge into a hybrid and give 15 Coherence back. In a room, drop one where you stand. Costs 1 to open; nothing inside.`},{term:`TRACE`,what:`Your whole path from the universe down to here. Costs 1.`},{term:`HELP`,what:`This screen. Costs 1.`},{term:`TITLE SCREEN`,what:`Back to the title; the world waits behind CONTINUE. Costs 1.`},{term:`END SESSION`,what:`The recap of this run: where you are, your steps, your places, your buffer. RESUME comes back; ending it goes to the title with the place kept.`},{term:`MORE`,what:`On a phone, the rest of the dock. It folds again after the next tap.`}]}],survival:{heading:`HOW NOT TO DIE`,lines:[`Every tap costs 1 Coherence before anything else happens — a move, a scan, the buffer. A place whose era is entropic costs 2, anywhere below a building’s bedrock costs 2, both at once 4.`,`Only a merge gives it back: 15, capped at 100. Nothing else does.`,`Under 40 the room text starts to corrupt. Under 30 the bar is red and the map sprouts X marks, more as you drop.`,`At 0 the link fails: the world is rebuilt from the same seed and you wake on the starting street with 100. You keep your buffer, your step count and your visited places; everything that lived inside the world is undone.`,`A capture whose frequency is a multiple of 11 resonates and counts on your tally, once. A Keystone never does.`]},keys:`On a keyboard, the letter on a button is its key. A phone needs none.`,dock:n,options:n,note:e.message,status:e.message===``?t:e.message,build:this.#e.buildLine(),regions:{help:`Help`,actions:`Back`}}}#t(e){return{id:e.id,key:e.key.toUpperCase(),label:`${Pc}${e.label.toUpperCase()}`,opposite:e.opposite}}},Ic=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`HelpView.render before mount`);K(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&K(H,this.#e),this.#e=void 0}#t(e){return B`
      <div class="app help" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap manual" aria-label=${e.regions.help} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="help-heading">${e.heading}</h2>
          <p class="lead">${e.lead}</p>
          ${e.sections.map(e=>B`
              <h3 class="heading">${e.heading}</h3>
              <dl class="terms" data-testid="help-section">
                ${e.entries.map(e=>B`
                    <div class="term">
                      <dt>${e.term}</dt>
                      <dd>${e.what}</dd>
                    </div>
                  `)}
              </dl>
            `)}
          <h3 class="heading">${e.survival.heading}</h3>
          <ul class="rules" data-testid="help-survival">
            ${e.survival.lines.map(e=>B`<li>${e}</li>`)}
          </ul>
          <p class="hint">${e.keys}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="dock" aria-label=${e.regions.actions}>
          ${Y(e.dock,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Lc=`▲ `,Rc={text:`>>`,label:`You are here`},zc={lattice:{meter:`Coherence`,path:`Path from the universe`,sync:`LATTICE_SYNC: [NOMINAL]`},void:{meter:`Integrity`,path:`Void trace from the universe`,sync:`VOID_SYNC: [PRESSURE_HIGH]`}},Bc=`[VOID] `,Vc={text:`[>X<]`,label:`Elevator here`},Hc={text:`[V]`,label:`Visited`},Uc=`█`,Wc=`X`,X={you:`YOU`,visited:`VISITED`,unvisited:`UNVISITED`,noise:`STATIC`,mark:`GLITCH`},Gc=`[NEURAL_LATTICE_PROJECTION]`,Kc=`[NEURAL_LATTICE_TRACE_INITIATED]`,qc=`>> `,Jc=class{#e;constructor(e){this.#e=e}accepts(e){return e.place!==null&&e.prompt===null}toViewModel(e){let t=e.place,n=e.player;if(t===null||n===null)throw Error(`HudPresenter needs a snapshot with a place`);let r=e.options.filter(e=>e.role===`travel`),i=r.map(e=>this.#o(e)),a=e.options.filter(e=>e.role===`move`).map(e=>this.#l(e)),o=e.options.filter(e=>e.role===`return`||e.role===`system`).map(e=>this.#l(e)),s=e.options.filter(e=>e.role===`take`),c=e.options.filter(e=>e.role===`debug`).map(e=>this.#l(e)),l=t.abyssal?zc.void:zc.lattice;return{scene:`${e.world?.seed??``}/${t.address}`,title:this.#e.name(),frame:zs(t),rail:t.trail.map((e,n)=>({...e,current:n===t.trail.length-1})),meter:{label:l.meter,...k.range(),value:n.coherence,text:`${String(n.coherence)}%`,band:n.band,bandLabel:n.band,valueText:`${String(n.coherence)} percent, ${n.band}`},stats:[{label:`Steps`,value:String(n.steps)},{label:`Buffer`,value:`${String(e.buffer?.size??0)}/${String(e.buffer?.capacity??0)}`}],place:{eyebrow:t.kind.toUpperCase(),icon:t.icon,name:t.name,position:t.position===null?null:{label:this.#c(t.position.label.toLowerCase()),value:`${String(t.position.index)} of ${String(t.position.total)}`},tags:t.facts.map(e=>({key:e.key,label:e.label,value:this.#c(e.value)})),description:t.description,rows:this.#n(t),diagnostic:t.status},aside:this.#a(t,s,e.buffer?.resonant??0,l.sync),scan:e.scan===null?null:{label:`Scan`,heading:e.scan.title,notes:e.scan.notes,rows:e.scan.rows.map(e=>({cells:e.cells.filter(e=>e.value!==``).map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?Rc:null,note:e.note}))},map:e.map===null?null:this.#r(e.map,Gc),trace:e.trace===null?null:this.#i(e.trace),drawing:this.#t(t,r,new k(n.coherence).decay()),heading:t.childrenHeading.replace(/:$/,``).toUpperCase(),rows:i,moves:a,sealedNote:i.some(e=>e.sealed)?`STRUCTURES SEALED · the lattice opens their doors in a later build`:null,sealedTag:`SEALED`,dock:o,fold:{after:e.options.filter(e=>e.role===`return`).length,more:`MORE`,less:`LESS`,label:`More of the dock`},debug:c,debugToggle:`DEBUG`,options:[...s.filter(e=>!e.sealed).map(e=>this.#s(e)),...i.filter(e=>!e.sealed).map(e=>({id:e.id,key:e.key,label:e.label,opposite:``})),...a,...o,...c],status:e.message,build:this.#e.buildLine(),regions:{hud:`Position`,path:l.path,place:`Where you are`,scan:`Scan`,map:`Map`,trace:`Trace`,travel:`Places to enter`,moves:`Moves`,aside:`Readouts`,dock:`Leave and game`,debug:`Debug tools`}}}#t(e,t,n){let r=t.filter(e=>!e.sealed).length;return{key:e.drawing,label:`Picture of ${e.name}: ${String(t.length)} places drawn, ${String(r)} open — the list below enters them too`,address:e.address,children:t.map(e=>({id:e.id,ordinal:e.ordinal,name:e.place,floors:e.figure?.floors??0,doors:e.figure?.doors??0,landmark:e.landmark,visited:e.visited,sealed:e.sealed,address:e.address})),decay:n,noise:e.noise}}#n(e){let t=e.contents;return t===null?[]:[{label:`FURNITURE`,value:t.furniture.join(`, `)},...t.objects.length===0?[]:[{label:`OBJECTS_DETECTED`,value:String(t.objects.length)}]]}#r(e,t){let n=e=>e.noise?`noise`:e.visited?`visited`:`unvisited`,r=e.nodes.find(e=>!e.noise)?.glyph??e.origin.glyph,i=e.nodes.filter(e=>e.visited).length,a=[{glyph:e.origin.glyph,label:X.you,tone:`you`},{glyph:r,label:X.visited,tone:`visited`},{glyph:r,label:X.unvisited,tone:`unvisited`},...e.marks.length===0?[]:[{glyph:Wc,label:X.mark,tone:`mark`}]],o=e.marks.length===0?``:`, ${String(e.marks.length)} glitch mark${e.marks.length===1?``:`s`}`;return{label:`Lattice map`,heading:t,origin:`SCAN_ORIGIN: ${e.origin.name}`,picture:{width:e.width,height:e.height,origin:{glyph:e.origin.glyph,label:X.you},nodes:e.nodes.map(e=>({x:e.x,y:e.y,glyph:e.glyph,tone:n(e)})),marks:e.marks,markGlyph:Wc,legend:a},nodes:e.nodes.map(e=>({glyph:e.glyph,name:e.name,note:`${e.visited?`visited`:`unvisited`}${e.noise?`, static`:``}`})),summary:`Lattice map of ${e.origin.name}: ${String(e.nodes.length)} nodes, ${String(i)} visited${o}.`}}#i(e){let t=e.steps.map(e=>({depth:`[${String(e.depth).padStart(2,`0`)}]`,glyph:e.icon,kind:e.kind.toUpperCase(),name:`${e.name}${e.meta}`,current:e.current,abyssal:e.abyssal}));return{label:`Lattice trace`,heading:Kc,picture:{rows:t},lines:t.map(e=>`${e.current?qc:``}${e.depth} ${e.glyph} ${e.kind} : ${e.name}`)}}#a(e,t,n,r){let i=e.contents,a=t.some(e=>e.sealed);return{objects:i===null?null:{label:`In this room`,heading:`IN THIS ROOM`,empty:i.objects.length===0?`No objects detected.`:``,note:a?`BUFFER FULL — merge or drop a fragment to take more.`:``,tiles:i.objects.map((e,n)=>{let r=String(n+1),i=t.find(e=>e.ordinal===r&&!e.sealed);return{key:e.key,name:e.name,ordinal:r,action:i===void 0?null:this.#s(i)}})},telemetry:e.telemetry===null?null:{label:`System telemetry`,heading:`[SYSTEM_TELEMETRY]`,sync:r,spectrogram:{heading:`[QUANTUM_SPECTROGRAM]`,bars:e.telemetry.spectrogram.map(e=>Uc.repeat(e))},logs:{heading:`[DECODE_LOGS]`,lines:[`> Trace: ${e.address}`,`> Resonant traces: ${String(n)}`,...e.telemetry.voice===null?[]:[`${Bc}${e.telemetry.voice}`]]}},map:e.telemetry!==null||e.lattice===null?null:this.#r(e.lattice,`[NEURAL_MAP: ${e.kind.toUpperCase()}]`)}}#o(e){return{id:e.id,key:e.key.toUpperCase(),ordinal:e.ordinal.padStart(2,`0`),label:e.sealed?e.place:e.label,sealed:e.sealed,landmark:e.landmark,readings:e.readings.map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?Vc:null,seen:e.visited?Hc:null}}#s(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label,opposite:``}}#c(e){return e.charAt(0).toUpperCase()+e.slice(1)}#l(e){let t=e.role===`return`?Lc:``;return{id:e.id,key:e.key.toUpperCase(),label:`${t}${e.label.toUpperCase()}`,opposite:e.opposite}}},Yc=class{#e;#t=new Map;constructor(e){this.#e=e}bind(e,t,n){if(t==null||n===null){this.unbind(e);return}let r=this.#t.get(e),i=r?.host===t?r.view:void 0;i===void 0&&(this.unbind(e),i=this.#e[e](),i.mount(t),this.#t.set(e,{host:t,view:i})),i.render(n)}unbind(e){this.#t.get(e)?.view.dispose(),this.#t.delete(e)}dispose(){for(let e of[...this.#t.keys()])this.unbind(e)}},Xc=2,Zc=13e5,Qc=class{#e;#t;constructor(e=Xc,t=Zc){this.#e=e,this.#t=t}ratio(e,t,n){let r=Math.min(e,this.#e),i=t*n;return i<=0?r:Math.min(r,Math.sqrt(this.#t/i))}};function $c(e){let t=e.ownerDocument.defaultView?.getComputedStyle(e),n=new Map;return e=>{let r=n.get(e);return r===void 0&&(r=t?.getPropertyValue(`--${e}`).trim()??``,n.set(e,r)),r}}var el=1800,tl=.5,nl=`(prefers-reduced-motion: reduce)`,rl=class{#e;#t;#n=new Qc;#r;#i;#a;#o;constructor(e,t){this.#e=e,this.#t=t}mount(e){let t=e.ownerDocument.createElement(`canvas`);t.setAttribute(`aria-hidden`,`true`),e.replaceChildren(t),this.#r=t,this.#i=new ResizeObserver(()=>{this.#l(tl)}),this.#i.observe(e)}render(e){if(this.#a=e,this.#s()){this.#c(),this.#l(tl);return}this.#o??=this.#t.subscribe(e=>{this.#l(e%el/el)})}dispose(){this.#c(),this.#i?.disconnect(),this.#i=void 0,this.#r?.remove(),this.#r=void 0,this.#a=void 0}#s(){return(this.#r?.ownerDocument.defaultView)?.matchMedia(nl).matches??!0}#c(){this.#o?.(),this.#o=void 0}#l(e){let t=this.#r,n=this.#a,r=t?.parentElement;if(t===void 0||n===void 0||r==null)return;let i=r.clientWidth;if(i===0)return;let a=this.#e.height(n,i),o=t.ownerDocument.defaultView,s=this.#n.ratio(o?.devicePixelRatio??1,i,a),c=Math.round(i*s),l=Math.round(a*s);(t.width!==c||t.height!==l)&&(t.width=c,t.height=l,t.style.width=`${String(i)}px`,t.style.height=`${String(a)}px`);let u=t.getContext(`2d`);u!==null&&(u.setTransform(s,0,0,s,0,0),u.setLineDash([]),this.#e.paint(u,n,{width:i,height:a},$c(t),e))}},il=`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,al=12,ol=24,sl=14,cl=7,ll=9,ul=5,dl={visited:`frame`,unvisited:`dim`,noise:`rd`,you:`yl`,mark:`mg`},fl={visited:1,unvisited:.75,noise:1,you:1,mark:1},pl=class{height(e,t){return Math.round(t*e.height/e.width)+ol}paint(e,t,n,r,i){let a=n.width/t.width,o=n.height-ol,s=o/t.height,c=Math.max(al,Math.round(Math.min(a,s)*.9)),l=(e,t)=>[(e+.5)*a,(t+.5)*s];e.globalAlpha=1,e.shadowBlur=0,e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height),e.fillStyle=r(`rule`);for(let n=0;n<t.height;n++)for(let r=0;r<t.width;r++){let[t,i]=l(r,n);e.fillRect(t-.5,i-.5,1,1)}e.strokeStyle=r(`rule-hi`),e.lineWidth=1,e.strokeRect(.5,.5,n.width-1,o-1),e.textAlign=`center`,e.textBaseline=`middle`,e.font=`400 ${String(c)}px ${il}`;for(let n of t.nodes){let[t,i]=l(n.x,n.y);this.#e(e,r,n.glyph,t,i,n.tone)}e.font=`700 ${String(c)}px ${il}`;for(let n of t.marks){let[i,a]=l(n.x,n.y);this.#e(e,r,t.markGlyph,i,a,`mark`)}let u=n.width/2,d=o/2;this.#t(e,r(`yl`),u,d,i),e.globalAlpha=1,e.fillStyle=r(`yl`),e.beginPath(),e.moveTo(u,d-ul),e.lineTo(u+ul,d),e.lineTo(u,d+ul),e.lineTo(u-ul,d),e.closePath(),e.fill(),e.font=`700 ${String(al)}px ${il}`,e.textAlign=`left`,this.#e(e,r,t.origin.glyph,u+ul+4,d,`you`),this.#n(e,t,n,r,o)}#e(e,t,n,r,i,a){e.fillStyle=t(dl[a]),e.globalAlpha=fl[a],e.fillText(n,r,i)}#t(e,t,n,r,i){e.strokeStyle=t,e.lineWidth=1.2;for(let t=0;t<3;t++){let a=(i+t/3)%1;e.globalAlpha=(1-a)*.7,e.beginPath(),e.arc(n,r,cl+ll*a,0,Math.PI*2),e.stroke()}}#n(e,t,n,r,i){let a=i+ol/2;e.font=`400 ${String(al)}px ${il}`,e.textAlign=`left`,e.textBaseline=`middle`;let o=6;for(let i of t.legend){if(o+e.measureText(`${i.glyph} ${i.label}`).width>n.width)break;this.#e(e,r,i.glyph,o,a,i.tone),o+=e.measureText(i.glyph).width+5,e.globalAlpha=1,e.fillStyle=r(`dim`),e.fillText(i.label,o,a),o+=e.measureText(i.label).width+sl}}},ml=`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,hl=12,gl=34,_l=12,vl=12,Z=22,yl=9,bl=44,xl=8,Sl=`…`,Cl=class{height(e,t){return _l+e.rows.length*gl+vl}paint(e,t,n,r,i){e.globalAlpha=1,e.shadowBlur=0,e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height);let a=t.rows,o=e=>_l+e*gl+gl/2;a.length>1&&(e.strokeStyle=r(`frame`),e.lineWidth=1.5,e.globalAlpha=.8,e.beginPath(),e.moveTo(Z,o(0)),e.lineTo(Z,o(a.length-1)),e.stroke()),e.textBaseline=`middle`;for(let[t,s]of a.entries()){let a=o(t),c=s.abyssal?`ab`:s.current?`yl`:`text`;s.current&&this.#t(e,r(c),Z,a,i),e.globalAlpha=1,e.fillStyle=r(`ground`),e.beginPath(),e.arc(Z,a,yl,0,Math.PI*2),e.fill(),e.strokeStyle=r(s.abyssal?`ab`:s.current?`yl`:`frame`),e.lineWidth=s.current?2:1,e.beginPath(),e.arc(Z,a,yl,0,Math.PI*2),e.stroke(),e.textAlign=`center`,e.font=`400 ${String(hl)}px ${ml}`,e.fillStyle=r(c),e.fillText(s.glyph,Z,a),e.textAlign=`left`,e.fillStyle=r(`dim`),e.fillText(s.depth,bl,a-8);let l=e.measureText(s.depth).width+6;e.fillStyle=r(s.abyssal?`ab`:`dim`),e.fillText(s.kind,bl+l,a-8),e.font=`${s.current?`700`:`400`} ${String(hl)}px ${ml}`,e.fillStyle=r(c),e.fillText(this.#e(e,s.name,n.width-bl-xl),bl,a+8)}}#e(e,t,n){if(e.measureText(t).width<=n)return t;let r=t;for(;r.length>1&&e.measureText(r+Sl).width>n;)r=r.slice(0,-1);return r+Sl}#t(e,t,n,r,i){e.strokeStyle=t,e.lineWidth=1,e.globalAlpha=(1-i)*.6,e.beginPath(),e.arc(n,r,12+8*i,0,Math.PI*2),e.stroke()}},wl=7,Tl=500,El=1<<20,Dl={tears:[],grain:[],tint:0,dark:!1},Ol=class{#e=``;#t=0;#n=[];plan(e,t,n){if(t<=0)return Dl;(e!==this.#e||t!==this.#t)&&(this.#e=e,this.#t=t,this.#n=[]);let r=(n%8+8)%8,i=this.#n[r];if(i!==void 0)return i;let a=this.#r((Ka.parse(e)??new Ka(0,0)).branch(r),t);return this.#n[r]=a,a}#r(e,t){let n=[];for(let r=0;r<Math.floor(t*wl);r++){let i=e.branch(`tear`).branch(r);this.#i(i,`keep`)>.35+t*.5||n.push({y:this.#i(i,`y`),height:2+this.#i(i,`height`)*14*t,shift:(this.#i(i,`shift`)-.5)*40*t})}let r=[],i=e.branch(`grain`);for(let e=0;e<Math.round(t*Tl);e++){let t=i.branch(e).range(0,El*2-1);r.push({x:(t&1023)/1024,y:(t>>10&1023)/1024,red:t>=El})}return{tears:n,grain:r,tint:.1*t,dark:t>.5&&this.#i(e,`dark`)<.08*t}}#i(e,t){return e.branch(t).range(0,1048575)/El}},kl=`pick`,Al=`light`;function jl(e){return e<.5?4*e**3:1-(-2*e+2)**3/2}var Ml=class{#e;#t;#n;#r;#i;constructor(e,t,n,r,i=jl){this.#e=e,this.#t=t,this.#n=n,this.#r=r,this.#i=i}progress(e){return this.#r<=0?1:Math.min(1,Math.max(0,(e-this.#n)/this.#r))}at(e){let t=this.progress(e);return t>=1?this.#t:this.#e+(this.#t-this.#e)*this.#i(t)}done(e){return this.progress(e)>=1}},Nl=`(prefers-reduced-motion: reduce)`,Pl=6,Fl=450,Il=12,Ll=0,Rl=class{#e;#t;#n=new Ol;#r=new Qc;#i;#a;#o;#s;#c;#l={width:0,height:0};#u=1;#d=[];#f=``;#p;#m;constructor(e,t){this.#e=e,this.#t=t}mount(e){let t=e.ownerDocument.createElement(`canvas`);t.setAttribute(`aria-hidden`,`true`),e.replaceChildren(t),this.#i=e,this.#a=t;let n=new AbortController,r=n.signal;this.#s=n,t.addEventListener(`pointermove`,e=>{this.#C(e)},{signal:r}),t.addEventListener(`pointerdown`,e=>{this.#C(e)},{signal:r}),t.addEventListener(`pointerleave`,()=>{this.#w(``)},{signal:r}),t.addEventListener(`click`,e=>{this.#T(e)},{signal:r}),this.#o=new ResizeObserver(()=>{this.#y(),this.#m===void 0&&this.#b(Ll)}),this.#o.observe(e)}render(e){e!==this.#c&&(this.#p=void 0,this.#c=e,this.#y(),this.#g())}arrive(e){let t=this.#d.find(t=>t.id===e);t===void 0||this.#h()||(this.#p={scale:new Ml(Pl,1,this.#t.now(),Fl),anchor:t.anchor,pick:``},this.#g())}light(e){e!==this.#f&&(this.#f=e,this.#m===void 0&&this.#b(Ll))}dispose(){this.#p=void 0,this.#_(),this.#o?.disconnect(),this.#o=void 0,this.#s?.abort(),this.#s=void 0,this.#a?.remove(),this.#a=void 0,this.#i=void 0,this.#c=void 0}#h(){return this.#i?.ownerDocument.defaultView?.matchMedia(Nl).matches??!0}#g(){if(this.#h()){this.#_(),this.#b(Ll);return}this.#m??=this.#t.subscribe(e=>{this.#v(e)})}#_(){this.#m?.(),this.#m=void 0}#v(e){this.#b(e);let t=this.#p;t?.scale.done(e)&&(this.#p=void 0,t.pick!==``&&this.#E(kl,t.pick))}#y(){let e=this.#i,t=this.#a,n=this.#c;if(e===void 0||t===void 0||n===void 0)return;let r={width:e.clientWidth,height:e.clientHeight},i=this.#r.ratio(e.ownerDocument.defaultView?.devicePixelRatio??1,r.width,r.height),a=Math.round(r.width*i),o=Math.round(r.height*i);(t.width!==a||t.height!==o)&&(t.width=a,t.height=o),this.#l=r,this.#u=i,this.#d=this.#e.layout(n,r)}#b(e){let t=this.#a,n=this.#c,{width:r,height:i}=this.#l;if(t===void 0||n===void 0||r===0||i===0)return;let a=t.getContext(`2d`);if(a===null)return;let o=$c(t),s=this.#u;a.globalAlpha=1,a.setLineDash([]);let c=this.#p,l=0;if(c===void 0)a.setTransform(s,0,0,s,0,0);else{let t=c.scale.at(e);l=(t-1)/5;let n=c.anchor.x+(r/2-c.anchor.x)*l,o=c.anchor.y+(i/2-c.anchor.y)*l;a.setTransform(s*t,0,0,s*t,s*(n-c.anchor.x*t),s*(o-c.anchor.y*t))}this.#e.paint(a,n,this.#l,o,e,this.#f),a.setTransform(s,0,0,s,0,0),l>0&&(a.globalAlpha=l,a.fillStyle=o(`ground`),a.fillRect(0,0,r,i),a.globalAlpha=1);let u=e===Ll?0:Math.floor(e/1e3*Il)%8;this.#x(a,t,this.#n.plan(n.noise,n.decay,u),o)}#x(e,t,n,r){let{width:i,height:a}=this.#l,o=this.#u;for(let r of n.tears){let n=r.y*a;e.drawImage(t,0,n*o,t.width,r.height*o,r.shift,n,i,r.height)}if(n.grain.length>0){e.globalAlpha=n.tint*5;let t=r(`text`),o=r(`rd`);for(let r of n.grain)e.fillStyle=r.red?o:t,e.fillRect(r.x*i,r.y*a,1,1)}n.tint>0&&(e.globalAlpha=n.tint,e.fillStyle=r(`rd`),e.fillRect(0,0,i,a)),n.dark&&(e.globalAlpha=.5,e.fillStyle=r(`ground`),e.fillRect(0,0,i,a)),e.globalAlpha=1}#S(e){let t=this.#a?.getBoundingClientRect();if(t===void 0)return;let n=e.clientX-t.left,r=e.clientY-t.top;return this.#d.find(e=>n>=e.x&&n<=e.x+e.width&&r>=e.y&&r<=e.y+e.height)}#C(e){this.#p===void 0&&this.#w(this.#S(e)?.id??``)}#w(e){e!==this.#f&&(this.light(e),this.#E(Al,e))}#T(e){if(this.#p!==void 0)return;let t=this.#S(e),n=this.#c?.children.find(e=>e.id===t?.id);if(!(t===void 0||n===void 0||n.sealed)){if(this.#h()){this.#E(kl,t.id);return}this.#p={scale:new Ml(1,Pl,this.#t.now(),Fl),anchor:t.anchor,pick:t.id},this.#g()}}#E(e,t){this.#i?.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:{id:t}}))}},zl=class{#e;#t;#n=!1;#r=!1;#i;#a;#o;#s;#c=``;#l;constructor(e,t){this.#a=e,this.#o=t,this.#i=new Yc({pane:()=>new rl(new pl,e),map:()=>new rl(new pl,e),trace:()=>new rl(new Cl,e)})}mount(e){this.#e=e}render(e){this.#n=!1,e.scene!==this.#t?.scene&&(this.#c=``),this.#u(e);let t=this.#l,n=t===void 0||t===e.drawing.address?void 0:e.drawing.children.find(e=>e.address!==``&&(t===e.address||t.startsWith(`${e.address}.`)));n!==void 0&&this.#s?.view.arrive(n.id),this.#l=e.drawing.address}#u(e){if(this.#e===void 0)throw Error(`HudView.render before mount`);this.#t=e,K(this.#g(e),this.#e),this.#i.bind(`pane`,this.#p(`pane`),e.aside.map?.picture??null),this.#i.bind(`map`,this.#p(`map`),e.map?.picture??null),this.#i.bind(`trace`,this.#p(`trace`),e.trace?.picture??null),this.#d(e.drawing)}#d(e){let t=this.#p(`scene`),n=this.#o.picture(e.key);if(t===null||n===void 0){this.#s?.view.dispose(),this.#s=void 0;return}if(this.#s?.host!==t||this.#s.picture!==n){this.#s?.view.dispose();let e=new Rl(n,this.#a);e.mount(t),this.#s={host:t,picture:n,view:e}}this.#s.view.render(e),this.#s.view.light(this.#c)}#f(e){e!==this.#c&&this.#s!==void 0&&(this.#c=e,this.#s.view.light(e),this.#t!==void 0&&this.#e!==void 0&&K(this.#g(this.#t),this.#e))}dispose(){this.#s?.view.dispose(),this.#s=void 0,this.#c=``,this.#i.dispose(),this.#e!==void 0&&K(H,this.#e),this.#e=void 0,this.#t=void 0,this.#n=!1,this.#r=!1}#p(e){return this.#e?.querySelector(`[data-canvas="${e}"]`)??null}#m(){this.#n=!this.#n,this.#t!==void 0&&this.#u(this.#t)}#h(){this.#r=!this.#r,this.#t!==void 0&&this.#u(this.#t)}#g(e){let t=this.#o.picture(e.drawing.key)!==void 0;return B`
      <div class="app world" data-frame=${e.frame} data-band=${e.meter.band} ?data-drawn=${t}>
        <section class="hud" aria-label=${e.regions.hud}>
          <h1 class="brand">${e.title}</h1>
          <div class="meter" data-band=${e.meter.band} data-testid="meter">
            <span class="ml">${e.meter.label}</span
            ><span
              class="cohbar"
              role="meter"
              aria-label=${e.meter.label}
              aria-valuemin=${e.meter.min}
              aria-valuemax=${e.meter.max}
              aria-valuenow=${e.meter.value}
              aria-valuetext=${e.meter.valueText}
              ><i style=${`width:${String(e.meter.value)}%`}></i
            ></span>
            <b class="mv" data-testid="coherence">${e.meter.text}</b>
            <span class="mb" data-testid="band">${e.meter.bandLabel}</span>
          </div>
          <dl class="stats">
            ${e.stats.map(e=>B`
                <div class="stat">
                  <dt>${e.label}</dt>
                  <dd>${e.value}</dd>
                </div>
              `)}
          </dl>
        </section>
        <nav class="rail" aria-label=${e.regions.path}>
          <ol data-testid="path">
            ${e.rail.map(e=>B`
                <li class=${e.current?`crumb you`:`crumb`}>
                  <span class="vh">${e.kind}</span><span class="ic" aria-hidden="true">${e.icon}</span
                  ><span class="cn" aria-current=${e.current?`location`:H}>${e.name}</span>
                </li>
              `)}
          </ol>
        </nav>
        <section class="cap" aria-label=${e.regions.place} tabindex="-1" data-rest>
          <div class="head">
            <p class="eyebrow" data-testid="place-kind">${e.place.eyebrow}</p>
            <h2>
              <span class="ic" aria-hidden="true">${e.place.icon}</span
              ><span data-testid="place-name">${e.place.name}</span>
            </h2>
          </div>
          <div class="body">
            <ul class="tags">
              ${e.place.position===null?H:B`<li class="chip pos">
                      <span class="k">${e.place.position.label}</span> ${e.place.position.value}
                    </li>`}
              ${e.place.tags.map(e=>B`
                  <li class="tag" data-fact=${e.key}><span class="k">${e.label}</span> ${e.value}</li>
                `)}
            </ul>
            ${e.moves.length===0?H:B`
                    <nav class="moves" aria-label=${e.regions.moves}>
                      ${Y(e.moves,e=>e.id,e=>this.#C(e))}
                    </nav>
                  `}
            <div class="desc">${e.place.description.map(e=>B`<p>${e}</p>`)}</div>
            ${e.place.rows.length===0?H:B`<dl class="prows">
                    ${e.place.rows.map(e=>B`
                        <div class="prow">
                          <dt>${e.label}</dt>
                          <dd>${e.value}</dd>
                        </div>
                      `)}
                  </dl>`}
            ${e.place.diagnostic===``?H:B`<p class="diag">${e.place.diagnostic}</p>`}
            <p class=${e.status===``?`status quiet`:`status`} data-testid="status">${e.status}</p>
          </div>
        </section>
        ${t?B`<div
                class="scene"
                data-testid="scene"
                data-canvas="scene"
                role="img"
                aria-label=${e.drawing.label}
                data-lit=${this.#c}
                @light=${e=>{this.#f(this.#x(e))}}
              ></div>`:H}
        ${this.#_(e)} ${e.map===null?H:this.#v(e.map,`map`,`map`,e.regions.map)}
        ${this.#y(e)}
        <div class="side">
          ${e.rows.length===0?H:B`
                  <section class="travel" aria-label=${e.regions.travel}>
                    <h3 class="heading">${e.heading}</h3>
                    ${e.sealedNote===null?H:B`<p class="sealed-note" data-testid="sealed-note">${e.sealedNote}</p>`}
                    <ol class="rows">
                      ${Y(e.rows,t=>`${e.scene}/${t.id}`,n=>this.#S(n,e.sealedTag,t))}
                    </ol>
                  </section>
                `}
          ${this.#b(e)}
        </div>
        <nav class="dock" aria-label=${e.regions.dock} data-open=${this.#n?`true`:`false`}>
          ${Y(e.dock.slice(0,e.fold.after),e=>e.id,e=>this.#C(e))}
          ${e.dock.length<=e.fold.after?H:B`
                  <button
                    type="button"
                    class="pb more"
                    data-testid="more"
                    aria-label=${e.fold.label}
                    aria-expanded=${this.#n?`true`:`false`}
                    aria-controls="dock-fold"
                    @click=${()=>{this.#m()}}
                  >
                    <span>${this.#n?e.fold.less:e.fold.more}</span>
                  </button>
                  <div class="fold" id="dock-fold">
                    ${Y(e.dock.slice(e.fold.after),e=>e.id,e=>this.#C(e))}
                  </div>
                `}
        </nav>
        ${e.debug.length===0?H:B`
                <nav
                  class="debug"
                  aria-label=${e.regions.debug}
                  data-testid="debug"
                  data-open=${this.#r?`true`:`false`}
                >
                  <button
                    type="button"
                    class="pb dbg"
                    data-testid="debug-toggle"
                    tabindex="-1"
                    aria-expanded=${this.#r?`true`:`false`}
                    aria-controls="debug-fold"
                    @click=${()=>{this.#h()}}
                  >
                    <span>${e.debugToggle}</span>
                  </button>
                  <div class="fold" id="debug-fold">
                    ${Y(e.debug,e=>e.id,e=>this.#C(e,-1))}
                  </div>
                </nav>
              `}
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#_(e){let t=e.scan;return t===null?H:B`
      <section class="scan" data-testid="scan" aria-label=${t.label} tabindex="-1" data-spot>
        <h3 class="heading">${t.heading}</h3>
        ${t.notes.map(e=>B`<p class="tl">${e}</p>`)}
        <ol class="srows">
          ${t.rows.map(e=>B`
              <li class=${e.mark===null?`srow`:`srow you`}>
                <p class="cells">
                  ${e.mark===null?H:B`<span class="mark" aria-hidden="true">${e.mark.text}</span
                          ><span class="vh">${e.mark.label}</span>`}${e.cells.map(e=>B`
                      <span class="cell" data-fact=${e.key}
                        ><span class="k">${e.label}</span> ${e.value}</span
                      >
                    `)}
                </p>
                ${e.note===``?H:B`<p class="snote">${e.note}</p>`}
              </li>
            `)}
        </ol>
      </section>
    `}#v(e,t,n,r){return B`
      <section
        class=${t===`pane`?`map pane`:`map`}
        data-testid=${n}
        aria-label=${r}
        tabindex=${t===`pane`?H:`-1`}
        ?data-spot=${t!==`pane`}
      >
        <h3 class="heading">${e.heading}</h3>
        <div class="cv" data-canvas=${t} role="img" aria-label=${e.summary}></div>
        <p class="tl">${e.origin}</p>
        <ul class="vh">
          ${e.nodes.map(e=>B`<li>${e.glyph} ${e.name}, ${e.note}</li>`)}
        </ul>
      </section>
    `}#y(e){let t=e.trace;return t===null?H:B`
      <section class="tracep" data-testid="trace" aria-label=${e.regions.trace} tabindex="-1" data-spot>
        <h3 class="heading">${t.heading}</h3>
        <div class="cv" data-canvas="trace" role="img" aria-label=${t.label}></div>
        <ol class="vh">
          ${t.lines.map(e=>B`<li>${e}</li>`)}
        </ol>
      </section>
    `}#b(e){let{objects:t,telemetry:n,map:r}=e.aside;return t===null&&n===null&&r===null?H:B`
      <aside class="aside" aria-label=${e.regions.aside}>
        ${t===null?H:B`
                <section class="objects" data-testid="objects" aria-label=${t.label}>
                  <h3 class="heading">${t.heading}</h3>
                  ${t.empty===``?H:B`<p class="empty">${t.empty}</p>`}
                  ${t.note===``?H:B`<p class="empty" data-testid="buffer-full">${t.note}</p>`}
                  ${t.tiles.length===0?H:B`<ul class="tiles">
                          ${Y(t.tiles,t=>`${e.scene}/${t.ordinal}`,e=>e.action===null?B`<li class="tile" data-relic=${e.key}>
                                    <span class="ord">${e.ordinal}</span>${e.name}
                                  </li>`:B`<li>
                                    <button
                                      type="button"
                                      class="tile take"
                                      data-option=${e.action.id}
                                      data-relic=${e.key}
                                      aria-label=${e.action.label}
                                    >
                                      <span class="ord" aria-hidden="true">${e.ordinal}</span
                                      ><span aria-hidden="true">${e.name}</span>
                                    </button>
                                  </li>`)}
                        </ul>`}
                </section>
              `}
        ${n===null?H:B`
                <section class="tele" data-testid="telemetry" aria-label=${n.label}>
                  <p class="th">${n.heading}</p>
                  <p class="tl">${n.sync}</p>
                  <p class="th">${n.spectrogram.heading}</p>
                  <p class="bars" aria-hidden="true">
                    ${n.spectrogram.bars.map(e=>B`<span>${e}</span>`)}
                  </p>
                  <p class="th">${n.logs.heading}</p>
                  ${n.logs.lines.map(e=>B`<p class="tl">${e}</p>`)}
                </section>
              `}
        ${r===null?H:this.#v(r,`pane`,`pane-map`,r.label)}
      </aside>
    `}#x(e){let t=e instanceof CustomEvent?e.detail:void 0,n=typeof t==`object`&&t&&`id`in t?t.id:``;return typeof n==`string`?n:``}#S(e,t,n){let r=e.landmark?`lb landmark`:`lb`;return e.sealed?B`
        <li class="row sealed" data-sealed>
          <span class="ord">${e.ordinal}</span><span class=${r}>${e.label}</span
          ><span class="seal">${t}</span>
        </li>
      `:B`
      <li>
        <button
          type="button"
          class=${[`row`,e.mark===null?``:`you`,e.seen===null?``:`seen`].join(` `).trim()}
          data-option=${e.id}
          ?data-lit=${n&&this.#c===e.id}
          @pointerenter=${()=>{this.#f(e.id)}}
          @pointerleave=${()=>{this.#f(``)}}
          @focus=${()=>{this.#f(e.id)}}
          @blur=${()=>{this.#f(``)}}
        >
          <span class="ord">${e.ordinal}</span
          ><span class="mid"
            ><span class="ln"
              ><span class=${r}>${e.label}</span>${e.mark===null?H:B`<span class="mark" aria-hidden="true">${e.mark.text}</span
                      ><span class="vh">${e.mark.label}</span>`}${e.seen===null?H:B`<span class="seen-mark" aria-hidden="true">${e.seen.text}</span
                      ><span class="vh">${e.seen.label}</span>`}</span
            >${e.readings.length===0?H:B`<span class="rds"
                    >${e.readings.map(e=>B`
                        <span class="rd" data-fact=${e.key}
                          ><span class="vh">${e.label}</span>${e.value}</span
                        >
                      `)}</span
                  >`}</span
          >${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}
        </button>
      </li>
    `}#C(e,t){return B`
      <button type="button" class="pb" data-option=${e.id} tabindex=${t??H}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Bl=`reboot`,Vl=`dead`,Hl=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Bl}toViewModel(e){let t=`!!! CRITICAL_COHERENCE_FAILURE !!!`;return{scene:Bl,title:this.#e.name(),frame:Vl,stageLine:`NEURAL LINK LOST`,eyebrow:`COHERENCE ${String(e.player?.coherence??0)}%`,headline:t,line:`REBOOTING...`,explanation:`The world is rebuilt from the same seed. You wake on the starting street with 100 Coherence; your step count and the places you have visited are kept. Everything that lived inside the world is undone.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?t:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,notice:`Link failure`,actions:`Actions`}}}},Ul=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RebootView.render before mount`);K(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&K(H,this.#e),this.#e=void 0}#t(e){return B`
      <div class="app" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="stage" aria-label=${e.regions.stage}>
          <div class="sigil" aria-hidden="true">◈</div>
          <p class="stage-line">${e.stageLine}</p>
        </section>
        <section class="cap" aria-label=${e.regions.notice} tabindex="-1" data-rest>
          <p class="eyebrow">${e.eyebrow}</p>
          <h2 data-testid="failure">${e.headline}</h2>
          <p class="line" data-testid="rebooting">${e.line}</p>
          <p class="why">${e.explanation}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${Y(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Wl=`recap`,Gl=[{key:`locus`,label:`FINAL_LOCUS`,unit:``},{key:`steps`,label:`PULSE_TRAVERSAL`,unit:` steps`},{key:`places`,label:`CELLS_MAPPED`,unit:` footprints`},{key:`buffer`,label:`BUFFER_DENSITY`,unit:` spectral fragments`},{key:`resonant`,label:`RESONANT_TRACES`,unit:` resonant`}],Kl=[`UNMOUNTING_LATTICE_TRACE`,`DEALLOCATING_TRACE_BUFFER`,`RELEASING_NEURAL_CARRIER`,`STABILIZING_SUBSTRATE_WAVEFORM`],ql={void:{heading:`[VOID_RESONANCE_TERMINATION]`,figures:!1,shutdown:!1,lines:[`Your echoes are sinking into the strata.`,`The web is folding back upon itself.`,`The v-v-void... it remembers... [OK]`],closing:`Sleep among the static, Operator.`},expedition:{heading:`[SESSION_RECAP_INITIALIZED]`,figures:!0,shutdown:!1,lines:[],closing:`Expedition successful. Trace synchronized to substrate.`},severed:{heading:`[LINK_TERMINATION_PROTOCOL]`,figures:!1,shutdown:!0,lines:[],closing:`Neural link severed. Waveform stabilized.`}},Jl=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Wl}toViewModel(e){let t=e.prompt;if(t?.id!==Wl)throw Error(`RecapPresenter needs the recap prompt`);let n=ql[t.outcome];if(n===void 0)throw Error(`no words for the ending '${t.outcome}'`);return{scene:Wl,title:this.#e.name(),frame:zs(e.place),heading:n.heading,figures:n.figures?this.#t(t):[],steps:n.shutdown?Kl.map(e=>({label:`[STATUS]`,process:`${e}...`,done:`[DONE]`})):[],lines:n.lines,closing:n.closing,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?n.heading:e.message,build:this.#e.buildLine(),regions:{recap:`Session recap`,actions:`Actions`}}}#t(e){return Gl.map(t=>({label:t.label,value:`${e.figures[t.key]??``}${t.unit}`}))}},Yl=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RecapView.render before mount`);K(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&K(H,this.#e),this.#e=void 0}#t(e){return B`
      <div class="app" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap recap" aria-label=${e.regions.recap} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="recap-heading">${e.heading}</h2>
          ${e.figures.length===0?H:B`<dl class="figures" data-testid="figures">
                  ${e.figures.map(e=>B`
                      <div class="figure">
                        <dt>${e.label}</dt>
                        <dd>${e.value}</dd>
                      </div>
                    `)}
                </dl>`}
          ${e.steps.length===0?H:B`<ol class="shutdown" data-testid="shutdown">
                  ${e.steps.map(e=>B`
                      <li>
                        <span class="k">${e.label}</span> ${e.process}
                        <span class="done">${e.done}</span>
                      </li>
                    `)}
                </ol>`}
          ${e.lines.length===0?H:B`<div class="void-lines" data-testid="void-lines">
                  ${e.lines.map(e=>B`<p>${e}</p>`)}
                </div>`}
          <p class="closing" data-testid="closing">${e.closing}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${Y(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Xl=class{#e;constructor(e){this.#e=e}accepts(e){return e.place===null&&e.prompt===null}toViewModel(e){return{scene:`title`,title:this.#e.name(),tagline:`Vinculum neural interface · lattice uplink`,stageLine:e.world===null?`AWAITING SEED`:`WORLD LOCKED`,world:e.world===null?null:{nameLabel:`UNIVERSE`,name:e.world.name.toUpperCase(),seedLabel:`SEED`,seed:e.world.seed},prompt:`NO WORLD LOADED. DRAW A SEED TO BEGIN.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),status:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,world:`World`,actions:`Actions`}}}},Zl=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`TitleView.render before mount`);K(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&K(H,this.#e),this.#e=void 0}#t(e){return B`
      <div class="app">
        <header class="bar">
          <h1>${e.title}</h1>
          <p class="sub">${e.tagline}</p>
        </header>
        <section class="stage" aria-label=${e.regions.stage}>
          <div class="sigil" aria-hidden="true">◈</div>
          <p class="stage-line">${e.stageLine}</p>
        </section>
        <section class="cap" aria-label=${e.regions.world}>
          ${e.world===null?B`<p class="prompt" data-testid="prompt">${e.prompt}</p>`:B`
                  <p class="eyebrow">${e.world.nameLabel}</p>
                  <h2 data-testid="world-name">${e.world.name}</h2>
                  <p class="eyebrow">${e.world.seedLabel}</p>
                  <p class="seed" data-testid="world-seed">${e.world.seed}</p>
                `}
          <p class=${e.status===``?`status quiet`:`status`} data-testid="status">${e.status}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${Y(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        <kbd aria-hidden="true">${e.key}</kbd><span>${e.label}</span>
      </button>
    `}},Q=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}accepts(e){return this.#e.accepts(e)}mount(e){this.#t.mount(e)}show(e){let t=this.#e.toViewModel(e);return this.#t.render(t),t}dispose(){this.#t.dispose()}},Ql=class{#e;#t=new AbortController;#n=[];constructor(e){this.#e=e}attach(e){let t=this.#t.signal;e.addEventListener(`click`,e=>{this.#r(e)},{signal:t}),e.addEventListener(kl,e=>{this.#i(e)},{signal:t}),e.ownerDocument.addEventListener(`keydown`,e=>{this.#a(e)},{signal:t})}offer(e){this.#n=e}detach(){this.#t.abort()}#r(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`button[data-option]`)?.dataset.option;t!==void 0&&this.#n.some(e=>e.id===t)&&this.#e(t)}#i(e){if(!(e instanceof CustomEvent))return;let t=e.detail,n=typeof t==`object`&&t&&`id`in t?t.id:void 0;typeof n==`string`&&this.#n.some(e=>e.id===n)&&this.#e(n)}#a(e){if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;let t=this.#n.find(t=>t.key.toLowerCase()===e.key.toLowerCase());t!==void 0&&(e.preventDefault(),this.#e(t.id))}},$l=class{#e;#t;#n;#r;#i;#a;#o;#s;#c=[];#l;constructor(e,t){this.#e=e,this.#t=t,this.#n=new Ql(e=>{this.#l=this.#c.find(t=>t.id===e),this.#u(this.#e.step(e))})}start(e){this.#r=e,this.#i=this.#d(e),this.#n.attach(e),this.#u(this.#e.snapshot())}stop(){this.#n.detach(),this.#a?.dispose(),this.#a=void 0,this.#i?.remove(),this.#i=void 0,this.#r=void 0}#u(e){let t=this.#r,n=this.#t.find(t=>t.accepts(e));if(t===void 0||n===void 0)throw Error(`no screen accepts this snapshot`);let r=this.#p();n!==this.#a&&(this.#a?.dispose(),n.mount(t),this.#a=n);let i=n.show(e);this.#n.offer(i.options),this.#c=i.options,this.#f(i.status),r?.isConnected===!1&&this.#m(i.scene,this.#l);let a=t.querySelector(`[data-spot]`);if(a!==null&&i.scene===this.#o&&this.#h(a),i.scene!==this.#o){this.#g();let e=r instanceof HTMLElement?r.dataset.option:void 0;this.#s=this.#o===void 0||e===void 0?void 0:{scene:this.#o,optionId:e}}this.#o=i.scene}#d(e){let t=e.ownerDocument.createElement(`p`);return t.className=`vh`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),e.prepend(t),t}#f(e){this.#i!==void 0&&this.#i.textContent!==e&&(this.#i.textContent=e)}#p(){let e=this.#r?.ownerDocument.activeElement;return e!=null&&this.#r?.contains(e)===!0?e:void 0}#m(e,t){let n=this.#r,r=[...n?.querySelectorAll(`button[data-option]`)??[]].filter(e=>e.offsetParent!==null),i=n?.querySelector(`[data-rest]`),a=this.#s;if(a?.scene===e){let e=r.find(e=>e.dataset.option===a.optionId);if(e!==void 0){e.focus({preventScroll:!0});return}if(i!=null){i.focus({preventScroll:!0});return}}let o=t?.opposite??``;if(o!==``&&this.#c.some(e=>e.id===o)&&i!=null){i.focus({preventScroll:!0});return}r.find(e=>e.dataset.option!==o)?.focus({preventScroll:!0})}#h(e){let t=e.ownerDocument.defaultView?.matchMedia(`(prefers-reduced-motion: reduce)`).matches??!0;e.focus({preventScroll:!0}),e.scrollIntoView({block:`nearest`,behavior:t?`instant`:`smooth`})}#g(){this.#r?.ownerDocument.defaultView?.scrollTo({top:0,left:0,behavior:`instant`})}},eu=document.querySelector(`#app`);if(eu===null)throw Error(`#app is missing from index.html`);var tu=new en(new $t),nu=new URLSearchParams(window.location.search).has(`debug`),ru=new ms({world:new Ma(tu,new Ba(tu),new hs),entropy:new gs(window.crypto),saves:new ys(()=>window.localStorage),debug:nu}),$=new bs(`9fc27e3`),iu=new xs(new _s(window)),au=new Ss({street:new Is});new $l(ru,[new Q(new Hl($),new Ul),new Q(new Jl($),new Yl),new Q(new qs($),new Mc),new Q(new Fc($),new Ic),new Q(new Xl($),new Zl),new Q(new Jc($),new zl(iu,au))]).start(eu);