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
`,Me=`Hydroponic Bay|
Spore Farm|
Oxygen Sump|
Growth Chamber|
`,Ne=`Prayer Hall|
Ritual Chamber|
Archive|
Memory Well|
`,Pe=`Trading Floor|
Logic Market|
Credit Hub|
Supply Node|
`,Fe=`Power Plant|
Processing Core|
Maintenance Bay|
Fuel Depot|
`,Ie=`Security Station|burned DANGER
Barracks|
Armory|burned DANGER
Tactical Hub|
`,Le=`Laboratory|stamped DATA_VAULT
Neural Link Array|
Observation Deck|
Bio-Server|stamped DATA_VAULT
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
`,en=class{#e;constructor(){this.#e=Object.assign({"./names/buildings/adj/abyssal.txt":e,"./names/buildings/adj/baroque.txt":t,"./names/buildings/adj/gilded.txt":n,"./names/buildings/adj/monolith.txt":r,"./names/buildings/adj/neon.txt":i,"./names/buildings/adj/organic.txt":a,"./names/buildings/adj/rust.txt":o,"./names/buildings/adj/shogun.txt":s,"./names/buildings/adj/void.txt":c,"./names/buildings/adj/zenith.txt":l,"./names/buildings/compounds.txt":u,"./names/buildings/concepts.txt":d,"./names/buildings/index.txt":f,"./names/buildings/landmarks.txt":p,"./names/buildings/noun/abyssal.txt":m,"./names/buildings/noun/baroque.txt":h,"./names/buildings/noun/gilded.txt":ee,"./names/buildings/noun/monolith.txt":te,"./names/buildings/noun/neon.txt":ne,"./names/buildings/noun/organic.txt":re,"./names/buildings/noun/rust.txt":ie,"./names/buildings/noun/shogun.txt":ae,"./names/buildings/noun/void.txt":oe,"./names/buildings/noun/zenith.txt":se,"./names/buildings/sizes/index.txt":ce,"./names/buildings/sizes/large.txt":le,"./names/buildings/sizes/medium.txt":ue,"./names/buildings/sizes/small.txt":de,"./names/city/head.txt":fe,"./names/city/index.txt":pe,"./names/city/tail.txt":me,"./names/country/core.txt":he,"./names/country/index.txt":ge,"./names/country/prefix.txt":_e,"./names/country/suffix.txt":ve,"./names/filament/greek.txt":ye,"./names/filament/index.txt":be,"./names/filament/type.txt":xe,"./names/floors/index.txt":Se,"./names/floors/lobby.txt":Ce,"./names/floors/peak.txt":we,"./names/floors/zones/basement.txt":Te,"./names/floors/zones/executive.txt":Ee,"./names/floors/zones/index.txt":De,"./names/floors/zones/living.txt":Oe,"./names/planet/head.txt":ke,"./names/planet/index.txt":Ae,"./names/planet/tail.txt":je,"./names/rooms/Agricultural.txt":Me,"./names/rooms/Ceremonial.txt":Ne,"./names/rooms/Commercial.txt":Pe,"./names/rooms/Industrial.txt":Fe,"./names/rooms/Military.txt":Ie,"./names/rooms/Research.txt":Le,"./names/sector/descriptor.txt":Re,"./names/sector/index.txt":ze,"./names/sector/noun.txt":Be,"./names/solar-system/index.txt":Ve,"./names/solar-system/prefix.txt":He,"./names/solar-system/suffix.txt":Ue,"./names/street/adjective.txt":We,"./names/street/index.txt":Ge,"./names/street/noun.txt":Ke,"./themes/atmosphere/lighting/abyssal.txt":qe,"./themes/atmosphere/lighting/analog.txt":Je,"./themes/atmosphere/lighting/ancient.txt":Ye,"./themes/atmosphere/lighting/atomic.txt":Xe,"./themes/atmosphere/lighting/digital.txt":Ze,"./themes/atmosphere/lighting/entropic.txt":Qe,"./themes/atmosphere/lighting/future.txt":$e,"./themes/atmosphere/lighting/index.txt":et,"./themes/atmosphere/lighting/industrial.txt":tt,"./themes/atmosphere/lighting/singularity.txt":nt,"./themes/atmosphere/structures/Agricultural.txt":rt,"./themes/atmosphere/structures/Ceremonial.txt":it,"./themes/atmosphere/structures/Commercial.txt":at,"./themes/atmosphere/structures/Industrial.txt":ot,"./themes/atmosphere/structures/Military.txt":st,"./themes/atmosphere/structures/Research.txt":ct,"./themes/atmosphere/structures/Singularity.txt":lt,"./themes/atmosphere/structures/abyssal.txt":ut,"./themes/atmosphere/structures/index.txt":dt,"./themes/atmosphere/walls/abyssal.txt":ft,"./themes/atmosphere/walls/baroque.txt":pt,"./themes/atmosphere/walls/gilded.txt":mt,"./themes/atmosphere/walls/monolith.txt":ht,"./themes/atmosphere/walls/neon.txt":gt,"./themes/atmosphere/walls/organic.txt":_t,"./themes/atmosphere/walls/rust.txt":vt,"./themes/atmosphere/walls/shogun.txt":yt,"./themes/atmosphere/walls/void.txt":bt,"./themes/atmosphere/walls/zenith.txt":xt,"./themes/colours.txt":St,"./themes/conditions.txt":Ct,"./themes/cultures/abyssal.txt":wt,"./themes/cultures/baroque.txt":Tt,"./themes/cultures/gilded.txt":Et,"./themes/cultures/index.txt":Dt,"./themes/cultures/monolith.txt":Ot,"./themes/cultures/neon.txt":kt,"./themes/cultures/organic.txt":At,"./themes/cultures/rust.txt":jt,"./themes/cultures/shogun.txt":Mt,"./themes/cultures/void.txt":Nt,"./themes/cultures/zenith.txt":Pt,"./themes/descriptions/corridor.txt":Ft,"./themes/descriptions/floor.txt":It,"./themes/descriptions/index.txt":Lt,"./themes/doors/index.txt":Rt,"./themes/doors/inscriptions.txt":zt,"./themes/doors/materials.txt":Bt,"./themes/doors/states.txt":Vt,"./themes/index.txt":Ht,"./themes/planet-frames.txt":Ut,"./themes/timelines/analog.txt":Wt,"./themes/timelines/ancient.txt":Gt,"./themes/timelines/atomic.txt":Kt,"./themes/timelines/digital.txt":qt,"./themes/timelines/entropic.txt":Jt,"./themes/timelines/future.txt":Yt,"./themes/timelines/index.txt":Xt,"./themes/timelines/industrial.txt":Zt,"./themes/timelines/singularity.txt":Qt,"./themes/traits.txt":$t})}read(e){return this.#e[`./${e}`]}paths(){return Object.keys(this.#e).map(e=>e.replace(/^\.\//,``))}},tn=class{#e;#t=new Map;constructor(e){this.#e=e}index(e){return this.list(`${e}/index`)}has(e){return this.#t.has(e)||this.#e.read(`${e}.txt`)!==void 0}list(e){let t=this.#t.get(e);if(t!==void 0)return t;let n=this.#n(`${e}.txt`);return this.#t.set(e,n),n}pairs(e){return this.list(e).map(t=>{let n=t.indexOf(`|`);if(n<0)throw Error(`content file ${e}.txt: '${t}' is not a key|value line`);return[t.slice(0,n).trim(),t.slice(n+1).trim()]})}#n(e){let t=this.#e.read(e);if(t===void 0)throw Error(`content file is missing: ${e}`);let n=t.split(/\r?\n/).map(e=>e.trim()).filter(e=>e!==``);if(n.length===0)throw Error(`content file has no entries: ${e}`);return Object.freeze(n)}},nn=/^0(\.(0|[1-9]\d*))*$/,g=class e{#e;constructor(e){for(let t of e)if(!Number.isSafeInteger(t)||t<0)throw RangeError(`a child index is a whole number from zero up, got ${String(t)}`);this.#e=Object.freeze([...e])}static parse(t){if(!nn.test(t))return;let n=t.split(`.`).slice(1).map(Number);return n.every(e=>Number.isSafeInteger(e))?new e(n):void 0}child(t){return new e([...this.#e,t])}parent(){return this.#e.length===0?void 0:new e(this.#e.slice(0,-1))}indices(){return this.#e}depth(){return this.#e.length}equals(e){return this.toString()===e.toString()}toString(){return[`0`,...this.#e.map(String)].join(`.`)}},rn=1e3,an=100*rn-1,_=class{#e;#t;constructor(e){this.#e=e}callSign(){return this.name()}ordinal(){return this.index()+1}goesByNumber(){return!1}facts(){return[]}readings(){return[]}listing(){return this.children()}admits(e){return this.listing().includes(e)}arrival(){return this}arrive(){let e=this.arrival();return e===this?this:e.arrive()}current(){return!1}exit(){return this.parent()?.arrival()}leave(){return this.exit()}leaveLabel(){return`Leave ${this.kind().title()}`}moves(){return[]}move(e){if(this.moves().some(t=>t.id===e))throw Error(`${this.kind().key()} offers the move '${e}' but does not make it`)}remember(){}recall(e){return e===this.remember()}startOfJourney(){return this.children()[0]?.startOfJourney()??this}sealed(){return!1}landmark(){return!1}contents(){return null}findRelic(e){return this.contents()?.objects.find(t=>t.key()===e)}capture(e){if(this.contents()?.objects[e]!==void 0)throw Error(`${this.kind().key()} holds things but does not hand them over`)}drop(e){if(this.contents()!==null)throw Error(`${this.kind().key()} holds things but takes none in (${e.name()})`);return!1}root(){return this.parent()?.root()??this}indoors(){return this.parent()?.indoors()??!1}drainFactor(){return this.parent()?.drainFactor()??1}vibe(){return this.parent()?.vibe()}drainEra(){return this.vibe()?.era()}landmarkFactor(){return this.parent()?.landmarkFactor()??1}seed(){return this.#e.seed}parent(){return this.#e.parent}index(){return this.#e.index}address(){return this.parent()?.address().child(this.index())??new g([])}depth(){return this.address().depth()}hash(){let e=this.seed().branch(`coords`),t=t=>(e.branch(t).range(0,an)/rn).toFixed(3);return`${t(`x`)} / ${t(`y`)}`}trail(){return[...this.parent()?.trail()??[],this]}children(){return this.#t??=Object.freeze([...this.#e.children.childrenOf(this)]),this.#t}populated(){return this.#t!==void 0}descendant(e){let t=this.sealed()?void 0:this;for(let n of e.indices().slice(this.depth()))if(t=t?.children()[n],t?.sealed()===!0)return;return t}},v=class{#e;#t;#n;#r;constructor(e){this.#e=e.key,this.#t=e.title,this.#n=e.icon,this.#r=e.indexLabel}key(){return this.#e}title(){return this.#t}icon(){return this.#n}indexLabel(){return this.#r}equals(e){return this.#e===e.#e}},on=new v({key:`universe`,title:`Universe`,icon:`∞`,indexLabel:`ROOT`}),sn=class extends _{kind(){return on}name(){return`The Endless Universe`}description(){return[`A neural web of infinite complexity.`]}status(){return`UNIMATRIX_STABLE`}childrenHeading(){return`Primary filaments radiating from root:`}approachVerb(){return`Synchronize with`}},cn=new v({key:`apartment`,title:`Apartment`,icon:`🚪`,indexLabel:`UNIT`}),ln=`dealt`,un=class extends _{#e;#t;#n;#r;#i;#a;constructor(e,t){super(e),this.#e=t.door,this.#t=t.culture,this.#n=t.era,this.#r=t.anomaly,this.#i=t.rooms,this.#a=Object.freeze([...t.relics])}kind(){return cn}name(){return this.#e.description()}door(){return this.#e}culture(){return this.#t}era(){return this.#n}anomaly(){return this.#r}roomCount(){return this.#i}relics(){return this.#a}relicsIn(e){return this.#a.filter((t,n)=>this.seed().branch(ln).branch(n).range(0,this.#i-1)===e)}arrival(){return this.children()[0]??this}readings(){return[{key:`narrative`,label:`APPEARANCE`,value:this.#e.narrative()}]}description(){return[]}facts(){return this.#r?[{key:`alert`,label:`TEMPORAL_ANOMALY_DETECTED`,value:`[!]`}]:[{key:`era`,label:`TEMPORAL_MARKER`,value:this.#n.key()}]}status(){return this.#r?`ATMOS: [UNSTABLE]`:`ATMOS: [NOMINAL]`}childrenHeading(){return`Internal cells detected:`}approachVerb(){return`Enter Room:`}},dn=`hybrid`,fn=`-`,pn=` Hybrid`,mn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return`${dn}(${this.#e.key()}+${this.#t.key()})`}name(){let e=e=>e.name().split(` `)[0]??``;return`${e(this.#e)}${fn}${e(this.#t)}${pn}`}frequency(){return this.#e.frequency().plus(this.#t.frequency())}resonant(){return this.frequency().resonant()}data(){return{kind:dn,parts:[this.#e.data(),this.#t.data()]}}},hn=`relic`,gn=class{#e;constructor(e){this.#e=e}facts(){return this.#e}key(){return this.#e.relic.key()}name(){return this.#e.relic.name()}frequency(){return this.#e.frequency}resonant(){return this.#e.resonant}from(){return this.#e.from}data(){return{kind:hn,from:this.#e.from.toString(),key:this.#e.relic.key()}}},_n={[hn]:({from:e,key:t},n)=>{if(typeof e!=`string`||typeof t!=`string`)return;let r=g.parse(e);return r===void 0?void 0:n.descendant(r)?.findRelic(t)},[dn]:({parts:e},t,n)=>{if(!Array.isArray(e)||e.length!==2)return;let[r,i]=e,a=n.read(r,t),o=n.read(i,t);return a===void 0||o===void 0?void 0:new mn(a,o)}},vn=class{read(e,t){if(typeof e!=`object`||!e||Array.isArray(e))return;let n=e;return(typeof n.kind==`string`?_n[n.kind]:void 0)?.(n,t,this)}readAll(e,t){if(!Array.isArray(e))return;let n=[];for(let r of e){let e=this.read(r,t);if(e===void 0)return;n.push(e)}return n}},yn=11,bn={times:11,over:10},xn=class e{#e;constructor(e){if(!Number.isInteger(e)||e<0)throw RangeError(`a frequency is a whole number of hertz from zero up, got ${String(e)}`);this.#e=e}hertz(){return this.#e}plus(t){return new e(this.#e+t.#e)}amplified(){return new e(Math.floor(this.#e*bn.times/bn.over))}resonant(){return this.#e>0&&this.#e%yn===0}equals(e){return this.#e===e.#e}},Sn=new Set([`a`,`e`,`i`,`o`,`u`]),Cn=97,wn=new Set([11,22,33]),Tn=class{#e;constructor(e){let t=0;for(let n of e.toLowerCase())n<`a`||n>`z`||Sn.has(n)||(t+=n.charCodeAt(0)-Cn+1);this.#e=t}sum(){return this.#e}master(){return wn.has(this.#e)}frequencyAt(e){return new xn((this.master()?this.#e*2:this.#e)*e)}},En=Array.from(`█▓▒░/\\%!$#*`),Dn=class{mangle(e,t,n){return Array.from(e,(e,r)=>e===` `||e===`
`||!n.branch(r).probability(t)?e:n.branch(r).pick(En)).join(``)}},On=class{#e;constructor(e){this.#e=new Map(e.map(e=>[e.move.id,e]))}offered(e){return[...this.#e.values()].filter(t=>t.to(e)!==void 0).map(e=>e.move)}make(e,t){let n=this.#e.get(t),r=n?.to(e);return n!==void 0&&r!==void 0&&n.act?.(e),r}},kn=new v({key:`room`,title:`Room`,icon:`□`,indexLabel:`CELL`}),An=new Dn,jn={structure:.2,walls:.1,lighting:.3},Mn=`static`,Nn=new vn,Pn=new On([{move:{id:`back`,label:`Go back`,opposite:`forward`},to:e=>e.neighbour(-1)},{move:{id:`forward`,label:`Go forward`,opposite:`back`},to:e=>e.neighbour(1)}]),Fn=class extends _{#e;#t;#n;#r;#i;#a;#o=[];#s=[];constructor(e,t){super(e),this.#e=e.parent,this.#t=t.name,this.#n=t.category,this.#r=t.atmosphere,this.#i=t.traits,this.#a=Object.freeze([...t.furniture])}kind(){return kn}name(){return this.#t}type(){return this.#n.name()}category(){return this.#n}oxygen(){return this.#i.oxygen}temperature(){return this.#i.temperature}signal(){return this.#i.signal}atmosphere(){return this.#r}furniture(){return this.#a}objects(){return[...this.#c().map(e=>this.#l(e)),...this.#s]}contents(){return{objects:this.objects(),furniture:this.furniture()}}findRelic(e){let t=this.#e.relicsIn(this.index()).find(t=>t.key()===e);return t===void 0?void 0:this.#l(t)}capture(e){let t=this.#c();if(!Number.isInteger(e)||e<0)return;if(e<t.length){let n=t[e];return n===void 0?void 0:(this.#o.push(n.key()),{fragment:this.#l(n),fresh:!0})}let[n]=this.#s.splice(e-t.length,1);return n===void 0?void 0:{fragment:n,fresh:!1}}drop(e){return this.#s.push(e),!0}remember(){if(this.#o.length!==0||this.#s.length!==0)return JSON.stringify({taken:this.#o,dropped:this.#s.map(e=>e.data())})}recall(e){let t;try{t=JSON.parse(e)}catch{return!1}if(typeof t!=`object`||!t||Array.isArray(t))return!1;let{taken:n,dropped:r,...i}=t;if(Object.keys(i).length>0||!Array.isArray(n))return!1;let a=n,o=new Set(this.#e.relicsIn(this.index()).map(e=>e.key()));if(!a.every(e=>typeof e==`string`&&o.has(e))||new Set(a).size!==a.length)return!1;let s=Nn.readAll(r,this.root());return s===void 0||a.length===0&&s.length===0?!1:(this.#o.splice(0,this.#o.length,...a),this.#s.splice(0,this.#s.length,...s),!0)}#c(){return this.#e.relicsIn(this.index()).filter(e=>!this.#o.includes(e.key()))}#l(e){let t=this.vibe()?.culture(),n=t!==void 0&&this.#e.culture().equals(t),r=new Tn(e.name()).frequencyAt(this.depth());return new gn({relic:e,from:this.address(),frequency:n?r.amplified():r,resonant:n})}listing(){return[]}neighbour(e){return this.#e.children()[this.index()+e]}moves(){return Pn.offered(this)}move(e){return Pn.make(this,e)}exit(){return this.index()===0?this.#e.exit():void 0}leaveLabel(){return`Exit Apartment`}description(){let{structure:e,colour:t,walls:n,lighting:r}=this.#r,i=(e,t)=>this.#e.anomaly()?An.mangle(t,jn[e],this.seed().branch(Mn).branch(e)):t;return[`You are in ${i(`structure`,e)}. The walls are ${t} ${i(`walls`,n)}.`,`The space is illuminated by ${i(`lighting`,r)}.`]}facts(){return[{key:`reading`,label:`TYPE`,value:this.type()},{key:`reading`,label:`OXY`,value:`${String(this.#i.oxygen)}%`},{key:`reading`,label:`TEMP`,value:`${String(this.#i.temperature)}°C`},{key:`signal`,label:`SIGNAL`,value:this.#i.signal},this.#e.anomaly()?{key:`alert`,label:`RESONANCE`,value:`[DEGRADED]`}:{key:`stable`,label:`RESONANCE`,value:`[STABLE]`}]}status(){return`ATMOS: ${String(this.#i.oxygen)}% | TEMP: ${String(this.#i.temperature)}°C`}childrenHeading(){return``}approachVerb(){return``}},In=class{nth(e,t,n){let r=this.take(e,t,n+1).at(-1);if(r===void 0)throw RangeError(`a deal always deals`);return r}take(e,t,n){if(t.length===0)throw RangeError(`a deal needs at least one item`);let r=[];for(let i=0;r.length<n;i++){let a=[...t];for(let o=0;o<t.length&&r.length<n;o++){let t=e.branch(i).branch(o).range(0,a.length-1),n=a[t];if(n===void 0)throw RangeError(`a deal always deals`);r.push(n),a=a.filter((e,n)=>n!==t)}}return r}},Ln=`Stable`,Rn=class{#e;#t;#n;#r;constructor(e){this.#e=e.material,this.#t=e.state,this.#n=e.inscription,this.#r=e.told}material(){return this.#e}state(){return this.#t}inscription(){return this.#n}brief(){return this.#t===Ln?this.#e:`${this.#e} [${this.#t.toUpperCase()}]`}narrative(){let e=`${this.#r.material} ${this.#r.state}`;return this.#n===void 0?e:`${e} ${this.#n.narrative()}`}description(){return this.#n===void 0?this.brief():`${this.#n.formatted()} ${this.brief()}`}},zn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}word(){return this.#e}style(){return this.#t}formatted(){return this.#t.format(this.#e)}narrative(){return this.#t.narrative(this.#e)}},y=class{#e;#t;#n;#r;#i;constructor(e){this.#e=e.key,this.#t=e.before,this.#n=e.after,this.#r=e.lowered??!1,this.#i=e.applied}key(){return this.#e}format(e){return`${this.#t}${this.#r?e.toLowerCase():e}${this.#n}`}narrative(e){return`The word '${this.#r?e.toLowerCase():e}' is ${this.#i}.`}equals(e){return this.#e===e.#e}},Bn=[new y({key:`stamped`,before:`[`,after:`]`,applied:`stamped into the metal in block letters`}),new y({key:`scrawled`,before:`_`,after:`_`,lowered:!0,applied:`scrawled across the surface in jagged, desperate lines`}),new y({key:`etched`,before:`⟨`,after:`⟩`,applied:`finely etched into the frame, appearing almost as a structural glyph`}),new y({key:`burned`,before:`!! `,after:` !!`,applied:`burned into the material with a high-intensity plasma torch`})],Vn=`themes/doors`,Hn=.2,Un=class{#e;constructor(e){this.#e=e}of(e,t){let[n,r]=e.branch(`material`).pick(this.#e.pairs(`${Vn}/materials`)),[i,a]=e.branch(`state`).pick(this.#e.pairs(`${Vn}/states`));return new Rn({material:n,state:i,inscription:e.branch(`inscribed`).probability(Hn)?this.#t(e,t):void 0,told:{material:r,state:a}})}#t(e,t){return t.guarantee()??new zn(e.branch(`word`).pick(this.#e.list(`${Vn}/inscriptions`)),e.branch(`style`).pick(Bn))}},Wn=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}name(){return this.#t}equals(e){return this.#e===e.#e}},Gn=`themes/cultures`,Kn=`themes/timelines`,qn=[{key:`with`,join:(e,t)=>`${t} with ${e}`},{key:`infused`,join:(e,t)=>`${e} infused with ${t}`},{key:`fused`,join:(e,t)=>`${e} fused to ${t}`},{key:`grafted`,join:(e,t)=>`${t} grafted onto ${e}`}],Jn=class{#e;#t=new Map;constructor(e){this.#e=e}of(e,t){let n=`${e.key()}|${t.key()}`,r=this.#t.get(n);return r===void 0&&(r=Object.freeze(this.#n(e,t)),this.#t.set(n,r)),r}#n(e,t){let n=this.#e.list(`${Gn}/${e.key()}`),r=this.#e.list(`${Kn}/${t.key()}`);return[...n.flatMap(e=>r.flatMap(t=>qn.map(n=>new Wn(`${n.key}|${e}|${t}`,n.join(e,t))))),...n.map(e=>new Wn(`culture|${e}`,e)),...r.map(e=>new Wn(`era|${e}`,e))]}},Yn=`children`,b=class{#e;#t;#n;constructor(e,t,n){this.#e=e,this.#t=t===void 0?void 0:{...t,unit:t.unit??1},this.#n=n}of(e){return this.exactly(e,this.count(e.seed()))}count(e){if(this.#t===void 0)throw Error(`this progeny has no count range: use exactly()`);return e.branch(Yn).range(this.#t.min,this.#t.max)*this.#t.unit}exactly(e,t){return Array.from({length:t},(t,n)=>{let r=e.seed().branch(n);return this.#n(r).create({parent:e,seed:r,index:n,children:this.#e})})}},Xn=.01,Zn={min:1,max:10},Qn={min:5,max:19},$n=`relics`,er=class{#e;#t;#n;#r;#i=new In;constructor(e,t,n){this.#e=new Un(t),this.#t=n,this.#n=new b(e,Zn,()=>e.factoryFor(kn)),this.#r=new Jn(t)}kind(){return cn}create(e){let t=e.parent.vibe(),n=t?.mutation();if(t===void 0||n===void 0)throw Error(`an apartment takes its culture, era and trait from the country above: it needs one`);let r=e.seed.branch(`anomaly`).probability(Xn),i=r?t.culture():t.pickCulture(e.seed.branch(`culture`)),a=r?t.era():t.pickEra(e.seed.branch(`era`)),o=e.seed.branch($n);return new un(e,{door:this.#e.of(e.seed.branch(`door`),this.#t.categoryOf(e.seed.branch(0),n)),culture:i,era:a,anomaly:r,rooms:this.#n.count(e.seed),relics:this.#i.take(o,this.#r.of(i,a),o.range(Qn.min,Qn.max))})}populate(e){return this.#n.exactly(e,e.roomCount())}},tr=new v({key:`building`,title:`Building`,icon:`⌂`,indexLabel:`STRATA`}),nr=0,rr=class extends _{#e;#t;#n;#r;#i=nr;constructor(e,t){super(e),this.#e=t.name,this.#t=t.landmark,this.#n=t.floors,this.#r=t.doorsPerFloor}kind(){return tr}name(){return this.#e}landmark(){return this.#t}floors(){return this.#n}doorsPerFloor(){return this.#r}elevatorAt(){return this.#i}elevatorTo(e){this.#i=e}remember(){return this.#i===nr?void 0:String(this.#i)}recall(e){let t=Number(e);return!Number.isInteger(t)||t<0||t>=this.#n||String(t)!==e?!1:(this.#i=t,!0)}listing(){return[...this.children()].reverse()}admits(e){return this.children()[this.#i]===e}description(){return[`Analyzing vertical lattice structure...`]}facts(){let e=this.vibe()?.culture();return[...e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}],...this.#t?[{key:`alert`,label:`UNIQUE_LOCUS_DETECTION`,value:`MAJOR_LANDMARK_DISCOVERED`}]:[]]}status(){return`STRUCTURAL_STABLE`}indoors(){return!0}childrenHeading(){return`Building strata diagnostics:`}approachVerb(){return`Access:`}},ir=new On([{move:{id:`elevator`,label:`Back to Elevator`,opposite:`corridor`},to:e=>e,act:e=>{e.returnToElevator()}}]),ar=class{id(){return`corridor`}listing(e){return e.corridor().listing()}admits(e,t){return t===e.corridor()}moves(e){return ir.offered(e)}move(e,t){return ir.make(e,t)}facts(e){return e.corridor().facts()}description(e){return e.corridor().description()}status(e){return e.corridor().status()}childrenHeading(e){return e.corridor().childrenHeading()}approachVerb(e){return e.corridor().approachVerb()}},or=new On([{move:{id:`up`,label:`Go Up`,opposite:`down`},to:e=>e.neighbour(1)},{move:{id:`down`,label:`Go Down`,opposite:`up`},to:e=>e.neighbour(-1)},{move:{id:`corridor`,label:`Enter Corridor`,opposite:`elevator`},to:e=>e,act:e=>{e.enterCorridor()}}]),sr=2,cr=class{id(){return`elevator`}listing(){return[]}admits(){return!1}moves(e){return or.offered(e)}move(e,t){return or.make(e,t)}facts(e){let t=e.vibe();return t===void 0?[]:[{key:`era`,label:`TECH_ERA`,value:t.era().key()},{key:`culture`,label:`RESONANCE`,value:t.culture().key()},{key:`reading`,label:`STABILITY`,value:`${(t.stability()*100).toFixed(sr)}%`},{key:`trait`,label:`ATMOS_SHIFT`,value:t.mutation()?.key()??`Standard`}]}description(e){return[`${e.name()}. ${e.sentence()}`,`Local signal is STABLE. Corridor access authorized.`]}status(){return`SYSTEM_DIAGNOSTIC: [NOMINAL]`}childrenHeading(){return``}approachVerb(){return``}},lr=new v({key:`floor`,title:`Floor`,icon:`▤`,indexLabel:`Z-AXIS`}),x=new cr,ur=new ar,dr=new Map([x,ur].map(e=>[e.id(),e])),fr={min:1e3,max:2999},pr=`100%`,mr=class extends _{#e;#t;#n;#r;#i=x;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.number,this.#n=t.zone,this.#r=t.sentence}kind(){return lr}number(){return this.#t}name(){return`Floor ${String(this.#t)}`}callSign(){return this.#t===0?`Lobby`:this.#t===this.#e.floors()-1?`Peak`:this.name()}ordinal(){return this.#t}goesByNumber(){return!0}arrive(){return this.#e.elevatorTo(this.#t),this}current(){return this.#e.elevatorAt()===this.#t}zone(){return this.#n}sentence(){return this.#r}resonance(){return this.seed().branch(`resonance`).range(fr.min,fr.max)}readings(){return[{key:`zone`,label:`FUNCTION`,value:this.#n},{key:`reading`,label:`ST`,value:pr},{key:`reading`,label:`RES`,value:`${String(this.resonance())}Hz`}]}building(){return this.#e}corridor(){let e=this.children()[0];if(e===void 0)throw Error(`${this.name()} has no corridor`);return e}neighbour(e){let t=this.#t+e;return t<0||t>=this.#e.floors()?void 0:this.#e.children()[t]}enterCorridor(){this.#i=ur}returnToElevator(){this.#i=x}listing(){return this.#i.listing(this)}admits(e){return this.#i.admits(this,e)}moves(){return this.#i.moves(this)}move(e){return this.#i.move(this,e)}leave(){return this.returnToElevator(),this.exit()}remember(){return this.#i===x?void 0:this.#i.id()}recall(e){let t=dr.get(e);return t!==void 0&&(this.#i=t,!0)}facts(){return this.#i.facts(this)}description(){return this.#i.description(this)}status(){return this.#i.status(this)}childrenHeading(){return this.#i.childrenHeading(this)}approachVerb(){return this.#i.approachVerb(this)}},S=`names/buildings`,hr=300,gr=5,_r=50,vr=2500,yr=1500,br=4094,xr=[10,20],Sr=class{#e;constructor(e){this.#e=e}nameOf(e,t){let n=e.branch(`name`),r=n.branch(`rarity`).range(0,9999),i=this.landmarkChance(t.depth,t.landmarkFactor);if(r<i)return{name:n.branch(`landmark`).pick(this.#e.list(`${S}/landmarks`)),landmark:!0};let a=n.branch(`pattern`).range(0,1);return{name:r<i+yr?this.#t(n,a,t):this.#r(n,a,t.culture),landmark:!1}}landmarkChance(e,t){let n=hr+Math.max(0,e-gr)*_r;return Math.min(vr,n*t)}#t(e,t,n){if(t===0)return`Unit 0x${e.branch(`serial`).range(0,br).toString(16).toUpperCase()} ${e.branch(`size-word`).pick(this.#n(n.floors))}`;let r=e.branch(`concept`).pick(this.#e.list(`${S}/concepts`));return`The ${this.#i(e,n.culture)} of ${r}`}#n(e){let t=this.#e.index(`${S}/sizes`),n=xr.filter(t=>e>=t).length,r=t[Math.min(n,t.length-1)];if(r===void 0)throw Error(`${S}/sizes/index names no list`);return this.#e.list(`${S}/sizes/${r}`)}#r(e,t,n){if(t===0)return`${e.branch(`adjective`).pick(this.#e.list(`${S}/adj/${n.key()}`))} ${this.#i(e,n)}`;let r=e.branch(`compound`).pick(this.#e.list(`${S}/compounds`));return`${this.#i(e,n)}${r}`}#i(e,t){return e.branch(`noun`).pick(this.#e.list(`${S}/noun/${t.key()}`))}},Cr={min:0,max:99},wr=[{upTo:40,size:{floors:{min:3,max:10},doors:{min:2,max:6}}},{upTo:70,size:{floors:{min:10,max:25},doors:{min:4,max:10}}},{upTo:90,size:{floors:{min:30,max:50},doors:{min:8,max:16}}},{upTo:Cr.max,size:{floors:{min:50,max:100},doors:{min:10,max:20}}}],Tr=class{bandFor(e){let t=Number.isInteger(e)&&e>=Cr.min?wr.find(t=>e<=t.upTo):void 0;if(t===void 0)throw RangeError(`a size roll is a whole number from 0 to 99, not ${String(e)}`);return t.size}bandOf(e){return this.bandFor(e.branch(`size`).range(Cr.min,Cr.max))}floorsOf(e){let t=this.bandOf(e).floors;return e.branch(`floors`).range(t.min,t.max)}doorsPerFloorOf(e){let t=this.bandOf(e).doors;return e.branch(`doors`).range(t.min,t.max)}},Er=class{#e;#t=new Tr;#n;constructor(e,t){this.#e=new Sr(t),this.#n=new b(e,void 0,()=>e.factoryFor(lr))}kind(){return tr}create(e){let t=e.parent,n=t?.vibe()?.culture();if(t===void 0||n===void 0)throw Error(`a building is named in the culture of its street: it needs a street under a planet`);let r=this.#t.floorsOf(e.seed),i=this.#e.nameOf(e.seed,{culture:n,floors:r,depth:t.depth(),landmarkFactor:t.landmarkFactor()});return new rr(e,{name:i.name,landmark:i.landmark,floors:r,doorsPerFloor:this.#t.doorsPerFloorOf(e.seed)})}populate(e){return this.#n.exactly(e,e.floors())}},Dr=new v({key:`city`,title:`City`,icon:`🏙`,indexLabel:`DISTRICT`}),Or=class extends _{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.rebelVibe}kind(){return Dr}name(){return this.#e}vibe(){return this.#t??super.vibe()}description(){return[this.#t===void 0?`A stable regional node connected to the planetary lattice.`:`The air is thick with illegal data-streams and shifting static.`]}facts(){return this.#t===void 0?[]:[{key:`alert`,label:`UNAUTHORIZED_ZONE`,value:`UNAUTHORIZED_RESONANCE_DETECTED`}]}status(){return this.#t===void 0?`STABILITY: [STABLE]`:`STABILITY: [VOLATILE]`}childrenHeading(){return`Streets detected in this city:`}approachVerb(){return`Go to`}},kr=new v({key:`street`,title:`Street`,icon:`═`,indexLabel:`WAY`}),Ar=class extends _{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return kr}name(){return this.#e}description(){return[`Buildings stand in pairs along both sides of the way.`]}facts(){let e=this.vibe();return e===void 0?[]:[{key:`era`,label:`TECH_ERA`,value:e.era().key()},{key:`culture`,label:`RESONANCE`,value:e.culture().key()}]}status(){return`SYNC: [STABLE]`}childrenHeading(){return`Buildings on this street:`}approachVerb(){return`Enter Building:`}startOfJourney(){return this}},jr=`name`,C=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}words(e){return this.#e.index(this.#t).map(t=>this.naming(e).branch(t).pick(this.#e.list(`${this.#t}/${t}`)))}naming(e){return e.branch(jr)}},Mr=.1,Nr=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/city`),this.#t=new b(e,{min:3,max:15},()=>e.factoryFor(kr))}kind(){return Dr}create(e){let t=e.seed.branch(`rebel`).probability(Mr);return new Or(e,{name:this.#e.words(e.seed).join(``),rebelVibe:t?e.parent?.vibe()?.rebel():void 0})}populate(e){return this.#t.of(e)}},Pr=new v({key:`corridor`,title:`Corridor`,icon:`▅`,indexLabel:`CONDUIT`}),Fr=class extends _{#e;#t;constructor(e,t){super(e),this.#e=e.parent,this.#t=t.sentence}kind(){return Pr}name(){return`Corridor`}floor(){return this.#e}arrival(){return this.#e}description(){return[`${this.#t}.`]}facts(){let e=this.vibe()?.culture();return e===void 0?[]:[{key:`culture`,label:`THEME`,value:e.key()}]}status(){return`TRAFFIC: [STABLE] | THEME: [${this.vibe()?.culture().key().toUpperCase()??`UNKNOWN`}]`}childrenHeading(){return`Local access list:`}approachVerb(){return`Access:`}},Ir=`themes/descriptions`,Lr=`sentence`,Rr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}dealt(e){return e.branch(Lr).pick(this.#e.list(`${Ir}/${this.#t}`))}},zr=class{#e;#t;constructor(e,t){this.#e=new Rr(t,`corridor`),this.#t=new b(e,void 0,()=>e.factoryFor(cn))}kind(){return Pr}create(e){return new Fr(e,{sentence:this.#e.dealt(e.seed)})}populate(e){return this.#t.exactly(e,e.floor().building().doorsPerFloor())}},Br=new v({key:`country`,title:`Country`,icon:`⬚`,indexLabel:`REGION`}),Vr=class extends _{#e;#t;#n;constructor(e,t){super(e),this.#e=t.name,this.#t=t.trait,this.#n=t.vibe}kind(){return Br}name(){return this.#e}vibe(){return this.#n??super.vibe()}description(){return[`A vast administrative region governed by the ${this.#t.key()} directive.`]}facts(){return[{key:`trait`,label:`Sector Mutation`,value:this.#t.key()}]}status(){return`TRAIT: [${this.#t.key().toUpperCase()}]`}childrenHeading(){return`Regional cities identified:`}approachVerb(){return`Travel to`}},Hr={min:-100,max:100,scale:1e3},Ur=class{#e;#t;#n;constructor(e,t,n){this.#e=new C(t,`names/country`),this.#t=n,this.#n=new b(e,{min:2,max:10},()=>e.factoryFor(Dr))}kind(){return Br}create(e){let t=e.seed.branch(`trait`).pick(this.#t.traits()),n=e.seed.branch(`stability`).range(Hr.min,Hr.max)/Hr.scale;return new Vr(e,{name:this.#e.words(e.seed).join(` `),trait:t,vibe:e.parent?.vibe()?.mutate(t,n)})}populate(e){return this.#n.of(e)}},Wr=new v({key:`filament`,title:`Cosmic filament`,icon:`»`,indexLabel:`CONDUIT`}),Gr=class extends _{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.conduitId}kind(){return Wr}name(){return this.#e}description(){return[`A massive neural conduit pulsing with bio-digital energy. [CONDUIT_ID: ${this.#t}]`]}status(){return`SYNC: [NODE_RELIABILITY_HIGH]`}childrenHeading(){return`Galactic sectors within this conduit:`}approachVerb(){return`Pulse to`}},Kr=new v({key:`sector`,title:`Galactic sector`,icon:`○`,indexLabel:`SECTOR`}),qr=class extends _{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Kr}name(){return this.#e}callSign(){return`MATTER_CLUSTER: ${this.#e}`}description(){return[`A dense cluster of celestial bodies within the neural web.`]}status(){return`GRID: [LATTICE_SYNC_OK]`}childrenHeading(){return`Solar systems within proximity:`}approachVerb(){return`Transition to System:`}},Jr=new v({key:`null-reach`,title:`Null reach`,icon:`○`,indexLabel:`VOID`}),Yr=2,Xr=class extends _{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return Jr}name(){return this.#e}callSign(){return`VOID_REACH: ${this.#e}`}description(){return[`A pocket of absolute silence. Only the echoes of distant, dead civilizations remain.`]}facts(){return[{key:`signal`,label:`VOID_STATUS`,value:`Searching for signals...`}]}status(){return`SIGNAL: [SCAN_REQUIRED]`}childrenHeading(){return`Faint gravitational anomalies detected:`}approachVerb(){return`Detect faint signal:`}hash(){return`0x0000 / UNKNOWN`}landmarkFactor(){return super.landmarkFactor()*Yr}},Zr=.3,Qr=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/filament`),this.#t=new b(e,{min:4,max:8},t=>e.factoryFor(t.branch(`null-roll`).probability(Zr)?Jr:Kr))}kind(){return Wr}create(e){let[t,n]=this.#e.words(e.seed),r=this.#e.naming(e.seed).branch(`number`).range(0,998),i=e.seed.branch(`conduit`).range(0,65534);return new Gr(e,{name:`${String(t)}-${String(r)}-${String(n)}`,conduitId:`0x${i.toString(16)}`})}populate(e){return this.#t.of(e)}},w=`names/floors`,$r=5,ei=5,ti=class{#e;constructor(e){this.#e=e}zoneOf(e,t,n){if(t===0)return this.#t(`${w}/lobby`);if(t===n-1)return this.#t(`${w}/peak`);let r=this.#e.index(`${w}/zones`),i=r[t<$r?0:t>n-ei?r.length-1:1];if(i===void 0)throw Error(`${w}/zones/index names too few lists`);return e.branch(`zone`).pick(this.#e.list(`${w}/zones/${i}`))}#t(e){let[t,...n]=this.#e.list(e);if(t===void 0||n.length>0)throw Error(`${e}.txt holds exactly one word`);return t}},ni=class{#e;#t;#n;constructor(e,t){this.#e=new ti(t),this.#t=new Rr(t,`floor`),this.#n=new b(e,void 0,()=>e.factoryFor(Pr))}kind(){return lr}create(e){let t=e.parent,n=t.vibe()?.culture().key().toUpperCase()??`UNKNOWN`;return new mr(e,{number:e.index,zone:this.#e.zoneOf(e.seed,e.index,t.floors()),sentence:this.#t.dealt(e.seed).replace(`{culture}`,n)})}populate(e){return this.#n.exactly(e,1)}},T=new v({key:`solar-system`,title:`Solar system`,icon:`☼`,indexLabel:`RADII`}),ri=class extends _{#e;constructor(e,t){super(e),this.#e=t.name}kind(){return T}name(){return this.#e}description(){return[`A star holding its resonant nodes in orbit.`]}status(){return`SYNC: [RESONANT_NODES_STABLE]`}childrenHeading(){return`Orbital bodies within range:`}approachVerb(){return`Land on`}},ii=class{#e;constructor(e){this.#e=new b(e,{min:1,max:2},()=>e.factoryFor(T))}kind(){return Jr}create(e){return new Xr(e,{name:`Null Reach ${e.seed.branch(`name`).range(0,4094).toString(16).toUpperCase()}`})}populate(e){return this.#e.of(e)}},ai=new v({key:`planet`,title:`Planet`,icon:`⊕`,indexLabel:`ORBIT`}),oi=class extends _{#e;#t;constructor(e,t){super(e),this.#e=t.name,this.#t=t.vibe}kind(){return ai}name(){return this.#e}vibe(){return this.#t}description(){return[`A world on the surface layer of the lattice, tuned to one culture and one era.`]}facts(){return[{key:`culture`,label:`RESONANCE`,value:this.#t.culture().key()},{key:`era`,label:`TIMELINE`,value:this.#t.era().key()}]}status(){return`RESONANCE: [${this.#t.culture().key().toUpperCase()}]`}childrenHeading(){return`Planetary landmasses scanned:`}approachVerb(){return`Visit`}},si=.85,ci=.1,li=.9,ui=class e{#e;constructor(e){this.#e={...e,stability:e.stability??si,mutation:e.mutation,frame:e.frame??e.culture.frame()}}culture(){return this.#e.culture}era(){return this.#e.era}secondCulture(){return this.#e.secondCulture}secondEra(){return this.#e.secondEra}stability(){return this.#e.stability}mutation(){return this.#e.mutation}frame(){return this.#e.frame}pickCulture(e){return e.probability(this.#e.stability)?this.#e.culture:this.#e.secondCulture}pickEra(e){return e.probability(this.#e.stability)?this.#e.era:this.#e.secondEra}mutate(t,n){let r=Math.max(ci,Math.min(li,this.#e.stability+n));return new e({...this.#e,stability:r,mutation:t})}rebel(){return new e({...this.#e,culture:this.#e.secondCulture,secondCulture:this.#e.culture,era:this.#e.secondEra,secondEra:this.#e.era})}},di=class{#e;#t;#n;constructor(e,t,n){this.#e=new C(t,`names/planet`),this.#t=n,this.#n=new b(e,{min:2,max:8},()=>e.factoryFor(Br))}kind(){return ai}create(e){return new oi(e,{name:this.#e.words(e.seed).join(``),vibe:this.#r(e.seed)})}populate(e){return this.#n.of(e)}#r(e){let t=e.branch(`vibe`),n=t.branch(`culture`).pick(this.#t.surfaceCultures()),r=t.branch(`era`).pick(this.#t.eras()),i=this.#t.surfaceCultures().filter(e=>!e.equals(n)),a=this.#t.eras().filter(e=>!e.equals(r));return new ui({culture:n,era:r,secondCulture:i.length===0?n:t.branch(`second-culture`).pick(i),secondEra:a.length===0?r:t.branch(`second-era`).pick(a)})}},fi=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}name(){return this.#e}guarantee(){return this.#t}equals(e){return this.#e===e.#e}},pi=`names/rooms`,mi=class{#e;#t=new Map;constructor(e){this.#e=e}allowedBy(e){let t=this.#t.get(e.key());return t===void 0&&(t=Object.freeze(this.#e.pairs(`${pi}/${e.key()}`).map(([e,t])=>new fi(e,this.#n(t)))),this.#t.set(e.key(),t)),t}categoryOf(e,t){return e.branch(`category`).pick(this.allowedBy(t))}#n(e){if(e===``)return;let t=e.indexOf(` `),n=Bn.find(n=>n.key()===e.slice(0,t));if(t<0||n===void 0)throw Error(`${pi}: '${e}' is not '<style> <WORD>' with a known style`);return new zn(e.slice(t+1),n)}},E=`themes/atmosphere`,hi=`themes/cultures`,gi=`themes/timelines`,_i=`themes/colours`,vi=`glitch`,yi=.05,bi=.5,xi=[`abyssal`,`Singularity`],Si=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}of(e,t){let n=e.branch(vi),r=t.anomaly||n.probability(yi),i=e=>r&&n.branch(e).probability(bi),a=this.#e.index(hi),o=this.#e.index(gi),s=i(`walls`)?n.branch(`walls`).pick(a):t.culture.key(),c=i(`lighting`)?n.branch(`lighting`).pick(o):t.era.key(),l=i(`structure`)?n.branch(`structure`).pick(xi):t.trait.key();return{structure:e.branch(`structure`).pick(this.#n(`structures`,l,`${E}/structures`)),colour:e.branch(`colour`).pick(this.#e.list(_i)),walls:e.branch(`walls`).pick(this.#n(`walls`,s,hi)),lighting:e.branch(`lighting`).pick(this.#n(`lighting`,c,`${E}/lighting`))}}#n(e,t,n){let r=`${E}/${e}/${t}`;if(this.#e.has(r))return this.#e.list(r);let i=this.#e.index(n)[0]??``;return this.#t.warn(`[THEME_WARN] no ${e} file for '${t}' — falling back to '${i}' (${r}.txt)`),this.#e.list(`${E}/${e}/${i}`)}},Ci=`themes/conditions`,wi=`themes/cultures`,Ti=`pieces`,Ei=`condition`,Di=class{#e;#t=new In;constructor(e){this.#e=e}of(e,t,n){let r=this.#e.list(Ci),i=this.#e.list(`${wi}/${t.key()}`);return this.#t.take(e.branch(Ti),i,Math.min(n,i.length)).map((t,n)=>{let i=e.branch(Ei).branch(n).range(0,r.length-1);return t.startsWith(`${r[i]??``} `)&&(i=(i+1)%r.length),`${r[i]??``} ${t}`})}},Oi=`names/buildings/adj`,ki={min:12,max:21},Ai={min:5,max:25},ji=[`[SHIELDED]`,`[CLEAR]`],Mi={min:1,max:3},Ni=class{#e;#t;#n;#r;#i=new In;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=new Si(e,n),this.#r=new Di(e)}kind(){return kn}create(e){let t=e.parent,n=t.vibe()?.mutation();if(n===void 0)throw Error(`a room takes its category from the country above: it needs one`);let r=this.#t.categoryOf(e.seed,n);return new Fn(e,{name:`${this.#i.nth(t.seed().branch(`adjectives`),this.#e.list(`${Oi}/${t.culture().key()}`),e.index)} ${r.name()}`,category:r,atmosphere:this.#n.of(e.seed,{culture:t.culture(),era:t.era(),trait:n,anomaly:t.anomaly()}),traits:{oxygen:e.seed.branch(`oxygen`).range(ki.min,ki.max),temperature:e.seed.branch(`temperature`).range(Ai.min,Ai.max),signal:e.seed.branch(`signal`).pick(ji)},furniture:this.#r.of(e.seed.branch(`furniture`),t.culture(),e.seed.branch(`furniture`).range(Mi.min,Mi.max))})}populate(){return[]}},Pi=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/sector`),this.#t=new b(e,{min:3,max:7},()=>e.factoryFor(T))}kind(){return Kr}create(e){let t=this.#e.naming(e.seed).branch(`number`).range(0,98);return new qr(e,{name:`${this.#e.words(e.seed).join(` `)} ${String(t)}`})}populate(e){return this.#t.of(e)}},Fi=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/solar-system`),this.#t=new b(e,{min:2,max:10},()=>e.factoryFor(ai))}kind(){return T}create(e){return new ri(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Ii=class{#e;#t;constructor(e,t){this.#e=new C(t,`names/street`),this.#t=new b(e,{min:2,max:10,unit:2},()=>e.factoryFor(tr))}kind(){return kr}create(e){return new Ar(e,{name:this.#e.words(e.seed).join(` `)})}populate(e){return this.#t.of(e)}},Li=class{#e;constructor(e){this.#e=new b(e,{min:3,max:7},()=>e.factoryFor(Wr))}kind(){return on}create(e){return new sn(e)}populate(e){return this.#e.of(e)}},Ri=class{#e;constructor(e,t,n){let r=new mi(e),i=[new Li(this),new Qr(this,e),new Pi(this,e),new ii(this),new Fi(this,e),new di(this,e,t),new Ur(this,e,t),new Nr(this,e),new Ii(this,e),new Er(this,e),new ni(this,e),new zr(this,e),new er(this,e,r),new Ni(e,r,n)];this.#e=new Map(i.map(e=>[e.kind().key(),e]))}universe(e){return this.factoryFor(on).create({parent:void 0,seed:e,index:0,children:this})}kinds(){return[...this.#e.values()].map(e=>e.kind())}factoryFor(e){let t=this.#e.get(e.key());if(t===void 0)throw Error(`no factory is registered for the kind '${e.key()}'`);return t}childrenOf(e){return this.factoryFor(e.kind()).populate(e)}},zi=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}key(){return this.#e}frame(){return this.#t}equals(e){return this.#e===e.#e}},Bi=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Vi=class{#e;constructor(e){this.#e=e}key(){return this.#e}equals(e){return this.#e===e.#e}},Hi=`themes/planet-frames`,Ui=`themes/timelines`,Wi=`themes/traits`,Gi=class{#e;#t;#n;#r;constructor(e){this.#e=e}surfaceCultures(){return this.#t??=Object.freeze(this.#e.pairs(Hi).map(([e,t])=>new zi(e,t))),this.#t}eras(){return this.#n??=Object.freeze(this.#e.index(Ui).map(e=>new Bi(e))),this.#n}traits(){return this.#r??=Object.freeze(this.#e.list(Wi).map(e=>new Vi(e))),this.#r}},Ki=/^([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})$/i,qi=2**53,D=`#`,Ji=`${D}range`,Yi=`${D}pick`,Xi=`${D}probability`,Zi=class e{#e;#t;constructor(e,t){this.#e=e>>>0,this.#t=t>>>0}static parse(t){let n=Ki.exec(t.trim());if(n===null)return;let r=n.slice(1).join(``);return new e(Number.parseInt(r.slice(0,8),16),Number.parseInt(r.slice(8),16))}branch(e){if(typeof e==`number`){if(!Number.isSafeInteger(e))throw RangeError(`a number key is a whole number, got ${String(e)}`);return this.#n(`${D}n:${String(e)}`)}if(e.startsWith(D))throw RangeError(`keys starting with '${D}' are reserved for Seed itself, got '${e}'`);return this.#n(e)}#n(t){let n=(this.#e^2654435769)>>>0,r=(this.#t^2135587861)>>>0;n=Math.imul(n^r>>>15,2246822507),r=Math.imul(r^n>>>13,3266489909);for(let e=0;e<t.length;e++){let i=t.charCodeAt(e);n=Math.imul(n^i,2654435761),r=Math.imul(r^i,1597334677),n=n<<13|n>>>19,r=r<<17|r>>>15}return n^=t.length,n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,668265263)^r>>>15,new e(n,r)}range(e,t){if(!Number.isInteger(e)||!Number.isInteger(t)||t<e)throw RangeError(`range needs whole numbers with min <= max, got ${String(e)}..${String(t)}`);return e+Math.floor(this.#n(Ji).#r()*(t-e+1))}pick(e){let t=e[Math.floor(this.#n(Yi).#r()*e.length)];if(t===void 0)throw RangeError(`pick needs a list with at least one item`);return t}probability(e){if(!(e>=0&&e<=1))throw RangeError(`probability needs a chance in [0, 1], got ${String(e)}`);return this.#n(Xi).#r()<e}equals(e){return this.#e===e.#e&&this.#t===e.#t}toString(){let e=(this.#e.toString(16).padStart(8,`0`)+this.#t.toString(16).padStart(8,`0`)).toUpperCase();return`${e.slice(0,4)}-${e.slice(4,8)}-${e.slice(8,12)}-${e.slice(12)}`}#r(){return(this.#e*2097152+(this.#t>>>11))/qi}},O=100,k=0,Qi=[{key:`stable`,from:70},{key:`degraded`,from:30},{key:`critical`,from:k}],$i=40,A=class e{#e;static range(){return{min:k,max:O}}static edges(){let e=new Set([O,1]);for(let t of[...Qi.map(e=>e.from),$i])t<=k||(e.add(t),e.add(t-1));return[...e].sort((e,t)=>t-e)}constructor(e=O){if(!Number.isInteger(e)||e<k||e>O)throw RangeError(`coherence is a whole number from ${String(k)} to ${String(O)}, got ${String(e)}`);this.#e=e}value(){return this.#e}drained(t){return new e(Math.max(k,this.#e-t))}restored(t){return new e(Math.min(O,this.#e+t))}exhausted(){return this.#e===k}band(){return Qi.find(e=>this.#e>=e.from)?.key??`critical`}corrupting(){return this.#e<$i}equals(e){return this.#e===e.#e}},ea=5,ta=class e{#e;#t;#n;#r;#i;#a;#o;#s;constructor(e){this.#e=e.seed,this.#t=e.address,this.#n=new Map(e.states??[]),this.#r=e.coherence??new A().value(),this.#i=e.steps??0,this.#a=[...e.visited??[]],this.#o=[...e.buffer??[]],this.#s=e.resonant??0}static parse(t){if(t===void 0)return;let n;try{n=JSON.parse(t)}catch{return}if(typeof n!=`object`||!n)return;let{version:r,seed:i,path:a,states:o,coherence:s,steps:c,visited:l,buffer:u,resonant:d}=n;if(r!==ea||typeof i!=`string`)return;let f=Zi.parse(i),p=e.#l(o),m=e.#u(l),h=e.#c(u);if(f===void 0||p===void 0||m===void 0||h===void 0||!e.#d(s)||!e.#f(c)||!e.#f(d))return;let ee=typeof a==`string`?g.parse(a):void 0;if(a!==null&&ee===void 0)return;let te=new A().value();if(ee!==void 0||s===te&&c===0&&m.length===0&&p.size===0&&h.length===0&&d===0)return new e({seed:f,address:ee,states:p,coherence:s,steps:c,visited:m,buffer:h,resonant:d})}static#c(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`object`||!n||Array.isArray(n))return;let e=n;if(typeof e.kind!=`string`)return;t.push(e)}return t}static#l(e){if(typeof e!=`object`||!e||Array.isArray(e))return;let t=Object.entries(e),n=new Map;for(let[e,r]of t){if(g.parse(e)===void 0||typeof r!=`string`)return;n.set(e,r)}return n}static#u(e){if(!Array.isArray(e))return;let t=[];for(let n of e){if(typeof n!=`string`||g.parse(n)===void 0)return;t.push(n)}return new Set(t).size===t.length?t:void 0}static#d(e){if(typeof e!=`number`)return!1;try{return new A(e),!0}catch{return!1}}static#f(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0}seed(){return this.#e}address(){return this.#t}states(){return this.#n}coherence(){return this.#r}steps(){return this.#i}visited(){return this.#a}buffer(){return this.#o}resonant(){return this.#s}toText(){return JSON.stringify({version:ea,seed:this.#e.toString(),path:this.#t?.toString()??null,states:Object.fromEntries(this.#n),coherence:this.#r,steps:this.#i,visited:this.#a,buffer:this.#o,resonant:this.#s})}};function j(e,t,n){return{id:e,key:t,label:n,place:``,role:`system`,sealed:!1,landmark:!1,ordinal:``,readings:[],opposite:``,current:!1,visited:!1}}var na=`buffer`,ra=`pick:`,ia=`drop:`,aa=`close`,oa=Array.from({length:9},(e,t)=>String(t+1)),sa=class{#e;#t;constructor(e){this.#e=e}summary(){return{id:na,outcome:``,figures:{selected:this.#t===void 0?``:String(this.#t)}}}options(){let e=this.#e.player().buffer().fragments(),t=this.#e.here()?.contents()!==null,n=e=>this.#t===void 0?`Select`:this.#t===e?`Unselect`:`Merge`;return[...e.flatMap((e,r)=>{let i=String(r+1),a={...j(`${ra}${String(r)}`,oa[r]??``,n(r)),role:`pick`,ordinal:i},o={...j(`${ia}${String(r)}`,``,`Drop here`),role:`drop`,ordinal:i};return t?[a,o]:[a]}),{...j(aa,`b`,`Back to reality`),role:`return`}]}answer(e){if(!this.options().some(t=>t.id===e))return;if(e===aa)return{message:``,done:!0};if(e.startsWith(ra))return{message:this.#n(Number(e.slice(5))),done:!1};let t=this.#e.drop(Number(e.slice(5)));return this.#t=void 0,{message:t===void 0?``:`Dropped ${t.name()} here.`,done:!1}}#n(e){let t=this.#t;if(t===void 0)return this.#t=e,``;if(this.#t=void 0,t===e)return``;let n=this.#e.merge(t,e);if(n===void 0)return``;let r=n.resonant()?` Resonance detected.`:``;return`Synthesis complete: ${n.name()} (${String(n.frequency().hertz())} Hz). Coherence +15.${r}`}},ca=`corrupt`,la=.1,ua=class{#e=new Dn;read(e,t,n){if(!t.corrupting())return e;let r=n.branch(ca);return e.map((e,t)=>this.#e.mangle(e,la,r.branch(t)))}},da=1,fa=new Map([[`entropic`,2]]),pa=class{cost(e){let t=e.drainEra()?.key()??``;return da*(fa.get(t)??1)*e.drainFactor()}},ma=`frame`,ha=class{of(e,t){return e.seed().branch(ma).branch(t)}},M=16,ga=class{#e;constructor(e=[]){if(e.length>M)throw RangeError(`the buffer holds ${String(M)} fragments, not ${String(e.length)}`);this.#e=[...e]}fragments(){return this.#e}size(){return this.#e.length}capacity(){return M}full(){return this.#e.length>=M}add(e){return!this.full()&&(this.#e.push(e),!0)}take(e){if(!Number.isInteger(e)||e<0||e>=this.#e.length)return;let[t]=this.#e.splice(e,1);return t}merge(e,t){if(e===t)return;let n=this.#e[e],r=this.#e[t];if(n===void 0||r===void 0)return;let i=new mn(n,r);return this.#e.splice(Math.max(e,t),1),this.#e.splice(Math.min(e,t),1),this.#e.push(i),i}},_a=15,va=class{#e;#t;#n;#r;#i;#a;constructor(e={coherence:new A().value(),steps:0,visited:[],buffer:[],resonant:0}){this.#e=new A(e.coherence),this.#t=e.steps,this.#n=[...e.visited],this.#r=new Set(this.#n),this.#i=new ga(e.buffer),this.#a=e.resonant}buffer(){return this.#i}resonantTraces(){return this.#a}capture(e){return this.#i.add(e.fragment)?(e.fresh&&e.fragment.resonant()&&(this.#a+=1),!0):!1}merge(e,t){let n=this.#i.merge(e,t);if(n!==void 0)return this.restore(_a),n.resonant()&&(this.#a+=1),n}drop(e){return this.#i.take(e)}coherence(){return this.#e}steps(){return this.#t}drain(e){this.#e=this.#e.drained(e)}restore(e){this.#e=this.#e.restored(e)}setCoherence(e){this.#e=new A(e)}count(){this.#t+=1}markFootprint(e){for(let t of e.trail()){let e=t.address().toString();this.#r.has(e)||(this.#r.add(e),this.#n.push(e))}}visited(e){return this.#r.has(e.address().toString())}footprints(){return this.#n}placesVisited(){return this.#n.length}reboot(){this.#e=new A}},ya=new vn,ba=class{#e;#t;#n;#r;#i;#a=new va;constructor(e){this.#e=e}world(){return this.#t}universe(){return this.#n}here(){return this.#r}player(){return this.#a}resumes(){return this.#i!==void 0}begin(e){this.#t=e,this.#n=this.#e.universe(e),this.#r=void 0,this.#i=void 0,this.#a=new va}enter(){return this.#n!==void 0&&(this.#o(this.#i??this.#n.startOfJourney()),this.#i=void 0,!0)}descend(e){let t=this.#r?.listing()[e];return t===void 0||t.sealed()?!1:(this.#o(t.arrive()),!0)}move(e){let t=this.#r?.move(e);return t!==void 0&&(this.#o(t.arrive()),!0)}leave(){if(this.#r?.exit()===void 0)return!1;let e=this.#r.leave();return e!==void 0&&(this.#o(e),!0)}toTitle(){return this.#r!==void 0&&(this.#i=this.#r,this.#r=void 0,!0)}capture(e){if(this.#r===void 0||this.#a.buffer().full())return;let t=this.#r.capture(e);if(t!==void 0)return this.#a.capture(t),t.fragment}drop(e){if(this.#r?.contents()===null||this.#r===void 0)return;let t=this.#a.buffer().fragments()[e];if(t!==void 0&&this.#r.drop(t))return this.#a.drop(e)}merge(e,t){return this.#a.merge(e,t)}reboot(){return this.#t!==void 0&&(this.#n=this.#e.universe(this.#t),this.#i=void 0,this.#a.reboot(),this.#o(this.#n.startOfJourney()),!0)}saved(){if(this.#t===void 0)return;let e=this.#r??this.#i;return new ta({seed:this.#t,address:e?.address(),states:this.#s(this.#a.footprints()),coherence:this.#a.coherence().value(),steps:this.#a.steps(),visited:this.#a.footprints(),buffer:this.#a.buffer().fragments().map(e=>e.data()),resonant:this.#a.resonantTraces()})}restore(e){let t=this.#e.universe(e.seed()),n=e.address(),r=n===void 0?void 0:t.descendant(n);if(n!==void 0&&(r===void 0||r.arrival()!==r))return!1;let i=new Set;for(let n of e.visited()){let e=g.parse(n);if(e===void 0||t.descendant(e)===void 0)return!1;let r=e.parent();if(r!==void 0&&!i.has(r.toString()))return!1;i.add(n)}let a=r?.trail()??[];if(a.some(e=>!i.has(e.address().toString())))return!1;for(let[n,r]of e.states()){let e=g.parse(n),a=e===void 0||!i.has(n)?void 0:t.descendant(e);if(a===void 0||!a.recall(r)||a.remember()!==r)return!1}for(let[e,t]of a.entries()){let n=a[e+1];if(n!==void 0&&!t.admits(n))return!1}let o=ya.readAll(e.buffer(),t);return o===void 0||o.length>this.#a.buffer().capacity()?!1:(this.#t=e.seed(),this.#n=t,this.#r=r,this.#i=void 0,this.#a=new va({coherence:e.coherence(),steps:e.steps(),visited:e.visited(),buffer:o,resonant:e.resonant()}),!0)}#o(e){this.#r=e,this.#a.markFootprint(e)}#s(e){let t=new Map;for(let n of e){let e=g.parse(n),r=e===void 0?void 0:this.#n?.descendant(e)?.remember();r!==void 0&&t.set(n,r)}return t}},xa=`reboot`,Sa=class{#e;constructor(e){this.#e=e}summary(){return{id:xa,outcome:`rebooting`,figures:{}}}options(){return[j(xa,``,`Rebuild`)]}answer(e){if(e===`reboot`)return this.#e.reboot(),{message:`Substrate rebuilt. Coherence ${String(this.#e.player().coherence().value())}.`,done:!0}}},Ca=20,wa=[{id:`expedition`,reached:e=>e.places>=Ca},{id:`severed`,reached:()=>!0}],Ta=class{of(e){return wa.find(t=>t.reached(e))?.id??``}},Ea=`recap`,Da=`resume`,Oa=`end-session`,ka=class{#e;#t=new Ta;constructor(e){this.#e=e}summary(){let e=this.#e.here(),t=this.#e.player();return{id:Ea,outcome:e===void 0?``:this.#t.of({here:e,places:t.placesVisited()}),figures:{locus:e?.address().toString()??``,steps:String(t.steps()),places:String(t.placesVisited()),buffer:String(t.buffer().size()),resonant:String(t.resonantTraces())}}}options(){return[j(Da,`b`,`Resume`),j(Oa,`q`,`End session`)]}answer(e){if(e===Da)return{message:``,done:!0};if(e===Oa)return this.#e.toTitle(),{message:``,done:!0}}},Aa=`spectrogram`,ja=5,Ma=9,Na=class{of(e,t){if(!e.indoors())return null;let n=t.branch(Aa);return{spectrogram:Array.from({length:ja},(e,t)=>n.branch(t).range(1,Ma))}}},Pa=class{#e;#t;constructor(e){this.#e=e.drains,this.#t=e.counts}drains(){return this.#e}counts(){return this.#t}},N=new Pa({drains:!1,counts:!1}),Fa=new Pa({drains:!0,counts:!1}),P=new Pa({drains:!0,counts:!0}),Ia=`enter:`,La=`move:`,Ra=`capture:`,za=`debug:integrity:`,Ba={up:`u`,down:`d`,corridor:`c`,elevator:`b`,back:`b`,forward:`f`},Va=Array.from({length:9},(e,t)=>String(t+1)),Ha=Array.from({length:26},(e,t)=>String.fromCharCode(97+t)),Ua=class{#e;#t;#n;#r;#i;#a;#o=new pa;#s=new ha;#c=new Na;#l=new ua;#u;#d=``;constructor(e){this.#e=new ba(e.world),this.#t=e.entropy,this.#n=e.saves,this.#r=e.debug??!1,this.#i=[{keys:[`n`],turn:N,options:()=>this.#m()&&!this.#h()?[j(`new-world`,`n`,`New world`)]:[],run:()=>this.#_()},{keys:[`e`],turn:N,options:()=>this.#m()&&this.#h()?[j(`enter-world`,`e`,this.#e.resumes()?`Continue`:`Enter world`)]:[],run:()=>this.#g(this.#e.enter(),`Entered ${this.#e.here()?.name()??``}.`)},{keys:[`r`],turn:N,options:()=>this.#m()&&this.#h()?[j(`reroll`,`r`,`Re-roll`)]:[],run:()=>this.#_()},{keys:[],turn:P,options:()=>this.#y(),run:e=>{let t=this.#e.player(),n=t.resonantTraces(),r=this.#e.capture(Number(e.slice(8)));if(r===void 0)return this.#d;let i=t.resonantTraces()>n?` Harmonic resonance: +10%.`:``;return`Captured ${r.name()}. Frequency: ${String(r.frequency().hertz())} Hz.${i}`}},{keys:[],turn:P,options:()=>this.#v(),run:e=>{let t=this.#e.descend(Number(e.slice(6)));return this.#g(t,`Entered ${this.#e.here()?.name()??``}.`)}},{keys:[...new Set(Object.values(Ba))],turn:P,options:()=>this.#b(),run:e=>{let t=e.slice(5),n=this.#e.here(),r=n?.moves().find(e=>e.id===t)?.label??``,i=this.#e.move(t),a=this.#e.here();return this.#g(i,a===n?`${r}.`:`Entered ${a?.name()??``}.`)}},{keys:[`l`],turn:P,options:()=>{let e=this.#e.here();return e?.exit()===void 0?[]:[{...j(`leave`,`l`,e.leaveLabel()),role:`return`}]},run:()=>this.#g(this.#e.leave(),`Returned to ${this.#e.here()?.name()??``}.`)},{keys:[`i`],turn:Fa,options:()=>this.#m()?[]:[j(na,`i`,`Buffer`)],run:()=>(this.#u=new sa(this.#e),``)},{keys:[`t`],turn:Fa,options:()=>this.#m()?[]:[j(`to-title`,`t`,`Title screen`)],run:()=>this.#g(this.#e.toTitle(),``)},{keys:[`q`],turn:Fa,options:()=>this.#m()?[]:[j(Ea,`q`,`End session`)],run:()=>(this.#u=new ka(this.#e),``)},{keys:[],turn:N,options:()=>this.#r&&!this.#m()?A.edges().map(e=>({...j(`${za}${String(e)}`,``,`Integrity ${String(e)}`),role:`debug`})):[],run:e=>{let t=Number(e.slice(16));return this.#e.player().setCoherence(t),`Integrity set to ${String(t)}%.`}}];let t=new Set([...this.#i.flatMap(e=>e.keys),`v`]);this.#a=[...Va,...Ha.filter(e=>!t.has(e))],this.#f()}step(e){let t=this.#u;if(t!==void 0){let n=t.answer(e);return n!==void 0&&(n.done&&(this.#u=void 0),this.#d=n.message,this.#p()),this.snapshot()}let n=this.#i.find(t=>t.options().some(t=>t.id===e&&!t.sealed));if(n===void 0)return this.snapshot();let r=this.#e.here(),i=this.#e.player();return r!==void 0&&n.turn.drains()&&(i.drain(this.#o.cost(r)),i.coherence().exhausted())?(this.#u=new Sa(this.#e),this.#d=``,this.#p(),this.snapshot()):(this.#d=n.run(e),n.turn.counts()&&i.count(),this.#p(),this.snapshot())}snapshot(){let e=this.#e.world(),t=this.#e.here(),n=this.#e.player();return{world:e===void 0?null:{seed:e.toString(),name:this.#e.universe()?.name()??``},place:t===void 0?null:this.#x(t,n),player:t===void 0?null:{coherence:n.coherence().value(),band:n.coherence().band(),steps:n.steps()},buffer:t===void 0?null:this.#S(n),prompt:this.#u?.summary()??null,options:this.#u?.options()??this.#i.flatMap(e=>e.options()),message:this.#d}}#f(){let e=ta.parse(this.#n.load());if(e===void 0||!this.#e.restore(e))return;let t=this.#e.here(),n=t===void 0?``:` at ${t.name()}`;this.#d=`Restored world ${e.seed().toString()}${n}.`,this.#e.player().coherence().exhausted()&&(this.#u=new Sa(this.#e))}#p(){let e=this.#e.saved();e!==void 0&&this.#n.save(e.toText())}#m(){return this.#e.here()===void 0}#h(){return this.#e.world()!==void 0}#g(e,t){return e?t:this.#d}#_(){let e=this.#t.draw();return this.#e.begin(e),`World ${e.toString()} drawn.`}#v(){let e=this.#e.here();if(e===void 0)return[];let t=this.#e.player(),n=0,r=e=>{if(e.sealed())return``;if(!e.goesByNumber())return this.#a[n++]??``;let t=String(e.ordinal());return t.length===1?t:``};return e.listing().map((n,i)=>({id:`${Ia}${String(i)}`,key:r(n),label:`${e.approachVerb()} ${n.callSign()}`,place:n.name(),role:`travel`,sealed:n.sealed(),landmark:n.landmark(),ordinal:String(n.ordinal()),readings:n.readings(),opposite:``,current:n.current(),visited:t.visited(n)}))}#y(){let e=this.#e.here()?.contents();if(e==null)return[];let t=this.#e.player().buffer().full();return e.objects.map((e,n)=>({...j(`${Ra}${String(n)}`,t?``:Va[n]??``,`Take ${e.name()}`),place:e.name(),role:`take`,sealed:t,ordinal:String(n+1)}))}#b(){let e=this.#e.here();return e===void 0?[]:e.moves().map(e=>({...j(`${La}${e.id}`,Ba[e.id]??``,e.label),role:`move`,opposite:`${La}${e.opposite}`}))}#x(e,t){let n=e.parent()?.children(),r=this.#s.of(e,t.steps());return{kind:e.kind().title(),icon:e.kind().icon(),name:e.name(),address:e.address().toString(),hash:e.hash(),depth:e.depth(),position:n===void 0?null:{label:e.kind().indexLabel(),index:e.index()+1,total:n.length},trail:e.trail().map(e=>({icon:e.kind().icon(),kind:e.kind().title(),name:e.name()})),status:e.status(),description:this.#l.read(e.description(),t.coherence(),r),facts:e.facts(),frame:e.vibe()?.frame()??null,childrenHeading:e.childrenHeading(),contents:this.#C(e),telemetry:this.#c.of(e,r)}}#S(e){let t=e.buffer();return{size:t.size(),capacity:t.capacity(),resonant:e.resonantTraces(),fragments:t.fragments().map(e=>({key:e.key(),name:e.name(),hertz:e.frequency().hertz(),resonant:e.resonant()}))}}#C(e){let t=e.contents();return t===null?null:{objects:t.objects.map(e=>({key:e.key(),name:e.name()})),furniture:t.furniture}}},Wa=class{warn(e){console.warn(e)}},Ga=class{#e;constructor(e){this.#e=e}draw(){let[e=0,t=0]=this.#e.getRandomValues(new Uint32Array(2));return new Zi(e,t)}},Ka=`endless-transit.save`,qa=class{#e;constructor(e){this.#e=e}load(){try{return this.#e().getItem(Ka)??void 0}catch{return}}save(e){try{this.#e().setItem(Ka,e)}catch{}}},Ja=class{#e;constructor(e){this.#e=e}name(){return`ENDLESS TRANSIT`}buildLine(){return`build ${this.#e}`}},Ya=`buffer`,Xa=`default`,Za=`▲ `,Qa=10,$a=`█`,eo=`░`,to={stable:`STABLE`,shifting:`SHIFTING`},no={text:`[RESONANT]`,label:`Resonant`},ro=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Ya}toViewModel(e){let t=e.prompt,n=e.buffer;if(t?.id!==Ya||n===null)throw Error(`BufferPresenter needs the buffer prompt`);let r=e=>String(e).padStart(2,`0`),i=t.figures.selected??``,a=`[QUANTUM_TRACE_BUFFER_SYNC...]`,o=n.fragments.map((t,n)=>{let a=String(n+1),o=i===String(n),s=t.hertz%2==0,c=Math.floor(t.hertz%100/10)+1;return{key:t.key,ordinal:r(n+1),hertz:`${String(t.hertz)}Hz`,bar:$a.repeat(c)+eo.repeat(Qa-c),phase:s?to.stable:to.shifting,phaseKey:s?`stable`:`shifting`,name:t.name,badge:t.resonant?no:null,selected:o,selectedLabel:o?`Selected`:``,actions:e.options.filter(e=>(e.role===`pick`||e.role===`drop`)&&e.ordinal===a).map(e=>this.#t(e))}}),s=e.options.filter(e=>e.role===`return`).map(e=>this.#n(e));return{scene:Ya,title:this.#e.name(),frame:e.place?.frame??Xa,heading:a,count:{label:`TRACE_BUFFER`,value:`${r(n.size)}/${r(n.capacity)} FRAGMENTS`},tally:{label:`RESONANT_TRACES`,value:String(n.resonant)},empty:o.length===0?`(No spectral traces detected in local buffer)`:``,rows:o,hint:`Select one fragment, then another: they merge into a hybrid and give 15 Coherence back.`,sync:`SYNC_STATUS: NOMINAL`,dock:s,options:[...o.flatMap(e=>e.actions),...s],note:e.message,status:e.message===``?a:e.message,build:this.#e.buildLine(),regions:{buffer:`Quantum trace buffer`,actions:`Back`}}}#t(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:``}}#n(e){return{...this.#t(e),label:`${Za}${e.label.toUpperCase()}`}}},io=globalThis,ao=e=>e,F=io.trustedTypes,oo=F?F.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,so=`$lit$`,I=`lit$${Math.random().toFixed(9).slice(2)}$`,co=`?`+I,lo=`<${co}>`,L=document,R=()=>L.createComment(``),z=e=>e===null||typeof e!=`object`&&typeof e!=`function`,uo=Array.isArray,fo=e=>uo(e)||typeof e?.[Symbol.iterator]==`function`,po=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mo=/-->/g,ho=/>/g,V=RegExp(`>|${po}(?:([^\\s"'>=/]+)(${po}*=${po}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),go=/'/g,_o=/"/g,vo=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),U=Symbol.for(`lit-noChange`),W=Symbol.for(`lit-nothing`),yo=new WeakMap,G=L.createTreeWalker(L,129);function bo(e,t){if(!uo(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oo===void 0?t:oo.createHTML(t)}var xo=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=B;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===B?c[1]===`!--`?o=mo:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=V):(vo.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=V):o=ho:o===V?c[0]===`>`?(o=i??B,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?V:c[3]===`"`?_o:go):o===_o||o===go?o=V:o===mo||o===ho?o=B:(o=V,i=void 0);let d=o===V&&e[t+1].startsWith(`/>`)?` `:``;a+=o===B?n+lo:l>=0?(r.push(s),n.slice(0,l)+so+n.slice(l)+I+d):n+I+(l===-2?t:d)}return[bo(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},So=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=xo(t,n);if(this.el=e.createElement(l,r),G.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=G.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(so)){let t=u[o++],n=i.getAttribute(e).split(I),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?To:r[1]===`?`?Eo:r[1]===`@`?Do:q}),i.removeAttribute(e)}else e.startsWith(I)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(vo.test(i.tagName)){let e=i.textContent.split(I),t=e.length-1;if(t>0){i.textContent=F?F.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],R()),G.nextNode(),c.push({type:2,index:++a});i.append(e[t],R())}}}else if(i.nodeType===8){if(i.data===co)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(I,e+1))!==-1;)c.push({type:7,index:a}),e+=I.length-1}}a++}}static createElement(e,t){let n=L.createElement(`template`);return n.innerHTML=e,n}};function K(e,t,n=e,r){if(t===U)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=z(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=K(e,i._$AS(e,t.values),i,r)),t}var Co=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??L).importNode(t,!0);G.currentNode=r;let i=G.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new wo(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Oo(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=G.nextNode(),a++)}return G.currentNode=L,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},wo=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),z(e)?e===W||e==null||e===``?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==U&&this._(e):e._$litType$===void 0?e.nodeType===void 0?fo(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=So.createElement(bo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Co(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=yo.get(e.strings);return t===void 0&&yo.set(e.strings,t=new So(e)),t}k(t){uo(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(R()),this.O(R()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ao(e).nextSibling;ao(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=W}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=K(this,e,t,0),a=!z(e)||e!==this._$AH&&e!==U,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=K(this,r[n+o],t,o),s===U&&(s=this._$AH[o]),a||=!z(s)||s!==this._$AH[o],s===W?e=W:e!==W&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},To=class extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},Eo=class extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},Do=class extends q{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??W)===U)return;let n=this._$AH,r=e===W&&n!==W||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==W&&(n===W||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Oo=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}},ko={M:so,P:I,A:co,C:1,L:xo,R:Co,D:fo,V:K,I:wo,H:q,N:Eo,U:Do,B:To,F:Oo},Ao=io.litHtmlPolyfillSupport;Ao?.(So,wo),(io.litHtmlVersions??=[]).push(`3.3.3`);var J=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new wo(t.insertBefore(R(),e),e,void 0,n??{})}return i._$AI(e),i},jo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Mo=e=>(...t)=>({_$litDirective$:e,values:t}),No=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:Po}=ko,Fo=e=>e,Io=()=>document.createComment(``),Y=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Po(r.insertBefore(Io(),i),r.insertBefore(Io(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Fo(e).nextSibling;Fo(r).insertBefore(e,i),e=t}}}return n},X=(e,t,n=e)=>(e._$AI(t,n),e),Lo={},Ro=(e,t=Lo)=>e._$AH=t,zo=e=>e._$AH,Bo=e=>{e._$AR(),e._$AA.remove()},Vo=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Z=Mo(class extends No{constructor(e){if(super(e),e.type!==jo.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=zo(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=X(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=X(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=X(i[d],a[m]),Y(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=X(i[f],a[p]),Y(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Vo(o,p,m),u=Vo(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Y(e,i[d]);X(t,a[p]),c[p]=t}else c[p]=X(n,a[p]),Y(e,i[d],n),i[t]=null;p++}else Bo(i[f]),f--}else Bo(i[d]),d++;for(;p<=m;){let t=Y(e,c[m+1]);X(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Bo(e)}return this.ut=o,Ro(e,c),U}}),Ho=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`BufferView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
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
    `}},Uo=`default`,Wo=`▲ `,Go={text:`[>X<]`,label:`Elevator here`},Ko={text:`[V]`,label:`Visited`},qo=`█`,Jo=class{#e;constructor(e){this.#e=e}accepts(e){return e.place!==null&&e.prompt===null}toViewModel(e){let t=e.place,n=e.player;if(t===null||n===null)throw Error(`HudPresenter needs a snapshot with a place`);let r=e.options.filter(e=>e.role===`travel`).map(e=>this.#r(e)),i=e.options.filter(e=>e.role===`move`).map(e=>this.#a(e)),a=e.options.filter(e=>e.role===`return`||e.role===`system`).map(e=>this.#a(e)),o=e.options.filter(e=>e.role===`take`),s=e.options.filter(e=>e.role===`debug`).map(e=>this.#a(e)),c=e=>String(e).padStart(2,`0`);return{scene:`${e.world?.seed??``}/${t.address}`,title:this.#e.name(),frame:t.frame??Uo,crumbs:t.trail.map((e,n)=>({...e,current:n===t.trail.length-1})),meter:{label:`COHERENCE`,...A.range(),value:n.coherence,text:`${String(n.coherence)}%`,band:n.band,bandLabel:n.band,valueText:`${String(n.coherence)} percent, ${n.band}`},stats:[{label:`PULSE_TRAVERSAL`,value:String(n.steps)},{label:`TRACE_BUFFER`,value:`${c(e.buffer?.size??0)}/${c(e.buffer?.capacity??0)}`},{label:`HOP_DENSITY`,value:c(t.depth)},...t.position===null?[]:[{label:t.position.label,value:`${c(t.position.index)}/${c(t.position.total)}`}],{label:`LOCUS`,value:t.address},{label:`LOCUS_HASH`,value:t.hash},{label:`SEED`,value:e.world?.seed??``}],place:{eyebrow:t.kind.toUpperCase(),icon:t.icon,name:t.name.toUpperCase(),tags:t.facts.map(e=>({key:e.key,label:e.label,value:e.value.toUpperCase()})),description:t.description,rows:this.#t(t),diagnostic:t.status},aside:this.#n(t,o,e.buffer?.resonant??0),heading:t.childrenHeading.replace(/:$/,``).toUpperCase(),rows:r,moves:i,sealedNote:r.some(e=>e.sealed)?`STRUCTURES SEALED · the lattice opens their doors in a later build`:null,sealedTag:`SEALED`,dock:a,debug:s,options:[...o.filter(e=>!e.sealed).map(e=>this.#i(e)),...r.filter(e=>!e.sealed).map(e=>({id:e.id,key:e.key,label:e.label,opposite:``})),...i,...a,...s],status:e.message,build:this.#e.buildLine(),regions:{hud:`Position`,path:`Path from the universe`,place:`Where you are`,travel:`Places to enter`,moves:`Moves`,aside:`Readouts`,dock:`Leave and game`,debug:`Debug tools`}}}#t(e){let t=e.contents;return t===null?[]:[{label:`FURNITURE`,value:t.furniture.join(`, `)},...t.objects.length===0?[]:[{label:`OBJECTS_DETECTED`,value:String(t.objects.length)}]]}#n(e,t,n){let r=e.contents,i=t.some(e=>e.sealed);return{objects:r===null?null:{label:`In this room`,heading:`IN THIS ROOM`,empty:r.objects.length===0?`No objects detected.`:``,note:i?`BUFFER FULL — merge or drop a fragment to take more.`:``,tiles:r.objects.map((e,n)=>{let r=String(n+1),i=t.find(e=>e.ordinal===r&&!e.sealed);return{key:e.key,name:e.name,ordinal:r,action:i===void 0?null:this.#i(i)}})},telemetry:e.telemetry===null?null:{label:`System telemetry`,heading:`[SYSTEM_TELEMETRY]`,sync:`LATTICE_SYNC: [NOMINAL]`,spectrogram:{heading:`[QUANTUM_SPECTROGRAM]`,bars:e.telemetry.spectrogram.map(e=>qo.repeat(e))},logs:{heading:`[DECODE_LOGS]`,lines:[`> Trace: ${e.address}`,`> Resonant traces: ${String(n)}`]}}}}#r(e){return{id:e.id,key:e.key.toUpperCase(),ordinal:e.ordinal.padStart(2,`0`),label:e.sealed?e.place:e.label,sealed:e.sealed,landmark:e.landmark,readings:e.readings.map(e=>({key:e.key,label:e.label,value:e.value})),mark:e.current?Go:null,seen:e.visited?Ko:null}}#i(e){return{id:e.id,key:e.key.toUpperCase(),label:e.label,opposite:``}}#a(e){let t=e.role===`return`?Wo:``;return{id:e.id,key:e.key.toUpperCase(),label:`${t}${e.label.toUpperCase()}`,opposite:e.opposite}}},Yo=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`HudView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
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
        ${e.moves.length===0?W:H`
                <nav class="moves" aria-label=${e.regions.moves}>
                  ${Z(e.moves,e=>e.id,e=>this.#i(e))}
                </nav>
              `}
        <div class="side">
          ${e.rows.length===0?W:H`
                  <section class="travel" aria-label=${e.regions.travel}>
                    <h3 class="heading">${e.heading}</h3>
                    ${e.sealedNote===null?W:H`<p class="sealed-note" data-testid="sealed-note">${e.sealedNote}</p>`}
                    <ol class="rows">
                      ${Z(e.rows,t=>`${e.scene}/${t.id}`,t=>this.#r(t,e.sealedTag))}
                    </ol>
                  </section>
                `}
          ${this.#n(e)}
        </div>
        <nav class="dock" aria-label=${e.regions.dock}>
          ${Z(e.dock,e=>e.id,e=>this.#i(e))}
        </nav>
        ${e.debug.length===0?W:H`
                <nav class="debug" aria-label=${e.regions.debug} data-testid="debug">
                  ${Z(e.debug,e=>e.id,e=>this.#i(e))}
                </nav>
              `}
        <footer class="build" data-testid="build">${e.build}</footer>
      </div>
    `}#n(e){let{objects:t,telemetry:n}=e.aside;return t===null&&n===null?W:H`
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
    `}#r(e,t){let n=e.landmark?`lb landmark`:`lb`;return e.sealed?H`
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
    `}#i(e){return H`
      <button type="button" class="pb" data-option=${e.id}>
        ${e.key===``?W:H`<kbd aria-hidden="true">${e.key}</kbd>`}<span
          >${e.label}</span
        >
      </button>
    `}},Xo=`reboot`,Zo=`dead`,Qo=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===Xo}toViewModel(e){let t=`!!! CRITICAL_COHERENCE_FAILURE !!!`;return{scene:Xo,title:this.#e.name(),frame:Zo,stageLine:`NEURAL LINK LOST`,eyebrow:`COHERENCE ${String(e.player?.coherence??0)}%`,headline:t,line:`REBOOTING...`,explanation:`The world is rebuilt from the same seed. You wake on the starting street with 100 Coherence; your step count and the places you have visited are kept. Everything that lived inside the world is undone.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?t:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,notice:`Link failure`,actions:`Actions`}}}},$o=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RebootView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
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
    `}},es=`recap`,ts=`default`,ns=[{key:`locus`,label:`FINAL_LOCUS`,unit:``},{key:`steps`,label:`PULSE_TRAVERSAL`,unit:` steps`},{key:`places`,label:`CELLS_MAPPED`,unit:` footprints`},{key:`buffer`,label:`BUFFER_DENSITY`,unit:` spectral fragments`},{key:`resonant`,label:`RESONANT_TRACES`,unit:` resonant`}],rs=[`UNMOUNTING_LATTICE_TRACE`,`DEALLOCATING_TRACE_BUFFER`,`RELEASING_NEURAL_CARRIER`,`STABILIZING_SUBSTRATE_WAVEFORM`],is={expedition:{heading:`[SESSION_RECAP_INITIALIZED]`,figures:!0,closing:`Expedition successful. Trace synchronized to substrate.`},severed:{heading:`[LINK_TERMINATION_PROTOCOL]`,figures:!1,closing:`Neural link severed. Waveform stabilized.`}},as=class{#e;constructor(e){this.#e=e}accepts(e){return e.prompt?.id===es}toViewModel(e){let t=e.prompt;if(t?.id!==es)throw Error(`RecapPresenter needs the recap prompt`);let n=is[t.outcome];if(n===void 0)throw Error(`no words for the ending '${t.outcome}'`);return{scene:es,title:this.#e.name(),frame:e.place?.frame??ts,heading:n.heading,figures:n.figures?this.#t(t):[],steps:n.figures?[]:rs.map(e=>({label:`[STATUS]`,process:`${e}...`,done:`[DONE]`})),closing:n.closing,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),note:e.message,status:e.message===``?n.heading:e.message,build:this.#e.buildLine(),regions:{recap:`Session recap`,actions:`Actions`}}}#t(e){return ns.map(t=>({label:t.label,value:`${e.figures[t.key]??``}${t.unit}`}))}},os=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`RecapView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
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
    `}},ss=class{#e;constructor(e){this.#e=e}accepts(e){return e.place===null&&e.prompt===null}toViewModel(e){return{scene:`title`,title:this.#e.name(),tagline:`Vinculum neural interface · lattice uplink`,stageLine:e.world===null?`AWAITING SEED`:`WORLD LOCKED`,world:e.world===null?null:{nameLabel:`UNIVERSE`,name:e.world.name.toUpperCase(),seedLabel:`SEED`,seed:e.world.seed},prompt:`NO WORLD LOADED. DRAW A SEED TO BEGIN.`,options:e.options.map(e=>({id:e.id,key:e.key.toUpperCase(),label:e.label.toUpperCase(),opposite:e.opposite})),status:e.message,build:this.#e.buildLine(),regions:{stage:`Uplink`,world:`World`,actions:`Actions`}}}},cs=class{#e;mount(e){this.#e=e}render(e){if(this.#e===void 0)throw Error(`TitleView.render before mount`);J(this.#t(e),this.#e)}dispose(){this.#e!==void 0&&J(W,this.#e),this.#e=void 0}#t(e){return H`
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
    `}},Q=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}accepts(e){return this.#e.accepts(e)}mount(e){this.#t.mount(e)}show(e){let t=this.#e.toViewModel(e);return this.#t.render(t),t}dispose(){this.#t.dispose()}},ls=class{#e;#t=new AbortController;#n=[];constructor(e){this.#e=e}attach(e){let t=this.#t.signal;e.addEventListener(`click`,e=>{this.#r(e)},{signal:t}),e.ownerDocument.addEventListener(`keydown`,e=>{this.#i(e)},{signal:t})}offer(e){this.#n=e}detach(){this.#t.abort()}#r(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`button[data-option]`)?.dataset.option;t!==void 0&&this.#n.some(e=>e.id===t)&&this.#e(t)}#i(e){if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;let t=this.#n.find(t=>t.key.toLowerCase()===e.key.toLowerCase());t!==void 0&&(e.preventDefault(),this.#e(t.id))}},us=class{#e;#t;#n;#r;#i;#a;#o;#s;#c=[];#l;constructor(e,t){this.#e=e,this.#t=t,this.#n=new ls(e=>{this.#l=this.#c.find(t=>t.id===e),this.#u(this.#e.step(e))})}start(e){this.#r=e,this.#i=this.#d(e),this.#n.attach(e),this.#u(this.#e.snapshot())}stop(){this.#n.detach(),this.#a?.dispose(),this.#a=void 0,this.#i?.remove(),this.#i=void 0,this.#r=void 0}#u(e){let t=this.#r,n=this.#t.find(t=>t.accepts(e));if(t===void 0||n===void 0)throw Error(`no screen accepts this snapshot`);let r=this.#p();n!==this.#a&&(this.#a?.dispose(),n.mount(t),this.#a=n);let i=n.show(e);if(this.#n.offer(i.options),this.#c=i.options,this.#f(i.status),r?.isConnected===!1&&this.#m(i.scene,this.#l),i.scene!==this.#o){this.#h();let e=r instanceof HTMLElement?r.dataset.option:void 0;this.#s=this.#o===void 0||e===void 0?void 0:{scene:this.#o,optionId:e}}this.#o=i.scene}#d(e){let t=e.ownerDocument.createElement(`p`);return t.className=`vh`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),e.prepend(t),t}#f(e){this.#i!==void 0&&this.#i.textContent!==e&&(this.#i.textContent=e)}#p(){let e=this.#r?.ownerDocument.activeElement;return e!=null&&this.#r?.contains(e)===!0?e:void 0}#m(e,t){let n=this.#r,r=[...n?.querySelectorAll(`button[data-option]`)??[]],i=this.#s,a=i?.scene===e?r.find(e=>e.dataset.option===i.optionId):void 0;if(a!==void 0){a.focus({preventScroll:!0});return}let o=t?.opposite??``,s=n?.querySelector(`[data-rest]`);if(o!==``&&this.#c.some(e=>e.id===o)&&s!=null){s.focus({preventScroll:!0});return}r.find(e=>e.dataset.option!==o)?.focus({preventScroll:!0})}#h(){this.#r?.ownerDocument.defaultView?.scrollTo({top:0,left:0,behavior:`instant`})}},ds=document.querySelector(`#app`);if(ds===null)throw Error(`#app is missing from index.html`);var fs=new tn(new en),ps=new URLSearchParams(window.location.search).has(`debug`),ms=new Ua({world:new Ri(fs,new Gi(fs),new Wa),entropy:new Ga(window.crypto),saves:new qa(()=>window.localStorage),debug:ps}),$=new Ja(`4b30552`);new us(ms,[new Q(new Qo($),new $o),new Q(new as($),new os),new Q(new ro($),new Ho),new Q(new ss($),new cs),new Q(new Jo($),new Yo)]).start(ds);