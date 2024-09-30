
interface SystemInfoMationData {
    networkInterfaces: NetworkInterface[];
    cpu: Cpu;
    mem: Mem;
    disk: Disk[];
    networkSpeed: NetworkSpeed[];
}

interface FormatSystemInfoMationData {
    networkInterfaces: {
        [key: string]: NetworkInterface[];
    },
    cpu: {
        [key: string]: Cpu
    },
    mem: {
        [key: string]: Mem
    },
    disk: {
        [key: string]: Disk[]
    },
    networkSpeed: {
        [key: string]: NetworkSpeed[]
    },
}

interface Disk {
    device: string;
    type: string;
    name: string;
    vendor: string;
    size: number;
    bytesPerSector: number;
    totalCylinders: number;
    totalHeads: number;
    totalSectors: number;
    totalTracks: number;
    tracksPerCylinder: number;
    sectorsPerTrack: number;
    firmwareRevision: string;
    serialNum: string;
    interfaceType: string;
    smartStatus: string;
    temperature: null;
}

interface Mem {
    total: number;
    free: number;
    used: number;
    active: number;
    available: number;
    buffers: number;
    cached: number;
    slab: number;
    buffcache: number;
    swaptotal: number;
    swapused: number;
    swapfree: number;
    writeback: null;
    dirty: null;
}

interface Cpu {
    manufacturer: string;
    brand: string;
    vendor: string;
    family: string;
    model: string;
    stepping: string;
    revision: string;
    voltage: string;
    speed: number;
    speedMin: number;
    speedMax: number;
    governor: string;
    cores: number;
    physicalCores: number;
    performanceCores: number;
    efficiencyCores: number;
    processors: number;
    socket: string;
    flags: string;
    virtualization: boolean;
    cache: Cache;
}

interface Cache {
    l1d: number;
    l1i: number;
    l2: number;
    l3: number;
}

interface NetworkInterface {
    iface: string;
    ifaceName: string;
    default: boolean;
    ip4: string;
    ip4subnet: string;
    ip6: string;
    ip6subnet: string;
    mac: string;
    internal: boolean;
    virtual: boolean;
    operstate: string;
    type: string;
    duplex: string;
    mtu: string;
    speed: null | number;
    dhcp: boolean;
    dnsSuffix: string;
    ieee8021xAuth: string;
    ieee8021xState: string;
    carrierChanges: number;
}


interface NetworkSpeed {
    iface: string;
    operstate: string;
    rx_bytes: number;
    rx_dropped: number;
    rx_errors: number;
    tx_bytes: number;
    tx_dropped: number;
    tx_errors: number;
    rx_sec: null | number;
    tx_sec: null | number;
    ms: number;
}

interface HomeTableData {
        day: string;
        rx: string;
        tx: string;
        total: string;
        'avg. rate': string;
}