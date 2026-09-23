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
`,ee=`Salon
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
`,te=`Slab
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
`,ne=`Hub
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
`,re=`Pod
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
`,ie=`Shell
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
`,ae=`Pavilion
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
`,oe=`Void
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
`,se=`Forum
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
`,ce=`small
medium
large
`,le=`Arcology
Mega-Structure
Spire
Sky-Anchor
Bastion
Citadel
`,ue=`Block
Plaza
Heights
Center
Complex
`,de=`Annex
Cell
Unit
Pod
Hut
Point
`,fe=`Silver
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
`,pe=`head
tail
`,me=`town
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
`,he=`Arid
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
`,ge=`prefix
core
suffix
`,_e=`The United
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
`,ve=`Republic
Kingdom
Empire
Federation
Sovereignty
Union
Territories
Lands
Domain
`,ye=`Alpha
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
`,be=`greek
type
`,xe=`Strand
Thread
Web
Link
Sync
Stream
Flow
Pulse
`,Se=`lobby
peak
`,Ce=`TRANSIT_LOBBY
`,we=`PEAK_OBSERVATORY
`,Te=`MECHANICAL_SUMP
STORAGE_CELL
POWER_RELAY
FILTRATION_INTAKE
`,Ee=`EXECUTIVE_SUITE
NEURAL_UPLINK
DATA_VAULT
VIP_QUARTERS
`,De=`basement
living
executive
`,Oe=`LIVING_UNIT
RESEARCH_LAB
HYDROPONIC_BAY
BIO_SERVER
`,ke=`Ter
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
`,Ae=`head
tail
`,je=`ra
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
`,Me=`Hydroponic Bay||stillness
Spore Farm||stillness
Oxygen Sump||stillness
Growth Chamber||stillness
`,Ne=`Prayer Hall||stillness
Ritual Chamber||stillness
Archive||stillness
Memory Well||frost
`,Pe=`Trading Floor||stillness
Logic Market||stillness
Credit Hub||humming
Supply Node||clicking
`,Fe=`Power Plant||ozone
Processing Core||ozone
Maintenance Bay||clicking
Fuel Depot||humming
`,Ie=`Security Station|burned DANGER|clicking
Barracks||humming
Armory|burned DANGER|clicking
Tactical Hub||humming
`,Le=`Laboratory|stamped DATA_VAULT|ozone
Neural Link Array||ozone
Observation Deck||stillness
Bio-Server|stamped DATA_VAULT|ozone
`,Re=`Outer
Inner
Core
Rim
Void
Prime
Secondary
Tertiary
Quaternary
`,ze=`descriptor
noun
`,Be=`Sector
Quadrant
Grid
Matrix
Zone
Region
Reach
Expanse
`,Ve=`prefix
suffix
`,He=`Alpha
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
`,Ue=`Prime
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
`,We=`High
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
`,Ge=`adjective
noun
`,Ke=`Way
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
`,qe=`a single flickering green bulb
pulsing red emergency strobes
unshielded sparking conduits
the dim glow of dying data-cores
harsh sodium-yellow glare
complete darkness punctuated by blue static
the rhythmic blink of a foundation-alarm
cold moonlight-simulations through ceiling-cracks
`,Je=`the warm cathode glow of a CRT monitor
flickering fluorescent tubes with a distinct hum
the orange pulse of vacuum tubes
buzzing neon signage leaking green light
dim yellow incandescent bulbs on frayed wires
the flicker of a slide projector left cycling
a desk lamp with a bent green shade
the amber glow of a radio dial
a bare bulb behind a cracked lampshade
the phosphor trace of an oscilloscope
`,Ye=`the flickering flame of oil lamps
guttering beeswax candles
harsh sunlight filtered through dust
low-burning embers in a stone hearth
pale moonlight through a narrow aperture
guttering tallow candles in iron sconces
embers breathing in a clay hearth
dust-thick sunlight through a narrow slit
a single oil lamp on a stone ledge
moonlight through a broken lattice
`,Xe=`the green phosphor sweep of a radar scope
ring-shaped fluorescent tubes humming behind chrome grilles
the sickly glow of radium-painted dials
a bare bulb swinging inside a lead-lined cage
harsh flashbulb pops from a camera no one is holding
the strobe of a rotating beacon
formica gleaming under fluorescent panels
a lava lamp's slow orange churn
the pale wash of a television test pattern
a neon diner sign buzzing red
`,Ze=`the blue-white wash of a flat-panel monitor left on
status LEDs blinking green and amber along an ethernet hub
a screensaver's slow colours crawling across the ceiling
the translucent glow of a tower case lit from within
pale light leaking around a frosted glass disc
the cyan glow of a loading bar
a monitor cycling through screensaver stars
a wall of LEDs blinking out of sync
a scanner's green line sweeping the floor
the pale flicker of a failing backlight
`,Qe=`light that fades the moment you look at it
a residual glow bleeding from surfaces that no longer exist
the after-image of a lamp that has already gone out
dissolving motes of static drifting like ash
a dull heat-shimmer where the ceiling used to be
light that arrives a moment after its source
a glow with no lamp left to cast it
sunlight faded to the colour of dust
the memory of fluorescence, humming
shadows brighter than the room
`,$e=`a soft holographic haze with no visible source
laser-etched lines glowing along the seams of the floor
smart glass panels dimming and brightening on their own
the violet corona of an idle plasma coil
a drone's searchlight sweeping past the doorway
a lattice of laser threads across the ceiling
bioluminescent panels breathing slowly
the white glare of a field emitter
a hologram flickering between two rooms
light bent around a gravity plate
`,et=`abyssal
analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,tt=`the intense white arc of a welding torch
humming mercury-vapor lamps
cold sodium-glare reflecting off soot
pulsing red emergency strobes
the steady burn of gas-lanterns
a foundry glow through smoked glass
carbide lamps hissing on hooks
a wall of gauges lit from behind
sparks arcing from an open junction
oil lamps swinging on a chain
`,nt=`shifting quantum particles suspended in air
the soft, directionless glow of pure data
blinding white singularity-flashes
flickering holographic rays in various spectra
the cold blue luminescence of dark-matter cores
light folded twice before it reaches you
the blue shimmer of a probability field
a glow that is brighter when you look away
stars visible through a wall that is not there
the slow pulse of a zero-point coil
`,rt=`a sprawling grow-chamber with hanging pods
terraced geometric shelves for organic data
low-humidity storage-vault architecture
spatial grid designed for nutrient-flow
domed environment with recycled atmosphere
a humid grow-hall under banks of pink lamps
stacked hydroponic trays dripping into gutters
a seed vault of numbered steel drawers
a composting pit ringed with vents
a greenhouse with every pane fogged
`,it=`a cavernous vaulted hall
geometry designed for acoustic resonance
ornate processional pathway with high ceilings
ceremonial viewing-gallery structure
sacred geometric reconstruction
a circular nave beneath a dark dome
a hall of benches facing an empty dais
a crypt of stacked memory-urns
a bell chamber with the bell removed
a reliquary room lined with sealed niches
`,at=`a tiered trading floor beneath a dead ticker board
shuttered market stalls arranged in a strict grid
a vaulted credit hall of teller cages and pneumatic tubes
shelving-lined supply geometry with a barcode on every edge
an open atrium of kiosks lit for customers who never came
a counting room of locked drawers and ledgers
a showroom of empty plinths
a warehouse aisle of numbered crates
a ticket hall with every window shuttered
an exchange floor of dead terminals
`,ot=`a soot-blackened machine hall with catwalks overhead
pipe-choked geometry built around a single humming turbine
a maintenance pit ringed by chain hoists and drip trays
a cavernous fuel bay of riveted tanks and warning stencils
gantry-braced architecture that vibrates with every pulse
a pump room throbbing behind a steel grille
a foundry floor scarred by cooled spills
a control gallery over a silent line
a coal bunker with a sloping floor
a compressor hall lined with gauges
`,st=`a cramped, blast-shielded alcove
reinforced bunker-like geometry
spatial cell with tactical telemetry projected on the floor
narrow kill-zone corridor layout
armored transit-node architecture
a briefing room with the map torn down
a magazine of empty racks and chains
a watch post with a slit for a window
a gas-lock chamber with two sealed doors
a drill floor marked in faded lines
`,ct=`a sterile, hyper-clean laboratory cell
geometry optimized for spectral observation
sprawling containment unit with glass partitions
data-rich environment with floating schematics
modular experimental subspace
a clean room behind a double airlock
an archive of slide drawers and lamps
an observation cell walled in one-way glass
a specimen vault of frosted jars
a calibration bay of silent instruments
`,lt=`geometry that folds back into itself at the corners
a non-Euclidean chamber whose far wall is also its floor
a probability-field cell that resolves only while observed
space stretched thin around a dormant quantum core
a time-dilated alcove where echoes arrive before their source
a corridor that ends where it began
a room whose ceiling is another floor
a stairwell that descends into its own top
an alcove folded inside a larger alcove
a chamber lit by its own reflection
`,ut=`a cavernous brutalist vault
geometry designed for substrate-pressure
massive maintenance sub-void
foundation pit with echoing depths
unfinished spatial segment
recursively deepening concrete shaft
oppressive low-ceiling transit-node
forgotten infrastructure cell
`,dt=`abyssal
Agricultural
Ceremonial
Commercial
Industrial
Military
Research
Singularity
`,ft=`raw pour-concrete
rusted rebar
vibrating metal plates
exposed heavy cabling
moist, dark aggregate
black oily tiles
heavily weathered granite
oxidized iron plating
`,pt=`silk damask with gold thread
heavy mahogany paneling
plaster with crumbling frescoes
velvet-lined stonework
gilded ivory slabs
stone tracery over faded frescoes
dark oak panels carved with vines
gilt mouldings peeling from plaster
cold flagstone under tapestries
stained glass set into black iron
`,mt=`velvet-flocked wallpaper above mahogany wainscoting
brass-framed panels of etched crystal
silk tapestries hung over gilt plaster
clock-mechanism friezes in tarnished brass
mirrored panels in ornate gold-leaf frames
wallpaper of interlocking clock faces
mahogany cabinets glazed with crystal
panels of tooled leather and brass studs
cream plaster with gilded cornices
mirrored alcoves behind velvet ropes
`,ht=`unyielding obsidian blocks
matte-black composite plating
brutalist concrete with geometric grooves
featureless grey ceramic
seamless dark alloy
matte basalt slabs with no visible mortar
dark composite panels etched with a grid
polished grey stone that swallows echoes
seamless black alloy, faintly warm
hexagonal ceramic tiles, unbroken
`,gt=`flickering acrylic panels
exposed wiring behind translucent plastic
projected holographic static
humming glass conduits
backlit mirrored surfaces
wet-look acrylic streaked with pink light
glass block lit from within
panels of dead advertising screens
corrugated plastic over flickering tubes
mirrored strips under a violet wash
`,_t=`pulsing sinew and bone-like struts
translucent membrane over fluid-filled sacks
hardened chitinous plates
woven vine-lattices with moss overgrowth
calcified shell-fragments
ribbed cartilage that flexes as you pass
damp membrane veined with light
overlapping scales the colour of bone
a lattice of roots grown through plaster
soft fungal shelves in tiers
`,vt=`corrugated sheets bolted over crumbling brick
flaking industrial paint over pitted iron
welded scrap plates streaked with orange oxide
oil-stained concrete cracked down to the rebar
chain-link mesh stretched over rusted girders
oxide-streaked steel with weeping seams
patched sheet metal over brick
iron plating bubbled with corrosion
soot-black concrete and rusted mesh
warped girders behind tarpaulin
`,yt=`shoji screens of paper stretched over cedar
lacquered panels painted with cranes and mist
plaster stained by the smoke of a thousand lanterns
woven bamboo lattice over dark timber
vermilion pillars framing calligraphy scrolls
dark cedar beams over white plaster
sliding panels painted with pines
bamboo slats and rice-paper light
black lacquer inlaid with mother-of-pearl
stacked stone under a tiled eave
`,bt=`seamless white surfaces with no visible joins
perfectly matte panels that swallow every shadow
glass so clear it reads as open air
white light strips set flush into featureless plaster
silent, unmarked panels that hum when touched
white panels with no seams or shadows
frosted glass lit evenly from nowhere
matte surfaces that refuse a reflection
pale plaster, absolutely silent
a curved wall with no corner to find
`,xt=`fluted marble columns set into alabaster
sun-bleached limestone carved with laurel friezes
ivory-veined marble polished to a mirror
weathered travertine blocks joined without mortar
painted plaster of sandaled figures in procession
white marble veined with gold
fluted columns between painted panels
limestone blocks carved with olive wreaths
travertine warmed by an unseen sun
bronze plaques set into alabaster
`,St=`white
blue
pink
gray
purple
orange
green
red
`,Ct=`overturned
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
`,wt=`obsidian shard
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
`,Tt=`stone gargoyle
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
`,Et=`velvet armchair
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
`,Dt=`abyssal
baroque
gilded
monolith
neon
organic
rust
shogun
void
zenith
`,Ot=`obsidian cube
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
`,kt=`flickering light tube
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
`,At=`chitinous plate
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
`,jt=`corrugated metal sheet
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
`,Mt=`shoji screen
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
`,Nt=`floating white sphere
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
`,Pt=`marble pillar
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
`,Ft=`A long corridor with multiple doors
A narrow service corridor, doors set flush into either wall
A curved gallery of doors beneath a single strip of light
A dead-straight corridor whose far end dissolves into static
`,It=`The air hums with the resonance of {culture} geometry.
{culture} geometry presses in from every wall; the elevator sighs shut behind you.
A landing of {culture} design, silent except for the lift cables ticking overhead.
The floor plate resonates faintly with {culture} architecture.
`,Lt=`corridor
floor
`,Rt=`inscriptions
materials
states
`,zt=`VOID_SINK
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
`,Bt=`Heavy Bulkhead|A heavily reinforced poly-slab bulkhead.
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
`,Vt=`Vibrating|The surface is vibrating with a low-frequency thrum.
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
`,Ht=`colours
conditions
planet-frames
traits
`,Ut=`baroque|yellow
gilded|white
monolith|cyan
neon|bright-cyan
organic|green
rust|red
shogun|magenta
void|grey
zenith|blue
`,Wt=`crt monitor
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
`,Gt=`clay pot
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
`,Kt=`chrome tailfin
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
`,qt=`translucent blue shell
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
`,Jt=`dissolving edge
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
`,Yt=`hologram projector
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
`,Xt=`analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,Zt=`pressure gauge
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
`,Qt=`shifting geometry
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
`,$t=`Ceremonial
Military
Industrial
Agricultural
Research
Commercial
`,en=class{#e;constructor(){this.#e=Object.assign({"./names/buildings/adj/abyssal.txt":e,"./names/buildings/adj/baroque.txt":t,"./names/buildings/adj/gilded.txt":n,"./names/buildings/adj/monolith.txt":r,"./names/buildings/adj/neon.txt":i,"./names/buildings/adj/organic.txt":a,"./names/buildings/adj/rust.txt":o,"./names/buildings/adj/shogun.txt":s,"./names/buildings/adj/void.txt":c,"./names/buildings/adj/zenith.txt":l,"./names/buildings/compounds.txt":u,"./names/buildings/concepts.txt":d,"./names/buildings/index.txt":f,"./names/buildings/landmarks.txt":p,"./names/buildings/noun/abyssal.txt":m,"./names/buildings/noun/baroque.txt":h,"./names/buildings/noun/gilded.txt":ee,"./names/buildings/noun/monolith.txt":te,"./names/buildings/noun/neon.txt":ne,"./names/buildings/noun/organic.txt":re,"./names/buildings/noun/rust.txt":ie,"./names/buildings/noun/shogun.txt":ae,"./names/buildings/noun/void.txt":oe,"./names/buildings/noun/zenith.txt":se,"./names/buildings/sizes/index.txt":ce,"./names/buildings/sizes/large.txt":le,"./names/buildings/sizes/medium.txt":ue,"./names/buildings/sizes/small.txt":de,"./names/city/head.txt":fe,"./names/city/index.txt":pe,"./names/city/tail.txt":me,"./names/country/core.txt":he,"./names/country/index.txt":ge,"./names/country/prefix.txt":_e,"./names/country/suffix.txt":ve,"./names/filament/greek.txt":ye,"./names/filament/index.txt":be,"./names/filament/type.txt":xe,"./names/floors/index.txt":Se,"./names/floors/lobby.txt":Ce,"./names/floors/peak.txt":we,"./names/floors/zones/basement.txt":Te,"./names/floors/zones/executive.txt":Ee,"./names/floors/zones/index.txt":De,"./names/floors/zones/living.txt":Oe,"./names/planet/head.txt":ke,"./names/planet/index.txt":Ae,"./names/planet/tail.txt":je,"./names/rooms/Agricultural.txt":Me,"./names/rooms/Ceremonial.txt":Ne,"./names/rooms/Commercial.txt":Pe,"./names/rooms/Industrial.txt":Fe,"./names/rooms/Military.txt":Ie,"./names/rooms/Research.txt":Le,"./names/sector/descriptor.txt":Re,"./names/sector/index.txt":ze,"./names/sector/noun.txt":Be,"./names/solar-system/index.txt":Ve,"./names/solar-system/prefix.txt":He,"./names/solar-system/suffix.txt":Ue,"./names/street/adjective.txt":We,"./names/street/index.txt":Ge,"./names/street/noun.txt":Ke,"./themes/atmosphere/lighting/abyssal.txt":qe,"./themes/atmosphere/lighting/analog.txt":Je,"./themes/atmosphere/lighting/ancient.txt":Ye,"./themes/atmosphere/lighting/atomic.txt":Xe,"./themes/atmosphere/lighting/digital.txt":Ze,"./themes/atmosphere/lighting/entropic.txt":Qe,"./themes/atmosphere/lighting/future.txt":$e,"./themes/atmosphere/lighting/index.txt":et,"./themes/atmosphere/lighting/industrial.txt":tt,"./themes/atmosphere/lighting/singularity.txt":nt,"./themes/atmosphere/structures/Agricultural.txt":rt,"./themes/atmosphere/structures/Ceremonial.txt":it,"./themes/atmosphere/structures/Commercial.txt":at,"./themes/atmosphere/structures/Industrial.txt":ot,"./themes/atmosphere/structures/Military.txt":st,"./themes/atmosphere/structures/Research.txt":ct,"./themes/atmosphere/structures/Singularity.txt":lt,"./themes/atmosphere/structures/abyssal.txt":ut,"./themes/atmosphere/structures/index.txt":dt,"./themes/atmosphere/walls/abyssal.txt":ft,"./themes/atmosphere/walls/baroque.txt":pt,"./themes/atmosphere/walls/gilded.txt":mt,"./themes/atmosphere/walls/monolith.txt":ht,"./themes/atmosphere/walls/neon.txt":gt,"./themes/atmosphere/walls/organic.txt":_t,"./themes/atmosphere/walls/rust.txt":vt,"./themes/atmosphere/walls/shogun.txt":yt,"./themes/atmosphere/walls/void.txt":bt,"./themes/atmosphere/walls/zenith.txt":xt,"./themes/colours.txt":St,"./themes/conditions.txt":Ct,"./themes/cultures/abyssal.txt":wt,"./themes/cultures/baroque.txt":Tt,"./themes/cultures/gilded.txt":Et,"./themes/cultures/index.txt":Dt,"./themes/cultures/monolith.txt":Ot,"./themes/cultures/neon.txt":kt,"./themes/cultures/organic.txt":At,"./themes/cultures/rust.txt":jt,"./themes/cultures/shogun.txt":Mt,"./themes/cultures/void.txt":Nt,"./themes/cultures/zenith.txt":Pt,"./themes/descriptions/corridor.txt":Ft,"./themes/descriptions/floor.txt":It,"./themes/descriptions/index.txt":Lt,"./themes/doors/index.txt":Rt,"./themes/doors/inscriptions.txt":zt,"./themes/doors/materials.txt":Bt,"./themes/doors/states.txt":Vt,"./themes/index.txt":Ht,"./themes/planet-frames.txt":Ut,"./themes/timelines/analog.txt":Wt,"./themes/timelines/ancient.txt":Gt,"./themes/timelines/atomic.txt":Kt,"./themes/timelines/digital.txt":qt,"./themes/timelines/entropic.txt":Jt,"./themes/timelines/future.txt":Yt,"./themes/timelines/index.txt":Xt,"./themes/timelines/industrial.txt":Zt,"./themes/timelines/singularity.txt":Qt,"./themes/traits.txt":$t})}read(e){return this.#e[`./${e}`]}paths(){return Object.keys(this.#e).map(e=>e.replace(/^\.\//,``))}},tn=class{#e;#t=new Map;constructor(e){this.#e=e}index(e){return this.list(`${e}/index`)}has(e){return this.#t.has(e)||this.#e.read(`${e}.txt`)!==void 0}list(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#n(`${e}.txt`);return this.#t.set(e,n),n}pairs(e){return this.list(e).map(t=>{let n=t.indexOf(`|`);if(n<0)throw Error(`content file ${e}.txt: '${t}' is not a key|value line`);return[t.slice(0,n).trim(),t.slice(n+1).trim()]})}#n(e){let t=this.#e.read(e);if(t===void 0)throw Error(`content file is missing: ${e}`);let n=t.split(/\r?\n/).map(e=>e.trim()).filter(e=>e!==``);if(n.length===0)throw Error(`content file has no entries: ${e}`);return Object.freeze(n)}},nn=/^0(\.(0|[1-9]\d*))*$/,g=class e{#e;constructor(e){for(let t of e)if(!Number.isSafeInteger(t)||t<0)throw RangeError(`a child index is a whole number from zero up, got ${String(t)}`);this.#e=Object.freeze([...e])}static parse(t){if(!nn.test(t))return;let n=t.split(`.`).slice(1).map(Number);return n.every(e=>Number.isSafeInteger(e))?new e(n):void 0}child(t){return new e([...this.#e,t])}parent(){return this.#e.length===0?void 0:new e(this.#e.slice(0,-1))}indices(){return this.#e}depth(){return this.#e.length}equals(e){return this.toString()===e.toString()}toString(){return[`0`,...this.#e.map(String)].join(`.`)}},rn=1e3,an=100*rn-1,_=class{#e;#t;constructor(e){this.#e=e}callSign(){return this.name()}ordinal(){return this.index()+1}goesByNumber(){return!1}facts(){return[]}readings(){return[]}listing(){return this.children()}admits(e){return this.listing().includes(e)}arrival(){return this}arrive(){let e=this.arrival();return e===this?this:e.arrive()}current(){return!1}exit(){return this.parent()?.arrival()}leave(){return this.exit()}leaveLabel(){return`Leave ${this.kind().title()}`}moves(){return[]}move(e){if(this.moves().some(t=>t.id===e))throw Error(`${this.kind().key()} offers the move '${e}' but does not make it`)}remember(){}recall(e){return e===this.remember()}startOfJourney(){return this.children()[0]?.startOfJourney()??this}sealed(){return!1}landmark(){return!1}contents(){return null}scan(e){}scanned(e){return[]}sensed(){return``}findRelic(e){return this.contents()?.objects.find(t=>t.key()===e)}capture(e){if(this.contents()?.objects[e]!==void 0)throw Error(`${this.kind().key()} holds things but does not hand them over`)}drop(e){if(this.contents()!==null)throw Error(`${this.kind().key()} holds things but takes none in (${e.name()})`);return!1}lottery(e){}echo(){}sample(){this.parent()?.sample()}infuse(){this.parent()?.infuse()}forge(e){return this.parent()?.forge(e)}keystone(){return this.parent()?.keystone()}prime(){return this.parent()?.prime()??!1}breachOffered(e){return!1}breach(e){}abyssal(){return this.parent()?.abyssal()??!1}peers(){return this.parent()?.children()??[]}root(){return this.parent()?.root()??this}indoors(){return this.parent()?.indoors()??!1}drainFactor(){return this.parent()?.drainFactor()??1}vibe(){return this.parent()?.vibe()}drainEra(){return this.vibe()?.era()}landmarkFactor(){return this.parent()?.landmarkFactor()??1}seed(){return this.#e.seed}parent(){return this.#e.parent}index(){return this.#e.index}address(){return this.parent()?.address().child(this.index())??new g([])}depth(){return this.address().depth()}hash(){let e=this.seed().branch(`coords`),t=t=>(e.branch(t).range(0,an)/rn).toFixed(3);return`${t(`x`)} / ${t(`y`)}`}trail(){return[...this.parent()?.trail()??[],this]}children(){return this.#t??=Object.freeze([...this.#e.children.childrenOf(this)]),this.#t}populated(){return this.#t!==void 0}descendant(e){if(!this.sealed())return e.indices().slice(this.depth()).reduce((e,t)=>{let n=e?.children()[t];return n?.sealed()===!0?void 0:n},this)}locate(e){return e.indices().slice(this.depth()).reduce((e,t)=>e?.children()[t],this)}},v=class{#e;#t;#n;#r;constructor(e){this.#e=e.key,this.#t=e.title,this.#n=e.icon,this.#r=e.indexLabel}key(){return this.#e}title(){return this.#t}icon(){return this.#n}indexLabel(){return this.#r}equals(e){return this.#e===e.#e}},on=new v({key:`apartment`,title:`Apartment`,icon:`🚪`,indexLabel:`UNIT`}),sn=`dealt`,cn=class extends _{#e;#t;#n;#r;#i;#a;#o;constructor(e,t){super(e),this.#e=t.door,this.#t=t.behind,this.#n=t.culture,this.#r=t.era,this.#i=t.anomaly,this.#a=t.rooms,this.#o=Object.freeze([...t.relics])}kind(){return on}name(){return this.#e.description()}door(){return this.#e}behind(){return this.#t}culture(){return this.#n}era(){return this.#r}anomaly(){return this.#i}roomCount(){return this.#a}relics(){return this.#o}relicsIn(e){return this.#o.filter((t,n)=>this.seed().branch(sn).branch(n).range(0,this.#a-1)===e)}arrival(){return this.children()[0]??this}readings(){return[{key:`narrative`,label:`APPEARANCE`,value:this.#e.narrative()}]}scanned(){return[{key:`signal`,label:`TRACE`,value:this.#e.trace().name()},{key:`alert`,label:`INSCRIPTION`,value:this.#e.inscription()?.formatted()??``},{key:`reading`,label:`MATERIAL`,value:this.#e.material()},{key:`reading`,label:`STATE`,value:this.#e.state()},{key:`zone`,label:`ROOM_TYPE`,value:this.#t.name()}]}sensed(){return this.#e.sensed()}scan(e){return{title:`[STRATA_OVERVIEW]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:t,current:!1,note:``}))}}description(){return[]}facts(){return this.#i?[{key:`alert`,label:`TEMPORAL_ANOMALY_DETECTED`,value:`[!]`}]:[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#r.key()}]}status(){return this.#i?`ATMOS: [UNSTABLE]`:`ATMOS: [NOMINAL]`}childrenHeading(){return`Internal cells detected:`}approachVerb(){return`Enter Room:`}},ln=new v({key:`crypt`,title:`Crypt`,icon:`🚪`,indexLabel:`UNIT`}),un=class extends cn{kind(){return ln}facts(){return[{key:`alert`,label:`ABYSSAL_RESONANCE`,value:`DETECTED`}]}status(){return`ATMOS: [PRESSURE_HIGH]`}},dn=`hidden`,fn=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.steps,this.#n=e.frequency}key(){return`${dn}(${this.#e.toString()}@${String(this.#t)})`}name(){return`Hidden Frequency`}frequency(){return this.#n}resonant(){return!1}data(){return{kind:dn,from:this.#e.toString(),steps:this.#t}}},pn=`hybrid`,mn=`-`,hn=` Hybrid`,gn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return`${pn}(${this.#e.key()}+${this.#t.key()})`}name(){let e=e=>e.name().split(` `)[0]??``;return`${e(this.#e)}${mn}${e(this.#t)}${hn}`}frequency(){return this.#e.frequency().plus(this.#t.frequency())}resonant(){return this.frequency().resonant()}data(){return{kind:pn,parts:[this.#e.data(),this.#t.data()]}}},_n=11,vn={times:11,over:10},yn=class e{#e;constructor(e){if(!Number.isInteger(e)||e<0)throw RangeError(`a frequency is a whole number of hertz from zero up, got ${String(e)}`);this.#e=e}hertz(){return this.#e}plus(t){return new e(this.#e+t.#e)}amplified(){return new e(Math.floor(this.#e*vn.times/vn.over))}resonant(){return this.#e>0&&this.#e%_n===0}equals(e){return this.#e===e.#e}},bn=`keystone`,xn=new yn(0),Sn=class{#e;#t;constructor(e){this.#e=e.name,this.#t=e.building}key(){return`${bn}(${this.#t.toString()})`}name(){return this.#e}frequency(){return xn}resonant(){return!1}building(){return this.#t}data(){return{kind:bn,building:this.#t.toString()}}},Cn=`relic`,wn=class{#e;constructor(e){this.#e=e}facts(){return this.#e}key(){return this.#e.relic.key()}name(){return this.#e.relic.name()}frequency(){return this.#e.frequency}resonant(){return this.#e.resonant}from(){return this.#e.from}data(){return{kind:Cn,from:this.#e.from.toString(),key:this.#e.relic.key()}}},Tn=`echo`,En=class{#e;#t;constructor(e){this.#e=e.from,this.#t=e.frequency}key(){return`${Tn}(${this.#e.toString()})`}name(){return`Spectral Echo`}frequency(){return this.#t}resonant(){return!1}data(){return{kind:Tn,from:this.#e.toString()}}};function Dn(e,t){if(typeof t!=`string`)return;let n=g.parse(t);return n===void 0?void 0:e.locate(n)}function On(e){if(Array.isArray(e))return`[${e.map(On).join(`,`)}]`;if(typeof e==`object`&&e){let t=e;return`{${Object.keys(t).sort().map(e=>`${JSON.stringify(e)}:${On(t[e])}`).join(`,`)}}`}return JSON.stringify(e)}var kn={[Cn]:({from:e,key:t},n)=>typeof t==`string`?Dn(n,e)?.findRelic(t):void 0,[pn]:({parts:e},t,n)=>{if(!Array.isArray(e)||e.length!==2)return;let[r,i]=e,a=n.read(r,t),o=n.read(i,t);return a===void 0||o===void 0?void 0:new gn(a,o)},[bn]:({building:e},t)=>Dn(t,e)?.keystone(),[dn]:({from:e,steps:t},n)=>typeof t==`number`?Dn(n,e)?.lottery(t):void 0,[Tn]:({from:e},t)=>Dn(t,e)?.echo()?.fragment()},An=class{read(e,t){if(typeof e!=`object`||!e||Array.isArray(e))return;let n=e,r=(typeof n.kind==`string`?kn[n.kind]:void 0)?.(n,t,this);if(r!==void 0)return On(r.data())===On(n)?r:void 0}readAll(e,t){if(!Array.isArray(e))return;let n=[];for(let r of e){let e=this.read(r,t);if(e===void 0)return;n.push(e)}return n}},jn=new Set([`a`,`e`,`i`,`o`,`u`]),Mn=97,Nn=new Set([11,22,33]),Pn=class{#e;constructor(e){let t=0;for(let n of e.toLowerCase())n<`a`||n>`z`||jn.has(n)||(t+=n.charCodeAt(0)-Mn+1);this.#e=t}sum(){return this.#e}master(){return Nn.has(this.#e)}frequencyAt(e){return new yn((this.master()?this.#e*2:this.#e)*e)}},Fn=Array.from(`█▓▒░/\\%!$#*`),In=class{mangle(e,t,n){return Array.from(e,(e,r)=>e===` `||e===`
`||!n.branch(r).probability(t)?e:n.branch(r).pick(Fn)).join(``)}},Ln=class{#e;constructor(e){this.#e=new Map(e.map(e=>[e.move.id,e]))}offered(e){return[...this.#e.values()].filter(t=>t.to(e)!==void 0).map(e=>e.move)}make(e,t){let n=this.#e.get(t),r=n?.to(e);return n!==void 0&&r!==void 0&&n.act?.(e),r}},Rn=new v({key:`room`,title:`Room`,icon:`□`,indexLabel:`CELL`}),zn=new In,Bn={structure:.2,walls:.1,lighting:.3},Vn=`static`,Hn=new An,Un=`action`,Wn=.3,Gn={min:1e6,max:9999999},Kn={resonant:`≈≈≈`,plain:`~~~`,degraded:`###`},qn=new Ln([{move:{id:`back`,label:`Go back`,opposite:`forward`},to:e=>e.neighbour(-1)},{move:{id:`forward`,label:`Go forward`,opposite:`back`},to:e=>e.neighbour(1)}]),Jn=class extends _{#e;#t;#n;#r;#i;#a;#o=[];#s=[];constructor(e,t){super(e),this.#e=e.parent,this.#t=t.name,this.#n=t.category,this.#r=t.atmosphere,this.#i=t.traits,this.#a=Object.freeze([...t.furniture])}kind(){return Rn}name(){return this.#t}type(){return this.#n.name()}category(){return this.#n}oxygen(){return this.#i.oxygen}temperature(){return this.#i.temperature}signal(){return this.#i.signal}atmosphere(){return this.#r}furniture(){return this.#a}objects(){return[...this.#c().map(e=>this.#l(e)),...this.#s]}contents(){return{objects:this.objects(),furniture:this.furniture()}}findRelic(e){let t=this.#e.relicsIn(this.index()).find(t=>t.key()===e);return t===void 0?void 0:this.#l(t)}capture(e){let t=this.#c();if(!Number.isInteger(e)||e<0)return;if(e<t.length){let n=t[e];return n===void 0?void 0:(this.#o.push(n.key()),{fragment:this.#l(n),fresh:!0})}let[n]=this.#s.splice(e-t.length,1);return n===void 0?void 0:{fragment:n,fresh:!1}}drop(e){return this.#s.push(e),!0}remember(){if(this.#o.length!==0||this.#s.length!==0)return JSON.stringify({taken:this.#o,dropped:this.#s.map(e=>e.data())})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{taken:n,dropped:r,...i}=t;if(Object.keys(i).length>0||!Array.isArray(n))return!1;let a=n,o=new Set(this.#e.relicsIn(this.index()).map(e=>e.key()));if(!a.every(e=>typeof e==`string`&&o.has(e))||new Set(a).size!==a.length)return!1;let s=Hn.readAll(r,this.root());return s===void 0||a.length===0&&s.length===0?!1:(this.#o.splice(0,this.#o.length,...a),this.#s.splice(0,this.#s.length,...s),!0)}#c(){return this.#e.relicsIn(this.index()).filter(e=>!this.#o.includes(e.key()))}#l(e){let t=this.vibe()?.culture(),n=t!==void 0&&this.#e.culture().equals(t),r=new Pn(e.name()).frequencyAt(this.depth());return new wn({relic:e,from:this.address(),frequency:n?r.amplified():r,resonant:n})}listing(){return[]}lottery(e){let t=this.seed().branch(Un).branch(e);if(t.branch(`win`).probability(Wn))return new fn({from:this.address(),steps:e,frequency:new yn(t.branch(`hertz`).range(Gn.min,Gn.max))})}scan(e){return this.#e.scan(e)}scanned(e){let t=new Pn(this.#t).frequencyAt(this.depth()),n=this.#e.anomaly()?{key:`alert`,label:`WAVE`,value:Kn.degraded}:t.resonant()?{key:`stable`,label:`WAVE`,value:Kn.resonant}:{key:`signal`,label:`WAVE`,value:Kn.plain};return[{key:`reading`,label:`FREQ`,value:`${String(t.hertz())}Hz`},n,e(this)?{key:`stable`,label:`STATUS`,value:`[VISITED]`}:{key:`reading`,label:`STATUS`,value:`[UNSTABLE]`},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`IDENTIFIER`,value:this.#t}]}neighbour(e){return this.#e.children()[this.index()+e]}moves(){return qn.offered(this)}move(e){return qn.make(this,e)}exit(){return this.index()===0?this.#e.exit():void 0}leaveLabel(){return`Exit Apartment`}description(){let{structure:e,colour:t,walls:n,lighting:r}=this.#r,i=(e,t)=>this.#e.anomaly()?zn.mangle(t,Bn[e],this.seed().branch(Vn).branch(e)):t;return[`You are in ${i(`structure`,e)}. The walls are ${t} ${i(`walls`,n)}.`,`The space is illuminated by ${i(`lighting`,r)}.`]}facts(){return[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#e.era().key()},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`OXY`,value:`${String(this.#i.oxygen)}%`},{key:`reading`,label:`TEMP`,value:`${String(this.#i.temperature)}°C`},{key:`signal`,label:`SIGNAL`,value:this.#i.signal},this.#e.anomaly()?{key:`alert`,label:`RESONANCE`,value:`[DEGRADED]`}:{key:`stable`,label:`RESONANCE`,value:`[STABLE]`}]}status(){return`ATMOS: ${String(this.#i.oxygen)}% | TEMP: ${String(this.#i.temperature)}°C`}childrenHeading(){return``}approachVerb(){return``}},Yn=new v({key:`shard`,title:`Shard`,icon:`☠`,indexLabel:`SHARD`}),Xn=class extends Jn{kind(){return Yn}leaveLabel(){return`Exit Crypt`}},Zn=new v({key:`universe`,title:`Universe`,icon:`∞`,indexLabel:`ROOT`}),Qn=class extends _{kind(){return Zn}name(){return`The Endless Universe`}description(){return[`A neural web of infinite complexity.`]}status(){return`UNIMATRIX_STABLE`}childrenHeading(){return`Primary filaments radiating from root:`}approachVerb(){return`Synchronize with`}},$n=class{nth(e,t,n){let r=this.take(e,t,n+1).at(-1);if(r===void 0)throw RangeError(`a deal always deals`);return r}take(e,t,n){if(t.length===0)throw RangeError(`a deal needs at least one item`);let r=[];for(let i=0;r.length<n;i++){let a=[...t];for(let o=0;o<t.length&&r.length<n;o++){let t=e.branch(i).branch(o).range(0,a.length-1),n=a[t];if(n===void 0)throw RangeError(`a deal always deals`);r.push(n),a=a.filter((e,n)=>n!==t)}}return r}},er=`Stable`,tr=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.material,this.#t=e.state,this.#n=e.inscription,this.#r=e.trace,this.#i=e.told}material(){return this.#e}state(){return this.#t}inscription(){return this.#n}trace(){return this.#r}brief(){return this.#t===er?this.#e:`${this.#e} [${this.#t.toUpperCase()}]`}narrative(){let e=`${this.#i.material} ${this.#i.state}`;return this.#n===void 0?e:`${e} ${this.#n.narrative()}`}sensed(){let e=`${this.#i.material} ${this.#i.state} ${this.#r.sentence()}`;return this.#n===void 0?e:`${e} ${this.#n.narrative()}`}description(){return this.#n===void 0?this.brief():`${this.#n.formatted()} ${this.brief()}`}},nr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}word(){return this.#e}style(){return this.#t}formatted(){return this.#t.format(this.#e)}narrative(){return this.#t.narrative(this.#e)}},rr=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.key,this.#t=e.before,this.#n=e.after,this.#r=e.lowered??!1,this.#i=e.applied}key(){return this.#e}format(e){return`${this.#t}${this.#r?e.toLowerCase():e}${this.#n}`}narrative(e){return`The word '${this.#r?e.toLowerCase():e}' is ${this.#i}.`}equals(e){return this.#e===e.#e}},ir=[new rr({key:`stamped`,before:`[`,after:`]`,applied:`stamped into the metal in block letters`}),new rr({key:`scrawled`,before:`_`,after:`_`,lowered:!0,applied:`scrawled across the surface in jagged, desperate lines`}),new rr({key:`etched`,before:`⟨`,after:`⟩`,applied:`finely etched into the frame, appearing almost as a structural glyph`}),new rr({key:`burned`,before:`!! `,after:` !!`,applied:`burned into the material with a high-intensity plasma torch`})],ar=`themes/doors`,or=.2,sr=class{#e;constructor(e){this.#e=e}of(e,t){let[n,r]=e.branch(`material`).pick(this.#e.pairs(`${ar}/materials`)),[i,a]=e.branch(`state`).pick(this.#e.pairs(`${ar}/states`));return new tr({material:n,state:i,inscription:e.branch(`inscribed`).probability(or)?this.#t(e,t):void 0,trace:t.trace(),told:{material:r,state:a}})}#t(e,t){return t.guarantee()??new nr(e.branch(`word`).pick(this.#e.list(`${ar}/inscriptions`)),e.branch(`style`).pick(ir))}},cr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}name(){return this.#t}equals(e){return this.#e===e.#e}},lr=`themes/cultures`,ur=`themes/timelines`,dr=[{key:`with`,join:(e,t)=>`${t} with ${e}`},{key:`infused`,join:(e,t)=>`${e} infused with ${t}`},{key:`fused`,join:(e,t)=>`${e} fused to ${t}`},{key:`grafted`,join:(e,t)=>`${t} grafted onto ${e}`}],fr=class{#e;#t=new Map;constructor(e){this.#e=e}of(e,t){let n=`${e.key()}|${t.key()}`,r=this.#t.get(n);return r===void 0&&(r=Object.freeze(this.#n(e,t)),this.#t.set(n,r)),r}#n(e,t){let n=this.#e.list(`${lr}/${e.key()}`),r=this.#e.list(`${ur}/${t.key()}`);return[...n.flatMap(e=>r.flatMap(t=>dr.map(n=>new cr(`${n.key}|${e}|${t}`,n.join(e,t))))),...n.map(e=>new cr(`culture|${e}`,e)),...r.map(e=>new cr(`era|${e}`,e))]}},pr=`children`,y=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t===void 0?void 0:{...t,unit:t.unit??1},this.#n=n}of(e){return this.exactly(e,this.count(e.seed()))}count(e){if(this.#t===void 0)throw Error(`this progeny has no count range: use exactly()`);return e.branch(pr).range(this.#t.min,this.#t.max)*this.#t.unit}exactly(e,t,n=0){return Array.from({length:t},(t,r)=>{let i=n+r,a=e.seed().branch(i);return this.#n(a).create({parent:e,seed:a,index:i,children:this.#e})})}},mr=.01,hr={min:1,max:10},gr={min:5,max:19},_r=`relics`,vr={kind:on,rooms:Rn,make:(e,t)=>new cn(e,t)},yr=class{#e;#t;#n;#r;#i;#a=new $n;constructor(e,t,n,r=vr){this.#e=r,this.#t=new sr(t),this.#n=n,this.#r=new y(e,hr,()=>e.factoryFor(r.rooms)),this.#i=new fr(t)}kind(){return this.#e.kind}create(e){let t=e.parent.vibe(),n=t?.mutation();if(t===void 0||n===void 0)throw Error(`an apartment takes its culture, era and trait from the country above: it needs one`);let r=e.seed.branch(`anomaly`).probability(mr),i=r?t.culture():t.pickCulture(e.seed.branch(`culture`)),a=r?t.era():t.pickEra(e.seed.branch(`era`)),o=e.seed.branch(_r),s=this.#n.categoryOf(e.seed.branch(0),n);return this.#e.make(e,{door:this.#t.of(e.seed.branch(`door`),s),behind:s,culture:i,era:a,anomaly:r,rooms:this.#r.count(e.seed),relics:this.#a.take(o,this.#i.of(i,a),o.range(gr.min,gr.max))})}populate(e){return this.#r.exactly(e,e.roomCount())}},br=new v({key:`corridor`,title:`Corridor`,icon:`▅`,indexLabel:`CONDUIT`}),xr=class extends _{#e;#t;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.sentence}kind(){return br}name(){return`Corridor`}floor(){return this.#e}arrival(){return this.#e}scan(e){return{title:`[DATA_SUMMARY]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:void 0,current:!1,note:t.sensed()}))}}description(){return[`${this.#t}.`]}facts(){let e=this.vibe()?.culture();return e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}]}status(){return`TRAFFIC: [STABLE] | THEME: [${this.vibe()?.culture().key().toUpperCase()??`UNKNOWN`}]`}childrenHeading(){return`Local access list:`}approachVerb(){return`Access:`}},Sr=new v({key:`artery`,title:`Artery`,icon:`▅`,indexLabel:`CONDUIT`}),Cr=class extends xr{#e;constructor(e,t){super(e,{sentence:t.sentence}),this.#e=t.vibe}kind(){return Sr}name(){return`Artery`}vibe(){return this.#e}status(){return`TRAFFIC: [PRESSURE_HIGH] | THEME: [${this.#e.culture().key().toUpperCase()}]`}},wr=.85,Tr=.1,Er=.9,Dr=class e{#e;constructor(e){this.#e={...e,stability:e.stability??wr,mutation:e.mutation,frame:e.frame??e.culture.frame()}}culture(){return this.#e.culture}era(){return this.#e.era}secondCulture(){return this.#e.secondCulture}secondEra(){return this.#e.secondEra}stability(){return this.#e.stability}mutation(){return this.#e.mutation}frame(){return this.#e.frame}pickCulture(e){return e.probability(this.#e.stability)?this.#e.culture:this.#e.secondCulture}pickEra(e){return e.probability(this.#e.stability)?this.#e.era:this.#e.secondEra}mutate(t,n){let r=Math.max(Tr,Math.min(Er,this.#e.stability+n));return new e({...this.#e,stability:r,mutation:t})}rebel(){return new e({...this.#e,culture:this.#e.secondCulture,secondCulture:this.#e.culture,era:this.#e.secondEra,secondEra:this.#e.era})}},Or=`A pulsing, organic artery of data`,kr=1,Ar=class{#e;#t;constructor(e,t){this.#e=t,this.#t=new y(e,void 0,()=>e.factoryFor(ln))}kind(){return Sr}create(e){let t=e.parent.vibe();if(t===void 0)throw Error(`an artery lies under a country: it needs its trait`);let n=this.#e.bedrock();return new Cr(e,{sentence:Or,vibe:new Dr({era:n.era,culture:n.culture,secondCulture:n.culture,secondEra:n.era,stability:kr,mutation:t.mutation()})})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},jr=new v({key:`building`,title:`Building`,icon:`⌂`,indexLabel:`STRATA`}),Mr=0,Nr=2,Pr=7,Fr=10,Ir=[`elevator`,`sampled`,`merges`,`breached`],Lr=class extends _{#e;#t;#n;#r;#i=Mr;#a=new Set;#o=0;#s=!1;constructor(e,t){super(e),this.#e=t.name,this.#t=t.landmark,this.#n=t.floors,this.#r=t.doorsPerFloor}kind(){return jr}name(){return this.#e}landmark(){return this.#t}floors(){return this.#n}layers(){return Fr}doorsPerFloor(){return this.#r}elevatorAt(){return this.#i}elevatorTo(e){this.#i=e}floorNumbered(e){return e>=0?e<this.#n?this.children()[e]:void 0:this.#s?this.children()[this.#n-e-1]:void 0}sampled(){return[...this.#a]}sampleFloor(e){e>=0&&e<this.#n&&this.#a.add(e)}merges(){return this.#o}infuse(){this.#o+=1}primed(){return this.#a.size>=this.#n&&this.#o>=Pr}breached(){return this.#s}keystone(){return new Sn({name:`${this.#e} Keystone`,building:this.address()})}forge(e){return this.primed()&&this.#c(e)===void 0?this.keystone():void 0}prime(){for(let e=0;e<this.#n;e++)this.#a.add(e);return this.#o=Pr,!0}breachOfferedAt(e,t){return e===this.#n-1&&this.primed()&&!this.#s&&this.#c(t)!==void 0}breachFrom(e,t){if(this.breachOfferedAt(e,t))return this.#s=!0,this.#c(t)}remember(){let e={};return this.#i!==Mr&&(e.elevator=this.#i),this.#a.size>0&&(e.sampled=[...this.#a]),this.#o>0&&(e.merges=this.#o),this.#s&&(e.breached=!0),Object.keys(e).length===0?void 0:JSON.stringify(e)}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=t,r=Object.keys(n);if(r.length===0||r.some(e=>!Ir.includes(e)))return!1;let{elevator:i,sampled:a,merges:o,breached:s}=n;if(s!==void 0&&s!==!0)return!1;let c=s===!0;if(i!==void 0&&!this.#l(i,c)||a!==void 0&&!this.#u(a)||o!==void 0&&(!Number.isInteger(o)||o<1))return!1;this.#i=i??Mr,this.#a.clear();for(let e of a??[])this.#a.add(e);return this.#o=o??0,this.#s=c,!0}listing(){let e=this.children();return[...e.slice(0,this.#n).reverse(),...this.#s?e.slice(this.#n):[]]}admits(e){return this.floorNumbered(this.#i)===e}description(){return[`Analyzing vertical lattice structure...`]}scanAround(e,t){let n=this.listing().filter(t=>Math.abs(t.ordinal()-e)<=Nr).sort((e,t)=>t.ordinal()-e.ordinal());return{title:`NEURAL_PROXIMITY_REPORT`,notes:[`BUILDING: ${this.#e}`,`TOTAL_STRATA: ${String(this.#n)} units detected.`],rows:n.map(n=>({cells:[{key:`reading`,label:`ID`,value:String(n.ordinal()).padStart(2,`0`)},...n.scanned(t)],place:void 0,current:n.ordinal()===e,note:``}))}}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}],...this.#t?[{key:`alert`,label:`UNIQUE_LOCUS_DETECTION`,value:`MAJOR_LANDMARK_DISCOVERED`}]:[]]}status(){return this.#s?`BEDROCK_BREACHED`:this.#o>0?`INFUSION_ACTIVE: ${String(this.#o)}`:`STRUCTURAL_STABLE`}indoors(){return!0}childrenHeading(){return`Building strata diagnostics:`}approachVerb(){return`Access:`}#c(e){let t=this.keystone().key();return e.find(e=>e.key()===t)}#l(e,t){return typeof e!=`number`||!Number.isInteger(e)||e===Mr?!1:e>0?e<this.#n:t&&this.#n-e-1<this.children().length}#u(e){if(!Array.isArray(e)||e.length===0)return!1;let t=e;return t.every(e=>typeof e==`number`&&Number.isInteger(e)&&e>=0&&e<this.#n)?new Set(t).size===t.length:!1}},Rr=new Ln([{move:{id:`elevator`,label:`Back to Elevator`,opposite:`corridor`},to:e=>e,act:e=>{e.returnToElevator()}}]),zr=class{id(){return`corridor`}listing(e){return e.corridor().listing()}admits(e,t){return t===e.corridor()}moves(e){return Rr.offered(e)}move(e,t){return Rr.make(e,t)}facts(e){return e.corridor().facts()}description(e){return e.corridor().description()}status(e){return e.corridor().status()}childrenHeading(e){return e.corridor().childrenHeading()}approachVerb(e){return e.corridor().approachVerb()}scan(e,t){return e.corridor().scan(t)}},Br=0,Vr=new Ln([{move:{id:`up`,label:`Go Up`,opposite:`down`},to:e=>e.neighbour(1)},{move:{id:`down`,label:`Go Down`,opposite:`up`},to:e=>e.number()===Br?void 0:e.neighbour(-1)},{move:{id:`descend`,label:`Descend into the Substrate`,opposite:`up`},to:e=>e.number()===Br?e.neighbour(-1):void 0},{move:{id:`corridor`,label:`Enter Corridor`,opposite:`elevator`},to:e=>e,act:e=>{e.enterCorridor()}}]),Hr=2,Ur=class{id(){return`elevator`}listing(){return[]}admits(){return!1}moves(e){return Vr.offered(e)}move(e,t){return Vr.make(e,t)}facts(e){let t=e.vibe();return t===void 0?[]:[{key:`era`,label:`TECH_ERA`,value:t.era().key()},{key:`culture`,label:`RESONANCE`,value:t.culture().key()},{key:`reading`,label:`STABILITY`,value:`${(t.stability()*100).toFixed(Hr)}%`},{key:`trait`,label:`ATMOS_SHIFT`,value:t.mutation()?.key()??`Standard`}]}description(e){return[`${e.name()}. ${e.sentence()}`,`Local signal is STABLE. Corridor access authorized.`]}status(e){return e.diagnostic()}childrenHeading(){return``}approachVerb(){return``}scan(e,t){return e.building().scanAround(e.number(),t)}},Wr=new v({key:`floor`,title:`Floor`,icon:`▤`,indexLabel:`Z-AXIS`}),b=new Ur,Gr=new zr,Kr=new Map([b,Gr].map(e=>[e.id(),e])),qr={min:1e3,max:2999},Jr=`100%`,Yr=class extends _{#e;#t;#n;#r;#i=b;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.number,this.#n=t.zone,this.#r=t.sentence}kind(){return Wr}number(){return this.#t}name(){return`Floor ${String(this.#t)}`}callSign(){return this.#t===0?`Lobby`:this.#t===this.#e.floors()-1?`Peak`:this.name()}ordinal(){return this.#t}goesByNumber(){return!0}arrive(){return this.#e.elevatorTo(this.#t),this}current(){return this.#e.elevatorAt()===this.#t}zone(){return this.#n}sentence(){return this.#r}resonance(){return this.seed().branch(`resonance`).range(qr.min,qr.max)}readings(){return[{key:`zone`,label:`FUNCTION`,value:this.#n},{key:`reading`,label:`ST`,value:Jr},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}building(){return this.#e}diagnostic(){return`SYSTEM_DIAGNOSTIC: [NOMINAL]`}peers(){return this.#e.children().slice(0,this.#e.floors())}corridor(){let e=this.children()[0];if(e===void 0)throw Error(`${this.name()} has no corridor`);return e}neighbour(e){return this.#e.floorNumbered(this.#t+e)}sample(){this.#e.sampleFloor(this.#t)}breachOffered(e){return this.#e.breachOfferedAt(this.#t,e)}breach(e){return this.#e.breachFrom(this.#t,e)}enterCorridor(){this.#i=Gr}returnToElevator(){this.#i=b}listing(){return this.#i.listing(this)}admits(e){return this.#i.admits(this,e)}moves(){return this.#i.moves(this)}move(e){return this.#i.move(this,e)}leave(){return this.returnToElevator(),this.exit()}remember(){return this.#i===b?void 0:this.#i.id()}recall(e){let t=Kr.get(e);return t!==void 0&&(this.#i=t,!0)}facts(){return this.#i.facts(this)}description(){return this.#i.description(this)}status(){return this.#i.status(this)}childrenHeading(){return this.#i.childrenHeading(this)}approachVerb(){return this.#i.approachVerb(this)}scan(e){return this.#i.scan(this,e)}scanned(){return[{key:`zone`,label:`FUNCTION`,value:this.#n}]}},Xr=new v({key:`layer`,title:`Layer`,icon:`▤`,indexLabel:`STRATA`}),Zr=`ABYSSAL_SUBSTRATE`,Qr=10,$r=100,ei=2,ti=class extends Yr{constructor(e,t){super(e,{number:t.number,zone:Zr,sentence:t.sentence})}kind(){return Xr}name(){return`Layer -0x${Math.abs(this.number()).toString(16).toUpperCase()}`}readings(){let e=Math.min($r,Math.abs(this.number())*Qr);return[{key:`zone`,label:`FUNCTION`,value:Zr},{key:`reading`,label:`ST`,value:`P: ${String(e)}%`},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}sealed(){return!this.building().breached()}diagnostic(){return`SYSTEM_STATUS: [ABYSS_SYNC]`}abyssal(){return!0}drainFactor(){return ei}peers(){return this.building().children().slice(this.building().floors())}},x=`names/buildings`,ni=300,ri=5,ii=50,ai=2500,oi=1500,si=4094,ci=[10,20],li=class{#e;constructor(e){this.#e=e}nameOf(e,t){let n=e.branch(`name`),r=n.branch(`rarity`).range(0,9999),i=this.landmarkChance(t.depth,t.landmarkFactor);if(r<i)return{name:n.branch(`landmark`).pick(this.#e.list(`${x}/landmarks`)),landmark:!0};let a=n.branch(`pattern`).range(0,1);return{name:r<i+oi?this.#t(n,a,t):this.#r(n,a,t.culture),landmark:!1}}landmarkChance(e,t){let n=ni+Math.max(0,e-ri)*ii;return Math.min(ai,n*t)}#t(e,t,n){if(t===0)return`Unit 0x${e.branch(`serial`).range(0,si).toString(16).toUpperCase()} ${e.branch(`size-word`).pick(this.#n(n.floors))}`;let r=e.branch(`concept`).pick(this.#e.list(`${x}/concepts`));return`The ${this.#i(e,n.culture)} of ${r}`}#n(e){let t=this.#e.index(`${x}/sizes`),n=ci.filter(t=>e>=t).length,r=t[Math.min(n,t.length-1)];if(r===void 0)throw Error(`${x}/sizes/index names no list`);return this.#e.list(`${x}/sizes/${r}`)}#r(e,t,n){if(t===0)return`${e.branch(`adjective`).pick(this.#e.list(`${x}/adj/${n.key()}`))} ${this.#i(e,n)}`;let r=e.branch(`compound`).pick(this.#e.list(`${x}/compounds`));return`${this.#i(e,n)}${r}`}#i(e,t){return e.branch(`noun`).pick(this.#e.list(`${x}/noun/${t.key()}`))}},S={min:0,max:99},ui=[{upTo:40,size:{floors:{min:3,max:10},doors:{min:2,max:6}}},{upTo:70,size:{floors:{min:10,max:25},doors:{min:4,max:10}}},{upTo:90,size:{floors:{min:30,max:50},doors:{min:8,max:16}}},{upTo:S.max,size:{floors:{min:50,max:100},doors:{min:10,max:20}}}],di=class{bandFor(e){let t=Number.isInteger(e)&&e>=S.min?ui.find(t=>e<=t.upTo):void 0;if(t===void 0)throw RangeError(`a size roll is a whole number from 0 to 99, not ${String(e)}`);return t.size}bandOf(e){return this.bandFor(e.branch(`size`).range(S.min,S.max))}floorsOf(e){let t=this.bandOf(e).floors;return e.branch(`floors`).range(t.min,t.max)}doorsPerFloorOf(e){let t=this.bandOf(e).doors;return e.branch(`doors`).range(t.min,t.max)}},fi=class{#e;#t=new di;#n;#r;constructor(e,t){this.#e=new li(t),this.#n=new y(e,void 0,()=>e.factoryFor(Wr)),this.#r=new y(e,void 0,()=>e.factoryFor(Xr))}kind(){return jr}create(e){let t=e.parent,n=t?.vibe()?.culture();if(t===void 0||n===void 0)throw Error(`a building is named in the culture of its street: it needs a street under a planet`);let r=this.#t.floorsOf(e.seed),i=this.#e.nameOf(e.seed,{culture:n,floors:r,depth:t.depth(),landmarkFactor:t.landmarkFactor()});return new Lr(e,{name:i.name,landmark:i.landmark,floors:r,doorsPerFloor:this.#t.doorsPerFloorOf(e.seed)})}populate(e){return[...this.#n.exactly(e,e.floors()),...this.#r.exactly(e,e.layers(),e.floors())]}},pi=new v({key:`city`,title:`City`,icon:`🏙`,indexLabel:`DISTRICT`}),mi=class extends _{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.rebelVibe}kind(){return pi}name(){return this.#e}vibe(){return this.#t??super.vibe()}description(){return[this.#t===void 0?`A stable regional node connected to the planetary lattice.`:`The air is thick with illegal data-streams and shifting static.`]}facts(){return this.#t===void 0?[]:[{key:`alert`,label:`UNAUTHORIZED_ZONE`,value:`UNAUTHORIZED_RESONANCE_DETECTED`}]}status(){return this.#t===void 0?`STABILITY: [STABLE]`:`STABILITY: [VOLATILE]`}childrenHeading(){return`Streets detected in this city:`}approachVerb(){return`Go to`}},hi=new v({key:`street`,title:`Street`,icon:`═`,indexLabel:`WAY`}),gi=class extends _{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return hi}name(){return this.#e}description(){return[`Buildings stand in pairs along both sides of the way.`]}facts(){let e=this.vibe();return e===void 0?[]:[{key:`era`,label:`TECH_ERA`,value:e.era().key()},{key:`culture`,label:`RESONANCE`,value:e.culture().key()}]}status(){return`SYNC: [STABLE]`}childrenHeading(){return`Buildings on this street:`}approachVerb(){return`Enter Building:`}startOfJourney(){return this}},_i=`name`,C=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}words(e){return this.#e.index(this.#t).map(t=>this.naming(e).branch(t).pick(this.#e.list(`${this.#t}/${t}`)))}naming(e){return e.branch(_i)}},vi=.1,yi=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/city`),this.#t=new y(e,{min:3,max:15},()=>e.factoryFor(hi))}kind(){return pi}create(e){let t=e.seed.branch(`rebel`).probability(vi);return new mi(e,{name:this.#e.words(e.seed).join(``),rebelVibe:t?e.parent?.vibe()?.rebel():void 0})}populate(e){return this.#t.of(e)}},bi=`themes/descriptions`,xi=`sentence`,Si=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}dealt(e){return e.branch(xi).pick(this.#e.list(`${bi}/${this.#t}`))}},Ci=class{#e;#t;constructor(e,t){this.#e=new Si(t,`corridor`),this.#t=new y(e,void 0,()=>e.factoryFor(on))}kind(){return br}create(e){return new xr(e,{sentence:this.#e.dealt(e.seed)})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},wi=new v({key:`country`,title:`Country`,icon:`⬚`,indexLabel:`REGION`}),Ti=class extends _{#e;#t;#n;constructor(e,t){super(e),this.#e=t.name,this.#t=t.trait,this.#n=t.vibe}kind(){return wi}name(){return this.#e}vibe(){return this.#n??super.vibe()}description(){return[`A vast administrative region governed by the ${this.#t.key()} directive.`]}facts(){return[{key:`trait`,label:`Sector Mutation`,value:this.#t.key()}]}status(){return`TRAIT: [${this.#t.key().toUpperCase()}]`}childrenHeading(){return`Regional cities identified:`}approachVerb(){return`Travel to`}},Ei={min:-100,max:100,scale:1e3},Di=class{#e;#t;#n;constructor(e,t,n){this.#e=new C(t,`names/country`),this.#t=n,this.#n=new y(e,{min:2,max:10},()=>e.factoryFor(pi))}kind(){return wi}create(e){let t=e.seed.branch(`trait`).pick(this.#t.traits()),n=e.seed.branch(`stability`).range(Ei.min,Ei.max)/Ei.scale;return new Ti(e,{name:this.#e.words(e.seed).join(` `),trait:t,vibe:e.parent?.vibe()?.mutate(t,n)})}populate(e){return this.#n.of(e)}},Oi=new v({key:`filament`,title:`Cosmic filament`,icon:`»`,indexLabel:`CONDUIT`}),ki=class extends _{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.conduitId}kind(){return Oi}name(){return this.#e}description(){return[`A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${this.#t}]`]}status(){return`SYNC: [NODE_RELIABILITY_HIGH]`}childrenHeading(){return`Galactic sectors within this conduit:`}approachVerb(){return`Pulse to`}},Ai=new v({key:`sector`,title:`Galactic sector`,icon:`○`,indexLabel:`SECTOR`}),ji=class extends _{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Ai}name(){return this.#e}callSign(){return`MATTER_CLUSTER: ${this.#e}`}description(){return[`A dense cluster of celestial bodies within the neural web.`]}status(){return`GRID: [LATTICE_SYNC_OK]`}childrenHeading(){return`Solar systems within proximity:`}approachVerb(){return`Transition to System:`}},Mi={min:1e3,max:9999},Ni={min:10,max:39},Pi=100,w=0,Fi=`echo`,Ii=`echo-hertz`,Li=class{#e;#t=w;#n=!1;constructor(e){this.#e=e}signal(){return this.#t}locked(){return this.#t>=Pi}found(){return this.#n}scan(e){if(this.#n)return this.#t;let t=this.#e.seed().branch(Fi).branch(e).range(Ni.min,Ni.max);return this.#t=Math.min(Pi,this.#t+t),this.#t}fragment(){return new En({from:this.#e.address(),frequency:new yn(this.#e.seed().branch(Ii).range(Mi.min,Mi.max))})}capture(){if(!(!this.locked()||this.#n))return this.#n=!0,this.#t=w,{fragment:this.fragment(),fresh:!0}}remember(){if(this.#n)return JSON.stringify({found:!0});if(this.#t>w)return JSON.stringify({signal:this.#t})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{signal:n,found:r,...i}=t;return Object.keys(i).length>0?!1:r===!0&&n===void 0?(this.#n=!0,this.#t=w,!0):r!==void 0||typeof n!=`number`||!Number.isInteger(n)||n<=w||n>Pi?!1:(this.#n=!1,this.#t=n,!0)}},Ri=new v({key:`null-reach`,title:`Null reach`,icon:`○`,indexLabel:`VOID`}),zi=2,Bi=class extends _{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=new Li(this)}kind(){return Ri}name(){return this.#e}callSign(){return`VOID_REACH: ${this.#e}`}echo(){return this.#t}description(){return this.#t.found()?[`A silent void. The spectral resonance has been harvested.`]:[`A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.`]}facts(){let e=this.#t.signal();return[{key:`signal`,label:`VOID_STATUS`,value:e===0?`Searching for signals...`:`SIGNAL_STRENGTH: ${String(e)}% | FREQ_DRIFT: ${String(this.#t.fragment().frequency().hertz())}Hz`}]}status(){if(this.#t.found())return`SIGNAL: [HARVESTED]`;let e=this.#t.signal();return e===0?`SIGNAL: [SCAN_REQUIRED]`:`SIGNAL: ${String(e)}%`}remember(){return this.#t.remember()}recall(e){return this.#t.recall(e)}childrenHeading(){return`Faint gravitational anomalies detected:`}approachVerb(){return`Detect faint signal:`}hash(){return`0x0000 / UNKNOWN`}landmarkFactor(){return super.landmarkFactor()*zi}},Vi=.3,Hi=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/filament`),this.#t=new y(e,{min:4,max:8},t=>e.factoryFor(t.branch(`null-roll`).probability(Vi)?Ri:Ai))}kind(){return Oi}create(e){let[t,n]=this.#e.words(e.seed),r=this.#e.naming(e.seed).branch(`number`).range(0,998),i=e.seed.branch(`conduit`).range(0,65534);return new ki(e,{name:`${String(t)}-${String(r)}-${String(n)}`,conduitId:`0x${i.toString(16)}`})}populate(e){return this.#t.of(e)}},T=`names/floors`,Ui=5,Wi=5,Gi=class{#e;constructor(e){this.#e=e}zoneOf(e,t,n){if(t===0)return this.#t(`${T}/lobby`);if(t===n-1)return this.#t(`${T}/peak`);let r=this.#e.index(`${T}/zones`),i=r[t<Ui?0:t>n-Wi?r.length-1:1];if(i===void 0)throw Error(`${T}/zones/index names too few lists`);return e.branch(`zone`).pick(this.#e.list(`${T}/zones/${i}`))}#t(e){let[t,...n]=this.#e.list(e);if(t===void 0||n.length>0)throw Error(`${e}.txt holds exactly one word`);return t}},Ki=class{#e;#t;#n;constructor(e,t){this.#e=new Gi(t),this.#t=new Si(t,`floor`),this.#n=new y(e,void 0,()=>e.factoryFor(br))}kind(){return Wr}create(e){let t=e.parent,n=t.vibe()?.culture().key().toUpperCase()??`UNKNOWN`;return new Yr(e,{number:e.index,zone:this.#e.zoneOf(e.seed,e.index,t.floors()),sentence:this.#t.dealt(e.seed).replace(`{culture}`,n)})}populate(e){return this.#n.exactly(e,1)}},qi=`The air is thick with oily static and the hum of abyssal substrate.`,Ji=class{#e;constructor(e){this.#e=new y(e,void 0,()=>e.factoryFor(Sr))}kind(){return Xr}create(e){return new ti(e,{number:e.parent.floors()-1-e.index,sentence:qi})}populate(e){return this.#e.exactly(e,1)}},E=new v({key:`solar-system`,title:`Solar system`,icon:`☼`,indexLabel:`RADII`}),Yi=class extends _{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return E}name(){return this.#e}description(){return[`A star holding its resonant nodes in orbit.`]}status(){return`SYNC: [RESONANT_NODES_STABLE]`}childrenHeading(){return`Orbital bodies within range:`}approachVerb(){return`Land on`}},Xi=class{#e;constructor(e){this.#e=new y(e,{min:1,max:2},()=>e.factoryFor(E))}kind(){return Ri}create(e){return new Bi(e,{name:`Null Reach ${e.seed.branch(`name`).range(0,4094).toString(16).toUpperCase()}`})}populate(e){return this.#e.of(e)}},Zi=new v({key:`planet`,title:`Planet`,icon:`⊕`,indexLabel:`ORBIT`}),Qi=class extends _{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.vibe}kind(){return Zi}name(){return this.#e}vibe(){return this.#t}description(){return[`A world on the surface layer of the lattice, tuned to one culture and one era.`]}facts(){return[{key:`culture`,label:`RESONANCE`,value:this.#t.culture().key()},{key:`era`,label:`TIMELINE`,value:this.#t.era().key()}]}status(){return`RESONANCE: [${this.#t.culture().key().toUpperCase()}]`}childrenHeading(){return`Planetary landmasses scanned:`}approachVerb(){return`Visit`}},$i=class{#e;#t;#n;constructor(e,t,n){this.#e=new C(t,`names/planet`),this.#t=n,this.#n=new y(e,{min:2,max:8},()=>e.factoryFor(wi))}kind(){return Zi}create(e){return new Qi(e,{name:this.#e.words(e.seed).join(``),vibe:this.#r(e.seed)})}populate(e){return this.#n.of(e)}#r(e){let t=e.branch(`vibe`),n=t.branch(`culture`).pick(this.#t.surfaceCultures()),r=t.branch(`era`).pick(this.#t.eras()),i=this.#t.surfaceCultures().filter(e=>!e.equals(n)),a=this.#t.eras().filter(e=>!e.equals(r));return new Dr({culture:n,era:r,secondCulture:i.length===0?n:t.branch(`second-culture`).pick(i),secondEra:a.length===0?r:t.branch(`second-era`).pick(a)})}},ea=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}name(){return this.#e}guarantee(){return this.#t}trace(){return this.#n}equals(e){return this.#e===e.#e}},ta={ozone:{name:`Ozone`,sentence:`A sharp smell of ozone escapes the frame, ionizing the nearby air.`},frost:{name:`Frost`,sentence:`Thin frost is forming on the magnetic hinges. Total absence of thermal signature detected.`},clicking:{name:`Clicking`,sentence:`A persistent, rhythmic clicking sound—like high-speed mechanical relays—originates from the lock housing.`},humming:{name:`Humming`,sentence:`A heavy, low-frequency thrum (60Hz) vibrates through the surrounding strata.`},stillness:{name:`Stillness`,sentence:`The air nearby is unnaturally still. Not even the standard system-hum is audible.`}},na=class e{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}static of(t){let n=ta[t];return n===void 0?void 0:new e(t,n.name,n.sentence)}key(){return this.#e}name(){return this.#t}sentence(){return this.#n}equals(e){return this.#e===e.#e}},D=`names/rooms`,ra=class{#e;#t=new Map;constructor(e){this.#e=e}allowedBy(e){let t=this.#t.get(e.key());return t===void 0&&(t=Object.freeze(this.#e.pairs(`${D}/${e.key()}`).map(([e,t])=>{let n=t.indexOf(`|`);if(n<0)throw Error(`${D}: '${e}|${t}' is not 'name|guarantee|trace'`);let r=na.of(t.slice(n+1).trim());if(r===void 0)throw Error(`${D}: '${e}' names no known trace`);return new ea(e,this.#n(t.slice(0,n).trim()),r)})),this.#t.set(e.key(),t)),t}categoryOf(e,t){return e.branch(`category`).pick(this.allowedBy(t))}#n(e){if(e===``)return;let t=e.indexOf(` `),n=ir.find(n=>n.key()===e.slice(0,t));if(t<0||n===void 0)throw Error(`${D}: '${e}' is not '<style> <WORD>' with a known style`);return new nr(e.slice(t+1),n)}},ia=`themes/atmosphere`,aa=`themes/cultures`,oa=`themes/timelines`,sa=`themes/colours`,ca=`glitch`,la=.05,ua=.5,da=[`abyssal`,`Singularity`],fa=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t){let n=e.branch(ca),r=t.anomaly||n.probability(la),i=e=>r&&n.branch(e).probability(ua),a=this.#e.index(aa),o=this.#e.index(oa),s=i(`walls`)?n.branch(`walls`).pick(a):t.culture.key(),c=i(`lighting`)?n.branch(`lighting`).pick(o):t.era.key(),l=i(`structure`)?n.branch(`structure`).pick(da):t.trait.key();return{structure:e.branch(`structure`).pick(this.#n(`structures`,l,`${ia}/structures`)),colour:e.branch(`colour`).pick(this.#e.list(sa)),walls:e.branch(`walls`).pick(this.#n(`walls`,s,aa)),lighting:e.branch(`lighting`).pick(this.#n(`lighting`,c,`${ia}/lighting`))}}#n(e,t,n){let r=`${ia}/${e}/${t}`;if(this.#e.has(r))return this.#e.list(r);let i=this.#e.index(n)[0]??``;return this.#t.warn(`[THEME_WARN] no ${e} file for '${t}' — falling back to '${i}' (${r}.txt)`),this.#e.list(`${ia}/${e}/${i}`)}},pa=`themes/conditions`,ma=`themes/cultures`,ha=`pieces`,ga=`condition`,_a=class{#e;#t=new $n;constructor(e){this.#e=e}of(e,t,n){let r=this.#e.list(pa),i=this.#e.list(`${ma}/${t.key()}`);return this.#t.take(e.branch(ha),i,Math.min(n,i.length)).map((t,n)=>{let i=e.branch(ga).branch(n).range(0,r.length-1);return t.startsWith(`${r[i]??``} `)&&(i=(i+1)%r.length),`${r[i]??``} ${t}`})}},va=`names/buildings/adj`,ya={min:12,max:21},ba={min:5,max:25},xa=[`[SHIELDED]`,`[CLEAR]`],Sa={min:1,max:3},Ca={kind:Rn,make:(e,t)=>new Jn(e,t)},wa=class{#e;#t;#n;#r;#i;#a=new $n;constructor(e,t,n,r=Ca){this.#e=r,this.#t=e,this.#n=t,this.#r=new fa(e,n),this.#i=new _a(e)}kind(){return this.#e.kind}create(e){let t=e.parent,n=t.vibe()?.mutation();if(n===void 0)throw Error(`a room takes its category from the country above: it needs one`);let r=this.#n.categoryOf(e.seed,n),i=this.#a.nth(t.seed().branch(`adjectives`),this.#t.list(`${va}/${t.culture().key()}`),e.index);return this.#e.make(e,{name:`${i} ${r.name()}`,category:r,atmosphere:this.#r.of(e.seed,{culture:t.culture(),era:t.era(),trait:n,anomaly:t.anomaly()}),traits:{oxygen:e.seed.branch(`oxygen`).range(ya.min,ya.max),temperature:e.seed.branch(`temperature`).range(ba.min,ba.max),signal:e.seed.branch(`signal`).pick(xa)},furniture:this.#i.of(e.seed.branch(`furniture`),t.culture(),e.seed.branch(`furniture`).range(Sa.min,Sa.max))})}populate(){return[]}},Ta=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/sector`),this.#t=new y(e,{min:3,max:7},()=>e.factoryFor(E))}kind(){return Ai}create(e){let t=this.#e.naming(e.seed).branch(`number`).range(0,98);return new ji(e,{name:`${this.#e.words(e.seed).join(` `)} ${String(t)}`})}populate(e){return this.#t.of(e)}},Ea=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/solar-system`),this.#t=new y(e,{min:2,max:10},()=>e.factoryFor(Zi))}kind(){return E}create(e){return new Yi(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Da=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/street`),this.#t=new y(e,{min:2,max:10,unit:2},()=>e.factoryFor(jr))}kind(){return hi}create(e){return new gi(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Oa=class{#e;constructor(e){this.#e=new y(e,{min:3,max:7},()=>e.factoryFor(Oi))}kind(){return Zn}create(e){return new Qn(e)}populate(e){return this.#e.of(e)}},ka=class{#e;constructor(e,t,n){let r=new ra(e),i=[new Oa(this),new Hi(this,e),new Ta(this,e),new Xi(this),new Ea(this,e),new $i(this,e,t),new Di(this,e,t),new yi(this,e),new Da(this,e),new fi(this,e),new Ki(this,e),new Ci(this,e),new yr(this,e,r),new wa(e,r,n),new Ji(this),new Ar(this,t),new yr(this,e,r,{kind:ln,rooms:Yn,make:(e,t)=>new un(e,t)}),new wa(e,r,n,{kind:Yn,make:(e,t)=>new Xn(e,t)})];this.#e=new Map(i.map(e=>[e.kind().key(),e]))}universe(e){return this.factoryFor(Zn).create({parent:void 0,seed:e,index:0,children:this})}kinds(){return[...this.#e.values()].map(e=>e.kind())}factoryFor(e){let t=this.#e.get(e.key());if(t===void 0)throw Error(`no factory is registered for the kind '${e.key()}'`);return t}childrenOf(e){return this.factoryFor(e.kind()).populate(e)}},Aa=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}frame(){return this.#t}equals(e){return this.#e===e.#e}},ja=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Ma=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Na=`themes/planet-frames`,Pa=`themes/timelines`,Fa=`themes/cultures`,Ia=`themes/traits`,O={culture:`abyssal`,era:`atomic`},La=class{#e;#t;#n;#r;constructor(e){this.#e=e}surfaceCultures(){return this.#t??=Object.freeze(this.#e.pairs(Na).map(([e,t])=>new Aa(e,t))),this.#t}bedrock(){if(!this.#e.index(Fa).includes(O.culture))throw Error(`${Fa}/index names no '${O.culture}' culture`);let e=this.eras().find(e=>e.key()===O.era);if(e===void 0)throw Error(`${Pa}/index names no '${O.era}' era`);return{culture:new Aa(O.culture,O.culture),era:e}}eras(){return this.#n??=Object.freeze(this.#e.index(Pa).map(e=>new ja(e))),this.#n}traits(){return this.#r??=Object.freeze(this.#e.list(Ia).map(e=>new Ma(e))),this.#r}},Ra=/^([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})$/i,za=2**53,k=`#`,Ba=`${k}range`,Va=`${k}pick`,Ha=`${k}probability`,Ua=class e{#e;#t;constructor(e,t){this.#e=e>>>0,this.#t=t>>>0}static parse(t){let n=Ra.exec(t.trim());if(n===null)return;let r=n.slice(1).join(``);return new e(Number.parseInt(r.slice(0,8),16),Number.parseInt(r.slice(8),16))}branch(e){if(typeof e==`number`){if(!Number.isSafeInteger(e))throw RangeError(`a number key is a whole number, got ${String(e)}`);return this.#n(`${k}n:${String(e)}`)}if(e.startsWith(k))throw RangeError(`keys starting with '${k}' are reserved for Seed itself, got '${e}'`);return this.#n(e)}#n(t){let n=(this.#e^2654435769)>>>0,r=(this.#t^2135587861)>>>0;n=Math.imul(n^r>>>15,2246822507),r=Math.imul(r^n>>>13,3266489909);for(let e=0;e<t.length;e++){let i=t.charCodeAt(e);n=Math.imul(n^i,2654435761),r=Math.imul(r^i,1597334677),n=n<<13|n>>>19,r=r<<17|r>>>15}return n^=t.length,n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,668265263)^r>>>15,new e(n,r)}range(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||t<e)throw RangeError(`range needs whole numbers with min <= max, got ${String(e)}..${String(t)}`);return e+Math.floor(this.#n(Ba).#r()*(t-e+1))}pick(e){let t=e[Math.floor(this.#n(Va).#r()*e.length)];if(t===void 0)throw RangeError(`pick needs a list with at least one item`);return t}probability(e){if(!(e>=0&&e<=1))throw RangeError(`probability needs a chance in [0, 1], got ${String(e)}`);return this.#n(Ha).#r()<e}equals(e){return this.#e===e.#e&&this.#t===e.#t}toString(){let e=(this.#e.toString(16).padStart(8,`0`)+this.#t.toString(16).padStart(8,`0`)).toUpperCase();return`${e.slice(0,4)}-${e.slice(4,8)}-${e.slice(8,12)}-${e.slice(12)}`}#r(){return(this.#e*2097152+(this.#t>>>11))/za}},A=100,j=0,Wa=[{key:`stable`,from:70},{key:`degraded`,from:30},{key:`critical`,from:j}],Ga=40,M=class e{#e;static range(){return{min:j,max:A}}static edges(){let e=new Set([A,1]);for(let t of[...Wa.map(e=>e.from),Ga])t<=j||(e.add(t),e.add(t-1));return[...e].sort((e,t)=>t-e)}constructor(e=A){if(!Number.isInteger(e)||e<j||e>A)throw RangeError(`coherence is a whole number from ${String(j)} to ${String(A)}, got ${String(e)}`);this.#e=e}value(){return this.#e}drained(t){return new e(Math.max(j,this.#e-t))}restored(t){return new e(Math.min(A,this.#e+t))}exhausted(){return this.#e===j}band(){return Wa.find(e=>this.#e>=e.from)?.key??`critical`}corrupting(){return this.#e<Ga}equals(e){return this.#e===e.#e}},Ka=6,qa=class e{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e){this.#e=e.seed,this.#t=e.address,this.#n=new Map(e.states??[]),this.#r=e.coherence??new M().value(),this.#i=e.steps??0,this.#a=[...e.visited??[]],this.#o=[...e.buffer??[]],this.#s=e.resonant??0}static parse(t){if(t===void 0)return;let n;try{n=JSON.parse(t)}catch{return}if(typeof n!=`object`||!n)return;let{version:r,seed:i,path:a,states:o,coherence:s,steps:c,visited:l,buffer:u,resonant:d}=n;if(r!==Ka||typeof i!=`string`)return;let f=Ua.parse(i),p=e.#l(o),m=e.#u(l),h=e.#c(u);if(f===void 0||p===void 0||m===void 0||h===void 0||!e.#d(s)||!e.#f(c)||!e.#f(d))return;let ee=typeof a==`string`?g.parse(a):void 0;if(a!==null&&ee===void 0)return;let te=new M().value();if(ee!==void 0||s===te&&c===0&&m.length===0&&p.size===0&&h.length===0&&d===0)return new e({seed:f,address:ee,states:p,coherence:s,steps:c,visited:m,buffer:h,resonant:d})}static#c(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`object`||!n||Array.isArray(n))return;let e=n;if(typeof e.kind!=`string`)return;t.push(e)}return t}static#l(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=Object.entries(e),n=new Map;for(let[e,r]of t){if(g.parse(e)===void 0||typeof r!=`string`)return;n.set(e,r)}return n}static#u(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`string`||g.parse(n)===void 0)return;t.push(n)}return new Set(t).size===t.length?t:void 0}static#d(e){if(typeof e!=`number`)return!1;try{return new M(e),!0}catch{return!1}}static#f(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}seed(){return this.#e}address(){return this.#t}states(){return this.#n}coherence(){return this.#r}steps(){return this.#i}visited(){return this.#a}buffer(){return this.#o}resonant(){return this.#s}toText(){return JSON.stringify({version:Ka,seed:this.#e.toString(),path:this.#t?.toString()??null,states:Object.fromEntries(this.#n),coherence:this.#r,steps:this.#i,visited:this.#a,buffer:this.#o,resonant:this.#s})}};function N(e,t,n){return{id:e,key:t,label:n,place:``,role:`system`,sealed:!1,landmark:!1,ordinal:``,readings:[],opposite:``,current:!1,visited:!1}}var Ja=`buffer`,Ya=`pick:`,Xa=`drop:`,Za=`close`,Qa=Array.from({length:9},(e,t)=>String(t+1)),$a=class{#e;#t;constructor(e){this.#e=e}summary(){return{id:Ja,outcome:``,figures:{selected:this.#t===void 0?``:String(this.#t)}}}options(){let e=this.#e.player().buffer().fragments(),t=this.#e.here()?.contents()!==null,n=e=>this.#t===void 0?`Select`:this.#t===e?`Unselect`:`Merge`;return[...e.flatMap((e,r)=>{let i=String(r+1),a={...N(`${Ya}${String(r)}`,Qa[r]??``,n(r)),role:`pick`,ordinal:i},o={...N(`${Xa}${String(r)}`,``,`Drop here`),role:`drop`,ordinal:i};return t?[a,o]:[a]}),{...N(Za,`b`,`Back to reality`),role:`return`}]}answer(e){if(!this.options().some(t=>t.id===e))return;if(e===Za)return{message:``,done:!0};if(e.startsWith(Ya))return{message:this.#n(Number(e.slice(5))),done:!1};let t=this.#e.drop(Number(e.slice(5)));return this.#t=void 0,{message:t===void 0?``:`Dropped ${t.name()} here.`,done:!1}}#n(e){let t=this.#t;if(t===void 0)return this.#t=e,``;if(this.#t=void 0,t===e)return``;let n=this.#e.merge(t,e);if(n===void 0)return``;let{fragment:r}=n;if(n.forged)return`Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: ${r.name()}. Coherence +15.`;let i=r.resonant()?` Resonance detected.`:``;return`Synthesis complete: ${r.name()} (${String(r.frequency().hertz())} Hz). Coherence +15.${i}`}},eo=`corrupt`,to=.1,no=class{#e=new In;read(e,t,n){if(!t.corrupting())return e;let r=n.branch(eo);return e.map((e,t)=>this.#e.mangle(e,to,r.branch(t)))}},ro=1,io=new Map([[`entropic`,2]]),ao=class{cost(e){let t=e.drainEra()?.key()??``;return ro*(io.get(t)??1)*e.drainFactor()}},oo=`frame`,so=class{of(e,t){return e.seed().branch(oo).branch(t)}},co=16,lo=class{#e;constructor(e=[]){if(e.length>co)throw RangeError(`the buffer holds ${String(co)} fragments, not ${String(e.length)}`);this.#e=[...e]}fragments(){return this.#e}size(){return this.#e.length}capacity(){return co}full(){return this.#e.length>=co}add(e){return!this.full()&&(this.#e.push(e),!0)}take(e){if(!Number.isInteger(e)||e<0||e>=this.#e.length)return;let[t]=this.#e.splice(e,1);return t}merge(e,t,n){if(e===t)return;let r=this.#e[e],i=this.#e[t];if(r===void 0||i===void 0)return;let a=n===void 0?new gn(r,i):n(r,i);return this.#e.splice(Math.max(e,t),1),this.#e.splice(Math.min(e,t),1),this.#e.push(a),a}remove(e){let t=this.#e.indexOf(e);return t<0?!1:(this.#e.splice(t,1),!0)}},uo=15,fo=class{#e;#t;#n;#r;#i;#a;constructor(e={coherence:new M().value(),steps:0,visited:[],buffer:[],resonant:0}){this.#e=new M(e.coherence),this.#t=e.steps,this.#n=[...e.visited],this.#r=new Set(this.#n),this.#i=new lo(e.buffer),this.#a=e.resonant}buffer(){return this.#i}resonantTraces(){return this.#a}capture(e){return this.#i.add(e.fragment)?(e.fresh&&e.fragment.resonant()&&(this.#a+=1),!0):!1}merge(e,t,n){let r=this.#i.merge(e,t,n===void 0?void 0:()=>n);if(r!==void 0)return this.restore(uo),r.resonant()&&(this.#a+=1),r}discard(e){return this.#i.remove(e)}drop(e){return this.#i.take(e)}coherence(){return this.#e}steps(){return this.#t}drain(e){this.#e=this.#e.drained(e)}restore(e){this.#e=this.#e.restored(e)}setCoherence(e){this.#e=new M(e)}count(){this.#t+=1}markFootprint(e){for(let t of e.trail()){let e=t.address().toString();this.#r.has(e)||(this.#r.add(e),this.#n.push(e))}}visited(e){return this.#r.has(e.address().toString())}footprints(){return this.#n}placesVisited(){return this.#n.length}reboot(){this.#e=new M}},po=new An,mo=class{#e;#t;#n;#r;#i;#a=new fo;constructor(e){this.#e=e}world(){return this.#t}universe(){return this.#n}here(){return this.#r}player(){return this.#a}resumes(){return this.#i!==void 0}begin(e){this.#t=e,this.#n=this.#e.universe(e),this.#r=void 0,this.#i=void 0,this.#a=new fo}enter(){return this.#n!==void 0&&(this.#o(this.#i??this.#n.startOfJourney()),this.#i=void 0,!0)}descend(e){let t=this.#r?.listing()[e];return t===void 0||t.sealed()?!1:(this.#o(t.arrive()),!0)}move(e){let t=this.#r?.move(e);return t!==void 0&&(this.#o(t.arrive()),!0)}leave(){if(this.#r?.exit()===void 0)return!1;let e=this.#r.leave();return e!==void 0&&(this.#o(e),!0)}toTitle(){return this.#r!==void 0&&(this.#i=this.#r,this.#r=void 0,!0)}capture(e){if(this.#r===void 0||this.#a.buffer().full())return;let t=this.#r.capture(e);if(t!==void 0)return this.#a.capture(t),this.#r.sample(),t.fragment}lottery(){if(this.#r===void 0||this.#a.buffer().full())return;let e=this.#r.lottery(this.#a.steps());if(e!==void 0)return this.#a.capture({fragment:e,fresh:!0}),this.#r.sample(),e}echo(){let e=this.#r?.echo();if(!(e===void 0||e.found()))return e.scan(this.#a.steps())}captureEcho(){if(this.#a.buffer().full())return;let e=this.#r?.echo()?.capture();if(e!==void 0)return this.#a.capture(e),e.fragment}drop(e){if(this.#r?.contents()===null||this.#r===void 0)return;let t=this.#a.buffer().fragments()[e];if(t!==void 0&&this.#r.drop(t))return this.#a.drop(e)}merge(e,t){let n=this.#r?.forge(this.#a.buffer().fragments()),r=this.#a.merge(e,t,n);if(r!==void 0)return this.#r?.infuse(),{fragment:r,forged:n!==void 0}}breachOffered(){return this.#r?.breachOffered(this.#a.buffer().fragments())??!1}breach(){let e=this.#r?.breach(this.#a.buffer().fragments());if(e!==void 0)return this.#a.discard(e),e}prime(){return this.#r?.prime()??!1}spawnKeystone(){let e=this.#r?.keystone();if(!(e===void 0||this.#a.buffer().full()))return this.#a.capture({fragment:e,fresh:!1}),e}reboot(){return this.#t!==void 0&&(this.#n=this.#e.universe(this.#t),this.#i=void 0,this.#a.reboot(),this.#o(this.#n.startOfJourney()),!0)}saved(){if(this.#t===void 0)return;let e=this.#r??this.#i;return new qa({seed:this.#t,address:e?.address(),states:this.#s(this.#a.footprints()),coherence:this.#a.coherence().value(),steps:this.#a.steps(),visited:this.#a.footprints(),buffer:this.#a.buffer().fragments().map(e=>e.data()),resonant:this.#a.resonantTraces()})}restore(e){let t=this.#e.universe(e.seed()),n=new Set;for(let t of e.visited()){let e=g.parse(t);if(e===void 0)return!1;let r=e.parent();if(r!==void 0&&!n.has(r.toString()))return!1;n.add(t)}for(let[r,i]of e.states()){let e=g.parse(r),a=e===void 0||!n.has(r)?void 0:t.descendant(e);if(a===void 0||!a.recall(i)||a.remember()!==i)return!1}for(let n of e.visited()){let e=g.parse(n);if(e===void 0||t.locate(e)===void 0)return!1}let r=e.address(),i=r===void 0?void 0:t.descendant(r);if(r!==void 0&&(i===void 0||i.arrival()!==i))return!1;let a=i?.trail()??[];if(a.some(e=>!n.has(e.address().toString())))return!1;for(let[e,t]of a.entries()){let n=a[e+1];if(n!==void 0&&!t.admits(n))return!1}let o=po.readAll(e.buffer(),t);return o===void 0||o.length>this.#a.buffer().capacity()?!1:(this.#t=e.seed(),this.#n=t,this.#r=i,this.#i=void 0,this.#a=new fo({coherence:e.coherence(),steps:e.steps(),visited:e.visited(),buffer:o,resonant:e.resonant()}),!0)}#o(e){this.#r=e,this.#a.markFootprint(e)}#s(e){let t=new Map;for(let n of e){let e=g.parse(n),r=e===void 0?void 0:this.#n?.descendant(e)?.remember();r!==void 0&&t.set(n,r)}return t}},ho=`reboot`,go=class{#e;constructor(e){this.#e=e}summary(){return{id:ho,outcome:`rebooting`,figures:{}}}options(){return[N(ho,``,`Rebuild`)]}answer(e){if(e===`reboot`)return this.#e.reboot(),{message:`Substrate rebuilt. Coherence ${String(this.#e.player().coherence().value())}.`,done:!0}}},_o=20,vo=[{id:`void`,reached:e=>e.here.abyssal()},{id:`expedition`,reached:e=>e.places>=_o},{id:`severed`,reached:()=>!0}],yo=class{of(e){return vo.find(t=>t.reached(e))?.id??``}},bo=`recap`,xo=`resume`,So=`end-session`,Co=class{#e;#t=new yo;constructor(e){this.#e=e}summary(){let e=this.#e.here(),t=this.#e.player();return{id:bo,outcome:e===void 0?``:this.#t.of({here:e,places:t.placesVisited()}),figures:{locus:e?.address().toString()??``,steps:String(t.steps()),places:String(t.placesVisited()),buffer:String(t.buffer().size()),resonant:String(t.resonantTraces())}}}options(){return[N(xo,`b`,`Resume`),N(So,`q`,`End session`)]}answer(e){if(e===xo)return{message:``,done:!0};if(e===So)return this.#e.toTitle(),{message:``,done:!0}}},wo=`spectrogram`,To=5,Eo=9,Do=`void`,Oo=.3,ko=[`It is cold down here.`,`We see you.`,`Return to the surface.`,`Bedrock approaching.`],Ao=class{of(e,t){if(!e.indoors())return null;let n=t.branch(wo),r=t.branch(Do);return{spectrogram:Array.from({length:To},(e,t)=>n.branch(t).range(1,Eo)),voice:e.abyssal()&&r.probability(Oo)?r.branch(`words`).pick(ko):null}}},jo=class{#e;#t;constructor(e){this.#e=e.drains,this.#t=e.counts}drains(){return this.#e}counts(){return this.#t}},P=new jo({drains:!1,counts:!1}),Mo=new jo({drains:!0,counts:!1}),F=new jo({drains:!0,counts:!0}),No=`enter:`,Po=`move:`,Fo=`capture:`,Io=`scan`,Lo=`echo`,Ro=`capture-echo`,zo=`breach`,Bo=`debug:integrity:`,Vo=`debug:prime`,Ho=`debug:keystone`,Uo=100,Wo={up:`u`,down:`d`,descend:`d`,corridor:`c`,elevator:`b`,back:`b`,forward:`f`},Go=`j`,Ko=`e`,qo=`c`,Jo=Array.from({length:9},(e,t)=>String(t+1)),Yo=Array.from({length:26},(e,t)=>String.fromCharCode(97+t)),Xo=class{#e;#t;#n;#r;#i;#a;#o=new ao;#s=new so;#c=new Ao;#l=new no;#u;#d=``;#f=null;constructor(e){this.#e=new mo(e.world),this.#t=e.entropy,this.#n=e.saves,this.#r=e.debug??!1,this.#i=[{keys:[`n`],turn:P,options:()=>this.#h()&&!this.#g()?[N(`new-world`,`n`,`New world`)]:[],run:()=>this.#v()},{keys:[`e`],turn:P,options:()=>this.#h()&&this.#g()?[N(`enter-world`,`e`,this.#e.resumes()?`Continue`:`Enter world`)]:[],run:()=>this.#_(this.#e.enter(),`Entered ${this.#e.here()?.name()??``}.`)},{keys:[`r`],turn:P,options:()=>this.#h()&&this.#g()?[N(`reroll`,`r`,`Re-roll`)]:[],run:()=>this.#v()},{keys:[],turn:F,options:()=>this.#b(),run:e=>{let t=this.#e.player(),n=t.resonantTraces(),r=this.#e.capture(Number(e.slice(8)));if(r===void 0)return this.#d;let i=t.resonantTraces()>n?` Harmonic resonance: +10%.`:``;return`Captured ${r.name()}. Frequency: ${String(r.frequency().hertz())} Hz.${i}`}},{keys:[],turn:F,options:()=>this.#y(),run:e=>{let t=this.#e.descend(Number(e.slice(6)));return this.#_(t,`Entered ${this.#e.here()?.name()??``}.`)}},{keys:[...new Set(Object.values(Wo))],turn:F,options:()=>this.#S(),run:e=>{let t=e.slice(5),n=this.#e.here(),r=n?.moves().find(e=>e.id===t)?.label??``,i=this.#e.move(t),a=this.#e.here();return this.#_(i,a===n?`${r}.`:`Entered ${a?.name()??``}.`)}},{keys:[`l`],turn:F,options:()=>{let e=this.#e.here();return e?.exit()===void 0?[]:[{...N(`leave`,`l`,e.leaveLabel()),role:`return`}]},run:()=>this.#_(this.#e.leave(),`Returned to ${this.#e.here()?.name()??``}.`)},{keys:[Go],turn:F,options:()=>this.#e.breachOffered()?[{...N(zo,Go,`Breach the Bedrock`),role:`move`}]:[],run:()=>this.#e.breach()===void 0?this.#d:`HARMONIC_INVERSION_PROTOCOL_ENGAGED — breaching the bedrock substrate. Lattice weight normalized: aperture opening at root. The Keystone is spent.`},{keys:[Ko],turn:F,options:()=>this.#x(),run:e=>{if(e===Lo){let e=this.#e.echo();return e===void 0?this.#d:e>=Uo?`HARMONIC_LOCK_ESTABLISHED: Spectral Echo isolated. Signal 100%.`:`SCANNING_VOID: Signal strength increasing... ${String(e)}%.`}let t=this.#e.captureEcho();return t===void 0?this.#d:`VOID_RESONANCE: Echo captured and stabilized. Frequency: ${String(t.frequency().hertz())} Hz.`}},{keys:[`s`],turn:Mo,options:()=>this.#h()?[]:[N(Io,`s`,`Scan`)],run:()=>{let e=this.#e.here(),t=this.#e.player(),n=e?.scan(e=>t.visited(e));return n===void 0?`No scan-compatible structure detected in this strata.`:(this.#f={title:n.title,notes:n.notes,rows:n.rows.map(e=>({cells:e.cells,current:e.current,note:e.note}))},`LOCAL_LATTICE_SCAN_INITIATED [LOCUS: ${e?.address().toString()??``}]. SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.`)}},{keys:[`i`],turn:Mo,options:()=>this.#h()?[]:[N(Ja,`i`,`Buffer`)],run:()=>(this.#u=new $a(this.#e),``)},{keys:[`t`],turn:Mo,options:()=>this.#h()?[]:[N(`to-title`,`t`,`Title screen`)],run:()=>this.#_(this.#e.toTitle(),``)},{keys:[`q`],turn:Mo,options:()=>this.#h()?[]:[N(bo,`q`,`End session`)],run:()=>(this.#u=new Co(this.#e),``)},{keys:[],turn:P,options:()=>this.#r&&!this.#h()?M.edges().map(e=>({...N(`${Bo}${String(e)}`,``,`Integrity ${String(e)}`),role:`debug`})):[],run:e=>{let t=Number(e.slice(16));return this.#e.player().setCoherence(t),`Integrity set to ${String(t)}%.`}},{keys:[],turn:P,options:()=>this.#r&&this.#e.here()?.indoors()===!0?[{...N(Vo,``,`Prime building`),role:`debug`},{...N(Ho,``,`Spawn Keystone`),role:`debug`}]:[],run:e=>{if(e===Vo)return this.#e.prime()?`Building primed: every floor sampled, seven merges in.`:this.#d;let t=this.#e.spawnKeystone();return t===void 0?this.#d:`${t.name()} generated in the trace buffer.`}}];let t=new Set([...this.#i.flatMap(e=>e.keys),`v`]);this.#a=[...Jo,...Yo.filter(e=>!t.has(e))],this.#p()}step(e){this.#f=null;let t=this.#u;if(t!==void 0){let n=t.answer(e);return n!==void 0&&(n.done&&(this.#u=void 0),this.#d=n.message,this.#m()),this.snapshot()}let n=this.#i.find(t=>t.options().some(t=>t.id===e&&!t.sealed));if(n===void 0)return this.snapshot();let r=this.#e.here(),i=this.#e.player();if(r!==void 0&&n.turn.drains()&&(i.drain(this.#o.cost(r)),i.coherence().exhausted()))return this.#u=new go(this.#e),this.#d=``,this.#m(),this.snapshot();if(this.#d=n.run(e),n.turn.counts()){i.count();let e=this.#e.lottery();e!==void 0&&(this.#d=`${this.#d} SPECTRAL_DEVIATION: Extracted Frequency ${String(e.frequency().hertz())} Hz.`)}return this.#m(),this.snapshot()}snapshot(){let e=this.#e.world(),t=this.#e.here(),n=this.#e.player();return{world:e===void 0?null:{seed:e.toString(),name:this.#e.universe()?.name()??``},place:t===void 0?null:this.#C(t,n),player:t===void 0?null:{coherence:n.coherence().value(),band:n.coherence().band(),steps:n.steps()},buffer:t===void 0?null:this.#w(n),prompt:this.#u?.summary()??null,options:this.#u?.options()??this.#i.flatMap(e=>e.options()),message:this.#d,scan:this.#f}}#p(){let e=qa.parse(this.#n.load());if(e===void 0||!this.#e.restore(e))return;let t=this.#e.here(),n=t===void 0?``:` at ${t.name()}`;this.#d=`Restored world ${e.seed().toString()}${n}.`,this.#e.player().coherence().exhausted()&&(this.#u=new go(this.#e))}#m(){let e=this.#e.saved();e!==void 0&&this.#n.save(e.toText())}#h(){return this.#e.here()===void 0}#g(){return this.#e.world()!==void 0}#_(e,t){return e?t:this.#d}#v(){let e=this.#t.draw();return this.#e.begin(e),`World ${e.toString()} drawn.`}#y(){let e=this.#e.here();if(e===void 0)return[];let t=this.#e.player(),n=0,r=e=>{if(e.sealed())return``;if(!e.goesByNumber())return this.#a[n++]??``;let t=String(e.ordinal());return t.length===1?t:``};return e.listing().map((n,i)=>({id:`${No}${String(i)}`,key:r(n),label:`${e.approachVerb()} ${n.callSign()}`,place:n.name(),role:`travel`,sealed:n.sealed(),landmark:n.landmark(),ordinal:String(n.ordinal()),readings:n.readings(),opposite:``,current:n.current(),visited:t.visited(n)}))}#b(){let e=this.#e.here()?.contents();if(e==null)return[];let t=this.#e.player().buffer().full();return e.objects.map((e,n)=>({...N(`${Fo}${String(n)}`,t?``:Jo[n]??``,`Take ${e.name()}`),place:e.name(),role:`take`,sealed:t,ordinal:String(n+1)}))}#x(){let e=this.#e.here()?.echo();if(e===void 0||e.found())return[];let t={...N(Lo,Ko,`Scan for spectral echoes`),role:`move`};return e.locked()?[t,{...N(Ro,qo,`Capture Spectral Echo`),role:`move`,sealed:this.#e.player().buffer().full()}]:[t]}#S(){let e=this.#e.here();return e===void 0?[]:e.moves().map(e=>({...N(`${Po}${e.id}`,Wo[e.id]??``,e.label),role:`move`,opposite:`${Po}${e.opposite}`}))}#C(e,t){let n=e.peers(),r=this.#s.of(e,t.steps());return{kind:e.kind().title(),icon:e.kind().icon(),name:e.name(),address:e.address().toString(),hash:e.hash(),depth:e.depth(),position:n.length===0?null:{label:e.kind().indexLabel(),index:n.indexOf(e)+1,total:n.length},trail:e.trail().map(e=>({icon:e.kind().icon(),kind:e.kind().title(),name:e.name()})),status:e.status(),description:this.#l.read(e.description(),t.coherence(),r),facts:e.facts(),frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),childrenHeading:e.childrenHeading(),contents:this.#T(e),telemetry:this.#c.of(e,r)}}#w(e){let t=e.buffer();return{size:t.size(),capacity:t.capacity(),resonant:e.resonantTraces(),fragments:t.fragments().map(e=>({key:e.key(),name:e.name(),hertz:e.frequency().hertz(),resonant:e.resonant()}))}}#T(e){let t=e.contents();return t===null?null:{objects:t.objects.map(e=>({key:e.key(),name:e.name()})),furniture:t.furniture}}},Zo=class{warn(e){console.warn(e)}},Qo=class{#e;constructor(e){this.#e=e}draw(){let[e=0,t=0]=this.#e.getRandomValues(new Uint32Array(2));return new Ua(e,t)}},$o=`endless-transit.save`,es=class{#e;constructor(e){this.#e=e}load(){try{return this.#e().getItem($o)??void 0}catch{return}}save(e){try{this.#e().setItem($o,e)}catch{}}},ts=class{#e;constructor(e){this.#e=e}name(){return`ENDLESS TRANSIT`}buildLine(){return`build ${this.#e}`}},ns=`default`,rs=`abyssal`;function is(e){return e===null?ns:e.abyssal?rs:e.frame??ns}var as=`buffer`,os=`▲ `,ss=10,cs=`█`,ls=`░`,us={stable:`STABLE`,shifting:`SHIFTING`},ds={text:`[RESONANT]`,label:`Resonant`},fs=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===as}toViewModel(e){let t=e.prompt,n=e.buffer;if(t?.id!==as||n===null)throw Error(`BufferPresenter needs the buffer prompt`);let r=e=>String(e).padStart(2,`0`),i=t.figures.selected??``,a=`[QUANTUM_TRACE_BUFFER_SYNC...]`,o=n.fragments.map((t,n)=>{let a=String(n+1),o=i===String(n),s=t.hertz%2==0,c=Math.floor(t.hertz%100/10)+1;return{key:t.key,ordinal:r(n+1),hertz:`${String(t.hertz)}Hz`,bar:cs.repeat(c)+ls.repeat(ss-c),phase:s?us.stable:us.shifting,phaseKey:s?`stable`:`shifting`,name:t.name,badge:t.resonant?ds:null,selected:o,selectedLabel:o?`Selected`:``,actions:e.options.filter(e=>(e.role===`pick`||e.role===`drop`)&&e.ordinal===a).map(e=>this.#t(e))}}),s=e.options.filter(e=>e.role===`return`).map(e=>this.#n(e));return{scene:as,title:this.#e.name(),frame:is(e.place),heading:a,count:{label:`TRACE_BUFFER`,value:`${r(n.size)}/${r(n.capacity)} FRAGMENTS`},tally:{label:`RESONANT_TRACES`,value:String(n.resonant)},empty:o.length===0?`(No spectral traces detected in local buffer)`:``,rows:o,hint:`Select one fragment, then another: they merge into a hybrid and give 15 Coherence back.`,sync:`SYNC_STATUS: NOMINAL`,dock:s,options:[...o.flatMap(e=>e.actions),...s],note:e.message,status:e.message===``?a:e.message,build:this.#e.buildLine(),regions:{buffer:`Quantum trace buffer`,actions:`Back`}}}#t(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:``}}#n(e){return{...this.#t(e),label:`${os}${e.label.toUpperCase()}`}}},ps=globalThis,ms=e=>e,hs=ps.trustedTypes,gs=hs?hs.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,_s=`$lit$`,I=`lit$${Math.random().toFixed(9).slice(2)}$`,vs=`?`+I,ys=`<${vs}>`,L=document,R=()=>L.createComment(``),z=e=>e===null||typeof e!=`object`&&typeof e!=`function`,bs=Array.isArray,xs=e=>bs(e)||typeof e?.[Symbol.iterator]==`function`,Ss=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cs=/-->/g,ws=/>/g,V=RegExp(`>|${Ss}(?:([^\\s"'>=/]+)(${Ss}*=${Ss}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Ts=/'/g,Es=/"/g,Ds=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),U=Symbol.for(`lit-noChange`),W=Symbol.for(`lit-nothing`),Os=new WeakMap,G=L.createTreeWalker(L,129);function ks(e,t){if(!bs(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return gs===void 0?t:gs.createHTML(t)}var As=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=B;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===B?c[1]===`!--`?o=Cs:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=V):(Ds.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=V):o=ws:o===V?c[0]===`>`?(o=i??B,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?V:c[3]===`"`?Es:Ts):o===Es||o===Ts?o=V:o===Cs||o===ws?o=B:(o=V,i=void 0);let d=o===V&&e[t+1].startsWith(`/>`)?` `:``;a+=o===B?n+ys:l>=0?(r.push(s),n.slice(0,l)+_s+n.slice(l)+I+d):n+I+(l===-2?t:d)}return[ks(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},js=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=As(t,n);if(this.el=e.createElement(l,r),G.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=G.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(_s)){let t=u[o++],n=i.getAttribute(e).split(I),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ps:r[1]===`?`?Fs:r[1]===`@`?Is:q}),i.removeAttribute(e)}else e.startsWith(I)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ds.test(i.tagName)){let e=i.textContent.split(I),t=e.length-1;if(t>0){i.textContent=hs?hs.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],R()),G.nextNode(),c.push({type:2,index:++a});i.append(e[t],R())}}}else if(i.nodeType===8){if(i.data===vs)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(I,e+1))!==-1;)c.push({type:7,index:a}),e+=I.length-1}}a++}}static createElement(e,t){let n=L.createElement(`template`);return n.innerHTML=e,n}};function K(e,t,n=e,r){if(t===U)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=z(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=K(e,i._$AS(e,t.values),i,r)),t}var Ms=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??L).importNode(t,!0);G.currentNode=r;let i=G.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ns(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ls(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=G.nextNode(),a++)}return G.currentNode=L,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ns=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),z(e)?e===W||e==null||e===``?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==U&&this._(e):e._$litType$===void 0?e.nodeType===void 0?xs(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=js.createElement(ks(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ms(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Os.get(e.strings);return t===void 0&&Os.set(e.strings,t=new js(e)),t}k(t){bs(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(R()),this.O(R()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ms(e).nextSibling;ms(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=W}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=K(this,e,t,0),a=!z(e)||e!==this._$AH&&e!==U,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=K(this,r[n+o],t,o),s===U&&(s=this._$AH[o]),a||=!z(s)||s!==this._$AH[o],s===W?e=W:e!==W&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ps=class extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},Fs=class extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},Is=class extends q{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??W)===U)return;let n=this._$AH,r=e===W&&n!==W||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==W&&(n===W||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ls=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}},Rs={M:_s,P:I,A:vs,C:1,L:As,R:Ms,D:xs,V:K,I:Ns,H:q,N:Fs,U:Is,B:Ps,F:Ls},zs=ps.litHtmlPolyfillSupport;zs?.(js,Ns),(ps.litHtmlVersions??=[]).push(`3.3.3`);var J=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ns(t.insertBefore(R(),e),e,void 0,n??{})}return i._$AI(e),i},Bs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Vs=e=>(...t)=>({_$litDirective$:e,values:t}),Hs=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:Us}=Rs,Ws=e=>e,Gs=()=>document.createComment(``),Y=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Us(r.insertBefore(Gs(),i),r.insertBefore(Gs(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Ws(e).nextSibling;Ws(r).insertBefore(e,i),e=t}}}return n},X=(e,t,n=e)=>(e._$AI(t,n),e),Ks={},qs=(e,t=Ks)=>e._$AH=t,Js=e=>e._$AH,Ys=e=>{e._$AR(),e._$AA.remove()},Xs=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Z=Vs(class extends Hs{constructor(e){if(super(e),e.type!==Bs.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Js(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=X(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=X(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=X(i[d],a[m]),Y(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=X(i[f],a[p]),Y(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Xs(o,p,m),u=Xs(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Y(e,i[d]);X(t,a[p]),c[p]=t}else c[p]=X(n,a[p]),Y(e,i[d],n),i[t]=null;p++}else Ys(i[f]),f--}else Ys(i[d]),d++;for(;p<=m;){let t=Y(e,c[m+1]);X(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Ys(e)}return this.ut=o,qs(e,c),U}}),Zs=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`BufferView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
      <div class="app buffer" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap trace" aria-label=${e.regions.buffer} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="buffer-heading">${e.heading}</h2>
          <p class="bcount">
            <span class="k">${e.count.label}</span> <b data-testid="buffer-count">${e.count.value}</b>
            <span class="k">${e.tally.label}</span> <b data-testid="resonant-traces">${e.tally.value}</b>
          </p>
          ${e.empty===``?W:H`<p class="empty" data-testid="buffer-empty">${e.empty}</p>`}
          ${e.rows.length===0?W:H`<ol class="frags" data-testid="fragments">
                  ${Z(e.rows,e=>`${e.ordinal}/${e.key}`,e=>H`
                      <li class=${e.selected?`frag selected`:`frag`} data-fragment=${e.key}>
                        <p class="fline">
                          <span class="ord">${e.ordinal}</span>
                          <span class="hz">${e.hertz}</span>
                          <span class="sig" data-phase=${e.phaseKey} aria-hidden="true">${e.bar}</span>
                          <span class="ph" data-phase=${e.phaseKey}>[${e.phase}]</span>
                        </p>
                        <p class="fname">
                          <b>${e.name}</b>
                          ${e.badge===null?W:H`<span class="badge" aria-hidden="true">${e.badge.text}</span
                                  ><span class="vh">${e.badge.label}</span>`}
                          ${e.selectedLabel===``?W:H`<span class="vh">${e.selectedLabel}</span>`}
                        </p>
                        <p class="facts">
                          ${Z(e.actions,e=>e.id,e=>this.#n(e,`pb fb`))}
                        </p>
                      </li>
                    `)}
                </ol>`}
          <p class="hint">${e.hint}</p>
          <p class="tl">${e.sync}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="dock" aria-label=${e.regions.actions}>
          ${Z(e.dock,e=>e.id,e=>this.#n(e,`pb`))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e,t){return H`
      <button type="button" class=${t} data-option=${e.id}>
        ${e.key===``?W:H`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Qs=`▲ `,$s={text:`>>`,label:`You are here`},ec={lattice:{meter:`COHERENCE`,depth:`HOP_DENSITY`,locus:`LOCUS`,hash:`LOCUS_HASH`,path:`Path from the universe`,sync:`LATTICE_SYNC: [NOMINAL]`},void:{meter:`INTEGRITY`,depth:`ABYSSAL_DEPTH`,locus:`VOID_LOCUS`,hash:`VOID_HASH`,path:`Void trace from the universe`,sync:`VOID_SYNC: [PRESSURE_HIGH]`}},tc=`[VOID] `,nc={text:`[>X<]`,label:`Elevator here`},rc={text:`[V]`,label:`Visited`},ic=`█`,ac=class{#e;constructor(e){this.#e=e}accepts(e){return e.place!==null&&e.prompt===null}toViewModel(e){let t=e.place,n=e.player;if(t===null||n===null)throw Error(`HudPresenter needs a snapshot with a place`);let r=e.options.filter(e=>e.role===`travel`).map(e=>this.#r(e)),i=e.options.filter(e=>e.role===`move`).map(e=>this.#a(e)),a=e.options.filter(e=>e.role===`return`||e.role===`system`).map(e=>this.#a(e)),o=e.options.filter(e=>e.role===`take`),s=e.options.filter(e=>e.role===`debug`).map(e=>this.#a(e)),c=e=>String(e).padStart(2,`0`),l=t.abyssal?ec.void:ec.lattice;return{scene:`${e.world?.seed??``}/${t.address}`,title:this.#e.name(),frame:is(t),crumbs:t.trail.map((e,n)=>({...e,current:n===t.trail.length-1})),meter:{label:l.meter,...M.range(),value:n.coherence,text:`${String(n.coherence)}%`,band:n.band,bandLabel:n.band,valueText:`${String(n.coherence)} percent, ${n.band}`},stats:[{label:`PULSE_TRAVERSAL`,value:String(n.steps)},{label:`TRACE_BUFFER`,value:`${c(e.buffer?.size??0)}/${c(e.buffer?.capacity??0)}`},{label:l.depth,value:c(t.depth)},...t.position===null?[]:[{label:t.position.label,value:`${c(t.position.index)}/${c(t.position.total)}`}],{label:l.locus,value:t.address},{label:l.hash,value:t.hash},{label:`SEED`,value:e.world?.seed??``}],place:{eyebrow:t.kind.toUpperCase(),icon:t.icon,name:t.name.toUpperCase(),tags:t.facts.map(e=>({key:e.key,label:e.label,value:e.value.toUpperCase()})),description:t.description,rows:this.#t(t),diagnostic:t.status},aside:this.#n(t,o,e.buffer?.resonant??0,l.sync),scan:e.scan===null?null:{label:`Scan`,heading:e.scan.title,notes:e.scan.notes,rows:e.scan.rows.map(e=>({cells:e.cells.filter(e=>e.value!==``).map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?$s:null,note:e.note}))},heading:t.childrenHeading.replace(/:$/,``).toUpperCase(),rows:r,moves:i,sealedNote:r.some(e=>e.sealed)?`STRUCTURES SEALED · the lattice opens their doors in a later build`:null,sealedTag:`SEALED`,dock:a,debug:s,options:[...o.filter(e=>!e.sealed).map(e=>this.#i(e)),...r.filter(e=>!e.sealed).map(e=>({id:e.id,key:e.key,label:e.label,opposite:``})),...i,...a,...s],status:e.message,build:this.#e.buildLine(),regions:{hud:`Position`,path:l.path,place:`Where you are`,scan:`Scan`,travel:`Places to enter`,moves:`Moves`,aside:`Readouts`,dock:`Leave and game`,debug:`Debug tools`}}}#t(e){let t=e.contents;return t===null?[]:[{label:`FURNITURE`,value:t.furniture.join(`, `)},...t.objects.length===0?[]:[{label:`OBJECTS_DETECTED`,value:String(t.objects.length)}]]}#n(e,t,n,r){let i=e.contents,a=t.some(e=>e.sealed);return{objects:i===null?null:{label:`In this room`,heading:`IN THIS ROOM`,empty:i.objects.length===0?`No objects detected.`:``,note:a?`BUFFER FULL — merge or drop a fragment to take more.`:``,tiles:i.objects.map((e,n)=>{let r=String(n+1),i=t.find(e=>e.ordinal===r&&!e.sealed);return{key:e.key,name:e.name,ordinal:r,action:i===void 0?null:this.#i(i)}})},telemetry:e.telemetry===null?null:{label:`System telemetry`,heading:`[SYSTEM_TELEMETRY]`,sync:r,spectrogram:{heading:`[QUANTUM_SPECTROGRAM]`,bars:e.telemetry.spectrogram.map(e=>ic.repeat(e))},logs:{heading:`[DECODE_LOGS]`,lines:[`> Trace: ${e.address}`,`> Resonant traces: ${String(n)}`,...e.telemetry.voice===null?[]:[`${tc}${e.telemetry.voice}`]]}}}}#r(e){return{id:e.id,key:e.key.toUpperCase(),ordinal:e.ordinal.padStart(2,`0`),label:e.sealed?e.place:e.label,sealed:e.sealed,landmark:e.landmark,readings:e.readings.map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?nc:null,seen:e.visited?rc:null}}#i(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label,opposite:``}}#a(e){let t=e.role===`return`?Qs:``;return{id:e.id,key:e.key.toUpperCase(),label:`${t}${e.label.toUpperCase()}`,opposite:e.opposite}}},oc=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`HudView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
      <div class="app world" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="hud" aria-label=${e.regions.hud}>
          <nav aria-label=${e.regions.path}>
            <ol class="spark" data-testid="path">
              ${e.crumbs.map(e=>H`
                  <li class=${e.current?`crumb you`:`crumb`}>
                    <span class="vh">${e.kind}</span
                    ><span class="ic" aria-hidden="true">${e.icon}</span
                    ><span class="cn" aria-current=${e.current?`location`:W}
                      >${e.name}</span
                    >
                  </li>
                `)}
            </ol>
          </nav>
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
            ${e.stats.map(e=>H`
                <div class="stat">
                  <dt>${e.label}</dt>
                  <dd>${e.value}</dd>
                </div>
              `)}
          </dl>
        </section>
        <section class="cap" aria-label=${e.regions.place} tabindex="-1" data-rest>
          <p class="eyebrow" data-testid="place-kind">${e.place.eyebrow}</p>
          <h2>
            <span class="ic" aria-hidden="true">${e.place.icon}</span
            ><span data-testid="place-name">${e.place.name}</span>
          </h2>
          <ul class="tags">
            ${e.place.tags.map(e=>H`
                <li class="tag" data-fact=${e.key}><span class="k">${e.label}</span> ${e.value}</li>
              `)}
          </ul>
          <div class="desc">${e.place.description.map(e=>H`<p>${e}</p>`)}</div>
          ${e.place.rows.length===0?W:H`<dl class="prows">
                  ${e.place.rows.map(e=>H`
                      <div class="prow">
                        <dt>${e.label}</dt>
                        <dd>${e.value}</dd>
                      </div>
                    `)}
                </dl>`}
          <p class="diag">${e.place.diagnostic}</p>
          <p class=${e.status===``?`status quiet`:`status`} data-testid="status">${e.status}</p>
        </section>
        ${this.#n(e)}
        ${e.moves.length===0?W:H`
                <nav class="moves" aria-label=${e.regions.moves}>
                  ${Z(e.moves,e=>e.id,e=>this.#a(e))}
                </nav>
              `}
        <div class="side">
          ${e.rows.length===0?W:H`
                  <section class="travel" aria-label=${e.regions.travel}>
                    <h3 class="heading">${e.heading}</h3>
                    ${e.sealedNote===null?W:H`<p class="sealed-note" data-testid="sealed-note">${e.sealedNote}</p>`}
                    <ol class="rows">
                      ${Z(e.rows,t=>`${e.scene}/${t.id}`,t=>this.#i(t,e.sealedTag))}
                    </ol>
                  </section>
                `}
          ${this.#r(e)}
        </div>
        <nav class="dock" aria-label=${e.regions.dock}>
          ${Z(e.dock,e=>e.id,e=>this.#a(e))}
        </nav>
        ${e.debug.length===0?W:H`
                <nav class="debug" aria-label=${e.regions.debug} data-testid="debug">
                  ${Z(e.debug,e=>e.id,e=>this.#a(e))}
                </nav>
              `}
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){let t=e.scan;return t===null?W:H`
      <section class="scan" data-testid="scan" aria-label=${t.label}>
        <h3 class="heading">${t.heading}</h3>
        ${t.notes.map(e=>H`<p class="tl">${e}</p>`)}
        <ol class="srows">
          ${t.rows.map(e=>H`
              <li class=${e.mark===null?`srow`:`srow you`}>
                <p class="cells">
                  ${e.mark===null?W:H`<span class="mark" aria-hidden="true">${e.mark.text}</span
                          ><span class="vh">${e.mark.label}</span>`}${e.cells.map(e=>H`
                      <span class="cell" data-fact=${e.key}
                        ><span class="k">${e.label}</span> ${e.value}</span
                      >
                    `)}
                </p>
                ${e.note===``?W:H`<p class="snote">${e.note}</p>`}
              </li>
            `)}
        </ol>
      </section>
    `}#r(e){let{objects:t,telemetry:n}=e.aside;return t===null&&n===null?W:H`
      <aside class="aside" aria-label=${e.regions.aside}>
        ${t===null?W:H`
                <section class="objects" data-testid="objects" aria-label=${t.label}>
                  <h3 class="heading">${t.heading}</h3>
                  ${t.empty===``?W:H`<p class="empty">${t.empty}</p>`}
                  ${t.note===``?W:H`<p class="empty" data-testid="buffer-full">${t.note}</p>`}
                  ${t.tiles.length===0?W:H`<ul class="tiles">
                          ${Z(t.tiles,t=>`${e.scene}/${t.ordinal}`,e=>e.action===null?H`<li class="tile" data-relic=${e.key}>
                                    <span class="ord">${e.ordinal}</span>${e.name}
                                  </li>`:H`<li>
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
        ${n===null?W:H`
                <section class="tele" data-testid="telemetry" aria-label=${n.label}>
                  <p class="th">${n.heading}</p>
                  <p class="tl">${n.sync}</p>
                  <p class="th">${n.spectrogram.heading}</p>
                  <p class="bars" aria-hidden="true">
                    ${n.spectrogram.bars.map(e=>H`<span>${e}</span>`)}
                  </p>
                  <p class="th">${n.logs.heading}</p>
                  ${n.logs.lines.map(e=>H`<p class="tl">${e}</p>`)}
                </section>
              `}
      </aside>
    `}#i(e,t){let n=e.landmark?`lb landmark`:`lb`;return e.sealed?H`
        <li class="row sealed" data-sealed>
          <span class="ord">${e.ordinal}</span><span class=${n}>${e.label}</span
          ><span class="seal">${t}</span>
        </li>
      `:H`
      <li>
        <button
          type="button"
          class=${[`row`,e.mark===null?``:`you`,e.seen===null?``:`seen`].join(` `).trim()}
          data-option=${e.id}
        >
          <span class="ord">${e.ordinal}</span
          ><span class="mid"
            ><span class="ln"
              ><span class=${n}>${e.label}</span>${e.mark===null?W:H`<span class="mark" aria-hidden="true">${e.mark.text}</span
                      ><span class="vh">${e.mark.label}</span>`}${e.seen===null?W:H`<span class="seen-mark" aria-hidden="true">${e.seen.text}</span
                      ><span class="vh">${e.seen.label}</span>`}</span
            >${e.readings.length===0?W:H`<span class="rds"
                    >${e.readings.map(e=>H`
                        <span class="rd" data-fact=${e.key}
                          ><span class="vh">${e.label}</span>${e.value}</span
                        >
                      `)}</span
                  >`}</span
          >${e.key===``?W:H`<kbd aria-hidden="true">${e.key}</kbd>`}
        </button>
      </li>
    `}#a(e){return H`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?W:H`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},sc=`reboot`,cc=`dead`,lc=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===sc}toViewModel(e){let t=`!!! CRITICAL_COHERENCE_FAILURE !!!`;return{scene:sc,title:this.#e.name(),frame:cc,stageLine:`NEURAL LINK LOST`,eyebrow:`COHERENCE ${String(e.player?.coherence??0)}%`,headline:t,line:`REBOOTING...`,explanation:`The world is rebuilt from the same seed. You wake on the starting street with 100 Coherence; your step count and the places you have visited are kept. Everything that lived inside the world is undone.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?t:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,notice:`Link failure`,actions:`Actions`}}}},uc=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RebootView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
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
          ${Z(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return H`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?W:H`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},dc=`recap`,fc=[{key:`locus`,label:`FINAL_LOCUS`,unit:``},{key:`steps`,label:`PULSE_TRAVERSAL`,unit:` steps`},{key:`places`,label:`CELLS_MAPPED`,unit:` footprints`},{key:`buffer`,label:`BUFFER_DENSITY`,unit:` spectral fragments`},{key:`resonant`,label:`RESONANT_TRACES`,unit:` resonant`}],pc=[`UNMOUNTING_LATTICE_TRACE`,`DEALLOCATING_TRACE_BUFFER`,`RELEASING_NEURAL_CARRIER`,`STABILIZING_SUBSTRATE_WAVEFORM`],mc={void:{heading:`[VOID_RESONANCE_TERMINATION]`,figures:!1,shutdown:!1,lines:[`Your echoes are sinking into the strata.`,`The web is folding back upon itself.`,`The v-v-void... it remembers... [OK]`],closing:`Sleep among the static, Operator.`},expedition:{heading:`[SESSION_RECAP_INITIALIZED]`,figures:!0,shutdown:!1,lines:[],closing:`Expedition successful. Trace synchronized to substrate.`},severed:{heading:`[LINK_TERMINATION_PROTOCOL]`,figures:!1,shutdown:!0,lines:[],closing:`Neural link severed. Waveform stabilized.`}},hc=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===dc}toViewModel(e){let t=e.prompt;if(t?.id!==dc)throw Error(`RecapPresenter needs the recap prompt`);let n=mc[t.outcome];if(n===void 0)throw Error(`no words for the ending '${t.outcome}'`);return{scene:dc,title:this.#e.name(),frame:is(e.place),heading:n.heading,figures:n.figures?this.#t(t):[],steps:n.shutdown?pc.map(e=>({label:`[STATUS]`,process:`${e}...`,done:`[DONE]`})):[],lines:n.lines,closing:n.closing,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?n.heading:e.message,build:this.#e.buildLine(),regions:{recap:`Session recap`,actions:`Actions`}}}#t(e){return fc.map(t=>({label:t.label,value:`${e.figures[t.key]??``}${t.unit}`}))}},gc=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RecapView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
      <div class="app" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap recap" aria-label=${e.regions.recap} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="recap-heading">${e.heading}</h2>
          ${e.figures.length===0?W:H`<dl class="figures" data-testid="figures">
                  ${e.figures.map(e=>H`
                      <div class="figure">
                        <dt>${e.label}</dt>
                        <dd>${e.value}</dd>
                      </div>
                    `)}
                </dl>`}
          ${e.steps.length===0?W:H`<ol class="shutdown" data-testid="shutdown">
                  ${e.steps.map(e=>H`
                      <li>
                        <span class="k">${e.label}</span> ${e.process}
                        <span class="done">${e.done}</span>
                      </li>
                    `)}
                </ol>`}
          ${e.lines.length===0?W:H`<div class="void-lines" data-testid="void-lines">
                  ${e.lines.map(e=>H`<p>${e}</p>`)}
                </div>`}
          <p class="closing" data-testid="closing">${e.closing}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${Z(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return H`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?W:H`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},_c=class{#e;constructor(e){this.#e=e}accepts(e){return e.place===null&&e.prompt===null}toViewModel(e){return{scene:`title`,title:this.#e.name(),tagline:`Vinculum neural interface · lattice uplink`,stageLine:e.world===null?`AWAITING SEED`:`WORLD LOCKED`,world:e.world===null?null:{nameLabel:`UNIVERSE`,name:e.world.name.toUpperCase(),seedLabel:`SEED`,seed:e.world.seed},prompt:`NO WORLD LOADED. DRAW A SEED TO BEGIN.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),status:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,world:`World`,actions:`Actions`}}}},vc=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`TitleView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
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
          ${e.world===null?H`<p class="prompt" data-testid="prompt">${e.prompt}</p>`:H`
                  <p class="eyebrow">${e.world.nameLabel}</p>
                  <h2 data-testid="world-name">${e.world.name}</h2>
                  <p class="eyebrow">${e.world.seedLabel}</p>
                  <p class="seed" data-testid="world-seed">${e.world.seed}</p>
                `}
          <p class=${e.status===``?`status quiet`:`status`} data-testid="status">${e.status}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${Z(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return H`
      <button type="button" class="pb" data-option=${e.id}>
        <kbd aria-hidden="true">${e.key}</kbd><span>${e.label}</span>
      </button>
    `}},Q=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}accepts(e){return this.#e.accepts(e)}mount(e){this.#t.mount(e)}show(e){let t=this.#e.toViewModel(e);return this.#t.render(t),t}dispose(){this.#t.dispose()}},yc=class{#e;#t=new AbortController;#n=[];constructor(e){this.#e=e}attach(e){let t=this.#t.signal;e.addEventListener(`click`,e=>{this.#r(e)},{signal:t}),e.ownerDocument.addEventListener(`keydown`,e=>{this.#i(e)},{signal:t})}offer(e){this.#n=e}detach(){this.#t.abort()}#r(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`button[data-option]`)?.dataset.option;t!==void 0&&this.#n.some(e=>e.id===t)&&this.#e(t)}#i(e){if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;let t=this.#n.find(t=>t.key.toLowerCase()===e.key.toLowerCase());t!==void 0&&(e.preventDefault(),this.#e(t.id))}},bc=class{#e;#t;#n;#r;#i;#a;#o;#s;#c=[];#l;constructor(e,t){this.#e=e,this.#t=t,this.#n=new yc(e=>{this.#l=this.#c.find(t=>t.id===e),this.#u(this.#e.step(e))})}start(e){this.#r=e,this.#i=this.#d(e),this.#n.attach(e),this.#u(this.#e.snapshot())}stop(){this.#n.detach(),this.#a?.dispose(),this.#a=void 0,this.#i?.remove(),this.#i=void 0,this.#r=void 0}#u(e){let t=this.#r,n=this.#t.find(t=>t.accepts(e));if(t===void 0||n===void 0)throw Error(`no screen accepts this snapshot`);let r=this.#p();n!==this.#a&&(this.#a?.dispose(),n.mount(t),this.#a=n);let i=n.show(e);if(this.#n.offer(i.options),this.#c=i.options,this.#f(i.status),r?.isConnected===!1&&this.#m(i.scene,this.#l),i.scene!==this.#o){this.#h();let e=r instanceof HTMLElement?r.dataset.option:void 0;this.#s=this.#o===void 0||e===void 0?void 0:{scene:this.#o,optionId:e}}this.#o=i.scene}#d(e){let t=e.ownerDocument.createElement(`p`);return t.className=`vh`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),e.prepend(t),t}#f(e){this.#i!==void 0&&this.#i.textContent!==e&&(this.#i.textContent=e)}#p(){let e=this.#r?.ownerDocument.activeElement;return e!=null&&this.#r?.contains(e)===!0?e:void 0}#m(e,t){let n=this.#r,r=[...n?.querySelectorAll(`button[data-option]`)??[]],i=this.#s,a=i?.scene===e?r.find(e=>e.dataset.option===i.optionId):void 0;if(a!==void 0){a.focus({preventScroll:!0});return}let o=t?.opposite??``,s=n?.querySelector(`[data-rest]`);if(o!==``&&this.#c.some(e=>e.id===o)&&s!=null){s.focus({preventScroll:!0});return}r.find(e=>e.dataset.option!==o)?.focus({preventScroll:!0})}#h(){this.#r?.ownerDocument.defaultView?.scrollTo({top:0,left:0,behavior:`instant`})}},xc=document.querySelector(`#app`);if(xc===null)throw Error(`#app is missing from index.html`);var Sc=new tn(new en),Cc=new URLSearchParams(window.location.search).has(`debug`),wc=new Xo({world:new ka(Sc,new La(Sc),new Zo),entropy:new Qo(window.crypto),saves:new es(()=>window.localStorage),debug:Cc}),$=new ts(`3e48739`);new bc(wc,[new Q(new lc($),new uc),new Q(new hc($),new gc),new Q(new fs($),new Zs),new Q(new _c($),new vc),new Q(new ac($),new oc)]).start(xc);