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
`,Qt=class{#e;constructor(){this.#e=Object.assign({"./names/buildings/adj/abyssal.txt":e,"./names/buildings/adj/baroque.txt":t,"./names/buildings/adj/gilded.txt":n,"./names/buildings/adj/monolith.txt":r,"./names/buildings/adj/neon.txt":i,"./names/buildings/adj/organic.txt":a,"./names/buildings/adj/rust.txt":o,"./names/buildings/adj/shogun.txt":s,"./names/buildings/adj/void.txt":c,"./names/buildings/adj/zenith.txt":l,"./names/buildings/compounds.txt":u,"./names/buildings/concepts.txt":d,"./names/buildings/index.txt":f,"./names/buildings/landmarks.txt":p,"./names/buildings/noun/abyssal.txt":m,"./names/buildings/noun/baroque.txt":h,"./names/buildings/noun/gilded.txt":g,"./names/buildings/noun/monolith.txt":_,"./names/buildings/noun/neon.txt":ee,"./names/buildings/noun/organic.txt":te,"./names/buildings/noun/rust.txt":ne,"./names/buildings/noun/shogun.txt":re,"./names/buildings/noun/void.txt":ie,"./names/buildings/noun/zenith.txt":ae,"./names/buildings/sizes/index.txt":oe,"./names/buildings/sizes/large.txt":se,"./names/buildings/sizes/medium.txt":ce,"./names/buildings/sizes/small.txt":le,"./names/city/head.txt":ue,"./names/city/index.txt":de,"./names/city/tail.txt":fe,"./names/country/core.txt":pe,"./names/country/index.txt":me,"./names/country/prefix.txt":he,"./names/country/suffix.txt":ge,"./names/filament/greek.txt":_e,"./names/filament/index.txt":ve,"./names/filament/type.txt":ye,"./names/floors/index.txt":be,"./names/floors/lobby.txt":xe,"./names/floors/peak.txt":Se,"./names/floors/zones/basement.txt":Ce,"./names/floors/zones/executive.txt":we,"./names/floors/zones/index.txt":Te,"./names/floors/zones/living.txt":Ee,"./names/planet/head.txt":De,"./names/planet/index.txt":Oe,"./names/planet/tail.txt":ke,"./names/rooms/Agricultural.txt":Ae,"./names/rooms/Ceremonial.txt":je,"./names/rooms/Commercial.txt":Me,"./names/rooms/Industrial.txt":Ne,"./names/rooms/Military.txt":Pe,"./names/rooms/Research.txt":Fe,"./names/sector/descriptor.txt":Ie,"./names/sector/index.txt":Le,"./names/sector/noun.txt":Re,"./names/solar-system/index.txt":ze,"./names/solar-system/prefix.txt":Be,"./names/solar-system/suffix.txt":Ve,"./names/street/adjective.txt":He,"./names/street/index.txt":Ue,"./names/street/noun.txt":We,"./themes/atmosphere/lighting/abyssal.txt":Ge,"./themes/atmosphere/lighting/analog.txt":Ke,"./themes/atmosphere/lighting/ancient.txt":qe,"./themes/atmosphere/lighting/atomic.txt":Je,"./themes/atmosphere/lighting/digital.txt":Ye,"./themes/atmosphere/lighting/entropic.txt":Xe,"./themes/atmosphere/lighting/future.txt":Ze,"./themes/atmosphere/lighting/index.txt":Qe,"./themes/atmosphere/lighting/industrial.txt":$e,"./themes/atmosphere/lighting/singularity.txt":et,"./themes/atmosphere/structures/Agricultural.txt":tt,"./themes/atmosphere/structures/Ceremonial.txt":nt,"./themes/atmosphere/structures/Commercial.txt":rt,"./themes/atmosphere/structures/Industrial.txt":it,"./themes/atmosphere/structures/Military.txt":at,"./themes/atmosphere/structures/Research.txt":ot,"./themes/atmosphere/structures/Singularity.txt":st,"./themes/atmosphere/structures/abyssal.txt":ct,"./themes/atmosphere/structures/index.txt":lt,"./themes/atmosphere/walls/abyssal.txt":ut,"./themes/atmosphere/walls/baroque.txt":dt,"./themes/atmosphere/walls/gilded.txt":ft,"./themes/atmosphere/walls/monolith.txt":pt,"./themes/atmosphere/walls/neon.txt":mt,"./themes/atmosphere/walls/organic.txt":ht,"./themes/atmosphere/walls/rust.txt":gt,"./themes/atmosphere/walls/shogun.txt":_t,"./themes/atmosphere/walls/void.txt":vt,"./themes/atmosphere/walls/zenith.txt":yt,"./themes/colours.txt":bt,"./themes/conditions.txt":xt,"./themes/cultures/abyssal.txt":St,"./themes/cultures/baroque.txt":Ct,"./themes/cultures/gilded.txt":wt,"./themes/cultures/index.txt":Tt,"./themes/cultures/monolith.txt":Et,"./themes/cultures/neon.txt":Dt,"./themes/cultures/organic.txt":Ot,"./themes/cultures/rust.txt":kt,"./themes/cultures/shogun.txt":At,"./themes/cultures/void.txt":jt,"./themes/cultures/zenith.txt":Mt,"./themes/descriptions/corridor.txt":Nt,"./themes/descriptions/floor.txt":Pt,"./themes/descriptions/index.txt":Ft,"./themes/doors/index.txt":It,"./themes/doors/inscriptions.txt":Lt,"./themes/doors/materials.txt":Rt,"./themes/doors/states.txt":zt,"./themes/index.txt":Bt,"./themes/planet-frames.txt":Vt,"./themes/timelines/analog.txt":Ht,"./themes/timelines/ancient.txt":Ut,"./themes/timelines/atomic.txt":Wt,"./themes/timelines/digital.txt":Gt,"./themes/timelines/entropic.txt":Kt,"./themes/timelines/future.txt":qt,"./themes/timelines/index.txt":Jt,"./themes/timelines/industrial.txt":Yt,"./themes/timelines/singularity.txt":Xt,"./themes/traits.txt":Zt})}read(e){return this.#e[`./${e}`]}paths(){return Object.keys(this.#e).map(e=>e.replace(/^\.\//,``))}},$t=class{#e;#t=new Map;constructor(e){this.#e=e}index(e){return this.list(`${e}/index`)}has(e){return this.#t.has(e)||this.#e.read(`${e}.txt`)!==void 0}list(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#n(`${e}.txt`);return this.#t.set(e,n),n}pairs(e){return this.list(e).map(t=>{let n=t.indexOf(`|`);if(n<0)throw Error(`content file ${e}.txt: '${t}' is not a key|value line`);return[t.slice(0,n).trim(),t.slice(n+1).trim()]})}triples(e){return this.list(e).map(t=>{let[n,r,i,...a]=t.split(`|`);if(n===void 0||r===void 0||i===void 0||a.length>0)throw Error(`content file ${e}.txt: '${t}' is not a name|sentence|key line`);return[n.trim(),r.trim(),i.trim()]})}#n(e){let t=this.#e.read(e);if(t===void 0)throw Error(`content file is missing: ${e}`);let n=t.split(/\r?\n/).map(e=>e.trim()).filter(e=>e!==``);if(n.length===0)throw Error(`content file has no entries: ${e}`);return Object.freeze(n)}},en=/^0(\.(0|[1-9]\d*))*$/,v=class e{#e;constructor(e){for(let t of e)if(!Number.isSafeInteger(t)||t<0)throw RangeError(`a child index is a whole number from zero up, got ${String(t)}`);this.#e=Object.freeze([...e])}static parse(t){if(!en.test(t))return;let n=t.split(`.`).slice(1).map(Number);return n.every(e=>Number.isSafeInteger(e))?new e(n):void 0}child(t){return new e([...this.#e,t])}parent(){return this.#e.length===0?void 0:new e(this.#e.slice(0,-1))}indices(){return this.#e}depth(){return this.#e.length}equals(e){return this.toString()===e.toString()}toString(){return[`0`,...this.#e.map(String)].join(`.`)}},tn=class{drawnBy(e){return e.unseen()}},nn=class{#e;constructor(e){this.#e={...e,parts:[...e.parts]}}drawnBy(e){return e.area(this.#e)}},rn=`☠`,an=`map`,y=class{#e;#t;constructor(e){this.#e=e}callSign(){return this.name()}ordinal(){return this.index()+1}goesByNumber(){return!1}facts(){return[]}portrait(e){return new tn}area(e,t=0){return new nn({look:e,parts:this.listing().flatMap(e=>e.onArea()),signal:t})}onArea(){return[]}bandPortrait(e,t){return this.portrait(e)}onStreet(){return[]}onTower(){return[]}onCorridor(){return[]}readings(){return[]}listing(){return this.children()}admits(e){return this.listing().includes(e)}arrival(){return this}arrive(){let e=this.arrival();return e===this?this:e.arrive()}current(){return!1}exit(){return this.parent()?.arrival()}leave(){return this.exit()}leaveLabel(){return`Leave ${this.kind().title()}`}moves(){return[]}leadsTo(e){}move(e){if(this.moves().some(t=>t.id===e))throw Error(`${this.kind().key()} offers the move '${e}' but does not make it`)}survey(){}remember(){}recall(e){return e===this.remember()}startOfJourney(){return this.children()[0]?.startOfJourney()??this}sealed(){return!1}landmark(){return!1}contents(){return null}scan(e){}scanned(e){return[]}sensed(){return``}findRelic(e){return this.contents()?.objects.find(t=>t.key()===e)}capture(e){if(this.contents()?.objects[e]!==void 0)throw Error(`${this.kind().key()} holds things but does not hand them over`)}drop(e){if(this.contents()!==null)throw Error(`${this.kind().key()} holds things but takes none in (${e.name()})`);return!1}lottery(e){}echo(){}sample(){this.parent()?.sample()}infuse(){this.parent()?.infuse()}forge(e){return this.parent()?.forge(e)}keystone(){return this.parent()?.keystone()}prime(){return this.parent()?.prime()??!1}breachOffered(e){return!1}breach(e){}abyssal(){return this.parent()?.abyssal()??!1}peers(){return this.parent()?.children()??[]}root(){return this.parent()?.root()??this}indoors(){return this.parent()?.indoors()??!1}mapped(){return!0}mapNodes(){return this.listing()}mapGlyph(){return this.abyssal()?rn:this.kind().icon()}mapSpot(e,t){let n=this.seed().branch(an);return{x:n.branch(`x`).range(0,e-1),y:n.branch(`y`).range(0,t-1)}}drainFactor(){return this.parent()?.drainFactor()??1}vibe(){return this.parent()?.vibe()}vibeFigure(){return this.vibe()?.figure()??{held:`none`}}poleSigns(){return[]}drainEra(){return this.vibe()?.era()}landmarkFactor(){return this.parent()?.landmarkFactor()??1}seed(){return this.#e.seed}parent(){return this.#e.parent}index(){return this.#e.index}address(){return this.parent()?.address().child(this.index())??new v([])}depth(){return this.address().depth()}trail(){return[...this.parent()?.trail()??[],this]}children(){return this.#t??=Object.freeze([...this.#e.children.childrenOf(this)]),this.#t}populated(){return this.#t!==void 0}descendant(e){if(!this.sealed())return e.indices().slice(this.depth()).reduce((e,t)=>{let n=e?.children()[t];return n?.sealed()===!0?void 0:n},this)}locate(e){return e.indices().slice(this.depth()).reduce((e,t)=>e?.children()[t],this)}},on=class{#e;constructor(e){this.#e=e}position(e,t){return{counted:!0,label:this.#e,index:e,total:t}}},sn=class{position(){return{counted:!1}}},b=class{#e;#t;#n;#r;#i;#a;constructor(e){this.#e=e.key,this.#t=e.glyph,this.#n=e.title,this.#r=e.icon,this.#i=e.scale,this.#a=`indexLabel`in e?new on(e.indexLabel):new sn}key(){return this.#e}title(){return this.#n}scale(){return this.#i}icon(){return this.#r}glyph(){return this.#t}position(e,t){return this.#a.position(e,t)}equals(e){return this.#e===e.#e}},cn=new b({key:`apartment`,glyph:`apartment`,title:`Apartment`,scale:`15 m`,icon:`🚪`,indexLabel:`UNIT`}),ln=`dealt`,un=JSON.stringify({surveyed:!0}),dn=class extends y{#e;#t;#n;#r;#i;#a;#o;#s=!1;constructor(e,t){super(e),this.#e=t.door,this.#t=t.behind,this.#n=t.culture,this.#r=t.era,this.#i=t.anomaly,this.#a=t.rooms,this.#o=Object.freeze([...t.relics])}kind(){return cn}name(){return this.#e.description()}door(){return this.#e}onCorridor(){return[{address:this.address().toString(),look:this.#e.look(),words:this.#e.inscription()?.word()??``}]}behind(){return this.#t}culture(){return this.#n}era(){return this.#r}anomaly(){return this.#i}poleSigns(){return[...this.#e.stable()?[]:[{look:`door`,word:this.#e.stateWord()}],...this.#i?[{look:`anomaly`,word:`anomaly`}]:[]]}vibeFigure(){return this.vibe()?.figure({drawn:{era:this.#r,culture:this.#n}})??super.vibeFigure()}roomCount(){return this.#a}relics(){return this.#o}relicsIn(e){return this.#o.filter((t,n)=>this.seed().branch(ln).branch(n).range(0,this.#a-1)===e)}plan(e){let t=this.children(),n=new Set(t.filter(e).flatMap(e=>e.moves().map(t=>e.leadsTo(t.id)?.address().toString()??``)));return t.map(t=>{let r=e(t),i=t.address().toString();return{address:i,name:t.name(),sight:r?`visited`:this.#s||n.has(i)?`known`:`fog`,relics:r||this.#s?t.contents()?.objects.length??0:0}})}survey(){this.#s=!0}remember(){return this.#s?un:void 0}recall(e){return e===un&&(this.#s=!0,!0)}arrival(){return this.children()[0]??this}readings(){return[{key:`narrative`,label:``,value:this.#e.narrative()}]}scanned(){return[{key:`signal`,label:`TRACE`,value:this.#e.trace().name()},{key:`alert`,label:`INSCRIPTION`,value:this.#e.inscription()?.formatted()??``},{key:`reading`,label:`MATERIAL`,value:this.#e.material()},{key:`reading`,label:`STATE`,value:this.#e.state()},{key:`zone`,label:`ROOM_TYPE`,value:this.#t.name()}]}sensed(){return this.#e.sensed()}scan(e){return{title:`[STRATA_OVERVIEW]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:t,current:!1,note:``}))}}description(){return[]}facts(){let e=this.#c();return[this.#r.fact(),this.#n.fact(),...e===``?[]:[{key:`drift`,label:`Drift`,value:e}],...this.#i?[{key:`alert`,label:`Temporal anomaly`,value:``}]:[]]}#c(){let e=this.vibeFigure();return e.held===`country`?[...e.drift.era?[`era`]:[],...e.drift.culture?[`culture`]:[]].join(` · `):``}status(){return this.#i?`ATMOS: [UNSTABLE]`:`ATMOS: [NOMINAL]`}wayOut(){return`Leave the ${this.kind().title().toLowerCase()}`}childrenHeading(){return`Internal cells detected`}approachVerb(){return`Enter Room:`}bandPortrait(e,t){return t===void 0?super.bandPortrait(e,t):t.portrait(e)}},fn=new b({key:`crypt`,glyph:`apartment`,title:`Crypt`,scale:`15 m`,icon:`🚪`,indexLabel:`UNIT`}),pn=class extends dn{kind(){return fn}facts(){return[...super.facts(),{key:`alert`,label:`Abyssal resonance`,value:``}]}status(){return`ATMOS: [PRESSURE_HIGH]`}},mn=`hidden`,hn=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.steps,this.#n=e.frequency}key(){return`${mn}(${this.#e.toString()}@${String(this.#t)})`}name(){return`Hidden Frequency`}frequency(){return this.#n}resonant(){return!1}data(){return{kind:mn,from:this.#e.toString(),steps:this.#t}}},gn=`hybrid`,_n=`-`,vn=` Hybrid`,yn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return`${gn}(${this.#e.key()}+${this.#t.key()})`}name(){let e=e=>e.name().split(` `)[0]??``;return`${e(this.#e)}${_n}${e(this.#t)}${vn}`}frequency(){return this.#e.frequency().plus(this.#t.frequency())}resonant(){return this.frequency().resonant()}data(){return{kind:gn,parts:[this.#e.data(),this.#t.data()]}}},bn=11,xn={times:11,over:10},Sn=class e{#e;constructor(e){if(!Number.isInteger(e)||e<0)throw RangeError(`a frequency is a whole number of hertz from zero up, got ${String(e)}`);this.#e=e}hertz(){return this.#e}plus(t){return new e(this.#e+t.#e)}amplified(){return new e(Math.floor(this.#e*xn.times/xn.over))}resonant(){return this.#e>0&&this.#e%bn===0}equals(e){return this.#e===e.#e}},Cn=`keystone`,wn=new Sn(0),Tn=class{#e;#t;constructor(e){this.#e=e.name,this.#t=e.building}key(){return`${Cn}(${this.#t.toString()})`}name(){return this.#e}frequency(){return wn}resonant(){return!1}building(){return this.#t}data(){return{kind:Cn,building:this.#t.toString()}}},En=`relic`,Dn=class{#e;constructor(e){this.#e=e}facts(){return this.#e}key(){return this.#e.relic.key()}name(){return this.#e.relic.name()}frequency(){return this.#e.frequency}resonant(){return this.#e.resonant}from(){return this.#e.from}data(){return{kind:En,from:this.#e.from.toString(),key:this.#e.relic.key()}}},On=`echo`,kn=class{#e;#t;constructor(e){this.#e=e.from,this.#t=e.frequency}key(){return`${On}(${this.#e.toString()})`}name(){return`Spectral Echo`}frequency(){return this.#t}resonant(){return!1}data(){return{kind:On,from:this.#e.toString()}}};function An(e,t){if(typeof t!=`string`)return;let n=v.parse(t);return n===void 0?void 0:e.locate(n)}function jn(e){if(Array.isArray(e))return`[${e.map(jn).join(`,`)}]`;if(typeof e==`object`&&e){let t=e;return`{${Object.keys(t).sort().map(e=>`${JSON.stringify(e)}:${jn(t[e])}`).join(`,`)}}`}return JSON.stringify(e)}var Mn={[En]:({from:e,key:t},n)=>typeof t==`string`?An(n,e)?.findRelic(t):void 0,[gn]:({parts:e},t,n)=>{if(!Array.isArray(e)||e.length!==2)return;let[r,i]=e,a=n.read(r,t),o=n.read(i,t);return a===void 0||o===void 0?void 0:new yn(a,o)},[Cn]:({building:e},t)=>An(t,e)?.keystone(),[mn]:({from:e,steps:t},n)=>typeof t==`number`?An(n,e)?.lottery(t):void 0,[On]:({from:e},t)=>An(t,e)?.echo()?.fragment()},Nn=class{read(e,t){if(typeof e!=`object`||!e||Array.isArray(e))return;let n=e,r=(typeof n.kind==`string`?Mn[n.kind]:void 0)?.(n,t,this);if(r!==void 0)return jn(r.data())===jn(n)?r:void 0}readAll(e,t){if(!Array.isArray(e))return;let n=[];for(let r of e){let e=this.read(r,t);if(e===void 0)return;n.push(e)}return n}},Pn=new Set([`a`,`e`,`i`,`o`,`u`]),Fn=97,In=new Set([11,22,33]),Ln=class{#e;constructor(e){let t=0;for(let n of e.toLowerCase())n<`a`||n>`z`||Pn.has(n)||(t+=n.charCodeAt(0)-Fn+1);this.#e=t}sum(){return this.#e}master(){return In.has(this.#e)}frequencyAt(e){return new Sn((this.master()?this.#e*2:this.#e)*e)}},Rn=Array.from(`█▓▒░/\\%!$#*`),zn=class{mangle(e,t,n){return Array.from(e,(e,r)=>e===` `||e===`
`||!n.branch(r).probability(t)?e:n.branch(r).pick(Rn)).join(``)}},Bn=class{#e;constructor(e){this.#e=new Map(e.map(e=>[e.move.id,e]))}offered(e){return[...this.#e.values()].filter(t=>t.to(e)!==void 0).map(e=>e.move)}to(e,t){return this.#e.get(t)?.to(e)}make(e,t){let n=this.#e.get(t),r=n?.to(e);return n!==void 0&&r!==void 0&&n.act?.(e),r}},Vn=class{#e;constructor(e){this.#e=e}drawnBy(e){return e.plan(this.#e)}},Hn=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.walls,this.#t=e.light,this.#n=e.cold,this.#r=e.furniture,this.#i=e.anomaly}walls(){return this.#e}light(){return this.#t}cold(){return this.#n}furniture(){return this.#r}anomaly(){return this.#i}equals(e){return this.#e===e.#e&&this.#t===e.#t&&this.#n===e.#n&&this.#r===e.#r&&this.#i===e.#i}},Un=new b({key:`room`,glyph:`room`,title:`Room`,scale:`5 m`,icon:`□`,indexLabel:`ROOM`}),Wn=new zn,Gn={structure:.2,walls:.1,lighting:.3},Kn=`static`,qn=new Nn,Jn=`action`,Yn=.3,Xn={min:1e6,max:9999999},Zn=8,Qn={resonant:`≈≈≈`,plain:`~~~`,degraded:`###`},$n=new Bn([{move:{id:`back`,label:`Go back`,opposite:`forward`},to:e=>e.neighbour(-1)},{move:{id:`forward`,label:`Go forward`,opposite:`back`},to:e=>e.neighbour(1)}]),er=class extends y{#e;#t;#n;#r;#i;#a;#o=[];#s=[];constructor(e,t){super(e),this.#e=e.parent,this.#t=t.name,this.#n=t.category,this.#r=t.atmosphere,this.#i=t.traits,this.#a=Object.freeze([...t.furniture])}kind(){return Un}name(){return this.#t}type(){return this.#n.name()}category(){return this.#n}oxygen(){return this.#i.oxygen}temperature(){return this.#i.temperature}signal(){return this.#i.signal}atmosphere(){return this.#r}furniture(){return this.#a}objects(){return[...this.#c().map(e=>this.#l(e)),...this.#s]}contents(){return{objects:this.objects(),furniture:this.furniture()}}findRelic(e){let t=this.#e.relicsIn(this.index()).find(t=>t.key()===e);return t===void 0?void 0:this.#l(t)}capture(e){let t=this.#c();if(!Number.isInteger(e)||e<0)return;if(e<t.length){let n=t[e];return n===void 0?void 0:(this.#o.push(n.key()),{fragment:this.#l(n),fresh:!0})}let[n]=this.#s.splice(e-t.length,1);return n===void 0?void 0:{fragment:n,fresh:!1}}drop(e){return this.#s.push(e),!0}remember(){if(this.#o.length!==0||this.#s.length!==0)return JSON.stringify({taken:this.#o,dropped:this.#s.map(e=>e.data())})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{taken:n,dropped:r,...i}=t;if(Object.keys(i).length>0||!Array.isArray(n))return!1;let a=n,o=new Set(this.#e.relicsIn(this.index()).map(e=>e.key()));if(!a.every(e=>typeof e==`string`&&o.has(e))||new Set(a).size!==a.length)return!1;let s=qn.readAll(r,this.root());return s===void 0||a.length===0&&s.length===0?!1:(this.#o.splice(0,this.#o.length,...a),this.#s.splice(0,this.#s.length,...s),!0)}#c(){return this.#e.relicsIn(this.index()).filter(e=>!this.#o.includes(e.key()))}#l(e){let t=this.vibe()?.culture(),n=t!==void 0&&this.#e.culture().equals(t),r=new Ln(e.name()).frequencyAt(this.depth());return new Dn({relic:e,from:this.address(),frequency:n?r.amplified():r,resonant:n})}listing(){return[]}mapped(){return!1}lottery(e){let t=this.seed().branch(Jn).branch(e);if(t.branch(`win`).probability(Yn))return new hn({from:this.address(),steps:e,frequency:new Sn(t.branch(`hertz`).range(Xn.min,Xn.max))})}portrait(e){return new Vn({rooms:this.#e.plan(e),here:this.address().toString(),look:this.look()})}look(){return new Hn({walls:this.#r.keys.walls,light:this.#r.keys.light,cold:this.#i.temperature<Zn,furniture:this.#a.length,anomaly:this.#e.anomaly()})}survey(){this.#e.survey()}scan(e){return this.#e.scan(e)}scanned(e){let t=new Ln(this.#t).frequencyAt(this.depth()),n=this.#e.anomaly()?{key:`alert`,label:`WAVE`,value:Qn.degraded}:t.resonant()?{key:`stable`,label:`WAVE`,value:Qn.resonant}:{key:`signal`,label:`WAVE`,value:Qn.plain};return[{key:`reading`,label:`FREQ`,value:`${String(t.hertz())}Hz`},n,e(this)?{key:`stable`,label:`STATUS`,value:`[VISITED]`}:{key:`reading`,label:`STATUS`,value:`[UNSTABLE]`},{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`IDENTIFIER`,value:this.#t}]}neighbour(e){return this.#e.children()[this.index()+e]}moves(){return $n.offered(this)}leadsTo(e){return $n.to(this,e)}move(e){return $n.make(this,e)}exit(){return this.index()===0?this.#e.exit():void 0}leaveLabel(){return this.#e.wayOut()}description(){let{structure:e,colour:t,walls:n,lighting:r}=this.#r,i=(e,t)=>this.#e.anomaly()?Wn.mangle(t,Gn[e],this.seed().branch(Kn).branch(e)):t;return[`You are in ${i(`structure`,e)}. The walls are ${t} ${i(`walls`,n)}.`,`The space is illuminated by ${i(`lighting`,r)}.`]}vibeFigure(){return this.#e.vibeFigure()}facts(){let e=this.#e.anomaly()?[{key:`alert`,label:`Degraded`,value:``}]:[];return[this.#e.era().fact(),{key:`reading`,label:`Type`,value:this.type()},{key:`reading`,label:`Oxygen`,value:`${String(this.#i.oxygen)}%`},{key:`reading`,label:`Temp`,value:`${String(this.#i.temperature)}°C`},{key:`signal`,label:`Signal`,value:this.#i.signal},...e]}status(){return``}childrenHeading(){return``}approachVerb(){return``}},tr=new b({key:`shard`,glyph:`room`,title:`Shard`,scale:`5 m`,icon:`☠`,indexLabel:`SHARD`}),nr=class extends er{kind(){return tr}leaveLabel(){return`Exit Crypt`}},rr=new b({key:`universe`,glyph:`universe`,title:`Universe`,scale:`10²⁶ m`,icon:`∞`}),ir=class extends y{kind(){return rr}name(){return`The Endless Universe`}description(){return[`A neural web of infinite complexity.`]}status(){return``}childrenHeading(){return`Primary filaments radiating from root`}approachVerb(){return`Synchronize with`}portrait(){return this.area(`universe`)}},ar=.01,or={min:1,max:10},sr={min:5,max:19},cr=`relics`,lr={kind:cn,rooms:Un,make:(e,t)=>new dn(e,t)},ur=class{#e;#t;#n;#r;#i;#a;constructor(e,t,n,r=lr){this.#e=r,this.#t=t.doors,this.#n=n,this.#r=e.of(or,()=>r.rooms),this.#i=t.deck,this.#a=t.deal}kind(){return this.#e.kind}create(e){let t=e.parent.vibe(),n=t?.mutation();if(t===void 0||n===void 0)throw Error(`an apartment takes its culture, era and trait from the country above: it needs one`);let r=e.seed.branch(`anomaly`).probability(ar),i=r?t.culture():t.pickCulture(e.seed.branch(`culture`)),a=r?t.era():t.pickEra(e.seed.branch(`era`)),o=e.seed.branch(cr),s=this.#n.categoryOf(e.seed.child(0),n);return this.#e.make(e,{door:this.#t.of(e.seed,s),behind:s,culture:i,era:a,anomaly:r,rooms:this.#r.count(e.seed),relics:this.#a.take(o,this.#i.of(i,a),o.range(sr.min,sr.max))})}populate(e){return this.#r.exactly(e,e.roomCount())}},dr=`themes/atmosphere`,fr=`themes/cultures`,pr=`themes/timelines`,mr=`themes/colours`,hr=`glitch`,gr=.05,_r=.5,vr=[`abyssal`,`Singularity`],yr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t){let n=e.branch(hr),r=t.anomaly||n.probability(gr),i=e=>r&&n.branch(e).probability(_r),a=this.#e.index(fr),o=this.#e.index(pr),s=i(`walls`)?n.branch(`walls`).pick(a):t.culture.key(),c=i(`lighting`)?n.branch(`lighting`).pick(o):t.era.key(),l=i(`structure`)?n.branch(`structure`).pick(vr):t.trait.key(),u=this.#n(`structures`,l,`${dr}/structures`),d=this.#n(`walls`,s,fr),f=this.#n(`lighting`,c,`${dr}/lighting`);return{structure:e.branch(`structure`).pick(this.#r(`structures`,u)),colour:e.branch(`colour`).pick(this.#e.list(mr)),walls:e.branch(`walls`).pick(this.#r(`walls`,d)),lighting:e.branch(`lighting`).pick(this.#r(`lighting`,f)),keys:{walls:d,light:f}}}#n(e,t,n){let r=`${dr}/${e}/${t}`;if(this.#e.has(r))return t;let i=this.#e.index(n)[0]??``;return this.#t.warn(`[THEME_WARN] no ${e} file for '${t}' — falling back to '${i}' (${r}.txt)`),i}#r(e,t){return this.#e.list(`${dr}/${e}/${t}`)}},x=`names/buildings`,br=300,xr=5,Sr=50,Cr=2500,wr=1500,Tr=4094,Er=[10,20],Dr=class{#e;constructor(e){this.#e=e}nameOf(e,t){let n=e.branch(`name`),r=n.branch(`rarity`).range(0,9999),i=this.landmarkChance(t.depth,t.landmarkFactor);if(r<i)return{name:n.branch(`landmark`).pick(this.#e.list(`${x}/landmarks`)),landmark:!0};let a=n.branch(`pattern`).range(0,1);return{name:r<i+wr?this.#t(n,a,t):this.#r(n,a,t.culture),landmark:!1}}landmarkChance(e,t){let n=br+Math.max(0,e-xr)*Sr;return Math.min(Cr,n*t)}#t(e,t,n){if(t===0)return`Unit 0x${e.branch(`serial`).range(0,Tr).toString(16).toUpperCase()} ${e.branch(`size-word`).pick(this.#n(n.floors))}`;let r=e.branch(`concept`).pick(this.#e.list(`${x}/concepts`));return`The ${this.#i(e,n.culture)} of ${r}`}#n(e){let t=this.#e.index(`${x}/sizes`),n=Er.filter(t=>e>=t).length,r=t[Math.min(n,t.length-1)];if(r===void 0)throw Error(`${x}/sizes/index names no list`);return this.#e.list(`${x}/sizes/${r}`)}#r(e,t,n){if(t===0)return`${e.branch(`adjective`).pick(this.#e.list(`${x}/adj/${n.key()}`))} ${this.#i(e,n)}`;let r=e.branch(`compound`).pick(this.#e.list(`${x}/compounds`));return`${this.#i(e,n)}${r}`}#i(e,t){return e.branch(`noun`).pick(this.#e.list(`${x}/noun/${t.key()}`))}},Or={min:0,max:99},kr=[{upTo:40,size:{floors:{min:3,max:10},doors:{min:2,max:6}}},{upTo:70,size:{floors:{min:10,max:25},doors:{min:4,max:10}}},{upTo:90,size:{floors:{min:30,max:50},doors:{min:8,max:16}}},{upTo:Or.max,size:{floors:{min:50,max:100},doors:{min:10,max:20}}}],Ar=class{bandFor(e){let t=Number.isInteger(e)&&e>=Or.min?kr.find(t=>e<=t.upTo):void 0;if(t===void 0)throw RangeError(`a size roll is a whole number from 0 to 99, not ${String(e)}`);return t.size}bandOf(e){return this.bandFor(e.branch(`size`).range(Or.min,Or.max))}floorsOf(e){let t=this.bandOf(e).floors;return e.branch(`floors`).range(t.min,t.max)}doorsPerFloorOf(e){let t=this.bandOf(e).doors;return e.branch(`doors`).range(t.min,t.max)}},jr=[`long`,`service`,`curved`,`static`];function Mr(e){let t=jr.find(t=>t===e);if(t===void 0)throw Error(`themes/descriptions/corridor.txt: '${e}' is not a corridor shape (${jr.join(`, `)})`);return t}var Nr=class{#e;#t;constructor(e){this.#e=e.of(`corridor`),this.#t=this.#e.lines(Mr)}dealt(e){return this.#e.dealtFrom(e,this.#t)}},Pr=class{nth(e,t,n){let r=this.take(e,t,n+1).at(-1);if(r===void 0)throw RangeError(`a deal always deals`);return r}take(e,t,n){if(t.length===0)throw RangeError(`a deal needs at least one item`);let r=[];for(let i=0;r.length<n;i++){let a=[...t];for(let o=0;o<t.length&&r.length<n;o++){let t=e.branch(i).branch(o).range(0,a.length-1),n=a[t];if(n===void 0)throw RangeError(`a deal always deals`);r.push(n),a=a.filter((e,n)=>n!==t)}}return r}},Fr=`Stable`,Ir=class{#e;#t;#n;#r;constructor(e){this.#e=e.look,this.#t=e.inscription,this.#n=e.trace,this.#r=e.told}material(){return this.#e.material()}state(){return this.#e.state()}look(){return this.#e}inscription(){return this.#t}trace(){return this.#n}stable(){return this.state()===Fr}stateWord(){return this.state().toLowerCase()}brief(){return this.stable()?this.material():`${this.material()}, ${this.stateWord()}`}narrative(){let e=`${this.#r.material} ${this.#r.state}`;return this.#t===void 0?e:`${e} ${this.#t.narrative()}`}sensed(){let e=`${this.#r.material} ${this.#r.state} ${this.#n.sentence()}`;return this.#t===void 0?e:`${e} ${this.#t.narrative()}`}description(){return this.brief()}},Lr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}word(){return this.#e}style(){return this.#t}formatted(){return this.#t.format(this.#e)}narrative(){return this.#t.narrative(this.#e)}},Rr=class{#e;#t;#n;#r;constructor(e){this.#e=e.material,this.#t=e.state,this.#n=e.family,this.#r=e.stateLook}material(){return this.#e}state(){return this.#t}family(){return this.#n}stateLook(){return this.#r}equals(e){return this.#e===e.#e&&this.#t===e.#t&&this.#n===e.#n&&this.#r===e.#r}},zr=[`frost`,`cold`,`static`,`plain`];function Br(e){let t=zr.find(t=>t===e);if(t===void 0)throw Error(`themes/doors/states.txt: '${e}' is not a door state look (${zr.join(`, `)})`);return t}var Vr=[`glass`,`metal`,`stone`,`timber`,`bone`,`plain`];function Hr(e){let t=Vr.find(t=>t===e);if(t===void 0)throw Error(`themes/doors/materials.txt: '${e}' is not a material family (${Vr.join(`, `)})`);return t}var Ur=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.key,this.#t=e.before,this.#n=e.after,this.#r=e.lowered??!1,this.#i=e.applied}key(){return this.#e}format(e){return`${this.#t}${this.#r?e.toLowerCase():e}${this.#n}`}narrative(e){return`The word '${this.#r?e.toLowerCase():e}' is ${this.#i}.`}equals(e){return this.#e===e.#e}},Wr=[new Ur({key:`stamped`,before:`[`,after:`]`,applied:`stamped into the metal in block letters`}),new Ur({key:`scrawled`,before:`_`,after:`_`,lowered:!0,applied:`scrawled across the surface in jagged, desperate lines`}),new Ur({key:`etched`,before:`⟨`,after:`⟩`,applied:`finely etched into the frame, appearing almost as a structural glyph`}),new Ur({key:`burned`,before:`!! `,after:` !!`,applied:`burned into the material with a high-intensity plasma torch`})],Gr=`themes/doors`,Kr=`door`,qr=.2,Jr=class{#e;#t;#n;constructor(e){this.#e=e,this.#t=e.triples(`${Gr}/materials`).map(([e,t,n])=>({name:e,told:t,key:Hr(n)})),this.#n=e.triples(`${Gr}/states`).map(([e,t,n])=>({name:e,told:t,key:Br(n)}))}of(e,t){let n=e.branch(Kr);return new Ir({look:this.look(e),inscription:n.branch(`inscribed`).probability(qr)?this.#a(n,t):void 0,trace:t.trace(),told:{material:this.#r(n).told,state:this.#i(n).told}})}look(e){let t=e.branch(Kr),n=this.#r(t),r=this.#i(t);return new Rr({material:n.name,state:r.name,family:n.key,stateLook:r.key})}#r(e){return e.branch(`material`).pick(this.#t)}#i(e){return e.branch(`state`).pick(this.#n)}#a(e,t){return t.guarantee()??new Lr(e.branch(`word`).pick(this.#e.list(`${Gr}/inscriptions`)),e.branch(`style`).pick(Wr))}},Yr=`names/floors`,Xr=5,Zr=5,Qr=class{#e;constructor(e){this.#e=e}zoneOf(e,t,n){if(t===0)return this.#t(`${Yr}/lobby`);if(t===n-1)return this.#t(`${Yr}/peak`);let r=this.#e.index(`${Yr}/zones`),i=r[t<Xr?0:t>n-Zr?r.length-1:1];if(i===void 0)throw Error(`${Yr}/zones/index names too few lists`);return e.branch(`zone`).pick(this.#e.list(`${Yr}/zones/${i}`))}#t(e){let[t,...n]=this.#e.list(e);if(t===void 0||n.length>0)throw Error(`${e}.txt holds exactly one word`);return t}},$r=`themes/conditions`,ei=`themes/cultures`,ti=`pieces`,ni=`condition`,ri=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t,n){let r=this.#e.list($r),i=this.#e.list(`${ei}/${t.key()}`);return this.#t.take(e.branch(ti),i,Math.min(n,i.length)).map((t,n)=>{let i=e.branch(ni).branch(n).range(0,r.length-1);return t.startsWith(`${r[i]??``} `)&&(i=(i+1)%r.length),`${r[i]??``} ${t}`})}},ii=`name`,ai=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}words(e){return this.#e.index(this.#t).map(t=>this.naming(e).branch(t).pick(this.#e.list(`${this.#t}/${t}`)))}naming(e){return e.branch(ii)}},oi=class{#e;constructor(e){this.#e=e}at(e){return new ai(this.#e,e)}},si=`themes/descriptions`,ci=`sentence`,li=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}dealt(e){return e.branch(ci).pick(this.#e.list(`${si}/${this.#t}`))}lines(e){return this.#e.pairs(`${si}/${this.#t}`).map(([t,n])=>[t,e(n)])}dealtFrom(e,t){return e.branch(ci).pick(t)}},ui=class{#e;constructor(e){this.#e=e}of(e){return new li(this.#e,e)}},di=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}name(){return this.#t}equals(e){return this.#e===e.#e}},fi=`themes/cultures`,pi=`themes/timelines`,mi=[{key:`with`,join:(e,t)=>`${t} with ${e}`},{key:`infused`,join:(e,t)=>`${e} infused with ${t}`},{key:`fused`,join:(e,t)=>`${e} fused to ${t}`},{key:`grafted`,join:(e,t)=>`${t} grafted onto ${e}`}],hi=class{#e;#t=new Map;constructor(e){this.#e=e}of(e,t){let n=`${e.key()}|${t.key()}`,r=this.#t.get(n);return r===void 0&&(r=Object.freeze(this.#n(e,t)),this.#t.set(n,r)),r}#n(e,t){let n=this.#e.list(`${fi}/${e.key()}`),r=this.#e.list(`${pi}/${t.key()}`);return[...n.flatMap(e=>r.flatMap(t=>mi.map(n=>new di(`${n.key}|${e}|${t}`,n.join(e,t))))),...n.map(e=>new di(`culture|${e}`,e)),...r.map(e=>new di(`era|${e}`,e))]}},gi=class{#e;#t;constructor(e,t){this.#e=e,this.#t=[...t]}shape(){return this.#e}looks(){return this.#t}equals(e){return this.#e===e.#e&&this.#t.length===e.#t.length&&this.#t.every((t,n)=>e.#t[n]?.equals(t)===!0)}},_i=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t){let n=e.child(0);return new gi(this.#e.dealt(n)[1],Array.from({length:t},(e,t)=>this.#t.look(n.child(t))))}},vi=`children`,yi=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t===void 0?void 0:{...t,unit:t.unit??1},this.#n=n}of(e){return this.exactly(e,this.count(e.seed()))}count(e){if(this.#t===void 0)throw Error(`this progeny has no count range: use exactly()`);return e.branch(vi).range(this.#t.min,this.#t.max)*this.#t.unit}exactly(e,t,n=0){return Array.from({length:t},(t,r)=>{let i=n+r,a=e.seed().child(i);return this.#n(a).create({parent:e,seed:a,index:i,children:this.#e})})}},bi=class{#e;constructor(e){this.#e=e}of(e,t){return new yi(this.#e,e,e=>this.#e.factoryFor(t(e)))}},xi=new b({key:`corridor`,glyph:`corridor`,title:`Corridor`,scale:`40 m`,icon:`▅`,indexLabel:`CONDUIT`}),Si=class extends y{#e;#t;#n;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.sentence,this.#n=t.shape}kind(){return xi}name(){return`Corridor`}floor(){return this.#e}arrival(){return this.#e}shape(){return this.#n}poleSigns(){return this.#n===`curved`?[{look:`curved`,word:`curved`}]:[]}scan(e){return{title:`[DATA_SUMMARY]`,notes:[],rows:this.children().map((t,n)=>({cells:[{key:`reading`,label:`ID`,value:String(n+1).padStart(2,`0`)},...t.scanned(e)],place:void 0,current:!1,note:t.sensed()}))}}description(){return[`${this.#t}.`]}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[e.fact()],{key:`reading`,label:`Doors`,value:String(this.#e.building().doorsPerFloor())}]}status(){return``}childrenHeading(){return`Doors`}approachVerb(){return`Open`}bandPortrait(){return this.#e.walked()}},Ci=new b({key:`artery`,glyph:`corridor`,title:`Artery`,scale:`40 m`,icon:`▅`,indexLabel:`CONDUIT`}),wi=class extends Si{#e;constructor(e,t){super(e,{sentence:t.sentence,shape:`none`}),this.#e=t.vibe}kind(){return Ci}name(){return`Artery`}vibe(){return this.#e}},Ti=.85,Ei=.1,Di=.9,Oi=2,ki=class e{#e;constructor(e){this.#e={...e,stability:e.stability??Ti,mutation:e.mutation,frame:e.frame??e.culture.frame()}}culture(){return this.#e.culture}era(){return this.#e.era}secondCulture(){return this.#e.secondCulture}secondEra(){return this.#e.secondEra}stability(){return this.#e.stability}stabilityText(){return`${(this.#e.stability*100).toFixed(Oi)}%`}mutation(){return this.#e.mutation}frame(){return this.#e.frame}pickCulture(e){return e.probability(this.#e.stability)?this.#e.culture:this.#e.secondCulture}pickEra(e){return e.probability(this.#e.stability)?this.#e.era:this.#e.secondEra}figure(e={}){let t=this.#e,n={era:t.secondEra.key(),culture:t.secondCulture.key()},r=e.drawn??{era:t.era,culture:t.culture},i={era:r.era.key(),culture:r.culture.key()};return t.mutation===void 0?{held:`planet`,main:i,second:n,stability:t.stability}:{held:`country`,main:i,second:n,stability:t.stability,trait:t.mutation.key(),rebel:e.rebel??!1,drift:{era:!r.era.equals(t.era),culture:!r.culture.equals(t.culture)}}}mutate(t,n){let r=Math.max(Ei,Math.min(Di,this.#e.stability+n));return new e({...this.#e,stability:r,mutation:t})}rebel(){return new e({...this.#e,culture:this.#e.secondCulture,secondCulture:this.#e.culture,era:this.#e.secondEra,secondEra:this.#e.era})}},Ai=`A pulsing, organic artery of data`,ji=1,Mi=class{#e;#t;constructor(e,t){this.#e=t,this.#t=e.of(void 0,()=>fn)}kind(){return Ci}create(e){let t=e.parent.vibe();if(t===void 0)throw Error(`an artery lies under a country: it needs its trait`);let n=this.#e.bedrock();return new wi(e,{sentence:Ai,vibe:new ki({era:n.era,culture:n.culture,secondCulture:n.culture,secondEra:n.era,stability:ji,mutation:t.mutation()})})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Ni=class{#e;constructor(e){this.#e=e}drawnBy(e){return e.tower(this.#e)}},Pi=new b({key:`building`,glyph:`building`,title:`Building`,scale:`10² m`,icon:`⌂`,indexLabel:`Building`}),Fi=0,Ii=2,Li=7,Ri=10,zi=[`elevator`,`sampled`,`merges`,`breached`],Bi=class extends y{#e;#t;#n;#r;#i=Fi;#a=new Set;#o=0;#s=!1;constructor(e,t){super(e),this.#e=t.name,this.#t=t.landmark,this.#n=t.floors,this.#r=t.doorsPerFloor}kind(){return Pi}name(){return this.#e}landmark(){return this.#t}onStreet(){return[{address:this.address().toString(),floors:this.#n,doors:this.#r}]}portrait(){let e=this.children(),t=this.#s?e.slice(this.#n).reverse():[];return new Ni({address:this.address().toString(),landmark:this.#t,car:this.#i,breached:this.#s,rows:[...t,...e.slice(0,this.#n)].flatMap(e=>e.onTower())})}floors(){return this.#n}layers(){return Ri}doorsPerFloor(){return this.#r}elevatorAt(){return this.#i}elevatorTo(e){this.#i=e}floorNumbered(e){return e>=0?e<this.#n?this.children()[e]:void 0:this.#s?this.children()[this.#n-e-1]:void 0}sampled(){return[...this.#a]}sampleFloor(e){e>=0&&e<this.#n&&this.#a.add(e)}merges(){return this.#o}infuse(){this.#o+=1}primed(){return this.#a.size>=this.#n&&this.#o>=Li}breached(){return this.#s}keystone(){return new Tn({name:`${this.#e} Keystone`,building:this.address()})}forge(e){return this.primed()&&this.#c(e)===void 0?this.keystone():void 0}prime(){for(let e=0;e<this.#n;e++)this.#a.add(e);return this.#o=Li,!0}breachOfferedAt(e,t){return e===this.#n-1&&this.primed()&&!this.#s&&this.#c(t)!==void 0}breachFrom(e,t){if(this.breachOfferedAt(e,t))return this.#s=!0,this.#c(t)}remember(){let e={};return this.#i!==Fi&&(e.elevator=this.#i),this.#a.size>0&&(e.sampled=[...this.#a]),this.#o>0&&(e.merges=this.#o),this.#s&&(e.breached=!0),Object.keys(e).length===0?void 0:JSON.stringify(e)}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let n=t,r=Object.keys(n);if(r.length===0||r.some(e=>!zi.includes(e)))return!1;let{elevator:i,sampled:a,merges:o,breached:s}=n;if(s!==void 0&&s!==!0)return!1;let c=s===!0;if(i!==void 0&&!this.#l(i,c)||a!==void 0&&!this.#u(a)||o!==void 0&&(!Number.isInteger(o)||o<1))return!1;this.#i=i??Fi,this.#a.clear();for(let e of a??[])this.#a.add(e);return this.#o=o??0,this.#s=c,!0}listing(){let e=this.children();return[...e.slice(0,this.#n).reverse(),...this.#s?e.slice(this.#n):[]]}admits(e){return this.floorNumbered(this.#i)===e}description(){return[`An elevator runs the height of the building.`]}scanAround(e,t){let n=this.listing().filter(t=>Math.abs(t.ordinal()-e)<=Ii).sort((e,t)=>t.ordinal()-e.ordinal());return{title:`NEURAL_PROXIMITY_REPORT`,notes:[`BUILDING: ${this.#e}`,`TOTAL_STRATA: ${String(this.#n)} units detected.`],rows:n.map(n=>({cells:[{key:`reading`,label:`ID`,value:String(n.ordinal()).padStart(2,`0`)},...n.scanned(t)],place:void 0,current:n.ordinal()===e,note:``}))}}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[e.fact()],{key:`reading`,label:`Floors`,value:String(this.#n)},...this.#t?[{key:`alert`,label:`Landmark`,value:``}]:[]]}status(){return this.#s?`The bedrock is breached`:this.#o>0?`${String(this.#o)} ${this.#o===1?`merge`:`merges`} made inside`:``}indoors(){return!0}childrenHeading(){return`Ride to a floor`}approachVerb(){return`Ride to`}#c(e){let t=this.keystone().key();return e.find(e=>e.key()===t)}#l(e,t){return typeof e!=`number`||!Number.isInteger(e)||e===Fi?!1:e>0?e<this.#n:t&&this.#n-e-1<this.children().length}#u(e){if(!Array.isArray(e)||e.length===0)return!1;let t=e;return t.every(e=>typeof e==`number`&&Number.isInteger(e)&&e>=0&&e<this.#n)?new Set(t).size===t.length:!1}},Vi=new Bn([{move:{id:`elevator`,label:`Back to Elevator`,opposite:`corridor`},to:e=>e,act:e=>{e.returnToElevator()}}]),Hi=class{id(){return`corridor`}portrait(e){return e.walked()}listing(e){return e.corridor().listing()}admits(e,t){return t===e.corridor()}moves(e){return Vi.offered(e)}leadsTo(e,t){return Vi.to(e,t)}move(e,t){return Vi.make(e,t)}facts(e){return e.corridor().facts()}description(e){return e.corridor().description()}status(e){return e.corridor().status()}childrenHeading(e){return e.corridor().childrenHeading()}approachVerb(e){return e.corridor().approachVerb()}scan(e,t){return e.corridor().scan(t)}},Ui=0,Wi=new Bn([{move:{id:`up`,label:`Go Up`,opposite:`down`},to:e=>e.neighbour(1)},{move:{id:`down`,label:`Go Down`,opposite:`up`},to:e=>e.number()===Ui?void 0:e.neighbour(-1)},{move:{id:`descend`,label:`Descend into the Substrate`,opposite:`up`},to:e=>e.number()===Ui?e.neighbour(-1):void 0},{move:{id:`corridor`,label:`Enter Corridor`,opposite:`elevator`},to:e=>e,act:e=>{e.enterCorridor()}}]),Gi=class{id(){return`elevator`}portrait(e){return e.building().portrait()}listing(){return[]}admits(){return!1}moves(e){return Wi.offered(e)}leadsTo(e,t){return Wi.to(e,t)}move(e,t){return Wi.make(e,t)}facts(e){let t=e.vibe();return t===void 0?[]:[t.era().fact(),t.culture().fact(),{key:`reading`,label:`Stability`,value:t.stabilityText()},{key:`trait`,label:`Trait`,value:t.mutation()?.key()??`Standard`}]}description(e){return[`${e.name()}. ${e.sentence()}`]}status(e){return e.diagnostic()}childrenHeading(){return``}approachVerb(){return``}scan(e,t){return e.building().scanAround(e.number(),t)}},Ki=class{of(e){return String(e)}},qi=class{of(e){return`-0x${Math.abs(e).toString(16).toUpperCase()}`}},Ji={floor:new Ki,layer:new qi},Yi=class{#e;#t;constructor(e,t){if(e<0!=(t===`layer`))throw RangeError(`a ${t} cannot stand at level ${String(e)}: floors from 0 up, Layers below`);this.#e=e,this.#t=t}number(){return this.#e}kind(){return this.#t}belowBedrock(){return this.#e<0}label(){return Ji[this.#t].of(this.#e)}equals(e){return this.#e===e.#e&&this.#t===e.#t}},Xi=class e{#e;constructor(e){this.#e=e}capitalised(){return this.#e.charAt(0).toUpperCase()+this.#e.slice(1)}plain(){return new e(this.#e.toLowerCase()).capitalised()}equals(e){return this.#e===e.#e}},Zi=class{#e;constructor(e){this.#e=e}drawnBy(e){return e.corridor(this.#e)}},Qi=new b({key:`floor`,glyph:`floor`,title:`Floor`,scale:`60 m`,icon:`▤`}),$i=new Gi,ea=new Hi,ta=new Map([$i,ea].map(e=>[e.id(),e])),na={min:1e3,max:2999},ra=new gi(`none`,[]),ia=class extends y{#e;#t;#n;#r;#i;#a=$i;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.number,this.#n=t.zone,this.#r=t.sentence,this.#i=t.passage??ra}kind(){return Qi}number(){return this.#t}name(){return`Floor ${String(this.#t)}`}callSign(){return this.#t===0?`Lobby`:this.#t===this.#e.floors()-1?`Peak`:this.name()}ordinal(){return this.#t}goesByNumber(){return!0}arrive(){return this.#e.elevatorTo(this.#t),this}onTower(){return[{address:this.address().toString(),level:this.level(),shape:this.#i.shape(),looks:this.#i.looks()}]}level(){return new Yi(this.#t,this.levelKind())}levelKind(){return`floor`}portrait(){return this.#a.portrait(this)}current(){return this.#e.elevatorAt()===this.#t}zone(){return this.#n}sentence(){return this.#r}resonance(){return this.seed().branch(`resonance`).range(na.min,na.max)}readings(){return[{key:`zone`,label:`Zone`,value:new Xi(this.#n.replaceAll(`_`,` `)).plain()}]}building(){return this.#e}diagnostic(){return``}peers(){return this.#e.children().slice(0,this.#e.floors())}mapNodes(){return this.corridor().listing()}shape(){return this.#i.shape()}walked(){let e=this.corridor();return new Zi({shape:this.shape(),abyssal:e.abyssal(),doors:e.listing().flatMap(e=>e.onCorridor())})}corridor(){let e=this.children()[0];if(e===void 0)throw Error(`${this.name()} has no corridor`);return e}neighbour(e){return this.#e.floorNumbered(this.#t+e)}sample(){this.#e.sampleFloor(this.#t)}breachOffered(e){return this.#e.breachOfferedAt(this.#t,e)}breach(e){return this.#e.breachFrom(this.#t,e)}enterCorridor(){this.#a=ea}returnToElevator(){this.#a=$i}listing(){return this.#a.listing(this)}admits(e){return this.#a.admits(this,e)}moves(){return this.#a.moves(this)}leadsTo(e){return this.#a.leadsTo(this,e)}move(e){return this.#a.move(this,e)}leave(){return this.returnToElevator(),this.exit()}remember(){return this.#a===$i?void 0:this.#a.id()}recall(e){let t=ta.get(e);return t!==void 0&&(this.#a=t,!0)}facts(){return this.#a.facts(this)}description(){return this.#a.description(this)}bandPortrait(){return this.#e.portrait()}status(){return this.#a.status(this)}childrenHeading(){return this.#a.childrenHeading(this)}approachVerb(){return this.#a.approachVerb(this)}scan(e){return this.#a.scan(this,e)}scanned(){return[{key:`zone`,label:`FUNCTION`,value:this.#n}]}},aa=new b({key:`layer`,glyph:`floor`,title:`Layer`,scale:`60 m`,icon:`▤`,indexLabel:`STRATA`}),oa=`ABYSSAL_SUBSTRATE`,sa=10,ca=100,la=2,ua=class extends ia{constructor(e,t){super(e,{number:t.number,zone:oa,sentence:t.sentence})}kind(){return aa}levelKind(){return`layer`}name(){return`Layer ${this.level().label()}`}readings(){let e=Math.min(ca,Math.abs(this.number())*sa);return[{key:`zone`,label:`FUNCTION`,value:oa},{key:`reading`,label:`ST`,value:`P: ${String(e)}%`},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}sealed(){return!this.building().breached()}abyssal(){return!0}drainFactor(){return la}peers(){return this.building().children().slice(this.building().floors())}},da=class{#e;#t;#n;#r;constructor(e,t){this.#e=t.namer,this.#t=t.sizes,this.#n=e.of(void 0,()=>Qi),this.#r=e.of(void 0,()=>aa)}kind(){return Pi}create(e){let t=e.parent,n=t?.vibe()?.culture();if(t===void 0||n===void 0)throw Error(`a building is named in the culture of its street: it needs a street under a planet`);let r=this.#t.floorsOf(e.seed),i=this.#e.nameOf(e.seed,{culture:n,floors:r,depth:t.depth(),landmarkFactor:t.landmarkFactor()});return new Bi(e,{name:i.name,landmark:i.landmark,floors:r,doorsPerFloor:this.#t.doorsPerFloorOf(e.seed)})}populate(e){return[...this.#n.exactly(e,e.floors()),...this.#r.exactly(e,e.layers(),e.floors())]}},fa=new b({key:`city`,glyph:`city`,title:`City`,scale:`10⁴ m`,icon:`🏙`,indexLabel:`DISTRICT`}),pa=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.rebelVibe}kind(){return fa}name(){return this.#e}vibe(){return this.#t??super.vibe()}vibeFigure(){return this.#t?.figure({rebel:!0})??super.vibeFigure()}description(){return[this.#t===void 0?`A stable regional node connected to the planetary lattice.`:`The air is thick with illegal data-streams and shifting static.`]}facts(){return this.#t===void 0?[]:[{key:`alert`,label:`Rebel district`,value:``},this.#t.era().fact(),this.#t.culture().fact()]}status(){return``}childrenHeading(){return`Streets detected in this city`}approachVerb(){return`Go to`}portrait(){return this.area(`city`)}onArea(){return[{address:this.address().toString(),mark:`city`}]}},ma=class{#e;constructor(e){this.#e=[...e]}drawnBy(e){return e.street(this.#e)}},ha=new b({key:`street`,glyph:`street`,title:`Street`,scale:`10³ m`,icon:`═`,indexLabel:`WAY`}),ga=class extends y{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return ha}name(){return this.#e}description(){return[`Buildings stand in pairs along both sides of the way.`]}facts(){let e=this.vibe();return e===void 0?[]:[e.era().fact(),e.culture().fact()]}status(){return``}childrenHeading(){return`Buildings on this street`}approachVerb(){return`Enter Building:`}portrait(){return new ma(this.listing().flatMap(e=>e.onStreet()))}startOfJourney(){return this}onArea(){return[{address:this.address().toString(),mark:`street`}]}},_a=.1,va=class{#e;#t;constructor(e,t){this.#e=t.at(`names/city`),this.#t=e.of({min:3,max:15},()=>ha)}kind(){return fa}create(e){let t=e.seed.branch(`rebel`).probability(_a);return new pa(e,{name:this.#e.words(e.seed).join(``),rebelVibe:t?e.parent?.vibe()?.rebel():void 0})}populate(e){return this.#t.of(e)}},ya=class{#e;#t;constructor(e,t){this.#e=t,this.#t=e.of(void 0,()=>cn)}kind(){return xi}create(e){let[t,n]=this.#e.dealt(e.seed);return new Si(e,{sentence:t,shape:n})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},ba=new b({key:`country`,glyph:`country`,title:`Country`,scale:`10⁶ m`,icon:`⬚`,indexLabel:`REGION`}),xa=class extends y{#e;#t;#n;constructor(e,t){super(e),this.#e=t.name,this.#t=t.trait,this.#n=t.vibe}kind(){return ba}name(){return this.#e}vibe(){return this.#n??super.vibe()}description(){return[`A vast administrative region governed by the ${this.#t.key()} directive.`]}facts(){let e=this.vibe();return[{key:`trait`,label:`Trait`,value:this.#t.key()},...e===void 0?[]:[{key:`reading`,label:`Stability`,value:e.stabilityText()}]]}status(){return``}childrenHeading(){return`Regional cities identified`}approachVerb(){return`Travel to`}portrait(){return this.area(`country`)}onArea(){return[{address:this.address().toString(),mark:`country`}]}},Sa={min:-100,max:100,scale:1e3},Ca=class{#e;#t;#n;constructor(e,t,n){this.#e=t.at(`names/country`),this.#t=n,this.#n=e.of({min:2,max:10},()=>fa)}kind(){return ba}create(e){let t=e.seed.branch(`trait`).pick(this.#t.traits()),n=e.seed.branch(`stability`).range(Sa.min,Sa.max)/Sa.scale;return new xa(e,{name:this.#e.words(e.seed).join(` `),trait:t,vibe:e.parent?.vibe()?.mutate(t,n)})}populate(e){return this.#n.of(e)}},wa=new b({key:`filament`,glyph:`filament`,title:`Cosmic filament`,scale:`10²⁴ m`,icon:`»`,indexLabel:`CONDUIT`}),Ta=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.conduitId}kind(){return wa}name(){return this.#e}description(){return[`A massive neural conduit pulsing with bio-digital energy.`]}facts(){return[{key:`reading`,label:`Conduit`,value:this.#t}]}status(){return``}childrenHeading(){return`Galactic sectors within this conduit`}approachVerb(){return`Pulse to`}portrait(){return this.area(`filament`)}onArea(){return[{address:this.address().toString(),mark:`filament`}]}},Ea=new b({key:`sector`,glyph:`sector`,title:`Galactic sector`,scale:`10²¹ m`,icon:`○`,indexLabel:`SECTOR`}),Da=class extends y{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Ea}name(){return this.#e}description(){return[`A dense cluster of celestial bodies within the neural web.`]}status(){return``}childrenHeading(){return`Solar systems within proximity`}approachVerb(){return`Transition to System:`}portrait(){return this.area(`sector`)}onArea(){return[{address:this.address().toString(),mark:`sector`}]}},Oa={min:1e3,max:9999},ka={min:10,max:39},Aa=100,ja=0,Ma=`echo`,Na=`echo-hertz`,Pa=class{#e;#t=ja;#n=!1;constructor(e){this.#e=e}signal(){return this.#t}locked(){return this.#t>=Aa}found(){return this.#n}scan(e){if(this.#n)return this.#t;let t=this.#e.seed().branch(Ma).branch(e).range(ka.min,ka.max);return this.#t=Math.min(Aa,this.#t+t),this.#t}fragment(){return new kn({from:this.#e.address(),frequency:new Sn(this.#e.seed().branch(Na).range(Oa.min,Oa.max))})}capture(){if(!(!this.locked()||this.#n))return this.#n=!0,this.#t=ja,{fragment:this.fragment(),fresh:!0}}remember(){if(this.#n)return JSON.stringify({found:!0});if(this.#t>ja)return JSON.stringify({signal:this.#t})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{signal:n,found:r,...i}=t;return Object.keys(i).length>0?!1:r===!0&&n===void 0?(this.#n=!0,this.#t=ja,!0):r!==void 0||typeof n!=`number`||!Number.isInteger(n)||n<=ja||n>Aa?!1:(this.#n=!1,this.#t=n,!0)}},Fa=new b({key:`null-reach`,glyph:`null-reach`,title:`Null reach`,scale:`10²¹ m`,icon:`○`,indexLabel:`VOID`}),Ia=2,La=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=new Pa(this)}kind(){return Fa}name(){return this.#e}echo(){return this.#t}description(){return this.#t.found()?[`A silent void. The spectral resonance has been harvested.`]:[`A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.`]}facts(){if(this.#t.found())return[{key:`signal`,label:`Echo taken`,value:``}];let e=this.#t.signal();return[{key:`signal`,label:`Signal`,value:e===0?`scan to search`:`${String(e)}%`}]}status(){return``}remember(){return this.#t.remember()}recall(e){return this.#t.recall(e)}childrenHeading(){return`Faint gravitational anomalies detected`}approachVerb(){return`Detect faint signal:`}landmarkFactor(){return super.landmarkFactor()*Ia}portrait(){return this.area(`null-reach`,this.#t.found()?0:this.#t.signal())}onArea(){return[{address:this.address().toString(),mark:`null-reach`}]}},Ra=.3,za=class{#e;#t;constructor(e,t){this.#e=t.at(`names/filament`),this.#t=e.of({min:4,max:8},e=>e.branch(`null-roll`).probability(Ra)?Fa:Ea)}kind(){return wa}create(e){let[t,n]=this.#e.words(e.seed),r=this.#e.naming(e.seed).branch(`number`).range(0,998),i=e.seed.branch(`conduit`).range(0,65534);return new Ta(e,{name:`${String(t)}-${String(r)}-${String(n)}`,conduitId:`0x${i.toString(16)}`})}populate(e){return this.#t.of(e)}},Ba=class{#e;#t;#n;#r;constructor(e,t){this.#e=t.zones,this.#t=t.decks.of(`floor`),this.#n=e.of(void 0,()=>xi),this.#r=t.passages}kind(){return Qi}create(e){let t=e.parent,n=new Xi(t.vibe()?.culture().key()??`unknown`).capitalised();return new ia(e,{number:e.index,zone:this.#e.zoneOf(e.seed,e.index,t.floors()),sentence:this.#t.dealt(e.seed).replace(`{culture}`,n),passage:this.#r.of(e.seed,t.doorsPerFloor())})}populate(e){return this.#n.exactly(e,1)}},Va=`The air is thick with oily static and the hum of abyssal substrate.`,Ha=class{#e;constructor(e){this.#e=e.of(void 0,()=>Ci)}kind(){return aa}create(e){return new ua(e,{number:e.parent.floors()-1-e.index,sentence:Va})}populate(e){return this.#e.exactly(e,1)}},Ua=new b({key:`solar-system`,glyph:`system`,title:`Solar system`,scale:`10¹³ m`,icon:`☼`,indexLabel:`RADII`}),Wa=class extends y{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Ua}name(){return this.#e}description(){return[`A star holding its resonant nodes in orbit.`]}status(){return``}childrenHeading(){return`Orbital bodies within range`}approachVerb(){return`Land on`}portrait(){return this.area(`solar-system`)}onArea(){return[{address:this.address().toString(),mark:`solar-system`}]}},Ga=class{#e;constructor(e){this.#e=e.of({min:1,max:2},()=>Ua)}kind(){return Fa}create(e){return new La(e,{name:`Null Reach ${e.seed.branch(`name`).range(0,4094).toString(16).toUpperCase()}`})}populate(e){return this.#e.of(e)}},Ka=new b({key:`planet`,glyph:`planet`,title:`Planet`,scale:`10⁷ m`,icon:`⊕`,indexLabel:`ORBIT`}),qa=class extends y{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.vibe}kind(){return Ka}name(){return this.#e}vibe(){return this.#t}description(){return[`A world on the surface layer of the lattice, tuned to one culture and one era.`]}facts(){return[this.#t.culture().fact(),this.#t.era().fact(),{key:`drift`,label:`Drift`,value:`${this.#t.secondEra().key()} · ${this.#t.secondCulture().key()}`}]}status(){return``}childrenHeading(){return`Planetary landmasses scanned`}approachVerb(){return`Visit`}portrait(){return this.area(`planet`)}onArea(){return[{address:this.address().toString(),mark:`planet`}]}},Ja=class{#e;#t;#n;constructor(e,t,n){this.#e=t.at(`names/planet`),this.#t=n,this.#n=e.of({min:2,max:8},()=>ba)}kind(){return Ka}create(e){return new qa(e,{name:this.#e.words(e.seed).join(``),vibe:this.#r(e.seed)})}populate(e){return this.#n.of(e)}#r(e){let t=e.branch(`vibe`),n=t.branch(`culture`).pick(this.#t.surfaceCultures()),r=t.branch(`era`).pick(this.#t.eras()),i=this.#t.surfaceCultures().filter(e=>!e.equals(n)),a=this.#t.eras().filter(e=>!e.equals(r));return new ki({culture:n,era:r,secondCulture:i.length===0?n:t.branch(`second-culture`).pick(i),secondEra:a.length===0?r:t.branch(`second-era`).pick(a)})}},Ya=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}name(){return this.#e}guarantee(){return this.#t}trace(){return this.#n}equals(e){return this.#e===e.#e}},Xa={ozone:{name:`Ozone`,sentence:`A sharp smell of ozone escapes the frame, ionizing the nearby air.`},frost:{name:`Frost`,sentence:`Thin frost is forming on the magnetic hinges. Total absence of thermal signature detected.`},clicking:{name:`Clicking`,sentence:`A persistent, rhythmic clicking sound—like high-speed mechanical relays—originates from the lock housing.`},humming:{name:`Humming`,sentence:`A heavy, low-frequency thrum (60Hz) vibrates through the surrounding strata.`},stillness:{name:`Stillness`,sentence:`The air nearby is unnaturally still. Not even the standard system-hum is audible.`}},Za=class e{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n}static of(t){let n=Xa[t];return n===void 0?void 0:new e(t,n.name,n.sentence)}key(){return this.#e}name(){return this.#t}sentence(){return this.#n}equals(e){return this.#e===e.#e}},Qa=`names/rooms`,$a=class{#e;#t=new Map;constructor(e){this.#e=e}allowedBy(e){let t=this.#t.get(e.key());return t===void 0&&(t=Object.freeze(this.#e.pairs(`${Qa}/${e.key()}`).map(([e,t])=>{let n=t.indexOf(`|`);if(n<0)throw Error(`${Qa}: '${e}|${t}' is not 'name|guarantee|trace'`);let r=Za.of(t.slice(n+1).trim());if(r===void 0)throw Error(`${Qa}: '${e}' names no known trace`);return new Ya(e,this.#n(t.slice(0,n).trim()),r)})),this.#t.set(e.key(),t)),t}categoryOf(e,t){return e.branch(`category`).pick(this.allowedBy(t))}#n(e){if(e===``)return;let t=e.indexOf(` `),n=Wr.find(n=>n.key()===e.slice(0,t));if(t<0||n===void 0)throw Error(`${Qa}: '${e}' is not '<style> <WORD>' with a known style`);return new Lr(e.slice(t+1),n)}},eo=`names/buildings/adj`,to={min:12,max:21},no={min:5,max:25},ro=[`shielded`,`clear`],io={min:1,max:3},ao={kind:Un,make:(e,t)=>new er(e,t)},oo=class{#e;#t;#n;#r;#i;#a;constructor(e,t,n,r=ao){this.#e=r,this.#t=e,this.#n=t,this.#r=n.atmospheres,this.#i=n.furnishings,this.#a=n.deal}kind(){return this.#e.kind}create(e){let t=e.parent,n=t.vibe()?.mutation();if(n===void 0)throw Error(`a room takes its category from the country above: it needs one`);let r=this.#n.categoryOf(e.seed,n),i=this.#a.nth(t.seed().branch(`adjectives`),this.#t.list(`${eo}/${t.culture().key()}`),e.index);return this.#e.make(e,{name:`${i} ${r.name()}`,category:r,atmosphere:this.#r.of(e.seed,{culture:t.culture(),era:t.era(),trait:n,anomaly:t.anomaly()}),traits:{oxygen:e.seed.branch(`oxygen`).range(to.min,to.max),temperature:e.seed.branch(`temperature`).range(no.min,no.max),signal:e.seed.branch(`signal`).pick(ro)},furniture:this.#i.of(e.seed.branch(`furniture`),t.culture(),e.seed.branch(`furniture`).range(io.min,io.max))})}populate(){return[]}},so=class{#e;#t;constructor(e,t){this.#e=t.at(`names/sector`),this.#t=e.of({min:3,max:7},()=>Ua)}kind(){return Ea}create(e){let t=this.#e.naming(e.seed).branch(`number`).range(0,98);return new Da(e,{name:`${this.#e.words(e.seed).join(` `)} ${String(t)}`})}populate(e){return this.#t.of(e)}},co=class{#e;#t;constructor(e,t){this.#e=t.at(`names/solar-system`),this.#t=e.of({min:2,max:10},()=>Ka)}kind(){return Ua}create(e){return new Wa(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},lo=class{#e;#t;constructor(e,t){this.#e=t.at(`names/street`),this.#t=e.of({min:2,max:10,unit:2},()=>Pi)}kind(){return ha}create(e){return new ga(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},uo=class{#e;constructor(e){this.#e=e.of({min:3,max:7},()=>wa)}kind(){return rr}create(e){return new ir(e)}populate(e){return this.#e.of(e)}},fo=class{#e;constructor(e,t,n){let r=new $a(e),i=new bi(this),a=new oi(e),o=new ui(e),s=new Pr,c=new Jr(e),l=new Nr(o),u={doors:c,deck:new hi(e),deal:s},d={atmospheres:new yr(e,n),furnishings:new ri(e,s),deal:s},f=[new uo(i),new za(i,a),new so(i,a),new Ga(i),new co(i,a),new Ja(i,a,t),new Ca(i,a,t),new va(i,a),new lo(i,a),new da(i,{namer:new Dr(e),sizes:new Ar}),new Ba(i,{zones:new Qr(e),decks:o,passages:new _i(l,c)}),new ya(i,l),new ur(i,u,r),new oo(e,r,d),new Ha(i),new Mi(i,t),new ur(i,u,r,{kind:fn,rooms:tr,make:(e,t)=>new pn(e,t)}),new oo(e,r,d,{kind:tr,make:(e,t)=>new nr(e,t)})];this.#e=new Map(f.map(e=>[e.kind().key(),e]))}universe(e){return this.factoryFor(rr).create({parent:void 0,seed:e,index:0,children:this})}kinds(){return[...this.#e.values()].map(e=>e.kind())}factoryFor(e){let t=this.#e.get(e.key());if(t===void 0)throw Error(`no factory is registered for the kind '${e.key()}'`);return t}childrenOf(e){return this.factoryFor(e.kind()).populate(e)}},po=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}frame(){return this.#t}fact(){return{key:`culture`,label:`Culture`,value:this.#e}}equals(e){return this.#e===e.#e}},mo=class{#e;constructor(e){this.#e=e}key(){return this.#e}fact(){return{key:`era`,label:`Era`,value:this.#e}}equals(e){return this.#e===e.#e}},ho=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},go=`themes/planet-frames`,_o=`themes/timelines`,vo=`themes/cultures`,yo=`themes/traits`,S={culture:`abyssal`,era:`atomic`},bo=class{#e;#t;#n;#r;constructor(e){this.#e=e}surfaceCultures(){return this.#t??=Object.freeze(this.#e.pairs(go).map(([e,t])=>new po(e,t))),this.#t}bedrock(){if(!this.#e.index(vo).includes(S.culture))throw Error(`${vo}/index names no '${S.culture}' culture`);let e=this.eras().find(e=>e.key()===S.era);if(e===void 0)throw Error(`${_o}/index names no '${S.era}' era`);return{culture:new po(S.culture,S.culture),era:e}}eras(){return this.#n??=Object.freeze(this.#e.index(_o).map(e=>new mo(e))),this.#n}traits(){return this.#r??=Object.freeze(this.#e.list(yo).map(e=>new ho(e))),this.#r}},xo=/^([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})$/i,So=2**53,C=`#`,Co=`${C}range`,wo=`${C}pick`,To=`${C}probability`,Eo=class e{#e;#t;constructor(e,t){this.#e=e>>>0,this.#t=t>>>0}static parse(t){let n=xo.exec(t.trim());if(n===null)return;let r=n.slice(1).join(``);return new e(Number.parseInt(r.slice(0,8),16),Number.parseInt(r.slice(8),16))}child(e){return this.branch(e)}branch(e){if(typeof e==`number`){if(!Number.isSafeInteger(e))throw RangeError(`a number key is a whole number, got ${String(e)}`);return this.#n(`${C}n:${String(e)}`)}if(e.startsWith(C))throw RangeError(`keys starting with '${C}' are reserved for Seed itself, got '${e}'`);return this.#n(e)}#n(t){let n=(this.#e^2654435769)>>>0,r=(this.#t^2135587861)>>>0;n=Math.imul(n^r>>>15,2246822507),r=Math.imul(r^n>>>13,3266489909);for(let e=0;e<t.length;e++){let i=t.charCodeAt(e);n=Math.imul(n^i,2654435761),r=Math.imul(r^i,1597334677),n=n<<13|n>>>19,r=r<<17|r>>>15}return n^=t.length,n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,668265263)^r>>>15,new e(n,r)}range(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||t<e)throw RangeError(`range needs whole numbers with min <= max, got ${String(e)}..${String(t)}`);return e+Math.floor(this.#n(Co).#r()*(t-e+1))}pick(e){let t=e[Math.floor(this.#n(wo).#r()*e.length)];if(t===void 0)throw RangeError(`pick needs a list with at least one item`);return t}probability(e){if(!(e>=0&&e<=1))throw RangeError(`probability needs a chance in [0, 1], got ${String(e)}`);return this.#n(To).#r()<e}equals(e){return this.#e===e.#e&&this.#t===e.#t}toString(){let e=(this.#e.toString(16).padStart(8,`0`)+this.#t.toString(16).padStart(8,`0`)).toUpperCase();return`${e.slice(0,4)}-${e.slice(4,8)}-${e.slice(8,12)}-${e.slice(12)}`}#r(){return(this.#e*2097152+(this.#t>>>11))/So}},w=100,T=0,Do=[{key:`stable`,from:70},{key:`degraded`,from:30},{key:`critical`,from:T}],Oo=40,ko=2,E=class e{#e;static range(){return{min:T,max:w}}static edges(){let e=new Set([w,1]);for(let t of[...Do.map(e=>e.from),Oo])t<=T||(e.add(t),e.add(t-1));return[...e].sort((e,t)=>t-e)}constructor(e=w){if(!Number.isInteger(e)||e<T||e>w)throw RangeError(`coherence is a whole number from ${String(T)} to ${String(w)}, got ${String(e)}`);this.#e=e}value(){return this.#e}drained(t){return new e(Math.max(T,this.#e-t))}restored(t){return new e(Math.min(w,this.#e+t))}exhausted(){return this.#e===T}band(){return Do.find(e=>this.#e>=e.from)?.key??`critical`}corrupting(){return this.#e<Oo}decay(){let e=Do[0]?.from??w;return Math.min(1,Math.max(0,(e-this.#e)/(e-T)))}glitchMarks(){let e=Do.at(-2)?.from??T;return Math.max(0,Math.floor((e-this.#e)/ko))}equals(e){return this.#e===e.#e}},Ao=6,jo=class e{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e){this.#e=e.seed,this.#t=e.address,this.#n=new Map(e.states??[]),this.#r=e.coherence??new E().value(),this.#i=e.steps??0,this.#a=[...e.visited??[]],this.#o=[...e.buffer??[]],this.#s=e.resonant??0}static parse(t){if(t===void 0)return;let n;try{n=JSON.parse(t)}catch{return}if(typeof n!=`object`||!n)return;let{version:r,seed:i,path:a,states:o,coherence:s,steps:c,visited:l,buffer:u,resonant:d}=n;if(r!==Ao||typeof i!=`string`)return;let f=Eo.parse(i),p=e.#l(o),m=e.#u(l),h=e.#c(u);if(f===void 0||p===void 0||m===void 0||h===void 0||!e.#d(s)||!e.#f(c)||!e.#f(d))return;let g=typeof a==`string`?v.parse(a):void 0;if(a!==null&&g===void 0)return;let _=new E().value();if(g!==void 0||s===_&&c===0&&m.length===0&&p.size===0&&h.length===0&&d===0)return new e({seed:f,address:g,states:p,coherence:s,steps:c,visited:m,buffer:h,resonant:d})}static#c(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`object`||!n||Array.isArray(n))return;let e=n;if(typeof e.kind!=`string`)return;t.push(e)}return t}static#l(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=Object.entries(e),n=new Map;for(let[e,r]of t){if(v.parse(e)===void 0||typeof r!=`string`)return;n.set(e,r)}return n}static#u(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`string`||v.parse(n)===void 0)return;t.push(n)}return new Set(t).size===t.length?t:void 0}static#d(e){if(typeof e!=`number`)return!1;try{return new E(e),!0}catch{return!1}}static#f(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}seed(){return this.#e}address(){return this.#t}states(){return this.#n}coherence(){return this.#r}steps(){return this.#i}visited(){return this.#a}buffer(){return this.#o}resonant(){return this.#s}toText(){return JSON.stringify({version:Ao,seed:this.#e.toString(),path:this.#t?.toString()??null,states:Object.fromEntries(this.#n),coherence:this.#r,steps:this.#i,visited:this.#a,buffer:this.#o,resonant:this.#s})}};function D(e,t,n){return{id:e,key:t,label:n,place:``,role:`system`,sealed:!1,landmark:!1,ordinal:``,readings:[],opposite:``,current:!1,visited:!1,address:``,numbered:!1}}var Mo=`buffer`,No=`pick:`,Po=`drop:`,Fo=`close`,Io=Array.from({length:9},(e,t)=>String(t+1)),Lo=class{#e;#t;constructor(e){this.#e=e}summary(){return{id:Mo,outcome:``,figures:{selected:this.#t===void 0?``:String(this.#t)}}}options(){let e=this.#e.player().buffer().fragments(),t=this.#e.here()?.contents()!==null,n=e=>this.#t===void 0?`Select`:this.#t===e?`Unselect`:`Merge`;return[...e.flatMap((e,r)=>{let i=String(r+1),a={...D(`${No}${String(r)}`,Io[r]??``,n(r)),role:`pick`,ordinal:i},o={...D(`${Po}${String(r)}`,``,`Drop here`),role:`drop`,ordinal:i};return t?[a,o]:[a]}),{...D(Fo,`b`,`Back to reality`),role:`return`}]}answer(e){if(!this.options().some(t=>t.id===e))return;if(e===Fo)return{message:``,done:!0};if(e.startsWith(No))return{message:this.#n(Number(e.slice(5))),done:!1};let t=this.#e.drop(Number(e.slice(5)));return this.#t=void 0,{message:t===void 0?``:`Dropped ${t.name()} here.`,done:!1}}#n(e){let t=this.#t;if(t===void 0)return this.#t=e,``;if(this.#t=void 0,t===e)return``;let n=this.#e.merge(t,e);if(n===void 0)return``;let{fragment:r}=n;if(n.forged)return`Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: ${r.name()}. Coherence +15.`;let i=r.resonant()?` Resonance detected.`:``;return`Synthesis complete: ${r.name()} (${String(r.frequency().hertz())} Hz). Coherence +15.${i}`}},Ro=`corrupt`,zo=.1,Bo=class{#e=new zn;read(e,t,n){if(!t.corrupting())return e;let r=n.branch(Ro);return e.map((e,t)=>this.#e.mangle(e,zo,r.branch(t)))}},Vo=1,Ho=new Map([[`entropic`,2]]),Uo=class{cost(e){let t=e.drainEra()?.key()??``;return Vo*(Ho.get(t)??1)*e.drainFactor()}},Wo=`frame`,Go=class{of(e,t){return e.seed().branch(Wo).branch(t)}},Ko=`trace`,qo=`help`,Jo=`close`,Yo=class{summary(){return{id:qo,outcome:``,figures:{}}}options(){return[{...D(Jo,`b`,`Back to the world`),role:`return`}]}answer(e){return e===Jo?{message:``,done:!0}:void 0}},Xo=class{#e;constructor(e=[]){this.#e=[...e]}fragments(){return this.#e}size(){return this.#e.length}add(e){this.#e.push(e)}take(e){if(!Number.isInteger(e)||e<0||e>=this.#e.length)return;let[t]=this.#e.splice(e,1);return t}merge(e,t,n){if(e===t)return;let r=this.#e[e],i=this.#e[t];if(r===void 0||i===void 0)return;let a=n===void 0?new yn(r,i):n(r,i);return this.#e.splice(Math.max(e,t),1),this.#e.splice(Math.min(e,t),1),this.#e.push(a),a}remove(e){let t=this.#e.indexOf(e);return t<0?!1:(this.#e.splice(t,1),!0)}},Zo=15,Qo=class{#e;#t;#n;#r;#i;#a;constructor(e={coherence:new E().value(),steps:0,visited:[],buffer:[],resonant:0}){this.#e=new E(e.coherence),this.#t=e.steps,this.#n=[...e.visited],this.#r=new Set(this.#n),this.#i=new Xo(e.buffer),this.#a=e.resonant}buffer(){return this.#i}resonantTraces(){return this.#a}capture(e){this.#i.add(e.fragment),e.fresh&&e.fragment.resonant()&&(this.#a+=1)}merge(e,t,n){let r=this.#i.merge(e,t,n===void 0?void 0:()=>n);if(r!==void 0)return this.restore(Zo),r.resonant()&&(this.#a+=1),r}discard(e){return this.#i.remove(e)}drop(e){return this.#i.take(e)}coherence(){return this.#e}steps(){return this.#t}drain(e){this.#e=this.#e.drained(e)}restore(e){this.#e=this.#e.restored(e)}setCoherence(e){this.#e=new E(e)}count(){this.#t+=1}markFootprint(e){for(let t of e.trail()){let e=t.address().toString();this.#r.has(e)||(this.#r.add(e),this.#n.push(e))}}visited(e){return this.#r.has(e.address().toString())}footprints(){return this.#n}placesVisited(){return this.#n.length}reboot(){this.#e=new E}},$o=new Nn,es=class{#e;#t;#n;#r;#i;#a=new Qo;constructor(e){this.#e=e}world(){return this.#t}universe(){return this.#n}here(){return this.#r}player(){return this.#a}resumes(){return this.#i!==void 0}begin(e){this.#t=e,this.#n=this.#e.universe(e),this.#r=void 0,this.#i=void 0,this.#a=new Qo}enter(){return this.#n!==void 0&&(this.#o(this.#i??this.#n.startOfJourney()),this.#i=void 0,!0)}descend(e){let t=this.#r?.listing()[e];return t===void 0||t.sealed()?!1:(this.#o(t.arrive()),!0)}move(e){let t=this.#r?.move(e);return t!==void 0&&(this.#o(t.arrive()),!0)}leave(){if(this.#r?.exit()===void 0)return!1;let e=this.#r.leave();return e!==void 0&&(this.#o(e),!0)}toTitle(){return this.#r!==void 0&&(this.#i=this.#r,this.#r=void 0,!0)}capture(e){if(this.#r===void 0)return;let t=this.#r.capture(e);if(t!==void 0)return this.#a.capture(t),this.#r.sample(),t.fragment}lottery(){if(this.#r===void 0)return;let e=this.#r.lottery(this.#a.steps());if(e!==void 0)return this.#a.capture({fragment:e,fresh:!0}),this.#r.sample(),e}echo(){let e=this.#r?.echo();if(!(e===void 0||e.found()))return e.scan(this.#a.steps())}captureEcho(){let e=this.#r?.echo()?.capture();if(e!==void 0)return this.#a.capture(e),e.fragment}drop(e){if(this.#r?.contents()===null||this.#r===void 0)return;let t=this.#a.buffer().fragments()[e];if(t!==void 0&&this.#r.drop(t))return this.#a.drop(e)}merge(e,t){let n=this.#r?.forge(this.#a.buffer().fragments()),r=this.#a.merge(e,t,n);if(r!==void 0)return this.#r?.infuse(),{fragment:r,forged:n!==void 0}}breachOffered(){return this.#r?.breachOffered(this.#a.buffer().fragments())??!1}breach(){let e=this.#r?.breach(this.#a.buffer().fragments());if(e!==void 0)return this.#a.discard(e),e}prime(){return this.#r?.prime()??!1}spawnKeystone(){let e=this.#r?.keystone();if(e!==void 0)return this.#a.capture({fragment:e,fresh:!1}),e}reboot(){return this.#t!==void 0&&(this.#n=this.#e.universe(this.#t),this.#i=void 0,this.#a.reboot(),this.#o(this.#n.startOfJourney()),!0)}saved(){if(this.#t===void 0)return;let e=this.#r??this.#i;return new jo({seed:this.#t,address:e?.address(),states:this.#s(this.#a.footprints()),coherence:this.#a.coherence().value(),steps:this.#a.steps(),visited:this.#a.footprints(),buffer:this.#a.buffer().fragments().map(e=>e.data()),resonant:this.#a.resonantTraces()})}restore(e){let t=this.#e.universe(e.seed()),n=new Set;for(let t of e.visited()){let e=v.parse(t);if(e===void 0)return!1;let r=e.parent();if(r!==void 0&&!n.has(r.toString()))return!1;n.add(t)}for(let[r,i]of e.states()){let e=v.parse(r),a=e===void 0||!n.has(r)?void 0:t.descendant(e);if(a===void 0||!a.recall(i)||a.remember()!==i)return!1}for(let n of e.visited()){let e=v.parse(n);if(e===void 0||t.locate(e)===void 0)return!1}let r=e.address(),i=r===void 0?void 0:t.descendant(r);if(r!==void 0&&(i===void 0||i.arrival()!==i))return!1;let a=i?.trail()??[];if(a.some(e=>!n.has(e.address().toString())))return!1;for(let[e,t]of a.entries()){let n=a[e+1];if(n!==void 0&&!t.admits(n))return!1}let o=$o.readAll(e.buffer(),t);return o!==void 0&&(this.#t=e.seed(),this.#n=t,this.#r=i,this.#i=void 0,this.#a=new Qo({coherence:e.coherence(),steps:e.steps(),visited:e.visited(),buffer:o,resonant:e.resonant()}),!0)}#o(e){this.#r=e,this.#a.markFootprint(e)}#s(e){let t=new Map;for(let n of e){let e=v.parse(n),r=e===void 0?void 0:this.#n?.descendant(e)?.remember();r!==void 0&&t.set(n,r)}return t}},ts=30,ns=15,rs=10,is=`marks`,as=`static`,os=.08,ss=[`?`,`!`,`░`,`▒`,`▓`,`X`,`#`],cs=class{of(e,t,n,r){if(!e.mapped())return null;let i=new Set,a=(e,t)=>`${String(e)},${String(t)}`,o=r.branch(as),s=e.mapNodes().map((n,r)=>{let{x:s,y:c}=n.mapSpot(ts,ns);for(let e=0;i.has(a(s,c))&&e<rs;e++)s=(s+1)%ts,s===0&&(c=(c+1)%ns);i.add(a(s,c));let l=o.branch(r),u=e.abyssal()&&l.probability(os);return{x:s,y:c,glyph:u?l.branch(`glyph`).pick(ss):n.mapGlyph(),name:n.name(),visited:t(n),noise:u}}),c=r.branch(is);return{width:ts,height:ns,origin:{name:e.name(),glyph:e.mapGlyph()},frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),nodes:s,marks:Array.from({length:n.glitchMarks()},(e,t)=>({x:c.branch(t).branch(`x`).range(0,29),y:c.branch(t).branch(`y`).range(0,14)}))}}},ls=`reboot`,us=class{#e;constructor(e){this.#e=e}summary(){return{id:ls,outcome:`rebooting`,figures:{}}}options(){return[D(ls,``,`Rebuild`)]}answer(e){if(e===`reboot`)return this.#e.reboot(),{message:`Substrate rebuilt. Coherence ${String(this.#e.player().coherence().value())}.`,done:!0}}},ds=20,fs=[{id:`void`,reached:e=>e.here.abyssal()},{id:`expedition`,reached:e=>e.places>=ds},{id:`severed`,reached:()=>!0}],ps=class{of(e){return fs.find(t=>t.reached(e))?.id??``}},ms=`recap`,hs=`resume`,gs=`end-session`,_s=class{#e;#t=new ps;constructor(e){this.#e=e}summary(){let e=this.#e.here(),t=this.#e.player();return{id:ms,outcome:e===void 0?``:this.#t.of({here:e,places:t.placesVisited()}),figures:{locus:e?.address().toString()??``,steps:String(t.steps()),places:String(t.placesVisited()),buffer:String(t.buffer().size()),resonant:String(t.resonantTraces())}}}options(){return[D(hs,`b`,`Resume`),D(gs,`q`,`End session`)]}answer(e){if(e===hs)return{message:``,done:!0};if(e===gs)return this.#e.toTitle(),{message:``,done:!0}}},vs=`spectrogram`,ys=5,bs=9,xs=`void`,Ss=.3,Cs=[`It is cold down here.`,`We see you.`,`Return to the surface.`,`Bedrock approaching.`],ws=class{of(e,t){if(!e.indoors())return null;let n=t.branch(vs),r=t.branch(xs);return{spectrogram:Array.from({length:ys},(e,t)=>n.branch(t).range(1,bs)),voice:e.abyssal()&&r.probability(Ss)?r.branch(`words`).pick(Cs):null}}},Ts=class{#e;#t;constructor(e){this.#e=e.drains,this.#t=e.counts}drains(){return this.#e}counts(){return this.#t}},Es=new Ts({drains:!1,counts:!1}),O=new Ts({drains:!0,counts:!1}),Ds=new Ts({drains:!0,counts:!0}),Os=`enter:`,ks=`move:`,As=`capture:`,js=`scan`,Ms=`map`,Ns=Ko,Ps=`echo`,Fs=`capture-echo`,Is=`breach`,Ls=`debug:integrity:`,Rs=`debug:prime`,zs=`debug:keystone`,Bs=100,Vs={up:`u`,down:`d`,descend:`d`,corridor:`c`,elevator:`b`,back:`b`,forward:`f`},Hs=`j`,Us=`e`,Ws=`c`,Gs=`m`,Ks=`h`,qs=Array.from({length:9},(e,t)=>String(t+1)),Js=Array.from({length:26},(e,t)=>String.fromCharCode(97+t)),Ys=class{#e;#t;#n;#r;#i;#a;#o=new Uo;#s=new Go;#c=new ws;#l=new cs;#u=new Bo;#d;#f=``;#p=null;#m=null;#h=null;constructor(e){this.#e=new es(e.world),this.#t=e.entropy,this.#n=e.saves,this.#r=e.debug??!1,this.#i=[{keys:[`n`],turn:Es,options:()=>this.#v()&&!this.#y()?[D(`new-world`,`n`,`New world`)]:[],run:()=>this.#x()},{keys:[`e`],turn:Es,options:()=>this.#v()&&this.#y()?[D(`enter-world`,`e`,this.#e.resumes()?`Continue`:`Enter world`)]:[],run:()=>this.#b(this.#e.enter(),`Entered ${this.#e.here()?.name()??``}.`)},{keys:[`r`],turn:Es,options:()=>this.#v()&&this.#y()?[D(`reroll`,`r`,`Re-roll`)]:[],run:()=>this.#x()},{keys:[],turn:Ds,options:()=>this.#C(),run:e=>{let t=this.#e.player(),n=t.resonantTraces(),r=this.#e.capture(Number(e.slice(8)));if(r===void 0)return this.#f;let i=t.resonantTraces()>n?` Harmonic resonance: +10%.`:``;return`Captured ${r.name()}. Frequency: ${String(r.frequency().hertz())} Hz.${i}`}},{keys:[],turn:Ds,options:()=>this.#S(),run:e=>{let t=this.#e.descend(Number(e.slice(6)));return this.#b(t,`Entered ${this.#e.here()?.name()??``}.`)}},{keys:[...new Set(Object.values(Vs))],turn:Ds,options:()=>this.#T(),run:e=>{let t=e.slice(5),n=this.#e.here(),r=n?.moves().find(e=>e.id===t)?.label??``,i=this.#e.move(t),a=this.#e.here();return this.#b(i,a===n?`${r}.`:`Entered ${a?.name()??``}.`)}},{keys:[`l`],turn:Ds,options:()=>{let e=this.#e.here();return e?.exit()===void 0?[]:[{...D(`leave`,`l`,e.leaveLabel()),role:`return`}]},run:()=>this.#b(this.#e.leave(),`Returned to ${this.#e.here()?.name()??``}.`)},{keys:[Hs],turn:Ds,options:()=>this.#e.breachOffered()?[{...D(Is,Hs,`Breach the Bedrock`),role:`move`}]:[],run:()=>this.#e.breach()===void 0?this.#f:`HARMONIC_INVERSION_PROTOCOL_ENGAGED — breaching the bedrock substrate. Lattice weight normalized: aperture opening at root. The Keystone is spent.`},{keys:[Us],turn:Ds,options:()=>this.#w(),run:e=>{if(e===Ps){let e=this.#e.echo();return e===void 0?this.#f:e>=Bs?`HARMONIC_LOCK_ESTABLISHED: Spectral Echo isolated. Signal 100%.`:`SCANNING_VOID: Signal strength increasing... ${String(e)}%.`}let t=this.#e.captureEcho();return t===void 0?this.#f:`VOID_RESONANCE: Echo captured and stabilized. Frequency: ${String(t.frequency().hertz())} Hz.`}},{keys:[`s`],turn:O,options:()=>this.#v()?[]:[D(js,`s`,`Scan`)],run:()=>{let e=this.#e.here(),t=this.#e.player(),n=e?.scan(e=>t.visited(e));return n===void 0?`No scan-compatible structure detected in this strata.`:(e?.survey(),this.#p={title:n.title,notes:n.notes,rows:n.rows.map(e=>({cells:e.cells,current:e.current,note:e.note}))},`LOCAL_LATTICE_SCAN_INITIATED [LOCUS: ${e?.address().toString()??``}]. SCAN_COMPLETE. LOCAL_PHASE_SYNCHRONIZED.`)}},{keys:[Gs],turn:O,options:()=>this.#v()?[]:[D(Ms,Gs,`Map`)],run:()=>{let e=this.#e.here(),t=e===void 0?null:this.#D(e,this.#e.player());return t===null?`SCAN_ERROR: Current location does not support spatial projection.`:(this.#m=t,`NEURAL_LATTICE_PROJECTION: ${String(t.nodes.length)} nodes plotted from ${t.origin.name}.`)}},{keys:[`i`],turn:O,options:()=>this.#v()?[]:[D(Mo,`i`,`Buffer`)],run:()=>(this.#d=new Lo(this.#e),``)},{keys:[],turn:O,options:()=>this.#v()?[]:[D(Ns,``,`Trace`)],run:()=>{let e=this.#e.here()?.trail()??[],t=this.#e.player(),n=e=>t.visited(e);return this.#h={steps:e.map((r,i)=>({address:r.address().toString(),portrait:r.bandPortrait(n,e[i+1]),children:r.listing().map(e=>({address:e.address().toString(),name:e.name(),ordinal:String(e.ordinal()),landmark:e.landmark(),visited:t.visited(e),sealed:e.sealed()})),facts:r.facts(),words:r.description()[0]??``,scale:r.kind().scale(),glyph:r.kind().glyph(),vibe:r.vibeFigure(),signs:r.poleSigns(),depth:i,icon:r.kind().icon(),kind:r.kind().title(),name:r.name(),current:i===e.length-1,abyssal:r.abyssal()}))},`NEURAL_LATTICE_TRACE_INITIATED: ${String(e.length)} levels from the universe.`}},{keys:[Ks],turn:O,options:()=>this.#v()?[]:[D(qo,Ks,`Help`)],run:()=>(this.#d=new Yo,``)},{keys:[`t`],turn:O,options:()=>this.#v()?[]:[D(`to-title`,`t`,`Title screen`)],run:()=>this.#b(this.#e.toTitle(),``)},{keys:[`q`],turn:O,options:()=>this.#v()?[]:[D(ms,`q`,`End session`)],run:()=>(this.#d=new _s(this.#e),``)},{keys:[],turn:Es,options:()=>this.#r&&!this.#v()?E.edges().map(e=>({...D(`${Ls}${String(e)}`,``,`Integrity ${String(e)}`),role:`debug`})):[],run:e=>{let t=Number(e.slice(16));return this.#e.player().setCoherence(t),`Integrity set to ${String(t)}%.`}},{keys:[],turn:Es,options:()=>this.#r&&this.#e.here()?.indoors()===!0?[{...D(Rs,``,`Prime building`),role:`debug`},{...D(zs,``,`Spawn Keystone`),role:`debug`}]:[],run:e=>{if(e===Rs)return this.#e.prime()?`Building primed: every floor sampled, seven merges in.`:this.#f;let t=this.#e.spawnKeystone();return t===void 0?this.#f:`${t.name()} generated in the trace buffer.`}}];let t=new Set([...this.#i.flatMap(e=>e.keys),`v`]);this.#a=[...qs,...Js.filter(e=>!t.has(e))],this.#g()}step(e){this.#p=null,this.#m=null,this.#h=null;let t=this.#d;if(t!==void 0){let n=t.answer(e);return n!==void 0&&(n.done&&(this.#d=void 0),this.#f=n.message,this.#_()),this.snapshot()}let n=this.#i.find(t=>t.options().some(t=>t.id===e&&!t.sealed));if(n===void 0)return this.snapshot();let r=this.#e.here(),i=this.#e.player();if(r!==void 0&&n.turn.drains()&&(i.drain(this.#o.cost(r)),i.coherence().exhausted()))return this.#d=new us(this.#e),this.#f=``,this.#_(),this.snapshot();if(this.#f=n.run(e),n.turn.counts()){i.count();let e=this.#e.lottery();e!==void 0&&(this.#f=`${this.#f} SPECTRAL_DEVIATION: Extracted Frequency ${String(e.frequency().hertz())} Hz.`)}return this.#_(),this.snapshot()}snapshot(){let e=this.#e.world(),t=this.#e.here(),n=this.#e.player();return{world:e===void 0?null:{seed:e.toString(),name:this.#e.universe()?.name()??``},place:t===void 0?null:this.#E(t,n),player:t===void 0?null:{coherence:n.coherence().value(),band:n.coherence().band(),steps:n.steps(),decay:n.coherence().decay()},buffer:t===void 0?null:this.#O(n),prompt:this.#d?.summary()??null,options:this.#d?.options()??this.#i.flatMap(e=>e.options()),message:this.#f,scan:this.#p,map:this.#m,trace:this.#h}}#g(){let e=jo.parse(this.#n.load());if(e===void 0||!this.#e.restore(e))return;let t=this.#e.here(),n=t===void 0?``:` at ${t.name()}`;this.#f=`Restored world ${e.seed().toString()}${n}.`,this.#e.player().coherence().exhausted()&&(this.#d=new us(this.#e))}#_(){let e=this.#e.saved();e!==void 0&&this.#n.save(e.toText())}#v(){return this.#e.here()===void 0}#y(){return this.#e.world()!==void 0}#b(e,t){return e?t:this.#f}#x(){let e=this.#t.draw();return this.#e.begin(e),`World ${e.toString()} drawn.`}#S(){let e=this.#e.here();if(e===void 0)return[];let t=this.#e.player(),n=0,r=e=>{if(e.sealed())return``;if(!e.goesByNumber())return this.#a[n++]??``;let t=String(e.ordinal());return t.length===1?t:``};return e.listing().map((n,i)=>({id:`${Os}${String(i)}`,key:r(n),label:`${e.approachVerb()} ${n.callSign()}`,place:n.name(),role:`travel`,sealed:n.sealed(),landmark:n.landmark(),ordinal:String(n.ordinal()),readings:n.readings(),opposite:``,current:n.current(),visited:t.visited(n),address:n.address().toString(),numbered:n.goesByNumber()}))}#C(){let e=this.#e.here()?.contents();return e==null?[]:e.objects.map((e,t)=>({...D(`${As}${String(t)}`,qs[t]??``,`Take ${e.name()}`),place:e.name(),role:`take`,ordinal:String(t+1)}))}#w(){let e=this.#e.here()?.echo();if(e===void 0||e.found())return[];let t={...D(Ps,Us,`Scan for spectral echoes`),role:`move`};return e.locked()?[t,{...D(Fs,Ws,`Capture Spectral Echo`),role:`move`}]:[t]}#T(){let e=this.#e.here();return e===void 0?[]:e.moves().map(t=>{let n=e.leadsTo(t.id);return{...D(`${ks}${t.id}`,Vs[t.id]??``,t.label),role:`move`,opposite:`${ks}${t.opposite}`,place:n?.name()??``,address:n?.address().toString()??``}})}#E(e,t){let n=e.peers(),r=this.#s.of(e,t.steps());return{kind:e.kind().title(),icon:e.kind().icon(),name:e.name(),address:e.address().toString(),position:e.kind().position(n.indexOf(e)+1,n.length),trail:e.trail().map(e=>({icon:e.kind().icon(),kind:e.kind().title(),name:e.name(),address:e.address().toString()})),status:e.status(),description:this.#u.read(e.description(),t.coherence(),r),facts:e.facts(),portrait:e.portrait(e=>t.visited(e)),noise:r,frame:e.vibe()?.frame()??null,abyssal:e.abyssal(),childrenHeading:e.childrenHeading(),contents:this.#k(e),telemetry:this.#c.of(e,r),lattice:this.#D(e,t)}}#D(e,t){return this.#l.of(e,e=>t.visited(e),t.coherence(),this.#s.of(e,t.steps()))}#O(e){let t=e.buffer();return{size:t.size(),resonant:e.resonantTraces(),fragments:t.fragments().map(e=>({key:e.key(),name:e.name(),hertz:e.frequency().hertz(),resonant:e.resonant()}))}}#k(e){let t=e.contents();return t===null?null:{objects:t.objects.map(e=>({key:e.key(),name:e.name()})),furniture:t.furniture}}},Xs=class{warn(e){console.warn(e)}},Zs=class{#e;constructor(e){this.#e=e}draw(){let[e=0,t=0]=this.#e.getRandomValues(new Uint32Array(2));return new Eo(e,t)}},Qs=class{#e;constructor(e){this.#e=e}request(e){return this.#e.requestAnimationFrame(e)}cancel(e){this.#e.cancelAnimationFrame(e)}now(){return this.#e.performance.now()}},$s=`(prefers-reduced-motion: reduce)`,ec=class{#e;constructor(e){this.#e=e}reduced(){return this.#e.matchMedia($s).matches}},tc=`endless-transit.trace-view`,nc=class{#e;constructor(e){this.#e=e}recall(){try{return this.#e().getItem(tc)===`pole`?`pole`:`column`}catch{return`column`}}remember(e){try{this.#e().setItem(tc,e)}catch{}}},rc=`endless-transit.save`,ic=class{#e;constructor(e){this.#e=e}load(){try{return this.#e().getItem(rc)??void 0}catch{return}}save(e){try{this.#e().setItem(rc,e)}catch{}}},ac=class{#e;constructor(e){this.#e=e}name(){return`ENDLESS TRANSIT`}buildLine(){return`build ${this.#e}`}},oc=`"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,sc=12,cc={regular:`400`,bold:`700`},lc=class{of(e,t=sc){if(t<sc)throw RangeError(`a picture's text is at least ${String(sc)} px, got ${String(t)}`);return`${cc[e]} ${String(t)}px ${oc}`}atLeast(e){return Math.max(sc,e)}},uc=class{#e;constructor(e){this.#e=e}value(e){return this.#e.ownerDocument.defaultView?.getComputedStyle(this.#e).getPropertyValue(`--${e}`)??``}},dc=class{#e;#t;#n;#r;#i;#a=1;constructor(e){this.#e=e.host,this.#t=e.canvas,this.#n=e.observer,this.#r=e.budget,this.#i=e.colours}hostSize(){return{width:this.#e.clientWidth,height:this.#e.clientHeight}}fit(e){let t=this.#t.ownerDocument.defaultView?.devicePixelRatio??1;this.#a=this.#r.ratio(t,e.width,e.height);let n=Math.round(e.width*this.#a),r=Math.round(e.height*this.#a);(this.#t.width!==n||this.#t.height!==r)&&(this.#t.width=n,this.#t.height=r)}hold(e){let t=`${String(e.width)}px`,n=`${String(e.height)}px`;this.#t.style.width!==t&&(this.#t.style.width=t),this.#t.style.height!==n&&(this.#t.style.height=n)}paint(e){let t=this.#t.getContext(`2d`);t!==null&&(t.setTransform(this.#a,0,0,this.#a,0,0),t.setLineDash([]),e(t))}palette(){return this.#i.palette}frameChanged(){this.#i.frameChanged()}name(e){this.#t.setAttribute(`role`,`img`),this.#t.setAttribute(`aria-label`,e)}decorative(){this.#t.setAttribute(`aria-hidden`,`true`)}touch(e){this.#t.style.touchAction=e?`none`:`manipulation`}listen(e,t,n){this.#t.addEventListener(e,t,{signal:n})}pointAt(e){let t=this.#t.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}onPage(e){let t=this.#t.getBoundingClientRect();return{x:e.x+t.left,y:e.y+t.top}}capture(e){this.#t.setPointerCapture(e)}shift(e,t,n){e.drawImage(this.#t,0,t.y*this.#a,this.#t.width,t.height*this.#a,t.by,t.y,n,t.height)}remove(){this.#n.disconnect(),this.#t.remove()}},fc=class{#e;#t=new Map;palette;constructor(e){this.#e=e,this.palette=this.ink.bind(this)}ink(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#e.value(e).trim();return this.#t.set(e,n),n}frameChanged(){this.#t.clear()}},pc=class{#e;constructor(e){this.#e=e}mount(e,t){let n=e.ownerDocument.createElement(`canvas`);e.replaceChildren(n);let r=new ResizeObserver(t);return r.observe(e),new dc({host:e,canvas:n,observer:r,budget:this.#e,colours:new fc(new uc(n))})}},mc=1800,hc=.5,gc=class{#e;#t;#n;#r;#i;#a;#o;constructor(e,t,n,r){this.#e=e,this.#t=t,this.#n=n,this.#r=r}mount(e){this.#i=this.#r.mount(e,()=>{this.#c(hc)}),this.#i.decorative()}render(e){if(this.#a=e,this.#i?.frameChanged(),this.#n.reduced()){this.#s(),this.#c(hc);return}this.#o??=this.#t.subscribe(e=>{this.#c(e%mc/mc)})}dispose(){this.#s(),this.#i?.remove(),this.#i=void 0,this.#a=void 0}#s(){this.#o?.(),this.#o=void 0}#c(e){let t=this.#i,n=this.#a;if(t===void 0||n===void 0)return;let r=t.hostSize().width;if(r===0)return;let i={width:r,height:this.#e.height(n,r)};t.fit(i),t.hold(i),t.paint(r=>{this.#e.paint(r,n,i,t.palette(),e)})}},_c=class{#e;#t;#n;#r;constructor(e,t,n,r){this.#e=e,this.#t=t,this.#n=n,this.#r=r}pane(){return new gc(this.#e.map,this.#t,this.#n,this.#r)}map(){return new gc(this.#e.map,this.#t,this.#n,this.#r)}},vc=24,yc=14,bc=7,xc=9,Sc=5,Cc={visited:`frame`,unvisited:`dim`,noise:`rd`,you:`yl`,mark:`mg`},wc={visited:1,unvisited:.75,noise:1,you:1,mark:1},Tc=class{#e;constructor(e){this.#e=e}height(e,t){return Math.round(t*e.height/e.width)+vc}paint(e,t,n,r,i){let a=n.width/t.width,o=n.height-vc,s=o/t.height,c=this.#e.atLeast(Math.round(Math.min(a,s)*.9)),l=(e,t)=>[(e+.5)*a,(t+.5)*s];e.globalAlpha=1,e.shadowBlur=0,e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height),e.fillStyle=r(`rule`);for(let n=0;n<t.height;n++)for(let r=0;r<t.width;r++){let[t,i]=l(r,n);e.fillRect(t-.5,i-.5,1,1)}e.strokeStyle=r(`rule-hi`),e.lineWidth=1,e.strokeRect(.5,.5,n.width-1,o-1),e.textAlign=`center`,e.textBaseline=`middle`,e.font=this.#e.of(`regular`,c);for(let n of t.nodes){let[t,i]=l(n.x,n.y);this.#t(e,r,n.glyph,t,i,n.tone)}e.font=this.#e.of(`bold`,c);for(let n of t.marks){let[i,a]=l(n.x,n.y);this.#t(e,r,t.markGlyph,i,a,`mark`)}let u=n.width/2,d=o/2;this.#n(e,r(`yl`),u,d,i),e.globalAlpha=1,e.fillStyle=r(`yl`),e.beginPath(),e.moveTo(u,d-Sc),e.lineTo(u+Sc,d),e.lineTo(u,d+Sc),e.lineTo(u-Sc,d),e.closePath(),e.fill(),e.font=this.#e.of(`bold`),e.textAlign=`left`,this.#t(e,r,t.origin.glyph,u+Sc+4,d,`you`),this.#r(e,t,n,r,o)}#t(e,t,n,r,i,a){e.fillStyle=t(Cc[a]),e.globalAlpha=wc[a],e.fillText(n,r,i)}#n(e,t,n,r,i){e.strokeStyle=t,e.lineWidth=1.2;for(let t=0;t<3;t++){let a=(i+t/3)%1;e.globalAlpha=(1-a)*.7,e.beginPath(),e.arc(n,r,bc+xc*a,0,Math.PI*2),e.stroke()}}#r(e,t,n,r,i){let a=i+vc/2;e.font=this.#e.of(`regular`),e.textAlign=`left`,e.textBaseline=`middle`;let o=6;for(let i of t.legend){if(o+e.measureText(`${i.glyph} ${i.label}`).width>n.width)break;this.#t(e,r,i.glyph,o,a,i.tone),o+=e.measureText(i.glyph).width+5,e.globalAlpha=1,e.fillStyle=r(`dim`),e.fillText(i.label,o,a),o+=e.measureText(i.label).width+yc}}},Ec=`default`,Dc=`abyssal`,Oc=class{of(e){return e===null?Ec:e.abyssal?Dc:e.frame??Ec}},kc=class{#e;#t=new Set;#n;constructor(e){this.#e=e}subscribe(e){return this.#t.add(e),this.#n===void 0&&this.#r(),()=>{this.#t.delete(e),this.#t.size===0&&this.#n!==void 0&&(this.#e.cancel(this.#n),this.#n=void 0)}}now(){return this.#e.now()}#r(){this.#n=this.#e.request(e=>{this.#i(e)})}#i(e){if(this.#n=void 0,this.#t.size!==0){this.#r();for(let t of[...this.#t])this.#t.has(t)&&t(e)}}},Ac=7,jc=500,Mc=1<<20,Nc={tears:[],grain:[],tint:0,dark:!1},Pc=class{#e=new Eo(0,0);#t=0;#n=[];plan(e,t,n){if(t<=0)return Nc;(!e.equals(this.#e)||t!==this.#t)&&(this.#e=e,this.#t=t,this.#n=[]);let r=(n%8+8)%8,i=this.#n[r];if(i!==void 0)return i;let a=this.#r(e.branch(r),t);return this.#n[r]=a,a}#r(e,t){let n=[];for(let r=0;r<Math.floor(t*Ac);r++){let i=e.branch(`tear`).branch(r);this.#i(i,`keep`)>.35+t*.5||n.push({y:this.#i(i,`y`),height:2+this.#i(i,`height`)*14*t,shift:(this.#i(i,`shift`)-.5)*40*t})}let r=[],i=e.branch(`grain`);for(let e=0;e<Math.round(t*jc);e++){let t=i.branch(e).range(0,Mc*2-1);r.push({x:(t&1023)/1024,y:(t>>10&1023)/1024,red:t>=Mc})}return{tears:n,grain:r,tint:.1*t,dark:t>.5&&this.#i(e,`dark`)<.08*t}}#i(e,t){return e.branch(t).range(0,1048575)/Mc}},Fc=class{ease(e){return e<.5?4*e**3:1-(-2*e+2)**3/2}},Ic=class{ease(e){return 1-(1-e)**3}},Lc=2,Rc=13e5,zc=class{#e;#t;constructor(e=Lc,t=Rc){if(!(e>0&&t>0))throw RangeError(`a pixel budget is positive, got ${String(e)} and ${String(t)}`);this.#e=e,this.#t=t}ratio(e,t,n){let r=Math.min(e,this.#e),i=t*n;return i<=0?r:Math.min(r,Math.sqrt(this.#t/i))}},Bc=class{#e;#t;#n;constructor(e){this.#e=e.canvas,this.#t=e.listeners,this.#n=e.tear}hostSize(){return this.#e.hostSize()}fit(e){this.#e.fit(e)}name(e){this.#e.name(e)}touch(e){this.#e.touch(e)}frameChanged(){this.#e.frameChanged()}pointAt(e){return this.#e.pointAt(e)}onPage(e){return this.#e.onPage(e)}capture(e){this.#e.capture(e)}paint(e,t){let n=this.#e,r=n.palette();n.paint(i=>{i.globalAlpha=1,i.save(),e.zoom.apply(i,e.size),t(i,r),i.restore(),e.zoom.fade(i,e.size,r(`ground`)),this.#n.draw(i,n,{...e,palette:r})})}remove(){this.#t.abort(),this.#e.remove()}},Vc=class{#e;#t;constructor(e){this.#e=e.canvases,this.#t=e.tear}mount(e,t){let n=this.#e.mount(e,()=>{t.resized()}),r=new AbortController,i=r.signal;return n.listen(`pointerdown`,e=>{t.down(e)},i),n.listen(`pointermove`,e=>{t.move(e)},i),n.listen(`pointerup`,e=>{t.up(e)},i),n.listen(`pointercancel`,e=>{t.up(e)},i),n.listen(`pointerleave`,()=>{t.leave()},i),n.listen(`click`,e=>{t.tap(e)},i),new Bc({canvas:n,listeners:r,tear:this.#t})}},Hc=`pick`,Uc=class{pick(e,t){e.dispatchEvent(new CustomEvent(Hc,{bubbles:!0,detail:{id:t}}))}onPick(e,t,n){e.addEventListener(Hc,e=>{let t=this.#e(e);t!==void 0&&n(t)},{signal:t})}#e(e){if(!(e instanceof CustomEvent))return;let t=e.detail,n=typeof t==`object`&&t&&`id`in t?t.id:void 0;return typeof n==`string`?n:void 0}},k=class{#e;constructor(e){if(e===``)throw RangeError(`a marked child has an id`);this.#e=e}marks(e){return e===this.#e}marksAny(){return!0}or(){return this}written(){return this.#e}equals(e){return e.marks(this.#e)}},A=class{marks(){return!1}marksAny(){return!1}or(e){return e}written(){return``}equals(e){return!e.marksAny()}},Wc=class{holds(){return!1}paint(){}},Gc=class{#e;#t;#n;#r;#i;#a;constructor(e){this.#e=e.context,this.#t=e.size,this.#n=e.palette,this.#r=e.time,this.#i=e.into,this.#a={x:e.size.width/2,y:e.size.height/2}}spot(){return this.#a}line(e){let t=e.camera(this.#t),n=(this.#i===``?void 0:t.stopOf(this.#i))??t.rest();e.paint(this.#e,this.#t,this.#n,this.#r,new A,n,this.#o());let r=e.layout(this.#t,n).find(e=>e.id===this.#i);r!==void 0&&(this.#a=r.anchor)}plan(e){let t=e.camera(this.#t).whole();e.paint(this.#e,this.#t,this.#n,this.#r,new A,t,new Wc)}bare(){this.#e.fillStyle=this.#n(`ground`),this.#e.fillRect(0,0,this.#t.width,this.#t.height)}#o(){return this.#i===``?new A:new k(this.#i)}},Kc=750,qc=class{#e;#t;#n;#r;#i;#a;constructor(e){this.#e=e.canvases,this.#t=e.clock,this.#n=e.motion}play(e,t,n){if(this.skip(),this.#n.reduced()||t.length===0){n();return}this.#a=n;let r=this.#e.mount(e,()=>void 0);r.decorative(),this.#r=r;let i=this.#t.now(),a,o=-1;this.#i=this.#t.subscribe(e=>{let n=Math.max(0,e-i),s=Math.floor(n/Kc),c=t[s];if(c===void 0){this.skip();return}s!==o&&(o=s,a=void 0);let l=n%Kc/Kc,u=s===t.length-1,d=r.hostSize();if(d.width===0||d.height===0)return;r.fit(d);let f=r.palette();r.paint(t=>{t.fillStyle=f(`ground`),t.globalAlpha=1,t.fillRect(0,0,d.width,d.height);let n=a??{x:d.width/2,y:d.height/2},r=u?1:1+1.6*l*l;t.save(),t.translate(n.x,n.y),t.scale(r,r),t.translate(-n.x,-n.y);let i=new Gc({context:t,size:d,palette:f,time:e,into:c.into});c.sketch.stageOn(i),t.restore(),a=i.spot();let o=l<.15?1-l/.15:!u&&l>.75?(l-.75)/.25:0;o>0&&(t.globalAlpha=o,t.fillStyle=f(`ground`),t.fillRect(0,0,d.width,d.height),t.globalAlpha=1)})})}skip(){this.#i?.(),this.#i=void 0,this.#r?.remove(),this.#r=void 0;let e=this.#a;this.#a=void 0,e?.()}},Jc=750,Yc=class{#e;#t;#n;#r=[];#i;#a;#o;#s=0;#c=0;constructor(e){this.#e=e.canvases,this.#t=e.clock,this.#n=e.motion}show(e){this.clear(),this.#a=e.scroller,this.#c=e.decay,this.#s=this.#t.now(),this.#r=e.bands.map(e=>{let t={band:e,canvas:this.#e.mount(e.host,()=>{this.#d(t,0)}),spot:{x:0,y:0}};return t.canvas.decorative(),t}),this.#i=this.#e.mount(e.thread,()=>{this.#f(this.#t.now())}),this.#i.decorative();for(let e of this.#r)this.#d(e,0);if(this.#n.reduced()){this.#f(0),e.scroller.addEventListener(`scroll`,()=>{this.#f(0)});return}this.#o=this.#t.subscribe(e=>{this.#l(e)})}clear(){this.#o?.(),this.#o=void 0;for(let e of this.#r)e.canvas.remove();this.#i?.remove(),this.#r=[],this.#i=void 0,this.#a=void 0}#l(e){let t=this.#u();t!==void 0&&this.#d(t,e),this.#f(e)}#u(){let e=this.#a?.getBoundingClientRect();if(e===void 0)return;let t=e.top+e.height/2,n,r=1/0;for(let e of this.#r){let i=e.band.host.getBoundingClientRect(),a=Math.abs(i.top+i.height/2-t);a<r&&(r=a,n=e)}return n}#d(e,t){let n=e.canvas.hostSize();if(n.width===0||n.height===0)return;e.canvas.fit(n);let r=e.canvas.palette();e.canvas.paint(i=>{let a=new Gc({context:i,size:n,palette:r,time:t,into:e.band.into});e.band.sketch.stageOn(a),e.spot=a.spot()})}#f(e){let t=this.#i;if(t===void 0)return;let n=t.hostSize();if(n.width===0||n.height===0)return;t.fit(n);let r=t.palette(),i=t.onPage({x:0,y:0}),a=this.#r.map(e=>{let t=e.band.host.getBoundingClientRect();return{x:t.left-i.x+e.spot.x,y:t.top-i.y+e.spot.y,top:t.top-i.y,bottom:t.bottom-i.y}}),o=this.#n.reduced(),s=o?1:Math.min(1,Math.max(0,e-this.#s)/Jc);t.paint(t=>{t.clearRect(0,0,n.width,n.height);let i=a[0],c=a[a.length-1];if(i===void 0||c===void 0)return;let l=new Path2D;l.moveTo(i.x,i.y),a.forEach((e,t)=>{t>0&&l.lineTo(e.x,e.y);let n=a[t+1];if(n===void 0)return;let r=n.top-e.bottom;l.lineTo(e.x,e.bottom),l.bezierCurveTo(e.x,e.bottom+r*.6,n.x,n.top-r*.6,n.x,n.top)});let u=c.y+(-20-c.y)*(1-(1-s)**3);t.save(),t.beginPath(),t.rect(0,u,n.width,n.height),t.clip(),t.lineCap=`round`,t.lineJoin=`round`;let d=this.#c;d>0&&(t.globalAlpha=.35*d,t.strokeStyle=r(`rd`),t.lineWidth=1.5,t.save(),t.translate(Math.sin(e/90)*3*d,Math.cos(e/130)*1.5*d),t.stroke(l),t.restore(),t.setLineDash([22+30*(1-d),3+18*d])),t.strokeStyle=r(`cy`),t.globalAlpha=.12,t.lineWidth=9,t.stroke(l),t.globalAlpha=.8,t.lineWidth=2,t.stroke(l),t.setLineDash([]),o||(t.setLineDash([3,28]),t.lineDashOffset=-e*.07,t.strokeStyle=r(`wh`),t.globalAlpha=.75,t.lineWidth=2.5,t.stroke(l),t.setLineDash([])),t.strokeStyle=r(`cy`),t.globalAlpha=.9,t.lineWidth=1.5,a.slice(0,-1).forEach(e=>{t.beginPath(),t.arc(e.x,e.y,5,0,Math.PI*2),t.stroke()}),t.fillStyle=r(`yl`),t.globalAlpha=1,t.beginPath(),t.arc(c.x,c.y,4+(o?0:Math.sin(e/200)),0,Math.PI*2),t.fill(),t.restore()})}},Xc=[`era`,`culture`,`trait`],Zc=class e{#e;#t;constructor(e){this.#e=e,this.#t=e.map((t,n)=>Xc.flatMap(r=>this.#n(t,e[n-1],r)))}static of(t){return new e(t)}at(e){return this.#t[e]??[]}inForce(e){let t=t=>this.#t.slice(0,e+1).flat().findLast(e=>e.lane===t)??{lane:t,word:``,look:`none`};return{era:t(`era`),culture:t(`culture`),trait:t(`trait`)}}current(e){let t=this.#e[e]?.current??``;return t===this.#e[e-1]?.current?``:t}#n(e,t,n){let r=e.values[n];if(r===``)return[];let i=n!==`trait`&&e.rebel,a=n!==`trait`&&e.drift[n]&&t?.drift[n]!==!0;return!i&&!a&&r===t?.values[n]?[]:[{lane:n,word:r,look:i?`rebel`:a?`drift`:`set`}]}},Qc=156,$c=88,el=38,tl=16,nl=8,j={height:22,step:26},rl=16,il={from:23,drop:47},al=14,ol=class e{#e;#t;#n;#r;#i;constructor(e,t,n){this.#e=e,this.#t=Zc.of(e),this.#n=t;let r=188+Qc*Math.max(0,e.length-1);this.#r=Math.max(n,r),this.#i=$c+(this.#r-r)/2}static of(t,n){return new e(t,n.width,n.height)}size(){return{width:this.#n,height:this.#r}}rows(){let e=this.#a()-el-tl;return this.#e.map((t,n)=>{let r=this.#s(n);return{y:r,plate:{x:this.#a(),y:r},radius:el,words:{right:e,width:e-nl},box:{x:0,y:r-Qc/2,width:this.#n,height:Qc}}})}spine(){return{x:this.#a(),top:this.#s(0),bottom:this.#s(this.#e.length-1)}}labels(){let e=this.#o();return this.#e.flatMap((t,n)=>{let r=this.#t.at(n),i=this.#s(n)-(r.length*j.step-(j.step-j.height))/2;return r.map((t,r)=>({row:n,lane:t.lane,word:t.word,look:t.look,x:e,y:i+r*j.step,width:this.#n-nl-e,height:j.height}))})}currents(){return this.#e.flatMap((e,t)=>{let n=this.#t.current(t);if(n===``)return[];let r=this.#t.at(t).length*j.step-(j.step-j.height);return[{at:{x:this.#o(),y:this.#s(t)+r/2+rl},word:n}]})}berths(){return this.#e.flatMap((e,t)=>e.berth?[{x:this.#a()-el-il.from,y:this.#s(t)+il.drop}]:[])}focus(e){let t=this.#r-e.height,n=t>0?Math.min(1,Math.max(0,e.top/t)):.5,r=e.top+e.height*n,i=0;return this.#e.forEach((e,t)=>{Math.abs(this.#s(t)-r)<Math.abs(this.#s(i)-r)&&(i=t)}),i}inForce(e){return this.#t.inForce(e)}backdrop(e){return Xc.map((t,n)=>{let r=e.top+e.height*(n*2+1)/6;return{lane:t,head:{x:al,y:r-30},word:{x:al,y:r+14},width:this.#n-28}})}#a(){return this.#n/2}#o(){return this.#a()+el+tl}#s(e){return this.#i+Qc*e}},sl=900,cl=700,ll=class{#e;#t;#n;#r;#i;#a;constructor(e){this.#e=e.canvases,this.#t=e.clock,this.#n=e.motion,this.#r=e.picture}show(e){this.clear();let t=this.#t.now(),n=this.#n.reduced(),r=this.#o(e),i={level:-1,from:-1,since:t},a=a=>{let o={top:e.scroller.scrollTop,height:e.scroller.clientHeight},s=r.focus(o);return i.level<0?i={level:s,from:s,since:a}:s!==i.level&&(i={level:s,from:i.level,since:a}),{seconds:n?0:a/1e3,still:n,reveal:n?1:Math.min(1,Math.max(0,a-t)/sl),window:o,focus:{level:i.level,from:i.from,progress:n?1:Math.min(1,(a-i.since)/cl)}}},o=this.#e.mount(e.host,()=>{r=this.#o(e),n&&this.#s(o,e.vm,r,a(this.#t.now()))});o.decorative(),this.#i=o;let s=r.rows()[e.at]?.y??0;if(e.scroller.scrollTop=s-e.scroller.clientHeight/2,n){let t=()=>{this.#s(o,e.vm,r,a(this.#t.now()))};t(),e.scroller.addEventListener(`scroll`,t,{passive:!0}),this.#a=()=>{e.scroller.removeEventListener(`scroll`,t)};return}this.#a=this.#t.subscribe(t=>{this.#s(o,e.vm,r,a(t))})}clear(){this.#a?.(),this.#a=void 0,this.#i?.remove(),this.#i=void 0}#o(e){let t=ol.of(e.vm.levels,{width:e.host.clientWidth,height:e.scroller.clientHeight});return e.host.style.height=`${String(t.size().height)}px`,t.rows().forEach((t,n)=>{let r=e.levels[n];r!==void 0&&(r.style.top=`${String(t.box.y)}px`,r.style.height=`${String(t.box.height)}px`)}),t}#s(e,t,n,r){let i=n.size();if(i.width===0)return;e.fit(i),e.hold(i);let a=e.palette();e.paint(e=>{this.#r.paint(e,t,n,a,r)})}},ul=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#t}drawn(){return!0}samePicture(e){return e.drawnBy(this.#e)}drawnBy(e){return e===this.#e}stageOn(e){e.plan(this)}layout(e,t){return this.#e.layout(this.#t,e,t)}paint(e,t,n,r,i,a,o){this.#e.paint(e,this.#t,t,n,r,i,a,o)}camera(e){return this.#e.camera(this.#t,e)}stopOf(e,t,n){return this.#e.stopOf(this.#t,e,t,n)}rest(e,t){return this.#e.rest(this.#t,e,t)}mapKey(){return this.#t.mapKey}},dl=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#t}drawn(){return!0}layout(e,t){return this.#e.layout(this.#t,e,t)}paint(e,t,n,r,i,a,o){this.#e.paint(e,this.#t,t,n,r,i,a,o)}camera(e){return this.#e.camera(this.#t,e)}samePicture(e){return e.drawnBy(this.#e)}drawnBy(e){return e===this.#e}stageOn(e){e.line(this)}},fl=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.street,this.#t=e.tower,this.#n=e.corridor,this.#r=e.plan,this.#i=e.area}street(e){return new dl(this.#e,e)}tower(e){return new dl(this.#t,e)}corridor(e){return new dl(this.#n,e)}plan(e){return new ul(this.#r,e)}area(e){return new dl(this.#i,e)}},pl=class e{#e;#t;#n;#r;constructor(e){this.#e=e.host,this.#t=e.sketch,this.#n=e.view,this.#r=e.fresh}keeps(e,t){return e===this.#e&&this.#t.samePicture(t)}keptFor(t){return new e({host:this.#e,sketch:t,view:this.#n,fresh:!1})}redraw(){this.#r||this.#n.render(this.#t)}arrive(e){this.#n.arrive(e)}leads(e){return this.#n.leads(e)}enter(e){this.#n.enter(e)}light(e){this.#n.light(e)}dispose(){this.#n.dispose()}},ml=class{#e;#t;#n;#r;constructor(e){this.#e=e}show(e,t,n){if(e===null){this.clear();return}this.#t={host:e,onLight:n},t.stageOn(this),this.#t=void 0}line(e){this.#i(this.#n,e,e=>this.#e.line(e),e=>{this.#n=e})}plan(e){this.#i(this.#r,e,e=>this.#e.plan(e),e=>{this.#r=e})}bare(){this.clear()}redraw(){this.#a()?.redraw()}showing(){return this.#a()!==void 0}arrive(e){this.#a()?.arrive(e)}leads(e){return this.#a()?.leads(e)===!0}enter(e){this.#a()?.enter(e)}light(e){this.#a()?.light(e)}clear(){this.#a()?.dispose(),this.#n=void 0,this.#r=void 0}#i(e,t,n,r){let i=this.#t;if(i===void 0)return;if(e?.keeps(i.host,t)===!0){r(e.keptFor(t));return}this.clear();let a=n(i.onLight);a.mount(i.host),a.render(t),r(new pl({host:i.host,sketch:t,view:a,fresh:!0}))}#a(){return this.#n??this.#r}},hl=class{paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,e.strokeRect(t.x-n*.5,t.y-n*.9,n,n*1.8);let o=(Math.sin(r*1.2)*.5+.5)*1.1,s=t.x-n*.5;e.strokeStyle=a,e.beginPath(),e.moveTo(s,t.y-n*.9),e.lineTo(s+Math.cos(o)*n,t.y-n*.9+Math.sin(o)*n*.3),e.lineTo(s+Math.cos(o)*n,t.y+n*.9-Math.sin(o)*n*.1),e.lineTo(s,t.y+n*.9),e.stroke()}},gl=class{paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,e.strokeRect(t.x-n*.5,t.y-n,n,n*2),e.beginPath(),e.moveTo(t.x-n*.2,t.y-n),e.lineTo(t.x-n*.2,t.y+n),e.stroke(),e.fillStyle=a,e.fillRect(t.x-n*.45,t.y+Math.sin(r*.9)*n*.7-n*.15,n*.22,n*.3)}},_l=[[-.8,.3],[-.25,.9],[.35,.55]],vl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,_l.forEach(([i,o],s)=>{let c=o*n*1.6;e.strokeRect(t.x+i*n,t.y+n*.8-c,n*.45,c);for(let o=0;o<3;o++)Math.sin(r*2+s*3+o*1.7)>0&&this.#e.dot(e,{x:t.x+(i+.22)*n,y:t.y+n*.55-o*n*.42},n*.07,a)})}},yl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,e.beginPath();for(let[r,i]of[[-1,-1],[1,-1],[-1,1],[1,1]])e.moveTo(t.x+r*n,t.y+i*n),e.lineTo(t.x+r*n*.3,t.y+i*n*.3);e.stroke(),e.strokeRect(t.x-n*.3,t.y-n*.3,n*.6,n*.6),Math.sin(r*9)>-.6&&this.#e.dot(e,{x:t.x,y:t.y-n*.8},n*.12,a)}},bl=[[-.9,-.3],[-.4,-.8],[.3,-.6],[.9,-.7],[.8,.2],[.3,.8],[-.5,.6]],xl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,this.#e.line(e,bl.map(([e,r])=>({x:t.x+e*n,y:t.y+r*n}))),e.closePath(),e.stroke(),this.#e.dot(e,{x:t.x+n*.1,y:t.y},n*.18,a,.5+.5*Math.sin(r*3))}},Sl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i}){let a=e=>({x:t.x+e*n,y:t.y+Math.sin(e*3+r*1.6)*n*.35});e.strokeStyle=i,this.#e.line(e,Array.from({length:21},(e,t)=>a(t/10-1))),e.stroke();for(let t=0;t<3;t++)this.#e.dot(e,a((r*.35+t/3)%1*2-1),n*.15,i)}},Cl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,e.strokeRect(t.x-n,t.y-n*.55,n*2,n*1.1),e.beginPath(),e.moveTo(t.x-n,t.y),e.lineTo(t.x+n,t.y),e.stroke();let o=r*.5%1*2-1;this.#e.dot(e,{x:t.x+o*n*.9,y:t.y},n*.13,a)}},wl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i}){let a=n*.8;e.strokeStyle=i,e.beginPath(),e.arc(t.x,t.y,a,0,Math.PI*2),e.stroke(),e.globalAlpha=.6,this.#e.line(e,this.#e.ellipse(t,Math.abs(Math.sin(r*.8))*a,a)),e.stroke(),e.beginPath(),e.moveTo(t.x-a,t.y),e.lineTo(t.x+a,t.y),e.stroke(),e.globalAlpha=1}},Tl={era:{line:`yl`,text:`yl`},culture:{line:`mg`,text:`mg`},trait:{line:`bl`,text:`text`}},El={rebel:`rd`,drift:`mg`,curved:`wh`,door:`ab`,anomaly:`yl`},M={pad:5,height:18,gap:5,drop:23},Dl={kind:-16,name:4,namePx:14},Ol={set:.2,rebel:.26,drift:.16,none:.12},kl={measured:100,largest:96},Al={out:-.4,in:.3},jl=class{#e;constructor(e){this.#e=e}paint(e,t,n,r,i){let a=n.size();e.globalAlpha=1,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,a.width,a.height),e.save(),e.beginPath(),e.rect(0,0,a.width,a.height*i.reveal),e.clip(),this.#t(e,t,n,r,i),this.#i(e,n,r,i),this.#a(e,t,n,r),this.#o(e,t,n,r),this.#s(e,n,r),this.#c(e,t,n,r,i),e.restore()}#t(e,t,n,r,i){let a=n.inForce(i.focus.level),o=n.inForce(i.focus.from),s=1-(1-Math.min(1,Math.max(0,i.focus.progress)))**3;e.textAlign=`left`,e.textBaseline=`middle`;for(let c of n.backdrop(i.window)){let n=a[c.lane],l=o[c.lane],u=t.heads[c.lane].toLocaleUpperCase();e.font=this.#e.font.of(`bold`),e.fillStyle=r(Tl[c.lane].text),e.fillText(u,c.head.x,c.head.y),(n.look===`rebel`||n.look===`drift`)&&(e.fillStyle=r(El[n.look]),e.fillText(t.looks[n.look].toLocaleUpperCase(),c.head.x+e.measureText(u).width+10,c.head.y)),s>=1||l.word===n.word&&l.look===n.look?this.#n(e,c,n,{shift:0,share:1},r,i):(this.#n(e,c,l,{shift:Al.out*c.width*s,share:1-s},r,i),this.#n(e,c,n,{shift:Al.in*c.width*(1-s),share:s},r,i))}}#n(e,t,n,r,i,a){if(r.share<=0)return;let o=n.look===`none`?`—`:n.word.toLocaleUpperCase();e.font=this.#e.font.of(`bold`,kl.measured);let s=Math.max(1,e.measureText(o).width),c=this.#e.font.atLeast(Math.min(kl.largest,Math.floor(kl.measured*t.width/s)));e.font=this.#e.font.of(`bold`,c);let l=!a.still,u=t.word.x+r.shift+(n.look===`rebel`&&l?this.#r(a.seconds):0),d=t.word.y+(n.look===`drift`&&l?Math.sin(a.seconds*1.3)*3:0);if(e.globalAlpha=Ol[n.look]*r.share,e.fillStyle=i(n.look===`rebel`?El.rebel:n.look===`none`?`dim`:Tl[t.lane].text),e.fillText(o,u,d),n.look===`drift`){let n=d+c*.45;e.strokeStyle=i(Tl[t.lane].line),e.globalAlpha=.5*r.share,e.lineWidth=2,e.setLineDash([6,5]),e.beginPath(),e.moveTo(u,n),e.lineTo(u+e.measureText(o).width,n),e.stroke(),e.setLineDash([])}e.globalAlpha=1}#r(e){let t=e%2.6;return t>2.34&&t<2.44?3:t>=2.44&&t<2.54?-4:0}#i(e,t,n,r){let i=t.spine();if(e.strokeStyle=n(`cy`),e.globalAlpha=.14,e.lineWidth=10,e.beginPath(),e.moveTo(i.x,i.top),e.lineTo(i.x,i.bottom),e.stroke(),e.globalAlpha=.85,e.lineWidth=2,e.stroke(),e.globalAlpha=1,!r.still)for(let t=0;t<4;t++){let a=(r.seconds*.12+t/4)%1;this.#e.ink.dot(e,{x:i.x,y:i.top+(i.bottom-i.top)*a},3,n(`wh`),.8*Math.sin(a*Math.PI))}}#a(e,t,n,r){e.textAlign=`left`,e.textBaseline=`middle`;for(let i of n.labels()){let n=Tl[i.lane];e.fillStyle=r(`ground`),e.globalAlpha=.85,e.fillRect(i.x,i.y,i.width,i.height),e.globalAlpha=1,e.strokeStyle=r(i.look===`rebel`?El.rebel:n.line),e.lineWidth=1,e.setLineDash(i.look===`drift`?[4,3]:[]),e.strokeRect(i.x+.5,i.y+.5,i.width-1,i.height-1),e.setLineDash([]);let a=i.y+i.height/2,o=t.heads[i.lane];e.font=this.#e.font.of(`regular`),e.fillStyle=r(`dim`),e.fillText(o,i.x+7,a);let s=i.x+7+e.measureText(`${o} `).width;e.font=this.#e.font.of(`bold`),e.fillStyle=r(n.text),e.fillText(this.#u(e,i.word,i.x+i.width-6-s),s,a)}}#o(e,t,n,r){e.font=this.#e.font.of(`regular`),e.textAlign=`left`,e.textBaseline=`middle`;let i=n.size().width;for(let a of n.currents())e.fillStyle=r(`dim`),e.fillText(t.currentHead,a.at.x+2,a.at.y),e.fillStyle=r(`mg`),e.fillText(this.#u(e,a.word,i-a.at.x-10),a.at.x+2,a.at.y+16)}#s(e,t,n){e.strokeStyle=n(`ab`),e.globalAlpha=.6,e.lineWidth=1,e.setLineDash([2,3]);for(let n of t.berths())e.strokeRect(n.x-11,n.y-7,22,14);e.setLineDash([]),e.globalAlpha=1}#c(e,t,n,r,i){let a=n.rows();t.levels.forEach((t,n)=>{let o=a[n];if(o===void 0)return;let s=r(t.abyssal?`rd`:t.here?`yl`:`cy`),c=o.plate;if(e.fillStyle=s,e.globalAlpha=i.still?.2:.18+.1*Math.sin(i.seconds*2+n*.6),e.beginPath(),e.arc(c.x,c.y,o.radius+6,0,Math.PI*2),e.fill(),e.globalAlpha=1,e.fillStyle=r(`ground`),e.beginPath(),e.arc(c.x,c.y,o.radius,0,Math.PI*2),e.fill(),e.strokeStyle=s,e.globalAlpha=t.here?1:.85,e.lineWidth=t.here?2.5:1.6,e.stroke(),e.globalAlpha=1,t.here&&!i.still){let t=i.seconds*.6%1;e.strokeStyle=r(`yl`),e.globalAlpha=.7*(1-t),e.lineWidth=2,e.beginPath(),e.arc(c.x,c.y,o.radius*(1+t*.45),0,Math.PI*2),e.stroke(),e.globalAlpha=1}e.lineWidth=2.2,this.#e.glyphs[t.glyph].paint({painter:e,at:c,radius:o.radius*.6,seconds:i.still?0:i.seconds,ink:s,accent:r(`yl`)}),e.textAlign=`right`,e.textBaseline=`middle`,e.font=this.#e.font.of(`regular`),e.fillStyle=r(t.here?`yl`:`dim`),e.fillText(this.#u(e,t.kind,o.words.width),o.words.right,o.y+Dl.kind),e.font=this.#e.font.of(`bold`,Dl.namePx),e.fillStyle=r(t.here?`yl`:`text`),e.fillText(this.#u(e,t.name,o.words.width),o.words.right,o.y+Dl.name),this.#l(e,t.tags,o,r)})}#l(e,t,n,r){e.font=this.#e.font.of(`regular`);let i=[],a=0;for(let r of t){let t=e.measureText(r.word).width+M.pad*2,o=a+(i.length>0?M.gap:0)+t;if(o>n.words.width)break;i.push({...r,width:t}),a=o}e.textAlign=`left`;let o=n.words.right-a,s=n.y+M.drop;for(let t of i)e.strokeStyle=r(El[t.look]),e.lineWidth=1,e.strokeRect(o+.5,s-M.height/2,t.width,M.height),e.fillStyle=r(El[t.look]),e.fillText(t.word,o+M.pad,s),o+=t.width+M.gap}#u(e,t,n){if(e.measureText(t).width<=n)return t;for(let r=t.length-1;r>0;r--){let i=`${t.slice(0,r).trimEnd()}…`;if(e.measureText(i).width<=n)return i}return``}},Ml=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i}){e.strokeStyle=i,e.beginPath(),e.arc(t.x,t.y,n*.45,0,Math.PI*2),e.stroke();let a=r*.5%1;e.globalAlpha=1-a,e.beginPath(),e.arc(t.x,t.y,n*(.5+a*.5),0,Math.PI*2),e.stroke(),e.globalAlpha=1;for(let r=0;r<3;r++){let a=r*2.3+.6;this.#e.dot(e,{x:t.x+Math.cos(a)*n*.85,y:t.y+Math.sin(a)*n*.85},n*.07,i,.6)}}},Nl=[[0,-1],[.9,-.5],[.9,.5],[0,1],[-.9,.5],[-.9,-.5]],Pl=class{paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,e.beginPath(),Nl.forEach(([r,i],a)=>{a===0?e.moveTo(t.x+r*n,t.y+i*n):e.lineTo(t.x+r*n,t.y+i*n)}),e.closePath(),e.stroke();let o=n*(.32+.08*Math.sin(r*2.4));e.fillStyle=a,e.beginPath(),e.moveTo(t.x,t.y-o),e.lineTo(t.x+o*.7,t.y),e.lineTo(t.x,t.y+o),e.lineTo(t.x-o*.7,t.y),e.fill()}},Fl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){for(let a=0;a<3;a++)for(let o=1;o<=5;o++){let s=a*2.094+o*.55+r*.5,c=o/5*n;this.#e.dot(e,{x:t.x+Math.cos(s)*c,y:t.y+Math.sin(s)*c*.6},n*(.13-o*.012),i,1-o*.12)}this.#e.dot(e,t,n*.2,a)}},Il=class{paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,e.beginPath(),e.moveTo(t.x-n*.35,t.y-n),e.lineTo(t.x-n*.75,t.y+n),e.moveTo(t.x+n*.35,t.y-n),e.lineTo(t.x+n*.75,t.y+n),e.stroke(),e.fillStyle=a;for(let i=0;i<3;i++){let a=(r*.6+i/3)%1;e.fillRect(t.x-1,t.y-n+a*n*2,2,n*.3)}}},Ll=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i,accent:a}){e.strokeStyle=i,e.globalAlpha=.45,this.#e.line(e,this.#e.ellipse(t,n,n*.45)),e.stroke(),e.globalAlpha=1,this.#e.dot(e,t,n*.26,a);let o=r*1.1;this.#e.dot(e,{x:t.x+Math.cos(o)*n,y:t.y+Math.sin(o)*n*.45},n*.16,i)}},Rl=class{#e;constructor(e){this.#e=e}paint({painter:e,at:t,radius:n,seconds:r,ink:i}){e.strokeStyle=i;for(let i=0;i<8;i++){let a=i*Math.PI/4+r*.35,o=i%2==1?.55:1;e.beginPath(),e.moveTo(t.x+Math.cos(a)*n*.28,t.y+Math.sin(a)*n*.28),e.lineTo(t.x+Math.cos(a)*n*o,t.y+Math.sin(a)*n*o),e.stroke()}this.#e.dot(e,t,n*.2,i)}},zl=6,Bl=class{#e;constructor(e){this.#e=e}fraction(e,t){return this.#e.fraction(e,t)}ground(e,t,n){e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=n(`ground`),e.fillRect(0,0,t.width,t.height)}glow(e,t,n,r,i){e.fillStyle=r;for(let r=0;r<zl;r++)e.globalAlpha=i/zl,e.beginPath(),e.arc(t.x,t.y,n*(1-r/zl),0,Math.PI*2),e.fill();e.globalAlpha=1}stars(e,t,n,r,i,a,o=.5){let s=n(`text`),c=n(`yl`);for(let n=0;n<a;n++){let a=this.#e.fraction(`${i}-x`,n)*t.width,l=this.#e.fraction(`${i}-y`,n)*t.height,u=.5+this.#e.fraction(`${i}-pace`,n)*1.8,d=this.#e.fraction(`${i}-phase`,n)*6,f=this.#e.fraction(`${i}-big`,n)<.07;e.fillStyle=this.#e.fraction(`${i}-warm`,n)<.14?c:s,e.globalAlpha=o*(.25+.6*(.55+.45*Math.sin(r*u+d))),e.fillRect(a,l,f?1.8:1,f?1.8:1)}e.globalAlpha=1}dot(e,t,n,r,i=1){e.fillStyle=r,e.globalAlpha=i,e.beginPath(),e.arc(t.x,t.y,Math.max(.8,n),0,Math.PI*2),e.fill(),e.globalAlpha=1}line(e,t){e.beginPath(),t.forEach((t,n)=>{n===0?e.moveTo(t.x,t.y):e.lineTo(t.x,t.y)})}ellipse(e,t,n,r=0,i=48){let a=[];for(let o=0;o<=i;o++){let s=o/i*Math.PI*2,c=Math.cos(s)*t,l=Math.sin(s)*n;a.push({x:e.x+c*Math.cos(r)-l*Math.sin(r),y:e.y+c*Math.sin(r)+l*Math.cos(r)})}return a}curve(e,t,n,r,i=32){let a=[];for(let o=0;o<=i;o++){let s=o/i,c=1-s;a.push({x:c*c*c*e.x+3*c*c*s*t.x+3*c*s*s*n.x+s*s*s*r.x,y:c*c*c*e.y+3*c*c*s*t.y+3*c*s*s*n.y+s*s*s*r.y})}return a}},Vl=class e{lay(e){e.hide()}along(){}equals(t){return t instanceof e}},N=class e{rest(){return 0}clamp(){return 0}pace(){return 0}settle(){return 0}landing(){return 0}drags(){return!1}dragRate(){return 0}along(){return 0}zooms(){return!0}stopOf(){}stopCount(){return 0}nearest(){}stepFrom(){}track(){return new Vl}equals(t){return t instanceof e}},Hl=46,Ul=16,Wl=17,Gl=class{#e;constructor(e){this.#e=e}camera(){return new N}layout(e,t){return this.#t(e,t).map((t,n)=>({id:e.children[n]?.id??``,x:t.x-Hl/2,y:t.y-Hl/2+Ul/3,width:Hl,height:Hl,anchor:t}))}paint(e,t,n,r,i,a,o,s){let c=this.#t(t,n),l={painter:e,size:n,palette:r,seconds:i/1e3,address:t.address,spots:c,signal:t.signal};this.#e.ink.ground(e,n,r),this.#e.scenes[t.look].backdrop(l);let u=this.#n(c,n);t.children.forEach((t,i)=>{let o=c[i];if(o===void 0)return;let d=a.marks(t.id);this.#e.marks[t.mark].paint(l,o,{lit:d,sealed:t.sealed,address:t.address}),this.#r(e,r,o,t,d,s.marks(t.id)),this.#i(e,r,n,o,u,t,d)}),e.globalAlpha=1,e.setLineDash([])}#t(e,t){return this.#e.scenes[e.look].spots(e.children.length,t,e.address)}#n(e,t){let n=t.width*.5;return e.forEach((t,r)=>{e.forEach((e,i)=>{i>r&&Math.abs(t.y-e.y)<29&&(n=Math.min(n,Math.abs(t.x-e.x)-6))})}),n}#r(e,t,n,r,i,a){e.lineWidth=i?1.8:1.2,r.landmark&&(e.strokeStyle=t(`yl`),e.globalAlpha=.8,e.beginPath(),e.arc(n.x,n.y,16,0,Math.PI*2),e.stroke()),a&&(e.strokeStyle=t(`cy`),e.globalAlpha=.9,e.setLineDash([3,3]),e.beginPath(),e.arc(n.x,n.y,20,0,Math.PI*2),e.stroke(),e.setLineDash([])),i&&(e.strokeStyle=t(`yl`),e.globalAlpha=1,e.beginPath(),e.arc(n.x,n.y,13,0,Math.PI*2),e.stroke()),r.visited&&(e.fillStyle=t(`yl`),e.globalAlpha=1,e.beginPath(),e.arc(n.x+11,n.y-11,2.5,0,Math.PI*2),e.fill())}#i(e,t,n,r,i,a,o){e.font=this.#e.font.of(o?`bold`:`regular`),e.textAlign=`center`,e.textBaseline=`top`,e.fillStyle=t(o?`yl`:a.sealed?`dim`:`text`),e.globalAlpha=1;let s=e.measureText(a.name).width<=i?a.name:a.ordinal,c=e.measureText(s).width/2,l=Math.min(Math.max(r.x,c+2),n.width-c-2),u=Math.min(r.y+Wl-6,n.height-14);e.fillText(s,l,u)}},Kl=30,ql=class{#e;constructor(e){this.#e=e}ring(e,t,n,r,i=-Math.PI/2){return Array.from({length:e},(a,o)=>{let s=i+o/e*Math.PI*2;return{x:t.x+Math.cos(s)*n,y:t.y+Math.sin(s)*r}})}grid(e,t,n){let r=Math.max(1,Math.min(e,Math.ceil(Math.sqrt(e*(t.width/Math.max(1,t.height)))))),i=Math.ceil(e/r),a=t.width/r,o=t.height/i;return Array.from({length:e},(s,c)=>{let l=Math.floor(c/r),u=l===i-1?e-l*r:r,d=c%r,f=(r-u)*a*.5,p=(this.#e.fraction(`${n}-gx`,c)-.5)*Math.max(0,a-48)*.6,m=(this.#e.fraction(`${n}-gy`,c)-.5)*Math.max(0,o-48)*.6;return{x:t.x+f+a*(d+.5)+p,y:t.y+o*(l+.5)+m}})}zigzag(e,t,n,r){return Array.from({length:e},(i,a)=>{let o=e===1?.5:a/(e-1),s=e===1?0:a%2==0?-1:1;return{x:t.x+(n.x-t.x)*o,y:t.y+(n.y-t.y)*o+s*r}})}inner(e){return{x:Kl,y:Kl*.7,width:e.width-60,height:e.height-Kl*1.9}}},Jl=class{#e;constructor(e){this.#e=e}paint(e,t,n){let{painter:r,palette:i,seconds:a}=e,o=this.#e,s=n.sealed?.4:1,c=n.lit?1.35:1;o.glow(r,t,12,i(`yl`),.3*s*c);for(let e=0;e<6;e++){let c=t.x+(o.fraction(n.address,20+e)-.5)*12,l=t.y+(o.fraction(n.address,30+e)-.5)*10;r.fillStyle=i(e%3==0?`yl`:`text`),r.globalAlpha=(.55+.3*Math.sin(a*2+e))*s,r.fillRect(c-1.5,l-1.5,3,3)}r.globalAlpha=1}},Yl=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}spots(e,t,n){return this.#t.grid(e,this.#t.inner(t),n)}backdrop(e){let{painter:t,size:n,palette:r,seconds:i,address:a}=e,o=this.#e,s=Math.max(26,Math.min(n.width,n.height)/11),c=Math.ceil(n.width/s)+1,l=Math.ceil(n.height/s)+1;for(let e=0;e<c;e++)for(let n=0;n<l;n++){let c=e*l+n,u=3+o.fraction(`${a}-pad`,c)*3;t.fillStyle=r(`cy`),t.globalAlpha=.05+o.fraction(`${a}-blk`,c)*.06,t.fillRect(e*s+u,n*s+u,s-u*2,s-u*2),o.fraction(`${a}-win`,c)<.35&&(t.fillStyle=r(o.fraction(`${a}-wk`,c)<.5?`yl`:`bc`),t.globalAlpha=.25+.2*Math.sin(i*2+e*n),t.fillRect(e*s+s/2,n*s+s/2,2,2))}for(let e=0;e<26;e++){let u=e%2==0,d=20+e*7%30,f=Math.floor(o.fraction(`${a}-lane`,e)*(u?l:c))*s,p=(i*d+e*80)%(u?n.width:n.height);t.fillStyle=r(e%3==0?`rd`:`wh`),t.globalAlpha=.6,u?t.fillRect(p,f-1,3,2):t.fillRect(f-1,p,2,3)}t.globalAlpha=1}},Xl=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}spots(e,t,n){let{centre:r,rx:i,ry:a}=this.#n(t);return this.#t.grid(e,{x:r.x-i*.82,y:r.y-a*.7,width:i*1.64,height:a*1.4},n)}backdrop(e){let{painter:t,size:n,palette:r,seconds:i,address:a}=e,o=this.#e,{centre:s,rx:c,ry:l}=this.#n(n);t.strokeStyle=r(`cy`),t.globalAlpha=.08,t.lineWidth=1;for(let e=0;e<n.height;e+=14){let r=Math.sin(i+e)*1.5;t.beginPath(),t.moveTo(0,e+r),t.lineTo(n.width,e+r),t.stroke()}let u=[0,1,2,3].map(e=>({phase:o.fraction(`${a}-cb`,e)*6,waves:1+Math.floor(o.fraction(`${a}-cw`,e)*5),depth:o.fraction(`${a}-cd`,e)*.12})),d=[];for(let e=0;e<=72;e++){let t=e/72*Math.PI*2,n=1;for(let e of u)n*=1+e.depth*Math.sin(t*e.waves+e.phase);d.push({x:s.x+Math.cos(t)*c*n,y:s.y+Math.sin(t)*l*n})}t.fillStyle=r(`panel2`),t.globalAlpha=1,o.line(t,d),t.closePath(),t.fill(),t.strokeStyle=r(`bc`),t.globalAlpha=.55,t.lineWidth=1.4,t.stroke(),t.save(),o.line(t,d),t.closePath(),t.clip(),t.strokeStyle=r(`bc`),t.globalAlpha=.14,t.lineWidth=1;for(let e=-n.height;e<n.width;e+=9)t.beginPath(),t.moveTo(e,s.y+l*.4),t.lineTo(e+n.height,s.y+l*.4+n.height),t.stroke();t.strokeStyle=r(`bl`),t.globalAlpha=.4;for(let e=0;e<3;e++){let n=t=>s.x+(o.fraction(`${a}-rv`,e*3+t)-.5)*c*2;o.line(t,o.curve({x:n(0),y:s.y-l*1.1},{x:n(1),y:s.y-l*.2},{x:n(1),y:s.y+l*.2},{x:n(2),y:s.y+l*1.1},24)),t.stroke()}t.restore(),t.globalAlpha=1}#n(e){return{centre:{x:e.width/2,y:e.height/2},rx:e.width*.42,ry:e.height*.4}}},Zl=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}spots(e,t){return this.#t.zigzag(e,{x:t.width*.12,y:t.height*.62},{x:t.width*.88,y:t.height*.38},Math.min(t.height*.17,52))}backdrop(e){let{painter:t,size:n,palette:r,seconds:i,spots:a}=e,o=Math.min(n.width,n.height),s=this.#e;s.stars(t,n,r,i,`f`,Math.round(n.width*n.height/3e3),.6);for(let e=0;e<6;e++){let a=e===0,c=(t,r)=>a?r:s.fraction(`f-s`,e*4+t)*n.height,l=s.curve({x:0,y:c(0,n.height*.72)},{x:n.width/3,y:c(1,n.height*.6)},{x:n.width*2/3,y:c(2,n.height*.4)},{x:n.width,y:c(3,n.height*.28)},40);t.strokeStyle=r(a?`bc`:`cy`),t.globalAlpha=a?.35:.12,t.lineWidth=a?2:1,s.line(t,l),t.stroke(),a&&l.forEach((e,n)=>{if(n%3!=0)return;let a=e=>(s.fraction(`f-j`,n*2+e)-.5)*o*.05;s.glow(t,{x:e.x+a(0),y:e.y+a(1)},o*(.012+s.fraction(`f-r`,n)*.018),r(s.fraction(`f-c`,n)<.3?`mg`:`bc`),.3+.15*Math.sin(i+n))})}let c=e=>n.height*.72-e/n.width*n.height*.44;t.strokeStyle=r(`cy`),t.globalAlpha=.35,t.lineWidth=1,t.setLineDash([2,3]),a.forEach(e=>{t.beginPath(),t.moveTo(e.x,c(e.x)),t.lineTo(e.x,e.y),t.stroke()}),t.setLineDash([]),t.globalAlpha=1}},Ql=class{#e;constructor(e){this.#e=e}paint(e,t,n){let{painter:r,palette:i}=e,a=this.#e,o=n.sealed?.4:1,s=n.lit?1.35:1,c=[`bl`,`gn`,`ab`,`mg`,`cy`],l=c[Math.floor(a.fraction(n.address,3)*c.length)]??`bl`;a.glow(r,t,11,i(l),.35*o*s),r.fillStyle=i(l),r.globalAlpha=.9*o,r.beginPath(),r.arc(t.x,t.y,5.5,0,Math.PI*2),r.fill(),r.strokeStyle=i(`text`),r.globalAlpha=.35*o,r.lineWidth=1,a.line(r,a.ellipse(t,9,3,-.4,24)),r.stroke(),r.globalAlpha=1}},$l=class{#e;constructor(e){this.#e=e}paint(e,t,n){let{painter:r,palette:i,seconds:a}=e,o=this.#e,s=n.sealed?.4:1,c=n.lit?1.35:1;r.fillStyle=i(`yl`),r.globalAlpha=.16*s*c,r.fillRect(t.x-17,t.y-5,34,10),r.strokeStyle=i(`yl`),r.globalAlpha=.7*s,r.lineWidth=2,r.beginPath(),r.moveTo(t.x-16,t.y),r.lineTo(t.x+16,t.y),r.stroke();let l=(a*.5+o.fraction(n.address,4))%1*32-16;r.fillStyle=i(`wh`),r.globalAlpha=.9*s,r.fillRect(t.x+l-1.5,t.y-1.5,3,3),r.globalAlpha=1}},eu=class{#e;constructor(e){this.#e=e}spots(e,t){let{centre:n,radius:r}=this.#t(t);if(e===1)return[n];let i=r*.6;return Array.from({length:e},(t,r)=>{let a=-Math.PI/2+r/e*Math.PI*2;return{x:n.x+Math.cos(a)*i,y:n.y+Math.sin(a)*i}})}backdrop(e){let{painter:t,size:n,palette:r,seconds:i}=e,a=this.#e;a.stars(t,n,r,i,`p`,Math.round(n.width*n.height/2400),.5);let{centre:o,radius:s}=this.#t(n);a.glow(t,o,s*1.3,r(`cy`),.16),t.fillStyle=r(`panel2`),t.globalAlpha=1,t.beginPath(),t.arc(o.x,o.y,s,0,Math.PI*2),t.fill(),t.save(),t.beginPath(),t.arc(o.x,o.y,s,0,Math.PI*2),t.clip(),t.fillStyle=r(`bc`),t.globalAlpha=.18,t.fillRect(o.x-s,o.y+s*.66,s*2,s),t.fillRect(o.x-s,o.y-s,s*2,s*.24);for(let e=0;e<7;e++){let n=a.fraction(`p-lon`,e)*Math.PI*2+i*.12,c=Math.cos(n);if(c<0)continue;let l=(a.fraction(`p-lat`,e)-.5)*2.2,u={x:o.x+Math.sin(n)*s*Math.cos(l*.7),y:o.y+Math.sin(l*.7)*s};t.fillStyle=r(`gn`),t.globalAlpha=.14*c+.05,a.line(t,a.ellipse(u,s*.22*c*(.5+a.fraction(`p-w`,e)),s*.12,0,24)),t.fill()}t.strokeStyle=r(`cy`),t.globalAlpha=.2,t.lineWidth=1;for(let e=0;e<12;e++){let n=e*Math.PI/6+i*.12;Math.cos(n)<0||(a.line(t,a.ellipse(o,Math.abs(Math.sin(n))*s,s,0,36)),t.stroke())}for(let e=-3;e<=3;e++){let n=o.y+Math.sin(e*.38)*s,r=Math.cos(e*.38)*s;a.line(t,a.ellipse({x:o.x,y:n},r,r*.12,0,36)),t.stroke()}t.restore(),t.strokeStyle=r(`bc`),t.globalAlpha=.5,t.lineWidth=1.5,t.beginPath(),t.arc(o.x,o.y,s,0,Math.PI*2),t.stroke(),t.globalAlpha=1}#t(e){return{centre:{x:e.width/2,y:e.height/2},radius:Math.min(e.width,e.height)*.45}}},tu=class{#e;constructor(e){this.#e=e}spots(e,t){return e===1?[{x:t.width*.5,y:t.height*.46}]:Array.from({length:e},(n,r)=>({x:t.width*(.3+.4*r/Math.max(1,e-1)),y:t.height*(r%2==0?.52:.38)}))}backdrop(e){let{painter:t,size:n,palette:r,seconds:i,signal:a}=e,o=Math.min(n.width,n.height),s=this.#e;s.stars(t,n,r,i,`n`,Math.round(n.width*n.height/9e3),.35);let c={x:n.width/2,y:n.height/2},l=Math.min(Math.max(a,0),100)/100;if(t.strokeStyle=r(l>0?`mg`:`dim`),t.lineWidth=1.2,l===0)t.globalAlpha=.5,t.setLineDash([4,6]),t.beginPath(),t.arc(c.x,c.y,o*.4,0,Math.PI*2),t.stroke(),t.setLineDash([]);else{for(let e=0;e<3;e++){let n=(i*(.3+l*.5)+e/3)%1;t.globalAlpha=(.2+.6*l)*(1-n),t.beginPath(),t.arc(c.x,c.y,o*(.12+.34*n),0,Math.PI*2),t.stroke()}s.glow(t,c,o*.08,r(`mg`),.25*l)}t.globalAlpha=1}},nu=class{#e;constructor(e){this.#e=e}paint(e,t,n){let{painter:r,palette:i}=e,a=this.#e,o=n.sealed?.4:1,s=n.lit?1.35:1,c=[];for(let e=0;e<9;e++){let r=e/9*Math.PI*2,i=8+a.fraction(n.address,10+e)*5;c.push({x:t.x+Math.cos(r)*i,y:t.y+Math.sin(r)*i*.8})}r.fillStyle=i(`bc`),r.globalAlpha=.22*o*s,a.line(r,c),r.closePath(),r.fill(),r.strokeStyle=i(`bc`),r.globalAlpha=.75*o,r.lineWidth=1.2,r.stroke(),r.globalAlpha=1}},ru=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}spots(e,t,n){let r=this.#e.fraction(n,0)*Math.PI*2;return this.#t.ring(e,{x:t.width/2,y:t.height/2},t.width*.36,t.height*.33,r)}backdrop(e){let{painter:t,size:n,palette:r,seconds:i}=e,a=Math.min(n.width,n.height),o={x:n.width/2,y:n.height/2},s=this.#e;s.glow(t,o,a*.16,r(`yl`),.35);let c=[r(`mg`),r(`bc`),r(`wh`)],l=Math.max(n.width,n.height)*.55;for(let e=0;e<900;e++){let n=e%3,u=s.fraction(`s-d`,e)**.7*l,d=n*2.094+u/a*5.2+i*.025+(s.fraction(`s-a`,e)-.5)*.5;t.globalAlpha=.15+s.fraction(`s-g`,e)*.55*(1-u/l)+.1;let f=s.fraction(`s-c`,e);t.fillStyle=c[f<.2?0:f<.5?1:2]??r(`wh`),t.fillRect(o.x+Math.cos(d)*u,o.y+Math.sin(d)*u*.62,1.3,1.3)}t.globalAlpha=1}},iu=class{#e;constructor(e){this.#e=e}paint(e,t,n){let{painter:r,palette:i,seconds:a}=e,o=this.#e,s=n.sealed?.4:1,c=n.lit?1.35:1;o.glow(r,t,13,i(o.fraction(n.address,1)<.4?`mg`:`bc`),.5*s*c),r.fillStyle=i(`wh`);for(let e=0;e<18;e++){let n=e%2,i=2+e/18*9,o=n*Math.PI+i*.45+a*.3;r.globalAlpha=.7*s*(1-e/24),r.fillRect(t.x+Math.cos(o)*i,t.y+Math.sin(o)*i*.6,1.3,1.3)}r.globalAlpha=1}},au=class{#e;constructor(e){this.#e=e}paint(e,t,n){let{painter:r,palette:i,seconds:a}=e,o=this.#e,s=n.sealed?.4:1,c=n.lit?1.35:1;o.glow(r,t,12,i(`yl`),.5*s*c),r.fillStyle=i(`wh`),r.globalAlpha=s,r.beginPath(),r.arc(t.x,t.y,2.8+.4*Math.sin(a*1.3+o.fraction(n.address,2)*6),0,Math.PI*2),r.fill(),r.globalAlpha=1}},ou=class{#e;constructor(e){this.#e=e}paint(e,t,n){let{painter:r,palette:i}=e,a=this.#e,o=n.sealed?.4:1,s=n.lit?1.35:1;a.glow(r,t,12,i(`bc`),.55*o*s),r.fillStyle=i(`wh`),r.globalAlpha=o,r.beginPath(),r.arc(t.x,t.y,2.6,0,Math.PI*2),r.fill(),r.globalAlpha=1}},su=.8,cu=[0,-1,1],lu=class{#e;constructor(e){this.#e=e}spots(e,t){let n=this.#t(t),r=Math.min(t.height*.3,80);return this.#n(e,t).map((e,t)=>({x:n.x+e,y:n.y+(cu[t%cu.length]??0)*r}))}backdrop(e){let{painter:t,size:n,palette:r,seconds:i,spots:a}=e,o=Math.min(n.width,n.height),s=this.#e;s.stars(t,n,r,i,`sy`,Math.round(n.width*n.height/2600),.6);let c=this.#t(n);t.strokeStyle=r(`cy`),t.lineWidth=1,a.forEach((e,n)=>{let r=e.x-c.x,i=(e.y-c.y)/su,a=Math.sqrt(r*r+i*i);t.globalAlpha=n%2==0?.3:.18,t.setLineDash(n%2==0?[]:[2,4]),s.line(t,s.ellipse(c,a,a*su,0,72)),t.stroke()}),t.setLineDash([]),s.glow(t,c,o*.22,r(`yl`),.45+.05*Math.sin(i)),t.fillStyle=r(`wh`),t.globalAlpha=.95,t.beginPath(),t.arc(c.x,c.y,o*.04,0,Math.PI*2),t.fill(),t.globalAlpha=1}#t(e){return{x:e.width*.06,y:e.height*.5}}#n(e,t){let n=Math.max(64,t.width*.86);return Array.from({length:e},(t,r)=>e===1?(64+n)/2:64+(n-64)*r/(e-1))}},uu=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}spots(e,t){return this.#t.ring(e,{x:t.width/2,y:t.height/2},t.width*.36,t.height*.34)}backdrop(e){let{painter:t,size:n,palette:r,seconds:i,spots:a}=e,o=Math.min(n.width,n.height),s=this.#e;for(let e=0;e<9;e++){let i={x:s.fraction(`u-gx`,e)*n.width,y:s.fraction(`u-gy`,e)*n.height};s.glow(t,i,o*(.05+s.fraction(`u-gr`,e)*.1),r(e%2?`mg`:`bl`),.22)}s.stars(t,n,r,i,`u`,Math.round(n.width*n.height/1500)),t.strokeStyle=r(`cy`),t.lineWidth=1;for(let e=0;e<12;e++){let r=t=>({x:s.fraction(`u-web-x`,e*4+t)*n.width,y:s.fraction(`u-web-y`,e*4+t)*n.height});t.globalAlpha=.07+s.fraction(`u-web-a`,e)*.07,s.line(t,s.curve(r(0),r(1),r(2),r(3))),t.stroke()}let c={x:n.width/2,y:n.height/2};a.forEach((e,n)=>{let i=(s.fraction(`u-bend`,n)-.5)*o*.3;t.strokeStyle=r(`bc`),t.globalAlpha=.4,t.lineWidth=1.5,s.line(t,s.curve(c,{x:c.x+i,y:(c.y+e.y)/2},{x:(c.x+e.x)/2,y:e.y-i},e)),t.stroke()}),s.glow(t,c,o*.12,r(`yl`),.35+.1*Math.sin(i*1.4)),t.globalAlpha=1}},du=class{paint(e,t,n){let{painter:r,palette:i,seconds:a}=e,o=n.sealed?.4:1;r.fillStyle=i(`ground`),r.globalAlpha=1,r.beginPath(),r.arc(t.x,t.y,9,0,Math.PI*2),r.fill(),r.strokeStyle=i(n.lit?`mg`:`dim`),r.globalAlpha=(.6+.2*Math.sin(a*.8))*o,r.lineWidth=1.4,r.stroke(),r.globalAlpha=1}},fu=class{trace(e,t){let n=t.width/3,r=n*.3;for(let i=0;i<3;i++){let a=t.x+n*(i+.5),o=t.y+t.height*.2+r,s=t.y+t.height*.85;e.moveTo(a-r,s),e.lineTo(a-r,o),e.arc(a,o,r,Math.PI,Math.PI*2),e.lineTo(a+r,s)}}},pu=class{#e;constructor(e){this.#e=e}paint(e,t,n,r){let{room:i}=n,a=Math.sin(r*7e-4)*.15;e.fillStyle=t(this.#e),e.globalAlpha=.08,e.beginPath(),e.moveTo(i.x+i.width*.06,i.y),e.lineTo(i.x+i.width*(.42+a),i.y+i.height),e.lineTo(i.x+i.width*(.72+a),i.y+i.height),e.closePath(),e.fill()}},mu=class{trace(e,t){let n=t.height/4,r=t.width/3;for(let i=0;i<4;i++){let a=t.y+i*n;i>0&&(e.moveTo(t.x,a),e.lineTo(t.x+t.width,a));for(let o=i%2==0?1:.5;o<3;o++)e.moveTo(t.x+o*r,a),e.lineTo(t.x+o*r,a+n)}}},hu=class{trace(e,t){for(let n of[-.5,0,.5])t.line(e,[0,n],[1,n+.5]),t.line(e,[0,n+.5],[1,n])}},gu=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.to,this.#n=e.lift}trace(e,t){let n=t.origin+t.span*this.#e,r=t.origin+t.span*this.#t,i=t.base-t.rise*this.#n;e.moveTo(n,t.base),e.lineTo(n,i),e.lineTo(r,i),e.lineTo(r,t.base)}},_u=class{#e;constructor(e){this.#e=e}draw(e,t,n,r){let{quad:i,fog:a,ink:o}=n;this.#e.at(e,i.middle(),i.width(),t(o),(.15+.08*Math.sin(r*1.5))*a)}},vu=class{trace(e,t){let n=t.y+t.height*.12;e.moveTo(t.x,n),e.lineTo(t.x+t.width,n);for(let r=1;r<=4;r++){let i=t.x+t.width*r/5;for(let r of[-3,0,3])e.moveTo(i+r,n),e.lineTo(i+r,t.y+t.height)}}},yu={cy:`rd`,bc:`ab`,frame:`rd`},bu=class{#e;constructor(e){this.#e=e}palette(){return e=>this.#e(yu[e]??e)}},xu=class e{#e;#t;#n;#r;constructor(e){this.#e={x:e.x,y:e.y,width:e.width,height:e.height},this.#t=e.axis,this.#n=e.from,this.#r=e.to}lay(e){e.placeAt(this.#e,this.#t)}along(e,t){let n=this.#t===`y`?(e.y-t.top)/Math.max(1,t.height):(e.x-t.left)/Math.max(1,t.width);return this.#n+(this.#r-this.#n)*Math.min(1,Math.max(0,n))}equals(t){return t instanceof e&&this.#e.x===t.#e.x&&this.#e.y===t.#e.y&&this.#e.width===t.#e.width&&this.#e.height===t.#e.height&&this.#t===t.#t&&this.#n===t.#n&&this.#r===t.#r}},Su=10,Cu=52,wu=34,Tu=76,Eu=9,Du=26,Ou=Eu/2,ku=class{#e;#t;constructor(e){this.#e=e.size,this.#t=e.hall}track(){let e=this.#n();return new xu({...e,axis:`x`,from:this.#o(e.x),to:this.#o(e.x+e.width)})}draw(e,t,n,r,i){let a=this.#t;if(!a.walks())return;let o=this.#n(),s=o.y+o.height/2;this.#c(e,o.x,o.y,o.width,o.height),e.globalAlpha=.88,e.fillStyle=t(`ground`),e.fill(),e.globalAlpha=1,e.strokeStyle=t(`rule-hi`),e.lineWidth=1,e.stroke();let c=this.#r();e.globalAlpha=.35,e.fillStyle=t(`cy`),e.fillRect(c,s-1,this.#i(),2);for(let[r,i]of n.entries())e.globalAlpha=i.visited?1:.8,e.fillStyle=t(i.visited?`yl`:i.ink),e.fillRect(this.#a(a.doorAt(r))-1,a.sideOf(r)<0?s-14:s+5,2,9);let l=a.view(),u=this.#a(l),d=Math.max(Du,this.#a(l+Math.min(Eu,a.length()-l))-u);this.#c(e,u,s-16,d,32),e.globalAlpha=.14,e.fillStyle=t(`cy`),e.fill(),e.globalAlpha=1,e.strokeStyle=t(`cy`),e.stroke(),r.at(e,{x:u,y:s},14,t(`yl`),.8),e.globalAlpha=1,e.fillStyle=t(`yl`),e.beginPath(),e.arc(u,s,6,0,Math.PI*2),e.fill(),this.#s(e,t,o.x+17,s),i.mark(e,t,{x:o.x+o.width-38,y:s})}#n(){return{x:Su,y:this.#e.height-Su-Cu,width:this.#e.width-20,height:Cu}}#r(){return this.#n().x+wu}#i(){return Math.max(1,this.#n().width-wu-Tu)}#a(e){return this.#r()+e/this.#t.length()*this.#i()}#o(e){return(e-this.#r())/this.#i()*this.#t.length()-Ou}#s(e,t,n,r){e.globalAlpha=.9,e.strokeStyle=t(`dim`),e.lineWidth=1.5,e.strokeRect(n-5,r-7,10,14),e.beginPath(),e.moveTo(n,r-7),e.lineTo(n,r+7),e.stroke()}#c(e,t,n,r,i){let a=Math.min(i/2,r/2);e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arc(t+r-a,n+a,a,-Math.PI/2,Math.PI/2),e.lineTo(t+a,n+i),e.arc(t+a,n+a,a,Math.PI/2,Math.PI*3/2),e.closePath()}},Au=class{#e;constructor(e){this.#e=e}trace(e){let[t,n,r,i]=this.#e;e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.lineTo(r.x,r.y),e.lineTo(i.x,i.y),e.closePath()}at(e,t){let[n,r,i,a]=this.#e,o={x:n.x+(r.x-n.x)*e,y:n.y+(r.y-n.y)*e},s={x:a.x+(i.x-a.x)*e,y:a.y+(i.y-a.y)*e};return{x:o.x+(s.x-o.x)*t,y:o.y+(s.y-o.y)*t}}line(e,t,n){let r=this.at(t[0],t[1]),i=this.at(n[0],n[1]);e.moveTo(r.x,r.y),e.lineTo(i.x,i.y)}left(){return Math.min(this.#e[0].x,this.#e[1].x)}right(){return Math.max(this.#e[0].x,this.#e[1].x)}top(){return Math.min(this.#e[2].y,this.#e[3].y)}bottom(){return Math.max(this.#e[0].y,this.#e[1].y)}width(){return this.right()-this.left()}height(){return this.bottom()-this.top()}middle(){return{x:(this.left()+this.right())/2,y:(this.top()+this.bottom())/2}}},ju=2.2,Mu=2.4,Nu=-.85,Pu=.95,Fu=.5,Iu=6.5,Lu=.32,Ru=16,zu=class{#e;#t;#n;#r;#i;constructor(e){if(!(e.doors>=0))throw RangeError(`a hall has no fewer than no doors: ${String(e.doors)}`);this.#e=e.size,this.#t=e.view,this.#n=e.doors,this.#r=e.shape,this.#i=Math.min(e.size.width*.36,e.size.height*.46)}project(e,t,n){let r=Math.max(n,Lu);return{x:this.#e.width/2+(e+this.#r.bend(r))/r*this.#i,y:this.#e.height*.42-t/r*this.#i}}fog(e){return Math.exp(-e/Iu)}focal(){return this.#i}near(){return Lu}far(){return this.#r.reach(this.endAhead(),Ru)}endAhead(){return this.length()-this.#t}endInSight(){return this.endAhead()<=Ru}endFace(){let e=this.endAhead();return new Au([this.project(-1,Nu,e),this.project(1,Nu,e),this.project(1,Pu,e),this.project(-1,Pu,e)])}floor(){return Nu}ceiling(){return Pu}doorTop(){return Fu}depths(){let e=this.far(),t=[];for(let n=Lu;n<e;n+=n<3?.25:.6)t.push(n);return t.push(e),t}view(){return this.#t}length(){return(Math.ceil(this.#n/2)+1)*ju}doorAt(e){return(Math.floor(e/2)+1)*ju}sideOf(e){return e%2==1?1:-1}stopOf(e){return Math.max(0,this.doorAt(e)-Mu)}lastStop(){return this.#n===0?0:this.stopOf(this.#n-1)}walks(){return this.#n>0}},Bu=11,Vu=6,Hu=7,Uu=3,Wu=.5,Gu=class{#e;#t;#n;#r;constructor(e){this.#e=e.child,this.#t=e.depth,this.#n=e.fog,this.#r=e.quad}child(){return this.#e}quad(){return this.#r}fog(){return this.#n}fartherFirst(e){return e.#t-this.#t}inReach(){return this.#t<Bu&&this.#r.width()>Vu}hit(){let e=this.#r;return{id:this.#e.id,x:e.left()-4,y:e.top()-18,width:e.width()+8,height:e.height()+22,anchor:e.middle()}}showsNumber(e){return this.#t<Hu||e}word(){return this.#e.door.words}showsWord(){return this.word()!==``&&this.#t<Uu}faint(){return this.#n<Wu}},Ku=class e{#e;#t;#n;#r;#i;#a;#o;#s;#c;#l;#u;#d;#f;constructor(e){if(!(e.min<=e.max))throw RangeError(`a camera's range runs up: ${String(e.min)} to ${String(e.max)}`);this.#e=e.rest,this.#t=e.min,this.#n=e.max,this.#r=e.drag,this.#i=e.axis,this.#a=e.coast,this.#o=e.snap,this.#s=e.settle,this.#c=e.pace,this.#l=e.zoom,this.#u=[...e.stops].sort((e,t)=>e.at-t.at||e.id.localeCompare(t.id)),this.#d=this.#u.filter((e,t)=>this.#u[t-1]?.at!==e.at),this.#f=e.track}rest(){return this.#e}clamp(e){return Math.min(this.#n,Math.max(this.#t,e))}pace(e){return Math.min(this.#c.most,this.#c.base+this.#c.per*Math.sqrt(e))}settle(e){return this.#s.base+this.#s.per*Math.sqrt(e)}landing(e,t){let n=e+t*this.#a;return this.clamp(this.#o?Math.round(n):n)}drags(){return this.#r!==0}dragRate(){return this.#r}along(e){return this.#i===`y`?e.y:e.x}zooms(){return this.#l}stopOf(e){return this.#u.find(t=>t.id===e)?.at}stopCount(){return this.#d.length}nearest(e){let t;for(let[n,r]of this.#d.entries()){let i=Math.abs(r.at-e);(t===void 0||i<t.distance)&&(t={id:r.id,index:n,distance:i})}return t===void 0?void 0:{id:t.id,index:t.index}}stepFrom(e,t){let n=this.nearest(e);if(n!==void 0)return this.#d[Math.min(this.#d.length-1,Math.max(0,n.index+t))]}track(){return this.#f}equals(t){return t instanceof e&&this.#p()===t.#p()&&this.#f.equals(t.#f)}#p(){return JSON.stringify([this.#e,this.#t,this.#n,this.#r,this.#i,this.#a,this.#o,this.#s.base,this.#s.per,this.#c.base,this.#c.per,this.#c.most,this.#l,this.#u.map(e=>{let t={id:e.id,at:e.at};return[t.id,t.at]})])}},qu=-1/40,Ju=.3,Yu={base:560,per:0},Xu={base:260,per:220,most:1500},Zu=.45,Qu=class{#e;constructor(e){this.#e=e}camera(e,t){let n=this.#t(e,t,0);return n.walks()?new Ku({rest:0,min:0,max:n.lastStop(),drag:qu,axis:`y`,coast:Ju,snap:!1,settle:Yu,pace:Xu,zoom:!0,stops:e.children.map((e,t)=>({id:e.id,at:n.stopOf(t)})),track:new ku({size:t,hall:n}).track()}):new N}layout(e,t,n){return this.#n(e,t,n).filter(e=>e.inReach()).map(e=>e.hit()).reverse()}paint(e,t,n,r,i,a,o,s){r=t.abyssal?new bu(r).palette():r;let c=i/1e3;e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height);let l=this.#t(t,n,o);this.#r(e,r,l),this.#i(e,r,l),this.#a(e,r,l,c);let u=this.#e.halls[t.shape];l.endInSight()&&u.end(e,r,l.endFace(),l.fog(l.endAhead()),c),this.#e.glow.at(e,l.project(0,0,Math.min(l.far(),9)),l.focal()*.7,r(`ground`),.85);let d=t.children[0],f=d===void 0?s:s.or(new k(d.id));for(let i of this.#n(t,n,o))this.#s(e,r,n,i,c,a,f);new ku({size:n,hall:l}).draw(e,r,t.children.map(e=>({ink:this.#c(e),visited:e.visited})),this.#e.glow,u),e.globalAlpha=1}#t(e,t,n){return new zu({size:t,view:n,doors:e.children.length,shape:this.#e.halls[e.shape]})}#n(e,t,n){let r=this.#t(e,t,n),i=[];for(let[t,a]of e.children.entries()){let e=r.doorAt(t)-n+Zu,o=e-2*Zu;if(e<r.near()+.1||o>r.far())continue;let s=Math.max(o,r.near()+.05),c=r.sideOf(t);i.push(new Gu({child:a,depth:s,fog:r.fog(s),quad:new Au([r.project(c,r.floor(),s),r.project(c,r.floor(),e),r.project(c,r.doorTop(),e),r.project(c,r.doorTop(),s)])}))}return i.sort((e,t)=>e.fartherFirst(t))}#r(e,t,n){let r=n.depths();e.beginPath();for(let[t,i]of r.entries()){let r=n.project(-1,n.floor(),i);t===0?e.moveTo(r.x,r.y):e.lineTo(r.x,r.y)}for(let t of[...r].reverse()){let r=n.project(1,n.floor(),t);e.lineTo(r.x,r.y)}e.closePath(),e.globalAlpha=.7,e.fillStyle=t(`panel`),e.fill()}#i(e,t,n){let r=n.depths();e.strokeStyle=t(`cy`),e.lineWidth=1;for(let[t,i]of[[-1,n.floor()],[1,n.floor()],[-1,n.ceiling()],[1,n.ceiling()]])for(let a=1;a<r.length;a++){let o=n.project(t,i,r[a-1]??0),s=n.project(t,i,r[a]??0);e.globalAlpha=.45*n.fog(r[a]??0),e.beginPath(),e.moveTo(o.x,o.y),e.lineTo(s.x,s.y),e.stroke()}for(let t of this.#o(n)){let r=n.project(-1,n.floor(),t),i=n.project(1,n.floor(),t);e.globalAlpha=.13*n.fog(t),e.beginPath(),e.moveTo(r.x,r.y),e.lineTo(i.x,i.y),e.stroke()}}#a(e,t,n,r){for(let i of this.#o(n)){let a=Math.round(i+n.view());if(a%2!=0||.5+.5*Math.sin(r*7+a*3)<=.1)continue;let o=n.project(-.14,n.ceiling(),i),s=n.project(.14,n.ceiling(),i),c=n.fog(i),l=s.x-o.x;this.#e.glow.at(e,{x:(o.x+s.x)/2,y:o.y+4},l*1.4,t(`bc`),.22*c),e.globalAlpha=.7*c+.1,e.fillStyle=t(`bc`),e.fillRect(o.x,o.y,l,Math.max(1.5,3/i))}}#o(e){let t=[];for(let n=Math.ceil(e.view()+e.near());n<e.view()+e.far();n++)t.push(n-e.view());return t}#s(e,t,n,r,i,a,o){let s=r.child(),c=r.quad(),l=r.fog(),u=a.marks(s.id),d=o.marks(s.id),f=u||d,p=d?`yl`:`wh`,m=this.#l(s),h=this.#c(s);e.beginPath(),c.trace(e),e.globalAlpha=(u?.24:.1)*(.4+.6*l),e.fillStyle=t(h),e.fill(),e.globalAlpha=f?1:.25+.7*l,e.strokeStyle=t(f?p:h),e.lineWidth=f?2:1.2,e.stroke(),e.save(),e.clip(),e.beginPath(),this.#e.panels[m.family].trace(e,c),e.globalAlpha=.35*l,e.strokeStyle=t(h),e.lineWidth=1,e.stroke(),this.#e.marks[m.state].draw(e,t,{quad:c,ink:h,fog:l,key:s.address},i),e.restore();let g=c.middle();if(r.showsNumber(f)){let i=f?`${s.ordinal} · ${m.name}`:s.ordinal,a=f?p:r.faint()?`dim`:`text`;this.#u(e,t,n,i,{x:g.x,y:c.top()-11},a,f)}r.showsWord()&&this.#u(e,t,n,`‹${r.word()}›`,g,`dim`,!1),s.visited&&!d&&(e.globalAlpha=1,e.fillStyle=t(`yl`),e.beginPath(),e.arc(g.x,c.top()+8,2.5,0,Math.PI*2),e.fill())}#c(e){return e.sealed?`dim`:this.#e.inks.ink(this.#l(e).state)}#l(e){let t=e.door.look;return{family:t.family(),state:t.stateLook(),name:t.material()}}#u(e,t,n,r,i,a,o){e.font=this.#e.font.of(o?`bold`:`regular`),e.textAlign=`center`,e.textBaseline=`middle`;let s=e.measureText(r).width,c=Math.min(Math.max(i.x,6+s/2),Math.max(6+s/2,n.width-6-s/2)),l=Math.min(Math.max(i.y,12),Math.max(12,n.height-12));e.globalAlpha=.72,e.fillStyle=t(`ground`),e.fillRect(c-s/2-4,l-9,s+8,18),e.globalAlpha=1,e.fillStyle=t(a),e.fillText(r,c,l)}},$u=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}bend(e){return .03*e*e}reach(e,t){return this.#t.of(e,t)}end(e,t,n,r){this.#e.draw(e,t,n,r)}mark(e,t,n){e.globalAlpha=.9,e.strokeStyle=t(`cy`),e.lineWidth=2,e.beginPath(),e.arc(n.x-10,n.y+8,14,-Math.PI/2,0),e.stroke()}},ed=class{bow(e){return e*.16}reach(e,t){return t}wall(){}tail(){}},td=class{trace(e,t,n,r){e.beginPath(),e.moveTo(t,n-r),e.lineTo(t+r*.7,n),e.lineTo(t,n+r),e.lineTo(t-r*.7,n),e.closePath()}},nd={frost:`bl`,cold:`bl`,static:`mg`,plain:`cy`},rd=class{ink(e){return nd[e]}},id=class{of(e,t){return Math.min(e,t)}},ad=class{draw(e,t,n,r){e.beginPath(),n.trace(e),e.globalAlpha=1,e.fillStyle=t(`panel`),e.fill(),e.globalAlpha=.5*r+.1,e.strokeStyle=t(`cy`),e.lineWidth=1,e.stroke()}},od=40,sd=class{#e;constructor(e){this.#e=e}draw(e,t,n,r){let{quad:i,fog:a,key:o}=n;e.fillStyle=t(`wh`);for(let t=0;t<od;t++)e.globalAlpha=(.15+.35*this.#e.fraction(`frost/${o}`,t*3+2)*(.6+.4*Math.sin(r*2+t)))*a,e.fillRect(i.left()+this.#e.fraction(`frost/${o}`,t*3)*i.width(),i.top()+this.#e.fraction(`frost/${o}`,t*3+1)*i.height(),1.5,1.5)}},cd=class{trace(e,t){t.line(e,[.2,.3],[.55,.85]),t.line(e,[.4,.25],[.6,.55])}},ld=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}paint(e,t,n,r){let{room:i,back:a}=n,o=.1+.04*Math.sin(r*.001);this.#t.at(e,{x:i.x+i.width*.6,y:i.y},i.height*.5,t(this.#e),o),e.strokeStyle=t(this.#e),e.globalAlpha=.7,e.lineWidth=1,e.beginPath(),e.moveTo(i.x+i.width*.52,i.y),e.lineTo(i.x+i.width*.58,(i.y+a.y)/2),e.lineTo(i.x+i.width*.55,a.y),e.stroke()}},ud=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}paint(e,t,n,r){let{room:i,back:a}=n,o={x:i.x+i.width/2,y:i.y},s={x:o.x+Math.sin(r*8e-4)*6,y:a.y+a.height*.3};e.strokeStyle=t(`dim`),e.globalAlpha=.6,e.lineWidth=1,e.beginPath(),e.moveTo(o.x,o.y),e.lineTo(s.x,s.y-6),e.stroke(),this.#t.at(e,s,i.height*.35,t(this.#e),.18),e.fillStyle=t(this.#e),e.globalAlpha=.8,e.fillRect(s.x-4,s.y-6,8,10)}},dd=class{trace(e,t){for(let n=1;n<8;n++){let r=t.x+t.width*n/8;e.moveTo(r,t.y),e.lineTo(r,t.y+t.height)}for(let n=1;n<5;n++){let r=t.y+t.height*n/5;e.moveTo(t.x,r),e.lineTo(t.x+t.width,r)}}},fd=class{bend(){return 0}reach(e,t){return t}end(){}mark(e,t,n){e.fillStyle=t(`cy`);for(let t=0;t<3;t++)e.globalAlpha=.9-t*.3,e.fillRect(n.x-10+t*8,n.y-1.5,3,3)}},pd=class{bow(){return 0}reach(e,t){return t}wall(){}tail(){}},md=class{#e;#t;constructor(e){this.#e=e.at,this.#t=e.lift}trace(e,t){let n=t.origin+t.span*this.#e;e.moveTo(n,t.base),e.lineTo(n,t.base-t.rise*this.#t)}},hd=class{trace(e,t){for(let n of[.33,.66]){t.line(e,[0,n],[1,n]);for(let r of[.2,.5,.8])t.line(e,[r,n+.05],[r,n+.08])}}},gd=class{paint(){}},_d=class{trace(){}},vd=class{trace(e,t){e.moveTo(t.left,t.base-3),e.lineTo(t.right,t.base-3)}},yd=class{#e;#t;#n;#r;constructor(e){this.#e=e.from,this.#t=e.to,this.#n=e.lift,this.#r=e.ceiling}trace(e,t){e.moveTo(t.origin+t.span*this.#e,t.base),e.lineTo(t.middle,Math.max(this.#r,t.base-t.rise*this.#n)),e.lineTo(t.origin+t.span*this.#t,t.base)}},bd=class{draw(){}},xd=class{trace(){}},Sd=class{trace(){}},Cd=class{#e;#t;#n;#r;#i;constructor(e){if(e.doors.length!==e.rooms.length-1)throw RangeError(`a door between each room and the next`);this.#e=e.width,this.#t=e.height,this.#n=Object.freeze([...e.rooms]),this.#r=Object.freeze([...e.doors]),this.#i=e.entry}width(){return this.#e}height(){return this.#t}rooms(){return this.#n}doors(){return this.#r}doorBetween(e,t){return Math.abs(e-t)===1?this.#r[Math.min(e,t)]:void 0}entry(){return this.#i}},P=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}x(){return this.#e}y(){return this.#t}equals(e){return this.#e===e.#e&&this.#t===e.#t}},wd=class{#e;#t;#n;constructor(e,t,n){if(!(n>t))throw RangeError(`a doorway needs wall to stand in, got ${String(t)} to ${String(n)}`);this.#e=e,this.#t=t,this.#n=n}middle(){return new P(this.#r(),this.#e)}span(){return this.#n-this.#t}gap(e){let t=Math.min(e,this.span())/2;return[new P(this.#r()-t,this.#e),new P(this.#r()+t,this.#e)]}on(e){return e.levelAt(this.#e)&&this.#r()>e.left()&&this.#r()<e.right()}#r(){return(this.#t+this.#n)/2}},Td=class{#e;#t;#n;constructor(e,t,n){if(!(n>t))throw RangeError(`a doorway needs wall to stand in, got ${String(t)} to ${String(n)}`);this.#e=e,this.#t=t,this.#n=n}middle(){return new P(this.#e,this.#r())}span(){return this.#n-this.#t}gap(e){let t=Math.min(e,this.span())/2;return[new P(this.#e,this.#r()-t),new P(this.#e,this.#r()+t)]}on(e){return e.sideAt(this.#e)&&this.#r()>e.top()&&this.#r()<e.bottom()}#r(){return(this.#t+this.#n)/2}},Ed=1e-9,Dd=class{#e;#t;#n;#r;constructor(e,t,n,r){if(!(n>0&&r>0))throw RangeError(`a box has a size, got ${String(n)} × ${String(r)}`);this.#e=e,this.#t=t,this.#n=n,this.#r=r}left(){return this.#e}top(){return this.#t}right(){return this.#e+this.#n}bottom(){return this.#t+this.#r}width(){return this.#n}height(){return this.#r}sideAt(e){return this.#i(this.left(),e)||this.#i(this.right(),e)}levelAt(e){return this.#i(this.top(),e)||this.#i(this.bottom(),e)}doorTo(e){let t=Math.max(this.top(),e.top()),n=Math.min(this.bottom(),e.bottom()),r=Math.max(this.left(),e.left()),i=Math.min(this.right(),e.right());if(this.#i(this.right(),e.left()))return new Td(this.right(),t,n);if(this.#i(this.left(),e.right()))return new Td(this.left(),t,n);if(this.#i(this.bottom(),e.top()))return new wd(this.bottom(),r,i);if(this.#i(this.top(),e.bottom()))return new wd(this.top(),r,i);throw RangeError(`two boxes that share no wall have no doorway between them`)}area(){return this.#n*this.#r}squareness(){return Math.min(this.#n,this.#r)/Math.max(this.#n,this.#r)}centre(){return new P(this.#e+this.#n/2,this.#t+this.#r/2)}topLeft(){return new P(this.#e,this.#t)}bottomRight(){return new P(this.#e+this.#n,this.#t+this.#r)}equals(e){return this.#e===e.#e&&this.#t===e.#t&&this.#n===e.#n&&this.#r===e.#r}#i(e,t){return Math.abs(e-t)<Ed}},Od=1.7,kd=1.35,Ad=.8,jd=.4,Md=200,Nd=300,Pd=50,Fd=class{#e;constructor(e){this.#e=e}of(e,t){let n=Math.max(1,e),r=n*Od,i=Math.sqrt(r*kd),a=r/i,o=[],s=a;this.#t(n,a,t).forEach((e,r)=>{let c=a*e/n;s-=c;let l=Array.from({length:e},(e,n)=>Ad+jd*this.#e.fraction(t,Nd+r*Pd+n)),u=l.reduce((e,t)=>e+t,0),d=0,f=l.map(e=>{let t=new Dd(d,s,i*e/u,c);return d+=t.width(),t});o.push(...r%2==0?f:f.reverse())});let c=o[0]??new Dd(0,0,i,a);return new Cd({width:i,height:a,rooms:o,doors:o.slice(1).map((e,t)=>(o[t]??e).doorTo(e)),entry:new wd(a,c.left(),c.right())})}#t(e,t,n){let r=Math.max(1,Math.min(e,Math.round(t/Math.sqrt(Od)))),i=Math.floor(e/r),a=e-i*r,o=new Set(Array.from({length:r},(e,t)=>t).sort((e,t)=>this.#e.fraction(n,Md+e)-this.#e.fraction(n,Md+t)).slice(0,a));return Array.from({length:r},(e,t)=>o.has(t)?i+1:i)}},Id={width:90,height:44},Ld={width:22,height:18},Rd={most:5,room:30},zd=15,Bd=class{#e;#t;#n;#r;#i;#a;constructor(e){this.#e=e.room,this.#t=e.box,this.#n=e.look,this.#r=e.inside,this.#i=e.number,this.#a=e.here}you(){if(!this.#a)return;let e=this.#t;return{x:e.x+e.width/2,y:e.y+e.height-Math.min(18,e.height/4)}}paintFloor(e,t,n){let r=this.#t;e.fillStyle=t(`ground`),e.globalAlpha=1,e.fillRect(r.x,r.y,r.width,r.height),this.#n.paintFloor(e,t,r),this.#r.paint(e,t,n),this.#a&&(e.strokeStyle=t(`yl`),e.globalAlpha=1,e.lineWidth=1.6,e.strokeRect(r.x+1,r.y+1,r.width-2,r.height-2))}paintMarks(e,t,n){this.#n.label(r=>{this.#o(e,t,n,this.#a?`yl`:r)}),this.#a||this.#n.paintDot(e,t,this.#t)}#o(e,t,n,r){let i=this.#t,a={x:i.x+i.width/2,y:i.y+i.height/2},o=this.#r.nameLine();e.globalAlpha=1,e.textBaseline=`middle`,e.font=n.font.of(this.#a?`bold`:`regular`);let s=i.width>=Id.width&&i.height>=Id.height?this.#s(e,i.width-12,o.lines):[];if(s.length>0?(e.textAlign=`center`,e.fillStyle=t(r),s.forEach((t,n)=>{e.fillText(t,a.x,o.y+(n-(s.length-1)/2)*zd)}),e.textAlign=`left`,e.fillStyle=t(`dim`),e.font=n.font.of(`regular`),e.fillText(this.#i,i.x+6,i.y+12)):i.width>=Ld.width&&i.height>=Ld.height&&(e.textAlign=`center`,e.fillStyle=t(r),e.fillText(this.#i,a.x,a.y)),!(this.#a||this.#e.relics===0||i.width<=Rd.room)){e.fillStyle=t(`yl`);for(let t=0;t<Math.min(this.#e.relics,Rd.most);t++)n.diamond.trace(e,i.x+i.width-9-t*9,i.y+9,4),e.fill()}}#s(e,t,n){let r=this.#e.name;if(e.measureText(r).width<=t)return[r];if(n<2)return[];let i=r.split(` `);for(let n=Math.ceil(i.length/2);n>0&&n<i.length;n++){let r=[i.slice(0,n).join(` `),i.slice(n).join(` `)];if(r.every(n=>e.measureText(n).width<=t))return r}return[]}},Vd=class e{#e;#t;#n;#r;constructor(e,t,n,r=1){if(!(n>0))throw RangeError(`a framing draws a unit at some size, got ${String(n)}`);if(!(r>0))throw RangeError(`a framing stretches by some factor, got ${String(r)}`);this.#e=e,this.#t=t,this.#n=n,this.#r=r}x(){return this.#e}y(){return this.#t}scale(){return this.#n}stretch(){return this.#r}#i(){return this.#n*this.#r}toPicture(e,t){return{x:t.width/2+(e.x()-this.#e)*this.#n,y:t.height/2+(e.y()-this.#t)*this.#i()}}toPlan(e,t){return new P(this.#e+(e.x-t.width/2)/this.#n,this.#t+(e.y-t.height/2)/this.#i())}panned(t,n){return new e(this.#e-t/this.#n,this.#t-n/this.#i(),this.#n,this.#r)}zoomedAbout(e,t,n){return this.placing(this.toPlan(e,n),e,t,n)}placing(t,n,r,i){return new e(t.x()-(n.x-i.width/2)/r,t.y()-(n.y-i.height/2)/(r*this.#r),r,this.#r)}between(t,n){return new e(this.#e+(t.#e-this.#e)*n,this.#t+(t.#t-this.#t)*n,this.#n*(t.#n/this.#n)**n,this.#r*(t.#r/this.#r)**n)}equals(e){return this.#e===e.#e&&this.#t===e.#t&&this.#n===e.#n&&this.#r===e.#r}},F=class{#e;#t;constructor(e,t){if(!(t>=0&&t<=1))throw RangeError(`a strength runs from 0 to 1, got ${String(t)}`);this.#e=e,this.#t=t}paint(e,t,n){e.fillStyle=t(this.#e),e.globalAlpha=this.#t,e.fillRect(n.x,n.y,n.width,n.height)}},Hd={gap:9,alpha:.15},Ud=new F(`cy`,.08),Wd=class{paintFloor(e,t,n){e.save(),e.beginPath(),e.rect(n.x,n.y,n.width,n.height),e.clip(),e.strokeStyle=t(`cy`),e.globalAlpha=Hd.alpha,e.lineWidth=1,e.beginPath();for(let t=-n.height;t<n.width;t+=Hd.gap)e.moveTo(n.x+t,n.y+n.height),e.lineTo(n.x+t+n.height,n.y);e.stroke(),e.restore()}label(){}paintDot(){}paintSmall(e,t,n){Ud.paint(e,t,n)}},Gd=class{#e;#t;#n;#r;constructor(e){this.#e=e.floor,this.#t=e.ink,this.#n=e.dot,this.#r=e.small}paintFloor(e,t,n){this.#e.paint(e,t,n)}label(e){e(this.#t)}paintDot(e,t,n){!this.#n||n.width<=14||(e.fillStyle=t(`yl`),e.globalAlpha=1,e.beginPath(),e.arc(n.x+n.width-7,n.y+n.height-7,2.3,0,Math.PI*2),e.fill())}paintSmall(e,t,n){this.#r.paint(e,t,n)}},Kd={visited:new Gd({floor:new F(`panel`,1),ink:`text`,dot:!0,small:new F(`yl`,.55)}),known:new Gd({floor:new F(`panel`,.55),ink:`dim`,dot:!1,small:new F(`cy`,.3)}),fog:new Wd},qd={share:.3,pixels:118},Jd=84,Yd=10,Xd=5,Zd=6,Qd=class{#e;#t;#n;#r;#i;constructor(e,t){this.#e=e,this.#t=t,this.#n=Math.min(Math.min(qd.pixels,t.width*qd.share)/e.width(),Jd/e.height()),this.#r=t.width-e.width()*this.#n-Yd,this.#i=Yd}holds(e){return e.x>=this.#r-Zd&&e.x<=this.#r+this.#e.width()*this.#n+Zd&&e.y>=this.#i-Zd&&e.y<=this.#i+this.#e.height()*this.#n+Zd}paint(e,t,n,r){let i=this.#e.width()*this.#n,a=this.#e.height()*this.#n;e.globalAlpha=.9,e.fillStyle=t(`ground`),e.fillRect(this.#r-Xd,this.#i-Xd,i+10,a+10),e.globalAlpha=.6,e.strokeStyle=t(`cy`),e.lineWidth=1,e.strokeRect(this.#r-Xd,this.#i-Xd,i+10,a+10),this.#e.rooms().forEach((r,i)=>{Kd[n[i]?.sight??`fog`].paintSmall(e,t,{x:this.#r+r.left()*this.#n+.5,y:this.#i+r.top()*this.#n+.5,width:r.width()*this.#n-1,height:r.height()*this.#n-1})});let o=(e,t,n)=>[Math.min(Math.max(e-n,0),t),Math.min(Math.max(e+n,0),t)],[s,c]=o(r.x(),this.#e.width(),this.#t.width/2/r.scale()),[l,u]=o(r.y(),this.#e.height(),this.#t.height/2/r.scale());e.globalAlpha=1,e.strokeStyle=t(`yl`),e.lineWidth=1.2,e.strokeRect(this.#r+s*this.#n,this.#i+l*this.#n,(c-s)*this.#n,(u-l)*this.#n)}},$d={width:36,height:44},ef=.85,tf={share:1.2,pixels:280},nf=24,rf=.3,af={base:460,perZoom:280,most:900},of=12,sf=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}#n(){return Math.max(Number.MIN_VALUE,Math.min((this.#t.width-$d.width)/this.#e.width(),(this.#t.height-$d.height)/this.#e.height()))}clamp(e){let t=this.#n(),n=Math.min(Math.max(e.scale(),t*ef),this.#i(t)),r=this.#t.width/2/n,i=this.#t.height/2/(n*e.stretch()),a=nf/n,o=(e,t,n)=>t+2*a<=2*n?t/2:Math.min(Math.max(e,n-a),t-n+a);return new Vd(o(e.x(),this.#e.width(),r),o(e.y(),this.#e.height(),i),n,e.stretch())}whole(){return new Vd(this.#e.width()/2,this.#e.height()/2,this.#n())}room(e){let t=this.#e.rooms()[e];if(t===void 0)return this.whole();let n=t.centre();return this.clamp(new Vd(n.x(),n.y(),Math.max(this.#r(t),this.#n())))}inside(e){let t=this.#e.rooms()[e];if(t===void 0)return this.whole();let n=t.centre(),r=(this.#t.width-24)/t.width(),i=(this.#t.height-24)/t.height();return new Vd(n.x(),n.y(),Math.max(r,Number.MIN_VALUE),Math.max(i/r,Number.MIN_VALUE))}settle(e,t){let n=this.whole(),r=t=>Math.abs(Math.log(e.scale()/t.scale()));return r(t)<=r(n)?t:n}#r(e){return Math.min((this.#t.width-24)/e.width(),(this.#t.height-24)/e.height())}#i(e){return Math.max(e*tf.share,tf.pixels,...this.#e.rooms().map(e=>this.#r(e)))}landing(e,t){return this.clamp(new Vd(e.x()+t.x*rf,e.y()+t.y*rf,e.scale(),e.stretch()))}overflows(e){return this.#e.width()*e.scale()>this.#t.width-of||this.#e.height()*e.scale()>this.#t.height-of}minimap(e){return this.overflows(e)?new Qd(this.#e,this.#t):new Wc}pace(e,t){return Math.min(af.most,af.base+af.perZoom*Math.abs(Math.log(t.scale()/e.scale())))}},I=44,cf={words:2,above:20},lf=.55,uf={share:.07,least:2,most:8},df=60,ff=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.layout,this.#t=e.font,this.#n=e.diamond,this.#r=e.insides,this.#i=e.glow}camera(e,t){return new sf(this.#a(e),t)}rest(e,t,n){return n.room(t,this.#o(e,e.here))}stopOf(e,t,n,r){if(e.exits.some(e=>e.id===n))return t.whole();let i=e.doors.find(e=>e.id===n);return i===void 0?void 0:r.room(t,this.#o(e,i.address))}layout(e,t,n){let r=this.#a(e);return[...this.#v(e,r,t,n).map(({relic:e,spot:t})=>this.#d(e.id,t.at)),...e.doors.flatMap(i=>{let a=this.#s(e,r,i);return a===void 0?[]:[this.#d(i.id,n.toPicture(a.middle(),t))]}),...e.exits.map(e=>this.#d(e.id,n.toPicture(r.entry().middle(),t)))]}paint(e,t,n,r,i,a,o,s){let c=this.#a(t),l=o.scale(),u=this.#c(o),d=this.#f(t,c,n,o);e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height),this.#p(e,n,r,o);let f=o.toPicture(new P(0,0),n);e.fillStyle=r(`rule-hi`),e.fillRect(f.x-u/2,f.y-u/2,c.width()*l+u,c.height()*l+u);for(let t of d)t.paintFloor(e,r,i);this.#m(e,t,c,n,r,o,u,a);for(let t of d)t.paintMarks(e,r,{font:this.#t,diamond:this.#n});for(let t of d)this.#h(e,t.you(),r,i);this.#g(e,t,c,n,r,o,a,i),s.paint(e,r,t.rooms,o),e.globalAlpha=1}#a(e){return this.#e.of(e.rooms.length,e.rooms[0]?.address??e.address)}#o(e,t){return Math.max(0,e.rooms.findIndex(e=>e.address===t))}#s(e,t,n){return t.doorBetween(this.#o(e,e.here),this.#o(e,n.address))}#c(e){return Math.min(Math.max(e.scale()*uf.share,uf.least),uf.most)}#l(e,t,n){let r=this.#c(n),i=n.toPicture(e.topLeft(),t),a=n.toPicture(e.bottomRight(),t);return{x:i.x+r/2,y:i.y+r/2,width:a.x-i.x-r,height:a.y-i.y-r}}#u(e,t,n){return t.address===e.here?this.#r.here(n,e.look,e.here):this.#r.away(n)}#d(e,t){return{id:e,x:t.x-I/2,y:t.y-I/2,width:I,height:I,anchor:t}}#f(e,t,n,r){return t.rooms().flatMap((t,i)=>{let a=e.rooms[i];if(a===void 0)return[];let o=this.#l(t,n,r);return[new Bd({room:a,box:o,look:Kd[a.sight],inside:this.#u(e,a,o),number:String(i+1),here:a.address===e.here})]})}#p(e,t,n,r){let i=r.scale()>df?.5:1,a=r.toPlan({x:0,y:0},t),o=r.toPlan({x:t.width,y:t.height},t);e.strokeStyle=n(`rule`),e.globalAlpha=.5,e.lineWidth=1,e.beginPath();for(let n=Math.floor(a.x()/i)*i;n<=o.x();n+=i){let i=Math.round(r.toPicture(new P(n,0),t).x)+.5;e.moveTo(i,0),e.lineTo(i,t.height)}for(let n=Math.floor(a.y()/i)*i;n<=o.y();n+=i){let i=Math.round(r.toPicture(new P(0,n),t).y)+.5;e.moveTo(0,i),e.lineTo(t.width,i)}e.stroke()}#m(e,t,n,r,i,a,o,s){e.fillStyle=i(`panel`),e.globalAlpha=1;for(let t of[...n.doors(),n.entry()]){let[n,i]=t.gap(lf).map(e=>a.toPicture(e,r));if(n===void 0||i===void 0)continue;let s=Math.min(n.x,i.x)-o,c=Math.min(n.y,i.y)-o;e.fillRect(s,c,Math.abs(i.x-n.x)+o*2,Math.abs(i.y-n.y)+o*2)}let c=a.toPicture(n.entry().middle(),r);e.fillStyle=i(`cy`),e.beginPath(),e.moveTo(c.x,c.y+o+4),e.lineTo(c.x+6,c.y+o+12),e.lineTo(c.x-6,c.y+o+12),e.closePath(),e.fill();let l=[...t.doors.flatMap(e=>{let r=this.#s(t,n,e);return r===void 0||!s.marks(e.id)?[]:[r.middle()]}),...t.exits.filter(e=>s.marks(e.id)).map(()=>n.entry().middle())];e.strokeStyle=i(`cy`),e.lineWidth=2;for(let t of l){let n=a.toPicture(t,r);e.beginPath(),e.arc(n.x,n.y,I/2-4,0,Math.PI*2),e.stroke()}}#h(e,t,n,r){if(t===void 0)return;let i=.5+.5*Math.sin(r/400);e.fillStyle=n(`yl`),e.globalAlpha=.25+.2*i,e.beginPath(),e.arc(t.x,t.y,6+3*i,0,Math.PI*2),e.fill(),e.globalAlpha=1,e.beginPath(),e.arc(t.x,t.y,3.5,0,Math.PI*2),e.fill()}#g(e,t,n,r,i,a,o,s){let c=this.#v(t,n,r,a);for(let{relic:t,spot:n}of c){let r={x:n.at.x,y:n.at.y+Math.sin(s/600+Number(t.ordinal))*2},a=o.marks(t.id);t.sealed||this.#i.at(e,r,a?44:34,i(`yl`),a?.45:.3),a&&(e.strokeStyle=i(`yl`),e.globalAlpha=.6,e.lineWidth=1.5,e.beginPath(),e.arc(r.x,r.y,I/2-4,0,Math.PI*2),e.stroke()),e.strokeStyle=i(t.sealed?`dim`:`yl`),e.globalAlpha=1,e.lineWidth=1.6,this.#n.trace(e,r.x,r.y,10),e.stroke()}e.font=this.#t.of(`regular`),e.textAlign=`center`,e.textBaseline=`middle`,e.globalAlpha=1;let l=[...c.filter(({relic:e})=>!o.marks(e.id)),...c.filter(({relic:e})=>o.marks(e.id))];for(let{relic:t,spot:n}of l){let r=o.marks(t.id),a=this.#_(e,t.name,r?1/0:n.reach);a!==``&&(e.fillStyle=i(r?`wh`:t.sealed?`dim`:`yl`),e.fillText(a,n.at.x,n.at.y-cf.above))}}#_(e,t,n){let r=t.split(` `);for(let t=Math.min(cf.words,r.length);t>0;t--){let i=r.slice(0,t).join(` `);if(e.measureText(i).width<=n)return i}return``}#v(e,t,n,r){let i=t.rooms()[this.#o(e,e.here)],a=e.rooms.find(t=>t.address===e.here);return i===void 0||a===void 0?[]:this.#u(e,a,this.#l(i,n,r)).spots(e.relics.length).flatMap((t,n)=>{let r=e.relics[n];return r===void 0?[]:[{relic:r,spot:t}]})}},pf=class{trace(e,t){let n=t.width/4,r=t.height/3;for(let i=0;i<4;i++)for(let a=0;a<3;a++){let o=t.x+i*n,s=t.y+a*r;e.rect(o+3,s+3,n-6,r-6),e.rect(o+5,s+5,1,1)}}},mf=class{trace(e,t){for(let n=1;n<6;n++){let r=t.x+t.width*n/6;e.moveTo(r,t.y);for(let i=1;i<=12;i++){let a=i/12;e.lineTo(r+Math.sin(a*Math.PI*2+n)*4,t.y+a*t.height)}}}},hf=class{#e;constructor(e){this.#e=e}of(e,t){if(t)return`peak`;let n=this.#e.fraction(e,0);return n<.4?`mast`:n<.7?`box`:`flat`}},L={left:.24,right:.76,top:.14,bottom:.55},gf={down:.35,across:.7},_f=3,vf={flakes:30,fall:12},yf=class{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e){let t=e.box;this.#e={room:t,back:{x:t.x+t.width*L.left,y:t.y+t.height*L.top,width:t.width*(L.right-L.left),height:t.height*(L.bottom-L.top)}},this.#t=e.spot,this.#n=e.wall,this.#r=e.light,this.#i=e.furniture,this.#a=e.cold,this.#o=e.address,this.#s=e.noise}spots(e){let{room:t}=this.#e,n=t.width*gf.across,r=Math.min(e,Math.floor(n/this.#t)+1),i=this.#c()+(t.y+t.height-this.#c())*gf.down;if(r===1)return[{at:{x:t.x+t.width/2,y:i},reach:n}];let a=n/(r-1),o=t.x+(t.width-n)/2;return Array.from({length:r},(e,t)=>({at:{x:o+t*a,y:i},reach:a-6}))}nameLine(){return{y:this.#e.back.y+10,lines:1}}paint(e,t,n){let{room:r,back:i}=this.#e;e.save(),e.beginPath(),e.rect(r.x,r.y,r.width,r.height),e.clip(),this.#l(e,t),this.#n.paint(e,t,i),this.#u(e,t),this.#r.paint(e,t,this.#e,n),this.#d(e,t),this.#a&&this.#f(e,t,n),e.restore(),e.globalAlpha=1}#c(){return this.#e.back.y+this.#e.back.height}#l(e,t){let{room:n,back:r}=this.#e;e.fillStyle=t(`panel`),e.globalAlpha=.5,e.beginPath(),e.moveTo(n.x,n.y+n.height),e.lineTo(n.x+n.width,n.y+n.height),e.lineTo(r.x+r.width,r.y+r.height),e.lineTo(r.x,r.y+r.height),e.closePath(),e.fill()}#u(e,t){let{room:n,back:r}=this.#e;e.strokeStyle=t(`cy`),e.globalAlpha=.45,e.lineWidth=1,e.beginPath();for(let[t,i,a]of[[n.x,n.y,{x:r.x,y:r.y}],[n.x+n.width,n.y,{x:r.x+r.width,y:r.y}],[n.x,n.y+n.height,{x:r.x,y:r.y+r.height}],[n.x+n.width,n.y+n.height,{x:r.x+r.width,y:r.y+r.height}]])e.moveTo(t,i),e.lineTo(a.x,a.y);e.rect(r.x,r.y,r.width,r.height),e.stroke()}#d(e,t){let{room:n}=this.#e,r=n.y+n.height-this.#c();for(let i=0;i<Math.min(this.#i,_f);i++){let[a,o,s,c]=[0,1,2,3].map(e=>this.#s.fraction(`${this.#o}/furniture`,i*4+e)),l=n.width*(.1+s*.06),u=r*(.25+c*.2),d=n.x+n.width*(.2+i*.28+a*.06)-l/2,f=this.#c()+r*(.55+o*.3)-u;e.fillStyle=t(`panel`),e.globalAlpha=1,e.fillRect(d,f,l,u),e.strokeStyle=t(`dim`),e.globalAlpha=.7,e.strokeRect(d+.5,f+.5,l,u)}}#f(e,t,n){let{room:r}=this.#e;e.fillStyle=t(`wh`),e.globalAlpha=.35;for(let t=0;t<vf.flakes;t++){let[i,a,o]=[0,1,2].map(e=>this.#s.fraction(`${this.#o}/snow`,t*3+e)),s=Math.sin(n*.001+t)*6,c=r.x+this.#p(i*r.width+s,r.width),l=n/1e3*vf.fall*(1+o),u=r.y+this.#p(a*r.height+l,r.height);e.fillRect(c,u,1.5,1.5)}}#p(e,t){return(e%t+t)%t}},bf=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}spots(e){let t=this.#e,n=this.#t,r=Math.floor(t.width/n),i=Math.floor((t.height-n/2)/n);if(r<1||i<1)return[];let a=Math.min(e,r*i),o=Math.min(r,a),s=t.x+t.width/2-o*n/2+n/2,c=t.y+n/2+4;return Array.from({length:a},(e,t)=>({at:{x:s+t%r*n,y:c+Math.floor(t/r)*n},reach:n-4}))}nameLine(){return{y:this.#e.y+this.#e.height/2,lines:2}}paint(){}},xf={width:100,height:80},Sf=52,Cf=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.walls,this.#t=e.lights,this.#n=e.plainWall,this.#r=e.noLight,this.#i=e.noise}here(e,t,n){return e.width<xf.width||e.height<xf.height?new bf(e,Sf):new yf({box:e,spot:Sf,wall:this.#e[t.walls()]??this.#n,light:this.#t[t.light()]??this.#r,furniture:t.furniture(),cold:t.cold(),address:n,noise:this.#i})}away(e){return new bf(e,Sf)}},wf=.05,Tf=.35,R=class{#e;#t;#n;constructor(e,t){this.#e=e,this.#t=t,this.#n=new F(t,wf)}paint(e,t,n){this.#n.paint(e,t,n),e.strokeStyle=t(this.#t),e.globalAlpha=Tf,e.lineWidth=1,e.beginPath(),this.#e.trace(e,n),e.stroke()}},Ef=class{fraction(e,t){let n=2166136261,r=`${e}/${String(t)}`;for(let e=0;e<r.length;e++)n^=r.charCodeAt(e),n=Math.imul(n,16777619);return n^=n>>>15,n=Math.imul(n,739982445),n^=n>>>12,(n>>>0)/4294967296}},Df=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}bend(){return 0}reach(e,t){return this.#t.of(e,t)}end(e,t,n,r){this.#e.draw(e,t,n,r)}mark(e,t,n){e.globalAlpha=.9,e.fillStyle=t(`cy`),e.fillRect(n.x-1.5,n.y-9,3,18)}},Of=class{#e;constructor(e){this.#e=e}bow(){return 0}reach(e,t){return this.#e.of(e,t)}wall(e,t,n){e.moveTo(t,n-5),e.lineTo(t,n+5)}tail(){}},kf=1e4,Af=class{at(e,t,n,r,i){if(n<=0||i<=0)return;let a=e.getTransform().a;e.globalAlpha=Math.min(1,i),e.fillStyle=r,e.shadowColor=r,e.shadowBlur=n*.6*a,e.shadowOffsetX=kf*a,e.beginPath(),e.arc(t.x-kf,t.y,n*.6,0,Math.PI*2),e.fill(),e.shadowBlur=0,e.shadowOffsetX=0}},jf=.08,Mf=class{of(e,t){return t-(t-e)*jf}},Nf=90,Pf=12,Ff=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}bend(){return 0}reach(e,t){return this.#t.of(e,t)}end(e,t,n,r,i){let a=`static/${String(Math.floor(i*Pf))}`;e.fillStyle=t(`mg`);for(let t=0;t<Nf;t++)e.globalAlpha=(.25+.6*this.#e.fraction(a,t*3+2))*r,e.fillRect(n.left()+this.#e.fraction(a,t*3)*n.width(),n.top()+this.#e.fraction(a,t*3+1)*n.height(),2,2)}mark(e,t,n){e.fillStyle=t(`mg`),e.globalAlpha=.9;for(let t=0;t<7;t++)e.fillRect(n.x-10+this.#e.fraction(`static-mark`,t*2)*20,n.y-8+this.#e.fraction(`static-mark`,t*2+1)*16,2,2)}},If=14,Lf=class{draw(e,t,n,r){let{quad:i,fog:a,ink:o}=n;e.fillStyle=t(o),e.globalAlpha=.25*a;let s=Math.max(1,i.height());for(let t=0;t<If;t++)e.fillRect(i.left(),i.top()+(t*17+r*90)%s,i.width(),1)}},Rf=class{#e;constructor(e){this.#e=e}bow(){return 0}reach(e,t){return this.#e.of(e,t)}wall(){}tail(e,t,n,r){e.fillStyle=t(`mg`),e.globalAlpha=.6;for(let t=1;t<=3;t++)e.fillRect(n+t*3,r-.5,1.5,1.5)}},zf=class{trace(e,t){for(let n of[.25,.5,.75])t.line(e,[0,n],[1,n]);for(let[n,r]of[[0,[.5]],[1,[.25,.75]],[2,[.5]],[3,[.25,.75]]])for(let i of r)t.line(e,[i,n*.25],[i,(n+1)*.25])}},Bf=16,Vf=.8,Hf=.1,Uf=.95,Wf=.55,Gf=50,Kf=100,qf=.62,Jf=14,Yf=4,Xf=40,Zf=class{#e;constructor(e){this.#e=e}camera(){return new N}layout(e,t){return this.#t(e,t).map(e=>{let t=e.base-e.height,n=Math.max(0,t-e.roof-2);return{id:e.child.id,x:e.middle-e.slot/2+1,y:n,width:e.slot-2,height:e.base+Bf-n,anchor:{x:e.middle,y:t+e.height/2}}})}paint(e,t,n,r,i,a){let o=i/1e3,{width:s,height:c}=n;e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,s,c),this.#a(e,n,r,o),this.#o(e,n,r,o);for(let i of this.#t(t,n))this.#n(e,i,r,o,a);this.#i(e,n,r,o),e.globalAlpha=1}#t(e,t){let n=t.width/(e.children.length+.6),r=t.height*Vf,i=r-t.height*Hf;return e.children.map((e,t)=>{let a=n*qf,o=Math.min(a*.45,12),s=Math.min(Math.max(e.floors,0),Kf);return{child:e,slot:n,middle:n*(.8+t),base:r,width:a,height:(i-o)*(.3+.68*Math.sqrt(s/Kf)),roof:o}})}#n(e,t,n,r,i){let{child:a,middle:o,base:s,width:c,height:l,roof:u}=t,d=o-c/2,f=s-l,p=i.marks(a.id),m=a.sealed?.45:1;e.fillStyle=n(p?`rule-hi`:`rule`),e.globalAlpha=p?1:.85*m,e.fillRect(d,f,c,l),this.#r(e,t,n,r,m),e.strokeStyle=n(p?`yl`:a.sealed?`dim`:`frame`),e.globalAlpha=p?1:.6*m,e.lineWidth=p?1.8:1,e.beginPath(),e.moveTo(d,s),e.lineTo(d,f),e.lineTo(d+c,f),e.lineTo(d+c,s),this.#e.roofDrawers[this.#e.roofs.of(a.address,a.landmark)].trace(e,{base:f,rise:u,origin:d,span:c,middle:o,left:d,right:d+c}),e.stroke(),a.landmark&&(e.strokeStyle=n(`yl`),e.globalAlpha=.75*m,e.lineWidth=1,e.beginPath(),e.arc(o,f-u*.3,c*.62,0,Math.PI*2),e.stroke()),a.visited&&(e.fillStyle=n(`yl`),e.globalAlpha=1,e.beginPath(),e.arc(d+c-4,f+4,2.5,0,Math.PI*2),e.fill()),e.font=this.#e.font.of(p?`bold`:`regular`),e.textAlign=`center`,e.textBaseline=`top`,e.fillStyle=n(p?`yl`:a.sealed?`dim`:`text`),e.globalAlpha=1,e.fillText(a.ordinal,o,s+2)}#r(e,t,n,r,i){let{child:a,middle:o,base:s,width:c,height:l}=t,u=a.doors===0?3:Math.min(Math.max(a.doors,2),Yf),d=Math.min(Math.max(a.floors,3),Jf),f=c/(u*2+1),p=l/(d*2+1),m=o-c/2,h=s-l,g=n(`text`),_=n(`yl`);for(let t=0;t<d;t++)for(let n=0;n<u;n++){let o=t*u+n+1,s=this.#e.noise.fraction(a.address,o);if(s<.35)continue;let c=this.#e.noise.fraction(a.address,-o),l=.55+.45*Math.sin(r*c*3+c*20),d=s>.85;e.fillStyle=d?_:g,e.globalAlpha=(d?.6:.22)*l*i,e.fillRect(m+f*(1+n*2),h+p*(1+t*2),f,p)}}#i(e,t,n,r){let i=t.height*Vf;e.strokeStyle=n(`frame`),e.globalAlpha=.5,e.lineWidth=1,e.beginPath(),e.moveTo(0,i+.5),e.lineTo(t.width,i+.5),e.stroke();let a=t.height*Uf,o=r*20%26;e.strokeStyle=n(`yl`),e.globalAlpha=.35,e.beginPath();for(let n=o-26;n<t.width;n+=26)e.moveTo(n,a),e.lineTo(n+14,a);e.stroke()}#a(e,t,n,r){let i=n(`text`),a=n(`yl`);for(let n=0;n<Gf;n++){let o=this.#e.noise.fraction(`star-x`,n)*t.width,s=this.#e.noise.fraction(`star-y`,n)*t.height*Wf,c=this.#e.noise.fraction(`star-big`,n)<.07,l=.5+this.#e.noise.fraction(`star-pace`,n)*1.8,u=this.#e.noise.fraction(`star-phase`,n)*6,d=this.#e.noise.fraction(`star-glow`,n);e.fillStyle=this.#e.noise.fraction(`star-warm`,n)<.14?a:i,e.globalAlpha=.45*(.2+.7*d*(.55+.45*Math.sin(r*l+u))),e.fillRect(o,s,c?1.8:1,c?1.8:1)}}#o(e,t,n,r){e.strokeStyle=n(`dim`),e.globalAlpha=.3,e.lineWidth=1,e.beginPath();for(let n=0;n<Xf;n++){let i=(this.#e.noise.fraction(`rain`,n)*t.width+r*30*(1+n%3))%t.width,a=(n*53+r*260)%(t.height*1.1)-t.height*.1;e.moveTo(i,a),e.lineTo(i-2,a+9)}e.stroke()}},Qf=class{trace(e,t){for(let n of[.25,.5,.75])t.line(e,[n,0],[n,1])}},$f=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.even,this.#t=e.odd,this.#n=e.ground,this.#r=e.number,this.#i=e.tick}alpha(e){return e%2==0?this.#e:this.#t}ground(){return this.#n}number(){return this.#r}tick(){return this.#i}},ep=50,tp=4,np=11,rp=46,ip=58,ap=66,op=20,sp=58,cp=16,lp={base:320,per:230,most:2400},up={base:380,per:40},dp=.22,fp=class{#e;#t={floor:new $f({even:.5,odd:.35,ground:`rule`,number:`text`,tick:`dim`}),layer:new $f({even:.1,odd:.1,ground:`rd`,number:`rd`,tick:`rd`})};constructor(e){this.#e=e}camera(e,t){let n=this.#n(e,t,e.tower.car);if(n===void 0)return new N;let r=e.children.map(e=>({id:e.id,at:e.level.number()}));return new Ku({rest:n.tower.car,min:n.min,max:n.max,drag:r.length===0?0:1/n.row,axis:`y`,coast:dp,snap:!0,settle:up,pace:lp,zoom:!1,stops:r,track:n.gauge?new xu({x:t.width-sp-4,y:n.top,width:sp,height:n.bottom-n.top,axis:`y`,from:n.max,to:n.min}):new Vl})}layout(e,t,n){let r=this.#n(e,t,n);if(r===void 0)return[];let i=[];for(let t of this.#r(r)){let n=this.#a(e,t);if(n===void 0)continue;let a=this.#i(r,t),o=Math.max(r.top,a),s=Math.min(r.bottom,a+r.row)-o;s<=4||i.push({id:n.id,x:r.left-36,y:o,width:r.width+36,height:s,anchor:{x:r.middle,y:o+s/2}})}return i}paint(e,t,n,r,i,a,o){e.globalAlpha=1,e.shadowBlur=0,e.setLineDash([]),e.fillStyle=r(`ground`),e.fillRect(0,0,n.width,n.height);let s=this.#n(t,n,o);if(s===void 0)return;let c=i/1e3;this.#c(e,s,r),this.#l(e,s,n,r,t.tower.breached,c),e.save(),e.beginPath(),e.rect(0,s.top,n.width,s.bottom-s.top),e.clip();for(let n of this.#r(s))this.#d(e,t,s,n,r,c,a);t.tower.breached&&this.#m(e,s,r,c),this.#h(e,s,r,o),e.restore(),e.globalAlpha=.8,e.strokeStyle=r(`cy`),e.lineWidth=1.2,e.strokeRect(s.left+.5,s.top+.5,s.width,s.bottom-s.top),e.beginPath(),e.moveTo(s.inner+.5,s.top),e.lineTo(s.inner+.5,s.bottom),e.stroke(),s.gauge&&this.#g(e,t,s,n,r,o),e.globalAlpha=1}#n(e,t,n){let r=e.tower;if(r.rows.length===0)return;let i=new Map(r.rows.map(e=>[e.level.number(),e])),a=Math.min(...i.keys()),o=Math.max(...i.keys()),s=o-a+1,c=Math.max(t.height*.1,52),l=t.height-Math.max(t.height*.09,38),u=Math.min(s,Math.min(np,Math.max(tp,Math.floor((l-c)/ep)))),d=(l-c)/u,f=e.children.length>0,p=t.width-rp-(f?ap:op),m=Math.min(ip,p*.13),h=rp+m,g=Math.min(Math.max(Math.min(Math.max(n,a),o)-(u-1)/2,a),o-u+1);return{tower:r,rows:i,top:c,bottom:l,visible:u,row:d,left:rp,width:p,shaft:m,inner:h,middle:h+(p-m)/2,min:a,max:o,base:g,gauge:f}}#r(e){let t=Math.max(e.min,Math.floor(e.base)),n=Math.min(e.max,Math.ceil(e.base+e.visible-1));return Array.from({length:Math.max(0,n-t+1)},(e,n)=>t+n)}#i(e,t){return e.bottom-(t-e.base+1)*e.row}#a(e,t){return e.children.find(e=>e.level.number()===t)}#o(e,t){return this.#t[e.rows.get(t)?.level.kind()??`floor`]}#s(e,t){return e.rows.get(t)?.level.label()??``}#c(e,t,n){if(t.base<t.max-t.visible+1-.01){this.#u(e,`▲ ${String(Math.ceil(t.max-(t.base+t.visible-1)))}`,t.middle,t.top-16,n);return}let r=this.#i(t,t.max),i=Math.min(t.width*.2,(r-6)*.8);if(i<=4)return;let{middle:a,width:o}=t;e.globalAlpha=.6,e.strokeStyle=n(`cy`),e.lineWidth=1.2,e.beginPath(),this.#e.roofDrawers[this.#e.roofs.of(t.tower.address,t.tower.landmark)].trace(e,{base:r,rise:i,origin:a,span:o,middle:a,left:t.inner,right:t.left+o}),e.stroke(),e.globalAlpha=1}#l(e,t,n,r,i,a){if(t.base>t.min+.01){this.#u(e,`▼ ${String(Math.ceil(t.base-t.min))}`,t.middle,t.bottom+16,r,i?{ink:`rd`,alpha:.65+.35*Math.sin(a*3)}:{ink:`dim`,alpha:1});return}let{left:o,width:s,bottom:c}=t;e.globalAlpha=.06,e.fillStyle=r(`rd`),e.fillRect(o,c,s,n.height-c),e.globalAlpha=.3,e.strokeStyle=r(`rd`),e.lineWidth=1,e.beginPath();for(let t=o;t<o+s;t+=10)e.moveTo(t,c+2),e.lineTo(Math.min(t+8,o+s),n.height);e.stroke(),e.globalAlpha=1}#u(e,t,n,r,i,a={ink:`dim`,alpha:1}){e.globalAlpha=a.alpha,e.font=this.#e.font.of(`regular`),e.textAlign=`center`,e.textBaseline=`middle`,e.fillStyle=i(a.ink),e.fillText(t,n,r),e.globalAlpha=1}#d(e,t,n,r,i,a,o){let{left:s,width:c,inner:l,shaft:u,row:d}=n,f=this.#i(n,r),p=this.#a(t,r),m=p!==void 0&&o.marks(p.id),h=this.#o(n,r);e.globalAlpha=m?1:h.alpha(r),e.fillStyle=i(m?`rule-hi`:h.ground()),e.fillRect(l,f,c-u,d),e.globalAlpha=.35,e.strokeStyle=i(`cy`),e.lineWidth=1,e.beginPath(),e.moveTo(s,f+d+.5),e.lineTo(s+c,f+d+.5),e.stroke(),this.#f(e,n,r,f,i,a),this.#p(e,n,r,f,i),m&&(e.globalAlpha=1,e.strokeStyle=i(`yl`),e.lineWidth=1.5,e.strokeRect(l+.5,f+.5,c-u-1,d)),e.globalAlpha=1,e.font=this.#e.font.of(m?`bold`:`regular`),e.textAlign=`right`,e.textBaseline=`middle`,e.fillStyle=i(m||p?.visited===!0?`yl`:h.number()),e.fillText(this.#s(n,r),s-8,f+d/2)}#f(e,t,n,r,i,a){let o=t.width-t.shaft,s=Math.min(10,Math.max(4,Math.round(o/66))),c=o/s,l=r+t.row*.14,u=t.row*.4,d=`${t.tower.address}/${String(n)}`;for(let n=0;n<s;n++){let r=this.#e.noise.fraction(d,n),o=t.inner+c*n;if(e.globalAlpha=.13,e.strokeStyle=i(`cy`),e.strokeRect(o+4.5,l+.5,c-9,u),r<=.45)continue;let s=r>.9;e.globalAlpha=(.1+.08*Math.sin(a*1.3+r*40))*(s?2.6:1),e.fillStyle=i(s?`yl`:`cy`),e.fillRect(o+6,l+2,c-12,u-3)}}#p(e,t,n,r,i){let a=t.rows.get(n),o=this.#e.rows[a?.shape??`none`],s=a?.looks??[],c=r+t.row*.76,l=o.bow(t.row),u=t.inner+10,d=t.left+t.width-12,f=o.reach(u,d),p=e=>({x:u+(f-u)*e,y:c-l*4*e*(1-e)});e.globalAlpha=.45,e.strokeStyle=i(`cy`),e.lineWidth=1,e.beginPath();for(let t=0;t<=16;t++){let n=p(t/16);t===0?e.moveTo(n.x,n.y):e.lineTo(n.x,n.y)}o.wall(e,f,c),e.stroke(),o.tail(e,i,f,c);let m=Math.ceil(s.length/2);for(let[t,n]of s.entries()){let r=p((Math.floor(t/2)+.5)/m);e.globalAlpha=.8,e.fillStyle=i(this.#e.inks.ink(n.stateLook())),e.fillRect(r.x-1,t%2==1?r.y+1:r.y-5,2,4)}}#m(e,t,n,r){let i=[...t.rows.values()].filter(e=>!e.level.belowBedrock()),a=this.#i(t,Math.min(...i.map(e=>e.level.number())))+t.row;a<t.top||a>t.bottom||(e.globalAlpha=.25*(.6+.4*Math.sin(r*3)),e.fillStyle=n(`rd`),e.fillRect(t.left,a-4,t.width,8),e.globalAlpha=.7,e.strokeStyle=n(`rd`),e.lineWidth=1.5,e.setLineDash([6,5]),e.beginPath(),e.moveTo(t.left,a),e.lineTo(t.left+t.width,a),e.stroke(),e.setLineDash([]))}#h(e,t,n,r){let{left:i,shaft:a,top:o,bottom:s,row:c}=t;e.globalAlpha=1,e.fillStyle=n(`ground`),e.fillRect(i,o,a,s-o),e.globalAlpha=.18,e.strokeStyle=n(`cy`),e.beginPath();for(let n of this.#r(t)){let r=this.#i(t,n)+c+.5;e.moveTo(i,r),e.lineTo(i+a,r)}e.stroke();let l=this.#i(t,Math.min(Math.max(r,t.min),t.max));e.globalAlpha=.7,e.strokeStyle=n(`yl`),e.lineWidth=1.5,e.beginPath(),e.moveTo(i+a/2,o),e.lineTo(i+a/2,l+3),e.stroke(),e.globalAlpha=.88,e.fillStyle=n(`yl`),e.fillRect(i+4,l+3,a-8,c-6),e.globalAlpha=1,e.fillStyle=n(`ground`),e.fillRect(i+a/2-.75,l+6,1.5,c-12)}#g(e,t,n,r,i,a){let{top:o,bottom:s,min:c,max:l}=n,u=r.width-sp-4+sp-18,d=l-c,f=e=>d===0?o:o+(l-e)/d*(s-o);e.globalAlpha=.35,e.fillStyle=i(`cy`),e.fillRect(u,o,2,s-o);let p=d+1,m=p>40?10:p>14?5:2,h=d===0||(s-o)*m/d>=cp,g=new Set([l]);for(let e=c===0?0:Math.ceil(c/m)*m;e<=l;e+=m)g.add(e);e.font=this.#e.font.of(`regular`),e.textAlign=`right`,e.textBaseline=`middle`;for(let t of g)e.globalAlpha=1,e.fillStyle=i(`rule-hi`),e.fillRect(u-4,f(t),10,1),h&&(e.fillStyle=i(this.#o(n,t).tick()),e.fillText(this.#s(n,t),u-8,f(t)));e.fillStyle=i(`yl`),e.globalAlpha=.85;for(let n of t.children)n.visited&&e.fillRect(u-6,f(n.level.number())-1,14,2);let _=f(Math.min(l,n.base+n.visible-1)),ee=f(n.base);e.globalAlpha=.14,e.fillStyle=i(`cy`),e.fillRect(u-10,_,22,Math.max(22,ee-_)),e.globalAlpha=1,e.strokeStyle=i(`cy`),e.lineWidth=1,e.strokeRect(u-10,_,22,Math.max(22,ee-_));let te=f(Math.min(Math.max(a,c),l));e.fillStyle=i(`yl`),e.beginPath(),e.moveTo(u-20,te-5),e.lineTo(u-12,te),e.lineTo(u-20,te+5),e.closePath(),e.fill()}},pp=class{#e=new Ef;#t=new lc;#n=new hf(this.#e);#r=new rd;street(){return new Zf({font:this.#t,noise:this.#e,roofs:this.#n,roofDrawers:{peak:new yd({from:.2,to:.8,lift:1,ceiling:-1/0}),mast:new md({at:.7,lift:.7}),box:new gu({from:.25,to:.75,lift:.4}),flat:new _d}})}tower(){let e=new Mf;return new fp({font:this.#t,noise:this.#e,roofs:this.#n,inks:this.#r,rows:{long:new pd,service:new Of(e),curved:new ed,static:new Rf(e),none:new pd},roofDrawers:{peak:new yd({from:-.18,to:.18,lift:1.6,ceiling:4}),mast:new md({at:.2,lift:1}),box:new gu({from:-.15,to:.15,lift:.5}),flat:new vd}})}corridor(){let e=new Af,t=new ad,n=new id,r=new fd;return new Qu({font:this.#t,inks:this.#r,glow:e,halls:{long:r,service:new Df(t,n),curved:new $u(t,n),static:new Ff(this.#e,n),none:r},panels:{glass:new cd,metal:new hd,stone:new zf,timber:new Qf,bone:new hu,plain:new xd},marks:{frost:new sd(this.#e),cold:new _u(e),static:new Lf,plain:new bd}})}area(){let e=new Bl(this.#e),t=new ql(this.#e);return new Gl({font:this.#t,ink:e,scenes:{universe:new uu(e,t),filament:new Zl(e,t),sector:new ru(e,t),"null-reach":new tu(e),"solar-system":new lu(e),planet:new eu(e),country:new Xl(e,t),city:new Yl(e,t)},marks:{filament:new ou(e),sector:new iu(e),"null-reach":new du,"solar-system":new au(e),planet:new Ql(e),country:new nu(e),city:new Jl(e),street:new $l(e)}})}pole(){let e=new Bl(this.#e);return new jl({font:this.#t,ink:e,glyphs:{universe:new Rl(e),filament:new Sl(e),sector:new Fl(e),"null-reach":new Ml(e),system:new Ll(e),planet:new wl(e),country:new xl(e),city:new vl(e),street:new Il,building:new gl,floor:new Cl(e),corridor:new yl(e),apartment:new hl,room:new Pl}})}plan(){let e=new Af,t=new dd,n=new pf,r=new fu,i=new Sd;return new ff({layout:new Fd(this.#e),font:this.#t,diamond:new td,glow:e,insides:new Cf({walls:{shogun:new R(t,`ab`),neon:new R(t,`mg`),rust:new R(n,`ab`),abyssal:new R(n,`rd`),gilded:new R(r,`yl`),baroque:new R(r,`mg`),zenith:new R(new vu,`wh`),monolith:new R(new mu,`dim`),organic:new R(new mf,`cy`),void:new R(i,`wh`)},lights:{ancient:new ud(`yl`,e),analog:new ud(`ab`,e),industrial:new ud(`wh`,e),abyssal:new ud(`rd`,e),atomic:new ld(`cy`,e),digital:new ld(`bl`,e),future:new ld(`bc`,e),singularity:new pu(`wh`),entropic:new pu(`dim`)},plainWall:new R(i,`dim`),noLight:new gd,noise:this.#e})})}},mp=class{rest(e,t){return t.whole()}room(e,t){return e.room(t)}stop(e,t,n){return e.stopOf(t,n,this)}kept(e,t){return e.clamp(t)}refit(e,t,n){return n}corner(e,t){return e.minimap(t)}moves(){return!0}pressed(){return!0}flipped(){return new hp}},hp=class{room(e,t){return e.inside(t)}rest(e,t){return e.rest(t,this)}stop(e,t,n){return e.stopOf(t,n,this)}kept(e,t){return t}refit(e,t){return this.rest(e,t)}corner(){return new Wc}moves(){return!1}pressed(){return!1}flipped(){return new mp}},z=class{#e;#t;#n;#r;#i;constructor(e,t,n,r,i){this.#e=e,this.#t=t,this.#n=n,this.#r=r,this.#i=i}progress(e){return this.#r<=0?1:Math.min(1,Math.max(0,(e-this.#n)/this.#r))}at(e){let t=this.progress(e);return t>=1?this.#t:this.#e+(this.#t-this.#e)*this.#i.ease(t)}done(e){return this.progress(e)>=1}},gp=class{#e;#t;#n;constructor(e){this.#e=e.from,this.#t=e.to,this.#n=new z(0,1,e.start,e.duration,e.easing)}at(e){return this.#n.done(e)?this.#t:this.#e.between(this.#t,this.#n.at(e))}over(e){return this.#n.done(e)}finish(){}},_p=class{#e;#t;#n;#r;#i;constructor(e,[t,n],r){this.#e=e,this.#t=r,this.#n=e.toPlan(this.#a([t,n]),r),this.#r=this.#o([t,n]),this.#i=[t,n]}at([e,t]){let n=this.#e.scale()*this.#o([e,t])/this.#r;return this.#e.placing(this.#n,this.#a([e,t]),n,this.#t)}follow(e){let[t,n]=[...e.values()];t!==void 0&&n!==void 0&&(this.#i=[t,n])}framing(){return this.at(this.#i)}sample(){}endsWith(e,t){return t.size<2}moved(){return!0}release(e){let t=e.camera.settle(e.framing,e.rest);return new gp({from:e.framing,to:t,start:e.now,duration:e.camera.pace(e.framing,t),easing:e.ride})}#a([e,t]){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}#o([e,t]){return Math.max(1,Math.hypot(e.x-t.x,e.y-t.y))}},vp=110,yp=90,bp=class{#e=[];sample(e,t){for(this.#e.push({time:e,value:t});this.#e.length>2&&e-(this.#e[0]?.time??e)>vp;)this.#e.shift()}speed(e){let t=this.#e[0],n=this.#e.at(-1);if(t===void 0||n===void 0||t===n||e-n.time>yp)return 0;let r=(n.time-t.time)/1e3;return r>0?(n.value-t.value)/r:0}},xp=6,Sp=620,Cp=class{#e;#t;#n;#r;#i=new bp;#a=new bp;#o;#s=!1;constructor(e){this.#e=e.pointer,this.#t=e.hold,this.#n=e.point,this.#o=e.point,this.#r=e.framing}follow(e,t,n){n===this.#e&&(this.#o=t,!(this.#s||Math.hypot(t.x-this.#n.x,t.y-this.#n.y)<=xp)&&(this.#s=!0,this.#t.capture(this.#e)))}endsWith(e){return e===this.#e}moved(){return this.#s}framing(){return this.#s?this.#r.panned(this.#o.x-this.#n.x,this.#o.y-this.#n.y):void 0}sample(e,t){this.#i.sample(e,t.x()),this.#a.sample(e,t.y())}release(e){let t=e.still?{x:0,y:0}:{x:this.#i.speed(e.now),y:this.#a.speed(e.now)};return new gp({from:e.framing,to:e.camera.landing(e.framing,t),start:e.now,duration:Sp,easing:e.coast})}},wp=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}at(e){return this.#e.at(e)}over(e){return this.#e.over(e)}finish(e){e.pick(this.#t)}},Tp=class{#e;constructor(e){this.#e=[...e]}at(e){return this.#e.find(t=>e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height)}of(e){return this.#e.find(t=>t.id===e)}},Ep=class{#e;#t;#n;constructor(e){if(!(e.full>1))throw RangeError(`a zoom grows to more than 1, got ${String(e.full)}`);this.#e=e.scale,this.#t=e.anchor,this.#n=e.full}#r(){return(this.#e-1)/(this.#n-1)}anchorAt(e){let t=this.#r();return{x:this.#t.x+(e.width/2-this.#t.x)*t,y:this.#t.y+(e.height/2-this.#t.y)*t}}fade(e,t,n){let r=this.#r();r<=0||(e.globalAlpha=r,e.fillStyle=n,e.fillRect(0,0,t.width,t.height),e.globalAlpha=1)}apply(e,t){let{x:n,y:r}=this.anchorAt(t);e.transform(this.#e,0,0,this.#e,n-this.#t.x*this.#e,r-this.#t.y*this.#e)}},Dp=0,Op=new Ep({scale:1,anchor:{x:0,y:0},full:2}),kp=class{#e;#t;#n;#r=new hp;#i;#a;#o=new Tp([]);#s=new A;#c;#l;#u=new Map;#d;#f=!1;#p;constructor(e,t){this.#e=e,this.#t=t}mount(e){let t=this.#e.canvases.mount(e,{down:e=>{this.#A(e)},move:e=>{this.#j(e)},up:e=>{this.#M(e)},leave:()=>{this.#d===void 0&&this.#O(new A)},tap:e=>{this.#N(e)},resized:()=>{let e=this.#a;e!==void 0&&this.#h(e.sketch),this.#p===void 0&&this.#S(Dp)}});this.#n={host:e,canvas:t,mapKey:this.#m(e)}}#m(e){let t=e.ownerDocument.createElement(`button`);return t.type=`button`,t.className=`mapkey`,t.setAttribute(`aria-pressed`,String(this.#r.pressed())),t.addEventListener(`click`,()=>{this.#g()}),e.append(t),t}#h(e){let t=this.#a,n=this.#n?.canvas;if(t===void 0||n===void 0)return;let r=this.#l!==void 0||this.#c!==void 0;this.#x(e,r?t.framing:this.#r.refit(e,e.camera(n.hostSize()),t.framing))}#g(){let e=this.#a;if(this.#l!==void 0||e===void 0)return;this.#d=void 0,this.#u.clear(),this.#_(this.#r.flipped());let t=this.#r.rest(e.sketch,e.camera);this.#C(t,e.camera.pace(e.framing,t),this.#e.ride),this.#i=this.#c}#_(e){this.#r=e,this.#n?.mapKey.setAttribute(`aria-pressed`,String(e.pressed()))}render(e){let t=this.#a;this.#l=void 0,this.#c=void 0,this.#d=void 0,this.#u.clear(),this.#n?.canvas.frameChanged();let n=this.#n?.canvas.hostSize()??{width:0,height:0},r=t?.sketch.frame().address===e.frame().address;r||this.#_(new hp);let i=this.#r.rest(e,e.camera(n));if(t!==void 0&&r)this.#x(e,t.framing);else if(this.#e.motion.reduced())this.#x(e,i);else{let r=t===void 0?e.camera(n).whole():t.framing;this.#x(e,r),this.#C(i,e.camera(n).pace(r,i),this.#e.ride)}let a=this.#n?.canvas;a?.name(e.frame().label),this.#n?.mapKey.replaceChildren(e.mapKey().text),this.#n?.mapKey.setAttribute(`aria-label`,e.mapKey().label),a?.touch(!0),this.#v()}arrive(){}leads(e){let t=this.#a?.sketch.frame().children.find(t=>t.id===e);return t!==void 0&&!t.sealed}enter(e){this.#l===void 0&&this.leads(e)&&this.#T(e)}light(e){e.equals(this.#s)||(this.#s=e,this.#p===void 0&&this.#S(Dp))}dispose(){this.#l=void 0,this.#c=void 0,this.#d=void 0,this.#y(),this.#n?.canvas.remove(),this.#n?.mapKey.remove(),this.#n=void 0,this.#a=void 0}#v(){if(this.#e.motion.reduced()){this.#y(),this.#c=void 0,this.#S(Dp);return}this.#p??=this.#e.clock.subscribe(e=>{this.#b(e)})}#y(){this.#p?.(),this.#p=void 0}#b(e){let t=this.#l,n=t??this.#c,r=this.#a;n!==void 0&&r!==void 0&&this.#x(r.sketch,n.at(e)),this.#S(e),this.#c?.over(e)===!0&&(this.#c=void 0),t?.over(e)===!0&&(this.#l=void 0,t.finish({pick:e=>{this.#D(e)}}))}#x(e,t){let n=this.#n?.canvas;if(n===void 0)return;let r=n.hostSize();n.fit(r);let i=e.camera(r),a=this.#r.kept(i,t);this.#a={sketch:e,size:r,camera:i,framing:a},this.#o=new Tp(e.layout(r,a))}#S(e){let t=this.#n?.canvas,n=this.#a;if(t===void 0||n===void 0||n.size.width===0||n.size.height===0)return;let r=n.sketch.frame();t.paint({size:n.size,zoom:Op,noise:r.noise,decay:r.decay,time:e},(t,r)=>{n.sketch.paint(t,n.size,r,e,this.#s,n.framing,this.#r.corner(n.camera,n.framing))})}#C(e,t,n){let r=this.#a;r!==void 0&&this.#w(new gp({from:r.framing,to:e,start:this.#e.clock.now(),duration:t,easing:n}))}#w(e){let t=this.#a;if(t===void 0)return;let n=e.at(1/0);if(this.#e.motion.reduced()||t.framing.equals(n)){this.#c=void 0,this.#x(t.sketch,n),this.#p===void 0&&this.#S(Dp);return}this.#c=e,this.#v()}#T(e){let t=this.#a,n=t===void 0?void 0:this.#r.stop(t.sketch,t.camera,e);if(this.#e.motion.reduced()||t===void 0){this.#D(e);return}if(n===void 0){this.#E(e),this.#D(e);return}this.#c=void 0,this.#l=new wp(new gp({from:t.framing,to:n,start:this.#e.clock.now(),duration:t.camera.pace(t.framing,n),easing:this.#e.ride}),e),this.#v()}#E(e){let t=this.#n?.canvas,n=this.#o.of(e);t!==void 0&&n!==void 0&&this.#e.flight.fly(t.onPage(n.anchor))}#D(e){let t=this.#n?.host;t!==void 0&&this.#e.picks.pick(t,e)}#O(e){e.equals(this.#s)||(this.light(e),this.#t(e))}#k(e){let t=this.#o.at(e);return t===void 0?new A:new k(t.id)}#A(e){let t=this.#n?.canvas,n=this.#a,r=this.#c!==void 0&&this.#c===this.#i;if(this.#l!==void 0||r||t===void 0||n===void 0)return;let i=t.pointAt(e);if(this.#O(this.#k(i)),!this.#r.moves())return;this.#u.set(e.pointerId,i),this.#c=void 0;let[a,o]=[...this.#u.values()];if(a!==void 0&&o!==void 0){this.#d=new _p(n.framing,[a,o],n.size),t.capture(e.pointerId);return}this.#f=!1,this.#d=new Cp({pointer:e.pointerId,hold:t,point:{x:e.clientX,y:e.clientY},framing:n.framing})}#j(e){let t=this.#n?.canvas,n=this.#a;if(t===void 0||n===void 0)return;let r=t.pointAt(e);this.#u.has(e.pointerId)&&this.#u.set(e.pointerId,r);let i=this.#d;if(i===void 0){this.#l===void 0&&this.#O(this.#k(r));return}i.follow(this.#u,{x:e.clientX,y:e.clientY},e.pointerId);let a=i.framing();if(a===void 0)return;this.#x(n.sketch,a);let o=this.#a?.framing??a;i.sample(this.#e.clock.now(),o),this.#p===void 0&&this.#S(Dp)}#M(e){this.#u.delete(e.pointerId);let t=this.#d,n=this.#a;t?.endsWith(e.pointerId,this.#u)===!0&&n!==void 0&&(this.#d=void 0,t.moved()&&(this.#f=!0,this.#w(t.release({camera:n.camera,framing:n.framing,rest:n.sketch.rest(n.camera,this.#r),now:this.#e.clock.now(),still:this.#e.motion.reduced(),ride:this.#e.ride,coast:this.#e.coast}))))}#N(e){if(this.#f){this.#f=!1;return}let t=this.#n?.canvas,n=this.#a;if(this.#l!==void 0||t===void 0||n===void 0)return;let r=t.pointAt(e),i=this.#o.at(r);if(i!==void 0&&this.leads(i.id)){this.#T(i.id);return}if(this.#r.corner(n.camera,n.framing).holds(r)){let e=n.camera.whole();this.#C(e,n.camera.pace(n.framing,e),this.#e.ride)}}},Ap=6,jp=class{#e;#t;#n;#r;#i;#a=new bp;#o;#s=!1;constructor(e){this.#e=e.pointer,this.#t=e.camera,this.#n=e.hold,this.#r=e.camera.along(e.point),this.#o=this.#r,this.#i=e.view}is(e){return this.#e===e}move(e){this.#o=this.#t.along(e),!(this.#s||Math.abs(this.#o-this.#r)<=Ap)&&(this.#s=!0,this.#n.capture(this.#e))}moved(){return this.#s}view(){return this.#s?this.#i+(this.#o-this.#r)*this.#t.dragRate():void 0}hidesClick(){return!0}sample(e,t){this.#a.sample(e,t)}speed(e){return this.#a.speed(e)}},Mp=class{#e;#t;#n;#r=new bp;#i;constructor(e){this.#e=e.pointer,this.#t=e.slider,this.#n=e.camera,this.#i=e.slider.valueAt(e.point,e.camera)}is(e){return this.#e===e}move(e){this.#i=this.#t.valueAt(e,this.#n)}moved(){return!0}view(){return this.#i}hidesClick(){return!1}sample(e,t){this.#r.sample(e,t)}speed(e){return this.#r.speed(e)}},Np=class{#e;#t;#n;#r;constructor(e){this.#e=new z(e.from,e.to,e.start,e.ride,e.easing),this.#t=e.zoom===null?void 0:new z(1,e.zoom.scale,e.start+e.ride,e.zoom.time,e.easing),this.#n=e.pick,this.#r=e.anchor}view(e){return this.#e.at(e)}scale(e){return this.#t===void 0||!this.#e.done(e)?1:this.#t.at(e)}over(e){return this.#e.done(e)&&(this.#t?.done(e)??!0)}pick(){return this.#n}anchor(){return this.#r}},Pp=6,Fp=450,B=0,Ip=320,Lp=class{#e;#t;#n;#r;#i={width:0,height:0};#a=new Tp([]);#o=new A;#s=new A;#c=new N;#l=0;#u;#d;#f;#p;#m=!1;#h;constructor(e,t){this.#e=e,this.#t=t}mount(e){let t=this.#e.canvases.mount(e,{down:e=>{this.#O(e)},move:e=>{this.#A(e)},up:e=>{this.#M(e)},leave:()=>{this.#p===void 0&&this.#E(new A)},tap:e=>{this.#F(e)},resized:()=>{this.#y(),this.#h===void 0&&this.#C(B)}}),n=this.#e.sliders.mount(e),r=new AbortController,i=r.signal;n.listen(`pointerdown`,e=>{this.#k(e)},i),n.listen(`pointermove`,e=>{this.#A(e)},i),n.listen(`pointerup`,e=>{this.#M(e)},i),n.listen(`pointercancel`,e=>{this.#M(e)},i),n.listen(`keydown`,e=>{this.#N(e)},i),this.#n={host:e,canvas:t,slider:n,listeners:r}}render(e){let t=this.#r?.frame(),n=e.frame();this.#d=void 0,this.#f=void 0,this.#u=void 0,this.#p=void 0,this.#r=e,this.#n?.canvas.frameChanged(),this.#y();let r=this.#c;if(t?.address!==n.address&&(this.#s=new A),t?.address===n.address)this.#l=r.clamp(this.#l);else if(t!==void 0&&!this.#e.motion.reduced()){let e=Math.abs(r.rest()-this.#l);e>.01?this.#u=new z(this.#l,r.rest(),this.#e.clock.now(),r.pace(e),this.#e.ride):this.#l=r.rest()}else this.#l=r.rest();let i=this.#n?.canvas;i?.name(n.label),i?.touch(r.drags()),this.#b(),this.#g()}arrive(e){this.#s=new k(e);let t=this.#c.stopOf(e);t!==void 0&&(this.#u=void 0,this.#l=this.#c.clamp(t),this.#b());let n=this.#a.of(e);if(n===void 0||this.#e.motion.reduced()||!this.#c.zooms()){this.#h===void 0&&this.#C(B);return}this.#f={scale:new z(Pp,1,this.#e.clock.now(),Fp,this.#e.ride),anchor:n.anchor},this.#g()}leads(e){let t=this.#r?.frame().children.find(t=>t.id===e);return t!==void 0&&!t.sealed&&this.#c.stopOf(e)!==void 0}enter(e){this.#d===void 0&&this.leads(e)&&this.#I(e)}light(e){e.equals(this.#o)||(this.#o=e,this.#h===void 0&&this.#C(B))}dispose(){this.#d=void 0,this.#f=void 0,this.#u=void 0,this.#p=void 0,this.#_();let e=this.#n;e?.listeners.abort(),e?.canvas.remove(),e?.slider.remove(),this.#n=void 0,this.#r=void 0,this.#c=new N}#g(){if(this.#e.motion.reduced()){this.#_(),this.#u=void 0,this.#C(B);return}this.#h??=this.#e.clock.subscribe(e=>{this.#v(e)})}#_(){this.#h?.(),this.#h=void 0}#v(e){let t=this.#d,n=this.#l;t===void 0?this.#u!==void 0&&(this.#l=this.#u.at(e),this.#u.done(e)&&(this.#u=void 0)):this.#l=t.view(e),this.#l!==n&&this.#b(),this.#C(e),this.#f?.scale.done(e)===!0&&(this.#f=void 0),t?.over(e)&&(this.#d=void 0,this.#L(t.pick()))}#y(){let e=this.#n,t=this.#r;if(e===void 0||t===void 0)return;let n=e.canvas,r=n.hostSize();n.fit(r),this.#i=r,this.#c=t.camera(r),this.#l=this.#c.clamp(this.#l),this.#x(),this.#b()}#b(){let e=this.#r;e!==void 0&&(this.#a=new Tp(e.layout(this.#i,this.#l)),this.#S())}#x(){this.#n?.slider.place(this.#c,this.#r?.frame().slider??``)}#S(){let e=this.#c.nearest(this.#l);if(e===void 0)return;let t=this.#r?.frame().children.find(t=>t.id===e.id)?.name??``;this.#n?.slider.show(e.index,t)}#C(e){let t=this.#n?.canvas,n=this.#r,{width:r,height:i}=this.#i;if(t===void 0||n===void 0||r===0||i===0)return;let a=n.frame();t.paint({size:this.#i,zoom:this.#w(e),noise:a.noise,decay:a.decay,time:e},(t,r)=>{n.paint(t,this.#i,r,e,this.#o,this.#l,this.#s)})}#w(e){let t=this.#d;if(t!==void 0)return new Ep({scale:t.scale(e),anchor:t.anchor(),full:Pp});let n=this.#f;return n===void 0?new Ep({scale:1,anchor:{x:0,y:0},full:Pp}):new Ep({scale:n.scale.at(e),anchor:n.anchor,full:Pp})}#T(e){let t=this.#n?.canvas.pointAt(e);if(t!==void 0)return this.#a.at(t)}#E(e){e.equals(this.#o)||(this.light(e),this.#t(e))}#D(e){let t=this.#T(e);return t===void 0?new A:new k(t.id)}#O(e){if(this.#d!==void 0||this.#f!==void 0)return;this.#m=!1,this.#E(this.#D(e));let t=this.#n?.canvas;this.#c.drags()&&t!==void 0&&(this.#u=void 0,this.#p=new jp({pointer:e.pointerId,camera:this.#c,hold:t,point:{x:e.clientX,y:e.clientY},view:this.#l}))}#k(e){let t=this.#n?.slider;if(this.#d!==void 0||this.#f!==void 0||t===void 0)return;this.#m=!1,this.#u=void 0;let n=new Mp({pointer:e.pointerId,slider:t,camera:this.#c,point:{x:e.clientX,y:e.clientY}});this.#p=n,t.grab(e);let r=n.view();r!==void 0&&this.#P(r,Ip)}#A(e){let t=this.#p;if(!t?.is(e.pointerId)){this.#p===void 0&&this.#d===void 0&&this.#E(this.#D(e));return}t.move({x:e.clientX,y:e.clientY});let n=t.view();n!==void 0&&(this.#u=void 0,this.#j(n,t))}#j(e,t){this.#l=this.#c.clamp(e),t.sample(this.#e.clock.now(),this.#l),this.#b();let n=this.#c.nearest(this.#l);n!==void 0&&this.#E(new k(n.id)),this.#h===void 0&&this.#C(B)}#M(e){let t=this.#p,n=this.#c;if(!t?.is(e.pointerId)||(this.#p=void 0,!t.moved()))return;t.hidesClick()&&(this.#m=!0);let r=this.#e.motion.reduced()?0:t.speed(this.#e.clock.now()),i=n.landing(this.#l,r);this.#P(i,n.settle(Math.abs(i-this.#l)))}#N(e){let t=this.#n?.slider.step(e);if(t===void 0)return;let n=this.#c.stepFrom(this.#l,t);n!==void 0&&(e.preventDefault(),this.#P(n.at,this.#c.pace(Math.abs(n.at-this.#l))),this.#E(new k(n.id)))}#P(e,t){let n=this.#c.clamp(e);if(this.#e.motion.reduced()||Math.abs(n-this.#l)<.001){this.#u=void 0,this.#l=n,this.#b(),this.#h===void 0&&this.#C(B);return}this.#u=new z(this.#l,n,this.#e.clock.now(),t,this.#e.coast),this.#g()}#F(e){if(this.#m){this.#m=!1;return}if(this.#d!==void 0||this.#f!==void 0)return;let t=this.#T(e),n=this.#r?.frame().children.find(e=>e.id===t?.id);t===void 0||n===void 0||n.sealed||this.#I(t.id)}#I(e){if(this.#e.motion.reduced()){this.#L(e);return}let t=this.#c,n=t.stopOf(e),r=n===void 0?this.#l:t.clamp(n),i=Math.abs(r-this.#l),a=new Tp(this.#r===void 0?[]:this.#r.layout(this.#i,r)).of(e)?.anchor??{x:this.#i.width/2,y:this.#i.height/2};this.#u=void 0,this.#d=new Np({from:this.#l,to:r,start:this.#e.clock.now(),ride:i<.01?0:t.pace(i),zoom:t.zooms()?{scale:Pp,time:Fp}:null,pick:e,easing:this.#e.ride,anchor:a}),this.#g()}#L(e){let t=this.#n?.host;t!==void 0&&this.#e.picks.pick(t,e)}},Rp=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}line(e){return new Lp(this.#e,e)}plan(e){return new kp({...this.#e,flight:this.#t},e)}},zp={ArrowUp:1,ArrowRight:1,ArrowDown:-1,ArrowLeft:-1},Bp=class{#e;constructor(e){this.#e=e.ownerDocument.createElement(`div`),this.#e.className=`slider`,this.#e.setAttribute(`role`,`slider`),this.#e.tabIndex=0,this.#e.hidden=!0,e.append(this.#e)}place(e,t){e.track().lay(this),this.#e.setAttribute(`aria-label`,t),this.#e.setAttribute(`aria-valuemin`,`1`),this.#e.setAttribute(`aria-valuemax`,String(e.stopCount()))}placeAt(e,t){this.#e.hidden=!1,this.#e.style.left=`${String(e.x)}px`,this.#e.style.top=`${String(e.y)}px`,this.#e.style.width=`${String(e.width)}px`,this.#e.style.height=`${String(e.height)}px`,this.#e.setAttribute(`aria-orientation`,t===`y`?`vertical`:`horizontal`)}hide(){this.#e.hidden=!0}show(e,t){let n=String(e+1);this.#e.hidden||this.#e.getAttribute(`aria-valuenow`)===n||(this.#e.setAttribute(`aria-valuenow`,n),this.#e.setAttribute(`aria-valuetext`,t))}valueAt(e,t){return t.track().along(e,this.#e.getBoundingClientRect())}step(e){return zp[e.key]}grab(e){e.preventDefault(),this.#e.setPointerCapture(e.pointerId),this.#e.focus({preventScroll:!0})}listen(e,t,n){this.#e.addEventListener(e,t,{signal:n})}remove(){this.#e.remove()}},Vp=class{mount(e){return new Bp(e)}},Hp=12,Up=class{#e;constructor(e){this.#e=e}draw(e,t,n){let r=Math.floor(n.time/1e3*Hp);this.#t(e,t,n.size,this.#e.plan(n.noise,n.decay,r),n.palette)}#t(e,t,n,r,i){let{width:a,height:o}=n;for(let n of r.tears)t.shift(e,{y:n.y*o,height:n.height,by:n.shift},a);if(r.grain.length>0){e.globalAlpha=r.tint*5;let t=i(`text`),n=i(`rd`);for(let i of r.grain)e.fillStyle=i.red?n:t,e.fillRect(i.x*a,i.y*o,1,1)}r.tint>0&&(e.globalAlpha=r.tint,e.fillStyle=i(`rd`),e.fillRect(0,0,a,o)),r.dark&&(e.globalAlpha=.5,e.fillStyle=i(`ground`),e.fillRect(0,0,a,o)),e.globalAlpha=1}},Wp=`buffer`,Gp=`▲ `,Kp=10,qp=`█`,Jp=`░`,Yp={stable:`STABLE`,shifting:`SHIFTING`},Xp={text:`[RESONANT]`,label:`Resonant`},Zp=class{#e;#t;constructor(e,t){this.#t=e,this.#e=t}accepts(e){return e.prompt?.id===Wp}toViewModel(e){let t=e.prompt,n=e.buffer;if(t?.id!==Wp||n===null)throw Error(`BufferPresenter needs the buffer prompt`);let r=e=>String(e).padStart(2,`0`),i=t.figures.selected??``,a=`[QUANTUM_TRACE_BUFFER_SYNC...]`,o=n.fragments.map((t,n)=>{let a=String(n+1),o=i===String(n),s=t.hertz%2==0,c=Math.floor(t.hertz%100/10)+1;return{key:t.key,ordinal:r(n+1),hertz:`${String(t.hertz)}Hz`,bar:qp.repeat(c)+Jp.repeat(Kp-c),phase:s?Yp.stable:Yp.shifting,phaseKey:s?`stable`:`shifting`,name:t.name,badge:t.resonant?Xp:null,selected:o,selectedLabel:o?`Selected`:``,actions:e.options.filter(e=>(e.role===`pick`||e.role===`drop`)&&e.ordinal===a).map(e=>this.#n(e))}}),s=e.options.filter(e=>e.role===`return`).map(e=>this.#r(e));return{scene:Wp,title:this.#t.name(),frame:this.#e.of(e.place),heading:a,count:{label:`TRACE_BUFFER`,value:`${r(n.size)} FRAGMENTS`},tally:{label:`RESONANT_TRACES`,value:String(n.resonant)},empty:o.length===0?`(No spectral traces detected in local buffer)`:``,rows:o,hint:`Select one fragment, then another: they merge into a hybrid and give 15 Coherence back.`,sync:`SYNC_STATUS: NOMINAL`,dock:s,options:[...o.flatMap(e=>e.actions),...s],note:e.message,status:e.message===``?a:e.message,build:this.#t.buildLine(),regions:{buffer:`Quantum trace buffer`,actions:`Back`}}}#n(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:``}}#r(e){return{...this.#n(e),label:`${Gp}${e.label.toUpperCase()}`}}},Qp=globalThis,$p=e=>e,em=Qp.trustedTypes,tm=em?em.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,nm=`$lit$`,V=`lit$${Math.random().toFixed(9).slice(2)}$`,rm=`?`+V,im=`<${rm}>`,H=document,am=()=>H.createComment(``),om=e=>e===null||typeof e!=`object`&&typeof e!=`function`,sm=Array.isArray,cm=e=>sm(e)||typeof e?.[Symbol.iterator]==`function`,lm=`[ 	
\f\r]`,um=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dm=/-->/g,fm=/>/g,U=RegExp(`>|${lm}(?:([^\\s"'>=/]+)(${lm}*=${lm}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),pm=/'/g,mm=/"/g,hm=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),G=Symbol.for(`lit-noChange`),K=Symbol.for(`lit-nothing`),gm=new WeakMap,q=H.createTreeWalker(H,129);function _m(e,t){if(!sm(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return tm===void 0?t:tm.createHTML(t)}var vm=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=um;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===um?c[1]===`!--`?o=dm:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=U):(hm.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=U):o=fm:o===U?c[0]===`>`?(o=i??um,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?U:c[3]===`"`?mm:pm):o===mm||o===pm?o=U:o===dm||o===fm?o=um:(o=U,i=void 0);let d=o===U&&e[t+1].startsWith(`/>`)?` `:``;a+=o===um?n+im:l>=0?(r.push(s),n.slice(0,l)+nm+n.slice(l)+V+d):n+V+(l===-2?t:d)}return[_m(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},ym=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=vm(t,n);if(this.el=e.createElement(l,r),q.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=q.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(nm)){let t=u[o++],n=i.getAttribute(e).split(V),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Cm:r[1]===`?`?wm:r[1]===`@`?Tm:Sm}),i.removeAttribute(e)}else e.startsWith(V)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(hm.test(i.tagName)){let e=i.textContent.split(V),t=e.length-1;if(t>0){i.textContent=em?em.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],am()),q.nextNode(),c.push({type:2,index:++a});i.append(e[t],am())}}}else if(i.nodeType===8){if(i.data===rm)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(V,e+1))!==-1;)c.push({type:7,index:a}),e+=V.length-1}}a++}}static createElement(e,t){let n=H.createElement(`template`);return n.innerHTML=e,n}};function J(e,t,n=e,r){if(t===G)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=om(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=J(e,i._$AS(e,t.values),i,r)),t}var bm=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??H).importNode(t,!0);q.currentNode=r;let i=q.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new xm(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Em(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=q.nextNode(),a++)}return q.currentNode=H,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},xm=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),om(e)?e===K||e==null||e===``?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==G&&this._(e):e._$litType$===void 0?e.nodeType===void 0?cm(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&om(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ym.createElement(_m(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new bm(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=gm.get(e.strings);return t===void 0&&gm.set(e.strings,t=new ym(e)),t}k(t){sm(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(am()),this.O(am()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=$p(e).nextSibling;$p(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Sm=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=K}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=J(this,e,t,0),a=!om(e)||e!==this._$AH&&e!==G,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=J(this,r[n+o],t,o),s===G&&(s=this._$AH[o]),a||=!om(s)||s!==this._$AH[o],s===K?e=K:e!==K&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Cm=class extends Sm{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}},wm=class extends Sm{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}},Tm=class extends Sm{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??K)===G)return;let n=this._$AH,r=e===K&&n!==K||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==K&&(n===K||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Em=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}},Dm={M:nm,P:V,A:rm,C:1,L:vm,R:bm,D:cm,V:J,I:xm,H:Sm,N:wm,U:Tm,B:Cm,F:Em},Om=Qp.litHtmlPolyfillSupport;Om?.(ym,xm),(Qp.litHtmlVersions??=[]).push(`3.3.3`);var Y=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new xm(t.insertBefore(am(),e),e,void 0,n??{})}return i._$AI(e),i},km={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Am=e=>(...t)=>({_$litDirective$:e,values:t}),jm=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:Mm}=Dm,Nm=e=>e,Pm=()=>document.createComment(``),Fm=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Mm(r.insertBefore(Pm(),i),r.insertBefore(Pm(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Nm(e).nextSibling;Nm(r).insertBefore(e,i),e=t}}}return n},X=(e,t,n=e)=>(e._$AI(t,n),e),Im={},Lm=(e,t=Im)=>e._$AH=t,Rm=e=>e._$AH,zm=e=>{e._$AR(),e._$AA.remove()},Bm=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Z=Am(class extends jm{constructor(e){if(super(e),e.type!==km.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Rm(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=X(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=X(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=X(i[d],a[m]),Fm(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=X(i[f],a[p]),Fm(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Bm(o,p,m),u=Bm(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Fm(e,i[d]);X(t,a[p]),c[p]=t}else c[p]=X(n,a[p]),Fm(e,i[d],n),i[t]=null;p++}else zm(i[f]),f--}else zm(i[d]),d++;for(;p<=m;){let t=Fm(e,c[m+1]);X(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&zm(e)}return this.ut=o,Lm(e,c),G}}),Vm=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`BufferView.render before mount`);Y(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&Y(K,this.#e),this.#e=void 0}#t(e){return W`
      <div class="app buffer" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap trace" aria-label=${e.regions.buffer} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="buffer-heading">${e.heading}</h2>
          <p class="bcount">
            <span class="k">${e.count.label}</span> <b data-testid="buffer-count">${e.count.value}</b>
            <span class="k">${e.tally.label}</span> <b data-testid="resonant-traces">${e.tally.value}</b>
          </p>
          ${e.empty===``?K:W`<p class="empty" data-testid="buffer-empty">${e.empty}</p>`}
          ${e.rows.length===0?K:W`<ol class="frags" data-testid="fragments">
                  ${Z(e.rows,e=>`${e.ordinal}/${e.key}`,e=>W`
                      <li class=${e.selected?`frag selected`:`frag`} data-fragment=${e.key}>
                        <p class="fline">
                          <span class="ord">${e.ordinal}</span>
                          <span class="hz">${e.hertz}</span>
                          <span class="sig" data-phase=${e.phaseKey} aria-hidden="true">${e.bar}</span>
                          <span class="ph" data-phase=${e.phaseKey}>[${e.phase}]</span>
                        </p>
                        <p class="fname">
                          <b>${e.name}</b>
                          ${e.badge===null?K:W`<span class="badge" aria-hidden="true">${e.badge.text}</span
                                  ><span class="vh">${e.badge.label}</span>`}
                          ${e.selectedLabel===``?K:W`<span class="vh">${e.selectedLabel}</span>`}
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
    `}#n(e,t){return W`
      <button type="button" class=${t} data-option=${e.id}>
        ${e.key===``?K:W`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Hm=`help`,Um=`▲ `,Wm=class{#e;#t;constructor(e,t){this.#t=e,this.#e=t}accepts(e){return e.prompt?.id===Hm}toViewModel(e){if(e.prompt?.id!==Hm)throw Error(`HelpPresenter needs the help prompt`);let t=`[OPERATOR_MANUAL]`,n=e.options.filter(e=>e.role===`return`).map(e=>this.#n(e));return{scene:Hm,title:this.#t.name(),frame:this.#e.of(e.place),heading:t,lead:`You are a traveller in an endless lattice of places. Every tap is a prompt; every prompt costs Coherence. Go deep, take what resonates, and come back before the link fails.`,sections:[{heading:`MOVING`,entries:[{term:`A listed place`,what:`Tap it to enter. The list is what lies one level down.`},{term:`▲ LEAVE`,what:`Back up one level, to the place you came from.`},{term:`GO UP · GO DOWN`,what:`Ride a building’s elevator one floor. The top and the ground floor drop one of them.`},{term:`ENTER CORRIDOR · BACK TO ELEVATOR`,what:`The corridor lists the floor’s doors; a door opens an apartment’s first room.`},{term:`GO FORWARD · GO BACK`,what:`Walk an apartment’s rooms. Only the first room has the way out: Leave the apartment.`},{term:`An object`,what:`Tap one in a room to take it into the buffer; it holds as many as you take.`}]},{heading:`THE DOCK`,entries:[{term:`SCAN`,what:`What is behind the doors, which floors are near you, or the rooms of the apartment. Costs 1, no step.`},{term:`MAP`,what:`Draws the places you can enter from here, you at the centre; dim is unvisited. Nothing inside a room. Costs 1.`},{term:`BUFFER`,what:`Your inventory. Select one fragment, then another: they merge into a hybrid and give 15 Coherence back. In a room, drop one where you stand. Costs 1 to open; nothing inside.`},{term:`TRACE`,what:`Your whole path from the universe down to here. Costs 1.`},{term:`HELP`,what:`This screen. Costs 1.`},{term:`TITLE SCREEN`,what:`Back to the title; the world waits behind CONTINUE. Costs 1.`},{term:`END SESSION`,what:`The recap of this run: where you are, your steps, your places, your buffer. RESUME comes back; ending it goes to the title with the place kept.`},{term:`MORE`,what:`On a phone, the rest of the dock. It folds again after the next tap.`}]}],survival:{heading:`HOW NOT TO DIE`,lines:[`Every tap costs 1 Coherence before anything else happens — a move, a scan, the buffer. A place whose era is entropic costs 2, anywhere below a building’s bedrock costs 2, both at once 4.`,`Only a merge gives it back: 15, capped at 100. Nothing else does.`,`Under 40 the room text starts to corrupt. Under 30 the bar is red and the map sprouts X marks, more as you drop.`,`At 0 the link fails: the world is rebuilt from the same seed and you wake on the starting street with 100. You keep your buffer, your step count and your visited places; everything that lived inside the world is undone.`,`A capture whose frequency is a multiple of 11 resonates and counts on your tally, once. A Keystone never does.`]},keys:`On a keyboard, the letter on a button is its key. A phone needs none.`,dock:n,options:n,note:e.message,status:e.message===``?t:e.message,build:this.#t.buildLine(),regions:{help:`Help`,actions:`Back`}}}#n(e){return{id:e.id,key:e.key.toUpperCase(),label:`${Um}${e.label.toUpperCase()}`,opposite:e.opposite}}},Gm=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`HelpView.render before mount`);Y(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&Y(K,this.#e),this.#e=void 0}#t(e){return W`
      <div class="app help" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap manual" aria-label=${e.regions.help} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="help-heading">${e.heading}</h2>
          <p class="lead">${e.lead}</p>
          ${e.sections.map(e=>W`
              <h3 class="heading">${e.heading}</h3>
              <dl class="terms" data-testid="help-section">
                ${e.entries.map(e=>W`
                    <div class="term">
                      <dt>${e.term}</dt>
                      <dd>${e.what}</dd>
                    </div>
                  `)}
              </dl>
            `)}
          <h3 class="heading">${e.survival.heading}</h3>
          <ul class="rules" data-testid="help-survival">
            ${e.survival.lines.map(e=>W`<li>${e}</li>`)}
          </ul>
          <p class="hint">${e.keys}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="dock" aria-label=${e.regions.actions}>
          ${Z(e.dock,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return W`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?K:W`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Km=class{#e;constructor(e){this.#e=new Map(e.map(e=>[e.address,e]))}drawn(e,t){return e.flatMap((e,n)=>{let r=this.#e.get(e.address);return r===void 0?[]:[t(e,r,n)]})}},qm=20,Jm=class{#e;constructor(e){this.#e=e}of(e,t,n){return t.length===0||t.some(e=>!e.numbered)?{shown:!1}:e.drawnBy({street:()=>({shown:!1}),tower:e=>this.#t(new Km(e.rows),t,n),corridor:()=>({shown:!1}),plan:()=>({shown:!1}),area:()=>({shown:!1}),unseen:()=>({shown:!1})})}#t(e,t,n){let r=e.drawn(t,(e,t,r)=>({row:n[r],option:e,level:t.level})).flatMap(({row:e,option:t,level:n})=>e===void 0?[]:[{row:e,option:t,level:n}]).sort((e,t)=>e.level.number()-t.level.number()),i=t.length>qm,a=new Map;for(let e of r){let t=i?this.#e[e.level.kind()].of(e.level):0;a.set(t,[...a.get(t)??[],e])}let o=[...a.values()].map(e=>({label:`${e[0]?.level.label()??``}–${e.at(-1)?.level.label()??``}`,keys:e.map(({row:e,option:t,level:n})=>({id:e.id,number:n.label(),spoken:[e.label,...e.mark===null?[]:[e.mark.label],...e.seen===null?[]:[e.seen.label],...e.readings.map(e=>`${e.label} ${e.value}`)].join(`, `),current:t.current,visited:t.visited}))})),s=o.findIndex(e=>e.keys.some(e=>e.current));return{shown:!0,label:`Floors by tens`,groups:o,open:Math.max(0,s)}}},Ym=class{of(e){return Math.floor(e.number()/10)}},Xm=class{#e;constructor(e){this.#e=e}text(){return String(this.#e).padStart(2,`0`)}},Zm=new Set([`planet`,`city`]),Qm={word:`rebel`,look:`rebel`},$m={word:`drift`,look:`drift`},eh={era:``,culture:``,trait:``},th={era:!1,culture:!1},nh=class{of(e){return{group:`View`,pole:`Pole`,column:`Column`,heads:{era:`Era`,culture:`Culture`,trait:`Trait`},currentHead:`Drift current`,looks:{rebel:Qm.word,drift:$m.word},levels:e.steps.map(e=>this.#e(e))}}#e(e){let t=this.#t(e.vibe),n=[...t.rebel?[Qm]:[],...t.drift.era||t.drift.culture?[$m]:[],...e.signs.map(e=>({word:e.word,look:e.look}))],r=[`Level ${new Xm(e.depth).text()}, ${e.kind}: ${e.name}`,...t.values.era===``?[]:[`era ${t.values.era}`],...t.values.culture===``?[]:[`culture ${t.values.culture}`],...t.values.trait===``?[]:[`trait ${t.values.trait}`],...n.map(e=>e.word),...e.current?[`you are here`]:[]];return{key:e.address,glyph:e.glyph,abyssal:e.abyssal,here:e.current,kind:e.kind,name:e.name,label:r.join(`, `),berth:Zm.has(e.glyph),tags:n,...t}}#t(e){if(e.held===`none`)return{values:eh,current:``,rebel:!1,drift:th};let t=e=>new Xi(e).capitalised();return{values:{era:t(e.main.era),culture:t(e.main.culture),trait:e.held===`country`?t(e.trait):``},current:`${t(e.second.era)} · ${t(e.second.culture)}`,rebel:e.held===`country`&&e.rebel,drift:e.held===`country`?e.drift:th}}},rh=`▲ `,ih={text:`>>`,label:`You are here`},ah={lattice:{meter:`Coherence`,path:`Path from the universe`,sync:`LATTICE_SYNC: [NOMINAL]`},void:{meter:`Integrity`,path:`Void trace from the universe`,sync:`VOID_SYNC: [PRESSURE_HIGH]`}},oh=`[VOID] `,sh={text:`[>X<]`,label:`Elevator here`},ch={text:`[V]`,label:`Visited`},lh=`█`,uh=`X`,dh={you:`YOU`,visited:`VISITED`,unvisited:`UNVISITED`,noise:`STATIC`,mark:`GLITCH`},fh=`[NEURAL_LATTICE_PROJECTION]`,ph=class{#e;#t;#n;#r;#i;constructor(e,t,n,r,i){this.#t=e,this.#e=t,this.#n=n,this.#r=r,this.#i=i}accepts(e){return e.place!==null&&e.prompt===null}toViewModel(e){let t=e.place,n=e.player;if(t===null||n===null)throw Error(`HudPresenter needs a snapshot with a place`);let r=e.options.filter(e=>e.role===`travel`),i=r.map(e=>this.#d(e)),a=e.options.filter(e=>e.role===`move`),o=e.options.filter(e=>e.role===`return`),s=e.options.filter(e=>e.role===`take`),c=e.options.filter(e=>e.role===`debug`).map(e=>this.#p(e)),l=t.abyssal?ah.void:ah.lattice,u=this.#n.of(t,{travel:r,moves:a,leave:o,takes:s},n.decay),d=o.map(e=>this.#p(e)),{strip:f,row:p}=u.arrange(a.map(e=>this.#p(e))),m=[...d,...p,...e.options.filter(e=>e.role===`system`).map(e=>this.#p(e))];return{scene:`${e.world?.seed??``}/${t.address}`,title:this.#t.name(),frame:this.#e.of(t),rail:t.trail.map((e,n)=>({...e,current:n===t.trail.length-1})),meter:{label:l.meter,...E.range(),value:n.coherence,text:`${String(n.coherence)}%`,band:n.band,bandLabel:n.band,valueText:`${String(n.coherence)} percent, ${n.band}`},stats:[{key:`steps`,label:`Steps`,value:String(n.steps)},{key:`buffer`,label:`Buffer`,value:String(e.buffer?.size??0)}],place:{eyebrow:t.kind.toUpperCase(),icon:t.icon,name:t.name,position:t.position.counted?{shown:!0,label:new Xi(t.position.label).plain(),value:`${String(t.position.index)} of ${String(t.position.total)}`}:{shown:!1},tags:this.#c(t.facts),description:t.description,rows:this.#a(t),diagnostic:t.status},aside:this.#u(t,s,e.buffer?.resonant??0,l.sync),scan:e.scan===null?null:{label:`Scan`,heading:e.scan.title,notes:e.scan.notes,rows:e.scan.rows.map(e=>({cells:e.cells.filter(e=>e.value!==``).map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?ih:null,note:e.note}))},map:e.map===null?{shown:!1}:{shown:!0,...this.#o(e.map,fh)},trace:e.trace===null?{shown:!1}:this.#s(e.trace,t.noise,n.decay),railTrace:e.options.some(e=>e.id===`trace`)?{id:Ko,label:`Trace: every level from the universe down to here`}:null,drawing:u,pad:this.#r.of(t.portrait,r,i),heading:t.childrenHeading.toUpperCase(),rows:i,moves:f,sealedNote:i.some(e=>e.sealed)?{shown:!0,text:`STRUCTURES SEALED · the lattice opens their doors in a later build`}:{shown:!1},sealedTag:`SEALED`,dock:m,fold:{after:d.length+p.length,out:d.length,more:`MORE`,less:`LESS`,label:`More of the dock`},debug:c,debugToggle:`DEBUG`,options:[...s.filter(e=>!e.sealed).map(e=>this.#f(e)),...i.filter(e=>!e.sealed).map(e=>({id:e.id,key:e.key,label:e.label,opposite:``})),...f,...m,...c],status:e.message,build:this.#t.buildLine(),regions:{hud:`Position`,path:l.path,place:`Where you are`,scan:`Scan`,map:`Map`,trace:`Trace`,travel:`Places to enter`,moves:`Moves`,aside:`Readouts`,dock:`Actions`,debug:`Debug tools`}}}#a(e){let t=e.contents;return t===null?[]:[{label:`Furniture`,value:t.furniture.join(`, `)},...t.objects.length===0?[]:[{label:`Relics`,value:String(t.objects.length)}]]}#o(e,t){let n=e=>e.noise?`noise`:e.visited?`visited`:`unvisited`,r=e.nodes.find(e=>!e.noise)?.glyph??e.origin.glyph,i=e.nodes.filter(e=>e.visited).length,a=[{glyph:e.origin.glyph,label:dh.you,tone:`you`},{glyph:r,label:dh.visited,tone:`visited`},{glyph:r,label:dh.unvisited,tone:`unvisited`},...e.marks.length===0?[]:[{glyph:uh,label:dh.mark,tone:`mark`}]],o=e.marks.length===0?``:`, ${String(e.marks.length)} glitch mark${e.marks.length===1?``:`s`}`;return{label:`Lattice map`,heading:t,origin:`SCAN_ORIGIN: ${e.origin.name}`,picture:{width:e.width,height:e.height,origin:{glyph:e.origin.glyph,label:dh.you},nodes:e.nodes.map(e=>({x:e.x,y:e.y,glyph:e.glyph,tone:n(e)})),marks:e.marks,markGlyph:uh,legend:a},nodes:e.nodes.map(e=>({glyph:e.glyph,name:e.name,note:`${e.visited?`visited`:`unvisited`}${e.noise?`, static`:``}`})),summary:`Lattice map of ${e.origin.name}: ${String(e.nodes.length)} nodes, ${String(i)} visited${o}.`}}#s(e,t,n){let r=e.steps;return{shown:!0,label:`Trace from the universe`,title:`Trace`,close:`Close`,closeMark:`✕`,dive:`Dive`,skip:`Skip`,bands:r.map((e,i)=>{let a=r[i+1],o=new Xm(e.depth).text(),s=e.children.filter(e=>e.visited).length,c=[...e.children.length===0?[]:[`${String(e.children.length)} inside · ${String(s)} visited`],...a===void 0?[]:[`You went down into ${a.name}`]];return{key:e.address,eyebrow:`Depth ${o} · ${e.kind}`,name:e.name,label:`Depth ${o}, ${e.kind}: ${e.name}${e.current?`, you are here`:``}`,here:e.current,hereText:`You are here`,tags:this.#c(e.facts),words:e.words,facts:c,scale:e.scale,abyssal:e.abyssal,drawing:this.#n.band(e,t,n),into:a?.address??``}}),pole:this.#i.of(e)}}#c(e){return e.map(e=>({key:e.key,label:e.label,value:new Xi(e.value).capitalised()}))}#l(e){return e===0?`About this room`:`About this room · ${String(e)} ${e===1?`relic`:`relics`}`}#u(e,t,n,r){let i=e.contents;return{objects:i===null?null:{label:`In this room`,heading:`IN THIS ROOM`,peek:this.#l(i.objects.length),empty:i.objects.length===0?`No objects detected.`:``,tiles:i.objects.map((e,n)=>{let r=String(n+1),i=t.find(e=>e.ordinal===r&&!e.sealed);return{key:e.key,name:e.name,ordinal:r,action:i===void 0?null:this.#f(i)}})},telemetry:e.telemetry===null?null:{label:`System telemetry`,heading:`[SYSTEM_TELEMETRY]`,sync:r,spectrogram:{heading:`[QUANTUM_SPECTROGRAM]`,bars:e.telemetry.spectrogram.map(e=>lh.repeat(e))},logs:{heading:`[DECODE_LOGS]`,lines:[`> Trace: ${e.address}`,`> Resonant traces: ${String(n)}`,...e.telemetry.voice===null?[]:[`${oh}${e.telemetry.voice}`]]}},map:e.telemetry!==null||e.lattice===null?null:this.#o(e.lattice,`[NEURAL_MAP: ${e.kind.toUpperCase()}]`)}}#d(e){return{id:e.id,key:e.key.toUpperCase(),ordinal:e.ordinal.padStart(2,`0`),label:e.sealed?e.place:e.label,sealed:e.sealed,landmark:e.landmark,readings:e.readings.map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?sh:null,seen:e.visited?ch:null}}#f(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label,opposite:``}}#p(e){let t=e.role===`return`?rh:``;return{id:e.id,key:e.key.toUpperCase(),label:`${t}${e.label.toUpperCase()}`,opposite:e.opposite}}},mh=-1,hh=class{of(){return mh}},gh=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#e}sketchedBy(e){return e.area(this.#e)}arrange(e){return this.#t.arrange(e)}},_h=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#e}sketchedBy(e){return e.corridor(this.#e)}arrange(e){return this.#t.arrange(e)}},vh=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#e}sketchedBy(e){return e.plan(this.#e)}arrange(e){return this.#t.arrange(e)}},yh=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#e}sketchedBy(e){return e.street(this.#e)}arrange(e){return this.#t.arrange(e)}},bh=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#e}sketchedBy(e){return e.tower(this.#e)}arrange(e){return this.#t.arrange(e)}},xh=class{arrange(e){return{strip:[],row:e}}},Sh=class{arrange(e){return{strip:e,row:[]}}},Ch=class{#e;constructor(e){this.#e=e}frame(){return this.#e}drawn(){return!1}samePicture(){return!1}drawnBy(){return!1}stageOn(e){e.bare()}},wh=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}frame(){return this.#e}sketchedBy(){return new Ch(this.#e)}arrange(e){return this.#t.arrange(e)}},Th=class{#e=new Sh;#t=new xh;of(e,t,n){return this.#n(e.portrait,{name:e.name,address:e.address,heading:e.childrenHeading,noise:e.noise},{travel:t.travel.map(e=>this.#i(e)),moves:t.moves.map(e=>this.#i(e)),leave:t.leave.map(e=>this.#i(e)),takes:t.takes.map(e=>this.#i(e))},n)}band(e,t,n){let r=e.children.map(e=>({id:e.address,ordinal:e.ordinal,name:e.name,landmark:e.landmark,visited:e.visited,sealed:e.sealed,address:e.address}));return this.#n(e.portrait,{name:e.name,address:e.address,heading:``,noise:t},{travel:r,moves:[],leave:[],takes:[]},n)}#n(e,t,n,r){let i=n.travel;return e.drawnBy({street:e=>new yh(this.#r(t,r,new Km(e).drawn(i,(e,t)=>({...e,floors:t.floors,doors:t.doors}))),this.#e),tower:e=>new bh({...this.#r(t,r,new Km(e.rows).drawn(i,(e,t)=>({...e,level:t.level}))),tower:e},this.#e),corridor:e=>new _h({...this.#r(t,r,new Km(e.doors).drawn(i,(e,t)=>({...e,door:{look:t.look,words:t.words}}))),shape:e.shape,abyssal:e.abyssal},this.#e),plan:e=>{let i=n.moves.filter(t=>e.rooms.some(e=>e.address===t.address)),a=n.leave,o=n.takes;return new vh({...this.#r(t,r,[...i,...a,...o]),rooms:e.rooms,here:e.here,look:e.look,doors:i,exits:a,relics:o,mapKey:{text:`MAP`,label:`Apartment plan`}},this.#t)},area:e=>new gh({...this.#r(t,r,new Km(e.parts).drawn(i,(e,t)=>({...e,mark:t.mark}))),look:e.look,signal:e.signal},this.#e),unseen:()=>new wh(this.#r(t,r,i),this.#e)})}#r(e,t,n){let r=n.filter(e=>!e.sealed).length;return{label:`Picture of ${e.name}: ${String(n.length)} places drawn, ${String(r)} open — the list below enters them too`,address:e.address,children:n,slider:e.heading,decay:t,noise:e.noise}}#i(e){return{id:e.id,ordinal:e.ordinal,name:e.place,landmark:e.landmark,visited:e.visited,sealed:e.sealed,address:e.address}}},Eh=class{#e;#t=new Map;constructor(e){this.#e=e}bind(e,t,n){if(t==null||n===null){this.unbind(e);return}let r=this.#t.get(e),i=r?.host===t?r.view:void 0;i===void 0&&(this.unbind(e),i=this.#e[e](),i.mount(t),this.#t.set(e,{host:t,view:i})),i.render(n)}unbind(e){this.#t.get(e)?.view.dispose(),this.#t.delete(e)}dispose(){for(let e of[...this.#t.keys()])this.unbind(e)}},Dh=class{#e;#t;constructor(e){this.#e=new Set(e),this.#t=e.at(-1)}from(e,t){if(e!==this.#t)return t.find(e=>this.#e.has(e.address))}};function Oh(e){return`stat-${e}`}var kh=class{#e;#t;#n=!1;#r=!1;#i;#a;#o=new AbortController;#s;#c=new A;#l=new Dh([]);#u;#d;#f=`column`;#p=!1;#m=new Set;#h=!1;#g;#_;constructor(e,t,n,r){this.#a=e,this.#s=t,this.#d=r,this.#i=new Eh({pane:()=>n.pane(),map:()=>n.map()})}mount(e){this.#e=e,this.#o=new AbortController;let t=this.#o.signal;e.addEventListener(`click`,e=>{let t=this.#v(e.target);t!==void 0&&this.#F(e,t)},{signal:t,capture:!0}),e.ownerDocument.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.#C()},{signal:t});for(let n of[`pointerover`,`focusin`])e.addEventListener(n,e=>{let t=this.#v(e.target);t!==void 0&&this.#j(new k(t))},{signal:t});for(let n of[`pointerout`,`focusout`])e.addEventListener(n,e=>{let t=this.#v(e.target);t!==void 0&&this.#v(e.relatedTarget)!==t&&this.#j(new A)},{signal:t})}#v(e){if(!(e instanceof Element))return;let t=e.closest(`button[data-option]`)?.dataset.option;return this.#t?.drawing.frame().children.some(e=>e.id===t)===!0?t:void 0}render(e){this.#n=!1,this.#x(),this.#p=e.trace.shown,this.#p&&(this.#f=this.#d.views.recall()),this.#m=new Set,e.scene!==this.#t?.scene&&(this.#c=new A,this.#u=void 0),this.#k(e),this.#s.redraw();let t=e.drawing.frame(),n=this.#l.from(t.address,t.children);n!==void 0&&this.#s.arrive(n.id),this.#l=new Dh(e.rail.map(e=>e.address)),this.#p&&this.#y(e),this.#g=void 0}#y(e){let t=e.trace,n=this.#e;if(!t.shown||n===void 0)return;if(this.#f===`pole`){this.#b(e);return}let r=this.#E(`.col-scroll`),i=this.#E(`[data-thread]`);if(r===void 0||i===void 0)return;let a=this.#D(`[data-level]`);this.#d.bands.show({scroller:r,thread:i,decay:e.drawing.frame().decay,bands:t.bands.flatMap((e,t)=>{let n=a[t];return n===void 0?[]:[{host:n,sketch:e.drawing.sketchedBy(this.#a),into:e.into}]})}),a[this.#g??a.length-1]?.closest(`li`)?.scrollIntoView({block:`center`}),this.#E(`.col-close`)?.focus({preventScroll:!0})}#b(e){let t=e.trace,n=this.#E(`[data-pole]`),r=this.#E(`.pole-scroll`);if(!t.shown||n===void 0||r===void 0)return;let i=this.#D(`.pole-level`);this.#d.pole.show({host:n,scroller:r,levels:i,vm:t.pole,at:this.#g??i.length-1}),this.#E(`.col-close`)?.focus({preventScroll:!0})}#x(){this.#d.dive.skip(),this.#d.bands.clear(),this.#d.pole.clear(),this.#h=!1}#S(e,t){let n=this.#t;n===void 0||!this.#p||e===this.#f&&t===void 0||(this.#d.views.remember(e),this.#x(),this.#f=e,this.#k(n),this.#g=t,this.#y(n),this.#g=void 0)}#C(){this.#p&&(this.#x(),this.#p=!1,this.#t!==void 0&&this.#k(this.#t))}#w(e){this.#m.has(e)?this.#m.delete(e):this.#m.add(e),this.#t!==void 0&&this.#k(this.#t)}#T(){let e=this.#t;if(!e?.trace.shown)return;this.#h=!0,this.#k(e);let t=this.#E(`[data-dive]`);t!==void 0&&this.#d.dive.play(t,e.trace.bands.map(e=>({sketch:e.drawing.sketchedBy(this.#a),into:e.into})),()=>{this.#h=!1,this.#t!==void 0&&this.#p&&this.#k(this.#t);let e=this.#e?.querySelectorAll(`.bands > li`);e?.[e.length-1]?.scrollIntoView({block:`center`})})}#E(e){let t=this.#e?.querySelector(e);return t instanceof HTMLElement?t:void 0}#D(e){return[...this.#e?.querySelectorAll(e)??[]].filter(e=>e instanceof HTMLElement)}#O(e){let t=this.#D(`.rail .crumb`),n,r=1/0;t.forEach((t,i)=>{let a=t.getBoundingClientRect(),o=Math.hypot(a.left+a.width/2-e.clientX,a.top+a.height/2-e.clientY);o<r&&(r=o,n=i)}),this.#g=n}#k(e){if(this.#e===void 0)throw Error(`HudView.render before mount`);this.#t=e,Y(this.#L(e),this.#e),this.#i.bind(`pane`,this.#M(`pane`),e.aside.map?.picture??null),this.#i.bind(`map`,this.#M(`map`),e.map.shown?e.map.picture:null),this.#A(e.drawing.sketchedBy(this.#a))}#A(e){this.#s.show(this.#M(`scene`),e,e=>{this.#j(e)}),this.#s.light(this.#c)}#j(e){if(e.equals(this.#c)||!this.#s.showing())return;this.#c=e;let t=this.#t?.pad.shown===!0?this.#t.pad.groups.findIndex(t=>t.keys.some(t=>e.marks(t.id))):-1;t>=0&&(this.#u=t),this.#s.light(e),this.#t!==void 0&&this.#e!==void 0&&Y(this.#L(this.#t),this.#e)}dispose(){this.#s.clear(),this.#o.abort(),this.#c=new A,this.#i.dispose(),this.#e!==void 0&&Y(K,this.#e),this.#e=void 0,this.#t=void 0,this.#n=!1,this.#r=!1}#M(e){let t=this.#e?.querySelector(`[data-canvas="${e}"]`);return t instanceof HTMLElement?t:null}#N(){this.#n=!this.#n,this.#t!==void 0&&this.#k(this.#t)}#P(e){this.#u=e,this.#t!==void 0&&this.#k(this.#t)}#F(e,t){this.#s.leads(t)&&(e.stopPropagation(),this.#s.enter(t))}#I(){this.#r=!this.#r,this.#t!==void 0&&this.#k(this.#t)}#L(e){let t=e.drawing.sketchedBy(this.#a).drawn();return W`
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
            ${e.stats.map(e=>W`
                <div class="stat">
                  <dt>${e.label}</dt>
                  <dd data-testid=${Oh(e.key)}>${e.value}</dd>
                </div>
              `)}
          </dl>
        </section>
        <nav class="rail" aria-label=${e.regions.path}>
          ${e.railTrace===null?K:W`<button
                  type="button"
                  class="rail-hit"
                  tabindex="-1"
                  data-option=${e.railTrace.id}
                  aria-label=${e.railTrace.label}
                  @pointerdown=${e=>{this.#O(e)}}
                ></button>`}
          <ol data-testid="path">
            ${e.rail.map(e=>W`
                <li class=${e.current?`crumb you`:`crumb`}>
                  <span class="vh">${e.kind}</span><span class="ic" aria-hidden="true">${e.icon}</span
                  ><span class="cn" aria-current=${e.current?`location`:K}>${e.name}</span>
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
          ${e.moves.length===0?K:W`
                  <nav class="moves" aria-label=${e.regions.moves}>
                    ${Z(e.moves,e=>e.id,e=>this.#G(e))}
                  </nav>
                `}
          <div class="body">
            <ul class="tags">
              ${e.place.position.shown?W`<li class="chip pos">
                      <span class="k">${e.place.position.label}</span> ${e.place.position.value}
                    </li>`:K}
              ${e.place.tags.map(e=>W`
                  <li class="tag" data-fact=${e.key}><span class="k">${e.label}</span> ${e.value}</li>
                `)}
            </ul>
            <div class="desc">${e.place.description.map(e=>W`<p>${e}</p>`)}</div>
            ${e.place.rows.length===0?K:W`<dl class="prows">
                    ${e.place.rows.map(e=>W`
                        <div class="prow">
                          <dt>${e.label}</dt>
                          <dd>${e.value}</dd>
                        </div>
                      `)}
                  </dl>`}
            ${e.place.diagnostic===``?K:W`<p class="diag">${e.place.diagnostic}</p>`}
            <p class=${e.status===``?`status quiet`:`status`} data-testid="status">${e.status}</p>
          </div>
        </section>
        ${t?W`<div
                class="scene"
                data-testid="scene"
                data-canvas="scene"
                data-lit=${this.#c.written()}
              ></div>`:K}
        ${t&&e.aside.objects!==null?W`<button
                type="button"
                class="peek"
                data-testid="peek"
                @click=${e=>{this.#V(e)}}
              >
                ${e.aside.objects.peek} <span aria-hidden="true">↓</span>
              </button>`:K}
        ${this.#R(e)} ${e.map.shown?this.#z(e.map,`map`,`map`,e.regions.map):K}
        ${this.#B(e)}
        <div class="side">
          ${e.rows.length===0?K:W`
                  <section class="travel" aria-label=${e.regions.travel}>
                    <h3 class="heading">${e.heading}</h3>
                    ${e.sealedNote.shown?W`<p class="sealed-note" data-testid="sealed-note">${e.sealedNote.text}</p>`:K}
                    ${e.pad.shown?this.#U(e,e.pad,t):W`<ol class="rows">
                            ${Z(e.rows,t=>`${e.scene}/${t.id}`,n=>this.#W(n,e.sealedTag,t))}
                          </ol>`}
                  </section>
                `}
          ${this.#H(e)}
        </div>
        <nav class="dock" aria-label=${e.regions.dock} data-open=${this.#n?`true`:`false`}>
          ${Z(e.dock.slice(0,e.fold.out),e=>e.id,e=>this.#G(e,void 0,!0))}
          ${Z(e.dock.slice(e.fold.out,e.fold.after),e=>e.id,e=>this.#G(e))}
          ${e.dock.length<=e.fold.after?K:W`
                  <button
                    type="button"
                    class="pb more"
                    data-testid="more"
                    aria-label=${e.fold.label}
                    aria-expanded=${this.#n?`true`:`false`}
                    aria-controls="dock-fold"
                    @click=${()=>{this.#N()}}
                  >
                    <span>${this.#n?e.fold.less:e.fold.more}</span>
                  </button>
                  <div class="fold" id="dock-fold">
                    ${Z(e.dock.slice(e.fold.after),e=>e.id,e=>this.#G(e))}
                  </div>
                `}
        </nav>
        ${e.debug.length===0?K:W`
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
                    @click=${()=>{this.#I()}}
                  >
                    <span>${e.debugToggle}</span>
                  </button>
                  <div class="fold" id="debug-fold">
                    ${Z(e.debug,e=>e.id,e=>this.#G(e,-1))}
                  </div>
                </nav>
              `}
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#R(e){let t=e.scan;return t===null?K:W`
      <section class="scan" data-testid="scan" aria-label=${t.label} tabindex="-1" data-spot>
        <h3 class="heading">${t.heading}</h3>
        ${t.notes.map(e=>W`<p class="tl">${e}</p>`)}
        <ol class="srows">
          ${t.rows.map(e=>W`
              <li class=${e.mark===null?`srow`:`srow you`}>
                <p class="cells">
                  ${e.mark===null?K:W`<span class="mark" aria-hidden="true">${e.mark.text}</span
                          ><span class="vh">${e.mark.label}</span>`}${e.cells.map(e=>W`
                      <span class="cell" data-fact=${e.key}
                        ><span class="k">${e.label}</span> ${e.value}</span
                      >
                    `)}
                </p>
                ${e.note===``?K:W`<p class="snote">${e.note}</p>`}
              </li>
            `)}
        </ol>
      </section>
    `}#z(e,t,n,r){return W`
      <section
        class=${t===`pane`?`map pane`:`map`}
        data-testid=${n}
        aria-label=${r}
        tabindex=${t===`pane`?K:`-1`}
        ?data-spot=${t!==`pane`}
      >
        <h3 class="heading">${e.heading}</h3>
        <div class="cv" data-canvas=${t} role="img" aria-label=${e.summary}></div>
        <p class="tl">${e.origin}</p>
        <ul class="vh">
          ${e.nodes.map(e=>W`<li>${e.glyph} ${e.name}, ${e.note}</li>`)}
        </ul>
      </section>
    `}#B(e){let t=e.trace;return!t.shown||!this.#p?K:W`
      <section class="column" data-testid="trace" role="dialog" aria-modal="true" aria-label=${t.label}>
        <header
          class="col-head"
          @pointerdown=${e=>{e.target instanceof Element&&e.target.closest(`button`)!==null||(this.#_=e.clientY,e.currentTarget instanceof Element&&e.currentTarget.setPointerCapture(e.pointerId))}}
          @pointerup=${e=>{this.#_!==void 0&&e.clientY-this.#_>60&&this.#C(),this.#_=void 0}}
        >
          <h2>${t.title}</h2>
          <span class="seg" role="group" aria-label=${t.pole.group}>
            <button
              type="button"
              class="seg-pole"
              aria-pressed=${this.#f===`pole`?`true`:`false`}
              @click=${()=>{this.#S(`pole`)}}
            >
              ${t.pole.pole}
            </button>
            <button
              type="button"
              class="seg-column"
              aria-pressed=${this.#f===`column`?`true`:`false`}
              @click=${()=>{this.#S(`column`)}}
            >
              ${t.pole.column}
            </button>
          </span>
          <button
            type="button"
            class="col-dive"
            @click=${()=>{this.#T()}}
          >
            ${t.dive}
          </button>
          <button
            type="button"
            class="col-close"
            aria-label=${t.close}
            @click=${()=>{this.#C()}}
          >
            ${t.closeMark}
          </button>
        </header>
        <div class="col-body">
          ${this.#f===`pole`?W`<div class="pole-scroll">
                  <div class="pole-sheet">
                    <div class="pole-cv" data-pole></div>
                    <ol class="pole-levels">
                      ${Z(t.pole.levels,e=>e.key,(e,t)=>W`<li>
                            <button
                              type="button"
                              class=${e.here?`pole-level here`:`pole-level`}
                              aria-label=${e.label}
                              @click=${()=>{this.#S(`column`,t)}}
                            ></button>
                          </li>`)}
                    </ol>
                  </div>
                </div>`:W`<div class="col-scroll">
                    <ol class="bands">
                      ${Z(t.bands,e=>e.key,e=>W`
                          <li
                            class=${`${e.here?`band-li here`:`band-li`}${e.abyssal?` abyssal`:``}${this.#m.has(e.key)?` open`:``}`}
                          >
                            <button
                              type="button"
                              class="band"
                              aria-expanded=${this.#m.has(e.key)?`true`:`false`}
                              aria-label=${e.label}
                              @click=${()=>{this.#w(e.key)}}
                            >
                              <span class="b-pic"
                                ><span class="b-cv" data-level=${e.key}></span
                                ><span class="b-scale">${e.scale}</span></span
                              >
                              <span class="b-info">
                                <span class="eyebrow"
                                  >${e.eyebrow}${e.here?W` · <b>${e.hereText}</b>`:K}</span
                                >
                                <span class="b-name">${e.name}</span>
                                <span class="b-tags">
                                  ${e.tags.map(e=>W`<span class="chip" data-fact=${e.key}>${e.label}${e.value===``?K:W` <b>${e.value}</b>`}</span>`)}
                                </span>
                                <span class="b-words">${e.words}</span>
                                ${e.facts.map(e=>W`<span class="b-fact">${e}</span>`)}
                              </span>
                            </button>
                          </li>
                        `)}
                    </ol>
                  </div>
                  <div class="col-thread" data-thread></div>`}
        </div>
        ${this.#h?W`<div class="col-reel">
                <div class="reel" data-dive></div>
                <button
                  type="button"
                  class="col-skip"
                  @click=${()=>{this.#d.dive.skip()}}
                >
                  ${t.skip}
                </button>
              </div>`:K}
      </section>
    `}#V(e){let t=e.currentTarget;t instanceof HTMLElement&&t.closest(`.world`)?.querySelector(`.desc`)?.scrollIntoView({block:`start`})}#H(e){let{objects:t,telemetry:n,map:r}=e.aside;return t===null&&n===null&&r===null?K:W`
      <aside class="aside" aria-label=${e.regions.aside}>
        ${t===null?K:W`
                <section class="objects" data-testid="objects" aria-label=${t.label}>
                  <h3 class="heading">${t.heading}</h3>
                  ${t.empty===``?K:W`<p class="empty">${t.empty}</p>`}
                  ${t.tiles.length===0?K:W`<ul class="tiles">
                          ${Z(t.tiles,t=>`${e.scene}/${t.ordinal}`,e=>e.action===null?W`<li class="tile" data-relic=${e.key}>
                                    <span class="ord">${e.ordinal}</span>${e.name}
                                  </li>`:W`<li>
                                    <button
                                      type="button"
                                      class="tile take"
                                      data-option=${e.action.id}
                                      ?data-lit=${this.#c.marks(e.action.id)}
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
        ${n===null?K:W`
                <section class="tele" data-testid="telemetry" aria-label=${n.label}>
                  <p class="th">${n.heading}</p>
                  <p class="tl">${n.sync}</p>
                  <p class="th">${n.spectrogram.heading}</p>
                  <p class="bars" aria-hidden="true">
                    ${n.spectrogram.bars.map(e=>W`<span>${e}</span>`)}
                  </p>
                  <p class="th">${n.logs.heading}</p>
                  ${n.logs.lines.map(e=>W`<p class="tl">${e}</p>`)}
                </section>
              `}
        ${r===null?K:this.#z(r,`pane`,`pane-map`,r.label)}
      </aside>
    `}#U(e,t,n){let r=Math.min(this.#u??t.open,t.groups.length-1),i=t.groups[r];return W`
      <ol class="pad">
        ${Z(i?.keys??[],t=>`${e.scene}/${t.id}`,e=>W`
            <li>
              <button
                type="button"
                class=${[`key`,e.current?`you`:``,e.visited?`seen`:``].join(` `).trim()}
                data-option=${e.id}
                ?data-lit=${n&&this.#c.marks(e.id)}
              >
                <span class="num" aria-hidden="true">${e.number}</span><span class="vh">${e.spoken}</span>
              </button>
            </li>
          `)}
      </ol>
      ${t.groups.length<2?K:W`<div class="tens" role="group" aria-label=${t.label}>
              ${t.groups.map((e,t)=>W`
                  <button
                    type="button"
                    class="ten"
                    aria-pressed=${t===r?`true`:`false`}
                    @click=${()=>{this.#P(t)}}
                  >
                    ${e.label}
                  </button>
                `)}
            </div>`}
    `}#W(e,t,n){let r=e.landmark?`lb landmark`:`lb`;return e.sealed?W`
        <li class="row sealed" data-sealed>
          <span class="ord">${e.ordinal}</span><span class=${r}>${e.label}</span
          ><span class="seal">${t}</span>
        </li>
      `:W`
      <li>
        <button
          type="button"
          class=${[`row`,e.mark===null?``:`you`,e.seen===null?``:`seen`].join(` `).trim()}
          data-option=${e.id}
          ?data-lit=${n&&this.#c.marks(e.id)}
        >
          <span class="ord">${e.ordinal}</span
          ><span class="mid"
            ><span class="ln"
              ><span class=${r}>${e.label}</span>${e.mark===null?K:W`<span class="mark" aria-hidden="true">${e.mark.text}</span
                      ><span class="vh">${e.mark.label}</span>`}${e.seen===null?K:W`<span class="seen-mark" aria-hidden="true">${e.seen.text}</span
                      ><span class="vh">${e.seen.label}</span>`}</span
            >${e.readings.length===0?K:W`<span class="rds"
                    >${e.readings.map(e=>W`
                        <span class="rd" data-fact=${e.key}
                          ><span class="vh">${e.label}</span>${e.value}</span
                        >
                      `)}</span
                  >`}</span
          >${e.key===``?K:W`<kbd aria-hidden="true">${e.key}</kbd>`}
        </button>
      </li>
    `}#G(e,t,n=!1){return W`
      <button
        type="button"
        class="pb"
        data-option=${e.id}
        data-role=${n?`out`:K}
        ?data-lit=${this.#c.marks(e.id)}
        tabindex=${t??K}
      >
        ${e.key===``?K:W`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Ah=`reboot`,jh=`dead`,Mh=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Ah}toViewModel(e){let t=`!!! CRITICAL_COHERENCE_FAILURE !!!`;return{scene:Ah,title:this.#e.name(),frame:jh,stageLine:`NEURAL LINK LOST`,eyebrow:`COHERENCE ${String(e.player?.coherence??0)}%`,headline:t,line:`REBOOTING...`,explanation:`The world is rebuilt from the same seed. You wake on the starting street with 100 Coherence; your step count and the places you have visited are kept. Everything that lived inside the world is undone.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?t:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,notice:`Link failure`,actions:`Actions`}}}},Nh=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RebootView.render before mount`);Y(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&Y(K,this.#e),this.#e=void 0}#t(e){return W`
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
    `}#n(e){return W`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?K:W`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Ph=`recap`,Fh=[{key:`locus`,label:`FINAL_LOCUS`,unit:``},{key:`steps`,label:`PULSE_TRAVERSAL`,unit:` steps`},{key:`places`,label:`CELLS_MAPPED`,unit:` footprints`},{key:`buffer`,label:`BUFFER_DENSITY`,unit:` spectral fragments`},{key:`resonant`,label:`RESONANT_TRACES`,unit:` resonant`}],Ih=[`UNMOUNTING_LATTICE_TRACE`,`DEALLOCATING_TRACE_BUFFER`,`RELEASING_NEURAL_CARRIER`,`STABILIZING_SUBSTRATE_WAVEFORM`],Lh={void:{heading:`[VOID_RESONANCE_TERMINATION]`,figures:!1,shutdown:!1,lines:[`Your echoes are sinking into the strata.`,`The web is folding back upon itself.`,`The v-v-void... it remembers... [OK]`],closing:`Sleep among the static, Operator.`},expedition:{heading:`[SESSION_RECAP_INITIALIZED]`,figures:!0,shutdown:!1,lines:[],closing:`Expedition successful. Trace synchronized to substrate.`},severed:{heading:`[LINK_TERMINATION_PROTOCOL]`,figures:!1,shutdown:!0,lines:[],closing:`Neural link severed. Waveform stabilized.`}},Rh=class{#e;#t;constructor(e,t){this.#t=e,this.#e=t}accepts(e){return e.prompt?.id===Ph}toViewModel(e){let t=e.prompt;if(t?.id!==Ph)throw Error(`RecapPresenter needs the recap prompt`);let n=Lh[t.outcome];if(n===void 0)throw Error(`no words for the ending '${t.outcome}'`);return{scene:Ph,title:this.#t.name(),frame:this.#e.of(e.place),heading:n.heading,figures:n.figures?this.#n(t):[],steps:n.shutdown?Ih.map(e=>({label:`[STATUS]`,process:`${e}...`,done:`[DONE]`})):[],lines:n.lines,closing:n.closing,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?n.heading:e.message,build:this.#t.buildLine(),regions:{recap:`Session recap`,actions:`Actions`}}}#n(e){return Fh.map(t=>({label:t.label,value:`${e.figures[t.key]??``}${t.unit}`}))}},zh=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RecapView.render before mount`);Y(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&Y(K,this.#e),this.#e=void 0}#t(e){return W`
      <div class="app" data-frame=${e.frame}>
        <header class="bar"><h1>${e.title}</h1></header>
        <section class="cap recap" aria-label=${e.regions.recap} tabindex="-1" data-rest>
          <h2 class="rh" data-testid="recap-heading">${e.heading}</h2>
          ${e.figures.length===0?K:W`<dl class="figures" data-testid="figures">
                  ${e.figures.map(e=>W`
                      <div class="figure">
                        <dt>${e.label}</dt>
                        <dd>${e.value}</dd>
                      </div>
                    `)}
                </dl>`}
          ${e.steps.length===0?K:W`<ol class="shutdown" data-testid="shutdown">
                  ${e.steps.map(e=>W`
                      <li>
                        <span class="k">${e.label}</span> ${e.process}
                        <span class="done">${e.done}</span>
                      </li>
                    `)}
                </ol>`}
          ${e.lines.length===0?K:W`<div class="void-lines" data-testid="void-lines">
                  ${e.lines.map(e=>W`<p>${e}</p>`)}
                </div>`}
          <p class="closing" data-testid="closing">${e.closing}</p>
          <p class=${e.note===``?`status quiet`:`status`} data-testid="status">${e.note}</p>
        </section>
        <nav class="pad" aria-label=${e.regions.actions}>
          ${Z(e.options,e=>e.id,e=>this.#n(e))}
        </nav>
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){return W`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?K:W`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Bh=class{#e;constructor(e){this.#e=e}accepts(e){return e.place===null&&e.prompt===null}toViewModel(e){return{scene:`title`,title:this.#e.name(),tagline:`Vinculum neural interface · lattice uplink`,stageLine:e.world===null?`AWAITING SEED`:`WORLD LOCKED`,world:e.world===null?null:{nameLabel:`UNIVERSE`,name:e.world.name.toUpperCase(),seedLabel:`SEED`,seed:e.world.seed},prompt:`NO WORLD LOADED. DRAW A SEED TO BEGIN.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),status:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,world:`World`,actions:`Actions`}}}},Vh=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`TitleView.render before mount`);Y(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&Y(K,this.#e),this.#e=void 0}#t(e){return W`
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
          ${e.world===null?W`<p class="prompt" data-testid="prompt">${e.prompt}</p>`:W`
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
    `}#n(e){return W`
      <button type="button" class="pb" data-option=${e.id}>
        <kbd aria-hidden="true">${e.key}</kbd><span>${e.label}</span>
      </button>
    `}},Hh=650,Uh=260,Wh=`[data-testid="${Oh(`buffer`)}"]`,Gh=class{#e;constructor(e){this.#e=e}fly(e){let t=this.#e.querySelector(Wh);if(t===null)return;let n=t.getBoundingClientRect(),r={x:n.left+n.width/2,y:n.top+n.height/2},i=this.#e.createElement(`span`);i.className=`relic-flight`,i.setAttribute(`aria-hidden`,`true`),i.dataset.testid=`relic-flight`,i.style.left=`${String(e.x)}px`,i.style.top=`${String(e.y)}px`,this.#e.body.append(i);let a=i.animate([{transform:`translate(-50%, -50%) rotate(45deg) scale(1)`,opacity:1},{transform:`translate(calc(-50% + ${String(r.x-e.x)}px), calc(-50% + ${String(r.y-e.y)}px)) rotate(45deg) scale(0.5)`,opacity:.6}],{duration:Hh,easing:`cubic-bezier(0.5, 0, 0.75, 0)`});a.onfinish=()=>{i.remove(),this.#e.querySelector(Wh)?.animate([{transform:`scale(1)`},{transform:`scale(1.3)`},{transform:`scale(1)`}],Uh)}}},Kh=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}accepts(e){return this.#e.accepts(e)}mount(e){this.#t.mount(e)}show(e){let t=this.#e.toViewModel(e);return this.#t.render(t),t}dispose(){this.#t.dispose()}},qh=class{#e;#t=new AbortController;#n=new Uc;#r=[];constructor(e){this.#e=e}attach(e){let t=this.#t.signal;e.addEventListener(`click`,e=>{this.#i(e)},{signal:t}),this.#n.onPick(e,t,e=>{this.#a(e)}),e.ownerDocument.addEventListener(`keydown`,e=>{this.#o(e)},{signal:t})}offer(e){this.#r=e}detach(){this.#t.abort()}#i(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`button[data-option]`)?.dataset.option;t!==void 0&&this.#a(t)}#a(e){this.#r.some(t=>t.id===e)&&this.#e(e)}#o(e){if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;let t=this.#r.find(t=>t.key.toLowerCase()===e.key.toLowerCase());t!==void 0&&(e.preventDefault(),this.#e(t.id))}},Jh=class{#e;#t;#n;#r;#i;#a;#o;#s;#c=[];#l;#u;constructor(e,t,n){this.#e=e,this.#t=t,this.#u=n,this.#n=new qh(e=>{this.#l=this.#c.find(t=>t.id===e),this.#d(this.#e.step(e))})}start(e){this.#r=e,this.#i=this.#f(e),this.#n.attach(e),this.#d(this.#e.snapshot())}stop(){this.#n.detach(),this.#a?.dispose(),this.#a=void 0,this.#i?.remove(),this.#i=void 0,this.#r=void 0}#d(e){let t=this.#r,n=this.#t.find(t=>t.accepts(e));if(t===void 0||n===void 0)throw Error(`no screen accepts this snapshot`);let r=this.#m();n!==this.#a&&(this.#a?.dispose(),n.mount(t),this.#a=n);let i=n.show(e);this.#n.offer(i.options),this.#c=i.options,this.#p(i.status),r?.isConnected===!1&&this.#h(i.scene,this.#l);let a=t.querySelector(`[data-spot]`);if(a!==null&&i.scene===this.#o&&this.#g(a),i.scene!==this.#o){this.#_();let e=r instanceof HTMLElement?r.dataset.option:void 0;this.#s=this.#o===void 0||e===void 0?void 0:{scene:this.#o,optionId:e}}this.#o=i.scene}#f(e){let t=e.ownerDocument.createElement(`p`);return t.className=`vh`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),e.prepend(t),t}#p(e){this.#i!==void 0&&this.#i.textContent!==e&&(this.#i.textContent=e)}#m(){let e=this.#r?.ownerDocument.activeElement;return e!=null&&this.#r?.contains(e)===!0?e:void 0}#h(e,t){let n=this.#r,r=[...n?.querySelectorAll(`button[data-option]`)??[]].filter(e=>e.offsetParent!==null&&e.tabIndex>=0),i=n?.querySelector(`[data-rest]`),a=this.#s;if(a?.scene===e){let e=r.find(e=>e.dataset.option===a.optionId);if(e!==void 0){e.focus({preventScroll:!0});return}if(i!=null){i.focus({preventScroll:!0});return}}let o=t?.opposite??``;if(o!==``&&this.#c.some(e=>e.id===o)&&i!=null){i.focus({preventScroll:!0});return}r.find(e=>e.dataset.option!==o)?.focus({preventScroll:!0})}#g(e){e.focus({preventScroll:!0}),e.scrollIntoView({block:`nearest`,behavior:this.#u.reduced()?`instant`:`smooth`})}#_(){this.#r?.ownerDocument.defaultView?.scrollTo({top:0,left:0,behavior:`instant`})}},Yh=document.querySelector(`#app`);if(Yh===null)throw Error(`#app is missing from index.html`);var Xh=new $t(new Qt),Zh=new URLSearchParams(window.location.search).has(`debug`),Qh=new Ys({world:new fo(Xh,new bo(Xh),new Xs),entropy:new Zs(window.crypto),saves:new ic(()=>window.localStorage),debug:Zh}),Q=new ac(`786faa9`),$h=new Oc,eg=new kc(new Qs(window)),tg=new ec(window),$=new pp,ng=new fl({street:$.street(),tower:$.tower(),corridor:$.corridor(),plan:$.plan(),area:$.area()}),rg=new lc,ig=new pc(new zc),ag=new _c({map:new Tc(rg)},eg,tg,ig);new Jh(Qh,[new Kh(new Mh(Q),new Nh),new Kh(new Rh(Q,$h),new zh),new Kh(new Zp(Q,$h),new Vm),new Kh(new Wm(Q,$h),new Gm),new Kh(new Bh(Q),new Vh),new Kh(new ph(Q,$h,new Th,new Jm({floor:new Ym,layer:new hh}),new nh),new kh(ng,new ml(new Rp({clock:eg,motion:tg,canvases:new Vc({canvases:ig,tear:new Up(new Pc)}),sliders:new Vp,picks:new Uc,ride:new Fc,coast:new Ic},new Gh(document))),ag,{bands:new Yc({canvases:ig,clock:eg,motion:tg}),dive:new qc({canvases:ig,clock:eg,motion:tg}),pole:new ll({canvases:ig,clock:eg,motion:tg,picture:$.pole()}),views:new nc(()=>window.localStorage)}))],tg).start(Yh);