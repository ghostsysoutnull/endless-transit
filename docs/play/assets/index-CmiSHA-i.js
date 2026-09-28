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
`,_=`Slab
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
`,ee=`Hub
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
`,te=`Pod
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
`,ne=`Shell
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
`,re=`Pavilion
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
`,ie=`Void
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
`,ae=`Forum
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
`,oe=`small
medium
large
`,se=`Arcology
Mega-Structure
Spire
Sky-Anchor
Bastion
Citadel
`,ce=`Block
Plaza
Heights
Center
Complex
`,le=`Annex
Cell
Unit
Pod
Hut
Point
`,ue=`Silver
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
`,de=`head
tail
`,fe=`town
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
`,pe=`Arid
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
`,me=`prefix
core
suffix
`,he=`The United
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
`,ge=`Republic
Kingdom
Empire
Federation
Sovereignty
Union
Territories
Lands
Domain
`,_e=`Alpha
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
`,ve=`greek
type
`,ye=`Strand
Thread
Web
Link
Sync
Stream
Flow
Pulse
`,be=`lobby
peak
`,xe=`TRANSIT_LOBBY
`,Se=`PEAK_OBSERVATORY
`,Ce=`MECHANICAL_SUMP
STORAGE_CELL
POWER_RELAY
FILTRATION_INTAKE
`,we=`EXECUTIVE_SUITE
NEURAL_UPLINK
DATA_VAULT
VIP_QUARTERS
`,Te=`basement
living
executive
`,Ee=`LIVING_UNIT
RESEARCH_LAB
HYDROPONIC_BAY
BIO_SERVER
`,De=`Ter
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
`,Oe=`head
tail
`,ke=`ra
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
`,Ae=`Hydroponic Bay||stillness
Spore Farm||stillness
Oxygen Sump||stillness
Growth Chamber||stillness
`,je=`Prayer Hall||stillness
Ritual Chamber||stillness
Archive||stillness
Memory Well||frost
`,Me=`Trading Floor||stillness
Logic Market||stillness
Credit Hub||humming
Supply Node||clicking
`,Ne=`Power Plant||ozone
Processing Core||ozone
Maintenance Bay||clicking
Fuel Depot||humming
`,Pe=`Security Station|burned DANGER|clicking
Barracks||humming
Armory|burned DANGER|clicking
Tactical Hub||humming
`,Fe=`Laboratory|stamped DATA_VAULT|ozone
Neural Link Array||ozone
Observation Deck||stillness
Bio-Server|stamped DATA_VAULT|ozone
`,Ie=`Outer
Inner
Core
Rim
Void
Prime
Secondary
Tertiary
Quaternary
`,Le=`descriptor
noun
`,Re=`Sector
Quadrant
Grid
Matrix
Zone
Region
Reach
Expanse
`,ze=`prefix
suffix
`,Be=`Alpha
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
`,Ve=`Prime
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
`,He=`High
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
`,Ue=`adjective
noun
`,We=`Way
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
`,Ge=`a single flickering green bulb
pulsing red emergency strobes
unshielded sparking conduits
the dim glow of dying data-cores
harsh sodium-yellow glare
complete darkness punctuated by blue static
the rhythmic blink of a foundation-alarm
cold moonlight-simulations through ceiling-cracks
`,Ke=`the warm cathode glow of a CRT monitor
flickering fluorescent tubes with a distinct hum
the orange pulse of vacuum tubes
buzzing neon signage leaking green light
dim yellow incandescent bulbs on frayed wires
the flicker of a slide projector left cycling
a desk lamp with a bent green shade
the amber glow of a radio dial
a bare bulb behind a cracked lampshade
the phosphor trace of an oscilloscope
`,qe=`the flickering flame of oil lamps
guttering beeswax candles
harsh sunlight filtered through dust
low-burning embers in a stone hearth
pale moonlight through a narrow aperture
guttering tallow candles in iron sconces
embers breathing in a clay hearth
dust-thick sunlight through a narrow slit
a single oil lamp on a stone ledge
moonlight through a broken lattice
`,Je=`the green phosphor sweep of a radar scope
ring-shaped fluorescent tubes humming behind chrome grilles
the sickly glow of radium-painted dials
a bare bulb swinging inside a lead-lined cage
harsh flashbulb pops from a camera no one is holding
the strobe of a rotating beacon
formica gleaming under fluorescent panels
a lava lamp's slow orange churn
the pale wash of a television test pattern
a neon diner sign buzzing red
`,Ye=`the blue-white wash of a flat-panel monitor left on
status LEDs blinking green and amber along an ethernet hub
a screensaver's slow colours crawling across the ceiling
the translucent glow of a tower case lit from within
pale light leaking around a frosted glass disc
the cyan glow of a loading bar
a monitor cycling through screensaver stars
a wall of LEDs blinking out of sync
a scanner's green line sweeping the floor
the pale flicker of a failing backlight
`,Xe=`light that fades the moment you look at it
a residual glow bleeding from surfaces that no longer exist
the after-image of a lamp that has already gone out
dissolving motes of static drifting like ash
a dull heat-shimmer where the ceiling used to be
light that arrives a moment after its source
a glow with no lamp left to cast it
sunlight faded to the colour of dust
the memory of fluorescence, humming
shadows brighter than the room
`,Ze=`a soft holographic haze with no visible source
laser-etched lines glowing along the seams of the floor
smart glass panels dimming and brightening on their own
the violet corona of an idle plasma coil
a drone's searchlight sweeping past the doorway
a lattice of laser threads across the ceiling
bioluminescent panels breathing slowly
the white glare of a field emitter
a hologram flickering between two rooms
light bent around a gravity plate
`,Qe=`abyssal
analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,$e=`the intense white arc of a welding torch
humming mercury-vapor lamps
cold sodium-glare reflecting off soot
pulsing red emergency strobes
the steady burn of gas-lanterns
a foundry glow through smoked glass
carbide lamps hissing on hooks
a wall of gauges lit from behind
sparks arcing from an open junction
oil lamps swinging on a chain
`,et=`shifting quantum particles suspended in air
the soft, directionless glow of pure data
blinding white singularity-flashes
flickering holographic rays in various spectra
the cold blue luminescence of dark-matter cores
light folded twice before it reaches you
the blue shimmer of a probability field
a glow that is brighter when you look away
stars visible through a wall that is not there
the slow pulse of a zero-point coil
`,tt=`a sprawling grow-chamber with hanging pods
terraced geometric shelves for organic data
low-humidity storage-vault architecture
spatial grid designed for nutrient-flow
domed environment with recycled atmosphere
a humid grow-hall under banks of pink lamps
stacked hydroponic trays dripping into gutters
a seed vault of numbered steel drawers
a composting pit ringed with vents
a greenhouse with every pane fogged
`,nt=`a cavernous vaulted hall
geometry designed for acoustic resonance
ornate processional pathway with high ceilings
ceremonial viewing-gallery structure
sacred geometric reconstruction
a circular nave beneath a dark dome
a hall of benches facing an empty dais
a crypt of stacked memory-urns
a bell chamber with the bell removed
a reliquary room lined with sealed niches
`,rt=`a tiered trading floor beneath a dead ticker board
shuttered market stalls arranged in a strict grid
a vaulted credit hall of teller cages and pneumatic tubes
shelving-lined supply geometry with a barcode on every edge
an open atrium of kiosks lit for customers who never came
a counting room of locked drawers and ledgers
a showroom of empty plinths
a warehouse aisle of numbered crates
a ticket hall with every window shuttered
an exchange floor of dead terminals
`,it=`a soot-blackened machine hall with catwalks overhead
pipe-choked geometry built around a single humming turbine
a maintenance pit ringed by chain hoists and drip trays
a cavernous fuel bay of riveted tanks and warning stencils
gantry-braced architecture that vibrates with every pulse
a pump room throbbing behind a steel grille
a foundry floor scarred by cooled spills
a control gallery over a silent line
a coal bunker with a sloping floor
a compressor hall lined with gauges
`,at=`a cramped, blast-shielded alcove
reinforced bunker-like geometry
spatial cell with tactical telemetry projected on the floor
narrow kill-zone corridor layout
armored transit-node architecture
a briefing room with the map torn down
a magazine of empty racks and chains
a watch post with a slit for a window
a gas-lock chamber with two sealed doors
a drill floor marked in faded lines
`,ot=`a sterile, hyper-clean laboratory cell
geometry optimized for spectral observation
sprawling containment unit with glass partitions
data-rich environment with floating schematics
modular experimental subspace
a clean room behind a double airlock
an archive of slide drawers and lamps
an observation cell walled in one-way glass
a specimen vault of frosted jars
a calibration bay of silent instruments
`,st=`geometry that folds back into itself at the corners
a non-Euclidean chamber whose far wall is also its floor
a probability-field cell that resolves only while observed
space stretched thin around a dormant quantum core
a time-dilated alcove where echoes arrive before their source
a corridor that ends where it began
a room whose ceiling is another floor
a stairwell that descends into its own top
an alcove folded inside a larger alcove
a chamber lit by its own reflection
`,ct=`a cavernous brutalist vault
geometry designed for substrate-pressure
massive maintenance sub-void
foundation pit with echoing depths
unfinished spatial segment
recursively deepening concrete shaft
oppressive low-ceiling transit-node
forgotten infrastructure cell
`,lt=`abyssal
Agricultural
Ceremonial
Commercial
Industrial
Military
Research
Singularity
`,ut=`raw pour-concrete
rusted rebar
vibrating metal plates
exposed heavy cabling
moist, dark aggregate
black oily tiles
heavily weathered granite
oxidized iron plating
`,dt=`silk damask with gold thread
heavy mahogany paneling
plaster with crumbling frescoes
velvet-lined stonework
gilded ivory slabs
stone tracery over faded frescoes
dark oak panels carved with vines
gilt mouldings peeling from plaster
cold flagstone under tapestries
stained glass set into black iron
`,ft=`velvet-flocked wallpaper above mahogany wainscoting
brass-framed panels of etched crystal
silk tapestries hung over gilt plaster
clock-mechanism friezes in tarnished brass
mirrored panels in ornate gold-leaf frames
wallpaper of interlocking clock faces
mahogany cabinets glazed with crystal
panels of tooled leather and brass studs
cream plaster with gilded cornices
mirrored alcoves behind velvet ropes
`,pt=`unyielding obsidian blocks
matte-black composite plating
brutalist concrete with geometric grooves
featureless grey ceramic
seamless dark alloy
matte basalt slabs with no visible mortar
dark composite panels etched with a grid
polished grey stone that swallows echoes
seamless black alloy, faintly warm
hexagonal ceramic tiles, unbroken
`,mt=`flickering acrylic panels
exposed wiring behind translucent plastic
projected holographic static
humming glass conduits
backlit mirrored surfaces
wet-look acrylic streaked with pink light
glass block lit from within
panels of dead advertising screens
corrugated plastic over flickering tubes
mirrored strips under a violet wash
`,ht=`pulsing sinew and bone-like struts
translucent membrane over fluid-filled sacks
hardened chitinous plates
woven vine-lattices with moss overgrowth
calcified shell-fragments
ribbed cartilage that flexes as you pass
damp membrane veined with light
overlapping scales the colour of bone
a lattice of roots grown through plaster
soft fungal shelves in tiers
`,gt=`corrugated sheets bolted over crumbling brick
flaking industrial paint over pitted iron
welded scrap plates streaked with orange oxide
oil-stained concrete cracked down to the rebar
chain-link mesh stretched over rusted girders
oxide-streaked steel with weeping seams
patched sheet metal over brick
iron plating bubbled with corrosion
soot-black concrete and rusted mesh
warped girders behind tarpaulin
`,_t=`shoji screens of paper stretched over cedar
lacquered panels painted with cranes and mist
plaster stained by the smoke of a thousand lanterns
woven bamboo lattice over dark timber
vermilion pillars framing calligraphy scrolls
dark cedar beams over white plaster
sliding panels painted with pines
bamboo slats and rice-paper light
black lacquer inlaid with mother-of-pearl
stacked stone under a tiled eave
`,vt=`seamless white surfaces with no visible joins
perfectly matte panels that swallow every shadow
glass so clear it reads as open air
white light strips set flush into featureless plaster
silent, unmarked panels that hum when touched
white panels with no seams or shadows
frosted glass lit evenly from nowhere
matte surfaces that refuse a reflection
pale plaster, absolutely silent
a curved wall with no corner to find
`,yt=`fluted marble columns set into alabaster
sun-bleached limestone carved with laurel friezes
ivory-veined marble polished to a mirror
weathered travertine blocks joined without mortar
painted plaster of sandaled figures in procession
white marble veined with gold
fluted columns between painted panels
limestone blocks carved with olive wreaths
travertine warmed by an unseen sun
bronze plaques set into alabaster
`,bt=`white
blue
pink
gray
purple
orange
green
red
`,xt=`overturned
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
`,St=`obsidian shard
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
`,Ct=`stone gargoyle
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
`,wt=`velvet armchair
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
`,Tt=`abyssal
baroque
gilded
monolith
neon
organic
rust
shogun
void
zenith
`,Et=`obsidian cube
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
`,Dt=`flickering light tube
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
`,Ot=`chitinous plate
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
`,kt=`corrugated metal sheet
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
`,At=`shoji screen
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
`,jt=`floating white sphere
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
`,Mt=`marble pillar
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
`,Nt=`A long corridor with multiple doors|long
A narrow service corridor, doors set flush into either wall|service
A curved gallery of doors beneath a single strip of light|curved
A dead-straight corridor whose far end dissolves into static|static
`,Pt=`The air hums with the resonance of {culture} geometry.
{culture} geometry presses in from every wall; the elevator sighs shut behind you.
A landing of {culture} design, silent except for the lift cables ticking overhead.
The floor plate resonates faintly with {culture} architecture.
`,Ft=`corridor
floor
`,It=`inscriptions
materials
states
`,Lt=`VOID_SINK
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
`,Rt=`Heavy Bulkhead|A heavily reinforced poly-slab bulkhead.|metal
Synth-Glass Slab|A pristine synth-glass barrier, reflecting the corridor's dim light.|glass
Pitted Concrete|A massive brutalist slab of pitted concrete.|stone
Reinforced Polymer|A slab of reinforced polymer, dull and unscratched.|plain
Oxidized Metal Hatch|An oxidized metal hatch, its wheel-lock seized.|metal
Pristine Ceramic|A pristine ceramic panel, cool and faintly glossy.|stone
Brutalist Slab|A massive brutalist slab of pitted concrete.|stone
Industrial Barrier|An industrial barrier of stamped steel and yellow chevrons.|metal
Riveted Iron Hatch|A hatch of riveted iron, its seams weeping orange.|metal
Frosted Crystal Pane|A pane of frosted crystal, faintly luminous.|glass
Lacquered Timber Gate|A timber gate under many coats of black lacquer.|timber
Bone-Lattice Aperture|An aperture of interlocking bone-white struts.|bone
`,zt=`Vibrating|The surface is vibrating with a low-frequency thrum.|plain
Cold|The frame is ice-cold to the touch, pulling heat from your palm.|cold
Rusted|The metal hinges are fused by deep, flakey oxidation.|plain
Stable|The structure appears stable.|plain
Pitted|The surface is heavily scarred by micro-impacts and substrate decay.|plain
Polished|The surface is perfectly smooth and sterile.|plain
Static|The door is totally motionless, appearing almost like a static image.|static
Scorched|The surface is blackened in a fan shape, as if something burned its way out.|plain
Weeping|Moisture beads along the seams and runs in slow lines.|plain
Humming|A steady hum is felt through the frame rather than heard.|plain
Frozen|A rime of frost has sealed the edges shut.|frost
Warped|The panel has bowed outward and no longer meets its frame.|plain
`,Bt=`colours
conditions
planet-frames
traits
`,Vt=`baroque|yellow
gilded|white
monolith|cyan
neon|bright-cyan
organic|green
rust|red
shogun|magenta
void|grey
zenith|blue
`,Ht=`crt monitor
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
`,Ut=`clay pot
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
`,Wt=`chrome tailfin
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
`,Gt=`translucent blue shell
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
`,Kt=`dissolving edge
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
`,qt=`hologram projector
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
`,Jt=`analog
ancient
atomic
digital
entropic
future
industrial
singularity
`,Yt=`pressure gauge
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
`,Xt=`shifting geometry
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
`,Zt=`Ceremonial
Military
Industrial
Agricultural
Research
Commercial
`,Qt=class{#e;constructor(){this.#e=Object.assign({"./names/buildings/adj/abyssal.txt":e,"./names/buildings/adj/baroque.txt":t,"./names/buildings/adj/gilded.txt":n,"./names/buildings/adj/monolith.txt":r,"./names/buildings/adj/neon.txt":i,"./names/buildings/adj/organic.txt":a,"./names/buildings/adj/rust.txt":o,"./names/buildings/adj/shogun.txt":s,"./names/buildings/adj/void.txt":c,"./names/buildings/adj/zenith.txt":l,"./names/buildings/compounds.txt":u,"./names/buildings/concepts.txt":d,"./names/buildings/index.txt":f,"./names/buildings/landmarks.txt":p,"./names/buildings/noun/abyssal.txt":m,"./names/buildings/noun/baroque.txt":h,"./names/buildings/noun/gilded.txt":g,"./names/buildings/noun/monolith.txt":_,"./names/buildings/noun/neon.txt":ee,"./names/buildings/noun/organic.txt":te,"./names/buildings/noun/rust.txt":ne,"./names/buildings/noun/shogun.txt":re,"./names/buildings/noun/void.txt":ie,"./names/buildings/noun/zenith.txt":ae,"./names/buildings/sizes/index.txt":oe,"./names/buildings/sizes/large.txt":se,"./names/buildings/sizes/medium.txt":ce,"./names/buildings/sizes/small.txt":le,"./names/city/head.txt":ue,"./names/city/index.txt":de,"./names/city/tail.txt":fe,"./names/country/core.txt":pe,"./names/country/index.txt":me,"./names/country/prefix.txt":he,"./names/country/suffix.txt":ge,"./names/filament/greek.txt":_e,"./names/filament/index.txt":ve,"./names/filament/type.txt":ye,"./names/floors/index.txt":be,"./names/floors/lobby.txt":xe,"./names/floors/peak.txt":Se,"./names/floors/zones/basement.txt":Ce,"./names/floors/zones/executive.txt":we,"./names/floors/zones/index.txt":Te,"./names/floors/zones/living.txt":Ee,"./names/planet/head.txt":De,"./names/planet/index.txt":Oe,"./names/planet/tail.txt":ke,"./names/rooms/Agricultural.txt":Ae,"./names/rooms/Ceremonial.txt":je,"./names/rooms/Commercial.txt":Me,"./names/rooms/Industrial.txt":Ne,"./names/rooms/Military.txt":Pe,"./names/rooms/Research.txt":Fe,"./names/sector/descriptor.txt":Ie,"./names/sector/index.txt":Le,"./names/sector/noun.txt":Re,"./names/solar-system/index.txt":ze,"./names/solar-system/prefix.txt":Be,"./names/solar-system/suffix.txt":Ve,"./names/street/adjective.txt":He,"./names/street/index.txt":Ue,"./names/street/noun.txt":We,"./themes/atmosphere/lighting/abyssal.txt":Ge,"./themes/atmosphere/lighting/analog.txt":Ke,"./themes/atmosphere/lighting/ancient.txt":qe,"./themes/atmosphere/lighting/atomic.txt":Je,"./themes/atmosphere/lighting/digital.txt":Ye,"./themes/atmosphere/lighting/entropic.txt":Xe,"./themes/atmosphere/lighting/future.txt":Ze,"./themes/atmosphere/lighting/index.txt":Qe,"./themes/atmosphere/lighting/industrial.txt":$e,"./themes/atmosphere/lighting/singularity.txt":et,"./themes/atmosphere/structures/Agricultural.txt":tt,"./themes/atmosphere/structures/Ceremonial.txt":nt,"./themes/atmosphere/structures/Commercial.txt":rt,"./themes/atmosphere/structures/Industrial.txt":it,"./themes/atmosphere/structures/Military.txt":at,"./themes/atmosphere/structures/Research.txt":ot,"./themes/atmosphere/structures/Singularity.txt":st,"./themes/atmosphere/structures/abyssal.txt":ct,"./themes/atmosphere/structures/index.txt":lt,"./themes/atmosphere/walls/abyssal.txt":ut,"./themes/atmosphere/walls/baroque.txt":dt,"./themes/atmosphere/walls/gilded.txt":ft,"./themes/atmosphere/walls/monolith.txt":pt,"./themes/atmosphere/walls/neon.txt":mt,"./themes/atmosphere/walls/organic.txt":ht,"./themes/atmosphere/walls/rust.txt":gt,"./themes/atmosphere/walls/shogun.txt":_t,"./themes/atmosphere/walls/void.txt":vt,"./themes/atmosphere/walls/zenith.txt":yt,"./themes/colours.txt":bt,"./themes/conditions.txt":xt,"./themes/cultures/abyssal.txt":St,"./themes/cultures/baroque.txt":Ct,"./themes/cultures/gilded.txt":wt,"./themes/cultures/index.txt":Tt,"./themes/cultures/monolith.txt":Et,"./themes/cultures/neon.txt":Dt,"./themes/cultures/organic.txt":Ot,"./themes/cultures/rust.txt":kt,"./themes/cultures/shogun.txt":At,"./themes/cultures/void.txt":jt,"./themes/cultures/zenith.txt":Mt,"./themes/descriptions/corridor.txt":Nt,"./themes/descriptions/floor.txt":Pt,"./themes/descriptions/index.txt":Ft,"./themes/doors/index.txt":It,"./themes/doors/inscriptions.txt":Lt,"./themes/doors/materials.txt":Rt,"./themes/doors/states.txt":zt,"./themes/index.txt":Bt,"./themes/planet-frames.txt":Vt,"./themes/timelines/analog.txt":Ht,"./themes/timelines/ancient.txt":Ut,"./themes/timelines/atomic.txt":Wt,"./themes/timelines/digital.txt":Gt,"./themes/timelines/entropic.txt":Kt,"./themes/timelines/future.txt":qt,"./themes/timelines/index.txt":Jt,"./themes/timelines/industrial.txt":Yt,"./themes/timelines/singularity.txt":Xt,"./themes/traits.txt":Zt})}read(e){return this.#e[`./${e}`]}paths(){return Object.keys(this.#e).map(e=>e.replace(/^\.\//,``))}},$t=class{#e;#t=new Map;constructor(e){this.#e=e}index(e){return this.list(`${e}/index`)}has(e){return this.#t.has(e)||this.#e.read(`${e}.txt`)!==void 0}list(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#n(`${e}.txt`);return this.#t.set(e,n),n}pairs(e){return this.list(e).map(t=>{let n=t.indexOf(`|`);if(n<0)throw Error(`content file ${e}.txt: '${t}' is not a key|value line`);return[t.slice(0,n).trim(),t.slice(n+1).trim()]})}triples(e){return this.list(e).map(t=>{let[n,r,i,...a]=t.split(`|`);if(n===void 0||r===void 0||i===void 0||a.length>0)throw Error(`content file ${e}.txt: '${t}' is not a name|sentence|key line`);return[n.trim(),r.trim(),i.trim()]})}#n(e){let t=this.#e.read(e);if(t===void 0)throw Error(`content file is missing: ${e}`);let n=t.split(/\r?\n/).map(e=>e.trim()).filter(e=>e!==``);if(n.length===0)throw Error(`content file has no entries: ${e}`);return Object.freeze(n)}},en=11,tn={times:11,over:10},nn=class e{#e;constructor(e){if(!Number.isInteger(e)||e<0)throw RangeError(`a frequency is a whole number of hertz from zero up, got ${String(e)}`);this.#e=e}hertz(){return this.#e}plus(t){return new e(this.#e+t.#e)}amplified(){return new e(Math.floor(this.#e*tn.times/tn.over))}resonant(){return this.#e>0&&this.#e%en===0}equals(e){return this.#e===e.#e}},rn=`keystone`,an=new nn(0),on=class{#e;#t;constructor(e){this.#e=e.name,this.#t=e.building}key(){return`${rn}(${this.#t.toString()})`}name(){return this.#e}frequency(){return an}resonant(){return!1}building(){return this.#t}data(){return{kind:rn,building:this.#t.toString()}}},sn=/^0(\.(0|[1-9]\d*))*$/,v=class e{#e;constructor(e){for(let t of e)if(!Number.isSafeInteger(t)||t<0)throw RangeError(`a child index is a whole number from zero up, got ${String(t)}`);this.#e=Object.freeze([...e])}static parse(t){if(!sn.test(t))return;let n=t.split(`.`).slice(1).map(Number);return n.every(e=>Number.isSafeInteger(e))?new e(n):void 0}child(t){return new e([...this.#e,t])}parent(){return this.#e.length===0?void 0:new e(this.#e.slice(0,-1))}indices(){return this.#e}depth(){return this.#e.length}equals(e){return this.toString()===e.toString()}toString(){return[`0`,...this.#e.map(String)].join(`.`)}},cn=`☠`,ln=`map`,y=class{#e;#t;constructor(e){this.#e=e}callSign(){return this.name()}ordinal(){return this.index()+1}goesByNumber(){return!1}facts(){return[]}drawing(){return this.kind().key()}figure(){return null}portrait(){return this.figure()}readings(){return[]}listing(){return this.children()}admits(e){return this.listing().includes(e)}arrival(){return this}arrive(){let e=this.arrival();return e===this?this:e.arrive()}current(){return!1}exit(){return this.parent()?.arrival()}leave(){return this.exit()}leaveLabel(){return`Leave ${this.kind().title()}`}moves(){return[]}move(e){if(this.moves().some(t=>t.id===e))throw Error(`${this.kind().key()} offers the move '${e}' but does not make it`)}remember(){}recall(e){return e===this.remember()}startOfJourney(){return this.children()[0]?.startOfJourney()??this}sealed(){return!1}landmark(){return!1}contents(){return null}scan(e){}scanned(e){return[]}sensed(){return``}findRelic(e){return this.contents()?.objects.find(t=>t.key()===e)}capture(e){if(this.contents()?.objects[e]!==void 0)throw Error(`${this.kind().key()} holds things but does not hand them over`)}drop(e){if(this.contents()!==null)throw Error(`${this.kind().key()} holds things but takes none in (${e.name()})`);return!1}lottery(e){}echo(){}sample(){this.parent()?.sample()}infuse(){this.parent()?.infuse()}forge(e){return this.parent()?.forge(e)}keystone(){return this.parent()?.keystone()}prime(){return this.parent()?.prime()??!1}breachOffered(e){return!1}breach(e){}abyssal(){return this.parent()?.abyssal()??!1}peers(){return this.parent()?.children()??[]}root(){return this.parent()?.root()??this}indoors(){return this.parent()?.indoors()??!1}mapped(){return!0}mapNodes(){return this.listing()}mapGlyph(){return this.abyssal()?cn:this.kind().icon()}mapSpot(e,t){let n=this.seed().branch(ln);return{x:n.branch(`x`).range(0,e-1),y:n.branch(`y`).range(0,t-1)}}meta(){return``}drainFactor(){return this.parent()?.drainFactor()??1}vibe(){return this.parent()?.vibe()}drainEra(){return this.vibe()?.era()}landmarkFactor(){return this.parent()?.landmarkFactor()??1}seed(){return this.#e.seed}parent(){return this.#e.parent}index(){return this.#e.index}address(){return this.parent()?.address().child(this.index())??new v([])}depth(){return this.address().depth()}trail(){return[...this.parent()?.trail()??[],this]}children(){return this.#t??=Object.freeze([...this.#e.children.childrenOf(this)]),this.#t}populated(){return this.#t!==void 0}descendant(e){if(!this.sealed())return e.indices().slice(this.depth()).reduce((e,t)=>{let n=e?.children()[t];return n?.sealed()===!0?void 0:n},this)}locate(e){return e.indices().slice(this.depth()).reduce((e,t)=>e?.children()[t],this)}},b=class{#e;#t;#n;#r;constructor(e){this.#e=e.key,this.#t=e.title,this.#n=e.icon,this.#r=e.indexLabel}key(){return this.#e}title(){return this.#t}icon(){return this.#n}indexLabel(){return this.#r}equals(e){return this.#e===e.#e}},un=new b({key:`building`,title:`Building`,icon:`⌂`,indexLabel:`Building`}),dn=0,fn=2,pn=7,mn=10,hn=[`elevator`,`sampled`,`merges`,`breached`],gn=class extends y{#e;#t;#n;#r;#i=dn;#a=new Set;#o=0;#s=!1;constructor(e,t){super(e),this.#e=t.name,this.#t=t.landmark,this.#n=t.floors,this.#r=t.doorsPerFloor}kind(){return un}name(){return this.#e}landmark(){return this.#t}figure(){return{floors:this.#n,doors:this.#r}}portrait(){let e=this.children(),t=this.#s?e.slice(this.#n).reverse():[];return{...this.figure(),tower:{address:this.address().toString(),landmark:this.#t,car:this.#i,rows:[...t,...e.slice(0,this.#n)].map(e=>e.figure()??{floors:0,doors:0})}}}floors(){return this.#n}layers(){return mn}doorsPerFloor(){return this.#r}elevatorAt(){return this.#i}elevatorTo(e){this.#i=e}floorNumbered(e){return e>=0?e<this.#n?this.children()[e]:void 0:this.#s?this.children()[this.#n-e-1]:void 0}sampled(){return[...this.#a]}sampleFloor(e){e>=0&&e<this.#n&&this.#a.add(e)}merges(){return this.#o}infuse(){this.#o+=1}primed(){return this.#a.size>=this.#n&&this.#o>=pn}breached(){return this.#s}keystone(){return new on({name:`${this.#e} Keystone`,building:this.address()})}forge(e){return this.primed()&&this.#c(e)===void 0?this.keystone():void 0}prime(){for(let e=0;e<this.#n;e++)this.#a.add(e);return this.#o=pn,!0}breachOfferedAt(e,t){return e===this.#n-1&&this.primed()&&!this.#s&&this.#c(t)!==void 0}breachFrom(e,t){if(this.breachOfferedAt(e,t))return this.#s=!0,this.#c(t)}remember(){let e={};return this.#i!==dn&&(e.elevator=this.#i),this.#a.size>0&&(e.sampled=[...this.#a]),this.#o>0&&(e.merges=this.#o),this.#s&&(e.breached=!0),Object.keys(e).length===0?void 0:JSON.stringify(e)}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=t,r=Object.keys(n);if(r.length===0||r.some(e=>!hn.includes(e)))return!1;let{elevator:i,sampled:a,merges:o,breached:s}=n;if(s!==void 0&&s!==!0)return!1;let c=s===!0;if(i!==void 0&&!this.#l(i,c)||a!==void 0&&!this.#u(a)||o!==void 0&&(!Number.isInteger(o)||o<1))return!1;this.#i=i??dn,this.#a.clear();for(let e of a??[])this.#a.add(e);return this.#o=o??0,this.#s=c,!0}listing(){let e=this.children();return[...e.slice(0,this.#n).reverse(),...this.#s?e.slice(this.#n):[]]}admits(e){return this.floorNumbered(this.#i)===e}description(){return[`An elevator runs the height of the building.`]}scanAround(e,t){let n=this.listing().filter(t=>Math.abs(t.ordinal()-e)<=fn).sort((e,t)=>t.ordinal()-e.ordinal());return{title:`NEURAL_PROXIMITY_REPORT`,notes:[`BUILDING: ${this.#e}`,`TOTAL_STRATA: ${String(this.#n)} units detected.`],rows:n.map(n=>({cells:[{key:`reading`,label:`ID`,value:String(n.ordinal()).padStart(2,`0`)},...n.scanned(t)],place:void 0,current:n.ordinal()===e,note:``}))}}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[{key:`culture`,label:`Culture`,value:e.key()}],{key:`reading`,label:`Floors`,value:String(this.#n)},...this.#t?[{key:`alert`,label:`Landmark`,value:``}]:[]]}status(){return this.#s?`The bedrock is breached`:this.#o>0?`${String(this.#o)} ${this.#o===1?`merge`:`merges`} made inside`:``}indoors(){return!0}meta(){return this.#s?` [BREACHED]`:` [FLOORS: ${String(this.#n)}]`}childrenHeading(){return`Ride to a floor`}approachVerb(){return`Ride to`}#c(e){let t=this.keystone().key();return e.find(e=>e.key()===t)}#l(e,t){return typeof e!=`number`||!Number.isInteger(e)||e===dn?!1:e>0?e<this.#n:t&&this.#n-e-1<this.children().length}#u(e){if(!Array.isArray(e)||e.length===0)return!1;let t=e;return t.every(e=>typeof e==`number`&&Number.isInteger(e)&&e>=0&&e<this.#n)?new Set(t).size===t.length:!1}},_n=new b({key:`corridor`,title:`Corridor`,icon:`▅`,indexLabel:`CONDUIT`}),vn=class extends y{#e;#t;#n;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.sentence,this.#n=t.shape??`none`}kind(){return _n}name(){return`Corridor`}floor(){return this.#e}arrival(){return this.#e}figure(){return{floors:0,doors:this.#e.building().doorsPerFloor(),shape:this.#n}}scan(e){return{title:`[DATA_SUMMARY]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:void 0,current:!1,note:t.sensed()}))}}description(){return[`${this.#t}.`]}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[{key:`culture`,label:`Culture`,value:e.key()}],{key:`reading`,label:`Doors`,value:String(this.#e.building().doorsPerFloor())}]}status(){return``}childrenHeading(){return`Doors`}approachVerb(){return`Open`}},yn=new b({key:`street`,title:`Street`,icon:`═`,indexLabel:`WAY`}),bn=class extends y{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return yn}name(){return this.#e}description(){return[`Buildings stand in pairs along both sides of the way.`]}facts(){let e=this.vibe();return e===void 0?[]:[{key:`era`,label:`Era`,value:e.era().key()},{key:`culture`,label:`Culture`,value:e.culture().key()}]}status(){return``}childrenHeading(){return`Buildings on this street`}approachVerb(){return`Enter Building:`}startOfJourney(){return this}},xn=new b({key:`apartment`,title:`Apartment`,icon:`🚪`,indexLabel:`UNIT`}),Sn=`dealt`,Cn=class extends y{#e;#t;#n;#r;#i;#a;#o;constructor(e,t){super(e),this.#e=t.door,this.#t=t.behind,this.#n=t.culture,this.#r=t.era,this.#i=t.anomaly,this.#a=t.rooms,this.#o=Object.freeze([...t.relics])}kind(){return xn}name(){return this.#e.description()}door(){return this.#e}figure(){return{floors:0,doors:0,door:{look:this.#e.look(),words:this.#e.inscription()?.word()??``}}}behind(){return this.#t}culture(){return this.#n}era(){return this.#r}anomaly(){return this.#i}roomCount(){return this.#a}relics(){return this.#o}relicsIn(e){return this.#o.filter((t,n)=>this.seed().branch(Sn).branch(n).range(0,this.#a-1)===e)}arrival(){return this.children()[0]??this}readings(){return[{key:`narrative`,label:`APPEARANCE`,value:this.#e.narrative()}]}scanned(){return[{key:`signal`,label:`TRACE`,value:this.#e.trace().name()},{key:`alert`,label:`INSCRIPTION`,value:this.#e.inscription()?.formatted()??``},{key:`reading`,label:`MATERIAL`,value:this.#e.material()},{key:`reading`,label:`STATE`,value:this.#e.state()},{key:`zone`,label:`ROOM_TYPE`,value:this.#t.name()}]}sensed(){return this.#e.sensed()}scan(e){return{title:`[STRATA_OVERVIEW]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:t,current:!1,note:``}))}}description(){return[]}facts(){return this.#i?[{key:`alert`,label:`TEMPORAL_ANOMALY_DETECTED`,value:`[!]`}]:[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#r.key()}]}status(){return this.#i?`ATMOS: [UNSTABLE]`:`ATMOS: [NOMINAL]`}childrenHeading(){return`Internal cells detected`}approachVerb(){return`Enter Room:`}},wn=new b({key:`crypt`,title:`Crypt`,icon:`🚪`,indexLabel:`UNIT`}),Tn=class extends Cn{kind(){return wn}facts(){return[{key:`alert`,label:`ABYSSAL_RESONANCE`,value:`DETECTED`}]}status(){return`ATMOS: [PRESSURE_HIGH]`}},En=`hidden`,Dn=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.steps,this.#n=e.frequency}key(){return`${En}(${this.#e.toString()}@${String(this.#t)})`}name(){return`Hidden Frequency`}frequency(){return this.#n}resonant(){return!1}data(){return{kind:En,from:this.#e.toString(),steps:this.#t}}},On=`hybrid`,kn=`-`,An=` Hybrid`,jn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return`${On}(${this.#e.key()}+${this.#t.key()})`}name(){let e=e=>e.name().split(` `)[0]??``;return`${e(this.#e)}${kn}${e(this.#t)}${An}`}frequency(){return this.#e.frequency().plus(this.#t.frequency())}resonant(){return this.frequency().resonant()}data(){return{kind:On,parts:[this.#e.data(),this.#t.data()]}}},Mn=`relic`,Nn=class{#e;constructor(e){this.#e=e}facts(){return this.#e}key(){return this.#e.relic.key()}name(){return this.#e.relic.name()}frequency(){return this.#e.frequency}resonant(){return this.#e.resonant}from(){return this.#e.from}data(){return{kind:Mn,from:this.#e.from.toString(),key:this.#e.relic.key()}}},Pn=`echo`,Fn=class{#e;#t;constructor(e){this.#e=e.from,this.#t=e.frequency}key(){return`${Pn}(${this.#e.toString()})`}name(){return`Spectral Echo`}frequency(){return this.#t}resonant(){return!1}data(){return{kind:Pn,from:this.#e.toString()}}};function In(e,t){if(typeof t!=`string`)return;let n=v.parse(t);return n===void 0?void 0:e.locate(n)}function Ln(e){if(Array.isArray(e))return`[${e.map(Ln).join(`,`)}]`;if(typeof e==`object`&&e){let t=e;return`{${Object.keys(t).sort().map(e=>`${JSON.stringify(e)}:${Ln(t[e])}`).join(`,`)}}`}return JSON.stringify(e)}var Rn={[Mn]:({from:e,key:t},n)=>typeof t==`string`?In(n,e)?.findRelic(t):void 0,[On]:({parts:e},t,n)=>{if(!Array.isArray(e)||e.length!==2)return;let[r,i]=e,a=n.read(r,t),o=n.read(i,t);return a===void 0||o===void 0?void 0:new jn(a,o)},[rn]:({building:e},t)=>In(t,e)?.keystone(),[En]:({from:e,steps:t},n)=>typeof t==`number`?In(n,e)?.lottery(t):void 0,[Pn]:({from:e},t)=>In(t,e)?.echo()?.fragment()},zn=class{read(e,t){if(typeof e!=`object`||!e||Array.isArray(e))return;let n=e,r=(typeof n.kind==`string`?Rn[n.kind]:void 0)?.(n,t,this);if(r!==void 0)return Ln(r.data())===Ln(n)?r:void 0}readAll(e,t){if(!Array.isArray(e))return;let n=[];for(let r of e){let e=this.read(r,t);if(e===void 0)return;n.push(e)}return n}},Bn=new Set([`a`,`e`,`i`,`o`,`u`]),Vn=97,Hn=new Set([11,22,33]),Un=class{#e;constructor(e){let t=0;for(let n of e.toLowerCase())n<`a`||n>`z`||Bn.has(n)||(t+=n.charCodeAt(0)-Vn+1);this.#e=t}sum(){return this.#e}master(){return Hn.has(this.#e)}frequencyAt(e){return new nn((this.master()?this.#e*2:this.#e)*e)}},Wn=Array.from(`█▓▒░/\\%!$#*`),Gn=class{mangle(e,t,n){return Array.from(e,(e,r)=>e===` `||e===`
`||!n.branch(r).probability(t)?e:n.branch(r).pick(Wn)).join(``)}},Kn=class{#e;constructor(e){this.#e=new Map(e.map(e=>[e.move.id,e]))}offered(e){return[...this.#e.values()].filter(t=>t.to(e)!==void 0).map(e=>e.move)}make(e,t){let n=this.#e.get(t),r=n?.to(e);return n!==void 0&&r!==void 0&&n.act?.(e),r}},qn=new b({key:`room`,title:`Room`,icon:`□`,indexLabel:`CELL`}),Jn=new Gn,Yn={structure:.2,walls:.1,lighting:.3},Xn=`static`,Zn=new zn,Qn=`action`,$n=.3,er={min:1e6,max:9999999},tr={resonant:`≈≈≈`,plain:`~~~`,degraded:`###`},nr=new Kn([{move:{id:`back`,label:`Go back`,opposite:`forward`},to:e=>e.neighbour(-1)},{move:{id:`forward`,label:`Go forward`,opposite:`back`},to:e=>e.neighbour(1)}]),rr=class extends y{#e;#t;#n;#r;#i;#a;#o=[];#s=[];constructor(e,t){super(e),this.#e=e.parent,this.#t=t.name,this.#n=t.category,this.#r=t.atmosphere,this.#i=t.traits,this.#a=Object.freeze([...t.furniture])}kind(){return qn}name(){return this.#t}type(){return this.#n.name()}category(){return this.#n}oxygen(){return this.#i.oxygen}temperature(){return this.#i.temperature}signal(){return this.#i.signal}atmosphere(){return this.#r}furniture(){return this.#a}objects(){return[...this.#c().map(e=>this.#l(e)),...this.#s]}contents(){return{objects:this.objects(),furniture:this.furniture()}}findRelic(e){let t=this.#e.relicsIn(this.index()).find(t=>t.key()===e);return t===void 0?void 0:this.#l(t)}capture(e){let t=this.#c();if(!Number.isInteger(e)||e<0)return;if(e<t.length){let n=t[e];return n===void 0?void 0:(this.#o.push(n.key()),{fragment:this.#l(n),fresh:!0})}let[n]=this.#s.splice(e-t.length,1);return n===void 0?void 0:{fragment:n,fresh:!1}}drop(e){return this.#s.push(e),!0}remember(){if(this.#o.length!==0||this.#s.length!==0)return JSON.stringify({taken:this.#o,dropped:this.#s.map(e=>e.data())})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{taken:n,dropped:r,...i}=t;if(Object.keys(i).length>0||!Array.isArray(n))return!1;let a=n,o=new Set(this.#e.relicsIn(this.index()).map(e=>e.key()));if(!a.every(e=>typeof e==`string`&&o.has(e))||new Set(a).size!==a.length)return!1;let s=Zn.readAll(r,this.root());return s===void 0||a.length===0&&s.length===0?!1:(this.#o.splice(0,this.#o.length,...a),this.#s.splice(0,this.#s.length,...s),!0)}#c(){return this.#e.relicsIn(this.index()).filter(e=>!this.#o.includes(e.key()))}#l(e){let t=this.vibe()?.culture(),n=t!==void 0&&this.#e.culture().equals(t),r=new Un(e.name()).frequencyAt(this.depth());return new Nn({relic:e,from:this.address(),frequency:n?r.amplified():r,resonant:n})}listing(){return[]}mapped(){return!1}lottery(e){let t=this.seed().branch(Qn).branch(e);if(t.branch(`win`).probability($n))return new Dn({from:this.address(),steps:e,frequency:new nn(t.branch(`hertz`).range(er.min,er.max))})}scan(e){return this.#e.scan(e)}scanned(e){let t=new Un(this.#t).frequencyAt(this.depth()),n=this.#e.anomaly()?{key:`alert`,label:`WAVE`,value:tr.degraded}:t.resonant()?{key:`stable`,label:`WAVE`,value:tr.resonant}:{key:`signal`,label:`WAVE`,value:tr.plain};return[{key:`reading`,label:`FREQ`,value:`${String(t.hertz())}Hz`},n,e(this)?{key:`stable`,label:`STATUS`,value:`[VISITED]`}:{key:`reading`,label:`STATUS`,value:`[UNSTABLE]`},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`IDENTIFIER`,value:this.#t}]}neighbour(e){return this.#e.children()[this.index()+e]}moves(){return nr.offered(this)}move(e){return nr.make(this,e)}exit(){return this.index()===0?this.#e.exit():void 0}leaveLabel(){return`Exit Apartment`}description(){let{structure:e,colour:t,walls:n,lighting:r}=this.#r,i=(e,t)=>this.#e.anomaly()?Jn.mangle(t,Yn[e],this.seed().branch(Xn).branch(e)):t;return[`You are in ${i(`structure`,e)}. The walls are ${t} ${i(`walls`,n)}.`,`The space is illuminated by ${i(`lighting`,r)}.`]}facts(){return[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#e.era().key()},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`OXY`,value:`${String(this.#i.oxygen)}%`},{key:`reading`,label:`TEMP`,value:`${String(this.#i.temperature)}°C`},{key:`signal`,label:`SIGNAL`,value:this.#i.signal},this.#e.anomaly()?{key:`alert`,label:`RESONANCE`,value:`[DEGRADED]`}:{key:`stable`,label:`RESONANCE`,value:`[STABLE]`}]}status(){return`ATMOS: ${String(this.#i.oxygen)}% | TEMP: ${String(this.#i.temperature)}°C`}childrenHeading(){return``}approachVerb(){return``}},ir=new b({key:`shard`,title:`Shard`,icon:`☠`,indexLabel:`SHARD`}),ar=class extends rr{kind(){return ir}leaveLabel(){return`Exit Crypt`}},or=new b({key:`universe`,title:`Universe`,icon:`∞`,indexLabel:`ROOT`}),sr=class extends y{kind(){return or}name(){return`The Endless Universe`}description(){return[`A neural web of infinite complexity.`]}status(){return`UNIMATRIX_STABLE`}childrenHeading(){return`Primary filaments radiating from root`}approachVerb(){return`Synchronize with`}},cr=class{nth(e,t,n){let r=this.take(e,t,n+1).at(-1);if(r===void 0)throw RangeError(`a deal always deals`);return r}take(e,t,n){if(t.length===0)throw RangeError(`a deal needs at least one item`);let r=[];for(let i=0;r.length<n;i++){let a=[...t];for(let o=0;o<t.length&&r.length<n;o++){let t=e.branch(i).branch(o).range(0,a.length-1),n=a[t];if(n===void 0)throw RangeError(`a deal always deals`);r.push(n),a=a.filter((e,n)=>n!==t)}}return r}},lr=`Stable`,ur=class{#e;#t;#n;#r;constructor(e){this.#e=e.look,this.#t=e.inscription,this.#n=e.trace,this.#r=e.told}material(){return this.#e.material()}state(){return this.#e.state()}look(){return this.#e}inscription(){return this.#t}trace(){return this.#n}brief(){return this.state()===lr?this.material():`${this.material()} [${this.state().toUpperCase()}]`}narrative(){let e=`${this.#r.material} ${this.#r.state}`;return this.#t===void 0?e:`${e} ${this.#t.narrative()}`}sensed(){let e=`${this.#r.material} ${this.#r.state} ${this.#n.sentence()}`;return this.#t===void 0?e:`${e} ${this.#t.narrative()}`}description(){return this.#t===void 0?this.brief():`${this.#t.formatted()} ${this.brief()}`}},dr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}word(){return this.#e}style(){return this.#t}formatted(){return this.#t.format(this.#e)}narrative(){return this.#t.narrative(this.#e)}},fr=class{#e;#t;#n;#r;constructor(e){this.#e=e.material,this.#t=e.state,this.#n=e.family,this.#r=e.stateLook}material(){return this.#e}state(){return this.#t}family(){return this.#n}stateLook(){return this.#r}equals(e){return this.#e===e.#e&&this.#t===e.#t&&this.#n===e.#n&&this.#r===e.#r}},pr=[`frost`,`cold`,`static`,`plain`];function mr(e){let t=pr.find(t=>t===e);if(t===void 0)throw Error(`themes/doors/states.txt: '${e}' is not a door state look (${pr.join(`, `)})`);return t}var hr=[`glass`,`metal`,`stone`,`timber`,`bone`,`plain`];function gr(e){let t=hr.find(t=>t===e);if(t===void 0)throw Error(`themes/doors/materials.txt: '${e}' is not a material family (${hr.join(`, `)})`);return t}var _r=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.key,this.#t=e.before,this.#n=e.after,this.#r=e.lowered??!1,this.#i=e.applied}key(){return this.#e}format(e){return`${this.#t}${this.#r?e.toLowerCase():e}${this.#n}`}narrative(e){return`The word '${this.#r?e.toLowerCase():e}' is ${this.#i}.`}equals(e){return this.#e===e.#e}},vr=[new _r({key:`stamped`,before:`[`,after:`]`,applied:`stamped into the metal in block letters`}),new _r({key:`scrawled`,before:`_`,after:`_`,lowered:!0,applied:`scrawled across the surface in jagged, desperate lines`}),new _r({key:`etched`,before:`⟨`,after:`⟩`,applied:`finely etched into the frame, appearing almost as a structural glyph`}),new _r({key:`burned`,before:`!! `,after:` !!`,applied:`burned into the material with a high-intensity plasma torch`})],yr=`themes/doors`,br=`door`,xr=.2,Sr=class{#e;#t;#n;constructor(e){this.#e=e,this.#t=e.triples(`${yr}/materials`).map(([e,t,n])=>({name:e,told:t,key:gr(n)})),this.#n=e.triples(`${yr}/states`).map(([e,t,n])=>({name:e,told:t,key:mr(n)}))}of(e,t){let n=e.branch(br);return new ur({look:this.look(e),inscription:n.branch(`inscribed`).probability(xr)?this.#a(n,t):void 0,trace:t.trace(),told:{material:this.#r(n).told,state:this.#i(n).told}})}look(e){let t=e.branch(br),n=this.#r(t),r=this.#i(t);return new fr({material:n.name,state:r.name,family:n.key,stateLook:r.key})}#r(e){return e.branch(`material`).pick(this.#t)}#i(e){return e.branch(`state`).pick(this.#n)}#a(e,t){return t.guarantee()??new dr(e.branch(`word`).pick(this.#e.list(`${yr}/inscriptions`)),e.branch(`style`).pick(vr))}},Cr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}name(){return this.#t}equals(e){return this.#e===e.#e}},wr=`themes/cultures`,Tr=`themes/timelines`,Er=[{key:`with`,join:(e,t)=>`${t} with ${e}`},{key:`infused`,join:(e,t)=>`${e} infused with ${t}`},{key:`fused`,join:(e,t)=>`${e} fused to ${t}`},{key:`grafted`,join:(e,t)=>`${t} grafted onto ${e}`}],Dr=class{#e;#t=new Map;constructor(e){this.#e=e}of(e,t){let n=`${e.key()}|${t.key()}`,r=this.#t.get(n);return r===void 0&&(r=Object.freeze(this.#n(e,t)),this.#t.set(n,r)),r}#n(e,t){let n=this.#e.list(`${wr}/${e.key()}`),r=this.#e.list(`${Tr}/${t.key()}`);return[...n.flatMap(e=>r.flatMap(t=>Er.map(n=>new Cr(`${n.key}|${e}|${t}`,n.join(e,t))))),...n.map(e=>new Cr(`culture|${e}`,e)),...r.map(e=>new Cr(`era|${e}`,e))]}},Or=`children`,x=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t===void 0?void 0:{...t,unit:t.unit??1},this.#n=n}of(e){return this.exactly(e,this.count(e.seed()))}count(e){if(this.#t===void 0)throw Error(`this progeny has no count range: use exactly()`);return e.branch(Or).range(this.#t.min,this.#t.max)*this.#t.unit}exactly(e,t,n=0){return Array.from({length:t},(t,r)=>{let i=n+r,a=e.seed().child(i);return this.#n(a).create({parent:e,seed:a,index:i,children:this.#e})})}},kr=.01,Ar={min:1,max:10},jr={min:5,max:19},Mr=`relics`,Nr={kind:xn,rooms:qn,make:(e,t)=>new Cn(e,t)},Pr=class{#e;#t;#n;#r;#i;#a=new cr;constructor(e,t,n,r=Nr){this.#e=r,this.#t=new Sr(t),this.#n=n,this.#r=new x(e,Ar,()=>e.factoryFor(r.rooms)),this.#i=new Dr(t)}kind(){return this.#e.kind}create(e){let t=e.parent.vibe(),n=t?.mutation();if(t===void 0||n===void 0)throw Error(`an apartment takes its culture, era and trait from the country above: it needs one`);let r=e.seed.branch(`anomaly`).probability(kr),i=r?t.culture():t.pickCulture(e.seed.branch(`culture`)),a=r?t.era():t.pickEra(e.seed.branch(`era`)),o=e.seed.branch(Mr),s=this.#n.categoryOf(e.seed.child(0),n);return this.#e.make(e,{door:this.#t.of(e.seed,s),behind:s,culture:i,era:a,anomaly:r,rooms:this.#r.count(e.seed),relics:this.#a.take(o,this.#i.of(i,a),o.range(jr.min,jr.max))})}populate(e){return this.#r.exactly(e,e.roomCount())}},Fr=new b({key:`artery`,title:`Artery`,icon:`▅`,indexLabel:`CONDUIT`}),Ir=class extends vn{#e;constructor(e,t){super(e,{sentence:t.sentence}),this.#e=t.vibe}kind(){return Fr}name(){return`Artery`}vibe(){return this.#e}status(){return`TRAFFIC: [PRESSURE_HIGH] | THEME: [${this.#e.culture().key().toUpperCase()}]`}},Lr=.85,Rr=.1,zr=.9,Br=class e{#e;constructor(e){this.#e={...e,stability:e.stability??Lr,mutation:e.mutation,frame:e.frame??e.culture.frame()}}culture(){return this.#e.culture}era(){return this.#e.era}secondCulture(){return this.#e.secondCulture}secondEra(){return this.#e.secondEra}stability(){return this.#e.stability}mutation(){return this.#e.mutation}frame(){return this.#e.frame}pickCulture(e){return e.probability(this.#e.stability)?this.#e.culture:this.#e.secondCulture}pickEra(e){return e.probability(this.#e.stability)?this.#e.era:this.#e.secondEra}mutate(t,n){let r=Math.max(Rr,Math.min(zr,this.#e.stability+n));return new e({...this.#e,stability:r,mutation:t})}rebel(){return new e({...this.#e,culture:this.#e.secondCulture,secondCulture:this.#e.culture,era:this.#e.secondEra,secondEra:this.#e.era})}},Vr=`A pulsing, organic artery of data`,Hr=1,Ur=class{#e;#t;constructor(e,t){this.#e=t,this.#t=new x(e,void 0,()=>e.factoryFor(wn))}kind(){return Fr}create(e){let t=e.parent.vibe();if(t===void 0)throw Error(`an artery lies under a country: it needs its trait`);let n=this.#e.bedrock();return new Ir(e,{sentence:Vr,vibe:new Br({era:n.era,culture:n.culture,secondCulture:n.culture,secondEra:n.era,stability:Hr,mutation:t.mutation()})})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Wr=new Kn([{move:{id:`elevator`,label:`Back to Elevator`,opposite:`corridor`},to:e=>e,act:e=>{e.returnToElevator()}}]),Gr=class{id(){return`corridor`}drawing(){return _n.key()}portrait(e){return e.figure()}listing(e){return e.corridor().listing()}admits(e,t){return t===e.corridor()}moves(e){return Wr.offered(e)}move(e,t){return Wr.make(e,t)}facts(e){return e.corridor().facts()}description(e){return e.corridor().description()}status(e){return e.corridor().status()}childrenHeading(e){return e.corridor().childrenHeading()}approachVerb(e){return e.corridor().approachVerb()}scan(e,t){return e.corridor().scan(t)}},Kr=0,qr=new Kn([{move:{id:`up`,label:`Go Up`,opposite:`down`},to:e=>e.neighbour(1)},{move:{id:`down`,label:`Go Down`,opposite:`up`},to:e=>e.number()===Kr?void 0:e.neighbour(-1)},{move:{id:`descend`,label:`Descend into the Substrate`,opposite:`up`},to:e=>e.number()===Kr?e.neighbour(-1):void 0},{move:{id:`corridor`,label:`Enter Corridor`,opposite:`elevator`},to:e=>e,act:e=>{e.enterCorridor()}}]),Jr=2,Yr=class{id(){return`elevator`}drawing(){return un.key()}portrait(e){return e.building().portrait()}listing(){return[]}admits(){return!1}moves(e){return qr.offered(e)}move(e,t){return qr.make(e,t)}facts(e){let t=e.vibe();return t===void 0?[]:[{key:`era`,label:`Era`,value:t.era().key()},{key:`culture`,label:`Culture`,value:t.culture().key()},{key:`reading`,label:`Stability`,value:`${(t.stability()*100).toFixed(Jr)}%`},{key:`trait`,label:`Trait`,value:t.mutation()?.key()??`Standard`}]}description(e){return[`${e.name()}. ${e.sentence()}`]}status(e){return e.diagnostic()}childrenHeading(){return``}approachVerb(){return``}scan(e,t){return e.building().scanAround(e.number(),t)}},Xr=class{#e;#t;constructor(e,t){if(e<0!=(t===`layer`))throw RangeError(`a ${t} cannot stand at level ${String(e)}: floors from 0 up, Layers below`);this.#e=e,this.#t=t}number(){return this.#e}kind(){return this.#t}belowBedrock(){return this.#e<0}label(){return String(this.#e)}equals(e){return this.#e===e.#e&&this.#t===e.#t}},Zr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=[...t]}shape(){return this.#e}looks(){return this.#t}doors(){return this.#t.length}equals(e){return this.#e===e.#e&&this.#t.length===e.#t.length&&this.#t.every((t,n)=>e.#t[n]?.equals(t)===!0)}},Qr=class e{#e;constructor(e){this.#e=e}capitalised(){return this.#e.charAt(0).toUpperCase()+this.#e.slice(1)}plain(){return new e(this.#e.toLowerCase()).capitalised()}equals(e){return this.#e===e.#e}},$r=new b({key:`floor`,title:`Floor`,icon:`▤`,indexLabel:``}),ei=new Yr,ti=new Gr,ni=new Map([ei,ti].map(e=>[e.id(),e])),ri={min:1e3,max:2999},ii=new Zr(`none`,[]),ai=class extends y{#e;#t;#n;#r;#i;#a=ei;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.number,this.#n=t.zone,this.#r=t.sentence,this.#i=t.passage??ii}kind(){return $r}number(){return this.#t}name(){return`Floor ${String(this.#t)}`}callSign(){return this.#t===0?`Lobby`:this.#t===this.#e.floors()-1?`Peak`:this.name()}ordinal(){return this.#t}goesByNumber(){return!0}arrive(){return this.#e.elevatorTo(this.#t),this}figure(){return{floors:0,level:new Xr(this.#t,this.levelKind()),doors:this.#i.doors(),shape:this.#i.shape(),looks:this.#i.looks()}}levelKind(){return`floor`}drawing(){return this.#a.drawing()}portrait(){return this.#a.portrait(this)}current(){return this.#e.elevatorAt()===this.#t}zone(){return this.#n}sentence(){return this.#r}resonance(){return this.seed().branch(`resonance`).range(ri.min,ri.max)}readings(){return[{key:`zone`,label:`Zone`,value:new Qr(this.#n.replaceAll(`_`,` `)).plain()}]}building(){return this.#e}diagnostic(){return``}peers(){return this.#e.children().slice(0,this.#e.floors())}mapNodes(){return this.corridor().listing()}corridor(){let e=this.children()[0];if(e===void 0)throw Error(`${this.name()} has no corridor`);return e}neighbour(e){return this.#e.floorNumbered(this.#t+e)}sample(){this.#e.sampleFloor(this.#t)}breachOffered(e){return this.#e.breachOfferedAt(this.#t,e)}breach(e){return this.#e.breachFrom(this.#t,e)}enterCorridor(){this.#a=ti}returnToElevator(){this.#a=ei}listing(){return this.#a.listing(this)}admits(e){return this.#a.admits(this,e)}moves(){return this.#a.moves(this)}move(e){return this.#a.move(this,e)}leave(){return this.returnToElevator(),this.exit()}remember(){return this.#a===ei?void 0:this.#a.id()}recall(e){let t=ni.get(e);return t!==void 0&&(this.#a=t,!0)}facts(){return this.#a.facts(this)}description(){return this.#a.description(this)}status(){return this.#a.status(this)}childrenHeading(){return this.#a.childrenHeading(this)}approachVerb(){return this.#a.approachVerb(this)}scan(e){return this.#a.scan(this,e)}scanned(){return[{key:`zone`,label:`FUNCTION`,value:this.#n}]}},oi=new b({key:`layer`,title:`Layer`,icon:`▤`,indexLabel:`STRATA`}),si=`ABYSSAL_SUBSTRATE`,ci=10,li=100,ui=2,di=class extends ai{constructor(e,t){super(e,{number:t.number,zone:si,sentence:t.sentence})}kind(){return oi}drawing(){return oi.key()}levelKind(){return`layer`}portrait(){return this.figure()}name(){return`Layer -0x${Math.abs(this.number()).toString(16).toUpperCase()}`}readings(){let e=Math.min(li,Math.abs(this.number())*ci);return[{key:`zone`,label:`FUNCTION`,value:si},{key:`reading`,label:`ST`,value:`P: ${String(e)}%`},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}sealed(){return!this.building().breached()}diagnostic(){return`SYSTEM_STATUS: [ABYSS_SYNC]`}abyssal(){return!0}drainFactor(){return ui}peers(){return this.building().children().slice(this.building().floors())}},S=`names/buildings`,fi=300,pi=5,mi=50,hi=2500,gi=1500,_i=4094,vi=[10,20],yi=class{#e;constructor(e){this.#e=e}nameOf(e,t){let n=e.branch(`name`),r=n.branch(`rarity`).range(0,9999),i=this.landmarkChance(t.depth,t.landmarkFactor);if(r<i)return{name:n.branch(`landmark`).pick(this.#e.list(`${S}/landmarks`)),landmark:!0};let a=n.branch(`pattern`).range(0,1);return{name:r<i+gi?this.#t(n,a,t):this.#r(n,a,t.culture),landmark:!1}}landmarkChance(e,t){let n=fi+Math.max(0,e-pi)*mi;return Math.min(hi,n*t)}#t(e,t,n){if(t===0)return`Unit 0x${e.branch(`serial`).range(0,_i).toString(16).toUpperCase()} ${e.branch(`size-word`).pick(this.#n(n.floors))}`;let r=e.branch(`concept`).pick(this.#e.list(`${S}/concepts`));return`The ${this.#i(e,n.culture)} of ${r}`}#n(e){let t=this.#e.index(`${S}/sizes`),n=vi.filter(t=>e>=t).length,r=t[Math.min(n,t.length-1)];if(r===void 0)throw Error(`${S}/sizes/index names no list`);return this.#e.list(`${S}/sizes/${r}`)}#r(e,t,n){if(t===0)return`${e.branch(`adjective`).pick(this.#e.list(`${S}/adj/${n.key()}`))} ${this.#i(e,n)}`;let r=e.branch(`compound`).pick(this.#e.list(`${S}/compounds`));return`${this.#i(e,n)}${r}`}#i(e,t){return e.branch(`noun`).pick(this.#e.list(`${S}/noun/${t.key()}`))}},bi={min:0,max:99},xi=[{upTo:40,size:{floors:{min:3,max:10},doors:{min:2,max:6}}},{upTo:70,size:{floors:{min:10,max:25},doors:{min:4,max:10}}},{upTo:90,size:{floors:{min:30,max:50},doors:{min:8,max:16}}},{upTo:bi.max,size:{floors:{min:50,max:100},doors:{min:10,max:20}}}],Si=class{bandFor(e){let t=Number.isInteger(e)&&e>=bi.min?xi.find(t=>e<=t.upTo):void 0;if(t===void 0)throw RangeError(`a size roll is a whole number from 0 to 99, not ${String(e)}`);return t.size}bandOf(e){return this.bandFor(e.branch(`size`).range(bi.min,bi.max))}floorsOf(e){let t=this.bandOf(e).floors;return e.branch(`floors`).range(t.min,t.max)}doorsPerFloorOf(e){let t=this.bandOf(e).doors;return e.branch(`doors`).range(t.min,t.max)}},Ci=class{#e;#t=new Si;#n;#r;constructor(e,t){this.#e=new yi(t),this.#n=new x(e,void 0,()=>e.factoryFor($r)),this.#r=new x(e,void 0,()=>e.factoryFor(oi))}kind(){return un}create(e){let t=e.parent,n=t?.vibe()?.culture();if(t===void 0||n===void 0)throw Error(`a building is named in the culture of its street: it needs a street under a planet`);let r=this.#t.floorsOf(e.seed),i=this.#e.nameOf(e.seed,{culture:n,floors:r,depth:t.depth(),landmarkFactor:t.landmarkFactor()});return new gn(e,{name:i.name,landmark:i.landmark,floors:r,doorsPerFloor:this.#t.doorsPerFloorOf(e.seed)})}populate(e){return[...this.#n.exactly(e,e.floors()),...this.#r.exactly(e,e.layers(),e.floors())]}},wi=new b({key:`city`,title:`City`,icon:`🏙`,indexLabel:`DISTRICT`}),Ti=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.rebelVibe}kind(){return wi}name(){return this.#e}vibe(){return this.#t??super.vibe()}description(){return[this.#t===void 0?`A stable regional node connected to the planetary lattice.`:`The air is thick with illegal data-streams and shifting static.`]}facts(){return this.#t===void 0?[]:[{key:`alert`,label:`UNAUTHORIZED_ZONE`,value:`UNAUTHORIZED_RESONANCE_DETECTED`}]}status(){return this.#t===void 0?`STABILITY: [STABLE]`:`STABILITY: [VOLATILE]`}meta(){return this.#t===void 0?``:` [UNAUTHORIZED_ZONE]`}childrenHeading(){return`Streets detected in this city`}approachVerb(){return`Go to`}},Ei=`name`,C=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}words(e){return this.#e.index(this.#t).map(t=>this.naming(e).branch(t).pick(this.#e.list(`${this.#t}/${t}`)))}naming(e){return e.branch(Ei)}},Di=.1,Oi=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/city`),this.#t=new x(e,{min:3,max:15},()=>e.factoryFor(yn))}kind(){return wi}create(e){let t=e.seed.branch(`rebel`).probability(Di);return new Ti(e,{name:this.#e.words(e.seed).join(``),rebelVibe:t?e.parent?.vibe()?.rebel():void 0})}populate(e){return this.#t.of(e)}},ki=[`long`,`service`,`curved`,`static`];function Ai(e){let t=ki.find(t=>t===e);if(t===void 0)throw Error(`themes/descriptions/corridor.txt: '${e}' is not a corridor shape (${ki.join(`, `)})`);return t}var ji=`themes/descriptions`,Mi=`sentence`,Ni=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}dealt(e){return e.branch(Mi).pick(this.#e.list(`${ji}/${this.#t}`))}lines(e){return this.#e.pairs(`${ji}/${this.#t}`).map(([t,n])=>[t,e(n)])}dealtFrom(e,t){return e.branch(Mi).pick(t)}},Pi=class{#e;#t;constructor(e){this.#e=new Ni(e,`corridor`),this.#t=this.#e.lines(Ai)}dealt(e){return this.#e.dealtFrom(e,this.#t)}},Fi=class{#e;#t;constructor(e,t){this.#e=new Pi(t),this.#t=new x(e,void 0,()=>e.factoryFor(xn))}kind(){return _n}create(e){let[t,n]=this.#e.dealt(e.seed);return new vn(e,{sentence:t,shape:n})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Ii=new b({key:`country`,title:`Country`,icon:`⬚`,indexLabel:`REGION`}),Li=class extends y{#e;#t;#n;constructor(e,t){super(e),this.#e=t.name,this.#t=t.trait,this.#n=t.vibe}kind(){return Ii}name(){return this.#e}vibe(){return this.#n??super.vibe()}description(){return[`A vast administrative region governed by the ${this.#t.key()} directive.`]}facts(){return[{key:`trait`,label:`Sector Mutation`,value:this.#t.key()}]}status(){return`TRAIT: [${this.#t.key().toUpperCase()}]`}meta(){return` [TRAIT: ${this.#t.key().toUpperCase()}]`}childrenHeading(){return`Regional cities identified`}approachVerb(){return`Travel to`}},Ri={min:-100,max:100,scale:1e3},zi=class{#e;#t;#n;constructor(e,t,n){this.#e=new C(t,`names/country`),this.#t=n,this.#n=new x(e,{min:2,max:10},()=>e.factoryFor(wi))}kind(){return Ii}create(e){let t=e.seed.branch(`trait`).pick(this.#t.traits()),n=e.seed.branch(`stability`).range(Ri.min,Ri.max)/Ri.scale;return new Li(e,{name:this.#e.words(e.seed).join(` `),trait:t,vibe:e.parent?.vibe()?.mutate(t,n)})}populate(e){return this.#n.of(e)}},Bi=new b({key:`filament`,title:`Cosmic filament`,icon:`»`,indexLabel:`CONDUIT`}),Vi=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.conduitId}kind(){return Bi}name(){return this.#e}description(){return[`A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${this.#t}]`]}status(){return`SYNC: [NODE_RELIABILITY_HIGH]`}childrenHeading(){return`Galactic sectors within this conduit`}approachVerb(){return`Pulse to`}},Hi=new b({key:`sector`,title:`Galactic sector`,icon:`○`,indexLabel:`SECTOR`}),Ui=class extends y{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Hi}name(){return this.#e}callSign(){return`MATTER_CLUSTER: ${this.#e}`}description(){return[`A dense cluster of celestial bodies within the neural web.`]}status(){return`GRID: [LATTICE_SYNC_OK]`}childrenHeading(){return`Solar systems within proximity`}approachVerb(){return`Transition to System:`}},Wi={min:1e3,max:9999},Gi={min:10,max:39},Ki=100,qi=0,Ji=`echo`,Yi=`echo-hertz`,Xi=class{#e;#t=qi;#n=!1;constructor(e){this.#e=e}signal(){return this.#t}locked(){return this.#t>=Ki}found(){return this.#n}scan(e){if(this.#n)return this.#t;let t=this.#e.seed().branch(Ji).branch(e).range(Gi.min,Gi.max);return this.#t=Math.min(Ki,this.#t+t),this.#t}fragment(){return new Fn({from:this.#e.address(),frequency:new nn(this.#e.seed().branch(Yi).range(Wi.min,Wi.max))})}capture(){if(!(!this.locked()||this.#n))return this.#n=!0,this.#t=qi,{fragment:this.fragment(),fresh:!0}}remember(){if(this.#n)return JSON.stringify({found:!0});if(this.#t>qi)return JSON.stringify({signal:this.#t})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{signal:n,found:r,...i}=t;return Object.keys(i).length>0?!1:r===!0&&n===void 0?(this.#n=!0,this.#t=qi,!0):r!==void 0||typeof n!=`number`||!Number.isInteger(n)||n<=qi||n>Ki?!1:(this.#n=!1,this.#t=n,!0)}},Zi=new b({key:`null-reach`,title:`Null reach`,icon:`○`,indexLabel:`VOID`}),Qi=2,$i=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=new Xi(this)}kind(){return Zi}name(){return this.#e}callSign(){return`VOID_REACH: ${this.#e}`}echo(){return this.#t}description(){return this.#t.found()?[`A silent void. The spectral resonance has been harvested.`]:[`A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.`]}facts(){let e=this.#t.signal();return[{key:`signal`,label:`VOID_STATUS`,value:e===0?`Searching for signals...`:`SIGNAL_STRENGTH: ${String(e)}% | FREQ_DRIFT: ${String(this.#t.fragment().frequency().hertz())}Hz`}]}status(){if(this.#t.found())return`SIGNAL: [HARVESTED]`;let e=this.#t.signal();return e===0?`SIGNAL: [SCAN_REQUIRED]`:`SIGNAL: ${String(e)}%`}remember(){return this.#t.remember()}recall(e){return this.#t.recall(e)}childrenHeading(){return`Faint gravitational anomalies detected`}approachVerb(){return`Detect faint signal:`}landmarkFactor(){return super.landmarkFactor()*Qi}},ea=.3,ta=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/filament`),this.#t=new x(e,{min:4,max:8},t=>e.factoryFor(t.branch(`null-roll`).probability(ea)?Zi:Hi))}kind(){return Bi}create(e){let[t,n]=this.#e.words(e.seed),r=this.#e.naming(e.seed).branch(`number`).range(0,998),i=e.seed.branch(`conduit`).range(0,65534);return new Vi(e,{name:`${String(t)}-${String(r)}-${String(n)}`,conduitId:`0x${i.toString(16)}`})}populate(e){return this.#t.of(e)}},na=`names/floors`,ra=5,ia=5,aa=class{#e;constructor(e){this.#e=e}zoneOf(e,t,n){if(t===0)return this.#t(`${na}/lobby`);if(t===n-1)return this.#t(`${na}/peak`);let r=this.#e.index(`${na}/zones`),i=r[t<ra?0:t>n-ia?r.length-1:1];if(i===void 0)throw Error(`${na}/zones/index names too few lists`);return e.branch(`zone`).pick(this.#e.list(`${na}/zones/${i}`))}#t(e){let[t,...n]=this.#e.list(e);if(t===void 0||n.length>0)throw Error(`${e}.txt holds exactly one word`);return t}},oa=class{#e;#t;constructor(e){this.#e=new Pi(e),this.#t=new Sr(e)}of(e,t){let n=e.child(0);return new Zr(this.#e.dealt(n)[1],Array.from({length:t},(e,t)=>this.#t.look(n.child(t))))}},sa=class{#e;#t;#n;#r;constructor(e,t){this.#e=new aa(t),this.#t=new Ni(t,`floor`),this.#n=new x(e,void 0,()=>e.factoryFor(_n)),this.#r=new oa(t)}kind(){return $r}create(e){let t=e.parent,n=new Qr(t.vibe()?.culture().key()??`unknown`).capitalised();return new ai(e,{number:e.index,zone:this.#e.zoneOf(e.seed,e.index,t.floors()),sentence:this.#t.dealt(e.seed).replace(`{culture}`,n),passage:this.#r.of(e.seed,t.doorsPerFloor())})}populate(e){return this.#n.exactly(e,1)}},ca=`The air is thick with oily static and the hum of abyssal substrate.`,la=class{#e;constructor(e){this.#e=new x(e,void 0,()=>e.factoryFor(Fr))}kind(){return oi}create(e){return new di(e,{number:e.parent.floors()-1-e.index,sentence:ca})}populate(e){return this.#e.exactly(e,1)}},ua=new b({key:`solar-system`,title:`Solar system`,icon:`☼`,indexLabel:`RADII`}),da=class extends y{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return ua}name(){return this.#e}description(){return[`A star holding its resonant nodes in orbit.`]}status(){return`SYNC: [RESONANT_NODES_STABLE]`}childrenHeading(){return`Orbital bodies within range`}approachVerb(){return`Land on`}},fa=class{#e;constructor(e){this.#e=new x(e,{min:1,max:2},()=>e.factoryFor(ua))}kind(){return Zi}create(e){return new $i(e,{name:`Null Reach ${e.seed.branch(`name`).range(0,4094).toString(16).toUpperCase()}`})}populate(e){return this.#e.of(e)}},pa=new b({key:`planet`,title:`Planet`,icon:`⊕`,indexLabel:`ORBIT`}),ma=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.vibe}kind(){return pa}name(){return this.#e}vibe(){return this.#t}description(){return[`A world on the surface layer of the lattice, tuned to one culture and one era.`]}facts(){return[{key:`culture`,label:`RESONANCE`,value:this.#t.culture().key()},{key:`era`,label:`TIMELINE`,value:this.#t.era().key()}]}status(){return`RESONANCE: [${this.#t.culture().key().toUpperCase()}]`}meta(){return` [SURFACE | ERA: ${this.#t.era().key().toUpperCase()}]`}childrenHeading(){return`Planetary landmasses scanned`}approachVerb(){return`Visit`}},ha=class{#e;#t;#n;constructor(e,t,n){this.#e=new C(t,`names/planet`),this.#t=n,this.#n=new x(e,{min:2,max:8},()=>e.factoryFor(Ii))}kind(){return pa}create(e){return new ma(e,{name:this.#e.words(e.seed).join(``),vibe:this.#r(e.seed)})}populate(e){return this.#n.of(e)}#r(e){let t=e.branch(`vibe`),n=t.branch(`culture`).pick(this.#t.surfaceCultures()),r=t.branch(`era`).pick(this.#t.eras()),i=this.#t.surfaceCultures().filter(e=>!e.equals(n)),a=this.#t.eras().filter(e=>!e.equals(r));return new Br({culture:n,era:r,secondCulture:i.length===0?n:t.branch(`second-culture`).pick(i),secondEra:a.length===0?r:t.branch(`second-era`).pick(a)})}},ga=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}name(){return this.#e}guarantee(){return this.#t}trace(){return this.#n}equals(e){return this.#e===e.#e}},_a={ozone:{name:`Ozone`,sentence:`A sharp smell of ozone escapes the frame, ionizing the nearby air.`},frost:{name:`Frost`,sentence:`Thin frost is forming on the magnetic hinges. Total absence of thermal signature detected.`},clicking:{name:`Clicking`,sentence:`A persistent, rhythmic clicking sound—like high-speed mechanical relays—originates from the lock housing.`},humming:{name:`Humming`,sentence:`A heavy, low-frequency thrum (60Hz) vibrates through the surrounding strata.`},stillness:{name:`Stillness`,sentence:`The air nearby is unnaturally still. Not even the standard system-hum is audible.`}},va=class e{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}static of(t){let n=_a[t];return n===void 0?void 0:new e(t,n.name,n.sentence)}key(){return this.#e}name(){return this.#t}sentence(){return this.#n}equals(e){return this.#e===e.#e}},ya=`names/rooms`,ba=class{#e;#t=new Map;constructor(e){this.#e=e}allowedBy(e){let t=this.#t.get(e.key());return t===void 0&&(t=Object.freeze(this.#e.pairs(`${ya}/${e.key()}`).map(([e,t])=>{let n=t.indexOf(`|`);if(n<0)throw Error(`${ya}: '${e}|${t}' is not 'name|guarantee|trace'`);let r=va.of(t.slice(n+1).trim());if(r===void 0)throw Error(`${ya}: '${e}' names no known trace`);return new ga(e,this.#n(t.slice(0,n).trim()),r)})),this.#t.set(e.key(),t)),t}categoryOf(e,t){return e.branch(`category`).pick(this.allowedBy(t))}#n(e){if(e===``)return;let t=e.indexOf(` `),n=vr.find(n=>n.key()===e.slice(0,t));if(t<0||n===void 0)throw Error(`${ya}: '${e}' is not '<style> <WORD>' with a known style`);return new dr(e.slice(t+1),n)}},xa=`themes/atmosphere`,Sa=`themes/cultures`,Ca=`themes/timelines`,wa=`themes/colours`,Ta=`glitch`,Ea=.05,Da=.5,Oa=[`abyssal`,`Singularity`],ka=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t){let n=e.branch(Ta),r=t.anomaly||n.probability(Ea),i=e=>r&&n.branch(e).probability(Da),a=this.#e.index(Sa),o=this.#e.index(Ca),s=i(`walls`)?n.branch(`walls`).pick(a):t.culture.key(),c=i(`lighting`)?n.branch(`lighting`).pick(o):t.era.key(),l=i(`structure`)?n.branch(`structure`).pick(Oa):t.trait.key();return{structure:e.branch(`structure`).pick(this.#n(`structures`,l,`${xa}/structures`)),colour:e.branch(`colour`).pick(this.#e.list(wa)),walls:e.branch(`walls`).pick(this.#n(`walls`,s,Sa)),lighting:e.branch(`lighting`).pick(this.#n(`lighting`,c,`${xa}/lighting`))}}#n(e,t,n){let r=`${xa}/${e}/${t}`;if(this.#e.has(r))return this.#e.list(r);let i=this.#e.index(n)[0]??``;return this.#t.warn(`[THEME_WARN] no ${e} file for '${t}' — falling back to '${i}' (${r}.txt)`),this.#e.list(`${xa}/${e}/${i}`)}},Aa=`themes/conditions`,ja=`themes/cultures`,Ma=`pieces`,Na=`condition`,Pa=class{#e;#t=new cr;constructor(e){this.#e=e}of(e,t,n){let r=this.#e.list(Aa),i=this.#e.list(`${ja}/${t.key()}`);return this.#t.take(e.branch(Ma),i,Math.min(n,i.length)).map((t,n)=>{let i=e.branch(Na).branch(n).range(0,r.length-1);return t.startsWith(`${r[i]??``} `)&&(i=(i+1)%r.length),`${r[i]??``} ${t}`})}},Fa=`names/buildings/adj`,Ia={min:12,max:21},La={min:5,max:25},Ra=[`[SHIELDED]`,`[CLEAR]`],za={min:1,max:3},Ba={kind:qn,make:(e,t)=>new rr(e,t)},Va=class{#e;#t;#n;#r;#i;#a=new cr;constructor(e,t,n,r=Ba){this.#e=r,this.#t=e,this.#n=t,this.#r=new ka(e,n),this.#i=new Pa(e)}kind(){return this.#e.kind}create(e){let t=e.parent,n=t.vibe()?.mutation();if(n===void 0)throw Error(`a room takes its category from the country above: it needs one`);let r=this.#n.categoryOf(e.seed,n),i=this.#a.nth(t.seed().branch(`adjectives`),this.#t.list(`${Fa}/${t.culture().key()}`),e.index);return this.#e.make(e,{name:`${i} ${r.name()}`,category:r,atmosphere:this.#r.of(e.seed,{culture:t.culture(),era:t.era(),trait:n,anomaly:t.anomaly()}),traits:{oxygen:e.seed.branch(`oxygen`).range(Ia.min,Ia.max),temperature:e.seed.branch(`temperature`).range(La.min,La.max),signal:e.seed.branch(`signal`).pick(Ra)},furniture:this.#i.of(e.seed.branch(`furniture`),t.culture(),e.seed.branch(`furniture`).range(za.min,za.max))})}populate(){return[]}},Ha=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/sector`),this.#t=new x(e,{min:3,max:7},()=>e.factoryFor(ua))}kind(){return Hi}create(e){let t=this.#e.naming(e.seed).branch(`number`).range(0,98);return new Ui(e,{name:`${this.#e.words(e.seed).join(` `)} ${String(t)}`})}populate(e){return this.#t.of(e)}},Ua=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/solar-system`),this.#t=new x(e,{min:2,max:10},()=>e.factoryFor(pa))}kind(){return ua}create(e){return new da(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Wa=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/street`),this.#t=new x(e,{min:2,max:10,unit:2},()=>e.factoryFor(un))}kind(){return yn}create(e){return new bn(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Ga=class{#e;constructor(e){this.#e=new x(e,{min:3,max:7},()=>e.factoryFor(Bi))}kind(){return or}create(e){return new sr(e)}populate(e){return this.#e.of(e)}},Ka=class{#e;constructor(e,t,n){let r=new ba(e),i=[new Ga(this),new ta(this,e),new Ha(this,e),new fa(this),new Ua(this,e),new ha(this,e,t),new zi(this,e,t),new Oi(this,e),new Wa(this,e),new Ci(this,e),new sa(this,e),new Fi(this,e),new Pr(this,e,r),new Va(e,r,n),new la(this),new Ur(this,t),new Pr(this,e,r,{kind:wn,rooms:ir,make:(e,t)=>new Tn(e,t)}),new Va(e,r,n,{kind:ir,make:(e,t)=>new ar(e,t)})];this.#e=new Map(i.map(e=>[e.kind().key(),e]))}universe(e){return this.factoryFor(or).create({parent:void 0,seed:e,index:0,children:this})}kinds(){return[...this.#e.values()].map(e=>e.kind())}factoryFor(e){let t=this.#e.get(e.key());if(t===void 0)throw Error(`no factory is registered for the kind '${e.key()}'`);return t}childrenOf(e){return this.factoryFor(e.kind()).populate(e)}},qa=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}frame(){return this.#t}equals(e){return this.#e===e.#e}},Ja=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Ya=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Xa=`themes/planet-frames`,Za=`themes/timelines`,Qa=`themes/cultures`,$a=`themes/traits`,w={culture:`abyssal`,era:`atomic`},eo=class{#e;#t;#n;#r;constructor(e){this.#e=e}surfaceCultures(){return this.#t??=Object.freeze(this.#e.pairs(Xa).map(([e,t])=>new qa(e,t))),this.#t}bedrock(){if(!this.#e.index(Qa).includes(w.culture))throw Error(`${Qa}/index names no '${w.culture}' culture`);let e=this.eras().find(e=>e.key()===w.era);if(e===void 0)throw Error(`${Za}/index names no '${w.era}' era`);return{culture:new qa(w.culture,w.culture),era:e}}eras(){return this.#n??=Object.freeze(this.#e.index(Za).map(e=>new Ja(e))),this.#n}traits(){return this.#r??=Object.freeze(this.#e.list($a).map(e=>new Ya(e))),this.#r}},to=/^([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})$/i,no=2**53,T=`#`,ro=`${T}range`,io=`${T}pick`,ao=`${T}probability`,oo=class e{#e;#t;constructor(e,t){this.#e=e>>>0,this.#t=t>>>0}static parse(t){let n=to.exec(t.trim());if(n===null)return;let r=n.slice(1).join(``);return new e(Number.parseInt(r.slice(0,8),16),Number.parseInt(r.slice(8),16))}child(e){return this.branch(e)}branch(e){if(typeof e==`number`){if(!Number.isSafeInteger(e))throw RangeError(`a number key is a whole number, got ${String(e)}`);return this.#n(`${T}n:${String(e)}`)}if(e.startsWith(T))throw RangeError(`keys starting with '${T}' are reserved for Seed itself, got '${e}'`);return this.#n(e)}#n(t){let n=(this.#e^2654435769)>>>0,r=(this.#t^2135587861)>>>0;n=Math.imul(n^r>>>15,2246822507),r=Math.imul(r^n>>>13,3266489909);for(let e=0;e<t.length;e++){let i=t.charCodeAt(e);n=Math.imul(n^i,2654435761),r=Math.imul(r^i,1597334677),n=n<<13|n>>>19,r=r<<17|r>>>15}return n^=t.length,n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,668265263)^r>>>15,new e(n,r)}range(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||t<e)throw RangeError(`range needs whole numbers with min <= max, got ${String(e)}..${String(t)}`);return e+Math.floor(this.#n(ro).#r()*(t-e+1))}pick(e){let t=e[Math.floor(this.#n(io).#r()*e.length)];if(t===void 0)throw RangeError(`pick needs a list with at least one item`);return t}probability(e){if(!(e>=0&&e<=1))throw RangeError(`probability needs a chance in [0, 1], got ${String(e)}`);return this.#n(ao).#r()<e}equals(e){return this.#e===e.#e&&this.#t===e.#t}toString(){let e=(this.#e.toString(16).padStart(8,`0`)+this.#t.toString(16).padStart(8,`0`)).toUpperCase();return`${e.slice(0,4)}-${e.slice(4,8)}-${e.slice(8,12)}-${e.slice(12)}`}#r(){return(this.#e*2097152+(this.#t>>>11))/no}},E=100,D=0,so=[{key:`stable`,from:70},{key:`degraded`,from:30},{key:`critical`,from:D}],co=40,lo=2,O=class e{#e;static range(){return{min:D,max:E}}static edges(){let e=new Set([E,1]);for(let t of[...so.map(e=>e.from),co])t<=D||(e.add(t),e.add(t-1));return[...e].sort((e,t)=>t-e)}constructor(e=E){if(!Number.isInteger(e)||e<D||e>E)throw RangeError(`coherence is a whole number from ${String(D)} to ${String(E)}, got ${String(e)}`);this.#e=e}value(){return this.#e}drained(t){return new e(Math.max(D,this.#e-t))}restored(t){return new e(Math.min(E,this.#e+t))}exhausted(){return this.#e===D}band(){return so.find(e=>this.#e>=e.from)?.key??`critical`}corrupting(){return this.#e<co}decay(){let e=so[0]?.from??E;return Math.min(1,Math.max(0,(e-this.#e)/(e-D)))}glitchMarks(){let e=so.at(-2)?.from??D;return Math.max(0,Math.floor((e-this.#e)/lo))}equals(e){return this.#e===e.#e}},uo=6,fo=class e{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e){this.#e=e.seed,this.#t=e.address,this.#n=new Map(e.states??[]),this.#r=e.coherence??new O().value(),this.#i=e.steps??0,this.#a=[...e.visited??[]],this.#o=[...e.buffer??[]],this.#s=e.resonant??0}static parse(t){if(t===void 0)return;let n;try{n=JSON.parse(t)}catch{return}if(typeof n!=`object`||!n)return;let{version:r,seed:i,path:a,states:o,coherence:s,steps:c,visited:l,buffer:u,resonant:d}=n;if(r!==uo||typeof i!=`string`)return;let f=oo.parse(i),p=e.#l(o),m=e.#u(l),h=e.#c(u);if(f===void 0||p===void 0||m===void 0||h===void 0||!e.#d(s)||!e.#f(c)||!e.#f(d))return;let g=typeof a==`string`?v.parse(a):void 0;if(a!==null&&g===void 0)return;let _=new O().value();if(g!==void 0||s===_&&c===0&&m.length===0&&p.size===0&&h.length===0&&d===0)return new e({seed:f,address:g,states:p,coherence:s,steps:c,visited:m,buffer:h,resonant:d})}static#c(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`object`||!n||Array.isArray(n))return;let e=n;if(typeof e.kind!=`string`)return;t.push(e)}return t}static#l(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=Object.entries(e),n=new Map;for(let[e,r]of t){if(v.parse(e)===void 0||typeof r!=`string`)return;n.set(e,r)}return n}static#u(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`string`||v.parse(n)===void 0)return;t.push(n)}return new Set(t).size===t.length?t:void 0}static#d(e){if(typeof e!=`number`)return!1;try{return new O(e),!0}catch{return!1}}static#f(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}seed(){return this.#e}address(){return this.#t}states(){return this.#n}coherence(){return this.#r}steps(){return this.#i}visited(){return this.#a}buffer(){return this.#o}resonant(){return this.#s}toText(){return JSON.stringify({version:uo,seed:this.#e.toString(),path:this.#t?.toString()??null,states:Object.fromEntries(this.#n),coherence:this.#r,steps:this.#i,visited:this.#a,buffer:this.#o,resonant:this.#s})}};function k(e,t,n){return{id:e,key:t,label:n,place:``,role:`system`,sealed:!1,landmark:!1,ordinal:``,readings:[],opposite:``,current:!1,visited:!1,address:``,figure:null,numbered:!1}}var po=`buffer`,mo=`pick:`,ho=`drop:`,go=`close`,_o=Array.from({length:9},(e,t)=>String(t+1)),vo=class{#e;#t;constructor(e){this.#e=e}summary(){return{id:po,outcome:``,figures:{selected:this.#t===void 0?``:String(this.#t)}}}options(){let e=this.#e.player().buffer().fragments(),t=this.#e.here()?.contents()!==null,n=e=>this.#t===void 0?`Select`:this.#t===e?`Unselect`:`Merge`;return[...e.flatMap((e,r)=>{let i=String(r+1),a={...k(`${mo}${String(r)}`,_o[r]??``,n(r)),role:`pick`,ordinal:i},o={...k(`${ho}${String(r)}`,``,`Drop here`),role:`drop`,ordinal:i};return t?[a,o]:[a]}),{...k(go,`b`,`Back to reality`),role:`return`}]}answer(e){if(!this.options().some(t=>t.id===e))return;if(e===go)return{message:``,done:!0};if(e.startsWith(mo))return{message:this.#n(Number(e.slice(5))),done:!1};let t=this.#e.drop(Number(e.slice(5)));return this.#t=void 0,{message:t===void 0?``:`Dropped ${t.name()} here.`,done:!1}}#n(e){let t=this.#t;if(t===void 0)return this.#t=e,``;if(this.#t=void 0,t===e)return``;let n=this.#e.merge(t,e);if(n===void 0)return``;let{fragment:r}=n;if(n.forged)return`Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: ${r.name()}. Coherence +15.`;let i=r.resonant()?` Resonance detected.`:``;return`Synthesis complete: ${r.name()} (${String(r.frequency().hertz())} Hz). Coherence +15.${i}`}},yo=`corrupt`,bo=.1,xo=class{#e=new Gn;read(e,t,n){if(!t.corrupting())return e;let r=n.branch(yo);return e.map((e,t)=>this.#e.mangle(e,bo,r.branch(t)))}},So=1,Co=new Map([[`entropic`,2]]),wo=class{cost(e){let t=e.drainEra()?.key()??``;return So*(Co.get(t)??1)*e.drainFactor()}},To=`frame`,Eo=class{of(e,t){return e.seed().branch(To).branch(t)}},Do=`help`,Oo=`close`,ko=class{summary(){return{id:Do,outcome:``,figures:{}}}options(){return[{...k(Oo,`b`,`Back to the world`),role:`return`}]}answer(e){return e===Oo?{message:``,done:!0}:void 0}},Ao=16,jo=class{#e;constructor(e=[]){if(e.length>Ao)throw RangeError(`the buffer holds ${String(Ao)} fragments, not ${String(e.length)}`);this.#e=[...e]}fragments(){return this.#e}size(){return this.#e.length}capacity(){return Ao}full(){return this.#e.length>=Ao}add(e){return!this.full()&&(this.#e.push(e),!0)}take(e){if(!Number.isInteger(e)||e<0||e>=this.#e.length)return;let[t]=this.#e.splice(e,1);return t}merge(e,t,n){if(e===t)return;let r=this.#e[e],i=this.#e[t];if(r===void 0||i===void 0)return;let a=n===void 0?new jn(r,i):n(r,i);return this.#e.splice(Math.max(e,t),1),this.#e.splice(Math.min(e,t),1),this.#e.push(a),a}remove(e){let t=this.#e.indexOf(e);return t<0?!1:(this.#e.splice(t,1),!0)}},Mo=15,No=class{#e;#t;#n;#r;#i;#a;constructor(e={coherence:new O().value(),steps:0,visited:[],buffer:[],resonant:0}){this.#e=new O(e.coherence),this.#t=e.steps,this.#n=[...e.visited],this.#r=new Set(this.#n),this.#i=new jo(e.buffer),this.#a=e.resonant}buffer(){return this.#i}resonantTraces(){return this.#a}capture(e){return this.#i.add(e.fragment)?(e.fresh&&e.fragment.resonant()&&(this.#a+=1),!0):!1}merge(e,t,n){let r=this.#i.merge(e,t,n===void 0?void 0:()=>n);if(r!==void 0)return this.restore(Mo),r.resonant()&&(this.#a+=1),r}discard(e){return this.#i.remove(e)}drop(e){return this.#i.take(e)}coherence(){return this.#e}steps(){return this.#t}drain(e){this.#e=this.#e.drained(e)}restore(e){this.#e=this.#e.restored(e)}setCoherence(e){this.#e=new O(e)}count(){this.#t+=1}markFootprint(e){for(let t of e.trail()){let e=t.address().toString();this.#r.has(e)||(this.#r.add(e),this.#n.push(e))}}visited(e){return this.#r.has(e.address().toString())}footprints(){return this.#n}placesVisited(){return this.#n.length}reboot(){this.#e=new O}},Po=new zn,Fo=class{#e;#t;#n;#r;#i;#a=new No;constructor(e){this.#e=e}world(){return this.#t}universe(){return this.#n}here(){return this.#r}player(){return this.#a}resumes(){return this.#i!==void 0}begin(e){this.#t=e,this.#n=this.#e.universe(e),this.#r=void 0,this.#i=void 0,this.#a=new No}enter(){return this.#n!==void 0&&(this.#o(this.#i??this.#n.startOfJourney()),this.#i=void 0,!0)}descend(e){let t=this.#r?.listing()[e];return t===void 0||t.sealed()?!1:(this.#o(t.arrive()),!0)}move(e){let t=this.#r?.move(e);return t!==void 0&&(this.#o(t.arrive()),!0)}leave(){if(this.#r?.exit()===void 0)return!1;let e=this.#r.leave();return e!==void 0&&(this.#o(e),!0)}toTitle(){return this.#r!==void 0&&(this.#i=this.#r,this.#r=void 0,!0)}capture(e){if(this.#r===void 0||this.#a.buffer().full())return;let t=this.#r.capture(e);if(t!==void 0)return this.#a.capture(t),this.#r.sample(),t.fragment}lottery(){if(this.#r===void 0||this.#a.buffer().full())return;let e=this.#r.lottery(this.#a.steps());if(e!==void 0)return this.#a.capture({fragment:e,fresh:!0}),this.#r.sample(),e}echo(){let e=this.#r?.echo();if(!(e===void 0||e.found()))return e.scan(this.#a.steps())}captureEcho(){if(this.#a.buffer().full())return;let e=this.#r?.echo()?.capture();if(e!==void 0)return this.#a.capture(e),e.fragment}drop(e){if(this.#r?.contents()===null||this.#r===void 0)return;let t=this.#a.buffer().fragments()[e];if(t!==void 0&&this.#r.drop(t))return this.#a.drop(e)}merge(e,t){let n=this.#r?.forge(this.#a.buffer().fragments()),r=this.#a.merge(e,t,n);if(r!==void 0)return this.#r?.infuse(),{fragment:r,forged:n!==void 0}}breachOffered(){return this.#r?.breachOffered(this.#a.buffer().fragments())??!1}breach(){let e=this.#r?.breach(this.#a.buffer().fragments());if(e!==void 0)return this.#a.discard(e),e}prime(){return this.#r?.prime()??!1}spawnKeystone(){let e=this.#r?.keystone();if(!(e===void 0||this.#a.buffer().full()))return this.#a.capture({fragment:e,fresh:!1}),e}reboot(){return this.#t!==void 0&&(this.#n=this.#e.universe(this.#t),this.#i=void 0,this.#a.reboot(),this.#o(this.#n.startOfJourney()),!0)}saved(){if(this.#t===void 0)return;let e=this.#r??this.#i;return new fo({seed:this.#t,address:e?.address(),states:this.#s(this.#a.footprints()),coherence:this.#a.coherence().value(),steps:this.#a.steps(),visited:this.#a.footprints(),buffer:this.#a.buffer().fragments().map(e=>e.data()),resonant:this.#a.resonantTraces()})}restore(e){let t=this.#e.universe(e.seed()),n=new Set;for(let t of e.visited()){let e=v.parse(t);if(e===void 0)return!1;let r=e.parent();if(r!==void 0&&!n.has(r.toString()))return!1;n.add(t)}for(let[r,i]of e.states()){let e=v.parse(r),a=e===void 0||!n.has(r)?void 0:t.descendant(e);if(a===void 0||!a.recall(i)||a.remember()!==i)return!1}for(let n of e.visited()){let e=v.parse(n);if(e===void 0||t.locate(e)===void 0)return!1}let r=e.address(),i=r===void 0?void 0:t.descendant(r);if(r!==void 0&&(i===void 0||i.arrival()!==i))return!1;let a=i?.trail()??[];if(a.some(e=>!n.has(e.address().toString())))return!1;for(let[e,t]of a.entries()){let n=a[e+1];if(n!==void 0&&!t.admits(n))return!1}let o=Po.readAll(e.buffer(),t);return o===void 0||o.length>this.#a.buffer().capacity()?!1:(this.#t=e.seed(),this.#n=t,this.#r=i,this.#i=void 0,this.#a=new No({coherence:e.coherence(),steps:e.steps(),visited:e.visited(),buffer:o,resonant:e.resonant()}),!0)}#o(e){this.#r=e,this.#a.markFootprint(e)}#s(e){let t=new Map;for(let n of e){let e=v.parse(n),r=e===void 0?void 0:this.#n?.descendant(e)?.remember();r!==void 0&&t.set(n,r)}return t}},Io=30,Lo=15,Ro=10,zo=`marks`,Bo=`static`,Vo=.08,Ho=[`?`,`!`,`░`,`▒`,`▓`,`X`,`#`],Uo=class{of(e,t,n,r){if(!e.mapped())return null;let i=new Set,a=(e,t)=>`${String(e)},${String(t)}`,o=r.branch(Bo),s=e.mapNodes().map((n,r)=>{let{x:s,y:c}=n.mapSpot(Io,Lo);for(let e=0;i.has(a(s,c))&&e<Ro;e++)s=(s+1)%Io,s===0&&(c=(c+1)%Lo);i.add(a(s,c));let l=o.branch(r),u=e.abyssal()&&l.probability(Vo);return{x:s,y:c,glyph:u?l.branch(`glyph`).pick(Ho):n.mapGlyph(),name:n.name(),visited:t(n),noise:u}}),c=r.branch(zo);return{width:Io,height:Lo,origin:{name:e.name(),glyph:e.mapGlyph()},frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),nodes:s,marks:Array.from({length:n.glitchMarks()},(e,t)=>({x:c.branch(t).branch(`x`).range(0,29),y:c.branch(t).branch(`y`).range(0,14)}))}}},Wo=`reboot`,Go=class{#e;constructor(e){this.#e=e}summary(){return{id:Wo,outcome:`rebooting`,figures:{}}}options(){return[k(Wo,``,`Rebuild`)]}answer(e){if(e===`reboot`)return this.#e.reboot(),{message:`Substrate rebuilt. Coherence ${String(this.#e.player().coherence().value())}.`,done:!0}}},Ko=20,qo=[{id:`void`,reached:e=>e.here.abyssal()},{id:`expedition`,reached:e=>e.places>=Ko},{id:`severed`,reached:()=>!0}],Jo=class{of(e){return qo.find(t=>t.reached(e))?.id??``}},Yo=`recap`,Xo=`resume`,Zo=`end-session`,Qo=class{#e;#t=new Jo;constructor(e){this.#e=e}summary(){let e=this.#e.here(),t=this.#e.player();return{id:Yo,outcome:e===void 0?``:this.#t.of({here:e,places:t.placesVisited()}),figures:{locus:e?.address().toString()??``,steps:String(t.steps()),places:String(t.placesVisited()),buffer:String(t.buffer().size()),resonant:String(t.resonantTraces())}}}options(){return[k(Xo,`b`,`Resume`),k(Zo,`q`,`End session`)]}answer(e){if(e===Xo)return{message:``,done:!0};if(e===Zo)return this.#e.toTitle(),{message:``,done:!0}}},$o=`spectrogram`,es=5,ts=9,ns=`void`,rs=.3,is=[`It is cold down here.`,`We see you.`,`Return to the surface.`,`Bedrock approaching.`],as=class{of(e,t){if(!e.indoors())return null;let n=t.branch($o),r=t.branch(ns);return{spectrogram:Array.from({length:es},(e,t)=>n.branch(t).range(1,ts)),voice:e.abyssal()&&r.probability(rs)?r.branch(`words`).pick(is):null}}},os=class{#e;#t;constructor(e){this.#e=e.drains,this.#t=e.counts}drains(){return this.#e}counts(){return this.#t}},ss=new os({drains:!1,counts:!1}),A=new os({drains:!0,counts:!1}),j=new os({drains:!0,counts:!0}),cs=`enter:`,ls=`move:`,us=`capture:`,ds=`scan`,fs=`map`,ps=`trace`,ms=`echo`,hs=`capture-echo`,gs=`breach`,_s=`debug:integrity:`,vs=`debug:prime`,ys=`debug:keystone`,bs=100,xs={up:`u`,down:`d`,descend:`d`,corridor:`c`,elevator:`b`,back:`b`,forward:`f`},Ss=`j`,Cs=`e`,ws=`c`,Ts=`m`,Es=`h`,Ds=Array.from({length:9},(e,t)=>String(t+1)),Os=Array.from({length:26},(e,t)=>String.fromCharCode(97+t)),ks=class{#e;#t;#n;#r;#i;#a;#o=new wo;#s=new Eo;#c=new as;#l=new Uo;#u=new xo;#d;#f=``;#p=null;#m=null;#h=null;constructor(e){this.#e=new Fo(e.world),this.#t=e.entropy,this.#n=e.saves,this.#r=e.debug??!1,this.#i=[{keys:[`n`],turn:ss,options:()=>this.#v()&&!this.#y()?[k(`new-world`,`n`,`New world`)]:[],run:()=>this.#x()},{keys:[`e`],turn:ss,options:()=>this.#v()&&this.#y()?[k(`enter-world`,`e`,this.#e.resumes()?`Continue`:`Enter world`)]:[],run:()=>this.#b(this.#e.enter(),`Entered ${this.#e.here()?.name()??``}.`)},{keys:[`r`],turn:ss,options:()=>this.#v()&&this.#y()?[k(`reroll`,`r`,`Re-roll`)]:[],run:()=>this.#x()},{keys:[],turn:j,options:()=>this.#C(),run:e=>{let t=this.#e.player(),n=t.resonantTraces(),r=this.#e.capture(Number(e.slice(8)));if(r===void 0)return this.#f;let i=t.resonantTraces()>n?` Harmonic resonance: +10%.`:``;return`Captured ${r.name()}. Frequency: ${String(r.frequency().hertz())} Hz.${i}`}},{keys:[],turn:j,options:()=>this.#S(),run:e=>{let t=this.#e.descend(Number(e.slice(6)));return this.#b(t,`Entered ${this.#e.here()?.name()??``}.`)}},{keys:[...new Set(Object.values(xs))],turn:j,options:()=>this.#T(),run:e=>{let t=e.slice(5),n=this.#e.here(),r=n?.moves().find(e=>e.id===t)?.label??``,i=this.#e.move(t),a=this.#e.here();return this.#b(i,a===n?`${r}.`:`Entered ${a?.name()??``}.`)}},{keys:[`l`],turn:j,options:()=>{let e=this.#e.here();return e?.exit()===void 0?[]:[{...k(`leave`,`l`,e.leaveLabel()),role:`return`}]},run:()=>this.#b(this.#e.leave(),`Returned to ${this.#e.here()?.name()??``}.`)},{keys:[Ss],turn:j,options:()=>this.#e.breachOffered()?[{...k(gs,Ss,`Breach the Bedrock`),role:`move`}]:[],run:()=>this.#e.breach()===void 0?this.#f:`HARMONIC_INVERSION_PROTOCOL_ENGAGED — breaching the bedrock substrate. Lattice weight normalized: aperture opening at root. The Keystone is spent.`},{keys:[Cs],turn:j,options:()=>this.#w(),run:e=>{if(e===ms){let e=this.#e.echo();return e===void 0?this.#f:e>=bs?`HARMONIC_LOCK_ESTABLISHED: Spectral Echo isolated. Signal 100%.`:`SCANNING_VOID: Signal strength increasing... ${String(e)}%.`}let t=this.#e.captureEcho();return t===void 0?this.#f:`VOID_RESONANCE: Echo captured and stabilized. Frequency: ${String(t.frequency().hertz())} Hz.`}},{keys:[`s`],turn:A,options:()=>this.#v()?[]:[k(ds,`s`,`Scan`)],run:()=>{let e=this.#e.here(),t=this.#e.player(),n=e?.scan(e=>t.visited(e));return n===void 0?`No scan-compatible structure detected in this strata.`:(this.#p={title:n.title,notes:n.notes,rows:n.rows.map(e=>({cells:e.cells,current:e.current,note:e.note}))},`LOCAL_LATTICE_SCAN_INITIATED [LOCUS: ${e?.address().toString()??``}]. SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.`)}},{keys:[Ts],turn:A,options:()=>this.#v()?[]:[k(fs,Ts,`Map`)],run:()=>{let e=this.#e.here(),t=e===void 0?null:this.#D(e,this.#e.player());return t===null?`SCAN_ERROR: Current location does not support spatial projection.`:(this.#m=t,`NEURAL_LATTICE_PROJECTION: ${String(t.nodes.length)} nodes plotted from ${t.origin.name}.`)}},{keys:[`i`],turn:A,options:()=>this.#v()?[]:[k(po,`i`,`Buffer`)],run:()=>(this.#d=new vo(this.#e),``)},{keys:[],turn:A,options:()=>this.#v()?[]:[k(ps,``,`Trace`)],run:()=>{let e=this.#e.here()?.trail()??[];return this.#h={steps:e.map((t,n)=>({depth:n,icon:t.kind().icon(),kind:t.kind().title(),name:t.name(),meta:t.meta(),current:n===e.length-1,abyssal:t.abyssal()}))},`NEURAL_LATTICE_TRACE_INITIATED: ${String(e.length)} levels from the universe.`}},{keys:[Es],turn:A,options:()=>this.#v()?[]:[k(Do,Es,`Help`)],run:()=>(this.#d=new ko,``)},{keys:[`t`],turn:A,options:()=>this.#v()?[]:[k(`to-title`,`t`,`Title screen`)],run:()=>this.#b(this.#e.toTitle(),``)},{keys:[`q`],turn:A,options:()=>this.#v()?[]:[k(Yo,`q`,`End session`)],run:()=>(this.#d=new Qo(this.#e),``)},{keys:[],turn:ss,options:()=>this.#r&&!this.#v()?O.edges().map(e=>({...k(`${_s}${String(e)}`,``,`Integrity ${String(e)}`),role:`debug`})):[],run:e=>{let t=Number(e.slice(16));return this.#e.player().setCoherence(t),`Integrity set to ${String(t)}%.`}},{keys:[],turn:ss,options:()=>this.#r&&this.#e.here()?.indoors()===!0?[{...k(vs,``,`Prime building`),role:`debug`},{...k(ys,``,`Spawn Keystone`),role:`debug`}]:[],run:e=>{if(e===vs)return this.#e.prime()?`Building primed: every floor sampled, seven merges in.`:this.#f;let t=this.#e.spawnKeystone();return t===void 0?this.#f:`${t.name()} generated in the trace buffer.`}}];let t=new Set([...this.#i.flatMap(e=>e.keys),`v`]);this.#a=[...Ds,...Os.filter(e=>!t.has(e))],this.#g()}step(e){this.#p=null,this.#m=null,this.#h=null;let t=this.#d;if(t!==void 0){let n=t.answer(e);return n!==void 0&&(n.done&&(this.#d=void 0),this.#f=n.message,this.#_()),this.snapshot()}let n=this.#i.find(t=>t.options().some(t=>t.id===e&&!t.sealed));if(n===void 0)return this.snapshot();let r=this.#e.here(),i=this.#e.player();if(r!==void 0&&n.turn.drains()&&(i.drain(this.#o.cost(r)),i.coherence().exhausted()))return this.#d=new Go(this.#e),this.#f=``,this.#_(),this.snapshot();if(this.#f=n.run(e),n.turn.counts()){i.count();let e=this.#e.lottery();e!==void 0&&(this.#f=`${this.#f} SPECTRAL_DEVIATION: Extracted Frequency ${String(e.frequency().hertz())} Hz.`)}return this.#_(),this.snapshot()}snapshot(){let e=this.#e.world(),t=this.#e.here(),n=this.#e.player();return{world:e===void 0?null:{seed:e.toString(),name:this.#e.universe()?.name()??``},place:t===void 0?null:this.#E(t,n),player:t===void 0?null:{coherence:n.coherence().value(),band:n.coherence().band(),steps:n.steps(),decay:n.coherence().decay()},buffer:t===void 0?null:this.#O(n),prompt:this.#d?.summary()??null,options:this.#d?.options()??this.#i.flatMap(e=>e.options()),message:this.#f,scan:this.#p,map:this.#m,trace:this.#h}}#g(){let e=fo.parse(this.#n.load());if(e===void 0||!this.#e.restore(e))return;let t=this.#e.here(),n=t===void 0?``:` at ${t.name()}`;this.#f=`Restored world ${e.seed().toString()}${n}.`,this.#e.player().coherence().exhausted()&&(this.#d=new Go(this.#e))}#_(){let e=this.#e.saved();e!==void 0&&this.#n.save(e.toText())}#v(){return this.#e.here()===void 0}#y(){return this.#e.world()!==void 0}#b(e,t){return e?t:this.#f}#x(){let e=this.#t.draw();return this.#e.begin(e),`World ${e.toString()} drawn.`}#S(){let e=this.#e.here();if(e===void 0)return[];let t=this.#e.player(),n=0,r=e=>{if(e.sealed())return``;if(!e.goesByNumber())return this.#a[n++]??``;let t=String(e.ordinal());return t.length===1?t:``};return e.listing().map((n,i)=>({id:`${cs}${String(i)}`,key:r(n),label:`${e.approachVerb()} ${n.callSign()}`,place:n.name(),role:`travel`,sealed:n.sealed(),landmark:n.landmark(),ordinal:String(n.ordinal()),readings:n.readings(),opposite:``,current:n.current(),visited:t.visited(n),address:n.address().toString(),figure:n.figure(),numbered:n.goesByNumber()}))}#C(){let e=this.#e.here()?.contents();if(e==null)return[];let t=this.#e.player().buffer().full();return e.objects.map((e,n)=>({...k(`${us}${String(n)}`,t?``:Ds[n]??``,`Take ${e.name()}`),place:e.name(),role:`take`,sealed:t,ordinal:String(n+1)}))}#w(){let e=this.#e.here()?.echo();if(e===void 0||e.found())return[];let t={...k(ms,Cs,`Scan for spectral echoes`),role:`move`};return e.locked()?[t,{...k(hs,ws,`Capture Spectral Echo`),role:`move`,sealed:this.#e.player().buffer().full()}]:[t]}#T(){let e=this.#e.here();return e===void 0?[]:e.moves().map(e=>({...k(`${ls}${e.id}`,xs[e.id]??``,e.label),role:`move`,opposite:`${ls}${e.opposite}`}))}#E(e,t){let n=e.peers(),r=this.#s.of(e,t.steps());return{kind:e.kind().title(),icon:e.kind().icon(),name:e.name(),address:e.address().toString(),position:n.length===0||e.kind().indexLabel()===``?null:{label:e.kind().indexLabel(),index:n.indexOf(e)+1,total:n.length},trail:e.trail().map(e=>({icon:e.kind().icon(),kind:e.kind().title(),name:e.name(),address:e.address().toString()})),status:e.status(),description:this.#u.read(e.description(),t.coherence(),r),facts:e.facts(),drawing:e.drawing(),figure:e.portrait(),noise:r,frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),childrenHeading:e.childrenHeading(),contents:this.#k(e),telemetry:this.#c.of(e,r),lattice:this.#D(e,t)}}#D(e,t){return this.#l.of(e,e=>t.visited(e),t.coherence(),this.#s.of(e,t.steps()))}#O(e){let t=e.buffer();return{size:t.size(),capacity:t.capacity(),resonant:e.resonantTraces(),fragments:t.fragments().map(e=>({key:e.key(),name:e.name(),hertz:e.frequency().hertz(),resonant:e.resonant()}))}}#k(e){let t=e.contents();return t===null?null:{objects:t.objects.map(e=>({key:e.key(),name:e.name()})),furniture:t.furniture}}},As=class{warn(e){console.warn(e)}},js=class{#e;constructor(e){this.#e=e}draw(){let[e=0,t=0]=this.#e.getRandomValues(new Uint32Array(2));return new oo(e,t)}},Ms=class{#e;constructor(e){this.#e=e}request(e){return this.#e.requestAnimationFrame(e)}cancel(e){this.#e.cancelAnimationFrame(e)}now(){return this.#e.performance.now()}},Ns=`(prefers-reduced-motion: reduce)`,Ps=class{#e;constructor(e){this.#e=e}reduced(){return this.#e.matchMedia(Ns).matches}},Fs=`endless-transit.save`,Is=class{#e;constructor(e){this.#e=e}load(){try{return this.#e().getItem(Fs)??void 0}catch{return}}save(e){try{this.#e().setItem(Fs,e)}catch{}}},Ls=class{#e;constructor(e){this.#e=e}name(){return`ENDLESS TRANSIT`}buildLine(){return`build ${this.#e}`}},Rs=`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,zs=12,Bs={regular:`400`,bold:`700`},M=class{of(e,t=zs){if(t<zs)throw RangeError(`a picture's text is at least ${String(zs)} px, got ${String(t)}`);return`${Bs[e]} ${String(t)}px ${Rs}`}atLeast(e){return Math.max(zs,e)}},Vs=class{trace(e,t){for(let n of[-.5,0,.5])t.line(e,[0,n],[1,n+.5]),t.line(e,[0,n+.5],[1,n])}},Hs=class{#e;constructor(e){this.#e=e}draw(e,t,n,r){let{quad:i,fog:a,ink:o}=n;this.#e.at(e,i.middle(),i.width(),t(o),(.15+.08*Math.sin(r*1.5))*a)}},Us=10,Ws=52,Gs=34,Ks=76,qs=9,Js=26,Ys=qs/2,Xs=class{#e;#t;constructor(e){this.#e=e.size,this.#t=e.hall}track(){let e=this.#n();return{...e,axis:`x`,from:this.#o(e.x),to:this.#o(e.x+e.width)}}draw(e,t,n,r,i){let a=this.#t;if(!a.walks())return;let o=this.#n(),s=o.y+o.height/2;this.#c(e,o.x,o.y,o.width,o.height),e.globalAlpha=.88,e.fillStyle=t(`ground`),e.fill(),e.globalAlpha=1,e.strokeStyle=t(`rule-hi`),e.lineWidth=1,e.stroke();let c=this.#r();e.globalAlpha=.35,e.fillStyle=t(`cy`),e.fillRect(c,s-1,this.#i(),2);for(let[r,i]of n.entries())e.globalAlpha=i.visited?1:.8,e.fillStyle=t(i.visited?`yl`:i.ink),e.fillRect(this.#a(a.doorAt(r))-1,a.sideOf(r)<0?s-14:s+5,2,9);let l=a.view(),u=this.#a(l),d=Math.max(Js,this.#a(l+Math.min(qs,a.length()-l))-u);this.#c(e,u,s-16,d,32),e.globalAlpha=.14,e.fillStyle=t(`cy`),e.fill(),e.globalAlpha=1,e.strokeStyle=t(`cy`),e.stroke(),r.at(e,{x:u,y:s},14,t(`yl`),.8),e.globalAlpha=1,e.fillStyle=t(`yl`),e.beginPath(),e.arc(u,s,6,0,Math.PI*2),e.fill(),this.#s(e,t,o.x+17,s),i.mark(e,t,{x:o.x+o.width-38,y:s})}#n(){return{x:Us,y:this.#e.height-Us-Ws,width:this.#e.width-20,height:Ws}}#r(){return this.#n().x+Gs}#i(){return Math.max(1,this.#n().width-Gs-Ks)}#a(e){return this.#r()+e/this.#t.length()*this.#i()}#o(e){return(e-this.#r())/this.#i()*this.#t.length()-Ys}#s(e,t,n,r){e.globalAlpha=.9,e.strokeStyle=t(`dim`),e.lineWidth=1.5,e.strokeRect(n-5,r-7,10,14),e.beginPath(),e.moveTo(n,r-7),e.lineTo(n,r+7),e.stroke()}#c(e,t,n,r,i){let a=Math.min(i/2,r/2);e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arc(t+r-a,n+a,a,-Math.PI/2,Math.PI/2),e.lineTo(t+a,n+i),e.arc(t+a,n+a,a,Math.PI/2,Math.PI*3/2),e.closePath()}},Zs=class{#e;constructor(e){this.#e=e}trace(e){let[t,n,r,i]=this.#e;e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.lineTo(r.x,r.y),e.lineTo(i.x,i.y),e.closePath()}at(e,t){let[n,r,i,a]=this.#e,o={x:n.x+(r.x-n.x)*e,y:n.y+(r.y-n.y)*e},s={x:a.x+(i.x-a.x)*e,y:a.y+(i.y-a.y)*e};return{x:o.x+(s.x-o.x)*t,y:o.y+(s.y-o.y)*t}}line(e,t,n){let r=this.at(t[0],t[1]),i=this.at(n[0],n[1]);e.moveTo(r.x,r.y),e.lineTo(i.x,i.y)}left(){return Math.min(this.#e[0].x,this.#e[1].x)}right(){return Math.max(this.#e[0].x,this.#e[1].x)}top(){return Math.min(this.#e[2].y,this.#e[3].y)}bottom(){return Math.max(this.#e[0].y,this.#e[1].y)}width(){return this.right()-this.left()}height(){return this.bottom()-this.top()}middle(){return{x:(this.left()+this.right())/2,y:(this.top()+this.bottom())/2}}},Qs=2.2,$s=2.4,ec=-.85,tc=.95,nc=.5,rc=6.5,ic=.32,ac=16,oc=class{#e;#t;#n;#r;#i;constructor(e){if(!(e.doors>=0))throw RangeError(`a hall has no fewer than no doors: ${String(e.doors)}`);this.#e=e.size,this.#t=e.view,this.#n=e.doors,this.#r=e.shape,this.#i=Math.min(e.size.width*.36,e.size.height*.46)}project(e,t,n){let r=Math.max(n,ic);return{x:this.#e.width/2+(e+this.#r.bend(r))/r*this.#i,y:this.#e.height*.42-t/r*this.#i}}fog(e){return Math.exp(-e/rc)}focal(){return this.#i}near(){return ic}far(){return this.#r.reach(this.endAhead(),ac)}endAhead(){return this.length()-this.#t}endInSight(){return this.endAhead()<=ac}endFace(){let e=this.endAhead();return new Zs([this.project(-1,ec,e),this.project(1,ec,e),this.project(1,tc,e),this.project(-1,tc,e)])}floor(){return ec}ceiling(){return tc}doorTop(){return nc}depths(){let e=this.far(),t=[];for(let n=ic;n<e;n+=n<3?.25:.6)t.push(n);return t.push(e),t}view(){return this.#t}length(){return(Math.ceil(this.#n/2)+1)*Qs}doorAt(e){return(Math.floor(e/2)+1)*Qs}sideOf(e){return e%2==1?1:-1}stopOf(e){return Math.max(0,this.doorAt(e)-$s)}lastStop(){return this.#n===0?0:this.stopOf(this.#n-1)}walks(){return this.#n>0}},sc=11,cc=6,lc=7,uc=3,dc=.5,fc=class{#e;#t;#n;#r;constructor(e){this.#e=e.child,this.#t=e.depth,this.#n=e.fog,this.#r=e.quad}child(){return this.#e}quad(){return this.#r}fog(){return this.#n}fartherFirst(e){return e.#t-this.#t}inReach(){return this.#t<sc&&this.#r.width()>cc}hit(){let e=this.#r;return{id:this.#e.id,x:e.left()-4,y:e.top()-18,width:e.width()+8,height:e.height()+22,anchor:e.middle()}}showsNumber(e){return this.#t<lc||e}word(){return this.#e.door?.words??``}showsWord(){return this.word()!==``&&this.#t<uc}faint(){return this.#n<dc}},N=class e{rest(){return 0}clamp(){return 0}pace(){return 0}settle(){return 0}landing(){return 0}drags(){return!1}dragRate(){return 0}along(){return 0}zooms(){return!0}stopOf(){}stopCount(){return 0}nearest(){}stepFrom(){}track(){return null}alongTrack(){return 0}equals(t){return t instanceof e}},pc=class e{#e;#t;#n;#r;#i;#a;#o;#s;#c;#l;#u;#d;#f;constructor(e){if(!(e.min<=e.max))throw RangeError(`a camera's range runs up: ${String(e.min)} to ${String(e.max)}`);this.#e=e.rest,this.#t=e.min,this.#n=e.max,this.#r=e.drag,this.#i=e.axis,this.#a=e.coast,this.#o=e.snap,this.#s=e.settle,this.#c=e.pace,this.#l=e.zoom,this.#u=[...e.stops].sort((e,t)=>e.at-t.at||e.id.localeCompare(t.id)),this.#d=this.#u.filter((e,t)=>this.#u[t-1]?.at!==e.at),this.#f=e.track}rest(){return this.#e}clamp(e){return Math.min(this.#n,Math.max(this.#t,e))}pace(e){return Math.min(this.#c.most,this.#c.base+this.#c.per*Math.sqrt(e))}settle(e){return this.#s.base+this.#s.per*Math.sqrt(e)}landing(e,t){let n=e+t*this.#a;return this.clamp(this.#o?Math.round(n):n)}drags(){return this.#r!==0}dragRate(){return this.#r}along(e){return this.#i===`y`?e.y:e.x}zooms(){return this.#l}stopOf(e){return this.#u.find(t=>t.id===e)?.at}stopCount(){return this.#d.length}nearest(e){let t;for(let[n,r]of this.#d.entries()){let i=Math.abs(r.at-e);(t===void 0||i<t.distance)&&(t={id:r.id,index:n,distance:i})}return t===void 0?void 0:{id:t.id,index:t.index}}stepFrom(e,t){let n=this.nearest(e);if(n!==void 0)return this.#d[Math.min(this.#d.length-1,Math.max(0,n.index+t))]}track(){return this.#f}alongTrack(e,t){let n=this.#f;if(n===null)return this.#e;let r=n.axis===`y`?(e.y-t.top)/Math.max(1,t.height):(e.x-t.left)/Math.max(1,t.width);return n.from+(n.to-n.from)*Math.min(1,Math.max(0,r))}equals(t){return t instanceof e&&this.#p()===t.#p()}#p(){return JSON.stringify([this.#e,this.#t,this.#n,this.#r,this.#i,this.#a,this.#o,this.#s.base,this.#s.per,this.#c.base,this.#c.per,this.#c.most,this.#l,this.#u.map(e=>{let t={id:e.id,at:e.at};return[t.id,t.at]}),this.#f===null?null:Object.values(this.#m(this.#f))])}#m(e){return{x:e.x,y:e.y,width:e.width,height:e.height,axis:e.axis,from:e.from,to:e.to}}},mc=-1/40,hc=.3,gc={base:560,per:0},_c={base:260,per:220,most:1500},vc=.45,yc=class{#e;constructor(e){this.#e=e}camera(e,t){let n=this.#t(e,t,0);return n.walks()?new pc({rest:0,min:0,max:n.lastStop(),drag:mc,axis:`y`,coast:hc,snap:!1,settle:gc,pace:_c,zoom:!0,stops:e.children.map((e,t)=>({id:e.id,at:n.stopOf(t)})),track:new Xs({size:t,hall:n}).track()}):new N}layout(e,t,n){return this.#n(e,t,n).filter(e=>e.inReach()).map(e=>e.hit()).reverse()}paint(e,t,n,r,i,a,o,s){let c=i/1e3;e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height);let l=this.#t(t,n,o);this.#r(e,r,l),this.#i(e,r,l),this.#a(e,r,l,c);let u=this.#e.halls[t.shape];l.endInSight()&&u.end(e,r,l.endFace(),l.fog(l.endAhead()),c),this.#e.glow.at(e,l.project(0,0,Math.min(l.far(),9)),l.focal()*.7,r(`ground`),.85);let d=s===``?t.children[0]?.id??``:s;for(let i of this.#n(t,n,o))this.#s(e,r,n,i,c,a,d);new Xs({size:n,hall:l}).draw(e,r,t.children.map(e=>({ink:this.#c(e),visited:e.visited})),this.#e.glow,u),e.globalAlpha=1}#t(e,t,n){return new oc({size:t,view:n,doors:e.children.length,shape:this.#e.halls[e.shape]})}#n(e,t,n){let r=this.#t(e,t,n),i=[];for(let[t,a]of e.children.entries()){let e=r.doorAt(t)-n+vc,o=e-2*vc;if(e<r.near()+.1||o>r.far())continue;let s=Math.max(o,r.near()+.05),c=r.sideOf(t);i.push(new fc({child:a,depth:s,fog:r.fog(s),quad:new Zs([r.project(c,r.floor(),s),r.project(c,r.floor(),e),r.project(c,r.doorTop(),e),r.project(c,r.doorTop(),s)])}))}return i.sort((e,t)=>e.fartherFirst(t))}#r(e,t,n){let r=n.depths();e.beginPath();for(let[t,i]of r.entries()){let r=n.project(-1,n.floor(),i);t===0?e.moveTo(r.x,r.y):e.lineTo(r.x,r.y)}for(let t of[...r].reverse()){let r=n.project(1,n.floor(),t);e.lineTo(r.x,r.y)}e.closePath(),e.globalAlpha=.7,e.fillStyle=t(`panel`),e.fill()}#i(e,t,n){let r=n.depths();e.strokeStyle=t(`cy`),e.lineWidth=1;for(let[t,i]of[[-1,n.floor()],[1,n.floor()],[-1,n.ceiling()],[1,n.ceiling()]])for(let a=1;a<r.length;a++){let o=n.project(t,i,r[a-1]??0),s=n.project(t,i,r[a]??0);e.globalAlpha=.45*n.fog(r[a]??0),e.beginPath(),e.moveTo(o.x,o.y),e.lineTo(s.x,s.y),e.stroke()}for(let t of this.#o(n)){let r=n.project(-1,n.floor(),t),i=n.project(1,n.floor(),t);e.globalAlpha=.13*n.fog(t),e.beginPath(),e.moveTo(r.x,r.y),e.lineTo(i.x,i.y),e.stroke()}}#a(e,t,n,r){for(let i of this.#o(n)){let a=Math.round(i+n.view());if(a%2!=0||.5+.5*Math.sin(r*7+a*3)<=.1)continue;let o=n.project(-.14,n.ceiling(),i),s=n.project(.14,n.ceiling(),i),c=n.fog(i),l=s.x-o.x;this.#e.glow.at(e,{x:(o.x+s.x)/2,y:o.y+4},l*1.4,t(`bc`),.22*c),e.globalAlpha=.7*c+.1,e.fillStyle=t(`bc`),e.fillRect(o.x,o.y,l,Math.max(1.5,3/i))}}#o(e){let t=[];for(let n=Math.ceil(e.view()+e.near());n<e.view()+e.far();n++)t.push(n-e.view());return t}#s(e,t,n,r,i,a,o){let s=r.child(),c=r.quad(),l=r.fog(),u=s.id===a,d=s.id===o,f=u||d,p=d?`yl`:`wh`,m=this.#l(s),h=this.#c(s);e.beginPath(),c.trace(e),e.globalAlpha=(u?.24:.1)*(.4+.6*l),e.fillStyle=t(h),e.fill(),e.globalAlpha=f?1:.25+.7*l,e.strokeStyle=t(f?p:h),e.lineWidth=f?2:1.2,e.stroke(),e.save(),e.clip(),e.beginPath(),this.#e.panels[m.family].trace(e,c),e.globalAlpha=.35*l,e.strokeStyle=t(h),e.lineWidth=1,e.stroke(),this.#e.marks[m.state].draw(e,t,{quad:c,ink:h,fog:l,key:s.address},i),e.restore();let g=c.middle();if(r.showsNumber(f)){let i=f?`${s.ordinal} · ${m.name}`:s.ordinal,a=f?p:r.faint()?`dim`:`text`;this.#u(e,t,n,i,{x:g.x,y:c.top()-11},a,f)}r.showsWord()&&this.#u(e,t,n,`‹${r.word()}›`,g,`dim`,!1),s.visited&&!d&&(e.globalAlpha=1,e.fillStyle=t(`yl`),e.beginPath(),e.arc(g.x,c.top()+8,2.5,0,Math.PI*2),e.fill())}#c(e){return e.sealed?`dim`:this.#e.inks.ink(this.#l(e).state)}#l(e){let t=e.door?.look;return t===void 0?{family:`plain`,state:`plain`,name:e.name}:{family:t.family(),state:t.stateLook(),name:t.material()}}#u(e,t,n,r,i,a,o){e.font=this.#e.font.of(o?`bold`:`regular`),e.textAlign=`center`,e.textBaseline=`middle`;let s=e.measureText(r).width,c=Math.min(Math.max(i.x,6+s/2),Math.max(6+s/2,n.width-6-s/2)),l=Math.min(Math.max(i.y,12),Math.max(12,n.height-12));e.globalAlpha=.72,e.fillStyle=t(`ground`),e.fillRect(c-s/2-4,l-9,s+8,18),e.globalAlpha=1,e.fillStyle=t(a),e.fillText(r,c,l)}},bc=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}bend(e){return .03*e*e}reach(e,t){return this.#t.of(e,t)}end(e,t,n,r){this.#e.draw(e,t,n,r)}mark(e,t,n){e.globalAlpha=.9,e.strokeStyle=t(`cy`),e.lineWidth=2,e.beginPath(),e.arc(n.x-10,n.y+8,14,-Math.PI/2,0),e.stroke()}},xc={frost:`bl`,cold:`bl`,static:`mg`,plain:`cy`},Sc=class{ink(e){return xc[e]}},Cc=class{of(e,t){return Math.min(e,t)}},wc=class{draw(e,t,n,r){e.beginPath(),n.trace(e),e.globalAlpha=1,e.fillStyle=t(`panel`),e.fill(),e.globalAlpha=.5*r+.1,e.strokeStyle=t(`cy`),e.lineWidth=1,e.stroke()}},Tc=40,Ec=class{#e;constructor(e){this.#e=e}draw(e,t,n,r){let{quad:i,fog:a,key:o}=n;e.fillStyle=t(`wh`);for(let t=0;t<Tc;t++)e.globalAlpha=(.15+.35*this.#e.fraction(`frost/${o}`,t*3+2)*(.6+.4*Math.sin(r*2+t)))*a,e.fillRect(i.left()+this.#e.fraction(`frost/${o}`,t*3)*i.width(),i.top()+this.#e.fraction(`frost/${o}`,t*3+1)*i.height(),1.5,1.5)}},Dc=class{trace(e,t){t.line(e,[.2,.3],[.55,.85]),t.line(e,[.4,.25],[.6,.55])}},Oc=class{bend(){return 0}reach(e,t){return t}end(){}mark(e,t,n){e.fillStyle=t(`cy`);for(let t=0;t<3;t++)e.globalAlpha=.9-t*.3,e.fillRect(n.x-10+t*8,n.y-1.5,3,3)}},kc=class{trace(e,t){for(let n of[.33,.66]){t.line(e,[0,n],[1,n]);for(let r of[.2,.5,.8])t.line(e,[r,n+.05],[r,n+.08])}}},Ac=class{#e;#t=new Set;#n;constructor(e){this.#e=e}subscribe(e){return this.#t.add(e),this.#n===void 0&&this.#r(),()=>{this.#t.delete(e),this.#t.size===0&&this.#n!==void 0&&(this.#e.cancel(this.#n),this.#n=void 0)}}now(){return this.#e.now()}#r(){this.#n=this.#e.request(e=>{this.#i(e)})}#i(e){if(this.#n=void 0,this.#t.size!==0){this.#r();for(let t of[...this.#t])this.#t.has(t)&&t(e)}}},jc=class{draw(){}},Mc=class{trace(){}},Nc=class{fraction(e,t){let n=2166136261,r=`${e}/${String(t)}`;for(let e=0;e<r.length;e++)n^=r.charCodeAt(e),n=Math.imul(n,16777619);return n^=n>>>15,n=Math.imul(n,739982445),n^=n>>>12,(n>>>0)/4294967296}},Pc=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}bend(){return 0}reach(e,t){return this.#t.of(e,t)}end(e,t,n,r){this.#e.draw(e,t,n,r)}mark(e,t,n){e.globalAlpha=.9,e.fillStyle=t(`cy`),e.fillRect(n.x-1.5,n.y-9,3,18)}},Fc=1e4,Ic=class{at(e,t,n,r,i){if(n<=0||i<=0)return;let a=e.getTransform().a;e.globalAlpha=Math.min(1,i),e.fillStyle=r,e.shadowColor=r,e.shadowBlur=n*.6*a,e.shadowOffsetX=Fc*a,e.beginPath(),e.arc(t.x-Fc,t.y,n*.6,0,Math.PI*2),e.fill(),e.shadowBlur=0,e.shadowOffsetX=0}},Lc=90,Rc=12,zc=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}bend(){return 0}reach(e,t){return this.#t.of(e,t)}end(e,t,n,r,i){let a=`static/${String(Math.floor(i*Rc))}`;e.fillStyle=t(`mg`);for(let t=0;t<Lc;t++)e.globalAlpha=(.25+.6*this.#e.fraction(a,t*3+2))*r,e.fillRect(n.left()+this.#e.fraction(a,t*3)*n.width(),n.top()+this.#e.fraction(a,t*3+1)*n.height(),2,2)}mark(e,t,n){e.fillStyle=t(`mg`),e.globalAlpha=.9;for(let t=0;t<7;t++)e.fillRect(n.x-10+this.#e.fraction(`static-mark`,t*2)*20,n.y-8+this.#e.fraction(`static-mark`,t*2+1)*16,2,2)}},Bc=14,Vc=class{draw(e,t,n,r){let{quad:i,fog:a,ink:o}=n;e.fillStyle=t(o),e.globalAlpha=.25*a;let s=Math.max(1,i.height());for(let t=0;t<Bc;t++)e.fillRect(i.left(),i.top()+(t*17+r*90)%s,i.width(),1)}},Hc=class{trace(e,t){for(let n of[.25,.5,.75])t.line(e,[0,n],[1,n]);for(let[n,r]of[[0,[.5]],[1,[.25,.75]],[2,[.5]],[3,[.25,.75]]])for(let i of r)t.line(e,[i,n*.25],[i,(n+1)*.25])}},Uc=class{trace(e,t){for(let n of[.25,.5,.75])t.line(e,[n,0],[n,1])}},Wc=class{#e;constructor(e){this.#e=new Map(Object.entries(e))}picture(e){return this.#e.get(e)}},Gc=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.to,this.#n=e.lift}trace(e,t){let n=t.origin+t.span*this.#e,r=t.origin+t.span*this.#t,i=t.base-t.rise*this.#n;e.moveTo(n,t.base),e.lineTo(n,i),e.lineTo(r,i),e.lineTo(r,t.base)}},Kc=class{#e;#t;constructor(e){this.#e=e.at,this.#t=e.lift}trace(e,t){let n=t.origin+t.span*this.#e;e.moveTo(n,t.base),e.lineTo(n,t.base-t.rise*this.#t)}},qc=class{trace(){}},Jc=class{#e;#t;#n;#r;constructor(e){this.#e=e.from,this.#t=e.to,this.#n=e.lift,this.#r=e.ceiling}trace(e,t){e.moveTo(t.origin+t.span*this.#e,t.base),e.lineTo(t.middle,Math.max(this.#r,t.base-t.rise*this.#n)),e.lineTo(t.origin+t.span*this.#t,t.base)}},Yc=class{#e=new Nc;of(e,t){if(t)return`peak`;let n=this.#e.fraction(e,0);return n<.4?`mast`:n<.7?`box`:`flat`}},Xc=16,Zc=.8,Qc=.1,$c=.95,el=.55,tl=50,nl=100,rl=.62,il=14,al=4,ol=40,sl=class{#e=new Nc;#t=new M;#n=new Yc;#r={peak:new Jc({from:.2,to:.8,lift:1,ceiling:-1/0}),mast:new Kc({at:.7,lift:.7}),box:new Gc({from:.25,to:.75,lift:.4}),flat:new qc};camera(){return new N}layout(e,t){return this.#i(e,t).map(e=>{let t=e.base-e.height,n=Math.max(0,t-e.roof-2);return{id:e.child.id,x:e.middle-e.slot/2+1,y:n,width:e.slot-2,height:e.base+Xc-n,anchor:{x:e.middle,y:t+e.height/2}}})}paint(e,t,n,r,i,a){let o=i/1e3,{width:s,height:c}=n;e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,s,c),this.#c(e,n,r,o),this.#l(e,n,r,o);for(let i of this.#i(t,n))this.#a(e,i,r,o,a);this.#s(e,n,r,o),e.globalAlpha=1}#i(e,t){let n=t.width/(e.children.length+.6),r=t.height*Zc,i=r-t.height*Qc;return e.children.map((e,t)=>{let a=n*rl,o=Math.min(a*.45,12),s=Math.min(Math.max(e.floors,0),nl);return{child:e,slot:n,middle:n*(.8+t),base:r,width:a,height:(i-o)*(.3+.68*Math.sqrt(s/nl)),roof:o}})}#a(e,t,n,r,i){let{child:a,middle:o,base:s,width:c,height:l,roof:u}=t,d=o-c/2,f=s-l,p=a.id===i,m=a.sealed?.45:1;e.fillStyle=n(p?`rule-hi`:`rule`),e.globalAlpha=p?1:.85*m,e.fillRect(d,f,c,l),this.#o(e,t,n,r,m),e.strokeStyle=n(p?`yl`:a.sealed?`dim`:`frame`),e.globalAlpha=p?1:.6*m,e.lineWidth=p?1.8:1,e.beginPath(),e.moveTo(d,s),e.lineTo(d,f),e.lineTo(d+c,f),e.lineTo(d+c,s),this.#r[this.#n.of(a.address,a.landmark)].trace(e,{base:f,rise:u,origin:d,span:c,middle:o,left:d,right:d+c}),e.stroke(),a.landmark&&(e.strokeStyle=n(`yl`),e.globalAlpha=.75*m,e.lineWidth=1,e.beginPath(),e.arc(o,f-u*.3,c*.62,0,Math.PI*2),e.stroke()),a.visited&&(e.fillStyle=n(`yl`),e.globalAlpha=1,e.beginPath(),e.arc(d+c-4,f+4,2.5,0,Math.PI*2),e.fill()),e.font=this.#t.of(p?`bold`:`regular`),e.textAlign=`center`,e.textBaseline=`top`,e.fillStyle=n(p?`yl`:a.sealed?`dim`:`text`),e.globalAlpha=1,e.fillText(a.ordinal,o,s+2)}#o(e,t,n,r,i){let{child:a,middle:o,base:s,width:c,height:l}=t,u=a.doors===0?3:Math.min(Math.max(a.doors,2),al),d=Math.min(Math.max(a.floors,3),il),f=c/(u*2+1),p=l/(d*2+1),m=o-c/2,h=s-l,g=n(`text`),_=n(`yl`);for(let t=0;t<d;t++)for(let n=0;n<u;n++){let o=t*u+n+1,s=this.#e.fraction(a.address,o);if(s<.35)continue;let c=this.#e.fraction(a.address,-o),l=.55+.45*Math.sin(r*c*3+c*20),d=s>.85;e.fillStyle=d?_:g,e.globalAlpha=(d?.6:.22)*l*i,e.fillRect(m+f*(1+n*2),h+p*(1+t*2),f,p)}}#s(e,t,n,r){let i=t.height*Zc;e.strokeStyle=n(`frame`),e.globalAlpha=.5,e.lineWidth=1,e.beginPath(),e.moveTo(0,i+.5),e.lineTo(t.width,i+.5),e.stroke();let a=t.height*$c,o=r*20%26;e.strokeStyle=n(`yl`),e.globalAlpha=.35,e.beginPath();for(let n=o-26;n<t.width;n+=26)e.moveTo(n,a),e.lineTo(n+14,a);e.stroke()}#c(e,t,n,r){let i=n(`text`),a=n(`yl`);for(let n=0;n<tl;n++){let o=this.#e.fraction(`star-x`,n)*t.width,s=this.#e.fraction(`star-y`,n)*t.height*el,c=this.#e.fraction(`star-big`,n)<.07,l=.5+this.#e.fraction(`star-pace`,n)*1.8,u=this.#e.fraction(`star-phase`,n)*6,d=this.#e.fraction(`star-glow`,n);e.fillStyle=this.#e.fraction(`star-warm`,n)<.14?a:i,e.globalAlpha=.45*(.2+.7*d*(.55+.45*Math.sin(r*l+u))),e.fillRect(o,s,c?1.8:1,c?1.8:1)}}#l(e,t,n,r){e.strokeStyle=n(`dim`),e.globalAlpha=.3,e.lineWidth=1,e.beginPath();for(let n=0;n<ol;n++){let i=(this.#e.fraction(`rain`,n)*t.width+r*30*(1+n%3))%t.width,a=(n*53+r*260)%(t.height*1.1)-t.height*.1;e.moveTo(i,a),e.lineTo(i-2,a+9)}e.stroke()}},cl=class{bow(e){return e*.16}reach(e,t){return t}wall(){}tail(){}},ll=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.even,this.#t=e.odd,this.#n=e.ground,this.#r=e.number,this.#i=e.tick}alpha(e){return e%2==0?this.#e:this.#t}ground(){return this.#n}number(){return this.#r}tick(){return this.#i}},ul=class{bow(){return 0}reach(e,t){return t}wall(){}tail(){}},dl=class{trace(e,t){e.moveTo(t.left,t.base-3),e.lineTo(t.right,t.base-3)}},fl=.08,pl=class{of(e,t){return t-(t-e)*fl}},ml=class{#e=new pl;bow(){return 0}reach(e,t){return this.#e.of(e,t)}wall(e,t,n){e.moveTo(t,n-5),e.lineTo(t,n+5)}tail(){}},hl=class{#e=new pl;bow(){return 0}reach(e,t){return this.#e.of(e,t)}wall(){}tail(e,t,n,r){e.fillStyle=t(`mg`),e.globalAlpha=.6;for(let t=1;t<=3;t++)e.fillRect(n+t*3,r-.5,1.5,1.5)}},gl=50,_l=4,vl=11,yl=46,bl=58,xl=66,Sl=20,Cl=58,wl=16,Tl={base:320,per:230,most:2400},El={base:380,per:40},Dl=.22,Ol=class{#e=new Nc;#t=new M;#n=new Yc;#r=new Sc;#i={long:new ul,service:new ml,curved:new cl,static:new hl,none:new ul};#a={floor:new ll({even:.5,odd:.35,ground:`rule`,number:`text`,tick:`dim`}),layer:new ll({even:.1,odd:.1,ground:`rd`,number:`rd`,tick:`rd`})};#o={peak:new Jc({from:-.18,to:.18,lift:1.6,ceiling:4}),mast:new Kc({at:.2,lift:1}),box:new Gc({from:-.15,to:.15,lift:.5}),flat:new dl};camera(e,t){let n=this.#s(e,t,e.tower?.car??0);if(n===void 0)return new N;let r=e.children.flatMap(e=>e.level===null?[]:[{id:e.id,at:e.level.number()}]);return new pc({rest:n.tower.car,min:n.min,max:n.max,drag:r.length===0?0:1/n.row,axis:`y`,coast:Dl,snap:!0,settle:El,pace:Tl,zoom:!1,stops:r,track:n.gauge?{x:t.width-Cl-4,y:n.top,width:Cl,height:n.bottom-n.top,axis:`y`,from:n.max,to:n.min}:null})}layout(e,t,n){let r=this.#s(e,t,n);if(r===void 0)return[];let i=[];for(let t of this.#c(r)){let n=this.#u(e,t);if(n===void 0)continue;let a=this.#l(r,t),o=Math.max(r.top,a),s=Math.min(r.bottom,a+r.row)-o;s<=4||i.push({id:n.id,x:r.left-36,y:o,width:r.width+36,height:s,anchor:{x:r.middle,y:o+s/2}})}return i}paint(e,t,n,r,i,a,o){e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height);let s=this.#s(t,n,o);if(s===void 0)return;let c=i/1e3;this.#p(e,s,r),this.#m(e,s,n,r),e.save(),e.beginPath(),e.rect(0,s.top,n.width,s.bottom-s.top),e.clip();for(let n of this.#c(s))this.#g(e,t,s,n,r,c,a);this.#y(e,s,r),this.#b(e,s,r,o),e.restore(),e.globalAlpha=.8,e.strokeStyle=r(`cy`),e.lineWidth=1.2,e.strokeRect(s.left+.5,s.top+.5,s.width,s.bottom-s.top),e.beginPath(),e.moveTo(s.inner+.5,s.top),e.lineTo(s.inner+.5,s.bottom),e.stroke(),s.gauge&&this.#x(e,t,s,n,r,o),e.globalAlpha=1}#s(e,t,n){let r=e.tower;if(r===null||r.rows.length===0)return;let i=new Map(r.rows.map(e=>[e.level.number(),e])),a=Math.min(...i.keys()),o=Math.max(...i.keys()),s=o-a+1,c=Math.max(t.height*.1,52),l=t.height-Math.max(t.height*.09,38),u=Math.min(s,Math.min(vl,Math.max(_l,Math.floor((l-c)/gl)))),d=(l-c)/u,f=e.children.length>0,p=t.width-yl-(f?xl:Sl),m=Math.min(bl,p*.13),h=yl+m,g=Math.min(Math.max(Math.min(Math.max(n,a),o)-(u-1)/2,a),o-u+1);return{tower:r,rows:i,top:c,bottom:l,visible:u,row:d,left:yl,width:p,shaft:m,inner:h,middle:h+(p-m)/2,min:a,max:o,base:g,gauge:f}}#c(e){let t=Math.max(e.min,Math.floor(e.base)),n=Math.min(e.max,Math.ceil(e.base+e.visible-1));return Array.from({length:Math.max(0,n-t+1)},(e,n)=>t+n)}#l(e,t){return e.bottom-(t-e.base+1)*e.row}#u(e,t){return e.children.find(e=>e.level?.number()===t)}#d(e,t){return this.#a[e.rows.get(t)?.level.kind()??`floor`]}#f(e,t){return e.rows.get(t)?.level.label()??``}#p(e,t,n){if(t.base<t.max-t.visible+1-.01){this.#h(e,`▲ ${String(Math.ceil(t.max-(t.base+t.visible-1)))}`,t.middle,t.top-16,n);return}let r=this.#l(t,t.max),i=Math.min(t.width*.2,(r-6)*.8);if(i<=4)return;let{middle:a,width:o}=t;e.globalAlpha=.6,e.strokeStyle=n(`cy`),e.lineWidth=1.2,e.beginPath(),this.#o[this.#n.of(t.tower.address,t.tower.landmark)].trace(e,{base:r,rise:i,origin:a,span:o,middle:a,left:t.inner,right:t.left+o}),e.stroke(),e.globalAlpha=1}#m(e,t,n,r){if(t.base>t.min+.01){this.#h(e,`▼ ${String(Math.ceil(t.base-t.min))}`,t.middle,t.bottom+16,r);return}let{left:i,width:a,bottom:o}=t;e.globalAlpha=.06,e.fillStyle=r(`rd`),e.fillRect(i,o,a,n.height-o),e.globalAlpha=.3,e.strokeStyle=r(`rd`),e.lineWidth=1,e.beginPath();for(let t=i;t<i+a;t+=10)e.moveTo(t,o+2),e.lineTo(Math.min(t+8,i+a),n.height);e.stroke(),e.globalAlpha=1}#h(e,t,n,r,i){e.globalAlpha=1,e.font=this.#t.of(`regular`),e.textAlign=`center`,e.textBaseline=`middle`,e.fillStyle=i(`dim`),e.fillText(t,n,r)}#g(e,t,n,r,i,a,o){let{left:s,width:c,inner:l,shaft:u,row:d}=n,f=this.#l(n,r),p=this.#u(t,r),m=p?.id===o,h=this.#d(n,r);e.globalAlpha=m?1:h.alpha(r),e.fillStyle=i(m?`rule-hi`:h.ground()),e.fillRect(l,f,c-u,d),e.globalAlpha=.35,e.strokeStyle=i(`cy`),e.lineWidth=1,e.beginPath(),e.moveTo(s,f+d+.5),e.lineTo(s+c,f+d+.5),e.stroke(),this.#_(e,n,r,f,i,a),this.#v(e,n,r,f,i),m&&(e.globalAlpha=1,e.strokeStyle=i(`yl`),e.lineWidth=1.5,e.strokeRect(l+.5,f+.5,c-u-1,d)),e.globalAlpha=1,e.font=this.#t.of(m?`bold`:`regular`),e.textAlign=`right`,e.textBaseline=`middle`,e.fillStyle=i(m||p?.visited===!0?`yl`:h.number()),e.fillText(this.#f(n,r),s-8,f+d/2)}#_(e,t,n,r,i,a){let o=t.width-t.shaft,s=Math.min(10,Math.max(4,Math.round(o/66))),c=o/s,l=r+t.row*.14,u=t.row*.4,d=`${t.tower.address}/${String(n)}`;for(let n=0;n<s;n++){let r=this.#e.fraction(d,n),o=t.inner+c*n;if(e.globalAlpha=.13,e.strokeStyle=i(`cy`),e.strokeRect(o+4.5,l+.5,c-9,u),r<=.45)continue;let s=r>.9;e.globalAlpha=(.1+.08*Math.sin(a*1.3+r*40))*(s?2.6:1),e.fillStyle=i(s?`yl`:`cy`),e.fillRect(o+6,l+2,c-12,u-3)}}#v(e,t,n,r,i){let a=t.rows.get(n),o=this.#i[a?.shape??`none`],s=a?.looks??[],c=r+t.row*.76,l=o.bow(t.row),u=t.inner+10,d=t.left+t.width-12,f=o.reach(u,d),p=e=>({x:u+(f-u)*e,y:c-l*4*e*(1-e)});e.globalAlpha=.45,e.strokeStyle=i(`cy`),e.lineWidth=1,e.beginPath();for(let t=0;t<=16;t++){let n=p(t/16);t===0?e.moveTo(n.x,n.y):e.lineTo(n.x,n.y)}o.wall(e,f,c),e.stroke(),o.tail(e,i,f,c);let m=Math.ceil(s.length/2);for(let[t,n]of s.entries()){let r=p((Math.floor(t/2)+.5)/m);e.globalAlpha=.8,e.fillStyle=i(this.#r.ink(n.stateLook())),e.fillRect(r.x-1,t%2==1?r.y+1:r.y-5,2,4)}}#y(e,t,n){let r=[...t.rows.values()].filter(e=>!e.level.belowBedrock());if(r.length===t.rows.size)return;let i=this.#l(t,Math.min(...r.map(e=>e.level.number())))+t.row;i<t.top||i>t.bottom||(e.globalAlpha=.7,e.strokeStyle=n(`rd`),e.lineWidth=1.5,e.setLineDash([6,5]),e.beginPath(),e.moveTo(t.left,i),e.lineTo(t.left+t.width,i),e.stroke(),e.setLineDash([]))}#b(e,t,n,r){let{left:i,shaft:a,top:o,bottom:s,row:c}=t;e.globalAlpha=1,e.fillStyle=n(`ground`),e.fillRect(i,o,a,s-o),e.globalAlpha=.18,e.strokeStyle=n(`cy`),e.beginPath();for(let n of this.#c(t)){let r=this.#l(t,n)+c+.5;e.moveTo(i,r),e.lineTo(i+a,r)}e.stroke();let l=this.#l(t,Math.min(Math.max(r,t.min),t.max));e.globalAlpha=.7,e.strokeStyle=n(`yl`),e.lineWidth=1.5,e.beginPath(),e.moveTo(i+a/2,o),e.lineTo(i+a/2,l+3),e.stroke(),e.globalAlpha=.88,e.fillStyle=n(`yl`),e.fillRect(i+4,l+3,a-8,c-6),e.globalAlpha=1,e.fillStyle=n(`ground`),e.fillRect(i+a/2-.75,l+6,1.5,c-12)}#x(e,t,n,r,i,a){let{top:o,bottom:s,min:c,max:l}=n,u=r.width-Cl-4+Cl-18,d=l-c,f=e=>d===0?o:o+(l-e)/d*(s-o);e.globalAlpha=.35,e.fillStyle=i(`cy`),e.fillRect(u,o,2,s-o);let p=d+1,m=p>40?10:p>14?5:2,h=d===0||(s-o)*m/d>=wl,g=new Set([l]);for(let e=c===0?0:Math.ceil(c/m)*m;e<=l;e+=m)g.add(e);e.font=this.#t.of(`regular`),e.textAlign=`right`,e.textBaseline=`middle`;for(let t of g)e.globalAlpha=1,e.fillStyle=i(`rule-hi`),e.fillRect(u-4,f(t),10,1),h&&(e.fillStyle=i(this.#d(n,t).tick()),e.fillText(this.#f(n,t),u-8,f(t)));e.fillStyle=i(`yl`),e.globalAlpha=.85;for(let n of t.children)n.visited&&n.level!==null&&e.fillRect(u-6,f(n.level.number())-1,14,2);let _=f(Math.min(l,n.base+n.visible-1)),ee=f(n.base);e.globalAlpha=.14,e.fillStyle=i(`cy`),e.fillRect(u-10,_,22,Math.max(22,ee-_)),e.globalAlpha=1,e.strokeStyle=i(`cy`),e.lineWidth=1,e.strokeRect(u-10,_,22,Math.max(22,ee-_));let te=f(Math.min(Math.max(a,c),l));e.fillStyle=i(`yl`),e.beginPath(),e.moveTo(u-20,te-5),e.lineTo(u-12,te),e.lineTo(u-20,te+5),e.closePath(),e.fill()}},kl=`default`,Al=`abyssal`,jl=class{of(e){return e===null?kl:e.abyssal?Al:e.frame??kl}},Ml=`buffer`,Nl=`▲ `,Pl=10,Fl=`█`,Il=`░`,Ll={stable:`STABLE`,shifting:`SHIFTING`},Rl={text:`[RESONANT]`,label:`Resonant`},zl=class{#e=new jl;#t;constructor(e){this.#t=e}accepts(e){return e.prompt?.id===Ml}toViewModel(e){let t=e.prompt,n=e.buffer;if(t?.id!==Ml||n===null)throw Error(`BufferPresenter needs the buffer prompt`);let r=e=>String(e).padStart(2,`0`),i=t.figures.selected??``,a=`[QUANTUM_TRACE_BUFFER_SYNC...]`,o=n.fragments.map((t,n)=>{let a=String(n+1),o=i===String(n),s=t.hertz%2==0,c=Math.floor(t.hertz%100/10)+1;return{key:t.key,ordinal:r(n+1),hertz:`${String(t.hertz)}Hz`,bar:Fl.repeat(c)+Il.repeat(Pl-c),phase:s?Ll.stable:Ll.shifting,phaseKey:s?`stable`:`shifting`,name:t.name,badge:t.resonant?Rl:null,selected:o,selectedLabel:o?`Selected`:``,actions:e.options.filter(e=>(e.role===`pick`||e.role===`drop`)&&e.ordinal===a).map(e=>this.#n(e))}}),s=e.options.filter(e=>e.role===`return`).map(e=>this.#r(e));return{scene:Ml,title:this.#t.name(),frame:this.#e.of(e.place),heading:a,count:{label:`TRACE_BUFFER`,value:`${r(n.size)}/${r(n.capacity)} FRAGMENTS`},tally:{label:`RESONANT_TRACES`,value:String(n.resonant)},empty:o.length===0?`(No spectral traces detected in local buffer)`:``,rows:o,hint:`Select one fragment, then another: they merge into a hybrid and give 15 Coherence back.`,sync:`SYNC_STATUS: NOMINAL`,dock:s,options:[...o.flatMap(e=>e.actions),...s],note:e.message,status:e.message===``?a:e.message,build:this.#t.buildLine(),regions:{buffer:`Quantum trace buffer`,actions:`Back`}}}#n(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:``}}#r(e){return{...this.#n(e),label:`${Nl}${e.label.toUpperCase()}`}}},Bl=globalThis,Vl=e=>e,Hl=Bl.trustedTypes,Ul=Hl?Hl.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Wl=`$lit$`,P=`lit$${Math.random().toFixed(9).slice(2)}$`,Gl=`?`+P,Kl=`<${Gl}>`,F=document,I=()=>F.createComment(``),L=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ql=Array.isArray,Jl=e=>ql(e)||typeof e?.[Symbol.iterator]==`function`,Yl=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xl=/-->/g,Zl=/>/g,z=RegExp(`>|${Yl}(?:([^\\s"'>=/]+)(${Yl}*=${Yl}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Ql=/'/g,$l=/"/g,eu=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),V=Symbol.for(`lit-noChange`),H=Symbol.for(`lit-nothing`),tu=new WeakMap,U=F.createTreeWalker(F,129);function nu(e,t){if(!ql(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Ul===void 0?t:Ul.createHTML(t)}var ru=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=R;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===R?c[1]===`!--`?o=Xl:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=z):(eu.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=z):o=Zl:o===z?c[0]===`>`?(o=i??R,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?z:c[3]===`"`?$l:Ql):o===$l||o===Ql?o=z:o===Xl||o===Zl?o=R:(o=z,i=void 0);let d=o===z&&e[t+1].startsWith(`/>`)?` `:``;a+=o===R?n+Kl:l>=0?(r.push(s),n.slice(0,l)+Wl+n.slice(l)+P+d):n+P+(l===-2?t:d)}return[nu(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},iu=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ru(t,n);if(this.el=e.createElement(l,r),U.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=U.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(Wl)){let t=u[o++],n=i.getAttribute(e).split(P),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?cu:r[1]===`?`?lu:r[1]===`@`?uu:su}),i.removeAttribute(e)}else e.startsWith(P)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(eu.test(i.tagName)){let e=i.textContent.split(P),t=e.length-1;if(t>0){i.textContent=Hl?Hl.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],I()),U.nextNode(),c.push({type:2,index:++a});i.append(e[t],I())}}}else if(i.nodeType===8){if(i.data===Gl)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(P,e+1))!==-1;)c.push({type:7,index:a}),e+=P.length-1}}a++}}static createElement(e,t){let n=F.createElement(`template`);return n.innerHTML=e,n}};function W(e,t,n=e,r){if(t===V)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=L(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=W(e,i._$AS(e,t.values),i,r)),t}var au=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??F).importNode(t,!0);U.currentNode=r;let i=U.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new ou(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new du(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=U.nextNode(),a++)}return U.currentNode=F,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},ou=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),L(e)?e===H||e==null||e===``?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==V&&this._(e):e._$litType$===void 0?e.nodeType===void 0?Jl(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==H&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=iu.createElement(nu(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new au(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=tu.get(e.strings);return t===void 0&&tu.set(e.strings,t=new iu(e)),t}k(t){ql(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(I()),this.O(I()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=Vl(e).nextSibling;Vl(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},su=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=H}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=W(this,e,t,0),a=!L(e)||e!==this._$AH&&e!==V,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=W(this,r[n+o],t,o),s===V&&(s=this._$AH[o]),a||=!L(s)||s!==this._$AH[o],s===H?e=H:e!==H&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},cu=class extends su{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}},lu=class extends su{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==H)}},uu=class extends su{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=W(this,e,t,0)??H)===V)return;let n=this._$AH,r=e===H&&n!==H||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==H&&(n===H||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},du=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}},fu={M:Wl,P,A:Gl,C:1,L:ru,R:au,D:Jl,V:W,I:ou,H:su,N:lu,U:uu,B:cu,F:du},pu=Bl.litHtmlPolyfillSupport;pu?.(iu,ou),(Bl.litHtmlVersions??=[]).push(`3.3.3`);var G=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new ou(t.insertBefore(I(),e),e,void 0,n??{})}return i._$AI(e),i},mu={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},hu=e=>(...t)=>({_$litDirective$:e,values:t}),gu=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:_u}=fu,vu=e=>e,yu=()=>document.createComment(``),bu=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new _u(r.insertBefore(yu(),i),r.insertBefore(yu(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=vu(e).nextSibling;vu(r).insertBefore(e,i),e=t}}}return n},K=(e,t,n=e)=>(e._$AI(t,n),e),xu={},Su=(e,t=xu)=>e._$AH=t,Cu=e=>e._$AH,wu=e=>{e._$AR(),e._$AA.remove()},Tu=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},q=hu(class extends gu{constructor(e){if(super(e),e.type!==mu.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Cu(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=K(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=K(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=K(i[d],a[m]),bu(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=K(i[f],a[p]),bu(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Tu(o,p,m),u=Tu(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=bu(e,i[d]);K(t,a[p]),c[p]=t}else c[p]=K(n,a[p]),bu(e,i[d],n),i[t]=null;p++}else wu(i[f]),f--}else wu(i[d]),d++;for(;p<=m;){let t=bu(e,c[m+1]);K(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&wu(e)}return this.ut=o,Su(e,c),V}}),Eu=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`BufferView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(H,this.#e),this.#e=void 0}#t(e){return B`
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
                  ${q(e.rows,e=>`${e.ordinal}/${e.key}`,e=>B`
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
                          ${q(e.actions,e=>e.id,e=>this.#n(e,`pb fb`))}
                        </p>
                      </li>
                    `)}
                </ol>`}
          <p class="hint">${e.hint}</p>
          <p class="tl">${e.sync}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="dock" aria-label=${e.regions.actions}>
          ${q(e.dock,e=>e.id,e=>this.#n(e,`pb`))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e,t){return B`
      <button type="button" class=${t} data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Du=`help`,Ou=`▲ `,ku=class{#e=new jl;#t;constructor(e){this.#t=e}accepts(e){return e.prompt?.id===Du}toViewModel(e){if(e.prompt?.id!==Du)throw Error(`HelpPresenter needs the help prompt`);let t=`[OPERATOR_MANUAL]`,n=e.options.filter(e=>e.role===`return`).map(e=>this.#n(e));return{scene:Du,title:this.#t.name(),frame:this.#e.of(e.place),heading:t,lead:`You are a traveller in an endless lattice of places. Every tap is a prompt; every prompt costs Coherence. Go deep, take what resonates, and come back before the link fails.`,sections:[{heading:`MOVING`,entries:[{term:`A listed place`,what:`Tap it to enter. The list is what lies one level down.`},{term:`▲ LEAVE`,what:`Back up one level, to the place you came from.`},{term:`GO UP · GO DOWN`,what:`Ride a building’s elevator one floor. The top and the ground floor drop one of them.`},{term:`ENTER CORRIDOR · BACK TO ELEVATOR`,what:`The corridor lists the floor’s doors; a door opens an apartment’s first room.`},{term:`GO FORWARD · GO BACK`,what:`Walk an apartment’s rooms. Only the first room has EXIT APARTMENT.`},{term:`An object`,what:`Tap one in a room to take it into the buffer. Sixteen fit; the tiles stop being buttons when it is full.`}]},{heading:`THE DOCK`,entries:[{term:`SCAN`,what:`What is behind the doors, which floors are near you, or the rooms of the apartment. Costs 1, no step.`},{term:`MAP`,what:`Draws the places you can enter from here, you at the centre; dim is unvisited. Nothing inside a room. Costs 1.`},{term:`BUFFER`,what:`Your inventory. Select one fragment, then another: they merge into a hybrid and give 15 Coherence back. In a room, drop one where you stand. Costs 1 to open; nothing inside.`},{term:`TRACE`,what:`Your whole path from the universe down to here. Costs 1.`},{term:`HELP`,what:`This screen. Costs 1.`},{term:`TITLE SCREEN`,what:`Back to the title; the world waits behind CONTINUE. Costs 1.`},{term:`END SESSION`,what:`The recap of this run: where you are, your steps, your places, your buffer. RESUME comes back; ending it goes to the title with the place kept.`},{term:`MORE`,what:`On a phone, the rest of the dock. It folds again after the next tap.`}]}],survival:{heading:`HOW NOT TO DIE`,lines:[`Every tap costs 1 Coherence before anything else happens — a move, a scan, the buffer. A place whose era is entropic costs 2, anywhere below a building’s bedrock costs 2, both at once 4.`,`Only a merge gives it back: 15, capped at 100. Nothing else does.`,`Under 40 the room text starts to corrupt. Under 30 the bar is red and the map sprouts X marks, more as you drop.`,`At 0 the link fails: the world is rebuilt from the same seed and you wake on the starting street with 100. You keep your buffer, your step count and your visited places; everything that lived inside the world is undone.`,`A capture whose frequency is a multiple of 11 resonates and counts on your tally, once. A Keystone never does.`]},keys:`On a keyboard, the letter on a button is its key. A phone needs none.`,dock:n,options:n,note:e.message,status:e.message===``?t:e.message,build:this.#t.buildLine(),regions:{help:`Help`,actions:`Back`}}}#n(e){return{id:e.id,key:e.key.toUpperCase(),label:`${Ou}${e.label.toUpperCase()}`,opposite:e.opposite}}},Au=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`HelpView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(H,this.#e),this.#e=void 0}#t(e){return B`
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
          ${q(e.dock,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},ju=class{of(e){return Math.floor(e.number()/10)}},Mu=-1,Nu=class{of(){return Mu}},Pu=`▲ `,Fu=20,Iu={text:`>>`,label:`You are here`},Lu={lattice:{meter:`Coherence`,path:`Path from the universe`,sync:`LATTICE_SYNC: [NOMINAL]`},void:{meter:`Integrity`,path:`Void trace from the universe`,sync:`VOID_SYNC: [PRESSURE_HIGH]`}},Ru=`[VOID] `,zu={text:`[>X<]`,label:`Elevator here`},Bu={text:`[V]`,label:`Visited`},Vu=`█`,Hu=`X`,Uu={you:`YOU`,visited:`VISITED`,unvisited:`UNVISITED`,noise:`STATIC`,mark:`GLITCH`},Wu=`[NEURAL_LATTICE_PROJECTION]`,Gu=`[NEURAL_LATTICE_TRACE_INITIATED]`,Ku=`>> `,qu=class{#e=new jl;#t={floor:new ju,layer:new Nu};#n;constructor(e){this.#n=e}accepts(e){return e.place!==null&&e.prompt===null}toViewModel(e){let t=e.place,n=e.player;if(t===null||n===null)throw Error(`HudPresenter needs a snapshot with a place`);let r=e.options.filter(e=>e.role===`travel`),i=r.map(e=>this.#l(e)),a=e.options.filter(e=>e.role===`move`).map(e=>this.#d(e)),o=e.options.filter(e=>e.role===`return`||e.role===`system`).map(e=>this.#d(e)),s=e.options.filter(e=>e.role===`take`),c=e.options.filter(e=>e.role===`debug`).map(e=>this.#d(e)),l=t.abyssal?Lu.void:Lu.lattice;return{scene:`${e.world?.seed??``}/${t.address}`,title:this.#n.name(),frame:this.#e.of(t),rail:t.trail.map((e,n)=>({...e,current:n===t.trail.length-1})),meter:{label:l.meter,...O.range(),value:n.coherence,text:`${String(n.coherence)}%`,band:n.band,bandLabel:n.band,valueText:`${String(n.coherence)} percent, ${n.band}`},stats:[{label:`Steps`,value:String(n.steps)},{label:`Buffer`,value:`${String(e.buffer?.size??0)}/${String(e.buffer?.capacity??0)}`}],place:{eyebrow:t.kind.toUpperCase(),icon:t.icon,name:t.name,position:t.position===null?null:{label:new Qr(t.position.label).plain(),value:`${String(t.position.index)} of ${String(t.position.total)}`},tags:t.facts.map(e=>({key:e.key,label:e.label,value:new Qr(e.value).capitalised()})),description:t.description,rows:this.#a(t),diagnostic:t.status},aside:this.#c(t,s,e.buffer?.resonant??0,l.sync),scan:e.scan===null?null:{label:`Scan`,heading:e.scan.title,notes:e.scan.notes,rows:e.scan.rows.map(e=>({cells:e.cells.filter(e=>e.value!==``).map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?Iu:null,note:e.note}))},map:e.map===null?null:this.#o(e.map,Wu),trace:e.trace===null?null:this.#s(e.trace),drawing:this.#r(t,r,n.decay),pad:this.#i(r,i),heading:t.childrenHeading.toUpperCase(),rows:i,moves:a,sealedNote:i.some(e=>e.sealed)?`STRUCTURES SEALED · the lattice opens their doors in a later build`:null,sealedTag:`SEALED`,dock:o,fold:{after:e.options.filter(e=>e.role===`return`).length,more:`MORE`,less:`LESS`,label:`More of the dock`},debug:c,debugToggle:`DEBUG`,options:[...s.filter(e=>!e.sealed).map(e=>this.#u(e)),...i.filter(e=>!e.sealed).map(e=>({id:e.id,key:e.key,label:e.label,opposite:``})),...a,...o,...c],status:e.message,build:this.#n.buildLine(),regions:{hud:`Position`,path:l.path,place:`Where you are`,scan:`Scan`,map:`Map`,trace:`Trace`,travel:`Places to enter`,moves:`Moves`,aside:`Readouts`,dock:`Leave and game`,debug:`Debug tools`}}}#r(e,t,n){let r=t.filter(e=>!e.sealed).length,i=e.figure,a=i?.tower;return{key:e.drawing,label:`Picture of ${e.name}: ${String(t.length)} places drawn, ${String(r)} open — the list below enters them too`,address:e.address,children:t.map(e=>({id:e.id,ordinal:e.ordinal,name:e.place,floors:e.figure?.floors??0,doors:e.figure?.doors??0,landmark:e.landmark,visited:e.visited,sealed:e.sealed,address:e.address,level:e.figure?.level??null,door:e.figure?.door??null})),tower:i===null||a===void 0?null:{floors:i.floors,doors:i.doors,address:a.address,landmark:a.landmark,car:a.car,rows:a.rows.flatMap(e=>e.level===void 0?[]:[{level:e.level,shape:e.shape??`none`,looks:e.looks??[]}])},shape:i?.shape??`none`,slider:t.length===0?``:e.childrenHeading,decay:n,noise:e.noise}}#i(e,t){if(e.length===0||e.some(e=>!e.numbered))return null;let n=t.flatMap((t,n)=>{let r=e[n],i=r?.figure?.level;return r===void 0||i===void 0?[]:[{row:t,option:r,level:i}]}).sort((e,t)=>e.level.number()-t.level.number()),r=e.length>Fu,i=new Map;for(let e of n){let t=r?this.#t[e.level.kind()].of(e.level):0;i.set(t,[...i.get(t)??[],e])}let a=[...i.values()].map(e=>({label:`${e[0]?.level.label()??``}–${e.at(-1)?.level.label()??``}`,keys:e.map(({row:e,option:t,level:n})=>({id:e.id,number:n.label(),spoken:[e.label,...e.mark===null?[]:[e.mark.label],...e.seen===null?[]:[e.seen.label],...e.readings.map(e=>`${e.label} ${e.value}`)].join(`, `),current:t.current,visited:t.visited}))})),o=a.findIndex(e=>e.keys.some(e=>e.current));return{label:`Floors by tens`,groups:a,open:Math.max(0,o)}}#a(e){let t=e.contents;return t===null?[]:[{label:`FURNITURE`,value:t.furniture.join(`, `)},...t.objects.length===0?[]:[{label:`OBJECTS_DETECTED`,value:String(t.objects.length)}]]}#o(e,t){let n=e=>e.noise?`noise`:e.visited?`visited`:`unvisited`,r=e.nodes.find(e=>!e.noise)?.glyph??e.origin.glyph,i=e.nodes.filter(e=>e.visited).length,a=[{glyph:e.origin.glyph,label:Uu.you,tone:`you`},{glyph:r,label:Uu.visited,tone:`visited`},{glyph:r,label:Uu.unvisited,tone:`unvisited`},...e.marks.length===0?[]:[{glyph:Hu,label:Uu.mark,tone:`mark`}]],o=e.marks.length===0?``:`, ${String(e.marks.length)} glitch mark${e.marks.length===1?``:`s`}`;return{label:`Lattice map`,heading:t,origin:`SCAN_ORIGIN: ${e.origin.name}`,picture:{width:e.width,height:e.height,origin:{glyph:e.origin.glyph,label:Uu.you},nodes:e.nodes.map(e=>({x:e.x,y:e.y,glyph:e.glyph,tone:n(e)})),marks:e.marks,markGlyph:Hu,legend:a},nodes:e.nodes.map(e=>({glyph:e.glyph,name:e.name,note:`${e.visited?`visited`:`unvisited`}${e.noise?`, static`:``}`})),summary:`Lattice map of ${e.origin.name}: ${String(e.nodes.length)} nodes, ${String(i)} visited${o}.`}}#s(e){let t=e.steps.map(e=>({depth:`[${String(e.depth).padStart(2,`0`)}]`,glyph:e.icon,kind:e.kind.toUpperCase(),name:`${e.name}${e.meta}`,current:e.current,abyssal:e.abyssal}));return{label:`Lattice trace`,heading:Gu,picture:{rows:t},lines:t.map(e=>`${e.current?Ku:``}${e.depth} ${e.glyph} ${e.kind} : ${e.name}`)}}#c(e,t,n,r){let i=e.contents,a=t.some(e=>e.sealed);return{objects:i===null?null:{label:`In this room`,heading:`IN THIS ROOM`,empty:i.objects.length===0?`No objects detected.`:``,note:a?`BUFFER FULL — merge or drop a fragment to take more.`:``,tiles:i.objects.map((e,n)=>{let r=String(n+1),i=t.find(e=>e.ordinal===r&&!e.sealed);return{key:e.key,name:e.name,ordinal:r,action:i===void 0?null:this.#u(i)}})},telemetry:e.telemetry===null?null:{label:`System telemetry`,heading:`[SYSTEM_TELEMETRY]`,sync:r,spectrogram:{heading:`[QUANTUM_SPECTROGRAM]`,bars:e.telemetry.spectrogram.map(e=>Vu.repeat(e))},logs:{heading:`[DECODE_LOGS]`,lines:[`> Trace: ${e.address}`,`> Resonant traces: ${String(n)}`,...e.telemetry.voice===null?[]:[`${Ru}${e.telemetry.voice}`]]}},map:e.telemetry!==null||e.lattice===null?null:this.#o(e.lattice,`[NEURAL_MAP: ${e.kind.toUpperCase()}]`)}}#l(e){return{id:e.id,key:e.key.toUpperCase(),ordinal:e.ordinal.padStart(2,`0`),label:e.sealed?e.place:e.label,sealed:e.sealed,landmark:e.landmark,readings:e.readings.map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?zu:null,seen:e.visited?Bu:null}}#u(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label,opposite:``}}#d(e){let t=e.role===`return`?Pu:``;return{id:e.id,key:e.key.toUpperCase(),label:`${t}${e.label.toUpperCase()}`,opposite:e.opposite}}},Ju=class{#e;#t=new Map;constructor(e){this.#e=e}bind(e,t,n){if(t==null||n===null){this.unbind(e);return}let r=this.#t.get(e),i=r?.host===t?r.view:void 0;i===void 0&&(this.unbind(e),i=this.#e[e](),i.mount(t),this.#t.set(e,{host:t,view:i})),i.render(n)}unbind(e){this.#t.get(e)?.view.dispose(),this.#t.delete(e)}dispose(){for(let e of[...this.#t.keys()])this.unbind(e)}},Yu=2,Xu=13e5,Zu=class{#e;#t;constructor(e=Yu,t=Xu){if(!(e>0&&t>0))throw RangeError(`a pixel budget is positive, got ${String(e)} and ${String(t)}`);this.#e=e,this.#t=t}ratio(e,t,n){let r=Math.min(e,this.#e),i=t*n;return i<=0?r:Math.min(r,Math.sqrt(this.#t/i))}},Qu=class{#e;#t;#n;constructor(e){this.#e=e.canvas,this.#t=e.observer,this.#n=e.colours}canvas(){return this.#e}colours(){return this.#n}unmount(){this.#t.disconnect(),this.#e.remove()}},$u=class{#e;constructor(e){this.#e=e}value(e){return this.#e.ownerDocument.defaultView?.getComputedStyle(this.#e).getPropertyValue(`--${e}`)??``}},ed=class{#e;#t=new Map;palette;constructor(e){this.#e=e,this.palette=this.ink.bind(this)}ink(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#e.value(e).trim();return this.#t.set(e,n),n}frameChanged(){this.#t.clear()}},td=1800,nd=.5,rd=class{#e;#t;#n;#r=new Zu;#i;#a;#o;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}mount(e){let t=e.ownerDocument.createElement(`canvas`);t.setAttribute(`aria-hidden`,`true`),e.replaceChildren(t);let n=new ResizeObserver(()=>{this.#c(nd)});n.observe(e),this.#i=new Qu({canvas:t,observer:n,colours:new ed(new $u(t))})}render(e){if(this.#a=e,this.#i?.colours().frameChanged(),this.#n.reduced()){this.#s(),this.#c(nd);return}this.#o??=this.#t.subscribe(e=>{this.#c(e%td/td)})}dispose(){this.#s(),this.#i?.unmount(),this.#i=void 0,this.#a=void 0}#s(){this.#o?.(),this.#o=void 0}#c(e){let t=this.#i?.canvas(),n=this.#a,r=t?.parentElement;if(t===void 0||n===void 0||r==null)return;let i=r.clientWidth;if(i===0)return;let a=this.#e.height(n,i),o=t.ownerDocument.defaultView,s=this.#r.ratio(o?.devicePixelRatio??1,i,a),c=Math.round(i*s),l=Math.round(a*s);(t.width!==c||t.height!==l)&&(t.width=c,t.height=l,t.style.width=`${String(i)}px`,t.style.height=`${String(a)}px`);let u=t.getContext(`2d`);if(u===null)return;u.setTransform(s,0,0,s,0,0),u.setLineDash([]);let d=this.#i?.colours().palette;d!==void 0&&this.#e.paint(u,n,{width:i,height:a},d,e)}},id=24,ad=14,od=7,sd=9,J=5,cd={visited:`frame`,unvisited:`dim`,noise:`rd`,you:`yl`,mark:`mg`},ld={visited:1,unvisited:.75,noise:1,you:1,mark:1},ud=class{#e=new M;height(e,t){return Math.round(t*e.height/e.width)+id}paint(e,t,n,r,i){let a=n.width/t.width,o=n.height-id,s=o/t.height,c=this.#e.atLeast(Math.round(Math.min(a,s)*.9)),l=(e,t)=>[(e+.5)*a,(t+.5)*s];e.globalAlpha=1,e.shadowBlur=0,e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height),e.fillStyle=r(`rule`);for(let n=0;n<t.height;n++)for(let r=0;r<t.width;r++){let[t,i]=l(r,n);e.fillRect(t-.5,i-.5,1,1)}e.strokeStyle=r(`rule-hi`),e.lineWidth=1,e.strokeRect(.5,.5,n.width-1,o-1),e.textAlign=`center`,e.textBaseline=`middle`,e.font=this.#e.of(`regular`,c);for(let n of t.nodes){let[t,i]=l(n.x,n.y);this.#t(e,r,n.glyph,t,i,n.tone)}e.font=this.#e.of(`bold`,c);for(let n of t.marks){let[i,a]=l(n.x,n.y);this.#t(e,r,t.markGlyph,i,a,`mark`)}let u=n.width/2,d=o/2;this.#n(e,r(`yl`),u,d,i),e.globalAlpha=1,e.fillStyle=r(`yl`),e.beginPath(),e.moveTo(u,d-J),e.lineTo(u+J,d),e.lineTo(u,d+J),e.lineTo(u-J,d),e.closePath(),e.fill(),e.font=this.#e.of(`bold`),e.textAlign=`left`,this.#t(e,r,t.origin.glyph,u+J+4,d,`you`),this.#r(e,t,n,r,o)}#t(e,t,n,r,i,a){e.fillStyle=t(cd[a]),e.globalAlpha=ld[a],e.fillText(n,r,i)}#n(e,t,n,r,i){e.strokeStyle=t,e.lineWidth=1.2;for(let t=0;t<3;t++){let a=(i+t/3)%1;e.globalAlpha=(1-a)*.7,e.beginPath(),e.arc(n,r,od+sd*a,0,Math.PI*2),e.stroke()}}#r(e,t,n,r,i){let a=i+id/2;e.font=this.#e.of(`regular`),e.textAlign=`left`,e.textBaseline=`middle`;let o=6;for(let i of t.legend){if(o+e.measureText(`${i.glyph} ${i.label}`).width>n.width)break;this.#t(e,r,i.glyph,o,a,i.tone),o+=e.measureText(i.glyph).width+5,e.globalAlpha=1,e.fillStyle=r(`dim`),e.fillText(i.label,o,a),o+=e.measureText(i.label).width+ad}}},dd=34,fd=12,pd=12,Y=22,md=9,hd=44,gd=8,_d=`…`,vd=class{#e=new M;height(e,t){return fd+e.rows.length*dd+pd}paint(e,t,n,r,i){e.globalAlpha=1,e.shadowBlur=0,e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height);let a=t.rows,o=e=>fd+e*dd+dd/2;a.length>1&&(e.strokeStyle=r(`frame`),e.lineWidth=1.5,e.globalAlpha=.8,e.beginPath(),e.moveTo(Y,o(0)),e.lineTo(Y,o(a.length-1)),e.stroke()),e.textBaseline=`middle`;for(let[t,s]of a.entries()){let a=o(t),c=s.abyssal?`ab`:s.current?`yl`:`text`;s.current&&this.#n(e,r(c),Y,a,i),e.globalAlpha=1,e.fillStyle=r(`ground`),e.beginPath(),e.arc(Y,a,md,0,Math.PI*2),e.fill(),e.strokeStyle=r(s.abyssal?`ab`:s.current?`yl`:`frame`),e.lineWidth=s.current?2:1,e.beginPath(),e.arc(Y,a,md,0,Math.PI*2),e.stroke(),e.textAlign=`center`,e.font=this.#e.of(`regular`),e.fillStyle=r(c),e.fillText(s.glyph,Y,a),e.textAlign=`left`,e.fillStyle=r(`dim`),e.fillText(s.depth,hd,a-8);let l=e.measureText(s.depth).width+6;e.fillStyle=r(s.abyssal?`ab`:`dim`),e.fillText(s.kind,hd+l,a-8),e.font=this.#e.of(s.current?`bold`:`regular`),e.fillStyle=r(c),e.fillText(this.#t(e,s.name,n.width-hd-gd),hd,a+8)}}#t(e,t,n){if(e.measureText(t).width<=n)return t;let r=t;for(;r.length>1&&e.measureText(r+_d).width>n;)r=r.slice(0,-1);return r+_d}#n(e,t,n,r,i){e.strokeStyle=t,e.lineWidth=1,e.globalAlpha=(1-i)*.6,e.beginPath(),e.arc(n,r,12+8*i,0,Math.PI*2),e.stroke()}},yd=7,bd=500,xd=1<<20,Sd={tears:[],grain:[],tint:0,dark:!1},Cd=class{#e=new oo(0,0);#t=0;#n=[];plan(e,t,n){if(t<=0)return Sd;(!e.equals(this.#e)||t!==this.#t)&&(this.#e=e,this.#t=t,this.#n=[]);let r=(n%8+8)%8,i=this.#n[r];if(i!==void 0)return i;let a=this.#r(e.branch(r),t);return this.#n[r]=a,a}#r(e,t){let n=[];for(let r=0;r<Math.floor(t*yd);r++){let i=e.branch(`tear`).branch(r);this.#i(i,`keep`)>.35+t*.5||n.push({y:this.#i(i,`y`),height:2+this.#i(i,`height`)*14*t,shift:(this.#i(i,`shift`)-.5)*40*t})}let r=[],i=e.branch(`grain`);for(let e=0;e<Math.round(t*bd);e++){let t=i.branch(e).range(0,xd*2-1);r.push({x:(t&1023)/1024,y:(t>>10&1023)/1024,red:t>=xd})}return{tears:n,grain:r,tint:.1*t,dark:t>.5&&this.#i(e,`dark`)<.08*t}}#i(e,t){return e.branch(t).range(0,1048575)/xd}},wd=110,Td=90,Ed=class{#e=[];sample(e,t){for(this.#e.push({time:e,value:t});this.#e.length>2&&e-(this.#e[0]?.time??e)>wd;)this.#e.shift()}speed(e){let t=this.#e[0],n=this.#e.at(-1);if(t===void 0||n===void 0||t===n||e-n.time>Td)return 0;let r=(n.time-t.time)/1e3;return r>0?(n.value-t.value)/r:0}},Dd=6,Od=class{#e;#t;#n;#r;#i=new Ed;#a;constructor(e){this.#e=e.pointer,this.#t=e.start,this.#n=e.view,this.#r=e.slider,this.#a=e.slider}is(e){return this.#e===e}onSlider(){return this.#r}move(e){Math.abs(e-this.#t)>Dd&&(this.#a=!0)}moved(){return this.#a}viewAt(e,t){return this.#n+(e-this.#t)*t}sample(e,t){this.#i.sample(e,t)}speed(e){return this.#i.speed(e)}},kd=`pick`,Ad=class{pick(e,t){e.dispatchEvent(new CustomEvent(kd,{bubbles:!0,detail:{id:t}}))}onPick(e,t,n){e.addEventListener(kd,e=>{let t=this.#e(e);t!==void 0&&n(t)},{signal:t})}#e(e){if(!(e instanceof CustomEvent))return;let t=e.detail,n=typeof t==`object`&&t&&`id`in t?t.id:void 0;return typeof n==`string`?n:void 0}},jd=class{#e;#t;#n;#r;#i;#a;constructor(e){this.#e=e.host,this.#t=e.canvas,this.#n=e.slider,this.#r=e.observer,this.#i=e.listeners,this.#a=e.colours}host(){return this.#e}canvas(){return this.#t}slider(){return this.#n}colours(){return this.#a}unmount(){this.#r.disconnect(),this.#i.abort(),this.#t.remove(),this.#n.remove()}},X=class{#e;#t;#n;#r;#i;constructor(e,t,n,r,i){this.#e=e,this.#t=t,this.#n=n,this.#r=r,this.#i=i}progress(e){return this.#r<=0?1:Math.min(1,Math.max(0,(e-this.#n)/this.#r))}at(e){let t=this.progress(e);return t>=1?this.#t:this.#e+(this.#t-this.#e)*this.#i.ease(t)}done(e){return this.progress(e)>=1}},Md=class{#e;#t;#n;#r;constructor(e){this.#e=new X(e.from,e.to,e.start,e.ride,e.easing),this.#t=e.zoom===null?void 0:new X(1,e.zoom.scale,e.start+e.ride,e.zoom.time,e.easing),this.#n=e.pick,this.#r=e.anchor}view(e){return this.#e.at(e)}scale(e){return this.#t===void 0||!this.#e.done(e)?1:this.#t.at(e)}over(e){return this.#e.done(e)&&(this.#t?.done(e)??!0)}pick(){return this.#n}anchor(){return this.#r}},Nd=class{ease(e){return e<.5?4*e**3:1-(-2*e+2)**3/2}},Pd=class{ease(e){return 1-(1-e)**3}},Fd=6,Id=450,Ld=12,Z=0,Rd=320,zd=class{#e;#t;#n;#r;#i=new Ad;#a=new Nd;#o=new Pd;#s=new Cd;#c=new Zu;#l;#u;#d={width:0,height:0};#f=1;#p=[];#m=``;#h=``;#g=new N;#_=0;#v;#y;#b;#x;#S=!1;#C;constructor(e,t,n,r){this.#e=e,this.#t=t,this.#n=n,this.#r=r}mount(e){let t=e.ownerDocument,n=t.createElement(`canvas`);n.setAttribute(`role`,`img`);let r=t.createElement(`div`);r.className=`slider`,r.setAttribute(`role`,`slider`),r.tabIndex=0,r.hidden=!0,e.replaceChildren(n,r);let i=new AbortController,a=i.signal;n.addEventListener(`pointerdown`,e=>{this.#I(e,!1)},{signal:a}),n.addEventListener(`pointermove`,e=>{this.#L(e)},{signal:a}),n.addEventListener(`pointerup`,e=>{this.#z(e)},{signal:a}),n.addEventListener(`pointercancel`,e=>{this.#z(e)},{signal:a}),n.addEventListener(`pointerleave`,()=>{this.#x===void 0&&this.#F(``)},{signal:a}),n.addEventListener(`click`,e=>{this.#U(e)},{signal:a}),r.addEventListener(`pointerdown`,e=>{this.#I(e,!0)},{signal:a}),r.addEventListener(`pointermove`,e=>{this.#L(e)},{signal:a}),r.addEventListener(`pointerup`,e=>{this.#z(e)},{signal:a}),r.addEventListener(`pointercancel`,e=>{this.#z(e)},{signal:a}),r.addEventListener(`keydown`,e=>{this.#B(e)},{signal:a});let o=new ResizeObserver(()=>{this.#D(),this.#C===void 0&&this.#j(Z)});o.observe(e),this.#l=new jd({host:e,canvas:n,slider:r,observer:o,listeners:i,colours:new ed(new $u(n))})}render(e){let t=this.#u;this.#y=void 0,this.#b=void 0,this.#v=void 0,this.#x=void 0,this.#u=e,this.#l?.colours().frameChanged(),this.#D();let n=this.#g;if(t?.address!==e.address&&(this.#h=``),t?.address===e.address)this.#_=n.clamp(this.#_);else if(t!==void 0&&!this.#n.reduced()){let e=Math.abs(n.rest()-this.#_);e>.01?this.#v=new X(this.#_,n.rest(),this.#t.now(),n.pace(e),this.#a):this.#_=n.rest()}else this.#_=n.rest();let r=this.#l?.canvas();r?.setAttribute(`aria-label`,e.label),r!==void 0&&(r.style.touchAction=n.drags()?`none`:`manipulation`),this.#O(),this.#w()}arrive(e){this.#h=e;let t=this.#g.stopOf(e);t!==void 0&&(this.#v=void 0,this.#_=this.#g.clamp(t),this.#O());let n=this.#p.find(t=>t.id===e);if(n===void 0||this.#n.reduced()||!this.#g.zooms()){this.#C===void 0&&this.#j(Z);return}this.#b={scale:new X(Fd,1,this.#t.now(),Id,this.#a),anchor:n.anchor},this.#w()}leads(e){let t=this.#u?.children.find(t=>t.id===e);return t!==void 0&&!t.sealed&&this.#g.stopOf(e)!==void 0}enter(e){this.#y===void 0&&this.leads(e)&&this.#W(e)}light(e){e!==this.#m&&(this.#m=e,this.#C===void 0&&this.#j(Z))}dispose(){this.#y=void 0,this.#b=void 0,this.#v=void 0,this.#x=void 0,this.#T(),this.#l?.unmount(),this.#l=void 0,this.#u=void 0,this.#g=new N}#w(){if(this.#n.reduced()){this.#T(),this.#v=void 0,this.#j(Z);return}this.#C??=this.#t.subscribe(e=>{this.#E(e)})}#T(){this.#C?.(),this.#C=void 0}#E(e){let t=this.#y,n=this.#_;t===void 0?this.#v!==void 0&&(this.#_=this.#v.at(e),this.#v.done(e)&&(this.#v=void 0)):this.#_=t.view(e),this.#_!==n&&this.#O(),this.#j(e),this.#b?.scale.done(e)===!0&&(this.#b=void 0),t?.over(e)&&(this.#y=void 0,this.#G(t.pick()))}#D(){let e=this.#l,t=this.#u;if(e===void 0||t===void 0)return;let n=e.host(),r=e.canvas(),i={width:n.clientWidth,height:n.clientHeight},a=this.#c.ratio(n.ownerDocument.defaultView?.devicePixelRatio??1,i.width,i.height),o=Math.round(i.width*a),s=Math.round(i.height*a);(r.width!==o||r.height!==s)&&(r.width=o,r.height=s),this.#d=i,this.#f=a,this.#g=this.#e.camera(t,i),this.#_=this.#g.clamp(this.#_),this.#k(),this.#O()}#O(){let e=this.#u;e!==void 0&&(this.#p=this.#e.layout(e,this.#d,this.#_),this.#A())}#k(){let e=this.#l?.slider();if(e===void 0)return;let t=this.#g.track();e.hidden=t===null,t!==null&&(e.style.left=`${String(t.x)}px`,e.style.top=`${String(t.y)}px`,e.style.width=`${String(t.width)}px`,e.style.height=`${String(t.height)}px`,e.setAttribute(`aria-orientation`,t.axis===`y`?`vertical`:`horizontal`),e.setAttribute(`aria-label`,this.#u?.slider??``),e.setAttribute(`aria-valuemin`,`1`),e.setAttribute(`aria-valuemax`,String(this.#g.stopCount())))}#A(){let e=this.#l?.slider(),t=this.#g.nearest(this.#_);if(e===void 0||e.hidden||t===void 0)return;let n=String(t.index+1);if(e.getAttribute(`aria-valuenow`)===n)return;e.setAttribute(`aria-valuenow`,n);let r=this.#u?.children.find(e=>e.id===t.id)?.name??``;e.setAttribute(`aria-valuetext`,r)}#j(e){let t=this.#l?.canvas(),n=this.#u,{width:r,height:i}=this.#d;if(t===void 0||n===void 0||r===0||i===0)return;let a=t.getContext(`2d`);if(a===null)return;let o=this.#l?.colours().palette;if(o===void 0)return;let s=this.#f;a.globalAlpha=1,a.setLineDash([]);let c=this.#M(e),l=0;if(c===void 0)a.setTransform(s,0,0,s,0,0);else{l=(c.scale-1)/5;let e=c.anchor.x+(r/2-c.anchor.x)*l,t=c.anchor.y+(i/2-c.anchor.y)*l;a.setTransform(s*c.scale,0,0,s*c.scale,s*(e-c.anchor.x*c.scale),s*(t-c.anchor.y*c.scale))}this.#e.paint(a,n,this.#d,o,e,this.#m,this.#_,this.#h),a.setTransform(s,0,0,s,0,0),l>0&&(a.globalAlpha=l,a.fillStyle=o(`ground`),a.fillRect(0,0,r,i),a.globalAlpha=1);let u=e===Z?0:Math.floor(e/1e3*Ld)%8;this.#N(a,t,this.#s.plan(n.noise,n.decay,u),o)}#M(e){let t=this.#y;if(t!==void 0){let n=t.scale(e);return n<=1?void 0:{scale:n,anchor:t.anchor()}}let n=this.#b;return n===void 0?void 0:{scale:n.scale.at(e),anchor:n.anchor}}#N(e,t,n,r){let{width:i,height:a}=this.#d,o=this.#f;for(let r of n.tears){let n=r.y*a;e.drawImage(t,0,n*o,t.width,r.height*o,r.shift,n,i,r.height)}if(n.grain.length>0){e.globalAlpha=n.tint*5;let t=r(`text`),o=r(`rd`);for(let r of n.grain)e.fillStyle=r.red?o:t,e.fillRect(r.x*i,r.y*a,1,1)}n.tint>0&&(e.globalAlpha=n.tint,e.fillStyle=r(`rd`),e.fillRect(0,0,i,a)),n.dark&&(e.globalAlpha=.5,e.fillStyle=r(`ground`),e.fillRect(0,0,i,a)),e.globalAlpha=1}#P(e){let t=this.#l?.canvas().getBoundingClientRect();if(t===void 0)return;let n=e.clientX-t.left,r=e.clientY-t.top;return this.#p.find(e=>n>=e.x&&n<=e.x+e.width&&r>=e.y&&r<=e.y+e.height)}#F(e){e!==this.#m&&(this.light(e),this.#r(e))}#I(e,t){if(this.#y!==void 0||this.#b!==void 0)return;this.#S=!1;let n=this.#g;if(t||this.#F(this.#P(e)?.id??``),!t&&!n.drags()||(this.#v=void 0,this.#x=new Od({pointer:e.pointerId,start:n.along({x:e.clientX,y:e.clientY}),view:this.#_,slider:t}),!t))return;e.preventDefault(),this.#l?.slider().setPointerCapture(e.pointerId),this.#l?.slider().focus({preventScroll:!0});let r=this.#H(e);r!==void 0&&this.#V(r,Rd)}#L(e){let t=this.#x,n=this.#g;if(!t?.is(e.pointerId)){this.#x===void 0&&this.#y===void 0&&this.#F(this.#P(e)?.id??``);return}if(t.onSlider()){let n=this.#H(e);if(n===void 0)return;this.#v=void 0,this.#R(n,t);return}let r=n.along({x:e.clientX,y:e.clientY}),i=t.moved();t.move(r),t.moved()&&(i||this.#l?.canvas().setPointerCapture(e.pointerId),this.#R(t.viewAt(r,n.dragRate()),t))}#R(e,t){this.#_=this.#g.clamp(e),t.sample(this.#t.now(),this.#_),this.#O();let n=this.#g.nearest(this.#_);n!==void 0&&this.#F(n.id),this.#C===void 0&&this.#j(Z)}#z(e){let t=this.#x,n=this.#g;if(!t?.is(e.pointerId)||(this.#x=void 0,!t.moved()))return;t.onSlider()||(this.#S=!0);let r=this.#n.reduced()?0:t.speed(this.#t.now()),i=n.landing(this.#_,r);this.#V(i,n.settle(Math.abs(i-this.#_)))}#B(e){let t={ArrowUp:1,ArrowRight:1,ArrowDown:-1,ArrowLeft:-1}[e.key];if(t===void 0)return;let n=this.#g.stepFrom(this.#_,t);n!==void 0&&(e.preventDefault(),this.#V(n.at,this.#g.pace(Math.abs(n.at-this.#_))),this.#F(n.id))}#V(e,t){let n=this.#g.clamp(e);if(this.#n.reduced()||Math.abs(n-this.#_)<.001){this.#v=void 0,this.#_=n,this.#O(),this.#C===void 0&&this.#j(Z);return}this.#v=new X(this.#_,n,this.#t.now(),t,this.#o),this.#w()}#H(e){let t=this.#l?.slider().getBoundingClientRect();if(this.#g.track()!==null&&t!==void 0)return this.#g.alongTrack({x:e.clientX,y:e.clientY},t)}#U(e){if(this.#S){this.#S=!1;return}if(this.#y!==void 0||this.#b!==void 0)return;let t=this.#P(e),n=this.#u?.children.find(e=>e.id===t?.id);t===void 0||n===void 0||n.sealed||this.#W(t.id)}#W(e){if(this.#n.reduced()){this.#G(e);return}let t=this.#g,n=t.stopOf(e),r=n===void 0?this.#_:t.clamp(n),i=Math.abs(r-this.#_),a=(this.#u===void 0?[]:this.#e.layout(this.#u,this.#d,r)).find(t=>t.id===e)?.anchor??{x:this.#d.width/2,y:this.#d.height/2};this.#v=void 0,this.#y=new Md({from:this.#_,to:r,start:this.#t.now(),ride:i<.01?0:t.pace(i),zoom:t.zooms()?{scale:Fd,time:Id}:null,pick:e,easing:this.#a,anchor:a}),this.#w()}#G(e){let t=this.#l?.host();t!==void 0&&this.#i.pick(t,e)}},Bd=class{#e;#t;constructor(e){this.#e=new Set(e),this.#t=e.at(-1)}from(e,t){if(e!==this.#t)return t.find(e=>this.#e.has(e.address))}},Vd=class{#e;#t;#n=!1;#r=!1;#i;#a;#o;#s;#c;#l=``;#u=new Bd([]);#d;constructor(e,t,n){this.#a=e,this.#o=t,this.#s=n,this.#i=new Ju({pane:()=>new rd(new ud,e,n),map:()=>new rd(new ud,e,n),trace:()=>new rd(new vd,e,n)})}mount(e){this.#e=e}render(e){this.#n=!1,e.scene!==this.#t?.scene&&(this.#l=``,this.#d=void 0);let t=this.#c?.view;this.#f(e),this.#c!==void 0&&this.#c.view===t&&this.#c.view.render(e.drawing);let n=this.#u.from(e.drawing.address,e.drawing.children);n!==void 0&&this.#c?.view.arrive(n.id),this.#u=new Bd(e.rail.map(e=>e.address))}#f(e){if(this.#e===void 0)throw Error(`HudView.render before mount`);this.#t=e,G(this.#b(e),this.#e),this.#i.bind(`pane`,this.#h(`pane`),e.aside.map?.picture??null),this.#i.bind(`map`,this.#h(`map`),e.map?.picture??null),this.#i.bind(`trace`,this.#h(`trace`),e.trace?.picture??null),this.#p(e.drawing)}#p(e){let t=this.#h(`scene`),n=this.#o.picture(e.key);if(t===null||n===void 0){this.#c?.view.dispose(),this.#c=void 0;return}if(this.#c?.host!==t||this.#c.picture!==n){this.#c?.view.dispose();let r=new zd(n,this.#a,this.#s,e=>{this.#m(e)});r.mount(t),r.render(e),this.#c={host:t,picture:n,view:r}}this.#c.view.light(this.#l)}#m(e){if(e===this.#l||this.#c===void 0)return;this.#l=e;let t=this.#t?.pad?.groups.findIndex(t=>t.keys.some(t=>t.id===e))??-1;t>=0&&(this.#d=t),this.#c.view.light(e),this.#t!==void 0&&this.#e!==void 0&&G(this.#b(this.#t),this.#e)}dispose(){this.#c?.view.dispose(),this.#c=void 0,this.#l=``,this.#i.dispose(),this.#e!==void 0&&G(H,this.#e),this.#e=void 0,this.#t=void 0,this.#n=!1,this.#r=!1}#h(e){let t=this.#e?.querySelector(`[data-canvas="${e}"]`);return t instanceof HTMLElement?t:null}#g(){this.#n=!this.#n,this.#t!==void 0&&this.#f(this.#t)}#_(e){this.#d=e,this.#t!==void 0&&this.#f(this.#t)}#v(e,t){let n=this.#c?.view;n?.leads(t)===!0&&(e.stopPropagation(),n.enter(t))}#y(){this.#r=!this.#r,this.#t!==void 0&&this.#f(this.#t)}#b(e){let t=this.#o.picture(e.drawing.key)!==void 0;return B`
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
          ${e.moves.length===0?H:B`
                  <nav class="moves" aria-label=${e.regions.moves}>
                    ${q(e.moves,e=>e.id,e=>this.#D(e))}
                  </nav>
                `}
          <div class="body">
            <ul class="tags">
              ${e.place.position===null?H:B`<li class="chip pos">
                      <span class="k">${e.place.position.label}</span> ${e.place.position.value}
                    </li>`}
              ${e.place.tags.map(e=>B`
                  <li class="tag" data-fact=${e.key}><span class="k">${e.label}</span> ${e.value}</li>
                `)}
            </ul>
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
        ${t?B`<div class="scene" data-testid="scene" data-canvas="scene" data-lit=${this.#l}></div>`:H}
        ${this.#x(e)} ${e.map===null?H:this.#S(e.map,`map`,`map`,e.regions.map)}
        ${this.#C(e)}
        <div class="side">
          ${e.rows.length===0?H:B`
                  <section class="travel" aria-label=${e.regions.travel}>
                    <h3 class="heading">${e.heading}</h3>
                    ${e.sealedNote===null?H:B`<p class="sealed-note" data-testid="sealed-note">${e.sealedNote}</p>`}
                    ${e.pad===null?B`<ol class="rows">
                            ${q(e.rows,t=>`${e.scene}/${t.id}`,n=>this.#E(n,e.sealedTag,t))}
                          </ol>`:this.#T(e,e.pad,t)}
                  </section>
                `}
          ${this.#w(e)}
        </div>
        <nav class="dock" aria-label=${e.regions.dock} data-open=${this.#n?`true`:`false`}>
          ${q(e.dock.slice(0,e.fold.after),e=>e.id,e=>this.#D(e))}
          ${e.dock.length<=e.fold.after?H:B`
                  <button
                    type="button"
                    class="pb more"
                    data-testid="more"
                    aria-label=${e.fold.label}
                    aria-expanded=${this.#n?`true`:`false`}
                    aria-controls="dock-fold"
                    @click=${()=>{this.#g()}}
                  >
                    <span>${this.#n?e.fold.less:e.fold.more}</span>
                  </button>
                  <div class="fold" id="dock-fold">
                    ${q(e.dock.slice(e.fold.after),e=>e.id,e=>this.#D(e))}
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
                    @click=${()=>{this.#y()}}
                  >
                    <span>${e.debugToggle}</span>
                  </button>
                  <div class="fold" id="debug-fold">
                    ${q(e.debug,e=>e.id,e=>this.#D(e,-1))}
                  </div>
                </nav>
              `}
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#x(e){let t=e.scan;return t===null?H:B`
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
    `}#S(e,t,n,r){return B`
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
    `}#C(e){let t=e.trace;return t===null?H:B`
      <section class="tracep" data-testid="trace" aria-label=${e.regions.trace} tabindex="-1" data-spot>
        <h3 class="heading">${t.heading}</h3>
        <div class="cv" data-canvas="trace" role="img" aria-label=${t.label}></div>
        <ol class="vh">
          ${t.lines.map(e=>B`<li>${e}</li>`)}
        </ol>
      </section>
    `}#w(e){let{objects:t,telemetry:n,map:r}=e.aside;return t===null&&n===null&&r===null?H:B`
      <aside class="aside" aria-label=${e.regions.aside}>
        ${t===null?H:B`
                <section class="objects" data-testid="objects" aria-label=${t.label}>
                  <h3 class="heading">${t.heading}</h3>
                  ${t.empty===``?H:B`<p class="empty">${t.empty}</p>`}
                  ${t.note===``?H:B`<p class="empty" data-testid="buffer-full">${t.note}</p>`}
                  ${t.tiles.length===0?H:B`<ul class="tiles">
                          ${q(t.tiles,t=>`${e.scene}/${t.ordinal}`,e=>e.action===null?B`<li class="tile" data-relic=${e.key}>
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
        ${r===null?H:this.#S(r,`pane`,`pane-map`,r.label)}
      </aside>
    `}#T(e,t,n){let r=Math.min(this.#d??t.open,t.groups.length-1),i=t.groups[r];return B`
      <ol class="pad">
        ${q(i?.keys??[],t=>`${e.scene}/${t.id}`,e=>B`
            <li>
              <button
                type="button"
                class=${[`key`,e.current?`you`:``,e.visited?`seen`:``].join(` `).trim()}
                data-option=${e.id}
                ?data-lit=${n&&this.#l===e.id}
                @click=${t=>{this.#v(t,e.id)}}
                @pointerenter=${()=>{this.#m(e.id)}}
                @pointerleave=${()=>{this.#m(``)}}
                @focus=${()=>{this.#m(e.id)}}
                @blur=${()=>{this.#m(``)}}
              >
                <span class="num" aria-hidden="true">${e.number}</span><span class="vh">${e.spoken}</span>
              </button>
            </li>
          `)}
      </ol>
      ${t.groups.length<2?H:B`<div class="tens" role="group" aria-label=${t.label}>
              ${t.groups.map((e,t)=>B`
                  <button
                    type="button"
                    class="ten"
                    aria-pressed=${t===r?`true`:`false`}
                    @click=${()=>{this.#_(t)}}
                  >
                    ${e.label}
                  </button>
                `)}
            </div>`}
    `}#E(e,t,n){let r=e.landmark?`lb landmark`:`lb`;return e.sealed?B`
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
          ?data-lit=${n&&this.#l===e.id}
          @click=${t=>{this.#v(t,e.id)}}
          @pointerenter=${()=>{this.#m(e.id)}}
          @pointerleave=${()=>{this.#m(``)}}
          @focus=${()=>{this.#m(e.id)}}
          @blur=${()=>{this.#m(``)}}
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
    `}#D(e,t){return B`
      <button type="button" class="pb" data-option=${e.id} tabindex=${t??H}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Hd=`reboot`,Ud=`dead`,Wd=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Hd}toViewModel(e){let t=`!!! CRITICAL_COHERENCE_FAILURE !!!`;return{scene:Hd,title:this.#e.name(),frame:Ud,stageLine:`NEURAL LINK LOST`,eyebrow:`COHERENCE ${String(e.player?.coherence??0)}%`,headline:t,line:`REBOOTING...`,explanation:`The world is rebuilt from the same seed. You wake on the starting street with 100 Coherence; your step count and the places you have visited are kept. Everything that lived inside the world is undone.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?t:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,notice:`Link failure`,actions:`Actions`}}}},Gd=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RebootView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(H,this.#e),this.#e=void 0}#t(e){return B`
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
          ${q(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Kd=`recap`,qd=[{key:`locus`,label:`FINAL_LOCUS`,unit:``},{key:`steps`,label:`PULSE_TRAVERSAL`,unit:` steps`},{key:`places`,label:`CELLS_MAPPED`,unit:` footprints`},{key:`buffer`,label:`BUFFER_DENSITY`,unit:` spectral fragments`},{key:`resonant`,label:`RESONANT_TRACES`,unit:` resonant`}],Jd=[`UNMOUNTING_LATTICE_TRACE`,`DEALLOCATING_TRACE_BUFFER`,`RELEASING_NEURAL_CARRIER`,`STABILIZING_SUBSTRATE_WAVEFORM`],Yd={void:{heading:`[VOID_RESONANCE_TERMINATION]`,figures:!1,shutdown:!1,lines:[`Your echoes are sinking into the strata.`,`The web is folding back upon itself.`,`The v-v-void... it remembers... [OK]`],closing:`Sleep among the static, Operator.`},expedition:{heading:`[SESSION_RECAP_INITIALIZED]`,figures:!0,shutdown:!1,lines:[],closing:`Expedition successful. Trace synchronized to substrate.`},severed:{heading:`[LINK_TERMINATION_PROTOCOL]`,figures:!1,shutdown:!0,lines:[],closing:`Neural link severed. Waveform stabilized.`}},Xd=class{#e=new jl;#t;constructor(e){this.#t=e}accepts(e){return e.prompt?.id===Kd}toViewModel(e){let t=e.prompt;if(t?.id!==Kd)throw Error(`RecapPresenter needs the recap prompt`);let n=Yd[t.outcome];if(n===void 0)throw Error(`no words for the ending '${t.outcome}'`);return{scene:Kd,title:this.#t.name(),frame:this.#e.of(e.place),heading:n.heading,figures:n.figures?this.#n(t):[],steps:n.shutdown?Jd.map(e=>({label:`[STATUS]`,process:`${e}...`,done:`[DONE]`})):[],lines:n.lines,closing:n.closing,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?n.heading:e.message,build:this.#t.buildLine(),regions:{recap:`Session recap`,actions:`Actions`}}}#n(e){return qd.map(t=>({label:t.label,value:`${e.figures[t.key]??``}${t.unit}`}))}},Zd=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RecapView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(H,this.#e),this.#e=void 0}#t(e){return B`
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
          ${q(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?H:B`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Qd=class{#e;constructor(e){this.#e=e}accepts(e){return e.place===null&&e.prompt===null}toViewModel(e){return{scene:`title`,title:this.#e.name(),tagline:`Vinculum neural interface · lattice uplink`,stageLine:e.world===null?`AWAITING SEED`:`WORLD LOCKED`,world:e.world===null?null:{nameLabel:`UNIVERSE`,name:e.world.name.toUpperCase(),seedLabel:`SEED`,seed:e.world.seed},prompt:`NO WORLD LOADED. DRAW A SEED TO BEGIN.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),status:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,world:`World`,actions:`Actions`}}}},$d=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`TitleView.render before mount`);G(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&G(H,this.#e),this.#e=void 0}#t(e){return B`
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
          ${q(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return B`
      <button type="button" class="pb" data-option=${e.id}>
        <kbd aria-hidden="true">${e.key}</kbd><span>${e.label}</span>
      </button>
    `}},Q=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}accepts(e){return this.#e.accepts(e)}mount(e){this.#t.mount(e)}show(e){let t=this.#e.toViewModel(e);return this.#t.render(t),t}dispose(){this.#t.dispose()}},ef=class{#e;#t=new AbortController;#n=new Ad;#r=[];constructor(e){this.#e=e}attach(e){let t=this.#t.signal;e.addEventListener(`click`,e=>{this.#i(e)},{signal:t}),this.#n.onPick(e,t,e=>{this.#a(e)}),e.ownerDocument.addEventListener(`keydown`,e=>{this.#o(e)},{signal:t})}offer(e){this.#r=e}detach(){this.#t.abort()}#i(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`button[data-option]`)?.dataset.option;t!==void 0&&this.#a(t)}#a(e){this.#r.some(t=>t.id===e)&&this.#e(e)}#o(e){if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;let t=this.#r.find(t=>t.key.toLowerCase()===e.key.toLowerCase());t!==void 0&&(e.preventDefault(),this.#e(t.id))}},tf=class{#e;#t;#n;#r;#i;#a;#o;#s;#c=[];#l;#u;constructor(e,t,n){this.#e=e,this.#t=t,this.#u=n,this.#n=new ef(e=>{this.#l=this.#c.find(t=>t.id===e),this.#d(this.#e.step(e))})}start(e){this.#r=e,this.#i=this.#f(e),this.#n.attach(e),this.#d(this.#e.snapshot())}stop(){this.#n.detach(),this.#a?.dispose(),this.#a=void 0,this.#i?.remove(),this.#i=void 0,this.#r=void 0}#d(e){let t=this.#r,n=this.#t.find(t=>t.accepts(e));if(t===void 0||n===void 0)throw Error(`no screen accepts this snapshot`);let r=this.#m();n!==this.#a&&(this.#a?.dispose(),n.mount(t),this.#a=n);let i=n.show(e);this.#n.offer(i.options),this.#c=i.options,this.#p(i.status),r?.isConnected===!1&&this.#h(i.scene,this.#l);let a=t.querySelector(`[data-spot]`);if(a!==null&&i.scene===this.#o&&this.#g(a),i.scene!==this.#o){this.#_();let e=r instanceof HTMLElement?r.dataset.option:void 0;this.#s=this.#o===void 0||e===void 0?void 0:{scene:this.#o,optionId:e}}this.#o=i.scene}#f(e){let t=e.ownerDocument.createElement(`p`);return t.className=`vh`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),e.prepend(t),t}#p(e){this.#i!==void 0&&this.#i.textContent!==e&&(this.#i.textContent=e)}#m(){let e=this.#r?.ownerDocument.activeElement;return e!=null&&this.#r?.contains(e)===!0?e:void 0}#h(e,t){let n=this.#r,r=[...n?.querySelectorAll(`button[data-option]`)??[]].filter(e=>e.offsetParent!==null),i=n?.querySelector(`[data-rest]`),a=this.#s;if(a?.scene===e){let e=r.find(e=>e.dataset.option===a.optionId);if(e!==void 0){e.focus({preventScroll:!0});return}if(i!=null){i.focus({preventScroll:!0});return}}let o=t?.opposite??``;if(o!==``&&this.#c.some(e=>e.id===o)&&i!=null){i.focus({preventScroll:!0});return}r.find(e=>e.dataset.option!==o)?.focus({preventScroll:!0})}#g(e){e.focus({preventScroll:!0}),e.scrollIntoView({block:`nearest`,behavior:this.#u.reduced()?`instant`:`smooth`})}#_(){this.#r?.ownerDocument.defaultView?.scrollTo({top:0,left:0,behavior:`instant`})}},nf=document.querySelector(`#app`);if(nf===null)throw Error(`#app is missing from index.html`);var rf=new $t(new Qt),af=new URLSearchParams(window.location.search).has(`debug`),of=new ks({world:new Ka(rf,new eo(rf),new As),entropy:new js(window.crypto),saves:new Is(()=>window.localStorage),debug:af}),$=new Ls(`13299c2`),sf=new Ac(new Ms(window)),cf=new Ps(window),lf=new Nc,uf=new Ic,df=new wc,ff=new Cc,pf=new Oc,mf=new Wc({[yn.key()]:new sl,[un.key()]:new Ol,[_n.key()]:new yc({font:new M,inks:new Sc,glow:uf,halls:{long:pf,service:new Pc(df,ff),curved:new bc(df,ff),static:new zc(lf,ff),none:pf},panels:{glass:new Dc,metal:new kc,stone:new Hc,timber:new Uc,bone:new Vs,plain:new Mc},marks:{frost:new Ec(lf),cold:new Hs(uf),static:new Vc,plain:new jc}})});new tf(of,[new Q(new Wd($),new Gd),new Q(new Xd($),new Zd),new Q(new zl($),new Eu),new Q(new ku($),new Au),new Q(new Qd($),new $d),new Q(new qu($),new Vd(sf,mf,cf))],cf).start(nf);