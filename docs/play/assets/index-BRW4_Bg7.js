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
`,ee=`Gallery
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
`,te=`Salon
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
`,ne=`Slab
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
`,re=`Hub
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
`,ie=`Pod
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
`,ae=`Shell
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
`,oe=`Pavilion
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
`,se=`Void
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
`,ce=`Forum
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
`,le=`small
medium
large
`,ue=`Arcology
Mega-Structure
Spire
Sky-Anchor
Bastion
Citadel
`,de=`Block
Plaza
Heights
Center
Complex
`,fe=`Annex
Cell
Unit
Pod
Hut
Point
`,pe=`Silver
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
`,me=`head
tail
`,he=`town
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
`,ge=`Arid
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
`,_e=`prefix
core
suffix
`,ve=`The United
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
`,ye=`Republic
Kingdom
Empire
Federation
Sovereignty
Union
Territories
Lands
Domain
`,be=`Alpha
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
`,xe=`greek
type
`,Se=`Strand
Thread
Web
Link
Sync
Stream
Flow
Pulse
`,Ce=`lobby
peak
`,we=`TRANSIT_LOBBY
`,Te=`PEAK_OBSERVATORY
`,Ee=`MECHANICAL_SUMP
STORAGE_CELL
POWER_RELAY
FILTRATION_INTAKE
`,De=`EXECUTIVE_SUITE
NEURAL_UPLINK
DATA_VAULT
VIP_QUARTERS
`,Oe=`basement
living
executive
`,ke=`LIVING_UNIT
RESEARCH_LAB
HYDROPONIC_BAY
BIO_SERVER
`,Ae=`Ter
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
`,je=`head
tail
`,Me=`ra
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
`,Ne=`Hydroponic Bay||stillness
Spore Farm||stillness
Oxygen Sump||stillness
Growth Chamber||stillness
`,Pe=`Prayer Hall||stillness
Ritual Chamber||stillness
Archive||stillness
Memory Well||frost
`,Fe=`Trading Floor||stillness
Logic Market||stillness
Credit Hub||humming
Supply Node||clicking
`,Ie=`Power Plant||ozone
Processing Core||ozone
Maintenance Bay||clicking
Fuel Depot||humming
`,Le=`Security Station|burned DANGER|clicking
Barracks||humming
Armory|burned DANGER|clicking
Tactical Hub||humming
`,Re=`Laboratory|stamped DATA_VAULT|ozone
Neural Link Array||ozone
Observation Deck||stillness
Bio-Server|stamped DATA_VAULT|ozone
`,ze=`Outer
Inner
Core
Rim
Void
Prime
Secondary
Tertiary
Quaternary
`,Be=`descriptor
noun
`,Ve=`Sector
Quadrant
Grid
Matrix
Zone
Region
Reach
Expanse
`,He=`prefix
suffix
`,Ue=`Alpha
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
`,We=`Prime
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
`,Ge=`High
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
`,Ke=`adjective
noun
`,qe=`Way
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
`,Je=`a single flickering green bulb
pulsing red emergency strobes
unshielded sparking conduits
the dim glow of dying data-cores
harsh sodium-yellow glare
complete darkness punctuated by blue static
the rhythmic blink of a foundation-alarm
cold moonlight-simulations through ceiling-cracks
`,Ye=`the warm cathode glow of a CRT monitor
flickering fluorescent tubes with a distinct hum
the orange pulse of vacuum tubes
buzzing neon signage leaking green light
dim yellow incandescent bulbs on frayed wires
the flicker of a slide projector left cycling
a desk lamp with a bent green shade
the amber glow of a radio dial
a bare bulb behind a cracked lampshade
the phosphor trace of an oscilloscope
`,Xe=`the flickering flame of oil lamps
guttering beeswax candles
harsh sunlight filtered through dust
low-burning embers in a stone hearth
pale moonlight through a narrow aperture
guttering tallow candles in iron sconces
embers breathing in a clay hearth
dust-thick sunlight through a narrow slit
a single oil lamp on a stone ledge
moonlight through a broken lattice
`,Ze=`the green phosphor sweep of a radar scope
ring-shaped fluorescent tubes humming behind chrome grilles
the sickly glow of radium-painted dials
a bare bulb swinging inside a lead-lined cage
harsh flashbulb pops from a camera no one is holding
the strobe of a rotating beacon
formica gleaming under fluorescent panels
a lava lamp's slow orange churn
the pale wash of a television test pattern
a neon diner sign buzzing red
`,Qe=`the blue-white wash of a flat-panel monitor left on
status LEDs blinking green and amber along an ethernet hub
a screensaver's slow colours crawling across the ceiling
the translucent glow of a tower case lit from within
pale light leaking around a frosted glass disc
the cyan glow of a loading bar
a monitor cycling through screensaver stars
a wall of LEDs blinking out of sync
a scanner's green line sweeping the floor
the pale flicker of a failing backlight
`,$e=`light that fades the moment you look at it
a residual glow bleeding from surfaces that no longer exist
the after-image of a lamp that has already gone out
dissolving motes of static drifting like ash
a dull heat-shimmer where the ceiling used to be
light that arrives a moment after its source
a glow with no lamp left to cast it
sunlight faded to the colour of dust
the memory of fluorescence, humming
shadows brighter than the room
`,et=`a soft holographic haze with no visible source
laser-etched lines glowing along the seams of the floor
smart glass panels dimming and brightening on their own
the violet corona of an idle plasma coil
a drone's searchlight sweeping past the doorway
a lattice of laser threads across the ceiling
bioluminescent panels breathing slowly
the white glare of a field emitter
a hologram flickering between two rooms
light bent around a gravity plate
`,tt=`abyssal
analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,nt=`the intense white arc of a welding torch
humming mercury-vapor lamps
cold sodium-glare reflecting off soot
pulsing red emergency strobes
the steady burn of gas-lanterns
a foundry glow through smoked glass
carbide lamps hissing on hooks
a wall of gauges lit from behind
sparks arcing from an open junction
oil lamps swinging on a chain
`,rt=`shifting quantum particles suspended in air
the soft, directionless glow of pure data
blinding white singularity-flashes
flickering holographic rays in various spectra
the cold blue luminescence of dark-matter cores
light folded twice before it reaches you
the blue shimmer of a probability field
a glow that is brighter when you look away
stars visible through a wall that is not there
the slow pulse of a zero-point coil
`,it=`a sprawling grow-chamber with hanging pods
terraced geometric shelves for organic data
low-humidity storage-vault architecture
spatial grid designed for nutrient-flow
domed environment with recycled atmosphere
a humid grow-hall under banks of pink lamps
stacked hydroponic trays dripping into gutters
a seed vault of numbered steel drawers
a composting pit ringed with vents
a greenhouse with every pane fogged
`,at=`a cavernous vaulted hall
geometry designed for acoustic resonance
ornate processional pathway with high ceilings
ceremonial viewing-gallery structure
sacred geometric reconstruction
a circular nave beneath a dark dome
a hall of benches facing an empty dais
a crypt of stacked memory-urns
a bell chamber with the bell removed
a reliquary room lined with sealed niches
`,ot=`a tiered trading floor beneath a dead ticker board
shuttered market stalls arranged in a strict grid
a vaulted credit hall of teller cages and pneumatic tubes
shelving-lined supply geometry with a barcode on every edge
an open atrium of kiosks lit for customers who never came
a counting room of locked drawers and ledgers
a showroom of empty plinths
a warehouse aisle of numbered crates
a ticket hall with every window shuttered
an exchange floor of dead terminals
`,st=`a soot-blackened machine hall with catwalks overhead
pipe-choked geometry built around a single humming turbine
a maintenance pit ringed by chain hoists and drip trays
a cavernous fuel bay of riveted tanks and warning stencils
gantry-braced architecture that vibrates with every pulse
a pump room throbbing behind a steel grille
a foundry floor scarred by cooled spills
a control gallery over a silent line
a coal bunker with a sloping floor
a compressor hall lined with gauges
`,ct=`a cramped, blast-shielded alcove
reinforced bunker-like geometry
spatial cell with tactical telemetry projected on the floor
narrow kill-zone corridor layout
armored transit-node architecture
a briefing room with the map torn down
a magazine of empty racks and chains
a watch post with a slit for a window
a gas-lock chamber with two sealed doors
a drill floor marked in faded lines
`,lt=`a sterile, hyper-clean laboratory cell
geometry optimized for spectral observation
sprawling containment unit with glass partitions
data-rich environment with floating schematics
modular experimental subspace
a clean room behind a double airlock
an archive of slide drawers and lamps
an observation cell walled in one-way glass
a specimen vault of frosted jars
a calibration bay of silent instruments
`,ut=`geometry that folds back into itself at the corners
a non-Euclidean chamber whose far wall is also its floor
a probability-field cell that resolves only while observed
space stretched thin around a dormant quantum core
a time-dilated alcove where echoes arrive before their source
a corridor that ends where it began
a room whose ceiling is another floor
a stairwell that descends into its own top
an alcove folded inside a larger alcove
a chamber lit by its own reflection
`,dt=`a cavernous brutalist vault
geometry designed for substrate-pressure
massive maintenance sub-void
foundation pit with echoing depths
unfinished spatial segment
recursively deepening concrete shaft
oppressive low-ceiling transit-node
forgotten infrastructure cell
`,ft=`abyssal
Agricultural
Ceremonial
Commercial
Industrial
Military
Research
Singularity
`,pt=`raw pour-concrete
rusted rebar
vibrating metal plates
exposed heavy cabling
moist, dark aggregate
black oily tiles
heavily weathered granite
oxidized iron plating
`,mt=`silk damask with gold thread
heavy mahogany paneling
plaster with crumbling frescoes
velvet-lined stonework
gilded ivory slabs
stone tracery over faded frescoes
dark oak panels carved with vines
gilt mouldings peeling from plaster
cold flagstone under tapestries
stained glass set into black iron
`,ht=`velvet-flocked wallpaper above mahogany wainscoting
brass-framed panels of etched crystal
silk tapestries hung over gilt plaster
clock-mechanism friezes in tarnished brass
mirrored panels in ornate gold-leaf frames
wallpaper of interlocking clock faces
mahogany cabinets glazed with crystal
panels of tooled leather and brass studs
cream plaster with gilded cornices
mirrored alcoves behind velvet ropes
`,gt=`unyielding obsidian blocks
matte-black composite plating
brutalist concrete with geometric grooves
featureless grey ceramic
seamless dark alloy
matte basalt slabs with no visible mortar
dark composite panels etched with a grid
polished grey stone that swallows echoes
seamless black alloy, faintly warm
hexagonal ceramic tiles, unbroken
`,_t=`flickering acrylic panels
exposed wiring behind translucent plastic
projected holographic static
humming glass conduits
backlit mirrored surfaces
wet-look acrylic streaked with pink light
glass block lit from within
panels of dead advertising screens
corrugated plastic over flickering tubes
mirrored strips under a violet wash
`,vt=`pulsing sinew and bone-like struts
translucent membrane over fluid-filled sacks
hardened chitinous plates
woven vine-lattices with moss overgrowth
calcified shell-fragments
ribbed cartilage that flexes as you pass
damp membrane veined with light
overlapping scales the colour of bone
a lattice of roots grown through plaster
soft fungal shelves in tiers
`,yt=`corrugated sheets bolted over crumbling brick
flaking industrial paint over pitted iron
welded scrap plates streaked with orange oxide
oil-stained concrete cracked down to the rebar
chain-link mesh stretched over rusted girders
oxide-streaked steel with weeping seams
patched sheet metal over brick
iron plating bubbled with corrosion
soot-black concrete and rusted mesh
warped girders behind tarpaulin
`,bt=`shoji screens of paper stretched over cedar
lacquered panels painted with cranes and mist
plaster stained by the smoke of a thousand lanterns
woven bamboo lattice over dark timber
vermilion pillars framing calligraphy scrolls
dark cedar beams over white plaster
sliding panels painted with pines
bamboo slats and rice-paper light
black lacquer inlaid with mother-of-pearl
stacked stone under a tiled eave
`,xt=`seamless white surfaces with no visible joins
perfectly matte panels that swallow every shadow
glass so clear it reads as open air
white light strips set flush into featureless plaster
silent, unmarked panels that hum when touched
white panels with no seams or shadows
frosted glass lit evenly from nowhere
matte surfaces that refuse a reflection
pale plaster, absolutely silent
a curved wall with no corner to find
`,St=`fluted marble columns set into alabaster
sun-bleached limestone carved with laurel friezes
ivory-veined marble polished to a mirror
weathered travertine blocks joined without mortar
painted plaster of sandaled figures in procession
white marble veined with gold
fluted columns between painted panels
limestone blocks carved with olive wreaths
travertine warmed by an unseen sun
bronze plaques set into alabaster
`,Ct=`white
blue
pink
gray
purple
orange
green
red
`,wt=`overturned
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
`,Tt=`obsidian shard
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
`,Et=`stone gargoyle
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
`,Dt=`velvet armchair
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
`,Ot=`abyssal
baroque
gilded
monolith
neon
organic
rust
shogun
void
zenith
`,kt=`obsidian cube
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
`,At=`flickering light tube
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
`,jt=`chitinous plate
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
`,Mt=`corrugated metal sheet
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
`,Nt=`shoji screen
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
`,Pt=`floating white sphere
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
`,Ft=`marble pillar
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
`,It=`A long corridor with multiple doors
A narrow service corridor, doors set flush into either wall
A curved gallery of doors beneath a single strip of light
A dead-straight corridor whose far end dissolves into static
`,Lt=`The air hums with the resonance of {culture} geometry.
{culture} geometry presses in from every wall; the elevator sighs shut behind you.
A landing of {culture} design, silent except for the lift cables ticking overhead.
The floor plate resonates faintly with {culture} architecture.
`,Rt=`corridor
floor
`,zt=`inscriptions
materials
states
`,Bt=`VOID_SINK
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
`,Vt=`Heavy Bulkhead|A heavily reinforced poly-slab bulkhead.
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
`,Ht=`Vibrating|The surface is vibrating with a low-frequency thrum.
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
`,Ut=`colours
conditions
planet-frames
traits
`,Wt=`baroque|yellow
gilded|white
monolith|cyan
neon|bright-cyan
organic|green
rust|red
shogun|magenta
void|grey
zenith|blue
`,Gt=`crt monitor
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
`,Kt=`clay pot
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
`,qt=`chrome tailfin
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
`,Jt=`translucent blue shell
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
`,Yt=`dissolving edge
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
`,Xt=`hologram projector
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
`,Zt=`analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,Qt=`pressure gauge
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
`,$t=`shifting geometry
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
`,en=`Ceremonial
Military
Industrial
Agricultural
Research
Commercial
`,tn=class{#e;constructor(){this.#e=Object.assign({"./names/buildings/adj/abyssal.txt":e,"./names/buildings/adj/baroque.txt":t,"./names/buildings/adj/gilded.txt":n,"./names/buildings/adj/monolith.txt":r,"./names/buildings/adj/neon.txt":i,"./names/buildings/adj/organic.txt":a,"./names/buildings/adj/rust.txt":o,"./names/buildings/adj/shogun.txt":s,"./names/buildings/adj/void.txt":c,"./names/buildings/adj/zenith.txt":l,"./names/buildings/compounds.txt":u,"./names/buildings/concepts.txt":d,"./names/buildings/index.txt":f,"./names/buildings/landmarks.txt":p,"./names/buildings/noun/abyssal.txt":m,"./names/buildings/noun/baroque.txt":ee,"./names/buildings/noun/gilded.txt":te,"./names/buildings/noun/monolith.txt":ne,"./names/buildings/noun/neon.txt":re,"./names/buildings/noun/organic.txt":ie,"./names/buildings/noun/rust.txt":ae,"./names/buildings/noun/shogun.txt":oe,"./names/buildings/noun/void.txt":se,"./names/buildings/noun/zenith.txt":ce,"./names/buildings/sizes/index.txt":le,"./names/buildings/sizes/large.txt":ue,"./names/buildings/sizes/medium.txt":de,"./names/buildings/sizes/small.txt":fe,"./names/city/head.txt":pe,"./names/city/index.txt":me,"./names/city/tail.txt":he,"./names/country/core.txt":ge,"./names/country/index.txt":_e,"./names/country/prefix.txt":ve,"./names/country/suffix.txt":ye,"./names/filament/greek.txt":be,"./names/filament/index.txt":xe,"./names/filament/type.txt":Se,"./names/floors/index.txt":Ce,"./names/floors/lobby.txt":we,"./names/floors/peak.txt":Te,"./names/floors/zones/basement.txt":Ee,"./names/floors/zones/executive.txt":De,"./names/floors/zones/index.txt":Oe,"./names/floors/zones/living.txt":ke,"./names/planet/head.txt":Ae,"./names/planet/index.txt":je,"./names/planet/tail.txt":Me,"./names/rooms/Agricultural.txt":Ne,"./names/rooms/Ceremonial.txt":Pe,"./names/rooms/Commercial.txt":Fe,"./names/rooms/Industrial.txt":Ie,"./names/rooms/Military.txt":Le,"./names/rooms/Research.txt":Re,"./names/sector/descriptor.txt":ze,"./names/sector/index.txt":Be,"./names/sector/noun.txt":Ve,"./names/solar-system/index.txt":He,"./names/solar-system/prefix.txt":Ue,"./names/solar-system/suffix.txt":We,"./names/street/adjective.txt":Ge,"./names/street/index.txt":Ke,"./names/street/noun.txt":qe,"./themes/atmosphere/lighting/abyssal.txt":Je,"./themes/atmosphere/lighting/analog.txt":Ye,"./themes/atmosphere/lighting/ancient.txt":Xe,"./themes/atmosphere/lighting/atomic.txt":Ze,"./themes/atmosphere/lighting/digital.txt":Qe,"./themes/atmosphere/lighting/entropic.txt":$e,"./themes/atmosphere/lighting/future.txt":et,"./themes/atmosphere/lighting/index.txt":tt,"./themes/atmosphere/lighting/industrial.txt":nt,"./themes/atmosphere/lighting/singularity.txt":rt,"./themes/atmosphere/structures/Agricultural.txt":it,"./themes/atmosphere/structures/Ceremonial.txt":at,"./themes/atmosphere/structures/Commercial.txt":ot,"./themes/atmosphere/structures/Industrial.txt":st,"./themes/atmosphere/structures/Military.txt":ct,"./themes/atmosphere/structures/Research.txt":lt,"./themes/atmosphere/structures/Singularity.txt":ut,"./themes/atmosphere/structures/abyssal.txt":dt,"./themes/atmosphere/structures/index.txt":ft,"./themes/atmosphere/walls/abyssal.txt":pt,"./themes/atmosphere/walls/baroque.txt":mt,"./themes/atmosphere/walls/gilded.txt":ht,"./themes/atmosphere/walls/monolith.txt":gt,"./themes/atmosphere/walls/neon.txt":_t,"./themes/atmosphere/walls/organic.txt":vt,"./themes/atmosphere/walls/rust.txt":yt,"./themes/atmosphere/walls/shogun.txt":bt,"./themes/atmosphere/walls/void.txt":xt,"./themes/atmosphere/walls/zenith.txt":St,"./themes/colours.txt":Ct,"./themes/conditions.txt":wt,"./themes/cultures/abyssal.txt":Tt,"./themes/cultures/baroque.txt":Et,"./themes/cultures/gilded.txt":Dt,"./themes/cultures/index.txt":Ot,"./themes/cultures/monolith.txt":kt,"./themes/cultures/neon.txt":At,"./themes/cultures/organic.txt":jt,"./themes/cultures/rust.txt":Mt,"./themes/cultures/shogun.txt":Nt,"./themes/cultures/void.txt":Pt,"./themes/cultures/zenith.txt":Ft,"./themes/descriptions/corridor.txt":It,"./themes/descriptions/floor.txt":Lt,"./themes/descriptions/index.txt":Rt,"./themes/doors/index.txt":zt,"./themes/doors/inscriptions.txt":Bt,"./themes/doors/materials.txt":Vt,"./themes/doors/states.txt":Ht,"./themes/index.txt":Ut,"./themes/planet-frames.txt":Wt,"./themes/timelines/analog.txt":Gt,"./themes/timelines/ancient.txt":Kt,"./themes/timelines/atomic.txt":qt,"./themes/timelines/digital.txt":Jt,"./themes/timelines/entropic.txt":Yt,"./themes/timelines/future.txt":Xt,"./themes/timelines/index.txt":Zt,"./themes/timelines/industrial.txt":Qt,"./themes/timelines/singularity.txt":$t,"./themes/traits.txt":en})}read(e){return this.#e[`./${e}`]}paths(){return Object.keys(this.#e).map(e=>e.replace(/^\.\//,``))}},nn=class{#e;#t=new Map;constructor(e){this.#e=e}index(e){return this.list(`${e}/index`)}has(e){return this.#t.has(e)||this.#e.read(`${e}.txt`)!==void 0}list(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#n(`${e}.txt`);return this.#t.set(e,n),n}pairs(e){return this.list(e).map(t=>{let n=t.indexOf(`|`);if(n<0)throw Error(`content file ${e}.txt: '${t}' is not a key|value line`);return[t.slice(0,n).trim(),t.slice(n+1).trim()]})}#n(e){let t=this.#e.read(e);if(t===void 0)throw Error(`content file is missing: ${e}`);let n=t.split(/\r?\n/).map(e=>e.trim()).filter(e=>e!==``);if(n.length===0)throw Error(`content file has no entries: ${e}`);return Object.freeze(n)}},rn=/^0(\.(0|[1-9]\d*))*$/,h=class e{#e;constructor(e){for(let t of e)if(!Number.isSafeInteger(t)||t<0)throw RangeError(`a child index is a whole number from zero up, got ${String(t)}`);this.#e=Object.freeze([...e])}static parse(t){if(!rn.test(t))return;let n=t.split(`.`).slice(1).map(Number);return n.every(e=>Number.isSafeInteger(e))?new e(n):void 0}child(t){return new e([...this.#e,t])}parent(){return this.#e.length===0?void 0:new e(this.#e.slice(0,-1))}indices(){return this.#e}depth(){return this.#e.length}equals(e){return this.toString()===e.toString()}toString(){return[`0`,...this.#e.map(String)].join(`.`)}},an=1e3,on=100*an-1,sn=`☠`,cn=`map`,g=class{#e;#t;constructor(e){this.#e=e}callSign(){return this.name()}ordinal(){return this.index()+1}goesByNumber(){return!1}facts(){return[]}readings(){return[]}listing(){return this.children()}admits(e){return this.listing().includes(e)}arrival(){return this}arrive(){let e=this.arrival();return e===this?this:e.arrive()}current(){return!1}exit(){return this.parent()?.arrival()}leave(){return this.exit()}leaveLabel(){return`Leave ${this.kind().title()}`}moves(){return[]}move(e){if(this.moves().some(t=>t.id===e))throw Error(`${this.kind().key()} offers the move '${e}' but does not make it`)}remember(){}recall(e){return e===this.remember()}startOfJourney(){return this.children()[0]?.startOfJourney()??this}sealed(){return!1}landmark(){return!1}contents(){return null}scan(e){}scanned(e){return[]}sensed(){return``}findRelic(e){return this.contents()?.objects.find(t=>t.key()===e)}capture(e){if(this.contents()?.objects[e]!==void 0)throw Error(`${this.kind().key()} holds things but does not hand them over`)}drop(e){if(this.contents()!==null)throw Error(`${this.kind().key()} holds things but takes none in (${e.name()})`);return!1}lottery(e){}echo(){}sample(){this.parent()?.sample()}infuse(){this.parent()?.infuse()}forge(e){return this.parent()?.forge(e)}keystone(){return this.parent()?.keystone()}prime(){return this.parent()?.prime()??!1}breachOffered(e){return!1}breach(e){}abyssal(){return this.parent()?.abyssal()??!1}peers(){return this.parent()?.children()??[]}root(){return this.parent()?.root()??this}indoors(){return this.parent()?.indoors()??!1}mapped(){return!0}mapNodes(){return this.listing()}mapGlyph(){return this.abyssal()?sn:this.kind().icon()}mapSpot(e,t){let n=this.seed().branch(cn);return{x:n.branch(`x`).range(0,e-1),y:n.branch(`y`).range(0,t-1)}}meta(){return``}drainFactor(){return this.parent()?.drainFactor()??1}vibe(){return this.parent()?.vibe()}drainEra(){return this.vibe()?.era()}landmarkFactor(){return this.parent()?.landmarkFactor()??1}seed(){return this.#e.seed}parent(){return this.#e.parent}index(){return this.#e.index}address(){return this.parent()?.address().child(this.index())??new h([])}depth(){return this.address().depth()}hash(){let e=this.seed().branch(`coords`),t=t=>(e.branch(t).range(0,on)/an).toFixed(3);return`${t(`x`)} / ${t(`y`)}`}trail(){return[...this.parent()?.trail()??[],this]}children(){return this.#t??=Object.freeze([...this.#e.children.childrenOf(this)]),this.#t}populated(){return this.#t!==void 0}descendant(e){if(!this.sealed())return e.indices().slice(this.depth()).reduce((e,t)=>{let n=e?.children()[t];return n?.sealed()===!0?void 0:n},this)}locate(e){return e.indices().slice(this.depth()).reduce((e,t)=>e?.children()[t],this)}},_=class{#e;#t;#n;#r;constructor(e){this.#e=e.key,this.#t=e.title,this.#n=e.icon,this.#r=e.indexLabel}key(){return this.#e}title(){return this.#t}icon(){return this.#n}indexLabel(){return this.#r}equals(e){return this.#e===e.#e}},ln=new _({key:`apartment`,title:`Apartment`,icon:`🚪`,indexLabel:`UNIT`}),un=`dealt`,dn=class extends g{#e;#t;#n;#r;#i;#a;#o;constructor(e,t){super(e),this.#e=t.door,this.#t=t.behind,this.#n=t.culture,this.#r=t.era,this.#i=t.anomaly,this.#a=t.rooms,this.#o=Object.freeze([...t.relics])}kind(){return ln}name(){return this.#e.description()}door(){return this.#e}behind(){return this.#t}culture(){return this.#n}era(){return this.#r}anomaly(){return this.#i}roomCount(){return this.#a}relics(){return this.#o}relicsIn(e){return this.#o.filter((t,n)=>this.seed().branch(un).branch(n).range(0,this.#a-1)===e)}arrival(){return this.children()[0]??this}readings(){return[{key:`narrative`,label:`APPEARANCE`,value:this.#e.narrative()}]}scanned(){return[{key:`signal`,label:`TRACE`,value:this.#e.trace().name()},{key:`alert`,label:`INSCRIPTION`,value:this.#e.inscription()?.formatted()??``},{key:`reading`,label:`MATERIAL`,value:this.#e.material()},{key:`reading`,label:`STATE`,value:this.#e.state()},{key:`zone`,label:`ROOM_TYPE`,value:this.#t.name()}]}sensed(){return this.#e.sensed()}scan(e){return{title:`[STRATA_OVERVIEW]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:t,current:!1,note:``}))}}description(){return[]}facts(){return this.#i?[{key:`alert`,label:`TEMPORAL_ANOMALY_DETECTED`,value:`[!]`}]:[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#r.key()}]}status(){return this.#i?`ATMOS: [UNSTABLE]`:`ATMOS: [NOMINAL]`}childrenHeading(){return`Internal cells detected:`}approachVerb(){return`Enter Room:`}},fn=new _({key:`crypt`,title:`Crypt`,icon:`🚪`,indexLabel:`UNIT`}),pn=class extends dn{kind(){return fn}facts(){return[{key:`alert`,label:`ABYSSAL_RESONANCE`,value:`DETECTED`}]}status(){return`ATMOS: [PRESSURE_HIGH]`}},mn=`hidden`,hn=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.steps,this.#n=e.frequency}key(){return`${mn}(${this.#e.toString()}@${String(this.#t)})`}name(){return`Hidden Frequency`}frequency(){return this.#n}resonant(){return!1}data(){return{kind:mn,from:this.#e.toString(),steps:this.#t}}},gn=`hybrid`,_n=`-`,vn=` Hybrid`,yn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return`${gn}(${this.#e.key()}+${this.#t.key()})`}name(){let e=e=>e.name().split(` `)[0]??``;return`${e(this.#e)}${_n}${e(this.#t)}${vn}`}frequency(){return this.#e.frequency().plus(this.#t.frequency())}resonant(){return this.frequency().resonant()}data(){return{kind:gn,parts:[this.#e.data(),this.#t.data()]}}},bn=11,xn={times:11,over:10},Sn=class e{#e;constructor(e){if(!Number.isInteger(e)||e<0)throw RangeError(`a frequency is a whole number of hertz from zero up, got ${String(e)}`);this.#e=e}hertz(){return this.#e}plus(t){return new e(this.#e+t.#e)}amplified(){return new e(Math.floor(this.#e*xn.times/xn.over))}resonant(){return this.#e>0&&this.#e%bn===0}equals(e){return this.#e===e.#e}},Cn=`keystone`,wn=new Sn(0),Tn=class{#e;#t;constructor(e){this.#e=e.name,this.#t=e.building}key(){return`${Cn}(${this.#t.toString()})`}name(){return this.#e}frequency(){return wn}resonant(){return!1}building(){return this.#t}data(){return{kind:Cn,building:this.#t.toString()}}},En=`relic`,Dn=class{#e;constructor(e){this.#e=e}facts(){return this.#e}key(){return this.#e.relic.key()}name(){return this.#e.relic.name()}frequency(){return this.#e.frequency}resonant(){return this.#e.resonant}from(){return this.#e.from}data(){return{kind:En,from:this.#e.from.toString(),key:this.#e.relic.key()}}},On=`echo`,kn=class{#e;#t;constructor(e){this.#e=e.from,this.#t=e.frequency}key(){return`${On}(${this.#e.toString()})`}name(){return`Spectral Echo`}frequency(){return this.#t}resonant(){return!1}data(){return{kind:On,from:this.#e.toString()}}};function An(e,t){if(typeof t!=`string`)return;let n=h.parse(t);return n===void 0?void 0:e.locate(n)}function jn(e){if(Array.isArray(e))return`[${e.map(jn).join(`,`)}]`;if(typeof e==`object`&&e){let t=e;return`{${Object.keys(t).sort().map(e=>`${JSON.stringify(e)}:${jn(t[e])}`).join(`,`)}}`}return JSON.stringify(e)}var Mn={[En]:({from:e,key:t},n)=>typeof t==`string`?An(n,e)?.findRelic(t):void 0,[gn]:({parts:e},t,n)=>{if(!Array.isArray(e)||e.length!==2)return;let[r,i]=e,a=n.read(r,t),o=n.read(i,t);return a===void 0||o===void 0?void 0:new yn(a,o)},[Cn]:({building:e},t)=>An(t,e)?.keystone(),[mn]:({from:e,steps:t},n)=>typeof t==`number`?An(n,e)?.lottery(t):void 0,[On]:({from:e},t)=>An(t,e)?.echo()?.fragment()},Nn=class{read(e,t){if(typeof e!=`object`||!e||Array.isArray(e))return;let n=e,r=(typeof n.kind==`string`?Mn[n.kind]:void 0)?.(n,t,this);if(r!==void 0)return jn(r.data())===jn(n)?r:void 0}readAll(e,t){if(!Array.isArray(e))return;let n=[];for(let r of e){let e=this.read(r,t);if(e===void 0)return;n.push(e)}return n}},Pn=new Set([`a`,`e`,`i`,`o`,`u`]),Fn=97,In=new Set([11,22,33]),Ln=class{#e;constructor(e){let t=0;for(let n of e.toLowerCase())n<`a`||n>`z`||Pn.has(n)||(t+=n.charCodeAt(0)-Fn+1);this.#e=t}sum(){return this.#e}master(){return In.has(this.#e)}frequencyAt(e){return new Sn((this.master()?this.#e*2:this.#e)*e)}},Rn=Array.from(`█▓▒░/\\%!$#*`),zn=class{mangle(e,t,n){return Array.from(e,(e,r)=>e===` `||e===`
`||!n.branch(r).probability(t)?e:n.branch(r).pick(Rn)).join(``)}},Bn=class{#e;constructor(e){this.#e=new Map(e.map(e=>[e.move.id,e]))}offered(e){return[...this.#e.values()].filter(t=>t.to(e)!==void 0).map(e=>e.move)}make(e,t){let n=this.#e.get(t),r=n?.to(e);return n!==void 0&&r!==void 0&&n.act?.(e),r}},Vn=new _({key:`room`,title:`Room`,icon:`□`,indexLabel:`CELL`}),Hn=new zn,Un={structure:.2,walls:.1,lighting:.3},Wn=`static`,Gn=new Nn,Kn=`action`,qn=.3,Jn={min:1e6,max:9999999},Yn={resonant:`≈≈≈`,plain:`~~~`,degraded:`###`},Xn=new Bn([{move:{id:`back`,label:`Go back`,opposite:`forward`},to:e=>e.neighbour(-1)},{move:{id:`forward`,label:`Go forward`,opposite:`back`},to:e=>e.neighbour(1)}]),Zn=class extends g{#e;#t;#n;#r;#i;#a;#o=[];#s=[];constructor(e,t){super(e),this.#e=e.parent,this.#t=t.name,this.#n=t.category,this.#r=t.atmosphere,this.#i=t.traits,this.#a=Object.freeze([...t.furniture])}kind(){return Vn}name(){return this.#t}type(){return this.#n.name()}category(){return this.#n}oxygen(){return this.#i.oxygen}temperature(){return this.#i.temperature}signal(){return this.#i.signal}atmosphere(){return this.#r}furniture(){return this.#a}objects(){return[...this.#c().map(e=>this.#l(e)),...this.#s]}contents(){return{objects:this.objects(),furniture:this.furniture()}}findRelic(e){let t=this.#e.relicsIn(this.index()).find(t=>t.key()===e);return t===void 0?void 0:this.#l(t)}capture(e){let t=this.#c();if(!Number.isInteger(e)||e<0)return;if(e<t.length){let n=t[e];return n===void 0?void 0:(this.#o.push(n.key()),{fragment:this.#l(n),fresh:!0})}let[n]=this.#s.splice(e-t.length,1);return n===void 0?void 0:{fragment:n,fresh:!1}}drop(e){return this.#s.push(e),!0}remember(){if(this.#o.length!==0||this.#s.length!==0)return JSON.stringify({taken:this.#o,dropped:this.#s.map(e=>e.data())})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{taken:n,dropped:r,...i}=t;if(Object.keys(i).length>0||!Array.isArray(n))return!1;let a=n,o=new Set(this.#e.relicsIn(this.index()).map(e=>e.key()));if(!a.every(e=>typeof e==`string`&&o.has(e))||new Set(a).size!==a.length)return!1;let s=Gn.readAll(r,this.root());return s===void 0||a.length===0&&s.length===0?!1:(this.#o.splice(0,this.#o.length,...a),this.#s.splice(0,this.#s.length,...s),!0)}#c(){return this.#e.relicsIn(this.index()).filter(e=>!this.#o.includes(e.key()))}#l(e){let t=this.vibe()?.culture(),n=t!==void 0&&this.#e.culture().equals(t),r=new Ln(e.name()).frequencyAt(this.depth());return new Dn({relic:e,from:this.address(),frequency:n?r.amplified():r,resonant:n})}listing(){return[]}mapped(){return!1}lottery(e){let t=this.seed().branch(Kn).branch(e);if(t.branch(`win`).probability(qn))return new hn({from:this.address(),steps:e,frequency:new Sn(t.branch(`hertz`).range(Jn.min,Jn.max))})}scan(e){return this.#e.scan(e)}scanned(e){let t=new Ln(this.#t).frequencyAt(this.depth()),n=this.#e.anomaly()?{key:`alert`,label:`WAVE`,value:Yn.degraded}:t.resonant()?{key:`stable`,label:`WAVE`,value:Yn.resonant}:{key:`signal`,label:`WAVE`,value:Yn.plain};return[{key:`reading`,label:`FREQ`,value:`${String(t.hertz())}Hz`},n,e(this)?{key:`stable`,label:`STATUS`,value:`[VISITED]`}:{key:`reading`,label:`STATUS`,value:`[UNSTABLE]`},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`IDENTIFIER`,value:this.#t}]}neighbour(e){return this.#e.children()[this.index()+e]}moves(){return Xn.offered(this)}move(e){return Xn.make(this,e)}exit(){return this.index()===0?this.#e.exit():void 0}leaveLabel(){return`Exit Apartment`}description(){let{structure:e,colour:t,walls:n,lighting:r}=this.#r,i=(e,t)=>this.#e.anomaly()?Hn.mangle(t,Un[e],this.seed().branch(Wn).branch(e)):t;return[`You are in ${i(`structure`,e)}. The walls are ${t} ${i(`walls`,n)}.`,`The space is illuminated by ${i(`lighting`,r)}.`]}facts(){return[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#e.era().key()},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`OXY`,value:`${String(this.#i.oxygen)}%`},{key:`reading`,label:`TEMP`,value:`${String(this.#i.temperature)}°C`},{key:`signal`,label:`SIGNAL`,value:this.#i.signal},this.#e.anomaly()?{key:`alert`,label:`RESONANCE`,value:`[DEGRADED]`}:{key:`stable`,label:`RESONANCE`,value:`[STABLE]`}]}status(){return`ATMOS: ${String(this.#i.oxygen)}% | TEMP: ${String(this.#i.temperature)}°C`}childrenHeading(){return``}approachVerb(){return``}},Qn=new _({key:`shard`,title:`Shard`,icon:`☠`,indexLabel:`SHARD`}),$n=class extends Zn{kind(){return Qn}leaveLabel(){return`Exit Crypt`}},er=new _({key:`universe`,title:`Universe`,icon:`∞`,indexLabel:`ROOT`}),tr=class extends g{kind(){return er}name(){return`The Endless Universe`}description(){return[`A neural web of infinite complexity.`]}status(){return`UNIMATRIX_STABLE`}childrenHeading(){return`Primary filaments radiating from root:`}approachVerb(){return`Synchronize with`}},nr=class{nth(e,t,n){let r=this.take(e,t,n+1).at(-1);if(r===void 0)throw RangeError(`a deal always deals`);return r}take(e,t,n){if(t.length===0)throw RangeError(`a deal needs at least one item`);let r=[];for(let i=0;r.length<n;i++){let a=[...t];for(let o=0;o<t.length&&r.length<n;o++){let t=e.branch(i).branch(o).range(0,a.length-1),n=a[t];if(n===void 0)throw RangeError(`a deal always deals`);r.push(n),a=a.filter((e,n)=>n!==t)}}return r}},rr=`Stable`,ir=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.material,this.#t=e.state,this.#n=e.inscription,this.#r=e.trace,this.#i=e.told}material(){return this.#e}state(){return this.#t}inscription(){return this.#n}trace(){return this.#r}brief(){return this.#t===rr?this.#e:`${this.#e} [${this.#t.toUpperCase()}]`}narrative(){let e=`${this.#i.material} ${this.#i.state}`;return this.#n===void 0?e:`${e} ${this.#n.narrative()}`}sensed(){let e=`${this.#i.material} ${this.#i.state} ${this.#r.sentence()}`;return this.#n===void 0?e:`${e} ${this.#n.narrative()}`}description(){return this.#n===void 0?this.brief():`${this.#n.formatted()} ${this.brief()}`}},ar=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}word(){return this.#e}style(){return this.#t}formatted(){return this.#t.format(this.#e)}narrative(){return this.#t.narrative(this.#e)}},v=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.key,this.#t=e.before,this.#n=e.after,this.#r=e.lowered??!1,this.#i=e.applied}key(){return this.#e}format(e){return`${this.#t}${this.#r?e.toLowerCase():e}${this.#n}`}narrative(e){return`The word '${this.#r?e.toLowerCase():e}' is ${this.#i}.`}equals(e){return this.#e===e.#e}},or=[new v({key:`stamped`,before:`[`,after:`]`,applied:`stamped into the metal in block letters`}),new v({key:`scrawled`,before:`_`,after:`_`,lowered:!0,applied:`scrawled across the surface in jagged, desperate lines`}),new v({key:`etched`,before:`⟨`,after:`⟩`,applied:`finely etched into the frame, appearing almost as a structural glyph`}),new v({key:`burned`,before:`!! `,after:` !!`,applied:`burned into the material with a high-intensity plasma torch`})],sr=`themes/doors`,cr=.2,lr=class{#e;constructor(e){this.#e=e}of(e,t){let[n,r]=e.branch(`material`).pick(this.#e.pairs(`${sr}/materials`)),[i,a]=e.branch(`state`).pick(this.#e.pairs(`${sr}/states`));return new ir({material:n,state:i,inscription:e.branch(`inscribed`).probability(cr)?this.#t(e,t):void 0,trace:t.trace(),told:{material:r,state:a}})}#t(e,t){return t.guarantee()??new ar(e.branch(`word`).pick(this.#e.list(`${sr}/inscriptions`)),e.branch(`style`).pick(or))}},ur=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}name(){return this.#t}equals(e){return this.#e===e.#e}},dr=`themes/cultures`,fr=`themes/timelines`,pr=[{key:`with`,join:(e,t)=>`${t} with ${e}`},{key:`infused`,join:(e,t)=>`${e} infused with ${t}`},{key:`fused`,join:(e,t)=>`${e} fused to ${t}`},{key:`grafted`,join:(e,t)=>`${t} grafted onto ${e}`}],mr=class{#e;#t=new Map;constructor(e){this.#e=e}of(e,t){let n=`${e.key()}|${t.key()}`,r=this.#t.get(n);return r===void 0&&(r=Object.freeze(this.#n(e,t)),this.#t.set(n,r)),r}#n(e,t){let n=this.#e.list(`${dr}/${e.key()}`),r=this.#e.list(`${fr}/${t.key()}`);return[...n.flatMap(e=>r.flatMap(t=>pr.map(n=>new ur(`${n.key}|${e}|${t}`,n.join(e,t))))),...n.map(e=>new ur(`culture|${e}`,e)),...r.map(e=>new ur(`era|${e}`,e))]}},hr=`children`,y=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t===void 0?void 0:{...t,unit:t.unit??1},this.#n=n}of(e){return this.exactly(e,this.count(e.seed()))}count(e){if(this.#t===void 0)throw Error(`this progeny has no count range: use exactly()`);return e.branch(hr).range(this.#t.min,this.#t.max)*this.#t.unit}exactly(e,t,n=0){return Array.from({length:t},(t,r)=>{let i=n+r,a=e.seed().branch(i);return this.#n(a).create({parent:e,seed:a,index:i,children:this.#e})})}},gr=.01,_r={min:1,max:10},vr={min:5,max:19},yr=`relics`,br={kind:ln,rooms:Vn,make:(e,t)=>new dn(e,t)},xr=class{#e;#t;#n;#r;#i;#a=new nr;constructor(e,t,n,r=br){this.#e=r,this.#t=new lr(t),this.#n=n,this.#r=new y(e,_r,()=>e.factoryFor(r.rooms)),this.#i=new mr(t)}kind(){return this.#e.kind}create(e){let t=e.parent.vibe(),n=t?.mutation();if(t===void 0||n===void 0)throw Error(`an apartment takes its culture, era and trait from the country above: it needs one`);let r=e.seed.branch(`anomaly`).probability(gr),i=r?t.culture():t.pickCulture(e.seed.branch(`culture`)),a=r?t.era():t.pickEra(e.seed.branch(`era`)),o=e.seed.branch(yr),s=this.#n.categoryOf(e.seed.branch(0),n);return this.#e.make(e,{door:this.#t.of(e.seed.branch(`door`),s),behind:s,culture:i,era:a,anomaly:r,rooms:this.#r.count(e.seed),relics:this.#a.take(o,this.#i.of(i,a),o.range(vr.min,vr.max))})}populate(e){return this.#r.exactly(e,e.roomCount())}},Sr=new _({key:`corridor`,title:`Corridor`,icon:`▅`,indexLabel:`CONDUIT`}),Cr=class extends g{#e;#t;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.sentence}kind(){return Sr}name(){return`Corridor`}floor(){return this.#e}arrival(){return this.#e}scan(e){return{title:`[DATA_SUMMARY]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:void 0,current:!1,note:t.sensed()}))}}description(){return[`${this.#t}.`]}facts(){let e=this.vibe()?.culture();return e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}]}status(){return`TRAFFIC: [STABLE] | THEME: [${this.vibe()?.culture().key().toUpperCase()??`UNKNOWN`}]`}childrenHeading(){return`Local access list:`}approachVerb(){return`Access:`}},wr=new _({key:`artery`,title:`Artery`,icon:`▅`,indexLabel:`CONDUIT`}),Tr=class extends Cr{#e;constructor(e,t){super(e,{sentence:t.sentence}),this.#e=t.vibe}kind(){return wr}name(){return`Artery`}vibe(){return this.#e}status(){return`TRAFFIC: [PRESSURE_HIGH] | THEME: [${this.#e.culture().key().toUpperCase()}]`}},Er=.85,Dr=.1,Or=.9,kr=class e{#e;constructor(e){this.#e={...e,stability:e.stability??Er,mutation:e.mutation,frame:e.frame??e.culture.frame()}}culture(){return this.#e.culture}era(){return this.#e.era}secondCulture(){return this.#e.secondCulture}secondEra(){return this.#e.secondEra}stability(){return this.#e.stability}mutation(){return this.#e.mutation}frame(){return this.#e.frame}pickCulture(e){return e.probability(this.#e.stability)?this.#e.culture:this.#e.secondCulture}pickEra(e){return e.probability(this.#e.stability)?this.#e.era:this.#e.secondEra}mutate(t,n){let r=Math.max(Dr,Math.min(Or,this.#e.stability+n));return new e({...this.#e,stability:r,mutation:t})}rebel(){return new e({...this.#e,culture:this.#e.secondCulture,secondCulture:this.#e.culture,era:this.#e.secondEra,secondEra:this.#e.era})}},Ar=`A pulsing, organic artery of data`,jr=1,Mr=class{#e;#t;constructor(e,t){this.#e=t,this.#t=new y(e,void 0,()=>e.factoryFor(fn))}kind(){return wr}create(e){let t=e.parent.vibe();if(t===void 0)throw Error(`an artery lies under a country: it needs its trait`);let n=this.#e.bedrock();return new Tr(e,{sentence:Ar,vibe:new kr({era:n.era,culture:n.culture,secondCulture:n.culture,secondEra:n.era,stability:jr,mutation:t.mutation()})})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Nr=new _({key:`building`,title:`Building`,icon:`⌂`,indexLabel:`STRATA`}),Pr=0,Fr=2,Ir=7,Lr=10,Rr=[`elevator`,`sampled`,`merges`,`breached`],zr=class extends g{#e;#t;#n;#r;#i=Pr;#a=new Set;#o=0;#s=!1;constructor(e,t){super(e),this.#e=t.name,this.#t=t.landmark,this.#n=t.floors,this.#r=t.doorsPerFloor}kind(){return Nr}name(){return this.#e}landmark(){return this.#t}floors(){return this.#n}layers(){return Lr}doorsPerFloor(){return this.#r}elevatorAt(){return this.#i}elevatorTo(e){this.#i=e}floorNumbered(e){return e>=0?e<this.#n?this.children()[e]:void 0:this.#s?this.children()[this.#n-e-1]:void 0}sampled(){return[...this.#a]}sampleFloor(e){e>=0&&e<this.#n&&this.#a.add(e)}merges(){return this.#o}infuse(){this.#o+=1}primed(){return this.#a.size>=this.#n&&this.#o>=Ir}breached(){return this.#s}keystone(){return new Tn({name:`${this.#e} Keystone`,building:this.address()})}forge(e){return this.primed()&&this.#c(e)===void 0?this.keystone():void 0}prime(){for(let e=0;e<this.#n;e++)this.#a.add(e);return this.#o=Ir,!0}breachOfferedAt(e,t){return e===this.#n-1&&this.primed()&&!this.#s&&this.#c(t)!==void 0}breachFrom(e,t){if(this.breachOfferedAt(e,t))return this.#s=!0,this.#c(t)}remember(){let e={};return this.#i!==Pr&&(e.elevator=this.#i),this.#a.size>0&&(e.sampled=[...this.#a]),this.#o>0&&(e.merges=this.#o),this.#s&&(e.breached=!0),Object.keys(e).length===0?void 0:JSON.stringify(e)}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=t,r=Object.keys(n);if(r.length===0||r.some(e=>!Rr.includes(e)))return!1;let{elevator:i,sampled:a,merges:o,breached:s}=n;if(s!==void 0&&s!==!0)return!1;let c=s===!0;if(i!==void 0&&!this.#l(i,c)||a!==void 0&&!this.#u(a)||o!==void 0&&(!Number.isInteger(o)||o<1))return!1;this.#i=i??Pr,this.#a.clear();for(let e of a??[])this.#a.add(e);return this.#o=o??0,this.#s=c,!0}listing(){let e=this.children();return[...e.slice(0,this.#n).reverse(),...this.#s?e.slice(this.#n):[]]}admits(e){return this.floorNumbered(this.#i)===e}description(){return[`Analyzing vertical lattice structure...`]}scanAround(e,t){let n=this.listing().filter(t=>Math.abs(t.ordinal()-e)<=Fr).sort((e,t)=>t.ordinal()-e.ordinal());return{title:`NEURAL_PROXIMITY_REPORT`,notes:[`BUILDING: ${this.#e}`,`TOTAL_STRATA: ${String(this.#n)} units detected.`],rows:n.map(n=>({cells:[{key:`reading`,label:`ID`,value:String(n.ordinal()).padStart(2,`0`)},...n.scanned(t)],place:void 0,current:n.ordinal()===e,note:``}))}}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}],...this.#t?[{key:`alert`,label:`UNIQUE_LOCUS_DETECTION`,value:`MAJOR_LANDMARK_DISCOVERED`}]:[]]}status(){return this.#s?`BEDROCK_BREACHED`:this.#o>0?`INFUSION_ACTIVE: ${String(this.#o)}`:`STRUCTURAL_STABLE`}indoors(){return!0}meta(){return this.#s?` [BREACHED]`:` [FLOORS: ${String(this.#n)}]`}childrenHeading(){return`Building strata diagnostics:`}approachVerb(){return`Access:`}#c(e){let t=this.keystone().key();return e.find(e=>e.key()===t)}#l(e,t){return typeof e!=`number`||!Number.isInteger(e)||e===Pr?!1:e>0?e<this.#n:t&&this.#n-e-1<this.children().length}#u(e){if(!Array.isArray(e)||e.length===0)return!1;let t=e;return t.every(e=>typeof e==`number`&&Number.isInteger(e)&&e>=0&&e<this.#n)?new Set(t).size===t.length:!1}},Br=new Bn([{move:{id:`elevator`,label:`Back to Elevator`,opposite:`corridor`},to:e=>e,act:e=>{e.returnToElevator()}}]),Vr=class{id(){return`corridor`}listing(e){return e.corridor().listing()}admits(e,t){return t===e.corridor()}moves(e){return Br.offered(e)}move(e,t){return Br.make(e,t)}facts(e){return e.corridor().facts()}description(e){return e.corridor().description()}status(e){return e.corridor().status()}childrenHeading(e){return e.corridor().childrenHeading()}approachVerb(e){return e.corridor().approachVerb()}scan(e,t){return e.corridor().scan(t)}},Hr=0,Ur=new Bn([{move:{id:`up`,label:`Go Up`,opposite:`down`},to:e=>e.neighbour(1)},{move:{id:`down`,label:`Go Down`,opposite:`up`},to:e=>e.number()===Hr?void 0:e.neighbour(-1)},{move:{id:`descend`,label:`Descend into the Substrate`,opposite:`up`},to:e=>e.number()===Hr?e.neighbour(-1):void 0},{move:{id:`corridor`,label:`Enter Corridor`,opposite:`elevator`},to:e=>e,act:e=>{e.enterCorridor()}}]),Wr=2,Gr=class{id(){return`elevator`}listing(){return[]}admits(){return!1}moves(e){return Ur.offered(e)}move(e,t){return Ur.make(e,t)}facts(e){let t=e.vibe();return t===void 0?[]:[{key:`era`,label:`TECH_ERA`,value:t.era().key()},{key:`culture`,label:`RESONANCE`,value:t.culture().key()},{key:`reading`,label:`STABILITY`,value:`${(t.stability()*100).toFixed(Wr)}%`},{key:`trait`,label:`ATMOS_SHIFT`,value:t.mutation()?.key()??`Standard`}]}description(e){return[`${e.name()}. ${e.sentence()}`,`Local signal is STABLE. Corridor access authorized.`]}status(e){return e.diagnostic()}childrenHeading(){return``}approachVerb(){return``}scan(e,t){return e.building().scanAround(e.number(),t)}},Kr=new _({key:`floor`,title:`Floor`,icon:`▤`,indexLabel:`Z-AXIS`}),qr=new Gr,Jr=new Vr,Yr=new Map([qr,Jr].map(e=>[e.id(),e])),Xr={min:1e3,max:2999},Zr=`100%`,Qr=class extends g{#e;#t;#n;#r;#i=qr;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.number,this.#n=t.zone,this.#r=t.sentence}kind(){return Kr}number(){return this.#t}name(){return`Floor ${String(this.#t)}`}callSign(){return this.#t===0?`Lobby`:this.#t===this.#e.floors()-1?`Peak`:this.name()}ordinal(){return this.#t}goesByNumber(){return!0}arrive(){return this.#e.elevatorTo(this.#t),this}current(){return this.#e.elevatorAt()===this.#t}zone(){return this.#n}sentence(){return this.#r}resonance(){return this.seed().branch(`resonance`).range(Xr.min,Xr.max)}readings(){return[{key:`zone`,label:`FUNCTION`,value:this.#n},{key:`reading`,label:`ST`,value:Zr},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}building(){return this.#e}diagnostic(){return`SYSTEM_DIAGNOSTIC: [NOMINAL]`}peers(){return this.#e.children().slice(0,this.#e.floors())}mapNodes(){return this.corridor().listing()}corridor(){let e=this.children()[0];if(e===void 0)throw Error(`${this.name()} has no corridor`);return e}neighbour(e){return this.#e.floorNumbered(this.#t+e)}sample(){this.#e.sampleFloor(this.#t)}breachOffered(e){return this.#e.breachOfferedAt(this.#t,e)}breach(e){return this.#e.breachFrom(this.#t,e)}enterCorridor(){this.#i=Jr}returnToElevator(){this.#i=qr}listing(){return this.#i.listing(this)}admits(e){return this.#i.admits(this,e)}moves(){return this.#i.moves(this)}move(e){return this.#i.move(this,e)}leave(){return this.returnToElevator(),this.exit()}remember(){return this.#i===qr?void 0:this.#i.id()}recall(e){let t=Yr.get(e);return t!==void 0&&(this.#i=t,!0)}facts(){return this.#i.facts(this)}description(){return this.#i.description(this)}status(){return this.#i.status(this)}childrenHeading(){return this.#i.childrenHeading(this)}approachVerb(){return this.#i.approachVerb(this)}scan(e){return this.#i.scan(this,e)}scanned(){return[{key:`zone`,label:`FUNCTION`,value:this.#n}]}},$r=new _({key:`layer`,title:`Layer`,icon:`▤`,indexLabel:`STRATA`}),ei=`ABYSSAL_SUBSTRATE`,ti=10,ni=100,ri=2,ii=class extends Qr{constructor(e,t){super(e,{number:t.number,zone:ei,sentence:t.sentence})}kind(){return $r}name(){return`Layer -0x${Math.abs(this.number()).toString(16).toUpperCase()}`}readings(){let e=Math.min(ni,Math.abs(this.number())*ti);return[{key:`zone`,label:`FUNCTION`,value:ei},{key:`reading`,label:`ST`,value:`P: ${String(e)}%`},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}sealed(){return!this.building().breached()}diagnostic(){return`SYSTEM_STATUS: [ABYSS_SYNC]`}abyssal(){return!0}drainFactor(){return ri}peers(){return this.building().children().slice(this.building().floors())}},b=`names/buildings`,ai=300,oi=5,si=50,ci=2500,li=1500,ui=4094,di=[10,20],fi=class{#e;constructor(e){this.#e=e}nameOf(e,t){let n=e.branch(`name`),r=n.branch(`rarity`).range(0,9999),i=this.landmarkChance(t.depth,t.landmarkFactor);if(r<i)return{name:n.branch(`landmark`).pick(this.#e.list(`${b}/landmarks`)),landmark:!0};let a=n.branch(`pattern`).range(0,1);return{name:r<i+li?this.#t(n,a,t):this.#r(n,a,t.culture),landmark:!1}}landmarkChance(e,t){let n=ai+Math.max(0,e-oi)*si;return Math.min(ci,n*t)}#t(e,t,n){if(t===0)return`Unit 0x${e.branch(`serial`).range(0,ui).toString(16).toUpperCase()} ${e.branch(`size-word`).pick(this.#n(n.floors))}`;let r=e.branch(`concept`).pick(this.#e.list(`${b}/concepts`));return`The ${this.#i(e,n.culture)} of ${r}`}#n(e){let t=this.#e.index(`${b}/sizes`),n=di.filter(t=>e>=t).length,r=t[Math.min(n,t.length-1)];if(r===void 0)throw Error(`${b}/sizes/index names no list`);return this.#e.list(`${b}/sizes/${r}`)}#r(e,t,n){if(t===0)return`${e.branch(`adjective`).pick(this.#e.list(`${b}/adj/${n.key()}`))} ${this.#i(e,n)}`;let r=e.branch(`compound`).pick(this.#e.list(`${b}/compounds`));return`${this.#i(e,n)}${r}`}#i(e,t){return e.branch(`noun`).pick(this.#e.list(`${b}/noun/${t.key()}`))}},pi={min:0,max:99},mi=[{upTo:40,size:{floors:{min:3,max:10},doors:{min:2,max:6}}},{upTo:70,size:{floors:{min:10,max:25},doors:{min:4,max:10}}},{upTo:90,size:{floors:{min:30,max:50},doors:{min:8,max:16}}},{upTo:pi.max,size:{floors:{min:50,max:100},doors:{min:10,max:20}}}],hi=class{bandFor(e){let t=Number.isInteger(e)&&e>=pi.min?mi.find(t=>e<=t.upTo):void 0;if(t===void 0)throw RangeError(`a size roll is a whole number from 0 to 99, not ${String(e)}`);return t.size}bandOf(e){return this.bandFor(e.branch(`size`).range(pi.min,pi.max))}floorsOf(e){let t=this.bandOf(e).floors;return e.branch(`floors`).range(t.min,t.max)}doorsPerFloorOf(e){let t=this.bandOf(e).doors;return e.branch(`doors`).range(t.min,t.max)}},gi=class{#e;#t=new hi;#n;#r;constructor(e,t){this.#e=new fi(t),this.#n=new y(e,void 0,()=>e.factoryFor(Kr)),this.#r=new y(e,void 0,()=>e.factoryFor($r))}kind(){return Nr}create(e){let t=e.parent,n=t?.vibe()?.culture();if(t===void 0||n===void 0)throw Error(`a building is named in the culture of its street: it needs a street under a planet`);let r=this.#t.floorsOf(e.seed),i=this.#e.nameOf(e.seed,{culture:n,floors:r,depth:t.depth(),landmarkFactor:t.landmarkFactor()});return new zr(e,{name:i.name,landmark:i.landmark,floors:r,doorsPerFloor:this.#t.doorsPerFloorOf(e.seed)})}populate(e){return[...this.#n.exactly(e,e.floors()),...this.#r.exactly(e,e.layers(),e.floors())]}},_i=new _({key:`city`,title:`City`,icon:`🏙`,indexLabel:`DISTRICT`}),vi=class extends g{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.rebelVibe}kind(){return _i}name(){return this.#e}vibe(){return this.#t??super.vibe()}description(){return[this.#t===void 0?`A stable regional node connected to the planetary lattice.`:`The air is thick with illegal data-streams and shifting static.`]}facts(){return this.#t===void 0?[]:[{key:`alert`,label:`UNAUTHORIZED_ZONE`,value:`UNAUTHORIZED_RESONANCE_DETECTED`}]}status(){return this.#t===void 0?`STABILITY: [STABLE]`:`STABILITY: [VOLATILE]`}meta(){return this.#t===void 0?``:` [UNAUTHORIZED_ZONE]`}childrenHeading(){return`Streets detected in this city:`}approachVerb(){return`Go to`}},yi=new _({key:`street`,title:`Street`,icon:`═`,indexLabel:`WAY`}),bi=class extends g{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return yi}name(){return this.#e}description(){return[`Buildings stand in pairs along both sides of the way.`]}facts(){let e=this.vibe();return e===void 0?[]:[{key:`era`,label:`TECH_ERA`,value:e.era().key()},{key:`culture`,label:`RESONANCE`,value:e.culture().key()}]}status(){return`SYNC: [STABLE]`}childrenHeading(){return`Buildings on this street:`}approachVerb(){return`Enter Building:`}startOfJourney(){return this}},xi=`name`,x=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}words(e){return this.#e.index(this.#t).map(t=>this.naming(e).branch(t).pick(this.#e.list(`${this.#t}/${t}`)))}naming(e){return e.branch(xi)}},Si=.1,Ci=class{#e;#t;constructor(e,t){this.#e=new x(t,`names/city`),this.#t=new y(e,{min:3,max:15},()=>e.factoryFor(yi))}kind(){return _i}create(e){let t=e.seed.branch(`rebel`).probability(Si);return new vi(e,{name:this.#e.words(e.seed).join(``),rebelVibe:t?e.parent?.vibe()?.rebel():void 0})}populate(e){return this.#t.of(e)}},wi=`themes/descriptions`,Ti=`sentence`,Ei=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}dealt(e){return e.branch(Ti).pick(this.#e.list(`${wi}/${this.#t}`))}},Di=class{#e;#t;constructor(e,t){this.#e=new Ei(t,`corridor`),this.#t=new y(e,void 0,()=>e.factoryFor(ln))}kind(){return Sr}create(e){return new Cr(e,{sentence:this.#e.dealt(e.seed)})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Oi=new _({key:`country`,title:`Country`,icon:`⬚`,indexLabel:`REGION`}),ki=class extends g{#e;#t;#n;constructor(e,t){super(e),this.#e=t.name,this.#t=t.trait,this.#n=t.vibe}kind(){return Oi}name(){return this.#e}vibe(){return this.#n??super.vibe()}description(){return[`A vast administrative region governed by the ${this.#t.key()} directive.`]}facts(){return[{key:`trait`,label:`Sector Mutation`,value:this.#t.key()}]}status(){return`TRAIT: [${this.#t.key().toUpperCase()}]`}meta(){return` [TRAIT: ${this.#t.key().toUpperCase()}]`}childrenHeading(){return`Regional cities identified:`}approachVerb(){return`Travel to`}},Ai={min:-100,max:100,scale:1e3},ji=class{#e;#t;#n;constructor(e,t,n){this.#e=new x(t,`names/country`),this.#t=n,this.#n=new y(e,{min:2,max:10},()=>e.factoryFor(_i))}kind(){return Oi}create(e){let t=e.seed.branch(`trait`).pick(this.#t.traits()),n=e.seed.branch(`stability`).range(Ai.min,Ai.max)/Ai.scale;return new ki(e,{name:this.#e.words(e.seed).join(` `),trait:t,vibe:e.parent?.vibe()?.mutate(t,n)})}populate(e){return this.#n.of(e)}},Mi=new _({key:`filament`,title:`Cosmic filament`,icon:`»`,indexLabel:`CONDUIT`}),Ni=class extends g{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.conduitId}kind(){return Mi}name(){return this.#e}description(){return[`A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${this.#t}]`]}status(){return`SYNC: [NODE_RELIABILITY_HIGH]`}childrenHeading(){return`Galactic sectors within this conduit:`}approachVerb(){return`Pulse to`}},Pi=new _({key:`sector`,title:`Galactic sector`,icon:`○`,indexLabel:`SECTOR`}),Fi=class extends g{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Pi}name(){return this.#e}callSign(){return`MATTER_CLUSTER: ${this.#e}`}description(){return[`A dense cluster of celestial bodies within the neural web.`]}status(){return`GRID: [LATTICE_SYNC_OK]`}childrenHeading(){return`Solar systems within proximity:`}approachVerb(){return`Transition to System:`}},Ii={min:1e3,max:9999},Li={min:10,max:39},Ri=100,S=0,zi=`echo`,Bi=`echo-hertz`,Vi=class{#e;#t=S;#n=!1;constructor(e){this.#e=e}signal(){return this.#t}locked(){return this.#t>=Ri}found(){return this.#n}scan(e){if(this.#n)return this.#t;let t=this.#e.seed().branch(zi).branch(e).range(Li.min,Li.max);return this.#t=Math.min(Ri,this.#t+t),this.#t}fragment(){return new kn({from:this.#e.address(),frequency:new Sn(this.#e.seed().branch(Bi).range(Ii.min,Ii.max))})}capture(){if(!(!this.locked()||this.#n))return this.#n=!0,this.#t=S,{fragment:this.fragment(),fresh:!0}}remember(){if(this.#n)return JSON.stringify({found:!0});if(this.#t>S)return JSON.stringify({signal:this.#t})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{signal:n,found:r,...i}=t;return Object.keys(i).length>0?!1:r===!0&&n===void 0?(this.#n=!0,this.#t=S,!0):r!==void 0||typeof n!=`number`||!Number.isInteger(n)||n<=S||n>Ri?!1:(this.#n=!1,this.#t=n,!0)}},Hi=new _({key:`null-reach`,title:`Null reach`,icon:`○`,indexLabel:`VOID`}),Ui=2,Wi=class extends g{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=new Vi(this)}kind(){return Hi}name(){return this.#e}callSign(){return`VOID_REACH: ${this.#e}`}echo(){return this.#t}description(){return this.#t.found()?[`A silent void. The spectral resonance has been harvested.`]:[`A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.`]}facts(){let e=this.#t.signal();return[{key:`signal`,label:`VOID_STATUS`,value:e===0?`Searching for signals...`:`SIGNAL_STRENGTH: ${String(e)}% | FREQ_DRIFT: ${String(this.#t.fragment().frequency().hertz())}Hz`}]}status(){if(this.#t.found())return`SIGNAL: [HARVESTED]`;let e=this.#t.signal();return e===0?`SIGNAL: [SCAN_REQUIRED]`:`SIGNAL: ${String(e)}%`}remember(){return this.#t.remember()}recall(e){return this.#t.recall(e)}childrenHeading(){return`Faint gravitational anomalies detected:`}approachVerb(){return`Detect faint signal:`}hash(){return`0x0000 / UNKNOWN`}landmarkFactor(){return super.landmarkFactor()*Ui}},Gi=.3,Ki=class{#e;#t;constructor(e,t){this.#e=new x(t,`names/filament`),this.#t=new y(e,{min:4,max:8},t=>e.factoryFor(t.branch(`null-roll`).probability(Gi)?Hi:Pi))}kind(){return Mi}create(e){let[t,n]=this.#e.words(e.seed),r=this.#e.naming(e.seed).branch(`number`).range(0,998),i=e.seed.branch(`conduit`).range(0,65534);return new Ni(e,{name:`${String(t)}-${String(r)}-${String(n)}`,conduitId:`0x${i.toString(16)}`})}populate(e){return this.#t.of(e)}},C=`names/floors`,qi=5,Ji=5,Yi=class{#e;constructor(e){this.#e=e}zoneOf(e,t,n){if(t===0)return this.#t(`${C}/lobby`);if(t===n-1)return this.#t(`${C}/peak`);let r=this.#e.index(`${C}/zones`),i=r[t<qi?0:t>n-Ji?r.length-1:1];if(i===void 0)throw Error(`${C}/zones/index names too few lists`);return e.branch(`zone`).pick(this.#e.list(`${C}/zones/${i}`))}#t(e){let[t,...n]=this.#e.list(e);if(t===void 0||n.length>0)throw Error(`${e}.txt holds exactly one word`);return t}},Xi=class{#e;#t;#n;constructor(e,t){this.#e=new Yi(t),this.#t=new Ei(t,`floor`),this.#n=new y(e,void 0,()=>e.factoryFor(Sr))}kind(){return Kr}create(e){let t=e.parent,n=t.vibe()?.culture().key().toUpperCase()??`UNKNOWN`;return new Qr(e,{number:e.index,zone:this.#e.zoneOf(e.seed,e.index,t.floors()),sentence:this.#t.dealt(e.seed).replace(`{culture}`,n)})}populate(e){return this.#n.exactly(e,1)}},Zi=`The air is thick with oily static and the hum of abyssal substrate.`,Qi=class{#e;constructor(e){this.#e=new y(e,void 0,()=>e.factoryFor(wr))}kind(){return $r}create(e){return new ii(e,{number:e.parent.floors()-1-e.index,sentence:Zi})}populate(e){return this.#e.exactly(e,1)}},$i=new _({key:`solar-system`,title:`Solar system`,icon:`☼`,indexLabel:`RADII`}),ea=class extends g{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return $i}name(){return this.#e}description(){return[`A star holding its resonant nodes in orbit.`]}status(){return`SYNC: [RESONANT_NODES_STABLE]`}childrenHeading(){return`Orbital bodies within range:`}approachVerb(){return`Land on`}},ta=class{#e;constructor(e){this.#e=new y(e,{min:1,max:2},()=>e.factoryFor($i))}kind(){return Hi}create(e){return new Wi(e,{name:`Null Reach ${e.seed.branch(`name`).range(0,4094).toString(16).toUpperCase()}`})}populate(e){return this.#e.of(e)}},na=new _({key:`planet`,title:`Planet`,icon:`⊕`,indexLabel:`ORBIT`}),ra=class extends g{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.vibe}kind(){return na}name(){return this.#e}vibe(){return this.#t}description(){return[`A world on the surface layer of the lattice, tuned to one culture and one era.`]}facts(){return[{key:`culture`,label:`RESONANCE`,value:this.#t.culture().key()},{key:`era`,label:`TIMELINE`,value:this.#t.era().key()}]}status(){return`RESONANCE: [${this.#t.culture().key().toUpperCase()}]`}meta(){return` [SURFACE | ERA: ${this.#t.era().key().toUpperCase()}]`}childrenHeading(){return`Planetary landmasses scanned:`}approachVerb(){return`Visit`}},ia=class{#e;#t;#n;constructor(e,t,n){this.#e=new x(t,`names/planet`),this.#t=n,this.#n=new y(e,{min:2,max:8},()=>e.factoryFor(Oi))}kind(){return na}create(e){return new ra(e,{name:this.#e.words(e.seed).join(``),vibe:this.#r(e.seed)})}populate(e){return this.#n.of(e)}#r(e){let t=e.branch(`vibe`),n=t.branch(`culture`).pick(this.#t.surfaceCultures()),r=t.branch(`era`).pick(this.#t.eras()),i=this.#t.surfaceCultures().filter(e=>!e.equals(n)),a=this.#t.eras().filter(e=>!e.equals(r));return new kr({culture:n,era:r,secondCulture:i.length===0?n:t.branch(`second-culture`).pick(i),secondEra:a.length===0?r:t.branch(`second-era`).pick(a)})}},aa=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}name(){return this.#e}guarantee(){return this.#t}trace(){return this.#n}equals(e){return this.#e===e.#e}},oa={ozone:{name:`Ozone`,sentence:`A sharp smell of ozone escapes the frame, ionizing the nearby air.`},frost:{name:`Frost`,sentence:`Thin frost is forming on the magnetic hinges. Total absence of thermal signature detected.`},clicking:{name:`Clicking`,sentence:`A persistent, rhythmic clicking sound—like high-speed mechanical relays—originates from the lock housing.`},humming:{name:`Humming`,sentence:`A heavy, low-frequency thrum (60Hz) vibrates through the surrounding strata.`},stillness:{name:`Stillness`,sentence:`The air nearby is unnaturally still. Not even the standard system-hum is audible.`}},sa=class e{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}static of(t){let n=oa[t];return n===void 0?void 0:new e(t,n.name,n.sentence)}key(){return this.#e}name(){return this.#t}sentence(){return this.#n}equals(e){return this.#e===e.#e}},ca=`names/rooms`,la=class{#e;#t=new Map;constructor(e){this.#e=e}allowedBy(e){let t=this.#t.get(e.key());return t===void 0&&(t=Object.freeze(this.#e.pairs(`${ca}/${e.key()}`).map(([e,t])=>{let n=t.indexOf(`|`);if(n<0)throw Error(`${ca}: '${e}|${t}' is not 'name|guarantee|trace'`);let r=sa.of(t.slice(n+1).trim());if(r===void 0)throw Error(`${ca}: '${e}' names no known trace`);return new aa(e,this.#n(t.slice(0,n).trim()),r)})),this.#t.set(e.key(),t)),t}categoryOf(e,t){return e.branch(`category`).pick(this.allowedBy(t))}#n(e){if(e===``)return;let t=e.indexOf(` `),n=or.find(n=>n.key()===e.slice(0,t));if(t<0||n===void 0)throw Error(`${ca}: '${e}' is not '<style> <WORD>' with a known style`);return new ar(e.slice(t+1),n)}},ua=`themes/atmosphere`,da=`themes/cultures`,fa=`themes/timelines`,pa=`themes/colours`,ma=`glitch`,ha=.05,ga=.5,_a=[`abyssal`,`Singularity`],va=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t){let n=e.branch(ma),r=t.anomaly||n.probability(ha),i=e=>r&&n.branch(e).probability(ga),a=this.#e.index(da),o=this.#e.index(fa),s=i(`walls`)?n.branch(`walls`).pick(a):t.culture.key(),c=i(`lighting`)?n.branch(`lighting`).pick(o):t.era.key(),l=i(`structure`)?n.branch(`structure`).pick(_a):t.trait.key();return{structure:e.branch(`structure`).pick(this.#n(`structures`,l,`${ua}/structures`)),colour:e.branch(`colour`).pick(this.#e.list(pa)),walls:e.branch(`walls`).pick(this.#n(`walls`,s,da)),lighting:e.branch(`lighting`).pick(this.#n(`lighting`,c,`${ua}/lighting`))}}#n(e,t,n){let r=`${ua}/${e}/${t}`;if(this.#e.has(r))return this.#e.list(r);let i=this.#e.index(n)[0]??``;return this.#t.warn(`[THEME_WARN] no ${e} file for '${t}' — falling back to '${i}' (${r}.txt)`),this.#e.list(`${ua}/${e}/${i}`)}},ya=`themes/conditions`,ba=`themes/cultures`,xa=`pieces`,Sa=`condition`,Ca=class{#e;#t=new nr;constructor(e){this.#e=e}of(e,t,n){let r=this.#e.list(ya),i=this.#e.list(`${ba}/${t.key()}`);return this.#t.take(e.branch(xa),i,Math.min(n,i.length)).map((t,n)=>{let i=e.branch(Sa).branch(n).range(0,r.length-1);return t.startsWith(`${r[i]??``} `)&&(i=(i+1)%r.length),`${r[i]??``} ${t}`})}},wa=`names/buildings/adj`,Ta={min:12,max:21},Ea={min:5,max:25},Da=[`[SHIELDED]`,`[CLEAR]`],Oa={min:1,max:3},ka={kind:Vn,make:(e,t)=>new Zn(e,t)},Aa=class{#e;#t;#n;#r;#i;#a=new nr;constructor(e,t,n,r=ka){this.#e=r,this.#t=e,this.#n=t,this.#r=new va(e,n),this.#i=new Ca(e)}kind(){return this.#e.kind}create(e){let t=e.parent,n=t.vibe()?.mutation();if(n===void 0)throw Error(`a room takes its category from the country above: it needs one`);let r=this.#n.categoryOf(e.seed,n),i=this.#a.nth(t.seed().branch(`adjectives`),this.#t.list(`${wa}/${t.culture().key()}`),e.index);return this.#e.make(e,{name:`${i} ${r.name()}`,category:r,atmosphere:this.#r.of(e.seed,{culture:t.culture(),era:t.era(),trait:n,anomaly:t.anomaly()}),traits:{oxygen:e.seed.branch(`oxygen`).range(Ta.min,Ta.max),temperature:e.seed.branch(`temperature`).range(Ea.min,Ea.max),signal:e.seed.branch(`signal`).pick(Da)},furniture:this.#i.of(e.seed.branch(`furniture`),t.culture(),e.seed.branch(`furniture`).range(Oa.min,Oa.max))})}populate(){return[]}},ja=class{#e;#t;constructor(e,t){this.#e=new x(t,`names/sector`),this.#t=new y(e,{min:3,max:7},()=>e.factoryFor($i))}kind(){return Pi}create(e){let t=this.#e.naming(e.seed).branch(`number`).range(0,98);return new Fi(e,{name:`${this.#e.words(e.seed).join(` `)} ${String(t)}`})}populate(e){return this.#t.of(e)}},Ma=class{#e;#t;constructor(e,t){this.#e=new x(t,`names/solar-system`),this.#t=new y(e,{min:2,max:10},()=>e.factoryFor(na))}kind(){return $i}create(e){return new ea(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Na=class{#e;#t;constructor(e,t){this.#e=new x(t,`names/street`),this.#t=new y(e,{min:2,max:10,unit:2},()=>e.factoryFor(Nr))}kind(){return yi}create(e){return new bi(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Pa=class{#e;constructor(e){this.#e=new y(e,{min:3,max:7},()=>e.factoryFor(Mi))}kind(){return er}create(e){return new tr(e)}populate(e){return this.#e.of(e)}},Fa=class{#e;constructor(e,t,n){let r=new la(e),i=[new Pa(this),new Ki(this,e),new ja(this,e),new ta(this),new Ma(this,e),new ia(this,e,t),new ji(this,e,t),new Ci(this,e),new Na(this,e),new gi(this,e),new Xi(this,e),new Di(this,e),new xr(this,e,r),new Aa(e,r,n),new Qi(this),new Mr(this,t),new xr(this,e,r,{kind:fn,rooms:Qn,make:(e,t)=>new pn(e,t)}),new Aa(e,r,n,{kind:Qn,make:(e,t)=>new $n(e,t)})];this.#e=new Map(i.map(e=>[e.kind().key(),e]))}universe(e){return this.factoryFor(er).create({parent:void 0,seed:e,index:0,children:this})}kinds(){return[...this.#e.values()].map(e=>e.kind())}factoryFor(e){let t=this.#e.get(e.key());if(t===void 0)throw Error(`no factory is registered for the kind '${e.key()}'`);return t}childrenOf(e){return this.factoryFor(e.kind()).populate(e)}},Ia=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}frame(){return this.#t}equals(e){return this.#e===e.#e}},La=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Ra=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},za=`themes/planet-frames`,Ba=`themes/timelines`,Va=`themes/cultures`,Ha=`themes/traits`,w={culture:`abyssal`,era:`atomic`},Ua=class{#e;#t;#n;#r;constructor(e){this.#e=e}surfaceCultures(){return this.#t??=Object.freeze(this.#e.pairs(za).map(([e,t])=>new Ia(e,t))),this.#t}bedrock(){if(!this.#e.index(Va).includes(w.culture))throw Error(`${Va}/index names no '${w.culture}' culture`);let e=this.eras().find(e=>e.key()===w.era);if(e===void 0)throw Error(`${Ba}/index names no '${w.era}' era`);return{culture:new Ia(w.culture,w.culture),era:e}}eras(){return this.#n??=Object.freeze(this.#e.index(Ba).map(e=>new La(e))),this.#n}traits(){return this.#r??=Object.freeze(this.#e.list(Ha).map(e=>new Ra(e))),this.#r}},Wa=/^([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})$/i,Ga=2**53,T=`#`,Ka=`${T}range`,qa=`${T}pick`,Ja=`${T}probability`,Ya=class e{#e;#t;constructor(e,t){this.#e=e>>>0,this.#t=t>>>0}static parse(t){let n=Wa.exec(t.trim());if(n===null)return;let r=n.slice(1).join(``);return new e(Number.parseInt(r.slice(0,8),16),Number.parseInt(r.slice(8),16))}branch(e){if(typeof e==`number`){if(!Number.isSafeInteger(e))throw RangeError(`a number key is a whole number, got ${String(e)}`);return this.#n(`${T}n:${String(e)}`)}if(e.startsWith(T))throw RangeError(`keys starting with '${T}' are reserved for Seed itself, got '${e}'`);return this.#n(e)}#n(t){let n=(this.#e^2654435769)>>>0,r=(this.#t^2135587861)>>>0;n=Math.imul(n^r>>>15,2246822507),r=Math.imul(r^n>>>13,3266489909);for(let e=0;e<t.length;e++){let i=t.charCodeAt(e);n=Math.imul(n^i,2654435761),r=Math.imul(r^i,1597334677),n=n<<13|n>>>19,r=r<<17|r>>>15}return n^=t.length,n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,668265263)^r>>>15,new e(n,r)}range(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||t<e)throw RangeError(`range needs whole numbers with min <= max, got ${String(e)}..${String(t)}`);return e+Math.floor(this.#n(Ka).#r()*(t-e+1))}pick(e){let t=e[Math.floor(this.#n(qa).#r()*e.length)];if(t===void 0)throw RangeError(`pick needs a list with at least one item`);return t}probability(e){if(!(e>=0&&e<=1))throw RangeError(`probability needs a chance in [0, 1], got ${String(e)}`);return this.#n(Ja).#r()<e}equals(e){return this.#e===e.#e&&this.#t===e.#t}toString(){let e=(this.#e.toString(16).padStart(8,`0`)+this.#t.toString(16).padStart(8,`0`)).toUpperCase();return`${e.slice(0,4)}-${e.slice(4,8)}-${e.slice(8,12)}-${e.slice(12)}`}#r(){return(this.#e*2097152+(this.#t>>>11))/Ga}},E=100,D=0,Xa=[{key:`stable`,from:70},{key:`degraded`,from:30},{key:`critical`,from:D}],Za=40,Qa=2,O=class e{#e;static range(){return{min:D,max:E}}static edges(){let e=new Set([E,1]);for(let t of[...Xa.map(e=>e.from),Za])t<=D||(e.add(t),e.add(t-1));return[...e].sort((e,t)=>t-e)}constructor(e=E){if(!Number.isInteger(e)||e<D||e>E)throw RangeError(`coherence is a whole number from ${String(D)} to ${String(E)}, got ${String(e)}`);this.#e=e}value(){return this.#e}drained(t){return new e(Math.max(D,this.#e-t))}restored(t){return new e(Math.min(E,this.#e+t))}exhausted(){return this.#e===D}band(){return Xa.find(e=>this.#e>=e.from)?.key??`critical`}corrupting(){return this.#e<Za}glitchMarks(){let e=Xa.at(-2)?.from??D;return Math.max(0,Math.floor((e-this.#e)/Qa))}equals(e){return this.#e===e.#e}},$a=6,eo=class e{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e){this.#e=e.seed,this.#t=e.address,this.#n=new Map(e.states??[]),this.#r=e.coherence??new O().value(),this.#i=e.steps??0,this.#a=[...e.visited??[]],this.#o=[...e.buffer??[]],this.#s=e.resonant??0}static parse(t){if(t===void 0)return;let n;try{n=JSON.parse(t)}catch{return}if(typeof n!=`object`||!n)return;let{version:r,seed:i,path:a,states:o,coherence:s,steps:c,visited:l,buffer:u,resonant:d}=n;if(r!==$a||typeof i!=`string`)return;let f=Ya.parse(i),p=e.#l(o),m=e.#u(l),ee=e.#c(u);if(f===void 0||p===void 0||m===void 0||ee===void 0||!e.#d(s)||!e.#f(c)||!e.#f(d))return;let te=typeof a==`string`?h.parse(a):void 0;if(a!==null&&te===void 0)return;let ne=new O().value();if(te!==void 0||s===ne&&c===0&&m.length===0&&p.size===0&&ee.length===0&&d===0)return new e({seed:f,address:te,states:p,coherence:s,steps:c,visited:m,buffer:ee,resonant:d})}static#c(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`object`||!n||Array.isArray(n))return;let e=n;if(typeof e.kind!=`string`)return;t.push(e)}return t}static#l(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=Object.entries(e),n=new Map;for(let[e,r]of t){if(h.parse(e)===void 0||typeof r!=`string`)return;n.set(e,r)}return n}static#u(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`string`||h.parse(n)===void 0)return;t.push(n)}return new Set(t).size===t.length?t:void 0}static#d(e){if(typeof e!=`number`)return!1;try{return new O(e),!0}catch{return!1}}static#f(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}seed(){return this.#e}address(){return this.#t}states(){return this.#n}coherence(){return this.#r}steps(){return this.#i}visited(){return this.#a}buffer(){return this.#o}resonant(){return this.#s}toText(){return JSON.stringify({version:$a,seed:this.#e.toString(),path:this.#t?.toString()??null,states:Object.fromEntries(this.#n),coherence:this.#r,steps:this.#i,visited:this.#a,buffer:this.#o,resonant:this.#s})}};function k(e,t,n){return{id:e,key:t,label:n,place:``,role:`system`,sealed:!1,landmark:!1,ordinal:``,readings:[],opposite:``,current:!1,visited:!1}}var to=`buffer`,no=`pick:`,ro=`drop:`,io=`close`,ao=Array.from({length:9},(e,t)=>String(t+1)),oo=class{#e;#t;constructor(e){this.#e=e}summary(){return{id:to,outcome:``,figures:{selected:this.#t===void 0?``:String(this.#t)}}}options(){let e=this.#e.player().buffer().fragments(),t=this.#e.here()?.contents()!==null,n=e=>this.#t===void 0?`Select`:this.#t===e?`Unselect`:`Merge`;return[...e.flatMap((e,r)=>{let i=String(r+1),a={...k(`${no}${String(r)}`,ao[r]??``,n(r)),role:`pick`,ordinal:i},o={...k(`${ro}${String(r)}`,``,`Drop here`),role:`drop`,ordinal:i};return t?[a,o]:[a]}),{...k(io,`b`,`Back to reality`),role:`return`}]}answer(e){if(!this.options().some(t=>t.id===e))return;if(e===io)return{message:``,done:!0};if(e.startsWith(no))return{message:this.#n(Number(e.slice(5))),done:!1};let t=this.#e.drop(Number(e.slice(5)));return this.#t=void 0,{message:t===void 0?``:`Dropped ${t.name()} here.`,done:!1}}#n(e){let t=this.#t;if(t===void 0)return this.#t=e,``;if(this.#t=void 0,t===e)return``;let n=this.#e.merge(t,e);if(n===void 0)return``;let{fragment:r}=n;if(n.forged)return`Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: ${r.name()}. Coherence +15.`;let i=r.resonant()?` Resonance detected.`:``;return`Synthesis complete: ${r.name()} (${String(r.frequency().hertz())} Hz). Coherence +15.${i}`}},so=`corrupt`,co=.1,lo=class{#e=new zn;read(e,t,n){if(!t.corrupting())return e;let r=n.branch(so);return e.map((e,t)=>this.#e.mangle(e,co,r.branch(t)))}},uo=1,fo=new Map([[`entropic`,2]]),po=class{cost(e){let t=e.drainEra()?.key()??``;return uo*(fo.get(t)??1)*e.drainFactor()}},mo=`frame`,ho=class{of(e,t){return e.seed().branch(mo).branch(t)}},go=16,_o=class{#e;constructor(e=[]){if(e.length>go)throw RangeError(`the buffer holds ${String(go)} fragments, not ${String(e.length)}`);this.#e=[...e]}fragments(){return this.#e}size(){return this.#e.length}capacity(){return go}full(){return this.#e.length>=go}add(e){return!this.full()&&(this.#e.push(e),!0)}take(e){if(!Number.isInteger(e)||e<0||e>=this.#e.length)return;let[t]=this.#e.splice(e,1);return t}merge(e,t,n){if(e===t)return;let r=this.#e[e],i=this.#e[t];if(r===void 0||i===void 0)return;let a=n===void 0?new yn(r,i):n(r,i);return this.#e.splice(Math.max(e,t),1),this.#e.splice(Math.min(e,t),1),this.#e.push(a),a}remove(e){let t=this.#e.indexOf(e);return t<0?!1:(this.#e.splice(t,1),!0)}},vo=15,yo=class{#e;#t;#n;#r;#i;#a;constructor(e={coherence:new O().value(),steps:0,visited:[],buffer:[],resonant:0}){this.#e=new O(e.coherence),this.#t=e.steps,this.#n=[...e.visited],this.#r=new Set(this.#n),this.#i=new _o(e.buffer),this.#a=e.resonant}buffer(){return this.#i}resonantTraces(){return this.#a}capture(e){return this.#i.add(e.fragment)?(e.fresh&&e.fragment.resonant()&&(this.#a+=1),!0):!1}merge(e,t,n){let r=this.#i.merge(e,t,n===void 0?void 0:()=>n);if(r!==void 0)return this.restore(vo),r.resonant()&&(this.#a+=1),r}discard(e){return this.#i.remove(e)}drop(e){return this.#i.take(e)}coherence(){return this.#e}steps(){return this.#t}drain(e){this.#e=this.#e.drained(e)}restore(e){this.#e=this.#e.restored(e)}setCoherence(e){this.#e=new O(e)}count(){this.#t+=1}markFootprint(e){for(let t of e.trail()){let e=t.address().toString();this.#r.has(e)||(this.#r.add(e),this.#n.push(e))}}visited(e){return this.#r.has(e.address().toString())}footprints(){return this.#n}placesVisited(){return this.#n.length}reboot(){this.#e=new O}},bo=new Nn,xo=class{#e;#t;#n;#r;#i;#a=new yo;constructor(e){this.#e=e}world(){return this.#t}universe(){return this.#n}here(){return this.#r}player(){return this.#a}resumes(){return this.#i!==void 0}begin(e){this.#t=e,this.#n=this.#e.universe(e),this.#r=void 0,this.#i=void 0,this.#a=new yo}enter(){return this.#n!==void 0&&(this.#o(this.#i??this.#n.startOfJourney()),this.#i=void 0,!0)}descend(e){let t=this.#r?.listing()[e];return t===void 0||t.sealed()?!1:(this.#o(t.arrive()),!0)}move(e){let t=this.#r?.move(e);return t!==void 0&&(this.#o(t.arrive()),!0)}leave(){if(this.#r?.exit()===void 0)return!1;let e=this.#r.leave();return e!==void 0&&(this.#o(e),!0)}toTitle(){return this.#r!==void 0&&(this.#i=this.#r,this.#r=void 0,!0)}capture(e){if(this.#r===void 0||this.#a.buffer().full())return;let t=this.#r.capture(e);if(t!==void 0)return this.#a.capture(t),this.#r.sample(),t.fragment}lottery(){if(this.#r===void 0||this.#a.buffer().full())return;let e=this.#r.lottery(this.#a.steps());if(e!==void 0)return this.#a.capture({fragment:e,fresh:!0}),this.#r.sample(),e}echo(){let e=this.#r?.echo();if(!(e===void 0||e.found()))return e.scan(this.#a.steps())}captureEcho(){if(this.#a.buffer().full())return;let e=this.#r?.echo()?.capture();if(e!==void 0)return this.#a.capture(e),e.fragment}drop(e){if(this.#r?.contents()===null||this.#r===void 0)return;let t=this.#a.buffer().fragments()[e];if(t!==void 0&&this.#r.drop(t))return this.#a.drop(e)}merge(e,t){let n=this.#r?.forge(this.#a.buffer().fragments()),r=this.#a.merge(e,t,n);if(r!==void 0)return this.#r?.infuse(),{fragment:r,forged:n!==void 0}}breachOffered(){return this.#r?.breachOffered(this.#a.buffer().fragments())??!1}breach(){let e=this.#r?.breach(this.#a.buffer().fragments());if(e!==void 0)return this.#a.discard(e),e}prime(){return this.#r?.prime()??!1}spawnKeystone(){let e=this.#r?.keystone();if(!(e===void 0||this.#a.buffer().full()))return this.#a.capture({fragment:e,fresh:!1}),e}reboot(){return this.#t!==void 0&&(this.#n=this.#e.universe(this.#t),this.#i=void 0,this.#a.reboot(),this.#o(this.#n.startOfJourney()),!0)}saved(){if(this.#t===void 0)return;let e=this.#r??this.#i;return new eo({seed:this.#t,address:e?.address(),states:this.#s(this.#a.footprints()),coherence:this.#a.coherence().value(),steps:this.#a.steps(),visited:this.#a.footprints(),buffer:this.#a.buffer().fragments().map(e=>e.data()),resonant:this.#a.resonantTraces()})}restore(e){let t=this.#e.universe(e.seed()),n=new Set;for(let t of e.visited()){let e=h.parse(t);if(e===void 0)return!1;let r=e.parent();if(r!==void 0&&!n.has(r.toString()))return!1;n.add(t)}for(let[r,i]of e.states()){let e=h.parse(r),a=e===void 0||!n.has(r)?void 0:t.descendant(e);if(a===void 0||!a.recall(i)||a.remember()!==i)return!1}for(let n of e.visited()){let e=h.parse(n);if(e===void 0||t.locate(e)===void 0)return!1}let r=e.address(),i=r===void 0?void 0:t.descendant(r);if(r!==void 0&&(i===void 0||i.arrival()!==i))return!1;let a=i?.trail()??[];if(a.some(e=>!n.has(e.address().toString())))return!1;for(let[e,t]of a.entries()){let n=a[e+1];if(n!==void 0&&!t.admits(n))return!1}let o=bo.readAll(e.buffer(),t);return o===void 0||o.length>this.#a.buffer().capacity()?!1:(this.#t=e.seed(),this.#n=t,this.#r=i,this.#i=void 0,this.#a=new yo({coherence:e.coherence(),steps:e.steps(),visited:e.visited(),buffer:o,resonant:e.resonant()}),!0)}#o(e){this.#r=e,this.#a.markFootprint(e)}#s(e){let t=new Map;for(let n of e){let e=h.parse(n),r=e===void 0?void 0:this.#n?.descendant(e)?.remember();r!==void 0&&t.set(n,r)}return t}},So=30,Co=15,wo=10,To=`marks`,Eo=`static`,Do=.08,Oo=[`?`,`!`,`░`,`▒`,`▓`,`X`,`#`],ko=class{of(e,t,n,r){if(!e.mapped())return null;let i=new Set,a=(e,t)=>`${String(e)},${String(t)}`,o=r.branch(Eo),s=e.mapNodes().map((n,r)=>{let{x:s,y:c}=n.mapSpot(So,Co);for(let e=0;i.has(a(s,c))&&e<wo;e++)s=(s+1)%So,s===0&&(c=(c+1)%Co);i.add(a(s,c));let l=o.branch(r),u=e.abyssal()&&l.probability(Do);return{x:s,y:c,glyph:u?l.branch(`glyph`).pick(Oo):n.mapGlyph(),name:n.name(),visited:t(n),noise:u}}),c=r.branch(To);return{width:So,height:Co,origin:{name:e.name(),glyph:e.mapGlyph()},frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),nodes:s,marks:Array.from({length:n.glitchMarks()},(e,t)=>({x:c.branch(t).branch(`x`).range(0,29),y:c.branch(t).branch(`y`).range(0,14)}))}}},Ao=`reboot`,jo=class{#e;constructor(e){this.#e=e}summary(){return{id:Ao,outcome:`rebooting`,figures:{}}}options(){return[k(Ao,``,`Rebuild`)]}answer(e){if(e===`reboot`)return this.#e.reboot(),{message:`Substrate rebuilt. Coherence ${String(this.#e.player().coherence().value())}.`,done:!0}}},Mo=20,No=[{id:`void`,reached:e=>e.here.abyssal()},{id:`expedition`,reached:e=>e.places>=Mo},{id:`severed`,reached:()=>!0}],Po=class{of(e){return No.find(t=>t.reached(e))?.id??``}},Fo=`recap`,Io=`resume`,Lo=`end-session`,Ro=class{#e;#t=new Po;constructor(e){this.#e=e}summary(){let e=this.#e.here(),t=this.#e.player();return{id:Fo,outcome:e===void 0?``:this.#t.of({here:e,places:t.placesVisited()}),figures:{locus:e?.address().toString()??``,steps:String(t.steps()),places:String(t.placesVisited()),buffer:String(t.buffer().size()),resonant:String(t.resonantTraces())}}}options(){return[k(Io,`b`,`Resume`),k(Lo,`q`,`End session`)]}answer(e){if(e===Io)return{message:``,done:!0};if(e===Lo)return this.#e.toTitle(),{message:``,done:!0}}},zo=`spectrogram`,Bo=5,Vo=9,Ho=`void`,Uo=.3,Wo=[`It is cold down here.`,`We see you.`,`Return to the surface.`,`Bedrock approaching.`],Go=class{of(e,t){if(!e.indoors())return null;let n=t.branch(zo),r=t.branch(Ho);return{spectrogram:Array.from({length:Bo},(e,t)=>n.branch(t).range(1,Vo)),voice:e.abyssal()&&r.probability(Uo)?r.branch(`words`).pick(Wo):null}}},Ko=class{#e;#t;constructor(e){this.#e=e.drains,this.#t=e.counts}drains(){return this.#e}counts(){return this.#t}},A=new Ko({drains:!1,counts:!1}),j=new Ko({drains:!0,counts:!1}),M=new Ko({drains:!0,counts:!0}),qo=`enter:`,Jo=`move:`,Yo=`capture:`,Xo=`scan`,Zo=`map`,Qo=`trace`,$o=`echo`,es=`capture-echo`,ts=`breach`,ns=`debug:integrity:`,rs=`debug:prime`,is=`debug:keystone`,as=100,os={up:`u`,down:`d`,descend:`d`,corridor:`c`,elevator:`b`,back:`b`,forward:`f`},ss=`j`,cs=`e`,ls=`c`,us=`m`,ds=Array.from({length:9},(e,t)=>String(t+1)),fs=Array.from({length:26},(e,t)=>String.fromCharCode(97+t)),ps=class{#e;#t;#n;#r;#i;#a;#o=new po;#s=new ho;#c=new Go;#l=new ko;#u=new lo;#d;#f=``;#p=null;#m=null;#h=null;constructor(e){this.#e=new xo(e.world),this.#t=e.entropy,this.#n=e.saves,this.#r=e.debug??!1,this.#i=[{keys:[`n`],turn:A,options:()=>this.#v()&&!this.#y()?[k(`new-world`,`n`,`New world`)]:[],run:()=>this.#x()},{keys:[`e`],turn:A,options:()=>this.#v()&&this.#y()?[k(`enter-world`,`e`,this.#e.resumes()?`Continue`:`Enter world`)]:[],run:()=>this.#b(this.#e.enter(),`Entered ${this.#e.here()?.name()??``}.`)},{keys:[`r`],turn:A,options:()=>this.#v()&&this.#y()?[k(`reroll`,`r`,`Re-roll`)]:[],run:()=>this.#x()},{keys:[],turn:M,options:()=>this.#C(),run:e=>{let t=this.#e.player(),n=t.resonantTraces(),r=this.#e.capture(Number(e.slice(8)));if(r===void 0)return this.#f;let i=t.resonantTraces()>n?` Harmonic resonance: +10%.`:``;return`Captured ${r.name()}. Frequency: ${String(r.frequency().hertz())} Hz.${i}`}},{keys:[],turn:M,options:()=>this.#S(),run:e=>{let t=this.#e.descend(Number(e.slice(6)));return this.#b(t,`Entered ${this.#e.here()?.name()??``}.`)}},{keys:[...new Set(Object.values(os))],turn:M,options:()=>this.#T(),run:e=>{let t=e.slice(5),n=this.#e.here(),r=n?.moves().find(e=>e.id===t)?.label??``,i=this.#e.move(t),a=this.#e.here();return this.#b(i,a===n?`${r}.`:`Entered ${a?.name()??``}.`)}},{keys:[`l`],turn:M,options:()=>{let e=this.#e.here();return e?.exit()===void 0?[]:[{...k(`leave`,`l`,e.leaveLabel()),role:`return`}]},run:()=>this.#b(this.#e.leave(),`Returned to ${this.#e.here()?.name()??``}.`)},{keys:[ss],turn:M,options:()=>this.#e.breachOffered()?[{...k(ts,ss,`Breach the Bedrock`),role:`move`}]:[],run:()=>this.#e.breach()===void 0?this.#f:`HARMONIC_INVERSION_PROTOCOL_ENGAGED — breaching the bedrock substrate. Lattice weight normalized: aperture opening at root. The Keystone is spent.`},{keys:[cs],turn:M,options:()=>this.#w(),run:e=>{if(e===$o){let e=this.#e.echo();return e===void 0?this.#f:e>=as?`HARMONIC_LOCK_ESTABLISHED: Spectral Echo isolated. Signal 100%.`:`SCANNING_VOID: Signal strength increasing... ${String(e)}%.`}let t=this.#e.captureEcho();return t===void 0?this.#f:`VOID_RESONANCE: Echo captured and stabilized. Frequency: ${String(t.frequency().hertz())} Hz.`}},{keys:[`s`],turn:j,options:()=>this.#v()?[]:[k(Xo,`s`,`Scan`)],run:()=>{let e=this.#e.here(),t=this.#e.player(),n=e?.scan(e=>t.visited(e));return n===void 0?`No scan-compatible structure detected in this strata.`:(this.#p={title:n.title,notes:n.notes,rows:n.rows.map(e=>({cells:e.cells,current:e.current,note:e.note}))},`LOCAL_LATTICE_SCAN_INITIATED [LOCUS: ${e?.address().toString()??``}]. SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.`)}},{keys:[us],turn:j,options:()=>this.#v()?[]:[k(Zo,us,`Map`)],run:()=>{let e=this.#e.here(),t=e===void 0?null:this.#D(e,this.#e.player());return t===null?`SCAN_ERROR: Current location does not support spatial projection.`:(this.#m=t,`NEURAL_LATTICE_PROJECTION: ${String(t.nodes.length)} nodes plotted from ${t.origin.name}.`)}},{keys:[`i`],turn:j,options:()=>this.#v()?[]:[k(to,`i`,`Buffer`)],run:()=>(this.#d=new oo(this.#e),``)},{keys:[],turn:j,options:()=>this.#v()?[]:[k(Qo,``,`Trace`)],run:()=>{let e=this.#e.here()?.trail()??[];return this.#h={steps:e.map((t,n)=>({depth:n,icon:t.kind().icon(),kind:t.kind().title(),name:t.name(),meta:t.meta(),current:n===e.length-1,abyssal:t.abyssal()}))},`NEURAL_LATTICE_TRACE_INITIATED: ${String(e.length)} levels from the universe.`}},{keys:[`t`],turn:j,options:()=>this.#v()?[]:[k(`to-title`,`t`,`Title screen`)],run:()=>this.#b(this.#e.toTitle(),``)},{keys:[`q`],turn:j,options:()=>this.#v()?[]:[k(Fo,`q`,`End session`)],run:()=>(this.#d=new Ro(this.#e),``)},{keys:[],turn:A,options:()=>this.#r&&!this.#v()?O.edges().map(e=>({...k(`${ns}${String(e)}`,``,`Integrity ${String(e)}`),role:`debug`})):[],run:e=>{let t=Number(e.slice(16));return this.#e.player().setCoherence(t),`Integrity set to ${String(t)}%.`}},{keys:[],turn:A,options:()=>this.#r&&this.#e.here()?.indoors()===!0?[{...k(rs,``,`Prime building`),role:`debug`},{...k(is,``,`Spawn Keystone`),role:`debug`}]:[],run:e=>{if(e===rs)return this.#e.prime()?`Building primed: every floor sampled, seven merges in.`:this.#f;let t=this.#e.spawnKeystone();return t===void 0?this.#f:`${t.name()} generated in the trace buffer.`}}];let t=new Set([...this.#i.flatMap(e=>e.keys),`v`]);this.#a=[...ds,...fs.filter(e=>!t.has(e))],this.#g()}step(e){this.#p=null,this.#m=null,this.#h=null;let t=this.#d;if(t!==void 0){let n=t.answer(e);return n!==void 0&&(n.done&&(this.#d=void 0),this.#f=n.message,this.#_()),this.snapshot()}let n=this.#i.find(t=>t.options().some(t=>t.id===e&&!t.sealed));if(n===void 0)return this.snapshot();let r=this.#e.here(),i=this.#e.player();if(r!==void 0&&n.turn.drains()&&(i.drain(this.#o.cost(r)),i.coherence().exhausted()))return this.#d=new jo(this.#e),this.#f=``,this.#_(),this.snapshot();if(this.#f=n.run(e),n.turn.counts()){i.count();let e=this.#e.lottery();e!==void 0&&(this.#f=`${this.#f} SPECTRAL_DEVIATION: Extracted Frequency ${String(e.frequency().hertz())} Hz.`)}return this.#_(),this.snapshot()}snapshot(){let e=this.#e.world(),t=this.#e.here(),n=this.#e.player();return{world:e===void 0?null:{seed:e.toString(),name:this.#e.universe()?.name()??``},place:t===void 0?null:this.#E(t,n),player:t===void 0?null:{coherence:n.coherence().value(),band:n.coherence().band(),steps:n.steps()},buffer:t===void 0?null:this.#O(n),prompt:this.#d?.summary()??null,options:this.#d?.options()??this.#i.flatMap(e=>e.options()),message:this.#f,scan:this.#p,map:this.#m,trace:this.#h}}#g(){let e=eo.parse(this.#n.load());if(e===void 0||!this.#e.restore(e))return;let t=this.#e.here(),n=t===void 0?``:` at ${t.name()}`;this.#f=`Restored world ${e.seed().toString()}${n}.`,this.#e.player().coherence().exhausted()&&(this.#d=new jo(this.#e))}#_(){let e=this.#e.saved();e!==void 0&&this.#n.save(e.toText())}#v(){return this.#e.here()===void 0}#y(){return this.#e.world()!==void 0}#b(e,t){return e?t:this.#f}#x(){let e=this.#t.draw();return this.#e.begin(e),`World ${e.toString()} drawn.`}#S(){let e=this.#e.here();if(e===void 0)return[];let t=this.#e.player(),n=0,r=e=>{if(e.sealed())return``;if(!e.goesByNumber())return this.#a[n++]??``;let t=String(e.ordinal());return t.length===1?t:``};return e.listing().map((n,i)=>({id:`${qo}${String(i)}`,key:r(n),label:`${e.approachVerb()} ${n.callSign()}`,place:n.name(),role:`travel`,sealed:n.sealed(),landmark:n.landmark(),ordinal:String(n.ordinal()),readings:n.readings(),opposite:``,current:n.current(),visited:t.visited(n)}))}#C(){let e=this.#e.here()?.contents();if(e==null)return[];let t=this.#e.player().buffer().full();return e.objects.map((e,n)=>({...k(`${Yo}${String(n)}`,t?``:ds[n]??``,`Take ${e.name()}`),place:e.name(),role:`take`,sealed:t,ordinal:String(n+1)}))}#w(){let e=this.#e.here()?.echo();if(e===void 0||e.found())return[];let t={...k($o,cs,`Scan for spectral echoes`),role:`move`};return e.locked()?[t,{...k(es,ls,`Capture Spectral Echo`),role:`move`,sealed:this.#e.player().buffer().full()}]:[t]}#T(){let e=this.#e.here();return e===void 0?[]:e.moves().map(e=>({...k(`${Jo}${e.id}`,os[e.id]??``,e.label),role:`move`,opposite:`${Jo}${e.opposite}`}))}#E(e,t){let n=e.peers(),r=this.#s.of(e,t.steps());return{kind:e.kind().title(),icon:e.kind().icon(),name:e.name(),address:e.address().toString(),hash:e.hash(),depth:e.depth(),position:n.length===0?null:{label:e.kind().indexLabel(),index:n.indexOf(e)+1,total:n.length},trail:e.trail().map(e=>({icon:e.kind().icon(),kind:e.kind().title(),name:e.name()})),status:e.status(),description:this.#u.read(e.description(),t.coherence(),r),facts:e.facts(),frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),childrenHeading:e.childrenHeading(),contents:this.#k(e),telemetry:this.#c.of(e,r),lattice:this.#D(e,t)}}#D(e,t){return this.#l.of(e,e=>t.visited(e),t.coherence(),this.#s.of(e,t.steps()))}#O(e){let t=e.buffer();return{size:t.size(),capacity:t.capacity(),resonant:e.resonantTraces(),fragments:t.fragments().map(e=>({key:e.key(),name:e.name(),hertz:e.frequency().hertz(),resonant:e.resonant()}))}}#k(e){let t=e.contents();return t===null?null:{objects:t.objects.map(e=>({key:e.key(),name:e.name()})),furniture:t.furniture}}},ms=class{warn(e){console.warn(e)}},hs=class{#e;constructor(e){this.#e=e}draw(){let[e=0,t=0]=this.#e.getRandomValues(new Uint32Array(2));return new Ya(e,t)}},gs=`endless-transit.save`,_s=class{#e;constructor(e){this.#e=e}load(){try{return this.#e().getItem(gs)??void 0}catch{return}}save(e){try{this.#e().setItem(gs,e)}catch{}}},vs=class{#e;constructor(e){this.#e=e}name(){return`ENDLESS TRANSIT`}buildLine(){return`build ${this.#e}`}},ys=`default`,bs=`abyssal`;function xs(e){return e===null?ys:e.abyssal?bs:e.frame??ys}var Ss=`buffer`,Cs=`▲ `,ws=10,Ts=`█`,Es=`░`,Ds={stable:`STABLE`,shifting:`SHIFTING`},Os={text:`[RESONANT]`,label:`Resonant`},ks=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Ss}toViewModel(e){let t=e.prompt,n=e.buffer;if(t?.id!==Ss||n===null)throw Error(`BufferPresenter needs the buffer prompt`);let r=e=>String(e).padStart(2,`0`),i=t.figures.selected??``,a=`[QUANTUM_TRACE_BUFFER_SYNC...]`,o=n.fragments.map((t,n)=>{let a=String(n+1),o=i===String(n),s=t.hertz%2==0,c=Math.floor(t.hertz%100/10)+1;return{key:t.key,ordinal:r(n+1),hertz:`${String(t.hertz)}Hz`,bar:Ts.repeat(c)+Es.repeat(ws-c),phase:s?Ds.stable:Ds.shifting,phaseKey:s?`stable`:`shifting`,name:t.name,badge:t.resonant?Os:null,selected:o,selectedLabel:o?`Selected`:``,actions:e.options.filter(e=>(e.role===`pick`||e.role===`drop`)&&e.ordinal===a).map(e=>this.#t(e))}}),s=e.options.filter(e=>e.role===`return`).map(e=>this.#n(e));return{scene:Ss,title:this.#e.name(),frame:xs(e.place),heading:a,count:{label:`TRACE_BUFFER`,value:`${r(n.size)}/${r(n.capacity)} FRAGMENTS`},tally:{label:`RESONANT_TRACES`,value:String(n.resonant)},empty:o.length===0?`(No spectral traces detected in local buffer)`:``,rows:o,hint:`Select one fragment, then another: they merge into a hybrid and give 15 Coherence back.`,sync:`SYNC_STATUS: NOMINAL`,dock:s,options:[...o.flatMap(e=>e.actions),...s],note:e.message,status:e.message===``?a:e.message,build:this.#e.buildLine(),regions:{buffer:`Quantum trace buffer`,actions:`Back`}}}#t(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:``}}#n(e){return{...this.#t(e),label:`${Cs}${e.label.toUpperCase()}`}}},As=globalThis,js=e=>e,Ms=As.trustedTypes,Ns=Ms?Ms.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Ps=`$lit$`,N=`lit$${Math.random().toFixed(9).slice(2)}$`,Fs=`?`+N,Is=`<${Fs}>`,P=document,F=()=>P.createComment(``),I=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Ls=Array.isArray,Rs=e=>Ls(e)||typeof e?.[Symbol.iterator]==`function`,zs=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bs=/-->/g,Vs=/>/g,R=RegExp(`>|${zs}(?:([^\\s"'>=/]+)(${zs}*=${zs}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Hs=/'/g,Us=/"/g,Ws=/^(?:script|style|textarea|title)$/i,z=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),B=Symbol.for(`lit-noChange`),V=Symbol.for(`lit-nothing`),Gs=new WeakMap,H=P.createTreeWalker(P,129);function Ks(e,t){if(!Ls(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Ns===void 0?t:Ns.createHTML(t)}var qs=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=L;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===L?c[1]===`!--`?o=Bs:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=R):(Ws.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=R):o=Vs:o===R?c[0]===`>`?(o=i??L,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?R:c[3]===`"`?Us:Hs):o===Us||o===Hs?o=R:o===Bs||o===Vs?o=L:(o=R,i=void 0);let d=o===R&&e[t+1].startsWith(`/>`)?` `:``;a+=o===L?n+Is:l>=0?(r.push(s),n.slice(0,l)+Ps+n.slice(l)+N+d):n+N+(l===-2?t:d)}return[Ks(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Js=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=qs(t,n);if(this.el=e.createElement(l,r),H.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=H.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(Ps)){let t=u[o++],n=i.getAttribute(e).split(N),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Zs:r[1]===`?`?Qs:r[1]===`@`?$s:W}),i.removeAttribute(e)}else e.startsWith(N)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ws.test(i.tagName)){let e=i.textContent.split(N),t=e.length-1;if(t>0){i.textContent=Ms?Ms.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],F()),H.nextNode(),c.push({type:2,index:++a});i.append(e[t],F())}}}else if(i.nodeType===8){if(i.data===Fs)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(N,e+1))!==-1;)c.push({type:7,index:a}),e+=N.length-1}}a++}}static createElement(e,t){let n=P.createElement(`template`);return n.innerHTML=e,n}};function U(e,t,n=e,r){if(t===B)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=I(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=U(e,i._$AS(e,t.values),i,r)),t}var Ys=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??P).importNode(t,!0);H.currentNode=r;let i=H.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Xs(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ec(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=H.nextNode(),a++)}return H.currentNode=P,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Xs=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),I(e)?e===V||e==null||e===``?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==B&&this._(e):e._$litType$===void 0?e.nodeType===void 0?Rs(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Js.createElement(Ks(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ys(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Gs.get(e.strings);return t===void 0&&Gs.set(e.strings,t=new Js(e)),t}k(t){Ls(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(F()),this.O(F()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=js(e).nextSibling;js(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=V}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=U(this,e,t,0),a=!I(e)||e!==this._$AH&&e!==B,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=U(this,r[n+o],t,o),s===B&&(s=this._$AH[o]),a||=!I(s)||s!==this._$AH[o],s===V?e=V:e!==V&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Zs=class extends W{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}},Qs=class extends W{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}},$s=class extends W{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??V)===B)return;let n=this._$AH,r=e===V&&n!==V||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==V&&(n===V||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ec=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}},tc={M:Ps,P:N,A:Fs,C:1,L:qs,R:Ys,D:Rs,V:U,I:Xs,H:W,N:Qs,U:$s,B:Zs,F:ec},nc=As.litHtmlPolyfillSupport;nc?.(Js,Xs),(As.litHtmlVersions??=[]).push(`3.3.3`);var G=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Xs(t.insertBefore(F(),e),e,void 0,n??{})}return i._$AI(e),i},rc={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ic=e=>(...t)=>({_$litDirective$:e,values:t}),ac=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:oc}=tc,sc=e=>e,cc=()=>document.createComment(``),K=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new oc(r.insertBefore(cc(),i),r.insertBefore(cc(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=sc(e).nextSibling;sc(r).insertBefore(e,i),e=t}}}return n},q=(e,t,n=e)=>(e._$AI(t,n),e),lc={},uc=(e,t=lc)=>e._$AH=t,dc=e=>e._$AH,fc=e=>{e._$AR(),e._$AA.remove()},pc=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},J=ic(class extends ac{constructor(e){if(super(e),e.type!==rc.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=dc(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=q(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=q(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=q(i[d],a[m]),K(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=q(i[f],a[p]),K(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=pc(o,p,m),u=pc(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=K(e,i[d]);q(t,a[p]),c[p]=t}else c[p]=q(n,a[p]),K(e,i[d],n),i[t]=null;p++}else fc(i[f]),f--}else fc(i[d]),d++;for(;p<=m;){let t=K(e,c[m+1]);q(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&fc(e)}return this.ut=o,uc(e,c),B}}),mc=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`BufferView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(V,this.#e),this.#e=void 0}#t(e){return z`
      <div class="app buffer" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap trace" aria-label=${e.regions.buffer} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="buffer-heading">${e.heading}</h2>
          <p class="bcount">
            <span class="k">${e.count.label}</span> <b data-testid="buffer-count">${e.count.value}</b>
            <span class="k">${e.tally.label}</span> <b data-testid="resonant-traces">${e.tally.value}</b>
          </p>
          ${e.empty===``?V:z`<p class="empty" data-testid="buffer-empty">${e.empty}</p>`}
          ${e.rows.length===0?V:z`<ol class="frags" data-testid="fragments">
                  ${J(e.rows,e=>`${e.ordinal}/${e.key}`,e=>z`
                      <li class=${e.selected?`frag selected`:`frag`} data-fragment=${e.key}>
                        <p class="fline">
                          <span class="ord">${e.ordinal}</span>
                          <span class="hz">${e.hertz}</span>
                          <span class="sig" data-phase=${e.phaseKey} aria-hidden="true">${e.bar}</span>
                          <span class="ph" data-phase=${e.phaseKey}>[${e.phase}]</span>
                        </p>
                        <p class="fname">
                          <b>${e.name}</b>
                          ${e.badge===null?V:z`<span class="badge" aria-hidden="true">${e.badge.text}</span
                                  ><span class="vh">${e.badge.label}</span>`}
                          ${e.selectedLabel===``?V:z`<span class="vh">${e.selectedLabel}</span>`}
                        </p>
                        <p class="facts">
                          ${J(e.actions,e=>e.id,e=>this.#n(e,`pb fb`))}
                        </p>
                      </li>
                    `)}
                </ol>`}
          <p class="hint">${e.hint}</p>
          <p class="tl">${e.sync}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="dock" aria-label=${e.regions.actions}>
          ${J(e.dock,e=>e.id,e=>this.#n(e,`pb`))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e,t){return z`
      <button type="button" class=${t} data-option=${e.id}>
        ${e.key===``?V:z`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},hc=`▲ `,gc={text:`>>`,label:`You are here`},_c={lattice:{meter:`COHERENCE`,depth:`HOP_DENSITY`,locus:`LOCUS`,hash:`LOCUS_HASH`,path:`Path from the universe`,sync:`LATTICE_SYNC: [NOMINAL]`},void:{meter:`INTEGRITY`,depth:`ABYSSAL_DEPTH`,locus:`VOID_LOCUS`,hash:`VOID_HASH`,path:`Void trace from the universe`,sync:`VOID_SYNC: [PRESSURE_HIGH]`}},vc=`[VOID] `,yc={text:`[>X<]`,label:`Elevator here`},bc={text:`[V]`,label:`Visited`},xc=`█`,Sc=`X`,Y={you:`YOU`,visited:`VISITED`,unvisited:`UNVISITED`,noise:`STATIC`,mark:`GLITCH`},Cc=`[NEURAL_LATTICE_PROJECTION]`,wc=`[NEURAL_LATTICE_TRACE_INITIATED]`,Tc=`>> `,Ec=4,Dc=class{#e;constructor(e){this.#e=e}accepts(e){return e.place!==null&&e.prompt===null}toViewModel(e){let t=e.place,n=e.player;if(t===null||n===null)throw Error(`HudPresenter needs a snapshot with a place`);let r=e.options.filter(e=>e.role===`travel`).map(e=>this.#a(e)),i=e.options.filter(e=>e.role===`move`).map(e=>this.#s(e)),a=e.options.filter(e=>e.role===`return`||e.role===`system`).map(e=>this.#s(e)),o=e.options.filter(e=>e.role===`take`),s=e.options.filter(e=>e.role===`debug`).map(e=>this.#s(e)),c=e=>String(e).padStart(2,`0`),l=t.abyssal?_c.void:_c.lattice;return{scene:`${e.world?.seed??``}/${t.address}`,title:this.#e.name(),frame:xs(t),crumbs:t.trail.map((e,n)=>({...e,current:n===t.trail.length-1})),meter:{label:l.meter,...O.range(),value:n.coherence,text:`${String(n.coherence)}%`,band:n.band,bandLabel:n.band,valueText:`${String(n.coherence)} percent, ${n.band}`},stats:[{label:`PULSE_TRAVERSAL`,value:String(n.steps)},{label:`TRACE_BUFFER`,value:`${c(e.buffer?.size??0)}/${c(e.buffer?.capacity??0)}`},{label:l.depth,value:c(t.depth)},...t.position===null?[]:[{label:t.position.label,value:`${c(t.position.index)}/${c(t.position.total)}`}],{label:l.locus,value:t.address},{label:l.hash,value:t.hash},{label:`SEED`,value:e.world?.seed??``}],place:{eyebrow:t.kind.toUpperCase(),icon:t.icon,name:t.name.toUpperCase(),tags:t.facts.map(e=>({key:e.key,label:e.label,value:e.value.toUpperCase()})),description:t.description,rows:this.#t(t),diagnostic:t.status},aside:this.#i(t,o,e.buffer?.resonant??0,l.sync),scan:e.scan===null?null:{label:`Scan`,heading:e.scan.title,notes:e.scan.notes,rows:e.scan.rows.map(e=>({cells:e.cells.filter(e=>e.value!==``).map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?gc:null,note:e.note}))},map:e.map===null?null:this.#n(e.map,Cc),trace:e.trace===null?null:this.#r(e.trace),heading:t.childrenHeading.replace(/:$/,``).toUpperCase(),rows:r,moves:i,sealedNote:r.some(e=>e.sealed)?`STRUCTURES SEALED · the lattice opens their doors in a later build`:null,sealedTag:`SEALED`,dock:a,fold:{after:Ec,more:`MORE`,less:`LESS`,label:`More of the dock`},debug:s,options:[...o.filter(e=>!e.sealed).map(e=>this.#o(e)),...r.filter(e=>!e.sealed).map(e=>({id:e.id,key:e.key,label:e.label,opposite:``})),...i,...a,...s],status:e.message,build:this.#e.buildLine(),regions:{hud:`Position`,path:l.path,place:`Where you are`,scan:`Scan`,map:`Map`,trace:`Trace`,travel:`Places to enter`,moves:`Moves`,aside:`Readouts`,dock:`Leave and game`,debug:`Debug tools`}}}#t(e){let t=e.contents;return t===null?[]:[{label:`FURNITURE`,value:t.furniture.join(`, `)},...t.objects.length===0?[]:[{label:`OBJECTS_DETECTED`,value:String(t.objects.length)}]]}#n(e,t){let n=e=>e.noise?`noise`:e.visited?`visited`:`unvisited`,r=e.nodes.find(e=>!e.noise)?.glyph??e.origin.glyph,i=e.nodes.filter(e=>e.visited).length,a=[{glyph:e.origin.glyph,label:Y.you,tone:`you`},{glyph:r,label:Y.visited,tone:`visited`},{glyph:r,label:Y.unvisited,tone:`unvisited`},...e.marks.length===0?[]:[{glyph:Sc,label:Y.mark,tone:`mark`}]],o=e.marks.length===0?``:`, ${String(e.marks.length)} glitch mark${e.marks.length===1?``:`s`}`;return{label:`Lattice map`,heading:t,origin:`SCAN_ORIGIN: ${e.origin.name}`,picture:{width:e.width,height:e.height,origin:{glyph:e.origin.glyph,label:Y.you},nodes:e.nodes.map(e=>({x:e.x,y:e.y,glyph:e.glyph,tone:n(e)})),marks:e.marks,markGlyph:Sc,legend:a},nodes:e.nodes.map(e=>({glyph:e.glyph,name:e.name,note:`${e.visited?`visited`:`unvisited`}${e.noise?`, static`:``}`})),summary:`Lattice map of ${e.origin.name}: ${String(e.nodes.length)} nodes, ${String(i)} visited${o}.`}}#r(e){let t=e.steps.map(e=>({depth:`[${String(e.depth).padStart(2,`0`)}]`,glyph:e.icon,kind:e.kind.toUpperCase(),name:`${e.name}${e.meta}`,current:e.current,abyssal:e.abyssal}));return{label:`Lattice trace`,heading:wc,picture:{rows:t},lines:t.map(e=>`${e.current?Tc:``}${e.depth} ${e.glyph} ${e.kind} : ${e.name}`)}}#i(e,t,n,r){let i=e.contents,a=t.some(e=>e.sealed);return{objects:i===null?null:{label:`In this room`,heading:`IN THIS ROOM`,empty:i.objects.length===0?`No objects detected.`:``,note:a?`BUFFER FULL — merge or drop a fragment to take more.`:``,tiles:i.objects.map((e,n)=>{let r=String(n+1),i=t.find(e=>e.ordinal===r&&!e.sealed);return{key:e.key,name:e.name,ordinal:r,action:i===void 0?null:this.#o(i)}})},telemetry:e.telemetry===null?null:{label:`System telemetry`,heading:`[SYSTEM_TELEMETRY]`,sync:r,spectrogram:{heading:`[QUANTUM_SPECTROGRAM]`,bars:e.telemetry.spectrogram.map(e=>xc.repeat(e))},logs:{heading:`[DECODE_LOGS]`,lines:[`> Trace: ${e.address}`,`> Resonant traces: ${String(n)}`,...e.telemetry.voice===null?[]:[`${vc}${e.telemetry.voice}`]]}},map:e.telemetry!==null||e.lattice===null?null:this.#n(e.lattice,`[NEURAL_MAP: ${e.kind.toUpperCase()}]`)}}#a(e){return{id:e.id,key:e.key.toUpperCase(),ordinal:e.ordinal.padStart(2,`0`),label:e.sealed?e.place:e.label,sealed:e.sealed,landmark:e.landmark,readings:e.readings.map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?yc:null,seen:e.visited?bc:null}}#o(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label,opposite:``}}#s(e){let t=e.role===`return`?hc:``;return{id:e.id,key:e.key.toUpperCase(),label:`${t}${e.label.toUpperCase()}`,opposite:e.opposite}}},Oc=class{#e;#t=new Map;constructor(e){this.#e=e}bind(e,t,n){if(t==null||n===null){this.unbind(e);return}let r=this.#t.get(e),i=r?.host===t?r.view:void 0;i===void 0&&(this.unbind(e),i=this.#e[e](),i.mount(t),this.#t.set(e,{host:t,view:i})),i.render(n)}unbind(e){this.#t.get(e)?.view.dispose(),this.#t.delete(e)}dispose(){for(let e of[...this.#t.keys()])this.unbind(e)}},kc=1800,Ac=.5,jc=`(prefers-reduced-motion: reduce)`,Mc=2,Nc=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e}mount(e){let t=e.ownerDocument.createElement(`canvas`);t.setAttribute(`aria-hidden`,`true`),e.replaceChildren(t),this.#t=t,this.#n=new ResizeObserver(()=>{this.#c(Ac)}),this.#n.observe(e)}render(e){if(this.#r=e,this.#a()){this.#s(),this.#c(Ac);return}this.#i===void 0&&this.#o()}dispose(){this.#s(),this.#n?.disconnect(),this.#n=void 0,this.#t?.remove(),this.#t=void 0,this.#r=void 0}#a(){return(this.#t?.ownerDocument.defaultView)?.matchMedia(jc).matches??!0}#o(){let e=this.#t?.ownerDocument.defaultView;e!=null&&(this.#i=e.requestAnimationFrame(e=>{this.#c(e%kc/kc),this.#o()}))}#s(){let e=this.#t?.ownerDocument.defaultView;this.#i!==void 0&&e?.cancelAnimationFrame(this.#i),this.#i=void 0}#c(e){let t=this.#t,n=this.#r,r=t?.parentElement;if(t===void 0||n===void 0||r==null)return;let i=r.clientWidth;if(i===0)return;let a=this.#e.height(n,i),o=t.ownerDocument.defaultView,s=Math.min(o?.devicePixelRatio??1,Mc),c=Math.round(i*s),l=Math.round(a*s);(t.width!==c||t.height!==l)&&(t.width=c,t.height=l,t.style.width=`${String(i)}px`,t.style.height=`${String(a)}px`);let u=t.getContext(`2d`);u!==null&&(u.setTransform(s,0,0,s,0,0),u.setLineDash([]),this.#e.paint(u,n,{width:i,height:a},this.#l(t),e))}#l(e){let t=e.ownerDocument.defaultView?.getComputedStyle(e),n=new Map;return e=>{let r=n.get(e);return r===void 0&&(r=t?.getPropertyValue(`--${e}`).trim()??``,n.set(e,r)),r}}},Pc=`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,Fc=12,Ic=24,Lc=14,Rc=7,zc=9,X=5,Bc={visited:`frame`,unvisited:`dim`,noise:`rd`,you:`yl`,mark:`mg`},Vc={visited:1,unvisited:.75,noise:1,you:1,mark:1},Hc=class{height(e,t){return Math.round(t*e.height/e.width)+Ic}paint(e,t,n,r,i){let a=n.width/t.width,o=n.height-Ic,s=o/t.height,c=Math.max(Fc,Math.round(Math.min(a,s)*.9)),l=(e,t)=>[(e+.5)*a,(t+.5)*s];e.globalAlpha=1,e.shadowBlur=0,e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height),e.fillStyle=r(`rule`);for(let n=0;n<t.height;n++)for(let r=0;r<t.width;r++){let[t,i]=l(r,n);e.fillRect(t-.5,i-.5,1,1)}e.strokeStyle=r(`rule-hi`),e.lineWidth=1,e.strokeRect(.5,.5,n.width-1,o-1),e.textAlign=`center`,e.textBaseline=`middle`,e.font=`400 ${String(c)}px ${Pc}`;for(let n of t.nodes){let[t,i]=l(n.x,n.y);this.#e(e,r,n.glyph,t,i,n.tone)}e.font=`700 ${String(c)}px ${Pc}`;for(let n of t.marks){let[i,a]=l(n.x,n.y);this.#e(e,r,t.markGlyph,i,a,`mark`)}let u=n.width/2,d=o/2;this.#t(e,r(`yl`),u,d,i),e.globalAlpha=1,e.fillStyle=r(`yl`),e.beginPath(),e.moveTo(u,d-X),e.lineTo(u+X,d),e.lineTo(u,d+X),e.lineTo(u-X,d),e.closePath(),e.fill(),e.font=`700 ${String(Fc)}px ${Pc}`,e.textAlign=`left`,this.#e(e,r,t.origin.glyph,u+X+4,d,`you`),this.#n(e,t,n,r,o)}#e(e,t,n,r,i,a){e.fillStyle=t(Bc[a]),e.globalAlpha=Vc[a],e.fillText(n,r,i)}#t(e,t,n,r,i){e.strokeStyle=t,e.lineWidth=1.2;for(let t=0;t<3;t++){let a=(i+t/3)%1;e.globalAlpha=(1-a)*.7,e.beginPath(),e.arc(n,r,Rc+zc*a,0,Math.PI*2),e.stroke()}}#n(e,t,n,r,i){let a=i+Ic/2;e.font=`400 ${String(Fc)}px ${Pc}`,e.textAlign=`left`,e.textBaseline=`middle`;let o=6;for(let i of t.legend){if(o+e.measureText(`${i.glyph} ${i.label}`).width>n.width)break;this.#e(e,r,i.glyph,o,a,i.tone),o+=e.measureText(i.glyph).width+5,e.globalAlpha=1,e.fillStyle=r(`dim`),e.fillText(i.label,o,a),o+=e.measureText(i.label).width+Lc}}},Uc=`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,Wc=12,Gc=34,Kc=12,qc=12,Z=22,Jc=9,Yc=44,Xc=8,Zc=`…`,Qc=class{height(e,t){return Kc+e.rows.length*Gc+qc}paint(e,t,n,r,i){e.globalAlpha=1,e.shadowBlur=0,e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height);let a=t.rows,o=e=>Kc+e*Gc+Gc/2;a.length>1&&(e.strokeStyle=r(`frame`),e.lineWidth=1.5,e.globalAlpha=.8,e.beginPath(),e.moveTo(Z,o(0)),e.lineTo(Z,o(a.length-1)),e.stroke()),e.textBaseline=`middle`;for(let[t,s]of a.entries()){let a=o(t),c=s.abyssal?`ab`:s.current?`yl`:`text`;s.current&&this.#t(e,r(c),Z,a,i),e.globalAlpha=1,e.fillStyle=r(`ground`),e.beginPath(),e.arc(Z,a,Jc,0,Math.PI*2),e.fill(),e.strokeStyle=r(s.abyssal?`ab`:s.current?`yl`:`frame`),e.lineWidth=s.current?2:1,e.beginPath(),e.arc(Z,a,Jc,0,Math.PI*2),e.stroke(),e.textAlign=`center`,e.font=`400 ${String(Wc)}px ${Uc}`,e.fillStyle=r(c),e.fillText(s.glyph,Z,a),e.textAlign=`left`,e.fillStyle=r(`dim`),e.fillText(s.depth,Yc,a-8);let l=e.measureText(s.depth).width+6;e.fillStyle=r(s.abyssal?`ab`:`dim`),e.fillText(s.kind,Yc+l,a-8),e.font=`${s.current?`700`:`400`} ${String(Wc)}px ${Uc}`,e.fillStyle=r(c),e.fillText(this.#e(e,s.name,n.width-Yc-Xc),Yc,a+8)}}#e(e,t,n){if(e.measureText(t).width<=n)return t;let r=t;for(;r.length>1&&e.measureText(r+Zc).width>n;)r=r.slice(0,-1);return r+Zc}#t(e,t,n,r,i){e.strokeStyle=t,e.lineWidth=1,e.globalAlpha=(1-i)*.6,e.beginPath(),e.arc(n,r,12+8*i,0,Math.PI*2),e.stroke()}},$c=class{#e;#t;#n=!1;#r=new Oc({pane:()=>new Nc(new Hc),map:()=>new Nc(new Hc),trace:()=>new Nc(new Qc)});mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`HudView.render before mount`);this.#t=e,G(this.#o(e),this.#e),this.#r.bind(`pane`,this.#i(`pane`),e.aside.map?.picture??null),this.#r.bind(`map`,this.#i(`map`),e.map?.picture??null),this.#r.bind(`trace`,this.#i(`trace`),e.trace?.picture??null)}dispose(){this.#r.dispose(),this.#e!==void 0&&G(V,this.#e),this.#e=void 0,this.#t=void 0}#i(e){return this.#e?.querySelector(`[data-canvas="${e}"]`)??null}#a(){this.#n=!this.#n,this.#t!==void 0&&this.render(this.#t)}#o(e){return z`
      <div class="app world" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="hud" aria-label=${e.regions.hud}>
          <nav aria-label=${e.regions.path}>
            <ol class="spark" data-testid="path">
              ${e.crumbs.map(e=>z`
                  <li class=${e.current?`crumb you`:`crumb`}>
                    <span class="vh">${e.kind}</span
                    ><span class="ic" aria-hidden="true">${e.icon}</span
                    ><span class="cn" aria-current=${e.current?`location`:V}
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
            ${e.stats.map(e=>z`
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
            ${e.place.tags.map(e=>z`
                <li class="tag" data-fact=${e.key}><span class="k">${e.label}</span> ${e.value}</li>
              `)}
          </ul>
          <div class="desc">${e.place.description.map(e=>z`<p>${e}</p>`)}</div>
          ${e.place.rows.length===0?V:z`<dl class="prows">
                  ${e.place.rows.map(e=>z`
                      <div class="prow">
                        <dt>${e.label}</dt>
                        <dd>${e.value}</dd>
                      </div>
                    `)}
                </dl>`}
          <p class="diag">${e.place.diagnostic}</p>
          <p class=${e.status===``?`status quiet`:`status`} data-testid="status">${e.status}</p>
        </section>
        ${this.#s(e)} ${e.map===null?V:this.#c(e.map,`map`,`map`,e.regions.map)}
        ${this.#l(e)}
        ${e.moves.length===0?V:z`
                <nav class="moves" aria-label=${e.regions.moves}>
                  ${J(e.moves,e=>e.id,e=>this.#f(e))}
                </nav>
              `}
        <div class="side">
          ${e.rows.length===0?V:z`
                  <section class="travel" aria-label=${e.regions.travel}>
                    <h3 class="heading">${e.heading}</h3>
                    ${e.sealedNote===null?V:z`<p class="sealed-note" data-testid="sealed-note">${e.sealedNote}</p>`}
                    <ol class="rows">
                      ${J(e.rows,t=>`${e.scene}/${t.id}`,t=>this.#d(t,e.sealedTag))}
                    </ol>
                  </section>
                `}
          ${this.#u(e)}
        </div>
        <nav class="dock" aria-label=${e.regions.dock}>
          ${J(e.dock.slice(0,e.fold.after),e=>e.id,e=>this.#f(e))}
          ${e.dock.length<=e.fold.after?V:z`
                  <button
                    type="button"
                    class="pb more"
                    data-testid="more"
                    aria-label=${e.fold.label}
                    aria-expanded=${this.#n?`true`:`false`}
                    @click=${()=>{this.#a()}}
                  >
                    <span>${this.#n?e.fold.less:e.fold.more}</span>
                  </button>
                  ${this.#n?J(e.dock.slice(e.fold.after),e=>e.id,e=>this.#f(e)):V}
                `}
        </nav>
        ${e.debug.length===0?V:z`
                <nav class="debug" aria-label=${e.regions.debug} data-testid="debug">
                  ${J(e.debug,e=>e.id,e=>this.#f(e))}
                </nav>
              `}
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#s(e){let t=e.scan;return t===null?V:z`
      <section class="scan" data-testid="scan" aria-label=${t.label}>
        <h3 class="heading">${t.heading}</h3>
        ${t.notes.map(e=>z`<p class="tl">${e}</p>`)}
        <ol class="srows">
          ${t.rows.map(e=>z`
              <li class=${e.mark===null?`srow`:`srow you`}>
                <p class="cells">
                  ${e.mark===null?V:z`<span class="mark" aria-hidden="true">${e.mark.text}</span
                          ><span class="vh">${e.mark.label}</span>`}${e.cells.map(e=>z`
                      <span class="cell" data-fact=${e.key}
                        ><span class="k">${e.label}</span> ${e.value}</span
                      >
                    `)}
                </p>
                ${e.note===``?V:z`<p class="snote">${e.note}</p>`}
              </li>
            `)}
        </ol>
      </section>
    `}#c(e,t,n,r){return z`
      <section class=${t===`pane`?`map pane`:`map`} data-testid=${n} aria-label=${r}>
        <h3 class="heading">${e.heading}</h3>
        <div class="cv" data-canvas=${t} role="img" aria-label=${e.summary}></div>
        <p class="tl">${e.origin}</p>
        <ul class="vh">
          ${e.nodes.map(e=>z`<li>${e.glyph} ${e.name}, ${e.note}</li>`)}
        </ul>
      </section>
    `}#l(e){let t=e.trace;return t===null?V:z`
      <section class="tracep" data-testid="trace" aria-label=${e.regions.trace}>
        <h3 class="heading">${t.heading}</h3>
        <div class="cv" data-canvas="trace" role="img" aria-label=${t.label}></div>
        <ol class="vh">
          ${t.lines.map(e=>z`<li>${e}</li>`)}
        </ol>
      </section>
    `}#u(e){let{objects:t,telemetry:n,map:r}=e.aside;return t===null&&n===null&&r===null?V:z`
      <aside class="aside" aria-label=${e.regions.aside}>
        ${t===null?V:z`
                <section class="objects" data-testid="objects" aria-label=${t.label}>
                  <h3 class="heading">${t.heading}</h3>
                  ${t.empty===``?V:z`<p class="empty">${t.empty}</p>`}
                  ${t.note===``?V:z`<p class="empty" data-testid="buffer-full">${t.note}</p>`}
                  ${t.tiles.length===0?V:z`<ul class="tiles">
                          ${J(t.tiles,t=>`${e.scene}/${t.ordinal}`,e=>e.action===null?z`<li class="tile" data-relic=${e.key}>
                                    <span class="ord">${e.ordinal}</span>${e.name}
                                  </li>`:z`<li>
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
        ${n===null?V:z`
                <section class="tele" data-testid="telemetry" aria-label=${n.label}>
                  <p class="th">${n.heading}</p>
                  <p class="tl">${n.sync}</p>
                  <p class="th">${n.spectrogram.heading}</p>
                  <p class="bars" aria-hidden="true">
                    ${n.spectrogram.bars.map(e=>z`<span>${e}</span>`)}
                  </p>
                  <p class="th">${n.logs.heading}</p>
                  ${n.logs.lines.map(e=>z`<p class="tl">${e}</p>`)}
                </section>
              `}
        ${r===null?V:this.#c(r,`pane`,`pane-map`,r.label)}
      </aside>
    `}#d(e,t){let n=e.landmark?`lb landmark`:`lb`;return e.sealed?z`
        <li class="row sealed" data-sealed>
          <span class="ord">${e.ordinal}</span><span class=${n}>${e.label}</span
          ><span class="seal">${t}</span>
        </li>
      `:z`
      <li>
        <button
          type="button"
          class=${[`row`,e.mark===null?``:`you`,e.seen===null?``:`seen`].join(` `).trim()}
          data-option=${e.id}
        >
          <span class="ord">${e.ordinal}</span
          ><span class="mid"
            ><span class="ln"
              ><span class=${n}>${e.label}</span>${e.mark===null?V:z`<span class="mark" aria-hidden="true">${e.mark.text}</span
                      ><span class="vh">${e.mark.label}</span>`}${e.seen===null?V:z`<span class="seen-mark" aria-hidden="true">${e.seen.text}</span
                      ><span class="vh">${e.seen.label}</span>`}</span
            >${e.readings.length===0?V:z`<span class="rds"
                    >${e.readings.map(e=>z`
                        <span class="rd" data-fact=${e.key}
                          ><span class="vh">${e.label}</span>${e.value}</span
                        >
                      `)}</span
                  >`}</span
          >${e.key===``?V:z`<kbd aria-hidden="true">${e.key}</kbd>`}
        </button>
      </li>
    `}#f(e){return z`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?V:z`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},el=`reboot`,tl=`dead`,nl=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===el}toViewModel(e){let t=`!!! CRITICAL_COHERENCE_FAILURE !!!`;return{scene:el,title:this.#e.name(),frame:tl,stageLine:`NEURAL LINK LOST`,eyebrow:`COHERENCE ${String(e.player?.coherence??0)}%`,headline:t,line:`REBOOTING...`,explanation:`The world is rebuilt from the same seed. You wake on the starting street with 100 Coherence; your step count and the places you have visited are kept. Everything that lived inside the world is undone.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?t:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,notice:`Link failure`,actions:`Actions`}}}},rl=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RebootView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(V,this.#e),this.#e=void 0}#t(e){return z`
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
          ${J(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return z`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?V:z`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},il=`recap`,al=[{key:`locus`,label:`FINAL_LOCUS`,unit:``},{key:`steps`,label:`PULSE_TRAVERSAL`,unit:` steps`},{key:`places`,label:`CELLS_MAPPED`,unit:` footprints`},{key:`buffer`,label:`BUFFER_DENSITY`,unit:` spectral fragments`},{key:`resonant`,label:`RESONANT_TRACES`,unit:` resonant`}],ol=[`UNMOUNTING_LATTICE_TRACE`,`DEALLOCATING_TRACE_BUFFER`,`RELEASING_NEURAL_CARRIER`,`STABILIZING_SUBSTRATE_WAVEFORM`],sl={void:{heading:`[VOID_RESONANCE_TERMINATION]`,figures:!1,shutdown:!1,lines:[`Your echoes are sinking into the strata.`,`The web is folding back upon itself.`,`The v-v-void... it remembers... [OK]`],closing:`Sleep among the static, Operator.`},expedition:{heading:`[SESSION_RECAP_INITIALIZED]`,figures:!0,shutdown:!1,lines:[],closing:`Expedition successful. Trace synchronized to substrate.`},severed:{heading:`[LINK_TERMINATION_PROTOCOL]`,figures:!1,shutdown:!0,lines:[],closing:`Neural link severed. Waveform stabilized.`}},cl=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===il}toViewModel(e){let t=e.prompt;if(t?.id!==il)throw Error(`RecapPresenter needs the recap prompt`);let n=sl[t.outcome];if(n===void 0)throw Error(`no words for the ending '${t.outcome}'`);return{scene:il,title:this.#e.name(),frame:xs(e.place),heading:n.heading,figures:n.figures?this.#t(t):[],steps:n.shutdown?ol.map(e=>({label:`[STATUS]`,process:`${e}...`,done:`[DONE]`})):[],lines:n.lines,closing:n.closing,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?n.heading:e.message,build:this.#e.buildLine(),regions:{recap:`Session recap`,actions:`Actions`}}}#t(e){return al.map(t=>({label:t.label,value:`${e.figures[t.key]??``}${t.unit}`}))}},ll=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RecapView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(V,this.#e),this.#e=void 0}#t(e){return z`
      <div class="app" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap recap" aria-label=${e.regions.recap} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="recap-heading">${e.heading}</h2>
          ${e.figures.length===0?V:z`<dl class="figures" data-testid="figures">
                  ${e.figures.map(e=>z`
                      <div class="figure">
                        <dt>${e.label}</dt>
                        <dd>${e.value}</dd>
                      </div>
                    `)}
                </dl>`}
          ${e.steps.length===0?V:z`<ol class="shutdown" data-testid="shutdown">
                  ${e.steps.map(e=>z`
                      <li>
                        <span class="k">${e.label}</span> ${e.process}
                        <span class="done">${e.done}</span>
                      </li>
                    `)}
                </ol>`}
          ${e.lines.length===0?V:z`<div class="void-lines" data-testid="void-lines">
                  ${e.lines.map(e=>z`<p>${e}</p>`)}
                </div>`}
          <p class="closing" data-testid="closing">${e.closing}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${J(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return z`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?V:z`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},ul=class{#e;constructor(e){this.#e=e}accepts(e){return e.place===null&&e.prompt===null}toViewModel(e){return{scene:`title`,title:this.#e.name(),tagline:`Vinculum neural interface · lattice uplink`,stageLine:e.world===null?`AWAITING SEED`:`WORLD LOCKED`,world:e.world===null?null:{nameLabel:`UNIVERSE`,name:e.world.name.toUpperCase(),seedLabel:`SEED`,seed:e.world.seed},prompt:`NO WORLD LOADED. DRAW A SEED TO BEGIN.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),status:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,world:`World`,actions:`Actions`}}}},dl=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`TitleView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(V,this.#e),this.#e=void 0}#t(e){return z`
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
          ${e.world===null?z`<p class="prompt" data-testid="prompt">${e.prompt}</p>`:z`
                  <p class="eyebrow">${e.world.nameLabel}</p>
                  <h2 data-testid="world-name">${e.world.name}</h2>
                  <p class="eyebrow">${e.world.seedLabel}</p>
                  <p class="seed" data-testid="world-seed">${e.world.seed}</p>
                `}
          <p class=${e.status===``?`status quiet`:`status`} data-testid="status">${e.status}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${J(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return z`
      <button type="button" class="pb" data-option=${e.id}>
        <kbd aria-hidden="true">${e.key}</kbd><span>${e.label}</span>
      </button>
    `}},Q=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}accepts(e){return this.#e.accepts(e)}mount(e){this.#t.mount(e)}show(e){let t=this.#e.toViewModel(e);return this.#t.render(t),t}dispose(){this.#t.dispose()}},fl=class{#e;#t=new AbortController;#n=[];constructor(e){this.#e=e}attach(e){let t=this.#t.signal;e.addEventListener(`click`,e=>{this.#r(e)},{signal:t}),e.ownerDocument.addEventListener(`keydown`,e=>{this.#i(e)},{signal:t})}offer(e){this.#n=e}detach(){this.#t.abort()}#r(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`button[data-option]`)?.dataset.option;t!==void 0&&this.#n.some(e=>e.id===t)&&this.#e(t)}#i(e){if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;let t=this.#n.find(t=>t.key.toLowerCase()===e.key.toLowerCase());t!==void 0&&(e.preventDefault(),this.#e(t.id))}},pl=class{#e;#t;#n;#r;#i;#a;#o;#s;#c=[];#l;constructor(e,t){this.#e=e,this.#t=t,this.#n=new fl(e=>{this.#l=this.#c.find(t=>t.id===e),this.#u(this.#e.step(e))})}start(e){this.#r=e,this.#i=this.#d(e),this.#n.attach(e),this.#u(this.#e.snapshot())}stop(){this.#n.detach(),this.#a?.dispose(),this.#a=void 0,this.#i?.remove(),this.#i=void 0,this.#r=void 0}#u(e){let t=this.#r,n=this.#t.find(t=>t.accepts(e));if(t===void 0||n===void 0)throw Error(`no screen accepts this snapshot`);let r=this.#p();n!==this.#a&&(this.#a?.dispose(),n.mount(t),this.#a=n);let i=n.show(e);if(this.#n.offer(i.options),this.#c=i.options,this.#f(i.status),r?.isConnected===!1&&this.#m(i.scene,this.#l),i.scene!==this.#o){this.#h();let e=r instanceof HTMLElement?r.dataset.option:void 0;this.#s=this.#o===void 0||e===void 0?void 0:{scene:this.#o,optionId:e}}this.#o=i.scene}#d(e){let t=e.ownerDocument.createElement(`p`);return t.className=`vh`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),e.prepend(t),t}#f(e){this.#i!==void 0&&this.#i.textContent!==e&&(this.#i.textContent=e)}#p(){let e=this.#r?.ownerDocument.activeElement;return e!=null&&this.#r?.contains(e)===!0?e:void 0}#m(e,t){let n=this.#r,r=[...n?.querySelectorAll(`button[data-option]`)??[]],i=this.#s,a=i?.scene===e?r.find(e=>e.dataset.option===i.optionId):void 0;if(a!==void 0){a.focus({preventScroll:!0});return}let o=t?.opposite??``,s=n?.querySelector(`[data-rest]`);if(o!==``&&this.#c.some(e=>e.id===o)&&s!=null){s.focus({preventScroll:!0});return}r.find(e=>e.dataset.option!==o)?.focus({preventScroll:!0})}#h(){this.#r?.ownerDocument.defaultView?.scrollTo({top:0,left:0,behavior:`instant`})}},ml=document.querySelector(`#app`);if(ml===null)throw Error(`#app is missing from index.html`);var hl=new nn(new tn),gl=new URLSearchParams(window.location.search).has(`debug`),_l=new ps({world:new Fa(hl,new Ua(hl),new ms),entropy:new hs(window.crypto),saves:new _s(()=>window.localStorage),debug:gl}),$=new vs(`43bf576`);new pl(_l,[new Q(new nl($),new rl),new Q(new cl($),new ll),new Q(new ks($),new mc),new Q(new ul($),new dl),new Q(new Dc($),new $c)]).start(ml);